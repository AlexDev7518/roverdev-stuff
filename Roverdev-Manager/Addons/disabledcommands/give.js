const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")
const { EmbedColor } = require("../../../Configuration/EmbedConfig")
const balance = require("../../../Databases/Schema/RoverCoins/balance")
const TotalCoins = require("../../../Databases/Schema/RoverCoins/TotalCoins")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
//          const data1 = await balance.findOne({ Author: message.author.id })

//          if (data1) {
//                 const Amount = args[0]

//                 if (!Amount) return message.reply({ content: `Please Provide a amount of coins!` })

//                 if (Amount.includes("-")) return message.reply({ content: `Please Provide a Valid Number.` })
//                 if (isNaN(Amount)) return message.reply({ content: `Please Provide a Valid Number.` })
//                 if (data1.PocketCoins < Amount) return message.reply({ content: `You don't have \`${Amount}\` in your account! please provide a number under ${data1.TotalCoins}` })
                

//                 if (!args[0]) return message.reply({ content: `Please Provide a Amount!` })
//                 let user = args[1] || message.mentions.members.first()

//                 if (!args[1]) return message.reply({ content: `Please Provide a user.` })

//                 const tax = `${Amount * 0.1}`.split(".")[0]
//                 const total = `${Amount * 0.9}`.split(".")[0]

//                 if (args[1].includes(`@`)) {
//                      user = message.mentions.members.first()

//                      if (user.id == message.author.id) return message.reply({ content: `you can't give your self coins!` })

//                      const data = await balance.findOne({ Author: user.id })

//                      if (!data) {
//                            return message.reply({ content: `Seems this user does not have a bank to transfer money to!` })
//                      }

//                      const embed = new EmbedBuilder()
//                      .setAuthor({ name: `Roverdev Community | Rover Coins System`, iconURL: "https://cdn.discordapp.com/emojis/1058275133711728670.png" })
//                      .setColor(EmbedColor)
//                      .setDescription(`Hello You Are wanting to transfer ${total} to ${user}\n - *Note \`${tax}\` tax will be taken and not sent as its tax!*\n\n> Are you sure you want to send this money to this user?`)

//                      const button1 = new ButtonBuilder()
//                      .setCustomId("Accept-Transfer")
//                      .setLabel("Yes, Transfer")
//                      .setStyle(ButtonStyle.Success)

//                      const button2 = new ButtonBuilder()
//                      .setCustomId("Decline-Transfer")
//                      .setLabel("Decline, Transfer")
//                      .setStyle(ButtonStyle.Success)

//                      const row = new ActionRowBuilder().addComponents(button1,button2)

//                      const msg = await message.reply({ embeds: [embed], components: [row] })

//                      const filter = (interaction) => interaction.user.id === message.author.id;

//                      const collector = msg.createMessageComponentCollector({
//                        filter,
//                        time: 50000,
//                      });
               
//                      collector.on("collect", async (interaction) => {
//                             if (interaction.customId == "Accept-Transfer") {
//                                      button1.setDisabled(true)
//                                      button2.setDisabled(true)

//                                      interaction.message.edit({ components: [row] })

//                                      const embed = new EmbedBuilder()
//                                      .setAuthor({ name: `Roverdev Community | Rover Coins System`, iconURL: "https://cdn.discordapp.com/emojis/1058275133711728670.png" })
//                                      .setColor(EmbedColor)
//                                      .setDescription(`Successfully Transfered the Coins To This User. ${total}/${Amount}\n- *10% was taken off cause of tax.*`)

//                                      const Total = Number(data1.BankCoins)-Number(Amount)


//                                      await balance.findOneAndUpdate({ Author: message.author.id }, { $set: { BankCoins: Total } })
//                                      await balance.findOneAndUpdate({ Author: user.id }, { $set: { BankCoins: Number(data.BankCoins) + Number(total) }})
                                     
//                                      interaction.reply({ embeds: [embed] })
//                             } else if (interaction.customId == "Decline-Transfer" ) {
//                               button1.setDisabled(true)
//                               button2.setDisabled(true)

//                               interaction.message.edit({ components: [row] })

//                                  return interaction.reply({ content: `Stopped the Transfer!` })
//                             }
//                      })
//                 }
//                 if (!args[1].includes(`@`)) {
//                      user = Roverdev.users.cache.get(args[1])

//                      if (user.id == message.author.id) return message.reply({ content: `you can't give your self coins!` })

//                      const data = await balance.findOne({ Author: user.id })

//                      if (!data) {
//                            return message.reply({ content: `Seems this user does not have a bank to transfer money to!` })
//                      }

//                      const embed = new EmbedBuilder()
//                      .setAuthor({ name: `Roverdev Community | Rover Coins System`, iconURL: "https://cdn.discordapp.com/emojis/1058275133711728670.png" })
//                      .setColor(EmbedColor)
//                      .setDescription(`Hello You Are wanting to transfer ${total} to ${user}\n - *Note \`${tax}\` tax will be taken and not sent as its tax!*\n\n> Are you sure you want to send this money to this user?`)

//                      const button1 = new ButtonBuilder()
//                      .setCustomId("Accept-Transfer")
//                      .setLabel("Yes, Transfer")
//                      .setStyle(ButtonStyle.Success)

//                      const button2 = new ButtonBuilder()
//                      .setCustomId("Decline-Transfer")
//                      .setLabel("Decline, Transfer")
//                      .setStyle(ButtonStyle.Success)

//                      const row = new ActionRowBuilder().addComponents(button1,button2)

//                      const msg = await message.reply({ embeds: [embed], components: [row] })

//                      const filter = (interaction) => interaction.user.id === message.author.id;

//                      const collector = msg.createMessageComponentCollector({
//                        filter,
//                        time: 50000,
//                      });
               
//                      collector.on("collect", async (interaction) => {
//                             if (interaction.customId == "Accept-Transfer") {
//                                      button1.setDisabled(true)
//                                      button2.setDisabled(true)

//                                      interaction.message.edit({ components: [row] })

//                                      const embed = new EmbedBuilder()
//                                      .setAuthor({ name: `Roverdev Community | Rover Coins System`, iconURL: "https://cdn.discordapp.com/emojis/1058275133711728670.png" })
//                                      .setColor(EmbedColor)
//                                      .setDescription(`Successfully Transfered the Coins To This User. ${total}/${Amount}\n- *10% was taken off cause of tax.*`)

//                                      const Total = Number(data1.BankCoins)-Number(Amount)


//                                      await balance.findOneAndUpdate({ Author: message.author.id }, { $set: { BankCoins: Total } })
//                                      await balance.findOneAndUpdate({ Author: user.id }, { $set: { BankCoins: Number(data.BankCoins) + Number(total) }})
                                     
//                                      interaction.reply({ embeds: [embed] })
//                             } else if (interaction.customId == "Decline-Transfer" ) {
//                               button1.setDisabled(true)
//                               button2.setDisabled(true)

//                               interaction.message.edit({ components: [row] })

//                                  return interaction.reply({ content: `Stopped the Transfer!` })
//                             }
//                      })
//                 }
                

                
//          } else if (!data1) {
//                 return message.reply({ content: `You have no coins to transfer to another user` })
//          }
    }
}