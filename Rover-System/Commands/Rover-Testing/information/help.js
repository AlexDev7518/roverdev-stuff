const { EmbedBuilder } = require("discord.js")
const configuration = require("../../../configuration")

module.exports = {
  name: "help",
  category: "information",
  cooldown: 2,
  Description: "",
  RunCommand: async (Rover, message, args, executor, language, embed, database) => {

            console.log(Rover.container.CommandCategorys)

           const embed1 = new EmbedBuilder(configuration[Rover.user.id]["EmbedConfig"])
           .setDescription(`> ***Hey \`${executor.user.username}\` Welcome to \`${Rover.user.username}\` Help Menu, Here is some information below:***\n**Command Categorys:**\n> ${Rover.container.CommandCategorys.map(m => `${m} `).join("\n> ")}`)

           message.reply({ embeds: [embed1] })
           
           
  }
}