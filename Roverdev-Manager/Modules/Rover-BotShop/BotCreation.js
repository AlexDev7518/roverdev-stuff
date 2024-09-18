const { Events, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, BaseSelectMenuBuilder, StringSelectMenuBuilder, ActionRow, ModalBuilder, TextInputBuilder, TextInputStyle, Client, GatewayIntentBits, MessageType, Partials, Colors, AttachmentBuilder } = require("discord.js")
const { EmbedColor } = require("../../Configuration/EmbedConfig")
const { DefaultEmojis, ShopEmojis } = require("../../Configuration/EmojiConfig")
const { Bots, Hosting } = require("../../Configuration/ShopConfig/ShopBots")
const { CategoryConfig, OverFlow, EmojiConfig } = require("../../Configuration/ShopConfig/ShopConfiguration")
const Coupons = require("../../Databases/Schema/Coupons")
const Premium = require("../../Databases/Schema/Premium")
const Racks = require("../../Databases/Schema/Racks")
const FreeRack = require("../../Databases/Schema/Racks/Free-Rack")
const balance = require("../../Databases/Schema/RoverCoins/balance")
const TotalCoins = require("../../Databases/Schema/RoverCoins/TotalCoins")
const BotConfig = require("../../Databases/Schema/Shop/BotConfig")
const CreatingBot = require("../../Databases/Schema/Shop/CreatingBot")
const LockCreation = require("../../Databases/Schema/Shop/LockCreation")
const ShopRules = require("../../Databases/Schema/Shop/Rules")
const ShopCreation = require("../../Databases/Schema/Shop/ShopCreation")
const TotalBots = require("../../Databases/Schema/Shop/TotalBots")
const { CreateFolder, FolderExists, UploadFolder, RunCommand, UploadFile, StartBot } = require("./Functions")
const { ShopServers } = require("./Server/Config")
// const { Roverdev } = require("../../../main")

module.exports = async (Roverdev) => {
       Roverdev.on(Events.InteractionCreate, async interaction => {
              if (interaction.customId == "Shop-Bots") {


                     let Value = `${interaction.values}`.replace("-", "")

                     let Category = `${CategoryConfig[Value]}`

                     let CategoryValue = Roverdev.channels.cache.get(Category)
                     let CreationOverFlow1 = Roverdev.channels.cache.get(OverFlow.CreationOverFlow1)
                     let CreationOverFlow2 = Roverdev.channels.cache.get(OverFlow.CreationOverFlow2)

                     if (CategoryValue && CategoryValue.children.cache.size < 50) {
                            Category = CategoryConfig[Value]
                     } else if (CreationOverFlow1 && CreationOverFlow1.children.cache.size < 50) {
                            Category = CreationOverFlow1.id
                     } else if (CreationOverFlow2 && CreationOverFlow2.children.cache.size < 50) {
                            Category = CreationOverFlow2.id
                     }

                     const data = await ShopCreation.findOne({
                            BotOwner: interaction.user.id
                     })

                     if (data) return interaction.reply({ content: `Seems you already have a creation open! <#${data.Channel}>`, ephemeral: true })


                     await interaction.reply({
                            content: `${EmojiConfig[Value]} ***Now Opening a ${Value == "MusicBot2" ? `24-7 Music` : interaction.values}...***`,
                            ephemeral: true
                     })


                     interaction.guild.channels.create({
                            name: `${EmojiConfig[Value]}╎${interaction.user.username}`,
                            parent: Category,
                            topic: `${interaction.user.username} | Type: ${interaction.values} | Status: Creating`,
                            permissionOverwrites: [
                                   {
                                          id: interaction.user.id,
                                          allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory],
                                          deny: [PermissionFlagsBits.SendMessages]
                                   },
                                   {
                                          id: interaction.guild.roles.everyone,
                                          deny: [PermissionFlagsBits.ViewChannel]
                                   },
                                   {
                                          id: "1005978927421980702",
                                          allow: [PermissionFlagsBits.ViewChannel],
                                          deny: [PermissionFlagsBits.SendMessages]
                                   },
                            ]
                     }).then(async function (channel) {
                            const ShopRulesData = await ShopRules.findOne({ Author: interaction.user.id })
                            interaction.editReply({
                                   embeds: [
                                          new EmbedBuilder()
                                                 .setTitle(`${EmojiConfig[Value]} Your Creation \`${channel.name}\` has been created`)
                                                 .setDescription(`\n> Creation Channel: ${channel}`)
                                                 .setColor(EmbedColor)
                                   ],
                                   content: `<a:RoverdevSuccess:1058275136786149386> Successfully Created Your \`${interaction.values}\` Ticket!`
                            })

                            const CreationChannel = Roverdev.channels.cache.get("1064967980376666142")

                            CreationChannel.send({
                                   embeds: [
                                          new EmbedBuilder()
                                                 .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                 .setColor(EmbedColor)
                                                 .setDescription(`***Creation Has Been Opened***\n> - Author: ${interaction.user}\n> - Channel: ${channel}\n> - Bot Type: \`${Value == "MusicBot2" ? `24-7 Music` : interaction.values[0]}\``)
                                   ]
                            })

                            const data = await ShopCreation.create({
                                   Channel: channel.id,
                                   BotType: Value == "MusicBot2" ? `24-7 Music` : interaction.values[0],
                                   BotOwner: interaction.user.id
                            })

                            data.save()

                            if (ShopRulesData?.AcceptRules == false || ShopRulesData == null) {

                                   const ms = require("ms")

                                   let CloseCreation = ms(`10min`)

                                   CloseCreation = Date.now() + CloseCreation

                                   const data1 = await LockCreation.findOne({ Channel: interaction.channel.id })

                                   if (!data1) {
                                          await LockCreation.create({
                                                 Channel: channel.id,
                                                 LockCreationTime: CloseCreation
                                          })
                                   }

                                   if (data1) {
                                          await LockCreation.findOneAndUpdate({ Channel: channel.id }, { $set: { LockCreationTime: CloseCreation } })
                                   }

                                   channel.send({
                                          embeds: [
                                                 new EmbedBuilder()
                                                        .setAuthor({ name: `Shop Rules | ${Roverdev.user.username}`, iconURL: Roverdev.user.displayAvatarURL() })
                                                        .setColor(EmbedColor)
                                                        .setTitle("<:Rules:1058193155436064939> Shop Rules & Information")
                                                        .setDescription(`***__Terms of use:__***\n\n **Token**\n> We Save your Bot token in the Shop-Bot Vps in the config file of your Bot, We will not look at your token or do anything with it, we keep it secure and safe\n\n**Shop Rules**\n> 1) if you leave the server your bot will be deleted\n> 2) if you fail to pay your bot it will get shut down you will have (3 days) to keep it online\n> 3) If you break the shop rules it will be deleted\n> 4) if you reset your bot token we will delete your bot and give you a warning in the server\n\n***After accepting these rules and if you break one of them you will be blacklisted from using our system.***\n> If you don't answer <t:${Math.floor(CloseCreation / 1000)}:R> Creation will be closed`)
                                          ],
                                          components: [
                                                 new ActionRowBuilder().addComponents(
                                                        new ButtonBuilder().setCustomId("Accept-ShopRules").setStyle(ButtonStyle.Success).setLabel("Accept"),
                                                        new ButtonBuilder().setCustomId("Decline-ShopRules").setStyle(ButtonStyle.Success).setLabel("Decline")
                                                 )
                                          ],
                                          content: `${interaction.user} Please Read and Accept these rules before contiune creating`
                                   })
                            }

                            if (ShopRulesData?.AcceptRules == true) {

                                   const embed = new EmbedBuilder()
                                          .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                          .setColor(EmbedColor)
                                          .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: <:blank:1032239573054537798>\n> Provide Rack Selection: <:blank:1032239573054537798>\n> Provide Payment-Type: <:blank:1032239573054537798>\n> Provide CreationType: <:blank:1032239573054537798>\n> Hosting Customization: <:blank:1032239573054537798>\n> Bot Customization: <:blank:1032239573054537798>\n\n***Extra Steps (Optional):***\n> Provide Coupon: <:blank:1032239573054537798>\n> Premium Enable: <:blank:1032239573054537798>\n\n***Bot-Creation Data***\n> Provide Bot Token: <:blank:1032239573054537798>\n> Provide Bot Prefix: <:blank:1032239573054537798>\n> Provide Status: <:blank:1032239573054537798>\n> Provide Status Name: <:blank:1032239573054537798>\n> Provide Status Type: <:blank:1032239573054537798> `)
                                          .setThumbnail(Roverdev.user.displayAvatarURL())

                                   const row1 = new ActionRowBuilder()
                                          .addComponents(
                                                 new ButtonBuilder()
                                                        .setLabel("Close")
                                                        .setCustomId("Close-Creation")
                                                        .setEmoji("1058276994250461254")
                                                        .setStyle(ButtonStyle.Danger)
                                          )

                                   await channel.messages.fetch().then(async msg => {
                                          msg.forEach(message => {
                                                 interaction.channel.messages.fetch(message.id).then((msgdelete) => {
                                                        msgdelete.delete()
                                                 })
                                          });
                                   })

                                   let ShopData = await ShopCreation.findOne({ Channel: channel.id })

                                   const row = new ActionRowBuilder()
                                          .addComponents(
                                                 new StringSelectMenuBuilder()
                                                        .setCustomId("Shop-Bots")
                                                        .setPlaceholder("Select To Create a Bot")
                                                        .setDisabled(ShopData.BotType !== null ? true : false)
                                                        .setOptions(
                                                               Bots.map(m => {
                                                                      return {
                                                                             label: m.label,
                                                                             value: m.value,
                                                                             description: m.description,
                                                                             emoji: m.emoji
                                                                      }
                                                               })
                                                        )
                                          )

                                   const SelectBotEmbed = new EmbedBuilder()
                                          .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                          .setColor(EmbedColor)
                                          .setTitle(`__***Please Select Your Bot Type***__`)

                                   setTimeout(() => {
                                          channel.send({
                                                 embeds: [embed],
                                                 components: [row1],
                                                 content: `${interaction.user} Here is your ${Value == "MusicBot2" ? `24-7 Music` : interaction.values} Creation`
                                          }).then(async (msg) => {
                                                 msg.pin()
                                                 await ShopCreation.findOneAndUpdate({ Channel: channel.id }, { $set: { PartsEmbed: msg.id } })
                                          })
                                          setTimeout(() => {
                                                 channel.send({
                                                        embeds: [SelectBotEmbed],
                                                        components: [row],
                                                        content: `${interaction.user} Please provide your bot Type`
                                                 }).then((msg) => {
                                                        msg.edit({ content: `${DefaultEmojis.BotLoading} System processing...` })

                                                        setTimeout(async () => {
                                                               let RackNumberFree = await FreeRack.findOne({ Author: interaction.user.id })
                                                               if (!RackNumberFree) {
                                                                      const dataFree = await FreeRack.create({
                                                                             Author: interaction.user.id
                                                                      })
                                                                      dataFree.save()

                                                                      RackNumberFree = await FreeRack.findOne({ Author: interaction.user.id })
                                                               }

                                                               let TotalRacks = await Racks.findOne({ Author: interaction.user.id })

                                                               if (!TotalRacks) {
                                                                      const data = await Racks.create({
                                                                             Author: interaction.user.id
                                                                      })
                                                                      data.save()

                                                                      TotalRacks = await Racks.findOne({ Author: interaction.user.id })
                                                               }

                                                               let array = TotalRacks.TotalRacks
                                                               array.push("Free-Rack")

                                                               if (!TotalRacks.TotalRacks.includes("Free-Rack")) await Racks.findOneAndUpdate({ Author: interaction.user.id }, { $set: { TotalRacks: array } })


                                                               if (RackNumberFree.TotalBots.length < 1) {
                                                                      await ShopCreation.findOneAndUpdate({ Channel: channel.id }, { $set: { HostingCustomization: "Free-Bot", HostingDuration: "Free-Bot", BotCustomize: "Free-Bot", RackSelection: "Free-Rack", PaymentType: "Free-Bot", Coupon: "Disabled (Free-Bot)" } })
                                                                      ShopData = await ShopCreation.findOne({ Channel: channel.id })

                                                                      channel.messages.fetch(ShopData.PartsEmbed).then(async (msg) => {
                                                                             const embed = new EmbedBuilder()
                                                                                    .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                                                    .setColor(EmbedColor)
                                                                                    .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopData.BotType}\`)\n> Provide Rack Selection: ${ShopEmojis.ShopPassed} (\`${ShopData.RackSelection}\`)\n> Provide Payment-Type: ${ShopEmojis.ShopPassed} (\`${ShopData.PaymentType}\`)\n> Provide CreationType: <:blank:1032239573054537798>\n> Hosting Customization: ${ShopEmojis.ShopPassed} (\`${ShopData.HostingCustomization}\`)\n> Bot Customization: ${ShopEmojis.ShopPassed} (\`${ShopData.BotCustomize}\`)\n\n***Extra Steps (Optional):***\n> Provide Coupon: ${ShopEmojis.ShopFailed} (\`${ShopData.Coupon}\`)\n> Premium Enable: <:blank:1032239573054537798>\n\n***Bot-Creation Data***\n> Provide Bot Token: <:blank:1032239573054537798>\n> Provide Bot Prefix: <:blank:1032239573054537798>\n> Provide Status: <:blank:1032239573054537798>\n> Provide Status Name: <:blank:1032239573054537798>\n> Provide Status Type: <:blank:1032239573054537798> `)
                                                                                    .setThumbnail(Roverdev.user.displayAvatarURL())

                                                                             msg.edit({ embeds: [embed] })
                                                                      })

                                                                      SelectBotEmbed.setColor("Green")

                                                                      msg.edit({ content: `***${ShopEmojis.ShopPassed} Successfully Selected: \`${ShopData.BotType}\`***`, embeds: [SelectBotEmbed] })

                                                                      const PremiumEnabled = await Premium.findOne({ Author: interaction.user.id })

                                                                      if (PremiumEnabled?.PremiumStatus == false || !PremiumEnabled) {
                                                                             await ShopCreation.findOneAndUpdate({ Channel: channel.id }, { $set: { Premium: false } })
                                                                             ShopData = await ShopCreation.findOne({ Channel: channel.id })
                                                                             channel.messages.fetch(ShopData.PartsEmbed).then((msg) => {
                                                                                    const embed = new EmbedBuilder()
                                                                                           .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                                                           .setColor(EmbedColor)
                                                                                           .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopData.BotType}\`)\n> Provide Rack Selection: ${ShopEmojis.ShopPassed} (\`${ShopData.RackSelection}\`)\n> Provide Payment-Type: ${ShopEmojis.ShopPassed} (\`${ShopData.PaymentType}\`)\n> Provide CreationType: <:blank:1032239573054537798>\n> Hosting Customization: ${ShopEmojis.ShopPassed} (\`${ShopData.HostingCustomization}\`)\n> Bot Customization: ${ShopEmojis.ShopPassed} (\`${ShopData.BotCustomize}\`)\n\n***Extra Steps (Optional):***\n> Provide Coupon: ${ShopEmojis.ShopFailed} (\`${ShopData.Coupon}\`)\n> Premium Enable: ${ShopEmojis.ShopFailed} (\`${ShopData.Premium}\`)\n\n***Bot-Creation Data***\n> Provide Bot Token: <:blank:1032239573054537798>\n> Provide Bot Prefix: <:blank:1032239573054537798>\n> Provide Status: <:blank:1032239573054537798>\n> Provide Status Name: <:blank:1032239573054537798>\n> Provide Status Type: <:blank:1032239573054537798> `)
                                                                                           .setThumbnail(Roverdev.user.displayAvatarURL())

                                                                                    msg.edit({ embeds: [embed] })
                                                                             })

                                                                             const Row = new ActionRowBuilder()
                                                                                    .addComponents(
                                                                                           new StringSelectMenuBuilder()
                                                                                                  .setCustomId("Creation-Type")
                                                                                                  .setDisabled(false)
                                                                                                  .setPlaceholder("Please Select Your Creation Type")
                                                                                                  .addOptions(
                                                                                                         {
                                                                                                                label: "Dms",
                                                                                                                value: "dms-creation",
                                                                                                                description: "Create the bot in DMS",
                                                                                                                emoji: "1025670157625983067"
                                                                                                         },
                                                                                                         {
                                                                                                                label: "Modal",
                                                                                                                value: "Modal-creation",
                                                                                                                description: "Create the bot Using Modals",
                                                                                                                emoji: "1015835459978526720"
                                                                                                         },
                                                                                                  )
                                                                                    )

                                                                             msg.reply({
                                                                                    embeds: [
                                                                                           new EmbedBuilder()
                                                                                                  .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                                                                  .setColor(EmbedColor)
                                                                                                  .setTitle(`__***Please Select Your Creation Type***__`)
                                                                                    ], components: [Row]
                                                                             })
                                                                      } else if (PremiumEnabled?.PremiumStatus == true) {
                                                                             await ShopCreation.findOneAndUpdate({ Channel: channel.id }, { $set: { Premium: true } })

                                                                             ShopData = await ShopCreation.findOne({ Channel: channel.id })
                                                                             channel.messages.fetch(ShopData.PartsEmbed).then((msg) => {
                                                                                    const embed = new EmbedBuilder()
                                                                                           .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                                                           .setColor(EmbedColor)
                                                                                           .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopData.BotType}\`)\n> Provide Rack Selection: ${ShopEmojis.ShopPassed} (\`${ShopData.RackSelection}\`)\n> Provide Payment-Type: ${ShopEmojis.ShopPassed} (\`${ShopData.PaymentType}\`)\n> Provide CreationType: <:blank:1032239573054537798>\n> Hosting Customization: ${ShopEmojis.ShopPassed} (\`${ShopData.HostingCustomization}\`)\n> Bot Customization: ${ShopEmojis.ShopPassed} (\`${ShopData.BotCustomize}\`)\n\n***Extra Steps (Optional):***\n> Provide Coupon: ${ShopEmojis.ShopFailed} (\`${ShopData.Coupon}\`)\n> Premium Enable: ${ShopEmojis.ShopPassed} (\`${ShopData.Premium}\`)\n\n***Bot-Creation Data***\n> Provide Bot Token: <:blank:1032239573054537798>\n> Provide Bot Prefix: <:blank:1032239573054537798>\n> Provide Status: <:blank:1032239573054537798>\n> Provide Status Name: <:blank:1032239573054537798>\n> Provide Status Type: <:blank:1032239573054537798> `)
                                                                                           .setThumbnail(Roverdev.user.displayAvatarURL())

                                                                                    msg.edit({ embeds: [embed] })
                                                                             })

                                                                             const Row = new ActionRowBuilder()
                                                                                    .addComponents(
                                                                                           new StringSelectMenuBuilder()
                                                                                                  .setCustomId("Creation-Type")
                                                                                                  .setDisabled(false)
                                                                                                  .setPlaceholder("Please Select Your Creation Type")
                                                                                                  .addOptions(
                                                                                                         {
                                                                                                                label: "Dms",
                                                                                                                value: "dms-creation",
                                                                                                                description: "Create the bot in DMS",
                                                                                                                emoji: "1025670157625983067"
                                                                                                         },
                                                                                                         {
                                                                                                                label: "Modal",
                                                                                                                value: "Modal-creation",
                                                                                                                description: "Create the bot Using Modals",
                                                                                                                emoji: "1015835459978526720"
                                                                                                         },
                                                                                                  )
                                                                                    )

                                                                             msg.reply({
                                                                                    embeds: [
                                                                                           new EmbedBuilder()
                                                                                                  .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                                                                  .setColor(EmbedColor)
                                                                                                  .setTitle(`__***Please Select Your Creation Type***__`)
                                                                                    ], components: [Row]
                                                                             })
                                                                      }

                                                                      await ShopCreation.findOneAndUpdate({ Channel: channel.id }, {
                                                                             $set: {
                                                                                    BotCreationType: "Free-Bot"
                                                                             }
                                                                      })

                                                               } else if (RackNumberFree.TotalBots.length > 0) {
                                                                      console.log(`Moving steps on...`)

                                                                      await ShopCreation.findOneAndUpdate({ Channel: channel.id }, {
                                                                             $set: {
                                                                                    BotCreationType: "Payed-Bot"
                                                                             }
                                                                      })

                                                                      let TotalRacks = await Racks.findOne({ Author: interaction.user.id })


                                                                      if (!TotalRacks) {
                                                                             await Racks.create({ Author: interaction.user.id })
                                                                             TotalRacks = await Racks.findOne({ Author: interaction.user.id })
                                                                      }


                                                                      if (TotalRacks.TotalRacks.length < 2) {
                                                                             msg.edit({ content: `***${ShopEmojis.ShopPassed} Successfully Selected: \`${ShopData.BotType}\`***`, embeds: [SelectBotEmbed] })
                                                                             msg.reply({
                                                                                    components: [row], embeds: [new EmbedBuilder()
                                                                                           .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                                                           .setColor(EmbedColor)
                                                                                           .setTitle("Seems you don't have another Free-rack!")
                                                                                           .setDescription(`Go to <#1040954527270043718> and do rd!createrack`)]
                                                                             })


                                                                             const ShopCreationData1 = await ShopCreation.findOne({ Channel: channel.id })

                                                                             channel.messages.fetch(ShopCreationData1.PartsEmbed).then(async (msg) => {
                                                                                    const embed = new EmbedBuilder()
                                                                                           .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                                                           .setColor(EmbedColor)
                                                                                           .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopData.BotType}\`)\n> Provide Rack Selection: ${DefaultEmojis.BotLoading}\n> Provide Payment-Type: <:blank:1032239573054537798>\n> Provide CreationType: <:blank:1032239573054537798>\n> Hosting Customization: <:blank:1032239573054537798>\n> Bot Customization: <:blank:1032239573054537798>\n\n***Extra Steps (Optional):***\n> Provide Coupon: <:blank:1032239573054537798>\n> Premium Enable: <:blank:1032239573054537798>\n\n***Bot-Creation Data***\n> Provide Bot Token: <:blank:1032239573054537798>\n> Provide Bot Prefix: <:blank:1032239573054537798>\n> Provide Status: <:blank:1032239573054537798>\n> Provide Status Name: <:blank:1032239573054537798>\n> Provide Status Type: <:blank:1032239573054537798> `)
                                                                                           .setThumbnail(Roverdev.user.displayAvatarURL())

                                                                                    msg.edit({ embeds: [embed] })
                                                                             })
                                                                      } else if (TotalRacks.TotalRacks.length > 1) {

                                                                             const array = TotalRacks.TotalRacks

                                                                             TotalRacks.TotalRacks.forEach(m => {
                                                                                    if (m == "Free-Rack") {
                                                                                           const index = array.indexOf("Free-Rack")
                                                                                           array.splice(index, 1)
                                                                                    }
                                                                             })


                                                                             const row = new ActionRowBuilder()
                                                                                    .addComponents(
                                                                                           new StringSelectMenuBuilder()
                                                                                                  .setCustomId("Rack-Selector")
                                                                                                  .setPlaceholder("Please select a rack!")
                                                                                                  .setOptions(
                                                                                                         array.map(m => {
                                                                                                                return {
                                                                                                                       label: `Select ${m}`,
                                                                                                                       value: m,
                                                                                                                }
                                                                                                         })
                                                                                                  )
                                                                                    )

                                                                             const embed = new EmbedBuilder()
                                                                                    .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                                                    .setColor(EmbedColor)
                                                                                    .setTitle("__***Please Select a System Rack***__")

                                                                             SelectBotEmbed.setColor("Green")

                                                                             msg.edit({ content: `***${ShopEmojis.ShopPassed} Successfully Selected: \`${ShopData.BotType}\`***`, embeds: [SelectBotEmbed] })
                                                                             msg.reply({ components: [row], embeds: [embed] })


                                                                             const ShopCreationData1 = await ShopCreation.findOne({ Channel: channel.id })

                                                                             channel.messages.fetch(ShopCreationData1.PartsEmbed).then(async (msg) => {
                                                                                    const embed = new EmbedBuilder()
                                                                                           .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                                                           .setColor(EmbedColor)
                                                                                           .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopData.BotType}\`)\n> Provide Rack Selection: ${DefaultEmojis.BotLoading}\n> Provide Payment-Type: <:blank:1032239573054537798>\n> Provide CreationType: <:blank:1032239573054537798>\n> Hosting Customization: <:blank:1032239573054537798>\n> Bot Customization: <:blank:1032239573054537798>\n\n***Extra Steps (Optional):***\n> Provide Coupon: <:blank:1032239573054537798>\n> Premium Enable: <:blank:1032239573054537798>\n\n***Bot-Creation Data***\n> Provide Bot Token: <:blank:1032239573054537798>\n> Provide Bot Prefix: <:blank:1032239573054537798>\n> Provide Status: <:blank:1032239573054537798>\n> Provide Status Name: <:blank:1032239573054537798>\n> Provide Status Type: <:blank:1032239573054537798> `)
                                                                                           .setThumbnail(Roverdev.user.displayAvatarURL())

                                                                                    msg.edit({ embeds: [embed] })
                                                                             })
                                                                      }
                                                               }
                                                        }, 3500);
                                                 })
                                          }, 1000);
                                   }, 1000);
                            }
                     })
              }
              if (interaction.customId == "Decline-ShopRules") {
                     let ShopData = await ShopCreation.findOne({ Channel: interaction.channel.id })

                     if (interaction.user.id !== ShopData.BotOwner) return interaction.reply({ content: `Only <@${ShopData.BotOwner}> Can Select this button...`, ephemeral: true })


                     await interaction.reply({ content: `${DefaultEmojis.BotSuccess} You Declined the rules of Shop Rules... (You May open a ticket and get it removed!)`, ephemeral: true })

                     await interaction.user.send({ content: `Hi, It seems you declined the shop rules if you decided to change your mind you may go back and accept it again` })

                     setTimeout(() => {
                            interaction.channel.delete()
                     }, 1000);
              }
              if (interaction.customId == "Accept-ShopRules") {
                     let ShopData = await ShopCreation.findOne({ Channel: interaction.channel.id })

                     if (interaction.user.id !== ShopData.BotOwner) return interaction.reply({ content: `Only <@${ShopData.BotOwner}> Can Select this button...`, ephemeral: true })


                     await interaction.reply({ content: `${DefaultEmojis.BotSuccess} Thanks For Accepting the Shop-Rules (Now Moving to the next step.)`, ephemeral: true })

                     const data = await ShopRules.create({
                            Author: interaction.user.id,
                            AcceptRules: true
                     })
                     data.save()

                     const embed = new EmbedBuilder()
                            .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                            .setColor(EmbedColor)
                            .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: <:blank:1032239573054537798>\n> Provide Rack Selection: <:blank:1032239573054537798>\n> Provide Payment-Type: <:blank:1032239573054537798>\n> Provide CreationType: <:blank:1032239573054537798>\n> Hosting Customization: <:blank:1032239573054537798>\n> Bot Customization: <:blank:1032239573054537798>\n\n***Extra Steps (Optional):***\n> Provide Coupon: <:blank:1032239573054537798>\n> Premium Enable: <:blank:1032239573054537798>\n\n***Bot-Creation Data***\n> Provide Bot Token: <:blank:1032239573054537798>\n> Provide Bot Prefix: <:blank:1032239573054537798>\n> Provide Status: <:blank:1032239573054537798>\n> Provide Status Name: <:blank:1032239573054537798>\n> Provide Status Type: <:blank:1032239573054537798> `)
                            .setThumbnail(Roverdev.user.displayAvatarURL())

                     await interaction.channel.messages.fetch().then(async msg => {
                            msg.forEach(message => {
                                   interaction.channel.messages.fetch(message.id).then((msgdelete) => {
                                          msgdelete.delete()
                                   })
                            });
                     })

                     const row1 = new ActionRowBuilder()
                            .addComponents(
                                   new ButtonBuilder()
                                          .setLabel("Close")
                                          .setCustomId("Close-Creation")
                                          .setEmoji("1058276994250461254")
                                          .setStyle(ButtonStyle.Danger)
                            )

                     const row = new ActionRowBuilder()
                            .addComponents(
                                   new StringSelectMenuBuilder()
                                          .setCustomId("Shop-Bots")
                                          .setPlaceholder("Select To Create a Bot")
                                          .setDisabled(ShopData.BotType !== null ? true : false)
                                          .setOptions(
                                                 Bots.map(m => {
                                                        return {
                                                               label: m.label,
                                                               value: m.value,
                                                               description: m.description,
                                                               emoji: m.emoji
                                                        }
                                                 })
                                          )
                            )

                     const SelectBotEmbed = new EmbedBuilder()
                            .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                            .setColor(EmbedColor)
                            .setTitle(`__***Please Select Your Bot Type***__`)

                     setTimeout(() => {
                            interaction.channel.send({
                                   embeds: [embed],
                                   components: [row1],
                                   content: `${interaction.user} Here is your ${ShopData.BotType} Creation`
                            }).then(async (msg) => {
                                   msg.pin()
                                   await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { PartsEmbed: msg.id } })
                            })
                            setTimeout(() => {
                                   interaction.channel.send({
                                          embeds: [SelectBotEmbed],
                                          components: [row],
                                          content: `${interaction.user} Please provide your bot Type`
                                   }).then((msg) => {
                                          msg.edit({ content: `${DefaultEmojis.BotLoading} System processing...` })

                                          setTimeout(async () => {
                                                 let RackNumberFree = await FreeRack.findOne({ Author: interaction.user.id })
                                                 if (!RackNumberFree) {
                                                        const dataFree = await FreeRack.create({
                                                               Author: interaction.user.id
                                                        })
                                                        dataFree.save()

                                                        RackNumberFree = await FreeRack.findOne({ Author: interaction.user.id })
                                                 }

                                                 let TotalRacks = await Racks.findOne({ Author: interaction.user.id })

                                                 if (!TotalRacks) {
                                                        const data = await Racks.create({
                                                               Author: interaction.user.id
                                                        })
                                                        data.save()

                                                        TotalRacks = await Racks.findOne({ Author: interaction.user.id })
                                                 }

                                                 let array = TotalRacks.TotalRacks
                                                 array.push("Free-Rack")

                                                 if (!TotalRacks.TotalRacks.includes("Free-Rack")) await Racks.findOneAndUpdate({ Author: interaction.user.id }, { $set: { TotalRacks: array } })


                                                 if (RackNumberFree.TotalBots.length < 1) {

                                                        await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, {
                                                               $set: {
                                                                      BotCreationType: "Free-Bot"
                                                               }
                                                        })

                                                        let CoinsData = await balance.findOne({ Author: interaction.user.id })

                                                        if (!CoinsData) {
                                                               await balance.create({ Author: interaction.user.id })
                                                               CoinsData = await balance.findOne({ Author: interaction.user.id })
                                                        }

                                                        await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { HostingCustomization: "Free-Bot", HostingDuration: "Free-Bot", BotCustomize: "Free-Bot", RackSelection: "Free-Rack", PaymentType: "Free-Bot", Coupon: "Disabled (Free-Bot)" } })
                                                        ShopData = await ShopCreation.findOne({ Channel: interaction.channel.id })

                                                        interaction.channel.messages.fetch(ShopData.PartsEmbed).then(async (msg) => {
                                                               const embed = new EmbedBuilder()
                                                                      .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                                      .setColor(EmbedColor)
                                                                      .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopData.BotType}\`)\n> Provide Rack Selection: ${ShopEmojis.ShopPassed} (\`${ShopData.RackSelection}\`)\n> Provide Payment-Type: ${ShopEmojis.ShopPassed} (\`${ShopData.PaymentType}\`)\n> Provide CreationType: <:blank:1032239573054537798>\n> Hosting Customization: ${ShopEmojis.ShopPassed} (\`${ShopData.HostingCustomization}\`)\n> Bot Customization: ${ShopEmojis.ShopPassed} (\`${ShopData.BotCustomize}\`)\n\n***Extra Steps (Optional):***\n> Provide Coupon: ${ShopEmojis.ShopFailed} (\`${ShopData.Coupon}\`)\n> Premium Enable: <:blank:1032239573054537798>\n\n***Bot-Creation Data***\n> Provide Bot Token: <:blank:1032239573054537798>\n> Provide Bot Prefix: <:blank:1032239573054537798>\n> Provide Status: <:blank:1032239573054537798>\n> Provide Status Name: <:blank:1032239573054537798>\n> Provide Status Type: <:blank:1032239573054537798> `)
                                                                      .setThumbnail(Roverdev.user.displayAvatarURL())

                                                               msg.edit({ embeds: [embed] })
                                                        })

                                                        SelectBotEmbed.setColor("Green")

                                                        msg.edit({ content: `***${ShopEmojis.ShopPassed} Successfully Selected: \`${ShopData.BotType}\`***`, embeds: [SelectBotEmbed] })

                                                        const PremiumEnabled = await Premium.findOne({ Author: interaction.user.id })

                                                        if (PremiumEnabled?.PremiumStatus == false || !PremiumEnabled) {
                                                               await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { Premium: false } })
                                                               ShopData = await ShopCreation.findOne({ Channel: interaction.channel.id })
                                                               interaction.channel.messages.fetch(ShopData.PartsEmbed).then((msg) => {
                                                                      const embed = new EmbedBuilder()
                                                                             .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                                             .setColor(EmbedColor)
                                                                             .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopData.BotType}\`)\n> Provide Rack Selection: ${ShopEmojis.ShopPassed} (\`${ShopData.RackSelection}\`)\n> Provide Payment-Type: ${ShopEmojis.ShopPassed} (\`${ShopData.PaymentType}\`)\n> Provide CreationType: <:blank:1032239573054537798>\n> Hosting Customization: ${ShopEmojis.ShopPassed} (\`${ShopData.HostingCustomization}\`)\n> Bot Customization: ${ShopEmojis.ShopPassed} (\`${ShopData.BotCustomize}\`)\n\n***Extra Steps (Optional):***\n> Provide Coupon: ${ShopEmojis.ShopFailed} (\`${ShopData.Coupon}\`)\n> Premium Enable: ${ShopEmojis.ShopFailed} (\`${ShopData.Premium}\`)\n\n***Bot-Creation Data***\n> Provide Bot Token: <:blank:1032239573054537798>\n> Provide Bot Prefix: <:blank:1032239573054537798>\n> Provide Status: <:blank:1032239573054537798>\n> Provide Status Name: <:blank:1032239573054537798>\n> Provide Status Type: <:blank:1032239573054537798> `)
                                                                             .setThumbnail(Roverdev.user.displayAvatarURL())

                                                                      msg.edit({ embeds: [embed] })
                                                               })

                                                               const Row = new ActionRowBuilder()
                                                                      .addComponents(
                                                                             new StringSelectMenuBuilder()
                                                                                    .setCustomId("Creation-Type")
                                                                                    .setDisabled(false)
                                                                                    .setPlaceholder("Please Select Your Creation Type")
                                                                                    .addOptions(
                                                                                           {
                                                                                                  label: "Dms",
                                                                                                  value: "dms-creation",
                                                                                                  description: "Create the bot in DMS",
                                                                                                  emoji: "1025670157625983067"
                                                                                           },
                                                                                           {
                                                                                                  label: "Modal",
                                                                                                  value: "Modal-creation",
                                                                                                  description: "Create the bot Using Modals",
                                                                                                  emoji: "1015835459978526720"
                                                                                           },
                                                                                    )
                                                                      )

                                                               msg.reply({
                                                                      embeds: [
                                                                             new EmbedBuilder()
                                                                                    .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                                                    .setColor(EmbedColor)
                                                                                    .setTitle(`__***Please Select Your Creation Type***__`)
                                                                      ], components: [Row]
                                                               })
                                                        } else if (PremiumEnabled?.PremiumStatus == true) {
                                                               await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { Premium: true } })
                                                               ShopData = await ShopCreation.findOne({ Channel: interaction.channel.id })
                                                               interaction.channel.messages.fetch(ShopData.PartsEmbed).then((msg) => {
                                                                      const embed = new EmbedBuilder()
                                                                             .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                                             .setColor(EmbedColor)
                                                                             .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopData.BotType}\`)\n> Provide Rack Selection: ${ShopEmojis.ShopPassed} (\`${ShopData.RackSelection}\`)\n> Provide Payment-Type: ${ShopEmojis.ShopPassed} (\`${ShopData.PaymentType}\`)\n> Provide CreationType: <:blank:1032239573054537798>\n> Hosting Customization: ${ShopEmojis.ShopPassed} (\`${ShopData.HostingCustomization}\`)\n> Bot Customization: ${ShopEmojis.ShopPassed} (\`${ShopData.BotCustomize}\`)\n\n***Extra Steps (Optional):***\n> Provide Coupon: ${ShopEmojis.ShopPassed} (\`${ShopData.Coupon}\`)\n> Premium Enable: ${ShopEmojis.ShopFailed} (\`${ShopData.Premium}\`)\n\n***Bot-Creation Data***\n> Provide Bot Token: <:blank:1032239573054537798>\n> Provide Bot Prefix: <:blank:1032239573054537798>\n> Provide Status: <:blank:1032239573054537798>\n> Provide Status Name: <:blank:1032239573054537798>\n> Provide Status Type: <:blank:1032239573054537798> `)
                                                                             .setThumbnail(Roverdev.user.displayAvatarURL())

                                                                      msg.edit({ embeds: [embed] })
                                                               })

                                                               const Row = new ActionRowBuilder()
                                                                      .addComponents(
                                                                             new StringSelectMenuBuilder()
                                                                                    .setCustomId("Creation-Type")
                                                                                    .setDisabled(false)
                                                                                    .setPlaceholder("Please Select Your Creation Type")
                                                                                    .addOptions(
                                                                                           {
                                                                                                  label: "Dms",
                                                                                                  value: "dms-creation",
                                                                                                  description: "Create the bot in DMS",
                                                                                                  emoji: "1025670157625983067"
                                                                                           },
                                                                                           {
                                                                                                  label: "Modal",
                                                                                                  value: "Modal-creation",
                                                                                                  description: "Create the bot Using Modals",
                                                                                                  emoji: "1015835459978526720"
                                                                                           },
                                                                                    )
                                                                      )

                                                               msg.reply({
                                                                      embeds: [
                                                                             new EmbedBuilder()
                                                                                    .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                                                    .setColor(EmbedColor)
                                                                                    .setTitle(`__***Please Select Your Creation Type***__`)
                                                                      ], components: [Row]
                                                               })
                                                        }
                                                 } else if (RackNumberFree.TotalBots.length > 0) {
                                                        console.log(`Moving steps on...`)

                                                        await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, {
                                                               $set: {
                                                                      BotCreationType: "Payed-Bot"
                                                               }
                                                        })

                                                        const TotalRacks = await Racks.findOne({ Author: interaction.user.id })

                                                        if (TotalRacks.TotalRacks.length > 1) {

                                                               const array = TotalRacks.TotalRacks

                                                               TotalRacks.TotalRacks.forEach(async m => {

                                                                      const RackData = await Roverdev[`${m}`.replace("-", "")].findOne({ Author: interaction.user.id })

                                                                      if (m == "Free-Rack" && RackData.TotalBots !== RackData.BotLimit) {
                                                                             const index = array.indexOf(m)
                                                                             array.splice(index, 1)
                                                                      }
                                                               })

                                                               if (array.length < 1) {
                                                                      return interaction.channel.send({
                                                                             embeds: [
                                                                                    new EmbedBuilder()
                                                                                           .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                                                           .setColor(EmbedColor)
                                                                                           .setTitle("Seems you don't have a-non Full Rack!")
                                                                                           .setDescription(`Go to <#1040954527270043718> and do rd!createrack`)
                                                                             ]
                                                                      })
                                                               }

                                                               const row = new ActionRowBuilder()
                                                                      .addComponents(
                                                                             new StringSelectMenuBuilder()
                                                                                    .setCustomId("Rack-Selector")
                                                                                    .setPlaceholder("Please select a rack!")
                                                                                    .setOptions(
                                                                                           array.map(m => {
                                                                                                  return {
                                                                                                         label: `Select ${m}`,
                                                                                                         value: m,
                                                                                                  }
                                                                                           })
                                                                                    )
                                                                      )

                                                               const embed = new EmbedBuilder()
                                                                      .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                                      .setColor(EmbedColor)
                                                                      .setTitle("__***Please Select a System Rack***__")

                                                               SelectBotEmbed.setColor("Green")

                                                               msg.edit({ content: `***${ShopEmojis.ShopPassed} Successfully Selected: \`${ShopData.BotType}\`***`, embeds: [SelectBotEmbed] })
                                                               msg.reply({ components: [row], embeds: [embed] })


                                                               const ShopCreationData1 = await ShopCreation.findOne({ Channel: interaction.channel.id })

                                                               interaction.channel.messages.fetch(ShopCreationData1.PartsEmbed).then(async (msg) => {
                                                                      const embed = new EmbedBuilder()
                                                                             .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                                             .setColor(EmbedColor)
                                                                             .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopData.BotType}\`)\n> Provide Rack Selection: ${DefaultEmojis.BotLoading}\n> Provide Payment-Type: <:blank:1032239573054537798>\n> Provide CreationType: <:blank:1032239573054537798>\n> Hosting Customization: <:blank:1032239573054537798>\n> Bot Customization: <:blank:1032239573054537798>\n\n***Extra Steps (Optional):***\n> Provide Coupon: <:blank:1032239573054537798>\n> Premium Enable: <:blank:1032239573054537798>\n\n***Bot-Creation Data***\n> Provide Bot Token: <:blank:1032239573054537798>\n> Provide Bot Prefix: <:blank:1032239573054537798>\n> Provide Status: <:blank:1032239573054537798>\n> Provide Status Name: <:blank:1032239573054537798>\n> Provide Status Type: <:blank:1032239573054537798> `)
                                                                             .setThumbnail(Roverdev.user.displayAvatarURL())

                                                                      msg.edit({ embeds: [embed] })
                                                               })
                                                        } else if (TotalRacks.TotalRacks.length < 1) {
                                                               return interaction.channel.send({
                                                                      embeds: [
                                                                             new EmbedBuilder()
                                                                                    .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                                                    .setColor(EmbedColor)
                                                                                    .setTitle("Seems you don't have another rack!")
                                                                                    .setDescription(`Go to <#1040954527270043718> and do rd!createrack`)
                                                                      ]
                                                               })
                                                        }
                                                 }
                                          }, 1500);
                                   })
                            }, 3500);
                     }, 1000);
              }

              if (interaction.customId == "Rack-Selector") {
                     let ShopData = await ShopCreation.findOne({ Channel: interaction.channel.id })

                     if (interaction.user.id !== ShopData.BotOwner) return interaction.reply({ content: `Only <@${ShopData.BotOwner}> Can Select this button...`, ephemeral: true })

                     interaction.deferUpdate()
                     const Row = new ActionRowBuilder()
                            .addComponents(
                                   new StringSelectMenuBuilder()
                                          .setCustomId("Rack-Selector")
                                          .setDisabled(true)
                                          .setPlaceholder("Please select a rack!")
                                          .setOptions(
                                                 {
                                                        label: `Disalbed`,
                                                        value: `Disabled`
                                                 }
                                          )
                            )

                     interaction.message.edit({ content: `${DefaultEmojis.BotLoading} *System Proccessing...*`, components: [Row] })




                     await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { RackSelection: interaction.values[0] } })

                     let ShopCreationData1 = await ShopCreation.findOne({ Channel: interaction.channel.id })

                     let CoinsData = await balance.findOne({ Author: interaction.user.id })

                     if (!CoinsData) {
                            await balance.create({ Author: interaction.user.id })
                            CoinsData = await balance.findOne({ Author: interaction.user.id })
                     }


                     let BotCost = {
                            TicketBot: 7000,
                            EconomyBot: 8000,
                            JTCBot: 7000
                     }

                     const TotalCost = BotCost[`${ShopCreationData1.BotType == "24-7 Music" ? `MusicBot2` : ShopCreationData1.BotType}`.replace("-", "")]

                     if (CoinsData.PocketCoins < TotalCost && interaction.values[0] !== "Booster-Rack") {
                            interaction.channel.messages.fetch(interaction.message.id).then((msg) => {
                                   msg.reply({
                                          embeds: [
                                                 new EmbedBuilder()
                                                        .setAuthor({ name: `Bot Shop System | ${interaction.guild.name}`, iconURL: Roverdev.user.displayAvatarURL() })
                                                        .setColor(EmbedColor)
                                                        .setTitle(`Seems you don't have Enough Coins to buy this bot`)
                                                        .setDescription(`Bot Cost: ${TotalCost}\n> Your Pocket: ${CoinsData.PocketCoins}`)
                                          ]
                                   })
                            })
                            return;
                     }
                     if (interaction.values[0] == "Booster-Rack") {
                            await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { PaymentType: `Booster-Bot` } })
                     } else {
                            await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { PaymentType: `Pocket-Coins` } })
                     }

                     ShopCreationData1 = await ShopCreation.findOne({ Channel: interaction.channel.id })

                     interaction.channel.messages.fetch(ShopCreationData1.PartsEmbed).then(async (msg) => {

                            const embed = new EmbedBuilder()
                                   .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                   .setColor(EmbedColor)
                                   .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData1.BotType}\`)\n> Provide Rack Selection: ${ShopEmojis.ShopPassed} (\`${ShopCreationData1.RackSelection}\`)\n> Provide Payment-Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData1.PaymentType}\`)\n> Provide CreationType: ${DefaultEmojis.BotLoading}\n> Hosting Customization: <:blank:1032239573054537798>\n> Bot Customization: <:blank:1032239573054537798>\n\n***Extra Steps (Optional):***\n> Provide Coupon: <:blank:1032239573054537798>\n> Premium Enable: <:blank:1032239573054537798>\n\n***Bot-Creation Data***\n> Provide Bot Token: <:blank:1032239573054537798>\n> Provide Bot Prefix: <:blank:1032239573054537798>\n> Provide Status: <:blank:1032239573054537798>\n> Provide Status Name: <:blank:1032239573054537798>\n> Provide Status Type: <:blank:1032239573054537798> `)
                                   .setThumbnail(Roverdev.user.displayAvatarURL())

                            msg.edit({ embeds: [embed] })
                     })

                     const embed = new EmbedBuilder()
                            .setAuthor({ name: `Bot Shop System | ${interaction.guild.name}`, iconURL: Roverdev.user.displayAvatarURL() })
                            .setColor(EmbedColor)
                            .setTitle(`***__Please Provide the Creation Type.__***`)


                     const array2 = [
                            {
                                   label: "Dms",
                                   value: "dms-creation",
                                   description: "Create the bot in DMS",
                                   emoji: "1025670157625983067"
                            },
                            {
                                   label: "Modal",
                                   value: "Modal-creation",
                                   description: "Create the bot Using Modals",
                                   emoji: "1015835459978526720"
                            },
                     ]

                     const row = new ActionRowBuilder()
                            .addComponents(
                                   new StringSelectMenuBuilder()
                                          .setCustomId("Creation-Type")
                                          .setMaxValues(1)
                                          .setPlaceholder("What Creation Type would you like?")
                                          .setOptions(array2)
                            )

                     interaction.channel.messages.fetch(interaction.message.id).then((msg) => {
                            msg.reply({ components: [row], embeds: [embed] })
                     })

                     interaction.message.edit({ content: `${ShopEmojis.ShopPassed} ***Successfully Selected: \`${interaction.values[0]}\`***` })


              }

              if (interaction.customId == "Creation-Type") {
                     let ShopData = await ShopCreation.findOne({ Channel: interaction.channel.id })

                     if (interaction.user.id !== ShopData.BotOwner) return interaction.reply({ content: `Only <@${ShopData.BotOwner}> Can Select this button...`, ephemeral: true })


                     await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { CreationType: interaction.values[0] } })

                     ShopData = await ShopCreation.findOne({ Channel: interaction.channel.id })

                     interaction.deferUpdate()
                     const Row = new ActionRowBuilder()
                            .addComponents(
                                   new StringSelectMenuBuilder()
                                          .setCustomId("Creation-Type")
                                          .setDisabled(true)
                                          .setPlaceholder("What Creation Type would you like?")
                                          .setOptions(
                                                 {
                                                        label: `Disalbed`,
                                                        value: `Disabled`
                                                 }
                                          )
                            )

                     interaction.message.edit({ content: `${DefaultEmojis.BotLoading} *System Proccessing...*`, components: [Row] })



                     //        const embed = new EmbedBuilder(
                     //               { 
                     //                      author: { 
                     //                             name: `Bot Shop System | ${interaction.guild.name}`, 
                     //                             iconURL: Roverdev.user.displayAvatarURL() 
                     //                      },  
                     //                             title: `***Please customise the hosting with the buttons***`, 
                     //                             description: `You can click the buttons bellow and add set a hosting duration. (extra coins)\n> - You can just do default button its free for 30 days or less\n\n***Duration:***\n> - Years: ${years}\n> - Months: ${months}\n> - Weeks: ${weeks}\n> - Days: ${days}\n\n> - Total Cost: ${}` 
                     //                      }
                     //        )

                     //        embed.setColor(EmbedColor)

                     //        const row = new ActionRowBuilder()
                     //        .addComponents(
                     //                 new ButtonBuilder()
                     //                     .setLabel("Default")
                     //                     .setCustomId("Default")
                     //                     .setEmoji("1058275133711728670")
                     //                     .setStyle(ButtonStyle.Secondary),
                     //                     new ButtonBuilder()
                     //                     .setLabel("Confirm")
                     //                     .setCustomId("Confirm")
                     //                     .setDisabled(true)
                     //                     .setEmoji("1005732038004981780")
                     //                     .setStyle(ButtonStyle.Success),
                     //                     new ButtonBuilder()
                     //                     .setLabel("Max Duration")
                     //                     .setCustomId("Max-Duration")
                     //                     .setEmoji("1034501806975369406")
                     //                     .setStyle(ButtonStyle.Danger)
                     //        )

                     //        const row1 = new ActionRowBuilder()
                     //        .addComponents(
                     //                 new StringSelectMenuBuilder()
                     //                 .setCustomId("Add-Hosting")
                     //                 .setPlaceholder("Click me to add hosting to your bot")
                     //                 .addOptions(
                     //                      {
                     //                             label: "+1 Year",
                     //                             value: "Up-1Year",
                     //                             description: "Add a year",
                     //                             emoji: "⏫"
                     //                         }, 
                     //                         {
                     //                             label: "+1 Month",
                     //                             value: "Up-1Month",
                     //                             description: "Add a Month",
                     //                             emoji: "⏫"
                     //                         }, 
                     //                         {
                     //                             label: "+1 Week",
                     //                             value: "Up-1Week",
                     //                             description: "Add a week",
                     //                             emoji: "⏫"
                     //                         }, 
                     //                         {
                     //                             label: "+1 Day",
                     //                             value: "Up-1Day",
                     //                             description: "Add a day",
                     //                             emoji: "⏫"
                     //                         }, 
                     //                         {
                     //                             label: "-1 Year",
                     //                             value: "Down-1Year",
                     //                             description: "Remove a year",
                     //                             emoji: "⏬"
                     //                         }, 
                     //                         {
                     //                             label: "-1 Month",
                     //                             value: "Down-1Month",
                     //                             description: "Remove a month",
                     //                             emoji: "⏬"
                     //                         }, 
                     //                         {
                     //                             label: "-1 Week",
                     //                             value: "Down-1Week",
                     //                             description: "Remove a week",
                     //                             emoji: "⏬"
                     //                         }, 
                     //                         {
                     //                             label: "-1 Day",
                     //                             value: "Down-1Day",
                     //                             description: "Remove a day",
                     //                             emoji: "⏬"
                     //                         }, 
                     //                 )
                     //        )

                     if (ShopData.BotCreationType == "Free-Bot") {
                            interaction.message.edit({ content: `${ShopEmojis.ShopPassed} ***Successfully Selected: \`${interaction.values[0]}\`***` })

                            interaction.channel.messages.fetch(ShopData.PartsEmbed).then((msg) => {
                                   const embed = new EmbedBuilder()
                                          .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                          .setColor(EmbedColor)
                                          .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopData.BotType}\`)\n> Provide Rack Selection: ${ShopEmojis.ShopPassed} (\`${ShopData.RackSelection}\`)\n> Provide Payment-Type: ${ShopEmojis.ShopPassed} (\`${ShopData.PaymentType}\`)\n> Provide CreationType: ${ShopEmojis.ShopPassed} (\`${ShopData.CreationType}\`)\n> Hosting Customization: ${ShopEmojis.ShopPassed} (\`${ShopData.HostingCustomization}\`)\n> Bot Customization: ${ShopEmojis.ShopPassed} (\`${ShopData.BotCustomize}\`)\n\n***Extra Steps (Optional):***\n> Provide Coupon: ${ShopEmojis.ShopFailed} (\`${ShopData.Coupon}\`)\n> Premium Enable: ${ShopData.Premium !== false ? `${ShopEmojis.ShopFailed} (\`${ShopData.Premium}\`)` : `${ShopEmojis.ShopPassed} (\`${ShopData.Premium}\`)`}\n\n***Bot-Creation Data***\n> Provide Bot Token: ${DefaultEmojis.SystemCurrentStep}\n> Provide Bot Prefix: <:blank:1032239573054537798>\n> Provide Status: <:blank:1032239573054537798>\n> Provide Status Name: <:blank:1032239573054537798>\n> Provide Status Type: <:blank:1032239573054537798> `)
                                          .setThumbnail(Roverdev.user.displayAvatarURL())

                                   msg.edit({ embeds: [embed] })
                            })
                            if (ShopData.CreationType == "Modal-creation") {

                                   let ms = require("ms")

                                   let CloseCreation = ms(`10min`)

                                   CloseCreation = Date.now() + CloseCreation

                                   const data1 = await LockCreation.findOne({ Channel: interaction.channel.id })

                                   if (!data1) {
                                          await LockCreation.create({
                                                 Channel: interaction.channel.id,
                                                 LockCreationTime: CloseCreation
                                          })
                                   }

                                   if (data1) {
                                          await LockCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { LockCreationTime: CloseCreation } })
                                   }

                                   const embed = new EmbedBuilder()
                                          .setTitle(`***Please Hit Start-Creation to Start the Modal Creation***`)
                                          .setDescription(`Once you Hit Start-Creation it will Ask you for the following data\n> Token (Discord Bot Token)\n> Prefix (Bot Prefix)\n> Presence Status (online, dnd, idle)\n> Status Name (\`!help\`)\n> Status Type: (\`Playing\`, \`Watching\`, \`Listening\`)\n\n> **Steps After Clicking Confirm:**\n> *I will check to see if all data is valid!*\n> *Then I will ask for you to confirm everything is right*\n> *then the bot creation will start!*\n\n> If you don't answer <t:${Math.floor(CloseCreation / 1000)}:R> Creation will be closed`)
                                          .setColor(EmbedColor)

                                   const row = new ActionRowBuilder()
                                          .setComponents(
                                                 new ButtonBuilder()
                                                        .setLabel("Start-Creation")
                                                        .setCustomId("Modal-Button")
                                                        .setEmoji("1023811776850186261")
                                                        .setStyle(ButtonStyle.Success),
                                                 new ButtonBuilder()
                                                        .setLabel("Close")
                                                        .setCustomId("Close-Creation")
                                                        .setEmoji("1058276994250461254")
                                                        .setStyle(ButtonStyle.Danger)
                                          )
                                   setTimeout(async () => {
                                          interaction.channel.send({ embeds: [embed], components: [row] }).then(CreationMsg => {
                                                 setTimeout(async () => {
                                                        await interaction.channel.messages.fetch().then(async msg => {
                                                               msg.forEach(message => {
                                                                      if (message.id == ShopData.PartsEmbed) return
                                                                      if (message.type == MessageType.ChannelPinnedMessage) return
                                                                      if (message.id == CreationMsg.id) return
                                                                      interaction.channel.messages.fetch(message.id).then((msgdelete) => {
                                                                             msgdelete.delete()
                                                                      })

                                                               });
                                                        })
                                                 }, 2900);
                                          })
                                   }, 2900);
                            } else if (ShopData.CreationType == "dms-creation") {
                                   async function VerifyBot(AnswersData) {
                                          return new Promise(async (res, rej) => {
                                                 const BotToken = AnswersData[0]

                                                 const embed = new EmbedBuilder()
                                                        .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                        .setColor(EmbedColor)
                                                        .setTitle(`**Please wait while I verify all extra data**`)
                                                        .setDescription(`Data I will verify:\n> Verifying Bot Public\n> Verifying OAUTH2 CODE GRANT is off\n> Verifying Bot has a avatar`)

                                                 interaction.user.send({ embeds: [embed] })

                                                 const TestClient1 = new Client({
                                                        partials: [
                                                               Partials.Message,
                                                               Partials.Channel,
                                                               Partials.GuildMember,
                                                               Partials.Reaction,
                                                               Partials.GuildScheduledEvent,
                                                               Partials.User,
                                                               Partials.ThreadMember,
                                                        ],
                                                        intents: [
                                                               GatewayIntentBits.Guilds,
                                                               GatewayIntentBits.GuildMembers,
                                                               GatewayIntentBits.GuildBans,
                                                               GatewayIntentBits.GuildEmojisAndStickers,
                                                               GatewayIntentBits.GuildIntegrations,
                                                               GatewayIntentBits.GuildWebhooks,
                                                               GatewayIntentBits.GuildInvites,
                                                               GatewayIntentBits.GuildVoiceStates,
                                                               GatewayIntentBits.GuildPresences,
                                                               GatewayIntentBits.GuildMessages,
                                                               GatewayIntentBits.GuildMessageReactions,
                                                               GatewayIntentBits.GuildMessageTyping,
                                                               GatewayIntentBits.DirectMessages,
                                                               GatewayIntentBits.DirectMessageReactions,
                                                               GatewayIntentBits.DirectMessageTyping,
                                                               GatewayIntentBits.MessageContent,
                                                        ],
                                                 })

                                                 TestClient1.on(Events.ClientReady, async client => {
                                                        const clientapp = await client.application.fetch()
                                                        const clientapp2 = await client.user.fetch()

                                                        if (clientapp.botPublic == false) {
                                                               const embed = new EmbedBuilder({
                                                                      author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                                                      color: Colors.Red,
                                                                      title: `Bot Not Public`,
                                                                      description: `Please Make your bot public and try again!`
                                                               })

                                                               embed.setImage("https://i.imgur.com/ZQbeThG.png")


                                                               setTimeout(async () => {
                                                                      await TestClient1.destroy()
                                                               }, 1000);

                                                               interaction.user.send({ embeds: [embed] })
                                                               interaction.channel.delete()
                                                               return rej(false)
                                                        }

                                                        if (clientapp.botPublic == true) {
                                                               // bot is public
                                                               if (clientapp.botRequireCodeGrant == true) {
                                                                      const embed = new EmbedBuilder({
                                                                             author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                                                             color: Colors.Red,
                                                                             title: `botRequireCodeGrant is on!`,
                                                                             description: `Please turn off botRequireCodeGrant!`
                                                                      })

                                                                      embed.setImage("https://i.imgur.com/lwcyjiu.png")


                                                                      setTimeout(async () => {
                                                                             await TestClient1.destroy()
                                                                      }, 1000);

                                                                      interaction.user.send({ embeds: [embed] })
                                                                      interaction.channel.delete()
                                                                      return rej(false)
                                                               }

                                                               if (clientapp.botRequireCodeGrant == false) {
                                                                      if (clientapp2.avatar == null) {
                                                                             const embed = new EmbedBuilder({
                                                                                    author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                                                                    color: Colors.Red,
                                                                                    title: `Please Add a Avatar to your bot!`,
                                                                                    description: `Please Add the Avatar Here: [Link To Bot](https://discord.com/developers/applications/${client.user.id}/bot)`
                                                                             })


                                                                             setTimeout(async () => {
                                                                                    await TestClient1.destroy()
                                                                             }, 1000);
                                                                             interaction.user.send({ embeds: [embed] })
                                                                             interaction.channel.delete()
                                                                             return rej(false)
                                                                      }

                                                                      if (clientapp2.avatar !== null) {
                                                                             await TestClient1.destroy()
                                                                             return res(true)
                                                                      }
                                                               }
                                                        }
                                                 })

                                                 TestClient1.login(BotToken)

                                          })
                                   }
                                   async function VerifyData(AnswersData) {
                                          return new Promise(async (res, rej) => {
                                                 const BotToken = AnswersData[0]
                                                 const BotPrefix = AnswersData[1]
                                                 const Status = AnswersData[2]
                                                 const StatusName = AnswersData[3]
                                                 const StatusType = AnswersData[4]

                                                 const embed = new EmbedBuilder()
                                                        .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                        .setColor(EmbedColor)
                                                        .addFields([
                                                               {
                                                                      name: `Bot Token:`,
                                                                      value: `\`\`\`yml\n${BotToken}\`\`\``
                                                               },
                                                               {
                                                                      name: `Bot Prefix:`,
                                                                      value: `\`\`\`yml\n${BotPrefix}\`\`\``
                                                               },
                                                               {
                                                                      name: `Bot Status:`,
                                                                      value: `\`\`\`yml\n${Status}\`\`\``
                                                               },
                                                               {
                                                                      name: `Bot Staus Name:`,
                                                                      value: `\`\`\`yml\n${StatusName}\`\`\``
                                                               },
                                                               {
                                                                      name: `Bot Status Type:`,
                                                                      value: `\`\`\`yml\n${StatusType}\`\`\``
                                                               },
                                                        ])

                                                 const buttonconfirm = new ButtonBuilder()
                                                        .setStyle(ButtonStyle.Success)
                                                        .setLabel("Confirm")
                                                        .setCustomId("Confirm-Action")
                                                        .setEmoji("1023811776850186261")

                                                 const buttonCancel = new ButtonBuilder()
                                                        .setStyle(ButtonStyle.Danger)
                                                        .setLabel("Cancel")
                                                        .setCustomId("Cancel-Action")
                                                        .setEmoji("1023811778087485491")

                                                 const row = new ActionRowBuilder()
                                                        .addComponents(buttonconfirm, buttonCancel)

                                                 let QuestionConfirm = await interaction.user.send({ embeds: [embed], components: [row], content: `Is this the correct data?` })

                                                 const collector = QuestionConfirm.createMessageComponentCollector({
                                                        filter: button => button.isButton(),
                                                        time: 50000,
                                                        max: 1,
                                                 });

                                                 collector.on('collect', async InteractionVerify => {
                                                        if (InteractionVerify.customId == "Confirm-Action") {
                                                               try {
                                                                      buttonconfirm.setDisabled(true)
                                                                      buttonCancel.setDisabled(true)
                                                                      QuestionConfirm.edit({
                                                                             components: [row],
                                                                             embeds: [embed.setColor("Green")]
                                                                      })
                                                                      QuestionConfirm.reply({
                                                                             embeds: [
                                                                                    new EmbedBuilder()
                                                                                           .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                           .setColor(EmbedColor)
                                                                                           .setDescription(`\n Head on back over to <#${interaction.channel.id}>`)
                                                                             ]
                                                                      })
                                                                      await InteractionVerify.deferUpdate();
                                                                      return res(true)
                                                               } catch (error) {
                                                                      console.log(error)
                                                                      await InteractionVerify.deferUpdate();
                                                                      return rej(false)
                                                               }
                                                        } else if (InteractionVerify.customId == "Cancel-Action") {
                                                               try {
                                                                      buttonconfirm.setDisabled(true)
                                                                      buttonCancel.setDisabled(true)
                                                                      QuestionConfirm.edit({
                                                                             content: `:x: Canceled!!`,
                                                                             components: [row],
                                                                             embeds: [embed.setColor("Red")]
                                                                      })

                                                                      interaction.channel.delete()
                                                                      await InteractionVerify.deferUpdate();
                                                                      return rej(false)
                                                               } catch (error) {
                                                                      console.log(error)
                                                               }
                                                        }
                                                 })

                                                 collector.on('end', async collected => {
                                                        if (!collected) {
                                                               try {
                                                                      buttonconfirm.setDisabled(true)
                                                                      buttonCancel.setDisabled(true)
                                                                      QuestionConfirm.edit({
                                                                             content: `Time ran out!`,
                                                                             components: [row],
                                                                             embeds: [embed.setColor("Red")]
                                                                      })
                                                                      interaction.channel.delete()
                                                                      return rej(false)
                                                               } catch (error) {
                                                                      console.log(error)
                                                                      interaction.channel.delete()
                                                                      return rej(false)
                                                               }
                                                        }
                                                 })

                                          })
                                   }
                                   async function CheckAnswer(Answer, Question) {
                                          return new Promise(async (res, rej) => {
                                                 if (Question.includes("Discord Bot Token")) {
                                                        const TestClient = new Client({
                                                               partials: [
                                                                      Partials.Message,
                                                                      Partials.Channel,
                                                                      Partials.GuildMember,
                                                                      Partials.Reaction,
                                                                      Partials.GuildScheduledEvent,
                                                                      Partials.User,
                                                                      Partials.ThreadMember,
                                                               ],
                                                               intents: [
                                                                      GatewayIntentBits.Guilds,
                                                                      GatewayIntentBits.GuildMembers,
                                                                      GatewayIntentBits.GuildBans,
                                                                      GatewayIntentBits.GuildEmojisAndStickers,
                                                                      GatewayIntentBits.GuildIntegrations,
                                                                      GatewayIntentBits.GuildWebhooks,
                                                                      GatewayIntentBits.GuildInvites,
                                                                      GatewayIntentBits.GuildVoiceStates,
                                                                      GatewayIntentBits.GuildPresences,
                                                                      GatewayIntentBits.GuildMessages,
                                                                      GatewayIntentBits.GuildMessageReactions,
                                                                      GatewayIntentBits.GuildMessageTyping,
                                                                      GatewayIntentBits.DirectMessages,
                                                                      GatewayIntentBits.DirectMessageReactions,
                                                                      GatewayIntentBits.DirectMessageTyping,
                                                                      GatewayIntentBits.MessageContent,
                                                               ],
                                                        })

                                                        TestClient.on(Events.ClientReady, async client => {
                                                               await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { BotId: client.user.id } })
                                                               await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { BotToken: Answer } })

                                                               await TestClient.destroy()

                                                               const FindBot = await BotConfig.findOne({ Bot: client.user.id })

                                                               if (FindBot) {
                                                                      const embed = new EmbedBuilder()
                                                                             .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                             .setTitle(`Bot is Already Created!`)
                                                                             .setDescription(`**\`\`\`bash\n${Answer}\`\`\`**\n> *Seems this bot is already created!*`)
                                                                             .setColor("Red")
                                                                      interaction.user.send({ embeds: [embed] })
                                                                      interaction.channel.delete()
                                                                      return rej(false)
                                                               } else {
                                                                      return res(Answer)
                                                               }
                                                        })

                                                        TestClient.login(Answer).catch((error) => {
                                                               const embed = new EmbedBuilder()
                                                                      .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                      .setTitle(`Invaild Token Provided!`)
                                                                      .setDescription(`**\`\`\`bash\n${Answer}\`\`\`**\n> *Please Provide a valid token and enable all intents!*`)
                                                                      .setImage('https://i.imgur.com/6ELPpSR.png')
                                                                      .setColor("Red")
                                                               interaction.user.send({ embeds: [embed] })
                                                               interaction.channel.delete()
                                                               return rej(false)
                                                        })
                                                 } else if (Question.includes("Discord Bot Prefix")) {
                                                        await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { BotPrefix: Answer } })
                                                        res(Answer)
                                                 } else if (Question.includes("Presence Status")) {
                                                        if (Answer == "online" || Answer == "dnd" || Answer == "idle") {
                                                               await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { StatusPresence: Answer } })
                                                               return res(Answer)
                                                        } else {
                                                               const embed = new EmbedBuilder({
                                                                      author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                                                      color: Colors.Red,
                                                                      title: `Invalid Status Provided`,
                                                                      description: `Please Provide one of these: online, dnd, idle`
                                                               })

                                                               embed.setDescription(`**\`\`\`bash\n${Answer}\`\`\`**`)

                                                               interaction.user.send({ embeds: [embed] })
                                                               interaction.channel.delete()
                                                               return rej(false)
                                                        }
                                                 } else if (Question.includes("Status Name")) {
                                                        if (Answer.includes("Made By") || Answer.includes("Hosted By") || Answer.includes("Powered by") || Answer.includes("Coded By")) {
                                                               const embed = new EmbedBuilder({
                                                                      author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                                                      color: Colors.Red,
                                                                      title: `Invalid Status Provided`,
                                                                      description: `Please Remove the Made By, Hosted By, Powered By, Coded By From the status`
                                                               })

                                                               embed.setDescription(`**\`\`\`bash\n${Answer}\`\`\`**`)

                                                               interaction.user.send({ embeds: [embed] })
                                                               interaction.channel.delete()
                                                               return rej(false)
                                                        }
                                                        await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { StatusName: Answer } })
                                                        return res(Answer)
                                                 } else if (Question.includes("Status Type")) {
                                                        if (Answer == "Playing".toLowerCase() || Answer == "Watching".toLowerCase() || Answer == "Listening".toLowerCase()) {
                                                               await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { StatusType: Answer } })
                                                               return res(Answer)
                                                        } else {
                                                               const embed = new EmbedBuilder({
                                                                      author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                                                      color: Colors.Red,
                                                                      title: `Invalid Status Type Provided`,
                                                                      description: `Please Provide one of these: playing, watching, listening`
                                                               })

                                                               embed.setDescription(`**\`\`\`bash\n${Answer}\`\`\`**`)

                                                               interaction.user.send({ embeds: [embed] })
                                                               interaction.channel.delete()
                                                               return rej(false)
                                                        }
                                                 }
                                          })
                                   }
                                   async function VerifyResult(Answer) {
                                          return new Promise(async (res, rej) => {
                                                 const embed = new EmbedBuilder()
                                                        .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                        .setTitle(`Are you sure this is correct?`)
                                                        .setDescription(`**\`\`\`bash\n${Answer}\`\`\`**\n\n> *You have 50s to confirm this question, if you don't the creation will be canceled!*`)
                                                        .setColor(EmbedColor)

                                                 const buttonconfirm = new ButtonBuilder()
                                                        .setStyle(ButtonStyle.Success)
                                                        .setLabel("Confirm")
                                                        .setCustomId("Confirm-Action")
                                                        .setEmoji("1023811776850186261")

                                                 const buttonCancel = new ButtonBuilder()
                                                        .setStyle(ButtonStyle.Danger)
                                                        .setLabel("Cancel")
                                                        .setCustomId("Cancel-Action")
                                                        .setEmoji("1023811778087485491")

                                                 const row = new ActionRowBuilder()
                                                        .addComponents(buttonconfirm, buttonCancel)

                                                 let QuestionConfirm = await interaction.user.send({ embeds: [embed], components: [row] })

                                                 const collector = QuestionConfirm.createMessageComponentCollector({
                                                        filter: button => button.isButton(),
                                                        time: 50000,
                                                        max: 1,
                                                 });

                                                 collector.on('collect', async InteractionVerify => {
                                                        if (InteractionVerify.customId == "Confirm-Action") {
                                                               try {
                                                                      buttonconfirm.setDisabled(true)
                                                                      buttonCancel.setDisabled(true)
                                                                      QuestionConfirm.edit({
                                                                             content: `Successfully Validated the answer!`,
                                                                             components: [row],
                                                                             embeds: [embed.setColor("Green")]
                                                                      })
                                                                      await InteractionVerify.deferUpdate();
                                                                      return res(Answer)
                                                               } catch (error) {
                                                                      console.log(error)
                                                                      await InteractionVerify.deferUpdate();
                                                                      return rej(false)
                                                               }
                                                        } else if (InteractionVerify.customId == "Cancel-Action") {
                                                               try {
                                                                      buttonconfirm.setDisabled(true)
                                                                      buttonCancel.setDisabled(true)
                                                                      QuestionConfirm.edit({
                                                                             content: `:x: Canceled!!`,
                                                                             components: [row],
                                                                             embeds: [embed.setColor("Red")]
                                                                      })

                                                                      interaction.channel.delete()
                                                                      await InteractionVerify.deferUpdate();
                                                                      return rej(false)
                                                               } catch (error) {
                                                                      console.log(error)
                                                               }
                                                        }
                                                 })

                                                 collector.on('end', async collected => {
                                                        if (!collected) {
                                                               try {
                                                                      buttonconfirm.setDisabled(true)
                                                                      buttonCancel.setDisabled(true)
                                                                      QuestionConfirm.edit({
                                                                             content: `Time ran out!`,
                                                                             components: [row],
                                                                             embeds: [embed.setColor("Red")]
                                                                      })
                                                                      interaction.channel.delete()
                                                                      return rej(false)
                                                               } catch (error) {
                                                                      console.log(error)
                                                                      interaction.channel.delete()
                                                                      return rej(false)
                                                               }
                                                        }
                                                 })
                                          })
                                   }
                                   async function ask_question(Question) {
                                          return new Promise(async (res, rej) => {
                                                 let index = questions.findIndex(v => v.toLowerCase() == Question.toLowerCase())
                                                 const embed = new EmbedBuilder()
                                                        .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                        .setDescription(`**\`\`\`bash\n${Question}\`\`\`**\n\n> *You have 50s to answer this question, if you don't the creation will be canceled!*`)
                                                        .setFooter({ text: `Please Answer it Correct! | Question: ${index + 1} / ${questions.length}`, iconURL: Roverdev.user.displayAvatarURL({ dynamic: true }) })
                                                        .setColor(EmbedColor)

                                                 let QuestionSend = await interaction.user.send({ embeds: [embed] }).catch((error) => {
                                                        setTimeout(() => {
                                                               interaction.channel.delete()
                                                        }, 30000);
                                                        return interaction.channel.send({ content: `${interaction.user} Please Enable your dms! (Deleting channel in 30s...)` })
                                                 })


                                                 interaction.user.createDM().then(dm => dm.awaitMessages({
                                                        filter: m => m.author.id === interaction.user.id,
                                                        max: 1,
                                                        time: 30000
                                                 }).then(async (collected1) => {
                                                        return res(collected1.first().content);
                                                 }).catch((error) => {
                                                        interaction.user.send({ content: `**:x: Canceled the Bot Creation, Cause you did not answer within 50s!**` })

                                                        interaction.channel.delete()
                                                        return rej(false)
                                                 }))
                                          })
                                   }

                                   let questions = [
                                          `Please Provide me a Discord Bot Token\n Example: "Dg3OTA3NTE2MTUzODg5.X0YVJw.Shmvprj9eW_yfApntj7QUM0sZ_Y"`,
                                          `Please Provide me a Discord Bot Prefix\n Example: "!"`,
                                          `Please Provide me a Presence Status\n Example: "online, dnd, idle"`,
                                          `Please Provide me a Status Name\n Example: "!help"`,
                                          `Please Provide me a Status Type\n Example: "playing, watching, listening"`
                                   ]

                                   let answers = []

                                   interaction.channel.send({
                                          embeds: [
                                                 new EmbedBuilder()
                                                        .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                        .setColor(EmbedColor)
                                                        .setDescription(`\n> Creation Has Started in your [direct messages!](https://discord.com/channels/@me/1053343601385558066)`)
                                          ]
                                   }).then(async (CreationMsg) => {
                                          setTimeout(async () => {
                                                 await interaction.channel.messages.fetch().then(async msg => {
                                                        msg.forEach(message => {
                                                               if (message.id == ShopData.PartsEmbed) return
                                                               if (message.type == MessageType.ChannelPinnedMessage) return
                                                               if (message.id == CreationMsg.id) return
                                                               interaction.channel.messages.fetch(message.id).then((msgdelete) => {
                                                                      msgdelete.delete()
                                                               })

                                                        });
                                                 })
                                          }, 2900);
                                   })

                                   for (const Question of questions) {

                                          await ask_question(Question).then(async (result) => {
                                                 await CheckAnswer(result, Question).then(async (res) => {
                                                        await VerifyResult(result).then(async answer => {
                                                               console.log(answer)
                                                               answers.push(answer)

                                                               if (answers.length == questions.length) {
                                                                      await VerifyBot(answers).then(async (VerifcationAnswer) => {
                                                                             if (VerifcationAnswer == true) {
                                                                                    await VerifyData(answers).then((Verify) => {
                                                                                           if (Verify == true) {
                                                                                                  const BotToken = answers[0]
                                                                                                  const BotPrefix = answers[1]
                                                                                                  const Status = answers[2]
                                                                                                  const StatusName = answers[3]
                                                                                                  const StatusType = answers[4]

                                                                                                  interaction.channel.messages.fetch(ShopData.PartsEmbed).then((msg) => {
                                                                                                         const embed = new EmbedBuilder()
                                                                                                                .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                                                                                .setColor(EmbedColor)
                                                                                                                .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopData.BotType}\`)\n> Provide Rack Selection: ${ShopEmojis.ShopPassed} (\`${ShopData.RackSelection}\`)\n> Provide Payment-Type: ${ShopEmojis.ShopPassed} (\`${ShopData.PaymentType}\`)\n> Provide CreationType: ${ShopEmojis.ShopPassed} (\`${ShopData.CreationType}\`)\n> Hosting Customization: ${ShopEmojis.ShopPassed} (\`${ShopData.HostingCustomization}\`)\n> Bot Customization: ${ShopEmojis.ShopPassed} (\`${ShopData.BotCustomize}\`)\n\n***Extra Steps (Optional):***\n> Provide Coupon: ${ShopEmojis.ShopFailed} (\`${ShopData.Coupon}\`)\n> Premium Enable: ${ShopData.Premium !== false ? `${ShopEmojis.ShopFailed} (\`${ShopData.Premium}\`)` : `${ShopEmojis.ShopPassed} (\`${ShopData.Premium}\`)`}\n\n***Bot-Creation Data***\n> Provide Bot Token: ${ShopEmojis.ShopPassed} (\`Not Showing\`)\n> Provide Bot Prefix: ${ShopEmojis.ShopPassed} (\`${BotPrefix}\`)\n> Provide Status: ${ShopEmojis.ShopPassed} (\`${Status}\`)\n> Provide Status Name: ${ShopEmojis.ShopPassed} (\`${StatusName}\`)\n> Provide Status Type: ${ShopEmojis.ShopPassed} (\`${StatusType}\`) `)
                                                                                                                .setThumbnail(Roverdev.user.displayAvatarURL())

                                                                                                         msg.edit({ embeds: [embed] })
                                                                                                  })

                                                                                                  setTimeout(async () => {
                                                                                                         await interaction.channel.messages.fetch().then(async msg => {
                                                                                                                msg.forEach(message => {
                                                                                                                       if (message.id == ShopData.PartsEmbed) return
                                                                                                                       if (message.type == MessageType.ChannelPinnedMessage) return
                                                                                                                       interaction.channel.messages.fetch(message.id).then((msgdelete) => {
                                                                                                                              msgdelete.delete()
                                                                                                                       })

                                                                                                                });
                                                                                                         })

                                                                                                         let ms = require("ms")

                                                                                                         let CloseCreation = ms(`10min`)

                                                                                                         CloseCreation = Date.now() + CloseCreation

                                                                                                         const data1 = await LockCreation.findOne({ Channel: interaction.channel.id })

                                                                                                         if (!data1) {
                                                                                                                await LockCreation.create({
                                                                                                                       Channel: interaction.channel.id,
                                                                                                                       LockCreationTime: CloseCreation
                                                                                                                })
                                                                                                         }

                                                                                                         if (data1) {
                                                                                                                await LockCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { LockCreationTime: CloseCreation } })
                                                                                                         }

                                                                                                         const CreationEmbed = new EmbedBuilder()
                                                                                                                .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() })
                                                                                                                .setColor(Colors.Orange)
                                                                                                                .setDescription(`Please Click confirm and i will start creating your discord bot!\n> If you don't answer <t:${Math.floor(CloseCreation / 1000)}:R> Creation will be closed`)

                                                                                                         const buttonconfirm = new ButtonBuilder()
                                                                                                                .setStyle(ButtonStyle.Success)
                                                                                                                .setLabel("Confirm")
                                                                                                                .setCustomId("Confirm-Action")
                                                                                                                .setEmoji("1023811776850186261")

                                                                                                         const buttonCancel = new ButtonBuilder()
                                                                                                                .setStyle(ButtonStyle.Danger)
                                                                                                                .setLabel("Cancel")
                                                                                                                .setCustomId("Cancel-Action")
                                                                                                                .setEmoji("1023811778087485491")

                                                                                                         const row = new ActionRowBuilder()
                                                                                                                .addComponents(buttonconfirm, buttonCancel)

                                                                                                         interaction.channel.send({ embeds: [CreationEmbed], content: `${interaction.user} Please Click confirm`, components: [row] })
                                                                                                  }, 2900);
                                                                                           }
                                                                                    })
                                                                             }
                                                                      })
                                                               }
                                                        })
                                                 })
                                          })
                                   }
                            }
                            return;
                     }


                     await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { HostingCustomization: `30d`, BotCustomize: `All Features` } })
                     const ShopCreationData1 = await ShopCreation.findOne({ Channel: interaction.channel.id })

                     interaction.channel.messages.fetch(ShopCreationData1.PartsEmbed).then(async (msg) => {
                            const embed = new EmbedBuilder()
                                   .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                   .setColor(EmbedColor)
                                   .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData1.BotType}\`)\n> Provide Rack Selection: ${ShopEmojis.ShopPassed} (\`${ShopCreationData1.RackSelection}\`)\n> Provide Payment-Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData1.PaymentType}\`)\n> Provide CreationType: ${ShopEmojis.ShopPassed} (\`${ShopCreationData1.CreationType}\`)\n> Hosting Customization: ${ShopEmojis.ShopFailed} (\`${ShopCreationData1.HostingCustomization}\`)\n> Bot Customization: ${ShopEmojis.ShopFailed} (\`${ShopCreationData1.BotCustomize}\`)\n\n***Extra Steps (Optional):***\n> Provide Coupon: <:blank:1032239573054537798>\n> Premium Enable: <:blank:1032239573054537798>\n\n***Bot-Creation Data***\n> Provide Bot Token: <:blank:1032239573054537798>\n> Provide Bot Prefix: <:blank:1032239573054537798>\n> Provide Status: <:blank:1032239573054537798>\n> Provide Status Name: <:blank:1032239573054537798>\n> Provide Status Type: <:blank:1032239573054537798> `)
                                   .setThumbnail(Roverdev.user.displayAvatarURL())

                            msg.edit({ embeds: [embed] })
                     })

                     interaction.message.edit({ content: `${ShopEmojis.ShopPassed} ***Successfully Selected: \`${interaction.values[0]}\`***` })

                     interaction.channel.messages.fetch(interaction.message.id).then(async (msg) => {
                            msg.reply({ content: `${DefaultEmojis.BotLoading} System Loading... Please wait (Checking if they have premium or any Coupon's)` }).then(async (replymsg) => {


                                   const PremiumEnabled = await Premium.findOne({ Author: interaction.user.id })

                                   if (PremiumEnabled?.PremiumStatus == false || !PremiumEnabled) {
                                          await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { Premium: false } })

                                          const ShopCreationData1 = await ShopCreation.findOne({ Channel: interaction.channel.id })

                                          interaction.channel.messages.fetch(ShopCreationData1.PartsEmbed).then(async (msg) => {
                                                 const embed = new EmbedBuilder()
                                                        .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                        .setColor(EmbedColor)
                                                        .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData1.BotType}\`)\n> Provide Rack Selection: ${ShopEmojis.ShopPassed} (\`${ShopCreationData1.RackSelection}\`)\n> Provide Payment-Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData1.PaymentType}\`)\n> Provide CreationType: ${ShopEmojis.ShopPassed} (\`${ShopCreationData1.CreationType}\`)\n> Hosting Customization: ${ShopEmojis.ShopFailed} (\`${ShopCreationData1.HostingCustomization}\`)\n> Bot Customization: ${ShopEmojis.ShopFailed} (\`${ShopCreationData1.BotCustomize}\`)\n\n***Extra Steps (Optional):***\n> Provide Coupon: <:blank:1032239573054537798>\n> Premium Enable: ${ShopEmojis.ShopFailed} (\`${ShopCreationData1.Premium}\`)\n\n***Bot-Creation Data***\n> Provide Bot Token: <:blank:1032239573054537798>\n> Provide Bot Prefix: <:blank:1032239573054537798>\n> Provide Status: <:blank:1032239573054537798>\n> Provide Status Name: <:blank:1032239573054537798>\n> Provide Status Type: <:blank:1032239573054537798> `)
                                                        .setThumbnail(Roverdev.user.displayAvatarURL())

                                                 msg.edit({ embeds: [embed] })
                                          })
                                   } else if (PremiumEnabled?.PremiumStatus == true) {
                                          await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { Premium: true } })

                                          const ShopCreationData1 = await ShopCreation.findOne({ Channel: interaction.channel.id })

                                          interaction.channel.messages.fetch(ShopCreationData1.PartsEmbed).then(async (msg) => {
                                                 const embed = new EmbedBuilder()
                                                        .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                        .setColor(EmbedColor)
                                                        .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData1.BotType}\`)\n> Provide Rack Selection: ${ShopEmojis.ShopPassed} (\`${ShopCreationData1.RackSelection}\`)\n> Provide Payment-Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData1.PaymentType}\`)\n> Provide CreationType: ${ShopEmojis.ShopPassed} (\`${ShopCreationData1.CreationType}\`)\n> Hosting Customization: ${ShopEmojis.ShopFailed} (\`${ShopCreationData1.HostingCustomization}\`)\n> Bot Customization: ${ShopEmojis.ShopFailed} (\`${ShopCreationData1.BotCustomize}\`)\n\n***Extra Steps (Optional):***\n> Provide Coupon: <:blank:1032239573054537798>\n> Premium Enable: ${ShopEmojis.ShopPassed} (\`${ShopCreationData1.Premium}\`)\n\n***Bot-Creation Data***\n> Provide Bot Token: <:blank:1032239573054537798>\n> Provide Bot Prefix: <:blank:1032239573054537798>\n> Provide Status: <:blank:1032239573054537798>\n> Provide Status Name: <:blank:1032239573054537798>\n> Provide Status Type: <:blank:1032239573054537798> `)
                                                        .setThumbnail(Roverdev.user.displayAvatarURL())

                                                 msg.edit({ embeds: [embed] })
                                          })
                                   }

                                   let Coupon = await Coupons.findOne({ Author: interaction.user.id })

                                   if (!Coupon) {
                                          const data = await Coupons.create({
                                                 Author: interaction.user.id
                                          })
                                          data.save()

                                          Coupon = await Coupons.findOne({ Author: interaction.user.id })
                                   }

                                   if (Coupon.Cuppons.length < 1) {
                                          await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { Coupon: `Disabled (No Coupon's)` } })

                                          const ShopCreationData1 = await ShopCreation.findOne({ Channel: interaction.channel.id })

                                          interaction.channel.messages.fetch(ShopCreationData1.PartsEmbed).then(async (msg) => {
                                                 const embed = new EmbedBuilder()
                                                        .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                        .setColor(EmbedColor)
                                                        .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData1.BotType}\`)\n> Provide Rack Selection: ${ShopEmojis.ShopPassed} (\`${ShopCreationData1.RackSelection}\`)\n> Provide Payment-Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData1.PaymentType}\`)\n> Provide CreationType: ${ShopEmojis.ShopPassed} (\`${ShopCreationData1.CreationType}\`)\n> Hosting Customization: ${ShopEmojis.ShopFailed} (\`${ShopCreationData1.HostingCustomization}\`)\n> Bot Customization: ${ShopEmojis.ShopFailed} (\`${ShopCreationData1.BotCustomize}\`)\n\n***Extra Steps (Optional):***\n> Provide Coupon: ${ShopEmojis.ShopFailed} (\`${ShopCreationData1.Coupon}\`)\n> Premium Enable: ${ShopEmojis.ShopFailed} (\`${ShopCreationData1.Premium}\`)\n\n***Bot-Creation Data***\n> Provide Bot Token: <:blank:1032239573054537798>\n> Provide Bot Prefix: <:blank:1032239573054537798>\n> Provide Status: <:blank:1032239573054537798>\n> Provide Status Name: <:blank:1032239573054537798>\n> Provide Status Type: <:blank:1032239573054537798> `)
                                                        .setThumbnail(Roverdev.user.displayAvatarURL())

                                                 msg.edit({ embeds: [embed] })
                                          })
                                   }

                                   const ShopData = await ShopCreation.findOne({ Channel: interaction.channel.id })

                                   if (ShopCreationData1.CreationType == "Modal-creation") {

                                          interaction.channel.messages.fetch(ShopData.PartsEmbed).then((msg) => {
                                                 const embed = new EmbedBuilder()
                                                        .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                        .setColor(EmbedColor)
                                                        .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopData.BotType}\`)\n> Provide Rack Selection: ${ShopEmojis.ShopPassed} (\`${ShopData.RackSelection}\`)\n> Provide Payment-Type: ${ShopEmojis.ShopPassed} (\`${ShopData.PaymentType}\`)\n> Provide CreationType: ${ShopEmojis.ShopPassed} (\`${ShopData.CreationType}\`)\n> Hosting Customization: ${ShopEmojis.ShopPassed} (\`${ShopData.HostingCustomization}\`)\n> Bot Customization: ${ShopEmojis.ShopPassed} (\`${ShopData.BotCustomize}\`)\n\n***Extra Steps (Optional):***\n> Provide Coupon: ${ShopEmojis.ShopFailed} (\`${ShopData.Coupon}\`)\n> Premium Enable: ${ShopData.Premium !== false ? `${ShopEmojis.ShopFailed} (\`${ShopData.Premium}\`)` : `${ShopEmojis.ShopPassed} (\`${ShopData.Premium}\`)`}\n\n***Bot-Creation Data***\n> Provide Bot Token: ${DefaultEmojis.SystemCurrentStep}\n> Provide Bot Prefix: <:blank:1032239573054537798>\n> Provide Status: <:blank:1032239573054537798>\n> Provide Status Name: <:blank:1032239573054537798>\n> Provide Status Type: <:blank:1032239573054537798> `)
                                                        .setThumbnail(Roverdev.user.displayAvatarURL())

                                                 msg.edit({ embeds: [embed] })
                                          })

                                          const ms = require("ms")

                                          let CloseCreation = ms(`10min`)

                                          CloseCreation = Date.now() + CloseCreation

                                          const data1 = await LockCreation.findOne({ Channel: interaction.channel.id })

                                          if (!data1) {
                                                 await LockCreation.create({
                                                        Channel: interaction.channel.id,
                                                        LockCreationTime: CloseCreation
                                                 })
                                          }

                                          if (data1) {
                                                 await LockCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { LockCreationTime: CloseCreation } })
                                          }

                                          const embed = new EmbedBuilder()
                                                 .setTitle(`***Please Hit Start-Creation to Start the Modal Creation***`)
                                                 .setDescription(`Once you Hit Start-Creation it will Ask you for the following data\n> Token (Discord Bot Token)\n> Prefix (Bot Prefix)\n> Presence Status (online, dnd, idle)\n> Status Name (\`!help\`)\n> Status Type: (\`Playing\`, \`Watching\`, \`Listening\`)\n\n> **Steps After Clicking Confirm:**\n> *I will check to see if all data is valid!*\n> *Then I will ask for you to confirm everything is right*\n> *then the bot creation will start!*\n> If you don't answer <t:${Math.floor(CloseCreation / 1000)}:R> Creation will be closed`)
                                                 .setColor(EmbedColor)

                                          const row = new ActionRowBuilder()
                                                 .setComponents(
                                                        new ButtonBuilder()
                                                               .setLabel("Start-Creation")
                                                               .setCustomId("Modal-Button")
                                                               .setEmoji("1023811776850186261")
                                                               .setStyle(ButtonStyle.Success),
                                                        new ButtonBuilder()
                                                               .setLabel("Close")
                                                               .setCustomId("Close-Creation")
                                                               .setEmoji("1058276994250461254")
                                                               .setStyle(ButtonStyle.Danger)
                                                 )


                                          interaction.channel.messages.fetch(replymsg.id).then((msg) => {
                                                 msg.edit({ content: `${ShopEmojis.ShopPassed} *System Successfully Loaded (set the data in the embed)*... Now we contiune! ` })

                                                 setTimeout(async () => {
                                                        msg.delete()

                                                        interaction.channel.send({ embeds: [embed], components: [row] }).then(CreationMsg => {
                                                               setTimeout(async () => {
                                                                      await interaction.channel.messages.fetch().then(async msg => {
                                                                             msg.forEach(message => {
                                                                                    if (message.id == ShopData.PartsEmbed) return
                                                                                    if (message.type == MessageType.ChannelPinnedMessage) return
                                                                                    if (message.id == CreationMsg.id) return
                                                                                    interaction.channel.messages.fetch(message.id).then((msgdelete) => {
                                                                                           msgdelete.delete()
                                                                                    })

                                                                             });
                                                                      })

                                                               }, 2900);
                                                        })
                                                 }, 2900);
                                          })



                                   } else if (ShopData.CreationType == "dms-creation") {
                                          async function VerifyBot(AnswersData) {
                                                 return new Promise(async (res, rej) => {
                                                        const BotToken = AnswersData[0]

                                                        const embed = new EmbedBuilder()
                                                               .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                               .setColor(EmbedColor)
                                                               .setTitle(`**Please wait while I verify all extra data**`)
                                                               .setDescription(`Data I will verify:\n> Verifying Bot Public\n> Verifying OAUTH2 CODE GRANT is off\n> Verifying Bot has a avatar`)

                                                        interaction.user.send({ embeds: [embed] })

                                                        const TestClient1 = new Client({
                                                               partials: [
                                                                      Partials.Message,
                                                                      Partials.Channel,
                                                                      Partials.GuildMember,
                                                                      Partials.Reaction,
                                                                      Partials.GuildScheduledEvent,
                                                                      Partials.User,
                                                                      Partials.ThreadMember,
                                                               ],
                                                               intents: [
                                                                      GatewayIntentBits.Guilds,
                                                                      GatewayIntentBits.GuildMembers,
                                                                      GatewayIntentBits.GuildBans,
                                                                      GatewayIntentBits.GuildEmojisAndStickers,
                                                                      GatewayIntentBits.GuildIntegrations,
                                                                      GatewayIntentBits.GuildWebhooks,
                                                                      GatewayIntentBits.GuildInvites,
                                                                      GatewayIntentBits.GuildVoiceStates,
                                                                      GatewayIntentBits.GuildPresences,
                                                                      GatewayIntentBits.GuildMessages,
                                                                      GatewayIntentBits.GuildMessageReactions,
                                                                      GatewayIntentBits.GuildMessageTyping,
                                                                      GatewayIntentBits.DirectMessages,
                                                                      GatewayIntentBits.DirectMessageReactions,
                                                                      GatewayIntentBits.DirectMessageTyping,
                                                                      GatewayIntentBits.MessageContent,
                                                               ],
                                                        })

                                                        TestClient1.on(Events.ClientReady, async client => {
                                                               const clientapp = await client.application.fetch()
                                                               const clientapp2 = await client.user.fetch()

                                                               if (clientapp.botPublic == false) {
                                                                      const embed = new EmbedBuilder({
                                                                             author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                                                             color: Colors.Red,
                                                                             title: `Bot Not Public`,
                                                                             description: `Please Make your bot public and try again!`
                                                                      })

                                                                      embed.setImage("https://i.imgur.com/ZQbeThG.png")


                                                                      setTimeout(async () => {
                                                                             await TestClient1.destroy()
                                                                      }, 1000);

                                                                      interaction.user.send({ embeds: [embed] })
                                                                      interaction.channel.delete()
                                                                      return rej(false)
                                                               }

                                                               if (clientapp.botPublic == true) {
                                                                      // bot is public
                                                                      if (clientapp.botRequireCodeGrant == true) {
                                                                             const embed = new EmbedBuilder({
                                                                                    author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                                                                    color: Colors.Red,
                                                                                    title: `botRequireCodeGrant is on!`,
                                                                                    description: `Please turn off botRequireCodeGrant!`
                                                                             })

                                                                             embed.setImage("https://i.imgur.com/lwcyjiu.png")


                                                                             setTimeout(async () => {
                                                                                    await TestClient1.destroy()
                                                                             }, 1000);

                                                                             interaction.user.send({ embeds: [embed] })
                                                                             interaction.channel.delete()
                                                                             return rej(false)
                                                                      }

                                                                      if (clientapp.botRequireCodeGrant == false) {
                                                                             if (clientapp2.avatar == null) {
                                                                                    const embed = new EmbedBuilder({
                                                                                           author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                                                                           color: Colors.Red,
                                                                                           title: `Please Add a Avatar to your bot!`,
                                                                                           description: `Please Add the Avatar Here: [Link To Bot](https://discord.com/developers/applications/${client.user.id}/bot)`
                                                                                    })


                                                                                    setTimeout(async () => {
                                                                                           await TestClient1.destroy()
                                                                                    }, 1000);
                                                                                    interaction.user.send({ embeds: [embed] })
                                                                                    interaction.channel.delete()
                                                                                    return rej(false)
                                                                             }

                                                                             if (clientapp2.avatar !== null) {
                                                                                    await TestClient1.destroy()
                                                                                    return res(true)
                                                                             }
                                                                      }
                                                               }
                                                        })

                                                        TestClient1.login(BotToken)

                                                 })
                                          }
                                          async function VerifyData(AnswersData) {
                                                 return new Promise(async (res, rej) => {
                                                        const BotToken = AnswersData[0]
                                                        const BotPrefix = AnswersData[1]
                                                        const Status = AnswersData[2]
                                                        const StatusName = AnswersData[3]
                                                        const StatusType = AnswersData[4]

                                                        const embed = new EmbedBuilder()
                                                               .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                               .setColor(EmbedColor)
                                                               .addFields([
                                                                      {
                                                                             name: `Bot Token:`,
                                                                             value: `\`\`\`yml\n${BotToken}\`\`\``
                                                                      },
                                                                      {
                                                                             name: `Bot Prefix:`,
                                                                             value: `\`\`\`yml\n${BotPrefix}\`\`\``
                                                                      },
                                                                      {
                                                                             name: `Bot Status:`,
                                                                             value: `\`\`\`yml\n${Status}\`\`\``
                                                                      },
                                                                      {
                                                                             name: `Bot Staus Name:`,
                                                                             value: `\`\`\`yml\n${StatusName}\`\`\``
                                                                      },
                                                                      {
                                                                             name: `Bot Status Type:`,
                                                                             value: `\`\`\`yml\n${StatusType}\`\`\``
                                                                      },
                                                               ])

                                                        const buttonconfirm = new ButtonBuilder()
                                                               .setStyle(ButtonStyle.Success)
                                                               .setLabel("Confirm")
                                                               .setCustomId("Confirm-Action")
                                                               .setEmoji("1023811776850186261")

                                                        const buttonCancel = new ButtonBuilder()
                                                               .setStyle(ButtonStyle.Danger)
                                                               .setLabel("Cancel")
                                                               .setCustomId("Cancel-Action")
                                                               .setEmoji("1023811778087485491")

                                                        const row = new ActionRowBuilder()
                                                               .addComponents(buttonconfirm, buttonCancel)

                                                        let QuestionConfirm = await interaction.user.send({ embeds: [embed], components: [row], content: `Is this the correct data?` })

                                                        const collector = QuestionConfirm.createMessageComponentCollector({
                                                               filter: button => button.isButton(),
                                                               time: 50000,
                                                               max: 1,
                                                        });

                                                        collector.on('collect', async InteractionVerify => {
                                                               if (InteractionVerify.customId == "Confirm-Action") {
                                                                      try {
                                                                             buttonconfirm.setDisabled(true)
                                                                             buttonCancel.setDisabled(true)
                                                                             QuestionConfirm.edit({
                                                                                    components: [row],
                                                                                    embeds: [embed.setColor("Green")]
                                                                             })
                                                                             QuestionConfirm.reply({
                                                                                    embeds: [
                                                                                           new EmbedBuilder()
                                                                                                  .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                                  .setColor(EmbedColor)
                                                                                                  .setDescription(`\n Head on back over to <#${interaction.channel.id}>`)
                                                                                    ]
                                                                             })
                                                                             await InteractionVerify.deferUpdate();
                                                                             return res(true)
                                                                      } catch (error) {
                                                                             console.log(error)
                                                                             await InteractionVerify.deferUpdate();
                                                                             return rej(false)
                                                                      }
                                                               } else if (InteractionVerify.customId == "Cancel-Action") {
                                                                      try {
                                                                             buttonconfirm.setDisabled(true)
                                                                             buttonCancel.setDisabled(true)
                                                                             QuestionConfirm.edit({
                                                                                    content: `:x: Canceled!!`,
                                                                                    components: [row],
                                                                                    embeds: [embed.setColor("Red")]
                                                                             })

                                                                             interaction.channel.delete()
                                                                             await InteractionVerify.deferUpdate();
                                                                             return rej(false)
                                                                      } catch (error) {
                                                                             console.log(error)
                                                                      }
                                                               }
                                                        })

                                                        collector.on('end', async collected => {
                                                               if (!collected) {
                                                                      try {
                                                                             buttonconfirm.setDisabled(true)
                                                                             buttonCancel.setDisabled(true)
                                                                             QuestionConfirm.edit({
                                                                                    content: `Time ran out!`,
                                                                                    components: [row],
                                                                                    embeds: [embed.setColor("Red")]
                                                                             })
                                                                             interaction.channel.delete()
                                                                             return rej(false)
                                                                      } catch (error) {
                                                                             console.log(error)
                                                                             interaction.channel.delete()
                                                                             return rej(false)
                                                                      }
                                                               }
                                                        })

                                                 })
                                          }
                                          async function CheckAnswer(Answer, Question) {
                                                 return new Promise(async (res, rej) => {
                                                        if (Question.includes("Discord Bot Token")) {
                                                               const TestClient = new Client({
                                                                      partials: [
                                                                             Partials.Message,
                                                                             Partials.Channel,
                                                                             Partials.GuildMember,
                                                                             Partials.Reaction,
                                                                             Partials.GuildScheduledEvent,
                                                                             Partials.User,
                                                                             Partials.ThreadMember,
                                                                      ],
                                                                      intents: [
                                                                             GatewayIntentBits.Guilds,
                                                                             GatewayIntentBits.GuildMembers,
                                                                             GatewayIntentBits.GuildBans,
                                                                             GatewayIntentBits.GuildEmojisAndStickers,
                                                                             GatewayIntentBits.GuildIntegrations,
                                                                             GatewayIntentBits.GuildWebhooks,
                                                                             GatewayIntentBits.GuildInvites,
                                                                             GatewayIntentBits.GuildVoiceStates,
                                                                             GatewayIntentBits.GuildPresences,
                                                                             GatewayIntentBits.GuildMessages,
                                                                             GatewayIntentBits.GuildMessageReactions,
                                                                             GatewayIntentBits.GuildMessageTyping,
                                                                             GatewayIntentBits.DirectMessages,
                                                                             GatewayIntentBits.DirectMessageReactions,
                                                                             GatewayIntentBits.DirectMessageTyping,
                                                                             GatewayIntentBits.MessageContent,
                                                                      ],
                                                               })

                                                               TestClient.on(Events.ClientReady, async client => {
                                                                      await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { BotId: client.user.id } })
                                                                      await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { BotToken: Answer } })

                                                                      await TestClient.destroy()

                                                                      const FindBot = await BotConfig.findOne({ Bot: client.user.id })

                                                                      if (FindBot) {
                                                                             const embed = new EmbedBuilder()
                                                                                    .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                    .setTitle(`Bot is Already Created!`)
                                                                                    .setDescription(`**\`\`\`bash\n${Answer}\`\`\`**\n> *Seems this bot is already created!*`)
                                                                                    .setImage('https://i.imgur.com/6ELPpSR.png')
                                                                                    .setColor("Red")
                                                                             interaction.user.send({ embeds: [embed] })
                                                                             interaction.channel.delete()
                                                                             return rej(false)
                                                                      } else {
                                                                             return res(Answer)
                                                                      }
                                                               })

                                                               TestClient.login(Answer).catch((error) => {
                                                                      const embed = new EmbedBuilder()
                                                                             .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                             .setTitle(`Invaild Token Provided!`)
                                                                             .setDescription(`**\`\`\`bash\n${Answer}\`\`\`**\n> *Please Provide a valid token and enable all intents!*`)
                                                                             .setImage('https://i.imgur.com/6ELPpSR.png')
                                                                             .setColor("Red")
                                                                      interaction.user.send({ embeds: [embed] })
                                                                      interaction.channel.delete()
                                                                      return rej(false)
                                                               })
                                                        } else if (Question.includes("Discord Bot Prefix")) {
                                                               await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { BotPrefix: Answer } })
                                                               res(Answer)
                                                        } else if (Question.includes("Presence Status")) {
                                                               if (Answer == "online" || Answer == "dnd" || Answer == "idle") {
                                                                      await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { StatusPresence: Answer } })
                                                                      return res(Answer)
                                                               } else {
                                                                      const embed = new EmbedBuilder({
                                                                             author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                                                             color: Colors.Red,
                                                                             title: `Invalid Status Provided`,
                                                                             description: `Please Provide one of these: online, dnd, idle`
                                                                      })

                                                                      embed.setDescription(`**\`\`\`bash\n${Answer}\`\`\`**`)

                                                                      interaction.user.send({ embeds: [embed] })
                                                                      interaction.channel.delete()
                                                                      return rej(false)
                                                               }
                                                        } else if (Question.includes("Status Name")) {
                                                               if (Answer.includes("Made By") || Answer.includes("Hosted By") || Answer.includes("Powered by") || Answer.includes("Coded By")) {
                                                                      const embed = new EmbedBuilder({
                                                                             author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                                                             color: Colors.Red,
                                                                             title: `Invalid Status Provided`,
                                                                             description: `Please Remove the Made By, Hosted By, Powered By, Coded By From the status`
                                                                      })

                                                                      embed.setDescription(`**\`\`\`bash\n${Answer}\`\`\`**`)

                                                                      interaction.user.send({ embeds: [embed] })
                                                                      interaction.channel.delete()
                                                                      return rej(false)
                                                               }
                                                               await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { StatusName: Answer } })
                                                               return res(Answer)
                                                        } else if (Question.includes("Status Type")) {
                                                               if (Answer == "Playing".toLowerCase() || Answer == "Watching".toLowerCase() || Answer == "Listening".toLowerCase()) {
                                                                      await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { StatusType: Answer } })
                                                                      return res(Answer)
                                                               } else {
                                                                      const embed = new EmbedBuilder({
                                                                             author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                                                             color: Colors.Red,
                                                                             title: `Invalid Status Type Provided`,
                                                                             description: `Please Provide one of these: playing, watching, listening`
                                                                      })

                                                                      embed.setDescription(`**\`\`\`bash\n${Answer}\`\`\`**`)

                                                                      interaction.user.send({ embeds: [embed] })
                                                                      interaction.channel.delete()
                                                                      return rej(false)
                                                               }
                                                        }
                                                 })
                                          }
                                          async function VerifyResult(Answer) {
                                                 return new Promise(async (res, rej) => {
                                                        const embed = new EmbedBuilder()
                                                               .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                               .setTitle(`Are you sure this is correct?`)
                                                               .setDescription(`**\`\`\`bash\n${Answer}\`\`\`**\n\n> *You have 50s to confirm this question, if you don't the creation will be canceled!*`)
                                                               .setColor(EmbedColor)

                                                        const buttonconfirm = new ButtonBuilder()
                                                               .setStyle(ButtonStyle.Success)
                                                               .setLabel("Confirm")
                                                               .setCustomId("Confirm-Action")
                                                               .setEmoji("1023811776850186261")

                                                        const buttonCancel = new ButtonBuilder()
                                                               .setStyle(ButtonStyle.Danger)
                                                               .setLabel("Cancel")
                                                               .setCustomId("Cancel-Action")
                                                               .setEmoji("1023811778087485491")

                                                        const row = new ActionRowBuilder()
                                                               .addComponents(buttonconfirm, buttonCancel)

                                                        let QuestionConfirm = await interaction.user.send({ embeds: [embed], components: [row] })

                                                        const collector = QuestionConfirm.createMessageComponentCollector({
                                                               filter: button => button.isButton(),
                                                               time: 50000,
                                                               max: 1,
                                                        });

                                                        collector.on('collect', async InteractionVerify => {
                                                               if (InteractionVerify.customId == "Confirm-Action") {
                                                                      try {
                                                                             buttonconfirm.setDisabled(true)
                                                                             buttonCancel.setDisabled(true)
                                                                             QuestionConfirm.edit({
                                                                                    content: `Successfully Validated the answer!`,
                                                                                    components: [row],
                                                                                    embeds: [embed.setColor("Green")]
                                                                             })
                                                                             await InteractionVerify.deferUpdate();
                                                                             return res(Answer)
                                                                      } catch (error) {
                                                                             console.log(error)
                                                                             await InteractionVerify.deferUpdate();
                                                                             return rej(false)
                                                                      }
                                                               } else if (InteractionVerify.customId == "Cancel-Action") {
                                                                      try {
                                                                             buttonconfirm.setDisabled(true)
                                                                             buttonCancel.setDisabled(true)
                                                                             QuestionConfirm.edit({
                                                                                    content: `:x: Canceled!!`,
                                                                                    components: [row],
                                                                                    embeds: [embed.setColor("Red")]
                                                                             })

                                                                             interaction.channel.delete()
                                                                             await InteractionVerify.deferUpdate();
                                                                             return rej(false)
                                                                      } catch (error) {
                                                                             console.log(error)
                                                                      }
                                                               }
                                                        })

                                                        collector.on('end', async collected => {
                                                               if (!collected) {
                                                                      try {
                                                                             buttonconfirm.setDisabled(true)
                                                                             buttonCancel.setDisabled(true)
                                                                             QuestionConfirm.edit({
                                                                                    content: `Time ran out!`,
                                                                                    components: [row],
                                                                                    embeds: [embed.setColor("Red")]
                                                                             })
                                                                             interaction.channel.delete()
                                                                             return rej(false)
                                                                      } catch (error) {
                                                                             interaction.channel.delete()
                                                                             return rej(false)
                                                                      }
                                                               }
                                                        })
                                                 })
                                          }
                                          async function ask_question(Question) {
                                                 return new Promise(async (res, rej) => {
                                                        let index = questions.findIndex(v => v.toLowerCase() == Question.toLowerCase())
                                                        const embed = new EmbedBuilder()
                                                               .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                               .setDescription(`**\`\`\`bash\n${Question}\`\`\`**\n\n> *You have 50s to answer this question, if you don't the creation will be canceled!*`)
                                                               .setFooter({ text: `Please Answer it Correct! | Question: ${index + 1} / ${questions.length}`, iconURL: Roverdev.user.displayAvatarURL({ dynamic: true }) })
                                                               .setColor(EmbedColor)

                                                        let QuestionSend = await interaction.user.send({ embeds: [embed] }).catch((error) => {
                                                               setTimeout(() => {
                                                                      interaction.channel.delete()
                                                               }, 30000);
                                                               return interaction.channel.send({ content: `${interaction.user} Please Enable your dms! (Deleting channel in 30s...)` })
                                                        })


                                                        interaction.user.createDM().then(dm => dm.awaitMessages({
                                                               filter: m => m.author.id === interaction.user.id,
                                                               max: 1,
                                                               time: 30000
                                                        }).then(async (collected1) => {
                                                               return res(collected1.first().content);
                                                        }).catch((error) => {
                                                               interaction.user.send({ content: `**:x: Canceled the Bot Creation, Cause you did not answer within 50s!**` })

                                                               interaction.channel.delete()
                                                               return rej(false)
                                                        }))
                                                 })
                                          }

                                          let questions = [
                                                 `Please Provide me a Discord Bot Token\n Example: "Dg3OTA3NTE2MTUzODg5.X0YVJw.Shmvprj9eW_yfApntj7QUM0sZ_Y"\n>- Without the ""`,
                                                 `Please Provide me a Discord Bot Prefix\n Example: "!"\n>- Without the ""`,
                                                 `Please Provide me a Presence Status\n Example: "online, dnd, idle"\n>- Without the ""`,
                                                 `Please Provide me a Status Name\n Example: "!help"\n>- Without the ""`,
                                                 `Please Provide me a Status Type\n Example: "playing, watching, listening"\n>- Without the ""`
                                          ]

                                          let answers = []

                                          interaction.channel.send({
                                                 embeds: [
                                                        new EmbedBuilder()
                                                               .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                               .setColor(EmbedColor)
                                                               .setDescription(`\n> Creation Has Started in your [direct messages!](https://discord.com/channels/@me/1053343601385558066)`)
                                                 ]
                                          }).then(async (CreationMsg) => {
                                                 setTimeout(async () => {
                                                        await interaction.channel.messages.fetch().then(async msg => {
                                                               msg.forEach(message => {
                                                                      if (message.id == ShopData.PartsEmbed) return
                                                                      if (message.type == MessageType.ChannelPinnedMessage) return
                                                                      if (message.id == CreationMsg.id) return
                                                                      interaction.channel.messages.fetch(message.id).then((msgdelete) => {
                                                                             msgdelete.delete()
                                                                      })

                                                               });
                                                        })
                                                 }, 2900);
                                          })

                                          for (const Question of questions) {

                                                 await ask_question(Question).then(async (result) => {
                                                        await CheckAnswer(result, Question).then(async (res) => {
                                                               await VerifyResult(result).then(async answer => {
                                                                      console.log(answer)
                                                                      answers.push(answer)

                                                                      if (answers.length == questions.length) {
                                                                             await VerifyBot(answers).then(async (VerifcationAnswer) => {
                                                                                    if (VerifcationAnswer == true) {
                                                                                           await VerifyData(answers).then((Verify) => {
                                                                                                  if (Verify == true) {
                                                                                                         const BotToken = answers[0]
                                                                                                         const BotPrefix = answers[1]
                                                                                                         const Status = answers[2]
                                                                                                         const StatusName = answers[3]
                                                                                                         const StatusType = answers[4]

                                                                                                         interaction.channel.messages.fetch(ShopData.PartsEmbed).then((msg) => {
                                                                                                                const embed = new EmbedBuilder()
                                                                                                                       .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                                                                                       .setColor(EmbedColor)
                                                                                                                       .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopData.BotType}\`)\n> Provide Rack Selection: ${ShopEmojis.ShopPassed} (\`${ShopData.RackSelection}\`)\n> Provide Payment-Type: ${ShopEmojis.ShopPassed} (\`${ShopData.PaymentType}\`)\n> Provide CreationType: ${ShopEmojis.ShopPassed} (\`${ShopData.CreationType}\`)\n> Hosting Customization: ${ShopEmojis.ShopPassed} (\`${ShopData.HostingCustomization}\`)\n> Bot Customization: ${ShopEmojis.ShopPassed} (\`${ShopData.BotCustomize}\`)\n\n***Extra Steps (Optional):***\n> Provide Coupon: ${ShopEmojis.ShopFailed} (\`${ShopData.Coupon}\`)\n> Premium Enable: ${ShopData.Premium !== false ? `${ShopEmojis.ShopFailed} (\`${ShopData.Premium}\`)` : `${ShopEmojis.ShopPassed} (\`${ShopData.Premium}\`)`}\n\n***Bot-Creation Data***\n> Provide Bot Token: ${ShopEmojis.ShopPassed} (\`Not Showing\`)\n> Provide Bot Prefix: ${ShopEmojis.ShopPassed} (\`${BotPrefix}\`)\n> Provide Status: ${ShopEmojis.ShopPassed} (\`${Status}\`)\n> Provide Status Name: ${ShopEmojis.ShopPassed} (\`${StatusName}\`)\n> Provide Status Type: ${ShopEmojis.ShopPassed} (\`${StatusType}\`) `)
                                                                                                                       .setThumbnail(Roverdev.user.displayAvatarURL())

                                                                                                                msg.edit({ embeds: [embed] })
                                                                                                         })

                                                                                                         setTimeout(async () => {
                                                                                                                await interaction.channel.messages.fetch().then(async msg => {
                                                                                                                       msg.forEach(message => {
                                                                                                                              if (message.id == ShopData.PartsEmbed) return
                                                                                                                              if (message.type == MessageType.ChannelPinnedMessage) return
                                                                                                                              interaction.channel.messages.fetch(message.id).then((msgdelete) => {
                                                                                                                                     msgdelete.delete()
                                                                                                                              })

                                                                                                                       });
                                                                                                                })

                                                                                                                const ms = require("ms")

                                                                                                                let CloseCreation = ms(`10min`)

                                                                                                                CloseCreation = Date.now() + CloseCreation

                                                                                                                const data1 = await LockCreation.findOne({ Channel: interaction.channel.id })

                                                                                                                if (!data1) {
                                                                                                                       await LockCreation.create({
                                                                                                                              Channel: interaction.channel.id,
                                                                                                                              LockCreationTime: CloseCreation
                                                                                                                       })
                                                                                                                }

                                                                                                                if (data1) {
                                                                                                                       await LockCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { LockCreationTime: CloseCreation } })
                                                                                                                }


                                                                                                                const CreationEmbed = new EmbedBuilder()
                                                                                                                       .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() })
                                                                                                                       .setColor(Colors.Orange)
                                                                                                                       .setDescription(`Please Click confirm and i will start creating your discord bot!\n> If you don't answer <t:${Math.floor(CloseCreation / 1000)}:R> Creation will be closed`)

                                                                                                                const buttonconfirm = new ButtonBuilder()
                                                                                                                       .setStyle(ButtonStyle.Success)
                                                                                                                       .setLabel("Confirm")
                                                                                                                       .setCustomId("Confirm-Action")
                                                                                                                       .setEmoji("1023811776850186261")

                                                                                                                const buttonCancel = new ButtonBuilder()
                                                                                                                       .setStyle(ButtonStyle.Danger)
                                                                                                                       .setLabel("Cancel")
                                                                                                                       .setCustomId("Cancel-Action")
                                                                                                                       .setEmoji("1023811778087485491")

                                                                                                                const row = new ActionRowBuilder()
                                                                                                                       .addComponents(buttonconfirm, buttonCancel)

                                                                                                                interaction.channel.send({ embeds: [CreationEmbed], content: `${interaction.user} Please Click confirm`, components: [row] })
                                                                                                         }, 2900);


                                                                                                  }
                                                                                           })
                                                                                    }
                                                                             })
                                                                      }
                                                               })
                                                        })
                                                 })
                                          }
                                   }
                            })
                     })
              }

              if (interaction.customId == "Modal-Button") {
                     let ShopData = await ShopCreation.findOne({ Channel: interaction.channel.id })

                     if (interaction.user.id !== ShopData.BotOwner) return interaction.reply({ content: `Only <@${ShopData.BotOwner}> Can Select this button...`, ephemeral: true })

                     const modal = new ModalBuilder()
                            .setCustomId("Modal-Createbot")
                            .setTitle("Roverdev Bot Creation")
                            .addComponents(
                                   new ActionRowBuilder()
                                          .addComponents(
                                                 new TextInputBuilder()
                                                        .setCustomId("BotToken")
                                                        .setLabel("Discord Bot Token")
                                                        .setPlaceholder("MTAwM...")
                                                        .setRequired(true)
                                                        .setStyle(TextInputStyle.Short),
                                          ),
                                   new ActionRowBuilder()
                                          .addComponents(
                                                 new TextInputBuilder()
                                                        .setCustomId("BotPrefix")
                                                        .setLabel("Discord Bot Prefix")
                                                        .setPlaceholder("Example: !")
                                                        .setMaxLength(5)
                                                        .setRequired(true)
                                                        .setStyle(TextInputStyle.Short),
                                          ),
                                   new ActionRowBuilder()
                                          .addComponents(
                                                 new TextInputBuilder()
                                                        .setCustomId("Status-Presence")
                                                        .setLabel("Discord Status TYPE")
                                                        .setPlaceholder("Example: online, dnd, idle")
                                                        .setRequired(true)
                                                        .setStyle(TextInputStyle.Short),
                                          ),
                                   new ActionRowBuilder()
                                          .addComponents(
                                                 new TextInputBuilder()
                                                        .setCustomId("Status-Name")
                                                        .setLabel("Discord Status Name")
                                                        .setPlaceholder("Example: !help")
                                                        .setRequired(true)
                                                        .setStyle(TextInputStyle.Short),
                                          ),
                                   new ActionRowBuilder()
                                          .addComponents(
                                                 new TextInputBuilder()
                                                        .setCustomId("Status-Type")
                                                        .setLabel("Discord Status Type")
                                                        .setPlaceholder("Example: playing | watching | listening")
                                                        .setRequired(true)
                                                        .setStyle(TextInputStyle.Short),
                                          )
                            )

                     await interaction.showModal(modal);
              }
       })

       Roverdev.on(Events.InteractionCreate, async interaction => {
              if (interaction.isModalSubmit()) {
                     if (interaction.customId == "Modal-Createbot") {

                            const row = new ActionRowBuilder()
                                   .setComponents(
                                          new ButtonBuilder()
                                                 .setLabel("Start-Creation")
                                                 .setCustomId("Modal-Button")
                                                 .setEmoji("1023811776850186261")
                                                 .setDisabled(true)
                                                 .setStyle(ButtonStyle.Success),
                                          new ButtonBuilder()
                                                 .setLabel("Close")
                                                 .setCustomId("Close-Creation")
                                                 .setDisabled(true)
                                                 .setEmoji("1058276994250461254")
                                                 .setStyle(ButtonStyle.Danger)
                                   )

                            interaction.message.edit({ components: [row] })

                            const BotToken = interaction.fields.getTextInputValue('BotToken');
                            const BotPrefix = interaction.fields.getTextInputValue('BotPrefix');
                            const StatusPresence = interaction.fields.getTextInputValue('Status-Presence');
                            const Statusname = interaction.fields.getTextInputValue('Status-Name');
                            const StatusType = interaction.fields.getTextInputValue('Status-Type');

                            const embed = new EmbedBuilder({
                                   author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                   description: `\n> *${DefaultEmojis.SystemCurrentStep} Checking Bot Token...*\n> - *${DefaultEmojis.BotLoading} Checking Bot ID...*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Prefix...*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Presence Status...*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Status Name*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Status Type*\n\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Public*\n> *${DefaultEmojis.SystemPendingBlank} Checking OAUTH2 CODE GRANT*\n> *${DefaultEmojis.SystemPendingBlank} Checking for Bot Avatar*\n\n> - ***Once the checking is done it will create your bot***`,
                                   color: Colors.Orange
                            })


                            await interaction.reply({ embeds: [embed] })


                            const TestClient = new Client({
                                   partials: [
                                          Partials.Message,
                                          Partials.Channel,
                                          Partials.GuildMember,
                                          Partials.Reaction,
                                          Partials.GuildScheduledEvent,
                                          Partials.User,
                                          Partials.ThreadMember,
                                   ],
                                   intents: [
                                          GatewayIntentBits.Guilds,
                                          GatewayIntentBits.GuildMembers,
                                          GatewayIntentBits.GuildBans,
                                          GatewayIntentBits.GuildEmojisAndStickers,
                                          GatewayIntentBits.GuildIntegrations,
                                          GatewayIntentBits.GuildWebhooks,
                                          GatewayIntentBits.GuildInvites,
                                          GatewayIntentBits.GuildVoiceStates,
                                          GatewayIntentBits.GuildPresences,
                                          GatewayIntentBits.GuildMessages,
                                          GatewayIntentBits.GuildMessageReactions,
                                          GatewayIntentBits.GuildMessageTyping,
                                          GatewayIntentBits.DirectMessages,
                                          GatewayIntentBits.DirectMessageReactions,
                                          GatewayIntentBits.DirectMessageTyping,
                                          GatewayIntentBits.MessageContent,
                                   ],
                            })

                            TestClient.on(Events.ClientReady, async client => {
                                   await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { BotId: client.user.id } })
                                   await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { BotToken: BotToken } })

                                   const FindBot = await BotConfig.findOne({ Bot: client.user.id })

                                   if (FindBot) {
                                          embed.setDescription(`\n> *${ShopEmojis.ShopPassed} Checked Bot Token*\n> - *${ShopEmojis.ShopFailed} Checked Bot ID*\n> *${DefaultEmojis.SystemCurrentStep} Checking Bot Prefix...*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Presence Status...*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Status Name*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Status Type*\n\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Public*\n> *${DefaultEmojis.SystemPendingBlank} Checking OAUTH2 CODE GRANT*\n> *${DefaultEmojis.SystemPendingBlank} Checking for Bot Avatar*\n\n> - ***Once the checking is done it will create your bot***`)
                                          embed.setColor(Colors.Red)

                                          const embed2 = new EmbedBuilder({
                                                 author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                                 color: Colors.Red,
                                                 title: `Bot is already created`,
                                                 description: `Seems this bot is already created!`
                                          })

                                          return interaction.editReply({
                                                 embeds: [
                                                        embed, embed2
                                                 ], components: [
                                                        new ActionRowBuilder().addComponents(
                                                               new ButtonBuilder()
                                                                      .setLabel("Close")
                                                                      .setCustomId("Close-Creation")
                                                                      .setEmoji("1058276994250461254")
                                                                      .setStyle(ButtonStyle.Danger),
                                                               new ButtonBuilder()
                                                                      .setLabel("Retry")
                                                                      .setCustomId("Retry-Creation")
                                                                      .setEmoji("1021530388197290075")
                                                                      .setStyle(ButtonStyle.Primary)
                                                        )
                                                 ]
                                          })
                                   }

                                   await TestClient.destroy()

                                   setTimeout(async () => {
                                          embed.setDescription(`\n> *${ShopEmojis.ShopPassed} Checked Bot Token*\n> - *${ShopEmojis.ShopPassed} Checked Bot ID*\n> *${DefaultEmojis.SystemCurrentStep} Checking Bot Prefix...*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Presence Status...*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Status Name*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Status Type*\n\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Public*\n> *${DefaultEmojis.SystemPendingBlank} Checking OAUTH2 CODE GRANT*\n> *${DefaultEmojis.SystemPendingBlank} Checking for Bot Avatar*\n\n> - ***Once the checking is done it will create your bot***`)

                                          interaction.editReply({ embeds: [embed] })

                                          let ShopCreationData = await ShopCreation.findOne({ Channel: interaction.channel.id })

                                          interaction.channel.messages.fetch(ShopCreationData.PartsEmbed).then((msg) => {
                                                 const embed = new EmbedBuilder()
                                                        .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                        .setColor(EmbedColor)
                                                        .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.BotType}\`)\n> Provide Rack Selection: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.RackSelection}\`)\n> Provide Payment-Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.PaymentType}\`)\n> Provide CreationType: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.CreationType}\`)\n> Hosting Customization: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.HostingCustomization}\`)\n> Bot Customization: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.BotCustomize}\`)\n\n***Extra Steps (Optional):***\n> Provide Coupon: ${ShopEmojis.ShopFailed} (\`${ShopCreationData.Coupon}\`)\n> Premium Enable: ${ShopCreationData.Premium !== false ? `${ShopEmojis.ShopFailed} (\`${ShopCreationData.Premium}\`)` : `${ShopEmojis.ShopPassed} (\`${ShopCreationData.Premium}\`)`}\n\n***Bot-Creation Data***\n> Provide Bot Token: ${ShopEmojis.ShopPassed} (\`Not Showing\`)\n> Provide Bot Prefix: ${DefaultEmojis.SystemCurrentStep}\n> Provide Status: ${DefaultEmojis.BotLoading}\n> Provide Status Name: ${DefaultEmojis.BotLoading}\n> Provide Status Name: ${DefaultEmojis.BotLoading} `)
                                                        .setThumbnail(Roverdev.user.displayAvatarURL())

                                                 msg.edit({ embeds: [embed] })
                                          })


                                          /**
                                           * @Bot_Prefix
                                           */


                                          embed.setDescription(`\n> *${ShopEmojis.ShopPassed} Checked Bot Token*\n> - *${ShopEmojis.ShopPassed} Checked Bot ID*\n> *${ShopEmojis.ShopPassed} Checked Bot Prefix*\n> *${DefaultEmojis.SystemCurrentStep} Checking Bot Presence Status...*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Status Name*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Status Type*\n\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Public*\n> *${DefaultEmojis.SystemPendingBlank} Checking OAUTH2 CODE GRANT*\n> *${DefaultEmojis.SystemPendingBlank} Checking for Bot Avatar*\n\n> - ***Once the checking is done it will create your bot***`)

                                          interaction.editReply({ embeds: [embed] })

                                          await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { BotPrefix: BotPrefix } })

                                          ShopCreationData = await ShopCreation.findOne({ Channel: interaction.channel.id })

                                          interaction.channel.messages.fetch(ShopCreationData.PartsEmbed).then((msg) => {
                                                 const embed = new EmbedBuilder()
                                                        .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                        .setColor(EmbedColor)
                                                        .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.BotType}\`)\n> Provide Rack Selection: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.RackSelection}\`)\n> Provide Payment-Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.PaymentType}\`)\n> Provide CreationType: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.CreationType}\`)\n> Hosting Customization: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.HostingCustomization}\`)\n> Bot Customization: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.BotCustomize}\`)\n\n***Extra Steps (Optional):***\n> Provide Coupon: ${ShopEmojis.ShopFailed} (\`${ShopCreationData.Coupon}\`)\n> Premium Enable: ${ShopCreationData.Premium !== false ? `${ShopEmojis.ShopFailed} (\`${ShopCreationData.Premium}\`)` : `${ShopEmojis.ShopPassed} (\`${ShopCreationData.Premium}\`)`}\n\n***Bot-Creation Data***\n> Provide Bot Token: ${ShopEmojis.ShopPassed} (\`Not Showing\`)\n> Provide Bot Prefix: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.BotPrefix}\`)\n> Provide Status: ${DefaultEmojis.BotLoading}\n> Provide Status Name: ${DefaultEmojis.BotLoading}\n> Provide Status Type: ${DefaultEmojis.BotLoading} `)
                                                        .setThumbnail(Roverdev.user.displayAvatarURL())

                                                 msg.edit({ embeds: [embed] })
                                          })


                                          /**
                                           * @Presence_Status
                                           */

                                          if (StatusPresence == "online" || StatusPresence == "dnd" || StatusPresence == "idle") {
                                                 embed.setDescription(`\n> *${ShopEmojis.ShopPassed} Checked Bot Token*\n> - *${ShopEmojis.ShopPassed} Checked Bot ID*\n> *${ShopEmojis.ShopPassed} Checking Bot Prefix*\n> *${ShopEmojis.ShopPassed} Checked Bot Presence Status*\n> *${DefaultEmojis.SystemCurrentStep} Checking Bot Status Name*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Status Type*\n\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Public*\n> *${DefaultEmojis.SystemPendingBlank} Checking OAUTH2 CODE GRANT*\n> *${DefaultEmojis.SystemPendingBlank} Checking for Bot Avatar*\n\n> - ***Once the checking is done it will create your bot***`)

                                                 interaction.editReply({ embeds: [embed] })

                                                 await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { StatusPresence: StatusPresence } })

                                                 ShopCreationData = await ShopCreation.findOne({ Channel: interaction.channel.id })

                                                 interaction.channel.messages.fetch(ShopCreationData.PartsEmbed).then((msg) => {
                                                        const embed = new EmbedBuilder()
                                                               .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                               .setColor(EmbedColor)
                                                               .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.BotType}\`)\n> Provide Rack Selection: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.RackSelection}\`)\n> Provide Payment-Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.PaymentType}\`)\n> Provide CreationType: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.CreationType}\`)\n> Hosting Customization: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.HostingCustomization}\`)\n> Bot Customization: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.BotCustomize}\`)\n\n***Extra Steps (Optional):***\n> Provide Coupon: ${ShopEmojis.ShopFailed} (\`${ShopCreationData.Coupon}\`)\n> Premium Enable: ${ShopCreationData.Premium !== false ? `${ShopEmojis.ShopFailed} (\`${ShopCreationData.Premium}\`)` : `${ShopEmojis.ShopPassed} (\`${ShopCreationData.Premium}\`)`}\n\n***Bot-Creation Data***\n> Provide Bot Token: ${ShopEmojis.ShopPassed} (\`Not Showing\`)\n> Provide Bot Prefix: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.BotPrefix}\`)\n> Provide Status: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.StatusPresence}\`)\n> Provide Status Type: ${DefaultEmojis.SystemCurrentStep}\n> Provide Status Name: ${DefaultEmojis.BotLoading} `)
                                                               .setThumbnail(Roverdev.user.displayAvatarURL())

                                                        msg.edit({ embeds: [embed] })
                                                 })

                                          } else {
                                                 embed.setDescription(`\n> *${ShopEmojis.ShopPassed} Checked Bot Token*\n> - *${ShopEmojis.ShopPassed} Checked Bot ID*\n> *${ShopEmojis.ShopPassed} Checked Bot Prefix*\n> *${ShopEmojis.ShopFailed} Checking Bot Presence Status...*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Status Name*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Status Type*\n\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Public*\n> *${DefaultEmojis.SystemPendingBlank} Checking OAUTH2 CODE GRANT*\n> *${DefaultEmojis.SystemPendingBlank} Checking for Bot Avatar*\n\n> - ***Once the checking is done it will create your bot***`)
                                                 embed.setColor(Colors.Red)

                                                 const embed2 = new EmbedBuilder({
                                                        author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                                        color: Colors.Red,
                                                        title: `Invalid Status Provided`,
                                                        description: `Please Provide one of these: online, dnd, idle`
                                                 })

                                                 return interaction.editReply({
                                                        embeds: [
                                                               embed, embed2
                                                        ], components: [
                                                               new ActionRowBuilder().addComponents(
                                                                      new ButtonBuilder()
                                                                             .setLabel("Close")
                                                                             .setCustomId("Close-Creation")
                                                                             .setEmoji("1058276994250461254")
                                                                             .setStyle(ButtonStyle.Danger),
                                                                      new ButtonBuilder()
                                                                             .setLabel("Retry")
                                                                             .setCustomId("Retry-Creation")
                                                                             .setEmoji("1021530388197290075")
                                                                             .setStyle(ButtonStyle.Primary)
                                                               )
                                                        ]
                                                 })
                                          }

                                          /**
                                           * @Status_Name
                                           */

                                          if (Statusname.includes("Made By") || Statusname.includes("Hosted By") || Statusname.includes("Powered by") || Statusname.includes("Coded By")) {
                                                 embed.setDescription(`\n> *${ShopEmojis.ShopPassed} Checked Bot Token*\n> - *${ShopEmojis.ShopPassed} Checked Bot ID*\n> *${ShopEmojis.ShopPassed} Checking Bot Prefix*\n> *${ShopEmojis.ShopPassed} Checked Bot Presence Status*\n> *${ShopEmojis.ShopFailed} Checking Bot Status Name*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Status Type*\n\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Public*\n> *${DefaultEmojis.SystemPendingBlank} Checking OAUTH2 CODE GRANT*\n> *${DefaultEmojis.SystemPendingBlank} Checking for Bot Avatar*\n\n> - ***Once the checking is done it will create your bot***`)
                                                 embed.setColor(Colors.Red)

                                                 const embed2 = new EmbedBuilder({
                                                        author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                                        color: Colors.Red,
                                                        title: `Invalid Status Provided`,
                                                        description: `Please Remove the Made By, Hosted By, Powered By, Coded By From the status`
                                                 })

                                                 return interaction.editReply({
                                                        embeds: [
                                                               embed, embed2
                                                        ], components: [
                                                               new ActionRowBuilder().addComponents(
                                                                      new ButtonBuilder()
                                                                             .setLabel("Close")
                                                                             .setCustomId("Close-Creation")
                                                                             .setEmoji("1058276994250461254")
                                                                             .setStyle(ButtonStyle.Danger),
                                                                      new ButtonBuilder()
                                                                             .setLabel("Retry")
                                                                             .setCustomId("Retry-Creation")
                                                                             .setEmoji("1021530388197290075")
                                                                             .setStyle(ButtonStyle.Primary)
                                                               )
                                                        ]
                                                 })
                                          }
                                          embed.setDescription(`\n> *${ShopEmojis.ShopPassed} Checked Bot Token*\n> - *${ShopEmojis.ShopPassed} Checked Bot ID*\n> *${ShopEmojis.ShopPassed} Checking Bot Prefix*\n> *${ShopEmojis.ShopPassed} Checked Bot Presence Status*\n> *${ShopEmojis.ShopPassed} Checked Bot Status Name*\n> *${DefaultEmojis.SystemCurrentStep} Checking Bot Status Type*\n\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Public*\n> *${DefaultEmojis.SystemPendingBlank} Checking OAUTH2 CODE GRANT*\n> *${DefaultEmojis.SystemPendingBlank} Checking for Bot Avatar*\n\n> - ***Once the checking is done it will create your bot***`)

                                          interaction.editReply({ embeds: [embed] })

                                          await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { StatusName: Statusname } })


                                          ShopCreationData = await ShopCreation.findOne({ Channel: interaction.channel.id })

                                          interaction.channel.messages.fetch(ShopCreationData.PartsEmbed).then((msg) => {
                                                 const embed = new EmbedBuilder()
                                                        .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                        .setColor(EmbedColor)
                                                        .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.BotType}\`)\n> Provide Rack Selection: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.RackSelection}\`)\n> Provide Payment-Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.PaymentType}\`)\n> Provide CreationType: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.CreationType}\`)\n> Hosting Customization: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.HostingCustomization}\`)\n> Bot Customization: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.BotCustomize}\`)\n\n***Extra Steps (Optional):***\n> Provide Coupon: ${ShopEmojis.ShopFailed} (\`${ShopCreationData.Coupon}\`)\n> Premium Enable: ${ShopCreationData.Premium !== false ? `${ShopEmojis.ShopFailed} (\`${ShopCreationData.Premium}\`)` : `${ShopEmojis.ShopPassed} (\`${ShopCreationData.Premium}\`)`}\n\n***Bot-Creation Data***\n> Provide Bot Token: ${ShopEmojis.ShopPassed} (\`Not Showing\`)\n> Provide Bot Prefix: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.BotPrefix}\`)\n> Provide Status: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.StatusPresence}\`)\n> Provide Status Name: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.StatusName}\`)\n> Provide Status Type: ${DefaultEmojis.SystemCurrentStep} `)
                                                        .setThumbnail(Roverdev.user.displayAvatarURL())

                                                 msg.edit({ embeds: [embed] })
                                          })

                                          if (StatusType == "Playing".toLowerCase() || StatusType == "Watching".toLowerCase() || StatusType == "Listening".toLowerCase()) {
                                                 embed.setDescription(`\n> *${ShopEmojis.ShopPassed} Checked Bot Token*\n> - *${ShopEmojis.ShopPassed} Checked Bot ID*\n> *${ShopEmojis.ShopPassed} Checking Bot Prefix*\n> *${ShopEmojis.ShopPassed} Checked Bot Presence Status*\n> *${ShopEmojis.ShopPassed} Checked Bot Status Name*\n> *${ShopEmojis.ShopPassed} Checked Bot Status Type*\n\n> *${DefaultEmojis.SystemCurrentStep} Checking Bot Public*\n> *${DefaultEmojis.SystemPendingBlank} Checking OAUTH2 CODE GRANT*\n> *${DefaultEmojis.SystemPendingBlank} Checking for Bot Avatar*\n\n> - ***Once the checking is done it will create your bot***`)

                                                 interaction.editReply({ embeds: [embed] })

                                                 await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { StatusType: StatusType } })

                                                 ShopCreationData = await ShopCreation.findOne({ Channel: interaction.channel.id })

                                                 interaction.channel.messages.fetch(ShopCreationData.PartsEmbed).then((msg) => {
                                                        const embed = new EmbedBuilder()
                                                               .setAuthor({ name: `Bot Shop System | ${interaction.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                                                               .setColor(EmbedColor)
                                                               .setDescription(`*Welcome to Roverdev's Creation System Please Complete the Steps Below*\n\n***Bot Creation Steps:***\n> Provide Bot Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.BotType}\`)\n> Provide Rack Selection: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.RackSelection}\`)\n> Provide Payment-Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.PaymentType}\`)\n> Provide CreationType: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.CreationType}\`)\n> Hosting Customization: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.HostingCustomization}\`)\n> Bot Customization: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.BotCustomize}\`)\n\n***Extra Steps (Optional):***\n> Provide Coupon: ${ShopEmojis.ShopFailed} (\`${ShopCreationData.Coupon}\`)\n> Premium Enable: ${ShopCreationData.Premium !== false ? `${ShopEmojis.ShopFailed} (\`${ShopCreationData.Premium}\`)` : `${ShopEmojis.ShopPassed} (\`${ShopCreationData.Premium}\`)`}\n\n***Bot-Creation Data***\n> Provide Bot Token: ${ShopEmojis.ShopPassed} (\`Not Showing\`)\n> Provide Bot Prefix: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.BotPrefix}\`)\n> Provide Status: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.StatusPresence}\`)\n> Provide Status Name: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.StatusName}\`)\n> Provide Status Type: ${ShopEmojis.ShopPassed} (\`${ShopCreationData.StatusType}\`)`)
                                                               .setThumbnail(Roverdev.user.displayAvatarURL())

                                                        msg.edit({ embeds: [embed] })
                                                 })
                                          } else {
                                                 embed.setDescription(`\n> *${ShopEmojis.ShopPassed} Checked Bot Token*\n> - *${ShopEmojis.ShopPassed} Checked Bot ID*\n> *${ShopEmojis.ShopPassed} Checked Bot Prefix*\n> *${ShopEmojis.ShopPassed} Checked Bot Presence Status*\n> *${ShopEmojis.ShopFailed} Checking Bot Status Name*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Status Type*\n\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Public*\n> *${DefaultEmojis.SystemPendingBlank} Checking OAUTH2 CODE GRANT*\n> *${DefaultEmojis.SystemPendingBlank} Checking for Bot Avatar*\n\n> - ***Once the checking is done it will create your bot***`)
                                                 embed.setColor(Colors.Red)

                                                 const embed2 = new EmbedBuilder({
                                                        author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                                        color: Colors.Red,
                                                        title: `Invalid Status Type Provided`,
                                                        description: `Please Provide one of these: playing, watching, listening`
                                                 })

                                                 return interaction.editReply({
                                                        embeds: [
                                                               embed, embed2
                                                        ], components: [
                                                               new ActionRowBuilder().addComponents(
                                                                      new ButtonBuilder()
                                                                             .setLabel("Close")
                                                                             .setCustomId("Close-Creation")
                                                                             .setEmoji("1058276994250461254")
                                                                             .setStyle(ButtonStyle.Danger),
                                                                      new ButtonBuilder()
                                                                             .setLabel("Retry")
                                                                             .setCustomId("Retry-Creation")
                                                                             .setEmoji("1021530388197290075")
                                                                             .setStyle(ButtonStyle.Primary)
                                                               )
                                                        ]
                                                 })
                                          }

                                          setTimeout(async () => {
                                                 const TestClient1 = new Client({
                                                        partials: [
                                                               Partials.Message,
                                                               Partials.Channel,
                                                               Partials.GuildMember,
                                                               Partials.Reaction,
                                                               Partials.GuildScheduledEvent,
                                                               Partials.User,
                                                               Partials.ThreadMember,
                                                        ],
                                                        intents: [
                                                               GatewayIntentBits.Guilds,
                                                               GatewayIntentBits.GuildMembers,
                                                               GatewayIntentBits.GuildBans,
                                                               GatewayIntentBits.GuildEmojisAndStickers,
                                                               GatewayIntentBits.GuildIntegrations,
                                                               GatewayIntentBits.GuildWebhooks,
                                                               GatewayIntentBits.GuildInvites,
                                                               GatewayIntentBits.GuildVoiceStates,
                                                               GatewayIntentBits.GuildPresences,
                                                               GatewayIntentBits.GuildMessages,
                                                               GatewayIntentBits.GuildMessageReactions,
                                                               GatewayIntentBits.GuildMessageTyping,
                                                               GatewayIntentBits.DirectMessages,
                                                               GatewayIntentBits.DirectMessageReactions,
                                                               GatewayIntentBits.DirectMessageTyping,
                                                               GatewayIntentBits.MessageContent,
                                                        ],
                                                 })

                                                 TestClient1.on(Events.ClientReady, async client => {
                                                        const clientapp = await client.application.fetch()
                                                        const clientapp2 = await client.user.fetch()

                                                        if (clientapp.botPublic == false) {
                                                               embed.setDescription(`\n> *${ShopEmojis.ShopPassed} Checked Bot Token*\n> - *${ShopEmojis.ShopPassed} Checked Bot ID*\n> *${ShopEmojis.ShopPassed} Checking Bot Prefix*\n> *${ShopEmojis.ShopPassed} Checked Bot Presence Status*\n> *${ShopEmojis.ShopPassed} Checked Bot Status Name*\n> *${ShopEmojis.ShopPassed} Checked Bot Status Type*\n\n> *${ShopEmojis.ShopFailed} Checking Bot Public*\n> *${DefaultEmojis.SystemPendingBlank} Checking OAUTH2 CODE GRANT*\n> *${DefaultEmojis.SystemPendingBlank} Checking for Bot Avatar*\n\n> - ***Once the checking is done it will create your bot***`)
                                                               embed.setColor(Colors.Red)

                                                               const embed2 = new EmbedBuilder({
                                                                      author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                                                      color: Colors.Red,
                                                                      title: `Bot Not Public`,
                                                                      description: `Please Make your bot public and try again!`
                                                               })

                                                               embed2.setImage("https://i.imgur.com/ZQbeThG.png")


                                                               setTimeout(async () => {
                                                                      await TestClient1.destroy()
                                                               }, 1000);

                                                               return interaction.editReply({
                                                                      embeds: [
                                                                             embed, embed2
                                                                      ], components: [
                                                                             new ActionRowBuilder().addComponents(
                                                                                    new ButtonBuilder()
                                                                                           .setLabel("Close")
                                                                                           .setCustomId("Close-Creation")
                                                                                           .setEmoji("1058276994250461254")
                                                                                           .setStyle(ButtonStyle.Danger),
                                                                                    new ButtonBuilder()
                                                                                           .setLabel("Retry")
                                                                                           .setCustomId("Retry-Creation")
                                                                                           .setEmoji("1021530388197290075")
                                                                                           .setStyle(ButtonStyle.Primary)
                                                                             )
                                                                      ]
                                                               })
                                                        }

                                                        if (clientapp.botPublic == true) {
                                                               embed.setDescription(`\n> *${ShopEmojis.ShopPassed} Checked Bot Token*\n> - *${ShopEmojis.ShopPassed} Checked Bot ID*\n> *${ShopEmojis.ShopPassed} Checking Bot Prefix*\n> *${ShopEmojis.ShopPassed} Checked Bot Presence Status*\n> *${ShopEmojis.ShopPassed} Checked Bot Status Name*\n> *${ShopEmojis.ShopPassed} Checked Bot Status Type*\n\n> *${ShopEmojis.ShopPassed} Checked Bot Public*\n> *${DefaultEmojis.SystemCurrentStep} Checking OAUTH2 CODE GRANT*\n> *${DefaultEmojis.SystemPendingBlank} Checking for Bot Avatar*\n\n> - ***Once the checking is done it will create your bot***`)
                                                               await interaction.editReply({ embeds: [embed] })

                                                               if (clientapp.botRequireCodeGrant == true) {
                                                                      embed.setDescription(`\n> *${ShopEmojis.ShopPassed} Checked Bot Token*\n> - *${ShopEmojis.ShopPassed} Checked Bot ID*\n> *${ShopEmojis.ShopPassed} Checking Bot Prefix*\n> *${ShopEmojis.ShopPassed} Checked Bot Presence Status*\n> *${ShopEmojis.ShopPassed} Checked Bot Status Name*\n> *${ShopEmojis.ShopPassed} Checked Bot Status Type*\n\n> *${ShopEmojis.ShopPassed} Checked Bot Public*\n> *${ShopEmojis.ShopFailed} Checking OAUTH2 CODE GRANT*\n> *${DefaultEmojis.SystemPendingBlank} Checking for Bot Avatar*\n\n> - ***Once the checking is done it will create your bot***`)
                                                                      embed.setColor(Colors.Red)

                                                                      const embed2 = new EmbedBuilder({
                                                                             author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                                                             color: Colors.Red,
                                                                             title: `botRequireCodeGrant is on!`,
                                                                             description: `Please turn off botRequireCodeGrant!`
                                                                      })

                                                                      embed2.setImage("https://i.imgur.com/lwcyjiu.png")


                                                                      setTimeout(async () => {
                                                                             await TestClient1.destroy()
                                                                      }, 1000);

                                                                      return interaction.editReply({
                                                                             embeds: [
                                                                                    embed, embed2
                                                                             ], components: [
                                                                                    new ActionRowBuilder().addComponents(
                                                                                           new ButtonBuilder()
                                                                                                  .setLabel("Close")
                                                                                                  .setCustomId("Close-Creation")
                                                                                                  .setEmoji("1058276994250461254")
                                                                                                  .setStyle(ButtonStyle.Danger),
                                                                                           new ButtonBuilder()
                                                                                                  .setLabel("Retry")
                                                                                                  .setCustomId("Retry-Creation")
                                                                                                  .setEmoji("1021530388197290075")
                                                                                                  .setStyle(ButtonStyle.Primary)
                                                                                    )
                                                                             ]
                                                                      })
                                                               }
                                                               if (clientapp.botRequireCodeGrant == false) {
                                                                      embed.setDescription(`\n> *${ShopEmojis.ShopPassed} Checked Bot Token*\n> - *${ShopEmojis.ShopPassed} Checked Bot ID*\n> *${ShopEmojis.ShopPassed} Checking Bot Prefix*\n> *${ShopEmojis.ShopPassed} Checked Bot Presence Status*\n> *${ShopEmojis.ShopPassed} Checked Bot Status Name*\n> *${ShopEmojis.ShopPassed} Checked Bot Status Type*\n\n> *${ShopEmojis.ShopPassed} Checked Bot Public*\n> *${ShopEmojis.ShopPassed} Checked OAUTH2 CODE GRANT*\n> *${DefaultEmojis.SystemCurrentStep} Checking for Bot Avatar*\n\n> - ***Once the checking is done it will create your bot***`)
                                                                      await interaction.editReply({ embeds: [embed] })

                                                                      if (clientapp2.avatar == null) {
                                                                             embed.setDescription(`\n> *${ShopEmojis.ShopPassed} Checked Bot Token*\n> - *${ShopEmojis.ShopPassed} Checked Bot ID*\n> *${ShopEmojis.ShopPassed} Checking Bot Prefix*\n> *${ShopEmojis.ShopPassed} Checked Bot Presence Status*\n> *${ShopEmojis.ShopPassed} Checked Bot Status Name*\n> *${ShopEmojis.ShopPassed} Checked Bot Status Type*\n\n> *${ShopEmojis.ShopPassed} Checked Bot Public*\n> *${ShopEmojis.ShopPassed} Checked OAUTH2 CODE GRANT*\n> *${ShopEmojis.ShopFailed} Checking for Bot Avatar*\n\n> - ***Once the checking is done it will create your bot***`)
                                                                             embed.setColor(Colors.Red)

                                                                             const embed2 = new EmbedBuilder({
                                                                                    author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                                                                    color: Colors.Red,
                                                                                    title: `Please Add a Avatar to your bot!`,
                                                                                    description: `Please Add the Avatar Here: [Link To Bot](https://discord.com/developers/applications/${client.user.id}/bot)`
                                                                             })


                                                                             setTimeout(async () => {
                                                                                    await TestClient1.destroy()
                                                                             }, 1000);

                                                                             return interaction.editReply({
                                                                                    embeds: [
                                                                                           embed, embed2
                                                                                    ], components: [
                                                                                           new ActionRowBuilder().addComponents(
                                                                                                  new ButtonBuilder()
                                                                                                         .setLabel("Close")
                                                                                                         .setCustomId("Close-Creation")
                                                                                                         .setEmoji("1058276994250461254")
                                                                                                         .setStyle(ButtonStyle.Danger),
                                                                                                  new ButtonBuilder()
                                                                                                         .setLabel("Retry")
                                                                                                         .setCustomId("Retry-Creation")
                                                                                                         .setEmoji("1021530388197290075")
                                                                                                         .setStyle(ButtonStyle.Primary)
                                                                                           )
                                                                                    ]
                                                                             })
                                                                      }
                                                                      if (clientapp2.avatar !== null) {
                                                                             embed.setDescription(`\n> *${ShopEmojis.ShopPassed} Checked Bot Token*\n> - *${ShopEmojis.ShopPassed} Checked Bot ID*\n> *${ShopEmojis.ShopPassed} Checking Bot Prefix*\n> *${ShopEmojis.ShopPassed} Checked Bot Presence Status*\n> *${ShopEmojis.ShopPassed} Checked Bot Status Name*\n> *${ShopEmojis.ShopPassed} Checked Bot Status Type*\n\n> *${ShopEmojis.ShopPassed} Checked Bot Public*\n> *${ShopEmojis.ShopPassed} Checked OAUTH2 CODE GRANT*\n> *${ShopEmojis.ShopPassed} Checked for Bot Avatar*\n\n> - ***Once the checking is done it will create your bot***`)
                                                                             await interaction.editReply({ embeds: [embed] })

                                                                             setTimeout(async () => {
                                                                                    await TestClient1.destroy()
                                                                             }, 1000);

                                                                             /**
                                                                              * @Start_Creation
                                                                              */

                                                                             const ShopData = await ShopCreation.findOne({ Channel: interaction.channel.id })

                                                                             await interaction.channel.messages.fetch().then(async msg => {
                                                                                    msg.forEach(message => {
                                                                                           if (message.id == ShopData.PartsEmbed) return
                                                                                           if (message.type == MessageType.ChannelPinnedMessage) return
                                                                                           interaction.channel.messages.fetch(message.id).then((msgdelete) => {
                                                                                                  msgdelete.delete()
                                                                                           })
                                                                                    });
                                                                             })

                                                                             const ShopCreationData = await ShopCreation.findOne({ Channel: interaction.channel.id })

                                                                             const ms = require("ms")

                                                                             let CloseCreation = ms(`10min`)

                                                                             CloseCreation = Date.now() + CloseCreation

                                                                             const data1 = await LockCreation.findOne({ Channel: interaction.channel.id })

                                                                             if (!data1) {
                                                                                    await LockCreation.create({
                                                                                           Channel: interaction.channel.id,
                                                                                           LockCreationTime: CloseCreation
                                                                                    })
                                                                             }

                                                                             if (data1) {
                                                                                    await LockCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { LockCreationTime: CloseCreation } })
                                                                             }

                                                                             const CreationEmbed = new EmbedBuilder()
                                                                                    .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() })
                                                                                    .setColor(Colors.Orange)
                                                                                    .setDescription(`Please Click confirm and i will start creating your discord bot!\n If you don't answer <t:${Math.floor(CloseCreation / 1000)}:R> Creation will be closed`)

                                                                             const buttonconfirm = new ButtonBuilder()
                                                                                    .setStyle(ButtonStyle.Success)
                                                                                    .setLabel("Confirm")
                                                                                    .setCustomId("Confirm-Action")
                                                                                    .setEmoji("1023811776850186261")

                                                                             const buttonCancel = new ButtonBuilder()
                                                                                    .setStyle(ButtonStyle.Danger)
                                                                                    .setLabel("Cancel")
                                                                                    .setCustomId("Cancel-Action")
                                                                                    .setEmoji("1023811778087485491")

                                                                             const row = new ActionRowBuilder()
                                                                                    .addComponents(buttonconfirm, buttonCancel)

                                                                             interaction.channel.send({ embeds: [CreationEmbed], content: `${interaction.user} Please Click confirm`, components: [row] })
                                                                      }
                                                               }
                                                        }
                                                 })
                                                 TestClient1.login(BotToken)
                                          }, 1000);
                                   }, 500);
                            })

                            TestClient.login(BotToken).catch(error => {
                                   embed.setDescription(`\n> *${ShopEmojis.ShopFailed} Checking Bot Token...*\n> - *${ShopEmojis.ShopFailed} Checking Bot ID...*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Prefix...*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Presence Status...*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Status Name*\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Status Type*\n\n> *${DefaultEmojis.SystemPendingBlank} Checking Bot Public*\n> *${DefaultEmojis.SystemPendingBlank} Checking OAUTH2 CODE GRANT*\n> *${DefaultEmojis.SystemPendingBlank} Checking for Bot Avatar*\n\n> - ***Once the checking is done it will create your bot***`)
                                   embed.setColor(Colors.Red)

                                   const attachment = new AttachmentBuilder("/home/Roverdev-Manager/Modules/Rover-BotShop/images/6ELPpSR.png")

                                   const embed2 = new EmbedBuilder({
                                          author: { name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },
                                          color: Colors.Red,
                                          title: `Invalid Token Provided`,
                                   })

                                   embed2.setImage("https://i.imgur.com/6ELPpSR.png")

                                   return interaction.editReply({
                                          embeds: [
                                                 embed, embed2
                                          ], components: [
                                                 new ActionRowBuilder().addComponents(
                                                        new ButtonBuilder()
                                                               .setLabel("Close")
                                                               .setCustomId("Close-Creation")
                                                               .setEmoji("1058276994250461254")
                                                               .setStyle(ButtonStyle.Danger),
                                                        new ButtonBuilder()
                                                               .setLabel("Retry")
                                                               .setCustomId("Retry-Creation")
                                                               .setEmoji("1021530388197290075")
                                                               .setStyle(ButtonStyle.Primary)
                                                 )
                                          ]
                                   })
                            })
                     }
              }

              if (interaction.customId == "Close-Creation") {
                     const channel = interaction.channel

                     let ShopData = await ShopCreation.findOne({ Channel: interaction.channel.id })

                     if (channel.parentId == "1040996273546866708") {
                            return interaction.reply({ content: `Seems this channel is already closed!`, ephemeral: true })
                     }


                     if (interaction.member.roles.cache.has("920292436641718312")) {
                            const owner = Roverdev.users.cache.get(ShopData.BotOwner)

                            owner.send({
                                   embeds: [
                                          new EmbedBuilder()
                                                 .setTitle(`Succesfully Closed {channel} By: ${interaction.user.tag}`.replace("{channel}", channel.name))
                                                 .setColor("#3dbeff")
                                   ]
                            })

                            channel.setParent("1040996273546866708", { LockPermission: true })

                            channel.setName(`🔏╎${owner.username}`)

                            setTimeout(() => {
                                   if (channel.parentId !== "1040996273546866708") {
                                          interaction.channel.delete()
                                   }
                            }, 5000);

                            await ShopCreation.findOneAndDelete({ Channel: interaction.channel.id })
                            await LockCreation.findOneAndDelete({ Channel: interaction.channel.id })

                            interaction.reply({
                                   embeds: [
                                          new EmbedBuilder()
                                                 .setTitle("Succesfully Closed {channel}".replace("{channel}", channel.name))
                                                 .setColor("#3dbeff")
                                   ]
                            }).catch((e) => {
                                   channel.send({
                                          embeds: [
                                                 new EmbedBuilder()
                                                        .setTitle("Succesfully Closed {channel}".replace("{channel}", channel.name))
                                                        .setColor("#3dbeff")
                                          ]
                                   })
                            })
                     } else {
                            const owner = Roverdev.users.cache.get(ShopData.BotOwner)

                            owner.send({
                                   embeds: [
                                          new EmbedBuilder()
                                                 .setTitle(`Succesfully Closed {channel} By: ${interaction.user.tag}`.replace("{channel}", channel.name))
                                                 .setColor("#3dbeff")
                                   ]
                            })

                            channel.setParent("1040996273546866708", { LockPermission: true })

                            channel.setName(`🔏╎${owner.username}`)

                            setTimeout(() => {
                                   if (channel.parentId !== "1040996273546866708") {
                                          interaction.channel.delete()
                                   }
                            }, 5000);

                            await ShopCreation.findOneAndDelete({ Channel: interaction.channel.id })

                            interaction.reply({
                                   embeds: [
                                          new EmbedBuilder()
                                                 .setTitle("Succesfully Closed {channel}".replace("{channel}", channel.name))
                                                 .setColor("#3dbeff")
                                   ]
                            }).catch((e) => {
                                   channel.send({
                                          embeds: [
                                                 new EmbedBuilder()
                                                        .setTitle("Succesfully Closed {channel}".replace("{channel}", channel.name))
                                                        .setColor("#3dbeff")
                                          ]
                                   })
                            })
                     }
              }

              if (interaction.customId == "Retry-Creation") {
                     let ShopData = await ShopCreation.findOne({ Channel: interaction.channel.id })
                     if (interaction.user.id !== ShopData.BotOwner) return interaction.reply({ content: `Only <@${ShopData.BotOwner}> Can Select this button...`, ephemeral: true })
                     if (ShopData.RetryTimes == 2) return interaction.reply({ content: `You already tried it 2 times you may not try it again!`, ephemeral: true })

                     await interaction.reply({ content: `Retrying... give me a sec` })

                     await interaction.channel.messages.fetch().then(async msg => {
                            msg.forEach(message => {
                                   if (message.id == ShopData.PartsEmbed) return
                                   if (message.type == MessageType.ChannelPinnedMessage) return
                                   interaction.channel.messages.fetch(message.id).then((msgdelete) => {
                                          msgdelete.delete()
                                   })
                            });
                     })

                     setTimeout(async () => {

                            let ms = require("ms")

                            let CloseCreation = ms(`10min`)

                            CloseCreation = Date.now() + CloseCreation

                            const data1 = await LockCreation.findOne({ Channel: interaction.channel.id })

                            if (!data1) {
                                   await LockCreation.create({
                                          Channel: interaction.channel.id,
                                          LockCreationTime: CloseCreation
                                   })
                            }

                            if (data1) {
                                   await LockCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { LockCreationTime: CloseCreation } })
                            }

                            const embed = new EmbedBuilder()
                                   .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                   .setTitle(`***Please Hit Start-Creation to Start the Modal Creation***`)
                                   .setDescription(`Once you Hit Start-Creation it will Ask you for the following data\n> Token (Discord Bot Token)\n> Prefix (Bot Prefix)\n> Presence Status Type (online, dnd, idle)\n> Status Name (\`!help\`)\n> Status Type: (\`Playing\`, \`Watching\`, \`Listening\`)\n\n> **Steps After Clicking Confirm:**\n> *I will check to see if all data is valid!*\n> *Then I will ask for you to confirm everything is right*\n> *then the bot creation will start!*\n> If you don't answer <t:${Math.floor(CloseCreation / 1000)}:R> Creation will be closed`)
                                   .setColor(EmbedColor)

                            const row = new ActionRowBuilder()
                                   .setComponents(
                                          new ButtonBuilder()
                                                 .setLabel("Start-Creation")
                                                 .setCustomId("Modal-Button")
                                                 .setEmoji("1023811776850186261")
                                                 .setStyle(ButtonStyle.Success),
                                          new ButtonBuilder()
                                                 .setLabel("Close")
                                                 .setCustomId("Close-Creation")
                                                 .setEmoji("1058276994250461254")
                                                 .setStyle(ButtonStyle.Danger)
                                   )

                            interaction.channel.send({ embeds: [embed], components: [row] })

                            await ShopCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { RetryTimes: ShopData.RetryTimes + 1 } })
                     }, 2000);
              }

              if (interaction.guild && interaction.guild?.id == "1081700920993259550") {
                     if (interaction.customId == "Confirm-Action") {

                            interaction.reply({ content: `Now Starting the creation`, ephemeral: true })

                            let ShopData = await ShopCreation.findOne({ Channel: interaction.channel.id })

                            if (interaction.user.id !== ShopData.BotOwner) return interaction.reply({ content: `Only <@${ShopData.BotOwner}> Can Select this button...`, ephemeral: true })

                            await interaction.channel.messages.fetch().then(async msg => {
                                   msg.forEach(message => {
                                          if (message.id == ShopData.PartsEmbed) return
                                          if (message.type == MessageType.ChannelPinnedMessage) return
                                          interaction.channel.messages.fetch(message.id).then((msgdelete) => {
                                                 msgdelete.delete()
                                          })
                                   });
                            })

                            let CreatingBotStatus = await CreatingBot.findOne({ Channel: interaction.guild.id })

                            if (!CreatingBotStatus) {
                                   await CreatingBot.create({
                                          Channel: interaction.guild.id
                                   })
                                   CreatingBotStatus = await CreatingBot.findOne({ Channel: interaction.guild.id })
                            }


                            if (CreatingBotStatus.CreatingBotStatus == true) {
                                   const CreatingBotStat = setInterval(async function () {
                                          if (CreatingBotStatus.CreatingBotStatus == true) {
                                                 console.log(`Its still true!`)
                                                 CreatingBotStatus = await CreatingBot.findOne({ Channel: interaction.guild.id })
                                          }
                                          if (CreatingBotStatus.CreatingBotStatus == false) {
                                                 clearInterval(CreatingBotStat)


                                                 const Path = require("path")
                                                 const fs = require("fs")

                                                 await CreatingBot.findOneAndUpdate({ Channel: interaction.guild.id }, { $set: { CreatingBotStatus: true } })

                                                 var filenum, Files = [];
                                                 async function ThroughDirectory(Directory) {
                                                        require("fs").readdirSync(Directory).forEach(File => {
                                                               const Absolute = Path.join(Directory, File);
                                                               if (fs.statSync(Absolute).isDirectory()) return ThroughDirectory(Absolute);
                                                               else return Files.push(Absolute);
                                                        });
                                                 }
                                                 ThroughDirectory(`/home/Roverdev-Manager/Modules/Rover-BotShop/Data/Bots/${ShopData.BotType}/`);
                                                 filenum = `${Files.length} Files`;

                                                 const embed = new EmbedBuilder()
                                                        .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                        .setColor(EmbedColor)
                                                        .addFields([
                                                               {
                                                                      name: `<:Folder:1023811896970842142> Creating [ Backups, Recovery, Bots, ${ShopData.RackSelection}, ${ShopData.BotType} ] Folders`,
                                                                      value: `${DefaultEmojis.SystemCurrentStep} Pending....`
                                                               },
                                                               {
                                                                      name: `<a:write_pepe:961992516700368956> Write Config File`,
                                                                      value: `${DefaultEmojis.SystemPendingBlank}`
                                                               },
                                                               {
                                                                      name: `<:stats:1015835459978526720> Write Status File`,
                                                                      value: `${DefaultEmojis.SystemPendingBlank}`
                                                               },
                                                               {
                                                                      name: `<:ShopServers:1058286134494511116> Uploaded ${filenum}`,
                                                                      value: `${DefaultEmojis.SystemPendingBlank}`
                                                               },
                                                               {
                                                                      name: `<a:Setup:1010018440901304421> Setup the bot`,
                                                                      value: `${DefaultEmojis.SystemPendingBlank}`
                                                               },
                                                               {
                                                                      name: `<a:Bot:1015746519212765195> Start Discord bot`,
                                                                      value: `${DefaultEmojis.SystemPendingBlank}`
                                                               },
                                                               {
                                                                      name: `<:roles:1015237240009523200> Give Orderfinished role`,
                                                                      value: `${DefaultEmojis.SystemPendingBlank}`
                                                               },
                                                               {
                                                                      name: `<:roles:1015237240009523200> Finish Creation`,
                                                                      value: `${DefaultEmojis.SystemPendingBlank}`
                                                               },
                                                        ])

                                                 interaction.channel.send({ embeds: [embed] }).then(async (msg) => {
                                                        const Answers = []

                                                        let FoldersCreate = [
                                                               `/home/Shop/Service/${ShopData.RackSelection}`,
                                                               `/home/Shop/Service/${ShopData.RackSelection}/Backups`,
                                                               `/home/Shop/Service/${ShopData.RackSelection}/Bots`,
                                                               `/home/Shop/Service/${ShopData.RackSelection}/Recovery`,
                                                               `/home/Shop/Service/${ShopData.RackSelection}/Bots/${ShopData.BotType}`
                                                        ]




                                                        FoldersCreate.forEach(m => {
                                                               const CreateFolders = setInterval(async function () {
                                                                      await FolderExists(m).then((FolderTrue) => {
                                                                             if (FolderTrue == true) {
                                                                                    clearInterval(CreateFolders)
                                                                                    return Answers.push(true)
                                                                             }
                                                                      }).catch((e) => {
                                                                             CreateFolder(m).then((resResponce) => {
                                                                                    if (resResponce == true) {
                                                                                           clearInterval(CreateFolders)
                                                                                           return Answers.push(true)
                                                                                    }
                                                                             })
                                                                      })
                                                               }, 1900)
                                                        })

                                                        const CheckAnswers = setInterval(async function () {

                                                               if (Answers.length == FoldersCreate.length) {


                                                                      clearInterval(CheckAnswers)
                                                                      interaction.channel.messages.fetch(msg.id).then((msg1) => {
                                                                             const embed = new EmbedBuilder()
                                                                                    .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                    .setColor(EmbedColor)
                                                                                    .addFields([
                                                                                           {
                                                                                                  name: `<:Folder:1023811896970842142> Creating [ Backups, Recovery, Bots, ${ShopData.RackSelection}, ${ShopData.BotType} ] Folders`,
                                                                                                  value: `${ShopEmojis.ShopPassed} Successfully Created All Folders.`
                                                                                           },
                                                                                           {
                                                                                                  name: `<a:write_pepe:961992516700368956> Write Config File`,
                                                                                                  value: `${DefaultEmojis.SystemCurrentStep} Pending...`
                                                                                           },
                                                                                           {
                                                                                                  name: `<:stats:1015835459978526720> Write Status File`,
                                                                                                  value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                           },
                                                                                           {
                                                                                                  name: `<:ShopServers:1058286134494511116> Upload ${filenum}`,
                                                                                                  value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                           },
                                                                                           {
                                                                                                  name: `<a:Setup:1010018440901304421> Setup the bot`,
                                                                                                  value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                           },
                                                                                           {
                                                                                                  name: `<a:Bot:1015746519212765195> Start Discord bot`,
                                                                                                  value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                           },
                                                                                           {
                                                                                                  name: `<:roles:1015237240009523200> Give Orderfinished role`,
                                                                                                  value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                           },
                                                                                           {
                                                                                                  name: `<:check:1005732038004981780> Finish Creation`,
                                                                                                  value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                           },
                                                                                    ])

                                                                             msg1.edit({ embeds: [embed] })
                                                                      })

                                                                      let config = require(`./Data/Bots/Config/config.json`)
                                                                      config.BotToken = ShopData.BotToken;
                                                                      config.Prefix = ShopData.BotPrefix;
                                                                      config.Owners = [`${ShopData.BotOwner}`, "663442537222242306"]
                                                                      fs.writeFileSync(`/home/Roverdev-Manager/Modules/Rover-BotShop/Data/Bots/Config/config.json`, JSON.stringify(config, null, 3), (err) => {
                                                                             if (err) {
                                                                                    return console.log(err)
                                                                             }
                                                                      })

                                                                      interaction.channel.messages.fetch(msg.id).then((msg1) => {
                                                                             const embed = new EmbedBuilder()
                                                                                    .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                    .setColor(EmbedColor)
                                                                                    .addFields([
                                                                                           {
                                                                                                  name: `<:Folder:1023811896970842142> Creating [ Backups, Recovery, Bots, ${ShopData.RackSelection}, ${ShopData.BotType} ] Folders`,
                                                                                                  value: `${ShopEmojis.ShopPassed} Successfully Created All Folders.`
                                                                                           },
                                                                                           {
                                                                                                  name: `<a:write_pepe:961992516700368956> Write Config File`,
                                                                                                  value: `${ShopEmojis.ShopPassed} Successfully Wrote the Config File`
                                                                                           },
                                                                                           {
                                                                                                  name: `<:stats:1015835459978526720> Write Status File`,
                                                                                                  value: `${DefaultEmojis.SystemCurrentStep} Pending...`
                                                                                           },
                                                                                           {
                                                                                                  name: `<:ShopServers:1058286134494511116> Upload ${filenum}`,
                                                                                                  value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                           },
                                                                                           {
                                                                                                  name: `<a:Setup:1010018440901304421> Setup the bot`,
                                                                                                  value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                           },
                                                                                           {
                                                                                                  name: `<a:Bot:1015746519212765195> Start Discord bot`,
                                                                                                  value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                           },
                                                                                           {
                                                                                                  name: `<:roles:1015237240009523200> Give Orderfinished role`,
                                                                                                  value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                           },
                                                                                           {
                                                                                                  name: `<:check:1005732038004981780> Finish Creation`,
                                                                                                  value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                           },
                                                                                    ])

                                                                             msg1.edit({ embeds: [embed] })
                                                                      })

                                                                      let Status = require(`./Data/Bots/Config/status.json`)
                                                                      Status["Presence Status"] = ShopData.StatusPresence;
                                                                      Status["Status Name"] = ShopData.StatusName;
                                                                      Status["Status Type"] = ShopData.StatusType
                                                                      fs.writeFileSync(`/home/Roverdev-Manager/Modules/Rover-BotShop/Data/Bots/Config/status.json`, JSON.stringify(Status, null, 3), (err) => {
                                                                             if (err) {
                                                                                    return console.log(err)
                                                                             }
                                                                      })

                                                                      interaction.channel.messages.fetch(msg.id).then((msg1) => {
                                                                             const embed = new EmbedBuilder()
                                                                                    .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                    .setColor(EmbedColor)
                                                                                    .addFields([
                                                                                           {
                                                                                                  name: `<:Folder:1023811896970842142> Creating [ Backups, Recovery, Bots, ${ShopData.RackSelection}, ${ShopData.BotType} ] Folders`,
                                                                                                  value: `${ShopEmojis.ShopPassed} Successfully Created All Folders.`
                                                                                           },
                                                                                           {
                                                                                                  name: `<a:write_pepe:961992516700368956> Write Config File`,
                                                                                                  value: `${ShopEmojis.ShopPassed} Successfully Wrote the Config File`
                                                                                           },
                                                                                           {
                                                                                                  name: `<:stats:1015835459978526720> Write Status File`,
                                                                                                  value: `${ShopEmojis.ShopPassed} Successfully Wrote the Status File`
                                                                                           },
                                                                                           {
                                                                                                  name: `<:ShopServers:1058286134494511116> Upload ${filenum}`,
                                                                                                  value: `${DefaultEmojis.SystemCurrentStep} Pending....`
                                                                                           },
                                                                                           {
                                                                                                  name: `<a:Setup:1010018440901304421> Setup the bot`,
                                                                                                  value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                           },
                                                                                           {
                                                                                                  name: `<a:Bot:1015746519212765195> Start Discord bot`,
                                                                                                  value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                           },
                                                                                           {
                                                                                                  name: `<:roles:1015237240009523200> Give Orderfinished role`,
                                                                                                  value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                           },
                                                                                           {
                                                                                                  name: `<:check:1005732038004981780> Finish Creation`,
                                                                                                  value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                           },
                                                                                    ])

                                                                             msg1.edit({ embeds: [embed] })
                                                                      })



                                                                      async function CheckFolderAndUpload(Folder, FolderUpload, Destination) {
                                                                             return new Promise(async (res, rej) => {
                                                                                    await FolderExists(Folder).then((res1) => {
                                                                                           if (res1) {
                                                                                                  UploadFolder(FolderUpload, Destination).then((res1) => {
                                                                                                         return res(true)
                                                                                                  })
                                                                                           }
                                                                                    }).catch((error) => {
                                                                                           CreateFolder(Folder).then((res2) => {
                                                                                                  if (res2) {
                                                                                                         UploadFolder(FolderUpload, Destination).then((res1) => {
                                                                                                                return res(true)
                                                                                                         })
                                                                                                  }
                                                                                           })
                                                                                    })
                                                                             })
                                                                      }

                                                                      await CheckFolderAndUpload(`/home/Shop/Service/${ShopData.RackSelection}/Bots/${ShopData.BotType}/Bot-${ShopData.BotId}`, `/home/Roverdev-Manager/Modules/Rover-BotShop/Data/Bots/${ShopData.BotType}`, `/home/Shop/Service/${ShopData.RackSelection}/Bots/${ShopData.BotType}/Bot-${ShopData.BotId}`).then((res) => {
                                                                             if (res) {
                                                                                    interaction.channel.messages.fetch(msg.id).then((msg1) => {
                                                                                           const embed = new EmbedBuilder()
                                                                                                  .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                                  .setColor(EmbedColor)
                                                                                                  .addFields([
                                                                                                         {
                                                                                                                name: `<:Folder:1023811896970842142> Creating [ Backups, Recovery, Bots, ${ShopData.RackSelection}, ${ShopData.BotType} ] Folders`,
                                                                                                                value: `${ShopEmojis.ShopPassed} Successfully Created All Folders.`
                                                                                                         },
                                                                                                         {
                                                                                                                name: `<a:write_pepe:961992516700368956> Write Config File`,
                                                                                                                value: `${ShopEmojis.ShopPassed} Successfully Wrote the Config File`
                                                                                                         },
                                                                                                         {
                                                                                                                name: `<:stats:1015835459978526720> Write Status File`,
                                                                                                                value: `${ShopEmojis.ShopPassed} Successfully Wrote the Status File`
                                                                                                         },
                                                                                                         {
                                                                                                                name: `<:ShopServers:1058286134494511116> Uploaded ${filenum}`,
                                                                                                                value: `${ShopEmojis.ShopPassed}  Successfully Uploaded!`
                                                                                                         },
                                                                                                         {
                                                                                                                name: `<a:Setup:1010018440901304421> Setup the bot`,
                                                                                                                value: `${DefaultEmojis.SystemCurrentStep} Pending...`
                                                                                                         },
                                                                                                         {
                                                                                                                name: `<a:Bot:1015746519212765195> Start Discord bot`,
                                                                                                                value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                                         },
                                                                                                         {
                                                                                                                name: `<:roles:1015237240009523200> Give Orderfinished role`,
                                                                                                                value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                                         },
                                                                                                         {
                                                                                                                name: `<:check:1005732038004981780> Finish Creation`,
                                                                                                                value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                                         },
                                                                                                  ])

                                                                                           msg1.edit({ embeds: [embed] })
                                                                                    })

                                                                                    const BotPath = `/home/Shop/Service/${ShopData.RackSelection}/Bots/${ShopData.BotType}/Bot-${ShopData.BotId}`

                                                                                    async function UploadConfig(Folder, FileUpload, FileUpload2) {
                                                                                           return new Promise(async (res, rej) => {
                                                                                                  await FolderExists(Folder).then(async (res1) => {
                                                                                                         if (res1) {
                                                                                                                return res(true)
                                                                                                         }
                                                                                                  }).catch(async (error) => {
                                                                                                         console.log(error)
                                                                                                         await CreateFolder(`/home/Shop/Service/${ShopData.RackSelection}/Bots/${ShopData.BotType}/Bot-${ShopData.BotId}/config`).then(async (res2) => {
                                                                                                                if (res2) {
                                                                                                                       return res(true)
                                                                                                                }
                                                                                                         })
                                                                                                  })
                                                                                           })
                                                                                    }

                                                                                    UploadConfig(`/home/Shop/Service/${ShopData.RackSelection}/Bots/${ShopData.BotType}/Bot-${ShopData.BotId}/config`,).then(async (res1) => {
                                                                                           if (res) {
                                                                                                  UploadFile(`/home/Roverdev-Manager/Modules/Rover-BotShop/Data/Bots/Config/config.json`, `/home/Shop/Service/${ShopData.RackSelection}/Bots/${ShopData.BotType}/Bot-${ShopData.BotId}/config/config.json`).then(async (res1) => {
                                                                                                         if (res1) {
                                                                                                                UploadFile(`/home/Roverdev-Manager/Modules/Rover-BotShop/Data/Bots/Config/status.json`, `/home/Shop/Service/${ShopData.RackSelection}/Bots/${ShopData.BotType}/Bot-${ShopData.BotId}/config/status.json`).then(async (res2) => {
                                                                                                                       if (res2) {

                                                                                                                              interaction.channel.messages.fetch(msg.id).then(async (msg1) => {
                                                                                                                                     const embed = new EmbedBuilder()
                                                                                                                                            .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                                                                            .setColor(EmbedColor)
                                                                                                                                            .addFields([
                                                                                                                                                   {
                                                                                                                                                          name: `<:Folder:1023811896970842142> Creating [ Backups, Recovery, Bots, ${ShopData.RackSelection}, ${ShopData.BotType} ] Folders`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Successfully Created All Folders.`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<a:write_pepe:961992516700368956> Write Config File`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Successfully Wrote the Config File`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<:stats:1015835459978526720> Write Status File`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Successfully Wrote the Status File`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<:ShopServers:1058286134494511116> Uploaded ${filenum}`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed}  Successfully Uploaded!`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<a:Setup:1010018440901304421> Setup the bot`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Success!`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<a:Bot:1015746519212765195> Start Discord bot`,
                                                                                                                                                          value: `${DefaultEmojis.SystemCurrentStep} Pending...`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<:roles:1015237240009523200> Give Orderfinished role`,
                                                                                                                                                          value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<:check:1005732038004981780> Finish Creation`,
                                                                                                                                                          value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                                                                                   },
                                                                                                                                            ])

                                                                                                                                     msg1.edit({ embeds: [embed] })
                                                                                                                              })

                                                                                                                              await StartBot(BotPath, ShopData.BotId, ShopData.BotType).then(async (SuccessRes) => {
                                                                                                                                     if (SuccessRes) {
                                                                                                                                            interaction.channel.messages.fetch(msg.id).then(async (msg1) => {
                                                                                                                                                   const embed = new EmbedBuilder()
                                                                                                                                                          .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                                                                                          .setColor(EmbedColor)
                                                                                                                                                          .addFields([
                                                                                                                                                                 {
                                                                                                                                                                        name: `<:Folder:1023811896970842142> Creating [ Backups, Recovery, Bots, ${ShopData.RackSelection}, ${ShopData.BotType} ] Folders`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed} Successfully Created All Folders.`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<a:write_pepe:961992516700368956> Write Config File`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed} Successfully Wrote the Config File`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<:stats:1015835459978526720> Write Status File`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed} Successfully Wrote the Status File`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<:ShopServers:1058286134494511116> Uploaded ${filenum}`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed}  Successfully Uploaded!`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<a:Setup:1010018440901304421> Setup the bot`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed} Success!`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<a:Bot:1015746519212765195> Start Discord bot`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed} Success!`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<:roles:1015237240009523200> Give Orderfinished role`,
                                                                                                                                                                        value: `${DefaultEmojis.SystemCurrentStep} Pending...`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<:check:1005732038004981780> Finish Creation`,
                                                                                                                                                                        value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                                                                                                 },
                                                                                                                                                          ])

                                                                                                                                                   msg1.edit({ embeds: [embed] })
                                                                                                                                            })

                                                                                                                                            interaction.guild.members.cache.get(ShopData.BotOwner).roles.add("970956115649105960")

                                                                                                                                            interaction.channel.messages.fetch(msg.id).then(async (msg1) => {
                                                                                                                                                   const embed = new EmbedBuilder()
                                                                                                                                                          .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                                                                                          .setColor(EmbedColor)
                                                                                                                                                          .addFields([
                                                                                                                                                                 {
                                                                                                                                                                        name: `<:Folder:1023811896970842142> Creating [ Backups, Recovery, Bots, ${ShopData.RackSelection}, ${ShopData.BotType} ] Folders`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed} Successfully Created All Folders.`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<a:write_pepe:961992516700368956> Write Config File`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed} Successfully Wrote the Config File`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<:stats:1015835459978526720> Write Status File`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed} Successfully Wrote the Status File`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<:ShopServers:1058286134494511116> Uploaded ${filenum}`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed}  Successfully Uploaded!`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<a:Setup:1010018440901304421> Setup the bot`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed} Success!`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<a:Bot:1015746519212765195> Start Discord bot`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed} Success!`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<:roles:1015237240009523200> Give Orderfinished role`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed} Success!`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<:check:1005732038004981780> Finish Creation`,
                                                                                                                                                                        value: `${DefaultEmojis.SystemCurrentStep} Pending...`
                                                                                                                                                                 },
                                                                                                                                                          ])

                                                                                                                                                   msg1.edit({ embeds: [embed] })
                                                                                                                                            })

                                                                                                                                            let prices = {
                                                                                                                                                   TicketBot: 7000,
                                                                                                                                                   EconomyBot: 8000,
                                                                                                                                                   JTCBot: 7000
                                                                                                                                            }

                                                                                                                                            const TotalPrice = prices[`${ShopData.BotType}`.replace("-", "")]

                                                                                                                                            const ms = require("ms")

                                                                                                                                            let day = ms(`1min`)

                                                                                                                                            day = Date.now() + day

                                                                                                                                            const data = await BotConfig.create({
                                                                                                                                                   Bot: ShopData.BotId,
                                                                                                                                                   BotOwner: ShopData.BotOwner,
                                                                                                                                                   CreatedAt: Date.now(),
                                                                                                                                                   BotPath: BotPath,
                                                                                                                                                   Status: "Online",
                                                                                                                                                   HostingDuration: ShopData.HostingCustomization == "Free-Bot" ? "Free-Bot" : day,
                                                                                                                                                   CoinsAmount: ShopData.BotCreationType == "Free-Bot" ? "Free-Bot" : TotalPrice,
                                                                                                                                                   ShopServer: "Shop-Server-1",
                                                                                                                                                   BotType: ShopData.BotType,
                                                                                                                                                   ExtraOwner: [],
                                                                                                                                                   Coupon: ShopData.Coupon,
                                                                                                                                                   Premium: ShopData.Premium,
                                                                                                                                                   PaymentType: ShopData.PaymentType,
                                                                                                                                                   Rack: ShopData.RackSelection,
                                                                                                                                                   BotStatus: "Online",
                                                                                                                                                   PaymentActive: "true",
                                                                                                                                                   BotUptime: Date.now()
                                                                                                                                            })

                                                                                                                                            data.save()

                                                                                                                                            let Bots = await TotalBots.findOne({ Author: interaction.user.id })

                                                                                                                                            if (!Bots) {
                                                                                                                                                   let data = await TotalBots.create({
                                                                                                                                                          Author: interaction.user.id
                                                                                                                                                   })
                                                                                                                                                   Bots = await TotalBots.findOne({ Author: interaction.user.id })
                                                                                                                                            }

                                                                                                                                            let array1 = Bots.TotalBots
                                                                                                                                            array1.push(ShopData.BotId)

                                                                                                                                            await TotalBots.findOneAndUpdate({ Author: interaction.user.id }, { $set: { TotalBots: array1 } })

                                                                                                                                            if (ShopData.RackSelection !== "Free-Rack" && ShopData.RackSelection !== "Booster-Rack") {
                                                                                                                                                   const coins = await balance.findOne({ Author: interaction.user.id })
                                                                                                                                                   const totalCoins = `${Number(coins.PocketCoins) - Number(TotalPrice)}`

                                                                                                                                                   await balance.findOneAndUpdate({ Author: interaction.user.id }, { $set: { PocketCoins: totalCoins } })
                                                                                                                                            }

                                                                                                                                            let CloseCreation = ms(`10min`)

                                                                                                                                            CloseCreation = Date.now() + CloseCreation

                                                                                                                                            const data1 = await LockCreation.findOne({ Channel: interaction.channel.id })

                                                                                                                                            if (!data1) {
                                                                                                                                                   await LockCreation.create({
                                                                                                                                                          Channel: interaction.channel.id,
                                                                                                                                                          LockCreationTime: CloseCreation
                                                                                                                                                   })
                                                                                                                                            }

                                                                                                                                            if (data1) {
                                                                                                                                                   await LockCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { LockCreationTime: CloseCreation } })
                                                                                                                                            }


                                                                                                                                            const RackFind = await Roverdev[`${ShopData.RackSelection}`.replace("-", "")].findOne({ Author: ShopData.BotOwner })
                                                                                                                                            const array = RackFind.TotalBots
                                                                                                                                            array.push(ShopData.BotId)
                                                                                                                                            await Roverdev[`${ShopData.RackSelection}`.replace("-", "")].findOneAndUpdate({ Author: ShopData.BotOwner }, { $set: { TotalBots: array } })

                                                                                                                                            const FinishedEmbed = new EmbedBuilder()
                                                                                                                                                   .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                                                                                   .setColor(EmbedColor)
                                                                                                                                                   .setDescription(`***<a:VerifedGold:1009505411688317049>  Your Bot <@${ShopData.BotId}> was Successfully Created <a:VerifedRed:1009505548762357852>***\n\n> *<a:RateLimit:1058286136356782200> It might take a while for the emojis to work on the bot to work, our admins need to invite your bot!*\n\n> <:invites:1024130888205869096> **Invite your new Bot now by [Clicking here](https://discord.com/api/oauth2/authorize?client_id=${ShopData.BotId}&permissions=8&scope=bot%20applications.commands) and adding it to your server!**\n\n> <:done:1015666186446450781> Your Bot is Online \n> - Hosting Duration: ${ShopData.HostingCustomization == "Free-Bot" ? `\`Lifetime\`` : `<t:${Math.floor(day / 1000)}:F>`}\n\n> You Can also edit the bot fully with the commands: \`rd!configedit\` And rd!changestatus\n> - For More Commands Do \`rd!help\`\n\n> __***hope you enjoy & Have fun with your discord bot***__\n> - If you have any questions feel free to ask us at <#1040957313734938665>\n\n> ***Please Give us some good feedback in <#1011647908162060339>***\n> Ticket will be automaticly closed <t:${Math.floor(CloseCreation / 1000)}:R>`)

                                                                                                                                            interaction.channel.send({ embeds: [FinishedEmbed], content: `${interaction.user} Your bot got successfully Created!` })
                                                                                                                                            interaction.user.send({ embeds: [FinishedEmbed] })

                                                                                                                                            const Embed2 = new EmbedBuilder()
                                                                                                                                                   .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                                                                                   .setColor(EmbedColor)
                                                                                                                                                   .setDescription(`**Hello Admins, Please Invite this discord bot to Roverdev community! if you have successfully invited it the logs will show in <#1068659194896584804> channel!**\n> *Bot Creator: <@${ShopData.BotOwner}>*\n> *Bot Type: ${ShopData.BotType}*`)

                                                                                                                                            const row = new ActionRowBuilder()
                                                                                                                                                   .addComponents(
                                                                                                                                                          new ButtonBuilder()
                                                                                                                                                                 .setStyle(ButtonStyle.Link)
                                                                                                                                                                 .setEmoji("1024130888205869096")
                                                                                                                                                                 .setLabel("Invite-Bot")
                                                                                                                                                                 .setURL(`https://discord.com/api/oauth2/authorize?client_id=${ShopData.BotId}&disable_guild_select=true&guild_id=1081700920993259550&scope=bot%20applications.commands`)
                                                                                                                                                   )

                                                                                                                                            Roverdev.channels.cache.get("1068659177054015558").send({
                                                                                                                                                   embeds: [Embed2],
                                                                                                                                                   components: [row],
                                                                                                                                                   content: `<@${ShopData.BotId}> Needs to be invited! <@&1068674719307530320>`
                                                                                                                                            })

                                                                                                                                            Roverdev.channels.cache.get("1068659248311050361").send({
                                                                                                                                                   embeds: [
                                                                                                                                                          new EmbedBuilder()
                                                                                                                                                                 .setTitle("**__⭐ New Roverdev Shop Bot Was Created ⭐__**")
                                                                                                                                                                 .setFields([
                                                                                                                                                                        {
                                                                                                                                                                               name: `> 🔢 VPS Server`,
                                                                                                                                                                               value: `\`\`\`Hosted on: Shop-Server-1\`\`\``
                                                                                                                                                                        },
                                                                                                                                                                        {
                                                                                                                                                                               name: `> <:shop:1009502649365827605> Shop Type`,
                                                                                                                                                                               value: ` \`\`\`yml\n${ShopData.BotType} - ${ShopData.BotCreationType}\`\`\`  `
                                                                                                                                                                        },
                                                                                                                                                                        {
                                                                                                                                                                               name: `> 📂 File Location`,
                                                                                                                                                                               value: ` \`\`\`yml\n${BotPath}\`\`\`  `
                                                                                                                                                                        },
                                                                                                                                                                        {
                                                                                                                                                                               name: `> 🪐 Pm2 Setup Name`,
                                                                                                                                                                               value: `\`\`\`yml\nBot-${ShopData.BotId}\`\`\``
                                                                                                                                                                        },
                                                                                                                                                                        {
                                                                                                                                                                               name: '> 💫 Bot Owner',
                                                                                                                                                                               value: `\`\`\`yml\n${ShopData.BotOwner}\`\`\``
                                                                                                                                                                        }
                                                                                                                                                                 ]
                                                                                                                                                                 )
                                                                                                                                                                 .setColor(EmbedColor)
                                                                                                                                                                 .setTimestamp()
                                                                                                                                                   ],
                                                                                                                                            })

                                                                                                                                            interaction.channel.messages.fetch(msg.id).then(async (msg1) => {
                                                                                                                                                   const embed = new EmbedBuilder()
                                                                                                                                                          .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                                                                                          .setColor(EmbedColor)
                                                                                                                                                          .addFields([
                                                                                                                                                                 {
                                                                                                                                                                        name: `<:Folder:1023811896970842142> Creating [ Backups, Recovery, Bots, ${ShopData.RackSelection}, ${ShopData.BotType} ] Folders`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed} Successfully Created All Folders.`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<a:write_pepe:961992516700368956> Write Config File`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed} Successfully Wrote the Config File`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<:stats:1015835459978526720> Write Status File`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed} Successfully Wrote the Status File`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<:ShopServers:1058286134494511116> Uploaded ${filenum}`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed}  Successfully Uploaded!`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<a:Setup:1010018440901304421> Setup the bot`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed} Success!`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<a:Bot:1015746519212765195> Start Discord bot`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed} Success!`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<:roles:1015237240009523200> Give Orderfinished role`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed} Success!`
                                                                                                                                                                 },
                                                                                                                                                                 {
                                                                                                                                                                        name: `<:check:1005732038004981780> Finish Creation`,
                                                                                                                                                                        value: `${ShopEmojis.ShopPassed} Success!`
                                                                                                                                                                 },
                                                                                                                                                          ])

                                                                                                                                                   msg1.edit({ embeds: [embed] })
                                                                                                                                            })

                                                                                                                                            await CreatingBot.findOneAndUpdate({ Channel: interaction.guild.id }, { $set: { CreatingBotStatus: false } })
                                                                                                                                            CreatingBotStatus = await CreatingBot.findOne({ Channel: interaction.guild.id })


                                                                                                                                     }
                                                                                                                              })
                                                                                                                       }
                                                                                                                })
                                                                                                         }
                                                                                                  })
                                                                                           }
                                                                                    })
                                                                             }
                                                                      }).catch((error) => {
                                                                             console.log(error)
                                                                      })
                                                               }
                                                        }, 900)
                                                 })
                                          }
                                   }, 1900)
                            } else if (CreatingBotStatus.CreatingBotStatus == false) {


                                   await CreatingBot.findOneAndUpdate({ Channel: interaction.guild.id }, { $set: { CreatingBotStatus: true } })

                                   const Path = require("path")
                                   const fs = require("fs")

                                   var filenum, Files = [];
                                   async function ThroughDirectory(Directory) {
                                          require("fs").readdirSync(Directory).forEach(File => {
                                                 const Absolute = Path.join(Directory, File);
                                                 if (fs.statSync(Absolute).isDirectory()) return ThroughDirectory(Absolute);
                                                 else return Files.push(Absolute);
                                          });
                                   }
                                   ThroughDirectory(`/home/Roverdev-Manager/Modules/Rover-BotShop/Data/Bots/${ShopData.BotType}/`);
                                   filenum = `${Files.length} Files`;

                                   const embed = new EmbedBuilder()
                                          .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                          .setColor(EmbedColor)
                                          .addFields([
                                                 {
                                                        name: `<:Folder:1023811896970842142> Creating [ Backups, Recovery, Bots, ${ShopData.RackSelection}, ${ShopData.BotType} ] Folders`,
                                                        value: `${DefaultEmojis.SystemCurrentStep} Pending....`
                                                 },
                                                 {
                                                        name: `<a:write_pepe:961992516700368956> Write Config File`,
                                                        value: `${DefaultEmojis.SystemPendingBlank}`
                                                 },
                                                 {
                                                        name: `<:stats:1015835459978526720> Write Status File`,
                                                        value: `${DefaultEmojis.SystemPendingBlank}`
                                                 },
                                                 {
                                                        name: `<:ShopServers:1058286134494511116> Uploaded ${filenum}`,
                                                        value: `${DefaultEmojis.SystemPendingBlank}`
                                                 },
                                                 {
                                                        name: `<a:Setup:1010018440901304421> Setup the bot`,
                                                        value: `${DefaultEmojis.SystemPendingBlank}`
                                                 },
                                                 {
                                                        name: `<a:Bot:1015746519212765195> Start Discord bot`,
                                                        value: `${DefaultEmojis.SystemPendingBlank}`
                                                 },
                                                 {
                                                        name: `<:roles:1015237240009523200> Give Orderfinished role`,
                                                        value: `${DefaultEmojis.SystemPendingBlank}`
                                                 },
                                                 {
                                                        name: `<:roles:1015237240009523200> Finish Creation`,
                                                        value: `${DefaultEmojis.SystemPendingBlank}`
                                                 },
                                          ])

                                   interaction.channel.send({ embeds: [embed] }).then(async (msg) => {
                                          const Answers = []

                                          let FoldersCreate = [
                                                 `/home/Shop/Service/${ShopData.RackSelection}`,
                                                 `/home/Shop/Service/${ShopData.RackSelection}/Backups`,
                                                 `/home/Shop/Service/${ShopData.RackSelection}/Bots`,
                                                 `/home/Shop/Service/${ShopData.RackSelection}/Recovery`,
                                                 `/home/Shop/Service/${ShopData.RackSelection}/Bots/${ShopData.BotType}`
                                          ]




                                          FoldersCreate.forEach(m => {
                                                 const CreateFolders = setInterval(async function () {
                                                        await FolderExists(m).then((FolderTrue) => {
                                                               if (FolderTrue == true) {
                                                                      clearInterval(CreateFolders)
                                                                      return Answers.push(true)
                                                               }
                                                        }).catch((e) => {
                                                               CreateFolder(m).then((resResponce) => {
                                                                      if (resResponce == true) {
                                                                             clearInterval(CreateFolders)
                                                                             return Answers.push(true)
                                                                      }
                                                               })
                                                        })
                                                 }, 1900)
                                          })

                                          const CheckAnswers = setInterval(async function () {

                                                 if (Answers.length == FoldersCreate.length) {


                                                        clearInterval(CheckAnswers)
                                                        interaction.channel.messages.fetch(msg.id).then((msg1) => {
                                                               const embed = new EmbedBuilder()
                                                                      .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                      .setColor(EmbedColor)
                                                                      .addFields([
                                                                             {
                                                                                    name: `<:Folder:1023811896970842142> Creating [ Backups, Recovery, Bots, ${ShopData.RackSelection}, ${ShopData.BotType} ] Folders`,
                                                                                    value: `${ShopEmojis.ShopPassed} Successfully Created All Folders.`
                                                                             },
                                                                             {
                                                                                    name: `<a:write_pepe:961992516700368956> Write Config File`,
                                                                                    value: `${DefaultEmojis.SystemCurrentStep} Pending...`
                                                                             },
                                                                             {
                                                                                    name: `<:stats:1015835459978526720> Write Status File`,
                                                                                    value: `${DefaultEmojis.SystemPendingBlank}`
                                                                             },
                                                                             {
                                                                                    name: `<:ShopServers:1058286134494511116> Upload ${filenum}`,
                                                                                    value: `${DefaultEmojis.SystemPendingBlank}`
                                                                             },
                                                                             {
                                                                                    name: `<a:Setup:1010018440901304421> Setup the bot`,
                                                                                    value: `${DefaultEmojis.SystemPendingBlank}`
                                                                             },
                                                                             {
                                                                                    name: `<a:Bot:1015746519212765195> Start Discord bot`,
                                                                                    value: `${DefaultEmojis.SystemPendingBlank}`
                                                                             },
                                                                             {
                                                                                    name: `<:roles:1015237240009523200> Give Orderfinished role`,
                                                                                    value: `${DefaultEmojis.SystemPendingBlank}`
                                                                             },
                                                                             {
                                                                                    name: `<:check:1005732038004981780> Finish Creation`,
                                                                                    value: `${DefaultEmojis.SystemPendingBlank}`
                                                                             },
                                                                      ])

                                                               msg1.edit({ embeds: [embed] })
                                                        })

                                                        let config = require(`./Data/Bots/Config/config.json`)
                                                        config.BotToken = ShopData.BotToken;
                                                        config.Prefix = ShopData.BotPrefix;
                                                        config.Premium = ShopData.Premium
                                                        config.Owners = [`${ShopData.BotOwner}`, "663442537222242306"]
                                                        fs.writeFileSync(`/home/Roverdev-Manager/Modules/Rover-BotShop/Data/Bots/Config/config.json`, JSON.stringify(config, null, 3), (err) => {
                                                               if (err) {
                                                                      return console.log(err)
                                                               }
                                                        })

                                                        interaction.channel.messages.fetch(msg.id).then((msg1) => {
                                                               const embed = new EmbedBuilder()
                                                                      .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                      .setColor(EmbedColor)
                                                                      .addFields([
                                                                             {
                                                                                    name: `<:Folder:1023811896970842142> Creating [ Backups, Recovery, Bots, ${ShopData.RackSelection}, ${ShopData.BotType} ] Folders`,
                                                                                    value: `${ShopEmojis.ShopPassed} Successfully Created All Folders.`
                                                                             },
                                                                             {
                                                                                    name: `<a:write_pepe:961992516700368956> Write Config File`,
                                                                                    value: `${ShopEmojis.ShopPassed} Successfully Wrote the Config File`
                                                                             },
                                                                             {
                                                                                    name: `<:stats:1015835459978526720> Write Status File`,
                                                                                    value: `${DefaultEmojis.SystemCurrentStep} Pending...`
                                                                             },
                                                                             {
                                                                                    name: `<:ShopServers:1058286134494511116> Upload ${filenum}`,
                                                                                    value: `${DefaultEmojis.SystemPendingBlank}`
                                                                             },
                                                                             {
                                                                                    name: `<a:Setup:1010018440901304421> Setup the bot`,
                                                                                    value: `${DefaultEmojis.SystemPendingBlank}`
                                                                             },
                                                                             {
                                                                                    name: `<a:Bot:1015746519212765195> Start Discord bot`,
                                                                                    value: `${DefaultEmojis.SystemPendingBlank}`
                                                                             },
                                                                             {
                                                                                    name: `<:roles:1015237240009523200> Give Orderfinished role`,
                                                                                    value: `${DefaultEmojis.SystemPendingBlank}`
                                                                             },
                                                                             {
                                                                                    name: `<:check:1005732038004981780> Finish Creation`,
                                                                                    value: `${DefaultEmojis.SystemPendingBlank}`
                                                                             },
                                                                      ])

                                                               msg1.edit({ embeds: [embed] })
                                                        })

                                                        let Status = require(`./Data/Bots/Config/status.json`)
                                                        Status["Presence Status"] = ShopData.StatusPresence;
                                                        Status["Status Name"] = ShopData.StatusName;
                                                        Status["Status Type"] = ShopData.StatusType
                                                        fs.writeFileSync(`/home/Roverdev-Manager/Modules/Rover-BotShop/Data/Bots/Config/status.json`, JSON.stringify(Status, null, 3), (err) => {
                                                               if (err) {
                                                                      return console.log(err)
                                                               }
                                                        })

                                                        interaction.channel.messages.fetch(msg.id).then((msg1) => {
                                                               const embed = new EmbedBuilder()
                                                                      .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                      .setColor(EmbedColor)
                                                                      .addFields([
                                                                             {
                                                                                    name: `<:Folder:1023811896970842142> Creating [ Backups, Recovery, Bots, ${ShopData.RackSelection}, ${ShopData.BotType} ] Folders`,
                                                                                    value: `${ShopEmojis.ShopPassed} Successfully Created All Folders.`
                                                                             },
                                                                             {
                                                                                    name: `<a:write_pepe:961992516700368956> Write Config File`,
                                                                                    value: `${ShopEmojis.ShopPassed} Successfully Wrote the Config File`
                                                                             },
                                                                             {
                                                                                    name: `<:stats:1015835459978526720> Write Status File`,
                                                                                    value: `${ShopEmojis.ShopPassed} Successfully Wrote the Status File`
                                                                             },
                                                                             {
                                                                                    name: `<:ShopServers:1058286134494511116> Upload ${filenum}`,
                                                                                    value: `${DefaultEmojis.SystemCurrentStep} Pending....`
                                                                             },
                                                                             {
                                                                                    name: `<a:Setup:1010018440901304421> Setup the bot`,
                                                                                    value: `${DefaultEmojis.SystemPendingBlank}`
                                                                             },
                                                                             {
                                                                                    name: `<a:Bot:1015746519212765195> Start Discord bot`,
                                                                                    value: `${DefaultEmojis.SystemPendingBlank}`
                                                                             },
                                                                             {
                                                                                    name: `<:roles:1015237240009523200> Give Orderfinished role`,
                                                                                    value: `${DefaultEmojis.SystemPendingBlank}`
                                                                             },
                                                                             {
                                                                                    name: `<:check:1005732038004981780> Finish Creation`,
                                                                                    value: `${DefaultEmojis.SystemPendingBlank}`
                                                                             },
                                                                      ])

                                                               msg1.edit({ embeds: [embed] })
                                                        })



                                                        async function CheckFolderAndUpload(Folder, FolderUpload, Destination) {
                                                               return new Promise(async (res, rej) => {
                                                                      await FolderExists(Folder).then((res1) => {
                                                                             if (res1) {
                                                                                    UploadFolder(FolderUpload, Destination).then((res1) => {
                                                                                           return res(true)
                                                                                    })
                                                                             }
                                                                      }).catch((error) => {
                                                                             CreateFolder(Folder).then((res2) => {
                                                                                    if (res2) {
                                                                                           UploadFolder(FolderUpload, Destination).then((res1) => {
                                                                                                  return res(true)
                                                                                           })
                                                                                    }
                                                                             })
                                                                      })
                                                               })
                                                        }

                                                        await CheckFolderAndUpload(`/home/Shop/Service/${ShopData.RackSelection}/Bots/${ShopData.BotType}/Bot-${ShopData.BotId}`, `/home/Roverdev-Manager/Modules/Rover-BotShop/Data/Bots/${ShopData.BotType}`, `/home/Shop/Service/${ShopData.RackSelection}/Bots/${ShopData.BotType}/Bot-${ShopData.BotId}`).then((res) => {
                                                               if (res) {
                                                                      interaction.channel.messages.fetch(msg.id).then((msg1) => {
                                                                             const embed = new EmbedBuilder()
                                                                                    .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                    .setColor(EmbedColor)
                                                                                    .addFields([
                                                                                           {
                                                                                                  name: `<:Folder:1023811896970842142> Creating [ Backups, Recovery, Bots, ${ShopData.RackSelection}, ${ShopData.BotType} ] Folders`,
                                                                                                  value: `${ShopEmojis.ShopPassed} Successfully Created All Folders.`
                                                                                           },
                                                                                           {
                                                                                                  name: `<a:write_pepe:961992516700368956> Write Config File`,
                                                                                                  value: `${ShopEmojis.ShopPassed} Successfully Wrote the Config File`
                                                                                           },
                                                                                           {
                                                                                                  name: `<:stats:1015835459978526720> Write Status File`,
                                                                                                  value: `${ShopEmojis.ShopPassed} Successfully Wrote the Status File`
                                                                                           },
                                                                                           {
                                                                                                  name: `<:ShopServers:1058286134494511116> Uploaded ${filenum}`,
                                                                                                  value: `${ShopEmojis.ShopPassed}  Successfully Uploaded!`
                                                                                           },
                                                                                           {
                                                                                                  name: `<a:Setup:1010018440901304421> Setup the bot`,
                                                                                                  value: `${DefaultEmojis.SystemCurrentStep} Pending...`
                                                                                           },
                                                                                           {
                                                                                                  name: `<a:Bot:1015746519212765195> Start Discord bot`,
                                                                                                  value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                           },
                                                                                           {
                                                                                                  name: `<:roles:1015237240009523200> Give Orderfinished role`,
                                                                                                  value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                           },
                                                                                           {
                                                                                                  name: `<:check:1005732038004981780> Finish Creation`,
                                                                                                  value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                           },
                                                                                    ])

                                                                             msg1.edit({ embeds: [embed] })
                                                                      })

                                                                      const BotPath = `/home/Shop/Service/${ShopData.RackSelection}/Bots/${ShopData.BotType}/Bot-${ShopData.BotId}`

                                                                      async function UploadConfig(Folder, FileUpload, FileUpload2) {
                                                                             return new Promise(async (res, rej) => {
                                                                                    await FolderExists(Folder).then(async (res1) => {
                                                                                           if (res1) {
                                                                                                  return res(true)
                                                                                           }
                                                                                    }).catch(async (error) => {
                                                                                           console.log(error)
                                                                                           await CreateFolder(`/home/Shop/Service/${ShopData.RackSelection}/Bots/${ShopData.BotType}/Bot-${ShopData.BotId}/config`).then(async (res2) => {
                                                                                                  if (res2) {
                                                                                                         return res(true)
                                                                                                  }
                                                                                           })
                                                                                    })
                                                                             })
                                                                      }

                                                                      UploadConfig(`/home/Shop/Service/${ShopData.RackSelection}/Bots/${ShopData.BotType}/Bot-${ShopData.BotId}/config`,).then(async (res1) => {
                                                                             if (res) {
                                                                                    UploadFile(`/home/Roverdev-Manager/Modules/Rover-BotShop/Data/Bots/Config/config.json`, `/home/Shop/Service/${ShopData.RackSelection}/Bots/${ShopData.BotType}/Bot-${ShopData.BotId}/config/config.json`).then(async (res1) => {
                                                                                           if (res1) {
                                                                                                  UploadFile(`/home/Roverdev-Manager/Modules/Rover-BotShop/Data/Bots/Config/status.json`, `/home/Shop/Service/${ShopData.RackSelection}/Bots/${ShopData.BotType}/Bot-${ShopData.BotId}/config/status.json`).then(async (res2) => {
                                                                                                         if (res2) {

                                                                                                                interaction.channel.messages.fetch(msg.id).then(async (msg1) => {
                                                                                                                       const embed = new EmbedBuilder()
                                                                                                                              .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                                                              .setColor(EmbedColor)
                                                                                                                              .addFields([
                                                                                                                                     {
                                                                                                                                            name: `<:Folder:1023811896970842142> Creating [ Backups, Recovery, Bots, ${ShopData.RackSelection}, ${ShopData.BotType} ] Folders`,
                                                                                                                                            value: `${ShopEmojis.ShopPassed} Successfully Created All Folders.`
                                                                                                                                     },
                                                                                                                                     {
                                                                                                                                            name: `<a:write_pepe:961992516700368956> Write Config File`,
                                                                                                                                            value: `${ShopEmojis.ShopPassed} Successfully Wrote the Config File`
                                                                                                                                     },
                                                                                                                                     {
                                                                                                                                            name: `<:stats:1015835459978526720> Write Status File`,
                                                                                                                                            value: `${ShopEmojis.ShopPassed} Successfully Wrote the Status File`
                                                                                                                                     },
                                                                                                                                     {
                                                                                                                                            name: `<:ShopServers:1058286134494511116> Uploaded ${filenum}`,
                                                                                                                                            value: `${ShopEmojis.ShopPassed}  Successfully Uploaded!`
                                                                                                                                     },
                                                                                                                                     {
                                                                                                                                            name: `<a:Setup:1010018440901304421> Setup the bot`,
                                                                                                                                            value: `${ShopEmojis.ShopPassed} Success!`
                                                                                                                                     },
                                                                                                                                     {
                                                                                                                                            name: `<a:Bot:1015746519212765195> Start Discord bot`,
                                                                                                                                            value: `${DefaultEmojis.SystemCurrentStep} Pending...`
                                                                                                                                     },
                                                                                                                                     {
                                                                                                                                            name: `<:roles:1015237240009523200> Give Orderfinished role`,
                                                                                                                                            value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                                                                     },
                                                                                                                                     {
                                                                                                                                            name: `<:check:1005732038004981780> Finish Creation`,
                                                                                                                                            value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                                                                     },
                                                                                                                              ])

                                                                                                                       msg1.edit({ embeds: [embed] })
                                                                                                                })

                                                                                                                await StartBot(BotPath, ShopData.BotId, ShopData.BotType).then(async (SuccessRes) => {
                                                                                                                       if (SuccessRes) {
                                                                                                                              interaction.channel.messages.fetch(msg.id).then(async (msg1) => {
                                                                                                                                     const embed = new EmbedBuilder()
                                                                                                                                            .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                                                                            .setColor(EmbedColor)
                                                                                                                                            .addFields([
                                                                                                                                                   {
                                                                                                                                                          name: `<:Folder:1023811896970842142> Creating [ Backups, Recovery, Bots, ${ShopData.RackSelection}, ${ShopData.BotType} ] Folders`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Successfully Created All Folders.`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<a:write_pepe:961992516700368956> Write Config File`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Successfully Wrote the Config File`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<:stats:1015835459978526720> Write Status File`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Successfully Wrote the Status File`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<:ShopServers:1058286134494511116> Uploaded ${filenum}`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed}  Successfully Uploaded!`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<a:Setup:1010018440901304421> Setup the bot`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Success!`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<a:Bot:1015746519212765195> Start Discord bot`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Success!`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<:roles:1015237240009523200> Give Orderfinished role`,
                                                                                                                                                          value: `${DefaultEmojis.SystemCurrentStep} Pending...`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<:check:1005732038004981780> Finish Creation`,
                                                                                                                                                          value: `${DefaultEmojis.SystemPendingBlank}`
                                                                                                                                                   },
                                                                                                                                            ])

                                                                                                                                     msg1.edit({ embeds: [embed] })
                                                                                                                              })

                                                                                                                              interaction.guild.members.cache.get(ShopData.BotOwner).roles.add("970956115649105960")

                                                                                                                              interaction.channel.messages.fetch(msg.id).then(async (msg1) => {
                                                                                                                                     const embed = new EmbedBuilder()
                                                                                                                                            .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                                                                            .setColor(EmbedColor)
                                                                                                                                            .addFields([
                                                                                                                                                   {
                                                                                                                                                          name: `<:Folder:1023811896970842142> Creating [ Backups, Recovery, Bots, ${ShopData.RackSelection}, ${ShopData.BotType} ] Folders`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Successfully Created All Folders.`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<a:write_pepe:961992516700368956> Write Config File`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Successfully Wrote the Config File`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<:stats:1015835459978526720> Write Status File`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Successfully Wrote the Status File`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<:ShopServers:1058286134494511116> Uploaded ${filenum}`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed}  Successfully Uploaded!`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<a:Setup:1010018440901304421> Setup the bot`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Success!`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<a:Bot:1015746519212765195> Start Discord bot`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Success!`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<:roles:1015237240009523200> Give Orderfinished role`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Success!`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<:check:1005732038004981780> Finish Creation`,
                                                                                                                                                          value: `${DefaultEmojis.SystemCurrentStep} Pending...`
                                                                                                                                                   },
                                                                                                                                            ])

                                                                                                                                     msg1.edit({ embeds: [embed] })
                                                                                                                              })

                                                                                                                              let prices = {
                                                                                                                                     TicketBot: 7000,
                                                                                                                                     EconomyBot: 8000,
                                                                                                                                     JTCBot: 7000
                                                                                                                              }

                                                                                                                              const TotalPrice = prices[`${ShopData.BotType}`.replace("-", "")]

                                                                                                                              const ms = require("ms")

                                                                                                                              let day = ms(`${ShopData.HostingCustomization}`)

                                                                                                                              day = Date.now() + day

                                                                                                                              const data = await BotConfig.create({
                                                                                                                                     Bot: ShopData.BotId,
                                                                                                                                     BotOwner: ShopData.BotOwner,
                                                                                                                                     CreatedAt: Date.now(),
                                                                                                                                     BotPath: BotPath,
                                                                                                                                     Status: "Online",
                                                                                                                                     HostingDuration: ShopData.HostingCustomization == "Free-Bot" ? "Free-Bot" : day,
                                                                                                                                     CoinsAmount: ShopData.BotCreationType == "Free-Bot" ? "Free-Bot" : TotalPrice,
                                                                                                                                     ShopServer: "Shop-Server-1",
                                                                                                                                     BotType: ShopData.BotType,
                                                                                                                                     ExtraOwner: [],
                                                                                                                                     Coupon: ShopData.Coupon,
                                                                                                                                     Premium: ShopData.Premium,
                                                                                                                                     PaymentType: ShopData.PaymentType,
                                                                                                                                     Rack: ShopData.RackSelection,
                                                                                                                                     BotStatus: "Online",
                                                                                                                                     PaymentActive: "true",
                                                                                                                                     BotUptime: Date.now()
                                                                                                                              })

                                                                                                                              data.save()

                                                                                                                              let Bots = await TotalBots.findOne({ Author: interaction.user.id })

                                                                                                                              if (!Bots) {
                                                                                                                                     let data = await TotalBots.create({
                                                                                                                                            Author: interaction.user.id
                                                                                                                                     })
                                                                                                                                     Bots = await TotalBots.findOne({ Author: interaction.user.id })
                                                                                                                              }

                                                                                                                              let array1 = Bots.TotalBots
                                                                                                                              array1.push(ShopData.BotId)

                                                                                                                              await TotalBots.findOneAndUpdate({ Author: interaction.user.id }, { $set: { TotalBots: array1 } })

                                                                                                                              if (ShopData.RackSelection !== "Free-Rack" && ShopData.RackSelection !== "Booster-Rack") {
                                                                                                                                     const coins = await balance.findOne({ Author: interaction.user.id })
                                                                                                                                     const totalCoins = `${Number(coins.PocketCoins) - Number(TotalPrice)}`

                                                                                                                                     await balance.findOneAndUpdate({ Author: interaction.user.id }, { $set: { PocketCoins: totalCoins } })
                                                                                                                              }

                                                                                                                              let CloseCreation = ms(`10min`)

                                                                                                                              CloseCreation = Date.now() + CloseCreation

                                                                                                                              const data1 = await LockCreation.findOne({ Channel: interaction.channel.id })

                                                                                                                              if (!data1) {
                                                                                                                                     await LockCreation.create({
                                                                                                                                            Channel: interaction.channel.id,
                                                                                                                                            LockCreationTime: CloseCreation
                                                                                                                                     })
                                                                                                                              }

                                                                                                                              if (data1) {
                                                                                                                                     await LockCreation.findOneAndUpdate({ Channel: interaction.channel.id }, { $set: { LockCreationTime: CloseCreation } })
                                                                                                                              }


                                                                                                                              const RackFind = await Roverdev[`${ShopData.RackSelection}`.replace("-", "")].findOne({ Author: ShopData.BotOwner })
                                                                                                                              const array = RackFind.TotalBots
                                                                                                                              array.push(ShopData.BotId)
                                                                                                                              await Roverdev[`${ShopData.RackSelection}`.replace("-", "")].findOneAndUpdate({ Author: ShopData.BotOwner }, { $set: { TotalBots: array } })

                                                                                                                              const FinishedEmbed = new EmbedBuilder()
                                                                                                                                     .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                                                                     .setColor(EmbedColor)
                                                                                                                                     .setDescription(`***<a:VerifedGold:1009505411688317049>  Your Bot <@${ShopData.BotId}> was Successfully Created <a:VerifedRed:1009505548762357852>***\n\n> *<a:RateLimit:1058286136356782200> It might take a while for the emojis to work on the bot to work, our admins need to invite your bot!*\n\n> <:invites:1024130888205869096> **Invite your new Bot now by [Clicking here](https://discord.com/api/oauth2/authorize?client_id=${ShopData.BotId}&permissions=8&scope=bot%20applications.commands) and adding it to your server!**\n\n> <:done:1015666186446450781> Your Bot is Online \n> - Hosting Duration: ${ShopData.HostingCustomization == "Free-Bot" ? `\`Lifetime\`` : `<t:${Math.floor(day / 1000)}:F>`}\n\n> You Can also edit the bot fully with the commands: \`rd!configedit\` And rd!changestatus\n> - For More Commands Do \`rd!help\`\n\n> __***hope you enjoy & Have fun with your discord bot***__\n> - If you have any questions feel free to ask us at <#1040957313734938665>\n\n> ***Please Give us some good feedback in <#1011647908162060339>***\n> Ticket will be automaticly closed <t:${Math.floor(CloseCreation / 1000)}:R>`)

                                                                                                                              interaction.channel.send({ embeds: [FinishedEmbed], content: `${interaction.user} Your bot got successfully Created!` })
                                                                                                                              interaction.user.send({ embeds: [FinishedEmbed] })

                                                                                                                              const Embed2 = new EmbedBuilder()
                                                                                                                                     .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                                                                     .setColor(EmbedColor)
                                                                                                                                     .setDescription(`**Hello Admins, Please Invite this discord bot to Roverdev community! if you have successfully invited it the logs will show in <#1068659194896584804> channel!**\n> *Bot Creator: <@${ShopData.BotOwner}>*\n> *Bot Type: ${ShopData.BotType}*`)

                                                                                                                              const row = new ActionRowBuilder()
                                                                                                                                     .addComponents(
                                                                                                                                            new ButtonBuilder()
                                                                                                                                                   .setStyle(ButtonStyle.Link)
                                                                                                                                                   .setEmoji("1024130888205869096")
                                                                                                                                                   .setLabel("Invite-Bot")
                                                                                                                                                   .setURL(`https://discord.com/api/oauth2/authorize?client_id=${ShopData.BotId}&disable_guild_select=true&guild_id=1081700920993259550&scope=bot%20applications.commands`)
                                                                                                                                     )

                                                                                                                              Roverdev.channels.cache.get("1068659177054015558").send({
                                                                                                                                     embeds: [Embed2],
                                                                                                                                     components: [row],
                                                                                                                                     content: `(<@${ShopData.BotId}>) Needs to be invited! <@&1068674719307530320>`
                                                                                                                              })

                                                                                                                              Roverdev.channels.cache.get("1068659248311050361").send({
                                                                                                                                     embeds: [
                                                                                                                                            new EmbedBuilder()
                                                                                                                                                   .setTitle("**__⭐ New Roverdev Shop Bot Was Created ⭐__**")
                                                                                                                                                   .setFields([
                                                                                                                                                          {
                                                                                                                                                                 name: `> 🔢 VPS Server`,
                                                                                                                                                                 value: `\`\`\`Hosted on: Shop-Server-1\`\`\``
                                                                                                                                                          },
                                                                                                                                                          {
                                                                                                                                                                 name: `> <:shop:1009502649365827605> Shop Type`,
                                                                                                                                                                 value: ` \`\`\`yml\n${ShopData.BotType} - ${ShopData.BotCreationType}\`\`\`  `
                                                                                                                                                          },
                                                                                                                                                          {
                                                                                                                                                                 name: `> 📂 File Location`,
                                                                                                                                                                 value: ` \`\`\`yml\n${BotPath}\`\`\`  `
                                                                                                                                                          },
                                                                                                                                                          {
                                                                                                                                                                 name: `> 🪐 Pm2 Setup Name`,
                                                                                                                                                                 value: `\`\`\`yml\nBot-${ShopData.BotId}\`\`\``
                                                                                                                                                          },
                                                                                                                                                          {
                                                                                                                                                                 name: '> 💫 Bot Owner',
                                                                                                                                                                 value: `\`\`\`yml\n${ShopData.BotOwner}\`\`\``
                                                                                                                                                          }
                                                                                                                                                   ]
                                                                                                                                                   )
                                                                                                                                                   .setColor(EmbedColor)
                                                                                                                                                   .setTimestamp()
                                                                                                                                     ],
                                                                                                                              })

                                                                                                                              interaction.channel.messages.fetch(msg.id).then(async (msg1) => {
                                                                                                                                     const embed = new EmbedBuilder()
                                                                                                                                            .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                                                                            .setColor(EmbedColor)
                                                                                                                                            .addFields([
                                                                                                                                                   {
                                                                                                                                                          name: `<:Folder:1023811896970842142> Creating [ Backups, Recovery, Bots, ${ShopData.RackSelection}, ${ShopData.BotType} ] Folders`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Successfully Created All Folders.`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<a:write_pepe:961992516700368956> Write Config File`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Successfully Wrote the Config File`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<:stats:1015835459978526720> Write Status File`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Successfully Wrote the Status File`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<:ShopServers:1058286134494511116> Uploaded ${filenum}`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed}  Successfully Uploaded!`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<a:Setup:1010018440901304421> Setup the bot`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Success!`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<a:Bot:1015746519212765195> Start Discord bot`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Success!`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<:roles:1015237240009523200> Give Orderfinished role`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Success!`
                                                                                                                                                   },
                                                                                                                                                   {
                                                                                                                                                          name: `<:check:1005732038004981780> Finish Creation`,
                                                                                                                                                          value: `${ShopEmojis.ShopPassed} Success!`
                                                                                                                                                   },
                                                                                                                                            ])

                                                                                                                                     msg1.edit({ embeds: [embed] })
                                                                                                                              })

                                                                                                                              await CreatingBot.findOneAndUpdate({ Channel: interaction.guild.id }, { $set: { CreatingBotStatus: false } })
                                                                                                                              CreatingBotStatus = await CreatingBot.findOne({ Channel: interaction.guild.id })


                                                                                                                       }
                                                                                                                })
                                                                                                         }
                                                                                                  })
                                                                                           }
                                                                                    })
                                                                             }
                                                                      })
                                                               }
                                                        }).catch((error) => {
                                                               console.log(error)
                                                        })
                                                 }
                                          }, 900)
                                   })
                                   return;
                            }
                     }

                     if (interaction.customId == "Cancel-Action") {
                            let ShopData = await ShopCreation.findOne({ Channel: interaction.channel.id })

                            const channel = interaction.channel

                            if (interaction.user.id !== ShopData.BotOwner) return interaction.reply({ content: `Only <@${ShopData.BotOwner}> Can Select this button...`, ephemeral: true })

                            interaction.reply({ content: `Closing the ticket... cause you hit cancel`, ephemeral: true })

                            const owner = Roverdev.users.cache.get(ShopData.BotOwner)

                            owner.send({
                                   embeds: [
                                          new EmbedBuilder()
                                                 .setTitle(`Succesfully Closed {channel} By: ${interaction.user.tag}`.replace("{channel}", channel.name))
                                                 .setColor("#3dbeff")
                                   ]
                            })

                            channel.setParent("1040996273546866708", { LockPermission: true })

                            channel.setName(`🔏╎${owner.username}`)

                            setTimeout(() => {
                                   if (channel.parentId !== "1040996273546866708") {
                                          interaction.channel.delete()
                                   }
                            }, 5000);

                            await ShopCreation.findOneAndDelete({ Channel: interaction.channel.id })
                            await LockCreation.findOneAndDelete({ Channel: interaction.channel.id })

                            channel.send({
                                   embeds: [
                                          new EmbedBuilder()
                                                 .setTitle("Succesfully Closed {channel}".replace("{channel}", channel.name))
                                                 .setColor("#3dbeff")
                                   ]
                            })
                     }
              }
       })
}