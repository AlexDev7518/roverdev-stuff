const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
    const embed = new EmbedBuilder()
    .setAuthor({ name: `Ask Staff | Made by Roverdev`, iconURL: "https://i.imgur.com/2Pi6JG2.png" })
    .setTitle(`[OFFICAL] Ask Staff System`)
    .addFields([
         { name: `How it Works?`, value: `You Just hit \`Start Conversation\` Button to Start the Conversation Yes All Messages will be Deleted After Done` },
         { name: `Can I Ping Staff?`, value: `Yes you can Ping Staff If they are in it and they do not respond! To the Responce` },
         { name: `When will it Be Done?`, value: `You can click \`End Conversation\` To end it or After 2 Hours it Will Delete all Messages and Send Trascript to you and the Claimed User` }
    ])
      .setColor("Green")
      .setFooter({text: `[OFFICAL] Ask Staff System | Made by Roverdev`, iconURL: `https://i.imgur.com/2Pi6JG2.png`})
     .setTimestamp()
    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
     .setCustomId('Start Conversation')
     .setEmoji(`1060354207984664697`)
     .setLabel(`Start Conversation`)
     .setDisabled(false)
     .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
     .setCustomId('Staff-Claim')
     .setEmoji(`1010018063497826415`)
     .setLabel(`Staff-Claim`)
     .setDisabled(true)
     .setStyle(ButtonStyle.Success),
     new ButtonBuilder()
     .setCustomId('End Conversation')
     .setEmoji(`1060354206499864646`)
     .setLabel(`End Conversation`)
     .setDisabled(true)
     .setStyle(ButtonStyle.Danger),
    )
    await message.channel.send({
     embeds: [embed],
     components: [row],
     
   })
   }
}