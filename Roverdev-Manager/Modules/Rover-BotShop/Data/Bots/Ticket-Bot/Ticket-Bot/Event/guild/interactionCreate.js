
const { EmbedBuilder, Collection, PermissionFlagsBits, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Timeout = new Collection()
const humanizeDuration = require("humanize-duration");
const ms = require("ms")
module.exports = async(client, interaction) => {
    if (interaction?.customId == "Claim-Ticket") {
              const data = client.TicketSystem.get(interaction.guild.id, `${interaction.channel.id}`)

              const StaffRoles = client.TicketSystem.get(interaction.guild.id, `${data.TicketSetup}.StaffRoles`)

              if(interaction.member.roles.cache.has(StaffRoles[0]) || interaction.member.roles.cache.has(StaffRoles[1])) {
                const SetupData = client.TicketSystem.get(interaction.guild.id, `${data.TicketSetup}`)
                const ClaimedUsers = data.ClaimedUsers
  
                if (ClaimedUsers.includes(interaction.user.id)) {
                         return interaction.reply({ content: `You Already Claimed This Ticket`, ephemeral: true})
                }
  
                if (data.Owner == interaction.user.id) return interaction.reply({ content: `You Can't Claim your own ticket!`, ephemeral: true})
  
                const TicketSetup = data.TicketSetup
  
                const embed = new EmbedBuilder()
                .setDescription(`${SetupData.ClaimSystem.MessageClaim}`.replace("{user}", `<@!${interaction.user.id}>`))
                .setColor("Green")
  
                client.TicketSystem.push(interaction.guild.id, interaction.user.id, `${interaction.channel.id}.ClaimedUsers`)
  
                interaction.deferUpdate().catch(e => {}) 
  
                interaction.channel.send({
                     embeds: [embed]
                })
              } else {
                return interaction.reply({  content: `Only staff is allowed to claim the tickets`, ephemeral: true })
              }

    }
    if (interaction?.customId.includes("Setup")) {
        const TicketData = `${interaction.customId}`.slice(14, 20)
        const data = client.TicketSystem.get(interaction.guild.id, `${TicketData}`)

        const OpenedTicket = client.TicketSystem.get(interaction.guild.id, `${interaction.user.id}.OpenedTicket`)

        if (OpenedTicket) {
                return interaction.reply({ content: `You Already have a ticket Open: <#${OpenedTicket}>`, ephemeral: true})
        }
        interaction.guild.channels.create({
            name: `${data.ChannelName}`.replace("{username}", interaction.user.username),
            type:  ChannelType.GuildText,
            parent: data.OpenCategory, 
            
          }).then(async function(channel) {

            interaction.reply({ content: `Successfully Opened Your Ticket: ${channel}`, ephemeral: true })
              channel.permissionOverwrites.create(interaction.user.id, {
                ViewChannel: true,
                SendMessages: true
              })

              channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                ViewChannel: false,
              })
            
            if (data.StaffRoles.length > 0) {
                   data.StaffRoles.forEach(role => {
                            channel.permissionOverwrites.create(role, {
                                       ViewChannel: true,
                                       SendMessages: true
                            })
                   })
            }

            client.TicketSystem.push(
                      interaction.guild.id,
                      channel.id,
                      `${TicketData}.OpenTickets`
                )

                client.TicketSystem.set(
                        interaction.guild.id, 
                        {
                             Owner: interaction.user.id,
                             OwnerUsername: interaction.user.username,
                             ClaimedUsers: [],
                             TicketSetup: TicketData,
                             ticketEmoji: "🔖"
                        }, `${channel.id}`)

                        client.TicketSystem.set(
                             interaction.guild.id, 
                             channel.id,
                             `${interaction.user.id}.OpenedTicket`)

            const embed = new EmbedBuilder()
            .setAuthor({name: `Ticket System | ${interaction.guild.name}`, iconURL: "https://i.imgur.com/a31Of53.png" })
            .setTitle(`${data.OpenMessages.Title}`.replace("{user}", interaction.user.username))
            .setDescription(` ${data.OpenMessages.Description}`)
            .setColor("Green")

            const ClaimButton = new ButtonBuilder()
            .setLabel("Claim")
            .setCustomId(`Claim-Ticket`)
            .setStyle(ButtonStyle.Success)

            if (data.ClaimSystem.Enabled == true) {
                  ClaimButton.setDisabled(false)
            }

            if (data.ClaimSystem.Enabled == false) {
                ClaimButton.setDisabled(true)
          }

            const row = new ActionRowBuilder()
            .addComponents(ClaimButton)



            channel.send({
                   embeds: [embed],
                   components: [row],
                   content: `${interaction.user}\n> Support Roles: ${data.StaffRoles.length > 0 ? data.StaffRoles.map(m => `<@&${m}>`).join(",") : "No Staff Roles"}`
            }).then((msg) => msg.pin())
            
          }).catch((e) => {
            interaction.guild.channels.create({
                name: `${data.ChannelName}`.replace("{username}", interaction.user.username),
                type:  ChannelType.GuildText,
                
              }).then(async function(channel) {
    
                interaction.reply({ content: `Successfully Opened Your Ticket: ${channel}`, ephemeral: true })
                  channel.permissionOverwrites.create(interaction.user.id, {
                    ViewChannel: true,
                    SendMessages: true
                  })
    
                  channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                    ViewChannel: false,
                  })
                
                if (data.StaffRoles.length > 0) {
                       data.StaffRoles.forEach(role => {
                                channel.permissionOverwrites.create(role, {
                                           ViewChannel: true,
                                           SendMessages: true
                                })
                       })
                }
    
                client.TicketSystem.push(
                          interaction.guild.id,
                          channel.id,
                          `${TicketData}.OpenTickets`
                    )
    
                    client.TicketSystem.set(
                            interaction.guild.id, 
                            {
                                 Owner: interaction.user.id,
                                 OwnerUsername: interaction.user.username,
                                 ClaimedUsers: [],
                                 TicketSetup: TicketData,
                                 ticketEmoji: "🔖"
                            }, `${channel.id}`)
    
                            client.TicketSystem.set(
                                 interaction.guild.id, 
                                 channel.id,
                                 `${interaction.user.id}.OpenedTicket`)
    
                const embed = new EmbedBuilder()
                .setAuthor({name: `Ticket System | ${interaction.guild.name}`, iconURL: "https://i.imgur.com/a31Of53.png" })
                .setTitle(`${data.OpenMessages.Title}`.replace("{user}", interaction.user.username))
                .setDescription(` ${data.OpenMessages.Description}`)
                .setColor("Green")
    
                const ClaimButton = new ButtonBuilder()
                .setLabel("Claim")
                .setCustomId(`Claim-Ticket`)
                .setStyle(ButtonStyle.Success)
    
                if (data.ClaimSystem.Enabled == true) {
                      ClaimButton.setDisabled(false)
                }
    
                if (data.ClaimSystem.Enabled == false) {
                    ClaimButton.setDisabled(true)
              }
    
                const row = new ActionRowBuilder()
                .addComponents(ClaimButton)
    
    
    
                channel.send({
                       embeds: [embed],
                       components: [row],
                       content: `${interaction.user}\n> Support Roles: ${data.StaffRoles.length > 0 ? data.StaffRoles.map(m => `<@&${m}>`).join(",") : "No Staff Roles"}`
                }).then((msg) => msg.pin())
                
              })
          })

      }
	if (interaction.commandName) {
		if (interaction.isCommand() || interaction.isContextMenu()) {
			if (!interaction.guild) return;
			const command = client.container.slash.get(interaction.commandName)
			try {
                if (command.conf.Slash.timeout) {
                    const now = Date.now(); //get the current time
                    const timestamps = Timeout.get(command.help.Slash.name);
                    const cooldownAmount = (command.conf.Slash.timeout || 1) * 1000;
					if (Timeout.has(interaction.user.id)) {
                        let expirationTime = Timeout.get(interaction.user.id) + cooldownAmount
                        if (now < expirationTime) {
                            let timeLeft = (expirationTime - now) / 1000; //get the lefttime
                            console.log(timeLeft)
                            if(timeLeft < 1) timeLeft = Math.round(timeLeft)
                            if(timeLeft && timeLeft != 0){
                                const embed = new EmbedBuilder()
                                .setTitle('You are in timeout!')
                                .setDescription(`You need to wait **${Math.round(timeLeft.toFixed(1))} more second(s) ** to use the command again`)
                                .setColor('#ff0000')
                                return interaction.reply({ embeds: [embed], ephemeral: true })
                            }
                        }
					}
				}
                if (command.conf.Slash.enabled == false) {
                    return interaction.reply({
                        embeds: [
                           new EmbedBuilder()
                           .setTitle('Command Disabled')
                           .setDescription(`:x: This command is Disabled Right now.`)
                           .setColor('#ff0000')
                           .setTimestamp()
                        ], ephemeral: true
                   });
                }
                if (command.conf.Slash.ownerOnly == true) {
                    if (!client.config.Owners.includes(interaction.user.id)) {
                        return interaction.reply({
                             embeds: [
                                 new EmbedBuilder()
                                 .setTitle('Missing Permission')
                                 .setDescription(`:x: You Need to Be: ${client.config.Owners.map(id => `<@${id}>`).join("\n")}`)
                                 .setColor('#ff0000')
                                 .setTimestamp()
                             ],ephemeral: true
                        })
               }
                }
                if (command.conf.Slash.AdminOnly == true) {
                    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
                        return interaction.reply({
                             embeds: [
                                 new EmbedBuilder()
                                 .setTitle('Missing Permission')
                                 .setDescription(`:x: You Must be admin to run this command`)
                                 .setColor('#ff0000')
                                 .setTimestamp()
                             ], ephemeral: true
                        })
               }
                }
                if (!interaction.member.permissions.has(command.conf.Slash.userPermissions || [])) {
                    return message.reply({
                        embeds: [
                           new EmbedBuilder()
                           .setTitle('Missing Permission')
                           .setDescription(`:x: You need \`${command.conf.Slash.userPermissions}\` to use this command`)
                           .setColor('#ff0000')
                           .setTimestamp()
                        ]
                   });
                   }
                command.slashRun(interaction, client);
                Timeout.set(interaction.user.id, Date.now())
                Timeout.set(command.help.Slash.name, new Collection())

                setTimeout(() => {
                    Timeout.delete(`${interaction.user.id}${command.help.Slash.name}`)
                }, command.conf.Slash.timeout);
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: ':x: There was an error while executing this command!', ephemeral: true });
			}
		}
	}
} 