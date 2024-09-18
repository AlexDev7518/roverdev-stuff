const Discord = require('discord.js')
const cp = require("child_process")
const { ApplicationCommandType, ApplicationCommandOptionType, ChannelType } = require('discord.js');

module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
  let code = args.join(" ")
  if(!args[0]) return message.reply({embeds:[new Discord.EmbedBuilder().setColor("Red").setDescription(`You have to provide atleast **1** argument to use this`)]})
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
.setDescription(`**The code:**\n \`\`\`\n${prefix}eval ${code}\n\`\`\`\n\n**Type of result:** \`${typeof(evaled)}\``)

]})
}catch(e){
message.reply({content:`**The result of the evaluation:**`,files: [new Discord.AttachmentBuilder(Buffer.from(`${require('util').inspect(e)}`), {name:'eval.json'})],embeds:[new Discord.EmbedBuilder()
    .setColor("Yellow")
    .setTitle(`Evaluation`)
  .setDescription(`**The code:**\n \`\`\`\n${prefix}eval ${code}\n\`\`\`\n\n**Type of result:** \`${typeof(e)}\``)

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
      
if (string.includes(client.token)) return interaction.editReply({content:`You dumb on purpose? I will never give you my token you stupid ass bitch.`})

interaction.editReply({content:`**The result of the evaluation:**`,files: [new Discord.AttachmentBuilder(Buffer.from(`${require('util').inspect(evaled)}`), {name:'eval.json'})],embeds:[new Discord.EmbedBuilder()
    .setColor("#3dbeff")
    .setTitle(`Evaluation`)
  .setDescription(`**The code:**\n \`\`\`\n/eval code:${code}\n\`\`\`\n\n**Type of result:** \`${typeof(evaled)}\``)

]})
}catch(e){
    interaction.editReply({content:`**The result of the evaluation:**`,files: [new Discord.AttachmentBuilder(Buffer.from(`${require('util').inspect(e)}`), {name:'eval.json'})],embeds:[new Discord.EmbedBuilder()
        .setColor("#3dbeff")
        .setTitle(`Evaluation`)
      .setDescription(`**The code:**\n \`\`\`\n/eval code:${code}\n\`\`\`\n\n**Type of result:** \`${typeof(e)}\``)
    
    ]}) 
}
}

module.exports.conf = {
     Prefix: {
        aliases: [],
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
        timeout: 5,
     }
}

module.exports.help = {
      Prefix: {
        name: "eval",
        category: "developers",
        cooldown: 2,
        usage: "eval <code>",
        description: "Eval The bot Code",
      },
      Slash: {
        name: "eval",
        description: "Eval The bot Code",
        timeout: 5,
        category: "developers",
        options: [
             {
                name: `eval_code`,
                description: `Put your Code to Eval Here.`,
                type: ApplicationCommandOptionType.String,
                required: true,
             }
        ],
      }
}