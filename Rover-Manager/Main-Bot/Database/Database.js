const child = require("child_process")
const path = require('path');

module.exports = async client => {
  const Enmap = require("enmap");
    if (client.config[`Database`]) {
      const fs = require("fs")
      if (!fs.existsSync(`./Main-Bot/Database/Storage`)) {
        require("fs").mkdir(`./Main-Bot/Database/Storage`, (err) => {
          if (client.config[`MoveDatabase`]) {
           child.exec(`cp -r /home/roverdev/Rover-Manager/Main-Bot/Database/BackupData/.  /home/roverdev/Rover-Manager/Main-Bot/Database/Storage/`, (err, res) => {
             if (err) return console.log(err)
                })
                console.log(`Succesfully Moved the Database`)
          }
   })
      }

    client.settings = new Enmap({ 
      name: "Storage",
      dataDir: "./Main-Bot/Database/Storage/settings",
      fetchAll: false,
      autoFetch: true,
    });

    client.Blacklist = new Enmap({ 
      name: "Blacklist",
      dataDir: "./Main-Bot/Database/Storage/Blacklist",
      fetchAll: false,
      autoFetch: true,
    });

    client.Cooldowns = new Enmap({
          name: "Cooldowns",
          dataDir: "./Main-Bot/Database/Storage/Cooldowns",
          fetchAll: false,
          autoFetch: true,
    })

    client.BackupTicket = new Enmap({ 
      name: "Storage",
      dataDir: "./Main-Bot/Database/Storage/BackupTicket",
      fetchAll: false,
      autoFetch: true,
    });

    client.RecoverBotHost = new Enmap({ 
      name: "Storage",
      dataDir: "./Main-Bot/Database/Storage/RecoverBotHost",
      fetchAll: false,
      autoFetch: true,
    });

    client.Payment = new Enmap({
        name: "Payment",
        dataDir: "./Main-Bot/Database/Storage/payment",
        fetchAll: false,
        autoFetch: true,
    })

    client.BotPayment = new Enmap({
      name: "Payment",
      dataDir: "./Main-Bot/Database/Storage/BotPayment",
      fetchAll: false,
      autoFetch: true,
  })


    client.Createbot = new Enmap({ 
      name: "Createbot",
      dataDir: "./Main-Bot/Database/Storage/CreateBot",
      fetchAll: false,
      autoFetch: true,
    });

    client.Bots = new Enmap({ 
      name: "Createbot",
      dataDir: "./Main-Bot/Database/Storage/Bots",
      fetchAll: false,
      autoFetch: true,
    });


    client.Ranking = new Enmap({ 
      name: "Ranking",
      dataDir: "./Main-Bot/Database/Storage/Ranking",
      fetchAll: false,
      autoFetch: true,
    });

    setTimeout(() => {
       if (client.config[`BackupDatabase`]) {
        child.exec(`cp -r  /home/roverdev/Rover-Manager/Main-Bot/Database/Storage/. /home/roverdev/Rover-Manager/Main-Bot/Database/BackupData/ `, (err, res) => {
          if (err) return console.log(err)
             })
       }
       console.log(`Succesfully Copied the Database!`)
    }, 500);
} else if (!client.config[`Database`]) {
        const fs = require("fs")
        if (fs.existsSync(`./Main-Bot/Database/Storage`)) {
          fs.readdir(`./Main-Bot/Database/Storage`, (err, files) => {
            if (err) throw err;
             if (files.length < 1) {
              fs.rmdir("./Main-Bot/Database/Storage", { force: true}, (err) => {
                if (err) {
                   console.log("error occurred in deleting directory", err);
                   return process.exit()
                  }
                  console.log(`Database Disabled So No Folder`)
              })
             } else if (files.length > 0) {
              for (const file of files) {
                fs.unlink(path.join(`./Main-Bot/Database/Storage`, file), err => {
                  if (err) throw err;
                })
              }
              fs.rmdir("./Main-Bot/Database/Storage", { force: true}, (err) => {
                if (err) {
                   console.log("error occurred in deleting directory", err);
                   return process.exit()
                  }
                  console.log(`Database Disabled So No Folder`)
              })
             }
          })
        }
}
}
