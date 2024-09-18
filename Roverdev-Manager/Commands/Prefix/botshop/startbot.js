const { ShopEmojis, DefaultEmojis } = require("../../../Configuration/EmojiConfig")
const BotConfig = require("../../../Databases/Schema/Shop/BotConfig")
const ShopCoolDowns = require("../../../Databases/Schema/Shop/ShopCoolDowns")
const TotalBots = require("../../../Databases/Schema/Shop/TotalBots")
const { StartShopBot } = require("../../../Modules/Rover-BotShop/Functions")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
    let user = Roverdev.users.cache.get(args[0]) || message.mentions.members.first()
    
    if (!user) return message.reply({ content: `Please provide the bot!` })

    if (message.member.roles.cache.has("1016060228866953236")) {
      const msg = await message.reply({ content: `${DefaultEmojis.BotLoading} Loading Please wait...` })
  
      StartShopBot(Botinfo.Bot).then(async (res) => {
           if (res) {
              const ms = require("ms")
      
              let day = ms(`30min`)
        
              day = Date.now() + day
  
              await ShopCoolDowns.create({
                    Bot: user.id,
                    BotShopCoolDown: day
              })

              if (args[1] == "true") {
               await BotConfig.findOneAndUpdate({ Bot: Botinfo.Bot }, { $set: { BotStatus: "Online", Status: "Online", BotUptime: Date.now(), ForceStopped: false, PaymentActive: "true" } })
               Roverdev.users.cache.get(Botinfo.BotOwner).send({ content: `:thumbsup: Your bot got forced Started by: ${message.author}, You may control it again!` })
               return msg.edit({ content: `${ShopEmojis.ShopPassed} Successfully Force Started The Bot` })
              } else {
               await BotConfig.findOneAndUpdate({ Bot: Botinfo.Bot }, { $set: { BotStatus: "Online", Status: "Online", BotUptime: Date.now() } })
               return msg.edit({ content: `${ShopEmojis.ShopPassed} Successfully Started The Bot` })
              }
           }
      }).catch(e => {
              return msg.edit({ content: `${ShopEmojis.ShopFailed} Error:  ${e}` })
      })
      return;
    }

    const Bots = await TotalBots.findOne({ Author: message.author.id })
    if (!Bots) return message.reply({ content: `You have no bots!` })
    if (Bots?.TotalBots?.length < 1) return message.reply({ content: `You have no bots!` })

    const Botinfo = await BotConfig.findOne({ Bot: user.id }) 

    if (!Botinfo) return message.reply({ content: `I Could not find ${user.id} in the Roverdev Bot shop System` })

    if (!Bots.TotalBots.includes(user.id)) return message.reply({ content: `Seems this bot is not yours!` })

    const msg = await message.reply({ content: `${DefaultEmojis.BotLoading} Loading Please wait...` })

    if (Botinfo?.ForceStopped == true) return msg.edit({ content: `${ShopEmojis.ShopFailed} Your bot got forced stoped so you can't control it at all!` })

    const data = await ShopCoolDowns.findOne({ Bot: user.id })
    
    if (data) return msg.edit({ content: `${ShopEmojis.ShopFailed} You Are on CoolDown! ( Duration: <t:${Math.floor(data.BotShopCoolDown/1000)}:R> )` })

    StartShopBot(Botinfo.Bot).then(async (res) => {
         if (res) {
            const ms = require("ms")
    
            let day = ms(`30min`)
      
            day = Date.now() + day

            await ShopCoolDowns.create({
                  Bot: user.id,
                  BotShopCoolDown: day
            })

            await BotConfig.findOneAndUpdate({ Bot: Botinfo.Bot }, { $set: { BotStatus: "Online", Status: "Online", BotUptime: Date.now() } })

            return msg.edit({ content: `${ShopEmojis.ShopPassed} Successfully Started The Bot` })
         }
    }).catch(e => {
            return msg.edit({ content: `${ShopEmojis.ShopFailed} Error:  ${e}` })
    })
   }
}