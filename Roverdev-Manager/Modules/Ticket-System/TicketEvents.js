const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js")
const { EmbedColor } = require("../../Configuration/EmbedConfig")
const { ClosedCategorys } = require("../../Configuration/ShopConfig/ShopConfiguration")
const { TicketSettings, TicketAdminComponents, TicketAdminComponentsRemove, TicketOpenComponents } = require("../../Configuration/TicketSystem/TicketConfig")
const CreateTicket = require("../../Databases/Schema/TicketSystem/CreateTicket")
const GuildStats = require("../../Databases/Schema/TicketSystem/GuildStats")
const { Transcript } = require("./TranscriptFunction")

module.exports = async (Roverdev) => {
    Roverdev.on(require("discord.js").Events.InteractionCreate, async (interaction) => {

               if (interaction.values == "AdminClaim-Ticket") {
                    const ClaimedUsers = await CreateTicket.findOne({ Channel: interaction.channel.id })
      
                    if (!interaction.member.roles.cache.has(TicketSettings[`${ClaimedUsers.TicketType}`.replace("-", "")].Roles[0]?.id) && !interaction.channel.name.includes("👑")  && !interaction.channel.name.includes("❗")) {

                            if (interaction.member.roles.cache.has(TicketSettings[`${ClaimedUsers.TicketType}`.replace("-", "")].Roles[1]?.id)) return
                         
                            return interaction.reply({ content: `You need to have <@&${TicketSettings[`${ClaimedUsers.TicketType}`.replace("-", "")].Roles[1].id}> To Claim this ticket.`, ephemeral: true})
                    }
      
                    if (interaction.channel.name.includes("👑") && !interaction.member.roles.cache.has("920292436641718312")) return  interaction.reply({ content: `You need to have Co-Management To Claim.`, ephemeral: true })
                    if (interaction.channel.name.includes("❗") && !interaction.member.roles.cache.has("920292440223662100")) return  interaction.reply({ content: `You need to have Moderator To Claim.`, ephemeral: true })
      
                    if (ClaimedUsers.ClaimedUsers.includes(interaction.user.id)) {
                           return interaction.reply({ content: `Seems you Already Claimed the ticket, you can't claim it twice!`, ephemeral: true })
                    }
      
                    if (ClaimedUsers.Author == interaction.user.id) {
                          return interaction.reply({ content: `You Are Not Alowed To Claim your own Ticket!`, ephemeral: true })
                    }
                    
                    let array = ["663442537222242306", "647962247666073610"]
      
                    if (ClaimedUsers?.TicketClaimTime && interaction.channel.parentId !== "1058881804490256384" && interaction.channel.parentId !== "1058882074347581510" && !array.includes(interaction.user.id)) {
                        return interaction.reply({ content: `Seems Someone already claimed the ticket <t:${Math.floor(ClaimedUsers.TicketClaimTime/1000)}:R> ***You Can Claim The ticket <t:${Math.floor(ClaimedUsers.TicketClaimWaitTime/1000)}:R>*** `, ephemeral: true })
                     }
                    // Now they claim
      
                    if (ClaimedUsers.TicketType == "Youtube-Ticket") {
                           const row = new ActionRowBuilder()
                           .addComponents(
                                 new StringSelectMenuBuilder()
                                 .setCustomId("Ticket-Options")
                                 .setPlaceholder("Click me to control the ticket")
                                 .setOptions( 
                                    TicketAdminComponentsRemove.map(m => {
                                           return {
                                                label: m.label,
                                                description: m.description,
                                                value: m.value,
                                                emoji: m.emoji
                                           }
                                    }) 
                                 )
                           )
      
                           interaction.channel.messages.fetch(interaction.message.id).then((msg) => {
                                    msg.edit({ components: [row] })
                           })
                         }
      
                    const data = ClaimedUsers.ClaimedUsers
                        data.push(interaction.user.id)
                        await CreateTicket.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { ClaimedUsers: data } })
                 
                   interaction.deferUpdate()
      
                   interaction.channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true, SendMessages: true})
      
                   interaction.channel.send({
                         embeds: [
                               new EmbedBuilder()
                               .setAuthor({ name: `${interaction.user.username} Claimed Ticket`, iconURL: interaction.user.displayAvatarURL() })
                               .setColor(EmbedColor)
                               .setDescription(`${interaction.user} Claimed ${interaction.channel} `)
                         ]
                   })
                 }
                 if (interaction.values == "Claim-Ticket") {
                         const ClaimedUsers = await CreateTicket.findOne({ Channel: interaction.channel.id })
      
      
                         if (!interaction.member.roles.cache.has(TicketSettings[`${ClaimedUsers.TicketType}`.replace("-", "")].Roles[0]?.id) && !interaction.channel.name.includes("👑")  && !interaction.channel.name.includes("❗")) {
                              if (interaction.member.roles.cache.has(TicketSettings[`${ClaimedUsers.TicketType}`.replace("-", "")].Roles[1]?.id)) {
                                   if (interaction.channel.name.includes("👑") && !interaction.member.roles.cache.has("920292436641718312")) return  interaction.reply({ content: `You need to have Co-Management To Claim.`, ephemeral: true })
                                   if (interaction.channel.name.includes("❗") && !interaction.member.roles.cache.has("920292440223662100")) return  interaction.reply({ content: `You need to have Moderator To Claim.`, ephemeral: true })
                   
                                      if (ClaimedUsers.ClaimedUsers.includes(interaction.user.id)) {
                                             return interaction.reply({ content: `Seems you Already Claimed the ticket, you can't claim it twice!`, ephemeral: true })
                                      }
                   
                                      if (ClaimedUsers.Author == interaction.user.id) {
                                            return interaction.reply({ content: `You Are Not Alowed To Claim your own Ticket!`, ephemeral: true })
                                      }
             
                                      let array = ["663442537222242306", "647962247666073610"]
                   
                                      if (ClaimedUsers?.TicketClaimTime && interaction.channel.parentId !== "1058881804490256384" && interaction.channel.parentId !== "1058882074347581510" && !array.includes(interaction.user.id)) {
                                               return interaction.reply({ content: `Seems Someone already claimed the ticket <t:${Math.floor(ClaimedUsers.TicketClaimTime/1000)}:R> ***You Can Claim The ticket <t:${Math.floor(ClaimedUsers.TicketClaimWaitTime/1000)}:R>*** `, ephemeral: true })
                                      }
                   
                                      if (ClaimedUsers.TicketType !== "Youtube-Ticket") {
                                       const ms = require("ms")
                       
                                       let day = ms("20min")
                                 
                                       day = Date.now() + day
                   
                                        await CreateTicket.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { TicketClaimTime: Date.now(), TicketClaimWaitTime: day } })
                                      }
                   
                                      if (ClaimedUsers.TicketType == "Youtube-Ticket") {
                                        const row = new ActionRowBuilder()
                                        .addComponents(
                                              new StringSelectMenuBuilder()
                                              .setCustomId("Ticket-Options")
                                              .setPlaceholder("Click me to control the ticket")
                                              .setOptions( 
                                                 TicketAdminComponents.map(m => {
                                                        return {
                                                             label: m.label,
                                                             description: m.description,
                                                             value: m.value,
                                                             emoji: m.emoji
                                                        }
                                                 }) 
                                              )
                                        )
                   
                                        interaction.channel.messages.fetch(interaction.message.id).then((msg) => {
                                                 msg.edit({ components: [row] })
                                        })
                                      }
                   
                                      // Now they claim
                   
                                      const data = ClaimedUsers.ClaimedUsers
                                          data.push(interaction.user.id)
                                          await CreateTicket.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { ClaimedUsers: data } })
                                   
                                     interaction.deferUpdate()
                   
                                     interaction.channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true, SendMessages: true})
                   
                                     interaction.channel.send({
                                           embeds: [
                                                 new EmbedBuilder()
                                                 .setAuthor({ name: `${interaction.user.username} Claimed Ticket`, iconURL: interaction.user.displayAvatarURL() })
                                                 .setColor(EmbedColor)
                                                 .setDescription(`${interaction.user} Claimed ${interaction.channel} `)
                                           ]
                                     })
                              }
                              return interaction.reply({ content: `You need to have <@&${TicketSettings[`${ClaimedUsers.TicketType}`.replace("-", "")].Roles[1].id}> To Claim this ticket.`, ephemeral: true})
                       }
        
                      if (interaction.channel.name.includes("👑") && !interaction.member.roles.cache.has("920292436641718312")) return  interaction.reply({ content: `You need to have Co-Management To Claim.`, ephemeral: true })
                      if (interaction.channel.name.includes("❗") && !interaction.member.roles.cache.has("920292440223662100")) return  interaction.reply({ content: `You need to have Moderator To Claim.`, ephemeral: true })
      
                         if (ClaimedUsers.ClaimedUsers.includes(interaction.user.id)) {
                                return interaction.reply({ content: `Seems you Already Claimed the ticket, you can't claim it twice!`, ephemeral: true })
                         }
      
                         if (ClaimedUsers.Author == interaction.user.id) {
                               return interaction.reply({ content: `You Are Not Alowed To Claim your own Ticket!`, ephemeral: true })
                         }

                         let array = ["663442537222242306", "647962247666073610"]
      
                         if (ClaimedUsers?.TicketClaimTime && interaction.channel.parentId !== "1058881804490256384" && interaction.channel.parentId !== "1058882074347581510" && !array.includes(interaction.user.id)) {
                                  return interaction.reply({ content: `Seems Someone already claimed the ticket <t:${Math.floor(ClaimedUsers.TicketClaimTime/1000)}:R> ***You Can Claim The ticket <t:${Math.floor(ClaimedUsers.TicketClaimWaitTime/1000)}:R>*** `, ephemeral: true })
                         }
      
                         if (ClaimedUsers.TicketType !== "Youtube-Ticket") {
                          const ms = require("ms")
          
                          let day = ms("20min")
                    
                          day = Date.now() + day
      
                           await CreateTicket.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { TicketClaimTime: Date.now(), TicketClaimWaitTime: day } })
                         }
      
                         if (ClaimedUsers.TicketType == "Youtube-Ticket") {
                           const row = new ActionRowBuilder()
                           .addComponents(
                                 new StringSelectMenuBuilder()
                                 .setCustomId("Ticket-Options")
                                 .setPlaceholder("Click me to control the ticket")
                                 .setOptions( 
                                    TicketAdminComponents.map(m => {
                                           return {
                                                label: m.label,
                                                description: m.description,
                                                value: m.value,
                                                emoji: m.emoji
                                           }
                                    }) 
                                 )
                           )
      
                           interaction.channel.messages.fetch(interaction.message.id).then((msg) => {
                                    msg.edit({ components: [row] })
                           })
                         }
      
                         // Now they claim
      
                         const data = ClaimedUsers.ClaimedUsers
                             data.push(interaction.user.id)
                             await CreateTicket.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { ClaimedUsers: data } })
                      
                        interaction.deferUpdate()
      
                        interaction.channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true, SendMessages: true})
      
                        interaction.channel.send({
                              embeds: [
                                    new EmbedBuilder()
                                    .setAuthor({ name: `${interaction.user.username} Claimed Ticket`, iconURL: interaction.user.displayAvatarURL() })
                                    .setColor(EmbedColor)
                                    .setDescription(`${interaction.user} Claimed ${interaction.channel} `)
                              ]
                        })
                 }
      
                 if (interaction.values == "Ticket-Control") {
                      const ClaimedUsers = await CreateTicket.findOne({ Channel: interaction.channel.id })
                         if (!ClaimedUsers.ClaimedUsers.includes(interaction.user.id)) {
                               if (!interaction.member.roles.cache.has("1005978927421980702")) {
                                      return interaction.reply({ content: `Only Staff is alowed to select this.`, ephemeral: true})
                               } else {
                                  return interaction.reply({ content: `Please Claim the Ticket Before Selecting This.`, ephemeral: true})
                               }
                         }
                         const embed = new EmbedBuilder()
                             .setAuthor({ name: `Ticket System | ${Roverdev.user.username}` })
                             .setTitle("***Please Select a Control Option Below.***")
                             .setDescription(`> <:padlock:1058276994250461254> - Close Ticket\n> ❗ - Important ticket\n> <:Management:1058538248193970196>  - Owner and Founder Ticket`)
                             .setColor(EmbedColor)
                             .setThumbnail(Roverdev.user.displayAvatarURL())
      
                             const button1 = new ButtonBuilder()
                             .setEmoji("1058276994250461254")
                             .setLabel("  ")
                             .setStyle(ButtonStyle.Success)
                             .setCustomId("Close-Ticket")
      
                             const button2 = new ButtonBuilder()
                             .setEmoji("❗")
                             .setLabel("  ")
                             .setStyle(ButtonStyle.Danger)
                             .setCustomId("Important-Ticket")
      
                             const button3 = new ButtonBuilder()
                             .setEmoji("1058538248193970196")
                             .setLabel("  ")
                             .setStyle(ButtonStyle.Primary)
                             .setCustomId("Owner-Ticket")
      
                             if (interaction.channel.name.includes("✅")) button1.setDisabled(true), button2.setDisabled(true), button3.setDisabled(true)
                             if (interaction.channel.name.includes("❗")) button2.setDisabled(true)
                             if (interaction.channel.name.includes("👑")) button3.setDisabled(true)
      
                       const row1 = new ActionRowBuilder().addComponents(button1,button2,button3)
      
                      await interaction.reply({ embeds: [embed], components: [row1], ephemeral: true })
                 }

                 if (interaction.customId == "Close-Ticket") {
                         await interaction.update({ components: [], content: `Ticket has Been Finished, Thanks For Supporting the Ticket!`, embeds: [] })


                        const ClaimedUsers = await CreateTicket.findOne({ Channel: interaction.channel.id })
                        const channel = Roverdev.channels.cache.get(interaction.channel.id)
                        
                        await CreateTicket.findOneAndUpdate({ Channel: channel.id }, { $set: { TicketEmoji: "✅" } })

                        const oldname = interaction.channel.name

                        await channel.setName(oldname.replace(ClaimedUsers.TicketEmoji, "✅"))

                        const ms = require("ms")
    
                        let day = ms("1 day")
                  
                        day = Date.now() + day

                        await CreateTicket.findOneAndUpdate({ Channel: channel.id }, { $set: { TicketFinishedTime: day } })

                        channel.send({
                                  content: `**Greetings <@!${ClaimedUsers.Author}>,**\n\n> *Our Team's Task is done with you, If you want to close the ticket just click the buttons below and have a great day!*\n> - Ticket Will Automaticly Close <t:${Math.floor(day/1000)}:R>\n\n ***Kind Regards,***\n> Roverdev Community | Roverdev - Team`,
                                  components: [
                                   new ActionRowBuilder().addComponents(
                                              new ButtonBuilder().setLabel("Close Ticket").setCustomId("Close-Ticket-Finished").setStyle(ButtonStyle.Danger).setEmoji("1015745934090575964"),
                                   )
                             ]
                         })

                         channel.messages.fetch(ClaimedUsers.MainMessage).then((msg) => {
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
                 }

                 if (interaction.customId == "Close-Ticket-Finished") {
                      const ClaimedUsers = await CreateTicket.findOne({ Channel: interaction.channel.id })
                      const channel = Roverdev.channels.cache.get(interaction.channel.id)

                      if (interaction.user.id !== ClaimedUsers.Author) {
                         return interaction.reply({ 
                                content: `Only <@${ClaimedUsers.Author}> is alowed to press this button.`,
                                ephemeral: true
                          })
                }

                      await Transcript(interaction.channel, interaction.user).then(async (res) => {
                              if (res) {
         
                               interaction.reply({content: `<a:VerifedPurple:1009505593687560224> ***Now Closing the Ticket***\n> *Make sure to Leave Feedback: <#1011647908162060339>*`, ephemeral: true})
         
                               const { createWriteStream } = require('fs');
         
                               interaction.message.edit({ components: [] })
                               const ticketlogs = Roverdev.channels.cache.get("1040982086854647918")
         
                               const MainEmbed = new EmbedBuilder()
                               .setAuthor({  name: `Ticket System | ${Roverdev.user.username}`, iconURL: Roverdev.user.displayAvatarURL() })
                               .setColor(EmbedColor)
                               .setThumbnail(Roverdev.user.displayAvatarURL())
                               .setImage("https://i.imgur.com/qx9vpAl.png")
         
                               const messages = await interaction.channel.messages.fetch()
         
                               const allMessagesPostedByUser = messages.filter(msg => msg.author.bot !== true)
         
                               let array = []
         
                               const person = ClaimedUsers.ClaimedUsers[0]
         
                               ClaimedUsers.ClaimedUsers.forEach(m => {
                                      const messages = allMessagesPostedByUser.filter(msg => msg.author.id == m).map(m => {
                                                 return `${m.content}`
                                      }).length
                                      if (m == person) {
                                            array.push(`${Roverdev.users.cache.get(m).username} - ${messages} Messages (First Claimed)`)
                                      } else if (m !== person) {
                                           array.push(`${Roverdev.users.cache.get(m).username} - ${messages} Messages`)
                                      }
                               })
         
                               const AuthorMessages = allMessagesPostedByUser.filter(msg => msg.author.id == ClaimedUsers.Author).map(m => {
                                       return `${m.content}`
                              }).length
         
                              let array1 = []
         
                              array1.push(`${Roverdev.users.cache.get(ClaimedUsers.Author).username} - ${AuthorMessages} Messages (Closed Ticket)`)
         
                              setTimeout(async () => {
                                  MainEmbed.setDescription(`\`\`\`yml\nUsers In The Ticket:\n${array.map((user,index) => `${index+1}: ${user}`).join("\n")}\`\`\`\n\`\`\`yml\nMain Author:\n${array1.map((user,index) => `${index+1}: ${user}`)}\`\`\`\n\`\`\`yml\nUsers Added To The Ticket:\n Soon\`\`\`\nTicket Transcript: ${res}`)
            
                                  const ClosedCategory1 = Roverdev.channels.cache.get(ClosedCategorys.ClosedCreation1)
                                  const ClosedCategory2 = Roverdev.channels.cache.get(ClosedCategorys.ClosedCreation2)
                    
                                  let ClosedCategory = ``
                    
                                  if (ClosedCategory1 && ClosedCategory1.children.cache.size < 50) {
                                     ClosedCategory = ClosedCategory1.id
                                  } else if (ClosedCategory2 && ClosedCategory2.children.cache.size < 50) {
                                     ClosedCategory = ClosedCategory2.id
                                  }
            
                                  const oldname = interaction.channel.name
            
                                  channel.setParent(ClosedCategory, { lockPermissions: true }).catch((e) => {})
                                  channel.setName(oldname.replace(ClaimedUsers.TicketEmoji, "🔒")).catch((e) => {})
            
                                  await CreateTicket.findOneAndDelete({ Channel: interaction.channel.id })
         
                                  ticketlogs.send({ embeds: [MainEmbed] })
                                  Roverdev.users.cache.get(ClaimedUsers.Author).send({ embeds: [MainEmbed] })
            
                                  setTimeout(() => {
                                     channel.send({
                                         embeds: [
                                                 new EmbedBuilder()
                                                 .setTitle(`Ticket Got Closed Successfully (User Closed)`)
                                                 .addFields([
                                                     { name: `Channel:`, value: `${channel}`, inline: true },
                                                     { name: `Closed By:`, value: `${interaction.user}`, inline: true }
                                                 ])
                                                 .setColor(EmbedColor)   
                                         ],
                                  })
                                 }, 500);
                              }, 1900);
                              }
                      })
                 }

                 if (interaction.customId == "Important-Ticket") {
      
                    const ClaimedUsers = await CreateTicket.findOne({ Channel: interaction.channel.id })

                    const embed = new EmbedBuilder()
                     .setTitle("❗ Setting the Ticket as Important...")
                     .setDescription(`You will get a dm soon.`)
                     .setColor(EmbedColor)

                     interaction.reply({ embeds: [embed], ephemeral: true })

                     const channel = Roverdev.channels.cache.get(interaction.channel.id)
                     
                     const oldname = interaction.channel.name

                          channel.setName(oldname.replace(ClaimedUsers.TicketEmoji, "❗"))
                              channel.setTopic(`Opener: ${ClaimedUsers.Author} | TicketId: ${ClaimedUsers.TicketId}  | Ticket Type: ${ClaimedUsers.TicketType}-Important`)
                                   channel.setParent("1058881804490256384", { lockPermissions:true })

                          channel.send({ content: `<@&920292440223662100>, <@&920292438294294538>` }).then((msg) => {
                               setTimeout(() => {
                                    msg.edit({ content: `:thumbsup: Successfully Pinged Mods & Admins` })
                               }, 500);
                        })

                        let Premissions = [
                             {
                                  id: ClaimedUsers.Author,
                                  allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages]
                            },
                            {
                                 id: interaction.guild.roles.everyone,
                                 deny: [PermissionFlagsBits.ViewChannel]
                            },
                    ]
    
                       TicketSettings[`ReportTicket`].Roles.forEach(m => {
                                  Premissions.push({ id: m.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]})
                          })

                        
                        setTimeout(() => {
                             channel.permissionOverwrites.set(Premissions);
                         }, 500);

                         embed.setTitle(":thumbsup: Succesfully Set the ticket as Important")

                         channel.messages.fetch(ClaimedUsers.MainMessage).then((msg) => {
                             const row = new ActionRowBuilder()
                             .addComponents(
                                   new StringSelectMenuBuilder()
                                   .setCustomId("Ticket-Options")
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

                        interaction.user.send({ embeds: [new EmbedBuilder().setTitle(":thumbsup: Successfully Set the ticket as Important").setColor(EmbedColor)], ephemeral: true}).catch(error => {})

                        await CreateTicket.findOneAndUpdate({ Channel: channel.id }, { $set: { TicketEmoji: "❗" } })
                 }  
                 if (interaction.customId == "Owner-Ticket") {
                    const ClaimedUsers = await CreateTicket.findOne({ Channel: interaction.channel.id })

                    const channel = interaction.channel

                    const embed = new EmbedBuilder()
                     .setTitle("👑 Setting the Ticket as Owner Only...")
                     .setDescription(`You will get a dm soon.`)
                     .setColor(EmbedColor)

                     interaction.reply({ embeds: [embed], ephemeral: true })
                     
                     const oldname = channel.name
                     
                          channel.setName(oldname.replace(ClaimedUsers.TicketEmoji, "👑"))
                           channel.setTopic(`Opener: ${ClaimedUsers.Author} | TicketId: ${ClaimedUsers.TicketId}  | Ticket Type: ${ClaimedUsers.TicketType}-Owner`)
                              channel.setParent("1058882074347581510")


                              channel.send({ content: `<@&920292436641718312>, <@&920292435853185054>, <@&1016060228866953236>` }).then((msg) => {
                                   setTimeout(() => {
                                        msg.edit({ content: `:thumbsup: Successfully Pinged Owners & Founders ` })
                                   }, 500);
                            })
   
                            let Premissions = [
                                 {
                                      id: ClaimedUsers.Author,
                                      allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages]
                                },
                                {
                                     id: interaction.guild.roles.everyone,
                                     deny: [PermissionFlagsBits.ViewChannel]
                                },
                        ]
   
                            
                              channel.permissionOverwrites.set(Premissions);
   
   
                             channel.messages.fetch(ClaimedUsers.MainMessage).then((msg) => {
                                 const row = new ActionRowBuilder()
                                 .addComponents(
                                       new StringSelectMenuBuilder()
                                       .setCustomId("Ticket-Options")
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
   
                           interaction.user.send({ embeds: [new EmbedBuilder().setTitle(":thumbsup: Successfully Set the ticket as Owner-Only").setColor(EmbedColor)], ephemeral: true}).catch(error => {})

                            await CreateTicket.findOneAndUpdate({ Channel: channel.id }, { $set: { TicketEmoji: "👑" } })
                 }
    })

    /**
     * @End_TimeOutForTicket
     */

    setInterval(async() => {
        const data = await CreateTicket.find()
        data.forEach(async data2 => {
               if (data2.TicketClaimWaitTime !== null && data2.TicketClaimWaitTime < Date.now()) {
                       await CreateTicket.findOneAndUpdate({ Channel: data2.Channel }, { $set: { TicketClaimTime: null, TicketClaimWaitTime: null } })
                      console.log(`This Ticket can be Claimed Again`)
               }
               if (data2.TicketFinishedTime !== null && data2.TicketFinishedTime < Date.now()) {
                    const data = await CreateTicket.findOne({ Channel: data2.Channel })
           
                    const channel = Roverdev.channels.cache.get(data.Channel)
           
                    const ticketlogs = Roverdev.channels.cache.get("1040982086854647918")

                    await Transcript(channel, Roverdev.user).then(async (res) => {
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
                              MainEmbed.setDescription(`\`\`\`yml\nUsers In The Ticket:\n${array.map((user,index) => `${index+1}: ${user}`).join("\n")}\`\`\`\n\`\`\`yml\nMain Author:\n${array1.map((user,index) => `${index+1}: ${user}`)}\n2: Roverdev Director - Closed Ticket\`\`\`\n\`\`\`yml\nUsers Added To The Ticket:\n Soon\`\`\`\nTicket Transcript: ${res}`)
                     
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
                    })
           
               }
        })
    }, 50000);
}