const TicketSystem = require("../../Models/TicketSystem")

module.exports = {
  cooldown: 3,
  Description: "",
 CommandRun: async (Rover, message, args, executor, language, emoji, embed, database) => {
          let Document = await TicketSystem.findOne({ GuildID: message.guild.id })

          await TicketSystem.findOneAndUpdate({ GuildID: message.guild.id }, { $unset: { TicketLogs: true } })
          
 }
}