const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports.run = async (client, message, args, cmdUser,prefix) => {

    const embed = new EmbedBuilder()
    .setAuthor({ name: `${message.guild.name} Ticket System`, iconURL: client.user.displayAvatarURL() })
    .setColor("#3dbeff")
    .setDescription(`Please Don't Open a ticket For Fun or you will get a Warning!\n> If you Open a ticket and leave the server the ticket will automaticly Close`)
    .addFields([
         { name: `Support Ticket`, value: `Support Ticket is Where you can get support from a staff member of our Team!` },
         { name: `Claim Ticket`, value: `Claim Ticket is Where you can Get Like a Giveaway Prize or a Bot or Booster Perks!` },
         { name: `Apply Ticket`, value: `Apply Ticket is where you can Apply For Staff in Roverdev!` }
    ])
    .setFooter({ text: `Made By: Roverdev | Hosting: ovhcloud.com` })
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()

    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setCustomId(`Ping-Before`)
      .setLabel(`Ping me Before`)
      .setStyle(ButtonStyle.Success)
      .setEmoji(`1006056107367735327`),
      new ButtonBuilder()
      .setCustomId(`Support-Ticket`)
      .setLabel(`Support Ticket`)
      .setStyle(ButtonStyle.Secondary)
      .setEmoji(`1005732010880413726`),
      new ButtonBuilder()
      .setCustomId(`Claim-Ticket`)
      .setLabel(`Claim Ticket`)
      .setStyle(ButtonStyle.Secondary)
      .setEmoji(`1005732010880413726`),
      new ButtonBuilder()
      .setCustomId(`Apply-Ticket`)
      .setLabel(`Apply Staff Ticket`)
      .setStyle(ButtonStyle.Secondary)
      .setEmoji(`1005732010880413726`),
    )

    const TicketChannel = client.channels.cache.get(client.config.Channels.TicketChannel)

    TicketChannel.send({embeds: [embed], components: [row]}).then((msg) => {
            client.settings.set(message.guild.id, msg.id, "TicketSetup.Message")
            client.settings.set(message.guild.id, msg.channel.id, "TicketSetup.Channel")
    })

    message.reply({content: `${client.config.Emojis.Accepted} Successfully Setup the Ticket System.`})

}

module.exports.conf = {
   aliases: ["setup-ticket"],
   enabled: true,
   ownerOnly: true,
   AdminOnly: false,
   userPermissions: [""]
}

module.exports.help = {
  Roverdev: {
      name: "setup-ticket",
      description: "Setup the Ticket System",
      timeout: 5000,
      category: "setup",
    }
}