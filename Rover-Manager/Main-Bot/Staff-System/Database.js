module.exports = async client => {
    
    const Enmap = require("enmap");

    client.StaffRanking = new Enmap({ 
        name: "Storage",
        dataDir: "./Main-Bot/Staff-System/Data",
        fetchAll: false,
        autoFetch: true,
      });
}