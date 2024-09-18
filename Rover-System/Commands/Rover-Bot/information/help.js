module.exports = {
  name: "ping",
  category: "information",
  cooldown: 2,
  Description: "",
  RunCommand: async (Rover, message, args, executor, language, embed, database) => {
           return message.reply({ content: `This command is still in work...` })
  }
}