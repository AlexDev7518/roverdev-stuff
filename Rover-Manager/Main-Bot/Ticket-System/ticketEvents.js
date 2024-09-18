const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const { ClientRequest } = require('http');
const ms = require("ms");
const { ClosedCategory, TicketCategory } = require('../Overflow');
module.exports = async client => {
    const wait = require('util').promisify(setTimeout);
    client.on("interactionCreate", async interaction => {
          if (interaction.customId == "Ping-Before") {
            if (client.Blacklist.get("1081700920993259550", "BlacklisedUsers").includes(interaction.user.id)) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setAuthor({ name: `You are Blacklised From Using Our System!`, iconURL: client.user.displayAvatarURL() })
                        .setColor("Red")
                    ], ephemeral: true
                })
     }
                 await interaction.reply({content: `Pinging Bot...`, ephemeral: true})
                  wait(500)
                  interaction.editReply({content: `Ping Success: ${client.ws.ping}ms`})
          }
          if (interaction.customId == "Close-Ticket-Finished") {

            if (interaction.user.id !== client.settings.get(interaction.channel.id, "ticketOpenerId")) {
                     return interaction.reply({content: `Only <@${client.settings.get(interaction.channel.id, "ticketOpenerId")}>  Can Click This Button!`, ephemeral: true})
            }

            interaction.reply({content: `<a:VerifedPurple:1009505593687560224> ***Now Closing the Ticket***\n> *Make sure to Leave Feedback: <#1011647908162060339>*`, ephemeral: true})

            const { createWriteStream } = require('fs');
            const ticketlogs = client.channels.cache.get("1040982086854647918")

            const MainEmbed = new EmbedBuilder()
            .setAuthor({  name: `Ticket System | ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .addFields([
                    { name: `Ticket Closed By: `, value: `${interaction.user} | ${interaction.user.username}`},
                    { name: `Ticket Channel:`, value: `<#${interaction.channel.id}> | ${interaction.channel.name}` },
                    { name: `Ticket Opened By:`, value: `<@!${client.settings.get(interaction.channel.id, "ticketOpenerId") ? client.settings.get(interaction.channel.id, "ticketOpenerId") : null}> | ${client.settings.get(interaction.channel.id, "ticketOpenerUsername") ? client.settings.get(interaction.channel.id, "ticketOpenerUsername") : null }` },
                    { name: `First Claimed`, value: `<@!${client.settings.get(interaction.channel.id, "FirstClaimed") ? client.settings.get(interaction.channel.id, "FirstClaimed") : null}>` },
            ])
            .setColor("#3dbeff")
             const ClaimedUsers = client.settings.get(interaction.channel.id, "ClaimedUsers") ? client.settings.get(interaction.channel.id, "ClaimedUsers") : null
              if (ClaimedUsers.length > 1) {
                MainEmbed.addFields([{
                    name: `All Users Who Claimed:`,
                    value: ` ${client.settings.get(interaction.channel.id, "ClaimedUsers").map(m => `<@${m}> | ${client.users.cache.get(m) ? client.users.cache.get(m).username : "Invaild Username"}`).join("\n")}`
            }])
              }

            await interaction.channel.messages.fetch().then(async msg => {
                   let messages = msg.filter(msg => msg.author.bot !== true).map(m => {
                       const date = new Date(m.createdTimestamp).toLocaleString();
                       const user = `${m.author.tag}${m.author.id === client.settings.get(interaction.channel.id, "ticketOpenerId") ? ' (ticket creator)' : ''}`;
             
                       return `${date} - ${user} : ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`;
                   }).reverse().join('\n');
             
                   if (messages.length < 1) messages = 'There are no messages in this ticket... strange';
             
                   const ticketID = Date.now();
             
                   const stream = createWriteStream(`./Ticket-Logs/${ticketID}.txt`);
             
                   stream.once('open', () => {
                       stream.write(`channel #${interaction.channel.name} | Channel ID: ${interaction.channel.id}\n\n`);
                       stream.write(`${messages}\n\nLogs ${new Date(ticketID).toLocaleString()}`);
             
                       stream.end();
                   });
                   let Ticket_Opener = client.users.cache.get(client.settings.get(interaction.channel.id, "ticketOpenerId"))
                   stream.on('finish', () => ticketlogs.send({ files: [`./Ticket-Logs/${ticketID}.txt`], embeds: [MainEmbed]}).then(Ticket_Opener.send({ files: [`./Ticket-Logs/${ticketID}.txt`], embeds: [MainEmbed]})))
               });

               interaction.channel.setTopic("Closed-Ticket")
               const channel = interaction.channel

               ClosedCategory(client,channel)
                
               const oldName = interaction.channel.name; 

               const setting = client.settings.get(interaction.channel.id, "ticketEmoji")
 
               client.settings.ensure(interaction.guild.id, {
                   PendingChannels: []
                })
                    client.settings.remove(interaction.guild.id, channel.id, "PendingChannels")

               channel.setName(oldName.replace("✅", "🔒"))
               
               interaction.channel.permissionOverwrites.set([
                   { 
                       id: interaction.guild.roles.everyone, 
                       deny: [PermissionFlagsBits.ViewChannel] 
                   },
               ]);

                client.settings.delete(client.settings.get(interaction.channel.id, "ticketOpenerId"))
                client.settings.delete(interaction.channel.id)

               setTimeout(() => {
                    if (interaction.channel.parentId !== "1040996273546866708") {
                             interaction.channel.delete()
                    }
               }, 500);

                interaction.message.edit({ components: []})

                setTimeout(() => {
                    channel.send({
                        embeds: [
                                new EmbedBuilder()
                                .setTitle(`Ticket Got Closed Successfully (User Closed)`)
                                .addFields([
                                    { name: `Channel:`, value: `${channel}`, inline: true },
                                    { name: `Closed By:`, value: `${interaction.user}`, inline: true }
                                ])
                                .setColor("#3dbeff")   
                        ],
                 })
                }, 500);
          }
          if (interaction.customId == "Claim-The-Ticket") {
            if (client.Blacklist.get("1081700920993259550", "BlacklisedUsers").includes(interaction.user.id)) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setAuthor({ name: `You are Blacklised From Using Our System!`, iconURL: client.user.displayAvatarURL() })
                        .setColor("Red")
                    ], ephemeral: true
                })
     }
                      const channel = client.settings.get(interaction.channel.id)
                      const owner = client.settings.get(interaction.channel.id, "ticketOpenerId")
                     const claimedUsers = client.settings.get(interaction.channel.id, "ClaimedUsers")

                     client.settings.ensure(interaction.channel.id, {
                        ClaimedUsers: []
                         })

                         if (owner == interaction.user.id) {
                            return interaction.reply({content: `You Can't Claim your own ticket!`, ephemeral: true})
                      }

                     if (claimedUsers.length < 1) {

                        client.settings.ensure(interaction.channel.id, {
                            ClaimedUsers: []
                     })

              interaction.channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true, SendMessages: true})
              client.settings.push(interaction.channel.id, interaction.user.id, "ClaimedUsers")
                             client.settings.set(interaction.channel.id, interaction.user.id, "FirstClaimed")
                             const claimed = new EmbedBuilder()
                             .setColor("#3dbeff")
                             .setAuthor({ name: `${interaction.user.username} Claimed the Ticket`, iconURL: interaction.user.displayAvatarURL() })
                             .setTimestamp()
                             return interaction.reply({embeds: [claimed]})
                     }
                     if (claimedUsers.includes(interaction.user.id)) {
                            return interaction.reply({content: `You Already Claimed the Ticket`, ephemeral: true})
                     }
                    if (!interaction.member.roles.cache.has("1005978927421980702")) {
                           return interaction.reply({content: `Only <@&1005978927421980702> Can Claim this Ticket`, ephemeral: true})
                    }
                    

                    const claimed = new EmbedBuilder()
                    .setColor("#3dbeff")
                    .setAuthor({ name: `${interaction.user.username} Claimed the Ticket`, iconURL: interaction.user.displayAvatarURL() })
                    .setTimestamp()
                    interaction.reply({embeds: [claimed]})

                    client.settings.ensure(interaction.channel.id, {
                        ClaimedUsers: []
                 })
                 interaction.channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true, SendMessages: true})
                 client.settings.push(interaction.channel.id, interaction.user.id, "ClaimedUsers")
          }
        //   if (interaction.customId == "Close-Ticket") {
        //       if (!interaction.member.roles.cache.has("1005978927421980702")) {
        //              return interaction.reply({content: `Only <@&1005978927421980702> Can Close this Ticket`, ephemeral: true})
        //       }


        //       if (interaction.channel.parentId == "1005960202434138275") {
        //         const embed = new EmbedBuilder()
        //         .setAuthor({ name: `Ticket is Already Closed!`, iconURL: `https://i.imgur.com/AgDgONy.png` })
        //         .setColor("#3dbeff")
  
  
        //         return interaction.reply({embeds: [embed], ephemeral: true})
        //       }

        //       const Buttons = new ActionRowBuilder()
        //       .addComponents(
        //         new ButtonBuilder()
        //        .setStyle(ButtonStyle.Success)
        //        .setCustomId("Confirm")
        //        .setLabel(`Confirm, close ticket`)
        //        .setDisabled(false)
        //        .setEmoji("🔒"),
        //        new ButtonBuilder()
        //        .setStyle(ButtonStyle.Danger)
        //        .setCustomId("Cancel")
        //        .setLabel(`Cancel, Keep it Open!`)
        //        .setDisabled(false)
        //        .setEmoji("🔓")
        //       )
        //       const embed = new EmbedBuilder()
        //       .setAuthor({ name: `Would You Like to Contiune to Close?`, iconURL: `https://i.imgur.com/RhR8Qqn.gif` })
        //       .setColor("#3dbeff")


        //       await interaction.reply({embeds: [embed], components: [Buttons], ephemeral: true})

        //       const Collector = interaction.channel.createMessageComponentCollector({time: 60000 })

        //       Collector.on("collect", async (b) => {
        //              if (b.customId == "Confirm") {
        //                     const { createWriteStream } = require('fs');
        //                     const ticketlogs = client.channels.cache.get("1040982086854647918")

        //                     const MainEmbed = new EmbedBuilder()
        //                     .setAuthor({  name: `Ticket System | ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
        //                     .addFields([
        //                             { name: `Ticket Closed By: `, value: `${interaction.user} | ${interaction.user.username}`},
        //                             { name: `Ticket Channel:`, value: `<#${interaction.channel.id}> | ${interaction.channel.name}` },
        //                             { name: `Ticket Opened By:`, value: `<@!${client.settings.get(interaction.channel.id, "ticketOpenerId") ? client.settings.get(interaction.channel.id, "ticketOpenerId") : null}> | ${client.settings.get(interaction.channel.id, "ticketOpenerUsername") ? client.settings.get(interaction.channel.id, "ticketOpenerUsername") : null }` },
        //                             { name: `First Claimed`, value: `<@!${client.settings.get(interaction.channel.id, "FirstClaimed") ? client.settings.get(interaction.channel.id, "FirstClaimed") : null}>` },
        //                     ])
        //                     .setColor("#3dbeff")
        //                      const ClaimedUsers = client.settings.get(interaction.channel.id, "ClaimedUsers") ? client.settings.get(interaction.channel.id, "ClaimedUsers") : null
        //                       if (ClaimedUsers.length > 1) {
        //                         MainEmbed.addFields([{
        //                             name: `All Users Who Claimed:`,
        //                             value: ` ${client.settings.get(interaction.channel.id, "ClaimedUsers").map(m => `<@${m}> | ${client.users.cache.get(m) ? client.users.cache.get(m).username : "Invaild Username"}`).join("\n")}`
        //                     }])
        //                       }

        //                     interaction.editReply({embeds: [
        //                            new EmbedBuilder()
        //                            .setAuthor({ name: `Succesfully Closed the Ticket!`, iconURL: `https://i.imgur.com/cFihX4o.png` })
        //                            .setColor("#3dbeff")                     
        //                        ], components: []})

        //                     await interaction.channel.messages.fetch().then(async msg => {
        //                            let messages = msg.filter(msg => msg.author.bot !== true).map(m => {
        //                                const date = new Date(m.createdTimestamp).toLocaleString();
        //                                const user = `${m.author.tag}${m.author.id === client.settings.get(interaction.channel.id, "ticketOpenerId") ? ' (ticket creator)' : ''}`;
                             
        //                                return `${date} - ${user} : ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`;
        //                            }).reverse().join('\n');
                             
        //                            if (messages.length < 1) messages = 'There are no messages in this ticket... strange';
                             
        //                            const ticketID = Date.now();
                             
        //                            const stream = createWriteStream(`./Ticket-Logs/${ticketID}.txt`);
                             
        //                            stream.once('open', () => {
        //                                stream.write(`channel #${interaction.channel.name} | Channel ID: ${interaction.channel.id}\n\n`);
        //                                stream.write(`${messages}\n\nLogs ${new Date(ticketID).toLocaleString()}`);
                             
        //                                stream.end();
        //                            });
        //                            let Ticket_Opener = client.users.cache.get(client.settings.get(interaction.channel.id, "ticketOpenerId"))
        //                            stream.on('finish', () => ticketlogs.send({ files: [`./Ticket-Logs/${ticketID}.txt`], embeds: [MainEmbed]}).then(Ticket_Opener.send({ files: [`./Ticket-Logs/${ticketID}.txt`], embeds: [MainEmbed]})))
        //                        });

        //                        interaction.channel.setTopic("Closed-Ticket")
        //                        const channel = interaction.channel

        //                        ClosedCategory(client,channel)

        //                        setTimeout(() => {
        //                         const oldName = interaction.channel.name; 

        //                         const setting = client.settings.get(interaction.channel.id, "ticketEmoji")
                  
        //                         client.settings.ensure(interaction.guild.id, {
        //                             PendingChannels: []
        //                          })
        //                              client.settings.remove(interaction.guild.id, channel.id, "PendingChannels")

        //                         channel.setName(oldName.replace(setting, "🔒"))
        //                        }, 500);

                               
        //                        interaction.channel.permissionOverwrites.set([
        //                            { 
        //                                id: interaction.guild.roles.everyone, 
        //                                deny: [PermissionFlagsBits.ViewChannel] 
        //                            },
        //                        ]);

        //                        setTimeout(() => {
        //                         client.settings.delete(client.settings.get(interaction.channel.id, "ticketOpenerId"))
        //                         client.settings.delete(interaction.channel.id)
        //                        }, 1500);

        //                         interaction.message.edit({ components: []})

        //                         setTimeout(() => {
        //                             channel.send({
        //                                 embeds: [
        //                                         new EmbedBuilder()
        //                                         .setTitle(`Ticket Got Closed Successfully (Force Closed)`)
        //                                         .addFields([
        //                                             { name: `Channel:`, value: `${channel}`, inline: true },
        //                                             { name: `Closed By:`, value: `${interaction.user}`, inline: true }
        //                                         ])
        //                                         .setColor("#3dbeff")   
        //                                 ],
        //                          })
        //                         }, 500);
        //              }
        //              if (b.customId == "Cancel") {
        //                     const Buttons = new ActionRowBuilder()
        //                     .addComponents(
        //                       new ButtonBuilder()
        //                      .setStyle(ButtonStyle.Success)
        //                      .setCustomId("Confirm")
        //                      .setLabel(`Confirm, close ticket`)
        //                      .setDisabled(true)
        //                      .setEmoji("🔒"),
        //                      new ButtonBuilder()
        //                      .setStyle(ButtonStyle.Danger)
        //                      .setCustomId("Cancel")
        //                      .setLabel(`Cancel, Keep it Open!`)
        //                      .setDisabled(true)
        //                      .setEmoji("🔓")
        //                     )

        //                     const embed = new EmbedBuilder()
        //                     .setAuthor({ name: `Success, Not Closing Ticket`, iconURL: `https://i.imgur.com/AgDgONy.png` })
        //                     .setColor("#3dbeff")
              
              
        //                  interaction.editReply({embeds: [embed], components: [Buttons], ephemeral: true})
        //              }
        //              b.deferUpdate()
        //       })

        //   }
        //   if (interaction.customId == "Ping-Before-Claiming") {
        //       await interaction.reply({content: `<a:Loading:1012711763222986812> Pinging Ticket System..`, ephemeral: true})
        //       wait(1500)
        //       interaction.editReply({content: `<:checkmark:1005930828704010270> Succesfully Pinged the Ticket System: ${client.ws.ping}ms`})
        // }
    })





}