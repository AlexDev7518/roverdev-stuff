const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     Joins: {
        type: Number, 
        default: null
     },
     Leaves: {
        type: Array, 
        default: null
     },
     Fakes: {
          type: Number,
          default: null
     }
})

const InviteTracker = Mongoose.model('InviteTracker', Rack)

module.exports = InviteTracker