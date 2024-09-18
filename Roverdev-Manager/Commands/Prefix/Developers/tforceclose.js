const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js")
const { EmbedColor } = require("../../../Configuration/EmbedConfig")
const { ClosedCategorys } = require("../../../Configuration/ShopConfig/ShopConfiguration")
const { TicketOpenComponents } = require("../../../Configuration/TicketSystem/TicketConfig")
const CreateTicket = require("../../../Databases/Schema/TicketSystem/CreateTicket")
const { Transcript } = require("../../../Modules/Ticket-System/TranscriptFunction")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {

    const data = await CreateTicket.findOne({ Channel: args[0] })
           
    const channel = Roverdev.channels.cache.get(data.Channel)

    const ticketlogs = Roverdev.channels.cache.get("1040982086854647918")

    await Transcript(channel, message.author).then(async (res) => {
      if (res) {
         const MainEmbed = new EmbedBuilder()
         .setAuthor({  name: `Ticket System | ${Roverdev.user.username}`, iconURL: Roverdev.user.displayAvatarURL() })
         .setColor(EmbedColor)
         .setImage("https://i.imgur.com/qx9vpAl.png")
     
         
         channel.messages.fetch(data.MainMessage).then((msg) => {
          const row = new ActionRowBuilder()
          .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId("Ticket-Options")
                .setDisabled(true)
                .setPlaceholder("Click me to control the ticket")
                .setOptions( 
                   TicketOpenComponents.map(m => {
                          return {
                               label: m.label,
                               description: m.description,
                               value: m.value,
                               emoji: m.emoji
                          }
                   }) 
                )
          )
     
          msg.edit({ components: [row] })
      })
     
         const messages = await channel.messages.fetch()
     
         const allMessagesPostedByUser = messages.filter(msg => msg.author.bot !== true)
     
         let array = []
     
         const person = data.ClaimedUsers[0]
     
         data.ClaimedUsers.forEach(m => {
                const messages = allMessagesPostedByUser.filter(msg => msg.author.id == m).map(m => {
                           return `${m.content}`
                }).length
                if (m == person) {
                      array.push(`${Roverdev.users.cache.get(m).username} - ${messages} Messages (First Claimed)`)
                } else if (m !== person) {
                     array.push(`${Roverdev.users.cache.get(m).username} - ${messages} Messages`)
                }
         })
     
         const AuthorMessages = allMessagesPostedByUser.filter(msg => msg.author.id == data.Author).map(m => {
                 return `${m.content}`
        }).length
     
        let array1 = []
     
        array1.push(`${Roverdev.users.cache.get(data.Author).username} - ${AuthorMessages} Messages (Closed Ticket & Ticket Creator)`)
     
        setTimeout(async () => {
         MainEmbed.setDescription(`\`\`\`yml\nUsers In The Ticket:\n${array.map((user,index) => `${index+1}: ${user}`).join("\n")}\`\`\`\n\`\`\`yml\nMain Author:\n${array1.map((user,index) => `${index+1}: ${user}`)}\n2: ${Roverdev.users.cache.get(message.author.id).username} - Closed Ticket\`\`\`\n\`\`\`yml\nUsers Added To The Ticket:\n Soon\`\`\`\nTicket Transcript: ${res}`)
     
            const ClosedCategory1 = Roverdev.channels.cache.get(ClosedCategorys.ClosedCreation1)
            const ClosedCategory2 = Roverdev.channels.cache.get(ClosedCategorys.ClosedCreation2)
     
            let ClosedCategory = ``
     
            if (ClosedCategory1 && ClosedCategory1.children.cache.size < 50) {
               ClosedCategory = ClosedCategory1.id
            } else if (ClosedCategory2 && ClosedCategory2.children.cache.size < 50) {
               ClosedCategory = ClosedCategory2.id
            }
     
            const oldname = channel.name
     
            channel.setParent(ClosedCategory, { lockPermissions: true }).catch((e) => {})
            channel.setName(oldname.replace(data.TicketEmoji, "🔒")).catch((e) => {})
     
            await CreateTicket.findOneAndDelete({ Channel: channel.id })
     
            ticketlogs.send({ embeds: [MainEmbed] })
            Roverdev.users.cache.get(data.Author).send({ embeds: [MainEmbed] })
     
            setTimeout(() => {
               channel.send({
                   embeds: [
                           new EmbedBuilder()
                           .setTitle(`Ticket Got Closed Successfully (Force Closed)`)
                           .addFields([
                               { name: `Channel:`, value: `${channel}`, inline: true },
                               { name: `Closed By:`, value: `${message.author}`, inline: true }
                           ])
                           .setColor(EmbedColor)   
                   ],
            })
             message.channel.send({
              embeds: [
                 new EmbedBuilder()
                 .setTitle(`Ticket Got Closed Successfully (Force Closed)`)
                 .addFields([
                     { name: `Channel:`, value: `${channel}`, inline: true },
                     { name: `Closed By:`, value: `${message.author}`, inline: true }
                 ])
                 .setColor(EmbedColor)   
         ],
             })
           }, 500);
         }, 1000)
      }
   })
}
}