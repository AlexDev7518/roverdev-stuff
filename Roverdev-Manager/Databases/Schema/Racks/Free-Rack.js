const Mongoose = require('mongoose')
const RackSystem = require('../../../Configuration/ShopConfig/RackSystem')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     RackCost: {
          type: String,
          default: RackSystem.RackPrices.FreeRack
     },
      VMStorageLimit: { 
           type: String,
           default: "unlimited"
       },
      VMRamLimit: {
           type: String,
           default: "Soon"
       },
      Backupslimit: {
         type: String,
         default: 2
      },
      BotLimit: {
           type: String,
           default: 1
      },
      VMLimit: {
           type: String,
           default: 1
      },
      TotalBots: {
           type: Array,
           default: []
      },
      TotalVM: {
           type: Array,
           default: []
      }
})

const FreeRack = Mongoose.model('FreeRack', Rack)

module.exports = FreeRack