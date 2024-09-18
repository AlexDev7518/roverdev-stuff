const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     DailyClaimed: {
           type: Boolean,
           default: false
     },
      DailyTime: {
           type: String,
           default: null
     },
     HourlyClaimed: {
           type: Boolean,
           default: false
     },
     HourlyTime: {
           type: String,
           default: null
     },
})

const RcCooldowns = Mongoose.model('RcCooldowns', Rack)

module.exports = RcCooldowns