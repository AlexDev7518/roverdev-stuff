const { EmbedBuilder } = require("discord.js")
const { Premium } = require("../../Main-Bot/BotShop-System/Createbot/events/Premium/Shop-Premium")

module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
    const PremiumUser = args[0]

    if (!PremiumUser) return message.reply({ embeds: [
           new EmbedBuilder()
           .setAuthor({ name: `You Forgot to Mention a user!`, iconURL: "https://i.imgur.com/a2jNzYN.gif" })
           .setColor("#3dbeff")
    ] })

    client.settings.set(PremiumUser, true, "PremiumStatus")


    Premium(client, PremiumUser)


    return message.reply({embeds: [
        new EmbedBuilder()
        .setAuthor({ name: `Succesfully Gave that User Premium!`, iconURL: "https://i.imgur.com/cFihX4o.png" })
        .setColor("#3dbeff")
    ]})
}
module.exports.slashRun = async (interaction, client) => {
   // Code For Slash Here
}

module.exports.conf = {
     Prefix: {
        aliases: [],
        enabled: true,
        ownerOnly: true,
        AdminOnly: false,
        userPermissions: []   
     },
     Slash: {
        enabled: false,
        ownerOnly: true,
        AdminOnly: false,
        userPermissions: [],
        timeout: 5,
     }
}

module.exports.help = {
      Prefix: {
        name: "premium",
        category: "developers",
        cooldown: 2,
        usage: "premium",
        description: "give a user premium",
      },
      Slash: {
        name: "premium",
        description: "give a user premium",
        category: "developers",
      }
}