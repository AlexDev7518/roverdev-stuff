const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Bot: {
          type: String, 
          default: null
     },
     ShutDownBot: {
          type: String, 
          default: null
     }
})

const PendingMove = Mongoose.model('PendingMove', Rack)

module.exports = PendingMove