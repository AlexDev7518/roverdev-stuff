const { Application, ApplicationCommandOptionType, SelectMenuBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits } = require("discord.js")
const ms = require("ms")
const { link, Password } = require("../../Main-Bot/BotShop-System/Shop-Config/SConfig")
const { invites } = require("../../Main-Bot/Database/Data")
const { client } = require("../../Rover-Manager")


 module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {


    if (args[0] == "botinfo") {
      const bot = message.mentions.members.findKey(bot => bot.user.bot);
      const botdb =  await client.Bots.get(bot)
  if(!botdb){
  return message.channel.send(`:x: Can't Find The Bot In The DataBase. Please ReCheck The Bot`)
  }
  
  let clientapp = message.mentions.members.application ? await message.mentions.members.application.fetch().catch(e=>false) : false;
  let guild = client.guilds.cache.get(`929387595547426906`)
  message.channel.send({
  content: `> **Bot Path:**
  \`\`\`yml
  ${botdb.BotPath}
  \`\`\`
  > **Host Server:**
  \`\`\`yml
  ${String(Object.values(require(`os`).networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i?.family===`IPv4` && !i?.internal && i?.address || []), [])), [])).split(".")[3]}
  \`\`\`
  > **Application Information**
  \`\`\`yml
  Application: https://discord.com/developers/applications/${bot}/information
  Bot Name: ${client.users.cache.get(bot).username}
  Icon: ${client.users.cache.get(bot).displayAvatarURL()}
  OrginalOwner: ${client.users.cache.get(botdb.BotOwner).username}(${botdb.BotOwner})
  Bot Public: ${clientapp.botPublic ? "✅": "❌"} 
  \`\`\`
  ` })
    }
 }
 module.exports.slashRun = async (interaction, client) => {

  const logs = client.channels.cache.get("1023833701404127242")

  if (interaction.options.getSubcommand() === 'paybot') {

    if (interaction.options.getString("bot") == "invaild") {
           return interaction.editReply({ content: `You have no discord bots to control.` })
    }

    const bot = client.users.cache.get(interaction.options.getString("bot"))
    
    const Payment = client.BotPayment.get(bot.id,"EndHosting") ? client.BotPayment.get(bot.id,"EndHosting") : false

    if (Payment == false) {
              return interaction.reply({ embeds: [ 
                          new EmbedBuilder()
                          .setColor("Red")
                          .setAuthor({ name: `Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                          .setTitle("***Your Bot is a Free / Lifetime hosted bot.***")
              ] })
    }

    let paymentType = ``;
    let Hosting = ``

       const embed = new EmbedBuilder()
       .setAuthor({ name: `Payment Selector | Roverdev`, iconURL: client.user.displayAvatarURL() })
       .setTitle("***Please Tell me the Payment Method***")
       .setDescription(`\n> <a:chating:1009156029361176686> Message Payment\n> <a:boosted:1024133816287244398> Boost Payment\n> <a:Money:1014937062992007168> Money Payment\n> <:invites:1024130888205869096> Invite Payment`)
       .setColor("Yellow")

       const row = new ActionRowBuilder()
       .addComponents(
             new ButtonBuilder()
             .setCustomId("Messages-Payment")
             .setStyle(ButtonStyle.Primary)
             .setEmoji("1009156029361176686"),
             new ButtonBuilder()
             .setCustomId("Boost-Payment")
             .setStyle(ButtonStyle.Danger)
             .setEmoji("1024133816287244398"),
             new ButtonBuilder()
             .setCustomId("Money-Payment")
             .setStyle(ButtonStyle.Success)
             .setEmoji("1014937062992007168"),
             new ButtonBuilder()
             .setCustomId("Invites-Payment")
             .setStyle(ButtonStyle.Primary)
             .setEmoji("1024130888205869096")
       )

      await  interaction.reply({embeds: [embed], components: [row] , ephemeral: true})

       const collector = interaction.channel.createMessageComponentCollector({
        time: 50000,
      });
      collector.on("collect", async (collector) => {
        collector.deferUpdate().catch(e => {})
                  if (collector.customId == "Messages-Payment") {

                          paymentType += collector.customId
                          const row = new ActionRowBuilder()
                          .addComponents(
                                     new SelectMenuBuilder()
                                     .setCustomId("Hosting-Duration")
                                     .setPlaceholder("Please Select the Hosting Duration")
                                     .addOptions(
                                      {
                                        label: "1 Week",
                                        value: `1-Week-Hosting`,
                                        description: "1 Week of Bot Hosting"
                                      },
                                      { 
                                        label: "1 Month",
                                        value: `1-Month-Hosting`,
                                        description: "1 Month of Bot Hosting"
                                      },
                                      {
                                        label: "1 Year",
                                        value: `1-Year-Hosting`,
                                        description: "1 Year of Bot Hosting"
                                      },
                                     )
                          )

                          await interaction.editReply({ components: [row], embeds: [
                                 new EmbedBuilder()
                                 .setAuthor({ name: `Hosting Selector | Roverdev`, iconURL: client.user.displayAvatarURL() })
                                 .setTitle("***Please Tell me the Hosting Duration***")
                                 .setColor("Yellow")
                          ] })

                          const collector1 = interaction.channel.createMessageComponentCollector({
                            time: 50000,
                          });
                          collector1.on("collect", async (collector) => {
                                   if (collector.values == "1-Week-Hosting") {

                                    const messages = client.Ranking.get(interaction.guild.id, `${interaction.user.id}.TotalMessages`)
                          
                                    const HostingAmount = client.Createbot.get(interaction.guild.id, `HostingDuration.1-Week-Hosting.messages`)

                                    if (messages == undefined) {
                                      const embed = new EmbedBuilder()
                                      .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                      .setTitle(`You Don't have the Required Messages To get this Bot!`)
                                      .setDescription(`You have No Messages Payment at all!`)
                                      .setColor("Red")

                                      return interaction.editReply({embeds: [embed], components: []})
                                    }

                                    if (messages < HostingAmount) {
                                      const embed = new EmbedBuilder()
                                      .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                                      .setTitle(`You Need ${HostingAmount-messages} More Messages To Pay For the Bot`)
                                      .setColor("Red")

                                      return interaction.editReply({embeds: [embed], components: []})
                                    }

                                    const embed = new EmbedBuilder()
                                    .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                                    .setTitle(`Are you Sure you want to spend ${HostingAmount}/${messages}?`)
                                    .setColor("Red")

                                    const row = new ActionRowBuilder()
                                    .addComponents(
                                           new ButtonBuilder()
                                           .setLabel("Confirm")
                                           .setCustomId("Confirm")
                                           .setStyle(ButtonStyle.Success),
                                           new ButtonBuilder()
                                           .setLabel("Cancel")
                                           .setCustomId("Cancel")
                                           .setStyle(ButtonStyle.Danger)
                                    )

                                    await interaction.editReply({embeds: [embed], components: [row]})

                                    const collector2 = interaction.channel.createMessageComponentCollector({
                                      time: 6000,
                                      max: 1, 
                                    });
                                    collector2.on("collect", async (collector) => {
                                             if (collector.customId == "Confirm") {
                                              client.Ranking.set(interaction.guild.id, messages-HostingAmount, `${interaction.user.id}.TotalMessages`)

                                              const ms = require("ms")
    
                                              let day = ms('7d')

                                        
                                              /**
                                               * @COLLECT_DATA_AND_SEND
                                               */

                                              const Payment1 =  client.BotPayment.get(bot.id, "Payment1")
                                              const Payment2 =  client.BotPayment.get(bot.id, "Payment2")

                                              if (!Payment1) {
                                                    client.BotPayment.set(bot.id, day ,"Payment1")
                                              } else if (Payment1 && !Payment2) {
                                                client.BotPayment.set(bot.id, day ,"Payment2")
                                               } else if (Payment1 && Payment2) {
                                                        return interaction.editReply({
                                                          embeds: [
                                                            new EmbedBuilder()
                                                            .setAuthor({ name: `Max Payments | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                            .setDescription(`You are at the Max Payment Limits`)
                                                            .setColor("Red")
                                                          ],
                                                           components: []
                                                        })
                                               }

                                              const logs = client.channels.cache.get("1023833701404127242")

                                              logs.send({
                                                    embeds: [
                                                         new EmbedBuilder()
                                                         .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                         .setDescription(`${interaction.user} Payed: ${HostingAmount} Messages To Keep There Bot Online!`)
                                                         .addFields([
                                                          { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                                     ])
                                                         .setColor("Green")
                                                    ],
                                                    content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                              })

                                              interaction.user.send({
                                                embeds: [
                                                     new EmbedBuilder()
                                                     .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                     .setDescription(`${interaction.user} Payed: ${HostingAmount} To Keep There Bot Online!`)
                                                     .addFields([
                                                          { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                                     ])
                                                     .setColor("Green")
                                                ],
                                                content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                          })

                                          interaction.editReply({
                                                embeds: [
                                                  new EmbedBuilder()
                                                  .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                  .setDescription(`Extra Hosting Added! <#1023833701404127242>`)
                                                  .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                                  .setColor("Green")
                                                ],
                                                components: []
                                          })
                                             }
                                             if (collector.customId == "Cancel") {
                                                  interaction.editReply({ 
                                                        content: `Canceled`,
                                                        embeds: [],
                                                        components: []
                                                  })
                                            }
                                    })
                                   }
                                   if (collector.values == "1-Month-Hosting") {
                                    const messages = client.Ranking.get(interaction.guild.id, `${interaction.user.id}.TotalMessages`)
                          
                                    const HostingAmount = client.Createbot.get(interaction.guild.id, `HostingDuration.1-Month-Hosting.messages`)

                                    if (messages == undefined) {
                                      const embed = new EmbedBuilder()
                                      .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                      .setTitle(`You Don't have the Required Messages To get this Bot!`)
                                      .setDescription(`You have No Messages Payment at all!`)
                                      .setColor("Red")

                                      return interaction.editReply({embeds: [embed], components: []})
                                    }

                                    if (messages < HostingAmount) {
                                      const embed = new EmbedBuilder()
                                      .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                                      .setTitle(`You Need ${HostingAmount-messages} More Messages To Pay For the Bot`)
                                      .setColor("Red")

                                      return interaction.editReply({embeds: [embed], components: []})
                                    }

                                    const embed = new EmbedBuilder()
                                    .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                                    .setTitle(`Are you Sure you want to spend ${HostingAmount}/${messages}?`)
                                    .setColor("Red")

                                    const row = new ActionRowBuilder()
                                    .addComponents(
                                           new ButtonBuilder()
                                           .setLabel("Confirm")
                                           .setCustomId("Confirm")
                                           .setStyle(ButtonStyle.Success),
                                           new ButtonBuilder()
                                           .setLabel("Cancel")
                                           .setCustomId("Cancel")
                                           .setStyle(ButtonStyle.Danger)
                                    )

                                    await interaction.editReply({embeds: [embed], components: [row]})

                                    const collector2 = interaction.channel.createMessageComponentCollector({
                                      time: 6000,
                                      max: 1, 
                                    });
                                    collector2.on("collect", async (collector) => {
                                             if (collector.customId == "Confirm") {
                                              client.Ranking.set(interaction.guild.id, messages-HostingAmount, `${interaction.user.id}.TotalMessages`)


                                              const ms = require("ms")
    
                                              let day = ms('30d')
                                        
                                              /**
                                               * @COLLECT_DATA_AND_SEND
                                               */

                                              const Payment1 =  client.BotPayment.get(bot.id, "Payment1")
                                              const Payment2 =  client.BotPayment.get(bot.id, "Payment2")

                                              if (!Payment1) {
                                                    client.BotPayment.set(bot.id, day ,"Payment1")
                                              } else if (Payment1 && !Payment2) {
                                                client.BotPayment.set(bot.id, day ,"Payment2")
                                               } else if (Payment1 && Payment2) {
                                                        return interaction.editReply({
                                                          embeds: [
                                                            new EmbedBuilder()
                                                            .setAuthor({ name: `Max Payments | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                            .setDescription(`You are at the Max Payment Limits`)
                                                            .setColor("Red")
                                                          ],
                                                           components: []
                                                        })
                                               }

                                              const logs = client.channels.cache.get("1023833701404127242")

                                              logs.send({
                                                    embeds: [
                                                         new EmbedBuilder()
                                                         .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                         .setDescription(`${interaction.user} Payed: ${HostingAmount} Messages To Keep There Bot Online!`)
                                                         .addFields([
                                                          { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                                     ])
                                                         .setColor("Green")
                                                    ],
                                                    content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                              })

                                              interaction.user.send({
                                                embeds: [
                                                     new EmbedBuilder()
                                                     .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                     .setDescription(`${interaction.user} Payed: ${HostingAmount} To Keep There Bot Online!`)
                                                     .addFields([
                                                          { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                                     ])
                                                     .setColor("Green")
                                                ],
                                                content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                          })

                                          interaction.editReply({
                                                embeds: [
                                                  new EmbedBuilder()
                                                  .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                  .setDescription(`Extra Hosting Added! <#1023833701404127242>`)
                                                  .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                                  .setColor("Green")
                                                ],
                                                components: []
                                          })
                                             }
                                             if (collector.customId == "Cancel") {
                                                  interaction.editReply({ 
                                                        content: `Canceled`,
                                                        embeds: [],
                                                        components: []
                                                  })
                                            }
                                    })
                                  }
                                  if (collector.values == "1-Year-Hosting") {
                                    const messages = client.Ranking.get(interaction.guild.id, `${interaction.user.id}.TotalMessages`)
                          
                                    const HostingAmount = client.Createbot.get(interaction.guild.id, `HostingDuration.1-Year-Hosting.messages`)

                                    if (messages == undefined) {
                                      const embed = new EmbedBuilder()
                                      .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                      .setTitle(`You Don't have the Required Messages To get this Bot!`)
                                      .setDescription(`You have No Messages Payment at all!`)
                                      .setColor("Red")

                                      return interaction.editReply({embeds: [embed], components: []})
                                    }

                                    if (messages < HostingAmount) {
                                      const embed = new EmbedBuilder()
                                      .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                                      .setTitle(`You Need ${HostingAmount-messages} More Messages To Pay For the Bot`)
                                      .setColor("Red")

                                      return interaction.editReply({embeds: [embed], components: []})
                                    }

                                    const embed = new EmbedBuilder()
                                    .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                                    .setTitle(`Are you Sure you want to spend ${HostingAmount}/${messages}?`)
                                    .setColor("Red")

                                    const row = new ActionRowBuilder()
                                    .addComponents(
                                           new ButtonBuilder()
                                           .setLabel("Confirm")
                                           .setCustomId("Confirm")
                                           .setStyle(ButtonStyle.Success),
                                           new ButtonBuilder()
                                           .setLabel("Cancel")
                                           .setCustomId("Cancel")
                                           .setStyle(ButtonStyle.Danger)
                                    )

                                    await interaction.editReply({embeds: [embed], components: [row]})

                                    const collector2 = interaction.channel.createMessageComponentCollector({
                                      time: 6000,
                                      max: 1, 
                                    });
                                    collector2.on("collect", async (collector) => {
                                             if (collector.customId == "Confirm") {
                                              client.Ranking.set(interaction.guild.id, messages-HostingAmount, `${interaction.user.id}.TotalMessages`)


                                              const ms = require("ms")
    
                                              let day = ms('1y')
                                        
                                              /**
                                               * @COLLECT_DATA_AND_SEND
                                               */

                                              const Payment1 =  client.BotPayment.get(bot.id, "Payment1")
                                              const Payment2 =  client.BotPayment.get(bot.id, "Payment2")

                                              if (!Payment1) {
                                                    client.BotPayment.set(bot.id, day ,"Payment1")
                                              } else if (Payment1 && !Payment2) {
                                                client.BotPayment.set(bot.id, day ,"Payment2")
                                               } else if (Payment1 && Payment2) {
                                                        return interaction.editReply({
                                                          embeds: [
                                                            new EmbedBuilder()
                                                            .setAuthor({ name: `Max Payments | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                            .setDescription(`You are at the Max Payment Limits`)
                                                            .setColor("Red")
                                                          ],
                                                           components: []
                                                        })
                                               }

                                              const logs = client.channels.cache.get("1023833701404127242")

                                              logs.send({
                                                    embeds: [
                                                         new EmbedBuilder()
                                                         .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                         .setDescription(`${interaction.user} Payed: ${HostingAmount} Messages To Keep There Bot Online!`)
                                                         .addFields([
                                                          { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                                     ])
                                                         .setColor("Green")
                                                    ],
                                                    content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                              })

                                              interaction.user.send({
                                                embeds: [
                                                     new EmbedBuilder()
                                                     .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                     .setDescription(`${interaction.user} Payed: ${HostingAmount} To Keep There Bot Online!`)
                                                     .addFields([
                                                          { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                                     ])
                                                     .setColor("Green")
                                                ],
                                                content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                          })

                                          interaction.editReply({
                                                embeds: [
                                                  new EmbedBuilder()
                                                  .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                  .setDescription(`Extra Hosting Added! <#1023833701404127242>`)
                                                  .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                                  .setColor("Green")
                                                ],
                                                components: []
                                          })
                                             }
                                             if (collector.customId == "Cancel") {
                                                  interaction.editReply({ 
                                                        content: `Canceled`,
                                                        embeds: [],
                                                        components: []
                                                  })
                                            }
                                    })
                                  }
                          })
                  }
                  if (collector.customId == "Invites-Payment") {
                    collector.deferUpdate().catch(e => {})
                    paymentType += collector.customId
                    const row = new ActionRowBuilder()
                    .addComponents(
                               new SelectMenuBuilder()
                               .setCustomId("Hosting-Duration")
                               .setPlaceholder("Please Select the Hosting Duration")
                               .addOptions(
                                {
                                  label: "1 Week",
                                  value: `1-Week-Hosting`,
                                  description: "1 Week of Bot Hosting"
                                },
                                { 
                                  label: "1 Month",
                                  value: `1-Month-Hosting`,
                                  description: "1 Month of Bot Hosting"
                                },
                                {
                                  label: "1 Year",
                                  value: `1-Year-Hosting`,
                                  description: "1 Year of Bot Hosting"
                                },
                               )
                    )

                    await interaction.editReply({ components: [row], embeds: [
                           new EmbedBuilder()
                           .setAuthor({ name: `Hosting Selector | Roverdev`, iconURL: client.user.displayAvatarURL() })
                           .setTitle("***Please Tell me the Hosting Duration***")
                           .setColor("Yellow")
                    ] })

                    const collector1 = interaction.channel.createMessageComponentCollector({
                      time: 50000,
                    });
                    collector1.on("collect", async (collector) => {
                             if (collector.values == "1-Week-Hosting") {

                              const Invites = invites.get(interaction.guild.id, `${interaction.user.id}.TotalInvites`)
                    
                              const HostingAmount = client.Createbot.get(interaction.guild.id, `HostingDuration.1-Week-Hosting.Invites`)

                              if (Invites == undefined) {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                .setTitle(`You Don't have the Required Invites To get this Bot!`)
                                .setDescription(`You have No Invites Payment at all!`)
                                .setColor("Red")

                                return interaction.editReply({embeds: [embed], components: []})
                              }

                              if (Invites < HostingAmount) {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                                .setTitle(`You Need ${HostingAmount-Invites} More Invites To Pay For the Bot`)
                                .setColor("Red")

                                return interaction.editReply({embeds: [embed], components: []})
                              }

                              const embed = new EmbedBuilder()
                              .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                              .setTitle(`Are you Sure you want to spend ${HostingAmount}/${Invites}?`)
                              .setColor("Red")

                              const row = new ActionRowBuilder()
                              .addComponents(
                                     new ButtonBuilder()
                                     .setLabel("Confirm")
                                     .setCustomId("Confirm")
                                     .setStyle(ButtonStyle.Success),
                                     new ButtonBuilder()
                                     .setLabel("Cancel")
                                     .setCustomId("Cancel")
                                     .setStyle(ButtonStyle.Danger)
                              )

                              await interaction.editReply({embeds: [embed], components: [row]})

                              const collector2 = interaction.channel.createMessageComponentCollector({
                                time: 6000,
                                max: 1, 
                              });
                              collector2.on("collect", async (collector) => {
                                       if (collector.customId == "Confirm") {
                                        invites.set(interaction.guild.id, Invites-HostingAmount ,`${interaction.user.id}.TotalInvites`)


                                        const ms = require("ms")

                                        let day = ms('7d')
                                  
                                        /**
                                         * @COLLECT_DATA_AND_SEND
                                         */

                                        const Payment1 =  client.BotPayment.get(bot.id, "Payment1")
                                        const Payment2 =  client.BotPayment.get(bot.id, "Payment2")

                                        if (!Payment1) {
                                              client.BotPayment.set(bot.id, day ,"Payment1")
                                        } else if (Payment1 && !Payment2) {
                                          client.BotPayment.set(bot.id, day ,"Payment2")
                                         } else if (Payment1 && Payment2) {
                                                  return interaction.editReply({
                                                    embeds: [
                                                      new EmbedBuilder()
                                                      .setAuthor({ name: `Max Payments | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                      .setDescription(`You are at the Max Payment Limits`)
                                                      .setColor("Red")
                                                    ],
                                                     components: []
                                                  })
                                         }

                                        const logs = client.channels.cache.get("1023833701404127242")

                                        logs.send({
                                              embeds: [
                                                   new EmbedBuilder()
                                                   .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                   .setDescription(`${interaction.user} Payed: ${HostingAmount} Invites To Keep There Bot Online!`)
                                                   .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                                   .setColor("Green")
                                              ],
                                              content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                        })

                                        interaction.user.send({
                                          embeds: [
                                               new EmbedBuilder()
                                               .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                               .setDescription(`${interaction.user} Payed: ${HostingAmount} To Keep There Bot Online!`)
                                               .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                               .setColor("Green")
                                          ],
                                          content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                    })

                                    interaction.editReply({
                                          embeds: [
                                            new EmbedBuilder()
                                            .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                            .setDescription(`Extra Hosting Added! <#1023833701404127242>`)
                                            .addFields([
                                              { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                         ])
                                            .setColor("Green")
                                          ],
                                          components: []
                                    })
                                       }
                                       if (collector.customId == "Cancel") {
                                            interaction.editReply({ 
                                                  content: `Canceled`,
                                                  embeds: [],
                                                  components: []
                                            })
                                      }
                              })
                             }
                             if (collector.values == "1-Month-Hosting") {
                              const Invites = invites.get(interaction.guild.id, `${interaction.user.id}.TotalInvites`)
                    
                              const HostingAmount = client.Createbot.get(interaction.guild.id, `HostingDuration.1-Month-Hosting.Invites`)

                              if (Invites == undefined) {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                .setTitle(`You Don't have the Required Invites To get this Bot!`)
                                .setDescription(`You have No Invites Payment at all!`)
                                .setColor("Red")

                                return interaction.editReply({embeds: [embed], components: []})
                              }

                              if (Invites < HostingAmount) {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                                .setTitle(`You Need ${HostingAmount-Invites} More Invites To Pay For the Bot`)
                                .setColor("Red")

                                return interaction.editReply({embeds: [embed], components: []})
                              }

                              const embed = new EmbedBuilder()
                              .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                              .setTitle(`Are you Sure you want to spend ${HostingAmount}/${Invites}?`)
                              .setColor("Red")

                              const row = new ActionRowBuilder()
                              .addComponents(
                                     new ButtonBuilder()
                                     .setLabel("Confirm")
                                     .setCustomId("Confirm")
                                     .setStyle(ButtonStyle.Success),
                                     new ButtonBuilder()
                                     .setLabel("Cancel")
                                     .setCustomId("Cancel")
                                     .setStyle(ButtonStyle.Danger)
                              )

                              await interaction.editReply({embeds: [embed], components: [row]})

                              const collector2 = interaction.channel.createMessageComponentCollector({
                                time: 6000,
                                max: 1, 
                              });
                              collector2.on("collect", async (collector) => {
                                       if (collector.customId == "Confirm") {
                                        invites.set(interaction.guild.id, Invites-HostingAmount ,`${interaction.user.id}.TotalInvites`)


                                        const ms = require("ms")

                                        let day = ms('30d')
                                  
                                        /**
                                         * @COLLECT_DATA_AND_SEND
                                         */

                                        const Payment1 =  client.BotPayment.get(bot.id, "Payment1")
                                        const Payment2 =  client.BotPayment.get(bot.id, "Payment2")

                                        if (!Payment1) {
                                              client.BotPayment.set(bot.id, day ,"Payment1")
                                        } else if (Payment1 && !Payment2) {
                                          client.BotPayment.set(bot.id, day ,"Payment2")
                                         } else if (Payment1 && Payment2) {
                                                  return interaction.editReply({
                                                    embeds: [
                                                      new EmbedBuilder()
                                                      .setAuthor({ name: `Max Payments | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                      .setDescription(`You are at the Max Payment Limits`)
                                                      .setColor("Red")
                                                    ],
                                                     components: []
                                                  })
                                         }

                                        const logs = client.channels.cache.get("1023833701404127242")

                                        logs.send({
                                              embeds: [
                                                   new EmbedBuilder()
                                                   .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                   .setDescription(`${interaction.user} Payed: ${HostingAmount} Invites To Keep There Bot Online!`)
                                                   .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                                   .setColor("Green")
                                              ],
                                              content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                        })

                                        interaction.user.send({
                                          embeds: [
                                               new EmbedBuilder()
                                               .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                               .setDescription(`${interaction.user} Payed: ${HostingAmount} To Keep There Bot Online!`)
                                               .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                               .setColor("Green")
                                          ],
                                          content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                    })

                                    interaction.editReply({
                                          embeds: [
                                            new EmbedBuilder()
                                            .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                            .setDescription(`Extra Hosting Added! <#1023833701404127242>`)
                                            .addFields([
                                              { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                         ])
                                            .setColor("Green")
                                          ],
                                          components: []
                                    })
                                       }
                                       if (collector.customId == "Cancel") {
                                            interaction.editReply({ 
                                                  content: `Canceled`,
                                                  embeds: [],
                                                  components: []
                                            })
                                      }
                              })
                            }
                            if (collector.values == "1-Year-Hosting") {
                              const Invites = invites.get(interaction.guild.id, `${interaction.user.id}.TotalInvites`)
                    
                              const HostingAmount = client.Createbot.get(interaction.guild.id, `HostingDuration.1-Year-Hosting.Invites`)

                              if (Invites == undefined) {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                .setTitle(`You Don't have the Required Invites To get this Bot!`)
                                .setDescription(`You have No Invites Payment at all!`)
                                .setColor("Red")

                                return interaction.editReply({embeds: [embed], components: []})
                              }

                              if (Invites < HostingAmount) {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                                .setTitle(`You Need ${HostingAmount-Invites} More Invites To Pay For the Bot`)
                                .setColor("Red")

                                return interaction.editReply({embeds: [embed], components: []})
                              }

                              const embed = new EmbedBuilder()
                              .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                              .setTitle(`Are you Sure you want to spend ${HostingAmount}/${Invites}?`)
                              .setColor("Red")

                              const row = new ActionRowBuilder()
                              .addComponents(
                                     new ButtonBuilder()
                                     .setLabel("Confirm")
                                     .setCustomId("Confirm")
                                     .setStyle(ButtonStyle.Success),
                                     new ButtonBuilder()
                                     .setLabel("Cancel")
                                     .setCustomId("Cancel")
                                     .setStyle(ButtonStyle.Danger)
                              )

                              await interaction.editReply({embeds: [embed], components: [row]})

                              const collector2 = interaction.channel.createMessageComponentCollector({
                                time: 6000,
                                max: 1, 
                              });
                              collector2.on("collect", async (collector) => {
                                       if (collector.customId == "Confirm") {
                                        invites.set(interaction.guild.id, Invites-HostingAmount ,`${interaction.user.id}.TotalInvites`)


                                        const ms = require("ms")

                                        let day = ms('1y')
                                  
                                        /**
                                         * @COLLECT_DATA_AND_SEND
                                         */

                                        const Payment1 =  client.BotPayment.get(bot.id, "Payment1")
                                        const Payment2 =  client.BotPayment.get(bot.id, "Payment2")

                                        if (!Payment1) {
                                              client.BotPayment.set(bot.id, day ,"Payment1")
                                        } else if (Payment1 && !Payment2) {
                                          client.BotPayment.set(bot.id, day ,"Payment2")
                                         } else if (Payment1 && Payment2) {
                                                  return interaction.editReply({
                                                    embeds: [
                                                      new EmbedBuilder()
                                                      .setAuthor({ name: `Max Payments | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                      .setDescription(`You are at the Max Payment Limits`)
                                                      .setColor("Red")
                                                    ],
                                                     components: []
                                                  })
                                         }

                                        const logs = client.channels.cache.get("1023833701404127242")

                                        logs.send({
                                              embeds: [
                                                   new EmbedBuilder()
                                                   .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                   .setDescription(`${interaction.user} Payed: ${HostingAmount} Invites To Keep There Bot Online!`)
                                                   .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                                   .setColor("Green")
                                              ],
                                              content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                        })

                                        interaction.user.send({
                                          embeds: [
                                               new EmbedBuilder()
                                               .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                               .setDescription(`${interaction.user} Payed: ${HostingAmount} To Keep There Bot Online!`)
                                               .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                               .setColor("Green")
                                          ],
                                          content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                    })

                                    interaction.editReply({
                                          embeds: [
                                            new EmbedBuilder()
                                            .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                            .setDescription(`Extra Hosting Added! <#1023833701404127242>`)
                                            .addFields([
                                              { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                         ])
                                            .setColor("Green")
                                          ],
                                          components: []
                                    })
                                       }
                                       if (collector.customId == "Cancel") {
                                            interaction.editReply({ 
                                                  content: `Canceled`,
                                                  embeds: [],
                                                  components: []
                                            })
                                      }
                              })
                            }
                    })
                  }
                  if (collector.customId == "Money-Payment") {
                    collector.deferUpdate().catch(e => {})
                    paymentType += collector.customId
                    const row = new ActionRowBuilder()
                    .addComponents(
                               new SelectMenuBuilder()
                               .setCustomId("Hosting-Duration")
                               .setPlaceholder("Please Select the Hosting Duration")
                               .addOptions(
                                {
                                  label: "1 Week",
                                  value: `1-Week-Hosting`,
                                  description: "1 Week of Bot Hosting"
                                },
                                { 
                                  label: "1 Month",
                                  value: `1-Month-Hosting`,
                                  description: "1 Month of Bot Hosting"
                                },
                                {
                                  label: "1 Year",
                                  value: `1-Year-Hosting`,
                                  description: "1 Year of Bot Hosting"
                                },
                               )
                    )

                    await interaction.editReply({ components: [row], embeds: [
                           new EmbedBuilder()
                           .setAuthor({ name: `Hosting Selector | Roverdev`, iconURL: client.user.displayAvatarURL() })
                           .setTitle("***Please Tell me the Hosting Duration***")
                           .setColor("Yellow")
                    ] })

                    const collector1 = interaction.channel.createMessageComponentCollector({
                      time: 50000,
                    });
                    collector1.on("collect", async (collector) => {
                             if (collector.values == "1-Week-Hosting") {

                              const Money = client.Payment.get(interaction.guild.id, `${interaction.user.id}.money-payment`)
                    
                              const HostingAmount = client.Createbot.get(interaction.guild.id, `HostingDuration.1-Week-Hosting.money`)

                              if (Money == undefined) {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                .setTitle(`You Don't have the Required Money To get this Bot!`)
                                .setDescription(`You have No Money Payment at all!`)
                                .setColor("Red")

                                return interaction.editReply({embeds: [embed], components: []})
                              }

                              if (Money < HostingAmount) {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                                .setTitle(`You Need ${HostingAmount-Money} More Money To Pay For the Bot`)
                                .setColor("Red")

                                return interaction.editReply({embeds: [embed], components: []})
                              }

                              const embed = new EmbedBuilder()
                              .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                              .setTitle(`Are you Sure you want to spend ${HostingAmount}/${Money}?`)
                              .setColor("Red")

                              const row = new ActionRowBuilder()
                              .addComponents(
                                     new ButtonBuilder()
                                     .setLabel("Confirm")
                                     .setCustomId("Confirm")
                                     .setStyle(ButtonStyle.Success),
                                     new ButtonBuilder()
                                     .setLabel("Cancel")
                                     .setCustomId("Cancel")
                                     .setStyle(ButtonStyle.Danger)
                              )

                              await interaction.editReply({embeds: [embed], components: [row]})

                              const collector2 = interaction.channel.createMessageComponentCollector({
                                time: 6000,
                                max: 1, 
                              });
                              collector2.on("collect", async (collector) => {
                                       if (collector.customId == "Confirm") {
                                        client.Payment.get(interaction.guild.id, HostingAmount-Money ,`${interaction.user.id}.money-payment`)


                                        const ms = require("ms")

                                        let day = ms('7d')
                                  
                                        /**
                                         * @COLLECT_DATA_AND_SEND
                                         */

                                        const Payment1 =  client.BotPayment.get(bot.id, "Payment1")
                                        const Payment2 =  client.BotPayment.get(bot.id, "Payment2")

                                        if (!Payment1) {
                                              client.BotPayment.set(bot.id, day ,"Payment1")
                                        } else if (Payment1 && !Payment2) {
                                          client.BotPayment.set(bot.id, day ,"Payment2")
                                         } else if (Payment1 && Payment2) {
                                                  return interaction.editReply({
                                                    embeds: [
                                                      new EmbedBuilder()
                                                      .setAuthor({ name: `Max Payments | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                      .setDescription(`You are at the Max Payment Limits`)
                                                      .setColor("Red")
                                                    ],
                                                     components: []
                                                  })
                                         }

                                        const logs = client.channels.cache.get("1023833701404127242")

                                        logs.send({
                                              embeds: [
                                                   new EmbedBuilder()
                                                   .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                   .setDescription(`${interaction.user} Payed: ${HostingAmount}$ To Keep There Bot Online!`)
                                                   .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                                   .setColor("Green")
                                              ],
                                              content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                        })

                                        interaction.user.send({
                                          embeds: [
                                               new EmbedBuilder()
                                               .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                               .setDescription(`${interaction.user} Payed: ${HostingAmount} To Keep There Bot Online!`)
                                               .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                               .setColor("Green")
                                          ],
                                          content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                    })

                                    interaction.editReply({
                                          embeds: [
                                            new EmbedBuilder()
                                            .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                            .setDescription(`Extra Hosting Added! <#1023833701404127242>`)
                                            .addFields([
                                              { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                         ])
                                            .setColor("Green")
                                          ],
                                          components: []
                                    })
                                       }
                                       if (collector.customId == "Cancel") {
                                            interaction.editReply({ 
                                                  content: `Canceled`,
                                                  embeds: [],
                                                  components: []
                                            })
                                      }
                              })
                             }
                             if (collector.values == "1-Month-Hosting") {
                              const Money = client.Payment.get(interaction.guild.id, `${interaction.user.id}.money-payment`)
                    
                              const HostingAmount = client.Createbot.get(interaction.guild.id, `HostingDuration.1-Month-Hosting.money`)

                              if (Money == undefined) {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                .setTitle(`You Don't have the Required Money To get this Bot!`)
                                .setDescription(`You have No Money Payment at all!`)
                                .setColor("Red")

                                return interaction.editReply({embeds: [embed], components: []})
                              }

                              if (Money < HostingAmount) {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                                .setTitle(`You Need ${HostingAmount-Money} More Money To Pay For the Bot`)
                                .setColor("Red")

                                return interaction.editReply({embeds: [embed], components: []})
                              }

                              const embed = new EmbedBuilder()
                              .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                              .setTitle(`Are you Sure you want to spend ${HostingAmount}/${Money}?`)
                              .setColor("Red")

                              const row = new ActionRowBuilder()
                              .addComponents(
                                     new ButtonBuilder()
                                     .setLabel("Confirm")
                                     .setCustomId("Confirm")
                                     .setStyle(ButtonStyle.Success),
                                     new ButtonBuilder()
                                     .setLabel("Cancel")
                                     .setCustomId("Cancel")
                                     .setStyle(ButtonStyle.Danger)
                              )

                              await interaction.editReply({embeds: [embed], components: [row]})

                              const collector2 = interaction.channel.createMessageComponentCollector({
                                time: 6000,
                                max: 1, 
                              });
                              collector2.on("collect", async (collector) => {
                                       if (collector.customId == "Confirm") {
                                        client.Payment.get(interaction.guild.id, HostingAmount-Money ,`${interaction.user.id}.money-payment`)


                                        const ms = require("ms")

                                        let day = ms('30d')
                                  
                                        /**
                                         * @COLLECT_DATA_AND_SEND
                                         */

                                        const Payment1 =  client.BotPayment.get(bot.id, "Payment1")
                                        const Payment2 =  client.BotPayment.get(bot.id, "Payment2")

                                        if (!Payment1) {
                                              client.BotPayment.set(bot.id, day ,"Payment1")
                                        } else if (Payment1 && !Payment2) {
                                          client.BotPayment.set(bot.id, day ,"Payment2")
                                         } else if (Payment1 && Payment2) {
                                                  return interaction.editReply({
                                                    embeds: [
                                                      new EmbedBuilder()
                                                      .setAuthor({ name: `Max Payments | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                      .setDescription(`You are at the Max Payment Limits`)
                                                      .setColor("Red")
                                                    ],
                                                     components: []
                                                  })
                                         }

                                        const logs = client.channels.cache.get("1023833701404127242")

                                        logs.send({
                                              embeds: [
                                                   new EmbedBuilder()
                                                   .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                   .setDescription(`${interaction.user} Payed: ${HostingAmount}$ To Keep There Bot Online!`)
                                                   .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                                   .setColor("Green")
                                              ],
                                              content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                        })

                                        interaction.user.send({
                                          embeds: [
                                               new EmbedBuilder()
                                               .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                               .setDescription(`${interaction.user} Payed: ${HostingAmount} To Keep There Bot Online!`)
                                               .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                               .setColor("Green")
                                          ],
                                          content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                    })

                                    interaction.editReply({
                                          embeds: [
                                            new EmbedBuilder()
                                            .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                            .setDescription(`Extra Hosting Added! <#1023833701404127242>`)
                                            .addFields([
                                              { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                         ])
                                            .setColor("Green")
                                          ],
                                          components: []
                                    })
                                       }
                                       if (collector.customId == "Cancel") {
                                            interaction.editReply({ 
                                                  content: `Canceled`,
                                                  embeds: [],
                                                  components: []
                                            })
                                      }
                              })
                            }
                            if (collector.values == "1-Year-Hosting") {
                              const Money = client.Payment.get(interaction.guild.id, `${interaction.user.id}.money-payment`)
                    
                              const HostingAmount = client.Createbot.get(interaction.guild.id, `HostingDuration.1-Month-Hosting.money`)

                              if (Money == undefined) {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                .setTitle(`You Don't have the Required Money To get this Bot!`)
                                .setDescription(`You have No Money Payment at all!`)
                                .setColor("Red")

                                return interaction.editReply({embeds: [embed], components: []})
                              }

                              if (Money < HostingAmount) {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                                .setTitle(`You Need ${HostingAmount-Money} More Money To Pay For the Bot`)
                                .setColor("Red")

                                return interaction.editReply({embeds: [embed], components: []})
                              }

                              const embed = new EmbedBuilder()
                              .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                              .setTitle(`Are you Sure you want to spend ${HostingAmount}/${Money}?`)
                              .setColor("Red")

                              const row = new ActionRowBuilder()
                              .addComponents(
                                     new ButtonBuilder()
                                     .setLabel("Confirm")
                                     .setCustomId("Confirm")
                                     .setStyle(ButtonStyle.Success),
                                     new ButtonBuilder()
                                     .setLabel("Cancel")
                                     .setCustomId("Cancel")
                                     .setStyle(ButtonStyle.Danger)
                              )

                              await interaction.editReply({embeds: [embed], components: [row]})

                              const collector2 = interaction.channel.createMessageComponentCollector({
                                time: 6000,
                                max: 1, 
                              });
                              collector2.on("collect", async (collector) => {
                                       if (collector.customId == "Confirm") {
                                        client.Payment.get(interaction.guild.id, HostingAmount-Money ,`${interaction.user.id}.money-payment`)


                                        const ms = require("ms")

                                        let day = ms('1y')
                                  
                                        /**
                                         * @COLLECT_DATA_AND_SEND
                                         */

                                        const Payment1 =  client.BotPayment.get(bot.id, "Payment1")
                                        const Payment2 =  client.BotPayment.get(bot.id, "Payment2")

                                        if (!Payment1) {
                                              client.BotPayment.set(bot.id, day ,"Payment1")
                                        } else if (Payment1 && !Payment2) {
                                          client.BotPayment.set(bot.id, day ,"Payment2")
                                         } else if (Payment1 && Payment2) {
                                                  return interaction.editReply({
                                                    embeds: [
                                                      new EmbedBuilder()
                                                      .setAuthor({ name: `Max Payments | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                      .setDescription(`You are at the Max Payment Limits`)
                                                      .setColor("Red")
                                                    ],
                                                     components: []
                                                  })
                                         }

                                        const logs = client.channels.cache.get("1023833701404127242")

                                        logs.send({
                                              embeds: [
                                                   new EmbedBuilder()
                                                   .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                   .setDescription(`${interaction.user} Payed: ${HostingAmount}$ To Keep There Bot Online!`)
                                                   .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                                   .setColor("Green")
                                              ],
                                              content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                        })

                                        interaction.user.send({
                                          embeds: [
                                               new EmbedBuilder()
                                               .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                               .setDescription(`${interaction.user} Payed: ${HostingAmount} To Keep There Bot Online!`)
                                               .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                               .setColor("Green")
                                          ],
                                          content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                    })

                                    interaction.editReply({
                                          embeds: [
                                            new EmbedBuilder()
                                            .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                            .setDescription(`Extra Hosting Added! <#1023833701404127242>`)
                                            .addFields([
                                              { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                         ])
                                            .setColor("Green")
                                          ],
                                          components: []
                                    })
                                       }
                                       if (collector.customId == "Cancel") {
                                            interaction.editReply({ 
                                                  content: `Canceled`,
                                                  embeds: [],
                                                  components: []
                                            })
                                      }
                              })
                            }
                    })
                  }
                  if (collector.values == "Boost-Payment") {
                    collector.deferUpdate().catch(e => {})
                    paymentType += collector.customId
                    const row = new ActionRowBuilder()
                    .addComponents(
                               new SelectMenuBuilder()
                               .setCustomId("Hosting-Duration")
                               .setPlaceholder("Please Select the Hosting Duration")
                               .addOptions(
                                {
                                  label: "1 Week",
                                  value: `1-Week-Hosting`,
                                  description: "1 Week of Bot Hosting"
                                },
                                { 
                                  label: "1 Month",
                                  value: `1-Month-Hosting`,
                                  description: "1 Month of Bot Hosting"
                                },
                                {
                                  label: "1 Year",
                                  value: `1-Year-Hosting`,
                                  description: "1 Year of Bot Hosting"
                                },
                               )
                    )

                    await interaction.editReply({ components: [row], embeds: [
                           new EmbedBuilder()
                           .setAuthor({ name: `Hosting Selector | Roverdev`, iconURL: client.user.displayAvatarURL() })
                           .setTitle("***Please Tell me the Hosting Duration***")
                           .setColor("Yellow")
                    ] })

                    const collector1 = interaction.channel.createMessageComponentCollector({
                      time: 50000,
                    });
                    collector1.on("collect", async (collector) => {
                             if (collector.values == "1-Week-Hosting") {

                              const Boost = client.Payment.get(interaction.guild.id, `${interaction.user.id}.boost-payment`)
                    
                              const HostingAmount = client.Createbot.get(interaction.guild.id, `HostingDuration.1-Week-Hosting.boost`)

                              if (Boost == undefined) {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                .setTitle(`You Don't have the Required Boost To get this Bot!`)
                                .setDescription(`You have No Boost Payment at all!`)
                                .setColor("Red")

                                return interaction.editReply({embeds: [embed], components: []})
                              }

                              if (Boost < HostingAmount) {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                                .setTitle(`You Need ${HostingAmount-Boost} More Money To Pay For the Bot`)
                                .setColor("Red")

                                return interaction.editReply({embeds: [embed], components: []})
                              }

                              const embed = new EmbedBuilder()
                              .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                              .setTitle(`Are you Sure you want to spend ${HostingAmount}/${Boost}?`)
                              .setColor("Red")

                              const row = new ActionRowBuilder()
                              .addComponents(
                                     new ButtonBuilder()
                                     .setLabel("Confirm")
                                     .setCustomId("Confirm")
                                     .setStyle(ButtonStyle.Success),
                                     new ButtonBuilder()
                                     .setLabel("Cancel")
                                     .setCustomId("Cancel")
                                     .setStyle(ButtonStyle.Danger)
                              )

                              await interaction.editReply({embeds: [embed], components: [row]})

                              const collector2 = interaction.channel.createMessageComponentCollector({
                                time: 6000,
                                max: 1, 
                              });
                              collector2.on("collect", async (collector) => {
                                       if (collector.customId == "Confirm") {
                                        client.Payment.get(interaction.guild.id, HostingAmount-Boost ,`${interaction.user.id}.boost-payment`)


                                        const ms = require("ms")

                                        let day = ms('7d')
                                  
                                        /**
                                         * @COLLECT_DATA_AND_SEND
                                         */

                                        const Payment1 =  client.BotPayment.get(bot.id, "Payment1")
                                        const Payment2 =  client.BotPayment.get(bot.id, "Payment2")

                                        if (!Payment1) {
                                              client.BotPayment.set(bot.id, day ,"Payment1")
                                        } else if (Payment1 && !Payment2) {
                                          client.BotPayment.set(bot.id, day ,"Payment2")
                                         } else if (Payment1 && Payment2) {
                                                  return interaction.editReply({
                                                    embeds: [
                                                      new EmbedBuilder()
                                                      .setAuthor({ name: `Max Payments | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                      .setDescription(`You are at the Max Payment Limits`)
                                                      .setColor("Red")
                                                    ],
                                                     components: []
                                                  })
                                         }

                                        const logs = client.channels.cache.get("1023833701404127242")

                                        logs.send({
                                              embeds: [
                                                   new EmbedBuilder()
                                                   .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                   .setDescription(`${interaction.user} Payed: ${HostingAmount} Boost To Keep There Bot Online!`)
                                                   .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                                   .setColor("Green")
                                              ],
                                              content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                        })

                                        interaction.user.send({
                                          embeds: [
                                               new EmbedBuilder()
                                               .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                               .setDescription(`${interaction.user} Payed: ${HostingAmount} To Keep There Bot Online!`)
                                               .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                               .setColor("Green")
                                          ],
                                          content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                    })

                                    interaction.editReply({
                                          embeds: [
                                            new EmbedBuilder()
                                            .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                            .setDescription(`Extra Hosting Added! <#1023833701404127242>`)
                                            .addFields([
                                              { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                         ])
                                            .setColor("Green")
                                          ],
                                          components: []
                                    })
                                       }
                                       if (collector.customId == "Cancel") {
                                            interaction.editReply({ 
                                                  content: `Canceled`,
                                                  embeds: [],
                                                  components: []
                                            })
                                      }
                              })
                             }
                             if (collector.values == "1-Month-Hosting") {
                              const Boost = client.Payment.get(interaction.guild.id, `${interaction.user.id}.boost-payment`)
                    
                              const HostingAmount = client.Createbot.get(interaction.guild.id, `HostingDuration.1-Month-Hosting.boost`)

                              
                              if (Boost == undefined) {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                .setTitle(`You Don't have the Required Boost To get this Bot!`)
                                .setDescription(`You have No Boost Payment at all!`)
                                .setColor("Red")

                                return interaction.editReply({embeds: [embed], components: []})
                              }

                              if (Boost < HostingAmount) {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                                .setTitle(`You Need ${HostingAmount-Boost} More Boost To Pay For the Bot`)
                                .setColor("Red")

                                return interaction.editReply({embeds: [embed], components: []})
                              }

                              const embed = new EmbedBuilder()
                              .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                              .setTitle(`Are you Sure you want to spend ${HostingAmount}/${Boost}?`)
                              .setColor("Red")

                              const row = new ActionRowBuilder()
                              .addComponents(
                                     new ButtonBuilder()
                                     .setLabel("Confirm")
                                     .setCustomId("Confirm")
                                     .setStyle(ButtonStyle.Success),
                                     new ButtonBuilder()
                                     .setLabel("Cancel")
                                     .setCustomId("Cancel")
                                     .setStyle(ButtonStyle.Danger)
                              )

                              await interaction.editReply({embeds: [embed], components: [row]})

                              const collector2 = interaction.channel.createMessageComponentCollector({
                                time: 6000,
                                max: 1, 
                              });
                              collector2.on("collect", async (collector) => {
                                       if (collector.customId == "Confirm") {
                                        client.Payment.get(interaction.guild.id, HostingAmount-Boost ,`${interaction.user.id}.boost-payment`)


                                        const ms = require("ms")

                                        let day = ms('30d')
                                  
                                        /**
                                         * @COLLECT_DATA_AND_SEND
                                         */

                                        const Payment1 =  client.BotPayment.get(bot.id, "Payment1")
                                        const Payment2 =  client.BotPayment.get(bot.id, "Payment2")

                                        if (!Payment1) {
                                              client.BotPayment.set(bot.id, day ,"Payment1")
                                        } else if (Payment1 && !Payment2) {
                                          client.BotPayment.set(bot.id, day ,"Payment2")
                                         } else if (Payment1 && Payment2) {
                                                  return interaction.editReply({
                                                    embeds: [
                                                      new EmbedBuilder()
                                                      .setAuthor({ name: `Max Payments | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                      .setDescription(`You are at the Max Payment Limits`)
                                                      .setColor("Red")
                                                    ],
                                                     components: []
                                                  })
                                         }

                                        const logs = client.channels.cache.get("1023833701404127242")

                                        logs.send({
                                              embeds: [
                                                   new EmbedBuilder()
                                                   .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                   .setDescription(`${interaction.user} Payed: ${HostingAmount} Boost To Keep There Bot Online!`)
                                                   .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                                   .setColor("Green")
                                              ],
                                              content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                        })

                                        interaction.user.send({
                                          embeds: [
                                               new EmbedBuilder()
                                               .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                               .setDescription(`${interaction.user} Payed: ${HostingAmount} To Keep There Bot Online!`)
                                               .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                               .setColor("Green")
                                          ],
                                          content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                    })

                                    interaction.editReply({
                                          embeds: [
                                            new EmbedBuilder()
                                            .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                            .setDescription(`Extra Hosting Added! <#1023833701404127242>`)
                                            .addFields([
                                              { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                         ])
                                            .setColor("Green")
                                          ],
                                          components: []
                                    })
                                       }
                                       if (collector.customId == "Cancel") {
                                            interaction.editReply({ 
                                                  content: `Canceled`,
                                                  embeds: [],
                                                  components: []
                                            })
                                      }
                              })
                            }
                            if (collector.values == "1-Year-Hosting") {
                              const Boost = client.Payment.get(interaction.guild.id, `${interaction.user.id}.boost-payment`)
                    
                              const HostingAmount = client.Createbot.get(interaction.guild.id, `HostingDuration.1-Year-Hosting.boost`)

                              
                              if (Boost == undefined) {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                .setTitle(`You Don't have the Required Boost To get this Bot!`)
                                .setDescription(`You have No Boost Payment at all!`)
                                .setColor("Red")

                                return interaction.editReply({embeds: [embed], components: []})
                              }

                              if (Boost < HostingAmount) {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                                .setTitle(`You Need ${HostingAmount-Boost} More Money To Pay For the Bot`)
                                .setColor("Red")

                                return interaction.editReply({embeds: [embed], components: []})
                              }

                              const embed = new EmbedBuilder()
                              .setAuthor({ name: `Bot Payment System | Roverdev`, iconURL: client.user.displayAvatarURL() })
                              .setTitle(`Are you Sure you want to spend ${HostingAmount}/${Boost}?`)
                              .setColor("Red")

                              const row = new ActionRowBuilder()
                              .addComponents(
                                     new ButtonBuilder()
                                     .setLabel("Confirm")
                                     .setCustomId("Confirm")
                                     .setStyle(ButtonStyle.Success),
                                     new ButtonBuilder()
                                     .setLabel("Cancel")
                                     .setCustomId("Cancel")
                                     .setStyle(ButtonStyle.Danger)
                              )

                              await interaction.editReply({embeds: [embed], components: [row]})

                              const collector2 = interaction.channel.createMessageComponentCollector({
                                time: 6000,
                                max: 1, 
                              });
                              collector2.on("collect", async (collector) => {
                                       if (collector.customId == "Confirm") {
                                        client.Payment.get(interaction.guild.id, HostingAmount-Boost ,`${interaction.user.id}.boost-payment`)


                                        const ms = require("ms")

                                        let day = ms('1y')
                                  
                                        /**
                                         * @COLLECT_DATA_AND_SEND
                                         */

                                        const Payment1 =  client.BotPayment.get(bot.id, "Payment1")
                                        const Payment2 =  client.BotPayment.get(bot.id, "Payment2")

                                        if (!Payment1) {
                                              client.BotPayment.set(bot.id, day ,"Payment1")
                                        } else if (Payment1 && !Payment2) {
                                          client.BotPayment.set(bot.id, day ,"Payment2")
                                         } else if (Payment1 && Payment2) {
                                                  return interaction.editReply({
                                                    embeds: [
                                                      new EmbedBuilder()
                                                      .setAuthor({ name: `Max Payments | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                      .setDescription(`You are at the Max Payment Limits`)
                                                      .setColor("Red")
                                                    ],
                                                     components: []
                                                  })
                                         }

                                        const logs = client.channels.cache.get("1023833701404127242")

                                        logs.send({
                                              embeds: [
                                                   new EmbedBuilder()
                                                   .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                   .setDescription(`${interaction.user} Payed: ${HostingAmount} Boost To Keep There Bot Online!`)
                                                   .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                                   .setColor("Green")
                                              ],
                                              content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                        })

                                        interaction.user.send({
                                          embeds: [
                                               new EmbedBuilder()
                                               .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                               .setDescription(`${interaction.user} Payed: ${HostingAmount} To Keep There Bot Online!`)
                                               .addFields([
                                                    { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                               ])
                                               .setColor("Green")
                                          ],
                                          content: `${interaction.user} Successfully Added Extra Hosting To: ${bot}`
                                    })

                                    interaction.editReply({
                                          embeds: [
                                            new EmbedBuilder()
                                            .setAuthor({ name: `Bot Got Payed | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                            .setDescription(`Extra Hosting Added! <#1023833701404127242>`)
                                            .addFields([
                                              { name: `Auto Payment`, value: "if you enable auto payment this payment will auto renew!" }
                                         ])
                                            .setColor("Green")
                                          ],
                                          components: []
                                    })
                                       }
                                       if (collector.customId == "Cancel") {
                                            interaction.editReply({ 
                                                  content: `Canceled`,
                                                  embeds: [],
                                                  components: []
                                            })
                                      }
                              })
                            }
                    })  
                  }
      })
  }
  if (interaction.options.getSubcommand() === 'autopayment') {
          const boolean = interaction.options.getBoolean('enable');

          if (boolean == true) {
                 client.BotPayment.set(interaction.user.id, true ,"AutoPayment")
                return  interaction.reply({
                  embeds: [ 
                        new EmbedBuilder()
                        .setAuthor({ name: `AutoPayment | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                        .setDescription(`Auto Payment Got Enabled\n> Next Payment your bot will Auto be Payed!\n> :warning: if you have no payment this will not work`)
                        .setColor("Green")
                      ], ephemeral: true
            })
          }
          if (boolean == false) {
            client.BotPayment.set(interaction.user.id, false ,"AutoPayment")

            return interaction.reply({
                  embeds: [ 
                        new EmbedBuilder()
                        .setAuthor({ name: `AutoPayment | Roverdev`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                        .setDescription(`Auto Payment Got Disabled`)
                        .setColor("Red")
                  ], ephemeral: true
            })
     }
  }
  if (interaction.options.getSubcommand() === 'start') {


    if (isNaN(interaction.options.getString("bot"))) {
      return interaction.reply({ content: `Invaild BotId Provided.` })
}

    await interaction.deferReply()

    if (interaction.options.getString("bot") == "invaild") {
           return interaction.editReply({ content: `You have no discord bots to control.` })
    }
 

    const bot = client.users.cache.get(interaction.options.getString("bot"))

    

    const ShopServer = client.Bots.get(bot.id, "ShopServer")

    const BotPath = client.Bots.get(bot.id, "BotPath")

    const member = interaction.guild.members.cache.get(bot.id)

    client.Bots.ensure(interaction.user.id, {
          Bots: []
    })

    const bots = client.Bots.get(interaction.user.id, "Bots") 

    if (!bots.includes(bot.id)) {
          if (interaction.member.roles.cache.has("920292438294294538")) {

              const owner = client.Bots.get(bot.id, "BotOwner") 
              const axios = require("axios")

              const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

              if (TotalCooldown > 2) { 
                    return interaction.editReply({
                        embeds: [
                          new EmbedBuilder()
                          .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                          .setColor("Red")
                        ]
                    })
              } 

              const Payment = client.BotPayment.get(bot.id, "BotPaied")

              if (Payment === false) {
                return interaction.editReply({
                  embeds: [
                    new EmbedBuilder()
                    .setAuthor({ name: `No Payment Set to Start The Bot!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                    .setColor("Red")
                  ]
              })
              }
  
              axios({
                method: 'post',
                url: `${link}/start`.replace("{shopserver}", ShopServer),
                data: {
                  SECRECT: Password, 
                  owner: owner,
                  BotID: bot.id,
                }
              }).then(res => {
                 const resjson = res.data

                 client.Cooldowns.ensure(interaction.guild.id, { TotalBots: [] })
                 client.Cooldowns.push(interaction.guild.id, bot.id, "TotalBots")

                 const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

                 client.Cooldowns.set(interaction.guild.id, TotalCooldown + 1, `${bot.id}.Cooldown`)

                 if (TotalCooldown == 2) {
                   let day = ms('30m');
                                                                                                    
                   day = Date.now() + day
 
                                   client.Cooldowns.set(interaction.guild.id, day, `${bot.id}.EndCooldown`)
 
                 logs.send({
                        embeds: [
                             new EmbedBuilder()
                            .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1023811852280533043.webp?size=96&quality=lossless" })
                             .setTitle(`Rate Limited until: <t:${Math.floor(day /1000)}> `)
                             .setColor("Red")
                        ],
                        content: `${bot} Reached Rate Limit!`
                 })
                 }
          
                 setTimeout(() => {
                      if (resjson.sucess == true) {
                        return interaction.editReply({embeds: [
                          new EmbedBuilder()
                          .setAuthor({ name: `Successfully Started ${bot.username}`, iconURL: "https://cdn.discordapp.com/emojis/1023811776850186261.webp?size=96&quality=lossless" })
                          .setColor("Green")
                   ]})
                      }
                 }, 500);
              }). catch((e) => console.log(e))
          } else if (!interaction.member.roles.cache.has("920292438294294538")) {
            return interaction.editReply({
              embeds: [
                new EmbedBuilder()
                .setAuthor({ name: `This is Not your Bot`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                .setColor("Red")
              ]
        })
          }
    } else if (bots.includes(bot.id)) {
        const axios = require("axios")

        const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

        if (TotalCooldown > 2) { 
              return interaction.editReply({
                  embeds: [
                    new EmbedBuilder()
                    .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                    .setColor("Red")
                  ]
              })
        } 

        const Payment = client.BotPayment.get(bot.id, "BotPaied")

        if (Payment === false) {
          return interaction.editReply({
            embeds: [
              new EmbedBuilder()
              .setAuthor({ name: `No Payment Set to Start The Bot!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
              .setColor("Red")
            ]
        })
        }

        axios({
          method: 'post',
          url: `${link}/start`.replace("{shopserver}", ShopServer),
          data: {
            SECRECT: Password, 
            owner: interaction.user.id,
            BotID: bot.id,
          }
        }).then(res => {
           const resjson = res.data
           client.Cooldowns.ensure(interaction.guild.id, { TotalBots: [] })
           client.Cooldowns.push(interaction.guild.id, bot.id, "TotalBots")

           const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

           client.Cooldowns.set(interaction.guild.id, TotalCooldown + 1, `${bot.id}.Cooldown`)

           if (TotalCooldown === 2) {
             let day = ms('30m');
                                                                                              
             day = Date.now() + day

                             client.Cooldowns.set(interaction.guild.id, day, `${bot.id}.EndCooldown`)

           logs.send({
                  embeds: [
                       new EmbedBuilder()
                      .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1023811852280533043.webp?size=96&quality=lossless" })
                       .setTitle(`Rate Limited until: <t:${Math.floor(day /1000)}> `)
                       .setColor("Red")
                  ],
                  content: `${bot} Reached Rate Limit!`
           })
           }
    
           setTimeout(() => {
                if (resjson.sucess == true) {
                  return interaction.editReply({embeds: [
                    new EmbedBuilder()
                    .setAuthor({ name: `Successfully Started ${bot.username}`, iconURL: "https://cdn.discordapp.com/emojis/1023811776850186261.webp?size=96&quality=lossless" })
                    .setColor("Green")
                   ]})
                }
           }, 500);
        })
    }
  }
  if (interaction.options.getSubcommand() === 'bots') {
    await interaction.deferReply()

    const user = interaction.options.getUser("user")

    if (user) {

      client.Bots.ensure(user.id, {
        Bots: []
})

      const database = client.Bots.get(user.id, "Bots") 

      const embed = new EmbedBuilder()
      .setColor("#3dbeff")
      

      if (database.length < 1) {
        embed.setDescription(`*** ${user.username} have no Discord Bots Yet.***`)
        return interaction.editReply({embeds: [embed]})
       }

      
  
      database.forEach((m, index) => {
               const ShopServer = client.Bots.get(m, "ShopServer")
               const BotPath = client.Bots.get(m, "BotPath")
               const BotType = client.Bots.get(m, "BotType")
               const BotMaker = client.Bots.get(m, "BotMaker")
               const BotOwner = client.Bots.get(m, "BotOwner")
               const HostingDuration = client.Bots.get(m, "HostingDuration")
               const CreatedAt = client.Bots.get(m, "CreatedAt")
               const PaymentType = client.Bots.get(m, "PaymentType")
               
               embed.addFields({
                name: `***Number: ${index + 1}  |  ${client.users.cache.get(m).username}***`,                     
                value: `\`\`\`yml\nShopServer: ${ShopServer}\nPath: ${BotPath}\nType: ${BotType}\nOwner: ${client.users.cache.get(BotOwner)?.username}\nBot Maker: ${BotMaker ? `${client.users.cache.get(BotMaker)?.username ? client.users.cache.get(BotMaker)?.username : BotMaker}` : `None Set`}\nHosting Duration: ${HostingDuration ? HostingDuration : `None Set`}\nPayment Type: ${PaymentType ? PaymentType : `None Set`}\`\`\`\n> ***Date Created: <t:${Math.floor(CreatedAt / 1000)}>***\n> ***Hosting Duration: ${HostingDuration == "1-Week-Hosting" ? `( <t:${Math.floor(client.BotPayment.get(m, "EndHosting") /1000)}>)` : HostingDuration == "1-Month-Hosting" ? `( <t:${Math.floor(client.BotPayment.get(m, "EndHosting") /1000)}>)` : HostingDuration == "1-Year-Hosting" ? `( <t:${Math.floor(client.BotPayment.get(m, "EndHosting") /1000)}>)` : "No Hosting Duration" }***`
        })
      })
      return interaction.editReply({embeds: [embed]})
    }

    client.Bots.ensure(interaction.user.id, {
      Bots: []
})

    const database = client.Bots.get(interaction.user.id, "Bots") 

    const embed = new EmbedBuilder()
    .setColor("#3dbeff")

    if (database.length < 1) {
      embed.setDescription("***You have no Discord Bots Yet.***")
      return interaction.editReply({embeds: [embed]})
}

    database.forEach((m, index) => {
             const ShopServer = client.Bots.get(m, "ShopServer")
             const BotPath = client.Bots.get(m, "BotPath")
             const BotType = client.Bots.get(m, "BotType")
             const BotMaker = client.Bots.get(m, "BotMaker")
             const BotOwner = client.Bots.get(m, "BotOwner")
             const HostingDuration = client.Bots.get(m, "HostingDuration")
             const CreatedAt = client.Bots.get(m, "CreatedAt")
             const PaymentType = client.Bots.get(m, "PaymentType")
             
             embed.addFields({
              name: `***Number: ${index + 1}  |  ${client.users.cache.get(m).username}***`,                     
              value: `\`\`\`yml\nShopServer: ${ShopServer}\nPath: ${BotPath}\nType: ${BotType}\nOwner: ${client.users.cache.get(BotOwner).username}\nBot Maker: ${BotMaker ? `${client.users.cache.get(BotMaker)?.username ? client.users.cache.get(BotMaker)?.username : BotMaker}` : `None Set`}\nHosting Duration: ${HostingDuration ? HostingDuration : `None Set`}\nPayment Type: ${PaymentType ? PaymentType : `None Set`}\`\`\`\n> ***Date Created: <t:${Math.floor(CreatedAt / 1000)}>***\n> ***Hosting Duration: ${HostingDuration == "1-Week-Hosting" ? `( <t:${Math.floor(client.BotPayment.get(m, "EndHosting") /1000)}>)` : HostingDuration == "1-Month-Hosting" ? `( <t:${Math.floor(client.BotPayment.get(m, "EndHosting") /1000)}>)` : HostingDuration == "1-Year-Hosting" ? `( <t:${Math.floor(client.BotPayment.get(m, "EndHosting") /1000)}>)` : "No Hosting Duration" }***`
      })
    })

    interaction.editReply({embeds: [embed]})
  }
  if (interaction.options.getSubcommand() === 'stop') {
    if (isNaN(interaction.options.getString("bot"))) {
      return interaction.reply({ content: `Invaild BotId Provided.` })
}
 
    await interaction.deferReply()

    if (interaction.options.getString("bot") == "invaild") {
           return interaction.editReply({ content: `You have no discord bots to control.` })
    }

    const bot = client.users.cache.get(interaction.options.getString("bot"))

    const ShopServer = client.Bots.get(bot.id, "ShopServer")

    const axios = require("axios")

    const member = interaction.guild.members.cache.get(bot.id)

    client.Bots.ensure(interaction.user.id, {
      Bots: []
})

const bots = client.Bots.get(interaction.user.id, "Bots") 
    if (!bots.includes(bot.id)) {
          if (interaction.member.roles.cache.has("920292438294294538")) {

        const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

        if (TotalCooldown > 2) { 
              return interaction.editReply({
                  embeds: [
                    new EmbedBuilder()
                    .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                    .setColor("Red")
                  ]
              })
        } 

        const Payment = client.BotPayment.get(bot.id, "BotPaied")

        if (Payment === false) {
          return interaction.editReply({
            embeds: [
              new EmbedBuilder()
              .setAuthor({ name: `No Payment Set to Start The Bot!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
              .setColor("Red")
            ]
        })
        }

              const owner = client.Bots.get(bot.id, "BotOwner") 
            const axios = require("axios")

            axios({
              method: 'post',
              url: `${link}/stop`.replace("{shopserver}", ShopServer),
              data: {
                SECRECT: Password, 
                owner: owner,
                BotID: bot.id,
              }
            }).then(res => {
               const resjson = res.data
        
               setTimeout(() => {
                    if (resjson.sucess == true) {
                      client.Cooldowns.ensure(interaction.guild.id, { TotalBots: [] })
                      client.Cooldowns.push(interaction.guild.id, bot.id, "TotalBots")

                      const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

                      client.Cooldowns.set(interaction.guild.id, TotalCooldown + 1, `${bot.id}.Cooldown`)

                      if (TotalCooldown == 2) {
                        let day = ms('30m');
                                                                                                         
                        day = Date.now() + day
      
                                        client.Cooldowns.set(interaction.guild.id, day, `${bot.id}.EndCooldown`)
      
                      logs.send({
                             embeds: [
                                  new EmbedBuilder()
                                 .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1023811852280533043.webp?size=96&quality=lossless" })
                                  .setTitle(`Rate Limited until: <t:${Math.floor(day /1000)}> `)
                                  .setColor("Red")
                             ],
                             content: `${bot} Reached Rate Limit!`
                      })
                      }

                      return interaction.editReply({embeds: [
                             new EmbedBuilder()
                             .setAuthor({ name: `Successfully Stopped ${bot.username}`, iconURL: "https://cdn.discordapp.com/emojis/1023811776850186261.webp?size=96&quality=lossless" })
                             .setColor("Green")
                      ]})
                    }
               }, 500);
            })
          } else if (!interaction.member.roles.cache.has("920292438294294538")) {
            return interaction.editReply({
              embeds: [
                new EmbedBuilder()
                .setAuthor({ name: `This is Not your Bot`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                .setColor("Red")
              ]
        })
          }
    } else if (bots.includes(bot.id)) {
  const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

  if (TotalCooldown > 2) { 
        return interaction.editReply({
            embeds: [
              new EmbedBuilder()
              .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
              .setColor("Red")
            ]
        })
  } 

  const Payment = client.BotPayment.get(bot.id, "BotPaied")

  if (Payment === false) {
    return interaction.editReply({
      embeds: [
        new EmbedBuilder()
        .setAuthor({ name: `No Payment Set to Start The Bot!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
        .setColor("Red")
      ]
  })
  }

      const axios = require("axios")

      axios({
        method: 'post',
        url: `${link}/stop`.replace("{shopserver}", ShopServer),
        data: {
          SECRECT: Password, 
          owner: interaction.user.id,
          BotID: bot.id,
        }
      }).then(res => {
         const resjson = res.data
  
         setTimeout(() => {
              if (resjson.sucess == true) {
                
                client.Cooldowns.ensure(interaction.guild.id, { TotalBots: [] })
                client.Cooldowns.push(interaction.guild.id, bot.id, "TotalBots")

                const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

                client.Cooldowns.set(interaction.guild.id, TotalCooldown + 1, `${bot.id}.Cooldown`)

                if (TotalCooldown == 2) {
                  let day = ms('30m');
                                                                                                   
                  day = Date.now() + day

                                  client.Cooldowns.set(interaction.guild.id, day, `${bot.id}.EndCooldown`)

                logs.send({
                       embeds: [
                            new EmbedBuilder()
                           .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1023811852280533043.webp?size=96&quality=lossless" })
                            .setTitle(`Rate Limited until: <t:${Math.floor(day /1000)}> `)
                            .setColor("Red")
                       ],
                       content: `${bot} Reached Rate Limit!`
                })
                }

                return interaction.editReply({embeds: [
                  new EmbedBuilder()
                  .setAuthor({ name: `Successfully Stopped ${bot.username}`, iconURL: "https://cdn.discordapp.com/emojis/1023811776850186261.webp?size=96&quality=lossless" })
                  .setColor("Green")
           ]})
              }
         }, 500);
      })
    }
  }
  if (interaction.options.getSubcommand() === 'restart') {
    if (isNaN(interaction.options.getString("bot"))) {
      return interaction.editReply({ content: `You have no discord bots to control.` })
   }
    await interaction.deferReply()

    if (interaction.options.getString("bot") == "invaild") {
           return interaction.editReply({ content: `You have no discord bots to control.` })
    }

    const bot = client.users.cache.get(interaction.options.getString("bot"))

    const ShopServer = client.Bots.get(bot.id, "ShopServer")

    const axios = require("axios")

    const member = interaction.guild.members.cache.get(bot.id)

    client.Bots.ensure(interaction.user.id, {
      Bots: []
})

    const bots = client.Bots.get(interaction.user.id, "Bots") 
        if (!bots.includes(bot.id)) {
              if (interaction.member.roles.cache.has("920292438294294538")) {
                  const owner = client.Bots.get(bot.id, "BotOwner") 
                  const axios = require("axios")

                  const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

                  if (TotalCooldown > 2) { 
                        return interaction.editReply({
                            embeds: [
                              new EmbedBuilder()
                              .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                              .setColor("Red")
                            ]
                        })
                  } 
    
                  const Payment = client.BotPayment.get(bot.id, "BotPaied")
    
                  if (Payment === false) {
                    return interaction.editReply({
                      embeds: [
                        new EmbedBuilder()
                        .setAuthor({ name: `No Payment Set to Start The Bot!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                        .setColor("Red")
                      ]
                  })
                  }
    
                axios({
                  method: 'post',
                  url: `${link}/restart`.replace("{shopserver}", ShopServer),
                  data: {
                    SECRECT: Password, 
                    owner: owner,
                    BotID: bot.id,
                  }
                }).then(res => {
                   const resjson = res.data

                   client.Cooldowns.ensure(interaction.guild.id, { TotalBots: [] })
                   client.Cooldowns.push(interaction.guild.id, bot.id, "TotalBots")
   
                   const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0
   
                   client.Cooldowns.set(interaction.guild.id, TotalCooldown + 1, `${bot.id}.Cooldown`)
   
                   if (TotalCooldown == 2) {
                     let day = ms('30m');
                                                                                                      
                     day = Date.now() + day
   
                                     client.Cooldowns.set(interaction.guild.id, day, `${bot.id}.EndCooldown`)

                logs.send({
                       embeds: [
                            new EmbedBuilder()
                            .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1023811852280533043.webp?size=96&quality=lossless" })
                            .setTitle(`Rate Limited until: <t:${Math.floor(day /1000)}> `)
                            .setColor("Red")
                       ],
                       content: `${bot} Reached Rate Limit!`
                })
                   }
                   setTimeout(() => {
                        if (resjson.sucess == true) {
                          return interaction.editReply({embeds: [
                            new EmbedBuilder()
                            .setAuthor({ name: `Successfully Restarted ${bot.username}`, iconURL: "https://cdn.discordapp.com/emojis/1023811776850186261.webp?size=96&quality=lossless" })
                            .setColor("Green")
                     ]})
                        }
                   }, 500);
                })
              } else if (!interaction.member.roles.cache.has("920292438294294538")) {
                return interaction.editReply({
                  embeds: [
                    new EmbedBuilder()
                    .setAuthor({ name: `This is Not your Bot`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                    .setColor("Red")
                  ]
            })
              }
        } else if (bots.includes(bot.id)) {
          const axios = require("axios")

          const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

          if (TotalCooldown > 2) { 
                return interaction.editReply({
                    embeds: [
                      new EmbedBuilder()
                      .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                      .setColor("Red")
                    ]
                })
          } 

          const Payment = client.BotPayment.get(bot.id, "BotPaied")

          if (Payment === false) {
            return interaction.editReply({
              embeds: [
                new EmbedBuilder()
                .setAuthor({ name: `No Payment Set to Start The Bot!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                .setColor("Red")
              ]
          })
          }
    
          axios({
            method: 'post',
            url: `${link}/restart`.replace("{shopserver}", ShopServer),
            data: {
              SECRECT: Password, 
              owner: interaction.user.id,
              BotID: bot.id,
            }
          }).then(res => {
             const resjson = res.data

             client.Cooldowns.ensure(interaction.guild.id, { TotalBots: [] })
             client.Cooldowns.push(interaction.guild.id, bot.id, "TotalBots")

             const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

             client.Cooldowns.set(interaction.guild.id, TotalCooldown + 1, `${bot.id}.Cooldown`)

             if (TotalCooldown == 2) {
               let day = ms('30m');
                                                                                                
               day = Date.now() + day

                               client.Cooldowns.set(interaction.guild.id, day, `${bot.id}.EndCooldown`)

                logs.send({
                       embeds: [
                            new EmbedBuilder()
                           .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1023811852280533043.webp?size=96&quality=lossless" })
                            .setTitle(`Rate Limited until: <t:${Math.floor(day /1000)}> `)
                            .setColor("Red")
                       ],
                       content: `${bot} Reached Rate Limit!`
                })
             }
      
             setTimeout(() => {
                  if (resjson.sucess == true) {
                    return interaction.editReply({embeds: [
                      new EmbedBuilder()
                      .setAuthor({ name: `Successfully Restarted ${bot.username}`, iconURL: "https://cdn.discordapp.com/emojis/1023811776850186261.webp?size=96&quality=lossless" })
                      .setColor("Green")
               ]})
                  }
             }, 500);
          })
        }
  }
  if (interaction.options.getSubcommand() === 'status') {
    if (isNaN(interaction.options.getString("bot"))) {
      return interaction.editReply({ content: `You have no discord bots to control.` })
   }
    await interaction.deferReply()

    if (interaction.options.getString("bot") == "invaild") {
          return interaction.editReply({ content: `You have no discord bots to control.` })
    }

    const bot = client.users.cache.get(interaction.options.getString("bot"))

    const ShopServer = client.Bots.get(bot.id, "ShopServer")
    
    const axios = require("axios")

    axios({
      method: 'post',
      url: `${link}/status`.replace("{shopserver}", ShopServer),
      data: {
        SECRECT: Password, 
      }
    }).then(res => {
       const resjson = res.data

       const embed = new EmbedBuilder()
       .setTitle(`***Bot Status: ${resjson.online == true ? `<a:Uptime:1015782890098917446> Online` : `<a:downtime:1021468938506350692> offline`}***`)
       .setColor("#3dbeff")

       interaction.editReply({embeds: [embed]})

    })
  }
  if (interaction.options.getSubcommand() === 'delete') {
    if (isNaN(interaction.options.getString("bot"))) {
      return interaction.editReply({ content: `You have no discord bots to control.` })
   }
    await interaction.deferReply()

    if (interaction.options.getString("bot") == "invaild") {
           return interaction.editReply({ content: `You have no discord bots to control.` })
    }

    const bot = client.users.cache.get(interaction.options.getString("bot"))

    // 979015689492902028 1027461120400830494 931396885569220638 1027454318393163816 1006570531052597371

    const ShopServer = client.Bots.get(bot.id, "ShopServer")
    const BotPath = client.Bots.get(bot.id, "BotPath")
    const BotType = client.Bots.get(bot.id, "BotType")
    const BotOwner = client.Bots.get(bot.id, "BotOwner")
    const BotMaker = client.Bots.get(bot.id, "BotMaker")
    const HostingDuration = client.Bots.get(bot.id, "HostingDuration")
    const CreatedAt = client.Bots.get(bot.id, "CreatedAt")

    const axios = require("axios")

    const bots = client.Bots.get(interaction.user.id, "Bots") 

    client.Bots.ensure(interaction.user.id, {
      Bots: []
})

    if (!bots.includes(bot.id)) {
          if (interaction.member.roles.cache.has("920292438294294538")) {

            const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

            if (TotalCooldown > 2) { 
                  return interaction.editReply({
                      embeds: [
                        new EmbedBuilder()
                        .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                        .setColor("Red")
                      ]
                  })
            } 

            const Payment = client.BotPayment.get(bot.id, "BotPaied")

            if (Payment === false) {
              return interaction.editReply({
                embeds: [
                  new EmbedBuilder()
                  .setAuthor({ name: `No Payment Set to Start The Bot!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                  .setColor("Red")
                ]
            })
            }

            axios({
              method: 'post',
              url: `${link}/delete`.replace("{shopserver}", ShopServer),
              data: {
                SECRECT: Password, 
                owner: BotOwner,
                BotID: bot.id,
                BotPath: BotPath,
                BotType: BotType
              }
            }).then(res => {
               const resjson = res.data
               
               setTimeout(() => {
                    if (resjson.sucess == true) {

                      client.BotPayment.ensure(interaction.guild.id, {
                        TotalPaymentBots: []
                  })

                    client.BotPayment.remove(interaction.guild.id, bot.id, "TotalPaymentBots")
                    client.BotPayment.delete(bot.id)

                    client.Bots.delete(bot.id)
        
                    client.Bots.ensure(BotOwner, {
                             Bots: []
                    })

                    client.Cooldowns.delete(bot.id)
        
                    setTimeout(() => {
                      client.RecoverBotHost.set(bot.id, resjson.directory ,"BotPath")
                      client.RecoverBotHost.set(bot.id, ShopServer ,"ShopServer")
                      client.RecoverBotHost.set(bot.id, BotOwner ,"BotOwner")
                      client.RecoverBotHost.set(bot.id, BotType ,"BotType")
                      client.RecoverBotHost.set(bot.id, BotMaker ,"BotMaker")
                      client.RecoverBotHost.set(bot.id, HostingDuration ,"HostingDuration")
                      client.RecoverBotHost.set(bot.id, CreatedAt ,"CreatedAt")
                     }, 500);
        
                     setTimeout(() => {
                      client.Bots.remove(BotOwner, bot.id, "Bots")
                     }, 1500);
        
                      interaction.guild.members.fetch(bot.id).then((m) => { 
                        m.kick()
                    }).catch(() => {});
        
                    interaction.editReply({ content: `<:thumbsup:1006591286867927161> Succesfully Deleted: <@!${bot.id}>\n> <a:hostemoji:1017081433765990480> Backup: \`${resjson.directory}\`\n> <a:hostemoji:1017081433765990480> Hosting Server: \`${resjson.HostingServer}\`` })
                    }
               }, 500);
            })
          } else if (!interaction.member.roles.cache.has("920292438294294538")) {
            return interaction.editReply({
              embeds: [
                new EmbedBuilder()
                .setAuthor({ name: `This is Not your Bot`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                .setColor("Red")
              ]
        })
         }
      } else if (bots.includes(bot.id)) {

        const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

        if (TotalCooldown > 2) { 
              return interaction.editReply({
                  embeds: [
                    new EmbedBuilder()
                    .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                    .setColor("Red")
                  ]
              })
        } 
        
        const Payment = client.BotPayment.get(bot.id, "BotPaied")

        if (Payment === false) {
          return interaction.editReply({
            embeds: [
              new EmbedBuilder()
              .setAuthor({ name: `No Payment Set to Start The Bot!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
              .setColor("Red")
            ]
        })
        }

        axios({
          method: 'post',
          url: `${link}/delete`.replace("{shopserver}", ShopServer),
          data: {
            SECRECT: Password, 
            owner: BotOwner,
            BotID: bot.id,
            BotPath: BotPath,
            BotType: BotType
          }
        }).then(res => {
           const resjson = res.data
    
           setTimeout(() => {
            if (resjson.sucess == true) {

              client.BotPayment.ensure(interaction.guild.id, {
                TotalPaymentBots: []
          })

            client.BotPayment.remove(interaction.guild.id, bot.id, "TotalPaymentBots")
            client.BotPayment.delete(bot.id)

            client.Bots.delete(bot.id)

            client.Bots.ensure(BotOwner, {
                     Bots: []
            })

            client.Cooldowns.delete(bot.id)

            setTimeout(() => {
              client.RecoverBotHost.set(bot.id, resjson.directory ,"BotPath")
              client.RecoverBotHost.set(bot.id, ShopServer ,"ShopServer")
              client.RecoverBotHost.set(bot.id, BotOwner ,"BotOwner")
              client.RecoverBotHost.set(bot.id, BotType ,"BotType")
              client.RecoverBotHost.set(bot.id, BotMaker ,"BotMaker")
              client.RecoverBotHost.set(bot.id, HostingDuration ,"HostingDuration")
              client.RecoverBotHost.set(bot.id, CreatedAt ,"CreatedAt")
             }, 500);

             setTimeout(() => {
              client.Bots.remove(BotOwner, bot.id, "Bots")
             }, 1500);

              interaction.guild.members.fetch(bot.id).then((m) => { 
                m.kick()
            }).catch(() => {});

            interaction.editReply({ content: `<:thumbsup:1006591286867927161> Succesfully Deleted: <@!${bot.id}>\n> <a:hostemoji:1017081433765990480> Backup: \`${resjson.directory}\`\n> <a:hostemoji:1017081433765990480> Hosting Server: \`${resjson.HostingServer}\`` })
            }
           }, 500);
        })
      }
  }
  if (interaction.options.getSubcommand() === 'recover') {

    if (isNaN(interaction.options.getString("bot"))) {
      return interaction.editReply({ content: `You have no discord bots to control.` })
     }

    const bot = interaction.options.getString("shop-bot")

    const member =  interaction.guild.members.cache.has(bot)


    if (member == false || member == undefined) {
      await interaction.deferReply({ ephemeral: true })
      return interaction.editReply({
         content: `Please Open a Ticket: <#${client.config.Channels.TicketChannel}>, And Ask them to Invite your Bot!`,
         ephemeral: true
      })
}

 if (member == true ) {
  
  client.Bots.ensure(interaction.user.id, {
    Bots: []
})

  const bots = client.Bots.get(interaction.user.id, "Bots") 
  
  if (bots.includes(bot)) {
    const user = client.users.cache.get(bot)

    await interaction.deferReply()

    const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

    if (TotalCooldown > 2) { 
          return interaction.editReply({
              embeds: [
                new EmbedBuilder()
                .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                .setColor("Red")
              ]
          })
    } 

    const Payment = client.BotPayment.get(bot.id, "BotPaied")

    if (Payment === false) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
          .setAuthor({ name: `No Payment Set to Start The Bot!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
          .setColor("Red")
        ]
    })
    }

    try {
         const test = client.RecoverBotHost.get(bot, "ShopServer")
    } catch {
             return interaction.editReply({
              embeds: [
                new EmbedBuilder()
                .setAuthor({ name: `No Recovery Found!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                .setColor("Red")
              ]
          })
    }
  
    const ShopServer = client.RecoverBotHost.get(bot, "ShopServer")
    const BotPath = client.RecoverBotHost.get(bot, "BotPath")
    const BotType = client.RecoverBotHost.get(bot, "BotType")
    const BotOwner = client.RecoverBotHost.get(bot, "BotOwner")
    const BotMaker = client.RecoverBotHost.get(bot, "BotMaker")
    const HostingDuration = client.RecoverBotHost.get(bot, "HostingDuration")
    const CreatedAt = client.RecoverBotHost.get(bot, "CreatedAt")
  
  
    const axios = require("axios")
  
    axios({
      method: 'post',
      url: `${link}/recover`.replace("{shopserver}", ShopServer),
      data: {
        SECRECT: Password, 
        owner: BotOwner,
        BotName: user.username,
        BotPath: BotPath,
        BotType: BotType
      }
    }).then(res => {
       const resjson = res.data
  
       setTimeout(() => {
            if (resjson.sucess == true) {

              client.Cooldowns.ensure(interaction.guild.id, { TotalBots: [] })
              client.Cooldowns.push(interaction.guild.id, bot.id, "TotalBots")

              const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

              client.Cooldowns.set(interaction.guild.id, TotalCooldown + 1, `${bot.id}.Cooldown`)

              if (TotalCooldown == 2) {
                let day = ms('30m');
                                                                                                 
                day = Date.now() + day

                                client.Cooldowns.set(interaction.guild.id, day, `${bot.id}.EndCooldown`)

                logs.send({
                       embeds: [
                            new EmbedBuilder()
                           .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1023811852280533043.webp?size=96&quality=lossless" })
                            .setTitle(`Rate Limited until: <t:${Math.floor(day /1000)}> `)
                            .setColor("Red")
                       ],
                       content: `${bot} Reached Rate Limit!`
                })
              }

                      interaction.editReply({
                             content: `<:thumbsup:1006591286867927161> Successfully Recovered The Bot Host: <@!${user.id}>\n> <a:hostemoji:1017081433765990480> Directory: \`${resjson.path}\`\n> <a:hostemoji:1017081433765990480> Server: \`${resjson.HostingServer}\``
                      })
                      client.Bots.set(bot, ShopServer , "ShopServer")
                      client.Bots.set(bot, resjson.path, "BotPath")
                      client.Bots.set(bot, BotType , "BotType")
                      client.Bots.set(bot, BotOwner, "BotOwner")
                      client.Bots.set(bot, BotMaker, "BotMaker")
                      client.Bots.set(bot, HostingDuration, "HostingDuration")
                      client.Bots.set(bot, CreatedAt, "CreatedAt")
                      client.Bots.set(bot, BotOwner, "BotOwner")
  
                      client.Bots.ensure(BotOwner, {
                        Bots: []
                       })
                       
                       client.Bots.set(BotOwner, bot.id, "Bots")
            }
       }, 500);
    })
  } else if (!bots.includes(bot)) {
    await interaction.deferReply()
    
    return interaction.editReply({
      embeds: [
        new EmbedBuilder()
        .setAuthor({ name: `This is Not your Bot`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
        .setColor("Red")
      ]
})
  }
 }
  }

  if (interaction.options.getSubcommand() === 'remove-recover') {

    if (isNaN(interaction.options.getString("bot"))) {
      return interaction.reply({ content: `Invaild BotId Provided.` })
}


    const bot = interaction.options.getString("shop-bot")

    const member =  interaction.guild.members.cache.has(bot)


    if (member == false || member == undefined) {
      await interaction.deferReply({ ephemeral: true })
      return interaction.editReply({
         content: `Please Open a Ticket: <#${client.config.Channels.TicketChannel}>, And Ask them to Invite your Bot!`,
         ephemeral: true
      })
}

 if (member == true ) {
  client.Bots.ensure(interaction.user.id, {
    Bots: []
})
  const bots = client.Bots.get(interaction.user.id, "Bots") 
  if (bots.includes(bot)) {
    const user = client.users.cache.get(bot)

    await interaction.deferReply()

    const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

    if (TotalCooldown > 2) { 
          return interaction.editReply({
              embeds: [
                new EmbedBuilder()
                .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                .setColor("Red")
              ]
          })
    } 

    const Payment = client.BotPayment.get(bot.id, "BotPaied")

    if (Payment === false) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
          .setAuthor({ name: `No Payment Set to Start The Bot!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
          .setColor("Red")
        ]
    })
    }
  
    const BotPath = client.RecoverBotHost.get(bot,"BotPath")
    const ShopServer = client.RecoverBotHost.get(bot,"ShopServer")
    const BotOwner = client.RecoverBotHost.get(bot, "BotOwner")
    const BotType = client.RecoverBotHost.get(bot, "BotType")
  
  
    const axios = require("axios")
  
    axios({
      method: 'post',
      url: `${link}/recover/delete`.replace("{shopserver}", ShopServer),
      data: {
        SECRECT: Password, 
        BotName: user.username,
        BotType: BotType
      }
    }).then(res => {
       const resjson = res.data

       client.Cooldowns.ensure(interaction.guild.id, { TotalBots: [] })
       client.Cooldowns.push(interaction.guild.id, bot.id, "TotalBots")

       const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

       client.Cooldowns.set(interaction.guild.id, TotalCooldown + 1, `${bot.id}.Cooldown`)

       if (TotalCooldown == 2) {
         let day = ms('30m');
                                                                                          
         day = Date.now() + day

                         client.Cooldowns.set(interaction.guild.id, day, `${bot.id}.EndCooldown`)

                logs.send({
                       embeds: [
                            new EmbedBuilder()
                           .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1023811852280533043.webp?size=96&quality=lossless" })
                            .setTitle(`Rate Limited until: <t:${Math.floor(day /1000)}> `)
                            .setColor("Red")
                       ],
                       content: `${bot} Reached Rate Limit!`
                })
       }

            if (resjson.sucess == true) {
                      interaction.editReply({
                             content: `<:thumbsup:1006591286867927161> Successfully Removed Recovery: <@!${user.id}>\n> <a:hostemoji:1017081433765990480> Directory: \`${resjson.path}\`\n> <a:hostemoji:1017081433765990480> Server: \`${resjson.HostingServer}\``
                      })
                      client.RecoverBotHost.delete(bot)
            }
    }).catch((e) => {
                  return interaction.editReply({
                         content: `Seems like the Recovery Backup Could not be Found.`
                  })
     })
  } else if (!bots.includes(bot.id)) {
    await interaction.deferReply()
    return interaction.editReply({
      embeds: [
        new EmbedBuilder()
        .setAuthor({ name: `This is Not your Bot`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
        .setColor("Red")
      ]
})
  }
 }

  }
  if (interaction.options.getSubcommand() === 'backup-create') {

    if (isNaN(interaction.options.getString("bot"))) {
      return interaction.reply({ content: `Invaild BotId Provided.` })
}

    if (interaction.options.getString("bot") == "invaild") {
           return interaction.editReply({ content: `You have no discord bots to control.` })
    }

    const bot = client.users.cache.get(interaction.options.getString("bot"))

    client.Bots.ensure(interaction.user.id, {
      Bots: []
})

    const bots = client.Bots.get(interaction.user.id, "Bots") 

    if (!bots.includes(bot.id)) {
      await interaction.deferReply()
      
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
          .setAuthor({ name: `This is Not your Bot`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
          .setColor("Red")
        ]
  })
    }

    const ShopServer = client.Bots.get(bot.id, "ShopServer")
    const BotPath = client.Bots.get(bot.id, "BotPath")
    const BotType = client.Bots.get(bot.id, "BotType")
    const axios = require("axios")

    client.Bots.ensure(bot.id, {
      BackupCodes: [],
     })

     if (client.Bots.get(bot.id, "BackupCodes").length === 5) {
             await interaction.deferReply({ ephemeral: true })
            return interaction.editReply({content: `You have hit the Backup Limit \`5\`, Delete a Backup to Create Another one`, ephemeral: true})
     }

     await interaction.deferReply()

     const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

     if (TotalCooldown > 2) { 
           return interaction.editReply({
               embeds: [
                 new EmbedBuilder()
                 .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                 .setColor("Red")
               ]
           })
     } 

     const Payment = client.BotPayment.get(bot.id, "BotPaied")

     if (Payment === false) {
       return interaction.editReply({
         embeds: [
           new EmbedBuilder()
           .setAuthor({ name: `No Payment Set to Start The Bot!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
           .setColor("Red")
         ]
     })
     }

    axios({
      method: 'post',
      url: `${link}/backup/create`.replace("{shopserver}", ShopServer),
      data: {
        SECRECT: Password, 
        BotPath: BotPath,
        BotType: BotType,
        BotID: bot.id,
      }
    }).then(res => {
       const resjson = res.data
            if (resjson.sucess == true) {

              client.Cooldowns.ensure(interaction.guild.id, { TotalBots: [] })
              client.Cooldowns.push(interaction.guild.id, bot.id, "TotalBots")

              const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

              client.Cooldowns.set(interaction.guild.id, TotalCooldown + 1, `${bot.id}.Cooldown`)

              if (TotalCooldown == 2) {
                let day = ms('30m');
                                                                                                 
                day = Date.now() + day

                                client.Cooldowns.set(interaction.guild.id, day, `${bot.id}.EndCooldown`)

                logs.send({
                       embeds: [
                            new EmbedBuilder()
                           .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1023811852280533043.webp?size=96&quality=lossless" })
                            .setTitle(`Rate Limited until: <t:${Math.floor(day /1000)}> `)
                            .setColor("Red")
                       ],
                       content: `${bot} Reached Rate Limit!`
                })
              }

                interaction.editReply({ content: `<:thumbsup:1006591286867927161> Succesfully Created Backup: <@!${bot.id}>\n> <:File:1014929984969785424> Directory: \`${resjson.BackupPath}\`\n> <:BACKUP:1015239765811003392> Code: \`${resjson.Backupcode}\` \n> <a:hostemoji:1017081433765990480> Server: \`${resjson.HostingServer}\`` })
                
                client.Bots.ensure(bot.id, {
                    BackupCodes: [],
                    
            })
                  client.Bots.push(bot.id,  resjson.Backupcode, "BackupCodes")
            }
    })
  }
  if (interaction.options.getSubcommand() === 'backup-delete') {

    if (isNaN(interaction.options.getString("bot"))) {
      return interaction.reply({ content: `Invaild BotId Provided.` })
}

    await interaction.deferReply()

    if (interaction.options.getString("bot") == "invaild") {
           return interaction.editReply({ content: `You have no discord bots to control.` })
    }

    const bot = client.users.cache.get(interaction.options.getString("bot"))

    client.Bots.ensure(interaction.user.id, {
      Bots: []
})

    const bots = client.Bots.get(interaction.user.id, "Bots") 

    if (!bots.includes(bot.id)) {      
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
          .setAuthor({ name: `This is Not your Bot`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
          .setColor("Red")
        ]
  })
    }

    const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

    if (TotalCooldown > 2) { 
          return interaction.editReply({
              embeds: [
                new EmbedBuilder()
                .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                .setColor("Red")
              ]
          })
    } 

    const Payment = client.BotPayment.get(bot.id, "BotPaied")

    if (Payment === false) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
          .setAuthor({ name: `No Payment Set to Start The Bot!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
          .setColor("Red")
        ]
    })
    }

    const code = interaction.options.getString("code")

    const ShopServer = client.Bots.get(bot.id, "ShopServer")
    const BotPath = client.Bots.get(bot.id, "BotPath")
    const BotType = client.Bots.get(bot.id, "BotType")

    client.Bots.ensure(bot.id, {
        BackupCodes: [],
    })
  
    const backups = client.Bots.get(bot.id, "BackupCodes")
    
    if (!backups.includes(code)) {
            return interaction.editReply({ content: `Backup is not in the Bot` })
    }

    const axios = require("axios")

    axios({
      method: 'post',
      url: `${link}/backup/delete`.replace("{shopserver}", ShopServer),
      data: {
        SECRECT: Password, 
        BotPath: BotPath,
        BackupCode: code,
        BotType: BotType,
        BotID: bot.id,
      }
    }).then(res => {
       const resjson = res.data

       client.Cooldowns.ensure(interaction.guild.id, { TotalBots: [] })
       client.Cooldowns.push(interaction.guild.id, bot.id, "TotalBots")

       const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

       client.Cooldowns.set(interaction.guild.id, TotalCooldown + 1, `${bot.id}.Cooldown`)

       if (TotalCooldown == 2) {
         let day = ms('30m');
                                                                                          
         day = Date.now() + day

                         client.Cooldowns.set(interaction.guild.id, day, `${bot.id}.EndCooldown`)

                logs.send({
                       embeds: [
                            new EmbedBuilder()
                           .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1023811852280533043.webp?size=96&quality=lossless" })
                            .setTitle(`Rate Limited until: <t:${Math.floor(day /1000)}> `)
                            .setColor("Red")
                       ],
                       content: `${bot} Reached Rate Limit!`
                })
       }

            if (resjson.sucess == true) {
                interaction.editReply({ content: `<:thumbsup:1006591286867927161> Succesfully Deleted Backup: <@${bot.id}> (\`${bot.username} | ${bot.tag}\`)\n> <:File:1014929984969785424> Path: \`${resjson.BackupPath}\`\n> <:BACKUP:1015239765811003392> Code: \`${code}\` \n> <a:hostemoji:1017081433765990480> Server: \`${resjson.HostingServer}\`` })
                
                client.Bots.ensure(bot.id, {
                        BackupCodes: [],
                })
                client.Bots.remove(bot.id,  code, "BackupCodes")
            }
    })
  }
  if (interaction.options.getSubcommand() === 'backup-load') {
    if (isNaN(interaction.options.getString("bot"))) {
      return interaction.reply({ content: `Invaild BotId Provided.` })
}

    await interaction.deferReply()

    if (interaction.options.getString("bot") == "invaild") {
           return interaction.editReply({ content: `You have no discord bots to control.` })
    }

    const bot = client.users.cache.get(interaction.options.getString("bot"))

    client.Bots.ensure(interaction.user.id, {
      Bots: []
})

    const bots = client.Bots.get(interaction.user.id, "Bots") 

    if (!bots.includes(bot.id)) {
      await interaction.deferReply()
      
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
          .setAuthor({ name: `This is Not your Bot`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
          .setColor("Red")
        ]
  })
    }

    const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

    if (TotalCooldown > 2) { 
          return interaction.editReply({
              embeds: [
                new EmbedBuilder()
                .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
                .setColor("Red")
              ]
          })
    } 

    const Payment = client.BotPayment.get(bot.id, "BotPaied")

    if (Payment === false) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
          .setAuthor({ name: `No Payment Set to Start The Bot!`, iconURL: "https://cdn.discordapp.com/emojis/1015780982420406312.webp?size=96&quality=lossless" })
          .setColor("Red")
        ]
    })
    }
    
    const code = interaction.options.getString("code")

    const ShopServer = client.Bots.get(bot.id, "ShopServer")
    const BotPath = client.Bots.get(bot.id, "BotPath")
    const BotType = client.Bots.get(bot.id, "BotType")

    client.Bots.ensure(bot.id, {
        BackupCodes: [],
    })

    const backups = client.Bots.get(bot.id, "BackupCodes")
    
    if (!backups.includes(code)) {
            return interaction.editReply({ content: `Backup is not in the Bot` })
    }

    const axios = require("axios")

    axios({
      method: 'post',
      url: `${link}/backup/load`.replace("{shopserver}", ShopServer),
      data: {
        SECRECT: Password, 
        BotPath: BotPath,
        BackupCode: code,
        BotType: BotType,
        BotID: bot.id,
      }
    }).then(res => {
       const resjson = res.data

       client.Cooldowns.ensure(interaction.guild.id, { TotalBots: [] })
       client.Cooldowns.push(interaction.guild.id, bot.id, "TotalBots")

       const TotalCooldown = client.Cooldowns.get(interaction.guild.id, `${bot.id}.Cooldown`) || 0

       client.Cooldowns.set(interaction.guild.id, TotalCooldown + 1, `${bot.id}.Cooldown`)

       if (TotalCooldown == 2) {
         let day = ms('30m');
                                                                                          
         day = Date.now() + day

                         client.Cooldowns.set(interaction.guild.id, day, `${bot.id}.EndCooldown`)

                logs.send({
                       embeds: [
                            new EmbedBuilder()
                           .setAuthor({ name: `This Bot Has Reached Rate Limit!`, iconURL: "https://cdn.discordapp.com/emojis/1023811852280533043.webp?size=96&quality=lossless" })
                            .setTitle(`Rate Limited until: <t:${Math.floor(day /1000)}> `)
                            .setColor("Red")
                       ],
                       content: `${bot} Reached Rate Limit!`
                })
       }

            if (resjson.sucess == true) {
                interaction.editReply({ content: `<:thumbsup:1006591286867927161> Succesfully Loaded Backup: <@${bot.id}> (\`${bot.username} | ${bot.tag}\`)\n> <:File:1014929984969785424> Directory: \`${resjson.BackupPath}\`\n> <a:Bot:1015746519212765195> Bot Directory: \`${BotPath}\`\n> <:BACKUP:1015239765811003392> Loaded: \`${code}\` \n> <a:hostemoji:1017081433765990480> Server: \`${resjson.HostingServer}\`` })
                
                client.Bots.set(bot.id, code , "BackupLoaded")
            }
    })
  }
 }
 
 module.exports.conf = {
      Prefix: {
         aliases: [],
         enabled: true,
         ownerOnly: true,
         AdminOnly: false,
         userPermissions: []   
      },
      Slash: {
         enabled: true,
         ownerOnly: false,
         AdminOnly: false,
         userPermissions: [],
         timeout: 5,
      }
 }
 
 module.exports.help = {
       Prefix: {
         name: "botshop",
         category: "botshop",
         cooldown: 2,
         usage: "<command>",
         description: "run the bot shop commands",
       },
       Slash: {
         name: "botshop",
         description: "run bot shop commands",
         category: "botshop",
         options: [
          {
            name: "backup-create",
            description: "create a backup",    
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `bot`,
                    description: `bot to create backup`,
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true
                 },
            ]

          },
          {
            name: "backup-delete",
            description: "delete a backup",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: `bot`,
                description: `bot to delete backup`,
                type: ApplicationCommandOptionType.String,
                required: true,
                autocomplete: true
             },
             {
                name: `code`,
                description: `code of the backup`,
                type: ApplicationCommandOptionType.String,
                required: true,
             },
            ]
          },
          {
            name: "backup-load",
            description: "load a backup",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
              {
                name: `bot`,
                description: `bot to load backup`,
                type: ApplicationCommandOptionType.String,
                required: true,
                autocomplete: true
             },
             {
                name: `code`,
                description: `code of the backup`,
                type: ApplicationCommandOptionType.String,
                required: true,
             },
            ]
          },
          {
            name: "paybot",
            description: "pay your discord bot",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `bot`,
                    description: `bot to pay`,
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true
                 },
            ]
          },
          {
            name: "autopayment",
            description: "turn on auto payment",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `enable`,
                    description: `enable or disable auto payment`,
                    type: ApplicationCommandOptionType.Boolean,
                    required: true,
                 },
            ]
          },
              {
                name: "start",
                description: "start the bot",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                  {
                    name: `bot`,
                    description: `bot to control`,
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true
                 },
                ]
              },
              {
                name: "stop",
                description: "stop the bot",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                  {
                    name: `bot`,
                    description: `bot to control`,
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true
                 },
                ]
              },
              {
                name: "bots",
                description: "how many bots a user owned",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                  {
                    name: `user`,
                    description: `user to see all bots`,
                    type: ApplicationCommandOptionType.User,
                    required: false,
                 },
                ]
              },
              {
                name: "restart",
                description: "restart the bot",
                type: ApplicationCommandOptionType.Subcommand,

                options: [
                  {
                    name: `bot`,
                    description: `bot to control`,
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true
                 },
                ]
              },

              {
                name: "recover",
                description: "recover the bot",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                  {
                    name: `shop-bot`,
                    description: `Please Enter the Bot You Want to Recover.`,
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true
                 },
                ]
              },

              {
                name: "remove-recover",
                description: "Remove the recover Backup.",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                  {
                    name: `shop-bot`,
                    description: `Please Enter the Bot You Want to Remove the Backup.`,
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true
                 },
                ]
              },
              // {
              //   name: "changeembed",
              //   description: "changeembeds of  the bot",
              //   type: ApplicationCommandOptionType.Subcommand,
              // },
              // {
              //   name: "changestatus",
              //   description: "changestatus of the bot",
              //   type: ApplicationCommandOptionType.Subcommand,
              // },
              {
                name: "delete",
                description: "delete the bot",
                type: ApplicationCommandOptionType.Subcommand,

                options: [
                  {
                    name: `bot`,
                    description: `bot to control`,
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true
                 },
                ]

              },
              // {
              //   name: "move",
              //   description: "move the bot",
              //   type: ApplicationCommandOptionType.Subcommand,
              // }
        ]
       }
 }

 /**
 * bot Start
 * bot stop
 * bot restartbot
 * bot upgrade
 * bot status
 * bot change
 * bot changeembed
 * bot changestatus
 * bot delete
 * bot move
 */ 