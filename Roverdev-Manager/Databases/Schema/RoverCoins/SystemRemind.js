const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     Remind: {
        type: Boolean, 
        default: false
     }
})

const SystemRemind = Mongoose.model('SystemRemind', Rack)

module.exports = SystemRemind