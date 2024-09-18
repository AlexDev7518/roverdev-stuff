const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SelectMenuBuilder, StringSelectMenuBuilder } = require("discord.js");
const { SelfRoles } = require("../../../Configuration/Selfroles");
// const selfRoles = require("../../RoverConfig");

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor, database) => {
        const embed = new EmbedBuilder()
        .setAuthor({ name: `Self Roles | ${message.guild.name} | Best Free Services`, iconURL: Roverdev.user.displayAvatarURL() })
        .setThumbnail(message.guild.iconURL())
        .setImage("https://i.imgur.com/LLqj2Kh.png")
        .setDescription(`Welcome to Roverdev's Self Roles can get some roles to look cool\n\nCurrent Self Roles You Can Get:\n${SelfRoles.map((option, index) => `> Option:  \`${index + 1}\` Name: ${option.label}`).join("\n")}`)
        .setColor("#3dbeff")
        
        const row2 = new ActionRowBuilder()
        .addComponents(
               new StringSelectMenuBuilder()
               .setCustomId("Self-Roles")
               .setPlaceholder(`Click me to get self roles`)
               .setMaxValues(SelfRoles.length)
               .setOptions(
                       SelfRoles.map(option => {
                             return {
                                   label: option.label,
                                   value: option.value,
                                   description: option.description,
                                   emoji: option.emoji
                             }
                       })
               )
        )

        const rows = [row2] // limit 4
        const embeds = [embed]

        message.channel.send({ components: rows, embeds: embeds })
    },
}