const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")
const { EmbedColor } = require("../../../Configuration/EmbedConfig")
const balance = require("../../../Databases/Schema/RoverCoins/balance")
const TotalCoins = require("../../../Databases/Schema/RoverCoins/TotalCoins")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
         // Get money from your bank and put it in your pocket

         let data = await balance.findOne({ Author: message.author.id })
         let data2 = await TotalCoins.findOne({ Author: message.author.id })

         if (!data) return message.reply({ content: `You have no coins to withdraw` })

         const BankCoins = data.BankCoins
         const pocketCoins = data.PocketCoins
         const UsedBankCoins = data.UsedBankCoins
         const UsedTotalCoins = data.UsedCoins

         const amount = args[0]

         if (amount == 0) return message.reply({ content: `Please make sure the number is above 0` })

         if (!amount) return message.reply({ content: `Please provide the amount you want to add to your pocket!` })
         if (isNaN(amount)) return message.reply({ content: `Please Provide a Valid Number.` })
         if (amount.includes("-")) return message.reply({ content: `Please Provide a Valid Number.` })

         if (UsedBankCoins > BankCoins) {
                 await balance.findOneAndUpdate({ Author: message.author.id }, { $set: { UsedBankCoins: BankCoins } })
                 data = await balance.findOne({ Author: message.author.id })
         }

         if (UsedBankCoins == BankCoins) return message.reply({ content: `You already used all of your bank coins!` })

         if (BankCoins < amount) return message.reply({ content: `You don't have \`${amount}\` in your account! please provide a number under \`${data.BankCoins}\`` })

         const embed = new EmbedBuilder()
         .setAuthor({ name: `Roverdev Community | Rover Coins System`, iconURL: "https://cdn.discordapp.com/emojis/1058275133711728670.png" })
         .setColor(EmbedColor)
         .setDescription(`Hello, Are you sure you want to transfer \`${amount}\` to your pocket?`)

         const button1 = new ButtonBuilder()
         .setCustomId("Accept-withdraw")
         .setLabel("Yes, withdraw")
         .setStyle(ButtonStyle.Success)

         const button2 = new ButtonBuilder()
         .setCustomId("Decline-withdraw")
         .setLabel("Decline, withdraw")
         .setStyle(ButtonStyle.Danger)

         const row = new ActionRowBuilder().addComponents(button1,button2)

         const msg = await message.reply({ embeds: [embed], components: [row] })

         const filter = (interaction) => interaction.user.id === message.author.id;

         const collector = msg.createMessageComponentCollector({
           filter,
           time: 50000,
         });
   
         collector.on("collect", async (interaction) => {
                if (interaction.customId == "Accept-withdraw") {
                         button1.setDisabled(true)
                         button2.setDisabled(true)

                         interaction.message.edit({ components: [row] })

                         const embed = new EmbedBuilder()
                         .setAuthor({ name: `Roverdev Community | Rover Coins System`, iconURL: "https://cdn.discordapp.com/emojis/1058275133711728670.png" })
                         .setColor(EmbedColor)
                         .setDescription(`Successfully withdrawed \`${amount}\` to your pocket!`)

                         await balance.findOneAndUpdate({ Author: message.author.id }, { $set: { PocketCoins: Number(pocketCoins) + Number(amount), UsedBankCoins: Number(UsedBankCoins) + Number(amount), UsedCoins: Number(UsedTotalCoins) + Number(amount) } })
                    
                         
                         interaction.reply({ embeds: [embed] })
                } else if (interaction.customId == "Decline-withdraw" ) {
                  button1.setDisabled(true)
                  button2.setDisabled(true)

                  interaction.message.edit({ components: [row] })

                     return interaction.reply({ content: `Stopped the withdraw!` })
                }
         })
   }
}