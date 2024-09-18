const cp = require("child_process");
const fs = require("fs");
const fs_Exra = require('fs-extra')
const unzip = require('unzipper');
const Discord = require("discord.js");

const config  = require("../../config.json")


const Router = require("express").Router();

Router.post("/update", async (req, res)=> {
  fs.readdirSync("/home/Shop/Service/Ticket-Bot").forEach(name => {
         // Commands Folder..

             cp.exec(`rm -rf /home/Shop/Service/Ticket-Bot/${name}/Command`)
             cp.exec(`cp -r /home/Managers/Managers-API/Template/Ticket-Bot-Update/Command /home/Shop/Service/Ticket-Bot/${name}/`)

             setTimeout(() => {
              cp.exec(`cp -r /home/Managers/Managers-API/Template/Ticket-Bot-Update/Event /home/Shop/Service/Ticket-Bot/${name}/`)
              setTimeout(() => {
                cp.exec(`cp -r /home/Managers/Managers-API/Template/Ticket-Bot-Update/Handler /home/Shop/Service/Ticket-Bot/${name}/`)
              }, 500);
             }, 500);
  })

})

Router.post("/shutdown", async (req, res) => {
  const { SECRECT, owner, BotID } = req.body;

  if(!SECRECT || config.Password !== SECRECT){
    return res.status(400).json({error: true, message: "❌ DENIED ACCESS: You need a Secret code to use our RoverManageAPI!"})
 }

   cp.exec(`pm2 stop Bot-${BotID}`)

   cp.exec(`pm2 save --force`)

   console.log(`[ 🚀 API ] :: Sucessfully Stoped the Bot!`.brightBlue.bold)

   res.status(200).json({ sucess: true})
})

Router.post("/start", async (req, res) => {

  const { SECRECT, owner, BotID } = req.body;

  if(!SECRECT || config.Password !== SECRECT){
    return res.status(400).json({error: true, message: "❌ DENIED ACCESS: You need a Secret code to use our RoverManageAPI!"})
 }

   setTimeout(() => {
    cp.exec(`pm2 start Bot-${BotID}`)

    cp.exec(`pm2 save --force`)

    console.log(`[ 🚀 API ] :: Sucessfully Started the Bot!`.brightBlue.bold)

    res.status(200).json({ sucess: true})
   }, 1900);
  })

  Router.post("/delete", async (req, res) => {

    const { SECRECT, owner, BotID, BotPath, BotType} = req.body;
  
    if(!SECRECT || config.Password !== SECRECT){
      return res.status(400).json({error: true, message: "❌ DENIED ACCESS: You need a Secret code to use our RoverManageAPI!"})
   }
  
   const Backups = `/home/Shop/Backup/Bot-${BotID}`

   const { database } = require("../../index");

   var zipFolder = require('zip-folder');

   await fs.mkdir(`/home/Shop/Recover/`, { recursive: true }, (err) => {
    if (err) return res.status(500).json({ sucess: false });
   })


   const path = `/home/Shop/Recover/Bot-${BotID}.zip`

    zipFolder(`${BotPath}`, path, function(err) {
      if(err) {
          console.log('oh no!', err);
      } else {
          console.log('EXCELLENT');
          setTimeout(() => {
          cp.exec(`pm2 delete Bot-${BotID}`)
          cp.exec(`rm -rf ${BotPath}`)

          setTimeout(() => {
            cp.exec(`rm -rf ${Backups}`)
          }, 500);
    
          setTimeout(() => {
            cp.exec(`pm2 save --force`)
          }, 500);
    
      
          console.log(`[ 🚀 API ] :: Sucessfully Deleted the Bot!`.brightBlue.bold)
      
          res.status(200).json({ sucess: true, directory: path, HostingServer: `Hosting-Server`,})
          }, 500);
      }
     });
    })

    Router.post("/recover", async (req, res) => {

      const { SECRECT, owner,  BotID, BotPath, BotType } = req.body;

      if(!SECRECT || config.Password !== SECRECT){
        return res.status(400).json({error: true, message: "❌ DENIED ACCESS: You need a Secret code to use our RoverManageAPI!"})
     }


     const dir = `/home/Shop/Service/${type}/Bot-${BotID}`

    await fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) return res.status(500).json({ sucess: false });
        console.log(`[ 🚀 API ] :: Created: ${dir}`.brightBlue.bold)

        fs.createReadStream(BotPath).pipe(unzip.Extract({ path: dir }))

        setTimeout(() => {
          cp.exec(`pm2 start ${dir} --name Bot-${BotID} -- namespace ${type}`)

          setTimeout(() => {
            cp.exec(`pm2 save --force`)

            setTimeout(() => {
              const path = `/home/Shop/Recover/Bot-${BotID}.zip`

              cp.exec(`rm -rf ${path}`)

              console.log(`[ 🚀 API ] :: Successfully Removed ${path}`.brightBlue.bold)

            }, 500);

           }, 1900);

           console.log(`[ 🚀 API ] :: Successfully Recoverd Bot-${BotID}`.brightBlue.bold)

           const web = new Discord.WebhookClient({url: "https://discord.com/api/webhooks/1020571183294468157/VQLjcUkkzfLmQnL35F7eR89Q7DNAZxR0dutfztNlSEvwbElQgacD5p60wCZiQ3O3W7jo"})

           web.send({
            embeds: [
              new Discord.EmbedBuilder()
                .setTitle("**__⭐ <@!{Bot}> Got Succesfully Recovered⭐__**".replace("{Bot}", BotID))
                .setFields([
                  {
                    name: `> <a:hostemoji:1017081433765990480> VPS Server`,
                    value: `\`\`\`Name: Hosting-Server\`\`\``
                  },
                  {
                  name: `> 📂 File Location`,
                    value: ` \`\`\`yml\n${dir}\`\`\`  `
                  },
                ])
                .setColor("#AC4FC6")
                .setTimestamp()
            ]
          })

           res.status(200).json({ sucess: true, path: dir, HostingServer: `Hosting-Server` })

        }, 500);

    })

    })
    Router.post("/recover/delete", async (req, res) => {
      const { SECRECT,  BotID, BotType } = req.body;

      if(!SECRECT || config.Password !== SECRECT){
        return res.status(400).json({error: true, message: "❌ DENIED ACCESS: You need a Secret code to use our RoverManageAPI!"})
     }


    const path = `/home/Shop/Recover/Bot-${BotID}.zip`
    await fs.unlinkSync(path, { recursive: true }, (err) => {
      if (err) return res.status(200).json({ sucess: false });
      console.log(`[ 🚀 API ] :: Deleted: ${dir}`.brightBlue.bold)
      })

        const web = new Discord.WebhookClient({url: "https://discord.com/api/webhooks/1020571183294468157/VQLjcUkkzfLmQnL35F7eR89Q7DNAZxR0dutfztNlSEvwbElQgacD5p60wCZiQ3O3W7jo"})

        web.send({
         embeds: [
           new Discord.EmbedBuilder()
             .setTitle("**__⭐ <@!{Bot}>'s Backup Got Succesfully Deleted⭐__**".replace("{Bot}", BotID))
             .setFields([
               {
                 name: `> <a:hostemoji:1017081433765990480> VPS Server`,
                 value: `\`\`\`Name: Hosting-Server\`\`\``
               },
               {
               name: `> 📂 File Location`,
                 value: ` \`\`\`yml\n${path}\`\`\`  `
               },
             ])
             .setColor("#AC4FC6")
             .setTimestamp()
         ]
       })

        res.status(200).json({ sucess: true, path: path, HostingServer: `Hosting-Server` })

    
    })

Router.post("/stop", async (req, res) => {

  const { SECRECT, owner, BotID } = req.body;

  if(!SECRECT || config.Password !== SECRECT){
    return res.status(400).json({error: true, message: "❌ DENIED ACCESS: You need a Secret code to use our RoverManageAPI!"})
 }


   cp.exec(`pm2 stop Bot-${BotID}`)

   cp.exec(`pm2 save --force`)

   console.log(`[ 🚀 API ] :: Sucessfully Stoped the Bot!`.brightBlue.bold)

   res.status(200).json({ sucess: true})
})

Router.post("/restart", async (req, res) => {

  const { SECRECT, owner, BotID } = req.body;

  if(!SECRECT || config.Password !== SECRECT){
    return res.status(400).json({error: true, message: "❌ DENIED ACCESS: You need a Secret code to use our RoverManageAPI!"})
 }

   cp.exec(`pm2 stop Bot-${BotID}`)

   cp.exec(`pm2 save --force`)

   console.log(`[ 🚀 API ] :: Sucessfully Stoped the Bot!`.brightBlue.bold)

   res.status(200).json({ sucess: true})
})

Router.post("/status", async (req, res) => {

  const { SECRECT } = req.body;

  if(!SECRECT || config.Password !== SECRECT){
    return res.status(400).json({error: true, message: "❌ DENIED ACCESS: You need a Secret code to use our RoverManageAPI!"})
 }

   res.status(200).json({ online: true})
})

Router.post("/ping", async (req, res) => { 

  const si = require('systeminformation');
const os = require("node:os");

let uptime =  os.uptime();
let netdata = await si.networkStats();


    res.status(200).json({ Online: " 🟢 Connected", ping: `${Math.round(netdata[0].ms)}ms`, uptime: uptimer(uptime) })
})


function uptimer(seconds) {
  seconds = seconds || 0;
  seconds = Number(seconds);
  seconds = Math.abs(seconds);

  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor(seconds % (3600 * 24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);
  var parts = new Array();

  if (d > 0) {
      var dDisplay = d > 0 ? d + ' ' + (d == 1 ? "day" : "days") : "";
      parts.push(dDisplay);
  }

  if (h > 0) {
      var hDisplay = h > 0 ? h + ' ' + (h == 1 ? "hour" : "hours") : "";
      parts.push(hDisplay)
  }

  if (m > 0) {
      var mDisplay = m > 0 ? m + ' ' + (m == 1 ? "minute" : "minutes") : "";
      parts.push(mDisplay)
  }

  if (s > 0) {
      var sDisplay = s > 0 ? s + ' ' + (s == 1 ? "second" : "seconds") : "";
      parts.push(sDisplay)
  }

  return parts.join(', ', parts);
}

function formatBytes(bytes) {
if (bytes === 0) return "0 B";
const sizes = ["B", "KB", "MB", "GB", "TB"];
return `${(
    bytes / Math.pow(1024, Math.floor(Math.log(bytes) / Math.log(1024)))
).toFixed(2)} ${sizes[Math.floor(Math.log(bytes) / Math.log(1024))]}`;
}

module.exports = Router


