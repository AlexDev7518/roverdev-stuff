const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Bot: {
          type: String, 
          default: null
     },
     TimeToShutDown: {
      type: String, 
      default: null
     },
     TimeToDelete: {
      type: String, 
      default: null
     },
})

const PendingPayment = Mongoose.model('PendingPayment', Rack)

module.exports = PendingPayment