const { ActivityType, category } = require("discord.js");

module.exports = async client => {

   client.categories = require("fs").readdirSync(`./Command`);

    setTimeout(() => {
        client.guilds.cache.forEach(guild => {
                if (guild.id !== "1081700920993259550") {
                        client.guilds.cache.get(guild.id).commands.set(client.arrayOfSlashCommands)
                }
        })
       }, 500);

       client.guilds.cache.forEach(guild => {
        
        client.TicketSystem.ensure(guild.id, {
                  TicketSystem: false
        })
        
const Setup1 = client.TicketSystem.get(guild.id, `Setup1.AutoDelete`)
const Setup2 = client.TicketSystem.get(guild.id, `Setup2.AutoDelete`)
const Setup3 = client.TicketSystem.get(guild.id, `Setup3.AutoDelete`)
const Setup4 = client.TicketSystem.get(guild.id, `Setup4.AutoDelete`)
const Setup5 = client.TicketSystem.get(guild.id, `Setup5.AutoDelete`)
const Setup6 = client.TicketSystem.get(guild.id, `Setup6.AutoDelete`)
const Setup7 = client.TicketSystem.get(guild.id, `Setup7.AutoDelete`)
const Setup8 = client.TicketSystem.get(guild.id, `Setup8.AutoDelete`)
const Setup9 = client.TicketSystem.get(guild.id, `Setup9.AutoDelete`)

const Setup1_Category = client.TicketSystem.get(guild.id, `Setup1.ClosedCategory`)
const Setup2_Category = client.TicketSystem.get(guild.id, `Setup2.ClosedCategory`)
const Setup3_Category = client.TicketSystem.get(guild.id, `Setup3.ClosedCategory`)
const Setup4_Category = client.TicketSystem.get(guild.id, `Setup4.ClosedCategory`)
const Setup5_Category = client.TicketSystem.get(guild.id, `Setup5.ClosedCategory`)
const Setup6_Category = client.TicketSystem.get(guild.id, `Setup6.ClosedCategory`)
const Setup7_Category = client.TicketSystem.get(guild.id, `Setup7.ClosedCategory`)
const Setup8_Category = client.TicketSystem.get(guild.id, `Setup8.ClosedCategory`)
const Setup9_Category = client.TicketSystem.get(guild.id, `Setup9.ClosedCategory`)

 if (Setup1 && Setup1.Enabled == true && client.channels.cache.get(Setup1_Category) !== null) {
    setInterval(() => {
              const category = client.channels.cache.get(Setup1_Category)
              

              if (category.children.cache.size > 0) {
                 category.children.cache.forEach(channel => channel.delete()) 

                 console.log(`Successfully Cleared ${category.children.cache.size} in: ${category.name}`)
        }
 }, Setup1.Time);
 }

 if (Setup2 && Setup2.Enabled == true && client.channels.cache.get(Setup2_Category) !== null) {
    setInterval(() => {
              const category = client.channels.cache.get(Setup2_Category)

              if (category.children.cache.size > 0) {
                 category.children.cache.forEach(channel => channel.delete()) 

                 console.log(`Successfully Cleared ${category.children.cache.size} in: ${category.name}`)
        }
 }, Setup2.Time);
 }
 if (Setup3 && Setup3.Enabled == true && client.channels.cache.get(Setup3_Category) !== null) {
    setInterval(() => {
              const category = client.channels.cache.get(Setup3_Category)

              if (category.children.cache.size > 0) {
                 category.children.cache.forEach(channel => channel.delete()) 

                 console.log(`Successfully Cleared ${category.children.cache.size} in: ${category.name}`)
        }
 }, Setup3.Time);
 }
 if (Setup4 && Setup4.Enabled == true && client.channels.cache.get(Setup4_Category) !== null) {
    setInterval(() => {
              const category = client.channels.cache.get(Setup4_Category)

              if (category.children.cache.size > 0) {
                 category.children.cache.forEach(channel => channel.delete()) 

                 console.log(`Successfully Cleared ${category.children.cache.size} in: ${category.name}`)
        }
 }, Setup4.Time);
 }
 if (Setup5 && Setup5.Enabled == true && client.channels.cache.get(Setup5_Category) !== null) {
    setInterval(() => {
              const category = client.channels.cache.get(Setup5_Category)

              if (category.children.cache.size > 0) {
                 category.children.cache.forEach(channel => channel.delete()) 

                 console.log(`Successfully Cleared ${category.children.cache.size} in: ${category.name}`)
        }
 }, Setup5.Time);
 }
 if (Setup6 && Setup6.Enabled == true && client.channels.cache.get(Setup6_Category) !== null) {
    setInterval(() => {
              const category = client.channels.cache.get(Setup6_Category)

              if (category.children.cache.size > 0) {
                 category.children.cache.forEach(channel => channel.delete()) 

                 console.log(`Successfully Cleared ${category.children.cache.size} in: ${category.name}`)
        }
 }, Setup6.Time);
 }
 if (Setup7 && Setup7.Enabled == true && client.channels.cache.get(Setup7_Category) !== null) {
    setInterval(() => {
              const category = client.channels.cache.get(Setup7_Category)

              if (category.children.cache.size > 0) {
                 category.children.cache.forEach(channel => channel.delete()) 

                 console.log(`Successfully Cleared ${category.children.cache.size} in: ${category.name}`)
        }
 }, Setup7.Time);
 }

 if (Setup8 && Setup8.Enabled == true && client.channels.cache.get(Setup8_Category) !== null) {
    setInterval(() => {
              const category = client.channels.cache.get(Setup8_Category)

              if (category.children.cache.size > 0) {
                 category.children.cache.forEach(channel => channel.delete()) 

                 console.log(`Successfully Cleared ${category.children.cache.size} in: ${category.name}`)
        }
 }, Setup8.Time);
 }
 if (Setup9 && Setup9.Enabled == true && client.channels.cache.get(Setup9_Category) !== null) {
    setInterval(() => {
              const category = client.channels.cache.get(Setup9_Category)

              if (category.children.cache.size > 0) {
                 category.children.cache.forEach(channel => channel.delete()) 

                 console.log(`Successfully Cleared ${category.children.cache.size} in: ${category.name}`)
        }
 }, Setup9.Time);
 }

       })
       
       setInterval(() => {
        changeStatus(client)
    }, 10000)
        client.user.setPresence({
          status: "dnd",
          activities: [{
              name: "Made By: discord.gg/roverdev",
              type: ActivityType.Playing,
              url: "https://discord.gg/roverdev"
          }]
      })

}  
function changeStatus(client) {
    const statuses = [
         "Made By: discord.gg/roverdev",
         `${require("../../config/status.json")["Status Name"]}`
    ]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    //client.user.setActivity(status, { type: "PLAYING",url: "https://www.twitch.tv/mr_deadpool2021"})

       const StatusType = require("../../config/status.json")["Status Type"]

        client.user.setPresence({
            status: require("../../config/status.json")["Presence Status"],
            activities: [{
                name: status,
                type: StatusType == "watching" ? ActivityType.Watching : StatusType == "playing" ? ActivityType.Playing : StatusType == "listening" ? ActivityType.Listening : ActivityType.Playing,
                url: "https://discord.gg/roverdev"
            }]
        })
        
};