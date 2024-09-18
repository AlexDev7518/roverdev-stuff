const { EmbedBuilder,ButtonBuilder,ButtonStyle,ActionRowBuilder,SelectMenuBuilder, ComponentBuilder} = require("discord.js")
const Shop = require("../../config/shop")
const Discord = require("discord.js")
module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
  let shop_pages = []
  Shop.Categories.forEach(async(category) => {
    let cat = Shop[category]

    let item = cat.map(item => {
      return `> ${item.emoji} | ${item.name} | \`${item.price}$\``
    }).join("\n")
    let embed_buy = new EmbedBuilder()
    .setColor("Yellow")
    .setTitle(`__${message.guild.name} - ${category} shop__`)
  .setDescription(`\n${item}`)

  shop_pages.push(embed_buy)
  })

  const row = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
    .setLabel("Back")
    .setStyle(ButtonStyle.Danger)
    .setEmoji("⬅️")
    .setCustomId("Back")
    .setDisabled(false),
    new ButtonBuilder()
    .setLabel("Home")
    .setStyle(ButtonStyle.Primary)
    .setEmoji("🏠")
    .setCustomId("Home")
    .setDisabled(false),
    new ButtonBuilder()
    .setLabel("Forward")
    .setStyle(ButtonStyle.Success)
    .setEmoji("➡️")
    .setCustomId("Forward")
    .setDisabled(false),
    new ButtonBuilder()
    .setLabel("Stop")
    .setEmoji("🛑")
    .setCustomId("stopmenu")
    .setStyle(ButtonStyle.Danger)

  )

let me = await  message.reply({embeds:[shop_pages[0]],components:[row,item_row_cat(0)]})
  let collector = me.createMessageComponentCollector({time: 60000 });
  var currentPage = 0;

  collector.on("collect",async(b) => {
  
    if (b.customId == "Forward") {
                  
      if (currentPage !== 0) {
        currentPage -= 1
      } else {
        currentPage = shop_pages.length - 1
      }

      let check = Shop.Categories[currentPage]
let ar =[]
let shop_items = Shop[check]
shop_items.forEach((item) => {
  ar.push({ 
    label: `${item.name}`, 
    value: `buyitem_${check}_${item.name}`, 
    description: `‖ Buy the following item`,
    emote:`${item.emoji}`
  })

})

const the_row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('item_select_cat')
					.setPlaceholder('Select a item you want to buy')
					.addOptions(ar),
			);
      await b.update({
        embeds: [shop_pages[currentPage]],
        components: [row, item_row_cat(currentPage)],
        ephemeral: true
      }).catch(e => {})
      b.deferUpdate().catch(e => {})

    }
    //go home
    else if (b.customId == "Home") {
   
      currentPage = 0;

      await me.edit({
        embeds: [shop_pages[currentPage]],
        components: [row, item_row_cat(currentPage)],
        ephemeral: true
      }).catch(e => {})
      b.deferUpdate().catch(e => {})
    }
    //go forward
    else if (b.customId == "Back") {
      if (currentPage < shop_pages.length - 1) {
        currentPage++;
      } else {
        currentPage = 0
      }

      await me.edit({
        embeds: [shop_pages[currentPage]],
        components: [row,item_row_cat(currentPage)],
        ephemeral: true
      }).catch(e => {})
      b.deferUpdate().catch(e => {})
    }
    //stop menu

    else if(b.customId == "stopmenu"){
      collector.stop()
    }
    else if(b.values[0].includes("buyitem_")){
await b.deferReply({ephemeral:true})
      let split_value = b.values[0].split("_")

      let ar = [
        { 
          label: `Buy 1`, 
       value: `buyitem_amount_1`, 
       emoji:`${split_value[3]}`
     }, { 
      label: `Buy 5`, 
   value: `buyitem_amount_5`, 
   emoji:`${split_value[3]}`
 }, { 
  label: `Buy 10`, 
value: `buyitem_amount_10`, 
emoji:`${split_value[3]}`
}, { 
  label: `Buy 15`, 
value: `buyitem_amount_15`, 
emoji:`${split_value[3]}`
}, { 
  label: `Buy 20`, 
value: `buyitem_amount_20`, 
emoji:`${split_value[3]}`
}, { 
  label: `Buy 50`, 
value: `buyitem_amount_50`, 
emoji:`${split_value[3]}`
},
      ]
      const the_row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('item_amount_buy')
					.setPlaceholder('Select the amount you want to buy')
					.addOptions(ar),
			);

      let me2 = await b.editReply({embeds: [
        new Discord.EmbedBuilder()
        .setColor("Yellow")
        .setDescription(`${split_value[3]} How many of \`${split_value[2]}\` you want to buy?`)
      ],components:[the_row]})

      let collector2 = me2.createMessageComponentCollector({time: 30000 });
     
      collector2.on("collect",async(collec) => {
        
  if(!collec.isSelectMenu()) return
  if(!collec.values[0].includes(`buyitem_amount`)) return

  client.economy.ensure(`economy.${message.author.id}`,{
    "pocket": 0,
    "bank": 0,
    "cooldown_cmd":[],
    "amount_cmd":[],
    "item":{},
})
let prof = client.economy.get(`economy.${message.author.id}`)

  let splitter = collec.values[0].split("_")
let prize_per_item = split_value[4]
let final_prize = prize_per_item*parseInt(splitter[2])

if(final_prize > prof.pocket) return collec.reply({ephemeral:true,content:`You need \`${final_prize}$\` and you only have \`${prof.pocket}$\``})

client.economy.math(`economy.${message.author.id}`,`-`,final_prize,`pocket`)
collec.update({embeds:[new Discord.EmbedBuilder().setColor("Aqua").setDescription(`You successfully bought \`${splitter[2]}\` of \`${split_value[2]}\` for \`${final_prize}$\``)],components:[]})
     
client.economy.ensure(`economy.${message.author.id}`,{
  amount:0,
  emoji: split_value[3]
},`item.${split_value[1]}.${split_value[2]}`)
client.economy.math(`economy.${message.author.id}`,"+",parseInt(splitter[2]),`item.${split_value[1]}.${split_value[2]}.amount`)
})

      collector2.on("end",async(collected) => {
       await  b.editReply({components:[]})
      })
    }

  })
  
  collector.on("end",async(collected) => {
  message.edit({components:[]})
  })


  function item_row_cat(cat){
    let check = Shop.Categories[cat]
let ar =[]
let shop_items = Shop[check]
shop_items.forEach((item) => {
  ar.push({ 
    label: `${item.name}`, 
    value: `buyitem_${check}_${item.name}_${item.emoji}_${item.price}`, 
    description: `‖ Buy the following item`,
    emoji:`${item.emoji}`
  })

})

const the_row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('item_select_cat')
					.setPlaceholder('Select a item you want to buy')
					.addOptions(ar),
			);

      return the_row
  }
}
module.exports.slashRun = async (interaction, client) => {
  await interaction.deferReply({ephemeral:true})
  let shop_pages = []
  Shop.Categories.forEach(async(category) => {
    let cat = Shop[category]

    let item = cat.map(item => {
      return `> ${item.emoji} | ${item.name} | \`${item.price}$\``
    }).join("\n")
    let embed_buy = new EmbedBuilder()
    .setColor("Yellow")
    .setTitle(`__${interaction.guild.name} - ${category} shop__`)
  .setDescription(`\n${item}`)

  shop_pages.push(embed_buy)
  })

  const row = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
    .setLabel("Back")
    .setStyle(ButtonStyle.Danger)
    .setEmoji("⬅️")
    .setCustomId("Back")
    .setDisabled(false),
    new ButtonBuilder()
    .setLabel("Home")
    .setStyle(ButtonStyle.Primary)
    .setEmoji("🏠")
    .setCustomId("Home")
    .setDisabled(false),
    new ButtonBuilder()
    .setLabel("Forward")
    .setStyle(ButtonStyle.Success)
    .setEmoji("➡️")
    .setCustomId("Forward")
    .setDisabled(false),
    new ButtonBuilder()
    .setLabel("Stop")
    .setEmoji("🛑")
    .setCustomId("stopmenu")
    .setStyle(ButtonStyle.Danger)

  )

let me = await  interaction.editReply({embeds:[shop_pages[0]],components:[row,item_row_cat(0)]})
  let collector = me.createMessageComponentCollector({time: 60000 });
  var currentPage = 0;

  collector.on("collect",async(b) => {
  
    if (b.customId == "Forward") {
                  
      if (currentPage !== 0) {
        currentPage -= 1
      } else {
        currentPage = shop_pages.length - 1
      }

      let check = Shop.Categories[currentPage]
let ar =[]
let shop_items = Shop[check]
shop_items.forEach((item) => {
  ar.push({ 
    label: `${item.name}`, 
    value: `buyitem_${check}_${item.name}`, 
    description: `‖ Buy the following item`,
    emote:`${item.emoji}`
  })

})

const the_row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('item_select_cat')
					.setPlaceholder('Select a item you want to buy')
					.addOptions(ar),
			);
      await b.update({
        embeds: [shop_pages[currentPage]],
        components: [row, item_row_cat(currentPage)],
        ephemeral: true
      }).catch(e => {})
      b.deferUpdate().catch(e => {})

    }
    //go home
    else if (b.customId == "Home") {
   
      currentPage = 0;

      await interaction.editReply({
        embeds: [shop_pages[currentPage]],
        components: [row, item_row_cat(currentPage)],
        ephemeral: true
      }).catch(e => {})
      b.deferUpdate().catch(e => {})
    }
    //go forward
    else if (b.customId == "Back") {
      if (currentPage < shop_pages.length - 1) {
        currentPage++;
      } else {
        currentPage = 0
      }

      await interaction.editReply({
        embeds: [shop_pages[currentPage]],
        components: [row,item_row_cat(currentPage)],
        ephemeral: true
      }).catch(e => {})
      b.deferUpdate().catch(e => {})
    }
    //stop menu

    else if(b.customId == "stopmenu"){
      collector.stop()
    }
    else if(b.values[0].includes("buyitem_")){
await b.deferReply({ephemeral:true})
      let split_value = b.values[0].split("_")

      let ar = [
        { 
          label: `Buy 1`, 
       value: `buyitem_amount_1`, 
       emoji:`${split_value[3]}`
     }, { 
      label: `Buy 5`, 
   value: `buyitem_amount_5`, 
   emoji:`${split_value[3]}`
 }, { 
  label: `Buy 10`, 
value: `buyitem_amount_10`, 
emoji:`${split_value[3]}`
}, { 
  label: `Buy 15`, 
value: `buyitem_amount_15`, 
emoji:`${split_value[3]}`
}, { 
  label: `Buy 20`, 
value: `buyitem_amount_20`, 
emoji:`${split_value[3]}`
}, { 
  label: `Buy 50`, 
value: `buyitem_amount_50`, 
emoji:`${split_value[3]}`
},
      ]
      const the_row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('item_amount_buy')
					.setPlaceholder('Select the amount you want to buy')
					.addOptions(ar),
			);

      let me2 = await b.editReply({embeds: [
        new Discord.EmbedBuilder()
        .setColor("Yellow")
        .setDescription(`${split_value[3]} How many of \`${split_value[2]}\` you want to buy?`)
      ],components:[the_row]})

      let collector2 = me2.createMessageComponentCollector({time: 30000 });
     
      collector2.on("collect",async(collec) => {
        
  if(!collec.isSelectMenu()) return
  if(!collec.values[0].includes(`buyitem_amount`)) return

  client.economy.ensure(`economy.${interaction.member.user.id}`,{
    "pocket": 0,
    "bank": 0,
    "cooldown_cmd":[],
    "amount_cmd":[],
    "item":{},
})
let prof = client.economy.get(`economy.${interaction.member.user.id}`)

  let splitter = collec.values[0].split("_")
let prize_per_item = split_value[4]
let final_prize = prize_per_item*parseInt(splitter[2])

if(final_prize > prof.pocket) return collec.reply({ephemeral:true,content:`You need \`${final_prize}$\` and you only have \`${prof.pocket}$\``})

client.economy.math(`economy.${interaction.member.user.id}`,`-`,final_prize,`pocket`)
collec.update({embeds:[new Discord.EmbedBuilder().setColor("Aqua").setDescription(`You successfully bought \`${splitter[2]}\` of \`${split_value[2]}\` for \`${final_prize}$\``)],components:[]})
     
client.economy.ensure(`economy.${interaction.member.user.id}`,{
  amount:0,
  emoji: split_value[3]
},`item.${split_value[1]}.${split_value[2]}`)
client.economy.math(`economy.${interaction.member.user.id}`,"+",parseInt(splitter[2]),`item.${split_value[1]}.${split_value[2]}.amount`)
})

      collector2.on("end",async(collected) => {
       await  b.editReply({components:[]})
      })
    }

  })
  
  collector.on("end",async(collected) => {
  interaction.editReply({components:[]})
  })


  function item_row_cat(cat){
    let check = Shop.Categories[cat]
let ar =[]
let shop_items = Shop[check]
shop_items.forEach((item) => {
  ar.push({ 
    label: `${item.name}`, 
    value: `buyitem_${check}_${item.name}_${item.emoji}_${item.price}`, 
    description: `‖ Buy the following item`,
    emoji:`${item.emoji}`
  })

})

const the_row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('item_select_cat')
					.setPlaceholder('Select a item you want to buy')
					.addOptions(ar),
			);

      return the_row
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
        name: "shop",
        category: "economy",
        cooldown: 2,
        usage: "shop <item>",
        description: "Buy an item from the shop",
      },
      Slash: {
        name: "shop",
        description: "Buy an item from the shop",
        category: "economy",
      }
}