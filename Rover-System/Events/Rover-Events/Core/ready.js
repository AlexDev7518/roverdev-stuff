const { ActivityType } = require("discord.js")

module.exports = async (Rover) => {
        Rover.user.setPresence({ status: "dnd", afk: true, activities: [{ name: "discord.gg/roverdev OP", type: ActivityType.Playing  }] })
}