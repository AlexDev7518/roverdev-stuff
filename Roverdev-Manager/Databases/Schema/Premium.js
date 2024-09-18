const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     PremiumStatus: {
          type: Boolean, 
          default: false
     },
     PremiumDuration: {
          type: String, 
          default: null
     },
     PremiumBooster: {
          type: Boolean, 
          default: null
     }
})

const Premium = Mongoose.model('Premium', Rack)

module.exports = Premium