const { EmbedBuilder } = require("discord.js");
const Warnings = require("../../database/schemas/Moderation/Warnings");

module.exports = {
    name: "warn",
    category: "moderation",
    cooldown: 2,
    Description: "Warn a user, for Breaking the rules",
    RunCommand: async (Roverdev, message, args, executor) => {
        if (!message.member.roles.cache.has("1085500041969532968")) {
            return message.reply({ embeds: [
                  new EmbedBuilder()
                  .setAuthor({ name: "Missing Roles", iconURL: message.author.displayAvatarURL() })
                  .setTitle("Missing \`Chat Moderator\` Role")
                  .setColor("Red")
                  .setDescription(`You are missing the \`Chat Moderator\` Role.`)
            ] })
        }
        

        if (!args[0] && !message.mentions.users.size > 1) return message.reply({ content: `:x: Missing Args! Please Provide the UserId` })

        if (message.mentions.users.size > 0) {
               args[0] = message.mentions.members.first().id
        }

        let array = ["Are you dumb? You can't warn anyone higher then yourself dumbo.", "Are you fr? How fucking stupid are you? When in the world would i let you warn someone higher then you?", "alright, no thats just not how it works here, no warning someone higher then you", "Dang, are you ok? You can't warn someone higher then you."]

        if (args[0] == message.author.id) return message.reply({ content: `JAJAJA, Are you trying to warn your self? What did you do this time? Lol` })
        if (!message.guild.members.cache.get(args[0])?.roles.highest.position) return message.reply({ content: `:x: Missing Args! Please Provide the UserId` })
        if (message.member.roles.highest.position < message.guild.members.cache.get(args[0]).roles.highest.position) return message.reply({ content: `${array[Math.floor(Math.random() * array.length)]}` })


        let reason;

        if (!args[1]) return message.reply({ content: `:x: Missing Args! Please Provide the Reason why you want to warn this user.` })

        if (args[1]) reason = args.slice(1).join(` `);

       
        let data = await Warnings.findOne({ AuthorId: args[0] })

        if (!data) await Warnings.create({
              AuthorId: args[0],
              Warnings: [
                 {
                     Moderator: message.author.id,
                     Reason: reason,
                     WarnDate: Date.now(),
                 }
              ]
        })

        if (data) {
            data.Warnings.push(
                 {
                    Moderator: message.author.id,
                    Reason: reason,
                    WarnDate: Date.now(),
                 }
            )
            await data.save()
            data = await Warnings.findOne({ AuthorId: args[0] })
        }

        data = await Warnings.findOne({ AuthorId: args[0] })

        let embed = new EmbedBuilder()
        .setAuthor({ name: `You have been warned!`, iconURL: message.guild.members.cache.get(args[0]).displayAvatarURL() })
        .setTitle(`You now have \`${data.Warnings.length}\` Warnings in the server!`)
        .setColor("Yellow")
        .setDescription(`You have been warned, For Breaking the Server Rules!`)
        .addFields({ name: ":warning: Warned By :warning: : " + `${message.author.username}`, value: `> ${reason}` })

        message.reply({ embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `User has been Successfully Warned!`, iconURL: message.guild.members.cache.get(args[0]).displayAvatarURL() })
            .setTitle(`User now has \`${data.Warnings.length}\` Warnings in the server!`)
            .setColor("Yellow")
            .setDescription(`> Reason for Warning: ${reason}`)
        ] })

        Roverdev.channels.cache.get("1085661987159162961").send({ embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `User has been Successfully Warned!`, iconURL: message.guild.members.cache.get(args[0]).displayAvatarURL() })
            .setTitle(`User now has \`${data.Warnings.length}\` Warnings in the server!`)
            .setColor("Yellow")
            .setDescription(`> Reason for Warning: ${reason}`)
        ], content: `${message.guild.members.cache.get(args[0]).user.username} Has been Warned!` })

        Roverdev.users.cache.get(args[0]).send({ embeds: [embed] })
    }
}