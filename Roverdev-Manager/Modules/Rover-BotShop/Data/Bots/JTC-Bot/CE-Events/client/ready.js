const { guildOnly } = require("../../CE-Commands/info/help")

module.exports = async client => {
    console.log(require("colors").cyan(`
    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  
    ┃  Starting [RDV] ${client.user.username} Discord Bot              ┃                                         
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
    `))
    
    setInterval(() => {
        changeStatus(client)
    }, 10000)
        client.user.setPresence({
          status: "dnd",
          activities: [{
              name: "Made By: discord.gg/roverdev",
              type: require("discord.js").ActivityType.Playing,
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
                type: StatusType == "watching" ? require("discord.js").ActivityType.Watching : StatusType == "playing" ? require("discord.js").ActivityType.Playing : StatusType == "listening" ? require("discord.js").ActivityType.Listening : ActivityType.Playing,
                url: "https://discord.gg/roverdev"
            }]
        })
        
};