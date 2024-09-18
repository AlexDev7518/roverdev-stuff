const { Events, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const { EmbedColor } = require("../../Configuration/EmbedConfig");
const { ClosedCategorys } = require("../../Configuration/ShopConfig/ShopConfiguration");
const { TicketOpenComponents } = require("../../Configuration/TicketSystem/TicketConfig");
const InvitedBy = require("../../Databases/Schema/InvitedBy");
const InviteTracker = require("../../Databases/Schema/InviteTracker");
const PendingPayment = require("../../Databases/Schema/PendingSystems/PendingPayment");
const balance = require("../../Databases/Schema/RoverCoins/balance");
const BotConfig = require("../../Databases/Schema/Shop/BotConfig");
const LockCreation = require("../../Databases/Schema/Shop/LockCreation");
const ShopCoolDowns = require("../../Databases/Schema/Shop/ShopCoolDowns");
const ShopCreation = require("../../Databases/Schema/Shop/ShopCreation");
const TotalBots = require("../../Databases/Schema/Shop/TotalBots");
const CreateTicket = require("../../Databases/Schema/TicketSystem/CreateTicket");
const { RunCommand, DeleteFolder } = require("../../Modules/Rover-BotShop/Functions");

module.exports = async (Roverdev, ban) => {

 console.log(ban)
 console.log(Roverdev)

  const member = ban.user


  if (member.user.bot) return;


  let ShopData = await ShopCreation.findOne({ BotOwner: member.user.id })

  if (ShopData) {
       const owner = Roverdev.users.cache.get(ShopData.BotOwner)

       const channel1 = Roverdev.channels.cache.get(ShopData.Channel)
     
       owner.send({
              embeds: [
                     new EmbedBuilder()
                            .setTitle(`Succesfully Closed {channel} - Auto Closed`.replace("{channel}", channel1.name))
                            .setColor("#3dbeff")
              ]
       })
     
       channel1.setParent("1040996273546866708", { LockPermission: true })
     
       channel1.setName(`🔏╎${owner.username}`)
     
       setTimeout(() => {
              if (channel1.parentId !== "1040996273546866708") {
                     interaction.channel.delete()
              }
       }, 5000);
     
       await ShopCreation.findOneAndDelete({ Channel: channel1.id })
       await LockCreation.findOneAndDelete({ Channel: channel1.id })
     
       channel1.send({
              embeds: [
                     new EmbedBuilder()
                            .setTitle("Succesfully Closed {channel}".replace("{channel}", channel1.name))
                            .setColor("#3dbeff")
              ]
       })
  }
           

         const data1 = await CreateTicket.findOne({ Author: member.id })

        if (data1) {
              const channel = Roverdev.channels.cache.get(data1.Channel)

              const { createWriteStream } = require('fs');
      
              const ticketlogs = Roverdev.channels.cache.get("1040982086854647918")
      
              const MainEmbed = new EmbedBuilder()
              .setAuthor({  name: `Ticket System | ${Roverdev.user.username}`, iconURL: Roverdev.user.displayAvatarURL() })
              .setColor(EmbedColor)
              .setImage("https://i.imgur.com/qx9vpAl.png")
      
              
              channel.messages.fetch(data1.MainMessage).then((msg) => {
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
      
              const person = data1.ClaimedUsers[0]
      
              data1.ClaimedUsers.forEach(m => {
                     const messages = allMessagesPostedByUser.filter(msg => msg.author.id == m).map(m => {
                                return `${m.content}`
                     }).length
                     if (m == person) {
                           array.push(`${Roverdev.users.cache.get(m).username} - ${messages} Messages (First Claimed)`)
                     } else if (m !== person) {
                          array.push(`${Roverdev.users.cache.get(m).username} - ${messages} Messages`)
                     }
              })
      
              const AuthorMessages = allMessagesPostedByUser.filter(msg => msg.author.id == data1.Author).map(m => {
                      return `${m.content}`
             }).length
      
             let array1 = []
      
             array1.push(`${Roverdev.users.cache.get(data1.Author).username} - ${AuthorMessages} Messages (Ticket Creator)`)
      
             setTimeout(async () => {
                 MainEmbed.setDescription(`\`\`\`yml\nUsers In The Ticket:\n${array.map((user,index) => `${index+1}: ${user}`).join("\n")}\`\`\`\n\`\`\`yml\nMain Author:\n${array1.map((user,index) => `${index+1}: ${user}`)}\n2: Roverdev Director - Closed Ticket\`\`\`\n\`\`\`yml\nUsers Added To The Ticket:\n Soon\`\`\`\nTicket Links:\n> Ticket Logs: https://ticketlogs.roverdev.xyz/\n> Ticket Dash https://ticketdash.roverdev.xyz`)
      
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
                 channel.setName(oldname.replace(data1.TicketEmoji, "🔒")).catch((e) => {})
      
                 await CreateTicket.findOneAndDelete({ Channel: channel.id })
      
                 ticketlogs.send({ embeds: [MainEmbed] })
      
                 setTimeout(() => {
                    channel.send({
                        embeds: [
                                new EmbedBuilder()
                                .setTitle(`Ticket Got Closed Successfully (Auto Closed)`)
                                .addFields([
                                    { name: `Channel:`, value: `${channel}`, inline: true },
                                    { name: `Closed By:`, value: `${Roverdev.user}`, inline: true }
                                ])
                                .setColor(EmbedColor)   
                        ],
                 })
                }, 500);
           }, 1900)
        }

     const data = await InvitedBy.findOne({ Author: member.user.id })

     const Channel = Roverdev.channels.cache.get("935190175510835290")
     const Channel1 = Roverdev.channels.cache.get("1080740198045990992")
          

  setTimeout(async () => {     
             if (data) {
                    const user = Roverdev.users.cache.get(data.InvitedBy)
     
                    let coins = await require("../../Databases/Schema/RoverCoins/TotalCoins").findOne({ Author: user.id })
     
                    if (!coins) {
                         const data = await require("../../Databases/Schema/RoverCoins/TotalCoins").create({
                               Author: user.id
                         })
                         data.save()
                
                         coins = await require("../../Databases/Schema/RoverCoins/TotalCoins").findOne({ Author: user.id })
                    }
                
                    await require("../../Databases/Schema/RoverCoins/TotalCoins").findOneAndUpdate({ Author: user.id }, { $set: { InviteCoins: Number(coins.InviteCoins)-200 } })
     
                    const joins = await InviteTracker.findOne({ Author: user.id })

                    if (joins.Leaves.includes(member.user.id)) {
                     Channel1.send({ content: `<a:MemberBanned:1080740943956803595> Goodbye ${member} From \`${member.guild.name}\`\n> Invited By: \`${user}\` - Uses: \`${joins.uses}\`\n> -  Invites:  \`${joins.Joins}\`  |  Fakes: \`${joins.Fakes}\`  | Leaves: \`${joins.Leaves.length}\`` })              
                         return console.log(`they left the server already, if they join again its a fake.`)
                    }
     
                    let RealJoins = `${joins.Joins-1}`
     
                   if (RealJoins.includes("-")) RealJoins = 0
     
                    await InviteTracker.findOneAndUpdate({ Author: user.id }, { $set: { Joins: RealJoins } })
     
                    const array = joins.Leaves
                    array.push(member.user.id)
                    await InviteTracker.findOneAndUpdate({ Author: user.id }, { $set: { Leaves: array } })
     
                    await InvitedBy.findOneAndDelete({ Author: member.id })

                    joins = await InviteTracker.findOne({ Author: user.id })

                    Channel1.send({ content: `<a:MemberBanned:1080740943956803595> Goodbye ${member} From \`${member.guild.name}\`\n> Invited By: \`${user}\` - Uses: \`${joins.uses}\`\n> -  Invites:  \`${joins.Joins}\`  |  Fakes: \`${joins.Fakes}\`  | Leaves: \`${joins.Leaves.length}\`` })             
     
                    const stuff = [
                     "AntiSpam",
                     "balance",
                     "Invitesystem",
                     "Premium",
                     "Racks",
                     "BoosterRack",
                     "FreeRack",
                     "PremiumRack1",
                     "PremiumRack2",
                     "PremiumRack3",
                     "Rack1", "Rack2", "Rack3", "Rack4", "Rack5",
                     "Ranking",
                     "RcCooldowns",
                     "TotalCoins",
                     "Ranking",
                     "ShopRules",
                     "UseFullLinks"
                ] 
                
                stuff.forEach(m => {
                          const data = Roverdev[m].findOne({ Author: member.id })
      
                          if (!data) return console.log(`Seems there is nothing for ${member.id} in ${m}`)
      
                          if (data) {
                                  Roverdev[m].findOneAndDelete({ Author: member.id })
                                  return console.log(`Found data for ${member.user.username} in ${m}, and deleted!` )
                          }
                })
                return;
             }

             
             Channel.send({ content: `<a:MemberBanned:1080740943956803595> ${member} Got Banned From \`${member.guild.name}\`\n> Invited Using: \`<https://discord.gg/roverdev>\`\n> Ban Reason: ${ban.reason}` })
             Channel1.send({ content: `<a:MemberBanned:1080740943956803595> ${member} Got Banned From \`${member.guild.name}\`\n> Invited Using: \`<https://discord.gg/roverdev>\`\n> Ban Reason: ${ban.reason}`})
          
  }, 1000);
}