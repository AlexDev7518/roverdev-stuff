const { EmbedBuilder } = require("discord.js")
const { Prefix } = require("../../config/config")
const Discord = require("discord.js")
module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
  let emojis = {
   "Information": "ℹ",
   "Owner": "⚒",
   "Economy": "💲"
   }
 
 let cat_slash = args[0]
 if(!cat_slash){
 let list = []
 
 client.categories.forEach((category) => {
   let everything = ({
     label: `${capitalizeFirstLetter(category)}`, 
     value: `category_${category}`, 
     description: `‖ Get all prefix and slash commands`,
     emoji:`${emojis[capitalizeFirstLetter(category)] == undefined?"❓":emojis[capitalizeFirstLetter(category)]}`
   })
   list.push(everything)
 })
 
 let select_menu = new Discord.SelectMenuBuilder()
 .setCustomId("menus")
 .setPlaceholder("Select a category")
 .addOptions(list)
 
 const row = new Discord.ActionRowBuilder()
     .addComponents([
         select_menu
     ])
 
 let cat_list = []
     client.categories.forEach(async(category) => {
       cat_list.push(`**${emojis[capitalizeFirstLetter(category)]} | ${capitalizeFirstLetter(category)}**\n> !help ${category}`)
     })
 let helpmenu_start = new Discord.EmbedBuilder() 
 .setColor("Yellow")
 .setThumbnail(message.guild.iconURL({dynamic:true}))
  .setTitle(message.guild.name+" | Helpmenu ⚒")
  .setDescription(`__**Thanks for using me, this is the \`Regular Economy\` Bot, made by [Roverdev](https://discord.gg/roverdev)**__\n*This bot was made by: \`AlexDev#7518 Chauvin#4522 j0nibaer#7223\`*\n${cat_list.join("\n\n")}`)
 
 let m = await message.reply({components:[row],embeds:[helpmenu_start]})
 
 const collector = m.createMessageComponentCollector({ 
   filter: i => i?.isSelectMenu() && i?.member.user.id !== client.user.id && i?.user,
   time: 60000
 })
 
 collector.on("collect", async(button) => {
         
   if(button?.user.id == message.author.id){
     let category = button.values[0].split("_")[1]
     let c_cmd = []
 let c_slash = []
 
     client.container.commands.filter(c=>c.help.Prefix.category=== category).forEach(command => {
       c_cmd.push(`${command.help.Prefix.name}\n**-** ${command.conf.Prefix.enabled == true?"<:online:1015780431725088868> Enabled":"<:offline:1015780440650559580> Disabled"}`)
 })
 client.container.slash.filter(c=>c.help.Prefix.category=== category).forEach(command => {
   c_slash.push(`${command.help.Slash.name}\n**-** ${command.conf.Slash.enabled == true?"<:online:1015780431725088868> Enabled":"<:offline:1015780440650559580> Disabled"}`)
 })
 
   button.update({embeds:[
     new Discord.EmbedBuilder()
     .setTitle(message.guild.name+" | "+capitalizeFirstLetter(category)+` ${emojis[capitalizeFirstLetter(category)]}`)
  .setColor("Yellow")
  .addFields(
   {name:`**🕳 | Slash cmds:**`,value:`>>> ${c_slash.join("\n")}`,inline:true},
   {name:`**🤖 | Prefix cmds:**`,value:`>>> ${c_cmd.join("\n")}`,inline:true}
  )
   ]})
 
   }else{
     button.reply({ephemeral:true,content:`**You aren't allowed to use this, only <@${message.author.id}> can**`})
   }
   })
 
 }else{
   let category = args[0]
     let c_cmd = []
 let c_slash = []
 
 let check = client.categories.includes(category.toLowerCase())
 
 if(check == false) return message.reply({content:`There is no category called \`${category}\``})
     client.container.commands.filter(c=>c.help.Prefix.category=== category).forEach(command => {
       c_cmd.push(`${command.help.Prefix.name}\n**-** ${command.conf.Prefix.enabled == true?"<:online:1015780431725088868> Enabled":"<:offline:1015780440650559580> Disabled"}`)
 })
 client.container.slash.filter(c=>c.help.Prefix.category=== category).forEach(command => {
   c_slash.push(`${command.help.Slash.name}\n**-** ${command.conf.Slash.enabled == true?"<:online:1015780431725088868> Enabled":"<:offline:1015780440650559580> Disabled"}`)
 })
 
   message.reply({embeds:[
     new Discord.EmbedBuilder()
     .setTitle(message.guild.name+" | "+capitalizeFirstLetter(category)+` ${emojis[capitalizeFirstLetter(category)]}`)
  .setColor("Yellow")
  .addFields(
   {name:`**🕳 | Slash cmds:**`,value:`>>> ${c_slash.join("\n")}`,inline:true},
   {name:`**🤖 | Prefix cmds:**`,value:`>>> ${c_cmd.join("\n")}`,inline:true}
  )
   ]})
 } 
 function capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
 }
 

}
module.exports.slashRun = async (interaction, client) => {
 await interaction.deferReply({ephemeral:true})
 let emojis = {
  "Information": "ℹ",
  "Owner": "⚒",
  "Economy": "💲"
  }

let cat_slash = interaction.options.getString("category")
if(!cat_slash){
let list = []

client.categories.forEach((category) => {
  let everything = ({
    label: `${capitalizeFirstLetter(category)}`, 
    value: `category_${category}`, 
    description: `‖ Get all prefix and slash commands`,
    emoji:`${emojis[capitalizeFirstLetter(category)] == undefined?"❓":emojis[capitalizeFirstLetter(category)]}`
  })
  list.push(everything)
})

let select_menu = new Discord.SelectMenuBuilder()
.setCustomId("menus")
.setPlaceholder("Select a category")
.addOptions(list)

const row = new Discord.ActionRowBuilder()
    .addComponents([
        select_menu
    ])

let cat_list = []
    client.categories.forEach(async(category) => {
      cat_list.push(`**${emojis[capitalizeFirstLetter(category)]} | ${capitalizeFirstLetter(category)}**\n> /help category:${category}`)
    })
let helpmenu_start = new Discord.EmbedBuilder() 
.setColor("Yellow")
.setThumbnail(interaction.guild.iconURL({dynamic:true}))
 .setTitle(interaction.guild.name+" | Helpmenu ⚒")
 .setDescription(`__**Thanks for using me, this is the \`Regular Economy\` Bot, made by [Roverdev](https://discord.gg/roverdev)**__\n*This bot was made by: \`AlexDev#7518 Chauvin#4522 j0nibaer#7223\`*\n${cat_list.join("\n\n")}`)

let m = await interaction.editReply({components:[row],embeds:[helpmenu_start]})

const collector = m.createMessageComponentCollector({ 
  filter: i => i?.isSelectMenu() && i?.member.user.id !== client.user.id && i?.user,
  time: 60000
})

collector.on("collect", async(button) => {
        
  if(button?.user.id == interaction.member.user.id){
    let category = button.values[0].split("_")[1]
    let c_cmd = []
let c_slash = []

    client.container.commands.filter(c=>c.help.Prefix.category=== category).forEach(command => {
      c_cmd.push(`${command.help.Prefix.name}\n**-** ${command.conf.Prefix.enabled == true?"<:online:1015780431725088868> Enabled":"<:offline:1015780440650559580> Disabled"}`)
})
client.container.slash.filter(c=>c.help.Prefix.category=== category).forEach(command => {
  c_slash.push(`${command.help.Slash.name}\n**-** ${command.conf.Slash.enabled == true?"<:online:1015780431725088868> Enabled":"<:offline:1015780440650559580> Disabled"}`)
})

  button.update({embeds:[
    new Discord.EmbedBuilder()
    .setTitle(interaction.guild.name+" | "+capitalizeFirstLetter(category)+` ${emojis[capitalizeFirstLetter(category)]}`)
 .setColor("Yellow")
 .addFields(
  {name:`**🕳 | Slash cmds:**`,value:`>>> ${c_slash.join("\n")}`,inline:true},
  {name:`**🤖 | Prefix cmds:**`,value:`>>> ${c_cmd.join("\n")}`,inline:true}
 )
  ]})

  }else{
    button.reply({ephemeral:true,content:`**You aren't allowed to use this, only <@${interaction.member.user.id}> can`})
  }
  })

}else{
  let category = interaction.options.getString("category")
    let c_cmd = []
let c_slash = []

let check = client.categories.includes(category.toLowerCase())

if(check == false) return interaction.editReply({content:`There is no category called \`${category}\``})
    client.container.commands.filter(c=>c.help.Prefix.category=== category).forEach(command => {
      c_cmd.push(`${command.help.Prefix.name}\n**-** ${command.conf.Prefix.enabled == true?"<:online:1015780431725088868> Enabled":"<:offline:1015780440650559580> Disabled"}`)
})
client.container.slash.filter(c=>c.help.Prefix.category=== category).forEach(command => {
  c_slash.push(`${command.help.Slash.name}\n**-** ${command.conf.Slash.enabled == true?"<:online:1015780431725088868> Enabled":"<:offline:1015780440650559580> Disabled"}`)
})

  interaction.editReply({embeds:[
    new Discord.EmbedBuilder()
    .setTitle(interaction.guild.name+" | "+capitalizeFirstLetter(category)+` ${emojis[capitalizeFirstLetter(category)]}`)
 .setColor("Yellow")
 .addFields(
  {name:`**🕳 | Slash cmds:**`,value:`>>> ${c_slash.join("\n")}`,inline:true},
  {name:`**🤖 | Prefix cmds:**`,value:`>>> ${c_cmd.join("\n")}`,inline:true}
 )
  ]})
} 
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


}

module.exports.conf = {
     Prefix: {
        aliases: ["h"],
        enabled: true,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: [],
        cooldown: "5sec"
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
        name: "help",
        category: "information",
        cooldown: 2,
        usage: "help",
        description: "Get all commands",
        guildOnly: false,
      },
      Slash: {
        name: "help",
        description: "Get all commands",
        category: "information",
        options: [
          {
             name: `category`,
             description: `The category you want to get the commands from`,
             type: Discord.ApplicationCommandOptionType.String,
             required: false,
          }
     ],
      }
}