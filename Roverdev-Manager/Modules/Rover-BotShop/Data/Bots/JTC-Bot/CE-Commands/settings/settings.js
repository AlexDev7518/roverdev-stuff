module.exports = {
    name: "settings",
    category: "settings",
    aliases: ["settings"],
    cooldown: 2,
    usage: "settings",
    description: "Edit the settings of this Guild",
    guildOnly: false,

    run: async (client, message, args, cmdUser,prefix) => {
        return message.reply({content: `This Command is Not Finished.`})
    }}