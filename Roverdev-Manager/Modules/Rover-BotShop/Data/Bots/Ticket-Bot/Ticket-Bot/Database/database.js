const Enmap = require("enmap");
module.exports = async client => {
    client.TicketSystem = new Enmap({ 
      name: "Storage",
      dataDir: "./Database/Storage/ticketsystem",
      fetchAll: false,
      autoFetch: true,
    });
    client.settings = new Enmap({ 
        name: "Storage",
        dataDir: "./Database/Storage/settings",
        fetchAll: false,
        autoFetch: true,
      });
}