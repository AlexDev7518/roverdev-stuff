const { EmbedBuilder } = require("discord.js")
const Discord = require("discord.js")
module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
  
  client.economy.ensure(`economy.${message.author.id}`,{
    "pocket": 0,
    "bank": 0,
    "cooldown_cmd":[],
    "amount_cmd":[],
    "item":{}
})

let amount = args[0]
if(!amount)  return message.reply({embeds:[new EmbedBuilder().setColor("Red").setDescription(`You have to provide atleast **1** argument to use this`)]})
let profile = client.economy.get(`economy.${message.author.id}`)
if(amount.toLowerCase() == "all"){
client.economy.math(`economy.${message.author.id}`,"+",profile.bank,"pocket")
client.economy.set(`economy.${message.author.id}`,0,"bank")

message.reply({embeds:[new EmbedBuilder().setColor("Yellow").setDescription(`I successfully withdrawed \`${profile.bank}$\` to your pocket.`)]})
}else{
  let amounto = parseInt(amount);
  if(isNaN(amount) == true ||amounto <= 0) return message.reply({embeds:[new EmbedBuilder().setColor("Red").setDescription(`You can't withdraw this, either the amount isn't a number or it is 0 or less`)]})

if(amounto > profile.bank) return message.reply({embeds:[new EmbedBuilder().setColor("Red").setDescription(`You can't withdraw more than you have in your bank`)]})

client.economy.math(`economy.${message.author.id}`,"+",amounto,"pocket")
client.economy.math(`economy.${message.author.id}`,"-",amounto,"bank")

message.reply({embeds:[new EmbedBuilder().setColor("Yellow").setDescription(`Added \`${amounto}$\` to your pocket.\n> You now have \`${profile.pocket + amounto}$\` in your pocket.`)]})

}
}
module.exports.slashRun = async (interaction, client) => {
  await interaction.deferReply({ephemeral:true})
  
  client.economy.ensure(`economy.${interaction.member.user.id}`,{
    "pocket": 0,
    "bank": 0,
    "cooldown_cmd":[],
    "amount_cmd":[],
    "item":{}
})

let amount = interaction.options.getString("amount")
let profile = client.economy.get(`economy.${interaction.member.user.id}`)
if(amount.toLowerCase() == "all"){
client.economy.math(`economy.${interaction.member.user.id}`,"+",profile.bank,"pocket")
client.economy.set(`economy.${interaction.member.user.id}`,0,"bank")

interaction.editReply({embeds:[new EmbedBuilder().setColor("Yellow").setDescription(`I successfully withdrawed \`${profile.bank}$\` to your pocket.`)]})
}else{
  let amounto = parseInt(amount);
  if(isNaN(amount) == true ||amounto <= 0) return interaction.editReply({embeds:[new EmbedBuilder().setColor("Red").setDescription(`You can't withdraw this, either the amount isn't a number or it is 0 or less`)]})

if(amounto > profile.bank) return interaction.editReply({embeds:[new EmbedBuilder().setColor("Red").setDescription(`You can't withdraw more than you have in your bank`)]})

client.economy.math(`economy.${interaction.member.user.id}`,"+",amounto,"pocket")
client.economy.math(`economy.${interaction.member.user.id}`,"-",amounto,"bank")

interaction.editReply({embeds:[new EmbedBuilder().setColor("Yellow").setDescription(`Added \`${amounto}$\` to your pocket.\n> You now have \`${profile.pocket + amounto}$\` in your pocket.`)]})

}
}
module.exports.conf = {
     Prefix: {
        aliases: ["with"],
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
        name: "withdraw",
        category: "economy",
        cooldown: 2,
        usage: "withdraw <Amount / All>",
        description: "Allows you to withdraw a specific amount or everything from your Bank",
      },
      Slash: {
        name: "withdraw",
        description: "Allows you to withdraw a specific amount or everything from your Bank",
        category: "withdraw <Amount / All>",
        options: [
          {
             name: `amount`,
             description: `Amount / All`,
             type: Discord.ApplicationCommandOptionType.String,
             required: true,
          }
     ],
      }
}