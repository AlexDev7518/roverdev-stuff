const { EmbedBuilder,ApplicationCommandOptionType } = require("discord.js")

const Discord = require("discord.js")
module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {

      let code = args.join(" ")
      if(!args[0]) return message.reply({embeds:[new EmbedBuilder().setColor("Red").setDescription(`You have to provide atleast **1** argument to use this`)]})
try{
    let evaled = eval(code)

    const {
        inspect
      } = require(`util`);

      let string = inspect(evaled);
      if(string.includes(client.token)) return message.reply({content:`It looks like, the bot token is presented in here, I won't show you it.`})
//if(string.includes(client.token)) return interaction.editReply({content:`You dumb on purpose? I will never give you my token you stupid ass bitch.`})

message.reply({content:`**The result of the evaluation:**`,files: [new Discord.AttachmentBuilder(Buffer.from(`${require('util').inspect(evaled)}`), {name:'eval.json'})],embeds:[new Discord.EmbedBuilder()
    .setColor("Yellow")
    .setTitle(`Evaluation`)
  .setDescription(`**The code:**\n \`\`\`\n!eval ${code}\n\`\`\`\n\n**Type of result:** \`${typeof(evaled)}\``)

]})
}catch(e){
    message.reply({content:`**The result of the evaluation:**`,files: [new Discord.AttachmentBuilder(Buffer.from(`${require('util').inspect(e)}`), {name:'eval.json'})],embeds:[new Discord.EmbedBuilder()
        .setColor("Yellow")
        .setTitle(`Evaluation`)
      .setDescription(`**The code:**\n \`\`\`\n!eval ${code}\n\`\`\`\n\n**Type of result:** \`${typeof(e)}\``)
    
    ]}) 
}

}
module.exports.slashRun = async (interaction, client) => {
    await interaction.deferReply({ephemeral:true})
    let code = interaction.options.getString("eval_code")
try{
    let evaled = eval(code)

    const {
        inspect
      } = require(`util`);

      let string = inspect(evaled);
      
if(string.includes(client.token)) return interaction.editReply({content:`It looks like, the bot token is presented in here, I won't show you it.`})

interaction.editReply({content:`**The result of the evaluation:**`,files: [new Discord.AttachmentBuilder(Buffer.from(`${require('util').inspect(evaled)}`), {name:'eval.json'})],embeds:[new Discord.EmbedBuilder()
    .setColor("Yellow")
    .setTitle(`Evaluation`)
  .setDescription(`**The code:**\n \`\`\`\n/eval code:${code}\n\`\`\`\n\n**Type of result:** \`${typeof(evaled)}\``)

]})
}catch(e){
    interaction.editReply({content:`**The result of the evaluation:**`,files: [new Discord.AttachmentBuilder(Buffer.from(`${require('util').inspect(e)}`), {name:'eval.json'})],embeds:[new Discord.EmbedBuilder()
        .setColor("Yellow")
        .setTitle(`Evaluation`)
      .setDescription(`**The code:**\n \`\`\`\n/eval code:${code}\n\`\`\`\n\n**Type of result:** \`${typeof(e)}\``)
    
    ]}) 
}
}

module.exports.conf = {
     Prefix: {
        aliases: ["h"],
        enabled: true,
        ownerOnly: true,
        AdminOnly: false,
        userPermissions: []   
     },
     Slash: {
        enabled: true,
        ownerOnly: true,
        AdminOnly: false,
        userPermissions: [],
        timeout:2.5,
     }
}

module.exports.help = {
      Prefix: {
        name: "eval",
        category: "owner",
        cooldown: 4,
        usage: "eval <code>",
        description: "Eval a code",
        guildOnly: false,
      },
      Slash: {
        name: "eval",
        description: "Eval a code",
        category: "owner",
        options: [
            {
               name: `eval_code`,
               description: `The eval code`,
               type: ApplicationCommandOptionType.String,
               required: true,
            }
       ],
      }
}