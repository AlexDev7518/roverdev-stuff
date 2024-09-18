const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder } = require("discord.js");
const { Prefix } = require("../../config/config.json")

module.exports.prefixRun = async (client, message, args, cmdUser) => {

  const category = args[0]
  const Categorys = []

  client.categories.forEach(categeory => {
              Categorys.push(categeory)
  })
  
   if (Categorys.includes(category)) {
    const embed = new EmbedBuilder()
    .setAuthor({name: `${category} Commands | ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
    client.container.commands.filter(c=>c.help.Prefix.category === category).forEach(command => {
       embed.addFields([
          { name: `${Prefix}${command.help.Prefix.name}`, value: `> ${Prefix}help ${command.help.Prefix.name}`, inline: true}
       ])
      
  })
  embed.setColor("Green")
  return message.reply({embeds: [embed]})
   }

       if (args[0]) {
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
             { name: `Command Name`, value: command.help.Prefix.name ? `\`${command.help.Prefix.name}\`` : "No name for this command!"},
             { name: `Aliases `, value: command.conf.Prefix.aliases
             ? `\`${command.conf.Prefix.aliases.join("` `")}\``
             : "No aliases for this command!"},
             { name: `Usage  `, value: command.help.Prefix.usage ? `\`${command.help.Prefix.usage}\``: `\`${{Pefix}}${command.help.Prefix.name}\``},
             { name: `Description `, value:             command.help.Prefix.description
             ? command.help.Prefix.description
             : "No description for this command"},
          ])
          .setTimestamp()
          .setColor("Green")
        return message.reply({ embeds: [embed] }).catch((e) => {
          return message.reply({embed: [new EmbedBuilder().setTitle(`No Command Found with that Name!`).setColor("Orange")]})
        })
      }
    } else {
      const embed = new EmbedBuilder()
      .setAuthor({name: `Bot Help Page For ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
      .setDescription(`Run Any of The Commands Bellow To See my Commands`)

      client.categories.forEach(category => {
                  embed.addFields({
                         name: `${Prefix}help ${category}`, value: `Show you All the ${category} Commands`, inline: true
                  })
      })
      embed.setColor("Green")
      message.reply({embeds: [embed]})
    }
}
module.exports.slashRun = async (interaction, client) => {

}

module.exports.conf = {
     Prefix: {
        aliases: ["latency"],
        enabled: true,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: []   
     },
     Slash: {
        enabled: false,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: [],
        timeout: 50,
     }
}

module.exports.help = {
      Prefix: {
        name: "help",
        category: "information",
        cooldown: 2,
        usage: "help",
        description: "help menu",
      },
      Slash: {
        name: "help",
        description: "help menu",
        category: "information",
      }
}