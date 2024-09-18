const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, Embed, ActionRowBuilder, ButtonBuilder } = require("discord.js")

module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
   // Code For Prefix Here
}
module.exports.slashRun = async (interaction, client) => {
    try{
    await interaction.deferReply({ephemeral:true})
    let allbans = await interaction.guild.bans.fetch().catch(() => {}).then(bans => bans.map(ban => `**${ban.user.username}**#${ban.user.discriminator} (\`${ban.user.id}\`)\n**Reason**:\n> ${ban.reason ? ban.reason : "No Reason"}\n`)); 
   
    let currentPage = 0;
  
    let pages = []
  
    if (Array.isArray(allbans)) {
      try {
        let k = 10;
        for (let i = 0; i < allbans.length; i += 10) {
          const current = allbans.slice(i, k);
          k += 10;
          const embed = new EmbedBuilder()
            .setDescription(current.join("\n"))
            .setTitle(`__**${interaction.guild.name} - Banlist**__`)
            .setColor("#3dbeff")
       
          pages.push(embed);
        }
        pages;
      } catch (e){console.error(e)}
    } else {
      try {
        let k = 1000;
        for (let i = 0; i < allbans.length; i += 1000) {
          const current = allbans.slice(i, k);
          k += 1000;
          const embed = new EmbedBuilder()
            .setDescription(current)
            .setTitle(`__**${interaction.guild.name} - Banlist**__`)
            .setColor("#3dbeff")
        
          pages.push(embed);
        }
        pages;
      } catch (e){console.error(e)}
    }
  
    if(pages.length == 0) return interaction.editReply({embeds:[
      new EmbedBuilder()
      .setColor("Red")
      .setDescription(`There are no bans on this server, nice.`)
    ]})
    if (pages.length === 1) return interaction.editReply({embeds: [pages[0]]}).catch(() => {})
  
    const {ButtonStyle} = require("discord.js")
    let buttons = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setLabel("Back")
      .setStyle(ButtonStyle.Danger)
      .setEmoji("989346099196198994")
      .setCustomId("Back")
      .setDisabled(false),
      new ButtonBuilder()
      .setLabel("Home")
      .setStyle(ButtonStyle.Primary)
      .setEmoji("964306742739624017")
      .setCustomId("Home")
      .setDisabled(false),
      new ButtonBuilder()
      .setLabel("Forward")
      .setStyle(ButtonStyle.Success)
      .setEmoji("989346174463008828")
      .setCustomId("Forward")
      .setDisabled(false),
      new ButtonBuilder()
      .setLabel("Stop")
      .setEmoji("🛑")
      .setCustomId("stopmenu")
      .setStyle(ButtonStyle.Danger)
  
    )
  
      let swapmsg = await interaction.editReply({   
        content: `***Click on the __Buttons__ to swap the Pages***`,
        embeds: [pages[0].setFooter({text:`Page: ${currentPage +1} / ${pages.length}`})], 
        components: [buttons]
    });
  
    const collector = swapmsg.createMessageComponentCollector({time: 60000 }); 
  
    collector.on('collect', async b => {
        
          if(b.customId == "Back") {
            collector.resetTimer();
          
              if (currentPage !== 0) {
                currentPage -= 1
                await interaction.editReply({embeds: [pages[currentPage].setFooter({text:`Page: ${currentPage +1} / ${pages.length}`})],components:[buttons]})
                await b.deferUpdate();
              } else {
                  currentPage = pages.length - 1
                  await interaction.editReply({embeds: [pages[currentPage].setFooter({text:`Page: ${currentPage +1} / ${pages.length}`})],components:[buttons]})
                  await b.deferUpdate();
              }
          }
  
          else if(b.customId == "Home"){
            collector.resetTimer();
        
              currentPage = 0;
              await interaction.editReply({embeds: [pages[currentPage].setFooter({text:`Page: ${currentPage +1} / ${pages.length}`})], components: [buttons]})
              await b.deferUpdate();
          } 
  
          else if(b.customId == "Forward"){
            collector.resetTimer();
          
              if (currentPage < pages.length - 1) {
                  currentPage++;
                  await interaction.editReply({embeds: [pages[currentPage].setFooter({text:`Page: ${currentPage +1} / ${pages.length}`})], components: [buttons]})
                  await b.deferUpdate();
              } else {
                  currentPage = 0
                  await interaction.editReply({embeds: [pages[currentPage].setFooter({text:`Page: ${currentPage +1} / ${pages.length}`})], components: [buttons]})
                  await b.deferUpdate();
              }
          
          } 
          //go forward
          else if(b.customId == "stopmenu"){
              await interaction.editReply({embeds: [pages[currentPage].setFooter({text:`Page: ${currentPage +1} / ${pages.length}`})], components: []})
              await b.deferUpdate();
              collector.stop("stopped");
          }
    });
    collector.on("end", (reason) => {
      if(reason != "stopped"){
        interaction.editReply({embeds: [pages[currentPage].setFooter({text:`Page: ${currentPage +1} / ${pages.length}`})], components: []})
      }
    })
  }catch(e){
      console.log(e)
    }
  }

module.exports.conf = {
     Prefix: {
        aliases: ["latency"],
        enabled: false,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: []   
     },
     Slash: {
        enabled: true,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: ["Administrator"]
     }
}

module.exports.help = {
      Prefix: {
        name: "bans",
        category: "moderation",
        cooldown: 2,
        usage: "bans",
        description: "Get all bans of this guild",
      },
      Slash: {
        name: "bans",
        description: "Get all bans of this guild",
        timeout: 5000,
        category: "moderation",
      }
}