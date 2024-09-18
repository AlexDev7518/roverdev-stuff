const { EmbedBuilder } = require("discord.js")
const { EmbedColor } = require("../../../Configuration/EmbedConfig")
const RoverCoins = require("../../../Configuration/ShopConfig/RoverCoins")
const balance = require("../../../Databases/Schema/RoverCoins/balance")
const RcCooldowns = require("../../../Databases/Schema/RoverCoins/RcCooldowns")
const TotalCoins = require("../../../Databases/Schema/RoverCoins/TotalCoins")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {

    let data = await RcCooldowns.findOne({ Author: message.author.id })

    if (data && data?.DailyClaimed == true) {
             return message.reply({ content: `You Already claimed your Daily Coins! You Can Claim again <t:${Math.floor(data.DailyTime/1000)}:R>` })
    } else if (data && data?.DailyClaimed == false) {
      const embed = new EmbedBuilder()
      .setAuthor({ name: `Roverdev Community | Rover Coins System`, iconURL: "https://cdn.discordapp.com/emojis/1058275133711728670.png" })
      .setColor(EmbedColor)

              let data = await balance.findOne({ Author: message.author.id })

              if (!data) {
                  const data1 = await balance.create({ 
                           Author: message.author.id
                   })
                   data1.save()
  
                   data = await balance.findOne({ Author: message.author.id })
              }
  
              const AddCoinsToAccount = data.BankCoins + RoverCoins.Eco.daily

              await balance.findOneAndUpdate({ Author: message.author.id }, { $set: {
                    BankCoins:AddCoinsToAccount
              } })

              const data1 = await balance.findOne({ Author: message.author.id })

              const ms = require("ms")
  
              let day = ms("1d")
        
              day = Date.now() + day
              
              let data2 = await RcCooldowns.findOne({ Author: message.author.id })

              if (data2 == null) {
                     const data = RcCooldowns.create({
                               Author: message.author.id
                     })
                     ;(await data).save()

                     data2 = await RcCooldowns.findOne({ Author: message.author.id })
                 }

                 await RcCooldowns.findOneAndUpdate({ Author: message.author.id }, { $set: { DailyClaimed: true, DailyTime: day } })

              embed.setDescription(`Successfully Claimed Daily Coins of ${RoverCoins.Eco.daily} You Now have ${data1.BankCoins} in your wallet`)

              message.channel.send({
                    embeds: [embed]
              })
    } else if (data == null) {
      const embed = new EmbedBuilder()
      .setAuthor({ name: `Roverdev Community | Rover Coins System`, iconURL: "https://cdn.discordapp.com/emojis/1058275133711728670.png" })
      .setColor(EmbedColor)

              let data = await balance.findOne({ Author: message.author.id })

              if (!data) {
                  const data1 = await balance.create({ 
                           Author: message.author.id
                   })
                   data1.save()
  
                   data = await balance.findOne({ Author: message.author.id })
              }
  
              const AddCoinsToAccount = `${Number(data.BankCoins) + Number(RoverCoins.Eco.daily)}`

              if (AddCoinsToAccount.includes(".")) AddCoinsToAccount.split(".")[0]

              await balance.findOneAndUpdate({ Author: message.author.id }, { $set: {
                    BankCoins: AddCoinsToAccount
              } })

              const data1 = await balance.findOne({ Author: message.author.id })

              const ms = require("ms")
  
              let day = ms("1d")
        
              day = Date.now() + day
              
              let data2 = await RcCooldowns.findOne({ Author: message.author.id })

              if (data2 == null) {
                     const data = RcCooldowns.create({
                               Author: message.author.id
                     })
                     ;(await data).save()

                     data2 = await RcCooldowns.findOne({ Author: message.author.id })
                 }

                 await RcCooldowns.findOneAndUpdate({ Author: message.author.id }, { $set: { DailyClaimed: true, DailyTime: day } })

              embed.setDescription(`Successfully Claimed Daily Coins of ${RoverCoins.Eco.daily} You Now have ${data1.BankCoins} in your wallet`)

              message.channel.send({
                    embeds: [embed]
              })
    }
}
}