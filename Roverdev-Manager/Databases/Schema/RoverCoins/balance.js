const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     PocketCoins: {
      type: Number, 
      default: 0
     },
     BankCoins: {
        type: Number, 
        default: 0
     },
     UsedBankCoins: {
          type: Number, 
          default: 0
       },
     UsedCoins: {
      type: Number, 
      default: 0
     }
})

const balance = Mongoose.model('balance', Rack)

module.exports = balance