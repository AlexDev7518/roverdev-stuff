const Mongoose = require("mongoose")
const Schema = Mongoose.Schema

const Rack = new Schema({
      Guild: {
         type: String,
         default: null,
      },
      TotalTickets: {
        type: Number,
        default: null,
      },
      ClosedTickets: {
        type: Array,
        default: [], 
      },
      TranscriptNumber: {
        type: Number,
        default: 0, 
      }
})

const GuildStats = Mongoose.model('GuildStats', Rack)

module.exports = GuildStats