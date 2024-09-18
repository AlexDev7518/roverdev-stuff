const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, Collection } = require("discord.js")
const { TicketOptions, SetupOptions, TicketMessageOptions, TicketMessageOptionsExtra } = require("../../config/TicketSystem")

module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
    const embed = new EmbedBuilder()
    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
    .setDescription(`***Select What you Want To \`Control\` Down below.***`)
    .setColor("Yellow")
    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
    .setTimestamp()
    
    const row = new ActionRowBuilder()
    .addComponents(
          new SelectMenuBuilder()
          .setCustomId("Ticket-System")
          .setPlaceholder("Click me to Control the Ticket System")
          .addOptions(
                TicketOptions.map(option => {
                            return {
                                     label: option.Label,
                                     description: option.Description,
                                     value: option.Value,
                                     emoji: option.Emoji
                            }
                })
          ))

           await message.reply({embeds: [embed], components: [row]})

          const filter = (interaction) => interaction.user.id === message.author.id;
   
          const collector = message.channel.createMessageComponentCollector({
            filter,
            max: 1, 
            time: 50000,
          });
          collector.on("collect", async  (interaction) => {
            try {
                if (interaction.user.id !== message.author.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${message.author.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
            } catch(e) {
                  console.log(e)
            } 

                   if (interaction.values == "Auto-Delete") {
                        interaction.message.edit({
                              embeds: [ 
                                    new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`~~***Select What you Want To \`Control\` Down below.***~~`)
                                    .setColor("Green")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()
                              ],
                              components: [],
                              content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction.values}\`***`  
                      })

                      const row = new ActionRowBuilder()
                      .addComponents(
                            new SelectMenuBuilder()
                            .setCustomId("Ticket-System-Part-1")
                            .setPlaceholder("Click me to Control the Ticket System")
                            .addOptions(
                             SetupOptions.map(option => {
                                              return {
                                                       label: option.Label,
                                                       description: option.Description,
                                                       value: option.Value,
                                                       emoji: option.Emoji
                                              }
                                  })
                            ))

                            const embed3 = new EmbedBuilder()
                            .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                            .setDescription(`***Select What \`Setup\` You want To Control below.***`)
                            .setColor("Yellow")
                            .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                            .setTimestamp()

                            await interaction.reply({embeds: [embed3], components: [row]}).catch((e) => {})

                            const filter = (interaction) => interaction.user.id === message.author.id;
                     
                            const collector3 = message.channel.createMessageComponentCollector({
                              filter,
                              max: 1, 
                              time: 50000,
                            }); 

                            collector3.on("collect", async interaction3 => {
                              try {
                                  if (interaction3.user.id !== message.author.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${message.author.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                              } catch(e) {
                                    return;
                              } 
                                 if (interaction3.customId == "Ticket-System-Part-1") {
                                    const embed3 = new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`~~***Select What \`Setup\` You want To Control below.***~~`)
                                    .setColor("Green")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()
        
                                                                        await interaction3.message.edit({embeds: [embed3], components: [], content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction3.values}\`***`  }).catch((e) => {})

                                    const DataToFetch = `${interaction3.values}`.replace("-", "")

                                    const data = client.TicketSystem.get(interaction.guild.id, `${DataToFetch}.AutoDelete.Enabled`)

                                    const Enable = new ButtonBuilder()
                                    .setLabel("Enable")
                                    .setCustomId("Enable")
                                    .setStyle(ButtonStyle.Secondary)
                                    const Disable = new ButtonBuilder()
                                    .setLabel("Disable")
                                    .setCustomId("Disable")
                                    .setStyle(ButtonStyle.Danger)

                                    if (data == false) {
                                            Enable.setDisabled(false)
                                            Disable.setDisabled(true)
                                    }

                                    if (data == true) {
                                          Enable.setDisabled(true)
                                          Disable.setDisabled(false)
                                  }
                                    const row2 = new ActionRowBuilder()
                                    .addComponents(Enable, Disable)

                                    const embed = new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`***Select What You want to control Below***`)
                                    .setColor("Green")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()

                                    await interaction3.reply({embeds: [embed], components: [row2]}).catch((e) => {})

                                    const filter = (interaction) => interaction.user.id === message.author.id;
                             
                                    const collector4 = message.channel.createMessageComponentCollector({
                                      filter,
                                      max: 1, 
                                      time: 50000,
                                    }); 
        
                                    collector4.on("collect", async interaction4 => {
                                      try {
                                          if (interaction4.user.id !== message.author.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${message.author.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                                      } catch(e) {
                                            return;
                                      } 
                                       if (interaction4 .customId == "Enable") {

                                          interaction4.message.edit({
                                                   embeds: [
                                                       new EmbedBuilder()
                                                       .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                       .setDescription(`~~***Select What You want to control Below***~~`)
                                                       .setColor("Green")
                                                       .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                       .setTimestamp()
                                                   ],
                                                    components: []
                                          })

                                           interaction4.reply({
                                                   embeds: [
                                                       new EmbedBuilder()
                                                       .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                       .setDescription(`***Please Send the Duration it will check to delete***\n Example: 3000 -> 3s\n 30000 -> 30s`)
                                                       .addFields(
                                                            { name: `Warning`, value: "If number lower then 5000 Then it will not Enable!" }
                                                       )
                                                       .setColor("Green")
                                                       .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                       .setTimestamp()
                                                   ]})

                                                   interaction3.channel.awaitMessages({
                                                      max: 1, 
                                                      time: 60000, 
                                                      filter: m => m.author.id === message.author.id,
                                                      errors: ['time']
                                                     })   
                                                     .then(async (collected) => {
                                                                 interaction4.editReply({
                                                                             embeds: [
                                                                              new EmbedBuilder()
                                                                              .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                              .setDescription(`~~***Select What You want to control Below***~~`)
                                                                              .setColor("Green")
                                                                              .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                              .setTimestamp()
                                                                             ]
                                                                 })         

                                                                 if (collected.first().content < 5000) {
                                                                  client.channels.fetch(message.channel.id).then(ch => {
                                                                        ch.messages.fetch(collected.first().id).then(async msg => {
                                                                              return msg.reply({
                                                                                    embeds: [
                                                                                          new EmbedBuilder()
                                                                                          .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                          .setDescription(`***Your Value ${collected.first().content} is less then 5000***`)
                                                                                          .setColor("Red")
                                                                                          .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                          .setTimestamp()
                                                                                    ]
                                                                              })
                                                                        })
                                                                  })

                                                                 }

                                                                 if (collected.first().content > 5000) {

                                                                  client.TicketSystem.set(interaction.guild.id, true ,`${DataToFetch}.AutoDelete.Enabled`)
                                                                  client.TicketSystem.set(interaction.guild.id, collected.first().content ,`${DataToFetch}.AutoDelete.Time`)

                                                                  client.channels.fetch(message.channel.id).then(ch => {
                                                                        ch.messages.fetch(collected.first().id).then(async msg => {
                                                                              msg.reply({
                                                                                    embeds: [
                                                                                     new EmbedBuilder()
                                                                                     .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                     .setDescription(`***Successfully Enabled The Auto Delete System***`)
                                                                                     .setColor("Green")
                                                                                     .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                     .setTimestamp()
                                                                                    ]
                                                                              }).then((msg1) => {
                                                                                    msg1.reply({ content: `Now Restarting Bot to Save Changes!` })
      
                                                                                    setTimeout(() => {
                                                                                          process.exit()
                                                                                    }, 5000);
                                                                              })
                                                                        })
                                                                  })

                                                                 }
                                                     })
                                       } else if (interaction4.customId == "Disable") {
                                          interaction4.message.edit({
                                                embeds: [
                                                 new EmbedBuilder()
                                                 .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                 .setDescription(`~~***Select What You want to control Below***~~`)
                                                 .setColor("Green")
                                                 .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                 .setTimestamp()
                                                ],
                                                components: []
                                    })         

                                    setTimeout(() => {
                                          interaction4.channel.send({ content: `Now Restarting Bot to Save Changes!` })

                                          setTimeout(() => {
                                                process.exit()
                                          }, 5000);
                                    }, 5000);

                                    client.TicketSystem.set(interaction.guild.id, false ,`${DataToFetch}.AutoDelete.Enabled`)
                                              return interaction4.reply({
                                                    embeds: [
                                                          new EmbedBuilder()
                                                          .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                          .setDescription(`***Successfully Disabled the Auto Delete System.***`)
                                                          .setColor("Green")
                                                          .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                          .setTimestamp()
                                                    ]
                                              })
                                       }
                                    })
                                 }
                              })
                   }

                    if (interaction.values == "channel-name") {
                        interaction.message.edit({
                              embeds: [ 
                                    new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`~~***Select What you Want To \`Control\` Down below.***~~`)
                                    .setColor("Green")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()
                              ],
                              components: [],
                              content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction.values}\`***`  
                      })

                      const row = new ActionRowBuilder()
                      .addComponents(
                            new SelectMenuBuilder()
                            .setCustomId("Ticket-System-Part-1")
                            .setPlaceholder("Click me to Control the Ticket System")
                            .addOptions(
                             SetupOptions.map(option => {
                                              return {
                                                       label: option.Label,
                                                       description: option.Description,
                                                       value: option.Value,
                                                       emoji: option.Emoji
                                              }
                                  })
                            ))

                            const embed3 = new EmbedBuilder()
                            .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                            .setDescription(`***Select What \`Setup\` You want To Control below.***`)
                            .setColor("Yellow")
                            .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                            .setTimestamp()

                            await interaction.reply({embeds: [embed3], components: [row]}).catch((e) => {})

                            const filter = (interaction) => interaction.user.id === message.author.id;
                     
                            const collector3 = message.channel.createMessageComponentCollector({
                              filter,
                              max: 1, 
                              time: 50000,
                            }); 

                            collector3.on("collect", async interaction3 => {
                              try {
                                  if (interaction3.user.id !== message.author.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${message.author.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                              } catch(e) {
                                    return;
                              } 
                                 if (interaction3.customId == "Ticket-System-Part-1") {
                                    const embed3 = new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`~~***Select What \`Setup\` You want To Control below.***~~`)
                                    .setColor("Green")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()
        
                                    await interaction3.message.edit({embeds: [embed3], components: [], content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction3.values}\`***`  }).catch((e) => {})

                                    const embed4 = new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`***Please Provide the Ticket \`ChannelName\`.***`)
                                    .addFields([
                                             { name: `Values to Be Replaced`, value: "{username} -> ticket openerusername" }
                                    ])
                                    .setColor("Yellow")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()

                                    interaction3.reply({
                                             embeds: [embed4]
                                    })

                                    interaction3.channel.awaitMessages({
                                          max: 1, 
                                          time: 60000, 
                                          filter: m => m.author.id === message.author.id,
                                          errors: ['time']
                                         })   
                                         .then(async (collected) => {
                                          const embed4 = new EmbedBuilder()
                                          .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                          .setDescription(`~~***Please Provide a Ticket \`ChannelName\`***~~`)
                                          .setColor("Green")
                                          .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                          .setTimestamp()
      
                                          interaction3.editReply({
                                                   embeds: [embed4]
                                          })

                                          client.channels.fetch(message.channel.id).then(ch => {
                                                ch.messages.fetch(collected.first().id).then(async msg => {

                                          const DataToFetch = `${interaction3.values}`.replace("-", "")

                                          client.TicketSystem.set(interaction.guild.id, collected.first().content ,`${DataToFetch}.ChannelName`)
                                          

                                          msg.reply({
                                                embeds: [
                                                     new EmbedBuilder()
                                                     .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                     .setDescription(`<:check:1005732038004981780> __***Successfully Set \`${collected.first().content}\` In Database***__`)
                                                     .setColor("Green")
                                                     .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                     .setTimestamp()
                                                ]
                                        })
                                            })})
                                         })


                                 }
                            })
                    }
                       
                    if (interaction.values == "logger") {
                        interaction.message.edit({
                              embeds: [ 
                                    new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`~~***Select What you Want To \`Control\` Down below.***~~`)
                                    .setColor("Green")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()
                              ],
                              components: [],
                              content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction.values}\`***`  
                      })

                      const row = new ActionRowBuilder()
                      .addComponents(
                            new SelectMenuBuilder()
                            .setCustomId("Ticket-System-Part-1")
                            .setPlaceholder("Click me to Control the Ticket System")
                            .addOptions(
                             SetupOptions.map(option => {
                                              return {
                                                       label: option.Label,
                                                       description: option.Description,
                                                       value: option.Value,
                                                       emoji: option.Emoji
                                              }
                                  })
                            ))

                            const embed3 = new EmbedBuilder()
                            .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                            .setDescription(`***Select What \`Setup\` You want To Control below.***`)
                            .setColor("Yellow")
                            .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                            .setTimestamp()

                            await interaction.reply({embeds: [embed3], components: [row]}).catch((e) => {})

                            const filter = (interaction) => interaction.user.id === message.author.id;
                     
                            const collector3 = message.channel.createMessageComponentCollector({
                              filter,
                              max: 1, 
                              time: 50000,
                            }); 

                            collector3.on("collect", async interaction3 => {
                              try {
                                  if (interaction3.user.id !== message.author.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${message.author.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                              } catch(e) {
                                    return;
                              } 
                                 if (interaction3.customId == "Ticket-System-Part-1") {
                                    const embed3 = new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`~~***Select What \`Setup\` You want To Control below.***~~`)
                                    .setColor("Green")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()
        
                                                                        await interaction3.message.edit({embeds: [embed3], components: [], content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction3.values}\`***`  }).catch((e) => {})

                                    const embed4 = new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`***Please Provide the Ticket \`LoggerChannel\`.***`)
                                    .setColor("Yellow")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()

                                    interaction3.reply({
                                             embeds: [embed4]
                                    })

                                    interaction3.channel.awaitMessages({
                                          max: 1, 
                                          time: 60000, 
                                          filter: m => m.author.id === message.author.id,
                                          errors: ['time']
                                         })   
                                         .then(async (collected) => {
                                          const embed4 = new EmbedBuilder()
                                          .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                          .setDescription(`~~***Please Provide a Ticket \`LoggerChannel\`***~~`)
                                          .setColor("Green")
                                          .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                          .setTimestamp()
      
                                          interaction3.editReply({
                                                   embeds: [embed4]
                                          })

                                          client.channels.fetch(message.channel.id).then(ch => {
                                                ch.messages.fetch(collected.first().id).then(async msg => {

                                          const DataToFetch = `${interaction3.values}`.replace("-", "")

                                          if(isNaN(collected.first().content) || !client.channels.cache.get(collected.first().content)) {
                                                 return msg.reply({
                                                         embeds: [
                                                              new EmbedBuilder()
                                                              .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                              .setDescription(`*** You did not Provide a Valid Channel Id. ***`)
                                                              .setColor("Red")
                                                              .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                              .setTimestamp()
                                                         ]
                                                 })
                                          }

                                          if (client.channels.cache.get(collected.first().content)) {
                                                client.TicketSystem.set(interaction.guild.id, client.channels.cache.get(collected.first().content).id ,`${DataToFetch}.LoggerSystem.Channel`)
                                                client.TicketSystem.set(interaction.guild.id, true ,`${DataToFetch}.LoggerSystem.Enabled`)

                                                            msg.reply({
                                                                  embeds: [
                                                                       new EmbedBuilder()
                                                                       .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                       .setDescription(`<:check:1005732038004981780> __***Successfully Set \`${collected.first().content}\` In Database***__`)
                                                                       .setColor("Green")
                                                                       .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                       .setTimestamp()
                                                                  ]
                                                          })
                                          }
                                            })})
                                         })


                                 }
                            })
                    }

                    if (interaction.values == "category") {
                        interaction.message.edit({
                              embeds: [ 
                                    new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`~~***Select What you Want To \`Control\` Down below.***~~`)
                                    .setColor("Green")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()
                              ],
                              components: [],
                              content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction.values}\`***`  
                      })

                      const row = new ActionRowBuilder()
                      .addComponents(
                            new SelectMenuBuilder()
                            .setCustomId("Ticket-System-Part-1")
                            .setPlaceholder("Click me to Control the Ticket System")
                            .addOptions(
                             SetupOptions.map(option => {
                                              return {
                                                       label: option.Label,
                                                       description: option.Description,
                                                       value: option.Value,
                                                       emoji: option.Emoji
                                              }
                                  })
                            ))

                            const embed3 = new EmbedBuilder()
                            .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                            .setDescription(`***Select What \`Setup\` You want To Control below.***`)
                            .setColor("Yellow")
                            .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                            .setTimestamp()

                            await interaction.reply({embeds: [embed3], components: [row]}).catch((e) => {})

                            const filter = (interaction) => interaction.user.id === message.author.id;
                     
                            const collector3 = message.channel.createMessageComponentCollector({
                              filter,
                              max: 1, 
                              time: 50000,
                            }); 

                            collector3.on("collect", async interaction3 => {
                              try {
                                  if (interaction3.user.id !== message.author.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${message.author.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                              } catch(e) {
                                    return;
                              } 
                                 if (interaction3.customId == "Ticket-System-Part-1") {
                                    const embed3 = new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`~~***Select What \`Setup\` You want To Control below.***~~`)
                                    .setColor("Green")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()
        
                                                                        await interaction3.message.edit({embeds: [embed3], components: [], content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction3.values}\`***`  }).catch((e) => {})

                                    const embed4 = new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`***Please Provide the Ticket \`OpenCategory\`.***`)
                                    .setColor("Yellow")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()

                                    interaction3.reply({
                                             embeds: [embed4]
                                    })

                                    interaction3.channel.awaitMessages({
                                          max: 1, 
                                          time: 60000, 
                                          filter: m => m.author.id === message.author.id,
                                          errors: ['time']
                                         })   
                                         .then(async (collected) => {
                                          const embed4 = new EmbedBuilder()
                                          .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                          .setDescription(`~~***Please Provide a Ticket \`OpenCategory\`***~~`)
                                          .setColor("Green")
                                          .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                          .setTimestamp()
      
                                          interaction3.editReply({
                                                   embeds: [embed4]
                                          })

                                          client.channels.fetch(message.channel.id).then(ch => {
                                                ch.messages.fetch(collected.first().id).then(async msg => {

                                          const DataToFetch = `${interaction3.values}`.replace("-", "")

                                          if(isNaN(collected.first().content) || !client.channels.cache.get(collected.first().content)) {

                                                const channel = collected.first().mentions.channels.first()
                                                                   if (client.channels.cache.get(channel.id)) {
                                                                        client.TicketSystem.set(interaction.guild.id, client.channels.cache.get(channel.id).id ,`${DataToFetch}.OpenCategory`)

                                                                        return msg.reply({
                                                                              embeds: [
                                                                                   new EmbedBuilder()
                                                                                   .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                   .setDescription(`<:check:1005732038004981780> __***Successfully Set \`${client.channels.cache.get(channel.id).id}\` In Database***__`)
                                                                                   .setColor("Green")
                                                                                   .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                   .setTimestamp()
                                                                              ]
                                                                      })
                                                                   } else {
                                                                        return msg.reply({
                                                                              embeds: [
                                                                                   new EmbedBuilder()
                                                                                   .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                   .setDescription(`*** You did not Provide a Valid Channel Id. ***`)
                                                                                   .setColor("Red")
                                                                                   .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                   .setTimestamp()
                                                                              ]
                                                                      })
                                                                   }
                                          }

                                          if (client.channels.cache.get(collected.first().content)) {
                                                client.TicketSystem.set(interaction.guild.id, client.channels.cache.get(collected.first().content).id ,`${DataToFetch}.OpenCategory`)

                                                            msg.reply({
                                                                  embeds: [
                                                                       new EmbedBuilder()
                                                                       .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                       .setDescription(`<:check:1005732038004981780> __***Successfully Set \`${collected.first().content}\` In Database***__`)
                                                                       .setColor("Green")
                                                                       .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                       .setTimestamp()
                                                                  ]
                                                          })
                                          }
                                            })})
                                         })


                                 }
                            })
                    }

                    if (interaction.values == "closed") {
                        interaction.message.edit({
                              embeds: [ 
                                    new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`~~***Select What you Want To \`Control\` Down below.***~~`)
                                    .setColor("Green")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()
                              ],
                              components: [],
                              content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction.values}\`***`  
                      })

                      const row = new ActionRowBuilder()
                      .addComponents(
                            new SelectMenuBuilder()
                            .setCustomId("Ticket-System-Part-1")
                            .setPlaceholder("Click me to Control the Ticket System")
                            .addOptions(
                             SetupOptions.map(option => {
                                              return {
                                                       label: option.Label,
                                                       description: option.Description,
                                                       value: option.Value,
                                                       emoji: option.Emoji
                                              }
                                  })
                            ))

                            const embed3 = new EmbedBuilder()
                            .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                            .setDescription(`***Select What \`Setup\` You want To Control below.***`)
                            .setColor("Yellow")
                            .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                            .setTimestamp()

                            await interaction.reply({embeds: [embed3], components: [row]}).catch((e) => {})

                            const filter = (interaction) => interaction.user.id === message.author.id;
                     
                            const collector3 = message.channel.createMessageComponentCollector({
                              filter,
                              max: 1, 
                              time: 50000,
                            }); 

                            collector3.on("collect", async interaction3 => {
                              try {
                                  if (interaction3.user.id !== message.author.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${message.author.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                              } catch(e) {
                                    return;
                              } 
                                 if (interaction3.customId == "Ticket-System-Part-1") {
                                    const embed3 = new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`~~***Select What \`Setup\` You want To Control below.***~~`)
                                    .setColor("Green")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()
        
                                                                        await interaction3.message.edit({embeds: [embed3], components: [], content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction3.values}\`***`  }).catch((e) => {})

                                    const embed4 = new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`***Please Provide the Ticket \`ClosedCategory\`.***`)
                                    .setColor("Yellow")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()

                                    interaction3.reply({
                                             embeds: [embed4]
                                    })

                                    interaction3.channel.awaitMessages({
                                          max: 1, 
                                          time: 60000, 
                                          filter: m => m.author.id === message.author.id,
                                          errors: ['time']
                                         })   
                                         .then(async (collected) => {
                                          const embed4 = new EmbedBuilder()
                                          .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                          .setDescription(`~~***Please Provide a Ticket \`ClosedCategory\`***~~`)
                                          .setColor("Green")
                                          .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                          .setTimestamp()
      
                                          interaction3.editReply({
                                                   embeds: [embed4]
                                          })

                                          client.channels.fetch(message.channel.id).then(ch => {
                                                ch.messages.fetch(collected.first().id).then(async msg => {

                                          const DataToFetch = `${interaction3.values}`.replace("-", "")

                                          if(isNaN(collected.first().content) || !client.channels.cache.get(collected.first().content)) {

                                                const channel = collected.first().mentions.channels.first()
                                                if (client.channels.cache.get(channel.id)) {
                                                      client.TicketSystem.set(interaction.guild.id, client.channels.cache.get(channel.id).id ,`${DataToFetch}.ClosedCategory`)

                                                     return msg.reply({
                                                            embeds: [
                                                                 new EmbedBuilder()
                                                                 .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                 .setDescription(`<:check:1005732038004981780> __***Successfully Set \`${channel.id}\` In Database***__`)
                                                                 .setColor("Green")
                                                                 .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                 .setTimestamp()
                                                            ]
                                                    })
                                                } else {
                                                      return msg.reply({
                                                            embeds: [
                                                                 new EmbedBuilder()
                                                                 .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                 .setDescription(`*** You did not Provide a Valid Channel Id. ***`)
                                                                 .setColor("Red")
                                                                 .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                 .setTimestamp()
                                                            ]
                                                    })
                                                }
                                          }

                                          if (client.channels.cache.get(collected.first().content)) {
                                                client.TicketSystem.set(interaction.guild.id, client.channels.cache.get(collected.first().content).id ,`${DataToFetch}.ClosedCategory`)

                                                            msg.reply({
                                                                  embeds: [
                                                                       new EmbedBuilder()
                                                                       .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                       .setDescription(`<:check:1005732038004981780> __***Successfully Set \`${collected.first().content}\` In Database***__`)
                                                                       .setColor("Green")
                                                                       .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                       .setTimestamp()
                                                                  ]
                                                          })
                                          }
                                            })})
                                         })


                                 }
                            })
                  }
                  if (interaction.values == "claim-system") {
                        interaction.message.edit({
                              embeds: [ 
                                    new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`~~***Select What you Want To \`Control\` Down below.***~~`)
                                    .setColor("Green")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()
                              ],
                              components: [],
                              content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction.values}\`***`  
                      })

                      const row = new ActionRowBuilder()
                      .addComponents(
                            new SelectMenuBuilder()
                            .setCustomId("Ticket-System-Part-1")
                            .setPlaceholder("Click me to Control the Ticket System")
                            .addOptions(
                             SetupOptions.map(option => {
                                              return {
                                                       label: option.Label,
                                                       description: option.Description,
                                                       value: option.Value,
                                                       emoji: option.Emoji
                                              }
                                  })
                            ))

                            const embed3 = new EmbedBuilder()
                            .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                            .setDescription(`***Select What \`Setup\` You want To Control below.***`)
                            .setColor("Yellow")
                            .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                            .setTimestamp()

                            await interaction.reply({embeds: [embed3], components: [row]}).catch((e) => {})

                            const filter = (interaction) => interaction.user.id === message.author.id;
                     
                            const collector3 = message.channel.createMessageComponentCollector({
                              filter,
                              max: 1, 
                              time: 50000,
                            }); 

                            collector3.on("collect", async interaction3 => {
                              try {
                                  if (interaction3.user.id !== message.author.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${message.author.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                              } catch(e) {
                                    return;
                              } 
                                 if (interaction3.customId == "Ticket-System-Part-1") {

                                    const DataToFetch = `${interaction3.values}`.replace("-", "")

                                    const embed3 = new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`~~***Select What \`Setup\` You want To Control below.***~~`)
                                    .setColor("Green")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()
        
                                                                        await interaction3.message.edit({embeds: [embed3], components: [], content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction3.values}\`***`  }).catch((e) => {})

                                    const row = new ActionRowBuilder()
                                    .addComponents(
                                          new SelectMenuBuilder()
                                          .setCustomId("Ticket-System-Part-1")
                                          .setPlaceholder("Click me to Control the Ticket System")
                                    )
              
                                    const data = client.TicketSystem.get(interaction.guild.id, `${DataToFetch}.ClaimSystem.Enabled`)
              
                                    if (data == false || !data) {
                                             row.setComponents(
                                                new SelectMenuBuilder()
                                                .setCustomId("Ticket-System-Part-1")
                                                .setPlaceholder("Click me to Control the Ticket System")
                                                   .setOptions(
                                                      {
                                                            label: "Enable Claim System",
                                                            description: "Enable the Claim System",
                                                            value: "Enable-Claim",
                                                            emoji: "✅"
                                                     }
                                                   )
                                             )
                                    }
              
                                    if (data == true) {
                                      row.setComponents(
                                          new SelectMenuBuilder()
                                          .setCustomId("Ticket-System-Part-1")
                                          .setPlaceholder("Click me to Control the Ticket System")
                                                 .setOptions(
                                                      {
                                                            label: "Disable Claim System",
                                                            description: "Disable the Claim System",
                                                            value: "Disable-Claim",
                                                            emoji: "❌"
                                                     }
                                                   )
                                      )
                                     }

                                     const embed4 = new EmbedBuilder()
                                     .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                     .setDescription(`***Select What \`Option\` You want To Control below.***`)
                                     .setColor("Green")
                                     .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                     .setTimestamp()

                                     await interaction3.reply({ embeds: [embed4], components: [row] })

                                     const filter = (interaction) => interaction.user.id === message.author.id;
                     
                                     const collector4 = message.channel.createMessageComponentCollector({
                                       filter,
                                       max: 1, 
                                       time: 50000,
                                     }); 
         
                                     collector4.on("collect", async interaction3 => {
                                       try {
                                           if (interaction3.user.id !== message.author.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${message.author.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                                       } catch(e) {
                                             return;
                                       } 

                                       if (interaction3.values == "Enable-Claim") {

                                          const embed3 = new EmbedBuilder()
                                          .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                          .setDescription(`~~***Select What \`Option\` You want To Control below.***~~`)
                                          .setColor("Green")
                                          .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                          .setTimestamp()
              
                                          await interaction3.message.edit({embeds: [embed3],  components: [], content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction.values}\`***`}).catch((e) => {})

                                                client.TicketSystem.set(interaction.guild.id, true ,`${DataToFetch}.ClaimSystem.Enabled`)

                                                interaction3.reply({
                                                         embeds: [
                                                              new EmbedBuilder()
                                                              .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                              .setDescription(`***Claim System is Now Enabled For ${DataToFetch}***`)
                                                              .setColor("Green")
                                                              .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                              .setTimestamp()
                                                         ]
                                                })


                                       }
                                       if (interaction3.values == "Disable-Claim") {
                                          const embed3 = new EmbedBuilder()
                                          .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                          .setDescription(`~~***Select What \`Option\` You want To Control below.***~~`)
                                          .setColor("Green")
                                          .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                          .setTimestamp()
              
                                          await interaction3.message.edit({embeds: [embed3],  components: [], content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction.values}\`***`}).catch((e) => {})

                                                client.TicketSystem.set(interaction.guild.id, false ,`${DataToFetch}.ClaimSystem.Enabled`)

                                                interaction3.reply({
                                                         embeds: [
                                                              new EmbedBuilder()
                                                              .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                              .setDescription(`***Claim System is Now Disabled For ${DataToFetch}***`)
                                                              .setColor("Red")
                                                              .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                              .setTimestamp()
                                                         ]
                                                })
                                    }
                                    })
                                 }
                        })
                  }

                    if (interaction.values == "remove-ticket-role") {
                        interaction.message.edit({
                              embeds: [ 
                                    new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`~~***Select What you Want To \`Control\` Down below.***~~`)
                                    .setColor("Green")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()
                              ],
                              components: [],
                              content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction.values}\`***`  
                      })

                      const row = new ActionRowBuilder()
                      .addComponents(
                            new SelectMenuBuilder()
                            .setCustomId("Ticket-System-Part-1")
                            .setPlaceholder("Click me to Control the Ticket System")
                            .addOptions(
                             SetupOptions.map(option => {
                                              return {
                                                       label: option.Label,
                                                       description: option.Description,
                                                       value: option.Value,
                                                       emoji: option.Emoji
                                              }
                                  })
                            ))

                            const embed3 = new EmbedBuilder()
                            .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                            .setDescription(`***Select What \`Setup\` You want To Control below.***`)
                            .setColor("Yellow")
                            .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                            .setTimestamp()

                            await interaction.reply({embeds: [embed3], components: [row]}).catch((e) => {})

                            const filter = (interaction) => interaction.user.id === message.author.id;
                     
                            const collector3 = message.channel.createMessageComponentCollector({
                              filter,
                              max: 1, 
                              time: 50000,
                            }); 

                            collector3.on("collect", async interaction3 => {
                              try {
                                  if (interaction3.user.id !== message.author.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${message.author.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                              } catch(e) {
                                    return;
                              } 
                                 if (interaction3.customId == "Ticket-System-Part-1") {
                                    const embed3 = new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`~~***Select What \`Setup\` You want To Control below.***~~`)
                                    .setColor("Yellow")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()
        
                                                                        await interaction3.message.edit({embeds: [embed3], components: [], content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction3.values}\`***`  }).catch((e) => {})

                                    const embed4 = new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`***Please Provide the Ticket Role.***`)
                                    .setColor("Yellow")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()

                                    interaction3.reply({
                                             embeds: [embed4]
                                    })

                                    interaction3.channel.awaitMessages({
                                          max: 1, 
                                          time: 60000, 
                                          filter: m => m.author.id === message.author.id,
                                          errors: ['time']
                                         })   
                                         .then(async (collected) => {
                                          const embed4 = new EmbedBuilder()
                                          .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                          .setDescription(`~~***Please Provide a Ticket \`Staff Role\`***~~`)
                                          .setColor("Yellow")
                                          .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                          .setTimestamp()
      
                                          interaction3.editReply({
                                                   embeds: [embed4]
                                          })

                                          client.channels.fetch(message.channel.id).then(ch => {
                                                ch.messages.fetch(collected.first().id).then(async msg => {

                                          const DataToFetch = `${interaction3.values}`.replace("-", "")

                                          if(isNaN(collected.first().content) || !message.guild.roles.cache.get(collected.first().content)) {
                                                 return msg.reply({
                                                         embeds: [
                                                              new EmbedBuilder()
                                                              .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                              .setDescription(`*** You did not Provide a Valid Role Id. ***`)
                                                              .setColor("Yellow")
                                                              .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                              .setTimestamp()
                                                         ]
                                                 })
                                          }

                                          if (message.guild.roles.cache.get(collected.first().content)) {
                                                const data = client.TicketSystem.get(interaction.guild.id, `${DataToFetch}.StaffRoles`)
                                                if (!data.includes(collected.first().content)) {
                                                        return msg.reply({
                                                               embeds: [
                                                                  new EmbedBuilder()
                                                                  .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                  .setDescription(`<:declined:1005930821934399488> ***Does not Seem \`${collected.first().content}\` is in the Database***`)
                                                                  .setColor("Yellow")
                                                                  .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                  .setTimestamp()
                                                               ]
                                                        })
                                                }
                                                client.TicketSystem.remove(interaction.guild.id, message.guild.roles.cache.get(collected.first().content).id ,`${DataToFetch}.StaffRoles`)

                                                            msg.reply({
                                                                  embeds: [
                                                                       new EmbedBuilder()
                                                                       .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                       .setDescription(`<:check:1005732038004981780> __***Successfully Removed ${message.guild.roles.cache.get()} From Database***__`)
                                                                       .setColor("Yellow")
                                                                       .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                       .setTimestamp()
                                                                  ]
                                                          })
                                          }
                                            })})
                                         })


                                 }
                            })
                    }

                     if (interaction.values == "add-ticket-role") {
                        interaction.message.edit({
                              embeds: [ 
                                    new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`~~***Select What you Want To \`Control\` Down below.***~~`)
                                    .setColor("Green")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()
                              ],
                              components: [],
                              content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction.values}\`***`  
                      })

                      const row = new ActionRowBuilder()
                      .addComponents(
                            new SelectMenuBuilder()
                            .setCustomId("Ticket-System-Part-1")
                            .setPlaceholder("Click me to Control the Ticket System")
                            .addOptions(
                             SetupOptions.map(option => {
                                              return {
                                                       label: option.Label,
                                                       description: option.Description,
                                                       value: option.Value,
                                                       emoji: option.Emoji
                                              }
                                  })
                            ))

                            const embed3 = new EmbedBuilder()
                            .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                            .setDescription(`***Select What \`Setup\` You want To Control below.***`)
                            .setColor("Yellow")
                            .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                            .setTimestamp()

                            await interaction.reply({embeds: [embed3], components: [row]}).catch((e) => {})

                            const filter = (interaction) => interaction.user.id === message.author.id;
                     
                            const collector3 = message.channel.createMessageComponentCollector({
                              filter,
                              max: 1, 
                              time: 50000,
                            }); 

                            collector3.on("collect", async interaction3 => {
                              try {
                                  if (interaction3.user.id !== message.author.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${message.author.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                              } catch(e) {
                                    return;
                              } 
                                 if (interaction3.customId == "Ticket-System-Part-1") {
                                    const embed3 = new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`~~***Select What \`Setup\` You want To Control below.***~~`)
                                    .setColor("Yellow")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()
        
                                    await interaction3.message.edit({embeds: [embed3],  components: [], content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction.values}\`***`}).catch((e) => {})

                                    const embed4 = new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`***Please Provide a Ticket \`Staff Role\`***`)
                                    .setColor("Yellow")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()

                                    interaction3.reply({
                                             embeds: [embed4]
                                    })

                                    interaction3.channel.awaitMessages({
                                          max: 1, 
                                          time: 60000, 
                                          filter: m => m.author.id === message.author.id,
                                          errors: ['time']
                                         })   
                                         .then(async (collected) => {
                                          const embed4 = new EmbedBuilder()
                                          .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                          .setDescription(`~~***Please Provide a Ticket \`Staff Role\`***~~`)
                                          .setColor("Yellow")
                                          .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                          .setTimestamp()
      
                                          interaction3.editReply({
                                                   embeds: [embed4]
                                          })

                                          const DataToFetch = `${interaction3.values}`.replace("-", "")

                                          const data = client.TicketSystem.get(interaction.guild.id, `${DataToFetch}.StaffRoles`)

                                          if (data.length == 2) {

                                                client.channels.fetch(message.channel.id).then(ch => {
                                                      ch.messages.fetch(collected.first().id).then(async msg => {
                                                            return msg.reply({
                                                                  embeds: [
                                                                       new EmbedBuilder()
                                                                       .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                       .setDescription(`*** You can Only Have 2 Roles. ***`)
                                                                       .setColor("Yellow")
                                                                       .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                       .setTimestamp()
                                                                  ]
                                                          })
                                                      })
                                                })
                                          } 

                                          if (message.guild.roles.cache.get(collected.first().mentions.roles.first().id)) {
                                                client.TicketSystem.push(interaction.guild.id, message.guild.roles.cache.get(collected.first().mentions.roles.first().id).id ,`${DataToFetch}.StaffRoles`)

                                                client.channels.fetch(message.channel.id).then(ch => {
                                                      ch.messages.fetch(collected.first().id).then(async msg => {
                                                            msg.reply({
                                                                  embeds: [
                                                                       new EmbedBuilder()
                                                                       .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                       .setDescription(`<:check:1005732038004981780> __***Successfully Set the Database As: ${message.guild.roles.cache.get(collected.first().mentions.roles.first().id)}***__`)
                                                                       .setColor("Yellow")
                                                                       .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                       .setTimestamp()
                                                                  ]
                                                          })
                                                      })})
                                                      return;
                                          } else if(isNaN(collected.first().content) || !message.guild.roles.cache.get(collected.first().content) || !message.guild.roles.cache.get(collected.first().mentions.roles.first().id)) {
                                                client.channels.fetch(message.channel.id).then(ch => {
                                                      ch.messages.fetch(collected.first().id).then(async msg => {
                                                            return msg.reply({
                                                                  embeds: [
                                                                       new EmbedBuilder()
                                                                       .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                       .setDescription(`*** You did not Provide a Valid Role Id. ***`)
                                                                       .setColor("Yellow")
                                                                       .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                       .setTimestamp()
                                                                  ]
                                                          })
                                                      })})
                                          } else if (message.guild.roles.cache.get(collected.first().content)) {
                                                client.TicketSystem.push(interaction.guild.id, message.guild.roles.cache.get(collected.first().content).id ,`${DataToFetch}.StaffRoles`)

                                                client.channels.fetch(message.channel.id).then(ch => {
                                                      ch.messages.fetch(collected.first().id).then(async msg => {
                                                            msg.reply({
                                                                  embeds: [
                                                                       new EmbedBuilder()
                                                                       .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                       .setDescription(`<:check:1005732038004981780> __***Successfully Set the Database As: ${message.guild.roles.cache.get(collected.first().content)}***__`)
                                                                       .setColor("Yellow")
                                                                       .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                       .setTimestamp()
                                                                  ]
                                                          })
                                                      })})
                                          } 
                                         })


                                 }
                            })

                     }

                     if (interaction.values == "delete") {

                        interaction.message.edit({
                              embeds: [ 
                                    new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`~~***Select What you Want To \`Control\` Down below.***~~`)
                                    .setColor("Green")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()
                              ],
                              components: [],
                              content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction.values}\`***`  
                      })

                        const row = new ActionRowBuilder()
                        .addComponents(
                              new SelectMenuBuilder()
                              .setCustomId("Ticket-System-Part-1")
                              .setPlaceholder("Click me to Control the Ticket System")
                              .addOptions(
                               SetupOptions.map(option => {
                                                return {
                                                         label: option.Label,
                                                         description: option.Description,
                                                         value: option.Value,
                                                         emoji: option.Emoji
                                                }
                                    })
                              ))

                              const embed3 = new EmbedBuilder()
                              .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                              .setDescription(`***Select What \`Setup\` You want To Control below.***`)
                              .setColor("Yellow")
                              .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                              .setTimestamp()

                              await interaction.reply({embeds: [embed3], components: [row]}).catch((e) => {})

                              const filter = (interaction) => interaction.user.id === message.author.id;
                       
                              const collector3 = message.channel.createMessageComponentCollector({
                                filter,
                                max: 1, 
                                time: 50000,
                              });

                              collector3.on("collect", async interaction3 => {
                                try {
                                    if (interaction3.user.id !== message.author.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${message.author.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                                } catch(e) {
                                      return;
                                } 
                                 if (interaction3.customId == "Ticket-System-Part-1") {

                                    interaction3.message.edit({
                                          embeds: [ 
                                                new EmbedBuilder()
                                                .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                .setDescription(`~~***Select What \`Setup\` You want To Control below.***~~`)
                                                .setColor("Green")
                                                .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                .setTimestamp()
                                          ],
                                          components: [],
                                          content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction3.values}\`***`  
                                  })

                                        const DataToFetch = `${interaction3.values}`.replace("-", "")

                                        const data = client.TicketSystem.get(interaction.guild.id, `${DataToFetch}`)

                                        if (!data) {
                                               return interaction3.reply({
                                                  embeds: [ new EmbedBuilder()
                                                      .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                      .setDescription(`***Ticket System \`Number ${DataToFetch.slice(5, 6)}\` Is not Setup, So I can't Delete.***`)
                                                      .setColor("Red")
                                                      .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                      .setTimestamp()]
                                               })
                                        }

                                        interaction3.deferUpdate().catch(e => {}) 

                                        const embed = new EmbedBuilder()
                                        .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                        .setColor("Yellow")
                                        .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                        .setTimestamp()

                                        interaction.channel.send({
                                             embeds: [embed]
                                        }).then(async (msg) => {
                                             const embed1 = new EmbedBuilder()
                                             .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                             .setDescription(`<a:TicketLoading:1023053249407877141> Fetch the Database\n◽Edit the Message\n◽Finish the edit`)
                                             .setColor("Yellow")
                                             .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                             .setTimestamp()
                                             
                                             msg.edit({ embeds: [embed1] })

                                             setTimeout(() => {
                                                const embed1 = new EmbedBuilder()
                                                .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                .setDescription(`<:check:1005732038004981780> Fetch the Database\n<a:TicketLoading:1023053249407877141> Delete Database For ${DataToFetch}\n◽Finish the Deletion`)
                                                .setColor("Yellow")
                                                .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                .setTimestamp()
                                                
                                                msg.edit({ embeds: [embed1] })

                                                client.channels.fetch(client.TicketSystem.get(interaction.guild.id, `${DataToFetch}.Channel`)).then(async (ch) => {
                                                      await ch.messages.fetch(client.TicketSystem.get(interaction.guild.id, `${DataToFetch}.msg`)).then(async msg1 => {
                                                            msg1.delete()   
                                                      })})
                                                
                                                setTimeout(() => {

                                                      client.TicketSystem.delete(interaction.guild.id, `${DataToFetch}`)

                                                      const embed1 = new EmbedBuilder()
                                                      .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                      .setDescription(`<:check:1005732038004981780> Fetch the Database\n<:check:1005732038004981780> Delete Database For ${DataToFetch}\n<a:TicketLoading:1023053249407877141> Finish the Deletion`)
                                                      .setColor("Yellow")
                                                      .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                      .setTimestamp()
                                                      
                                                      msg.edit({ embeds: [embed1] })

                                                      setTimeout(() => {
                                                            const embed1 = new EmbedBuilder()
                                                            .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                            .setDescription(`<:check:1005732038004981780> Fetch the Database\n<:check:1005732038004981780> Delete Database For ${DataToFetch}\n<:check:1005732038004981780> Finish the Deletion`)
                                                            .setColor("Green")
                                                            .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                            .setTimestamp()
                                                            
                                                            msg.edit({ embeds: [embed1] })


                                                            msg.reply({  
                                                                    embeds: [
                                                                        new EmbedBuilder()
                                                                        .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                        .setDescription(`***Successfully Deleted the Ticket System ${DataToFetch}!***`)
                                                                        .setColor("Green")
                                                                        .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                        .setTimestamp()
                                                                    ]
                                                             })


                                                      }, 2000);
                                                      
                                                   }, 2000);
                                             }, 2000);
                                        })

                                    //     console.log(DataToFetch)
                                 }
                              })
                     }
                     if (interaction.values == "Edit-Messages") {
                           
                        interaction.message.edit({
                              embeds: [ 
                                    new EmbedBuilder()
                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                    .setDescription(`~~***Select What you Want To \`Control\` Down below.***~~`)
                                    .setColor("Green")
                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                    .setTimestamp()
                              ],
                              components: [],
                              content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction.values}\`***`  
                      })

                      const row = new ActionRowBuilder()
                      .addComponents(
                            new SelectMenuBuilder()
                            .setCustomId("Ticket-System-Part-1")
                            .setPlaceholder("Click me to Control the Ticket System")
                            .addOptions(
                                  TicketMessageOptions.map(option => {
                                              return {
                                                       label: option.Label,
                                                       description: option.Description,
                                                       value: option.Value,
                                                       emoji: option.Emoji
                                              }
                                  })
                            ))

                            const embed = new EmbedBuilder()
                            .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                            .setDescription(`***Select What You want to  \`Edit\` below.***`)
                            .setColor("Yellow")
                            .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                            .setTimestamp()

                            await interaction.reply({embeds: [embed], components: [row]}).catch((e) => {})

                            const filter = (interaction) => interaction.user.id === message.author.id;
                     
                            const collector1 = message.channel.createMessageComponentCollector({
                              filter,
                              max: 1, 
                              time: 50000,
                            });

                            collector1.on("collect", async interaction1 => {
                              try {
                                  if (interaction.user.id !== message.author.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${message.author.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                              } catch(e) {
                                    return;
                              } 
                              if (interaction1.customId == "Ticket-System-Part-1") {
                                    interaction1.message.edit({
                                          embeds: [ 
                                                new EmbedBuilder()
                                                .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                .setDescription(`~~***Select What You want to  \`Edit\` below.***~~`)
                                                .setColor("Green")
                                                .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                .setTimestamp()
                                          ],
                                          components: [],
                                          content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction1.values}\`***`  
                                         })
                                         const row = new ActionRowBuilder()
                                         .addComponents(
                                               new SelectMenuBuilder()
                                               .setCustomId("Ticket-System-Part-1")
                                               .setPlaceholder("Click me to Control the Ticket System")
                                               .addOptions(
                                                     TicketMessageOptionsExtra.map(option => {
                                                                 return {
                                                                          label: option.Label,
                                                                          description: option.Description,
                                                                          value: option.Value,
                                                                          emoji: option.Emoji
                                                                 }
                                                     })
                                               ))
                 
                                               const embed = new EmbedBuilder()
                                               .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                               .setDescription(`***Select What \`Embed Option\` You want To Control below.***`)
                                               .setColor("Yellow")
                                               .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                               .setTimestamp()
                 
                                               await interaction1.reply({embeds: [embed], components: [row]}).catch((e) => {})
                 
                                               const filter = (interaction) => interaction.user.id === message.author.id;
                                        
                                               const collector1 = message.channel.createMessageComponentCollector({
                                                 filter,
                                                 max: 1, 
                                                 time: 50000,
                                               });
                 
                                               collector1.on("collect", async interaction2 => {
                                                 try {
                                                     if (interaction2.user.id !== message.author.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${message.author.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                                                 } catch(e) {
                                                       return;
                                                 } 
                                                        if (interaction2.customId == "Ticket-System-Part-1") {

                                                            interaction2.message.edit({
                                                                  embeds: [ 
                                                                        new EmbedBuilder()
                                                                        .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                        .setDescription(`~~***Select What \`Embed Option\` You want To Control below.***~~`)
                                                                        .setColor("Green")
                                                                        .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                        .setTimestamp()
                                                                  ],
                                                                  components: [],
                                                                  content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction2.values}\`***`  
                                                                 })
                   

                                                           const row = new ActionRowBuilder()
                                                           .addComponents(
                                                                 new SelectMenuBuilder()
                                                                 .setCustomId("Ticket-System-Part-1")
                                                                 .setPlaceholder("Click me to Control the Ticket System")
                                                                 .addOptions(
                                                                  SetupOptions.map(option => {
                                                                                   return {
                                                                                            label: option.Label,
                                                                                            description: option.Description,
                                                                                            value: option.Value,
                                                                                            emoji: option.Emoji
                                                                                   }
                                                                       })
                                                                 ))
                                   
                                                                 const embed3 = new EmbedBuilder()
                                                                 .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                 .setDescription(`***Select What \`Setup\` You want To Control below.***`)
                                                                 .setColor("Yellow")
                                                                 .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                 .setTimestamp()
                                   
                                                                 await interaction2.reply({embeds: [embed3], components: [row]}).catch((e) => {})
                                   
                                                                 const filter = (interaction) => interaction.user.id === message.author.id;
                                                          
                                                                 const collector3 = message.channel.createMessageComponentCollector({
                                                                   filter,
                                                                   max: 1, 
                                                                   time: 50000,
                                                                 });
                                   
                                                                 collector3.on("collect", async interaction3 => {
                                                                   try {
                                                                       if (interaction3.user.id !== message.author.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${message.author.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                                                                   } catch(e) {
                                                                         return;
                                                                   } 
                                                                   if (interaction3.customId == "Ticket-System-Part-1") {
                                                                        interaction3.message.edit({
                                                                              embeds: [ 
                                                                                    new EmbedBuilder()
                                                                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                    .setDescription(`~~***Select What \`Setup\` You want To Control below.***~~`)
                                                                                    .setColor("Green")
                                                                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                    .setTimestamp()
                                                                              ],
                                                                              components: [],
                                                                              content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction3.values}\`***`  
                                                                             })
                                  
                                                                             const embed = new EmbedBuilder()
                                                                             .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                             .setDescription(`***Please Provide me a \`${interaction2.values == "Title-Option" ? `${interaction2.values}`.slice(0,5) : interaction2.values == "Description-Option" ? `${interaction2.values}`.slice(0, 11) : "Nothing"}\` below.***`)
                                                                             .setColor("Yellow")
                                                                             .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                             .setTimestamp()
                                  
                                                                            await interaction3.reply({embeds: [embed],  components: [], content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction.values}\`***`}).catch((e) => {})

                                                                            interaction1.channel.awaitMessages({
                                                                              max: 1, 
                                                                              time: 60000, 
                                                                              filter: m => m.author.id === message.author.id,
                                                                              errors: ['time']
                                                                             })   
                                                                             .then(async (collected) => {
                                                                              client.channels.fetch(message.channel.id).then(ch => {
                                                                                    ch.messages.fetch(collected.first().id).then(async msg => {
                                                                                        msg.reply({
                                                                                            embeds: [ 
                                                                                                  new EmbedBuilder()
                                                                                                  .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                  .setDescription(`***Now Changing the Ticket System ${interaction1.values}***`)
                                                                                                  .setColor("Green")
                                                                                                  .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                  .setTimestamp()
                                                                                            ],
                                                                                            components: [],
                                                                                           })
                                                                                           const embed = new EmbedBuilder()
                                                                                           .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                           .setColor("Yellow")
                                                                                           .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                           .setTimestamp()
                    
                                                                                           msg.channel.send({
                                                                                                embeds: [embed]
                                                                                           }).then(async (msg) => {
                                                                                                const embed1 = new EmbedBuilder()
                                                                                                .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                .setDescription(`<a:TicketLoading:1023053249407877141> Fetch the Database\n◽Edit the Message\n◽Finish the edit`)
                                                                                                .setColor("Yellow")
                                                                                                .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                .setTimestamp()
                                                                                                
                                                                                                msg.edit({ embeds: [embed1] })

                                                                                                const DataToFetch = `${interaction3.values}`.replace("-", "")

                                                                                                if (interaction1.values == "Open-Message") {
                                                                                                      if (interaction2.values == "Title-Option") {
                                                                                                            const embed1 = new EmbedBuilder()
                                                                                                            .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                            .setDescription(`<:check:1005732038004981780> Fetch the Database\n<a:TicketLoading:1023053249407877141> Edit the Message\n◽Finish the edit`)
                                                                                                            .setColor("Yellow")
                                                                                                            .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                            .setTimestamp()
                                                                                                            
                                                                                                            msg.edit({ embeds: [embed1] })

                                                                                                            client.TicketSystem.set(message.guild.id, collected.first().content,`${DataToFetch}.OpenMessages.Title`)

                                                                                                            const embed2 = new EmbedBuilder()
                                                                                                            .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                            .setDescription(`<:check:1005732038004981780> Fetch the Database\n<:check:1005732038004981780> Set the Database\n<a:TicketLoading:1023053249407877141> Finish the edit`)
                                                                                                            .setColor("Yellow")
                                                                                                            .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                            .setTimestamp()
                                                                                                            
                                                                                                            msg.edit({ embeds: [embed2] })

                                                                                                            setTimeout(() => {
                                                                                                                  const embed2 = new EmbedBuilder()
                                                                                                                  .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                                  .setDescription(`<:check:1005732038004981780> Fetch the Database\n<:check:1005732038004981780>  Set the Database\n<:check:1005732038004981780> Finish the edit`)
                                                                                                                  .setColor("Green")
                                                                                                                  .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                                  .setTimestamp()
                                                                                                                  
                                                                                                                  msg.edit({ embeds: [embed2] })
            
                                                                                                                  msg.reply({
                                                                                                                        embeds: [ 
                                                                                                                              new EmbedBuilder()
                                                                                                                              .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                                              .setDescription(`***Successfully Edited the Ticket System ${interaction1.values}!***`)
                                                                                                                              .setColor("Green")
                                                                                                                              .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                                              .setTimestamp()
                                                                                                                        ],
                                                                                                                        components: [],
                                                                                                                       })
                                                                                                            }, 2000);
                                                                                                      }
                                                                                                      if (interaction2.values == "Description-Option") {
                                                                                                            const embed1 = new EmbedBuilder()
                                                                                                            .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                            .setDescription(`<:check:1005732038004981780> Fetch the Database\n<a:TicketLoading:1023053249407877141> Edit the Message\n◽Finish the edit`)
                                                                                                            .setColor("Yellow")
                                                                                                            .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                            .setTimestamp()
                                                                                                            
                                                                                                            msg.edit({ embeds: [embed1] })

                                                                                                            client.TicketSystem.set(message.guild.id, collected.first().content,`${DataToFetch}.OpenMessages.Description`)

                                                                                                            const embed2 = new EmbedBuilder()
                                                                                                            .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                            .setDescription(`<:check:1005732038004981780> Fetch the Database\n<:check:1005732038004981780> Set the Database\n<a:TicketLoading:1023053249407877141> Finish the edit`)
                                                                                                            .setColor("Yellow")
                                                                                                            .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                            .setTimestamp()
                                                                                                            
                                                                                                            msg.edit({ embeds: [embed2] })

                                                                                                            setTimeout(() => {
                                                                                                                  const embed2 = new EmbedBuilder()
                                                                                                                  .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                                  .setDescription(`<:check:1005732038004981780> Fetch the Database\n<:check:1005732038004981780>  Set the Database\n<:check:1005732038004981780> Finish the edit`)
                                                                                                                  .setColor("Green")
                                                                                                                  .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                                  .setTimestamp()
                                                                                                                  
                                                                                                                  msg.edit({ embeds: [embed2] })
            
                                                                                                                  msg.reply({
                                                                                                                        embeds: [ 
                                                                                                                              new EmbedBuilder()
                                                                                                                              .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                                              .setDescription(`***Successfully Edited the Ticket System ${interaction1.values}!***`)
                                                                                                                              .setColor("Green")
                                                                                                                              .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                                              .setTimestamp()
                                                                                                                        ],
                                                                                                                        components: [],
                                                                                                                       })
                                                                                                            }, 2000);
                                                                                                      }
                                                                                                } 
                                                                                                if (interaction1.values == "Channel-Message") {
                                                                                                      if (interaction2.values == "Title-Option") {
                                                                                                            await client.channels.fetch(client.TicketSystem.get(interaction.guild.id, `${DataToFetch}.Channel`)).then(async (ch) => {
                                                                                                                   await ch.messages.fetch(client.TicketSystem.get(interaction.guild.id, `${DataToFetch}.msg`)).then(async msg1 => {
                                                                                                                         const embed1 = new EmbedBuilder()
                                                                                                                         .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                                         .setDescription(`<:check:1005732038004981780> Fetch the Message\n<a:TicketLoading:1023053249407877141> Edit the Message\n◽Finish the edit`)
                                                                                                                         .setColor("Yellow")
                                                                                                                         .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                                         .setTimestamp()
                                                                                                                         
                                                                                                                         msg.edit({ embeds: [embed1] })
                                                                                                                         
                                                                                                                         const editedEmbed = EmbedBuilder.from(msg1.embeds[0])
                                                                                                                         .setTitle(collected.first().content)

                                                                                                                         client.TicketSystem.set(message.guild.id, collected.first().content,`${DataToFetch}.ChannelMessage.Title`)
             
             
                                                                                                                         // msg1.embeds[0].data.setTitle(collected.first().content)
             
                                                                                                                           await msg1.edit({embeds: [editedEmbed]})
                                                                                                                   })})
                                                                                                                   const embed2 = new EmbedBuilder()
                                                                                                                   .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                                   .setDescription(`<:check:1005732038004981780> Fetch the Message\n<:check:1005732038004981780> Edit the Message\n<a:TicketLoading:1023053249407877141> Finish the edit`)
                                                                                                                   .setColor("Yellow")
                                                                                                                   .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                                   .setTimestamp()
                                                                                                                   
                                                                                                                   msg.edit({ embeds: [embed2] })
                   
                                                                                                                   setTimeout(() => {
                                                                                                                         const embed2 = new EmbedBuilder()
                                                                                                                         .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                                         .setDescription(`<:check:1005732038004981780> Fetch the Message\n<:check:1005732038004981780>  Edit the Message\n<:check:1005732038004981780> Finish the edit`)
                                                                                                                         .setColor("Green")
                                                                                                                         .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                                         .setTimestamp()
                                                                                                                         
                                                                                                                         msg.edit({ embeds: [embed2] })
                   
                                                                                                                         msg.reply({
                                                                                                                               embeds: [ 
                                                                                                                                     new EmbedBuilder()
                                                                                                                                     .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                                                     .setDescription(`***Successfully Edited the Ticket System ${interaction1.values}!***`)
                                                                                                                                     .setColor("Green")
                                                                                                                                     .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                                                     .setTimestamp()
                                                                                                                               ],
                                                                                                                               components: [],
                                                                                                                              })
                                                                                                                   }, 2000);
                                                                                                             }
             
                                                                                                             
                                                                                                             if (interaction2.values == "Description-Option") {
                                                                                                                   client.channels.fetch(client.TicketSystem.get(interaction.guild.id, `${DataToFetch}.Channel`)).then(ch => {
                                                                                                                         ch.messages.fetch(client.TicketSystem.get(interaction.guild.id, `${DataToFetch}.msg`)).then(async msg1 => {
                                                                                                                               const embed1 = new EmbedBuilder()
                                                                                                                               .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                                               .setDescription(`<:check:1005732038004981780> Fetch the Message\n<a:TicketLoading:1023053249407877141> Edit the Message\n◽Finish the edit`)
                                                                                                                               .setColor("Yellow")
                                                                                                                               .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                                               .setTimestamp()
                                                                                                                               
                                                                                                                               msg.edit({ embeds: [embed1] })
                   
                                                                                                                               const editedEmbed = EmbedBuilder.from(msg1.embeds[0]).setDescription(collected.first().content)

                                                                                                                               client.TicketSystem.set(message.guild.id, collected.first().content,`${DataToFetch}.ChannelMessage.Description`)
                   
                                                                                                                                 await msg1.edit({embeds: [editedEmbed]})
                                                                                                                         })})
                                                                                                                         const embed2 = new EmbedBuilder()
                                                                                                                         .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                                         .setDescription(`<:check:1005732038004981780> Fetch the Message\n<:check:1005732038004981780> Edit the Message\n<a:TicketLoading:1023053249407877141> Finish the edit`)
                                                                                                                         .setColor("Yellow")
                                                                                                                         .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                                         .setTimestamp()
                                                                                                                         
                                                                                                                         msg.edit({ embeds: [embed2] })
                         
                                                                                                                         setTimeout(() => {
                                                                                                                               const embed2 = new EmbedBuilder()
                                                                                                                               .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                                               .setDescription(`<:check:1005732038004981780> Fetch the Message\n<:check:1005732038004981780>  Edit the Message\n<:check:1005732038004981780> Finish the edit`)
                                                                                                                               .setColor("Green")
                                                                                                                               .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                                               .setTimestamp()
                                                                                                                               
                                                                                                                               msg.edit({ embeds: [embed2] })
                         
                                                                                                                               msg.reply({
                                                                                                                                     embeds: [ 
                                                                                                                                           new EmbedBuilder()
                                                                                                                                           .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                                                           .setDescription(`***Successfully Edited the Ticket System ${interaction1.values}!***`)
                                                                                                                                           .setColor("Green")
                                                                                                                                           .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                                                           .setTimestamp()
                                                                                                                                     ],
                                                                                                                                     components: [],
                                                                                                                                    })
                                                                                                                         }, 2000);
                                                                                                                   }
                                                                                                }
                                                                                           })
                                                                                          })
                                                                                    })
                                                                             })
                                                                   }
                                                                 })
                                                        }
                                                })
                              }
                        })
                     }
                     if (interaction.values == "setup") {

                        interaction.message.edit({
                                embeds: [ 
                                      new EmbedBuilder()
                                      .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                      .setDescription(`~~***Select What you Want To \`Control\` Down below.***~~`)
                                      .setColor("Green")
                                      .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                      .setTimestamp()
                                ],
                                components: [],
                                content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction.values}\`***`  
                        })

                        const row = new ActionRowBuilder()
                        .addComponents(
                              new SelectMenuBuilder()
                              .setCustomId("Ticket-System-Part-1")
                              .setPlaceholder("Click me to Control the Ticket System")
                              .addOptions(
                                    SetupOptions.map(option => {
                                                return {
                                                         label: option.Label,
                                                         description: option.Description,
                                                         value: option.Value,
                                                         emoji: option.Emoji
                                                }
                                    })
                              ))

                              const embed = new EmbedBuilder()
                              .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                              .setDescription(`***Select What \`Setup\` You want To Control below.***`)
                              .setColor("Yellow")
                              .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                              .setTimestamp()

                              await interaction.reply({embeds: [embed], components: [row]}).catch((e) => {})

                              const filter = (interaction) => interaction.user.id === message.author.id;
                       
                              const collector1 = message.channel.createMessageComponentCollector({
                                filter,
                                max: 1, 
                                time: 50000,
                              });

                              collector1.on("collect", async interaction1 => {
                                try {
                                    if (interaction.user.id !== message.author.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${message.author.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                                } catch(e) {
                                      return;
                                } 
                                       if (interaction1.customId == "Ticket-System-Part-1") {
                                        interaction1.message.edit({
                                            embeds: [ 
                                                  new EmbedBuilder()
                                                  .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                  .setDescription(`~~***Select What \`Setup\` You want To Control below.***~~`)
                                                  .setColor("Green")
                                                  .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                  .setTimestamp()
                                            ],
                                            components: [],
                                            content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction1.values}\`***`  
                                           })

                                           const embed = new EmbedBuilder()
                                           .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                           .setDescription(`***Please Provide me a Discord \`Channel\` Id below.***`)
                                           .setColor("Yellow")
                                           .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                           .setTimestamp()

                                          await interaction1.reply({embeds: [embed],  components: [], content: `***<:check:1005732038004981780> Successfully Selected: \`${interaction.values}\`***`}).catch((e) => {})

                                            
                                            
                                            interaction1.channel.awaitMessages({
                                                max: 1, 
                                                time: 60000, 
                                                filter: m => m.author.id === message.author.id,
                                                errors: ['time']
                                               })   
                                               .then(collected => {
                                                          
                                                         if (isNaN(collected.first().content)) {
                                                            const channel = collected.first().mentions.channels.first()
                                                                   if (message.guild.channels.cache.get(channel.id)) {
                                                                        interaction1.editReply({
                                                                              embeds: [ 
                                                                                    new EmbedBuilder()
                                                                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                    .setDescription(`~~***Please Provide me a Discord \`Channel\` Id below.***~~`)
                                                                                    .setColor("Green")
                                                                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                    .setTimestamp()
                                                                              ],
                                                                              components: [],
                                                                             })
              
                                                                             client.channels.fetch(message.channel.id).then(ch => {
                                                                              ch.messages.fetch(collected.first().id).then(async msg => {
                                                                                  msg.reply({
                                                                                      embeds: [ 
                                                                                            new EmbedBuilder()
                                                                                            .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                            .setDescription(`***Now Setting up the Ticket System in <#${channel.id}>***`)
                                                                                            .setColor("Green")
                                                                                            .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                            .setTimestamp()
                                                                                      ],
                                                                                      components: [],
                                                                                     })
                                                                                     const embed = new EmbedBuilder()
                                                                                     .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                     .setDescription(`◽Send the Message in the Channel..\n◽Setup the Ticket system Database\n◽Finish the Setup`)
                                                                                     .setColor("Yellow")
                                                                                     .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                     .setTimestamp()
              
                                                                                     msg.channel.send({
                                                                                          embeds: [embed]
                                                                                     }).then(msg => {
              
                                                                                      const embed1 = new EmbedBuilder()
                                                                                      .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                      .setDescription(`<a:TicketLoading:1023053249407877141> Send the Message in the Channel..\n◽Setup the Ticket system Database\n◽Finish the Setup`)
                                                                                      .setColor("Yellow")
                                                                                      .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                      .setTimestamp()
                                                                                      
                                                                                      msg.edit({ embeds: [embed1] })
              
                                                                                      setTimeout(() => {
              
                                                                                         const Setup = `${interaction1.values}`.replace("-", "")
                                                                                          const embed2 = new EmbedBuilder()
                                                                                          .setAuthor({name: `Ticket System | ${message.guild.name}`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                          .setDescription(`*Click the Button below to Open a Ticket*`)
                                                                                          .setColor("Green")
                                                                                          .setFooter({ text: `Ticket System | ${message.guild.name}` })
                                                                                          .setTimestamp()
              
                                                                                          const row = new ActionRowBuilder()
                                                                                          .addComponents(
                                                                                                new ButtonBuilder()
                                                                                                .setLabel("Create Ticket")
                                                                                                .setCustomId(`Ticket-System-${Setup}`)
                                                                                                .setStyle(ButtonStyle.Success)
                                                                                          )
              
                                                                                          client.channels.cache.get(channel.id).send({
                                                                                                    embeds: [embed2],
                                                                                                    components: [row]
                                                                                          }).then((msg1) => {
                                                                                              const embed1 = new EmbedBuilder()
                                                                                              .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                              .setDescription(`<:check:1005732038004981780> Send the Message in the Channel..\n<a:TicketLoading:1023053249407877141> Setup the Ticket system Database\n◽Finish the Setup`)
                                                                                              .setColor("Yellow")
                                                                                              .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                              .setTimestamp()
                      
                                                                                              msg.edit({ embeds: [embed1] })
              
                                                                                               if (Setup == "Setup1") {
                                                                                                       client.TicketSystem.set(message.guild.id, { 
                                                                                                        Channel: channel.id, 
                                                                                                        msg: msg1.id,
                                                                                                        OpenCategory: "",
                                                                                                        ClosedCategory: "",
                                                                                                        AutoDelete: {
                                                                                                                Enabled: false,
                                                                                                                Time: 5000
                                                                                                        },
                                                                                                        LoggerSystem: {
                                                                                                              Enabled: false,
                                                                                                              Channel: "",
                                                                                                              Messages: {
                                                                                                                    Title: "Ticket Logs | {GuildName}",
                                                                                                                    Description: "{channel} Got Closed By: {ClosedBy}"
                                                                                                              }
                                                                                                      },
                                                                                                        ChannelName: "🔖・ticket-{username}",
                                                                                                        OpenMessages: {
                                                                                                                 Title: "Hello {user}, We will be Right with you when we can!",
                                                                                                                 Description: "Please wait for a Staff member to claim your ticket!"
                                                                                                        },
                                                                                                        ChannelMessage: {
                                                                                                                     Title: "None Set",
                                                                                                                     Description: "*Click the Button below to Open a Ticket*"  
                                                                                                        },
                                                                                                        ClaimSystem: {
                                                                                                                 Enabled: false,
                                                                                                                 MessageClaim: "{user} Claimed the ticket",
                                                                                                        },
                                                                                                        StaffRoles: [],
                                                                                                        OpenTickets: []
                                                                                                      },`Setup1`)
                                                                                               } else if (Setup == "Setup2") {
                                                                                                  client.TicketSystem.set(message.guild.id, { 
                                                                                                      Channel: channel.id, 
                                                                                                      msg: msg1.id,
                                                                                                      OpenCategory: "",
                                                                                                      ClosedCategory: "",
                                                                                                        AutoDelete: {
                                                                                                              Enabled: false,
                                                                                                              Time: 5000
                                                                                                      },
                                                                                                        LoggerSystem: {
                                                                                                              Enabled: false,
                                                                                                              Channel: "",
                                                                                                              Messages: {
                                                                                                                    Title: "Ticket Logs | {GuildName}",
                                                                                                                    Description: "{channel} Got Closed By: {ClosedBy}"
                                                                                                              }
                                                                                                      },
                                                                                                        ChannelName: "🔖・ticket-{username}",
                                                                                                        OpenMessages: {
                                                                                                              Title: "Hello {user}, We will be Right with you when we can!",
                                                                                                              Description: "Please wait for a Staff member to claim your ticket!"
                                                                                                     },
                                                                                                     ChannelMessage: {
                                                                                                                  Title: "None Set",
                                                                                                                  Description: "*Click the Button below to Open a Ticket*"  
                                                                                                     },
                                                                                                     ClaimSystem: {
                                                                                                              Enabled: false,
                                                                                                              MessageClaim: "{user} Claimed the ticket",
                                                                                                     },
                                                                                                     StaffRoles: [],
                                                                                                     OpenTickets: []
                                                                                                      },`Setup2`)
                                                                                               }  else if (Setup == "Setup3") {
                                                                                                  client.TicketSystem.set(message.guild.id, { 
                                                                                                        Channel: channel.id, 
                                                                                                        msg: msg1.id,
                                                                                                        OpenCategory: "",
                                                                                                        ClosedCategory: "",
                                                                                                        AutoDelete: {
                                                                                                              Enabled: false,
                                                                                                              Time: 5000
                                                                                                      },
                                                                                                        LoggerSystem: {
                                                                                                              Enabled: false,
                                                                                                              Channel: "",
                                                                                                              Messages: {
                                                                                                                    Title: "Ticket Logs | {GuildName}",
                                                                                                                    Description: "{channel} Got Closed By: {ClosedBy}"
                                                                                                              }
                                                                                                      },
                                                                                                        ChannelName: "🔖・ticket-{username}",
                                                                                                        OpenMessages: {
                                                                                                              Title: "Hello {user}, We will be Right with you when we can!",
                                                                                                              Description: "Please wait for a Staff member to claim your ticket!"
                                                                                                     },
                                                                                                     ChannelMessage: {
                                                                                                                  Title: "None Set",
                                                                                                                  Description: "*Click the Button below to Open a Ticket*"  
                                                                                                     },
                                                                                                     ClaimSystem: {
                                                                                                              Enabled: false,
                                                                                                              MessageClaim: "{user} Claimed the ticket",
                                                                                                     },
                                                                                                     StaffRoles: [],
                                                                                                     OpenTickets: []
                                                                                                      },`Setup3`)
                                                                                               }  else if (Setup == "Setup4") {
                                                                                                  client.TicketSystem.set(message.guild.id, { 
                                                                                                        Channel: channel.id, 
                                                                                                        msg: msg1.id,
                                                                                                        OpenCategory: "",
                                                                                                        ClosedCategory: "",
                                                                                                        AutoDelete: {
                                                                                                              Enabled: false,
                                                                                                              Time: 5000
                                                                                                      },
                                                                                                        LoggerSystem: {
                                                                                                              Enabled: false,
                                                                                                              Channel: "",
                                                                                                              Messages: {
                                                                                                                    Title: "Ticket Logs | {GuildName}",
                                                                                                                    Description: "{channel} Got Closed By: {ClosedBy}"
                                                                                                              }
                                                                                                      },
                                                                                                        ChannelName: "🔖・ticket-{username}",
                                                                                                        OpenMessages: {
                                                                                                              Title: "Hello {user}, We will be Right with you when we can!",
                                                                                                              Description: "Please wait for a Staff member to claim your ticket!"
                                                                                                     },
                                                                                                     ChannelMessage: {
                                                                                                                  Title: "None Set",
                                                                                                                  Description: "*Click the Button below to Open a Ticket*"  
                                                                                                     },
                                                                                                     ClaimSystem: {
                                                                                                              Enabled: false,
                                                                                                              MessageClaim: "{user} Claimed the ticket",
                                                                                                     },
                                                                                                     StaffRoles: [],
                                                                                                     OpenTickets: []
                                                                                                      },`Setup4`)
                                                                                               }  else if (Setup == "Setup5") {
                                                                                                  client.TicketSystem.set(message.guild.id, { 
                                                                                                        Channel: channel.id, 
                                                                                                        msg: msg1.id,
                                                                                                        OpenCategory: "",
                                                                                                        ClosedCategory: "",
                                                                                                        AutoDelete: {
                                                                                                              Enabled: false,
                                                                                                              Time: 5000
                                                                                                      },
                                                                                                        LoggerSystem: {
                                                                                                              Enabled: false,
                                                                                                              Channel: "",
                                                                                                              Messages: {
                                                                                                                    Title: "Ticket Logs | {GuildName}",
                                                                                                                    Description: "{channel} Got Closed By: {ClosedBy}"
                                                                                                              }
                                                                                                      },
                                                                                                        ChannelName: "🔖・ticket-{username}",
                                                                                                        OpenMessages: {
                                                                                                              Title: "Hello {user}, We will be Right with you when we can!",
                                                                                                              Description: "Please wait for a Staff member to claim your ticket!"
                                                                                                     },
                                                                                                     ChannelMessage: {
                                                                                                                  Title: "None Set",
                                                                                                                  Description: "*Click the Button below to Open a Ticket*"  
                                                                                                     },
                                                                                                     ClaimSystem: {
                                                                                                              Enabled: false,
                                                                                                              MessageClaim: "{user} Claimed the ticket",
                                                                                                     },
                                                                                                     StaffRoles: [],
                                                                                                     OpenTickets: []
                                                                                                      },`Setup5`)
                                                                                               }  else if (Setup == "Setup6") {
                                                                                                  client.TicketSystem.set(message.guild.id, { 
                                                                                                        Channel: channel.id, 
                                                                                                        msg: msg1.id,
                                                                                                        OpenCategory: "",
                                                                                                        ClosedCategory: "",
                                                                                                        AutoDelete: {
                                                                                                              Enabled: false,
                                                                                                              Time: 5000
                                                                                                      },
                                                                                                        LoggerSystem: {
                                                                                                              Enabled: false,
                                                                                                              Channel: "",
                                                                                                              Messages: {
                                                                                                                    Title: "Ticket Logs | {GuildName}",
                                                                                                                    Description: "{channel} Got Closed By: {ClosedBy}"
                                                                                                              }
                                                                                                      },
                                                                                                        ChannelName: "🔖・ticket-{username}",
                                                                                                        OpenMessages: {
                                                                                                              Title: "Hello {user}, We will be Right with you when we can!",
                                                                                                              Description: "Please wait for a Staff member to claim your ticket!"
                                                                                                     },
                                                                                                     ChannelMessage: {
                                                                                                                  Title: "None Set",
                                                                                                                  Description: "*Click the Button below to Open a Ticket*"  
                                                                                                     },
                                                                                                     ClaimSystem: {
                                                                                                              Enabled: false,
                                                                                                              MessageClaim: "{user} Claimed the ticket",
                                                                                                     },
                                                                                                     StaffRoles: [],
                                                                                                     OpenTickets: []
                                                                                                      },`Setup6`)
                                                                                               }  else if (Setup == "Setup7") {
                                                                                                  client.TicketSystem.set(message.guild.id, { 
                                                                                                        Channel: channel.id, 
                                                                                                        msg: msg1.id,
                                                                                                        OpenCategory: "",
                                                                                                        ClosedCategory: "",
                                                                                                        AutoDelete: {
                                                                                                              Enabled: false,
                                                                                                              Time: 5000
                                                                                                      },
                                                                                                        LoggerSystem: {
                                                                                                              Enabled: false,
                                                                                                              Channel: "",
                                                                                                              Messages: {
                                                                                                                    Title: "Ticket Logs | {GuildName}",
                                                                                                                    Description: "{channel} Got Closed By: {ClosedBy}"
                                                                                                              }
                                                                                                      },
                                                                                                        ChannelName: "🔖・ticket-{username}",
                                                                                                        OpenMessages: {
                                                                                                              Title: "Hello {user}, We will be Right with you when we can!",
                                                                                                              Description: "Please wait for a Staff member to claim your ticket!"
                                                                                                     },
                                                                                                     ChannelMessage: {
                                                                                                                  Title: "None Set",
                                                                                                                  Description: "*Click the Button below to Open a Ticket*"  
                                                                                                     },
                                                                                                     ClaimSystem: {
                                                                                                              Enabled: false,
                                                                                                              MessageClaim: "{user} Claimed the ticket",
                                                                                                     },
                                                                                                     StaffRoles: [],
                                                                                                     OpenTickets: []
                                                                                                      },`Setup7`)
                                                                                               }  else if (Setup == "Setup8") {
                                                                                                  client.TicketSystem.set(message.guild.id, { 
                                                                                                        Channel: channel.id, 
                                                                                                        msg: msg1.id,
                                                                                                        OpenCategory: "",
                                                                                                        ClosedCategory: "",
                                                                                                        AutoDelete: {
                                                                                                              Enabled: false,
                                                                                                              Time: 5000
                                                                                                      },
                                                                                                        LoggerSystem: {
                                                                                                              Enabled: false,
                                                                                                              Channel: "",
                                                                                                              Messages: {
                                                                                                                    Title: "Ticket Logs | {GuildName}",
                                                                                                                    Description: "{channel} Got Closed By: {ClosedBy}"
                                                                                                              }
                                                                                                      },
                                                                                                        ChannelName: "🔖・ticket-{username}",
                                                                                                        OpenMessages: {
                                                                                                              Title: "Hello {user}, We will be Right with you when we can!",
                                                                                                              Description: "Please wait for a Staff member to claim your ticket!"
                                                                                                     },
                                                                                                     ChannelMessage: {
                                                                                                                  Title: "None Set",
                                                                                                                  Description: "*Click the Button below to Open a Ticket*"  
                                                                                                     },
                                                                                                     ClaimSystem: {
                                                                                                              Enabled: false,
                                                                                                              MessageClaim: "{user} Claimed the ticket",
                                                                                                     },
                                                                                                     StaffRoles: [],
                                                                                                     OpenTickets: []
                                                                                                      },`Setup8`)
                                                                                               }  else if (Setup == "Setup9") {
                                                                                                  client.TicketSystem.set(message.guild.id, { 
                                                                                                        Channel: channel.id, 
                                                                                                        msg: msg1.id,
                                                                                                        OpenCategory: "",
                                                                                                        ClosedCategory: "",
                                                                                                        AutoDelete: {
                                                                                                              Enabled: false,
                                                                                                              Time: 5000
                                                                                                      },
                                                                                                        LoggerSystem: {
                                                                                                                Enabled: false,
                                                                                                                Channel: "",
                                                                                                                Messages: {
                                                                                                                      Title: "Ticket Logs | {GuildName}",
                                                                                                                      Description: "{channel} Got Closed By: {ClosedBy}"
                                                                                                                }
                                                                                                        },
                                                                                                        ChannelName: "🔖・ticket-{username}",
                                                                                                        OpenMessages: {
                                                                                                              Title: "Hello {user}, We will be Right with you when we can!",
                                                                                                              Description: "Please wait for a Staff member to claim your ticket!"
                                                                                                     },
                                                                                                     ChannelMessage: {
                                                                                                                  Title: "None Set",
                                                                                                                  Description: "*Click the Button below to Open a Ticket*"  
                                                                                                     },
                                                                                                     ClaimSystem: {
                                                                                                              Enabled: false,
                                                                                                              MessageClaim: "{user} Claimed the ticket",
                                                                                                     },
                                                                                                     StaffRoles: [],
                                                                                                     OpenTickets: []
                                                                                                      },`Setup9`)
                                                                                               } 
              
                                                                                               const embed2 = new EmbedBuilder()
                                                                                               .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                               .setDescription(`<:check:1005732038004981780> Send the Message in the Channel..\n<:check:1005732038004981780> Setup the Ticket system Database\n<a:TicketLoading:1023053249407877141> Finish the Setup`)
                                                                                               .setColor("Yellow")
                                                                                               .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                               .setTimestamp()
                       
                                                                                               msg.edit({ embeds: [embed2] })
              
                                                                                               setTimeout(() => {
                                                                                                  const embed2 = new EmbedBuilder()
                                                                                                  .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                  .setDescription(`<:check:1005732038004981780> Send the Message in the Channel..\n<:check:1005732038004981780> Setup the Ticket system Database\n<:check:1005732038004981780> Finish the Setup`)
                                                                                                  .setColor("Green")
                                                                                                  .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                  .setTimestamp()
                          
                                                                                                  msg.edit({ embeds: [embed2] })
              
                                                                                                  msg.reply({
                                                                                                      embeds: [ 
                                                                                                            new EmbedBuilder()
                                                                                                            .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                            .setDescription(`***Successfully Setup the Ticket System ${interaction1.values}!***`)
                                                                                                            .setColor("Green")
                                                                                                            .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                            .setTimestamp()
                                                                                                      ],
                                                                                                      components: [],
                                                                                                     })
              
              
              
                                                                                              }, 1900);
                                                                                          })
                                                                                      }, 1900);
                                                                                      
                                                                                     })
                                                                              })})
                                                                   } else {
                                                                        interaction1.editReply({
                                                                              embeds: [ 
                                                                                    new EmbedBuilder()
                                                                                    .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                    .setDescription(`~~***Please Provide me a Discord \`Channel\` Id below.***~~`)
                                                                                    .setColor("Red")
                                                                                    .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                    .setTimestamp()
                                                                              ],
                                                                              components: [],
                                                                             })
                                                                             client.channels.fetch(message.channel.id).then(ch => {
                                                                              ch.messages.fetch(collected.first().id).then(async msg => {
                                                                                  msg.reply({
                                                                                      embeds: [ 
                                                                                          new EmbedBuilder()
                                                                                          .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                          .setDescription(`***Provided Content is not a Number / Channel.***`)
                                                                                          .setColor("Red")
                                                                                          .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                          .setTimestamp()
                                                                                    ],
                                                                                    components: [],
                                                                                })
                                                                              })
                                                                           })
                                                                   }
                                                         } else if (client.channels.cache.get(collected.first().content) == null) {
                                                            interaction1.editReply({
                                                                embeds: [ 
                                                                      new EmbedBuilder()
                                                                      .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                      .setDescription(`~~***Please Provide me a Discord \`Channel\` Id below.***~~`)
                                                                      .setColor("Red")
                                                                      .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                      .setTimestamp()
                                                                ],
                                                                components: [],
                                                               })
                                                               client.channels.fetch(message.channel.id).then(ch => {
                                                                ch.messages.fetch(collected.first().id).then(async msg => {
                                                                    msg.reply({
                                                                        embeds: [ 
                                                                            new EmbedBuilder()
                                                                            .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                            .setDescription(`***Provided Content is not a Number / Channel.***`)
                                                                            .setColor("Red")
                                                                            .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                            .setTimestamp()
                                                                      ],
                                                                      components: [],
                                                                  })
                                                                })
                                                             })
                                                         } else {
                                                            interaction1.editReply({
                                                                  embeds: [ 
                                                                        new EmbedBuilder()
                                                                        .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                        .setDescription(`~~***Please Provide me a Discord \`Channel\` Id below.***~~`)
                                                                        .setColor("Green")
                                                                        .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                        .setTimestamp()
                                                                  ],
                                                                  components: [],
                                                                 })
  
                                                                 client.channels.fetch(message.channel.id).then(ch => {
                                                                  ch.messages.fetch(collected.first().id).then(async msg => {
                                                                      msg.reply({
                                                                          embeds: [ 
                                                                                new EmbedBuilder()
                                                                                .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                .setDescription(`***Now Setting up the Ticket System in <#${collected.first().content}>***`)
                                                                                .setColor("Green")
                                                                                .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                .setTimestamp()
                                                                          ],
                                                                          components: [],
                                                                         })
                                                                         const embed = new EmbedBuilder()
                                                                         .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                         .setDescription(`◽Send the Message in the Channel..\n◽Setup the Ticket system Database\n◽Finish the Setup`)
                                                                         .setColor("Yellow")
                                                                         .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                         .setTimestamp()
  
                                                                         msg.channel.send({
                                                                              embeds: [embed]
                                                                         }).then(msg => {
  
                                                                          const embed1 = new EmbedBuilder()
                                                                          .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                          .setDescription(`<a:TicketLoading:1023053249407877141> Send the Message in the Channel..\n◽Setup the Ticket system Database\n◽Finish the Setup`)
                                                                          .setColor("Yellow")
                                                                          .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                          .setTimestamp()
                                                                          
                                                                          msg.edit({ embeds: [embed1] })
  
                                                                          setTimeout(() => {
  
                                                                             const Setup = `${interaction1.values}`.replace("-", "")
                                                                              const embed2 = new EmbedBuilder()
                                                                              .setAuthor({name: `Ticket System | ${message.guild.name}`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                              .setDescription(`*Click the Button below to Open a Ticket*`)
                                                                              .setColor("Green")
                                                                              .setFooter({ text: `Ticket System | ${message.guild.name}` })
                                                                              .setTimestamp()
  
                                                                              const row = new ActionRowBuilder()
                                                                              .addComponents(
                                                                                    new ButtonBuilder()
                                                                                    .setLabel("Create Ticket")
                                                                                    .setCustomId(`Ticket-System-${Setup}`)
                                                                                    .setStyle(ButtonStyle.Success)
                                                                              )
  
                                                                              client.channels.cache.get(collected.first().content).send({
                                                                                        embeds: [embed2],
                                                                                        components: [row]
                                                                              }).then((msg1) => {
                                                                                  const embed1 = new EmbedBuilder()
                                                                                  .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                  .setDescription(`<:check:1005732038004981780> Send the Message in the Channel..\n<a:TicketLoading:1023053249407877141> Setup the Ticket system Database\n◽Finish the Setup`)
                                                                                  .setColor("Yellow")
                                                                                  .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                  .setTimestamp()
          
                                                                                  msg.edit({ embeds: [embed1] })
  
                                                                                   if (Setup == "Setup1") {
                                                                                           client.TicketSystem.set(message.guild.id, { 
                                                                                            Channel: collected.first().content, 
                                                                                            msg: msg1.id,
                                                                                            OpenCategory: client.channels.cache.get(collected.first().content)?.parent.id,
                                                                                            ClosedCategory: "",
                                                                                            AutoDelete: {
                                                                                                    Enabled: false,
                                                                                                    Time: 5000
                                                                                            },
                                                                                            LoggerSystem: {
                                                                                                  Enabled: false,
                                                                                                  Channel: "",
                                                                                                  Messages: {
                                                                                                        Title: "Ticket Logs | {GuildName}",
                                                                                                        Description: "{channel} Got Closed By: {ClosedBy}"
                                                                                                  }
                                                                                          },
                                                                                            ChannelName: "🔖・ticket-{username}",
                                                                                            OpenMessages: {
                                                                                                     Title: "Hello {user}, We will be Right with you when we can!",
                                                                                                     Description: "Please wait for a Staff member to claim your ticket!"
                                                                                            },
                                                                                            ChannelMessage: {
                                                                                                         Title: "None Set",
                                                                                                         Description: "*Click the Button below to Open a Ticket*"  
                                                                                            },
                                                                                            ClaimSystem: {
                                                                                                     Enabled: false,
                                                                                                     MessageClaim: "{user} Claimed the ticket",
                                                                                            },
                                                                                            StaffRoles: [],
                                                                                            OpenTickets: []
                                                                                          },`Setup1`)
                                                                                   } else if (Setup == "Setup2") {
                                                                                      client.TicketSystem.set(message.guild.id, { 
                                                                                            Channel: collected.first().content, 
                                                                                            msg: msg1.id,
                                                                                            OpenCategory: client.channels.cache.get(collected.first().content)?.parent.id,
                                                                                            ClosedCategory: "",
                                                                                            AutoDelete: {
                                                                                                  Enabled: false,
                                                                                                  Time: 5000
                                                                                          },
                                                                                            LoggerSystem: {
                                                                                                  Enabled: false,
                                                                                                  Channel: "",
                                                                                                  Messages: {
                                                                                                        Title: "Ticket Logs | {GuildName}",
                                                                                                        Description: "{channel} Got Closed By: {ClosedBy}"
                                                                                                  }
                                                                                          },
                                                                                            ChannelName: "🔖・ticket-{username}",
                                                                                            OpenMessages: {
                                                                                                  Title: "Hello {user}, We will be Right with you when we can!",
                                                                                                  Description: "Please wait for a Staff member to claim your ticket!"
                                                                                         },
                                                                                         ChannelMessage: {
                                                                                                      Title: "None Set",
                                                                                                      Description: "*Click the Button below to Open a Ticket*"  
                                                                                         },
                                                                                         ClaimSystem: {
                                                                                                  Enabled: false,
                                                                                                  MessageClaim: "{user} Claimed the ticket",
                                                                                         },
                                                                                         StaffRoles: [],
                                                                                         OpenTickets: []
                                                                                          },`Setup2`)
                                                                                   }  else if (Setup == "Setup3") {
                                                                                      client.TicketSystem.set(message.guild.id, { 
                                                                                            Channel: collected.first().content, 
                                                                                            msg: msg1.id,
                                                                                            OpenCategory: "",
                                                                                            ClosedCategory: "",
                                                                                            AutoDelete: {
                                                                                                  Enabled: false,
                                                                                                  Time: 5000
                                                                                          },
                                                                                            LoggerSystem: {
                                                                                                  Enabled: false,
                                                                                                  Channel: "",
                                                                                                  Messages: {
                                                                                                        Title: "Ticket Logs | {GuildName}",
                                                                                                        Description: "{channel} Got Closed By: {ClosedBy}"
                                                                                                  }
                                                                                          },
                                                                                            ChannelName: "🔖・ticket-{username}",
                                                                                            OpenMessages: {
                                                                                                  Title: "Hello {user}, We will be Right with you when we can!",
                                                                                                  Description: "Please wait for a Staff member to claim your ticket!"
                                                                                         },
                                                                                         ChannelMessage: {
                                                                                                      Title: "None Set",
                                                                                                      Description: "*Click the Button below to Open a Ticket*"  
                                                                                         },
                                                                                         ClaimSystem: {
                                                                                                  Enabled: false,
                                                                                                  MessageClaim: "{user} Claimed the ticket",
                                                                                         },
                                                                                         StaffRoles: [],
                                                                                         OpenTickets: []
                                                                                          },`Setup3`)
                                                                                   }  else if (Setup == "Setup4") {
                                                                                      client.TicketSystem.set(message.guild.id, { 
                                                                                            Channel: collected.first().content, 
                                                                                            msg: msg1.id,
                                                                                            OpenCategory: "",
                                                                                            ClosedCategory: "",
                                                                                            AutoDelete: {
                                                                                                  Enabled: false,
                                                                                                  Time: 5000
                                                                                          },
                                                                                            LoggerSystem: {
                                                                                                  Enabled: false,
                                                                                                  Channel: "",
                                                                                                  Messages: {
                                                                                                        Title: "Ticket Logs | {GuildName}",
                                                                                                        Description: "{channel} Got Closed By: {ClosedBy}"
                                                                                                  }
                                                                                          },
                                                                                            ChannelName: "🔖・ticket-{username}",
                                                                                            OpenMessages: {
                                                                                                  Title: "Hello {user}, We will be Right with you when we can!",
                                                                                                  Description: "Please wait for a Staff member to claim your ticket!"
                                                                                         },
                                                                                         ChannelMessage: {
                                                                                                      Title: "None Set",
                                                                                                      Description: "*Click the Button below to Open a Ticket*"  
                                                                                         },
                                                                                         ClaimSystem: {
                                                                                                  Enabled: false,
                                                                                                  MessageClaim: "{user} Claimed the ticket",
                                                                                         },
                                                                                         StaffRoles: [],
                                                                                         OpenTickets: []
                                                                                          },`Setup4`)
                                                                                   }  else if (Setup == "Setup5") {
                                                                                      client.TicketSystem.set(message.guild.id, { 
                                                                                            Channel: collected.first().content, 
                                                                                            msg: msg1.id,
                                                                                            OpenCategory: "",
                                                                                            ClosedCategory: "",
                                                                                            AutoDelete: {
                                                                                                  Enabled: false,
                                                                                                  Time: 5000
                                                                                          },
                                                                                            LoggerSystem: {
                                                                                                  Enabled: false,
                                                                                                  Channel: "",
                                                                                                  Messages: {
                                                                                                        Title: "Ticket Logs | {GuildName}",
                                                                                                        Description: "{channel} Got Closed By: {ClosedBy}"
                                                                                                  }
                                                                                          },
                                                                                            ChannelName: "🔖・ticket-{username}",
                                                                                            OpenMessages: {
                                                                                                  Title: "Hello {user}, We will be Right with you when we can!",
                                                                                                  Description: "Please wait for a Staff member to claim your ticket!"
                                                                                         },
                                                                                         ChannelMessage: {
                                                                                                      Title: "None Set",
                                                                                                      Description: "*Click the Button below to Open a Ticket*"  
                                                                                         },
                                                                                         ClaimSystem: {
                                                                                                  Enabled: false,
                                                                                                  MessageClaim: "{user} Claimed the ticket",
                                                                                         },
                                                                                         StaffRoles: [],
                                                                                         OpenTickets: []
                                                                                          },`Setup5`)
                                                                                   }  else if (Setup == "Setup6") {
                                                                                      client.TicketSystem.set(message.guild.id, { 
                                                                                            Channel: collected.first().content, 
                                                                                            msg: msg1.id,
                                                                                            OpenCategory: "",
                                                                                            ClosedCategory: "",
                                                                                            AutoDelete: {
                                                                                                  Enabled: false,
                                                                                                  Time: 5000
                                                                                          },
                                                                                            LoggerSystem: {
                                                                                                  Enabled: false,
                                                                                                  Channel: "",
                                                                                                  Messages: {
                                                                                                        Title: "Ticket Logs | {GuildName}",
                                                                                                        Description: "{channel} Got Closed By: {ClosedBy}"
                                                                                                  }
                                                                                          },
                                                                                            ChannelName: "🔖・ticket-{username}",
                                                                                            OpenMessages: {
                                                                                                  Title: "Hello {user}, We will be Right with you when we can!",
                                                                                                  Description: "Please wait for a Staff member to claim your ticket!"
                                                                                         },
                                                                                         ChannelMessage: {
                                                                                                      Title: "None Set",
                                                                                                      Description: "*Click the Button below to Open a Ticket*"  
                                                                                         },
                                                                                         ClaimSystem: {
                                                                                                  Enabled: false,
                                                                                                  MessageClaim: "{user} Claimed the ticket",
                                                                                         },
                                                                                         StaffRoles: [],
                                                                                         OpenTickets: []
                                                                                          },`Setup6`)
                                                                                   }  else if (Setup == "Setup7") {
                                                                                      client.TicketSystem.set(message.guild.id, { 
                                                                                            Channel: collected.first().content, 
                                                                                            msg: msg1.id,
                                                                                            OpenCategory: "",
                                                                                            ClosedCategory: "",
                                                                                            AutoDelete: {
                                                                                                  Enabled: false,
                                                                                                  Time: 5000
                                                                                          },
                                                                                            LoggerSystem: {
                                                                                                  Enabled: false,
                                                                                                  Channel: "",
                                                                                                  Messages: {
                                                                                                        Title: "Ticket Logs | {GuildName}",
                                                                                                        Description: "{channel} Got Closed By: {ClosedBy}"
                                                                                                  }
                                                                                          },
                                                                                            ChannelName: "🔖・ticket-{username}",
                                                                                            OpenMessages: {
                                                                                                  Title: "Hello {user}, We will be Right with you when we can!",
                                                                                                  Description: "Please wait for a Staff member to claim your ticket!"
                                                                                         },
                                                                                         ChannelMessage: {
                                                                                                      Title: "None Set",
                                                                                                      Description: "*Click the Button below to Open a Ticket*"  
                                                                                         },
                                                                                         ClaimSystem: {
                                                                                                  Enabled: false,
                                                                                                  MessageClaim: "{user} Claimed the ticket",
                                                                                         },
                                                                                         StaffRoles: [],
                                                                                         OpenTickets: []
                                                                                          },`Setup7`)
                                                                                   }  else if (Setup == "Setup8") {
                                                                                      client.TicketSystem.set(message.guild.id, { 
                                                                                            Channel: collected.first().content, 
                                                                                            msg: msg1.id,
                                                                                            OpenCategory: "",
                                                                                            ClosedCategory: "",
                                                                                            AutoDelete: {
                                                                                                  Enabled: false,
                                                                                                  Time: 5000
                                                                                          },
                                                                                            LoggerSystem: {
                                                                                                  Enabled: false,
                                                                                                  Channel: "",
                                                                                                  Messages: {
                                                                                                        Title: "Ticket Logs | {GuildName}",
                                                                                                        Description: "{channel} Got Closed By: {ClosedBy}"
                                                                                                  }
                                                                                          },
                                                                                            ChannelName: "🔖・ticket-{username}",
                                                                                            OpenMessages: {
                                                                                                  Title: "Hello {user}, We will be Right with you when we can!",
                                                                                                  Description: "Please wait for a Staff member to claim your ticket!"
                                                                                         },
                                                                                         ChannelMessage: {
                                                                                                      Title: "None Set",
                                                                                                      Description: "*Click the Button below to Open a Ticket*"  
                                                                                         },
                                                                                         ClaimSystem: {
                                                                                                  Enabled: false,
                                                                                                  MessageClaim: "{user} Claimed the ticket",
                                                                                         },
                                                                                         StaffRoles: [],
                                                                                         OpenTickets: []
                                                                                          },`Setup8`)
                                                                                   }  else if (Setup == "Setup9") {
                                                                                      client.TicketSystem.set(message.guild.id, { 
                                                                                            Channel: collected.first().content, 
                                                                                            msg: msg1.id,
                                                                                            OpenCategory: "",
                                                                                            ClosedCategory: "",
                                                                                            AutoDelete: {
                                                                                                  Enabled: false,
                                                                                                  Time: 5000
                                                                                          },
                                                                                            LoggerSystem: {
                                                                                                    Enabled: false,
                                                                                                    Channel: "",
                                                                                                    Messages: {
                                                                                                          Title: "Ticket Logs | {GuildName}",
                                                                                                          Description: "{channel} Got Closed By: {ClosedBy}"
                                                                                                    }
                                                                                            },
                                                                                            ChannelName: "🔖・ticket-{username}",
                                                                                            OpenMessages: {
                                                                                                  Title: "Hello {user}, We will be Right with you when we can!",
                                                                                                  Description: "Please wait for a Staff member to claim your ticket!"
                                                                                         },
                                                                                         ChannelMessage: {
                                                                                                      Title: "None Set",
                                                                                                      Description: "*Click the Button below to Open a Ticket*"  
                                                                                         },
                                                                                         ClaimSystem: {
                                                                                                  Enabled: false,
                                                                                                  MessageClaim: "{user} Claimed the ticket",
                                                                                         },
                                                                                         StaffRoles: [],
                                                                                         OpenTickets: []
                                                                                          },`Setup9`)
                                                                                   } 
  
                                                                                   const embed2 = new EmbedBuilder()
                                                                                   .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                   .setDescription(`<:check:1005732038004981780> Send the Message in the Channel..\n<:check:1005732038004981780> Setup the Ticket system Database\n<a:TicketLoading:1023053249407877141> Finish the Setup`)
                                                                                   .setColor("Yellow")
                                                                                   .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                   .setTimestamp()
           
                                                                                   msg.edit({ embeds: [embed2] })
  
                                                                                   setTimeout(() => {
                                                                                      const embed2 = new EmbedBuilder()
                                                                                      .setAuthor({name: `Ticket System Progress`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                      .setDescription(`<:check:1005732038004981780> Send the Message in the Channel..\n<:check:1005732038004981780> Setup the Ticket system Database\n<:check:1005732038004981780> Finish the Setup`)
                                                                                      .setColor("Green")
                                                                                      .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                      .setTimestamp()
              
                                                                                      msg.edit({ embeds: [embed2] })
  
                                                                                      msg.reply({
                                                                                          embeds: [ 
                                                                                                new EmbedBuilder()
                                                                                                .setAuthor({name: `Ticket System Setup`, iconURL: "https://i.imgur.com/a31Of53.png" })
                                                                                                .setDescription(`***Successfully Setup the Ticket System ${interaction1.values}!***`)
                                                                                                .setColor("Green")
                                                                                                .setFooter({ text: `Ticket System | ${message.guild.name} | ${client.user.username}` })
                                                                                                .setTimestamp()
                                                                                          ],
                                                                                          components: [],
                                                                                         })
  
  
  
                                                                                  }, 1900);
                                                                              })
                                                                          }, 1900);
                                                                          
                                                                         })
                                                                  })})
                                                         }
                                               })
                                               .catch(collected => console.log(`Nothing got Collected Sad...`));
                                       }
                              })
                     }
          })
          collector.on("end",  async(collected) =>  {
            console.log(collected.size)
          })
}
module.exports.slashRun = async (interaction, client) => {
}

module.exports.conf = {
     Prefix: {
        aliases: ["latency"],
        enabled: true,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: ["ManageGuild"]   
     },
     Slash: {
        enabled: true,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: [],
        timeout: 50,
     }
}

module.exports.help = {
      Prefix: {
        name: "setup-ticket",
        category: "setup",
        cooldown: 2,
        usage: "setup-ticket",
        description: "setup the ticket system",
      },
      Slash: {
        name: "setup-ticket",
        description: "setup the ticket system",
        category: "setup",
      }
}