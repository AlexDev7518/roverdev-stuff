const { Events, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const { EmbedColor } = require("../../../Configuration/EmbedConfig")
const PendingPayment = require("../../../Databases/Schema/PendingSystems/PendingPayment")
const balance = require("../../../Databases/Schema/RoverCoins/balance")
const BotConfig = require("../../../Databases/Schema/Shop/BotConfig")
const ShopCoolDowns = require("../../../Databases/Schema/Shop/ShopCoolDowns")
const TotalBots = require("../../../Databases/Schema/Shop/TotalBots")
const { RunCommand, DeleteFolder } = require("../Functions")

module.exports = async Roverdev => {
  Roverdev.logger.info(require("colors").yellow(`Now Checking Roverdev Bot Shop - Event: Member-Left [Every min!]`), { label: "Shop-System" })
  setInterval(async () => {
    Roverdev.logger.info(require("colors").yellow(`Now Checking Roverdev Bot Shop - Event: Member-Left [Every min!]`), { label: "Shop-System" })
      const data = await TotalBots.find()

      data.forEach(async m => {
             const GetMemberMain = Roverdev.guilds.cache.get("1081700920993259550").members.cache.get(m.Author)
   
             if (!GetMemberMain) {
              const member = m.Author
              const Bots = await TotalBots.findOne({ Author: member })
              if (!Bots) return console.log(`${member} has no bots`)
              if (Bots?.TotalBots?.length < 1) {
                 await TotalBots.findOneAndDelete({ Author: member })
                 return console.log(`${member} has no bots`)
              }

              console.log(member)
      
              Bots.TotalBots.forEach(async user => {
                const Botinfo = await BotConfig.findOne({ Bot: user }) 
           
             RunCommand(`pm2 delete Bot-${Botinfo.Bot}; pm2 save --force`).then(async (res) => {
                 if (res) {
                       DeleteFolder(Botinfo.BotPath).then(async res1 => {
                   if (res) {
                           await  ShopCoolDowns.findOneAndDelete({ Bot: user })
           
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
           
           
                                                  Roverdev.channels.cache.get("1070179848640798730").send({ 
                                                              content: `<a:bye:1070181113886150716> <@!${Botinfo.BotOwner}> Left the server so I deleted <@${Botinfo.Bot}>!`,
                                                              embeds: [
                                                                   new EmbedBuilder()
                                                                   .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                   .setColor(EmbedColor)
                                                                   .addFields([
                                                                        {  
                                                                             name: `Bot-Path:`,
                                                                             value: `\`\`\`\n${Botinfo.BotPath}\`\`\``
                                                                        },
                                                                        {  
                                                                            name: `Bot-Id:`,
                                                                            value: `\`\`\`\n${Botinfo.Bot}\`\`\``
                                                                       },
                                                                       {  
                                                                            name: `Bot-Owner:`,
                                                                            value: `\`\`\`\n${Botinfo.BotOwner}\`\`\``
                                                                       },
                                                                       {  
                                                                            name: `Bot-Type:`,
                                                                            value: `\`\`\`\n${Botinfo.BotType}\`\`\``
                                                                       },
                                                                       {  
                                                                            name: `Bot-Rack:`,
                                                                            value: `\`\`\`\n${Botinfo.Rack}\`\`\``
                                                                       }
                                                                   ])
                                                              ]
                                                  })
           
                                         }
                                    }).catch(async (error) => {
                                        await  ShopCoolDowns.findOneAndDelete({ Bot: user })
           
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
                        
                        
                                                               Roverdev.channels.cache.get("1070179848640798730").send({ 
                                                                           content: `<a:bye:1070181113886150716> <@!${Botinfo.BotOwner}> Left the server so I deleted <@${Botinfo.Bot}>!`,
                                                                           embeds: [
                                                                                new EmbedBuilder()
                                                                                .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                .setColor(EmbedColor)
                                                                                .addFields([
                                                                                     {  
                                                                                          name: `Bot-Path:`,
                                                                                          value: `\`\`\`\n${Botinfo.BotPath}\`\`\``
                                                                                     },
                                                                                     {  
                                                                                         name: `Bot-Id:`,
                                                                                         value: `\`\`\`\n${Botinfo.Bot}\`\`\``
                                                                                    },
                                                                                    {  
                                                                                         name: `Bot-Owner:`,
                                                                                         value: `\`\`\`\n${Botinfo.BotOwner}\`\`\``
                                                                                    },
                                                                                    {  
                                                                                         name: `Bot-Type:`,
                                                                                         value: `\`\`\`\n${Botinfo.BotType}\`\`\``
                                                                                    },
                                                                                    {  
                                                                                         name: `Bot-Rack:`,
                                                                                         value: `\`\`\`\n${Botinfo.Rack}\`\`\``
                                                                                    }
                                                                                ])
                                                                           ]
                                                               })             
                                    })
                                  }
                               }).catch(async (error) => {
                                   DeleteFolder(Botinfo.BotPath).then(async res1 => {
                                        if (res1) {
                                                await  ShopCoolDowns.findOneAndDelete({ Bot: user })
                                
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
                                
                                
                                                                       Roverdev.channels.cache.get("1070179848640798730").send({ 
                                                                                   content: `<a:bye:1070181113886150716> <@!${Botinfo.BotOwner}> Left the server so I deleted <@${Botinfo.Bot}>!`,
                                                                                   embeds: [
                                                                                        new EmbedBuilder()
                                                                                        .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                                                                                        .setColor(EmbedColor)
                                                                                        .addFields([
                                                                                             {  
                                                                                                  name: `Bot-Path:`,
                                                                                                  value: `\`\`\`\n${Botinfo.BotPath}\`\`\``
                                                                                             },
                                                                                             {  
                                                                                                 name: `Bot-Id:`,
                                                                                                 value: `\`\`\`\n${Botinfo.Bot}\`\`\``
                                                                                            },
                                                                                            {  
                                                                                                 name: `Bot-Owner:`,
                                                                                                 value: `\`\`\`\n${Botinfo.BotOwner}\`\`\``
                                                                                            },
                                                                                            {  
                                                                                                 name: `Bot-Type:`,
                                                                                                 value: `\`\`\`\n${Botinfo.BotType}\`\`\``
                                                                                            },
                                                                                            {  
                                                                                                 name: `Bot-Rack:`,
                                                                                                 value: `\`\`\`\n${Botinfo.Rack}\`\`\``
                                                                                            }
                                                                                        ])
                                                                                   ]
                                                                       })
                                
                                                              }
                                                         })
                               })
              })
             }
      })
    }, 50000);
}