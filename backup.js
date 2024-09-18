const cp = require("child_process");
const fs = require("fs");
const unzip = require('unzipper');
const Discord = require("discord.js");
const path = require("path")
const ms = require("ms")

const config  = require("../../config.json")


const Router = require("express").Router();

  Router.post("/create", async (req, res) => { 
    let dateNow = Date.now();
    const { SECRECT, BotID, BotPath, BotType} = req.body;

    if(!SECRECT || config.Password !== SECRECT){
        return res.status(400).json({error: true, message: "❌ DENIED ACCESS: You need a Secret code to use our RoverManageAPI!"})
     }

     function makeid() {
        var text = "";
        var possible = "01234567891011121314151617181920";
      
        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }

      const code = makeid()

     const { database } = require("../../index");
  
     var zipFolder = require('zip-folder');

     const dir = `/home/Shop/Backup/Bot-${BotID}`
     
        await fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) return res.status(500).json({ sucess: false });
        })

     setTimeout(() => {
        const path = `/home/Shop/Backup/Bot-${BotID}/${code}.zip`
  
      zipFolder(`${BotPath}`, path, function(err) {
        if(err) {
            console.log('oh no!', err);
        } else {
            console.log(`[ 🚀 API ] :: Sucessfully Created a Backup: ${code}!`.brightBlue.bold)    

            const web = new Discord.WebhookClient({url: "https://discord.com/api/webhooks/1023879980603674696/sL6vQb0iofzs6IH78HQvT59uLrg0faiCxhUoIcn57fePtmFbYj92Vxfzczd5Jy63ttyW"})

            web.send({
             embeds: [
               new Discord.EmbedBuilder()
                 .setTitle("**__⭐ <@!{Bot}> Succesfully Created a Backup⭐__**".replace("{Bot}", BotID))
                 .setFields([
                   {
                     name: `> <a:hostemoji:1017081433765990480> VPS Server`,
                     value: `\`\`\`Name: Hosting-Server\`\`\``
                   },
                   {
                   name: `> 📂 File Location`,
                     value: ` \`\`\`yml\n${path}\`\`\`  `
                   },
                   {
                    name: `> <:BACKUP:1015239765811003392> Backup`,
                      value: ` \`\`\`yml\n${code}\`\`\`  `
                    },
                 ])
                 .setColor("#AC4FC6")
                 .setTimestamp()
             ],
             content: `***Time Took to Create Backup: \`${ms(Date.now() - dateNow, { long: true })}\`***`
           })

            res.status(200).json({ sucess: true, HostingServer: `Hosting-Server`, BackupPath: path, Backupcode: code})
        }
       });
     }, 1900);
  })
  Router.post("/delete", async (req, res) => { 
    let dateNow = Date.now();
    const { SECRECT, BotID, BotPath, BotType, BackupCode} = req.body;

    if(!SECRECT || config.Password !== SECRECT){
        return res.status(400).json({error: true, message: "❌ DENIED ACCESS: You need a Secret code to use our RoverManageAPI!"})
     } 

   
      var zipFolder = require('zip-folder');
 
      const path = `/home/Shop/Backup/Bot-${BotID}/${BackupCode}.zip`
      
         await fs.unlinkSync(path, { recursive: true }, (err) => {
             if (err) return res.status(500).json({ sucess: false });
         })

         const web = new Discord.WebhookClient({url: "https://discord.com/api/webhooks/1023879980603674696/sL6vQb0iofzs6IH78HQvT59uLrg0faiCxhUoIcn57fePtmFbYj92Vxfzczd5Jy63ttyW"})

         web.send({
          embeds: [
            new Discord.EmbedBuilder()
              .setTitle("**__⭐ <@!{Bot}> Succesfully Deleted a Backup⭐__**".replace("{Bot}", BotID))
              .setFields([
                {
                  name: `> <a:hostemoji:1017081433765990480> VPS Server`,
                  value: `\`\`\`Name: Hosting-Server\`\`\``
                },
                {
                name: `> 📂 File Location`,
                  value: ` \`\`\`yml\n${path}\`\`\`  `
                },
                {
                 name: `> <:BACKUP:1015239765811003392> Backup`,
                   value: ` \`\`\`yml\n${BackupCode}\`\`\`  `
                 },
              ])
              .setColor("#AC4FC6")
              .setTimestamp()
            ],
            content: `***Time Took to Delete Backup: \`${ms(Date.now() - dateNow, { long: true })}\`***`
        })


         res.status(200).json({ sucess: true, HostingServer: `Hosting-Server`, BackupPath: path})

  })
  Router.post("/load", async (req, res) => { 
    let dateNow = Date.now();
    const { SECRECT, BotID, BotPath, BotType, BackupCode} = req.body;

    if(!SECRECT || config.Password !== SECRECT){
        return res.status(400).json({error: true, message: "❌ DENIED ACCESS: You need a Secret code to use our RoverManageAPI!"})
     }

     setTimeout(async() => {
      cp.exec(`rm -rf ${BotPath}`)

      await fs.mkdir(BotPath, { recursive: true }, (err) => {
        if (err) return res.status(500).json({ sucess: false });
       })
       
       const BotFolder = `/home/Shop/Backup/Bot-${BotID}/${BackupCode}.zip`
   
       fs.createReadStream(BotFolder).pipe(unzip.Extract({ path: BotPath }))
     
       setTimeout(() => {
         cp.exec(`pm2 restart Bot-${BotID}`)
       }, 500);
     
       res.status(200).json({ sucess: true, HostingServer: `Hosting-Server`, BackupPath: BotFolder})

       const web = new Discord.WebhookClient({url: "https://discord.com/api/webhooks/1023879980603674696/sL6vQb0iofzs6IH78HQvT59uLrg0faiCxhUoIcn57fePtmFbYj92Vxfzczd5Jy63ttyW"})

       web.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setTitle("**__⭐ <@!{Bot}> Succesfully Loaded a Backup⭐__**".replace("{Bot}", BotID))
            .setFields([
              {
                name: `> <a:hostemoji:1017081433765990480> VPS Server`,
                value: `\`\`\`Name: Hosting-Server\`\`\``
              },
              {
              name: `> 📂 Bot Location`,
                value: ` \`\`\`yml\n${BotPath}\`\`\`  `
              },
              {
                name: `> <:BACKUP:1015239765811003392> Backup Location`,
                  value: ` \`\`\`yml\n${BotFolder}\`\`\`  `
                },
              {
               name: `> <:BACKUP:1015239765811003392> Backup`,
                 value: ` \`\`\`yml\n${BackupCode}\`\`\`  `
               },
            ])
            .setColor("#AC4FC6")
            .setTimestamp()
          ],
          content: `***Time Took to Load Backup: \`${ms(Date.now() - dateNow, { long: true })}\`***`
      })

       console.log(`[ 🚀 API ] :: Sucessfully Loaded a Backup: ${BackupCode}!`.brightBlue.bold)    
     }, 5000);
  })
  Router.post("/backups", async (req, res) => { 
    const { SECRECT,  token, type, prefix, maker, hostingduration, owner, ownerId, botid, botname,} = req.body;

    if(!SECRECT || config.Password !== SECRECT){
        return res.status(400).json({error: true, message: "❌ DENIED ACCESS: You need a Secret code to use our RoverManageAPI!"})
     }
  })

module.exports = Router


