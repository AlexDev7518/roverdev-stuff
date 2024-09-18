const Enmap = require("enmap");
module.exports = async client => {
    client.settings = new Enmap({ 
      name: "Storage",
      dataDir: "./Database/Storage/settings",
      fetchAll: false,
      autoFetch: true,
    });

    client.economy = new Enmap({ 
      name: "Economy",
      dataDir: "./Database/Storage/Economy",
      fetchAll: false,
      autoFetch: true,
    });

    client.Customize = new Enmap({ 
      name: "Economy",
      dataDir: "./Database/Storage/Customize",
      fetchAll: false,
      autoFetch: true,
    });
}