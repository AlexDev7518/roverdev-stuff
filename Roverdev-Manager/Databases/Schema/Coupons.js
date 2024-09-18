const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     Cuppons: {
        type: Array, 
        default: []
     }
})

const Coupons = Mongoose.model('Coupons', Rack)

module.exports = Coupons