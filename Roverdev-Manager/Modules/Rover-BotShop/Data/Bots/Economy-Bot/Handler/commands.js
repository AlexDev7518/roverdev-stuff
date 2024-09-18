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

  readdirSync("./Command/").forEach(async (Commands) => {
    const commands = readdirSync(`./Command/${Commands}/`).filter((file) => file.endsWith(".js"));
    client.logger.info(`-----> Now Loading ${Commands} Directory`, { label: 'Command Logger' })
         for (let file of commands) {
            let pull = require(`../Command/${Commands}/${file}`);
            if (pull.help.Prefix.name) {
                client.container.commands.set(pull.help.Prefix.name, pull);
                client.TotalPrefixCommands.push(pull.help.Prefix.name)
                client.TotalCommands.push(pull.help.Prefix.name)
                client.logger.info(`Succesfully Loaded ${pull.help.Prefix.name} | In: ${Commands}`, { label: 'Command Logger' })
                
            } else {
                client.logger.error(`File: ${file} | Missing help.Prefix.name to run the command.`, { label: 'Command Logger' })
            }
         }
  })
  const slashCommands = await globPromise(`${process.cwd()}/Command/*/*.js`);
  slashCommands.map((value) => {
    let pull = require(value);
    if (pull.help.Slash.name) {
        client.container.slash.set(pull.help.Slash.name, pull);
        client.TotalCommands.push(pull.help.Slash.name)
        // if (["MESSAGE", "USER"].includes(file.type)) delete pull.conf.Slash.userPermissions;
        client.arrayOfSlashCommands.push(pull.help.Slash);
        client.logger.info(`Succesfully Loaded ${pull.help.Slash.name} `, { label: 'Slash Command Logger' })
    } else {
        client.logger.info(`File: ${file} | Missing help.Slash.name to run the command.`, { label: 'Slash Command Logger' })
    }
  })
};
