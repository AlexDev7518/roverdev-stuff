const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Channel: {
          type: String, 
          default: null
     },
      
    // Main Creation:

    BotType: {
        type: String, 
        default: null
    },
    HostingCustomization: {
      type: String, 
      default: null
    },
    BotCustomize: {
      type: String, 
      default: null  
    },
    RackSelection: {
      type: String, 
      default: null
    },
    PaymentType: {
      type: String, 
      default: null
    },
    CreationType: {
      type: String, 
      default: null
   },

    // extra
    Coupon: {
        type: String, 
        default: null
    },
    Premium: {
        type: String, 
        default: null
    },

    // Bot Creation:
     BotToken: {
        type: String, 
        default: null
     },
     BotId: {
      type: String, 
      default: null
   },
     BotPrefix: {
        type: String, 
        default: null
     },
     StatusPresence: {
        type: String, 
        default: null
     },
     StatusType: {
        type: String, 
        default: null
     },
     StatusName: {
        type: String, 
        default: null
     },

     // Channel Config
     PartsEmbed: {
        type: String, 
        default: null
     },

     // Normal Data

     BotOwner: {
      type: String, 
      default: null
   },
   BotMaker: {
      type: String, 
      default: null
   },

   // Bot

   BotCreationType: {
      type: String, 
      default: null
   },

   // Retry times
   RetryTimes: {
      type: Number, 
      default: 0
   },
   MaxRetryTimes: {
      type: Number, 
      default: 2
   }
})

const ShopCreation = Mongoose.model('ShopCreation', Rack)

module.exports = ShopCreation