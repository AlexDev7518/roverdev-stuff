const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     AuthorUsername: {
        type: String, 
        default: null
     },
     Channel: {
        type: String, 
        default: null
     },
     CreatedAt: {
        type: String, 
        default: null
     },
     ClaimedUsers: {
        type: Array,
        default: null
     },
     TicketId: {
        type: Number, 
        default: null
     },
     TicketType: {
        type: String, 
        default: null
     },
     TicketClaimTime: {
        type: String, 
        default: null
     },
     TicketClaimWaitTime: {
        type: String, 
        default: null
     },

     MainMessage: {
      type: String, 
      default: null 
     },
     TicketEmoji: { 
        type: String, 
        default: null 
     },
     
     TicketFinishedTime: {
        type: String, 
         default: null 
     }
})

const CreateTicket = Mongoose.model('CreateTicket', Rack)

module.exports = CreateTicket