// const { ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
// const { EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");


const { ActionRowBuilder, SelectMenuBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {
    name: "help",
    category: "info",
    aliases: ["latency"],
    cooldown: 2,
    usage: "help",
    description: "help Menu",
    guildOnly: false,

    run: async (client, message, args, cmdUser,prefix) => {
      const emojis = {
        info: "<:Info:1010183373119041597>",
        setup: "<a:Setup:1010018440901304421>",
        settings: "<a:setting2:1010183561791406230>",
        allCommands: "<a:neonnice:1010185704539701268>"
      }
      if (args[0] == "info") {
        const embed = new EmbedBuilder()
        .setAuthor({name: `Info Commands | ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
        client.container.commands.filter(c=>c.category=== "info").forEach(command => {
           const commandMap = []
           commandMap.push(command.name)
           embed.addFields([
              { name: `${prefix}${commandMap}`, value: `> ${prefix}help ${commandMap}`, inline: true}
           ])
          
      })
      embed.setColor("DarkRed")
      message.reply({embeds: [embed]})
    } else if (args[0] == "settings") {
      const embed = new EmbedBuilder()
      .setAuthor({name: `Settings Commands | ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
      client.container.commands.filter(c=>c.category=== "settings").forEach(command => {
         const commandMap = []
         commandMap.push(command.name)
         embed.addFields([
            { name: `${prefix}${commandMap}`, value: `> ${prefix}help ${commandMap}`, inline: true}
         ])
    })
    embed.setColor("DarkRed")
    message.reply({embeds: [embed]})
    } else if (args[0] == "setup") {
      const embed = new EmbedBuilder()
      .setAuthor({name: `Setup Commands | ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
      client.container.commands.filter(c=>c.category=== "setup").forEach(command => {
         const commandMap = []
         commandMap.push(command.name)
         embed.addFields([
            { name: `${prefix}${commandMap}`, value: `> ${prefix}help ${commandMap}`, inline: true}
         ])
    })
    embed.setColor("DarkRed")
    message.reply({embeds: [embed]})
    } else             if (args[0]) {
      const command =
      client.container.commands.get(args[0].toLowerCase()) ||
      client.container.commands.find(
        (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
      );
    let agrs;
    if (args[0].length > 10) {
      agrs = `${args[0].slice(0, 10)}...`;
    } else {
      agrs = `${args[0]}`;
    }
      if (!command) {
         return message.reply({embeds: [new EmbedBuilder().setTitle(`No Command Found with that Name!`).setColor("Orange")]})
      }
      if (command) {
        const embed = new EmbedBuilder()
          .setTitle("Command Details")
          .addFields([
             { name: `Command Name`, value: command.name ? `\`${command.name}\`` : "No name for this command!"},
             { name: `Aliases `, value: command.aliases
             ? `\`${command.aliases.join("` `")}\``
             : "No aliases for this command!"},
             { name: `Usage  `, value: command.usage ? `\`${command.usage}\``: `\`${client.config.prefix}${command.name}\``},
             { name: `Description `, value:             command.description
             ? command.description
             : "No description for this command"},
          ])
          .setTimestamp()
          .setColor("DarkRed")
        return message.reply({ embeds: [embed] }).catch((e) => {
          return message.reply({embed: [new EmbedBuilder().setTitle(`No Command Found with that Name!`).setColor("Orange")]})
        })
      }
    } else {
      const embed = new EmbedBuilder()
      .setAuthor({name: `Bot Information about ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
      .setDescription(`Welcome to ${client.user.username} Commands. Run Any of The Commands Bellow To See my Commands or Push the Buttons to See the Commands!`)
      .addFields([
         {
           name: `${prefix}help info`, value: `Show you All the Info Commands`, inline: true
         },
         {
          name: `${prefix}help settings`, value: `Show you all the Settings Commands`, inline: true
        },
        {
          name: `${prefix}help setup`, value: `Show you all the Setup Commands`, inline: true
        },
      ])
      .setColor("DarkRed")
      message.reply({embeds: [embed]})
    }
}}