const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     AcceptRules: {
          type: Boolean,
          default: null
     },
     DeclineRules: {
        type: Boolean,
        default: null
   },
})

const ShopRules = Mongoose.model('ShopRules', Rack)

module.exports = ShopRules