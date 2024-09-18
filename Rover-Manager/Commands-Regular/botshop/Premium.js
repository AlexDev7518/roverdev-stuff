// const  { EmbedBuilder } = require("discord.js")
// const { Premium } = require("../../Main-Bot/BotShop-System/Shop-Premium")
module.exports.run = async (client, message, args, cmdUser,prefix) => {

    // const embed = new EmbedBuilder()


    // const PremiumUser = args[0]

    // if (!PremiumUser) return message.reply({ embeds: [
    //        new EmbedBuilder()
    //        .setAuthor({ name: `You Forgot to Mention a user!`, iconURL: "https://i.imgur.com/a2jNzYN.gif" })
    //        .setColor("#3dbeff")
    // ] })

    // client.settings.set(PremiumUser, true, "PremiumStatus")


    // Premium(client, PremiumUser)


    // return message.reply({embeds: [
    //     new EmbedBuilder()
    //     .setAuthor({ name: `Succesfully Gave that User Premium!`, iconURL: "https://i.imgur.com/cFihX4o.png" })
    //     .setColor("#3dbeff")
    // ]})
}

module.exports.conf = {
   aliases: ["premium"],
   enabled: true,
   ownerOnly: true,
   AdminOnly: false
}

module.exports.help = {
    Roverdev: {
      name: "premium",
      category: "botshop",
      cooldown: 2,
      usage: "premium",
      description: "Premium",
    }
}