module.exports = {
    name: "disablecommad",
    category: "settings",
    aliases: ["disablecommad"],
    cooldown: 2,
    usage: "disablecommad",
    description: "disable a command",
    guildOnly: false,

    run: async (client, message, args, cmdUser,prefix) => {
        return message.reply({content: `This Command is Not Finished.`})
    }}