const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Rack = new Schema({
     Author: {
          type: String, 
          default: null
     },
     DefaultCoins: {
          type: Number, 
          default: 1000
     },
     UsedDefaultCoins: {
           type: Number,
           default: 0
     },
     TotalCoins: {
        type: Number, 
        default: 0
     },
     RankingCoins: {
          type: Number, 
          default: 0
     },
     UsedRankingCoins: {
          type: Number, 
          default: 0
     },
     InviteCoins: {
          type: Number, 
          default: 0
     },
     UsedInviteCoins: {
          type: Number, 
          default: 0
     },
     PaiedCoins: {
          type: Number, 
          default: 0
     },
     UsedPaiedCoins: {
          type: Number,
          default: 0
    },
})

const TotalCoins = Mongoose.model('TotalCoins', Rack)

module.exports = TotalCoins