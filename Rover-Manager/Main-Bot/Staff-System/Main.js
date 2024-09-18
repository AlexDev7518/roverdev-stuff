module.exports = async client => {
      
    /**
     * @Staff_Messages
     */

     const { 
         EmbedBuilder,
       } = require('discord.js');

    client.on("ready", async client => {
//         setInterval(() => {
//             client.channels.fetch('1039211970471153705').then((ch) => {
//                 ch.messages.fetch('1021587554098741268').then((msg) => {

//                     const guild = client.guilds.cache.get("1003734007000866866")

//                     let members = guild.members.cache.filter(m => !m.user.bot && cheakOnline(guild.id, m.id) && m.roles.cache.has('1019014579394719795'));
//                     let members1 = guild.members.cache.filter(m => !m.user.bot && cheakOnline(guild.id, m.id) && m.roles.cache.has('1019014429934887083'));
//                     let members2 = guild.members.cache.filter(m => !m.user.bot && cheakOnline(guild.id, m.id) && m.roles.cache.has('1019014429263810621'));
//                     let members3 = guild.members.cache.filter(m => !m.user.bot && cheakOnline(guild.id, m.id) && m.roles.cache.has('1019014427774812270'));
//                     let members4 = guild.members.cache.filter(m => !m.user.bot && cheakOnline(guild.id, m.id) && m.roles.cache.has('1019014427338612746'));
//                     let members5 = guild.members.cache.filter(m => !m.user.bot && cheakOnline(guild.id, m.id) && m.roles.cache.has('1019013341223604294'));
//                     let members6 = guild.members.cache.filter(m => !m.user.bot && cheakOnline(guild.id, m.id) && m.roles.cache.has('1019013338346295296'));
//                     let members7 = guild.members.cache.filter(m => !m.user.bot && cheakOnline(guild.id, m.id) && m.roles.cache.has('1019013327344631908'));
//                     let members8 = guild.members.cache.filter(m => !m.user.bot && cheakOnline(guild.id, m.id) && m.roles.cache.has('1019013339801727036'));
//                     msg.edit({
//                         content: `  `,
//                           embeds: [
//                               new EmbedBuilder()
//                               .setAuthor({ name: `${guild.name} | Roverdev Staff`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
//                               .setTitle("Roverdev Staff Online/Status")
//                               .setColor("Green")
//                               .setDescription(`
//     \`\`\`yml
// Online Staff: ${members.size}
// =============
// Online Mods: ${members1.size}
// =============
// Online Head Mods: ${members2.size}
// =============
// Online Admins: ${members3.size}
// =============
// Online Head Admins: ${members4.size}
// =============
// Online Co-Owners: ${members5.size}
// =============
// Online Owners: ${members8.size}
// =============
// Online Co-Founders: ${members6.size}
// =============
// Online Founders: ${members7.size}
//     \`\`\`
//     `)
//                           ]
//                     })
//                 })
//             })
//             function cheakOnline(g, m) {
//                 try {
//                     const member = client.guilds.cache.get(g).members.cache.get(m);
//                     if (member.presence.status != 'offline') {
//                         return true;
//                     }
//                     return false;
//                 } catch (err) {
//                     return false;
//                 }
//               }
//         }, 10000);
        
    })

    require("./Database")(client)

    client.StaffSystem = require("./config")


    client.on("messageCreate", async message => {

        if (!message.guild || !message.guild.available || !message.channel) return;
        if (message.author.bot || message.webhookId) return;

        if (message.content.startsWith("r?")) {
             return console.log(`Command Ran`)
        } else {
           if (message.guild.id == "1003734007000866866") {
               if (message.member.roles.cache.has("1019014579394719795")) {
                 client.StaffRanking.ensure(message.guild.id, {
                     TotalUsers: []
                  })
                  client.StaffRanking.ensure("1081700920993259550", {
                     TotalUsers: []
                  })
             
                 const messages = client.StaffRanking.get(message.guild.id, `${message.author.id}.TotalMessages`) || 0
             
                 const messageDatabase = messages + 1
                 client.StaffRanking.set(message.guild.id, messageDatabase, `${message.author.id}.TotalMessages`)
             
                 const Users = client.StaffRanking.get(message.guild.id, "Users")
             
                 client.StaffRanking.ensure(message.guild.id, {
                         TotalUsers: []
                 })
             
                 client.StaffRanking.push(message.guild.id, message.author.id , "TotalUsers") 
               }
       }
         if (message.guild.id == "1081700920993259550") {
              if (message.member.roles.cache.has("1005978927421980702")) {
                 client.StaffRanking.ensure(message.guild.id, {
                     TotalUsers: []
                  })
             
                 const messages = client.StaffRanking.get(message.guild.id, `${message.author.id}.TotalMessages`) || 0
             
                 const messageDatabase = messages + 1
                 client.StaffRanking.set(message.guild.id, messageDatabase, `${message.author.id}.TotalMessages`)
             
                 const Users = client.StaffRanking.get(message.guild.id, "Users")
             
                 client.StaffRanking.ensure(message.guild.id, {
                         TotalUsers: []
                 })
             
                 client.StaffRanking.push(message.guild.id, message.author.id , "TotalUsers") 
            }
      }
        }
  })
    }