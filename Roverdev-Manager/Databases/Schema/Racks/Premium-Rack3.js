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
          default: RackSystem.RackPrices.PRack1
     },
     VMStorageLimit: { 
          type: String,
          default: "Soon"
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
          default: 2
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

const PremiumRack3 = Mongoose.model('PremiumRack3', Rack)

module.exports = PremiumRack3