const configuration = require('../../../configuration')
module.exports = {
  name: "ping",
  category: "information",
  cooldown: 2,
  Description: "",
  RunCommand: async (Rover, message, args, executor, language, embed, database) => {

    message.reply({
      embeds: [
        embed.setColor(configuration[Rover.user.id]["EmbedColors"]["Pending"]).setTitle(`${language["text1"]}`)
      ]
    }).then((msg) => {
      msg.edit({
        embeds: [
          embed.setColor(configuration[Rover.user.id]["EmbedColors"]["Success"]).setTitle(`${language["text2"]} \`${Rover.ws.ping}ms\``)
        ]
      })
    })
  }
}