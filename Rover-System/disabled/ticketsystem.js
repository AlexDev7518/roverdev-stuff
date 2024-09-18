const { EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, StringSelectMenuBuilder, ChannelType, ButtonBuilder, ButtonStyle, ActionRow, PermissionsBitField } = require('discord.js')
const configuration = require('../../../configuration')
const TicketSystemData = require('../../../Models/TicketSystem')
const Emojis = require("../../../emojis")
module.exports = {
      name: "ticketsystem",
      category: "setup",
      cooldown: 2,
      RequiredPerms: ["Administrator"],
      description: "",
      RunCommand: async (Rover, message, args, executor, language, embed, database) => {
            let data = await TicketSystemData.findOne({ GuildID: message.guild.id })

            if (!data) {
                  await TicketSystemData.create({ GuildID: message.guild.id })
                  data = await TicketSystemData.findOne({ GuildID: message.guild.id })
            }

            let TicketOptions = [
                  // {
                  //       label: "Suggested Settings",
                  //       value: "Suggested-Settings",
                  //       description: "Setup the Suggested Settings",
                  //       emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `suggestedsettings`).id
                  // },
                  // {
                  //       label: "Ticket Settings",
                  //       value: "Ticket-Settings",
                  //       description: "View the ticket settings",
                  //       emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `ticketsettings`).id
                  // },
                  {
                        label: "Ticket Options",
                        value: "Ticket-Options",
                        description: "Edit the ticket open Options",
                        emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `ticketoptions`).id
                  },
                  {
                        label: "Blacklist system",
                        value: "Blacklist-system",
                        description: "Blacklist system",
                        emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `blacklistsettings`).id
                  },
                  {
                        label: "Ticket Roles",
                        value: "Ticket-Roles",
                        description: "Configure what roles can access ticket's",
                        emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `ticketroles`).id
                  },
                  {
                        label: "Permissions",
                        value: "Permissions",
                        description: "Permissions for Ticket Roles",
                        emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `permissions`).id
                  },
                  {
                        label: "Claiming System",
                        value: "Claiming-System",
                        description: "Enable / Edit / Disable the Claiming System",
                        emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `claimingsystem`).id
                  },
                  {
                        label: "Categorys & Channels",
                        value: "Categorys-Channels",
                        description: "Edit / Setup the Categorys / Channels",
                        emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `catchannels`).id
                  },
                  {
                        label: "Logger System",
                        description: "Enable / Edit the logger system",
                        value: "Logger-System",
                        emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `log`).id
                  },
                  {
                        label: "DropDown System",
                        value: "DropDown",
                        description: `Edit / View the DropDown`,
                        emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `dropdown`).id
                  },
                  {
                        label: "Embed Buttons",
                        value: "Embed-Buttons",
                        description: "Edit / add Embed Buttons ",
                        emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `embedbuttons`).id
                  },
                  {
                        label: "Button System",
                        value: "Button-System",
                        description: "Edit / view the Button System",
                        emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `button`).id
                  },
                  {
                        label: "Thread Style",
                        value: "Thread-Style",
                        description: "Threads instead of channels",
                        emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `threadstyle`).id
                  },
                  {
                        label: "Form Style",
                        value: "Form-Style",
                        description: "Form instead of channels",
                        emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `formstyle`).id
                  },
                  {
                        label: "Ticket Commands",
                        description: "Enable / Edit / Disable the ticket commands",
                        value: "Ticket-Commands",
                        emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `ticketcommands`).id
                  },
                  {
                        label: "Messages",
                        description: "Edit the messages of embeds / text",
                        value: "Messages",
                        emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `message`).id
                  },
                  {
                        label: "Modal System",
                        value: "Modal-System",
                        description: "Setup the modal system",
                        emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `modalsettings`).id
                  },
                  {
                        label: "Ticket Channel Name",
                        description: "Change the ticket channel name",
                        value: "channel-name",
                        emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `ticketchannelname`).id
                  },
                  {
                        label: "Ticket Limits",
                        value: "Ticket-Limit",
                        description: "set the ticket limit",
                        emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `limits`).id
                  },
                  {
                        label: "Auto-Delete",
                        description: "Delete the channels from Closed Category",
                        value: "Auto-Delete",
                        emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `autodelete`).id
                  },
                  {
                        label: "Automation Config",
                        value: "Automation-config",
                        description: "Edit the Automation configuration",
                        emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `automationconfig`).id
                  },

                  {
                        label: "Delete & reset",
                        description: "delete & reset the ticket system",
                        value: "delete-reset",
                        emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `deletereset`).id
                  },
            ]

            let TicketSetups = [
                  {
                        label: "Ticket System 1",
                        value: "Ticket-System-1",
                        description: "Control Ticket System 1",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_1`).id
                  },
                  {
                        label: "Ticket System 2",
                        value: "Ticket-System-2",
                        description: "Control Ticket System 2",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_2`).id
                  },
                  {
                        label: "Ticket System 3",
                        value: "Ticket-System-3",
                        description: "Control Ticket System 3",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_3`).id
                  },
                  {
                        label: "Ticket System 4",
                        value: "Ticket-System-4",
                        description: "Control Ticket System 4",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_4`).id
                  },
                  {
                        label: "Ticket System 5",
                        value: "Ticket-System-5",
                        description: "Control Ticket System 5",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_5`).id
                  },
                  {
                        label: "Ticket System 6",
                        value: "Ticket-System-6",
                        description: "Control Ticket System 6",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_6`).id
                  },
                  {
                        label: "Ticket System 7",
                        value: "Ticket-System-7",
                        description: "Control Ticket System 7",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_7`).id
                  },
                  {
                        label: "Ticket System 8",
                        value: "Ticket-System-8",
                        description: "Control Ticket System 8",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_8`).id
                  },
                  {
                        label: "Ticket System 9",
                        value: "Ticket-System-9",
                        description: "Control Ticket System 9",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_9`).id
                  },
                  {
                        label: "Ticket System 10",
                        value: "Ticket-System-10",
                        description: "Control Ticket System 10",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_10`).id
                  },
            ]
            let PremiumTicketSetups = [
                  {
                        label: "Ticket System 11",
                        value: "Ticket-System-11",
                        description: "Control Ticket System 11",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_11`).id
                  },
                  {
                        label: "Ticket System 12",
                        value: "Ticket-System-12",
                        description: "Control Ticket System 12",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_12`).id
                  },
                  {
                        label: "Ticket System 13",
                        value: "Ticket-System-13",
                        description: "Control Ticket System 13",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_13`).id
                  },
                  {
                        label: "Ticket System 14",
                        value: "Ticket-System-14",
                        description: "Control Ticket System 14",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_14`).id
                  },
                  {
                        label: "Ticket System 15",
                        value: "Ticket-System-15",
                        description: "Control Ticket System 15",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_15`).id
                  },
                  {
                        label: "Ticket System 16",
                        value: "Ticket-System-16",
                        description: "Control Ticket System 16",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_16`).id
                  },
                  {
                        label: "Ticket System 17",
                        value: "Ticket-System-17",
                        description: "Control Ticket System 17",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_17`).id
                  },
                  {
                        label: "Ticket System 18",
                        value: "Ticket-System-18",
                        description: "Control Ticket System 18",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_18`).id
                  },
                  {
                        label: "Ticket System 19",
                        value: "Ticket-System-19",
                        description: "Control Ticket System 19",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_19`).id
                  },
                  {
                        label: "Ticket System 20",
                        value: "Ticket-System-20",
                        description: "Control Ticket System 20",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_20`).id
                  },
                  {
                        label: "Ticket System 21",
                        value: "Ticket-System-21",
                        description: "Control Ticket System 21",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_21`).id
                  },
                  {
                        label: "Ticket System 22",
                        value: "Ticket-System-22",
                        description: "Control Ticket System 22",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_22`).id
                  },
                  {
                        label: "Ticket System 23",
                        value: "Ticket-System-23",
                        description: "Control Ticket System 23",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_23`).id
                  },
                  {
                        label: "Ticket System 24",
                        value: "Ticket-System-24",
                        description: "Control Ticket System 24",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_24`).id
                  },
                  {
                        label: "Ticket System 25",
                        value: "Ticket-System-25",
                        description: "Control Ticket System 25",
                        emoji: Rover.guilds.cache.get("846548733914906664").emojis.cache.find(m => m.name == `Number_25`).id
                  },
            ]

            let menu = new StringSelectMenuBuilder()
                  .setCustomId("Row-1")
                  .setPlaceholder("Select What Ticket System to Control")
                  .setOptions(TicketSetups)

            const row = new ActionRowBuilder()
                  .addComponents(menu)

            const embed1 = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                  .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                  .setDescription(`***<:RoverTicketSystem:1100276672760135770> Select What Option You want to \`Control / Setup\` Down Below***\nSetup's Created:\n> ${data.TicketSetups.length > 0 ? data.TicketSetups.map(m => `Ticket-System-${m.SetupNumber}`).join("\n> ") : `No Setups Created.`}`)

            message.reply({ embeds: [embed1], components: [row] })

            const filter = (interaction) => interaction.user.id === message.author.id;

            const collector = message.channel.createMessageComponentCollector({
                  filter,
                  max: 1,
                  time: 50000,
            });

            collector.on("collect", async (interaction) => {
                  try {
                        if (interaction.user.id !== message.author.id) return interaction.reply({ content: `<:declined:1100278176866906172>  **Only <@${message.author.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => { })
                  } catch (e) {
                        console.log(e)
                  }

                  if (interaction.customId == "Row-1") {
                        menu.setDisabled(true)
                        interaction.deferUpdate()
                        embed1.setColor("Green")
                        interaction.message.edit({ content: `***<:passed:1100278179354136636> Successfully Selected \`${interaction.values[0]}\`***`, embeds: [embed1], components: [row] })

                        let SetupNumber = `${interaction.values[0]}`.split("-")[2]


                        if (!data.TicketSetups.find(m => m.SetupNumber == SetupNumber)) {

                              setTimeout(async () => {
                                    menu.setOptions({
                                          label: "Setup Ticket System",
                                          value: "setup-ticket",
                                          description: "Setup this ticket system",
                                          emoji: Rover.guilds.cache.get("1076644862360834220").emojis.cache.find(m => m.name == `ticketsetup`).id
                                    })
                                    menu.setPlaceholder(`Select what you want to control.`)
                                    menu.setDisabled(false)

                                    const embed2 = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                          .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                          .setDescription(`***<:RoverTicketSystem:1100276672760135770> Select What you want to \`Control\` below.***\n>  *Only Showing 1 option Because This setup is not setup*`)

                                    let Msg1 = await interaction.message.edit({ embeds: [embed2], components: [row] })

                                    const filter = (interaction) => interaction.user.id === message.author.id;

                                    const collector = Msg1.createMessageComponentCollector({
                                          filter,
                                          max: 1,
                                          time: 50000,
                                    });

                                    collector.on("collect", async (interaction1) => {
                                          try {
                                                if (interaction1.user.id !== message.author.id) return interaction.reply({ content: `<:declined:1100278176866906172>  **Only <@${message.author.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => { })
                                          } catch (e) {
                                                console.log(e)
                                          }
                                          if (interaction1.values == "setup-ticket") {
                                                menu.setDisabled(true)
                                                embed2.setColor("Green")
                                                interaction1.deferUpdate()
                                                interaction1.message.edit({ embeds: [embed2], content: `***<:passed:1100278179354136636> Successfully Selected \`${interaction1.values[0]}\`***`, components: [row] })

                                                setTimeout(async () => {
                                                      const embed3 = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                            .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                            .setDescription(`***<:normalchannel:1100498593246351550> Please Provide \`ChannelId / Channel Mention\`***`)

                                                      let msg2 = await interaction1.message.edit({ embeds: [embed3], components: [] })

                                                      interaction1.channel.awaitMessages({
                                                            max: 1,
                                                            time: 60000,
                                                            filter: m => m.author.id === message.author.id,
                                                            errors: ['time']
                                                      })
                                                            .then(collected => {

                                                                  let channel = ``

                                                                  if (isNaN(collected.first().content)) {
                                                                        if (!message.guild.channels.cache.get(collected.first().mentions.channels.first()?.id)) {
                                                                              embed3.setColor("Red")
                                                                              msg2.edit({ embeds: [embed3] })
                                                                              return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                    embeds: [
                                                                                          new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                .setColor("Red")
                                                                                                .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                .setDescription(`***Seems this channel is not in this guild! / a vaild channel***`)
                                                                                    ]
                                                                              })
                                                                        } else if (message.guild.channels.cache.get(collected.first().mentions.channels.first().id) && collected.first().mentions.channels.first().type !== ChannelType.GuildText) {
                                                                              embed3.setColor("Red")
                                                                              msg2.edit({ embeds: [embed3] })
                                                                              return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                    embeds: [
                                                                                          new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                .setColor("Red")
                                                                                                .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                .setDescription(`***This channel is not a text channel!***`)
                                                                                    ]
                                                                              })
                                                                        } else if (message.guild.channels.cache.get(collected.first().mentions.channels.first().id) && collected.first().mentions.channels.first().type == ChannelType.GuildText) {
                                                                              channel = collected.first().mentions.channels.first()
                                                                        }
                                                                  } else if (!isNaN(collected.first().content) && !message.guild.channels.cache.get(collected.first().content)) {
                                                                        embed3.setColor("Red")
                                                                        msg2.edit({ embeds: [embed3] })
                                                                        return message.channel.messages.cache.get(collected.first().id).reply({
                                                                              embeds: [
                                                                                    new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                          .setColor("Red")
                                                                                          .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                          .setDescription(`***Seems this channel is not in this guild!***`)
                                                                              ]
                                                                        })
                                                                  } else if (!isNaN(collected.first().content) && message.guild.channels.cache.get(collected.first().content) && message.guild.channels.cache.get(collected.first().content).type !== ChannelType.GuildText) {
                                                                        embed3.setColor("Red")
                                                                        msg2.edit({ embeds: [embed3] })
                                                                        return message.channel.messages.cache.get(collected.first().id).reply({
                                                                              embeds: [
                                                                                    new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                          .setColor("Red")
                                                                                          .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                          .setDescription(`***This channel is not a text channel!***`)
                                                                              ]
                                                                        })
                                                                  } else if (!isNaN(collected.first().content) && message.guild.channels.cache.get(collected.first().content) && message.guild.channels.cache.get(collected.first().content).type == ChannelType.GuildText) {
                                                                        channel = message.guild.channels.cache.get(collected.first().content)
                                                                  }

                                                                  if (data.TicketSetups.find(m => m.ChannelConfig.channelId == channel.id)) {
                                                                        embed3.setColor("Red")
                                                                        msg2.edit({ embeds: [embed3] })
                                                                        return message.channel.messages.cache.get(collected.first().id).reply({
                                                                              embeds: [
                                                                                    new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                          .setColor("Red")
                                                                                          .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                          .setDescription(`***This channel is already setup in \`Ticket System ${data.TicketSetups.find(m => m.ChannelConfig.channelId == channel.id).SetupNumber}\`!***`)
                                                                              ]
                                                                        })
                                                                  }

                                                                  embed3.setColor("Green")
                                                                  msg2.edit({ embeds: [embed3] })

                                                                  msg2.edit({
                                                                        embeds: [
                                                                              new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                    .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                    .setDescription(`***Now Setting up the ticket system in ${channel}***`)
                                                                        ]
                                                                  })

                                                                  setTimeout(() => {
                                                                        const embedForSetup = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                              .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                              .setDescription(`<a:BotSetupLoading:1091855746762801152>Send the Message in the ${channel}..\n◽Setup the Ticket system Database\n◽Finish the Setup`)

                                                                        message.channel.messages.cache.get(collected.first().id).reply({ embeds: [embedForSetup] }).then((msg) => {
                                                                              const embed2 = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                    .setAuthor({ name: `Ticket System | ${message.guild.name}`, iconURL: "https://cdn.discordapp.com/emojis/1100276672760135770.webp?size=96&quality=lossless" })
                                                                                    .setDescription(`*Run \`rt!ticketsystem\` to configure this more!*`)
                                                                                    .setTimestamp()

                                                                              Rover.channels.cache.get(channel.id).send({
                                                                                    embeds: [embed2],

                                                                              }).then(async (msg1) => {
                                                                                    embedForSetup.setDescription(`<:passed:1100278179354136636> Send the Message in the ${channel}\n<a:BotSetupLoading:1091855746762801152> Setup the Ticket system Database\n◽Finish the Setup`)

                                                                                    msg.edit({ embeds: [embedForSetup] })

                                                                                    let array = data.TicketSetups
                                                                                    array.push({ SetupNumber: SetupNumber, ChannelConfig: { channelId: channel.id, MsgId: msg1.id } })
                                                                                    await TicketSystemData.findOneAndUpdate({ GuildID: message.guild.id }, data)
                                                                                    data = await TicketSystemData.findOne({ GuildID: message.guild.id })

                                                                                    embedForSetup.setDescription(`<:passed:1100278179354136636> Send the Message in the ${channel}\n<:passed:1100278179354136636> Setup the Ticket system Database\n◽Finish the Setup`)

                                                                                    msg.edit({ embeds: [embedForSetup] })

                                                                                    setTimeout(() => {

                                                                                          embedForSetup.setDescription(`<:passed:1100278179354136636> Send the Message in the ${channel}\n<:passed:1100278179354136636> Setup the Ticket system Database\n<:passed:1100278179354136636>Finish the Setup`)

                                                                                          msg.edit({ embeds: [embedForSetup] })

                                                                                          setTimeout(() => {

                                                                                                msg.delete()
                                                                                                interaction.message.delete()
                                                                                                message.channel.messages.cache.get(collected.first().id).delete()


                                                                                                const translate = require(`../../../Languages/English.json`)[Rover.user.id]["commands"]["information"]

                                                                                                require("./ticketsystem").RunCommand(Rover, message, args, message.member, translate, new EmbedBuilder(), data)
                                                                                          }, 2000);
                                                                                    }, 1900)
                                                                              })
                                                                        })
                                                                  }, 150);


                                                            })
                                                }, 150);
                                          }
                                    })
                              }, 150);
                              return;
                        } else {
                              setTimeout(async () => {
                                    let SetupNumber = `${interaction.values[0]}`.split("-")[2]

                                    const embed2 = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                          .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                          .setDescription(`***Select A Option to \`Control / Setup\` Below.***`)

                                    menu.setDisabled(false)

                                    menu.setOptions(TicketOptions)
                                    menu.setPlaceholder(`Select what option you want to control`)

                                    let Msg1 = await interaction.message.edit({ embeds: [embed2], components: [row] })


                                    const filter = (interaction) => interaction.user.id === message.author.id;

                                    const collector = Msg1.createMessageComponentCollector({
                                          filter,
                                          max: 1,
                                          time: 50000,
                                    });

                                    collector.on("collect", async interaction3 => {
                                          if (interaction3.values == "Blacklist-system") {
                                                if (!data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem) {
                                                      data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem = {
                                                            BlacklistedUsers: [],
                                                            BlackListedRoles: []
                                                      }

                                                      await TicketSystemData.findOneAndUpdate({ GuildID: message.guild.id }, data)
                                                }

                                                setTimeout(async () => {
                                                      menu.setDisabled(true)
                                                      interaction3.deferUpdate()
                                                      embed1.setColor("Green")
                                                      interaction.message.edit({ content: `***<:passed:1100278179354136636> Successfully Selected \`${interaction3.values[0]}\`***`, embeds: [embed2], components: [row] })

                                                      const embed3 = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                            .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                            .setDescription(`***<:RoverTicketSystem:1100276672760135770> Please Select what you want to \`Add/Remove\` Users / Roles Too.***`)

                                                      row.setComponents(
                                                            new ButtonBuilder()
                                                                  .setCustomId("User-Configuration")
                                                                  .setEmoji("1043254114676641892")
                                                                  .setLabel("User Configuration")
                                                                  .setStyle(ButtonStyle.Success),
                                                            new ButtonBuilder()
                                                                  .setCustomId("Role-Configuration")
                                                                  .setEmoji("1102041037226123305")
                                                                  .setLabel("Role Configuration")
                                                                  .setStyle(ButtonStyle.Primary),
                                                      )

                                                      let Msg1 = await interaction3.message.edit({ embeds: [embed3], components: [row] })

                                                      const filter = (interaction) => interaction.user.id === message.author.id;

                                                      const collector = Msg1.createMessageComponentCollector({
                                                            filter,
                                                            max: 1,
                                                            time: 50000,
                                                      });

                                                      collector.on("collect", async interaction4 => {
                                                            if (interaction4.customId == "Role-Configuration") {
                                                                  row.components.forEach(m => m.setDisabled(true))
                                                                  interaction4.deferUpdate()
                                                                  embed3.setColor("Green")
                                                                  interaction4.message.edit({ content: `***<:passed:1100278179354136636> Successfully Selected \`${interaction4.customId}\`***`, embeds: [embed3], components: [row] })

                                                                  setTimeout(async () => {
                                                                        const embed4 = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                              .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                              .setDescription(`***<:RoverTicketSystem:1100276672760135770> Please Select \`Add Role/Remove Role\` To BlackList / UnBlacklist the Role.***`)




                                                                        row.setComponents(
                                                                              new ButtonBuilder()
                                                                                    .setCustomId("Add-Role")
                                                                                    .setEmoji("1102042660350464000")
                                                                                    .setLabel("Add Role")
                                                                                    .setStyle(ButtonStyle.Success),
                                                                              new ButtonBuilder()
                                                                                    .setCustomId("Remove-Role")
                                                                                    .setEmoji("1102042662321786891")
                                                                                    .setLabel("Remove Role")
                                                                                    .setStyle(ButtonStyle.Danger),
                                                                              new ButtonBuilder()
                                                                                    .setCustomId("View-Roles")
                                                                                    .setEmoji("1058276706814799993")
                                                                                    .setLabel("View Roles")
                                                                                    .setStyle(ButtonStyle.Primary),
                                                                        )

                                                                        let Msg1 = await interaction4.message.edit({ embeds: [embed4], components: [row] })

                                                                        const filter = (interaction) => interaction.user.id === message.author.id;

                                                                        const collector = Msg1.createMessageComponentCollector({
                                                                              filter,
                                                                              max: 1,
                                                                              time: 50000,
                                                                        });

                                                                        collector.on("collect", async RoleInteraction => {
                                                                              if (RoleInteraction.customId == "Add-Role") {
                                                                                    row.components.forEach(m => m.setDisabled(true))
                                                                                    RoleInteraction.deferUpdate()
                                                                                    embed4.setColor("Green")
                                                                                    RoleInteraction.message.edit({ content: `***<:passed:1100278179354136636> Successfully Selected \`${RoleInteraction.customId}\`***`, embeds: [embed4], components: [row] })

                                                                                    setTimeout(async () => {
                                                                                          const embed3 = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                .setDescription(`***<:User:1043254114676641892> Please Provide me a \`Role Id/Mention/Name\`***`)

                                                                                          let msg2 = await RoleInteraction.message.edit({ embeds: [embed3], components: [] })

                                                                                          RoleInteraction.channel.awaitMessages({ max: 1, time: 60000, filter: m => m.author.id === message.author.id, errors: ['time'] }).then(async collected => {
                                                                                                let content = collected.first().content

                                                                                                if (content.includes("@")) {
                                                                                                      if (message.guild.roles.cache.get(collected.first().mentions.roles.first().id)) {
                                                                                                            content = message.guild.members.roles.get(collected.first().mentions.roles.first().id)

                                                                                                            if (data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlackListedRoles.find(m => m.RoleId == content.id)) {
                                                                                                                  embed3.setColor("Red")
                                                                                                                  msg2.edit({ embeds: [embed3] })
                                                                                                                  return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                                        embeds: [
                                                                                                                              new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                                    .setColor("Red")
                                                                                                                                    .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                                    .setDescription(`***<:failed:1023811778087485491> Seems Role is Already Blacklisted!***`)
                                                                                                                        ]
                                                                                                                  })
                                                                                                            }

                                                                                                            embed3.setColor("Green")
                                                                                                            msg2.edit({ embeds: [embed3] })

                                                                                                            let array = data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlackListedRoles
                                                                                                            array.push({ RoleId: content.id, RoleBlacklistedBy: message.author.id, BlacklistedAt: Date.now(), })
                                                                                                            await TicketSystemData.findOneAndUpdate({ GuildID: message.guild.id }, data)
                                                                                                            data = await TicketSystemData.findOne({ GuildID: message.guild.id })

                                                                                                            return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                                  embeds: [
                                                                                                                        new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                              .setColor("Green")
                                                                                                                              .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                              .setDescription(`***<:passed:1023811776850186261> Successfully Blacklisted: \`${content.name}\`***\n> Now Any Users with this role can't open a ticket!`)
                                                                                                                  ]
                                                                                                            })
                                                                                                      } else {
                                                                                                            embed3.setColor("Red")
                                                                                                            msg2.edit({ embeds: [embed3] })
                                                                                                            return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                                  embeds: [
                                                                                                                        new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                              .setColor("Red")
                                                                                                                              .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                              .setDescription(`***<:failed:1023811778087485491> Seems Role is not in the guild***`)
                                                                                                                  ]
                                                                                                            })
                                                                                                      }
                                                                                                } else if (!isNaN(collected.first().content)) {
                                                                                                      if (message.guild.roles.cache.get(collected.first().content)) {
                                                                                                            content = message.guild.roles.cache.get(collected.first().content)

                                                                                                            if (data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlackListedRoles.find(m => m.RoleId == content.id)) {
                                                                                                                  embed3.setColor("Red")
                                                                                                                  msg2.edit({ embeds: [embed3] })
                                                                                                                  return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                                        embeds: [
                                                                                                                              new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                                    .setColor("Red")
                                                                                                                                    .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                                    .setDescription(`***<:failed:1023811778087485491> Seems Role is Already Blacklisted!***`)
                                                                                                                        ]
                                                                                                                  })
                                                                                                            }

                                                                                                            embed3.setColor("Green")
                                                                                                            msg2.edit({ embeds: [embed3] })

                                                                                                            let array = data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlackListedRoles
                                                                                                            array.push({ RoleId: content.id, RoleBlacklistedBy: message.author.id, BlacklistedAt: Date.now(), })
                                                                                                            await TicketSystemData.findOneAndUpdate({ GuildID: message.guild.id }, data)
                                                                                                            data = await TicketSystemData.findOne({ GuildID: message.guild.id })

                                                                                                            return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                                  embeds: [
                                                                                                                        new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                              .setColor("Green")
                                                                                                                              .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                              .setDescription(`***<:passed:1023811776850186261> Successfully Blacklisted: \`${content.name}\`***\n> Now Any Users with this role can't open a ticket!`)
                                                                                                                  ]
                                                                                                            })
                                                                                                      } else {
                                                                                                            embed3.setColor("Red")
                                                                                                            msg2.edit({ embeds: [embed3] })
                                                                                                            return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                                  embeds: [
                                                                                                                        new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                              .setColor("Red")
                                                                                                                              .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                              .setDescription(`***<:failed:1023811778087485491> Seems Role is not in the guild***`)
                                                                                                                  ]
                                                                                                            })
                                                                                                      }
                                                                                                } else {
                                                                                                      embed3.setColor("Green")
                                                                                                      msg2.edit({ embeds: [embed3] })
                                                                                                      let something = await message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                            embeds: [
                                                                                                                  new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                        .setColor("Yellow")
                                                                                                                        .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                        .setDescription(`***<a:ShopLoading:1032236793812242473> Finding Roles with names that start with \`${content}\` Could take about 10s.***`)
                                                                                                            ]
                                                                                                      })

                                                                                                      let array = []

                                                                                                      message.guild.roles.cache.forEach(m => {

                                                                                                            if (m.name.startsWith(content) || m.name == content || m.name.includes(content)) {
                                                                                                                  array.push({
                                                                                                                        label: m.name,
                                                                                                                        value: m.id,
                                                                                                                        description: `Blacklist ${m.name}`
                                                                                                                  })
                                                                                                            }
                                                                                                      })

                                                                                                      setTimeout(async () => {

                                                                                                            if (array.length < 1) {
                                                                                                                  embed3.setColor("Red")
                                                                                                                  msg2.edit({ embeds: [embed3] })
                                                                                                                  return something.edit({
                                                                                                                        embeds: [
                                                                                                                              new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                                    .setColor("Red")
                                                                                                                                    .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                                    .setDescription(`***<:failed:1023811778087485491> Seems No Roles are found with \`${content}\` name***`)
                                                                                                                        ]
                                                                                                                  })
                                                                                                            }

                                                                                                            let menu1 = new StringSelectMenuBuilder()
                                                                                                                  .setCustomId("Role-Selection")
                                                                                                                  .setPlaceholder("Please Select the Role you want to blacklist")
                                                                                                                  .setOptions(array)

                                                                                                            let UserRow = new ActionRowBuilder()
                                                                                                                  .addComponents(menu1)

                                                                                                            const UserEmbed = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                  .setColor("Green")
                                                                                                                  .setDescription(`***<:passed:1023811776850186261> Found Some Roles with the name \`${content}\`***\n> - Select The Role you want to blacklist below`)

                                                                                                            let Msg5 = await something.edit({ embeds: [UserEmbed], components: [UserRow] })

                                                                                                            const filter = (interaction) => interaction.user.id === message.author.id;

                                                                                                            const collector = Msg5.createMessageComponentCollector({
                                                                                                                  filter,
                                                                                                                  max: 1,
                                                                                                                  time: 50000,
                                                                                                            });

                                                                                                            collector.on("collect", async UserInteraction1 => {
                                                                                                                  if (UserInteraction1.customId == "Role-Selection") {
                                                                                                                        let user = message.guild.roles.cache.get(UserInteraction1.values[0])

                                                                                                                        menu1.setDisabled(true)

                                                                                                                        UserInteraction1.message.edit({
                                                                                                                              content: `***<:passed:1100278179354136636> Selected \`${array.find(m => m.value == UserInteraction1.values[0]).label}\`***`,
                                                                                                                              components: [UserRow]
                                                                                                                        })

                                                                                                                        let array1 = data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlackListedRoles
                                                                                                                        array1.push({ RoleId: user.id, RoleBlacklistedBy: message.author.id, BlacklistedAt: Date.now(), })
                                                                                                                        await TicketSystemData.findOneAndUpdate({ GuildID: message.guild.id }, data)
                                                                                                                        data = await TicketSystemData.findOne({ GuildID: message.guild.id })

                                                                                                                        UserInteraction1.reply({
                                                                                                                              embeds: [
                                                                                                                                    new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                                          .setColor("Green")
                                                                                                                                          .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                                          .setDescription(`***<:passed:1023811776850186261> Successfully Blacklisted: \`${user.name}\`***\n> Now Any Users with this role can't open a ticket!`)
                                                                                                                              ]
                                                                                                                        })
                                                                                                                  }
                                                                                                            })
                                                                                                      }, 10000);
                                                                                                      return;
                                                                                                }

                                                                                          })

                                                                                    }, 150);
                                                                              } else if (RoleInteraction.customId == "Remove-Role") {
                                                                                    row.components.forEach(m => m.setDisabled(true))
                                                                                    embed4.setColor("Green")
                                                                                    RoleInteraction.message.edit({ content: `***<:passed:1100278179354136636> Successfully Selected \`${RoleInteraction.customId}\`***`, embeds: [embed4], components: [row] })

                                                                                    let something = await RoleInteraction.reply({
                                                                                          embeds: [
                                                                                                new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                      .setColor("Yellow")
                                                                                                      .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                      .setDescription(`***<a:ShopLoading:1032236793812242473> Fetching All Blacklisted Roles.***`)
                                                                                          ]
                                                                                    })

                                                                                    setTimeout(async () => {
                                                                                          const RemoveUser = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                .setColor("Red")
                                                                                                .setDescription(`:question: What role would you like to remove from blacklist?`)

                                                                                          let MenuOptions = []

                                                                                          data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlackListedRoles.forEach((m) => {
                                                                                                MenuOptions.push({
                                                                                                      label: message.guild.roles.cache.get(m.RoleId).name,
                                                                                                      value: message.guild.roles.cache.get(m.RoleId).id,
                                                                                                      description: `Remove ${message.guild.roles.cache.get(m.RoleId).name} From Blacklist`
                                                                                                })
                                                                                          })

                                                                                          const row1 = new ActionRowBuilder()
                                                                                                .addComponents(
                                                                                                      new StringSelectMenuBuilder()
                                                                                                            .setCustomId("Select-Role")
                                                                                                            .setPlaceholder("Select a Role from blacklist")
                                                                                                            .setOptions(MenuOptions)
                                                                                                )

                                                                                          let Msg5 = await something.edit({ embeds: [RemoveUser], components: [row1] })

                                                                                          const filter = (interaction) => interaction.user.id === message.author.id;

                                                                                          const collector = Msg5.createMessageComponentCollector({
                                                                                                filter,
                                                                                                max: 1,
                                                                                                time: 50000,
                                                                                          });


                                                                                          collector.on("collect", async UserInteraction1 => {
                                                                                                if (UserInteraction1.customId == "Select-Role") {
                                                                                                      let user = message.guild.roles.cache.get(UserInteraction1.values[0])

                                                                                                      row1.components.forEach(m => m.setDisabled(true))

                                                                                                      UserInteraction1.message.edit({
                                                                                                            content: `***<:passed:1100278179354136636> Selected \`${MenuOptions.find(m => m.value == UserInteraction1.values[0]).label}\`***`,
                                                                                                            components: [row1]
                                                                                                      })

                                                                                                      let array1 = data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlackListedRoles
                                                                                                      array1.splice(array1.findIndex(v => v.RoleId === user.id), 1);
                                                                                                      await TicketSystemData.findOneAndUpdate({ GuildID: message.guild.id }, data)
                                                                                                      data = await TicketSystemData.findOne({ GuildID: message.guild.id })

                                                                                                      UserInteraction1.reply({
                                                                                                            embeds: [
                                                                                                                  new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                        .setColor("Green")
                                                                                                                        .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                        .setDescription(`***<:passed:1023811776850186261> Successfully Unblacklisted \`${user.name}\`***\n> Now any one with that role can open a ticket!`)
                                                                                                            ]
                                                                                                      })
                                                                                                }
                                                                                          })
                                                                                    }, 2000);

                                                                              } else if (RoleInteraction.customId == "View-Roles") {
                                                                                    row.components.forEach(m => m.setDisabled(true))
                                                                                    RoleInteraction.deferUpdate()
                                                                                    embed4.setColor("Green")
                                                                                    RoleInteraction.message.edit({ content: `***<:passed:1100278179354136636> Successfully Selected \`${RoleInteraction.customId}\`***`, embeds: [embed4], components: [row] })


                                                                                    const ViewUsers = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                          .setColor("Blue")

                                                                                    let i = 0

                                                                                    let EmbedArray = []

                                                                                    let moment = require("moment")

                                                                                    let array = []

                                                                                    data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlackListedRoles.forEach(m => {

                                                                                          array.push({
                                                                                                name: `Role: \`${message.guild.roles.cache.get(m.RoleId).name}\``,
                                                                                                value: `\`\`\`yml\nRole: ${message.guild.roles.cache.get(m.RoleId).name}\nAt: ${moment(m.BlacklistedAt).format('MMMM Do YYYY')}\nBy: ${Rover.users.cache.get(m.BlacklistedBy).tag}\`\`\``,
                                                                                                inline: true
                                                                                          })
                                                                                    })


                                                                                    if (array.length > 25) {

                                                                                          // data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlacklistedUsers.forEach(m => {
                                                                                          //       EmbedArray.push(
                                                                                          //             new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                          //             .setColor("Blue")
                                                                                          //             .setTitle(`User: \`${Rover.users.cache.get(m.User).tag}\``)
                                                                                          //             .setDescription(`\`\`\`yml\nUser: ${Rover.users.cache.get(m.User).username}\nAt: ${moment(m.BlacklistedAt).format('MMMM Do YYYY')}\nBy: ${Rover.users.cache.get(m.BlacklistedBy).tag}\`\`\``)
                                                                                          //      )
                                                                                          // })
                                                                                    } else if (array.length < 25) {
                                                                                          array.forEach(m => {
                                                                                                ViewUsers.addFields(m)
                                                                                          })
                                                                                    }
                                                                                    EmbedArray.push(ViewUsers)

                                                                                    setTimeout(() => {
                                                                                          setTimeout(() => {
                                                                                                RoleInteraction.message.reply({ embeds: EmbedArray, })
                                                                                          }, 150);
                                                                                    }, 150);


                                                                              }


                                                                        })
                                                                  }, 150)
                                                            }
                                                            if (interaction4.customId == "User-Configuration") {
                                                                  row.components.forEach(m => m.setDisabled(true))
                                                                  interaction4.deferUpdate()
                                                                  embed3.setColor("Green")
                                                                  interaction4.message.edit({ content: `***<:passed:1100278179354136636> Successfully Selected \`${interaction4.customId}\`***`, embeds: [embed3], components: [row] })

                                                                  setTimeout(async () => {
                                                                        const embed4 = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                              .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                              .setDescription(`***<:RoverTicketSystem:1100276672760135770> Please Select \`Add User/Remove User\` To BlackList / UnBlacklist the user.***`)

                                                                        row.setComponents(
                                                                              new ButtonBuilder()
                                                                                    .setCustomId("Add-User")
                                                                                    .setEmoji("1102042660350464000")
                                                                                    .setLabel("Add User")
                                                                                    .setStyle(ButtonStyle.Success),
                                                                              new ButtonBuilder()
                                                                                    .setCustomId("Remove-User")
                                                                                    .setEmoji("1102042662321786891")
                                                                                    .setLabel("Remove User")
                                                                                    .setStyle(ButtonStyle.Danger),
                                                                              new ButtonBuilder()
                                                                                    .setCustomId("View-users")
                                                                                    .setEmoji("1058276706814799993")
                                                                                    .setLabel("View users")
                                                                                    .setStyle(ButtonStyle.Primary),
                                                                        )

                                                                        let Msg1 = await interaction4.message.edit({ embeds: [embed4], components: [row] })

                                                                        const filter = (interaction) => interaction.user.id === message.author.id;

                                                                        const collector = Msg1.createMessageComponentCollector({
                                                                              filter,
                                                                              max: 1,
                                                                              time: 50000,
                                                                        });

                                                                        collector.on("collect", async UserInteraction => {
                                                                              if (UserInteraction.customId == "Add-User") {
                                                                                    row.components.forEach(m => m.setDisabled(true))
                                                                                    UserInteraction.deferUpdate()
                                                                                    embed4.setColor("Green")
                                                                                    UserInteraction.message.edit({ content: `***<:passed:1100278179354136636> Successfully Selected \`${UserInteraction.customId}\`***`, embeds: [embed4], components: [row] })

                                                                                    setTimeout(async () => {
                                                                                          const embed3 = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                .setDescription(`***<:User:1043254114676641892> Please Provide me a \`User Id/Mention/UserName/Tag (User#0000)\`***`)

                                                                                          let msg2 = await UserInteraction.message.edit({ embeds: [embed3], components: [] })

                                                                                          UserInteraction.channel.awaitMessages({ max: 1, time: 60000, filter: m => m.author.id === message.author.id, errors: ['time'] }).then(async collected => {
                                                                                                let content = collected.first().content

                                                                                                if (content.includes("@")) {
                                                                                                      if (message.guild.members.cache.get(collected.first().mentions.users.first().id)) {
                                                                                                            content = message.guild.members.cache.get(collected.first().mentions.users.first().id)

                                                                                                            if (data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlacklistedUsers.find(m => m.User == content.user.id)) {
                                                                                                                  embed3.setColor("Red")
                                                                                                                  msg2.edit({ embeds: [embed3] })
                                                                                                                  return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                                        embeds: [
                                                                                                                              new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                                    .setColor("Red")
                                                                                                                                    .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                                    .setDescription(`***<:failed:1023811778087485491> Seems User is Already Blacklisted!***`)
                                                                                                                        ]
                                                                                                                  })
                                                                                                            }

                                                                                                            embed3.setColor("Green")
                                                                                                            msg2.edit({ embeds: [embed3] })

                                                                                                            let array = data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlacklistedUsers
                                                                                                            array.push({ User: content.user.id, BlacklistedAt: Date.now(), BlacklistedBy: message.author.id })
                                                                                                            await TicketSystemData.findOneAndUpdate({ GuildID: message.guild.id }, data)
                                                                                                            data = await TicketSystemData.findOne({ GuildID: message.guild.id })

                                                                                                            return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                                  embeds: [
                                                                                                                        new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                              .setColor("Green")
                                                                                                                              .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                              .setDescription(`***<:passed:1023811776850186261> Successfully Blacklisted: \`${content.user.tag}\`***\n> Now they can't open a ticket unless you remove there blacklist`)
                                                                                                                  ]
                                                                                                            })
                                                                                                      } else {
                                                                                                            embed3.setColor("Red")
                                                                                                            msg2.edit({ embeds: [embed3] })
                                                                                                            return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                                  embeds: [
                                                                                                                        new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                              .setColor("Red")
                                                                                                                              .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                              .setDescription(`***<:failed:1023811778087485491> Seems User is not in the guild***`)
                                                                                                                  ]
                                                                                                            })
                                                                                                      }
                                                                                                } else if (!isNaN(collected.first().content)) {
                                                                                                      if (message.guild.members.cache.get(collected.first().content)) {
                                                                                                            content = message.guild.members.cache.get(collected.first().content)

                                                                                                            if (data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlacklistedUsers.find(m => m.User == content.user.id)) {
                                                                                                                  embed3.setColor("Red")
                                                                                                                  msg2.edit({ embeds: [embed3] })
                                                                                                                  return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                                        embeds: [
                                                                                                                              new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                                    .setColor("Red")
                                                                                                                                    .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                                    .setDescription(`***<:failed:1023811778087485491> Seems User is Already Blacklisted!***`)
                                                                                                                        ]
                                                                                                                  })
                                                                                                            }

                                                                                                            embed3.setColor("Green")
                                                                                                            msg2.edit({ embeds: [embed3] })

                                                                                                            let array = data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlacklistedUsers
                                                                                                            array.push({ User: content.user.id, BlacklistedAt: Date.now(), BlacklistedBy: message.author.id })
                                                                                                            await TicketSystemData.findOneAndUpdate({ GuildID: message.guild.id }, data)
                                                                                                            data = await TicketSystemData.findOne({ GuildID: message.guild.id })

                                                                                                            return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                                  embeds: [
                                                                                                                        new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                              .setColor("Green")
                                                                                                                              .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                              .setDescription(`***<:passed:1023811776850186261> Successfully Blacklisted: \`${content.user.tag}\`***\n> Now they can't open a ticket unless you remove there blacklist`)
                                                                                                                  ]
                                                                                                            })
                                                                                                      } else {
                                                                                                            embed3.setColor("Red")
                                                                                                            msg2.edit({ embeds: [embed3] })
                                                                                                            return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                                  embeds: [
                                                                                                                        new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                              .setColor("Red")
                                                                                                                              .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                              .setDescription(`***<:failed:1023811778087485491> Seems User is not in the guild***`)
                                                                                                                  ]
                                                                                                            })
                                                                                                      }
                                                                                                } else if (content.includes("#")) {
                                                                                                      if (Rover.users.cache.find(m => m.tag == content) && message.guild.members.cache.get(Rover.users.cache.find(m => m.tag == content).id)) {
                                                                                                            content = message.guild.members.cache.get(Rover.users.cache.find(m => m.tag == content).id)

                                                                                                            if (data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlacklistedUsers.find(m => m.User == content.user.id)) {
                                                                                                                  embed3.setColor("Red")
                                                                                                                  msg2.edit({ embeds: [embed3] })
                                                                                                                  return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                                        embeds: [
                                                                                                                              new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                                    .setColor("Red")
                                                                                                                                    .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                                    .setDescription(`***<:failed:1023811778087485491> Seems User is Already Blacklisted!***`)
                                                                                                                        ]
                                                                                                                  })
                                                                                                            }

                                                                                                            embed3.setColor("Green")
                                                                                                            msg2.edit({ embeds: [embed3] })

                                                                                                            let array = data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlacklistedUsers
                                                                                                            array.push({ User: content.user.id, BlacklistedAt: Date.now(), BlacklistedBy: message.author.id })
                                                                                                            await TicketSystemData.findOneAndUpdate({ GuildID: message.guild.id }, data)
                                                                                                            data = await TicketSystemData.findOne({ GuildID: message.guild.id })

                                                                                                            return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                                  embeds: [
                                                                                                                        new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                              .setColor("Green")
                                                                                                                              .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                              .setDescription(`***<:passed:1023811776850186261> Successfully Blacklisted: \`${content.user.tag}\`***\n> Now they can't open a ticket unless you remove there blacklist`)
                                                                                                                  ]
                                                                                                            })
                                                                                                      } else {
                                                                                                            embed3.setColor("Red")
                                                                                                            msg2.edit({ embeds: [embed3] })
                                                                                                            return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                                  embeds: [
                                                                                                                        new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                              .setColor("Red")
                                                                                                                              .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                              .setDescription(`***<:failed:1023811778087485491> Seems User is not in the guild***`)
                                                                                                                  ]
                                                                                                            })
                                                                                                      }
                                                                                                } else {
                                                                                                      embed3.setColor("Green")
                                                                                                      msg2.edit({ embeds: [embed3] })
                                                                                                      let something = await message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                            embeds: [
                                                                                                                  new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                        .setColor("Yellow")
                                                                                                                        .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                        .setDescription(`***<a:ShopLoading:1032236793812242473> Finding Users with names that start with \`${content}\` Could take about 10s.***`)
                                                                                                            ]
                                                                                                      })

                                                                                                      let array = []

                                                                                                      message.guild.members.cache.forEach(m => {
                                                                                                            if (m.user.username.startsWith(content)) {
                                                                                                                  array.push({
                                                                                                                        label: m.user.username,
                                                                                                                        value: m.user.id,
                                                                                                                        description: `Blacklist ${m.user.tag}`
                                                                                                                  })
                                                                                                            }
                                                                                                      })

                                                                                                      setTimeout(async () => {

                                                                                                            if (array.length < 1) {
                                                                                                                  embed3.setColor("Red")
                                                                                                                  msg2.edit({ embeds: [embed3] })
                                                                                                                  return something.edit({
                                                                                                                        embeds: [
                                                                                                                              new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                                    .setColor("Red")
                                                                                                                                    .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                                    .setDescription(`***<:failed:1023811778087485491> Seems No users are found with \`${content}\` name***`)
                                                                                                                        ]
                                                                                                                  })
                                                                                                            }

                                                                                                            let menu1 = new StringSelectMenuBuilder()
                                                                                                                  .setCustomId("User-Selection")
                                                                                                                  .setPlaceholder("Please Select the user you want to blacklist")
                                                                                                                  .setOptions(array)

                                                                                                            let UserRow = new ActionRowBuilder()
                                                                                                                  .addComponents(menu1)

                                                                                                            const UserEmbed = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                  .setColor("Green")
                                                                                                                  .setDescription(`***<:passed:1023811776850186261> Found Some users with the name \`${content}\`***\n> - Select The user you want to blacklist below`)

                                                                                                            let Msg5 = await something.edit({ embeds: [UserEmbed], components: [UserRow] })

                                                                                                            const filter = (interaction) => interaction.user.id === message.author.id;

                                                                                                            const collector = Msg5.createMessageComponentCollector({
                                                                                                                  filter,
                                                                                                                  max: 1,
                                                                                                                  time: 50000,
                                                                                                            });

                                                                                                            collector.on("collect", async UserInteraction1 => {
                                                                                                                  if (UserInteraction1.customId == "User-Selection") {
                                                                                                                        let user = Rover.users.cache.get(UserInteraction1.values[0])

                                                                                                                        menu1.setDisabled(true)

                                                                                                                        UserInteraction1.message.edit({
                                                                                                                              content: `***<:passed:1100278179354136636> Selected \`${array.find(m => m.value == UserInteraction1.values[0]).label}\`***`,
                                                                                                                              components: [UserRow]
                                                                                                                        })

                                                                                                                        let array1 = data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlacklistedUsers
                                                                                                                        array1.push({ User: user.id, BlacklistedAt: Date.now(), BlacklistedBy: message.author.id })
                                                                                                                        await TicketSystemData.findOneAndUpdate({ GuildID: message.guild.id }, data)
                                                                                                                        data = await TicketSystemData.findOne({ GuildID: message.guild.id })

                                                                                                                        UserInteraction1.reply({
                                                                                                                              embeds: [
                                                                                                                                    new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                                          .setColor("Green")
                                                                                                                                          .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                                          .setDescription(`***<:passed:1023811776850186261> Successfully Blacklisted \`${user.tag}\`***\n> Now they can't open a ticket unless you remove there blacklist`)
                                                                                                                              ]
                                                                                                                        })
                                                                                                                  }
                                                                                                            })
                                                                                                      }, 10000);
                                                                                                      return;
                                                                                                }

                                                                                          })

                                                                                    }, 150);
                                                                              } else if (UserInteraction.customId == "Remove-User") {
                                                                                    row.components.forEach(m => m.setDisabled(true))
                                                                                    embed4.setColor("Green")
                                                                                    UserInteraction.message.edit({ content: `***<:passed:1100278179354136636> Successfully Selected \`${UserInteraction.customId}\`***`, embeds: [embed4], components: [row] })

                                                                                    let something = await UserInteraction.reply({
                                                                                          embeds: [
                                                                                                new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                      .setColor("Yellow")
                                                                                                      .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                      .setDescription(`***<a:ShopLoading:1032236793812242473> Fetching All Blacklisted Users.***`)
                                                                                          ]
                                                                                    })

                                                                                    setTimeout(async () => {
                                                                                          const RemoveUser = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                .setColor("Red")
                                                                                                .setDescription(`:question: Who would you like to Remove From the blacklist?`)

                                                                                          let MenuOptions = []

                                                                                          data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlacklistedUsers.forEach((m) => {
                                                                                                MenuOptions.push({
                                                                                                      label: Rover.users.cache.get(m.User).username,
                                                                                                      value: Rover.users.cache.get(m.User).id,
                                                                                                      description: `UnBlacklist ${Rover.users.cache.get(m.User).tag}`
                                                                                                })
                                                                                          })

                                                                                          const row1 = new ActionRowBuilder()
                                                                                                .addComponents(
                                                                                                      new StringSelectMenuBuilder()
                                                                                                            .setCustomId("Select-User")
                                                                                                            .setPlaceholder("Select a user from blacklist")
                                                                                                            .setOptions(MenuOptions)
                                                                                                )

                                                                                          let Msg5 = await something.edit({ embeds: [RemoveUser], components: [row1] })

                                                                                          const filter = (interaction) => interaction.user.id === message.author.id;

                                                                                          const collector = Msg5.createMessageComponentCollector({
                                                                                                filter,
                                                                                                max: 1,
                                                                                                time: 50000,
                                                                                          });


                                                                                          collector.on("collect", async UserInteraction1 => {
                                                                                                if (UserInteraction1.customId == "Select-User") {
                                                                                                      let user = Rover.users.cache.get(UserInteraction1.values[0])

                                                                                                      row1.components.forEach(m => m.setDisabled(true))

                                                                                                      UserInteraction1.message.edit({
                                                                                                            content: `***<:passed:1100278179354136636> Selected \`${MenuOptions.find(m => m.value == UserInteraction1.values[0]).label}\`***`,
                                                                                                            components: [row1]
                                                                                                      })

                                                                                                      let array1 = data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlacklistedUsers
                                                                                                      array1.splice(array1.findIndex(v => v.User === user.id), 1);
                                                                                                      await TicketSystemData.findOneAndUpdate({ GuildID: message.guild.id }, data)
                                                                                                      data = await TicketSystemData.findOne({ GuildID: message.guild.id })

                                                                                                      UserInteraction1.reply({
                                                                                                            embeds: [
                                                                                                                  new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                        .setColor("Green")
                                                                                                                        .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                        .setDescription(`***<:passed:1023811776850186261> Successfully Unblacklisted \`${user.tag}\`***\n> Now they Can open a ticket again!`)
                                                                                                            ]
                                                                                                      })
                                                                                                }
                                                                                          })
                                                                                    }, 2000);

                                                                              } else if (UserInteraction.customId == "View-users") {
                                                                                    row.components.forEach(m => m.setDisabled(true))
                                                                                    UserInteraction.deferUpdate()
                                                                                    embed4.setColor("Green")
                                                                                    UserInteraction.message.edit({ content: `***<:passed:1100278179354136636> Successfully Selected \`${UserInteraction.customId}\`***`, embeds: [embed4], components: [row] })


                                                                                    const ViewUsers = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                          .setColor("Blue")

                                                                                    let i = 0

                                                                                    let EmbedArray = []

                                                                                    let moment = require("moment")

                                                                                    let array = []

                                                                                    data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlacklistedUsers.forEach(m => {

                                                                                          array.push({
                                                                                                name: `User: \`${Rover.users.cache.get(m.User).tag}\``,
                                                                                                value: `\`\`\`yml\nUser: ${Rover.users.cache.get(m.User).username}\nAt: ${moment(m.BlacklistedAt).format('MMMM Do YYYY')}\nBy: ${Rover.users.cache.get(m.BlacklistedBy).tag}\`\`\``,
                                                                                                inline: true
                                                                                          })
                                                                                    })


                                                                                    if (array.length > 25) {

                                                                                          // data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlacklistedUsers.forEach(m => {
                                                                                          //       EmbedArray.push(
                                                                                          //             new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                          //             .setColor("Blue")
                                                                                          //             .setTitle(`User: \`${Rover.users.cache.get(m.User).tag}\``)
                                                                                          //             .setDescription(`\`\`\`yml\nUser: ${Rover.users.cache.get(m.User).username}\nAt: ${moment(m.BlacklistedAt).format('MMMM Do YYYY')}\nBy: ${Rover.users.cache.get(m.BlacklistedBy).tag}\`\`\``)
                                                                                          //      )
                                                                                          // })
                                                                                    } else if (array.length < 25) {
                                                                                          array.forEach(m => {
                                                                                                ViewUsers.addFields(m)
                                                                                          })
                                                                                    }
                                                                                    EmbedArray.push(ViewUsers)

                                                                                    setTimeout(() => {
                                                                                          setTimeout(() => {
                                                                                                UserInteraction.message.reply({ embeds: EmbedArray, })
                                                                                          }, 150);
                                                                                    }, 150);


                                                                              }
                                                                        })
                                                                  }, 150);
                                                            }
                                                      })
                                                }, 500);
                                          }
                                          if (interaction3.values == "Ticket-Roles") {

                                                if (!data.TicketSetups.find(m => m.SetupNumber == SetupNumber).TicketRoles) {
                                                      data.TicketSetups.find(m => m.SetupNumber == SetupNumber).TicketRoles = []

                                                      await TicketSystemData.findOneAndUpdate({ GuildID: message.guild.id }, data)
                                                }

                                                setTimeout(async () => {
                                                      menu.setDisabled(true)
                                                      interaction3.deferUpdate()
                                                      embed1.setColor("Green")
                                                      interaction.message.edit({ content: `***<:passed:1100278179354136636> Successfully Selected \`${interaction3.values[0]}\`***`, embeds: [embed2], components: [row] })

                                                      const embed4 = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                            .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                            .setDescription(`***<:RoverTicketSystem:1100276672760135770> Please Select \`Add Role/Remove Role\` To add to Ticket Roles.***`)

                                                      row.setComponents(
                                                            new ButtonBuilder()
                                                                  .setCustomId("Add-Role")
                                                                  .setEmoji("1102042660350464000")
                                                                  .setLabel("Add Role")
                                                                  .setStyle(ButtonStyle.Success),
                                                            new ButtonBuilder()
                                                                  .setCustomId("Remove-Role")
                                                                  .setEmoji("1102042662321786891")
                                                                  .setLabel("Remove Role")
                                                                  .setStyle(ButtonStyle.Danger),
                                                            new ButtonBuilder()
                                                                  .setCustomId("View-Roles")
                                                                  .setEmoji("1058276706814799993")
                                                                  .setLabel("View Roles")
                                                                  .setStyle(ButtonStyle.Primary),
                                                      )

                                                      let Msg1 = await interaction3.message.edit({ embeds: [embed4], components: [row] })

                                                      const filter = (interaction) => interaction.user.id === message.author.id;

                                                      const collector = Msg1.createMessageComponentCollector({
                                                            filter,
                                                            max: 1,
                                                            time: 50000,
                                                      });

                                                      collector.on("collect", async RoleInteraction => {
                                                            if (RoleInteraction.customId == "Add-Role") {
                                                                  row.components.forEach(m => m.setDisabled(true))
                                                                  RoleInteraction.deferUpdate()
                                                                  embed4.setColor("Green")
                                                                  RoleInteraction.message.edit({ content: `***<:passed:1100278179354136636> Successfully Selected \`${RoleInteraction.customId}\`***`, embeds: [embed4], components: [row] })

                                                                  setTimeout(async () => {
                                                                        const embed3 = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                              .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                              .setDescription(`***<:User:1043254114676641892> Please Provide me a \`Role Id/Mention/Name\`***`)

                                                                        let msg2 = await RoleInteraction.message.edit({ embeds: [embed3], components: [] })

                                                                        RoleInteraction.channel.awaitMessages({ max: 1, time: 60000, filter: m => m.author.id === message.author.id, errors: ['time'] }).then(async collected => {
                                                                              let content = collected.first().content

                                                                              if (content.includes("@")) {
                                                                                    if (message.guild.roles.cache.get(collected.first().mentions.roles.first().id)) {
                                                                                          content = message.guild.members.roles.get(collected.first().mentions.roles.first().id)

                                                                                          if (data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlackListedRoles.find(m => m.RoleId == content.id)) {
                                                                                                embed3.setColor("Red")
                                                                                                msg2.edit({ embeds: [embed3] })
                                                                                                return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                      embeds: [
                                                                                                            new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                  .setColor("Red")
                                                                                                                  .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                  .setDescription(`***<:failed:1023811778087485491> Seems this role is Already a TicketRole!***`)
                                                                                                      ]
                                                                                                })
                                                                                          }

                                                                                          embed3.setColor("Green")
                                                                                          msg2.edit({ embeds: [embed3] })

                                                                                          let array = data.TicketSetups.find(m => m.SetupNumber == SetupNumber).TicketRoles
                                                                                          array.push({ RoleId: content.id, AddedBy: message.author.id, AddedAt: Date.now(), })
                                                                                          await TicketSystemData.findOneAndUpdate({ GuildID: message.guild.id }, data)
                                                                                          data = await TicketSystemData.findOne({ GuildID: message.guild.id })

                                                                                          return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                embeds: [
                                                                                                      new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                            .setColor("Green")
                                                                                                            .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                            .setDescription(`***<:passed:1023811776850186261> Successfully Added: \`${content.name}\`*** To Ticket Roles!`)
                                                                                                ]
                                                                                          })
                                                                                    } else {
                                                                                          embed3.setColor("Red")
                                                                                          msg2.edit({ embeds: [embed3] })
                                                                                          return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                embeds: [
                                                                                                      new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                            .setColor("Red")
                                                                                                            .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                            .setDescription(`***<:failed:1023811778087485491> Seems Role is not in the guild***`)
                                                                                                ]
                                                                                          })
                                                                                    }
                                                                              } else if (!isNaN(collected.first().content)) {
                                                                                    if (message.guild.roles.cache.get(collected.first().content)) {
                                                                                          content = message.guild.roles.cache.get(collected.first().content)

                                                                                          if (data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlackListedRoles.find(m => m.RoleId == content.id)) {
                                                                                                embed3.setColor("Red")
                                                                                                msg2.edit({ embeds: [embed3] })
                                                                                                return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                      embeds: [
                                                                                                            new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                  .setColor("Red")
                                                                                                                  .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                  .setDescription(`***<:failed:1023811778087485491> Seems this role is Already a TicketRole!***`)
                                                                                                      ]
                                                                                                })
                                                                                          }

                                                                                          embed3.setColor("Green")
                                                                                          msg2.edit({ embeds: [embed3] })

                                                                                          let array = data.TicketSetups.find(m => m.SetupNumber == SetupNumber).TicketRoles
                                                                                          array.push({ RoleId: content.id, AddedBy: message.author.id, AddedAt: Date.now(), })
                                                                                          await TicketSystemData.findOneAndUpdate({ GuildID: message.guild.id }, data)
                                                                                          data = await TicketSystemData.findOne({ GuildID: message.guild.id })

                                                                                          return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                embeds: [
                                                                                                      new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                            .setColor("Green")
                                                                                                            .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                            .setDescription(`***<:passed:1023811776850186261> Successfully Added: \`${content.name}\`*** To Ticket Roles!`)
                                                                                                ]
                                                                                          })
                                                                                    } else {
                                                                                          embed3.setColor("Red")
                                                                                          msg2.edit({ embeds: [embed3] })
                                                                                          return message.channel.messages.cache.get(collected.first().id).reply({
                                                                                                embeds: [
                                                                                                      new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                            .setColor("Red")
                                                                                                            .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                            .setDescription(`***<:failed:1023811778087485491> Seems Role is not in the guild***`)
                                                                                                ]
                                                                                          })
                                                                                    }
                                                                              } else {
                                                                                    embed3.setColor("Green")
                                                                                    msg2.edit({ embeds: [embed3] })
                                                                                    let something = await message.channel.messages.cache.get(collected.first().id).reply({
                                                                                          embeds: [
                                                                                                new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                      .setColor("Yellow")
                                                                                                      .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                      .setDescription(`***<a:ShopLoading:1032236793812242473> Finding Roles with names that start with \`${content}\` Could take about 10s.***`)
                                                                                          ]
                                                                                    })

                                                                                    let array = []

                                                                                    message.guild.roles.cache.forEach(m => {

                                                                                          if (m.name.startsWith(content) || m.name == content || m.name.includes(content)) {
                                                                                                array.push({
                                                                                                      label: m.name,
                                                                                                      value: m.id,
                                                                                                      description: `Add ${m.name} To Ticket Roles`
                                                                                                })
                                                                                          }
                                                                                    })

                                                                                    setTimeout(async () => {

                                                                                          if (array.length < 1) {
                                                                                                embed3.setColor("Red")
                                                                                                msg2.edit({ embeds: [embed3] })
                                                                                                return something.edit({
                                                                                                      embeds: [
                                                                                                            new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                  .setColor("Red")
                                                                                                                  .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                  .setDescription(`***<:failed:1023811778087485491> Seems No Roles are found with \`${content}\` name***`)
                                                                                                      ]
                                                                                                })
                                                                                          }

                                                                                          let menu1 = new StringSelectMenuBuilder()
                                                                                                .setCustomId("Role-Selection")
                                                                                                .setPlaceholder("Please Select the Role you want to add")
                                                                                                .setOptions(array)

                                                                                          let UserRow = new ActionRowBuilder()
                                                                                                .addComponents(menu1)

                                                                                          const UserEmbed = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                .setColor("Green")
                                                                                                .setDescription(`***<:passed:1023811776850186261> Found Some Roles with the name \`${content}\`***\n> - Select The Role you want to add to Ticket Roles below`)

                                                                                          let Msg5 = await something.edit({ embeds: [UserEmbed], components: [UserRow] })

                                                                                          const filter = (interaction) => interaction.user.id === message.author.id;

                                                                                          const collector = Msg5.createMessageComponentCollector({
                                                                                                filter,
                                                                                                max: 1,
                                                                                                time: 50000,
                                                                                          });

                                                                                          collector.on("collect", async UserInteraction1 => {
                                                                                                if (UserInteraction1.customId == "Role-Selection") {
                                                                                                      let user = message.guild.roles.cache.get(UserInteraction1.values[0])

                                                                                                      menu1.setDisabled(true)

                                                                                                      UserInteraction1.message.edit({
                                                                                                            content: `***<:passed:1100278179354136636> Selected \`${array.find(m => m.value == UserInteraction1.values[0]).label}\`***`,
                                                                                                            components: [UserRow]
                                                                                                      })

                                                                                                      let array1 = data.TicketSetups.find(m => m.SetupNumber == SetupNumber).TicketRoles
                                                                                                      array1.push({ RoleId: user.id, AddedBy: message.author.id, AddedAt: Date.now(), })
                                                                                                      await TicketSystemData.findOneAndUpdate({ GuildID: message.guild.id }, data)
                                                                                                      data = await TicketSystemData.findOne({ GuildID: message.guild.id })

                                                                                                      UserInteraction1.reply({
                                                                                                            embeds: [
                                                                                                                  new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                                        .setColor("Green")
                                                                                                                        .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                                        .setDescription(`***<:passed:1023811776850186261> Successfully Added: \`${content.name}\`*** To Ticket Roles!`)
                                                                                                            ]
                                                                                                      })
                                                                                                }
                                                                                          })
                                                                                    }, 10000);
                                                                                    return;
                                                                              }

                                                                        })

                                                                  }, 200);
                                                            } else if (RoleInteraction.customId == "Remove-Role") {
                                                                  row.components.forEach(m => m.setDisabled(true))
                                                                  embed4.setColor("Green")
                                                                  RoleInteraction.message.edit({ content: `***<:passed:1100278179354136636> Successfully Selected \`${RoleInteraction.customId}\`***`, embeds: [embed4], components: [row] })

                                                                  let something = await RoleInteraction.reply({
                                                                        embeds: [
                                                                              new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                    .setColor("Yellow")
                                                                                    .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                    .setDescription(`***<a:ShopLoading:1032236793812242473> Fetching All Ticket Roles.***`)
                                                                        ]
                                                                  })

                                                                  setTimeout(async () => {
                                                                        const RemoveUser = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                              .setColor("Red")
                                                                              .setDescription(`:question: What role would you like to remove from Ticket Roles?`)

                                                                        let MenuOptions = []

                                                                        data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlackListedRoles.forEach((m) => {
                                                                              MenuOptions.push({
                                                                                    label: message.guild.roles.cache.get(m.RoleId).name,
                                                                                    value: message.guild.roles.cache.get(m.RoleId).id,
                                                                                    description: `Remove ${message.guild.roles.cache.get(m.RoleId).name} From Ticket Roles`
                                                                              })
                                                                        })

                                                                        const row1 = new ActionRowBuilder()
                                                                              .addComponents(
                                                                                    new StringSelectMenuBuilder()
                                                                                          .setCustomId("Select-Role")
                                                                                          .setPlaceholder("Select a Role from Ticket Roles")
                                                                                          .setOptions(MenuOptions)
                                                                              )

                                                                        let Msg5 = await something.edit({ embeds: [RemoveUser], components: [row1] })

                                                                        const filter = (interaction) => interaction.user.id === message.author.id;

                                                                        const collector = Msg5.createMessageComponentCollector({
                                                                              filter,
                                                                              max: 1,
                                                                              time: 50000,
                                                                        });


                                                                        collector.on("collect", async UserInteraction1 => {
                                                                              if (UserInteraction1.customId == "Select-Role") {
                                                                                    let user = message.guild.roles.cache.get(UserInteraction1.values[0])

                                                                                    row1.components.forEach(m => m.setDisabled(true))

                                                                                    UserInteraction1.message.edit({
                                                                                          content: `***<:passed:1100278179354136636> Selected \`${MenuOptions.find(m => m.value == UserInteraction1.values[0]).label}\`***`,
                                                                                          components: [row1]
                                                                                    })
                                                                                    let array1 = data.TicketSetups.find(m => m.SetupNumber == SetupNumber).TicketRoles
                                                                                    array1.splice(array1.findIndex(v => v.RoleId === user.id), 1);
                                                                                    await TicketSystemData.findOneAndUpdate({ GuildID: message.guild.id }, data)
                                                                                    data = await TicketSystemData.findOne({ GuildID: message.guild.id })

                                                                                    UserInteraction1.reply({
                                                                                          embeds: [
                                                                                                new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                                                      .setColor("Green")
                                                                                                      .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                                                                      .setDescription(`***<:passed:1023811776850186261> Successfully Removed \`${user.name}\`*** From Ticket Roles`)
                                                                                          ]
                                                                                    })
                                                                              }
                                                                        })
                                                                  }, 2000);

                                                            } else if (RoleInteraction.customId == "View-Roles") {
                                                                  row.components.forEach(m => m.setDisabled(true))
                                                                  RoleInteraction.deferUpdate()
                                                                  embed4.setColor("Green")
                                                                  RoleInteraction.message.edit({ content: `***<:passed:1100278179354136636> Successfully Selected \`${RoleInteraction.customId}\`***`, embeds: [embed4], components: [row] })


                                                                  const ViewUsers = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                        .setColor("Blue")

                                                                  let i = 0

                                                                  let EmbedArray = []

                                                                  let moment = require("moment")

                                                                  let array = []

                                                                  data.TicketSetups.find(m => m.SetupNumber == SetupNumber).TicketRoles.forEach(m => {

                                                                        array.push({
                                                                              name: `Role: \`${message.guild.roles.cache.get(m.RoleId).name}\``,
                                                                              value: `\`\`\`yml\nRole: ${message.guild.roles.cache.get(m.RoleId).name}\nAddedAt: ${moment(m.AddedAt).format('MMMM Do YYYY')}\nAddedBy: ${Rover.users.cache.get(m.AddedBy).tag}\`\`\``,
                                                                              inline: true
                                                                        })
                                                                  })


                                                                  if (array.length > 25) {

                                                                        // data.TicketSetups.find(m => m.SetupNumber == SetupNumber).BlackListSystem.BlacklistedUsers.forEach(m => {
                                                                        //       EmbedArray.push(
                                                                        //             new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                                        //             .setColor("Blue")
                                                                        //             .setTitle(`User: \`${Rover.users.cache.get(m.User).tag}\``)
                                                                        //             .setDescription(`\`\`\`yml\nUser: ${Rover.users.cache.get(m.User).username}\nAt: ${moment(m.BlacklistedAt).format('MMMM Do YYYY')}\nBy: ${Rover.users.cache.get(m.BlacklistedBy).tag}\`\`\``)
                                                                        //      )
                                                                        // })
                                                                  } else if (array.length < 25) {
                                                                        array.forEach(m => {
                                                                              ViewUsers.addFields(m)
                                                                        })
                                                                  }
                                                                  EmbedArray.push(ViewUsers)

                                                                  setTimeout(() => {
                                                                        setTimeout(() => {
                                                                              RoleInteraction.message.reply({ embeds: EmbedArray, })
                                                                        }, 150);
                                                                  }, 150);


                                                            }


                                                      })

                                                }, 100)
                                          }
                                          if (interaction3.values == "Permissions") {

                                                if (data.TicketSetups.find(m => m.SetupNumber == SetupNumber).TicketRoles.length < 1 || !data.TicketSetups.find(m => m.SetupNumber == SetupNumber).TicketRoles) {
                                                      const NoTicketRoles = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                            .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                            .setDescription(`<:failed:1023811778087485491> ***Seems there is no Ticket Roles.***`)

                                                      return interaction3.message.edit({ embeds: [NoTicketRoles] })
                                                }

                                                if (data.TicketSetups.find(m => m.SetupNumber == SetupNumber).TicketRoles.length > 1) {
                                                      data.TicketSetups.find(m => m.SetupNumber == SetupNumber).TicketRoles.forEach(m => {
                                                            m.ChannelPermissions = [],
                                                                  m.CategoryPermissions = []
                                                      })
                                                }

                                                setTimeout(async () => {
                                                      menu.setDisabled(true)
                                                      interaction3.deferUpdate()
                                                      embed1.setColor("Green")
                                                      interaction.message.edit({ content: `***<:passed:1100278179354136636> Successfully Selected \`${interaction3.values[0]}\`***`, embeds: [embed2], components: [row] })

                                                      const embed1 = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
                                                            .setAuthor({ name: `Rover Ticket System`, iconURL: Rover.user.displayAvatarURL() })
                                                            .setDescription(`:question: What Role would you like to edit there permissions on?`)

                                                      let row1 = new ActionRowBuilder()
                                                            .setComponents(
                                                                  new StringSelectMenuBuilder()
                                                                        .setCustomId("Role-Selection")
                                                                        .setPlaceholder("Please Select a Ticket Role Here.")
                                                                        .setOptions(data.TicketSetups.find(m => m.SetupNumber == SetupNumber).TicketRoles.map(m => {
                                                                              return {
                                                                                    label: message.guild.roles.cache.get(m.RoleId).name,
                                                                                    value: message.guild.roles.cache.get(m.RoleId).id,
                                                                                    description: `Edit ${message.guild.roles.cache.get(m.RoleId).name} Permissions`
                                                                              }
                                                                        }))
                                                            )

                                                      let msg = await interaction.message.edit({ embeds: [embed1], components: [row1] })

                                                      const filter = (interaction) => interaction.user.id === message.author.id

                                                      const SelectTicketRole = msg.createMessageComponentCollector({
                                                            filter,
                                                            max: 1,
                                                            time: 50000
                                                      })

                                                      SelectTicketRole.on("collect", async (TicketRole) => {
                                                            if (TicketRole.customId == "Role-Selection") {
                                                                  row1.components.forEach(m => m.setDisabled(true))
                                                                  TicketRole.deferUpdate()
                                                                  embed1.setColor("Green")
                                                                  TicketRole.message.edit({ content: `***${Emojis.BotPassed1} Successfully Selected \`${row1.components[0].options.find(m => m.value == TicketRole.values[0]).label}\`***`, embeds: [embed1], components: [row1] })

                                                                  setTimeout(() => {
                                                                        let Role = TicketRole.values[0]

                                                                        let ChannelPermissions = [
                                                                              "ViewChannel",
                                                                              "ManageChannels",
                                                                              "ManageRoles",
                                                                              "ManageWebhooks",
                                                                              "CreateInstantInvite",
                                                                              "SendMessages",
                                                                              "SendMessagesInThreads",
                                                                              "CreatePublicThreads",
                                                                              "CreatePrivateThreads",
                                                                              "EmbedLinks",
                                                                              "AttachFiles",
                                                                              "AddReactions",
                                                                              "UseExternalEmojis",
                                                                              "UseExternalStickers",
                                                                              "MentionEveryone",
                                                                              "ManageMessages",
                                                                              "ManageThreads",
                                                                              "ReadMessageHistory",
                                                                              "SendTTSMessages",
                                                                              "UseApplicationCommands"
                                                                        ]

                                                                        let row = new ActionRowBuilder().addComponents(
                                                                              new StringSelectMenuBuilder()
                                                                                    .setCustomId("Select-Permissions")
                                                                                    .setPlaceholder("Please Select the Permissions you would like to do")
                                                                                    .setMaxValues(ChannelPermissions.length)
                                                                                    .setOptions(ChannelPermissions.map(m => {
                                                                                            return {
                                                                                                   label: m,
                                                                                                   value: m,
                                                                                                   description: `Enable ${m} as a Permission!`
                                                                                            }
                                                                                    }))
                                                                        )
                                                                        
                                                                        TicketRole.message.edit({ components: [row] })
                                                                  }, 150);
                                                            }
                                                      })

                                                }, 200)
                                          }
                                    })

                              }, 150);

                        }
                  }
            })
      }
}