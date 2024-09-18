const { EmbedBuilder } = require("discord.js")

module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
    const {CommandCooldown, msToMinutes} = require('discord-command-cooldown');
    const ms = require('ms');
    
    client.economy.ensure(`economy.${message.author.id}`,{
      "pocket": 0,
      "bank": 0,
      "cooldown_cmd":[],
      "amount_cmd":[],
      "item":{} // check discord ok
  })

  client.economy.ensure(`economy.${message.author.id}`,{
    "command": "",
    "length": 0
  },`cooldown_cmd`)

    const moneycooldown = new CommandCooldown('dailyer', ms('24h'));
    const userCooldowned = await moneycooldown.getUser(message.author.id); 
    if(userCooldowned){
        const timeLeft = msToMinutes(userCooldowned.msLeft, false)
        let ms_h = ms(`${timeLeft.hours}h`)
        let ms_min = ms(`${timeLeft.minutes}min`)
        let ms_s = ms(`${timeLeft.seconds}s`)
        var time_when_end =(parseInt(+new Date()) + ms_min + ms_s + ms_h)

    message.reply({embeds:[
      new EmbedBuilder()
      .setAuthor({ name: `${client.user.username} | Economy Bot`, iconURL: "https://i.imgur.com/GVk1pgk.gif" })
      .setColor("#DEC20B")
      .setDescription(`You have to wait (<t:${Math.round(time_when_end / 1000)}:R> | <t:${Math.round(time_when_end / 1000)}:t>) before you can get your daily check again.`)]})
    } else {

let random_money = getRandomArbitrary(750,1500)

client.economy.math(`economy.${message.author.id}`,"+",Math.round(random_money),"bank")

message.reply({embeds:[
    new EmbedBuilder()
    .setAuthor({ name: `${client.user.username} | Economy Bot`, iconURL: "https://i.imgur.com/GVk1pgk.gif" })
    .setColor("Yellow")
    .setDescription(`You successfully got your daily check and received \`${Math.round(random_money)}$\``)
]})

client.economy.push(`economy.${message.author.id}`,{
  "command": "daily",
  "length": Math.round((parseInt(+new Date()) + ms("24h")) / 1000)
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
    "cooldown_cmd":[
    ],
    "amount_cmd":[],
    "item":{}
})


client.economy.ensure(`economy.${interaction.member.user.id}`,{
  "command": "",
  "length": 0
},`cooldown_cmd`)

  const moneycooldown = new CommandCooldown('dailyer', ms('24h'));
  const userCooldowned = await moneycooldown.getUser(interaction.member.user.id); 
  if(userCooldowned){
      const timeLeft = msToMinutes(userCooldowned.msLeft, false)
      let ms_h = ms(`${timeLeft.hours}h`)
      let ms_min = ms(`${timeLeft.minutes}min`)
      let ms_s = ms(`${timeLeft.seconds}s`)
      var time_when_end =(parseInt(+new Date()) + ms_min + ms_s + ms_h)

  interaction.editReply({embeds:[
    new EmbedBuilder()
    .setAuthor({ name: `${client.user.username} | Economy Bot`, iconURL: "https://i.imgur.com/GVk1pgk.gif" })
    .setColor("Yellow")
    .setDescription(` You have to wait (<t:${Math.round(time_when_end / 1000)}:R> | <t:${Math.round(time_when_end / 1000)}:t>) before you can get your daily check again.`)]})
  
} else {

let random_money = getRandomArbitrary(750,1500)

client.economy.math(`economy.${interaction.member.user.id}`,"+",Math.round(random_money),"pocket")

interaction.editReply({embeds:[
  new EmbedBuilder()
  .setColor("Yellow")
  .setAuthor({ name: `${client.user.username} | Economy Bot`, iconURL: "https://i.imgur.com/GVk1pgk.gif" })
  .setDescription(`You successfully got your daily check and received \`${Math.round(random_money)}$\``)
]})

client.economy.push(`economy.${interaction.member.user.id}`,{
  "command": interaction.commandName,
  "length": Math.round((parseInt(+new Date()) + ms("24h")) / 1000)
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
        cooldown:"10s"
     },
     Slash: {
        enabled: true,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: [],
        cooldown: "4s",
     }
}

module.exports.help = {
      Prefix: {
        name: "daily",
        category: "economy",
        cooldown: 2,
        usage: "work",
        description: "daily money (every 24h mins)",
      },
      Slash: {
        name: "daily",
        description: "daily money (every 24h mins)",
        category: "economy",
      }
}