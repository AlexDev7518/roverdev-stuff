const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     StorageLimit: {
           type: String,
           default: null
     },
     RamLimit: {
        type: String,
        default: null
     },
     ShopRackLimit: {
        type: String,
        default: null
     },
     VMRackLimit: {
        type: String,
        default: null
     }
     
})

const Stocks = Mongoose.model('Stocks', Rack)

module.exports = Stocks