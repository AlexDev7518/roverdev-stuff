const { EmbedBuilder } = require("discord.js")
const { Prefix } = require("../../config/config")

module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
  const ms = require("ms")
  let calc_up = +new Date()- parseInt(client.uptime)
   let helpembed =  new EmbedBuilder()
   .setColor("Yellow")
   .setThumbnail(client.user.displayAvatarURL())
   .setTitle(client.user.username+" 🤖 Uptime")
   .setDescription(`**Went online:**\n>>> <t:${(Math.round(parseInt(calc_up)/ 1000))}:R>`)
  
  
  message.reply({embeds:[
   helpembed
  ]})
 

}
module.exports.slashRun = async (interaction, client) => {
 await interaction.deferReply({ephemeral:true})

 const ms = require("ms")
let calc_up = +new Date()- parseInt(client.uptime)
 let helpembed =  new EmbedBuilder()
 .setColor("Yellow")
 .setThumbnail(client.user.displayAvatarURL())
 .setTitle(client.user.username+" 🤖 Uptime")
 .setDescription(`**Went online:**\n>>> <t:${(Math.round(parseInt(calc_up)/ 1000))}:R>`)


interaction.editReply({embeds:[
 helpembed
]})

}

module.exports.conf = {
     Prefix: {
        aliases: ["up","online"],
        enabled: true,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: [],
        cooldown: "3s"
     },
     Slash: {
        enabled: true,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: [],
        timeout: 3
     }
}

module.exports.help = {
      Prefix: {
        name: "uptime",
        category: "information",
        cooldown: 2,
        usage: "help",
        description: "Get uptime of bot",
        guildOnly: false,
      },
      Slash: {
        name: "uptime",
        description: "Get uptime of bot",
        category: "information",
      }
}

  // client.container.commands.filter(c=>c.help.Prefix.category=== category).forEach(command => {
  //   if (commands.length > 0) {
  //      embed2.addFields(
  //       {name:`Prefix - ${command.help.Prefix.name}`,value:`${command.conf.Prefix.enabled == true?"✔":"❎"}`}
  //      )
  //   }
  // })
  // // I fixed it btw
  //  client.container.slash.filter(c=>c.help.Slash.category=== category).forEach(command => {
  //         if (commands.length > 0) {
  //           embed2.addFields(
  //             {name:`Slash - ${command.help.Slash.name}`,value:`${command.conf.Slash.enabled == true?"✔":"❎"}`}
  //            )
  //         }
  //  })
   
  //  if (commands.length > 0) {
  //   swapembeds.push(embed2)
   // }