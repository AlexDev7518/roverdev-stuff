const { EmbedBuilder } = require("discord.js")
const { EmbedColor } = require("../../../Configuration/EmbedConfig")
const PendingBoosterRackDelete = require("../../../Databases/Schema/PendingSystems/PendingBoosterRackDelete")
const BoosterRack = require("../../../Databases/Schema/Racks/Booster-Rack")
let ms = require("ms")
const Racks = require("../../../Databases/Schema/Racks")
const { FolderExists, CreateFolder, downloadFolder, DeleteFolder, RunCommand, UploadFolder, CreateRack } = require("../Functions")
const BotConfig = require("../../../Databases/Schema/Shop/BotConfig")

const balance = require("../../../Databases/Schema/RoverCoins/balance");
const TotalBots = require("../../../Databases/Schema/Shop/TotalBots");
const TotalCoins = require("../../../Databases/Schema/RoverCoins/TotalCoins")

module.exports = async Roverdev => {


  Roverdev.logger.info(require("colors").yellow(`Now Checking Roverdev Bot Shop - Event: BoosterRack-System [Every 2min!]`), { label: "Shop-System" })
  setInterval(async () => {
    Roverdev.logger.info(require("colors").yellow(`Now Checking Roverdev Bot Shop - Event: BoosterRack-System [Every 2min!]`), { label: "Shop-System" })
    const data = await BoosterRack.find()
    data.forEach(async m => {
      const User = Roverdev.guilds.cache.get("1081700920993259550").members.cache.get(m.Author)

      const data2 = await PendingBoosterRackDelete.findOne({ Author: m.Author })

      if (!data2) {

        if (!User) {
          if (m.TotalBots.length < 1) {
            let data1 = await Racks.findOne({ Author: m.Author })
            const array = data1.TotalRacks
            const index = array.indexOf("Booster-Rack");
            const x = array.splice(index, 1);


            await Racks.findOneAndUpdate({ Author: m.Author }, { $set: { TotalRacks: array } })

            const Logs = Roverdev.channels.cache.get("1069647814444974091")

            await BoosterRack.findOneAndDelete({ Author: m.Author })

            return Logs.send({
              embeds: [
                new EmbedBuilder()
                  .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                  .setColor(EmbedColor)
                  .setDescription(`Successfully Deleted Booster-Rack From: <@${m.Author}>\n> - cause they don't have boosters role anymore`)
              ]
            })
          }

          let data1 = await Racks.findOne({ Author: m.Author })
          const array = data1.TotalRacks
          const index = array.indexOf("Free-Rack")
          const x = array.splice(index, 1);

          const index2 = array.indexOf("Booster-Rack");
          const x1 = array.splice(index2, 1);

          const Rack = array[0]

          const data2 = await BoosterRack.findOne({ Author: m.Author })

          if (data2 == null) return

          if (array.length < 1) {


            data2.TotalBots.forEach(async m1 => {
              const bot = await BotConfig.findOne({ Bot: m1 })
              RunCommand(`pm2 delete Bot-${bot.Bot}; pm2 save --force`).then(async (res) => {
                if (res) {
                  DeleteFolder(bot.BotPath).then(async res1 => {
                    if (res1) {
                      const embed = new EmbedBuilder()
                        .setAuthor({ name: `Bot Got Deleted | Roverdev`, iconURL: "https://cdn.discordapp.com/emojis/1014937062992007168.gif" })
                        .setDescription(`<a:VerifedRed:1009505548762357852> Successfully Deleted <@!${bot.Bot}>\n> - Because You did not have a extra rack to put this bot in!`)
                        .setColor("Yellow")

                      const Logs = Roverdev.channels.cache.get("1069647814444974091")


                      Logs.send({
                        content: `<a:a_warn:1015238388191858788> *Hello <@!${bot.BotOwner}>, <@!${bot.Bot}> Got Deleted Because You did not have a extra rack to put this bot in!*`,
                        embeds: [embed]
                      })


                      await BoosterRack.findOneAndDelete({ Author: bot.BotOwner })
                      await PendingBoosterRackDelete.findOneAndDelete({ Author: bot.BotOwner })

                      Roverdev.guilds.cache.get("1081700920993259550").members.cache.get(bot.Bot).kick()

                      await BotConfig.findOneAndDelete({ Bot: bot.Bot })
                    }
                  })
                }
              })
            })
            return;
          }
        }

        if (!User.roles.cache.has("935136720268197909")) {

          if (m.TotalBots.length < 1) {
            let data1 = await Racks.findOne({ Author: m.Author })
            const array = data1.TotalRacks
            const index = array.indexOf("Booster-Rack");
            const x = array.splice(index, 1);


            await Racks.findOneAndUpdate({ Author: m.Author }, { $set: { TotalRacks: array } })

            const Logs = Roverdev.channels.cache.get("1069647814444974091")

            await BoosterRack.findOneAndDelete({ Author: m.Author })

            return Logs.send({
              embeds: [
                new EmbedBuilder()
                  .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                  .setColor(EmbedColor)
                  .setDescription(`Successfully Deleted Booster-Rack From: <@${m.Author}>\n> - cause they don't have boosters role anymore`)
              ]
            })
          }

          const data3 = await PendingBoosterRackDelete.findOne({ Author: m.Author })

          if (!data3) {
            const embed = new EmbedBuilder()
              .setAuthor({ name: `Booster-Rack - Unboosted | Roverdev`, iconURL: "https://cdn.discordapp.com/emojis/892308380058800128.png" })
              .setTitle("Your Rack and all the bots in it might get deleted, if you don't boost the server again or have another rack I can move it to")
              .setDescription(`\`\`\`yml\nRack: Booster-Rack\nTotalBots: ${m.TotalBots.length} \`\`\`\n> - *I will try to move the bots to another rack if not then the bot will be deleted!*`)
              .setColor("Yellow")

            const ms = require("ms")

            let day = ms("24h")

            day = Date.now() + day

            const Logs = Roverdev.channels.cache.get("1069647814444974091")


            Logs.send({
              content: `<a:a_warn:1015238388191858788> ***<@${User.id}> Needs to move the bots out of here before the rack gets deleted!***\n> - Bots will shutdown <t:${Math.floor(day / 1000)}:R> `,
              embeds: [embed]
            })

            Roverdev.users.cache.get(User.id).send({
              content: `<a:a_warn:1015238388191858788> ***<@${User.id}> You need to move the bots out of here before the rack gets deleted!***\n> - Bots will shutdown <t:${Math.floor(day / 1000)}:R>`,
              embeds: [embed]
            })

            await PendingBoosterRackDelete.create({
              Author: User.id,
              TimeToShutDown: day
            })
          }
        }
      }
    })
  }, 120000)

  Roverdev.logger.info(require("colors").yellow(`Now Checking Roverdev Bot Shop - Event: BoosterRack-System-Delete [Every 2min!]`), { label: "Shop-System" })

  setInterval(async () => {
    Roverdev.logger.info(require("colors").yellow(`Now Checking Roverdev Bot Shop - Event: BoosterRack-System-Delete [Every 2min!]`), { label: "Shop-System" })

    const data = await PendingBoosterRackDelete.find()

    data.forEach(async m => {
      if (m.TimeToShutDown < Date.now()) {

        const User = Roverdev.guilds.cache.get("1081700920993259550").members.cache.get(m.Author)

        if (User.roles.cache.has("935136720268197909")) {
          const embed = new EmbedBuilder()
            .setAuthor({ name: `Booster-Rack - ReBoosteed | Roverdev`, iconURL: "https://cdn.discordapp.com/emojis/892308380058800128.png" })
            .setTitle("Thanks For Reboosting Roverdev Community")
            .setColor(EmbedColor)
          await PendingBoosterRackDelete.findOneAndDelete({ Author: User.id })

          const Logs = Roverdev.channels.cache.get("1069647814444974091")

          Roverdev.users.cache.get(User.id).send({ embeds: [embed] })
          return Logs.send({ embeds: [embed], content: `${User} Successfully Boosted Back, So they can keep the rack!` })
        }

        let data1 = await Racks.findOne({ Author: m.Author })
        const array = data1.TotalRacks
        const index = array.indexOf("Free-Rack")
        const x = array.splice(index, 1);

        const index2 = array.indexOf("Booster-Rack");
        const x1 = array.splice(index2, 1);

        const Rack = array[0]

        const data2 = await BoosterRack.findOne({ Author: m.Author })

        if (data2 == null) return

        if (array.length < 1) {

          console.log(data2)

          data2.TotalBots.forEach(async m1 => {
            const bot = await BotConfig.findOne({ Bot: m1 })
            RunCommand(`pm2 delete Bot-${bot.Bot}; pm2 save --force`).then(async (res) => {
              if (res) {
                DeleteFolder(bot.BotPath).then(async res1 => {
                  if (res1) {
                    const embed = new EmbedBuilder()
                      .setAuthor({ name: `Bot Got Deleted | Roverdev`, iconURL: "https://cdn.discordapp.com/emojis/1014937062992007168.gif" })
                      .setDescription(`<a:VerifedRed:1009505548762357852> Successfully Deleted <@!${bot.Bot}>\n> - Because You did not have a extra rack to put this bot in!`)
                      .setColor("Yellow")

                    const Logs = Roverdev.channels.cache.get("1069647814444974091")


                    Logs.send({
                      content: `<a:a_warn:1015238388191858788> *Hello <@!${bot.BotOwner}>, <@!${bot.Bot}> Got Deleted Because You did not have a extra rack to put this bot in!*`,
                      embeds: [embed]
                    })

                    Roverdev.users.cache.get(bot.BotOwner).send({
                      content: `<a:a_warn:1015238388191858788> *Hello <@!${bot.BotOwner}>, <@!${bot.Bot}> Got Deleted Because You did not have a extra rack to put this bot in!*`,
                      embeds: [embed]
                    })

                    const FindRack = await Roverdev[`${bot.Rack}`.replace("-", "")].findOne({ Author: bot.BotOwner })
                    let array = FindRack.TotalBots
                    const index = array.indexOf(bot.Bot);
                    const x = array.splice(index, 1);

                    let Bots = await TotalBots.findOne({ Author: bot.BotOwner })

                    if (!Bots) {
                      let data = await TotalBots.create({
                        Author: bot.BotOwner
                      })
                      Bots = await TotalBots.findOne({ Author: bot.BotOwner })
                    }

                    let array1 = Bots.TotalBots
                    const index1 = array1.indexOf(bot.Bot);
                    const x1 = array1.splice(index1, 1);

                    await TotalBots.findOneAndUpdate({ Author: bot.BotOwner }, { $set: { TotalBots: array1 } })

                    let balanceCoins = await balance.findOne({ Author: bot.BotOwner })

                    const TotalCoinsData = await TotalCoins.findOne({ Author: interaction.user.id })

                    await BoosterRack.findOneAndDelete({ Author: bot.BotOwner })
                    await PendingBoosterRackDelete.findOneAndDelete({ Author: bot.BotOwner })

                    const UsedRankingCoins = TotalCoinsData.UsedRankingCoins
                    const UsedInviteCoins = TotalCoinsData.UsedInviteCoins
                    const UsedPaiedCoins = TotalCoinsData.UsedPaiedCoins
                    const UsedDefaultCoins = TotalCoinsData.UsedDefaultCoins

                    if (UsedRankingCoins == 0) {

                    } else if (UsedInviteCoins == 0) {

                    } else if (UsedPaiedCoins == 0) {

                    } else if (UsedDefaultCoins == 0) {

                    } else {
                      await balance.findOneAndUpdate({ Author: bot.BotOwner }, { $set: { PocketCoins: Number(balanceCoins.PocketCoins) + Number(bot.CoinsAmount) } })
                    }

                    await Roverdev[`${bot.Rack}`.replace("-", "")].findOneAndUpdate({ Author: bot.BotOwner }, { $set: { TotalBots: array1 } })

                    Roverdev.guilds.cache.get("1081700920993259550").members.cache.get(bot.Bot).kick()

                    await BotConfig.findOneAndDelete({ Bot: bot.Bot })
                  }
                })
              }
            })
          })
          return;
        }

        const FindRack = await Roverdev[`${Rack}`.replace("-", "")].findOne({ Author: m.Author })

        data2.TotalBots.forEach(async m1 => {
          const bot = await BotConfig.findOne({ Bot: m1 })
          FolderExists(`/home/Shop/Service/${Rack}/Bots/${bot.BotType}`).then((res) => {
            if (res) {
              console.log(`yes1`)
              require("child_process").exec(`mkdir /home/Roverdev-Manager/Modules/Downloads/Bot-${bot.Bot}`).
                downloadFolder(bot.BotPath, `/home/Roverdev-Manager/Modules/Downloads/Bot-${bot.Bot}`).then((res2) => {
                  console.log(`yes2`)
                  if (res2) {
                    DeleteFolder(bot.BotPath).then((res3) => {
                      console.log(`yes3`)
                      if (res3) {
                        RunCommand(`pm2 delete Bot-${bot.Bot}; pm2 save --force`).then((res4) => {
                          console.log(`yes4`)
                          if (res4) {
                            setTimeout(() => {
                              CreateFolder(`/home/Shop/Service/${Rack}/Bots/${bot.BotType}/Bot-${bot.Bot}`).then((res5) => {
                                console.log(`yes5`)
                                if (res5) {
                                  UploadFolder(`/home/Roverdev-Manager/Modules/Downloads/Bot-${bot.Bot}`, `/home/Shop/Service/${Rack}/Bots/${bot.BotType}/Bot-${bot.Bot}`).then(res6 => {
                                    if (res6) {
                                      console.log(`yes6`)
                                      RunCommand(`rm -rf /home/Shop/Service/${Rack}/Bots/${bot.BotType}/Bot-${bot.Bot}/node_modules; cd /home/Shop/Service/${Rack}/Bots/${bot.BotType}/Bot-${bot.Bot}; pm2 start StartBot.js --name Bot-${bot.Bot} --namespace ${bot.BotType}; pm2 save --force `).then(async res7 => {
                                        if (res7) {
                                          console.log(`yes7`)
                                          const array = data1.TotalRacks

                                          require('child_process').exec(`rm -rf /home/Roverdev-Manager/Modules/Downloads/Bot-${bot.Bot}`)

                                          array.push("Free-Rack")


                                          await Racks.findOneAndUpdate({ Author: m.Author }, { $set: { TotalRacks: array } })

                                          await BotConfig.findOneAndUpdate({ Bot: m1 }, { $set: { BotPath: `/home/Shop/Service/${Rack}/Bots/${bot.BotType}/Bot-${bot.Bot}`, Rack: Rack, PaymentType: "Pocket-Coins", OringalRack: "Booster-Rack" } })

                                          const embed = new EmbedBuilder()
                                            .setAuthor({ name: `Booster-Rack - Unboosted | Roverdev`, iconURL: "https://cdn.discordapp.com/emojis/892308380058800128.png" })
                                            .setTitle("Successfully Moved the Bot to another Rack!")
                                            .setDescription(`\`\`\`yml\nNew Rack: ${Rack}\nPath: /home/Shop/Service/${Rack}/Bots/${bot.BotType}/Bot-${bot.Bot}\`\`\`\n`)
                                            .setColor("Yellow")


                                          const Logs = Roverdev.channels.cache.get("1069647814444974091")


                                          Logs.send({
                                            content: `<:Info:1010183373119041597> ***<@${bot.BotOwner}>, I Successfully Moved <@${bot.Bot}> To ${Rack}!*** `,
                                            embeds: [embed]
                                          })

                                          Roverdev.users.cache.get(bot.BotOwner).send({
                                            content: `<:Info:1010183373119041597> ***Hey <@${bot.BotOwner}>, I Successfully Moved <@${bot.Bot}> To ${Rack}!*** `,
                                            embeds: [embed]
                                          })

                                          await BoosterRack.findOneAndDelete({ Author: bot.BotOwner })
                                          await PendingBoosterRackDelete.findOneAndDelete({ Author: bot.BotOwner })

                                          console.log(Rack)

                                          const FindRack = await Roverdev[`${Rack}`.replace("-", "")].findOne({ Author: bot.BotOwner })

                                          let array1 = FindRack.TotalBots
                                          array1.push(bot.Bot)

                                          console.log(array1)

                                          await Roverdev[`${Rack}`.replace("-", "")].findOneAndUpdate({ Author: bot.BotOwner }, { TotalBots: array1 })
                                        }
                                      })
                                    }
                                  })
                                }
                              })
                            }, 1000);
                          }
                        })
                      }
                    })
                  }
                })
            }
          }).catch((e) => {
            CreateRack(Rack, bot.BotType).then(res => {
              if (res) {
                require("child_process").exec(`mkdir /home/Roverdev-Manager/Modules/Downloads/Bot-${bot.Bot}`)
                downloadFolder(bot.BotPath, `/home/Roverdev-Manager/Modules/Downloads/Bot-${bot.Bot}`).then((res2) => {
                  console.log(`yes12`)
                  if (res2) {
                    DeleteFolder(bot.BotPath).then((res3) => {
                      console.log(`yes13`)
                      if (res3) {
                        RunCommand(`pm2 delete Bot-${bot.Bot}; pm2 save --force`).then((res4) => {
                          console.log(`yes14`)
                          if (res4) {
                            setTimeout(() => {
                              CreateFolder(`/home/Shop/Service/${Rack}/Bots/${bot.BotType}/Bot-${bot.Bot}`).then((res5) => {
                                if (res5) {
                                  console.log(`yes15`)
                                  UploadFolder(`/home/Roverdev-Manager/Modules/Downloads/Bot-${bot.Bot}`, `/home/Shop/Service/${Rack}/Bots/${bot.BotType}/Bot-${bot.Bot}`).then(res6 => {
                                    if (res6) {
                                      console.log(`yes16`)
                                      RunCommand(`rm -rf /home/Shop/Service/${Rack}/Bots/${bot.BotType}/Bot-${bot.Bot}/node_modules; cd /home/Shop/Service/${Rack}/Bots/${bot.BotType}/Bot-${bot.Bot}; pm2 start StartBot.js --name Bot-${bot.Bot} --namespace ${bot.BotType}; pm2 save --force `).then(async res7 => {
                                        if (res7) {
                                          console.log(`yes17`)
                                          const array = data1.TotalRacks

                                          require('child_process').exec(`rm -rf /home/Roverdev-Manager/Modules/Downloads/Bot-${bot.Bot}`)

                                          array.push("Free-Rack")


                                          await Racks.findOneAndUpdate({ Author: m.Author }, { $set: { TotalRacks: array } })

                                          await BotConfig.findOneAndUpdate({ Bot: m1 }, { $set: { BotPath: `/home/Shop/Service/${Rack}/Bots/${bot.BotType}/Bot-${bot.Bot}`, Rack: Rack, PaymentType: "Pocket-Coins" } })

                                          const embed = new EmbedBuilder()
                                            .setAuthor({ name: `Booster-Rack - Unboosted | Roverdev`, iconURL: "https://cdn.discordapp.com/emojis/892308380058800128.png" })
                                            .setTitle("Successfully Moved the Bot to another Rack!")
                                            .setDescription(`\`\`\`yml\nNew Rack: ${Rack}\nPath: /home/Shop/Service/${Rack}/Bots/${bot.BotType}/Bot-${bot.Bot}\`\`\`\n`)
                                            .setColor("Yellow")


                                          const Logs = Roverdev.channels.cache.get("1069647814444974091")


                                          Logs.send({
                                            content: `<:Info:1010183373119041597> ***<@${bot.BotOwner}>, I Successfully Moved <@${bot.Bot}> To ${Rack}!*** `,
                                            embeds: [embed]
                                          })

                                          Roverdev.users.cache.get(bot.BotOwner).send({
                                            content: `<:Info:1010183373119041597> ***Hey <@${bot.BotOwner}>, I Successfully Moved <@${bot.Bot}> To ${Rack}!*** `,
                                            embeds: [embed]
                                          })

                                          await BoosterRack.findOneAndDelete({ Author: bot.BotOwner })
                                          await PendingBoosterRackDelete.findOneAndDelete({ Author: bot.BotOwner })


                                          console.log(Rack)

                                          const FindRack = await Roverdev[`${Rack}`.replace("-", "")].findOne({ Author: bot.BotOwner })

                                          let array1 = FindRack.TotalBots
                                          array1.push(bot.Bot)

                                          console.log(array1)

                                          await Roverdev[`${Rack}`.replace("-", "")].findOneAndUpdate({ Author: bot.BotOwner }, { TotalBots: array1 })
                                        }
                                      })
                                    }
                                  })
                                }
                              })
                            }, 1000);
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          })
        })
      }
    })

  }, 120000)
}