const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     LastMessage: {
      type: String, 
      default: null
     }
})

const LastMessage = Mongoose.model('LastMessage', Rack)

module.exports = LastMessage