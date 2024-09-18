const mongoose = require("mongoose");
const Model = mongoose.Schema

const userSchema = new Model({
      GuildID: { type: String, default: "" },
      DefaultSettings: {
             type: Map,
             default: {
                   Prefix: "r?",
                   Language: "English",
           }
      },
      TicketSystem: {
             type: Map,
             default: {
              "Ticket Logs": "",
              "Ticket Channel": "",
              "Ticket Cat": "",
              "Tickets Cat": "",
            
              "Open Tickets": [],
              "Supporters": []
             }
      }
});

module.exports = mongoose.model("Guilds", userSchema);