const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
      type: String, 
      default: null
     },
     TotalBots: {
      type: Array, 
      default: null
     }
})

const TotalBots = Mongoose.model('TotalBots', Rack)

module.exports = TotalBots