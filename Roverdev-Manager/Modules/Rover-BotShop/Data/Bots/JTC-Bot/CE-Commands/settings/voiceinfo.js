const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "voiceinfo",
    category: "info",
    aliases: ["voiceinfo"],
    cooldown: 2,
    usage: "voiceinfo <#channelId>",
    description: "Check a JTC Voice info.",
    guildOnly: false,

    run: async (client, message, args, cmdUser,prefix) => {
         message.reply({embeds: [new EmbedBuilder().setTitle(`Commands not Done.`).setColor("DarkRed")]})
    }}