const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js")
const { TicketOptions } = require("../../../Configuration/TicketSystem/TicketConfig")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
    const embed = new EmbedBuilder()
    .setAuthor({ name: `Ticket System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() })
    .setThumbnail(Roverdev.user.displayAvatarURL())
    .setImage("https://i.imgur.com/qx9vpAl.png")
    .setColor("#3dbeff")
    .setDescription(`Welcome to Roverdev's Ticket Support System!\n> Click Bellow to Open a Ticket\n\nCurrent Options:\n${TicketOptions.map(option => `> ${option.label}`).join("\n")}\n\n__***Ticket Rules:***__\n> Don't Spam Your Ticket\n> Don't Spam Ping a Staff\n> Don't Open a Ticket For Coding Support\n> Don't Open a Ticket For No Reason`)

    const row1 = new ActionRowBuilder()
    .addComponents(
          new StringSelectMenuBuilder()
          .setCustomId("Ticket-System")
          .setPlaceholder("Click me to Open a Ticket")
          .addOptions(
             TicketOptions.map(bots => {
                     return {
                            label: bots.label,
                            value: bots.value,
                            description: bots.description,
                            emoji:bots.emoji
                     }
              })
          )
    )
    message.channel.send({ embeds: [embed], components: [row1] }).then((msg) => {
          msg.edit({
                embeds: [embed.setImage("https://i.imgur.com/qx9vpAl.png")]
          })
    })
   }
}