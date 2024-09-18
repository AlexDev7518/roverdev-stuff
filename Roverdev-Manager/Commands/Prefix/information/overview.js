const { EmbedBuilder } = require("discord.js")
const { EmbedColor } = require("../../../Configuration/EmbedConfig")
const AntiSpam = require("../../../Databases/Schema/AntiSpam")
const InviteTracker = require("../../../Databases/Schema/InviteTracker")
const Racks = require("../../../Databases/Schema/Racks")
const Ranking = require("../../../Databases/Schema/Ranking/Ranking")
const balance = require("../../../Databases/Schema/RoverCoins/balance")
const TotalCoins = require("../../../Databases/Schema/RoverCoins/TotalCoins")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {

        let embeds = []

         const mainEmbed = new EmbedBuilder()
         .setAuthor({ name: `User Overview | Profile System`, iconURL: Roverdev.user.displayAvatarURL() })
         .setColor(EmbedColor)
         .setDescription(`Welcome to Roverdev Profile Overview System\n> This is where you can check everything coming soon!`)

         message.channel.send({
              embeds: [mainEmbed]
         })

        
   }
}