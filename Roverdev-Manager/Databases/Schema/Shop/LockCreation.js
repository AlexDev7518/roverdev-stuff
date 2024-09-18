const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Channel: {
          type: String, 
          default: null
     },
     LockCreationTime: {
         type: String, 
         default: null
     }
})

const LockCreation = Mongoose.model('LockCreation', Rack)

module.exports = LockCreation