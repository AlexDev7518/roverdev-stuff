const { ActivityType, Status } = require("discord.js")

module.exports = async (Rover) => {

        setTimeout(() => {
                Rover.guilds.cache.forEach(m => {
                        console.log(m.name)
                })
        }, 1000);

        let Statuses = [
                 "Rover Bot On Top!",
                 "Made By: AlexDev#7518",
                 `Total Commands: ${Rover.container.commands.size}`,
                 `Watching ${Rover.users.cache.size} Users in ${Rover.guilds.cache.size} Guilds`,
                 `Rover, Most enhanced Discord Bot`,
                 `Listening to some music on spotify and others!`,
                 `r?help / or Mention me`,
                 `Roverdev Community, Free Discord Bots, Source Codes and more, Check Out: r?sponsors`
        ]

        setInterval(() => {
                const CurrentStatus = Statuses[Math.floor(Math.random() * Statuses.length)]
                Rover.user.setPresence({ status: "dnd", afk: true, activities: [{ 
                        name: CurrentStatus.includes("Listening") ? CurrentStatus.replace("Listening to", '') : CurrentStatus, 
                        type: CurrentStatus.includes("Listening") ? ActivityType.Listening : ActivityType.Playing  
                }] 
        })
        
        }, 20000);
}