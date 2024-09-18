const mongoose = require("mongoose");
const Model = mongoose.Schema

const Data = new Model({
  GuildID: { type: String, default: "n/a" },
  TicketSetups: { type: Array, default: [] },
  OpenTickets: {  type: Array, default: []  },
});

const TicketSystem = mongoose.model('TicketSystem', Data)

module.exports = TicketSystem