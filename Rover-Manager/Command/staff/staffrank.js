const { EmbedBuilder } = require("discord.js")

module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
    client.StaffRanking.ensure(message.guild.id, {
        TotalUsers: []
     })
     client.StaffRanking.ensure("1003734007000866866", {
        TotalUsers: []
     })


    if (args[0]) {
        const messages1 = client.StaffRanking.get("1003734007000866866", `${args[0]}.TotalMessages`) || 0
        const messages = client.StaffRanking.get("1081700920993259550", `${args[0]}.TotalMessages`) || 0
        return message.reply({embeds: [
           new EmbedBuilder()
           .setAuthor({ name: `Staff Manager | Message For: ${client.users.cache.get(args[0]).username}`, iconURL: client.user.displayAvatarURL() })
           .setTitle(`Total Messages: ${messages} | Total Staff Server: ${messages1}`)
           .setColor("Green")
        ]})
     }
     const messages1 = client.StaffRanking.get("1003734007000866866", `${message.author.id}.TotalMessages`) || 0
     const messages = client.StaffRanking.get("1081700920993259550", `${message.author.id}.TotalMessages`) || 0
     message.reply({embeds: [
        new EmbedBuilder()
        .setAuthor({ name: `Staff Manager`, iconURL: client.user.displayAvatarURL() })
        .setTitle(`Total Messages: ${messages} | Total Staff Server: ${messages1}`)
        .setColor("Green")
     ]})
}
module.exports.slashRun = async (interaction, client) => {
   // Code For Slash Here
}

module.exports.conf = {
     Prefix: {
        aliases: [],
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
        timeout: 5,
     }
}

module.exports.help = {
      Prefix: {
        name: "staffrank",
        category: "staff",
        cooldown: 2,
        usage: "staffrank <user>",
        description: "get a user staffrank",
      },
      Slash: {
        name: "staffrank",
        description: "staff ranking system",
        category: "staff",
      }
}