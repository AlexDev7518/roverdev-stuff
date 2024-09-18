const { ActivityType, Collection, EmbedBuilder } = require("discord.js");
const Ranking = require("../../Databases/Schema/Ranking/Ranking");
const balance = require("../../Databases/Schema/RoverCoins/balance");
const TotalCoins = require("../../Databases/Schema/RoverCoins/TotalCoins");
const TotalBots = require("../../Databases/Schema/Shop/TotalBots");
const { client } = require("../../main");

module.exports = async Roverdev => {

    //   require("../../RoverAPI")
    //   require("../../StaffSystem")
    //   require("../../AntiNukeSystem")
      require("../../Databases/Mongoose")(Roverdev)

    setTimeout(() => {
        try {
             const stringlength2 = 69;
             client.logger.info(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.green, { label: "Roverdev" })
             client.logger.info(`┃ `.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.green, { label: "Roverdev" })
             client.logger.info(`┃ `.bold.green + `Bot is Online And Ready!`.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length - `Bot is Online And Ready!`.length) + "┃".bold.green, { label: "Roverdev" })
             client.logger.info(`┃ `.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.green, { label: "Roverdev" })
             client.logger.info(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.green, { label: "Roverdev" })
           } catch (error) {
                 console.log(error)
            }
   }, 1000);

   setInterval(() => {
      client.channels.fetch('1065477354178216006').then(async(ch) => {
        
          ch.messages.fetch('1067932949133148350').then(async (msg) => {
            const messageData = await balance.find()
            const messageData1 = await TotalCoins.find()

            let array = []
            messageData.forEach(m => {
                 if (m.BankCoins !== 0) {
                         array.push(m)
                 }
            })
            let array1 = []
            messageData1.forEach(m => {
                 if (m.TotalCoins !== 0) {
                         array1.push(m)
                 }
            })
            setTimeout(() => {
                let messageList1 = "No results.";
                if(messageData){
                    messageList1 = array1.map(md => {
                        return {
                            Id: md.Author,
                            Total: md.TotalCoins
                        };
                    }).sort((a, b) => b.Total - a.Total).splice(0, 20).map((user, index) => `\`${index + 1}.\` <@${user.Id}> \`${user.Total} Coins\``).join("\n");    
                }
                
                let messageList = "No results.";
                if(messageData){
                    messageList = array.map(md => {
                        return {
                            Id: md.Author,
                            Total: md.BankCoins
                        };
                    }).sort((a, b) => b.Total - a.Total).splice(0, 20).map((user, index) => `\`${index + 1}.\` <@${user.Id}> \`${user.Total} Coins\``).join("\n");    
                }
      
                let embed = new EmbedBuilder()
                .setColor("Red")
                .setFooter({text: `${msg.guild.name} Leaderboard`})
                .setDescription(`Rover Coins - Coin Leaderboard (Roverdev - 2023 System)`)
                .setThumbnail(client.user.avatarURL({dynamic: true}))
                .addFields([
                   { name: `Rover Eco Coins - Leaderboard`, value: `** **\n${messageList}` },
                   { name: `Rover Total Coins - Leaderboard`, value: `** **\n${messageList1}` }
                ])
                // let row = new ActionRowBuilder()
                // .addComponents(
                //   new ButtonBuilder()
                //   .setLabel(`My Rank`)
                //   .setCustomId(`User-Rank`)
                //   .setDisabled(false)
                //   .setStyle(ButtonStyle),
                // )
                msg.edit({embeds: [embed], content: `***> Bot Ping: ${client.ws.ping}ms | Edited: <t:${Math.floor(Date.now() / 1000)}:R> | Uptime: <t:${Math.floor(Date.now() / 1000 - client.uptime / 1000)}:R>***`})
              
            }, 1000);
          })}) 
  }, 50000);
  setInterval(() => {
      client.channels.fetch('1065477354178216006').then(async(ch) => {
        
          ch.messages.fetch('1067933062509383760').then(async (msg) => {
            const messageData = await Ranking.find()
            const messageData1 = await TotalCoins.find()
            const messageData3 = await TotalCoins.find()

            let array2 = []
            messageData1.forEach(m => {
                   if (m.InviteCoins !== 0) {
                             array2.push(m)
                   }
            })
        
            let messageList2 = "No results.";
            if(messageData1){
                messageList2 = array2.map(md => {
                    return {
                        Id: md.Author,
                        Total: md.InviteCoins
                    };
                }).sort((a, b) => b.Total - a.Total).splice(0, 10).map((user, index) => `\`${index + 1}.\` <@${user.Id}> \`${user.Total} Invite Coins\``).join("\n");    
            }

            let array1 = []
            messageData3.forEach(m => {
                 if (m.RankingCoins !== 0) {
                  array1.push(m)
                 }
            })
        
            let messageList1 = "No results.";
            if(messageData3){
                messageList1 = array1.map(md => {
                    return {
                        Id: md.Author,
                        Total: md.RankingCoins
                    };
                }).sort((a, b) => b.Total - a.Total).splice(0, 10).map((user, index) => `\`${index + 1}.\` <@${user.Id}> \`${user.Total} Ranking Coins\``).join("\n");    
            }
        
            let messageList = "No results.";
            if(messageData){
                messageList = messageData.map(md => {
                    return {
                        Id: md.Author,
                        Total: md.AllMessages
                    };
                }).sort((a, b) => b.Total - a.Total).splice(0, 10).map((user, index) => `\`${index + 1}.\` <@${user.Id}> \`${user.Total} messages\``).join("\n");    
            }
  
            let embed = new EmbedBuilder()
            .setColor("Red")
            .setFooter({text: `${msg.guild.name} Leaderboard`})
            .setDescription(`Rover Coins - Ranking System (Roverdev - 2023 System)`)
            .setThumbnail(client.user.avatarURL({dynamic: true}))
            .addFields([
               { name: `Rover Coins - Message Ranking Leaderboard`, value: `** **\n${messageList}` },
               { name: `Rover Coins -  Activity Coins Leaderboard`, value: `** **\n${messageList1}` },
               { name: `Rover Coins -  Invite Coins Leaderboard`, value: `** **\n${messageList2}` }
            ])
            // let row = new ActionRowBuilder()
            // .addComponents(
            //   new ButtonBuilder()
            //   .setLabel(`My Rank`)
            //   .setCustomId(`User-Rank`)
            //   .setDisabled(false)
            //   .setStyle(ButtonStyle),
            // )
            msg.edit({embeds: [embed], content: `***> Bot Ping: ${client.ws.ping}ms | Edited: <t:${Math.floor(Date.now() / 1000)}:R> | Uptime: <t:${Math.floor(Date.now() / 1000 - client.uptime / 1000)}:R>***`})
          
          })}) 
  }, 50000);

  const data = await TotalCoins.find()

  data.forEach(async m => {
        const guild = Roverdev.guilds.cache.get("1081700920993259550")
        const data = await guild.members.cache.get(m.Author)

        if (!data) {
            
            const user = await Roverdev.users.fetch(m.Author) ? await Roverdev.users.fetch(m.Author) : null

           console.log(` Seems ${user.username} is not in the guild anymore...`)
           await TotalCoins.findOneAndDelete({ Author: user.id })
        }
  })
  const data1 = await TotalBots.find()

  data1.forEach(async m => {
        const guild = Roverdev.guilds.cache.get("1081700920993259550")
        const data = await guild.members.cache.get(m.Author)

        if (!data) {
            
            const user = await Roverdev.users.fetch(m.Author) ? await Roverdev.users.fetch(m.Author) : null

           console.log(` Seems ${user.username} is not in the guild anymore...`)
            await TotalBots.findOneAndDelete({ Author: user.id })
        }
  })

   Roverdev.VanityUses = 0
   Roverdev.invites = new Collection();

   const guild = Roverdev.guilds.cache.get("1081700920993259550")

   const res = await guild.fetchVanityData().catch(() => {});

   Roverdev.VanityUses = res.uses

   const firstInvites = await guild.invites.fetch();
     // Set the key as Guild ID, and create a map which has the invite code, and the number of uses
  Roverdev.invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));

  console.log(`Successfully Set Data.`)


   const statuses = [
           "Best Free Bots | Roverdev",
           "Best Discord Servers By Roverdev",
           "Invite your friends and get banking cash!",
           "Roverdev Hosting, get a server for activity!",
           "Roverdev Botlist, Grow your discord bot now!",
           "Best Servers by roverdev",
           "Make the impossaible, Possible!",
           "Roverdev Websites & Dashboards",
           "discord.gg/roverdev",
           "AutoModeration - Anti Nuke Systems",
           "Roverdev 2023 Remake",
           "Developers: Roverdev Founders",
           "Roverdev 4 life",
           "Roverdev - Remake New System",
           "2023 Best Bot Shop System",
           "2023 Best Services and systems",
           "Sub to our channels and get codes!",
           "Get Currency, By Being active in the server!",
           "Best Bots | .gg/roverdev",
           "Free Bots | .gg/roverdev",
           "Roverdev Lavalink, Free and Fast Lavalink Here for you!",
           "Roverdev - Best Community 2023"
   ]

   setInterval(() => {
         const CurrentStatus = statuses[Math.floor(Math.random() * statuses.length)]

         client.user.setPresence({
               status: "online",
               activities: [{
                      name: CurrentStatus,
                      type: ActivityType.Playing,
                      
               }]
         })
   }, 20000);
}