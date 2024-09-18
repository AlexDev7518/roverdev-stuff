const { Events, EmbedBuilder, PermissionFlagsBits, ChannelType, ActionRowBuilder, SelectMenuBuilder, StringSelectMenuBuilder } = require("discord.js")
const { EmbedColor } = require("../../../Configuration/EmbedConfig")
const DeclinedApplication = require("../../../Databases/Schema/StaffSystem/DeclinedApplication")

module.exports = async Roverdev => {
      const LoggerChannel = Roverdev.channels.cache.get("1075926532809310339")


      Roverdev.on(Events.InteractionCreate, async interaction => {
              if (interaction.customId == "Apply-Staff") {

                let questions = [
                       "What is your Age?",
                       "How many hours are you active on discord?",
                       "Do you know how Roverdev BotShop Works? (Like if a user has a issue on where to report it and stuff.)",
                       "Do you know what channel does what? (We will test you)",
                       "When / how did you find us?",
                       "Have you read the rules?",
                       "Do you know how to report users?",
                       "What do you like of Roverdev?",
                       "What would you change in Roverdev",
                       "Which is your favourite stuff as Staff?",
                       "Why would we choose you instead of other members?",
                       "Do you know anything about moderation, if so what?",
                       "Anything else we should know?",
                       "Do you want to know anything, or how something works?",
                       "how many messages can you do a day?"
                ]

                await interaction.reply({ content: `*<:application:1075890682872483960> Now Opening your application ticket...*`, ephemeral: true })


                Roverdev.StaffSystem.ensure(interaction.guild.id, {})

              setTimeout(async () => {
                      const data = Roverdev.StaffSystem.get(interaction.guild.id, `${interaction.user.id}.ApplicationOpen`)

                      if (data) return interaction.editReply({ content: `*<:application:1075890682872483960> You Already have a aplication open: <#${data}>*` })

                      const AppData = await DeclinedApplication.findOne({ Author: interaction.user.id })

                      if (AppData) return interaction.editReply({ content: `*<:application:1075890682872483960> Seems you got declined recently you may reapply <t:${Math.floor(AppData.DateToReApply/1000)}:R>*` })


                      const data2 = Roverdev.StaffSystem.get(interaction.guild.id, `${interaction.user.id}.PendingApplication`)

                      if (data2) return interaction.editReply({ content: `*<:application:1075890682872483960> Your Application is already pending so you can't apply again!*` })

                  if (interaction.member.roles.cache.has("1005978927421980702")) return interaction.editReply({ content: `Seems you already have staff so you can't apply for it again!`, ephemeral: true })


                interaction.guild.channels.create({
                    name: `📜╎sa-${interaction.user.username}`,
                    type: ChannelType.GuildText,
                    parent: Roverdev.guilds.cache.get("1081700920993259550").channels.cache.find(m => m.name.includes("🚪")).id,
                    permissionOverwrites: [
                           {
                            id: interaction.user.id,
                            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages]
                      },
                      {
                           id: interaction.guild.roles.everyone,
                           deny: [PermissionFlagsBits.ViewChannel]
                      },
                    ]
                   }).then(async function(channel) {

                        Roverdev.channels.cache.get('1076220335415890030').send({
                                embeds: [ 
                                     new EmbedBuilder()
                                     .setAuthor({ name: `Ticket / Application System - Roverdev Community`, iconURL: "https://cdn.discordapp.com/emojis/961638540666621992.gif?size=96&quality=lossless" })
                                     .setColor(EmbedColor)
                                     .setTitle(`Ticket Has Been Created, here is the following data:`)
                                     .setDescription(`***${channel} (\`${channel.name}\`)***\n> **Date Created:** *<t:${Math.floor(Date.now()/1000)}:R>*\n>  **User:** *${interaction.user} (\`${interaction.user.username}\`)*\n> **Channel Parent:** *${channel.parent}*`)
                                ]
                        })

                    Roverdev.StaffSystem.ensure(interaction.guild.id, {})

                    const ms = require("ms")
    
                    let day = ms("12h")
              
                    day = Date.now() + day

                    Roverdev.StaffSystem.set(interaction.guild.id, {
                          Message: "",
                          Channel: channel.id,
                          User: interaction.user.id,
                          TimeOpened: Date.now(),
                          UserResponded: "no",
                          TimeToRespond: day
                    }, `${interaction.user.id}.OpenApplications.${channel.id}`)

                    Roverdev.StaffSystem.set(interaction.guild.id, channel.id, `${interaction.user.id}.ApplicationOpen`)
                    Roverdev.StaffSystem.set(interaction.guild.id, interaction.user.id, `${channel.id}.User`)


                         const embed = new EmbedBuilder()
                         .setAuthor({ name: `Apply Staff - Roverdev Community`, iconURL: "https://cdn.discordapp.com/emojis/1075890682872483960.webp?size=96&quality=lossless" })
                         .setColor("#50C878")
                         .setThumbnail("https://cdn.discordapp.com/emojis/1075890682872483960.png")
                         .setDescription(`Hey ${interaction.user}, Welcome to Your **\`Apply-Staff\`** Ticket\n> Please Write a 1 Paragraph Essay with the Answers in it below: ${questions.map((m, index) => `- \`${index})\` ${m}`).join("\n> ")}\n\n**Steps:**\n> Write the Application\n> The bot will ask you to confirm your message.\n> Once you confirm it the channel will be deleted and your application will be sent to a private channel and you will be sent a private dm.!`)                         

                        channel.send({  embeds: [embed], content: `<:application:1075890682872483960> ${interaction.user} Here is Your Aplication Ticket ( You have until <t:${Math.floor(day/1000)}:F> to respond )`}).then((msg) => {
                                  msg.pin()
                                  Roverdev.StaffSystem.set(interaction.guild.id, msg.id, `${interaction.user.id}.OpenApplications.${channel.id}.Message`)
                        })

                        interaction.editReply({ content: `Successfully Opened Your Applicaton Ticket: ${channel} <:application:1075890682872483960>` })
                 })
                    }, 1000);

              }
      })

}