const CreateTicket = require("../../Databases/Schema/TicketSystem/CreateTicket")
const GuildStats = require("../../Databases/Schema/TicketSystem/GuildStats")
const { Roverdev } = require("../../main")

async function Transcript(channel, user) {
      return new Promise(async (res,rej) => {
        let allMessages = await channel.messages.fetch()
        let ticketContent = allMessages.filter(
          m =>
            m.content && m.author.id != Roverdev.user.id && !m.author.bot
        ).reverse()
      
        const data = await CreateTicket.findOne({ Channel: channel.id })
        let data3 = await GuildStats.findOne({ Guild: channel.guild.id })
      
        await GuildStats.findOneAndUpdate({ Guild: channel.guild.id }, { $set: { TranscriptNumber: Number(data3.TranscriptNumber) + 1 } })
      
        data3 = await GuildStats.findOne({ Guild: channel.guild.id })
      
        const transcript = {
          TranscriptNumber: data3.TranscriptNumber,
          id: channel.id,
          CreatedData: Number(data.CreatedAt),
          number: data.TicketId,
          TicketType: data.TicketType,
          date: Date.now(),
          by: {
            id: user.id,
            tag: user.tag,
            avatar: user.displayAvatarURL({ dynamic: true }),
            bot: user.bot ? true : false
          },
          content: {
            user: ticketContent.map(m =>
              m.author.displayAvatarURL({ dynamic: true })
            ),
            message: ticketContent.map(
              m =>
                msToTime(m.createdTimestamp) +
                ' | ' +
                m.author.tag +
                ': ' +
                m.content
            )
          }
        }
      
      
        const data2 = await GuildStats.findOne({ Guild: channel.guild.id })
      
        data2.ClosedTickets.push(transcript)
        await data2.save()

        function msToTime(ms) {
          let fullFill = (a, limit) =>
            ('0'.repeat(69) + a.toString()).slice(limit ? -limit : -2)
        
          let daet = new Date(ms)
        
          let day = fullFill(daet.getDate())
          let month = fullFill(daet.getMonth())
          let year = fullFill(daet.getFullYear(), 4)
        
          let hours = fullFill(daet.getHours())
          let mins = fullFill(daet.getMinutes())
          let secs = fullFill(daet.getSeconds())
        
          return `${day}/${month}/${year} ${hours}:${mins}:${secs}`
        }
    
        return res(`https://roverdev.xyz/ticketlogs/?ticket=${transcript.TranscriptNumber}`)
      })
}

module.exports = {
     Transcript
}