const { Application, ApplicationCommandOptionType, SelectMenuBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js")
const { ClosedCategory } = require("../../Main-Bot/Overflow")

 module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
    // Code For Prefix Here
 }
 module.exports.slashRun = async (interaction, client) => {
    if (interaction.options.getSubcommand() === "forceclose") {

      if(!interaction.member.roles.cache.has(`1005978927421980702`)) return interaction.reply({ content: `Only Staff Members Are Alowed to Run These Commands.` })

      const MainRow = new ActionRowBuilder()
      .addComponents(
              new ButtonBuilder()
              .setCustomId("Close-Creation")
              .setEmoji("🔒")
              .setLabel("Close")
              .setStyle(ButtonStyle.Danger)
      )

             interaction.reply({ content: `Click the Button!`,  components: [
              MainRow
             ] })
    }
    if (!interaction.channel.name.includes("ticket-")) {
      return interaction.reply({ 
             content: `Only use this command in a ticket.`,
             ephemeral: true
       })
}

    if (interaction.options.getSubcommand() === 'add') {
      
        const user = interaction.options.getUser('user')

        if (!interaction.channel.name.includes("ticket-")) return interaction.reply({content: `Only Use This command in a Ticket.`, ephemeral: true})
        if(interaction.member.roles.cache.has(`1005978927421980702`)) {
            interaction.channel.permissionOverwrites.edit(user, {
                ViewChannel: true,
                SendMessages: true,
                AttachFiles: true,
                ReadMessageHistory: true,
            }) // Permissions
            interaction.reply({ embeds: [
                      new EmbedBuilder()
                      .setTitle(`**<:tick:1008654515064545310> Successfully Added ${user.username} To \`${interaction.channel.name}\`**`)
                      .setColor("#3dbeff")
            ],content: `${user} Got Added to the ticket.`
        })
            } else {
            interaction.reply({ content: `You are not allowed to run this.`, ephemeral: true })
      }
    }
    if (interaction.options.getSubcommand() === 'close') {
        if (!interaction.member.roles.cache.has("1005978927421980702")) {
            return interaction.reply({content: `Only <@&1005978927421980702> Can Close this Ticket`, ephemeral: true})
     }



     if (interaction.channel.parentId == "1005960202434138275") {
       const embed = new EmbedBuilder()
       .setAuthor({ name: `Ticket is Already Closed!`, iconURL: `https://i.imgur.com/AgDgONy.png` })
       .setColor("#3dbeff")


       return interaction.reply({embeds: [embed], ephemeral: true})
     }

     const Buttons = new ActionRowBuilder()
     .addComponents(
       new ButtonBuilder()
      .setStyle(ButtonStyle.Success)
      .setCustomId("Confirm")
      .setLabel(`Confirm, close ticket`)
      .setDisabled(false)
      .setEmoji("🔒"),
      new ButtonBuilder()
      .setStyle(ButtonStyle.Danger)
      .setCustomId("Cancel")
      .setLabel(`Cancel, Keep it Open!`)
      .setDisabled(false)
      .setEmoji("🔓")
     )
     const embed = new EmbedBuilder()
     .setAuthor({ name: `Would You Like to Continue to Close?`, iconURL: `https://i.imgur.com/RhR8Qqn.gif` })
     .setColor("#3dbeff")


     await interaction.reply({embeds: [embed], components: [Buttons]})

     const Collector = interaction.channel.createMessageComponentCollector({time: 60000 })

     Collector.on("collect", async (b) => {
            if (b.customId == "Confirm") {               
                   const { createWriteStream } = require('fs');
                   const ticketlogs = client.channels.cache.get("1040982086854647918")

                   const MainEmbed = new EmbedBuilder()
                   .setAuthor({  name: `Ticket System | ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                   .addFields([
                           { name: `Ticket Closed By: `, value: `${interaction.user} | ${interaction.user.username}`},
                           { name: `Ticket Channel:`, value: `<#${interaction.channel.id}> | ${interaction.channel.name}` },
                           { name: `Ticket Opened By:`, value: `<@!${client.settings.get(interaction.channel.id, "ticketOpenerId") ? client.settings.get(interaction.channel.id, "ticketOpenerId") : null}> | ${client.settings.get(interaction.channel.id, "ticketOpenerUsername") ? client.settings.get(interaction.channel.id, "ticketOpenerUsername") : null }` },
                           { name: `First Claimed`, value: `<@!${client.settings.get(interaction.channel.id, "FirstClaimed") ? client.settings.get(interaction.channel.id, "FirstClaimed") : null}>` },
                   ])
                   .setColor("#3dbeff")
                    const ClaimedUsers = client.settings.get(interaction.channel.id, "ClaimedUsers") ? client.settings.get(interaction.channel.id, "ClaimedUsers") : null
                     if (ClaimedUsers.length > 1) {
                       MainEmbed.addFields([{
                           name: `All Users Who Claimed:`,
                           value: ` ${client.settings.get(interaction.channel.id, "ClaimedUsers").map(m => `<@${m}> | ${client.users.cache.get(m) ? client.users.cache.get(m).username : "Invalid Username"}`).join("\n")}`
                   }])
                     }

                   interaction.editReply({embeds: [
                          new EmbedBuilder()
                          .setAuthor({ name: `Successfully Closed the Ticket!`, iconURL: `https://i.imgur.com/cFihX4o.png` })
                          .setColor("#3dbeff")                     
                      ], components: []})

                   await interaction.channel.messages.fetch().then(async msg => {
                          let messages = msg.filter(msg => msg.author.bot !== true).map(m => {
                              const date = new Date(m.createdTimestamp).toLocaleString();
                              const user = `${m.author.tag}${m.author.id === b.customId.split('_')[1] ? ' (ticket creator)' : ''}`;
                    
                              return `${date} - ${user} : ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`;
                          }).reverse().join('\n');
                    
                          if (messages.length < 1) messages = 'There are no messages in this ticket... strange';
                    
                          const ticketID = Date.now();
                    
                          const stream = createWriteStream(`./Ticket-Logs/${ticketID}.txt`);
                    
                          stream.once('open', () => {
                              stream.write(`channel #${interaction.channel.name} | Channel ID: ${interaction.channel.id}\n\n`);
                              stream.write(`${messages}\n\nLogs ${new Date(ticketID).toLocaleString()}`);
                    
                              stream.end();
                          });
                          let Ticket_Opener = client.users.cache.get(client.settings.get(interaction.channel.id, "ticketOpenerId"))
                          stream.on('finish', () => ticketlogs.send({ files: [`./Ticket-Logs/${ticketID}.txt`], embeds: [MainEmbed]}).then(Ticket_Opener.send({ files: [`./Ticket-Logs/${ticketID}.txt`], embeds: [MainEmbed]})))
                      });

                      interaction.channel.setTopic("Closed-Ticket")

                      const channel = interaction.channel

                      ClosedCategory(client,channel)

                      setTimeout(() => {
                        const oldName = interaction.channel.name; 

                        const setting = client.settings.get(channel.id, "ticketEmoji")
          
                        channel.setName(oldName.replace(setting, "🔒"))

                        client.settings.ensure(interaction.guild.id, {
                          PendingChannels: []
                       })
                           client.settings.remove(interaction.guild.id, channel.id, "PendingChannels")
                       }, 500);

                       setTimeout(() => {
                        if (interaction.channel.parentId !== "1040996273546866708") {
                                 interaction.channel.delete()
                        }
                   }, 5000);  

                      interaction.channel.permissionOverwrites.set([
                          { 
                              id: interaction.guild.roles.everyone, 
                              deny: [PermissionFlagsBits.ViewChannel] 
                          },
                      ]);

                      

                      setTimeout(() => {
                        client.settings.delete(client.settings.get(interaction.channel.id, "ticketOpenerId"))
                        client.settings.delete(interaction.channel.id)
                      }, 500);

                      client.channels.fetch(channel.id).then(ch => {
                           ch.messages.fetch(client.settings.get(ch.id, "TicketMessage")).then(async msg => {

                              msg.edit({
                                  components: []
                            })

                      })
                    })
                      setTimeout(() => {
                          channel.send({
                                 embeds: [
                                         new EmbedBuilder()
                                         .setTitle(`Ticket Got Closed Successfully (Force Closed)`)
                                         .addFields([
                                              { name: `Channel:`, value: `${channel}`, inline: true },
                                              { name: `Closed By:`, value: `${interaction.user}`, inline: true }
                                         ])
                                         .setColor("#3dbeff")   
                                 ],
                          })
                      }, 500);
            }
            if (b.customId == "Cancel") {
                   const Buttons = new ActionRowBuilder()
                   .addComponents(
                     new ButtonBuilder()
                    .setStyle(ButtonStyle.Success)
                    .setCustomId("Confirm")
                    .setLabel(`Confirm, close ticket`)
                    .setDisabled(true)
                    .setEmoji("🔒"),
                    new ButtonBuilder()
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId("Cancel")
                    .setLabel(`Cancel, Keep it Open!`)
                    .setDisabled(true)
                    .setEmoji("🔓")
                   )

                   const embed = new EmbedBuilder()
                   .setAuthor({ name: `Success, Not Closing Ticket`, iconURL: `https://i.imgur.com/AgDgONy.png` })
                   .setColor("#3dbeff")
     
     
                interaction.editReply({embeds: [embed], components: [Buttons], ephemeral: true})
            }
            b.deferUpdate()
     })

    }
    if (interaction.options.getSubcommand() === 'remove') {
        const user = interaction.options.getUser('user')

        if (!interaction.channel.name.includes("ticket-")) return interaction.reply({content: `Only Use This command in a Ticket.`, ephemeral: true})
        if(interaction.member.roles.cache.has(`1005978927421980702`)) {
            interaction.channel.permissionOverwrites.edit(user, {
                ViewChannel: true,
                SendMessages: false,
            }) // Permissions
            interaction.reply({ embeds: [
                      new EmbedBuilder()
                      .setTitle(`**<:tick:1008654515064545310> Successfully Removed ${user.username} From \`${interaction.channel.name}\`**`)
                      .setColor("#3dbeff")
            ],content: `${user} Got Removed from the ticket.`
        })
            } else {
            interaction.reply({ content: `You are not allowed to run this.`, ephemeral: true })
      }
    }

    if (interaction.options.getSubcommand() === 'hide') {
        const user = interaction.options.getUser('user')
        const role = interaction.options.getRole('role')

    if (!interaction.channel.name.includes("ticket-")) return interaction.reply({content: `Only Use This command in a Ticket.`, ephemeral: true})

    if (user) {
        if(interaction.member.roles.cache.has(`1005978927421980702`)) {
            interaction.channel.permissionOverwrites.edit(user, {
                ViewChannel: false,
            }) // Permissions
            interaction.reply({ embeds: [
                      new EmbedBuilder()
                      .setTitle(`**<:tick:1008654515064545310> Successfully Hidden ${user.username} From \`${interaction.channel.name}\`**`)
                      .setColor("#3dbeff")
            ],content: `${user} Got Hidden from the ticket.`
        })
            } else {
            interaction.reply({ content: `You are not allowed to run this.`, ephemeral: true })
      }
    }
    if (role) {
        if(interaction.member.roles.cache.has(`920292439267348490`)) {
            interaction.channel.permissionOverwrites.edit(role.id, {
                ViewChannel: false,
            }) // Permissions
            interaction.reply({ embeds: [
                      new EmbedBuilder()
                      .setTitle(`**<:tick:1008654515064545310> Successfully Hidden ${role.name} From \`${interaction.channel.name}\`**`)
                      .setColor("#3dbeff")
            ],content: `${role.name} Got Hidden from the ticket.`
        })
            } else {
            interaction.reply({ content: `You are not allowed to run this.`, ephemeral: true })
      }
    }

    }
    if (interaction.options.getSubcommand() === 'show') {
        const user = interaction.options.getUser('user')
        const role = interaction.options.getRole('role')

    if (!interaction.channel.name.includes("ticket-")) return interaction.reply({content: `Only Use This command in a Ticket.`, ephemeral: true})

    if (user) {
        if(interaction.member.roles.cache.has(`1005978927421980702`)) {
            interaction.channel.permissionOverwrites.edit(user, {
                ViewChannel: true,
            }) // Permissions
            interaction.reply({ embeds: [
                      new EmbedBuilder()
                      .setTitle(`**<:tick:1008654515064545310> Successfully Unhidden ${user.username} From \`${interaction.channel.name}\`**`)
                      .setColor("#3dbeff")
            ],content: `${user} Got Unhidden from the ticket.`
        })
            } else {
            interaction.reply({ content: `You are not allowed to run this.`, ephemeral: true })
      }
    }
    if (role) {
        if(interaction.member.roles.cache.has(`920292439267348490`)) {
            interaction.channel.permissionOverwrites.edit(role.id, {
                ViewChannel: true,
            }) // Permissions
            interaction.reply({ embeds: [
                      new EmbedBuilder()
                      .setTitle(`**<:tick:1008654515064545310> Successfully Unhidden ${role.name} From \`${interaction.channel.name}\`**`)
                      .setColor("#3dbeff")
            ],content: `${role.name} Got Unhidden from the ticket.`
        })
            } else {
            interaction.reply({ content: `You are not allowed to run this.`, ephemeral: true })
      }
    }
    }

    if (interaction.options.getSubcommand() === 'info') {
      if(!interaction.member.roles.cache.has(`1005978927421980702`)) return interaction.reply({ content: `Only Staff Members Are Alowed to Run These Commands.` })
      
        const channel = interaction.options.getChannel('channel')

        if (!channel.name.includes("ticket-")) {
                 return interaction.reply({ content: `Not a Vaild Ticket Channel` })    
        }

        const embed = new EmbedBuilder()
        .setAuthor({  name: `Ticket Information | ${client.user.username}`, iconURL: "https://i.imgur.com/zlbE4Ui.png"})
        .setDescription(`Claimed Users: ${client.settings.get(channel.id, "ClaimedUsers").map(m => `<@!${m}>`).join(",")}`)
        .setColor("#3dbeff")
        .addFields([
            { name: `Ticket Channel:`, value: `<#${channel.id}> | ${channel.name}` },
            { name: `Ticket Opened By:`, value: `<@!${client.settings.get(channel.id, "ticketOpenerId") ? client.settings.get(channel.id, "ticketOpenerId") : null}> | ${client.settings.get(channel.id, "ticketOpenerUsername") ? client.settings.get(channel.id, "ticketOpenerUsername") : null }` },
            { name: `First Claimed`, value: `<@!${client.settings.get(channel.id, "FirstClaimed") ? client.settings.get(channel.id, "FirstClaimed") : null}>` },
        ])

        interaction.reply({embeds: [embed]})
    }
    if (interaction.options.getSubcommand() === 'setalex') {

         if(!interaction.member.roles.cache.has(`1005978927421980702`)) return interaction.reply({ content: `Only Staff Members Are Alowed to Run These Commands.` })

          const channel = interaction.channel
          const oldName = channel.name;

          client.settings.ensure(channel.id, {
                  ticketEmoji: ""
          })

          const setting = client.settings.get(channel.id, "ticketEmoji")

          channel.setName(oldName.replace(setting, "👑"))
          client.settings.set(channel.id, "👑" ,"ticketEmoji")

          await interaction.reply({
                 content: `<a:TicketLoading:1023053249407877141> Pinging Alexdev... (<@663442537222242306>)`
          })

          setTimeout(() => {
            interaction.editReply({ content: `<a:VerifedPurple:1009505593687560224> Successfully Pinged Alexdev, Lets Wait for his Response!` })
            }, 1500);

          channel.permissionOverwrites.set([
                  {
                      id: interaction.guild.roles.everyone,
                      deny: [PermissionFlagsBits.ViewChannel]
                  },
                  {
                     id: client.settings.get(interaction.channel.id, "ticketOpenerId"),
                     allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles]
                  }
          ])
    }
    if (interaction.options.getSubcommand() === 'setchauvin') {
      if(!interaction.member.roles.cache.has(`1005978927421980702`)) return interaction.reply({ content: `Only Staff Members Are Alowed to Run These Commands.` })

      const channel = interaction.channel
      const oldName = channel.name;
      const setting = client.settings.get(channel.id, "ticketEmoji")

      channel.setName(oldName.replace(setting, "👑"))
      client.settings.set(channel.id, "👑" ,"ticketEmoji")

      await interaction.reply({
             content: `<a:TicketLoading:1023053249407877141> Pinging Chauvin... (<@647962247666073610>)`
      })

      setTimeout(() => {
        interaction.editReply({ content: `<a:VerifedPurple:1009505593687560224> Successfully Pinged Chauvin, Lets Wait for his Response!` })
        }, 1500);

      channel.permissionOverwrites.set([
              {
                  id: interaction.guild.roles.everyone,
                  deny: [PermissionFlagsBits.ViewChannel]
              },
              {
                 id: client.settings.get(interaction.channel.id, "ticketOpenerId"),
                 allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles]
              }
      ])
    }
    if (interaction.options.getSubcommand() === 'setfinished') {

      if(!interaction.member.roles.cache.has(`1005978927421980702`)) return interaction.reply({ content: `Only Staff Members Are Alowed to Run These Commands.` })

      const channel = interaction.channel
      const oldName = channel.name; 
      const setting = client.settings.get(channel.id, "ticketEmoji")

      channel.setName(oldName.replace(setting, "✅"))
      client.settings.set(channel.id, "✅" ,"ticketEmoji")

      const ms = require("ms")
    
      let day = ms("1 day")

      day = Date.now() + day

      interaction.reply({
        content: `<a:VerifedGold:1009505411688317049> Successfully Set the ticket as Finished`,
        ephemeral: true
      })

      channel.send({
            content: `**Hello ${client.users.cache.get(client.settings.get(interaction.channel.id, "ticketOpenerId"))}!**\n\n> *Our Staff Teams Task is done! if you want to close this ticket, just click the \`Close ticket\` button below. otherwise this ticket will auto close at <t:${Math.floor(day/1000)}> |  <t:${Math.floor(day/1000)}:R>*\n\n **Best Regards,**\n> Roverdev Development`,
            components: [
                  new ActionRowBuilder().addComponents(
                             new ButtonBuilder().setLabel("Close Ticket").setCustomId("Close-Ticket-Finished").setStyle(ButtonStyle.Danger).setEmoji("1015745934090575964")
                  )
            ]
      })
      
      client.settings.set(channel.id, day, "Time")

      client.settings.ensure(interaction.guild.id, {
             PendingChannels: []
      })

      client.settings.push(interaction.guild.id, channel.id, "PendingChannels")

    }
    if (interaction.options.getSubcommand() === 'setimportant') {
      if(!interaction.member.roles.cache.has(`1005978927421980702`)) return interaction.reply({ content: `Only Staff Members Are Alowed to Run These Commands.` })


      const channel = interaction.channel
      const oldName = channel.name; 
      const setting = client.settings.get(channel.id, "ticketEmoji")

      channel.setName(oldName.replace(setting, "⛔"))
      client.settings.set(channel.id, "⛔" ,"ticketEmoji")

      await interaction.reply({
        content: `<a:TicketLoading:1023053249407877141> Pinging Mod Team... (<@&920292440223662100>, <@&920292439267348490>)`
 })

 setTimeout(() => {
   interaction.editReply({ content: `<a:VerifedPurple:1009505593687560224> Successfully Pinged Mod Team, wait for their Response!` })
   }, 1500);

 channel.permissionOverwrites.set([
         {
             id: interaction.guild.roles.everyone,
             deny: [PermissionFlagsBits.ViewChannel]
         },
         {
           id: "920292440223662100",
           allow: [ PermissionFlagsBits.ViewChannel],
           deny: [PermissionFlagsBits.SendMessages]
       },
         {
            id: client.settings.get(interaction.channel.id, "ticketOpenerId"),
            allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles]
         }
 ])
    }
    if (interaction.options.getSubcommand() === 'setmod') {
      if(!interaction.member.roles.cache.has(`1005978927421980702`)) return interaction.reply({ content: `Only Staff Members Are Alowed to Run These Commands.` })
      const channel = interaction.channel
      const oldName = channel.name; 
      const setting = client.settings.get(channel.id, "ticketEmoji")

      channel.setName(oldName.replace(setting, "⛔"))
      client.settings.set(channel.id, "⛔" ,"ticketEmoji")

      await interaction.reply({
             content: `<a:TicketLoading:1023053249407877141> Pinging Mod Team... (<@&920292440223662100>, <@&920292439267348490>)`
      })

      channel.permissionOverwrites.set([
        {
            id: interaction.guild.roles.everyone,
            deny: [PermissionFlagsBits.ViewChannel]
        },
        {
          id: "920292440223662100",
          allow: [ PermissionFlagsBits.ViewChannel],
          deny: [PermissionFlagsBits.SendMessages]
      },
        {
           id: client.settings.get(interaction.channel.id, "ticketOpenerId"),
           allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles]
        }
])

      setTimeout(() => {
        interaction.editReply({ content: `<a:VerifedPurple:1009505593687560224> Successfully Pinged Mod Team, wait for their Response!` })
        }, 1500);


    }
    if (interaction.options.getSubcommand() === 'setstaff') {
      if(!interaction.member.roles.cache.has(`1005978927421980702`)) return interaction.reply({ content: `Only Staff Members Are Alowed to Run These Commands.` })
      const channel = interaction.channel
      const oldName = channel.name; 
      const setting = client.settings.get(channel.id, "ticketEmoji")

      channel.setName(oldName.replace(setting, "🔖"))
      client.settings.set(channel.id, "🔖" ,"ticketEmoji")

      await interaction.reply({
             content: `<a:TicketLoading:1023053249407877141> Pinging Staff Team... (<@&1005978927421980702>)`
      })

      channel.permissionOverwrites.set([
        {
            id: interaction.guild.roles.everyone,
            deny: [PermissionFlagsBits.ViewChannel]
        },
        {
          id: "1005978927421980702",
          allow: [ PermissionFlagsBits.ViewChannel],
          deny: [PermissionFlagsBits.SendMessages]
      },
        {
           id: client.settings.get(interaction.channel.id, "ticketOpenerId"),
           allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles]
        }
])

      setTimeout(() => {
        interaction.editReply({ content: `<a:VerifedPurple:1009505593687560224> Successfully Pinged Staff Team, wait for their Response!` })
        }, 1500);

    }
    if (interaction.options.getSubcommand() === 'setowner') {
      if(!interaction.member.roles.cache.has(`1005978927421980702`)) return interaction.reply({ content: `Only Staff Members Are Alowed to Run These Commands.` })

      const channel = interaction.channel
      const oldName = channel.name;

      const setting = client.settings.get(channel.id, "ticketEmoji")

      channel.setName(oldName.replace(setting, "👑"))
      client.settings.set(channel.id, "👑" ,"ticketEmoji")

      await interaction.reply({
             content: `<a:TicketLoading:1023053249407877141> Pinging Owners... (<@&920292435853185054>, <@&920292436641718312>)`
      })

      setTimeout(() => {
        interaction.editReply({ content: `<a:VerifedPurple:1009505593687560224> Successfully Pinged Owners, wait for their Response!` })
        }, 1500);

      channel.permissionOverwrites.set([
              {
                  id: interaction.guild.roles.everyone,
                  deny: [PermissionFlagsBits.ViewChannel]
              },
              {
                 id: client.settings.get(interaction.channel.id, "ticketOpenerId"),
                 allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles]
              }
      ])
    }
    if (interaction.options.getSubcommand() === 'setwaiting') {
      if(!interaction.member.roles.cache.has(`1005978927421980702`)) return interaction.reply({ content: `Only Staff Members Are Alowed to Run These Commands.` })

      const channel = interaction.channel
      const oldName = channel.name; 
      const setting = client.settings.get(channel.id, "ticketEmoji")

      channel.setName(oldName.replace(setting, "⌛"))
      client.settings.set(channel.id, "⌛" ,"ticketEmoji")

      const ms = require("ms")
    
      let day = ms("1 day")

      day = Date.now() + day

      interaction.reply({
        content: `<a:VerifedGold:1009505411688317049> Successfully Set the ticket as Waiting`,
        ephemeral: true
      })

      channel.send({
            content: `**Hello ${client.users.cache.get(client.settings.get(interaction.channel.id, "ticketOpenerId"))}!**\n\n> *Could you please respond before <t:${Math.floor(day/1000)}> |  <t:${Math.floor(day/1000)}:R>, or else this ticket will be closed!*\n\n **Best Regards,**\n> Roverdev Development`,
      })
      
      client.settings.set(channel.id, day, "Time")

      client.settings.ensure(interaction.guild.id, {
             WaitingChannels: []
      })

      client.settings.push(interaction.guild.id, channel.id, "WaitingChannels")
    }
 }
 
 module.exports.conf = {
      Prefix: {
         aliases: [],
         enabled: true,
         ownerOnly: true,
         AdminOnly: true,
         userPermissions: []   
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
         name: "ticket",
         category: "ticket",
         cooldown: 2,
         usage: "<command>",
         description: "run the ticket commands",
       },
       Slash: {
         name: "ticket",
         description: "run ticket commands",
         category: "ticket",

         options: [
              {
                name: "add",
                description: "add a user / bot to the ticket",
                type: ApplicationCommandOptionType.Subcommand,
                status: true,
                options: [
                    {
                        name: `user`,
                        description: `user to add to the ticket.`,
                        type: ApplicationCommandOptionType.User,
                        required: true,
                     },
                ]
              },
              {
                name: "close",
                description: "close the ticket",
                status: true,
                type: ApplicationCommandOptionType.Subcommand,
              },
              {
                name: "remove",
                status: true,
                description: "remove a user from the ticket",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: `user`,
                        description: `user to add to the ticket.`,
                        type: ApplicationCommandOptionType.User,
                        required: true,
                     },
                ]
              },
              {
                name: "hide",
                status: true,
                description: "hide a user from the ticket",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: `user`,
                        description: `user to hide from the ticket ticket.`,
                        type: ApplicationCommandOptionType.User,
                        required: false,
                     },
                     {
                        name: `role`,
                        description: `role to hide from the ticket ticket.`,
                        type: ApplicationCommandOptionType.Role,
                        required: false,
                     },
                ]
              },
              {
                name: "show",
                status: true,
                description: "unhide a user from the ticket",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: `user`,
                        description: `user to hide from the ticket ticket.`,
                        type: ApplicationCommandOptionType.User,
                        required: false,
                     },
                     {
                        name: `role`,
                        description: `role to hide from the ticket ticket.`,
                        type: ApplicationCommandOptionType.Role,
                        required: false,
                     },
                ]
              },
              {
                name: "info",
                status: true,
                description: "show the status of the ticket",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: `channel`,
                        description: `channel to see ticket info.`,
                        type: ApplicationCommandOptionType.Channel,
                        required: true,
                     },
                ]
              },
              {
                name: "setalex",
                status: true,
                description: "set the ticket as Alex",
                type: ApplicationCommandOptionType.Subcommand,
              },
              {
                name: "forceclose",
                status: true,
                description: "forceclose a bot creation",
                type: ApplicationCommandOptionType.Subcommand,
              },
              {
                name: "setchauvin",
                status: true,
                description: "set the ticket as chauvin.",
                type: ApplicationCommandOptionType.Subcommand,
              },
              {
                name: "setfinished",
                status: true,
                description: "set the ticket as finished",
                type: ApplicationCommandOptionType.Subcommand,
              },
              {
                name: "setimportant",
                status: true,
                description: "set the ticket as important",
                type: ApplicationCommandOptionType.Subcommand,
              },
              {
                name: "setmod",
                description: "set the ticket as mod+",
                status: true,
                type: ApplicationCommandOptionType.Subcommand,
              },
              {
                name: "setstaff",
                status: true,
                description: "set the ticket back to staff",
                type: ApplicationCommandOptionType.Subcommand,
              },
              {
                name: "setowner",
                status: true,
                description: "set the ticket to owner only",
                type: ApplicationCommandOptionType.Subcommand,
              },
              {
                name: "setwaiting",
                status: true,
                description: "set the ticket as waiting",
                type: ApplicationCommandOptionType.Subcommand,
              }
              
         ]
       }
 }
/**
 *  ticket add
 *  ticket close
 *  ticket remove
 *  ticket setalex
 *  ticket setchauvin
 *  ticket setfinished
 *  ticket setimportant
 *  ticket setmod
 *  ticket setstaff
 *  ticket setowner
 *  ticket set waiting
 */