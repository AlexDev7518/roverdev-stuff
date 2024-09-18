const { ShopEmojis, DefaultEmojis } = require("../../../Configuration/EmojiConfig")
const BotConfig = require("../../../Databases/Schema/Shop/BotConfig")
const ShopCoolDowns = require("../../../Databases/Schema/Shop/ShopCoolDowns")
const TotalBots = require("../../../Databases/Schema/Shop/TotalBots")
const { StartShopBot, StopShopBot } = require("../../../Modules/Rover-BotShop/Functions")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
    let user = Roverdev.users.cache.get(args[0]) || message.mentions.members.first()
    
    if (!user) return message.reply({ content: `Please provide the bot!` })

    const Bots = await TotalBots.findOne({ Author: message.author.id })
    if (!Bots) return message.reply({ content: `You have no bots!` })
    if (Bots?.TotalBots?.length < 1) return message.reply({ content: `You have no bots!` })

    const Botinfo = await BotConfig.findOne({ Bot: user.id }) 

    if (!Botinfo) return message.reply({ content: `I Could not find ${user.id} in the Roverdev Bot shop System` })

    if (message.member.roles.cache.has("1016060228866953236")) {
      const msg = await message.reply({ content: `${DefaultEmojis.BotLoading} Loading Please wait...` })

  
      StopShopBot(Botinfo.Bot).then(async (res) => {
           if (res) {
              const ms = require("ms")
      
              let day = ms(`30min`)
        
              day = Date.now() + day
  
              await ShopCoolDowns.create({
                    Bot: user.id,
                    BotShopCoolDown: day
              })
  
              if (args[1] == "true") {
               await BotConfig.findOneAndUpdate({ Bot: Botinfo.Bot }, { $set: { BotStatus: "offline", Status: "Offline", BotUptime: null, ForceStopped: true, PaymentActive: "False" } })
               Roverdev.users.cache.get(Botinfo.BotOwner).send({ content: `:warning: Your bot got forced stopped by: ${message.author}, To get it back open a ticket in <#1040957313734938665>` })
               return msg.edit({ content: `${ShopEmojis.ShopPassed} Successfully Force Stopped The Bot` })
              } else {
               await BotConfig.findOneAndUpdate({ Bot: Botinfo.Bot }, { $set: { BotStatus: "offline", Status: "Offline", BotUptime: null } })
               return msg.edit({ content: `${ShopEmojis.ShopPassed} Successfully Stopped The Bot` })
              }
         
           }
      }).catch(e => {
              return msg.edit({ content: `${ShopEmojis.ShopFailed} Error:  ${e}` })
      })
      return;
    }

    if (!Bots.TotalBots.includes(user.id)) return message.reply({ content: `Seems this bot is not yours!` })

    const msg = await message.reply({ content: `${DefaultEmojis.BotLoading} Loading Please wait...` })

    if (Botinfo?.ForceStopped == true) return msg.edit({ content: `${ShopEmojis.ShopFailed} Your bot got forced stoped so you can't control it at all!` })

    const data = await ShopCoolDowns.findOne({ Bot: user.id })
    
    if (data) return msg.edit({ content: `${ShopEmojis.ShopFailed} You Are on CoolDown! ( Duration: <t:${Math.floor(data.BotShopCoolDown/1000)}:R> )` })

    StopShopBot(Botinfo.Bot).then(async (res) => {
         if (res) {
            const ms = require("ms")
    
            let day = ms(`30min`)
      
            day = Date.now() + day

            await ShopCoolDowns.create({
                  Bot: user.id,
                  BotShopCoolDown: day
            })


            await BotConfig.findOneAndUpdate({ Bot: Botinfo.Bot }, { $set: { BotStatus: "offline", Status: "Offline", BotUptime: null } })

            return msg.edit({ content: `${ShopEmojis.ShopPassed} Successfully Stopped The Bot` })
         }
    }).catch(e => {
            return msg.edit({ content: `${ShopEmojis.ShopFailed} Error:  ${e}` })
    })
   }
}