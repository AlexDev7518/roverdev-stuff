const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, Message } = require("discord.js")
const Suggestion = require("../../database/schemas/suggestions")

module.exports = {
    name: "suggest",
    category: "moderation",
    cooldown: 2,
    Description: "",
    RunCommand: async (Roverdev, message, args, executor) => {

        if (!message.member.roles.cache.has("1085499932682764298")) {
              return message.reply({ embeds: [
                    new EmbedBuilder()
                    .setAuthor({ name: "Missing Roles", iconURL: message.author.displayAvatarURL() })
                    .setTitle("Missing \`Administrator\` Role")
                    .setColor("Red")
                    .setDescription(`You are missing the \`Administrator\` Role.`)
              ] })
        }


            let Types = ["accept", "decline", "maybe"]

               let array = [{
                    accept: {
                          Color: "Green"
                    },
                    decline: {
                        Color: "Red"
                    },
                    maybe: {
                        Color: "Blue"
                    }
               }]

               if (!args[0]) return message.reply({ content: `Please Provide one of these: \`${Types.map(m => m).join(", ")}\`` })

               if (!Types.includes(args[0])) return message.reply({ embeds: [
                      new EmbedBuilder()
                       .setTitle(`${args[0]} is not a vaild thing for suggestions!`)
                       .setDescription(`Please Provide one of these: \`${Types.map(m => m).join(", ")}\`\n> Example: \`r?suggest deny <messageid> <reason>\``)
                       .setColor("Red")
               ] })

               if (!args[0]) return;

               if (!args[1]) return message.reply({ embeds: [
                new EmbedBuilder()
                 .setTitle(`Seems you did not provide any messageId.`)
                 .setDescription(`Example: \`r?suggest deny <messageid> <reason>\``)
                 .setColor("Red")
             ] })

             const db = await Suggestion.findOne({ suggestion_id: args[1] })
             if (db.author == message.author.id) return message.reply({ content: `You can't accept your own suggestion.` })

             if (!db) return message.reply({ embeds: [
                new EmbedBuilder()
                 .setTitle(`Seems you did not provide a valid suggestion.`)
                 .setColor("Red")
             ] }) 

             let reason = "No Reason Provided"
             if (args[2]) reason = args.slice(2).join(` `);

             console.log(reason)

             console.log(args[1])

             let MessageOfSuggestion = message.guild.channels.cache.get("1085511123102609502").messages.cache.get(args[1])


             if (MessageOfSuggestion == undefined) {
                    await message.guild.channels.cache.get("1085511123102609502").messages.fetch()
                    MessageOfSuggestion = message.guild.channels.cache.get("1085511123102609502").messages.cache.get(args[1]).embeds[0]
                    console.log(MessageOfSuggestion)
             }

             

             const embed = EmbedBuilder.from(Roverdev.channels.cache.get("1085511123102609502").messages.cache.get(args[1]).embeds[0])
             embed.setThumbnail(Roverdev.users.cache.get(db.author).displayAvatarURL())
             embed.setColor(array[0][args[0]].Color)
             embed.setFields({ name: `Suggestion ${args[0] == "accept" ? "is Accepted" : args[0] == "decline" ? "is Declined" : "is Pending"} - By: ${message.author.username}`, value: `> - Reason: ${reason}` })

             let button = ButtonBuilder.from(Roverdev.channels.cache.get("1085511123102609502").messages.cache.get(args[1]).components[0].components[0])
             button.setDisabled(true)
             let button1 = ButtonBuilder.from(Roverdev.channels.cache.get("1085511123102609502").messages.cache.get(args[1]).components[0].components[1])
             button1.setDisabled(true)

             let row = new ActionRowBuilder().setComponents(button, button1)



             

             Roverdev.channels.cache.get("1085511123102609502").messages.cache.get(args[1]).edit({ embeds: [embed], components: [row] })

             Roverdev.users.cache.get(db.author).send({ embeds: [embed], content: `<@!${db.author}> Your Suggestion ${args[0] == "accept" ? " is Accepted" : args[0] == "decline" ? "is Declined" : "is Pending"}, By: ${message.author}` })

             message.reply({ content: `Suggestion is now set to ${args[0]}` })

             await Suggestion.findOneAndDelete({ suggestion_id: args[1] })
     }
}