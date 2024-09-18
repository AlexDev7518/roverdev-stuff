const { PermissionFlagsBits, ChannelType, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require("discord.js")
const { DefaultEmojis } = require("../../Configuration/EmojiConfig")
const { OverFlow } = require("../../Configuration/ShopConfig/ShopConfiguration")
const { TicketSettings, TicketOpenComponents } = require("../../Configuration/TicketSystem/TicketConfig")
const CreateTicket = require("../../Databases/Schema/TicketSystem/CreateTicket")
const GuildStats = require("../../Databases/Schema/TicketSystem/GuildStats")

module.exports = async (Roverdev) => {
    Roverdev.on(require("discord.js").Events.InteractionCreate, async (interaction) => {
        if (interaction.customId == "Ticket-System") {

              const data = await CreateTicket.findOne({ Author: interaction.user.id })

              if (data && data?.Channel) {
                     return interaction.reply({ 
                            content: `${DefaultEmojis.BotFailed} You Already have a channel open: <#${data.Channel}>`, ephemeral: true
                      })
              }

              const category = Roverdev.channels.cache.get(TicketSettings[`${interaction.values}`.replace("-","")].TicketCategorys[`${interaction.values}`.replace("-","")])
              const overflow1 = Roverdev.channels.cache.get(OverFlow.CreationOverFlow1)
              const overflow2 = Roverdev.channels.cache.get(OverFlow.CreationOverFlow2)

              let OpenCategory = ``

              if (category && category.children.cache.size < 50) {
                  OpenCategory = category.id
              } else if (overflow1 && overflow1.children.cache.size < 50) {
                  OpenCategory = overflow1.id
              } else if (overflow2 && overflow2.children.cache.size < 50) {
                  OpenCategory = overflow2.id
             }

                let Premissions = [
                         {
                              id: interaction.user.id,
                              allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages]
                        },
                        {
                             id: interaction.guild.roles.everyone,
                             deny: [PermissionFlagsBits.ViewChannel]
                        },
                ]

                   TicketSettings[`${interaction.values}`.replace("-","")].Roles.forEach(m => {
                              Premissions.push({ id: m.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [PermissionFlagsBits.SendMessages]})
                      })
                        interaction.guild.channels.create({
                              name: `${TicketSettings[`${interaction.values}`.replace("-","")].Emoji}╎${TicketSettings[`${interaction.values}`.replace("-","")].Type}-{TicketOpener}`.replace("{TicketOpener}", interaction.user.username),
                              type: ChannelType.GuildText,
                              parent: TicketSettings[`${interaction.values}`.replace("-","")].TicketCategorys[`${interaction.values}`.replace("-","")],
                              permissionOverwrites: Premissions
                     }).then(async function(channel) {
                                  const embed = new EmbedBuilder()
                                  .setAuthor({ name: `Ticket System | ${interaction.values} | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() })
                                  .setDescription(
                                   `${TicketSettings[`${interaction.values}`.replace("-","")].Messages.Description}`
                                      .replace("{UserId}", interaction.user.id)
                                      .replace("{TicketType}", interaction.values)
                                   )
                                  .setColor(TicketSettings[`${interaction.values}`.replace("-","")].Messages.Color)
                                  .setFooter({ text: "Ticket System | Roverdev Community" })
                                  .setTimestamp()

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

                                  interaction.reply({embeds: [
                                   new EmbedBuilder()
                                   .setAuthor({ name: `Create Your ${interaction.values}!`, iconURL: "https://cdn.discordapp.com/emojis/1058275136786149386.gif?size=96&quality=lossless" })
                                   .setDescription(`${TicketSettings[`${interaction.values}`.replace("-","")].Emoji} Your Ticket: <#${channel.id}>`)
                                   .setColor("#3dbeff")
                                 ], ephemeral: true
                             })

                             const data = await GuildStats.findOne({ Guild: interaction.guild.id })

                             if (data == null) {
                                 const Create2 = await GuildStats.create({
                                     Guild: interaction.guild.id,
                                     TotalTickets: 0
                                })
                                Create2.save()
                             } 

                             const data1 = await GuildStats.findOne({ Guild: interaction.guild.id })
                             
                             setTimeout(async () => {
                                const Create = await CreateTicket.create({
                                    Author: interaction.user.id,
                                    AuthorUsername: interaction.user.username,
                                    Channel: channel.id,
                                    CreatedAt: Date.now(),
                                    ClaimedUsers: [],
                                    TicketId: data1.TotalTickets + 1,
                                    TicketType: interaction.values[0],
                                    TicketEmoji: TicketSettings[`${interaction.values}`.replace("-","")].Emoji
                            })
                            Create.save()

                            await GuildStats.findOneAndUpdate({ Guild: interaction.guild.id }, { $set: {
                                  TotalTickets: data1.TotalTickets + 1
                            } })
                             }, 1000);

                             setTimeout(async () => {

                                const data3 = await GuildStats.findOne({ Guild: interaction.guild.id })

                                channel.setTopic(`Opener: ${interaction.user.id} | TicketId: ${data3.TotalTickets}  | Ticket Type: ${interaction.values}`)
                             }, 2000);

                             channel.send({ 
                                   embeds: [embed],
                                   components: [row],
                                   content: `${interaction.user} Welcome to your \`${interaction.values}\`\n> <:Staff:1010018063497826415> Staff: ${TicketSettings[`${interaction.values}`.replace("-","")].Roles.map(m => `<@&${m.id}>`)}`
                           }).then(async (msg) => {
                                 setTimeout(async() => {
                                    await CreateTicket.findOneAndUpdate({ Channel: channel.id }, { $set: { MainMessage: msg.id } })
                                }, 1000);

                                msg.pin()
                           })
                     })
        }
})
}