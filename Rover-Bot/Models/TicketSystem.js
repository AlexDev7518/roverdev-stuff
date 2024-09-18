const mongoose = require("mongoose");
const Model = mongoose.Schema

const Data = new Model({
  GuildID: { type: String, default: "n/a" },
  TicketLogs: { type: String, default: "n/a" },
  TicketChannel: { type: String, default: "n/a" },
  TicketCat: { type: String, default: "n/a" },
  TicketsCat: { type: String, default: "n/a" },

  OpenTickets: { type: Array, default: [] },
  Supporters: { type: Array, default: [] }

});

const TicketSystem = mongoose.model('TicketSystem', Data)

module.exports = TicketSystem