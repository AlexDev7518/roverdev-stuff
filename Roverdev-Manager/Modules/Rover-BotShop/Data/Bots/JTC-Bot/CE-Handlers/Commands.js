const fs = require('fs')
const {
  readdirSync
} = require("fs");
const colors = require("colors")
colors.enable()
module.exports = (client) => {
  console.log("Welcome to SERVICE HANDLER /--/ By https://roverdev.xyz /--/ Discord: AlexDev#7518".yellow);
  let dateNow = Date.now();
  try {
    console.log(`${String("[x] :: ".magenta)}Now loading the Commands ...`.brightGreen)
    readdirSync("./CE-Commands/").forEach((dir) => {
    console.log(colors.blue(`[COMMAND HANDLER] --------> NOW LOADING ${dir.toUpperCase()} DIRECTORY`))
      const commands = readdirSync(`./CE-Commands/${dir}/`).filter((file) => file.endsWith(".js"));
      for (let file of commands) {
        try {
          let pull = require(`../CE-Commands/${dir}/${file}`);
          if (pull.name) {
            client.container.commands.set(pull.name, pull);
            setTimeout(() => {
              console.log(`[COMMAND HANDLER] Command: ${file} Loaded`.yellow)
            }, 10);
          } else {
            console.log(`[COMMAND HANDLER] Error on Command: ${file} -> missing a help.name,or help.name is not a string.`)
            continue;
          }
             client.container.aliases.forEach((alias)=>{
            client.container.aliases.set(alias,cmd.name)
            })
        } catch (e) {
          console.log(String(e.stack).grey.bgRed)
        }
      }
    });
  } catch (e) {
    console.log(String(e.stack).grey.bgRed)
  }
  console.log(`[x] :: `.magenta + `LOADED THE ${client.container.commands.size} COMMANDS after: `.brightGreen + `${Date.now() - dateNow}ms`.green)
};
