const { EmbedBuilder, channelLink, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js")

module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
       const data = client.TicketSystem.get(message.guild.id, `${message.channel.id}`)

       if (!data) {
              return message.reply({ content: `This channel is not a Ticket!` })       
        }
       
        const StaffRoles = client.TicketSystem.get(message.guild.id, `${data.TicketSetup}.StaffRoles`)

        if(message.member.roles.cache.has(StaffRoles[0]) || message.member.roles.cache.has(StaffRoles[1])) {
          const SetupData = client.TicketSystem.get(message.guild.id, `${data.TicketSetup}`)

          const Owner = data.Owner
          const OwnerName = data.OwnerUsername
          const ClaimedUsers = data.ClaimedUsers
          const TicketSetup = data.TicketSetup
          const ticketEmoji = data.ticketEmoji
          const Logger = SetupData.LoggerSystem

          const ClosedCategory = SetupData.ClosedCategory


          const embed = new EmbedBuilder()
          .setTitle(`Are you Sure?`)
          .setDescription(`Are you sure you want to close ${message.channel}?`)
          .setColor("Yellow")

          const row = new ActionRowBuilder()
          .addComponents(
                 new ButtonBuilder()
                 .setLabel("Close-Ticket")
                 .setCustomId("Close")
                 .setStyle(ButtonStyle.Success)
          )

           await message.channel.send({ embeds: [embed], components: [row] }).then((msg) => {
               
           })

           const filter = (interaction) => interaction.user.id === message.author.id;
                 
           const collector1 = message.channel.createMessageComponentCollector({
             filter,
             max: 1, 
             time: 50000,
           });

           collector1.on("collect", async interaction1 => {
             try {
                 if (interaction1.user.id !== message.author.id) return interaction1.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${message.author.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
             } catch(e) {
                   return;
             } 
             if (interaction1.customId == "Close") {
              const { createWriteStream, unlinkSync } = require('fs');

              const MainEmbed = new EmbedBuilder()
              .setAuthor({  name: `Ticket System | ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
              .setTitle(`${Logger.Messages.Title}`.replace("{GuildName}", message.guild.name))
              .setDescription(`${Logger.Messages.Description}`.replace("{channel}", message.channel).replace("{ClosedBy}", message.author))
              .addFields([
                      { name: `Ticket Closed By: `, value: `${message.author} | ${client.users.cache.get(message.author.id).username}`},
                      { name: `Ticket Channel:`, value: `<#${message.channel.id}> | ${message.channel.name}` },
                      { name: `Ticket Opened By:`, value: `<@!${Owner ? Owner : null}> | ${OwnerName ? OwnerName : null }` },
              ])
              .setColor("#3dbeff")
                if (ClaimedUsers.length > 0) {
                  MainEmbed.addFields([{
                      name: `All Users Who Claimed:`,
                      value: ` ${ClaimedUsers.map(m => `<@${m}> | ${client.users.cache.get(m) ? client.users.cache.get(m).username : "Invalid Username"}`).join("\n")}`
              }])
                }

                interaction1.message.edit({embeds: [
                     new EmbedBuilder()
                     .setTitle(`Successfully Closed the Ticket`)
                     .setColor("Green")
                 ], components: []})

              await message.channel.messages.fetch().then(async msg => {
                     let messages = msg.filter(msg => msg.author.bot !== true).map(m => {
                         const date = new Date(m.createdTimestamp).toLocaleString();
                         const user = `${m.author.tag}${m.author.id === Owner ? ' (ticket creator)' : ''}`;
               
                         return `${date} - ${user} : ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`;
                     }).reverse().join('\n');
               
                     if (messages.length < 1) messages = 'There are no messages in this ticket... strange';
               
                     const ticketID = Date.now();
               
                     const stream = createWriteStream(`./Ticket-Logs/${ticketID}.txt`);
               
                     stream.once('open', () => {
                         stream.write(`channel #${message.channel.name} | Channel ID: ${message.channel.id}\n\n`);
                         stream.write(`${messages}\n\nLogs ${new Date(ticketID).toLocaleString()}`);
               
                         stream.end();
                     });
                     stream.on('finish', () => {
                                if (Logger.Enabled == true) {
                                               const LoggerChannel = client.channels.cache.get(Logger.Channel)

                                               LoggerChannel.send({
                                                     embeds: [MainEmbed],
                                                     files: [`./Ticket-Logs/${ticketID}.txt`]
                                               })

                                               client.users.cache.get(Owner).send({
                                                  embeds: [MainEmbed],
                                                  files: [`./Ticket-Logs/${ticketID}.txt`]
                                               })
                                } else if (Logger.Enabled == false) {
                                  client.users.cache.get(Owner).send({
                                      embeds: [MainEmbed],
                                      files: [`./Ticket-Logs/${ticketID}.txt`]
                                   })
                                }

                                setTimeout(() => {
                                  unlinkSync(`./Ticket-Logs/${ticketID}.txt`)
                                }, 500);
                     })
                 });

                 message.channel.setTopic("Closed-Ticket")


                 if (client.channels.cache.get(ClosedCategory) == undefined) {

                  setTimeout(() => {
                    client.TicketSystem.remove(
                        message.guild.id,
                        message.channel.id,
                        `${TicketSetup}.OpenTickets`
                     )
                     client.TicketSystem.delete(message.guild.id, `${message.channel.id}`) 

                     client.TicketSystem.delete(message.guild.id, Owner)
                   }, 500);
                   setTimeout(() => {
                    message.channel.delete()
                   }, 5000);
                 } else if (client.channels.cache.get(ClosedCategory) !== undefined) {
                                  message.channel.setParent(ClosedCategory).catch((e) => {})

                                  message.channel.permissionOverwrites.set([
                                    { 
                                        id: message.guild.roles.everyone, 
                                        deny: [PermissionFlagsBits.ViewChannel] 
                                    },
                                ]);

                                setTimeout(() => {
                                  if (message.channel.parentId !== ClosedCategory) {
                                           message.channel.delete()
                                  }
                             }, 5000);   

                             setTimeout(() => {
                              message.channel.send({
                                     embeds: [
                                             new EmbedBuilder()
                                             .setTitle(`Ticket Got Closed Successfully`)
                                             .addFields([
                                                  { name: `Channel:`, value: `${message.channel}`, inline: true },
                                                  { name: `Closed By:`, value: `${message.author}`, inline: true }
                                             ])
                                             .setColor("#3dbeff")   
                                     ],
                              })
                          }, 500);
                                
                 }
             }
          })
        } else {
          return message.reply({  content: `Only staff is allowed to run this command` })
        }
}
module.exports.slashRun = async (interaction, client) => {
   // Code For Slash Here
}

module.exports.conf = {
     Prefix: {
        aliases: [],
        enabled: true,
        ownerOnly: false,
        AdminOnly: false,
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
        name: "close",
        category: "ticket",
        cooldown: 2,
        usage: "close",
        description: "close the ticket",
      },
      Slash: {
        name: "close",
        description: "close a ticket",
        category: "ticket",
      }
}