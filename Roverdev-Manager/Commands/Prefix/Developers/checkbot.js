const Racks = require("../../../Databases/Schema/Racks");
const FreeRack = require("../../../Databases/Schema/Racks/Free-Rack");
const balance = require("../../../Databases/Schema/RoverCoins/balance");
const BotConfig = require("../../../Databases/Schema/Shop/BotConfig");
const TotalBots = require("../../../Databases/Schema/Shop/TotalBots");

module.exports = {
  PrefixConfiguration: {},
  Settings: {},

 CommandRun: async (Roverdev, message, args, executor) => {
       // const data = await TotalBots.find()
       // data.forEach(async m => {
       //         if (m.TotalBots.length > 0 && m.TotalBots.length < 2) {

       //               let TotalRacks = await Racks.findOne({ Author: m.Author })

       //               if (!TotalRacks.TotalRacks.includes("Free-Rack")) {
       //                      let array = TotalRacks.TotalRacks
       //                      array.push("Free-Rack")
       //                      await Racks.findOneAndUpdate({ Author: m.Author }, { $set: { TotalRacks: array } })
       //                }
                    

       //         }
       // })
}}