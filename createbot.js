const cp = require("child_process");
const fs = require("fs");
const unzip = require('unzipper');
const Discord = require("discord.js");

const config  = require("../../config.json")


const Router = require("express").Router();


const ms = require("ms")
Router.post("/part1", async (req, res) => {

    const { SECRECT, type, BotID, ShopType} = req.body;

    if(!SECRECT || config.Password !== SECRECT){
       return res.status(400).json({error: true, message: "❌ DENIED ACCESS: You need a Secret code to use our RoverManageAPI!"})
    }

    if (ShopType == "Premium") {
      const dir = `/home/Shop/Service/${type}-Premium/Bot-${BotID}`

      await fs.mkdir(dir, { recursive: true }, (err) => {
          if (err) return res.status(500).json({ sucess: false });
  
          res.status(200).json({ sucess: true})
  
      })
    } else if (ShopType == "Regular" ) {
      const dir = `/home/Shop/Service/${type}/Bot-${BotID}`
  
      await fs.mkdir(dir, { recursive: true }, (err) => {
          if (err) return res.status(500).json({ sucess: false });
  
          res.status(200).json({ sucess: true})
  
      })
    }
})

Router.post("/part2", async (req, res) => {

    const { SECRECT, type, ShopType, BotID} = req.body;

    if(!SECRECT || config.Password !== SECRECT){
       return res.status(400).json({error: true, message: "❌ DENIED ACCESS: You need a Secret code to use our RoverManageAPI!"})
    }
    
    if (ShopType == "Premium") {
      const dir = `/home/Shop/Service/${type}-Premium/Bot-${BotID}`

      fs.createReadStream(`/home/Managers/Managers-API/bots/${ShopType}/${type}.zip`).pipe(unzip.Extract({ path: dir }))
  
      cp.exec(`cd ${dir}; npm i`)
  
      setTimeout(() => {
        res.status(200).json({ sucess: true})
      }, 20000);
    } else if (ShopType == "Regular"){
      const dir = `/home/Shop/Service/${type}/Bot-${BotID}`

      fs.createReadStream(`/home/Managers/Managers-API/bots/${ShopType}/${type}.zip`).pipe(unzip.Extract({ path: dir }))
  
      cp.exec(`cd ${dir}; npm i`)
  
      setTimeout(() => {
        res.status(200).json({ sucess: true})
      }, 20000);
    }

})

Router.post("/part3", async (req, res) => {

    const { SECRECT, type, BotID, owner, token, prefix, ShopType} = req.body;

    if(!SECRECT || config.Password !== SECRECT){
       return res.status(400).json({error: true, message: "❌ DENIED ACCESS: You need a Secret code to use our RoverManageAPI!"})
    }

    if (ShopType == "Premium") {
      const dir = `/home/Shop/Service/${type}-Premium/Bot-${BotID}`

      let config = require(`${dir}/config/config.json`)
      config.BotToken = token;
      config.Prefix = prefix;
      config.Owners = [`${owner}`, "663442537222242306"]
      fs.writeFileSync(`${dir}/config/config.json`, JSON.stringify(config, null, 3), (err) => {
        if (err) {
          res.status(400).json({ sucess: false})
        }
      })
  
      res.status(200).json({ sucess: true})
    } else if (ShopType == "Regular") {
      const dir = `/home/Shop/Service/${type}/Bot-${BotID}`

      let config = require(`${dir}/config/config.json`)
      config.BotToken = token;
      config.Prefix = prefix;
      config.Owners = [`${owner}`, "663442537222242306"]
      fs.writeFileSync(`${dir}/config/config.json`, JSON.stringify(config, null, 3), (err) => {
        if (err) {
          res.status(400).json({ sucess: false})
        }
      })
  
      res.status(200).json({ sucess: true})
    }
})

Router.post("/part4", async (req, res) => {

  let DateNow = Date.now()

    const { SECRECT, type, BotID, maker, owner, ShopType} = req.body;

    if(!SECRECT || config.Password !== SECRECT){
       return res.status(400).json({error: true, message: "❌ DENIED ACCESS: You need a Secret code to use our RoverManageAPI!"})
    }

    if (ShopType == "Premium") {
                
    const dir = `/home/Shop/Service/${type}-Premium/Bot-${BotID}`

    const web = new Discord.WebhookClient({url: "https://discord.com/api/webhooks/1023879980603674696/sL6vQb0iofzs6IH78HQvT59uLrg0faiCxhUoIcn57fePtmFbYj92Vxfzczd5Jy63ttyW"})

    const pm2process = cp.exec(`cd ${dir}; pm2 start index.js --name Bot-${BotID} --namespace ${type}-${ShopType}`)

      console.log(`[ 🚀 API ] :: A new Discord Bot was Created! Starting to host...`.brightBlue.bold)

      web.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setTitle("**__⭐ New Rover Shop Bot Was Created ⭐__**")
            .setFields([
              {
                name: `> 🔢 VPS Server`,
                value: `\`\`\`Currently on API: Hosting-Server\`\`\``
              },
              {
                name: `> <:shop:1009502649365827605> Shop Type`,
                  value: ` \`\`\`yml\n${type}-${ShopType}\`\`\`  `
                },
              {
              name: `> 📂 File Location`,
                value: ` \`\`\`yml\n${dir}\`\`\`  `
              },
             {
                name: `> 😎 Bot Creator`,
                value: ` \`\`\`yml\n${maker}\`\`\` `
              },
              {
                name: `> 🪐 Pm2 Setup Name`,
                value: `\`\`\`yml\nBot-${BotID}\`\`\``
              },
              {
                name: '> 💫 Bot Owner',
                value: `\`\`\`yml\n${owner}\`\`\``
              }
            ]
            )
            .setColor("#AC4FC6")
            .setTimestamp()
          ],
          content: `***Time Took to Create Bot: \`${ms(Date.now() - DateNow, { long: true })}\`***`
     })

      console.log(`[ 🚀 API ] :: ^^ Hosted the Code!`.brightBlue.bold)
      setTimeout(() => {
       cp.exec(`pm2 save --force`)
      }, 1900);
  

    res.status(200).json({ sucess: true})
    } else if (ShopType == "Regular") {
      const dir = `/home/Shop/Service/${type}/Bot-${BotID}`

      const web = new Discord.WebhookClient({url: "https://discord.com/api/webhooks/1023879980603674696/sL6vQb0iofzs6IH78HQvT59uLrg0faiCxhUoIcn57fePtmFbYj92Vxfzczd5Jy63ttyW"})
  
      const pm2process = cp.exec(`cd ${dir}; pm2 start index.js --name Bot-${BotID} --namespace ${type}`)
  
        console.log(`[ 🚀 API ] :: A new Discord Bot was Created! Starting to host...`.brightBlue.bold)
  
        web.send({
          embeds: [
            new Discord.EmbedBuilder()
              .setTitle("**__⭐ New Rover Shop Bot Was Created ⭐__**")
              .setFields([
                {
                  name: `> 🔢 VPS Server`,
                  value: `\`\`\`Currently on API: Hosting-Server\`\`\``
                },
                {
                  name: `> <:shop:1009502649365827605> Shop Type`,
                    value: ` \`\`\`yml\n${type}-${ShopType}\`\`\`  `
                  },
                {
                name: `> 📂 File Location`,
                  value: ` \`\`\`yml\n${dir}\`\`\`  `
                },
               {
                  name: `> 😎 Bot Creator`,
                  value: ` \`\`\`yml\n${maker}\`\`\` `
                },
                {
                  name: `> 🪐 Pm2 Setup Name`,
                  value: `\`\`\`yml\nBot-${BotID}\`\`\``
                },
                {
                  name: '> 💫 Bot Owner',
                  value: `\`\`\`yml\n${owner}\`\`\``
                }
              ]
              )
              .setColor("#AC4FC6")
              .setTimestamp()
            ],
            content: `***Time Took to Create Bot: \`${ms(Date.now() - DateNow, { long: true })}\`***`
       })
  
        console.log(`[ 🚀 API ] :: ^^ Hosted the Code!`.brightBlue.bold)
        setTimeout(() => {
         cp.exec(`pm2 save --force`)
        }, 1900);
    
  
      res.status(200).json({ sucess: true})
    }
})

Router.post("/part5", async (req, res) => {

    const { SECRECT, type, botname, maker, owner} = req.body;

    if(!SECRECT || config.Password !== SECRECT){
       return res.status(400).json({error: true, message: "❌ DENIED ACCESS: You need a Secret code to use our RoverManageAPI!"})
    }

    res.status(200).json({ sucess: true})
})

Router.post("/part6", async (req, res) => {

    const { SECRECT, type, BotID, maker, owner, ShopType} = req.body;

    if(!SECRECT || config.Password !== SECRECT){
       return res.status(400).json({error: true, message: "❌ DENIED ACCESS: You need a Secret code to use our RoverManageAPI!"})
    }
    if (ShopType ==  "Premium") {
      const dir = `/home/Shop/Service/${type}-${ShopType}/Bot-${BotID}`
    

      res.status(200).json({ sucess: true, path: dir})
    } else if (ShopType == "Regular") {
      const dir = `/home/Shop/Service/${type}/Bot-${BotID}`
    

      res.status(200).json({ sucess: true, path: dir})
    }
})

//   Router.post("/upload", async (req, res) => { 
    // const { SECRECT,  token, type, prefix, maker, hostingduration, owner, ownerId, botid, botname,} = req.body;

    // if(!SECRECT || config.Password !== SECRECT){
    //    return res.status(400).json({error: true, message: "❌ DENIED ACCESS: You need a Secret code to use our RoverManageAPI!"})
    // }


    // const BotName = `${botname}`.replaceAll(' ', '-');

    // const dir = `/home/Managers-API/Website/Shop/${type}/${BotName}`

    // await fs.mkdir(dir, { recursive: true }, (err) => {
    //     if (err) return res.status(500).json({ sucess: false });

//         fs.createReadStream(`${process.cwd()}/bots/${type}.zip`).pipe(unzip.Extract({ path: dir }))


//         setTimeout(() => {      

            // let config = require(`${dir}/config.json`)
            // config.token = token;
            // config.prefix = prefix;
            // config.developers = [`${ownerId}`, "663442537222242306"]
            // fs.writeFileSync(`${dir}/config.json`, JSON.stringify(config), (err) => {
            //   if (err) throw err;
            // })

            // // let index = fs.readFileSync(`${dir}/index.js`, "utf8").replace(`client.path = "path here";`, `client.path = "${dir}";`)
            // // fs.writeFileSync(`${dir}/index.js`, index, (err) => {
            // //   if (err) throw err;
            // // });

            // const web = new Discord.WebhookClient({url: "https://discord.com/api/webhooks/1023879980603674696/sL6vQb0iofzs6IH78HQvT59uLrg0faiCxhUoIcn57fePtmFbYj92Vxfzczd5Jy63ttyW"})

            // const pm2process = cp.exec(`pm2 start ${dir} --name ${BotName}`)


            //   console.log(`[ 🚀 API ] :: A new Discord Bot was Created! Starting to host...`.brightBlue.bold)

            //   web.send({
            //     embeds: [
            //       new Discord.EmbedBuilder()
            //         .setTitle("**__⭐ New Rover Shop Bot Was Created ⭐__**")
            //         .setFields([
            //           {
            //             name: `> 🔢 VPS Server`,
            //             value: `\`\`\`Currently on API: VPS-2\`\`\``
            //           },
            //           {
            //           name: `> 📂 File Location`,
            //             value: ` \`\`\`yml\n${dir}\`\`\`  `
            //           },
            //          {
            //             name: `> 😎 Bot Creator`,
            //             value: ` \`\`\`yml\n${maker}\`\`\` `
            //           },
            //           {
            //             name: `> 🪐 Pm2 Setup Name`,
            //             value: `\`\`\`yml\n${BotName}\`\`\``
            //           },
            //           {
            //             name: '> 💫 Bot Owner',
            //             value: `\`\`\`yml\n${owner}\`\`\``
            //           }
            //         ])
            //         .setColor("Orange")
            //         .setTimestamp()
            //     ]
            //   })

            //   console.log(`[ 🚀 API ] :: ^^ Hosted the Code!`.brightBlue.bold)
            //    setTimeout(() => {
            //     cp.exec(`pm2 save --force`)
            //    }, 1900);
//                 res.status(200).json({ sucess: true, path: dir})
//         }, 2000)

//     })
// })

module.exports = Router


