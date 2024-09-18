const Discord = require('discord.js')
const { BotPrefix } = require('../../../Configuration/BotConfig')
module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
    let code = args.join(" ")
    if(!args[0]) return message.reply({embeds:[new Discord.EmbedBuilder().setColor("Red").setDescription(`You have to provide atleast **1** argument to use this`)]})
  try{
  let evaled = eval(code)
  
  const {
      inspect
    } = require(`util`);
  
    let string = inspect(evaled);
    if(string.includes(Roverdev.token)) return message.reply({content:`It looks like, the bot token is presented in here, I won't show you it.`})
  //if(string.includes(client.token)) return interaction.editReply({content:`You dumb on purpose? I will never give you my token you stupid ass bitch.`})
  
  message.reply({content:`**The result of the evaluation:**`,files: [new Discord.AttachmentBuilder(Buffer.from(`${require('util').inspect(evaled)}`), {name:'eval.json'})],embeds:[new Discord.EmbedBuilder()
  .setColor("Yellow")
  .setTitle(`Evaluation`)
  .setDescription(`**The code:**\n \`\`\`\n${BotPrefix}eval ${code}\n\`\`\`\n\n**Type of result:** \`${typeof(evaled)}\``)
  
  ]})
  }catch(e){
  message.reply({content:`**The result of the evaluation:**`,files: [new Discord.AttachmentBuilder(Buffer.from(`${require('util').inspect(e)}`), {name:'eval.json'})],embeds:[new Discord.EmbedBuilder()
      .setColor("Yellow")
      .setTitle(`Evaluation`)
    .setDescription(`**The code:**\n \`\`\`\n${BotPrefix}eval ${code}\n\`\`\`\n\n**Type of result:** \`${typeof(e)}\``)
  
  ]}) 
  }
   }
}