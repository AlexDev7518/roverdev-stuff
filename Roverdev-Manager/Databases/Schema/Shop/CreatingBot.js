const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Channel: {
          type: String, 
          default: null
     },
     CreatingBotStatus: {
          type: Boolean,
          default: false
     }
})

const CreatingBot = Mongoose.model('CreatingBot', Rack)

module.exports = CreatingBot