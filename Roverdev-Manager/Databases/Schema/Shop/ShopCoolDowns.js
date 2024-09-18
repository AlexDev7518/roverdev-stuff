const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Bot: {
          type: String, 
          default: null
     },
     BotShopCoolDown: {
          type: String,
          default: null
     }
})

const ShopCoolDowns = Mongoose.model('ShopCoolDowns', Rack)

module.exports = ShopCoolDowns