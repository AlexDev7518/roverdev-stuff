const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     SpamWarnings: {
        type: Number, 
        default: 0
     }
})

const AntiSpam = Mongoose.model('AntiSpam', Rack)

module.exports = AntiSpam