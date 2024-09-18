const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     AllMessages: {
           type: Number,
           default: 0
     },
     CommandsRan: {
          type: Number,
          default: 0
     },
     SpamMessages: {
          type: Number,
          default: 0
     },
     VoiceChannelTime: {
          type: String,
          default: "0min"
     },
     TicketMessages: {
         type: Number,
         default: 0
     },
     GiveawayMessages: {
          type: Number,
          default: 0
      },
})


const Ranking = Mongoose.model('Ranking', Rack)

module.exports = Ranking