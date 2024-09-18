
const installModules = async () => {
  return new Promise(async (resolve, reject) => {
    if (process.argv.slice(2).map(a => a.toLowerCase()).includes("--no-install")) resolve();
    else {
      const showInfo = process.argv.slice(2).map(a => a.toLowerCase()).includes("--show-install-output");
      const start = Date.now();

      const { spawn } = require('child_process');

      const npmCmd = process.platform == "win32" ? 'npm.cmd' : 'npm';

      const modules = Object.keys(require('./package.json').dependencies);

      const info = "[90m>[39m          [38;2;87;255;107m[1m[INFO][22m[39m";

      const missingModules = modules.filter(module => {
        try {
          require.resolve(module);
          return;
        } catch (err) {
          return module !== "n";
        }
      });

      if (missingModules.length == 0) {
        console.log(info, 'No modules are missing... Bot is starting up');
        resolve();
      } else {
        console.log(info, missingModules.length, `module${missingModules.length == 1 ? ' is' : 's are'} not installed... Installing...`);

        for (let i = 0; i < missingModules.length; i++) {
          const module = missingModules[i];

          console.log(info, `Installing module ${i + 1}/${missingModules.length} (${module})`);

          await new Promise(resolve => {
            const install = spawn(npmCmd, ['i', module]);

            install.stdout.on('data', (data) => {
              if (showInfo) console.log(data.toString().trim())
            })

            install.stderr.on('data', (data) => {
              if (showInfo) console.log("\u001b[31m" + data.toString().trim());
            })

            install.on('exit', () => {
              console.log(info, `Finished installing module ${i + 1}/${missingModules.length} (${((i + 1) / missingModules.length * 100).toFixed(2)}% done)`);
              resolve();
            })
          })
        }

        console.log(info, 'All missing modules have been installed... Bot is starting up');
        resolve();
      }
    }
  })
}

installModules().then(async () => {
     require("./main")
})