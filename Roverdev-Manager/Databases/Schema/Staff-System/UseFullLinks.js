const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     MessageId: {
         type: String,
         default: null
     }
})


const UseFullLinks = Mongoose.model('UseFullLinks', Rack)

module.exports = UseFullLinks