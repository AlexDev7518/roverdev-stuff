const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "voice",
    category: "settings",
    aliases: ["voice", "vc"],
    cooldown: 2,
    usage: "voice <cmd>",
    description: "Voice Commands",
    guildOnly: false,

    run: async (client, message, args, cmdUser,prefix) => {
        if (args[0] == "lock") {
            const Owner = client.settings.get(message.guild.id, `${message.member.voice.channelId}.Owner`)
            if (Owner == message.author.id) {
                message.member.voice.channel.permissionOverwrites.edit(message.guild.roles.everyone, 
                    {
                     ViewChannel: true,
                     Connect: false,
                     Speak: false
                    })
                message.reply({content: `Succesfully Locked the Channel.`})
            } else if (!Owner !== message.author.id) {
                 return message.reply({content: `Your Are not the Owner of the JTC`})
            }
        } else if (args[0] == "unlock") {
            const Owner = client.settings.get(message.guild.id, `${message.member.voice.channelId}.Owner`)
            if (Owner == message.author.id) {
                message.member.voice.channel.permissionOverwrites.edit(message.guild.roles.everyone, 
                    {
                     ViewChannel: true,
                     Connect: true,
                     Speak: true
                    })
                message.reply({content: `Succesfully UnLocked the Channel.`})
            } else if (!Owner !== message.author.id) {
                 return message.reply({content: `Your Are not the Owner of the JTC`})
            }
        } else if (args[0] == "hide") {
            const Owner = client.settings.get(message.guild.id, `${message.member.voice.channelId}.Owner`)
            if (Owner == message.author.id) {
                message.member.voice.channel.permissionOverwrites.edit(message.guild.roles.everyone, 
                    {
                     ViewChannel: false,
                     Connect: true,
                     Speak: true
                    })
                message.reply({content: `Succesfully Made the Channel Non Visible.`})
            } else if (!Owner !== message.author.id) {
                 return message.reply({content: `Your Are not the Owner of the JTC`})
            }
        } else if  (args[0] == "show") {
            const Owner = client.settings.get(message.guild.id, `${message.member.voice.channelId}.Owner`)
            if (Owner == message.author.id) {
                message.member.voice.channel.permissionOverwrites.edit(message.guild.roles.everyone, 
                    {
                     ViewChannel: true,
                     Connect: true,
                     Speak: true
                    })
                message.reply({content: `Succesfully Made the Channel Visible.`})
            } else if (!Owner !== message.author.id) {
                 return message.reply({content: `Your Are not the Owner of the JTC`})
            }
        } else {
             const embed = new EmbedBuilder()
             .setAuthor({ name: `Voice Commands | ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
             .setDescription(`> Unlock -> Unlock the Channel.\n> Lock -> Lock the Channel\n> hide -> Hide The Channel\n> show -> Show the Channel\n\n> To Run Commands Do: \`v!voice <cmd>\``)
             .setColor("DarkRed")
             message.reply({embeds: [embed]})
        }
}}