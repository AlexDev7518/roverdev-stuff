const { ActionRowBuilder, SelectMenuBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js")
// const { AntiNukeOptions, AntiNukeSettings } = require("../../RoverConfig")
// // const AntiNuke = require("../../Handler/modules/Addons/Container/schemas/AntiNuke")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor, database) => {

        const rows = [] // limit 4
        const embeds = []

        const selectmenu =  new SelectMenuBuilder()
        .setCustomId("Anti-Nuke")
        .setDisabled(false)
        .setPlaceholder("Please Choose a Option to Control")
        .setOptions(AntiNukeOptions.map(anti => {
                return {
                     label: anti.label,
                     value: anti.label,
                     description: anti.description
                }
        }))
        
        const row = new ActionRowBuilder()
        .addComponents(selectmenu)

        rows.push(row)

        const embed = new EmbedBuilder()
        .setAuthor({ name: `AntiNuke-System | ${Roverdev.user.username}`, iconURL: "https://cdn.discordapp.com/emojis/1043254115691659354.png" })
        .setThumbnail("https://cdn.discordapp.com/emojis/1043254115691659354.png")
        .setTitle("__***Please Select a \`Anti-Nuke\` Option Below***__")
        .setDescription(`> Anti-Nuke Dashboard: [Click Here](https://roverdev.xyz/dashboard/antinuke)`)
        .setImage("https://cdn.discordapp.com/attachments/1023444408026284067/1043295414146846870/unknown_4.png")
        .setColor("DarkOrange")

        embeds.push(embed)

        const msg  = await message.reply({ components: rows, embeds: embeds })

        const filter = (interaction) => interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector({
           filter,
           max: 1,
           time: 70000,
         });

         collector.on("collect", async (interaction) => {
                if (interaction.values == "Default-Setup") {
                         selectmenu.setDisabled(true)
                         interaction.message.edit({ components: rows })
                         await interaction.reply({
                                embeds: [
                                     new EmbedBuilder()
                                     .setAuthor({ name: `Are you Sure About this Action?`, iconURL: "https://cdn.discordapp.com/emojis/1043254115691659354.png" })
                                     .setImage("https://cdn.discordapp.com/attachments/1023444408026284067/1043295414146846870/unknown_4.png")
                                     .setColor("DarkOrange")
                                     .setThumbnail("https://cdn.discordapp.com/emojis/1043254115691659354.png")
                                     .setDescription(`Following Things Will Happen:\n> Setup Anti Nuke System\n> Ask You Some More Questions`)
                                ],
                                components: [
                                     new ActionRowBuilder()
                                     .setComponents(
                                            new ButtonBuilder()
                                            .setLabel("Confirm")
                                            .setCustomId("Confirm-Setup")
                                            .setEmoji("1032530725246869575")
                                            .setStyle(ButtonStyle.Success),
                                            new ButtonBuilder()
                                            .setLabel("Cancel")
                                            .setCustomId("Cancel-Setup")
                                            .setEmoji("1032530722944204811")
                                            .setStyle(ButtonStyle.Danger)
                                     )
                                ]
                         })

                         const filter = (interaction) => interaction.user.id === message.author.id;

                         const collector1 = interaction.channel.createMessageComponentCollector({
                            filter,
                            max: 1,
                            time: 70000,
                          });

                          collector1.on("collect", async (interaction1) => {
                            if (interaction1.customId == "Cancel-Setup") {
                                   interaction.editReply({
                                          components: [
                                                new ActionRowBuilder()
                                                .setComponents(
                                                       new ButtonBuilder()
                                                       .setLabel("Confirm")
                                                       .setCustomId("Confirm-Setup")
                                                       .setDisabled(true)
                                                       .setEmoji("1032530725246869575")
                                                       .setStyle(ButtonStyle.Success),
                                                       new ButtonBuilder()
                                                       .setLabel("Cancel")
                                                       .setDisabled(true)
                                                       .setCustomId("Cancel-Setup")
                                                       .setEmoji("1032530722944204811")
                                                       .setStyle(ButtonStyle.Danger)
                                                )
                                          ]
                                  })
                                  await  interaction1.reply({
                                   embeds: [
                                           new EmbedBuilder()
                                           .setAuthor({ name: `Canceled The Setup`, iconURL: "https://cdn.discordapp.com/emojis/1023811778087485491.png" })
                                           .setColor("Red")
                                   ]
                           })
                            }
                            if (interaction1.customId == "Confirm-Setup") {

                                   interaction.editReply({
                                           components: [
                                                 new ActionRowBuilder()
                                                 .setComponents(
                                                        new ButtonBuilder()
                                                        .setLabel("Confirm")
                                                        .setCustomId("Confirm-Setup")
                                                        .setDisabled(true)
                                                        .setEmoji("1032530725246869575")
                                                        .setStyle(ButtonStyle.Success),
                                                        new ButtonBuilder()
                                                        .setLabel("Cancel")
                                                        .setDisabled(true)
                                                        .setCustomId("Cancel-Setup")
                                                        .setEmoji("1032530722944204811")
                                                        .setStyle(ButtonStyle.Danger)
                                                 )
                                           ]
                                   })

                                 await  interaction1.reply({
                                           embeds: [
                                                   new EmbedBuilder()
                                                   .setAuthor({ name: `Setting up Default Database`, iconURL: "https://cdn.discordapp.com/emojis/1043254117352603738.gif" })
                                                   .setColor("Yellow")
                                           ]
                                   })

                                   Roverdev.AntiNuke.ensure(message.guild.id, {
                                          MainSystem: {
                                                 Settings: {
                                                     AntiNukeEnabled: true,
                                                     AntiNukeLoggerEnabled: false,
                                                     ShowWhiteListedLog: true,
                                                     ShowOwnerLog: true,
                                     
                                                     Punisment: {
                                                          quarantine: true,
                                                          Demote: false,
                                                          Kick: false,
                                                          Ban: false
                                                     }
                                             },
                                               Logger: {
                                                      LoggerMain: {
                                                             LoggerEnabled: false,
                                                             LoggerChannel: ""
                                                      },
                                                      LoggerCustom: {
                                                         AntiChannelCreate: "",
                                                         AntiChannelDelete: "",
                                                         AntiWebhookCreate: "",
                                                         AntiWebhookDelete: "",
                                                         AntiMemberKick: "",
                                                         AntiMemberBan: "",
                                                         AntiRoleCreate: "",
                                                         AntiRoleDelete: "",
                                                         AntiEmojiDelete: "",
                                                      }
                                               },
                                               MainWhiteList: {
                                                    Categorys: [], // only for [AntiChannelCreate, AntiChannelDelete]
                                                    Roles: [], // For all of them.
                                                    Users: [] // For All of them
                                               }
                                                  },
                                               AntiBot: {
                                                       Enabled: true,
                                                       Whitelist: {
                                                           roles: [],
                                                           users: []
                                                      },
                                                      punishment: {
                                                              Bot: {
                                                                 quarantine: true,
                                                                 Demote: false,
                                                                 Kick: false,
                                                                 Ban: false
                                                              },
                                                              member: {
                                                                    Quarantine: {
                                                                            DayLimit: 0,
                                                                            WeekLimit: 0,
                                                                            MonthLimit: 0,
                                                                            AllTimeLimit: 0,
                                                                            enabled: true
                                                                     },
                                                                     Demote: {
                                                                            DayLimit: 0,
                                                                            WeekLimit: 0,
                                                                            MonthLimit: 0,
                                                                            AllTimeLimit: 0,
                                                                            enabled: false
                                                                     },
                                                                     Kick: {
                                                                            DayLimit: 0,
                                                                            WeekLimit: 0,
                                                                            MonthLimit: 0,
                                                                            AllTimeLimit: 0,
                                                                            enabled: false
                                                                     },
                                                                     Ban: {
                                                                            DayLimit: 0,
                                                                            WeekLimit: 0,
                                                                            MonthLimit: 0,
                                                                            AllTimeLimit: 0,
                                                                            enabled: false
                                                                     }
                                                              }
                                                      }
                                               },
                                               AntiChannelCreate: {
                                                 Enabled: true,
                                                 Whitelist: {
                                                     roles: [],
                                                     users: [],
                                                     Categorys: []
                                                },
                                                punishment: {
                                                        member: {
                                                              Quarantine: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: true
                                                               },
                                                               Demote: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               },
                                                               Kick: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               },
                                                               Ban: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               }
                                                        }
                                                }
                                               },
                                               AntiChannelDelete: {
                                                 Enabled: true,
                                                 Whitelist: {
                                                     roles: [],
                                                     users: [],
                                                     Categorys: []
                                                },
                                                punishment: {
                                                        member: {
                                                              Quarantine: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: true
                                                               },
                                                               Demote: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               },
                                                               Kick: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               },
                                                               Ban: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               }
                                                        }
                                                }
                                               },
                                               AntiWebhookCreate: {
                                                 Enabled: true,
                                                 Whitelist: {
                                                     roles: [],
                                                     users: [],
                                                },
                                                punishment: {
                                                        member: {
                                                              Quarantine: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: true
                                                               },
                                                               Demote: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               },
                                                               Kick: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               },
                                                               Ban: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               }
                                                        }
                                                }
                                               },
                                               AntiWebhookDelete: {
                                                 Enabled: true,
                                                 Whitelist: {
                                                     roles: [],
                                                     users: [],
                                                },
                                                punishment: {
                                                        member: {
                                                              Quarantine: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: true
                                                               },
                                                               Demote: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               },
                                                               Kick: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               },
                                                               Ban: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               }
                                                        }
                                                }
                                               },
                                               AntiMemberKick: {
                                                 Enabled: true,
                                                 Whitelist: {
                                                     roles: [],
                                                     users: [],
                                                },
                                                punishment: {
                                                        member: {
                                                              Quarantine: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: true
                                                               },
                                                               Demote: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               },
                                                               Kick: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               },
                                                               Ban: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               }
                                                        }
                                                }
                                               },
                                               AntiMemberBan: {
                                                 Enabled: true,
                                                 Whitelist: {
                                                     roles: [],
                                                     users: [],
                                                },
                                                punishment: {
                                                        member: {
                                                              Quarantine: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: true
                                                               },
                                                               Demote: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               },
                                                               Kick: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               },
                                                               Ban: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               }
                                                        }
                                                }
                                               },
                                               AntiRoleCreate: {
                                                 Enabled: true,
                                                 Whitelist: {
                                                     roles: [],
                                                     users: [],
                                                },
                                                punishment: {
                                                        member: {
                                                              Quarantine: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: true
                                                               },
                                                               Demote: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               },
                                                               Kick: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               },
                                                               Ban: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               }
                                                        }
                                                }
                                               },
                                               AntiRoleDelete: {
                                                 Enabled: true,
                                                 Whitelist: {
                                                     roles: [],
                                                     users: [],
                                                },
                                                punishment: {
                                                        member: {
                                                              Quarantine: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: true
                                                               },
                                                               Demote: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               },
                                                               Kick: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               },
                                                               Ban: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               }
                                                        }
                                                }
                                               },
                                               AntiEmojiDelete: {
                                                 Enabled: true,
                                                 Whitelist: {
                                                     roles: [],
                                                     users: [],
                                                },
                                                punishment: {
                                                        member: {
                                                              Quarantine: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: true
                                                               },
                                                               Demote: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               },
                                                               Kick: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               },
                                                               Ban: {
                                                                      DayLimit: 0,
                                                                      WeekLimit: 0,
                                                                      MonthLimit: 0,
                                                                      AllTimeLimit: 0,
                                                                      enabled: false
                                                               }
                                                           }
                                                      }
                                                 }  
                                   })

                                   setTimeout(() => {
                                          const evalcode = Roverdev.AntiNuke.get(interaction.guild.id)

                                          const datatosend = eval(evalcode)
       
                                          interaction1.editReply({
                                                 embeds: [
                                                         new EmbedBuilder()
                                                         .setAuthor({ name: `Successfully Setup Default Database`, iconURL: "https://cdn.discordapp.com/emojis/1023811776850186261.png" })
                                                         .setColor("Green")
                                                 ],
                                                 files: [new AttachmentBuilder(Buffer.from(`${require('util').inspect(datatosend)}`), {name:'data.json'})]
                                         })

                                         setTimeout(() => {
                                          interaction1.channel.send({
                                                 embeds: [
                                                     new EmbedBuilder()
                                                     .setAuthor({ name: `Would you like to setup logger system?`, iconURL: "https://cdn.discordapp.com/emojis/1043254115691659354.png" })
                                                     .setColor("Red")
                                                 ],
                                                 components: [
                                                      new ActionRowBuilder().addComponents(
                                                           new ButtonBuilder()
                                                           .setLabel("Confirm")
                                                           .setCustomId("Confirm-Logger")
                                                           .setEmoji("1032530725246869575")
                                                           .setStyle(ButtonStyle.Success),
                                                           new ButtonBuilder()
                                                           .setLabel("Cancel")
                                                           .setCustomId("Cancel-Logger")
                                                           .setEmoji("1032530722944204811")
                                                           .setStyle(ButtonStyle.Danger)
                                                      )
                                                 ]
                                            })



                                            const filter = (interaction) => interaction.user.id === message.author.id;

                                            const collector2 = interaction.channel.createMessageComponentCollector({
                                               filter,
                                               max: 1,
                                               time: 70000,
                                             });
                   
                                             collector2.on("collect", async (interaction2) => {
                                               if (interaction2.customId == "Cancel-Logger") {
                                                 interaction2.message.edit({
                                                        components: [
                                                              new ActionRowBuilder()
                                                              .setComponents(
                                                                     new ButtonBuilder()
                                                                     .setLabel("Confirm")
                                                                     .setCustomId("Confirm-Setup")
                                                                     .setDisabled(true)
                                                                     .setEmoji("1032530725246869575")
                                                                     .setStyle(ButtonStyle.Success),
                                                                     new ButtonBuilder()
                                                                     .setLabel("Cancel")
                                                                     .setDisabled(true)
                                                                     .setCustomId("Cancel-Setup")
                                                                     .setEmoji("1032530722944204811")
                                                                     .setStyle(ButtonStyle.Danger)
                                                              )
                                                        ]
                                                })

                                                interaction2.reply({ 
                                                         content: `Anti-Nuke System has been fully setup.`
                                                })

                                                
                                               }
                                               if (interaction2.customId == "Confirm-Logger") {

                                                 
                                   interaction2.message.edit({
                                          components: [
                                                new ActionRowBuilder()
                                                .setComponents(
                                                       new ButtonBuilder()
                                                       .setLabel("Confirm")
                                                       .setCustomId("Confirm-Setup")
                                                       .setDisabled(true)
                                                       .setEmoji("1032530725246869575")
                                                       .setStyle(ButtonStyle.Success),
                                                       new ButtonBuilder()
                                                       .setLabel("Cancel")
                                                       .setDisabled(true)
                                                       .setCustomId("Cancel-Setup")
                                                       .setEmoji("1032530722944204811")
                                                       .setStyle(ButtonStyle.Danger)
                                                )
                                          ]
                                  })

                                                       await interaction2.reply({
                                                             embeds: [
                                                                   new EmbedBuilder()
                                                                   .setTitle(`***Provide A Logger Channel (Id or Mention)***`)
                                                                   .setImage("https://cdn.discordapp.com/attachments/1023444408026284067/1043295414146846870/unknown_4.png")
                                                                   .setColor("Orange")
                                                             ]
                                                       })

                                                  interaction2.channel.awaitMessages({
                                                        max: 1, 
                                                        time: 60000, 
                                                        filter: m => m.author.id === message.author.id,
                                                        errors: ['time']
                                                       })   
                                                       .then(async (collected) => {

                                                        
                                                        interaction2.editReply({
                                                               embeds: [
                                                                     new EmbedBuilder()
                                                                     .setTitle(`~~***Provide A Logger Channel (Id or Mention)***~~`)
                                                                     .setImage("https://cdn.discordapp.com/attachments/1023444408026284067/1043295414146846870/unknown_4.png")
                                                                     .setColor("Green")
                                                               ]
                                                         })


                                                               if(isNaN(collected.first().content) || !Roverdev.channels.cache.get(collected.first().content)) {
                                                                      const channel = collected.first().mentions.channels.first()

                                                                      if (Roverdev.channels.cache.get(channel?.id)) {
                                                                               Roverdev.AntiNuke.set(message.guild.id, channel.id, "MainSystem.Logger.LoggerMain.LoggerChanel")
                                                                               Roverdev.AntiNuke.set(message.guild.id, true, "MainSystem.Logger.LoggerMain.LoggerEnabled")

                                                                               Roverdev.channels.fetch(message.channel.id).then(ch => {
                                                                                    ch.messages.fetch(collected.first().id).then(async msg => {
                                                                                           msg.reply({
                                                                                                  embeds: [
                                                                                                        new EmbedBuilder()
                                                                                                        .setTitle(`<:check:1005732038004981780> __***Successfully Set \`${Roverdev.channels.cache.get(channel.id).id}\` In Database***__`)
                                                                                                        .setColor("Green")
                                                                                                  ]
                                                                                            })
                                                                                    })
                                                                             })

                                                                             const channelSend = Roverdev.channels.cache.get(channel.id)

                                                                             channelSend.send({
                                                                                     embeds: [
                                                                                             new EmbedBuilder()
                                                                                             .setTitle("**This Channel is now the Anti Nuke Logger!**")
                                                                                             .setColor("Orange")
                                                                                             .setThumbnail("https://cdn.discordapp.com/emojis/1043254115691659354.png")
                                                                                             .setImage("https://cdn.discordapp.com/attachments/1023444408026284067/1043295414146846870/unknown_4.png")
                                                                                             .setDescription("Here are some Infos:\n> In the **Footer** (Bottom), will be some infrormation (ID & AVATAR & TAG) of the EXECUTOR\n> In the **AUTHOR** (top), will be information about the **METHOD - AUTHORTAG**\n\n> Every Embed, which is **Blue**,  is a security action from **ME**\n> Every Embed, in **DarkOrange** is a **WARN**\n> Every Embed, in **Yellow** is a **KICK**\n> Every Embed, in **RED** is a **BAN**\n> Every Embed, in **Cyan** is a **Quarantine**")
                                                                                     ]
                                                                             })

                                                                             interaction.channel.send({
                                                                                       content: `Anti-Nuke System is now fully setup!`
                                                                             })

                                                                      } else {
                                                                             Roverdev.channels.fetch(message.channel.id).then(ch => {
                                                                                    ch.messages.fetch(collected.first().id).then(async msg => {
                                                                                             msg.reply({ content: `INVAILD CHANNEL` })
                                                                                    })
                                                                             })
                                                                      }
                                                               }

                                                               if (Roverdev.channels.cache.get(collected.first().content)) {
                                                                      Roverdev.AntiNuke.set(message.guild.id, collected.first().content, "MainSystem.Logger.LoggerMain.LoggerChanel")
                                                                      Roverdev.AntiNuke.set(message.guild.id, true, "MainSystem.Logger.LoggerMain.LoggerEnabled")

                                                                      Roverdev.channels.fetch(message.channel.id).then(ch => {
                                                                             ch.messages.fetch(collected.first().id).then(async msg => {
                                                                                    msg.reply({
                                                                                           embeds: [
                                                                                                 new EmbedBuilder()
                                                                                                 .setTitle(`<:check:1005732038004981780> __***Successfully Set \`${Roverdev.channels.cache.get(collected.first().content).id}\` In Database***__`)
                                                                                                 .setColor("Green")
                                                                                           ]
                                                                                     })
                                                                             })
                                                                      })
                                                               }
                                                       })
                                               }
                                             })
                                         }, 3000);
                                   }, 3000);
                            }
                         })
                }
         })
    },
}