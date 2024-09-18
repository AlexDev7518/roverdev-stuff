const { EmbedBuilder } = require("discord.js");
const PendingPayment = require("../../../Databases/Schema/PendingSystems/PendingPayment");
const balance = require("../../../Databases/Schema/RoverCoins/balance");
const TotalCoins = require("../../../Databases/Schema/RoverCoins/TotalCoins");
const BotConfig = require("../../../Databases/Schema/Shop/BotConfig");
const TotalBots = require("../../../Databases/Schema/Shop/TotalBots");
const { RunCommand, DeleteFolder } = require("../Functions");

module.exports = async Roverdev => {
  Roverdev.logger.info(require("colors").yellow(`Now Checking Roverdev Bot Shop - Event: Payment-System [Every min!]`), { label: "Shop-System" })
  setInterval(async () => {
    Roverdev.logger.info(require("colors").yellow(`Now Checking Roverdev Bot Shop - Event: Payment-System [Every min!]`), { label: "Shop-System" })
      const data = await BotConfig.find()
      data.forEach(async m => {
           if (m.HostingDuration !== "Free-Bot" && m.PaymentType !== "Booster-Bot" && m.HostingDuration < Date.now()) {

            const FindPayment =  await PendingPayment.findOne({ Bot: m.Bot })
            
            const logs = Roverdev.channels.cache.get("1069647814444974091")
            
            if (!FindPayment) {
              const embed = new EmbedBuilder()
              .setAuthor({ name: `Bot Payment Has Ended | Roverdev`, iconURL: "https://cdn.discordapp.com/emojis/1014937062992007168.gif" })
              .setTitle("Your bot payment has ended you need to pay again!")
              .setDescription(`\`\`\`yml\nBot Path: ${m.BotPath}\nShop Server: ${m.ShopServer}\nBot Owner: ${Roverdev.users.cache.get(m.BotOwner).username}\nPayment Type: ${m.PaymentType} \`\`\` `)
              .setColor("Yellow")
  
              const embed1 = new EmbedBuilder()
              .setAuthor({ name: `Bot Payment Has Ended | Roverdev`, iconURL: "https://cdn.discordapp.com/emojis/1014937062992007168.gif" })
              .setTitle("Your bot payment has ended and then renewed!")
              .setDescription(`\`\`\`yml\nBot Path: ${m.BotPath}\nShop Server: ${m.ShopServer}\nBot Owner: ${Roverdev.users.cache.get(m.BotOwner).username}\nPayment Type: ${m.PaymentType} \`\`\` `)
              .setColor("Yellow")
  
              let Balancedb = await balance.findOne({ Author: m.BotOwner })

              if (!Balancedb) {
                       await balance.create({ Author: m.BotOwner }) 
                       Balancedb = await balance.findOne({ Author: m.BotOwner })
              }
  
              const ms = require("ms")
    
              let Payment = ms("30d")

              if (m.Rack == "Booster-Rack") {

                await PendingPayment.findOneAndDelete({ Bot: m.Bot })
                await BotConfig.findOneAndUpdate({ Bot: m.Bot }, { $set: { HostingDuration: Payment } })


                logs.send({
                  embeds: [embed1],
                  content: `<a:Money:1014937062992007168> ** <@!${m.BotOwner}> Payed For <@!${m.Bot}>! **\n> Hosting until: <t:${Math.floor(Payment /1000)}:F>`
             })
             return Roverdev.users.cache.get(m.BotOwner).send({
              content: `<a:Money:1014937062992007168> ** <@!${m.BotOwner}> Payed For <@!${m.Bot}>! **\n> Hosting until: <t:${Math.floor(Payment /1000)}:F>`,
               embeds: [embed1]
                })
              }
        
              Payment = Date.now() + Payment
  
                  if (m.CoinsAmount == Balancedb.PocketCoins) {
  
                    const coins = await balance.findOne({ Author: m.BotOwner })
                    const totalCoins = `${Number(coins.PocketCoins)-Number(m.CoinsAmount)}`
  
                    await balance.findOneAndUpdate({ Author: m.BotOwner }, { $set: { PocketCoins: totalCoins } })
                    await BotConfig.findOneAndUpdate({ Bot: m.Bot }, { $set: { HostingDuration: Payment } })
                    await PendingPayment.findOneAndDelete({ Bot: m.Bot })
  
                    logs.send({
                      embeds: [embed1],
                      content: `<a:Money:1014937062992007168> ** <@!${m.BotOwner}> Payed For <@!${m.Bot}>! **\n> Hosting until: <t:${Math.floor(Payment /1000)}:F>`
                 })
                 return Roverdev.users.cache.get(m.BotOwner).send({
                  content: `<a:Money:1014937062992007168> ** <@!${m.BotOwner}> Payed For <@!${m.Bot}>! **\n> Hosting until: <t:${Math.floor(Payment /1000)}:F>`,
                   embeds: [embed1]
                    })
                  } else if (m.CoinsAmount < Balancedb.PocketCoins) {
                    const coins = await balance.findOne({ Author: m.BotOwner })
                    const totalCoins = `${Number(coins.PocketCoins)-Number(m.CoinsAmount)}`
  
                    await balance.findOneAndUpdate({ Author: m.BotOwner }, { $set: { PocketCoins: totalCoins } })
  
                    await BotConfig.findOneAndUpdate({ Bot: m.Bot }, { $set: { HostingDuration: Payment } })

                    await PendingPayment.findOneAndDelete({ Bot: m.Bot })
  
                    logs.send({
                      embeds: [embed],
                      content: `<a:Money:1014937062992007168> ** <@!${m.BotOwner}> Payed For <@!${m.Bot}>! **\n> Hosting until: <t:${Math.floor(Payment /1000)}:F>`
                 })
                 return Roverdev.users.cache.get(m.BotOwner).send({
                  content: `<a:Money:1014937062992007168> ** <@!${m.BotOwner}> Payed For <@!${m.Bot}>! **\n> Hosting until: <t:${Math.floor(Payment /1000)}:F>`,
                   embeds: [embed]
                    })
                  } else if (m.CoinsAmount !== Balancedb.PocketCoins)  {
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `Bot Payment Has Ended | Roverdev`, iconURL: "https://cdn.discordapp.com/emojis/1014937062992007168.gif" })
                    .setTitle("Your bot payment has ended you need to pay again!")
                    .setDescription(`\`\`\`yml\nBot Path: ${m.BotPath}\nShop Server: ${m.ShopServer}\nBot Owner: ${Roverdev.users.cache.get(m.BotOwner).username}\nPayment Type: ${m.PaymentType} \`\`\` `)
                    .setColor("Yellow")
  

                    let day = ms("24h")
              
                    day = Date.now() + day
                    
                    logs.send({
                        content: `<a:Money:1014937062992007168> ** <@!${m.BotOwner}> Needs to Pay For <@!${m.Bot}> **\n> Bot Will Shutdown At: <t:${Math.floor(day /1000)}>\n> *Put Coins in your pocket to keep it online!*\n> - You need \`${m.CoinsAmount}\` in your pocket or more`,
                          embeds: [embed]
                    })
                    
                    await PendingPayment.findOneAndDelete({
                        Bot: m.Bot,
                    })

                    await PendingPayment.create({
                      Bot: m.Bot,
                      TimeToShutDown: day
                  })
  
  
                    return Roverdev.users.cache.get(m.BotOwner).send({
                       content: `<a:Money:1014937062992007168> ** You Need to Pay For <@!${m.Bot}> To Keep is Online!**\n> Bot Will Shutdown At: <t:${Math.floor(day /1000)}>\n> *Put Coins in your pocket to keep it online!*\n> - You need \`${m.CoinsAmount}\` in your pocket or more`,
                        embeds: [embed]
                  })
                  } else if (m.CoinsAmount > Balancedb.PocketCoins) {
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `Bot Payment Has Ended | Roverdev`, iconURL: "https://cdn.discordapp.com/emojis/1014937062992007168.gif" })
                    .setTitle("Your bot payment has ended you need to pay again!")
                    .setDescription(`\`\`\`yml\nBot Path: ${m.BotPath}\nShop Server: ${m.ShopServer}\nBot Owner: ${Roverdev.users.cache.get(m.BotOwner).username}\nPayment Type: ${m.PaymentType} \`\`\` `)
                    .setColor("Yellow")

                    await BotConfig.findOneAndUpdate({ Bot: m.Bot }, { $set: { PaymentActive: "Pending" } })
  
                    const ms = require("ms")
  
                    let day = ms("24h")
              
                    day = Date.now() + day

                    await PendingPayment.findOneAndDelete({
                      Bot: m.Bot,
                  })

                  await PendingPayment.create({
                    Bot: m.Bot,
                    TimeToShutDown: day
                })
                    
                    logs.send({
                        content: `<a:Money:1014937062992007168> ** <@!${m.BotOwner}> Needs to Pay For <@!${m.Bot}> **\n> Bot Will Shutdown At: <t:${Math.floor(day /1000)}>\n> *Put Coins in your pocket to keep it online!*\n> - You need \`${m.CoinsAmount}\` in your pocket or more`,
                          embeds: [embed]
                    })
  
                    return Roverdev.users.cache.get(m.BotOwner).send({
                       content: `<a:Money:1014937062992007168> ** You Need to Pay For <@!${m.Bot}> To Keep is Online!**\n> Bot Will Shutdown At: <t:${Math.floor(day /1000)}>\n> *Put Coins in your pocket to keep it online!*\n> - You need \`${m.CoinsAmount}\` in your pocket or more`,
                  })
                  }
            }                 
           }
      })

      Roverdev.logger.info(require("colors").yellow(`Now Checking Roverdev Bot Shop - Event: Payment-System-1 [Every min!]`), { label: "Shop-System" })
      const data2 = await BotConfig.find()
      data2.forEach(async m => {
            const FindPayment =  await PendingPayment.findOne({ Bot: m.Bot })
            
            const logs = Roverdev.channels.cache.get("1069647814444974091")
            
            if (FindPayment && FindPayment.TimeToShutDown < Date.now() && FindPayment.TimeToShutDown !== null && m.HostingDuration !== "Free-Bot" && m.PaymentType !== "Booster-Bot") {
              const embed = new EmbedBuilder()
              .setAuthor({ name: `Bot Payment Has Ended | Roverdev`, iconURL: "https://cdn.discordapp.com/emojis/1014937062992007168.gif" })
              .setTitle("Your bot payment has ended you need to pay again!")
              .setDescription(`\`\`\`yml\nBot Path: ${m.BotPath}\nShop Server: ${m.ShopServer}\nBot Owner: ${Roverdev.users.cache.get(m.BotOwner).username}\nPayment Type: ${m.PaymentType} \`\`\` `)
              .setColor("Yellow")
  
              const embed1 = new EmbedBuilder()
              .setAuthor({ name: `Bot Payment Has Ended | Roverdev`, iconURL: "https://cdn.discordapp.com/emojis/1014937062992007168.gif" })
              .setTitle("Your bot payment has ended and then renewed!")
              .setDescription(`\`\`\`yml\nBot Path: ${m.BotPath}\nShop Server: ${m.ShopServer}\nBot Owner: ${Roverdev.users.cache.get(m.BotOwner).username}\nPayment Type: ${m.PaymentType} \`\`\` `)
              .setColor("Yellow")
  
              const Balancedb = await balance.findOne({ Author: m.BotOwner })
  
              const ms = require("ms")
    
              let Payment = ms("30d")
        
              Payment = Date.now() + Payment
  
                  if (m.CoinsAmount == Balancedb.PocketCoins) {

                    await BotConfig.findOneAndUpdate({ Bot: m.Bot }, { $set: { PaymentActive: "true", } })
  
                    const coins = await balance.findOne({ Author: m.BotOwner })
                    const totalCoins = `${Number(coins.PocketCoins)-Number(m.CoinsAmount)}`
  
                    await balance.findOneAndUpdate({ Author: m.BotOwner }, { $set: { PocketCoins: totalCoins } })
                    await PendingPayment.findOneAndDelete({ Bot: m.Bot })
  
                    logs.send({
                      embeds: [embed1],
                      content: `<a:Money:1014937062992007168> ** <@!${m.BotOwner}> Payed For <@!${m.Bot}>! **\n> Hosting until: <t:${Math.floor(Payment /1000)}:F>`
                 })
                 return Roverdev.users.cache.get(m.BotOwner).send({
                  content: `<a:Money:1014937062992007168> ** <@!${m.BotOwner}> Payed For <@!${m.Bot}>! **\n> Hosting until: <t:${Math.floor(Payment /1000)}:F>`,
                   embeds: [embed1]
                    })
                  } else if (m.CoinsAmount < Balancedb.PocketCoins) {
                    const coins = await balance.findOne({ Author: m.BotOwner })
                    const totalCoins = `${Number(coins.PocketCoins)-Number(m.CoinsAmount)}`

                    await BotConfig.findOneAndUpdate({ Bot: m.Bot }, { $set: { PaymentActive: "true" } })
  
                    await balance.findOneAndUpdate({ Author: m.BotOwner }, { $set: { PocketCoins: totalCoins } })
  
                    await BotConfig.findOneAndUpdate({ Bot: m.Bot }, { $set: { HostingDuration: Payment } })

                    await PendingPayment.findOneAndDelete({ Bot: m.Bot })
  
                    logs.send({
                      embeds: [embed1],
                      content: `<a:Money:1014937062992007168> ** <@!${m.BotOwner}> Payed For <@!${m.Bot}>! **\n> Hosting until: <t:${Math.floor(Payment /1000)}:F>`
                 })
                 return Roverdev.users.cache.get(m.BotOwner).send({
                  content: `<a:Money:1014937062992007168> ** <@!${m.BotOwner}> Payed For <@!${m.Bot}>! **\n> Hosting until: <t:${Math.floor(Payment /1000)}:F>`,
                   embeds: [embed1]
                    })
                  } else if (m.CoinsAmount !== Balancedb.PocketCoins)  {
                    RunCommand(`pm2 stop Bot-${m.Bot}; pm2 save --force`).then(async (res) => {
                      if (res) {
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Bot Got Shut Down | Roverdev`, iconURL: "https://cdn.discordapp.com/emojis/1014937062992007168.gif" })
                        .setDescription(`<a:VerifedRed:1009505548762357852> Successfully Stopped <@!${m.Bot}>\n> <@!${m.BotOwner}> Have To Pay Your Bot or it will be Fully Deleted!`)
                        .setColor("Yellow")
      
                        const ms = require("ms")
      
                        let day = ms("24h")

                        await BotConfig.findOneAndUpdate({ Bot: m.Bot }, { $set: { PaymentActive: "pending", BotStatus: "offline", Status: "Offline", BotUptime: null } })
                  
                        day = Date.now() + day
    
                        await PendingPayment.findOneAndDelete({
                          Bot: m.Bot,
                      })
  
                      await PendingPayment.create({
                        Bot: m.Bot,
                        TimeToDelete: day
                    })
                        
                        logs.send({
                            content: `<a:a_warn:1015238388191858788> ** <@!${m.BotOwner}> Needs to Pay For <@!${m.Bot}> **\n> Bot Will Be Deleted At: <t:${Math.floor(day /1000)}>\n> *Put Coins in your pocket to keep it online!*\n> - You need \`${m.CoinsAmount}\` in your pocket or more`,
                              embeds: [embed]
                        })
      
                        return Roverdev.users.cache.get(m.BotOwner).send({
                           content: `<a:a_warn:1015238388191858788> ** You Need to Pay For <@!${m.Bot}> To Keep is Online!**\n> Bot Will Be Deleted At: <t:${Math.floor(day /1000)}>\n> *Put Coins in your pocket to keep it online!*\n> - You need \`${m.CoinsAmount}\` in your pocket or more`,
                           embeds: [embed]
                      })
                      }
                     })
                  } else if (m.CoinsAmount > Balancedb.PocketCoins) {
                            RunCommand(`pm2 stop Bot-${m.Bot}; pm2 save --force`).then(async (res) => {
                                    if (res) {
                                      const embed = new EmbedBuilder()
                                      .setAuthor({ name: `Bot Got Shut Down | Roverdev`, iconURL: "https://cdn.discordapp.com/emojis/1014937062992007168.gif" })
                                      .setDescription(`<a:VerifedRed:1009505548762357852> Successfully Stopped <@!${m.Bot}>\n> <@!${m.BotOwner}> Have To Pay Your Bot or it will be Fully Deleted!`)
                                      .setColor("Yellow")
                    
                                      const ms = require("ms")
                    
                                      let day = ms("24h")
                                
                                      day = Date.now() + day

                                      await BotConfig.findOneAndUpdate({ Bot: m.Bot }, { $set: { PaymentActive: "pending", BotStatus: "offline", Status: "Offline", BotUptime: null } })
                  
                                      await PendingPayment.findOneAndDelete({
                                        Bot: m.Bot,
                                    })
                
                                    await PendingPayment.create({
                                      Bot: m.Bot,
                                      TimeToDelete: day
                                  })
                                      
                                      logs.send({
                                          content: `<a:a_warn:1015238388191858788> ** <@!${m.BotOwner}> Needs to Pay For <@!${m.Bot}> **\n> Bot Will Be Deleted At: <t:${Math.floor(day /1000)}>\n> *Put Coins in your pocket to keep it online!*\n> - You need \`${m.CoinsAmount}\` in your pocket or more`,
                                            embeds: [embed]
                                      })
                    
                                      return Roverdev.users.cache.get(m.BotOwner).send({
                                         content: `<a:a_warn:1015238388191858788> ** You Need to Pay For <@!${m.Bot}> To Keep is Online!**\n> Bot Will Be Deleted At: <t:${Math.floor(day /1000)}>\n> *Put Coins in your pocket to keep it online!*\n> - You need \`${m.CoinsAmount}\` in your pocket or more`,
                                         embeds: [embed]
                                    })
                                    }
                            })
                  }
            }                 
      })

      Roverdev.logger.info(require("colors").yellow(`Now Checking Roverdev Bot Shop - Event: Payment-System-3 [Every min!]`), { label: "Shop-System" })
      const data3 = await BotConfig.find()
      data3.forEach(async m => {
            const FindPayment =  await PendingPayment.findOne({ Bot: m.Bot })
            
            const logs = Roverdev.channels.cache.get("1069647814444974091")
            
            if (FindPayment && FindPayment.TimeToDelete < Date.now() && FindPayment.TimeToDelete !== null && m.HostingDuration !== "Free-Bot" && m.PaymentType !== "Booster-Bot") {
              const embed = new EmbedBuilder()
              .setAuthor({ name: `Bot Payment Has Ended | Roverdev`, iconURL: "https://cdn.discordapp.com/emojis/1014937062992007168.gif" })
              .setTitle("Your bot payment has ended you need to pay again!")
              .setDescription(`\`\`\`yml\nBot Path: ${m.BotPath}\nShop Server: ${m.ShopServer}\nBot Owner: ${Roverdev.users.cache.get(m.BotOwner).username}\nPayment Type: ${m.PaymentType} \`\`\` `)
              .setColor("Yellow")
  
              const embed1 = new EmbedBuilder()
              .setAuthor({ name: `Bot Payment Has Ended | Roverdev`, iconURL: "https://cdn.discordapp.com/emojis/1014937062992007168.gif" })
              .setTitle("Your bot payment has ended and then renewed!")
              .setDescription(`\`\`\`yml\nBot Path: ${m.BotPath}\nShop Server: ${m.ShopServer}\nBot Owner: ${Roverdev.users.cache.get(m.BotOwner).username}\nPayment Type: ${m.PaymentType} \`\`\` `)
              .setColor("Yellow")
  
              const Balancedb = await balance.findOne({ Author: m.BotOwner })
  
              const ms = require("ms")
    
              let Payment = ms("30d")
        
              Payment = Date.now() + Payment
  
                  if (m.CoinsAmount == Balancedb.PocketCoins) {

                    RunCommand(`pm2 start Bot-${m.Bot}; pm2 save --force`).then(async (res) => {
                      const coins = await balance.findOne({ Author: m.BotOwner })
                      const totalCoins = `${Number(coins.PocketCoins)-Number(m.CoinsAmount)}`

                      await BotConfig.findOneAndUpdate({ Bot: m.Bot }, { $set: { PaymentActive: "true", BotStatus: "Online", Status: "Online", BotUptime: Date.now() } })
    
                      await balance.findOneAndUpdate({ Author: m.BotOwner }, { $set: { PocketCoins: totalCoins } })
                      await PendingPayment.findOneAndDelete({ Bot: m.Bot })
    
                      logs.send({
                        embeds: [embed1],
                        content: `<a:Money:1014937062992007168> ** <@!${m.BotOwner}> Payed For <@!${m.Bot}>! **\n> Hosting until: <t:${Math.floor(Payment /1000)}:F>`
                   })
                   return Roverdev.users.cache.get(m.BotOwner).send({
                    content: `<a:Money:1014937062992007168> ** <@!${m.BotOwner}> Payed For <@!${m.Bot}>! **\n> Hosting until: <t:${Math.floor(Payment /1000)}:F>`,
                     embeds: [embed1]
                      })
                    })

                  } else if (m.CoinsAmount < Balancedb.PocketCoins) {
                    RunCommand(`pm2 start Bot-${m.Bot}; pm2 save --force`).then(async (res) => {
                      const coins = await balance.findOne({ Author: m.BotOwner })
                      const totalCoins = `${Number(coins.PocketCoins)-Number(m.CoinsAmount)}`

                      await BotConfig.findOneAndUpdate({ Bot: m.Bot }, { $set: { PaymentActive: "true", BotStatus: "Online", Status: "Online", BotUptime: Date.now() } })
    
                      await balance.findOneAndUpdate({ Author: m.BotOwner }, { $set: { PocketCoins: totalCoins } })
                      await PendingPayment.findOneAndDelete({ Bot: m.Bot })
    
                      logs.send({
                        embeds: [embed1],
                        content: `<a:Money:1014937062992007168> ** <@!${m.BotOwner}> Payed For <@!${m.Bot}>! **\n> Hosting until: <t:${Math.floor(Payment /1000)}:F>`
                   })
                   return Roverdev.users.cache.get(m.BotOwner).send({
                    content: `<a:Money:1014937062992007168> ** <@!${m.BotOwner}> Payed For <@!${m.Bot}>! **\n> Hosting until: <t:${Math.floor(Payment /1000)}:F>`,
                     embeds: [embed1]
                      })
                    })
                  } else if (m.CoinsAmount !== Balancedb.PocketCoins)  {
                    RunCommand(`pm2 delete Bot-${m.Bot}; pm2 save --force`).then(async (res) => {
                      if (res) {
                            DeleteFolder(m.BotPath).then(async res1 => {
                              if (res1) {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `Bot Got Deleted | Roverdev`, iconURL: "https://cdn.discordapp.com/emojis/1014937062992007168.gif" })
                                .setDescription(`<a:VerifedRed:1009505548762357852> Successfully Deleted <@!${m.Bot}>\n> - Because you did not pay for your bot!`)
                                .setColor("Yellow")
                              
                                
                                logs.send({
                                    content: `<a:a_warn:1015238388191858788> *Hello <@!${m.BotOwner}>, <@!${m.Bot}> Got Deleted cause you did not pay for it!*`,
                                      embeds: [embed]
                                })
              
                                 Roverdev.users.cache.get(m.BotOwner).send({
                                   content: `<a:a_warn:1015238388191858788> *Hello <@!${m.BotOwner}>, <@!${m.Bot}> Got Deleted cause you did not pay for it!*`,
                                   embeds: [embed]
                                  }) 

                                  const FindRack = await Roverdev[`${m.Rack}`.replace("-", "")].findOne({ Author: m.BotOwner })
                                  let array = FindRack.TotalBots
                                  console.log(array)
                                  const index = array.indexOf(`${m.Bot}`);
                                  console.log(index)
                                  const x = array.splice(index, 1);


                                  let Bots = await TotalBots.findOne({ Author: m.BotOwner })

                                  if (!Bots) {
                                           let data = await TotalBots.create({ 
                                                    Author: m.BotOwner
                                           })
                                           Bots = await TotalBots.findOne({ Author: m.BotOwner })
                                  }

                                  let array1 = Bots.TotalBots
                                  const index1 = array1.indexOf(m.Bot);
                                  const x1 = array1.splice(index1, 1);

                                  await TotalBots.findOneAndUpdate({ Author: m.Author }, { $set: { TotalBots: array1 } })

                                  let balanceCoins = await balance.findOne({ Author: m.BotOwner })

                                  if (m?.OringalRack !== "Booster-Rack") {
                                         await balance.findOneAndUpdate({ Author: m.BotOwner }, { $set: { PocketCoins: Number(balanceCoins.PocketCoins) + Number(m.CoinsAmount) } })
                                  }


                                  await Roverdev[`${m.Rack}`.replace("-", "")].findOneAndUpdate({ Author: m.BotOwner }, { $set: { TotalBots: array }})

                                  Roverdev.guilds.cache.get("1081700920993259550").members.cache.get(m.Bot).kick()

                                  await BotConfig.findOneAndDelete({ Bot: m.Bot })
                                  await PendingPayment.findOneAndDelete({ Bot: m.Bot })
                              }
                            }) 
                      }
                     })
                  } else if (m.CoinsAmount > Balancedb.PocketCoins) {
                    RunCommand(`pm2 delete Bot-${m.Bot}; pm2 save --force`).then(async (res) => {
                      if (res) {
                            DeleteFolder(m.BotPath).then(async res1 => {
                              if (res1) {
                                const embed = new EmbedBuilder()
                                .setAuthor({ name: `Bot Got Deleted | Roverdev`, iconURL: "https://cdn.discordapp.com/emojis/1014937062992007168.gif" })
                                .setDescription(`<a:VerifedRed:1009505548762357852> Successfully Deleted <@!${m.Bot}>\n> - Because you did not pay for your bot!`)
                                .setColor("Yellow")
                              
                                
                                logs.send({
                                    content: `<a:a_warn:1015238388191858788> *Hello <@!${m.BotOwner}>, <@!${m.Bot}> Got Deleted cause you did not pay for it!*`,
                                      embeds: [embed]
                                })
              
                                 Roverdev.users.cache.get(m.BotOwner).send({
                                   content: `<a:a_warn:1015238388191858788> *Hello <@!${m.BotOwner}>, <@!${m.Bot}> Got Deleted cause you did not pay for it!*`,
                                   embeds: [embed]
                                  }) 

                                  const FindRack = await Roverdev[`${m.Rack}`.replace("-", "")].findOne({ Author: m.BotOwner })
                                  let array = FindRack.TotalBots
                                  console.log(array)
                                  const index = array.indexOf(`${m.Bot}`);
                                  console.log(index)
                                  const x = array.splice(index, 1);


                                  let Bots = await TotalBots.findOne({ Author: m.BotOwner })

                                  if (!Bots) {
                                           let data = await TotalBots.create({ 
                                                    Author: m.BotOwner
                                           })
                                           Bots = await TotalBots.findOne({ Author: m.BotOwner })
                                  }

                                  let array1 = Bots.TotalBots
                                  console.log(array1)
                                  const index1 = array1.indexOf(m.Bot);
                                  console.log(index1)
                                  const x1 = array1.splice(index1, 1);

                                  await TotalBots.findOneAndUpdate({ Author: Bots.Author }, { $set: { TotalBots: array1 } })

                                  let balanceCoins = await balance.findOne({ Author: m.BotOwner })

                                  if (m?.OringalRack !== "Booster-Rack") {
                                         await balance.findOneAndUpdate({ Author: m.BotOwner }, { $set: { PocketCoins: Number(balanceCoins.PocketCoins) + Number(m.CoinsAmount) } })
                                  }


                                  await Roverdev[`${m.Rack}`.replace("-", "")].findOneAndUpdate({ Author: m.BotOwner }, { $set: { TotalBots: array }})

                                  Roverdev.guilds.cache.get("1081700920993259550").members.cache.get(m.Bot).kick()

                                  await BotConfig.findOneAndDelete({ Bot: m.Bot })
                                  await PendingPayment.findOneAndDelete({ Bot: m.Bot })
                              }
                            }) 
                      }
                     })
                  }
            }                 
      })
     }, 50000);
}