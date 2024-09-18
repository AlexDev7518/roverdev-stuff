module.exports = {
      cooldown: 2,
      Description: "",
     CommandRun: async (Rover, message, args, executor, language, emoji, embed, database) => {

       message.reply({ embeds: [
         embed.setColor("Aqua").setTitle(`${language["text1"]}`)
   ] })

     }
}