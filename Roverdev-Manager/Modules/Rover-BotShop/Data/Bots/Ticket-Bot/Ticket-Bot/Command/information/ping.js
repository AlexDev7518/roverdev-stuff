const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js")

module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
    const msgId = await message.reply('🏓 Pong!')
    const embed = new EmbedBuilder()
    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    .setColor('Random')
    .setTimestamp()
  .setColor("#00FFFF")
    .setDescription(`**Time:** ${Math.floor(msgId.createdTimestamp - message.createdTimestamp)} ms\n**API Ping:** ${client.ws.ping} ms`)
    msgId.edit({ embeds: [embed], content: `<@${message.author.id}>` })
}
module.exports.slashRun = async (interaction, client) => {
    await interaction.reply('🏓 Pong!')
    const msg = await interaction.fetchReply()
    const embed = new EmbedBuilder()
    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    .setColor('Random')
    .setTimestamp()
  .setColor("#00FFFF")
    .setDescription(`**Time:** ${Math.floor(msg.createdTimestamp - interaction.createdTimestamp)} ms\n**API Ping:** ${client.ws.ping} ms`)
    interaction.editReply({ embeds: [embed], content: `<@${interaction.user.id}>` })
}

module.exports.conf = {
     Prefix: {
        aliases: ["latency"],
        enabled: true,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: []   
     },
     Slash: {
        enabled: true,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: [],
        timeout: 50,
     }
}

module.exports.help = {
      Prefix: {
        name: "ping",
        category: "information",
        cooldown: 2,
        usage: "ping",
        description: "Bot Ping",
      },
      Slash: {
        name: "ping",
        description: "Get bot speed",
        category: "information",
      }
}