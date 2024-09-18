const { EmbedBuilder } = require("discord.js")
const { EmbedColor } = require("../../../Configuration/EmbedConfig")
const AntiSpam = require("../../../Databases/Schema/AntiSpam")
const Ranking = require("../../../Databases/Schema/Ranking/Ranking")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
          const rank = await Ranking.findOne({ Author: message.author.id })
          let antispam = await AntiSpam.findOne({ Author: message.author.id })

          const Warnings = antispam?.SpamWarnings == null ? antispam?.SpamWarnings : 0

          const embed = new EmbedBuilder()
          .setAuthor({ name: `Roverdev Community | Ranking System`, iconURL: Roverdev.user.displayAvatarURL() })
          .setColor(EmbedColor)
          .setDescription(`\n> Total Messages: \`${rank.AllMessages}\`\n> Ticket Messages: \`${rank.TicketMessages}\`\n> Spam Messages: \`${rank.SpamMessages}\`\n> Commands Ran: \`${rank.CommandsRan}\`\n> Giveaway messages: \`${rank.GiveawayMessages}\`\n> Voice TIme: \`${rank.VoiceChannelTime}\`\n\n**Anti Spam System:**\n> Spam Warnings: ${Warnings}\n> - 2 Warnings == timeout\n> - 4 warnings == kick\n> - 6 warnings = ban`) 

          message.reply({ embeds: [embed] })
   }
}