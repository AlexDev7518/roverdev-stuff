const { EmbedBuilder } = require("discord.js")

module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
    const {CommandCooldown, msToMinutes} = require('discord-command-cooldown');
    const ms = require('ms');
    
    client.economy.ensure(`economy.${message.author.id}`,{
      "pocket": 0,
      "bank": 0,
      "cooldown_cmd":[],
      "amount_cmd":[],
      "item":{}
  })
  client.economy.ensure(`economy.${message.author.id}`,{
    "command": "",
    "length": 0
  },`cooldown_cmd`)

    const moneycooldown = new CommandCooldown('worker', ms('30min'));
    const userCooldowned = await moneycooldown.getUser(message.author.id); 
    if(userCooldowned){
        const timeLeft = msToMinutes(userCooldowned.msLeft, false)
        let ms_min = ms(`${timeLeft.minutes}min`)
        let ms_s = ms(`${timeLeft.seconds}s`)
        var time_when_end =(parseInt(+new Date()) + ms_min + ms_s)
    message.reply({embeds:
      [new EmbedBuilder()
        .setAuthor({ name: `${client.user.username} | Economy Bot`, iconURL: "https://i.imgur.com/GVk1pgk.gif" })
        .setColor("#DEC20B")
        .setDescription(`You have to wait (<t:${Math.round(time_when_end / 1000)}:R> | <t:${Math.round(time_when_end / 1000)}:t>) before you can work again`)]})
    } else {

let random_money = getRandomArbitrary(100,250)

client.economy.math(`economy.${message.author.id}`,"+",Math.round(random_money),"pocket")

message.reply({embeds:[
    new EmbedBuilder()
    .setColor("Yellow")
    .setAuthor({ name: `${client.user.username} | Economy Bot`, iconURL: "https://i.imgur.com/GVk1pgk.gif" })
    .setDescription(`You successfully worked and you got a paycheck of \`${Math.round(random_money)}$\``)
]})

client.economy.push(`economy.${message.author.id}`,{
  "command": "work",
  "length": Math.round((parseInt(+new Date()) + ms("30min")) / 1000)
},`cooldown_cmd`)
 await moneycooldown.addUser(message.author.id); 
    }
    
    

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
      }
}
module.exports.slashRun = async (interaction, client) => {
  await interaction.deferReply({ephemeral:true})
  const {CommandCooldown, msToMinutes} = require('discord-command-cooldown');
  const ms = require('ms');
  
  client.economy.ensure(`economy.${interaction.member.user.id}`,{
    "pocket": 0,
    "bank": 0,
    "cooldown_cmd":[],
    "amount_cmd":[],
    "item":{}
})
client.economy.ensure(`economy.${interaction.member.user.id}`,{
  "command": "",
  "length": 0
},`cooldown_cmd`)
  const moneycooldown = new CommandCooldown('worker', ms('30min'));
  const userCooldowned = await moneycooldown.getUser(interaction.member.user.id); 
  if(userCooldowned){
      const timeLeft = msToMinutes(userCooldowned.msLeft, false)
      let ms_min = ms(`${timeLeft.minutes}min`)
      let ms_s = ms(`${timeLeft.seconds}s`)
      var time_when_end =(parseInt(+new Date()) + ms_min + ms_s)
  interaction.editReply({embeds:[
    new EmbedBuilder()
    .setAuthor({ name: `${client.user.username} | Economy Bot`, iconURL: "https://i.imgur.com/GVk1pgk.gif" })
    .setColor("#DEC20B")
    .setDescription(`You have to wait (<t:${Math.round(time_when_end / 1000)}:R> | <t:${Math.round(time_when_end / 1000)}:t>) before you can work again`)]})
  } else {

let random_money = getRandomArbitrary(100,250)

client.economy.math(`economy.${interaction.member.user.id}`,"+",Math.round(random_money),"pocket")

interaction.editReply({embeds:[
  new EmbedBuilder()
  .setColor("Yellow")
  .setDescription(`You successfully worked and you got a paycheck of \`${Math.round(random_money)}$\``)
]})
client.economy.push(`economy.${interaction.member.user.id}`,{
  "command": "work",
  "length": Math.round((parseInt(+new Date()) + ms("30min")) / 1000)
},`cooldown_cmd`)
await moneycooldown.addUser(interaction.member.user.id); 
  }
  
  

  function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
}

module.exports.conf = {
     Prefix: {
        aliases: [""],
        enabled: true,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: [],
         cooldown:"5s"
     },
     Slash: {
        enabled: true,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: [],
        timeout: 5,
     }
}

module.exports.help = {
      Prefix: {
        name: "work",
        category: "economy",
        cooldown: 2,
        usage: "work",
        description: "Work for money (every 30min)",
      },
      Slash: {
        name: "work",
        description: "Work for money (every 30min)",
        category: "economy",
      }
}