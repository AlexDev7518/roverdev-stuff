const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
        type: String, 
        default: null
     },
     BotPath: {
        type: String, 
        default: null
     },
     BotMaker: {
        type: String, 
        default: null
     },
     BotOwner: {
        type: String, 
        default: null
     },
     BotType: {
        type: String, 
        default: null
     },
     HostingDuration: {
        type: String, 
        default: null
     },
     ShopRack: {
        type: String, 
        default: null
     },
     ShopServer: {
        type: String, 
        default: null
     },
     BotCreated: {
      type: String, 
      default: null
   },
})

const RegularBot = Mongoose.model('RegularBot', Rack)

module.exports = RegularBot