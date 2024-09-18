const { EmbedBuilder } = require("discord.js")
const { EmbedColor } = require("../../../Configuration/EmbedConfig")
const balance = require("../../../Databases/Schema/RoverCoins/balance")
const TotalCoins = require("../../../Databases/Schema/RoverCoins/TotalCoins")

module.exports = {
  PrefixConfiguration: {},
  Settings: {},

 CommandRun: async (Roverdev, message, args, executor) => {
       const Exec = args[0]
       if (!Exec) return message.reply({ content: `Please Provide one of these: withdraw, store\n> Example: \`rd!usecoins withdraw\`` })

       if (Exec == "withdraw") {
        const data = await balance.findOne({ Author: message.author.id })
        const data2 = await TotalCoins.findOne({ Author: message.author.id })

        if (!data) return message.reply({ content: `You have no coins to withdraw` })
        
        const RankingCoins = data2.RankingCoins
        const InviteCoins = data2.InviteCoins
        const PaiedCoins = data2.PaiedCoins
        const DefaultCoins = data2.DefaultCoins

        const UsedRankingCoins = data2.UsedRankingCoins
        const UsedInviteCoins = data2.UsedInviteCoins
        const UsedPaiedCoins = data2.UsedPaiedCoins
        const UsedDefaultCoins = data2.UsedDefaultCoins

        const UsedTotalCoins = data.UsedCoins

        const PocketCoins = data.PocketCoins

        let array = []

        if (RankingCoins > 0) array.push("RankingCoins")
        if (InviteCoins > 0) array.push("InviteCoins")
        if (PaiedCoins > 0) array.push("PayedCoins")
        if (DefaultCoins > 0) array.push("DefaultCoins")

        if (args[1] == "RankingCoins" && RankingCoins ==  UsedRankingCoins) return message.reply({ content: `You can't go over the limit!` })
        if (args[1] == "InviteCoins" && InviteCoins ==  UsedRankingCoins ) return message.reply({ content: `You can't go over the limit!` })
        if (args[1] == "PaiedCoins" && PaiedCoins == UsedRankingCoins ) return message.reply({ content: `You can't go over the limit!` })
        if (args[1] == "DefaultCoins" && DefaultCoins  ==  UsedRankingCoins ) return message.reply({ content: `You can't go over the limit!` })


        if (args[1] == "RankingCoins" && RankingCoins  == 0 ) return message.reply({ content: `Seems You have no cash in here!` })
        if (args[1] == "InviteCoins" && InviteCoins  == 0 ) return message.reply({ content: `Seems You have no cash in here!` })
        if (args[1] == "PaiedCoins" && PaiedCoins  == 0 ) return message.reply({ content: `Seems You have no cash in here!` })
        if (args[1] == "DefaultCoins" && DefaultCoins  == 0 ) return message.reply({ content: `Seems You have no cash in here!` })

          const embed = new EmbedBuilder()
          .setAuthor({ name: `Roverdev Community | Rover Coins System`, iconURL: "https://cdn.discordapp.com/emojis/1058275133711728670.png" })
          .setColor(EmbedColor)
          .setDescription(`Please Provide one of these: ${array.map(m => `${m}`).join(",")}\n> it should be like this: rd!usecoins withdraw <value> <coins>`)

          if (!args[1]) return message.reply({ embeds: [embed] })

          if (!array.includes(args[1])) return message.reply({ content: `Please Provide One of these: ${array.map(m => `${m}`).join(",")}` }) 

          if (array.includes(args[1])) {
                      if (!args[2]) return message.reply({ content: `Please Tell us how many coins you want to use!` })
                      if (isNaN(args[2])) return message.reply({ content: `Please Give me a valid number!` })
                      if (args[2].includes("-")) return message.reply({ content: `Please Provide a non negitive number!` })

                      if (args[1] == "RankingCoins" && Number(UsedRankingCoins) + Number(args[2]) > RankingCoins ) return message.reply({ content: `You don't have this much cash!` })
                      if (args[1] == "InviteCoins" && Number(UsedInviteCoins) + Number(args[2]) > InviteCoins ) return message.reply({ content: `You don't have this much cash!` })
                      if (args[1] == "PaiedCoins" && Number(UsedPaiedCoins) + Number(args[2]) > PaiedCoins ) return message.reply({ content: `You don't have this much cash!` })
                      if (args[1] == "DefaultCoins" && Number(UsedDefaultCoins) + Number(args[2]) > DefaultCoins ) return message.reply({ content: `You don't have this much cash!` })
                      

                      if (args[1] == "RankingCoins" && args[2] > RankingCoins) return message.reply({ content: `You don't have ${args[2]} in RankingCoins to put in your pocket` })
                      if (args[1] == "InviteCoins" && args[2] > InviteCoins) return message.reply({ content: `You don't have ${args[2]} in InviteCoins to put in your pocket` })
                      if (args[1] == "PaiedCoins" && args[2] > PaiedCoins) return message.reply({ content: `You don't have ${args[2]} in PaiedCoins to put in your pocket` })
                      if (args[1] == "DefaultCoins" && args[2] > DefaultCoins) return message.reply({ content: `You don't have ${args[2]} in DefaultCoins to put in your pocket` })

                      if (args[1] == "RankingCoins" && RankingCoins  < args[2] ) return message.reply({ content: `You don't have this much cash!` })
                      if (args[1] == "InviteCoins" && InviteCoins < args[2]  ) return message.reply({ content: `You don't have this much cash!` })
                      if (args[1] == "PaiedCoins" && PaiedCoins < args[2]  ) return message.reply({ content: `You don't have this much cash!` })
                      if (args[1] == "DefaultCoins" && DefaultCoins < args[2]  ) return message.reply({ content: `You don't have this much cash!` })

                  if (args[1] == "RankingCoins") {
                         await TotalCoins.findOneAndUpdate({ Author: message.author.id }, { $set: { UsedRankingCoins: Number(UsedRankingCoins) + Number(args[2]), } })
                         await balance.findOneAndUpdate({ Author: message.author.id }, { $set: { UsedCoins: Number(UsedTotalCoins) + Number(args[2]), PocketCoins: Number(PocketCoins) + Number(args[2]) }})
                         return message.reply({ content: `Successfully Put ${args[2]} in your Pocket` })
                  } else if (args[1] == 'InviteCoins') {
                         await TotalCoins.findOneAndUpdate({ Author: message.author.id }, { $set: { UsedInviteCoins: Number(UsedInviteCoins) + Number(args[2]) } })
                         await balance.findOneAndUpdate({ Author: message.author.id }, { $set: { UsedCoins: Number(UsedTotalCoins) + Number(args[2]), PocketCoins: Number(PocketCoins) + Number(args[2]) }})
                         return message.reply({ content: `Successfully Put ${args[2]} in your Pocket` })
                  } else if (args[1] == "PayedCoins") {
                         await TotalCoins.findOneAndUpdate({ Author: message.author.id }, { $set: { UsedPaiedCoins: Number(UsedPaiedCoins) + Number(args[2]) } })
                         await balance.findOneAndUpdate({ Author: message.author.id }, { $set: { UsedCoins: Number(UsedTotalCoins) + Number(args[2]), PocketCoins: Number(PocketCoins) + Number(args[2]) }})
                         return message.reply({ content: `Successfully Put ${args[2]} in your Pocket` })
                  } else if (args[1] == "DefaultCoins") {
                         await TotalCoins.findOneAndUpdate({ Author: message.author.id }, { $set: { UsedDefaultCoins: Number(UsedDefaultCoins) + Number(args[2]) } })
                         await balance.findOneAndUpdate({ Author: message.author.id }, { $set: { UsedCoins: Number(UsedTotalCoins) + Number(args[2]), PocketCoins: Number(PocketCoins) + Number(args[2]) }})
                         return message.reply({ content: `Successfully Put ${args[2]} in your Pocket` })
                  }
            }
        
       } else if (Exec == "store") {
            const data = await balance.findOne({ Author: message.author.id })
            const data2 = await TotalCoins.findOne({ Author: message.author.id })
    
            if (!data) return message.reply({ content: `You have no coins to withdraw` })
            
            const RankingCoins = data2.RankingCoins
            const InviteCoins = data2.InviteCoins
            const PaiedCoins = data2.PaiedCoins
            const DefaultCoins = data2.DefaultCoins
    
            const UsedRankingCoins = data2.UsedRankingCoins
            const UsedInviteCoins = data2.UsedInviteCoins
            const UsedPaiedCoins = data2.UsedPaiedCoins
            const UsedDefaultCoins = data2.UsedDefaultCoins
    
            const UsedTotalCoins = data.UsedCoins
    
            const PocketCoins = data.PocketCoins

            if (PocketCoins == 0) return message.reply({ content: `Seems you have 0 in your pocket` })

            if (args[1] == "RankingCoins" && UsedRankingCoins  == 0 ) return message.reply({ content: `Seems You have no cash in here!` })
            if (args[1] == "InviteCoins" && UsedInviteCoins  == 0 ) return message.reply({ content: `Seems You have no cash in here!` })
            if (args[1] == "PaiedCoins" && UsedPaiedCoins  == 0 ) return message.reply({ content: `Seems You have no cash in here!` })
            if (args[1] == "DefaultCoins" && UsedDefaultCoins  == 0 ) return message.reply({ content: `Seems You have no cash in here!` })

            let array = []
    
            if (RankingCoins > 0) array.push("RankingCoins")
            if (InviteCoins > 0) array.push("InviteCoins")
            if (PaiedCoins > 0) array.push("PayedCoins")
            if (DefaultCoins > 0) array.push("DefaultCoins")
    
              const embed = new EmbedBuilder()
              .setAuthor({ name: `Roverdev Community | Rover Coins System`, iconURL: "https://cdn.discordapp.com/emojis/1058275133711728670.png" })
              .setColor(EmbedColor)
              .setDescription(`Please Provide one of these: ${array.map(m => `${m}`).join(",")}\n> it should be like this: rd!usecoins withdraw <value> <coins>`)
    
              if (!args[1]) return message.reply({ embeds: [embed] })
    
              if (!array.includes(args[1])) return message.reply({ content: `Please Provide One of these: ${array.map(m => `${m}`).join(",")}` }) 
    
              if (array.includes(args[1])) {
                      if (!args[2]) return message.reply({ content: `Please Tell us how many coins you want to use!` })
                      if (isNaN(args[2])) return message.reply({ content: `Please Give me a valid number!` })
                      if (args[2].includes("-")) return message.reply({ content: `Please Provide a non negitive number!` })

                      if (PocketCoins < args[2]) return message.reply({ content: `You can't have negtive in your pocket!` })

                      const number = `${Number(UsedTotalCoins)-Number(args[2])}`

                      if (number.includes("-")) return message.reply({ content: `Please Provide something under the amount you have in your pocket!` })

                      if (args[1] == "RankingCoins" && UsedRankingCoins  < args[2] ) return message.reply({ content: `You can't transfer that much cause thats not the oringal amount you have!` })
                      if (args[1] == "InviteCoins" && UsedInviteCoins  < args[2] ) return message.reply({ content: `You can't transfer that much cause thats not the oringal amount you have!` })
                      if (args[1] == "PaiedCoins" && UsedPaiedCoins  < args[2] ) return message.reply({ content: `You can't transfer that much cause thats not the oringal amount you have!` })
                      if (args[1] == "DefaultCoins" && UsedDefaultCoins < args[2] ) return message.reply({ content: `You can't transfer that much cause thats not the oringal amount you have!` })
    
                      if (args[1] == "RankingCoins") {

                             await TotalCoins.findOneAndUpdate({ Author: message.author.id }, { $set: { UsedRankingCoins: Number(UsedRankingCoins)-Number(args[2]), } })
                             await balance.findOneAndUpdate({ Author: message.author.id }, { $set: { UsedCoins: Number(UsedTotalCoins)-Number(args[2]), PocketCoins: Number(PocketCoins)-Number(args[2]) }})
                             return message.reply({ content: `Successfully Removed ${args[2]} From your Pocket` })
                      } else if (args[1] == 'InviteCoins') {
                             await TotalCoins.findOneAndUpdate({ Author: message.author.id }, { $set: { UsedInviteCoins: Number(UsedInviteCoins)-Number(args[2]) } })
                             await balance.findOneAndUpdate({ Author: message.author.id }, { $set: { UsedCoins: Number(UsedTotalCoins)-Number(args[2]), PocketCoins: Number(PocketCoins)-Number(args[2]) }})
                             return message.reply({ content: `Successfully Removed ${args[2]} From your Pocket` })
                      } else if (args[1] == "PayedCoins") {
                             await TotalCoins.findOneAndUpdate({ Author: message.author.id }, { $set: { UsedPaiedCoins: Number(UsedPaiedCoins)-Number(args[2]) } })
                             await balance.findOneAndUpdate({ Author: message.author.id }, { $set: { UsedCoins: Number(UsedTotalCoins)-Number(args[2]), PocketCoins: Number(PocketCoins)-Number(args[2]) }})
                             return message.reply({ content: `Successfully Removed ${args[2]} From your Pocket` })
                      } else if (args[1] == "DefaultCoins") {
                             await TotalCoins.findOneAndUpdate({ Author: message.author.id }, { $set: { UsedDefaultCoins: Number(UsedDefaultCoins)-Number(args[2]) } })
                             await balance.findOneAndUpdate({ Author: message.author.id }, { $set: { UsedCoins: Number(UsedTotalCoins)-Number(args[2]), PocketCoins: Number(PocketCoins)-Number(args[2]) }})
                             return message.reply({ content: `Successfully Removed ${args[2]} From your Pocket` })
                      }
                }
            
           } else {
               return message.reply({ content: `Please Provide one of these: withdraw, store\n> Example: \`rd!usecoins withdraw\` ` })
           }
 }
}