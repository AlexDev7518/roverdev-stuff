const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     Code: {
         type: String,
         default: null
     },
})

const InviteSystem = Mongoose.model('InviteSystem', Rack)

module.exports = InviteSystem