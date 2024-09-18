let { EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js")
let { EmbedColor } = require("../../../Configuration/EmbedConfig")
let { RackPrices } = require("../../../Configuration/ShopConfig/RackSystem")
let Racks = require("../../../Databases/Schema/Racks")
let FreeRack = require("../../../Databases/Schema/Racks/Free-Rack")
let balance = require("../../../Databases/Schema/RoverCoins/balance")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
           let RackPricesConfig = {
               FreeRack: "Free",
               Rack1: 2000,
               Rack2: 3000,
               Rack3: 4000,
               Rack4: 5000,
               Rack5: 6000,
               PRack1: 4000,
               PRack2: 6000,
               PRack3: 8000,
               BoosterRack: "Free"
           }

           let RackNumberFind = await Racks.findOne({ Author: message.author.id })

           if (!RackNumberFind) {
            let data1 = await Racks.create({
              Author: message.author.id,
              TotalRacks: [],
              DeletedRacks: [],
              UsedRacks: [],
          }) 
          data1.save()
          RackNumberFind = await Racks.findOne({ Author: message.author.id })
           }

           let TotalRacks = ["Rack-1", "Rack-2", "Rack-3", "Rack-4", "Rack-5", "Booster-Rack"]

           RackNumberFind.TotalRacks.forEach(m => {
                     if (TotalRacks.includes(m)) {
                              let index = TotalRacks.indexOf(m)
                              TotalRacks.splice(index, 1)
                     }
           })

           if (!RackNumberFind.TotalRacks.includes("Free-Rack")) {

            let data = await Racks.findOne({ Author: message.author.id })

            if (!data) {
              let data1 = await Racks.create({
                  Author: message.author.id,
                  TotalRacks: [],
                  DeletedRacks: [],
                  UsedRacks: [],
              }) 
              data1.save()
              data = await Racks.findOne({ Author: message.author.id })
          }


                   console.log(`Seems they never got there Free Rack!`)

                       let dataTest = await FreeRack.findOne({ Author: message.author.id })

                       if (dataTest) {
                        let array = data.TotalRacks
                        array.push(`Free-Rack`)
                        await Racks.findOneAndUpdate({ Author: message.author.id  }, { $set: { TotalRacks: array } })
                        return message.reply({ embeds: [ 
                          new EmbedBuilder()
                          .setAuthor({ name: `${Roverdev.user.username} | Rack System`, iconURL: Roverdev.user.displayAvatarURL() })
                          .setColor(EmbedColor)
                          .setDescription(`Successfully Added Free-Rack into your racks!`)
                           ] })
                       }

                        let data12 = await Roverdev[`FreeRack`].create({ 
                                   Author: message.author.id
                          })

                          data12.save()

                        let array = data.TotalRacks
                        array.push(`Free-Rack`)
                        await Racks.findOneAndUpdate({ Author: message.author.id  }, { $set: { TotalRacks: array } })

                        let rackdata = await Roverdev[`FreeRack`.replace("-", "")].findOne({  Author: message.author.id })

                        return message.reply({ embeds: [ 
                               new EmbedBuilder()
                               .setAuthor({ name: `${Roverdev.user.username} | Rack System`, iconURL: Roverdev.user.displayAvatarURL() })
                               .setColor(EmbedColor)
                               .setDescription(`Succesfully Created Free-Rack\n> VM Storage Limit: ${rackdata.VMStorageLimit}\n> VM Ram Limit: ${rackdata.VMRamLimit}\n> Backup Limit: ${rackdata.Backupslimit}\n>  Bot Limit: ${rackdata.BotLimit}\n> VM Limit: ${rackdata.VMLimit}`)
                        ] })
           }

           if (!RackNumberFind.TotalRacks.includes("Booster-Rack") && message.member.roles.cache.has("935136720268197909")) {
                   console.log(`Giving user the booster rack...`)

                          let data12 = await Roverdev[`BoosterRack`.replace("-", "")].create({ 
                                   Author: message.author.id
                          })

                          data12.save()

                          let data = await Racks.findOne({ Author: message.author.id })

                          if (!data) {
                            let data1 = await Racks.create({
                                Author: message.author.id,
                                TotalRacks: [],
                                DeletedRacks: [],
                                UsedRacks: [],
                            }) 
                            data1.save()
                            data = await Racks.findOne({ Author: message.author.id })
                        }

                        let array = data.TotalRacks
                        array.push(`Booster-Rack`)
                        await Racks.findOneAndUpdate({ Author: message.author.id  }, { $set: { TotalRacks: array } })

                        let rackdata = await Roverdev[`BoosterRack`.replace("-", "")].findOne({  Author: message.author.id })

                        return message.reply({ embeds: [ 
                               new EmbedBuilder()
                               .setAuthor({ name: `${Roverdev.user.username} | Rack System`, iconURL: Roverdev.user.displayAvatarURL() })
                               .setColor(EmbedColor)
                               .setDescription(`Succesfully Created Booster-Rack\n> VM Storage Limit: ${rackdata.VMStorageLimit}\n> VM Ram Limit: ${rackdata.VMRamLimit}\n> Backup Limit: ${rackdata.Backupslimit}\n>  Bot Limit: ${rackdata.BotLimit}\n> VM Limit: ${rackdata.VMLimit}`)
                        ] })
           }

           let NextRack = TotalRacks[0]

           let findRack = RackPricesConfig[`${NextRack}`.replace("-", "")]

           let Coins = await balance.findOne({ Author: message.author.id })

           if (!Coins) {
            let data1 = await balance.create({ 
              Author: message.author.id,
      })
      data1.save()

      Coins = await balance.findOne({ Author: message.author.id })
           }

           let BankCoins = Coins.PocketCoins

           if (BankCoins < findRack) return message.reply({ content: `Seems you don't have enough pocket money to buy ${NextRack}... You have ${BankCoins} in your pocket! You need <:RoverCoin:1058275133711728670> ${findRack-BankCoins} More Coins` })

           let embed = new EmbedBuilder()
           .setAuthor({ name: `${Roverdev.user.username} | Rack System`, iconURL: Roverdev.user.displayAvatarURL() })
           .setColor(EmbedColor)
           .setDescription(`\n> Are you sure you want to buy ${NextRack} For <:RoverCoin:1058275133711728670> ${findRack} Coins?`)


           let button1 = new ButtonBuilder()
           .setCustomId("Accept-Buy")
           .setLabel("Yes, Buy it")
           .setStyle(ButtonStyle.Success)
  
           let button2 = new ButtonBuilder()
           .setCustomId("Decline-Buy")
           .setLabel("Decline, Don't buy")
           .setStyle(ButtonStyle.Danger)
  
           let row = new ActionRowBuilder().addComponents(button1,button2)

           let msg = await message.reply({ embeds: [embed], components: [row] })

           let filter = (interaction) => interaction.user.id === message.author.id;

           let collector = msg.createMessageComponentCollector({
             filter,
             time: 50000,
           });
     
           collector.on("collect", async (interaction) => {
                  if (interaction.customId == "Accept-Buy") {
                           button1.setDisabled(true)
                           button2.setDisabled(true)

                           interaction.message.edit({ components: [row] })

                          let data12 = await Roverdev[`${NextRack}`.replace("-", "")].create({ 
                                   Author: message.author.id
                          })

                          data12.save()

                          let data = await Racks.findOne({ Author: message.author.id })

                          if (!data) {
                            let data1 = await Racks.create({
                                Author: message.author.id,
                                TotalRacks: [],
                                DeletedRacks: [],
                                UsedRacks: [],
                            }) 
                            data1.save()
                            data = await Racks.findOne({ Author: message.author.id })
                        }

                        let array = data.TotalRacks
                        array.push(`${NextRack}`)
                        await Racks.findOneAndUpdate({ Author: message.author.id  }, { $set: { TotalRacks: array } })
                        await balance.findOneAndUpdate({ Author: message.author.id }, { $set: {
                              PocketCoins: Number(BankCoins)-Number(findRack)
                        } })

                        let rackdata = await Roverdev[`${NextRack}`.replace("-", "")].findOne({  Author: message.author.id })

                        interaction.reply({ embeds: [ 
                               new EmbedBuilder()
                               .setAuthor({ name: `${Roverdev.user.username} | Rack System`, iconURL: Roverdev.user.displayAvatarURL() })
                               .setColor(EmbedColor)
                               .setDescription(`Succesfully Created ${NextRack}\n> VM Storage Limit: ${rackdata.VMStorageLimit}\n> VM Ram Limit: ${rackdata.VMRamLimit}\n> Backup Limit: ${rackdata.Backupslimit}\n>  Bot Limit: ${rackdata.BotLimit}\n> VM Limit: ${rackdata.VMLimit}`)
                        ] })
                  }
        })
   }
}