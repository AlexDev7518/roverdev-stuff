const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     TotalRacks: {
          type: Array,
          default: null
     },
     DeletedRacks: {
          type: Array,
          default: null
     },
     UsedRacks: {
          type: Array,
          default: null
     },
     ExtraStorage: {
           type: String,
           default: "0mb"
     },
     UsedExtraStorage: {
          type: String,
          default: "0mb"
     },
     ExtraRam: {
          type: String,
          default: "0mb"
    },
     UsedExtraRam: {
        type: String,
        default: "0mb"
   },
})

const Racks = Mongoose.model('Racks', Rack)

module.exports = Racks