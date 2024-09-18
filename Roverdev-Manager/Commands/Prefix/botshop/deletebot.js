const { DeleteBot, RunCommand, DeleteFolder } = require("../../../Modules/Rover-BotShop/Functions")

const { ShopEmojis, DefaultEmojis } = require("../../../Configuration/EmojiConfig")
const BotConfig = require("../../../Databases/Schema/Shop/BotConfig")
const ShopCoolDowns = require("../../../Databases/Schema/Shop/ShopCoolDowns")
const TotalBots = require("../../../Databases/Schema/Shop/TotalBots")
const { StartShopBot } = require("../../../Modules/Rover-BotShop/Functions")
const PendingPayment = require("../../../Databases/Schema/PendingSystems/PendingPayment")
const balance = require("../../../Databases/Schema/RoverCoins/balance")
const { Message } = require("discord.js")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
    let user = Roverdev.users.cache.get(args[0]) || message.mentions.members.first()


    
    if (!user && !message.member.roles.cache.has("1016060228866953236")) return message.reply({ content: `Please provide the bot!` })

    const Bots = await TotalBots.findOne({ Author: message.author.id })
    if (!Bots) return message.reply({ content: `You have no bots!` })
    if (Bots?.TotalBots?.length < 1) return message.reply({ content: `You have no bots!` })

    let Botinfo = ``

    if (message.member.roles.cache.has("1016060228866953236")) {
        Botinfo = await BotConfig.findOne({ Bot: args[0] }) 

        const msg = await message.reply({ content: `${DefaultEmojis.BotLoading} Loading Please wait...` })

        const data = await ShopCoolDowns.findOne({ Bot: Botinfo.Bot })
        
        if (data) return msg.edit({ content: `${ShopEmojis.ShopFailed} You Are on CoolDown! ( Duration: <t:${Math.floor(data.BotShopCoolDown/1000)}:R> )` })
    
        RunCommand(`pm2 delete Bot-${Botinfo.Bot}; pm2 save --force`).then(async (res) => {
            if (res) {
                  DeleteFolder(Botinfo.BotPath).then(async res1 => {
              if (res) {
                      await  ShopCoolDowns.findOneAndDelete({ Bot: Botinfo.Bot })
    
                      const FindRack = await Roverdev[`${Botinfo.Rack}`.replace("-", "")].findOne({ Author: Botinfo.BotOwner })
                      let array = FindRack.TotalBots
                      const index = array.indexOf(`${Botinfo.Bot}`);
                      const x = array.splice(index, 1);
    
    
                      let Bots = await TotalBots.findOne({ Author: Botinfo.BotOwner })
    
                      if (!Bots) {
                               let data = await TotalBots.create({ 
                                        Author: Botinfo.BotOwner
                               })
                               Bots = await TotalBots.findOne({ Author: Botinfo.BotOwner })
                      }
    
                      let array1 = Bots.TotalBots
                      const index1 = array1.indexOf(Botinfo.Bot);
                      const x1 = array1.splice(index1, 1);
    
                      let balanceCoins = await balance.findOne({ Author: Botinfo.BotOwner })
    
                                      if (Botinfo?.OringalRack !== "Booster-Rack" && Botinfo.Rack !== "Free-Rack") {
                                             await balance.findOneAndUpdate({ Author: Botinfo.BotOwner }, { $set: { PocketCoins: Number(balanceCoins.PocketCoins) + Number(Botinfo.CoinsAmount) } })
                                      }
    
                      await Roverdev[`${Botinfo.Rack}`.replace("-", "")].findOneAndUpdate({ Author: Botinfo.BotOwner }, { $set: { TotalBots: array }})
                      await TotalBots.findOneAndUpdate({ Author: Botinfo.BotOwner }, { $set: { TotalBots: array1 } })
                      await BotConfig.findOneAndDelete({ Bot: Botinfo.Bot })
                      await PendingPayment.findOneAndDelete({ Bot: Botinfo.Bot })
                      Roverdev.guilds.cache.get("1081700920993259550").members.cache.get(Botinfo.Bot)?.kick().catch((e) => {})
    
                      return msg.edit({ content: `${ShopEmojis.ShopPassed} Successfully Deleted ${user}` })
              }
        })}})
        return;
    } else {
        Botinfo = await BotConfig.findOne({ Bot: user.id }) 
    }


    if (!Botinfo) return message.reply({ content: `I Could not find ${user.id} in the Roverdev Bot shop System` })

    if (!Bots.TotalBots.includes(Botinfo.Bot) && !message.member.roles.cache.has("1016060228866953236")) {
        return message.reply({ content: `Seems this bot is not yours!` })
    } else if (!message.member.roles.cache.has("1016060228866953236")) {
        const msg = await message.reply({ content: `${DefaultEmojis.BotLoading} Loading Please wait...` })

        const data = await ShopCoolDowns.findOne({ Bot: Botinfo.Bot })
        
        if (data) return msg.edit({ content: `${ShopEmojis.ShopFailed} You Are on CoolDown! ( Duration: <t:${Math.floor(data.BotShopCoolDown/1000)}:R> )` })
    
        RunCommand(`pm2 delete Bot-${Botinfo.Bot}; pm2 save --force`).then(async (res) => {
            if (res) {
                  DeleteFolder(Botinfo.BotPath).then(async res1 => {
              if (res) {
                      await  ShopCoolDowns.findOneAndDelete({ Bot: Botinfo.Bot })
    
                      const FindRack = await Roverdev[`${Botinfo.Rack}`.replace("-", "")].findOne({ Author: Botinfo.BotOwner })
                      let array = FindRack.TotalBots
                      const index = array.indexOf(`${Botinfo.Bot}`);
                      const x = array.splice(index, 1);
    
    
                      let Bots = await TotalBots.findOne({ Author: Botinfo.BotOwner })
    
                      if (!Bots) {
                               let data = await TotalBots.create({ 
                                        Author: Botinfo.BotOwner
                               })
                               Bots = await TotalBots.findOne({ Author: Botinfo.BotOwner })
                      }
    
                      let array1 = Bots.TotalBots
                      const index1 = array1.indexOf(Botinfo.Bot);
                      const x1 = array1.splice(index1, 1);
    
                      let balanceCoins = await balance.findOne({ Author: Botinfo.BotOwner })
    
                                      if (Botinfo?.OringalRack !== "Booster-Rack" && Botinfo.Rack !== "Free-Rack") {
                                             await balance.findOneAndUpdate({ Author: Botinfo.BotOwner }, { $set: { PocketCoins: Number(balanceCoins.PocketCoins) + Number(Botinfo.CoinsAmount) } })
                                      }
    
                      await Roverdev[`${Botinfo.Rack}`.replace("-", "")].findOneAndUpdate({ Author: Botinfo.BotOwner }, { $set: { TotalBots: array }})
                      await TotalBots.findOneAndUpdate({ Author: Botinfo.BotOwner }, { $set: { TotalBots: array1 } })
                      await BotConfig.findOneAndDelete({ Bot: Botinfo.Bot })
                      await PendingPayment.findOneAndDelete({ Bot: Botinfo.Bot })
                      Roverdev.guilds.cache.get("1081700920993259550").members.cache.get(Botinfo.Bot).kick().catch((e) => {})
    
                      return msg.edit({ content: `${ShopEmojis.ShopPassed} Successfully Deleted ${user}` })
              }
        })}})

        return;
    }

    const msg = await message.reply({ content: `${DefaultEmojis.BotLoading} Loading Please wait...` })

    const data = await ShopCoolDowns.findOne({ Bot: Botinfo.Bot })
    
    if (data) return msg.edit({ content: `${ShopEmojis.ShopFailed} You Are on CoolDown! ( Duration: <t:${Math.floor(data.BotShopCoolDown/1000)}:R> )` })

    RunCommand(`pm2 delete Bot-${Botinfo.Bot}; pm2 save --force`).then(async (res) => {
        if (res) {
              DeleteFolder(Botinfo.BotPath).then(async res1 => {
          if (res) {
                  await  ShopCoolDowns.findOneAndDelete({ Bot: Botinfo.Bot })

                  const FindRack = await Roverdev[`${Botinfo.Rack}`.replace("-", "")].findOne({ Author: Botinfo.BotOwner })
                  let array = FindRack.TotalBots
                  const index = array.indexOf(`${Botinfo.Bot}`);
                  const x = array.splice(index, 1);


                  let Bots = await TotalBots.findOne({ Author: Botinfo.BotOwner })

                  if (!Bots) {
                           let data = await TotalBots.create({ 
                                    Author: Botinfo.BotOwner
                           })
                           Bots = await TotalBots.findOne({ Author: Botinfo.BotOwner })
                  }

                  let array1 = Bots.TotalBots
                  const index1 = array1.indexOf(Botinfo.Bot);
                  const x1 = array1.splice(index1, 1);

                  let balanceCoins = await balance.findOne({ Author: Botinfo.BotOwner })

                                  if (Botinfo?.OringalRack !== "Booster-Rack" && Botinfo.Rack !== "Free-Rack") {
                                         await balance.findOneAndUpdate({ Author: Botinfo.BotOwner }, { $set: { PocketCoins: Number(balanceCoins.PocketCoins) + Number(Botinfo.CoinsAmount) } })
                                  }

                  await Roverdev[`${Botinfo.Rack}`.replace("-", "")].findOneAndUpdate({ Author: Botinfo.BotOwner }, { $set: { TotalBots: array }})
                  await TotalBots.findOneAndUpdate({ Author: Botinfo.BotOwner }, { $set: { TotalBots: array1 } })
                  await BotConfig.findOneAndDelete({ Bot: Botinfo.Bot })
                  await PendingPayment.findOneAndDelete({ Bot: Botinfo.Bot })
                  Roverdev.guilds.cache.get("1081700920993259550").members.cache.get(Botinfo.Bot).kick().catch((e) => {})

                  return msg.edit({ content: `${ShopEmojis.ShopPassed} Successfully Deleted ${user}` })
          }
    })}})
   }
}