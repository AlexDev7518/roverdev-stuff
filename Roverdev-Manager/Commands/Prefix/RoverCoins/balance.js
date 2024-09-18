const { EmbedBuilder } = require("discord.js")
const { EmbedColor } = require("../../../Configuration/EmbedConfig")
const balance = require("../../../Databases/Schema/RoverCoins/balance")
const TotalCoins = require("../../../Databases/Schema/RoverCoins/TotalCoins")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
        let Coins = await TotalCoins.findOne({ Author: message.author.id })

        if (!Coins) {
              return message.reply({ content: `You Don't Have Any Coins.` })
        }

        const AmountOfCoins = `${Number(Coins.TotalCoins)}`.split(".")[0]

        let data = await balance.findOne({ Author: message.author.id })
        if (!data) {
             const data1 = await balance.create({ 
                     Author: message.author.id,
                     BankCoins: AmountOfCoins
             })
             data1.save()

             data = await balance.findOne({ Author: message.author.id })
        }

        const TotalCoinsAmount = Number(Coins.DefaultCoins) + Number(data.BankCoins) + Number(Coins.PaiedCoins) + Number(data.PocketCoins) + Number(Coins.InviteCoins) + Number(Coins.RankingCoins) 

        if (Coins.TotalCoins !== TotalCoinsAmount) {
          await TotalCoins.findOneAndUpdate({ Author: message.author.id }, { $set: { TotalCoins: TotalCoinsAmount } })
          Coins = await TotalCoins.findOne({ Author: message.author.id })
        }

        if (!Coins?.UsedRankingCoins && !Coins?.UsedInviteCoins) await TotalCoins.findOneAndUpdate({ Author: message.author.id }, { $set: { UsedRankingCoins: 0, UsedInviteCoins: 0 } })
        if (!data?.UsedBankCoins) await balance.findOneAndUpdate({ Author: message.author.id }, { $set: { UsedBankCoins: 0 } })


        const embed = new EmbedBuilder()
        .setAuthor({ name: `Roverdev Community | Rover Coins System`, iconURL: "https://cdn.discordapp.com/emojis/1058275133711728670.png" })
        .setColor(EmbedColor)
        .setDescription(`
> **Total Coins** - [\`${Coins.TotalCoins}\`]

> **Default Coins:** - [\`${Coins.DefaultCoins}\`]
> - **Used Default Coins:** [\`${Coins.UsedDefaultCoins}\`]
> **Payed Coins:** - [\`${Coins.PaiedCoins}\`]
> - **Used Payed Coins:** [\`${Coins.UsedPaiedCoins}\`]
> **Ranking Coins:** - [\`${Coins.RankingCoins}\`]
> - **Used Ranking Coins:** [\`${Coins.UsedRankingCoins}\`]
> **Invite Coins:** - [\`${Coins.InviteCoins}\`]
> - **Used Invite coins** [\`${Coins.UsedInviteCoins}\`]

`)

        message.channel.send({ embeds: [embed] })
   }
}