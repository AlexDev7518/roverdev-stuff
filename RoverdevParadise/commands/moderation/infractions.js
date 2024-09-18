const Discord = require("discord.js");
const Warnings = require("../../database/schemas/Infractions/profile");

module.exports = {
    name: "infractions",
    category: "moderation",
    cooldown: 2,
    Description: "Manage someone's infractions",
    RunCommand: async (Roverdev, message, args, executor) => {
        if (!message.member.roles.cache.has("1085500041969532968")) {
            return message.reply({ embeds: [
                  new Discord.EmbedBuilder()
                  .setAuthor({ name: "Missing Roles", iconURL: message.author.displayAvatarURL() })
                  .setTitle("Missing \`Chat Moderator\` Role")
                  .setColor("Red")
                  .setDescription(`You are missing the \`Chat Moderator\` Role.`)
            ] })
        }

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || Roverdev.users.cache.get(args[0]);

        if (!user) {
            return message.reply({ embeds: [
                  new Discord.EmbedBuilder()
                  .setAuthor({ name: "Missing Arguments", iconURL: message.author.displayAvatarURL() })
                  .setTitle("Missing Arguments")
                  .setColor("Red")
                  .setDescription(`You are missing the \`user\` argument.\ni.e \`infractions @Rover <add/remove/clear/view> <add:type, reason> <remove:caseID>\``)
            ] })
        }

        let warnings = await Warnings.findOne({
            guildID: message.guild.id,
            userID: user.id
        });

        if (!warnings) {
            warnings = await Warnings.create({
                guildID: message.guild.id,
                userID: user.id
            });
        }

        if (!args[1]) {
            return message.reply({ embeds: [
                  new Discord.EmbedBuilder()
                  .setAuthor({ name: "Missing Arguments", iconURL: message.author.displayAvatarURL() })
                  .setTitle("Missing Arguments")
                  .setColor("Red")
                  .setDescription(`You are missing the \`add/remove/clear/view\` argument.`)
            ] })
        }

        if (args[1] === "add") {
            if(!args[2]) {
                return message.reply({ embeds: [
                      new Discord.EmbedBuilder()
                      .setAuthor({ name: "Missing Arguments", iconURL: message.author.displayAvatarURL() })
                      .setTitle("Missing Arguments")
                      .setColor("Red")
                      .setDescription(`You are missing the \`type\` argument.`)
                ] })
            }

            const type = args[2];

            if (!args[3]) {
                return message.reply({ embeds: [
                      new Discord.EmbedBuilder()
                      .setAuthor({ name: "Missing Arguments", iconURL: message.author.displayAvatarURL() })
                      .setTitle("Missing Arguments")
                      .setColor("Red")
                      .setDescription(`You are missing the \`reason\` argument.`)
                ] })
            }

            const reason = args.slice(3).join(" ");

            if (!reason) {
                return message.reply({ embeds: [
                      new Discord.EmbedBuilder()
                      .setAuthor({ name: "Missing Arguments", iconURL: message.author.displayAvatarURL() })
                      .setTitle("Missing Arguments")
                      .setColor("Red")
                      .setDescription(`You are missing the \`reason\` argument.`)
                ] })
            }

            const warning = {
                moderator: message.author.id,
                reason: reason,
                timestamp: new Date().getTime(),
                caseID: Math.floor(Math.random() * 100000),
                type: type
            }

            await Warnings.findOneAndUpdate({
                guildID: message.guild.id,
                userID: user.id
            }, {
                guildID: message.guild.id,
                userID: user.id,
                $push: {
                    infractions: warning
                }
            }, {
                upsert: true
            });

            message.reply({ embeds: [
                  new Discord.EmbedBuilder()
                  .setAuthor({ name: "Infraction Added", iconURL: message.author.displayAvatarURL() })
                  .setTitle("Infraction Added")
                  .setColor("Red")
                  .setDescription(`Successfully added an infraction to ${user.tag} for \`${reason}\``)
            ] })

            user.send({ embeds: [
                    new Discord.EmbedBuilder()
                    .setAuthor({ name: "Infraction Added", iconURL: message.author.displayAvatarURL() })
                    .setTitle("Infraction Added")
                    .setColor("Red")
                    .setDescription(`You have been warned in ${message.guild.name} for \`${reason}\``)
                ] }).catch(() => {});
        } else if (args[1] === "remove") {
            if (!args[2]) {
                return message.reply({ embeds: [
                      new Discord.EmbedBuilder()
                      .setAuthor({ name: "Missing Arguments", iconURL: message.author.displayAvatarURL() })
                      .setTitle("Missing Arguments")
                      .setColor("Red")
                      .setDescription(`You are missing the \`caseID\` argument.`)
                ] })
            }

            const caseID = args[2];

            if (!warnings.infractions.filter(warning => warning.caseID == caseID)[0]) {
                return message.reply({ embeds: [
                      new Discord.EmbedBuilder()
                      .setAuthor({ name: "Invalid Case ID", iconURL: message.author.displayAvatarURL() })
                      .setTitle("Invalid Case ID")
                      .setColor("Red")
                      .setDescription(`The case ID you provided is invalid.`)
                ] })
            }

            await Warnings.findOneAndUpdate({
                guildID: message.guild.id,
                userID: user.id
            }, {
                guildID: message.guild.id,
                userID: user.id,
                $pull: {
                    infractions: warnings.infractions.filter(warning => warning.caseID == caseID)[0]
                }
            }, {
                upsert: true
            });

            message.reply({ embeds: [
                  new Discord.EmbedBuilder()
                  .setAuthor({ name: "Infraction Removed", iconURL: message.author.displayAvatarURL() })
                  .setTitle("Infraction Removed")
                  .setColor("Red")
                  .setDescription(`Successfully removed an infraction from ${user.tag} for \`${warnings.infractions.filter(warning => warning.caseID == caseID)[0].reason}\``)
            ] })
        } else if (args[1] === "clear") {
            await Warnings.findOneAndDelete({
                guildID: message.guild.id,
                userID: user.id
            });

            message.reply({ embeds: [
                  new Discord.EmbedBuilder()
                  .setAuthor({ name: "Infractions Cleared", iconURL: message.author.displayAvatarURL() })
                  .setTitle("Infractions Cleared")
                  .setColor("Red")
                  .setDescription(`Successfully cleared all infractions from ${user.tag}`)
            ] })
        } else if (args[1] === "view") {
            if (!warnings?.infractions?.length) {
                return message.reply({ embeds: [
                      new Discord.EmbedBuilder()
                      .setAuthor({ name: "No Infractions", iconURL: message.author.displayAvatarURL() })
                      .setTitle("No Infractions")
                      .setColor("Red")
                      .setDescription(`${user.tag} has no infractions.`)
                ] })
            }

            let embeds = [];
            // display 10 infractions per page
            let page = 1;
            let perPage = 5;
            let totalPages = Math.ceil(warnings.infractions.length / perPage);

            for (let i = 0; i < warnings.infractions.length; i += perPage) {
                const current = warnings.infractions.slice(i, i + perPage);

                const info = current.map((warning) => {
                    return `**Case ID:** ${warning.caseID}\n**Type:** ${warning.type}\n**Moderator:** <@${warning.moderator}>\n**Reason:** ${warning.reason}\n**Timestamp:** ${new Date(warning.timestamp).toLocaleString()}\n`;
                });

                const embed = new Discord.EmbedBuilder()
                    .setAuthor({ name: "Infractions", iconURL: message.author.displayAvatarURL() })
                    .setTitle(`Infractions for ${user.tag}`)
                    .setColor("Red")
                    .setDescription(info.join("\n"))
                    .setFooter({ text: `Page ${page} of ${totalPages}` });

                embeds.push(embed);
                page++;
            }

            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("previous")
                        .setLabel("Previous")
                        .setDisabled(warnings.infractions.length < 5 ? true : false)
                        .setStyle(Discord.ButtonStyle.Primary),
                    new Discord.ButtonBuilder()
                        .setCustomId("next")
                        .setLabel("Next")
                        .setDisabled(warnings.infractions.length < 5 ? true : false)
                        .setStyle(Discord.ButtonStyle.Primary)
                );

            if (!embeds[0]) {
                return message.reply({ embeds: [
                      new Discord.EmbedBuilder()
                      .setAuthor({ name: "No Infractions", iconURL: message.author.displayAvatarURL() })
                      .setTitle("No Infractions")
                      .setColor("Red")
                      .setDescription(`${user.tag} has no infractions.`)
                ] })
            }

            const msg = await message.reply({ embeds: [embeds[0]], components: [row] });

            const filter = (button) => button.user.id === message.author.id;
            const collector = msg.createMessageComponentCollector(filter, { idle: 300000 });

            let i = 0;

            collector.on("collect", async (button) => {
                if (button.customId === "previous") {
                    i--;
                    if (i < 0) i = embeds.length - 1;
                } else if (button.customId === "next") {
                    i++;
                    if (i === embeds.length) i = 0;
                }

                await button.deferUpdate();

                msg.edit({ embeds: [embeds[i]] });
            });

            collector.on("end", () => {
                msg.edit({ components: [
                        new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                    .setCustomId("previous")
                                    .setLabel("Previous")
                                    .setStyle(Discord.ButtonStyle.Primary)
                                    .setDisabled(true),
                                new Discord.ButtonBuilder()
                                    .setCustomId("next")
                                    .setLabel("Next")
                                    .setStyle(Discord.ButtonStyle.Primary)
                                    .setDisabled(true)
                            )
                ] });
            });
        }
    }
}