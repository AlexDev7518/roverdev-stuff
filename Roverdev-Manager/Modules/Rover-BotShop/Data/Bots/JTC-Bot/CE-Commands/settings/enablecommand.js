module.exports = {
    name: "enablecommand",
    category: "settings",
    aliases: ["enablecommand"],
    cooldown: 2,
    usage: "enablecommand",
    description: "enable a command",
    guildOnly: false,

    run: async (client, message, args, cmdUser,prefix) => {
        return message.reply({content: `This Command is Not Finished.`})
    }}