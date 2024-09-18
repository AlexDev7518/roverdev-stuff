const { DefaultEmojis, ShopEmojis } = require("../../../Configuration/EmojiConfig")
const BotConfig = require("../../../Databases/Schema/Shop/BotConfig")
const TotalBots = require("../../../Databases/Schema/Shop/TotalBots")
const { AddBotOwner, Botinfo } = require("../../../Modules/Rover-BotShop/Functions")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
           let user = args[0] || message.mentions.members.first()
           let ExtraOwner = args[1]

           const Bots = await TotalBots.findOne({ Author: message.author.id })
           if (Bots.TotalBots.length < 1) return message.reply({ content: `You have no bots!` })

           if (!args[0]) return message.reply({ content: `Please Provide the bot You want to add a owner to!` })

           if (args[0].includes("@")) {
                  user = Roverdev.users.cache.get(message.mentions.members.first().id)

                  if (user.bot == true) {
                       if (!Bots.TotalBots.includes(user.id)) return message.reply({ content: `Seems this bot is not yours!` })
                       const BotInfo = await BotConfig.findOne({ Bot: user.id })

                       if (isNaN(ExtraOwner)) return message.reply({ content: `Please send the USERID that you want to add!` })

                       if (ExtraOwner == user.id) return message.reply({ content: `You can't add the bot it self as a owner!` })

                       const msg = await message.reply({ content: `${DefaultEmojis.BotLoading} Loading Please wait...` })

                       AddBotOwner(BotInfo.BotPath, BotInfo.Bot ,ExtraOwner).then(async (res) => {
                               if (res) {

                                         let array = BotInfo.ExtraOwner
                                         array.push(ExtraOwner)

                                        await BotConfig.findOneAndUpdate({ Bot: user.id }, { $set: { ExtraOwner: array } })

                                       return msg.edit({ content: `Successfully Added ${ExtraOwner} to <@${user.id}> Owners!` })
                               }
                       }).catch((error) => {
                               return msg.edit({ content: `${ShopEmojis.ShopFailed} Error: ${error}` })
                       })

                  } else if (user.bot == false) {
                          return message.reply({ content: `Seems this user is not a bot!` })
                  }

           } else if (!args[0].includes(`@`)) {
                  user = Roverdev.users.cache.get(args[0])


                  if (user.bot == true) {
                       if (!Bots.TotalBots.includes(user.id)) return message.reply({ content: `Seems this bot is not yours!` })
                       const BotInfo = await BotConfig.findOne({ Bot: user.id })

                       if (isNaN(ExtraOwner)) return message.reply({ content: `Please send the USERID that you want to add!` })

                       if (ExtraOwner == user.id) return message.reply({ content: `You can't add the bot it self as a owner!` })

                       const msg = await message.reply({ content: `${DefaultEmojis.BotLoading} Loading Please wait...` })

                       AddBotOwner(BotInfo.BotPath, BotInfo.Bot ,ExtraOwner).then(async (res) => {
                               if (res) {

                                         let array = BotInfo.ExtraOwner
                                         array.push(ExtraOwner)

                                        await BotConfig.findOneAndUpdate({ Bot: user.id }, { $set: { ExtraOwner: array } })

                                       return msg.edit({ content: `Successfully Added ${ExtraOwner} to <@${user.id}> Owners!` })
                               }
                       }).catch((error) => {
                               return msg.edit({ content: `${ShopEmojis.ShopFailed} Error: ${error}` })
                       })

                  } else if (user.bot == false) {
                          return message.reply({ content: `Seems this user is not a bot!` })
                  }
           }
   }
}