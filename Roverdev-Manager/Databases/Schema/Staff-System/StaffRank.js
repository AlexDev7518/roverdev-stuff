const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     StaffChannelMessages: {
          type: String,
          default: null
     },
     BotsCreated: {
        type: String,
        default: null
     },
     TIcketMessages: {
        type: String,
        default: null
     },
})


const StaffRank = Mongoose.model('staffrank', Rack)

module.exports = StaffRank