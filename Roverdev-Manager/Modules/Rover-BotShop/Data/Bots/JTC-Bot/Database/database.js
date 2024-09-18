const Enmap = require("enmap");
module.exports = async client => {
  client.settings = new Enmap({ 
    name: "settings",
    dataDir: "./Database/Storage/JtcSystem",
    fetchAll: false,
    autoFetch: true,
  });
}