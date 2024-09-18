const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     InvitedBy: {
          type: String,
          default: null
     }
})

const InvitedBy = Mongoose.model('InvitedBy', Rack)

module.exports = InvitedBy