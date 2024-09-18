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
});

module.exports = mongoose.model("Guilds", userSchema);