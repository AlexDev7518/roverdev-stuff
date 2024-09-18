const { ActivityType, EmbedBuilder } = require("discord.js");

var {
    Manager
  } = require("erela.js")

  const Spotify = require("better-erela.js-spotify").default
  const Deezer = require("erela.js-deezer")
  const Facebook = require("erela.js-facebook")
const ShopBots = require("../../Main-Bot/BotShop-System/Shop-Config/ShopBots");

module.exports = async client => {


    //   /**
    //    * @VPS_STATS
    //    */

    //    const si = require('systeminformation');
    //    const os = require("os");
    //    const pretty = require('prettysize');
    //    const moment = require("moment");
    //    require("moment-duration-format");

    //    let netdata = await si.networkStats();
    //    let memdata = await si.mem();
    //    let diskdata = await si.fsSize();
    //    let osdata = await si.osInfo();

       
    // let cl = await si.currentLoad();

    //    let cpudata = await si.cpu();
    //    let uptime = await os.uptime();
       

    //    client.channels.fetch("1039211970471153705").then(async ch => {
    //         /**
    //          * @FIND_MESSAGE_AND_DELETE
    //          */
    //          const LastMessage = (await ch.messages.fetch({limit: 10})).filter(m => m.author.id === client.user.id).last()
    //          try {
    //             LastMessage.delete().catch((e) => {})
    //          } catch (errror) {
    //               console.log(`No Message`)
    //          }
    //    })

    //    setTimeout(() => {
    //     client.channels.cache.get("1039211970471153705").send({ 
    //       embeds: [
    //            new EmbedBuilder()
    //            .setTitle(`Grabbing VPS Status...`)
    //       ]
    // }).then(async (msg) => {
    //           client.channels.cache.get("1039211970471153705").messages.fetch(msg.id).then(async msg1 => {
    //             setInterval(() => {
    //               msg1.edit({
    //                 embeds: [
    //                       new EmbedBuilder()
    //                       .setAuthor({ name: `Roverdev Main-Server Status | ${msg.guild.name}`, iconURL: client.user.displayAvatarURL() })
    //                       .setColor("#3dbeff")
    //                       .setFooter({ text: `Update at ` })
    //                       .setImage("https://cdn.discordapp.com/attachments/1023872508597903400/1025954944257359923/SGN_09_28_2022_1664402118111.png")
    //                       .setTimestamp(Date.now())
    //                       .addFields([
    //                          { name: "<:cpu:1036855164189036625> **Main Server CPU**", value: `\`\`\`nim\nCpu: ${cpudata.manufacturer + " " + cpudata.brand}\nLoad: ${cl.currentLoad.toFixed(2)}%\nCores: ${cpudata.cores}\nPlatform: ${osdata.platform}\`\`\`` },
    //                          { name: "<:Ram:1036854877877452860> **Main Server Ram**", value: `\`\`\`nim\nAvailable: ${pretty(memdata.total)}\nMemory Used: ${pretty(memdata.active)}\`\`\`` },
    //                          { name: "<:storage:1039209545555251263> **Main Server Storage**", value: `\`\`\`nim\nDisk Used: ${pretty(diskdata[0].used)}\nDisk Total: ${pretty(diskdata[0].size)}\`\`\`` },
    //                          { name: "<a:ping:1015698474857144341> **Main Server Network**", value: `\`\`\`nim\nPing: ${Math.round(netdata[0].ms)}ms\nUp: ${pretty(netdata[0].tx_sec)}/s\nDown: ${pretty(netdata[0].rx_sec)}/s\n\nTotal Up: ${pretty(netdata[0].tx_bytes)}\nTotal Down: ${pretty(netdata[0].rx_bytes)}\`\`\`` },
    //                          { name: "<a:ping_2:1014938457220579459> **Discord API websocket ping**", value: `\`\`\`nim\n${Math.round(client.ws.ping)}ms\`\`\`` },
    //                          { name: "<a:Uptime:1015782890098917446> **Uptime**", value: `\`\`\`nim\n${uptimer(uptime)}\`\`\`` }
    //                       ])
    //                 ],
    //                 content: ``
    //          })
    //             }, 10000);
    //           })
    // })
    //    }, 1900);

    //   function uptimer(seconds) {
    //     seconds = seconds || 0;
    //     seconds = Number(seconds);
    //     seconds = Math.abs(seconds);
    
    //     var d = Math.floor(seconds / (3600 * 24));
    //     var h = Math.floor(seconds % (3600 * 24) / 3600);
    //     var m = Math.floor(seconds % 3600 / 60);
    //     var s = Math.floor(seconds % 60);
    //     var parts = new Array();
    
    //     if (d > 0) {
    //         var dDisplay = d > 0 ? d + ' ' + (d == 1 ? "day" : "days") : "";
    //         parts.push(dDisplay);
    //     }
    
    //     if (h > 0) {
    //         var hDisplay = h > 0 ? h + ' ' + (h == 1 ? "hour" : "hours") : "";
    //         parts.push(hDisplay)
    //     }
    
    //     if (m > 0) {
    //         var mDisplay = m > 0 ? m + ' ' + (m == 1 ? "minute" : "minutes") : "";
    //         parts.push(mDisplay)
    //     }
    
    //     if (s > 0) {
    //         var sDisplay = s > 0 ? s + ' ' + (s == 1 ? "second" : "seconds") : "";
    //         parts.push(sDisplay)
    //     }
    
    //     return parts.join(', ', parts);
    // }

    client.manager = new Manager({
        nodes: [
            {
                host: "node1.roverdev.xyz",
                password: "discord.gg/roverdev",
                port: 2334,
                secure: false,
            },
          ],
        plugins: [
          new Deezer(),
          new Facebook(),
        ],
        send(id, payload) {
          var guild = client.guilds.cache.get(id);
          if (guild) guild.shard.send(payload);
        },
      })  .on("nodeConnect", node => console.log(`Node Roverdev connected`))
      .on("nodeError", (node, error) => console.log(`Node Roverdev had an error: ${error.message}`))
      .on("trackStart", (player, track) => {
        client.channels.cache
          .get(player.textChannel)
          .send(`Now playing: ${track.title}`);
      })
      .on("queueEnd", (player) => {
        client.channels.cache
          .get(player.textChannel)
          .send("Queue has ended.");
    
        player.destroy();
      })

      client.manager.init(client.user.id);

    require("../../Main-Bot/Database/Database")(client)

    const axios = require("axios");

    client.settings.ensure(client.user.id, {
           TotalBots: {
                     "Ticket-Bot": 0,
                     "Ticket-Bot-Premium": 0,
                     "JTC-Bot": 0,
                     "JTC-Bot-Premium": 0,
           }
    })

    var ShopServer1 = ``;

    setInterval(() => {
        axios({
            method: 'post',
            url: `https://shopserver1.roverdev.xyz/api/ping`,
          }).then((res) => {
           const resjson = res.data;
           ShopServer1= `\nStatus: 🟢 Connected\nPing: ${resjson.ping}\nUptime: ${resjson.uptime}`
           }).catch((e) => {
                 ShopServer1= "🔴 Offline"
           })

        client.channels.fetch('1040969976863002624').then((ch) => {
            ch.messages.fetch('1065471579707932732').then((msg) => {
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: `${msg.guild.name} | VPS Server Status`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                    .setTitle("<a:hostemoji:1017081433765990480> VPS Current Status")
                    .setDescription(`
\`\`\`yml
VPS Shop-Server: ${ShopServer1}
\`\`\`
`)
.setColor("#3dbeff")
msg.edit({embeds: [embed], content: `  `})
            })
        })
    }, 10000);
         
        setInterval(() => {
            client.channels.fetch('1040969976863002624').then((ch) => {
                ch.messages.fetch('1065471773648375888').then((msg) => {
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `${msg.guild.name} | Bot Creation Bots`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                        .setTitle("🤖 All available Bots to Create in Bot Shop")
                        .setDescription(ShopBots.ShopBots.length > 0 ? ShopBots.ShopBots.map(m => `\`\`\`yml\nName: ${m.label}\nDescription: ${m.description}\nTotal Bots: ${client.settings.get(client.user.id, `TotalBots.${m.value}`)}\`\`\``).join("\n") + "\n" + "***Premium Shop Bots below***" + "\n" + ShopBots.PremiumShopBots.map(m => `\`\`\`yml\nName: ${m.label}\nDescription: ${m.description}\nTotal Bots: ${client.settings.get(client.user.id, `TotalBots.${m.value}`)}\`\`\``).join("\n") : `\`\`\`yml\nNo Shop Bots.\`\`\``)
                        .setColor("#3dbeff")
                        
                        msg.edit({embeds: [embed], content: `  `})
                })
            })
            client.channels.fetch('1040969976863002624').then((ch) => {
                ch.messages.fetch('1065471822650413206').then((msg) => {
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `${msg.guild.name} | Bot Creation Bots`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                        .setTitle("<a:hostemoji:1017081433765990480> All Available Hosting Durations")
                        .setDescription(ShopBots.HostingDuration.length > 1 ? ShopBots.HostingDuration.map(m => `\`\`\`yml\nName: ${m.label}\nDescription: ${m.description}\`\`\``).join("\n") : `\`\`\`yml\nNo Hosting Durations.\`\`\``)
                        .setColor("#3dbeff")
                        
                        msg.edit({embeds: [embed], content: `  `})
                })
            })
            client.channels.fetch('1040969976863002624').then((ch) => {
                ch.messages.fetch('1065471841025654935').then((msg) => {
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `${msg.guild.name} | Bot Creation Bots`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                        .setTitle("<a:Money:1014937062992007168> All Available Payment Types.")
                        .setDescription(ShopBots.PaymentTypes.length > 1 ? ShopBots.PaymentTypes.map(m => `\`\`\`yml\nName: ${m.label}\nDescription: ${m.description}\`\`\``).join("\n") : `\`\`\`yml\nNo Payment Types.\`\`\``)
                        .setColor("#3dbeff")
                        
                        msg.edit({embeds: [embed], content: `  `})
                })
            })
        }, 20000);


    if (client.config['Testing']) {
        client.user.setPresence({
            status: "dnd",
            activities: [{
                name: `Bot Testing Active!`,
                type: ActivityType.Playing,
                url: "https://discord.gg/roverdev"
            }]
        })
    } else  if (!client.config['Testing']) {


    client.user.setPresence({
        status: "dnd",
        activities: [{
            name: `Users: ${client.users.cache.size} | #Roadto5k`,
            type: ActivityType.Playing,
            url: "https://discord.gg/roverdev"
        }]
    })
    console.log(`Bot is Ready.`)
    setInterval(() => {
        changeStatus(client)
    }, 10000)
}  
};
function changeStatus(client) {
    const statuses = [
        "Best Bots | .gg/roverdev",
        "Roverdev 4 Life",
        "Free Bots | Roverdev",
        "Best System | Made by Roverdev",
        "Watching Rover Shop Bots",
        `Users: ${client.users.cache.size} | #Roadto5k`
    ]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    //client.user.setActivity(status, { type: "PLAYING",url: "https://www.twitch.tv/mr_deadpool2021"})
        client.user.setPresence({
            status: "dnd",
            activities: [{
                name: status,
                type: ActivityType.Playing,
                url: "https://discord.gg/roverdev"
            }]
        })
        
};