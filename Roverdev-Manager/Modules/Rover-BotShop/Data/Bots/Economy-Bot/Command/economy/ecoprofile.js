
const { EmbedBuilder,ApplicationCommandOptionType,SelectMenuBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle } = require("discord.js")

module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

  client.economy.ensure(`economy.${member.user.id}`,{
    "pocket": 0,
    "bank": 0,
    "cooldown_cmd":[],
    "amount_cmd":[],
    "item":{}
  })
  let db = client.economy.get(`economy.${member.user.id}`)
  
  //get all items a user has
  
  let item_embeds = []
  let all_item_count = 0
  if(Object.keys(db.item).length != 0){
  for(const[keys,val] of Object.entries(db.item)){
  
    //create the embed for the item pagination
    let item_embed = new EmbedBuilder()
    .setColor("Yellow")
  .setTitle(`__Profile of **${member.user.tag}**__`)
  .setThumbnail(member.user.avatarURL({dynamic:true}))
    
  let lister = []
  for(const test of Object.entries(db.item[keys])){
  all_item_count += 1
  let get_shop = require("../../config/shop.json")
  let item = get_shop[keys].find(({name}) => name == test[0])
  lister.push(`${item.emoji} | This user has \`${test[1].amount}\` of \`${item.name}\`, this is worth \`${test[1].amount*item.price}$\``)
  }
  //item_msg.push(`__**${keys}:**__\n ${lister.join("\n")}`)
  
  item_embed.addFields(
    {name:`__**${keys}:**__`,value:`>>> ${lister.join("\n")}`}
  )
  
  item_embeds.push(item_embed)
  }
  }
  
  
  //get all cooldowns a user has
  let cool_content = []
  
  if(db.cooldown_cmd.length !== 0){
  db.cooldown_cmd.forEach((itemo) => {
    if(Math.round((+new Date()) / 1000) < itemo.length){
  cool_content.push(`Command: \`${itemo.command}\` | Time left: <t:${itemo.length}:R>`)
    }
  })
  }
  const row = new ActionRowBuilder()
      .addComponents(
        new SelectMenuBuilder()
          .setCustomId('Profile-Information')
          .setPlaceholder('Profile Information')
          .addOptions(
            {
              label: 'Profile',
              value: 'eco_profile',
              
            },
            {
              label:"Cooldowns",
              value:"eco_cool"
            },

         /*    {
              label: 'Balance & Usages',
              value: 'eco_bal',
              
            }, */

            {
              label: 'Items',
              value: 'eco_items',
            }
            ),
      );
  let eco_profile = new EmbedBuilder()
  .setAuthor({ name: `${client.user.username} | Economy Bot`, iconURL: "https://i.imgur.com/GVk1pgk.gif" })
  .setColor("Yellow")
  .setTitle(`__Profile of **${member.user.tag}**__`)
  .setThumbnail(member.user.avatarURL({dynamic:true}))
  .addFields([
  {name:`__Balance:__`,value:`**Pocket:** \`${db.pocket}$\`\n**Bank:** \`${db.bank}$\``,inline:true},
  {name:`__Items:__`,value:`**Amount:** \`${all_item_count}\``,inline:true}
  ])
  
  let eco_cool = new EmbedBuilder()
  .setAuthor({ name: `${client.user.username} | Economy Bot`, iconURL: "https://i.imgur.com/GVk1pgk.gif" })
  .setColor("Yellow")
  .setTitle(`__Profile of **${member.user.tag}**__`)
  .addFields(
  {name:`__Cooldowns:__`,value:`${cool_content.length !== 0?`>>> ${cool_content.join("\n")}`:"There are no cooldowns."}`}
  )
  let eco_items = item_embeds[0]
  
  let eco_bal = new EmbedBuilder()
  .setAuthor({ name: `${client.user.username} | Economy Bot`, iconURL: "https://i.imgur.com/GVk1pgk.gif" })
  .setColor("Yellow")
  .setTitle(`__Profile of **${member.user.tag}**__`)
  .setThumbnail(member.user.avatarURL({dynamic:true}))
  .setDescription(`Soon:tm:`)
  
  let me = await message.reply({embeds:[eco_profile],components:[row]})
  
  let collector = me.createMessageComponentCollector({time: 60000 });
  var currentPage = 0
  
  collector.on("collect" , async (b) => {
  if(b.isSelectMenu()){
              if(b.user.id !== message.author.id) return b.reply({content:`You can't use this, only \`${interaction.member.user.tag}\` can.`,ephemeral:true})         
              if(b.values[0] == "eco_items"){
             
              const button_row = new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                .setLabel("Back")
                .setStyle(ButtonStyle.Danger)
                .setEmoji("⬅️")
                .setCustomId("eco_Back")
                .setDisabled(false),
                new ButtonBuilder()
                .setLabel("Home")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("🏠")
                .setCustomId("eco_Home")
                .setDisabled(false),
                new ButtonBuilder()
                .setLabel("Forward")
                .setStyle(ButtonStyle.Success)
                .setEmoji("➡️")
                .setCustomId("eco_Forward")
                .setDisabled(false),
            
              )
  
              await b.update({embeds:[eval(b.values[0])],components:[button_row,row]})
  
   
             }else{
    
  
  b.update({embeds:[eval(b.values[0])],components:[row]})
                }   
              
              
      }else if(b.isButton()){
        if(b.customId)
        if(b.user.id !== message.author.id) return b.reply({ephemeral:true,content:`**You aren't allowed to use this, only <@${message.author.id}> can`})
        
        
        const button_row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setLabel("Back")
          .setStyle(ButtonStyle.Danger)
          .setEmoji("⬅️")
          .setCustomId("eco_Back")
          .setDisabled(false),
          new ButtonBuilder()
          .setLabel("Home")
          .setStyle(ButtonStyle.Primary)
          .setEmoji("🏠")
          .setCustomId("eco_Home")
          .setDisabled(false),
          new ButtonBuilder()
          .setLabel("Forward")
          .setStyle(ButtonStyle.Success)
          .setEmoji("➡️")
          .setCustomId("eco_Forward")
          .setDisabled(false),
      
        )
  
        if (b.customId == "eco_Forward") {
                        
          if (currentPage !== 0) {
            currentPage -= 1
          } else {
            currentPage = item_embeds.length - 1
          }
          await me.edit({
            embeds: [item_embeds[currentPage]],
            components: [button_row,row],
            ephemeral: true
          }).catch(e => {})
          b.deferUpdate().catch(e => {})
      
        }
        //go home
        else if (b.customId == "eco_Home") {
       
          currentPage = 0;
      
          await me.edit({
            embeds: [item_embeds[currentPage]],
            components: [button_row,row],
            ephemeral: true
          }).catch(e => {})
          b.deferUpdate().catch(e => {})
        }
        //go forward
        else if (b.customId == "eco_Back") {
          if (currentPage < item_embeds.length - 1) {
            currentPage++;
          } else {
            currentPage = 0
          }
      
          await me.edit({
            embeds: [item_embeds[currentPage]],
            components: [button_row,row],
            ephemeral: true
          }).catch(e => {})
          b.deferUpdate().catch(e => {})
        }
  
      } 
            
  })
  
  collector.on("end",async(collected) => {
  me.edit({components:[]}).catch(() => {})
  })

}
module.exports.slashRun = async (interaction, client) => {
  await interaction.deferReply({ephemeral:true})

let { member, channelId, guildId, applicationId, commandName, deferred, replied, ephemeral, options, id, createdTimestamp } = interaction; 
const { guild } = member;
let user = options.getUser("user");
if(!user) user = member.user;
if(user.id != member.id){
let newmember = guild.members.cache.get(user.id);
if(!newmember) newmember = await guild.members.cache.get(user.id).catch(e=>false) || false;
if(!newmember) {
  user = member.user;
} else {
  member = newmember;
}
}

client.economy.ensure(`economy.${member.user.id}`,{
  "pocket": 0,
  "bank": 0,
  "cooldown_cmd":[],
  "amount_cmd":[],
  "item":{}
})
let db = client.economy.get(`economy.${member.user.id}`)

//get all items a user has

let item_embeds = []
let all_item_count = 0
let all_item_worth = 0
if(Object.keys(db.item).length != 0){

for(const[keys,val] of Object.entries(db.item)){
  let all_worth_item_cat = 0

  //create the embed for the item pagination
  let item_embed = new EmbedBuilder()
  .setColor("Yellow")
.setTitle(`__Profile of **${member.user.tag}**__`)
.setThumbnail(member.user.avatarURL({dynamic:true}))
  
let lister = []
for(const test of Object.entries(db.item[keys])){
all_item_count += 1
let get_shop = require("../../config/shop.json")
let item = get_shop[keys].find(({name}) => name == test[0])

all_worth_item_cat += test[1].amount*item.price
all_item_worth += test[1].amount*item.price
lister.push(`${item.emoji} | This user has \`${test[1].amount}\` of \`${item.name}\`, this is worth \`${test[1].amount*item.price}$\``)
}
//item_msg.push(`__**${keys}:**__\n ${lister.join("\n")}`)

item_embed.addFields(
  {name:`__**${keys}:**__`,value:`>>> ${lister.join("\n")}`},
 // {name:`__**Worth of items:**__`,value:`This cateogry:\n> \`${all_worth_item}$\``}
)

  item_embeds.push(item_embed.addFields({name:`__**Worth of items (this category):**__`,value:`\n> \`${all_worth_item_cat}$\``,inline:true}))
}
}


//get all cooldowns a user has
let cool_content = []

if(db.cooldown_cmd.length !== 0){
db.cooldown_cmd.forEach((itemo) => {
  if(Math.round((+new Date()) / 1000) < itemo.length){
cool_content.push(`Command: \`${itemo.command}\` | Time left: <t:${itemo.length}:R>`)
  }
})
}
const row = new ActionRowBuilder()
    .addComponents(
      new SelectMenuBuilder()
        .setCustomId('Profile-Information')
        .setPlaceholder('Profile Information')
        .addOptions(
          {
            label: 'Profile',
            value: 'eco_profile',
            
          },
          {
            label:"Cooldowns",
            value:"eco_cool"
          },
       /*    {
            label: 'Balance & Usages',
            value: 'eco_bal',
            
          }, */
          {
            label: 'Items',
            value: 'eco_items',
          }
          ),
    );
let eco_profile = new EmbedBuilder()
.setAuthor({ name: `${client.user.username} | Economy Bot`, iconURL: "https://i.imgur.com/GVk1pgk.gif" })
.setColor("Yellow")
.setTitle(`__Profile of **${member.user.tag}**__`)
.setThumbnail(member.user.avatarURL({dynamic:true}))
.addFields([
{name:`__Balance:__`,value:`**Pocket:** \`${db.pocket}$\`\n**Bank:** \`${db.bank}$\``,inline:true},
{name:`__Items:__`,value:`**Amount:** \`${all_item_count}\``,inline:true}
])

let eco_cool = new EmbedBuilder()
.setAuthor({ name: `${client.user.username} | Economy Bot`, iconURL: "https://i.imgur.com/GVk1pgk.gif" })
.setColor("Yellow")
.setTitle(`__Profile of **${member.user.tag}**__`)
.addFields(
{name:`__Cooldowns:__`,value:`${cool_content.length !== 0?`>>> ${cool_content.join("\n")}`:"There are no cooldowns."}`}
)
let eco_items = item_embeds[0]

let eco_bal = new EmbedBuilder()
.setAuthor({ name: `${client.user.username} | Economy Bot`, iconURL: "https://i.imgur.com/GVk1pgk.gif" })
.setColor("Yellow")
.setTitle(`__Profile of **${member.user.tag}**__`)
.setThumbnail(member.user.avatarURL({dynamic:true}))
.setDescription(`Soon:tm:`)

let me = await interaction.editReply({embeds:[eco_profile],components:[row]})

let collector = me.createMessageComponentCollector({time: 60000 });
var currentPage = 0

collector.on("collect" , async (b) => {
if(b.isSelectMenu()){
            if(b.user.id !== interaction.member.user.id) return b.reply({content:`You can't use this, only \`${interaction.member.user.tag}\` can.`,ephemeral:true})         
            if(b.values[0] == "eco_items"){
           
            const button_row = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setLabel("Back")
              .setStyle(ButtonStyle.Danger)
              .setEmoji("⬅️")
              .setCustomId("eco_Back")
              .setDisabled(false),
              new ButtonBuilder()
              .setLabel("Home")
              .setStyle(ButtonStyle.Primary)
              .setEmoji("🏠")
              .setCustomId("eco_Home")
              .setDisabled(false),
              new ButtonBuilder()
              .setLabel("Forward")
              .setStyle(ButtonStyle.Success)
              .setEmoji("➡️")
              .setCustomId("eco_Forward")
              .setDisabled(false),
          
            )

            await b.update({embeds:[eval(b.values[0])],components:[button_row,row]})

 
           }else{
  

b.update({embeds:[eval(b.values[0])],components:[row]})
              }   
            
            
    }else if(b.isButton()){
      if(b.customId)
      if(b.user.id !== interaction.member.user.id) return b.reply({ephemeral:true,content:`**You aren't allowed to use this, only <@${interaction.member.user.id}> can`})
      
      
      const button_row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setLabel("Back")
        .setStyle(ButtonStyle.Danger)
        .setEmoji("⬅️")
        .setCustomId("eco_Back")
        .setDisabled(false),
        new ButtonBuilder()
        .setLabel("Home")
        .setStyle(ButtonStyle.Primary)
        .setEmoji("🏠")
        .setCustomId("eco_Home")
        .setDisabled(false),
        new ButtonBuilder()
        .setLabel("Forward")
        .setStyle(ButtonStyle.Success)
        .setEmoji("➡️")
        .setCustomId("eco_Forward")
        .setDisabled(false),
    
      )

      if (b.customId == "eco_Forward") {
                      
        if (currentPage !== 0) {
          currentPage -= 1
        } else {
          currentPage = item_embeds.length - 1
        }
        await interaction.editReply({
          embeds: [item_embeds[currentPage]],
          components: [button_row,row],
          ephemeral: true
        }).catch(e => {})
        b.deferUpdate().catch(e => {})
    
      }
      //go home
      else if (b.customId == "eco_Home") {
     
        currentPage = 0;
    
        await interaction.editReply({
          embeds: [item_embeds[currentPage]],
          components: [button_row,row],
          ephemeral: true
        }).catch(e => {})
        b.deferUpdate().catch(e => {})
      }
      //go forward
      else if (b.customId == "eco_Back") {
        if (currentPage < item_embeds.length - 1) {
          currentPage++;
        } else {
          currentPage = 0
        }
    
        await interaction.editReply({
          embeds: [item_embeds[currentPage]],
          components: [button_row,row],
          ephemeral: true
        }).catch(e => {})
        b.deferUpdate().catch(e => {})
      }

    }
          
})

collector.on("end",async(collected) => {
interaction.editReply({components:[]}).catch(() => {})
})

}

module.exports.conf = {
     Prefix: {
        aliases: ["inv"],
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
        cooldown: "5s",
     }
}

module.exports.help = {
      Prefix: {
        name: "ecoprofile",
        category: "economy",
        cooldown: 2,
        usage: "work",
        description: "get inventar of a user",
      },
      Slash: {
        name: "ecoprofile",
        description: "get inventar of a user ",
        category: "economy",
         options: [
            {
               name: `user`,
               description: `The user`,
               type: ApplicationCommandOptionType.User,
               required: false,
            }
       ],
      }
}