const Discord = require("discord.js");
const Warnings = require("../../database/schemas/Infractions/profile");

module.exports = {
    name: "kick",
    category: "moderation",
    cooldown: 2,
    Description: "Kick a user from the server",
    RunCommand: async (Roverdev, message, args, executor) => {
        if (!message.member.roles.cache.has("1085500789482590279")) {
            return message.reply({ embeds: [
                  new EmbedBuilder()
                  .setAuthor({ name: "Missing Roles", iconURL: message.author.displayAvatarURL() })
                  .setTitle("Missing \`Moderator\` Role")
                  .setColor("Red")
                  .setDescription(`You are missing the \`Moderator\` Role.`)
            ] })
        }
        
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join(" ");

        if (!user) {
            return message.reply({ embeds: [
                  new EmbedBuilder()
                  .setAuthor({ name: "Missing User", iconURL: message.author.displayAvatarURL() })
                  .setTitle("Missing \`User\` Argument")
                  .setColor("Red")
                  .setDescription(`You are missing the \`User\` Argument.`)
            ] })
        }

        if (!reason) {
            return message.reply({ embeds: [
                  new EmbedBuilder()
                  .setAuthor({ name: "Missing Reason", iconURL: message.author.displayAvatarURL() })
                  .setTitle("Missing \`Reason\` Argument")
                  .setColor("Red")
                  .setDescription(`You are missing the \`Reason\` Argument.`)
            ] })
        }

        if (user.id === message.author.id) {
            return message.reply({ embeds: [
                  new EmbedBuilder()
                  .setAuthor({ name: "Invalid User", iconURL: message.author.displayAvatarURL() })
                  .setTitle("Invalid \`User\` Argument")
                  .setColor("Red")
                  .setDescription(`You cannot kick yourself.`)
            ] })
        }

        if (user.id === Roverdev.user.id) {
            return message.reply({ embeds: [
                  new EmbedBuilder()
                  .setAuthor({ name: "Invalid User", iconURL: message.author.displayAvatarURL() })
                  .setTitle("Invalid \`User\` Argument")
                  .setColor("Red")
                  .setDescription(`You cannot kick me.`)
            ] })
        }

        if (!user.kickable) {
            return message.reply({ embeds: [
                  new EmbedBuilder()
                  .setAuthor({ name: "Invalid User", iconURL: message.author.displayAvatarURL() })
                  .setTitle("Invalid \`User\` Argument")
                  .setColor("Red")
                  .setDescription(`I cannot kick that user.`)
            ] })
        }

        if (message.member.roles.highest.position <= user.roles.highest.position) {
            return message.reply({ embeds: [
                  new EmbedBuilder()
                  .setAuthor({ name: "Invalid User", iconURL: message.author.displayAvatarURL() })
                  .setTitle("Invalid \`User\` Argument")
                  .setColor("Red")
                  .setDescription(`That user's roles are higher than yours.`)
            ] })
        }

        const kickEmbed = new Discord.EmbedBuilder()
        .setAuthor({ name: "Member Kicked", iconURL: message.author.displayAvatarURL() })
        .setDescription(`**${user.user.tag}** has been kicked from the server.\n> *${reason}*`)
        .setColor("Red")
        .setTimestamp()
        .setFooter({ text: `Kicked by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })

        message.reply({ embeds: [ kickEmbed ] })
        
        try {
            user.send({
                embeds: [
                    new Discord.EmbedBuilder()
                    .setAuthor({ name: "Member Kicked", iconURL: message.author.displayAvatarURL() })
                    .setDescription(`You have been kicked from **${message.guild.name}**.\n> *${reason}*`)
                    .setColor("Red")
                    .setTimestamp()
                    .setFooter({ text: `Kicked by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                ]
            })
        } catch (error) {
            console.log(error)
        }

        user.kick({ reason: reason }).catch(error => {
            message.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                    .setAuthor({ name: "Error", iconURL: message.author.displayAvatarURL() })
                    .setTitle("An error occurred")
                    .setColor("Red")
                    .setDescription(`\`\`\`${error}\`\`\``)
                ]
            })
        })

        const kickData = await Warnings.findOne({
            guildID: message.guild.id,
            userID: user.id
        })

        if (!kickData) {
            let newData = new Warnings({
                guildID: message.guild.id,
                userID: user.id,
                infractions: [
                    {
                        type: "Kick",
                        reason: reason,
                        moderator: executor.id,
                        timestamp: new Date().getTime(),
                        caseID: Math.floor(Math.random() * 100000),
                    }
                ]
            })

            newData.save()
        } else {
            kickData.infractions.push({
                type: "Kick",
                reason: reason,
                moderator: executor.id,
                timestamp: new Date().getTime(),
                caseID: Math.floor(Math.random() * 100000),
            })

            kickData.save()
        }
    }
}