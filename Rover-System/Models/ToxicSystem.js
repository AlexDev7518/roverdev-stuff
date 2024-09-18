const mongoose = require("mongoose");
const Model = mongoose.Schema

const userSchema = new Model({
         GuildID: { type: String, default: "" },
         ToxicSystemEnabled: { type: Boolean, default: true }
});

module.exports = mongoose.model("ToxicSystem", userSchema);