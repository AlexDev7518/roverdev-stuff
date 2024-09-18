const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require("discord.js")
const ShopBots = require("../../../Configuration/ShopConfig/ShopBots")
// const { ShopSystem } = require("../../RoverConfig")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor, database) => {
        const RoverCoins = new EmbedBuilder()

        const embed = new EmbedBuilder()
        .setAuthor({ name: `Bot Shop Services | Free & Best Bots`, iconURL: Roverdev.user.displayAvatarURL() })
        .setThumbnail("https://cdn.discordapp.com/emojis/1015238375189516288.png")
        .setColor("#3dbeff")
        .setDescription(`Welcome to Roverdev ***FREE*** Bot Shop <:rocket:1015238375189516288>\n\n***Features Of Shop Bots:***\n> Fully Customizable\n> Low Ping & Fast Bot\n> Lots of Features\n> Premium Features\n> Embed Customization\n> Status Customization\n> Daily Reboot (Keep The Bot Running)\n> Advanced Systems\n\n**Rules & TOS**\n> You Must Agree to Our ***Rules & TOS*** when creating your bot\n\n> <:rocket:1015238375189516288> **Welcome to Roverdev Free & Fast Discord Bot Shop**`)

        const row = new ActionRowBuilder()
        .addComponents(
              new StringSelectMenuBuilder()
                 .setCustomId("Shop-Bots")
                 .setPlaceholder("Select To Create a Bot")
                 .setOptions(
                       ShopBots.Bots.map(m => {
                              return {
                                     label: m.label,
                                     value: m.value,
                                     description: m.description,
                                     emoji: m.emoji
                              }
                       })
                 )
                
        )

        message.channel.send({ embeds: [embed], components: [row] })
    },
}