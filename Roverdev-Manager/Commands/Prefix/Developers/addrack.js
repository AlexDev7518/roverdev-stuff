const Racks = require("../../../Databases/Schema/Racks")

const Rack1 = require("../../../Databases/Schema/Racks/Rack1")
const Rack2 = require("../../../Databases/Schema/Racks/Rack2")
const Rack3 = require("../../../Databases/Schema/Racks/Rack3")
const Rack4 = require("../../../Databases/Schema/Racks/Rack4")
const Rack5 = require("../../../Databases/Schema/Racks/Rack5")

const PremiumRack1 = require("../../../Databases/Schema/Racks/Premium-Rack1")
const PremiumRack2 = require("../../../Databases/Schema/Racks/Premium-Rack2")
const PremiumRack3 = require("../../../Databases/Schema/Racks/Premium-Rack3")
const Premium = require("../../../Databases/Schema/Premium")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
          const TotalRacks = [
                  "Rack-1",
                  "Rack-2",
                  "Rack-3",
                  "Rack-4",
                  "Rack-5",
                  "PRack1",
                  "PRack2",
                  "PRack3",
                  "BoosterRack",
                  "FreeRack"
          ]


          Rack1.findOneAndUpdate({ Author: m }, { $: { RackCost: "" } })

          let user = args[0] || message.mentions.members.first()

          if (!args[0]) return message.reply({ content: `Please Provide a user or userId` })

          if (args[0].includes(`@`)) {
            user = message.mentions.members.first()

            let PremiumData = await Premium.findOne({ Author: user.id  })

            if (!PremiumData) {
                  const EnsurePremium = await Premium.create({
                         Author: user.id
                  })

                  EnsurePremium.save()

                  PremiumData = await Premium.findOne({ Author: user.id  })
            }

            if (PremiumData.PremiumStatus == true) {
                     TotalRacks.push("P-Rack1", "P-Rack2", "P-Rack3")

                     if (!TotalRacks.includes(args[1])) return message.reply({ content: `Please Provide a rack through 1-5 or Provide a Premium Rack\n\n> Example Premium: ${require("../../../Configuration/BotConfig").BotPrefix}addrack P-Rack-<number>\n> Example Regular: ${require("../../../Configuration/BotConfig").BotPrefix}addrack Rack-<number>` })
            }

            if (!TotalRacks.includes(args[1])) return message.reply({ content: `Please Provide a rack through 1-5\n> Example Regular: ${require("../../../Configuration/BotConfig").BotPrefix}addrack Rack-<number>` })
  
            const RackNumber = args[1]

            Roverdev.logger.info(require("colors").yellow(`Now Adding ${RackNumber} To There Racks...`), { label: `Rack System` })

            let data = await Racks.findOne({ Author: user.id})

            if (!data) {
                let data1 = await Racks.create({
                    Author: user.id,
                    TotalRacks: [],
                    DeletedRacks: [],
                    UsedRacks: [],
                }) 
                data1.save()
                data = await Racks.findOne({ Author: user.id})
            }

            if (data.TotalRacks.includes(RackNumber)) return message.reply({ content: `Seems this rack is already in there Racks!` })

            const array = data.TotalRacks
            array.push(`${RackNumber}`)
            await Racks.findOneAndUpdate({ Author: user.id }, { $set: { TotalRacks: array } })

            if (`${RackNumber}`.replace("-", "") == "Rack1") {
                    const data = await Rack1.create({ 
                              Author: user.id,
                     })
                     data.save()

                     return message.reply({ content: `Successfully Added ${RackNumber} To ${Roverdev.users.cache.get(user.id).tag} racks!` })
            } else if (`${RackNumber}`.replace("-", "") == "Rack2") {
                    const data = await Rack2.create({ 
                              Author: user.id,
                     })
                     data.save()

                     return message.reply({ content: `Successfully Added ${RackNumber} To ${Roverdev.users.cache.get(user.id).tag} racks!` })
            } else if (`${RackNumber}`.replace("-", "") == "Rack3") {
                    const data = await Rack3.create({ 
                              Author: user.id,
                     })
                     data.save()

                     return message.reply({ content: `Successfully Added ${RackNumber} To ${Roverdev.users.cache.get(user.id).tag} racks!` })
            } else if (`${RackNumber}`.replace("-", "") == "Rack4") {
                    const data = await Rack4.create({ 
                              Author: user.id,
                     })
                     data.save()

                     return message.reply({ content: `Successfully Added ${RackNumber} To ${Roverdev.users.cache.get(user.id).tag} racks!` })
            } else if (`${RackNumber}`.replace("-", "") == "Rack5") {
                    const data = await Rack5.create({ 
                              Author: user.id,
                     })
                     data.save()

                     return message.reply({ content: `Successfully Added ${RackNumber} To ${Roverdev.users.cache.get(user.id).tag} racks!` })
            } else if (`${RackNumber}`.replace("-", "") == "P-Rack1") {
                    const data = await PremiumRack1.create({ 
                              Author: user.id,
                     })
                     data.save()

                     return message.reply({ content: `Successfully Added ${RackNumber} To ${Roverdev.users.cache.get(user.id).tag} racks!` })
            } else if (`${RackNumber}`.replace("-", "") == "P-Rack2") {
                    const data = await PremiumRack2.create({ 
                              Author: user.id,
                     })
                     data.save()

                     return message.reply({ content: `Successfully Added ${RackNumber} To ${Roverdev.users.cache.get(user.id).tag} racks!` })
            } else if (`${RackNumber}`.replace("-", "") == "P-Rack3") {
                    const data = await PremiumRack3.create({ 
                              Author: user.id,
                     })
                     data.save()

                     return message.reply({ content: `Successfully Added ${RackNumber} To ${Roverdev.users.cache.get(user.id).tag} racks!` })
            } 

          } else if (!args[0].includes(`@`)) {
            user = Roverdev.users.cache.get(args[0])

            let PremiumData = await Premium.findOne({ Author: user.id  })

            if (!PremiumData) {
                  const EnsurePremium = await Premium.create({
                         Author: user.id
                  })

                  EnsurePremium.save()

                  PremiumData = await Premium.findOne({ Author: user.id  })
            }

            if (PremiumData.PremiumStatus == true) {
                TotalRacks.push("P-Rack1", "P-Rack2", "P-Rack3")

                if (!TotalRacks.includes(args[1])) return message.reply({ content: `Please Provide a rack through 1-5 or Provide a Premium Rack\n\n> Example Premium: ${require("../../../Configuration/BotConfig").BotPrefix}addrack <userid> P-Rack-<number>\n> Example Regular: ${require("../../../Configuration/BotConfig").BotPrefix}addrack <userid>  Rack-<number>` })
       }

          if (!TotalRacks.includes(args[1])) return message.reply({ content: `Please Provide a rack through 1-5\n> Example Regular: ${require("../../../Configuration/BotConfig").BotPrefix}addrack <userid> Rack-<number>` })
  
  
            const RackNumber = args[1]

            Roverdev.logger.info(require("colors").yellow(`Now Adding ${RackNumber} To There Racks...`), { label: `Rack System` })

            let data = await Racks.findOne({ Author: user.id})

            if (!data) {
                let data1 = await Racks.create({
                    Author: user.id,
                    TotalRacks: [],
                    DeletedRacks: [],
                    UsedRacks: [],
                }) 
                data1.save()
                data = await Racks.findOne({ Author: user.id})
            }

            const array = data.TotalRacks
            array.push(`${RackNumber}`)
            await Racks.findOneAndUpdate({ Author: user.id }, { $set: { TotalRacks: array } })

            if (`${RackNumber}`.replace("-", "") == "Rack1") {
                    const data = await Rack1.create({ 
                              Author: user.id,
                     })
                     data.save()

                     return message.reply({ content: `Successfully Added ${RackNumber} To ${Roverdev.users.cache.get(user.id).tag} racks!` })
            } else if (`${RackNumber}`.replace("-", "") == "Rack2") {
                    const data = await Rack2.create({ 
                              Author: user.id,
                     })
                     data.save()

                     return message.reply({ content: `Successfully Added ${RackNumber} To ${Roverdev.users.cache.get(user.id).tag} racks!` })
            } else if (`${RackNumber}`.replace("-", "") == "Rack3") {
                    const data = await Rack3.create({ 
                              Author: user.id,
                     })
                     data.save()

                     return message.reply({ content: `Successfully Added ${RackNumber} To ${Roverdev.users.cache.get(user.id).tag} racks!` })
            } else if (`${RackNumber}`.replace("-", "") == "Rack4") {
                    const data = await Rack4.create({ 
                              Author: user.id,
                     })
                     data.save()

                     return message.reply({ content: `Successfully Added ${RackNumber} To ${Roverdev.users.cache.get(user.id).tag} racks!` })
            } else if (`${RackNumber}`.replace("-", "") == "Rack5") {
                    const data = await Rack5.create({ 
                              Author: user.id,
                     })
                     data.save()

                     return message.reply({ content: `Successfully Added ${RackNumber} To ${Roverdev.users.cache.get(user.id).tag} racks!` })
            } else if (`${RackNumber}`.replace("-", "") == "P-Rack1") {
                    const data = await PremiumRack1.create({ 
                              Author: user.id,
                     })
                     data.save()

                     return message.reply({ content: `Successfully Added ${RackNumber} To ${Roverdev.users.cache.get(user.id).tag} racks!` })
            } else if (`${RackNumber}`.replace("-", "") == "P-Rack2") {
                    const data = await PremiumRack2.create({ 
                              Author: user.id,
                     })
                     data.save()

                     return message.reply({ content: `Successfully Added ${RackNumber} To ${Roverdev.users.cache.get(user.id).tag} racks!` })
            } else if (`${RackNumber}`.replace("-", "") == "P-Rack3") {
                    const data = await PremiumRack3.create({ 
                              Author: user.id,
                     })
                     data.save()

                     return message.reply({ content: `Successfully Added ${RackNumber} To ${Roverdev.users.cache.get(user.id).tag} racks!` })
            }
          }
          
   }
}