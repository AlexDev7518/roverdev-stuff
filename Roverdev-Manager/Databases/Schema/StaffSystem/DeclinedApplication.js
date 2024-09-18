const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     DateToReApply: {
         type: String, 
         default: null
     }
})

const DeclinedApplication = Mongoose.model('DeclinedApplication', Rack)

module.exports = DeclinedApplication