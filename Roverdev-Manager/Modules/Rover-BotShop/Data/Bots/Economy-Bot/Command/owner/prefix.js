const { EmbedBuilder } = require("discord.js")

module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
   // Code For Prefix Here
}
module.exports.slashRun = async (interaction, client) => {
   // Code For Slash Here
}

module.exports.conf = {
     Prefix: {
        aliases: ["prefix"],
        enabled: false,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: ["ManageGuild"]   
     },
     Slash: {
        enabled: false,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: ["ManageGuild"],
        timeout: 5,
     }
}

module.exports.help = {
      Prefix: {
        name: "prefix",
        category: "owner",
        cooldown: 2,
        usage: "prefix <new Prefix>",
        description: "Setup Custom Prefix System",
      },
      Slash: {
        name: "prefix",
        description: "Setup Custom Prefix System",
        category: "owner",
      }
}