const { EmbedBuilder } = require('discord.js')
const configuration = require('../../../configuration')
module.exports = {
  name: "boosterperks",
  category: "Developers",
  cooldown: 2,
  Description: "",
  RunCommand: async (Rover, message, args, executor, language, embed, database) => {
    if (message.author.id !== "663442537222242306") return
         const embed1 = new EmbedBuilder()
         .setAuthor({ name: `Roverdev - Booster Perks`, iconURL: message.guild.iconURL() })
         .setColor("#ff00dc")
         .setImage("https://i.imgur.com/6XVcInA.png")
         .setTitle(`Roverdev's Booster Perks - Claim Today!`)
         .setThumbnail("https://cdn.discordapp.com/emojis/1103032558998016081.gif?size=96&quality=lossless")
         .setDescription(`> Send Images / Gif Linkes in <#1085500226711863297>\n\n> Change your Nickname in this Guild!\n\n> Acccess to all VIP Channels\n> - <#1085511825363308544>\n> - <#1085511839376482304>\n> -  <#1085511851233792020>\n\n> Lots of Private Codes We Give for Boosters only!`)

         Rover.channels.cache.get(message.guild.channels.cache.get("1099092311457153117").id).send({ embeds: [embed1] }).then((msg) => {
                 message.reply({ content: `Successfully Sent the message` })
         })
  }
}