const fs = require('fs')
const {
  readdirSync
} = require("fs");
const colors = require("colors");
const { ConnectionVisibility } = require('discord.js');
colors.enable()

const { glob } = require("glob"); // glob package for promise
const { promisify } = require("util");
// const { Client } = require("discord.js");
// const { Console } = require('console');

const globPromise = promisify(glob);

module.exports = async (client) => {

    let dateNow = Date.now();
    client.arrayOfSlashCommands = [];
    client.TotalCommands = [];
    client.TotalPrefixCommands = [];

    client.logger(`[x] :: `.magenta + `Now Loading Prefix Commands after: `.brightGreen + `${Date.now() - dateNow}ms`.green)
  readdirSync("./Command/").forEach(async (Commands) => {
    const commands = readdirSync(`./Command/${Commands}/`).filter((file) => file.endsWith(".js"));
    client.logger(colors.blue(`--------> NOW LOADING ${Commands.toUpperCase()} DIRECTORY`), "COMMAND HANDLER")
         for (let file of commands) {
            let pull = require(`../Command/${Commands}/${file}`);

            if (!pull.help) {
               client.logger(`File: ${file} | Missing help.Slash.name to run the command.`, "PREFIX COMMANDS")
               continue;
            }

            if (pull.help.Prefix.name) {
                client.container.commands.set(pull.help.Prefix.name, pull);
                client.TotalPrefixCommands.push(pull.help.Prefix.name)
                client.TotalCommands.push(pull.help.Prefix.name)
                client.logger(`Command Found: ${pull.help.Prefix.name} Loaded`.yellow, "COMMAND HANDLER")
            } else {
              client.logger(`File: ${file} | Missing help.Slash.name to run the command.`, "PREFIX COMMANDS")
            }
         }
  })
  client.logger(`[x] :: `.magenta + `LOADED THE ${client.container.commands.size} COMMANDS after: `.brightGreen + `${Date.now() - dateNow}ms`.green)
  const slashCommands = await globPromise(`${process.cwd()}/Command/*/*.js`);
  slashCommands.map((value) => {
    let pull = require(value);
    try {
      if (pull.help.Slash.name) {
        client.container.slash.set(pull.help.Slash.name, pull);
        client.TotalCommands.push(pull.help.Slash.name)
        // if (["MESSAGE", "USER"].includes(file.type)) delete pull.conf.Slash.userPermissions;
        client.arrayOfSlashCommands.push(pull.help.Slash);
    }
    } catch(e) {
         return;
    }
  })
client.on("ready", async () => {
  if (client.config['Testing']) {
    await client.guilds.cache.get("1010228194470801438").commands.set(client.arrayOfSlashCommands)
    
  } else if (!client.config['Testing']) {
    await client.guilds.cache.get("1081700920993259550").commands.set(client.arrayOfSlashCommands)
  }
  
});


};
