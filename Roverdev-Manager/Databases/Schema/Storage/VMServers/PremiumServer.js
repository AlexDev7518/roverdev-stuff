const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Owner: {
        type: String, 
        default: null
     },
     ServerType: {
        type: String, 
        default: null
     },
     ServerCreated: {
        type: String, 
        default: null
     },
     ServerPayment: {
        type: String, 
        default: null
     },
     HostingDuration: {
        type: String, 
        default: null
     },
     VMRack: {
        type: String, 
        default: null
     }
})

const PremiumServer = Mongoose.model('PremiumServer', Rack)

module.exports = PremiumServer