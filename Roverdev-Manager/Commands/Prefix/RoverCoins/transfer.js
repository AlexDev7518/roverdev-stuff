const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")
const { EmbedColor } = require("../../../Configuration/EmbedConfig")
const balance = require("../../../Databases/Schema/RoverCoins/balance")
module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
         // Get money from your bank and put it in your pocket

         const data = await balance.findOne({ Author: message.author.id })

         if (!data) return message.reply({ content: `You have no coins to transfer to your bank` })

         const BankCoins = data.BankCoins
         const pocketCoins = data.PocketCoins
         const UsedBankCoins = data.UsedBankCoins
         const UsedTotalCoins = data.UsedCoins
         
         const amount = args[0]

         if (amount == 0) return message.reply({ content: `Please make sure the number is above 0` })

         if (!amount) return message.reply({ content: `Please provide the amount you want to add to your bank!` })
         if (isNaN(amount)) return message.reply({ content: `Please Provide a Valid Number.` })
         if (amount.includes("-")) return message.reply({ content: `Please Provide a Valid Number.` })

         if (pocketCoins == 0) return message.reply({ content: `You have no coins to transfer to your bank` })

         if (amount > UsedBankCoins) return message.reply({ content: `You don't have \`${amount}\` in your account! please provide a number under \`${pocketCoins}\`` }) 

         if (pocketCoins < amount) return message.reply({ content: `You don't have \`${amount}\` in your account! please provide a number under \`${pocketCoins}\`` })

         const embed = new EmbedBuilder()
         .setAuthor({ name: `Roverdev Community | Rover Coins System`, iconURL: "https://cdn.discordapp.com/emojis/1058275133711728670.png" })
         .setColor(EmbedColor)
         .setDescription(`Hello, Are you sure you want to transfer \`${amount}\` to your to your bank?`)

         const button1 = new ButtonBuilder()
         .setCustomId("Accept-transfer")
         .setLabel("Yes, transfer")
         .setStyle(ButtonStyle.Success)

         const button2 = new ButtonBuilder()
         .setCustomId("Decline-transfer")
         .setLabel("Decline, transfer")
         .setStyle(ButtonStyle.Danger)

         const row = new ActionRowBuilder().addComponents(button1,button2)

         const msg = await message.reply({ embeds: [embed], components: [row] })

         const filter = (interaction) => interaction.user.id === message.author.id;

         const collector = msg.createMessageComponentCollector({
           filter,
           time: 50000,
         });

         collector.on("collect", async (interaction) => {
                if (interaction.customId == "Accept-transfer") {
                         button1.setDisabled(true)
                         button2.setDisabled(true)

                         interaction.message.edit({ components: [row] })

                         const embed = new EmbedBuilder()
                         .setAuthor({ name: `Roverdev Community | Rover Coins System`, iconURL: "https://cdn.discordapp.com/emojis/1058275133711728670.png" })
                         .setColor(EmbedColor)
                         .setDescription(`Successfully tranfered \`${amount}\` to your bank!`)

                         await balance.findOneAndUpdate({ Author: message.author.id }, { $set: { BankCoins: Number(BankCoins) + Number(amount), PocketCoins: pocketCoins-amount } })
                         
                         interaction.reply({ embeds: [embed] })
                } else if (interaction.customId == "Decline-transfer" ) {
                  button1.setDisabled(true)
                  button2.setDisabled(true)

                  interaction.message.edit({ components: [row] })

                     return interaction.reply({ content: `Stopped the transfer!` })
                }
         })
   }
}