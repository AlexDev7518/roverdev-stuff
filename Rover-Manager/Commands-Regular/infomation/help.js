const { ActionRowBuilder } = require("discord.js");
const { EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");


const fs = require('fs');


module.exports.run = async (client, message, args, cmdUser,prefix) => {
    const swapembeds = []

    const embd = new EmbedBuilder()
    .setAuthor({name: `Roverdev Bot Shop | ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
    .setColor("#3dbeff")
    .setDescription(`***__Welcome to Rover Bot Manager.__***\n> **Rover Manager is a \`Bot Manager\` Bot that manages shop bots, users, server**\n> ***Dashboard: https://roverdev.xyz***`)
    .addFields([
         { name: `Total Slash Commands`, value: `> \` ${client.arrayOfSlashCommands.length} SlashCommands\``, inline: true },
         { name: `Total Regular Commands`, value: `> \` ${client.TotalPrefixCommands.length} RegularCommands \``, inline: true },
         { name: `Total Commands`, value: ` > \` ${client.TotalCommands.length} Commands \` `, inline: true },
         { name: `Total Handlers`, value: `> \` Soon Handlers \` `, inline: true },
         { name: `Total Events`, value: `> \` ${ client.events.length } Events \` `, inline: true },
         { name: `Total Systems`, value: `> \` Soon Systems \` `, inline: true }
    ])
    swapembeds.push(embd)

    client.categories.forEach(async (category) => {
      const embed2 = new EmbedBuilder()
      .setColor("#3dbeff")
      .setAuthor({name: `Roverdev Bot Shop | ${client.user.username} | Prefix Cmds | ${category}`, iconURL: client.user.displayAvatarURL()})
      const commands = require("fs").readdirSync(`./Commands-Regular/${category}/`).filter((file) => file.endsWith(".js"));
      client.container.commands.filter(c=>c.help.Roverdev.category=== category).forEach(command => {
              if (commands.length > 0) {
                embed2.addFields([
                  {name: `b${command.help.Roverdev.name}`, value: `> ${command.help.Roverdev.description ? `${command.help.Roverdev.description}` : "Nothing Set"}`, inline: true}
                    ])
              }
      })
       if (commands.length > 0) {
        swapembeds.push(embed2)
       }
    })

    client.categories2.forEach(async (category) => {
      const embed2 = new EmbedBuilder()
      .setColor("#3dbeff")
      .setAuthor({name: `Roverdev Bot Shop | ${client.user.username} | Slash Cmds | ${category}`, iconURL: client.user.displayAvatarURL()})
      const commands = require("fs").readdirSync(`./Commands-Slash/${category}/`).filter((file) => file.endsWith(".js"));
      client.container.slash.filter(c=>c.help.Roverdev.category=== category).forEach(command => {
              if (commands.length > 0) {
                embed2.addFields([
                  {name: `/${command.help.Roverdev.name}`, value: `> ${command.help.Roverdev.description ? `${command.help.Roverdev.description}` : "Nothing Set"}`, inline: true}
                    ])
              }
      })
       if (commands.length > 0) {
        swapembeds.push(embed2)
       }
    })
    
    const row = new ActionRowBuilder()
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

let me = await message.reply({embeds: [embd], components: [row], ephemeral: true})
    let collector = me.createMessageComponentCollector({time: 60000 });
    var currentPage = 0;

    collector.on("collect" , async (b) => {
        if (b.isButton()) {
                                //page forward
                                if (b.customId == "Forward") {
                  
                                  if (currentPage !== 0) {
                                    currentPage -= 1
                                  } else {
                                    currentPage = swapembeds.length - 1
                                  }

                                  await me.edit({
                                    embeds: [swapembeds[currentPage]],
                                    components: [row],
                                    ephemeral: true
                                  }).catch(e => {})
                                  b.deferUpdate().catch(e => {})

                                }
                                //go home
                                else if (b.customId == "Home") {
                               
                                  currentPage = 0;

                                  await me.edit({
                                    embeds: [swapembeds[currentPage]],
                                    components: [row],
                                    ephemeral: true
                                  }).catch(e => {})
                                  b.deferUpdate().catch(e => {})
                                }
                                //go forward
                                else if (b.customId == "Back") {
                                  if (currentPage < swapembeds.length - 1) {
                                    currentPage++;
                                  } else {
                                    currentPage = 0
                                  }

                                  await me.edit({
                                    embeds: [swapembeds[currentPage]],
                                    components: [row],
                                    ephemeral: true
                                  }).catch(e => {})
                                  b.deferUpdate().catch(e => {})
                                }
                                //stop menu
                                else if(b.customId == "stopmenu"){
                                  collector.stop()
                                }
                    
        }
      })

      collector.on("end",async(collected) => {
        me.edit({components:[]})
      })
}

module.exports.conf = {
    aliases: ["help", "hlp"],
    enabled: true,
    ownerOnly: false,
    AdminOnly: false,
    userPermissions: []
}

module.exports.help = {
      Roverdev: {
        name: "help",
        category: "infomation",
        cooldown: 2,
        usage: "help",
        description: "Roverdev Help Menu",
      }
}