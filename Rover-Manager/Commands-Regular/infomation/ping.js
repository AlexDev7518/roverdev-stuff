const { EmbedBuilder } = require("discord.js")

module.exports.run = async (client, message, args, cmdUser,prefix) => {
    const embed = new EmbedBuilder()
    .setTitle(`Pinging / Geting Stats of  bot...`)
    .setColor("Yellow")
    message.reply({embeds: [embed]}).then((msg) => {
        setTimeout(() => {
          msg.edit(
              {
                  embeds: [
                      new EmbedBuilder()
                      .setTitle(`Bot Manager | Uptime: : <t:${Math.floor(Date.now() / 1000 - client.uptime / 1000)}:R>`)
                      .setDescription(`
\`\`\`md
# Bot Ping: ${Math.round(client.ws.ping)}ms
# Discord API Ping: ${message.createdTimestamp - message.createdTimestamp}ms
\`\`\`
                      `)
                      .setFooter({ text: `${client.user.username} | Hosting: Bero-host.de` })
                      .setColor("#3dbeff")
                  ]
              }
          )
        }, 800);
    })    
}

module.exports.conf = {
    aliases: ["latency"],
    enabled: true,
    ownerOnly: false,
    AdminOnly: false,
    userPermissions: []
}

module.exports.help = {
      Roverdev: {
        name: "ping",
        category: "infomation",
        cooldown: 2,
        usage: "ping",
        description: "Bot Ping",
        guildOnly: false,
      }
}