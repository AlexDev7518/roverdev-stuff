const schemaGuild = require('../../Models/GuildConfig')
module.exports = async Rover => {
  setTimeout(() => {
    try {
      const stringlength2 = 69;
      Rover.logger(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.green, { label: "Roverdev" })
      Rover.logger(`┃ `.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.green, { label: "Roverdev" })
      Rover.logger(`┃ `.bold.green + `Bot is Online And Ready!`.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length - `Bot is Online And Ready!`.length) + "┃".bold.green, { label: "Roverdev" })
      Rover.logger(`┃ `.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.green, { label: "Roverdev" })
      Rover.logger(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.green, { label: "Roverdev" })
    } catch (error) {
          console.log(error)
     }
  }, 1000);

  Rover.guilds.cache.forEach(async m => {
    const data = await schemaGuild.findOne({ GuildID: m.id })

    if(!data) return await new schemaGuild({ GuildID: m.id, Prefix: `r?`, Language: "English" }).save()
  })

  const statuses = [
     "Rover Bot - 2023 Best Multipurpose",
     "Coded By: AlexDev#7518",
     "Hosting at: ovhcloud.com",
     "Hosted By: Chauvin#4522",
     "2023 Best Systems",
     "Winter Update Coming Soon.",
     `Users: ${Rover.users.cache.size} | Guilds: ${Rover.guilds.cache.size} | Ping: ${Rover.ws.ping}`
]

setInterval(() => {
  const CurrentStatus = statuses[Math.floor(Math.random() * statuses.length)]

  Rover.user.setPresence({
        status: "dnd",
        activities: [{
               name: CurrentStatus,
               type: require("discord.js").ActivityType.Playing,
               
        }]
  })
}, 20000);

}