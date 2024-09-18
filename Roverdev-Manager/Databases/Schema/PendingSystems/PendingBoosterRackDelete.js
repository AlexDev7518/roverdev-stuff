const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     TimeToShutDown: {
          type: String, 
          default: null
     },
     TimeToDelete: {
          type: String, 
          default: null
     }
})

const PendingBoosterRackDelete = Mongoose.model('PendingBoosterRackDelete', Rack)

module.exports = PendingBoosterRackDelete