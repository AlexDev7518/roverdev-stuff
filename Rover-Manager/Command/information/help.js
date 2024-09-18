const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js")

module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
   const emojis = {
      botshop: "<a:Bot:1015746519212765195>",
      developers: "<:opcoding:961901467814477844>",
      information: "<:Info:1010183373119041597>",
      moderation: "<:mod:1015782908411260990>",
      music: "<a:Music:1006014615878111352>",
      ranking: "<a:level:1009157096148844645>",
      setup: "<a:Setup:1010018440901304421>",
      staff: "<:Staff:1010018063497826415>",
      ticket: "<:Ticket:1015745934090575964>",
      voice: "<a:Microphone:1015238076597031022>",
      vps: "<a:hostemoji:1017081433765990480>",
      website: "<:Panel:1006199670923599954>",
      commands: "<a:prefix:1020016491992719411>"
    };


       const embed = new EmbedBuilder()
       .setAuthor({ name: `Requested by ${message.author.username} | Page: Main Page`, iconURL: message.author.displayAvatarURL({
         dynamic: true
     })})
       .setColor("#3dbeff")
       .setDescription("Welcome to Rover Bot Manager, I have Slash And Prefix Commands\n Current Developers: \`AlexDev#7518, Chauvin#4522, j0nibaer#7223\`\n\n> Check Out Dashboard: https://roverdev.xyz")
       .setFooter({
         text: `Requested by ${message.author.username} | Page: Main Page | Made by Roverdev`,
         iconURL: message.author.displayAvatarURL({
             dynamic: true
         })
     })

     const row = new ActionRowBuilder()
     .addComponents(
         new SelectMenuBuilder()
         .setCustomId("Select-Menu")
         .setPlaceholder("Select a Help Menu Option")
         .addOptions(
            client.categories.map(cat => {
                return {
                    label: cat,
                    value: cat,
                    description: `View All Commands of ${cat}`,
                    emoji: emojis[cat.toLowerCase()] || null,
             }
        })
         )
     )

       client.categories.forEach(cat => {
               embed.addFields([
                  { name: `${emojis[cat]} ${cat}`, value: `r?help ${cat}`, inline: true },
             ])
       })

       if (args[0] == "botshop") {
         return message.reply({
            embeds: [
                new EmbedBuilder().setFooter({
                    text: `Requested by ${message.author.username} | Page: BotShop`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setTimestamp()
                .setColor("#3dbeff")
                .setTitle(`${emojis.botshop} - botshop`)
                .setDescription(`
               ${client.container.commands.filter(c=>c.help.Prefix.category==="botshop").map(c=>`${emojis.botshop} \`${c.help.Prefix.name}:\` ${c.help.Prefix.description}\n> <:stats:1015835459978526720> Prefix: ${c.conf.Prefix.enabled === true? `(<:done:1015666186446450781>)`: `(<:deleted:1015666185293004800>)`} Slash: ${c.conf.Slash.enabled === true? `(<:done:1015666186446450781>)`: `(<:deleted:1015666185293004800>)`}\n${c.help.Slash.options.map(m => `<:SlashCommands:1012467501206089730> </${c.help.Slash.name} ${m.name}:1> (**\`${prefix}${c.help.Prefix.name} ${m.name}\`**)\n> <:Info:1010183373119041597> Description: ${m.description} \n> <:stats:1015835459978526720> Status: ${m.status === true? `(<:done:1015666186446450781>)`: `(<:deleted:1015666185293004800>)`}`).join("\n")}`).join("\n")}
               `)
            ]
        })
       }
       if (args[0] == "developers") {
         return message.reply({
            embeds: [
                new EmbedBuilder().setFooter({
                    text: `Requested by ${message.author.username} | Page: developers`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setTimestamp()
                .setColor("#3dbeff")
                .setTitle(`${emojis.developers} - developers`)
                .setDescription(`
               ${client.container.commands.filter(c=>c.help.Prefix.category==="developers").map(c=>`${emojis.developers} \`${c.help.Prefix.name}:\` Description: ${c.help.Prefix.description}\n> <:Info:1010183373119041597> Prefix: ${c.conf.Prefix.enabled == true? "(<:done:1015666186446450781>)":" (<:deleted:1015666185293004800>)"} | Slash: ${c.conf.Slash.enabled == true? "(<:done:1015666186446450781>)":" (<:deleted:1015666185293004800>)"}`).join("\n")}
               `)
            ]
        })
      }
      if (args[0] == "information") {
         return message.reply({
            embeds: [
                new EmbedBuilder().setFooter({
                    text: `Requested by ${message.author.username} | Page: information`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setTimestamp()
                .setColor("#3dbeff")
                .setTitle(`${emojis.information} - information`)
                .setDescription(`
               ${client.container.commands.filter(c=>c.help.Prefix.category==="information").map(c=>`${emojis.information} \`${c.help.Prefix.name}:\` Description: ${c.help.Prefix.description}\n> <:Info:1010183373119041597> Prefix: ${c.conf.Prefix.enabled == true? "(<:done:1015666186446450781>)":" (<:deleted:1015666185293004800>)"} | Slash: ${c.conf.Slash.enabled == true? "(<:done:1015666186446450781>)":" (<:deleted:1015666185293004800>)"}`).join("\n")}
               `)
            ]
        })
      }
      if (args[0] == "moderation") {
         return message.reply({
            embeds: [
                new EmbedBuilder().setFooter({
                    text: `Requested by ${message.author.username} | Page: moderation`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setTimestamp()
                .setColor("#3dbeff")
                .setTitle(`${emojis.moderation} - moderation`)
                .setDescription(`
               ${client.container.commands.filter(c=>c.help.Prefix.category==="moderation").map(c=>`${emojis.moderation} \`${c.help.Prefix.name}:\` Description: ${c.help.Prefix.description}\n> <:Info:1010183373119041597> Prefix: ${c.conf.Prefix.enabled == true? "(<:done:1015666186446450781>)":" (<:deleted:1015666185293004800>)"} | Slash: ${c.conf.Slash.enabled == true? "(<:done:1015666186446450781>)":" (<:deleted:1015666185293004800>)"}`).join("\n")}
               `)
            ]
        })
      }
      if (args[0] == "ranking") {
         return message.reply({
            embeds: [
                new EmbedBuilder().setFooter({
                    text: `Requested by ${message.author.username} | Page: ranking`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setTimestamp()
                .setColor("#3dbeff")
                .setTitle(`${emojis.ranking} - ranking`)
                .setDescription(`
               ${client.container.commands.filter(c=>c.help.Prefix.category==="ranking").map(c=>`${emojis.ranking} \`${c.help.Prefix.name}:\` Description: ${c.help.Prefix.description}\n> <:Info:1010183373119041597> Prefix: ${c.conf.Prefix.enabled == true? "(<:done:1015666186446450781>)":" (<:deleted:1015666185293004800>)"} | Slash: ${c.conf.Slash.enabled == true? "(<:done:1015666186446450781>)":" (<:deleted:1015666185293004800>)"}`).join("\n")}
               `)
            ]
        })
      }
      if (args[0] == "setup") {
         return message.reply({
            embeds: [
                new EmbedBuilder().setFooter({
                    text: `Requested by ${message.author.username} | Page: setup`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setTimestamp()
                .setColor("#3dbeff")
                .setTitle(`${emojis.setup} - setup`)
                .setDescription(`
               ${client.container.commands.filter(c=>c.help.Prefix.category==="setup").map(c=>`${emojis.setup} \`${c.help.Prefix.name}:\` Description: ${c.help.Prefix.description}\n> <:Info:1010183373119041597> Prefix: ${c.conf.Prefix.enabled == true? "(<:done:1015666186446450781>)":" (<:deleted:1015666185293004800>)"} | Slash: ${c.conf.Slash.enabled == true? "(<:done:1015666186446450781>)":" (<:deleted:1015666185293004800>)"}`).join("\n")}
               `)
            ]
        })
      }
      if (args[0] == "staff") {
         return message.reply({
            embeds: [
                new EmbedBuilder().setFooter({
                    text: `Requested by ${message.author.username} | Page: staff`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setTimestamp()
                .setColor("#3dbeff")
                .setTitle(`${emojis.staff} - staff`)
                .setDescription(`
               ${client.container.commands.filter(c=>c.help.Prefix.category==="staff").map(c=>`${emojis.staff} \`${c.help.Prefix.name}:\` Description: ${c.help.Prefix.description}\n> <:Info:1010183373119041597> Prefix: ${c.conf.Prefix.enabled == true? "(<:done:1015666186446450781>)":" (<:deleted:1015666185293004800>)"} | Slash: ${c.conf.Slash.enabled == true? "(<:done:1015666186446450781>)":" (<:deleted:1015666185293004800>)"}`).join("\n")}
               `)
            ]
        })
      }
      if (args[0] == "ticket") {
         return message.reply({
            embeds: [
                new EmbedBuilder().setFooter({
                    text: `Requested by ${message.author.username} | Page: ticket`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setTimestamp()
                .setColor("#3dbeff")
                .setTitle(`${emojis.ticket} - ticket`)
                .setDescription(`
                ${client.container.commands.filter(c=>c.help.Prefix.category==="ticket").map(c=>`${emojis.botshop} \`${c.help.Prefix.name}:\` ${c.help.Prefix.description}\n> <:stats:1015835459978526720> Prefix: ${c.conf.Prefix.enabled === true? `(<:done:1015666186446450781>)`: `(<:deleted:1015666185293004800>)`} Slash: ${c.conf.Slash.enabled === true? `(<:done:1015666186446450781>)`: `(<:deleted:1015666185293004800>)`}\n${c.help.Slash.options.map(m => `<:SlashCommands:1012467501206089730> </${c.help.Slash.name} ${m.name}:1> (**\`${prefix}${c.help.Prefix.name} ${m.name}\`**)\n> <:Info:1010183373119041597> Description: ${m.description} \n> <:stats:1015835459978526720> Status: ${m.status === true? `(<:done:1015666186446450781>)`: `(<:deleted:1015666185293004800>)`}`).join("\n")}`).join("\n")}
               `)
            ]
        })
      }
      // c.help.Prefix.enabled === true ? "Enabled" : "Disabled"
      if (args[0] == "voice") {
         return message.reply({
            embeds: [
                new EmbedBuilder().setFooter({
                    text: `Requested by ${message.author.username} | Page: voice`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setTimestamp()
                .setColor("#3dbeff")
                .setTitle(`${emojis.voice} - voice`)
                .setDescription(`
                ${client.container.commands.filter(c=>c.help.Prefix.category==="voice").map(c=>`${emojis.botshop} \`${c.help.Prefix.name}:\` ${c.help.Prefix.description}\n> <:stats:1015835459978526720> Prefix: ${c.conf.Prefix.enabled === true? `(<:done:1015666186446450781>)`: `(<:deleted:1015666185293004800>)`} Slash: ${c.conf.Slash.enabled === true? `(<:done:1015666186446450781>)`: `(<:deleted:1015666185293004800>)`}\n${c.help.Slash.options.map(m => `<:SlashCommands:1012467501206089730> </${c.help.Slash.name} ${m.name}:1> (**\`${prefix}${c.help.Prefix.name} ${m.name}\`**)\n> <:Info:1010183373119041597> Description: ${m.description} \n> <:stats:1015835459978526720> Status: ${m.status === true? `(<:done:1015666186446450781>)`: `(<:deleted:1015666185293004800>)`}`).join("\n")}`).join("\n")}
               `)
            ]
        })
      }
      if (args[0] == "vps") {
         return message.reply({
            embeds: [
                new EmbedBuilder().setFooter({
                    text: `Requested by ${message.author.username} | Page: vps`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setTimestamp()
                .setColor("#3dbeff")
                .setTitle(`${emojis.vps} - vps`)
                .setDescription(`
               ${client.container.commands.filter(c=>c.help.Prefix.category==="vps").map(c=>`${emojis.vps} \`${c.help.Prefix.name}:\` Description: ${c.help.Prefix.description}\n> <:Info:1010183373119041597> Prefix: ${c.conf.Prefix.enabled == true? "(<:done:1015666186446450781>)":" (<:deleted:1015666185293004800>)"} | Slash: ${c.conf.Slash.enabled == true? "(<:done:1015666186446450781>)":" (<:deleted:1015666185293004800>)"}`).join("\n")}
               `)
            ]
        })
      }
      if (args[0] == "website") {
         return message.reply({
            embeds: [
                new EmbedBuilder().setFooter({
                    text: `Requested by ${message.author.username} | Page: website`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setTimestamp()
                .setColor("#3dbeff")
                .setTitle(`${emojis.website} - website`)
                .setDescription(`
               ${client.container.commands.filter(c=>c.help.Prefix.category==="website").map(c=>`${emojis.website} \`${c.help.Prefix.name}:\` Description: ${c.help.Prefix.description}\n> <:Info:1010183373119041597> Prefix: ${c.conf.Prefix.enabled == true? "(<:done:1015666186446450781>)":" (<:deleted:1015666185293004800>)"} | Slash: ${c.conf.Slash.enabled == true? "(<:done:1015666186446450781>)":" (<:deleted:1015666185293004800>)"}`).join("\n")}
               `)
            ]
        })
      }

      if (args[0]) {
         const cmd = client.container.commands.get(args[0])
         if (cmd) {
            const embed = new EmbedBuilder()
            .setAuthor({ name: `Requested by ${message.author.username} | Page: Command`, iconURL: message.author.displayAvatarURL({
               dynamic: true
           })})
            .setDescription(`> Prefix Name: b${cmd.help.Prefix.name}\n> Slash Name: /${cmd.help.Slash.name}\n> Description: ${cmd.help.Prefix.description ? cmd.help.Prefix.description : "No description for this command."}\n> Aliases: ${cmd.conf.Prefix.aliases ? `\`${cmd.conf.Prefix.aliases.join("` `")}\`` : "No aliases for this command."} (Prefix Only)`)
            .setFooter({
               text: `Requested by ${message.author.username} | Page: Command`,
               iconURL: message.author.displayAvatarURL({
                   dynamic: true
               })
           })
            .setTimestamp()
            .setColor("#3dbeff");
          return message.channel.send({ embeds: [embed] });
         } else if (!cmd) {
                return message.reply({embeds: [ 
                       new EmbedBuilder()
                        .setTitle("There is No Command / Category with that Name.")
                        .setColor("#3dbeff")
                ]})
         }
      }

      const initialMessage = await message.reply({embeds: [embed], components: [row]})

       const filter = (interaction) => interaction.user.id === message.author.id;

       const collector = message.channel.createMessageComponentCollector({
         filter,
         time: 50000,
       });
 
       collector.on("collect", (interaction) => {
               if (interaction.customId == "Select-Menu") {
                  interaction.deferUpdate().catch(e => {})
                  return initialMessage.edit({
                     embeds: [
                         new EmbedBuilder().setFooter({
                             text: `Requested by ${interaction.user.username} | Page: ${interaction.values}`,
                             iconURL: interaction.user.displayAvatarURL({
                                 dynamic: true
                             })
                         })
                         .setTimestamp()
                         .setColor("#3dbeff")
                         .setTitle(`${emojis[interaction.values]} - ${interaction.values}`)
                         .setDescription(`
                        ${client.container.commands.filter(c=>c.help.Prefix.category=== `${interaction.values}`).map(c=>`${emojis[interaction.values]} \`${c.help.Prefix.name}:\` Description: ${c.help.Prefix.description}\n> <:Info:1010183373119041597> Prefix: ${c.conf.Prefix.enabled == true? "(<:done:1015666186446450781>)":" (<:deleted:1015666185293004800>)"} | Slash: ${c.conf.Slash.enabled == true? "(<:done:1015666186446450781>)":" (<:deleted:1015666185293004800>)"}`).join("\n")}
                        `)
                        .addFields({ name: `Sub command`, value: `You Can Also Run: \`r?help ${interaction.values}\`` })
                     ]
                 })
               }
       })


}
module.exports.slashRun = async (interaction, client) => {
   // Code For Slash Here
}

module.exports.conf = {
     Prefix: {
        aliases: ["help"],
        enabled: true,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: []   
     },
     Slash: {
        enabled: false,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: [],
        timeout: 1,
     }
}

module.exports.help = {
      Prefix: {
        name: "help",
        category: "information",
        cooldown: 3,
        usage: "help",
        description: "Help command",
      },
      Slash: {
        name: "help",
        description: "help Command",
        category: "information",
      }
}