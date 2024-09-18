const Enmap = require("enmap");
const invites  = new Enmap({ 
  name: "Invites",
  dataDir: "./Main-Bot/Database/Storage/Invites",
  fetchAll: false,
  autoFetch: true,
});



module.exports = {
      invites,
      
}