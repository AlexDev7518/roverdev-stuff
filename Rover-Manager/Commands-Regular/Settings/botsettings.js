module.exports.run = async (client, message, args, cmdUser,prefix, embed) => {

    const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

    const settings = new EmbedBuilder()
    .setAuthor({ name: `${client.user.username} | Settings Page`, iconURL: client.user.displayAvatarURL() })
    .setDescription(`***__What Do you Want to Look At In the Bot?__***`)
    .setColor("#3dbeff")


    const row = new ActionRowBuilder()
    .addComponents(
          new ButtonBuilder()
          .setLabel(`Commands`)
          .setCustomId(`commands`)
          .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
          .setLabel(`Events`)
          .setCustomId(`events`)
          .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
          .setLabel(`Main-Bot`)
          .setCustomId(`main-bot`)
          .setStyle(ButtonStyle.Success),
    )

    message.reply({embeds: [settings], components: [row]})
}

module.exports.conf = {
   aliases: ["botsettings"],
   enabled: true,
   ownerOnly: false,
   AdminOnly: false,
   userPermissions: ["Administrator"]
}

module.exports.help = {
  Roverdev: {
      name: "botsettings",
      description: "Enable / Disable Commands.",
      timeout: 5000,
      category: "Settings",
    }
}