const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Bot: {
          type: String, 
          default: null
     },
     BotOwner: {
        type: String, 
        default: null
     },
     BotStatus: {
      type: String, 
      default: null
     },
     CreatedAt: {
        type: String, 
        default: null
     },
     BotPath: {
        type: String, 
        default: null
     },
     Status: {
        type: String, 
        default: null
     },
     HostingDuration: {
        type: String, 
        default: null
     },
      Rack: {
         type: String, 
         default: null
      },
     CoinsAmount: {
        type: String, 
        default: null
     },
     ShopServer: {
        type: String, 
        default: null
     },
     BotType: {
        type: String, 
        default: null
     },
     ExtraOwner: {
        type: Array, 
        default: null
     },
     Coupon: {
        type: String, 
        default: null
     },
     Premium: {
        type: String, 
        default: null
     },
     PaymentType: {
        type: String, 
        default: null
      },
      OringalRack: {
         type: String, 
         default: null
      },
      PaymentActive: {
         type: String, 
         default: null
      },
      BotUptime: {
         type: String, 
         default: null
      },
      ForceStopped: {
         type: Boolean, 
         default: null
      }
})

const BotConfig = Mongoose.model('BotConfig', Rack)

module.exports = BotConfig