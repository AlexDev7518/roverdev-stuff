const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     Joins: {
        type: String, 
        default: null
     },
     Leaves: {
        type: String, 
        default: null
     },
     Fakes: {
        type: String, 
        default: null
     },
     Extra: {
        type: String, 
        default: null
     },
     TimeExtra: {
        type: String, 
        default: null
     }
})

const invites = Mongoose.model('Invites', Rack)

module.exports = invites