const { Events, bold, ChannelType, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const TicketConfig = require("../../configuration/TicketSystem")
const TicketSystem = require("../../database/schemas/TicketSystem")
const { SupportTicket, ReportTicket, YTTicket, BotshopTicket, HostingTicket, claimTicket, StaffTicket, PartnerTicket } = require("./functions")
const UserConfig = require("../../database/schemas/Userconfig")
const moment = require("moment")
module.exports = async Roverdev => {
       Roverdev.on(Events.InteractionCreate, async interaction => {
              if (interaction.customId == "Bot-Ping") {
                     return interaction.reply({ content: `Bot is online! You can open a ticket.`, ephemeral: true })
              }
              if (interaction.customId == "Est-Waittime") {
                     return interaction.reply({ content: `This feature is currently unavailable`, ephemeral: true })
              }
              if (interaction.customId == "Ticket-System") {
                     let TicketType = interaction.values[0]

                     const TypeFind = {
                            "Support-Ticket": "TSupport",
                            "Report-Ticket": "TReport",
                            "YT-Ticket": "TYoutube",
                            "Claim-Ticket": "TClaim",
                            "Staff-Ticket": "TStaff",
                            "Partner-Ticket": "TPartner",
                     }

                     TicketType = TypeFind[TicketType]

                     let TicketReady = false
                     let Ticketdata = {}

                     let Error = false


                     let TData = await TicketSystem.findOne({ channel: "1085511080975011840" })

                     if (!TData) {
                            await TicketSystem.create({
                                   channel: "1085511080975011840",
                                   TotalTickets: 184,
                            })
                            TData = await TicketSystem.findOne({ channel: "1085511080975011840" })
                     }

                     let TicketSetup = TicketConfig[TicketType]

                     if (TData.TicketsOpen.find(m => m.Author == interaction.user.id)) {
                            return await interaction.reply({ content: `<:Declined:1122591872553070732> Seems you already have a ticket created: <#${TData.TicketsOpen.find(m => m.Author == interaction.user.id).Channel}>`, ephemeral: true })
                     }

                     if (TData.TicketConfig[TicketType] == "Closed") return await interaction.reply({ content: `<:Declined:1122591872553070732> Currently ${interaction.values[0]} is closed! Means you can't open this ticket type.`, ephemeral: true })

                     if (TicketType == "TSupport") SupportTicket(TicketSetup, interaction).then(m => { if (m.ready == true) { TicketReady = m.ready; Ticketdata = m.data, Error = m.Error } })
                     else if (TicketType == "TReport") ReportTicket(TicketSetup, interaction).then(m => { if (m.ready == true) { TicketReady = m.ready; Ticketdata = m.data, Error = m.Error } })
                     else if (TicketType == "TClaim") claimTicket(TicketSetup, interaction).then(m => { if (m.ready == true) { TicketReady = m.ready; Ticketdata = m.data, Error = m.Error } })
                     else if (TicketType == "TStaff") StaffTicket(TicketSetup, interaction).then(m => { if (m.ready == true) { TicketReady = m.ready; Ticketdata = m.data, Error = m.Error } })
                     else if (TicketType == "TPartner") PartnerTicket(TicketSetup, interaction).then(m => { if (m.ready == true) { TicketReady = m.ready; Ticketdata = m.data, Error = m.Error } })


                     let CreateTicketNow = setInterval(async function () {
                            if (TicketReady == false) return

                            if (TicketReady == false && Error == true) return clearInterval(CreateTicketNow)

                            if (TicketReady == true) {
                                   clearInterval(CreateTicketNow)

                                   let thing = Ticketdata.interaction

                                   let data = await UserConfig.findOne({ Author: interaction.user.id })
                                   await thing.editReply({ content: `<a:Loading:996191440713551953> Setting up your ticket... with the folowing things:\n\`\`\`js\nLanguage: ${data.UserLanguage}\nTicketType: ${Ticketdata.Type}\`\`\``, ephemeral: true })

                                   /**
                                    * @CreateChannel
                                    */

                                   let Perms = []

                                   TicketSetup.Permissions.forEach(m => Perms.push(m))

                                   Perms.push({
                                          id: interaction.user.id,
                                          allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.AttachFiles]
                                   })
                                   Perms.push({
                                          id: interaction.guild.roles.everyone,
                                          deny: [PermissionFlagsBits.ViewChannel]
                                   })

                                   TData.TotalTickets++


                                   interaction.guild.channels.create({
                                          name: `${TicketSetup.name.replace("{ticketnumber}", TData.TotalTickets)}`,
                                          type: ChannelType.GuildText,
                                          parent: interaction.guild.channels.cache.find(m => m.name.includes(TicketSetup.category)).id,
                                          permissionOverwrites: Perms,
                                          topic: TicketSetup.Topic.replace("{Ticket_Creator}", interaction.user.username).replace("{date}", moment(Date.now()).format("MMMM Do YYYY"))
                                   }).then(async function (channel) {

                                          await thing.editReply({
                                                 content: ` `, embeds: [
                                                        new EmbedBuilder()
                                                               .setAuthor({ name: `Ticket Successfully Created!`, iconURL: interaction.guild.iconURL() })
                                                               .setColor("Green")
                                                               .setDescription(`Channel: ${channel}`)
                                                 ]
                                          })

                                          const embed = new EmbedBuilder()
                                                 .setAuthor({ name: `Roverdev Support | Powered By Roverdev`, iconURL: Roverdev.user.displayAvatarURL() })
                                                 .setTitle(`Welcome to your ${TicketType == "TSupport" && Ticketdata.Type == "Normal-Ticket" ? "General Support Ticket" : interaction.values[0]}`)
                                                 .setDescription(`:wave: Greetings ${interaction.user} and Welcome to your ${TicketType == "TSupport" && Ticketdata.Type == "Normal-Ticket" ? "General Support Ticket" : interaction.values[0]}.\n\n> ${TicketSetup.Description}\n\n> Note: *Don't Ping Any Staff Members Just wait for a Response!*`)
                                                 .setColor("Yellow")

                                          embed.addFields({ name: `Reason For Opening`, value: `> - <:ArrowRight:1176972543396163605> \`${Ticketdata.Reason}\`` })



                                          let row = new ActionRowBuilder()
                                                 .setComponents(
                                                        new ButtonBuilder()
                                                               .setCustomId("Claim-Ticket")
                                                               .setLabel("Claim Ticket")
                                                               .setEmoji("1122291363849973841")
                                                               .setStyle(ButtonStyle.Success),
                                                        new ButtonBuilder()
                                                               .setCustomId("Close-Ticket")
                                                               .setStyle(ButtonStyle.Secondary)
                                                               .setLabel("Close")
                                                               .setEmoji("1141756872244858881")
                                                 )


                                          //     const embed2 = new EmbedBuilder()fv
                                          //     .setTitle("Ticket-Information")
                                          //     .setDescription(`\`\`\`js\nTicket Language: ${data.UserLanguage}\nTicket Type: ${TicketType == "TSupport" && Ticketdata.type == "Normal-Ticket" ? "General Support Ticket" : interaction.values[0]}\nTicket Opened at: ${moment(Date.now()).format("MMMM Do YYYY")}\nTicket Opened By: ${interaction.user.username}\nTicket First Claimed By: None\nTicket Staff: None\`\`\``)
                                          //     .setColor("Yellow")

                                          let mention = `${TicketSetup.Permissions.map(m => `<@&${m.id}>`).join(", ")}`

                                          channel.send({ embeds: [embed], components: [row], content: `${interaction.user} Here's your Ticket! Staff:  ${mention}, Language: <@&${interaction.guild.roles.cache.find(m => m.name.includes(Ticketdata.Language)).id}>` }).then(async (m) => {
                                                 m.pin()
                                                 TData.TicketsOpen.push({
                                                        Author: interaction.user.id,
                                                        AuthorUsername: interaction.user.username,
                                                        Channel: channel.id,
                                                        CreatedAt: Date.now(),
                                                        ClaimedUsers: [],
                                                        TicketType: TicketType,
                                                        messageId: m.id
                                                 })

                                                 await TData.save()
                                                 TData = await TicketSystem.findOne({ channel: "1085511080975011840" })
                                          })

                                   })

                            }

                            if (TicketReady == "Error") {
                                   return clearInterval(CreateTicketNow)
                            }
                     })


              }
       })
}