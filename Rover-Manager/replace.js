const fs = require(`fs`);
replaceallfiles(
    `./`, //Source Dir
    `1022650969365938216`, //The To Search Parameter
    `1040996273546866708`, //The Replacement,
    true
);

async function replaceallfiles(srcdir, toreplace, replacewith, jsonly) {
    let Files = [];
    allFolders(srcdir);

    function allFolders(Directory) {
        fs.readdirSync(Directory).forEach(File => {
            const Absolute = require(`path`).join(Directory, File);
            if (fs.statSync(Absolute).isDirectory()) return allFolders(Absolute);
            else return Files.push(Absolute)
        })
    };

    for (const file of Files) {
        if (file.includes("replace.js") || (jsonly && !file.endsWith(".js"))) continue;
        await fs.readFile(file, 'utf8', async (err, data) => {
            if (err) return console.error(err);
            if (data.includes(toreplace)) {
                await fs.writeFile(file, data.split(toreplace).join(replacewith), (e) => {
                    if (e) return console.log(`Error on ${file}`, e);
                    return console.log(`Successfully replaced: ${file.replace(srcdir, ``)}`)
                })
                return await new Promise((r, x) => setTimeout(() => r(2), 250))
            };
        })
    }
};