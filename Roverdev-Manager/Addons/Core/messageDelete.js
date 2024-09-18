const { BotPrefix } = require("../../Configuration/BotConfig")
const TotalCoins = require("../../Databases/Schema/RoverCoins/TotalCoins")

module.exports = async (Roverdev, message) => {
  try {
           
    if (message.author.bot) return

    let coins = await TotalCoins.findOne({ Author: message.author.id })


    if (!coins) {
         const data = await TotalCoins.create({
               Author: message.author.id
         })
         data.save()

         coins = await TotalCoins.findOne({ Author: message.author.id })
    }

    if (message.content.includes(BotPrefix)) return

    await TotalCoins.findOneAndUpdate({ Author: message.author.id }, { $set: { RankingCoins: Number(coins.RankingCoins)-10 } })
    coins = await TotalCoins.findOne({ Author: message.author.id })

    if (coins.RankingCoins.includes("-")) await TotalCoins.findOneAndUpdate({ Author: message.author.id }, { $set: { RankingCoins: 0 } })
     } catch (error) {}
}