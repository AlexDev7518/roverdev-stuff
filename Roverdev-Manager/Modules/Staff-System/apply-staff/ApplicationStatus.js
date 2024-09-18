const { Events, ModalBuilder, ActionRowBuilder, TextInputComponent, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle, EmbedBuilder, ChannelType, PermissionFlagsBits } = require("discord.js");
const DeclinedApplication = require("../../../Databases/Schema/StaffSystem/DeclinedApplication");

module.exports = async Roverdev => {
      Roverdev.on(Events.InteractionCreate, async interaction => {
            if (interaction.isModalSubmit()) {
                  if (interaction.customId === 'Accept-Modal') {
                        await interaction.reply({ content: `<:application:1075890682872483960> Acceping User Please wait......`, ephemeral: true})

                        const reason = interaction.fields.getTextInputValue('answer');

                        const data = Roverdev.StaffSystem.get(interaction.guild.id, `${interaction.message.id}`)

                        


                        interaction.guild.channels.create({
                              name: `📜╎sa-${data}`,
                              type: ChannelType.GuildText,
                              parent: Roverdev.guilds.cache.get("1081700920993259550").channels.cache.find(m => m.name.includes("⌛")).id,
                              permissionOverwrites: [
                                     {
                                      id: interaction.user.id,
                                      allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages]
                                },
                                {
                                     id: interaction.guild.roles.everyone,
                                     deny: [PermissionFlagsBits.ViewChannel]
                                },
                              ]
                             }).then(async function(channel) {
                                     const embed = new EmbedBuilder()
                                     .setAuthor({ name: `Apply Staff - Roverdev Community`, iconURL: "https://cdn.discordapp.com/emojis/1075890682872483960.webp?size=96&quality=lossless" })
                                     .setColor("#32CD32")
                                     .setTitle(`Congrats on getting staff!`)
                                     .setDescription(`Hello, You just got accepted to be a roverdev staff member. But we have some rules you need to accept so please read <#1040982260284936242> and accept all rules there, once you read all of them you can confirm button below and i will give you the staff roles\n\n***Reply From: ${interaction.user}***\n\`\`\`yml\n${reason}\n\`\`\``)

                                     const row = new ActionRowBuilder()
                                     .addComponents(
                                           new ButtonBuilder()
                                           .setLabel("Confirm, Accept rules")
                                           .setCustomId("Confirm-Rules")
                                           .setEmoji("1058275136786149386")
                                           .setStyle(ButtonStyle.Success)
                                     )

                                     const dataSent = { embeds: [embed], components: [row], content: `<@!${data}>, Please Read below and make sure to accept the staff rules\n> **Accepted By:** ${interaction.user}` }

                                     channel.send(dataSent).then((msg) => {
                                          Roverdev.StaffSystem.set(interaction.guild.id, {
                                                Message: msg.id,
                                                User: data,
                                                AcceptedBy: interaction.user.id,
                                                Status: "⌛ Pending [Accepted]",
                                          }, `${data}.PendingApplication`)
             
                                          Roverdev.StaffSystem.set(interaction.guild.id, data, `${msg.id}`)
                                     })

                                     Roverdev.channels.cache.get("1040982260284936242").permissionOverwrites.edit(data, { ViewChannel: true })

                                     Roverdev.users.cache.get(data).send({
                                            content: `You just got accepted but we need you to confirm some stuff, head over to ${channel}!`
                                     })

                                     channel.permissionOverwrites.edit(data, { ViewChannel: true, SendMessages: true})

                                     await interaction.editReply({ content: `<:application:1075890682872483960> Successfully Accepted user.`, ephemeral: true})

                                     interaction.channel.messages.fetch(interaction.message.id).then((msg) => {
                                          msg.edit({
                                                 components: [
                                                     new ActionRowBuilder()
                                                     .setComponents(
                                                            new ButtonBuilder()
                                                            .setLabel("Accepted")
                                                            .setEmoji("1023811776850186261")
                                                            .setCustomId("Application-Accept")
                                                            .setDisabled(true)
                                                            .setStyle(ButtonStyle.Success),
                                                            new ButtonBuilder()
                                                            .setLabel("Maybe")
                                                            .setEmoji("1020501975562977332")
                                                            .setCustomId("Application-Maybe")
                                                            .setDisabled(true)
                                                            .setStyle(ButtonStyle.Secondary),
                                                            new ButtonBuilder()
                                                            .setLabel("Decline")
                                                            .setEmoji("1023811778087485491")
                                                            .setCustomId("Application-Decline")
                                                            .setDisabled(true)
                                                            .setStyle(ButtonStyle.Danger),
                                                            new ButtonBuilder()
                                                            .setLabel("Pending")
                                                            .setEmoji("1015666266125635674")
                                                            .setCustomId("Application-Pending")
                                                            .setDisabled(true)
                                                            .setStyle(ButtonStyle.Primary),
                                                     )
                                                 ]
                                          })
                                   })
                             })
                  }

                  if (interaction.customId === 'Modal-Maybe') {
                        await interaction.reply({ content: `<:application:1075890682872483960> Sending User Please wait....`, ephemeral: true})

                        const reason = interaction.fields.getTextInputValue('answer');

                        const data = Roverdev.StaffSystem.get(interaction.guild.id, `${interaction.message.id}`)


                        interaction.guild.channels.create({
                              name: `⌛╎sa-${Roverdev.users.cache.get(data).username}`,
                              type: ChannelType.GuildText,
                              parent: Roverdev.guilds.cache.get("1081700920993259550").channels.cache.find(m => m.name.includes("⌛")).id,
                              permissionOverwrites: [
                                     {
                                      id: interaction.user.id,
                                      allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages]
                                },
                                {
                                    id: data,
                                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages]
                              },
                                {
                                     id: interaction.guild.roles.everyone,
                                     deny: [PermissionFlagsBits.ViewChannel]
                                },
                              ]
                             }).then(async function(channel) {
                                     const embed = new EmbedBuilder()
                                     .setAuthor({ name: `Apply Staff - Roverdev Community`, iconURL: "https://cdn.discordapp.com/emojis/1075890682872483960.webp?size=96&quality=lossless" })
                                     .setColor("Yellow")
                                     .setTitle(`We have some questions to ask!`)
                                     .setDescription(`We have some questions to ask for you\n> Please Answer the questions below.\n\`\`\`yml\n${reason}\`\`\``)

                                     const row = new ActionRowBuilder()
                                     .addComponents(
                                           new ButtonBuilder()
                                           .setLabel("Confirm, Accept User")
                                           .setCustomId("Confirm-User")
                                           .setEmoji("1058275136786149386")
                                           .setStyle(ButtonStyle.Success),
                                           new ButtonBuilder()
                                           .setLabel('Blank')
                                           .setCustomId("n/a")
                                           .setDisabled(true)
                                           .setStyle(ButtonStyle.Secondary),
                                           new ButtonBuilder()
                                           .setLabel("Decline User")
                                           .setCustomId("Decline-User")
                                           .setEmoji("1058275134944858193")
                                           .setStyle(ButtonStyle.Danger)
                                     )

                                     const dataSent = { embeds: [embed], components: [row], content: `<@!${data}>, Please answer the questions blow and ${interaction.user} will handle this!` }

                                     channel.send(dataSent).then((msg) => {
                                          Roverdev.StaffSystem.set(interaction.guild.id, {
                                                Message: msg.id,
                                                User: data,
                                                Status: "⌛ Pending [Questions]",
                                          }, `${data}.PendingApplication`)
             
                                          Roverdev.StaffSystem.set(interaction.guild.id, data, `${msg.id}`)
                                     })

                                     Roverdev.users.cache.get(data).send({
                                            content: `You need to answer some questions to move on to the next step, head over to ${channel}!`
                                     })

                                     await interaction.editReply({ content: `<:application:1075890682872483960> Succesfully Created ${channel}.`, ephemeral: true})

                                     interaction.channel.messages.fetch(interaction.message.id).then((msg) => {
                                          msg.edit({
                                                 components: [
                                                     new ActionRowBuilder()
                                                     .setComponents(
                                                            new ButtonBuilder()
                                                            .setLabel("Accepted")
                                                            .setEmoji("1023811776850186261")
                                                            .setCustomId("Application-Accept")
                                                            .setDisabled(true)
                                                            .setStyle(ButtonStyle.Success),
                                                            new ButtonBuilder()
                                                            .setLabel("Maybe")
                                                            .setEmoji("1020501975562977332")
                                                            .setCustomId("Application-Maybe")
                                                            .setDisabled(true)
                                                            .setStyle(ButtonStyle.Secondary),
                                                            new ButtonBuilder()
                                                            .setLabel("Decline")
                                                            .setEmoji("1023811778087485491")
                                                            .setCustomId("Application-Decline")
                                                            .setDisabled(true)
                                                            .setStyle(ButtonStyle.Danger),
                                                            new ButtonBuilder()
                                                            .setLabel("Pending")
                                                            .setEmoji("1015666266125635674")
                                                            .setCustomId("Application-Pending")
                                                            .setDisabled(true)
                                                            .setStyle(ButtonStyle.Primary),
                                                     )
                                                 ]
                                          })
                                   })
                             })
                  }
                  if (interaction.customId === 'Modal-Decline') {
                        await interaction.reply({ content: `<:application:1075890682872483960> Sending User Please wait :cry:....`, ephemeral: true})

                        const reason = interaction.fields.getTextInputValue('answer');

                        const data = Roverdev.StaffSystem.get(interaction.guild.id, `${interaction.message.id}`)

                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Apply Staff - Roverdev Community`, iconURL: "https://cdn.discordapp.com/emojis/1075890682872483960.webp?size=96&quality=lossless" })
                        .setColor("#32CD32")
                        .setTitle(`You Got Declined!`)
                        .setDescription(`You Sadly Got Declined from joining the roverdev staff team\n> Action By: ${interaction.user}\nReason:\n\`\`\`yml\n${reason}\n\`\`\``)

                        Roverdev.users.cache.get(data).send({ embeds: [ embed] })

                        setTimeout(() => {
                              Roverdev.StaffSystem.delete(interaction.guild.id, `${data}.PendingApplication`)
                             Roverdev.StaffSystem.delete(interaction.guild.id, `${interaction.message.id}`)
                        }, 10000);

                        await interaction.editReply({ content: `<:application:1075890682872483960> Successfully Declined the user! :cry:`, ephemeral: true})

                        
                        interaction.channel.messages.fetch(interaction.message.id).then((msg) => {
                              msg.edit({
                                     components: [
                                         new ActionRowBuilder()
                                         .setComponents(
                                                new ButtonBuilder()
                                                .setLabel("Accepted")
                                                .setEmoji("1023811776850186261")
                                                .setCustomId("Application-Accept")
                                                .setDisabled(true)
                                                .setStyle(ButtonStyle.Success),
                                                new ButtonBuilder()
                                                .setLabel("Maybe")
                                                .setEmoji("1020501975562977332")
                                                .setCustomId("Application-Maybe")
                                                .setDisabled(true)
                                                .setStyle(ButtonStyle.Secondary),
                                                new ButtonBuilder()
                                                .setLabel("Decline")
                                                .setEmoji("1023811778087485491")
                                                .setCustomId("Application-Decline")
                                                .setDisabled(true)
                                                .setStyle(ButtonStyle.Danger),
                                                new ButtonBuilder()
                                                .setLabel("Pending")
                                                .setEmoji("1015666266125635674")
                                                .setCustomId("Application-Pending")
                                                .setDisabled(true)
                                                .setStyle(ButtonStyle.Primary),
                                         )
                                     ]
                              })
                       })
                  }
            }

            if (interaction.customId == "Decline-User") {

                  if (interaction.member.roles.cache.has("1016060228866953236") || interaction.member.roles.cache.has("1074791453622018180") || interaction.member.roles.cache.has("920292435853185054")) {
                        await interaction.reply({ content: `<:application:1075890682872483960> Decline User Please wait :cry:....`, ephemeral: true})

                        const data = Roverdev.StaffSystem.get(interaction.guild.id, `${interaction.message.id}`)

                        const ms = require("ms")
    
                        let CloseCreation = ms(`30d`)
                  
                        CloseCreation = Date.now() + CloseCreation

                        await DeclinedApplication.create({
                               Author: data,
                               DateToReApply: CloseCreation
                        })
      
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Apply Staff - Roverdev Community`, iconURL: "https://cdn.discordapp.com/emojis/1075890682872483960.webp?size=96&quality=lossless" })
                        .setColor("#32CD32")
                        .setTitle(`You Got Declined!`)
                        .setDescription(`You Sadly Got Declined from joining the roverdev staff team\n> Action By: ${interaction.user}`)
      
                        Roverdev.users.cache.get(data).send({ embeds: [ embed], content: `you may reapply again <t:${Math.floor(CloseCreation/1000)}:R>`})

                        interaction.channel.send({ content: `this user may reapply again <t:${Math.floor(CloseCreation/1000)}:R>` })
      
                        setTimeout(() => {
                              Roverdev.StaffSystem.delete(interaction.guild.id, `${data}.PendingApplication`)
                             Roverdev.StaffSystem.delete(interaction.guild.id, `${interaction.message.id}`)
                             interaction.channel.setParent("1040996273546866708", { lockpermissions: true })
                             setTimeout(() => {
                              interaction.channel.delete()
                          }, 30000);
                        }, 10000);

      
      
                        await interaction.editReply({ content: `<:application:1075890682872483960> Successfully Declined the user! :cry:`, ephemeral: true})
                  } else {
                         return interaction.reply({ content: `You Can't press this button!` , ephemeral: true })
                  }
            }

            if (interaction.customId == "Confirm-User") {
                  if (interaction.member.roles.cache.has("1016060228866953236") || interaction.member.roles.cache.has("1074791453622018180") || interaction.member.roles.cache.has("920292435853185054")) {
                        const grab = Roverdev.StaffSystem.get(interaction.guild.id, `${interaction.message.id}`)
                        const data = Roverdev.StaffSystem.get(interaction.guild.id, `${grab}.PendingApplication`)
      
      
                        interaction.guild.members.cache.get(grab).roles.add("1005978927421980702")
      
                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Apply Staff - Roverdev Community`, iconURL: "https://cdn.discordapp.com/emojis/1075890682872483960.webp?size=96&quality=lossless" })
                        .setColor("#32CD32")
                        .setTitle(`Welcome to the staff team!`)
                        .setDescription(`Welcome <@${grab}> to the staff team of roverdev!\n> Make sure to check out the staff chats and chat with us if you need help or hangout with us`)
      
                        Roverdev.channels.cache.get("1060642264067616869").send({ content: `Welcome ${interaction.guild.members.cache.get(grab)} To the Roverdev Staff team :v:\n> Make sure to join: https://discord.gg/N74828NTyq` })


      
                        interaction.channel.send({ embeds: [embed], content: `Channel will be deleted in 30s` })
                        interaction.guild.members.cache.get(grab).send({ embeds: [embed] })
      
                        Roverdev.StaffSystem.delete(interaction.guild.id, `${grab}.PendingApplication`)
                        Roverdev.StaffSystem.delete(interaction.guild.id, `${interaction.message.id}`)
      
                        Roverdev.channels.cache.get("1075662320614776873").send({
                             embeds: [
                                   new EmbedBuilder()
                                   .setAuthor({ name: `Apply Staff - Roverdev Community`, iconURL: "https://cdn.discordapp.com/emojis/1075890682872483960.webp?size=96&quality=lossless" })
                                   .setColor("#32CD32")
                                   .setDescription(`***Welcome <@${grab}> to ${interaction.guild.name} Staff Team***! If you would like to chat with us check out <#1060642264067616869> also make sure to join our staff server!\n\n> Staff Server: https://discord.gg/N74828NTyq`)
                             ], content: `<@${grab}> welcome to ${interaction.guild.name} staff!`
                        })
      
                        interaction.channel.setParent("1040996273546866708", { lockpermissions: true })
      
                        setTimeout(() => {
                            interaction.channel.delete()
                        }, 30000);
                  } else {
                        return interaction.reply({ content: `You Can't press this button!`, ephemeral: true })
                 }
            }

            if (interaction.customId == "Confirm-Rules") {
                  const grab = Roverdev.StaffSystem.get(interaction.guild.id, `${interaction.message.id}`)
                  const data = Roverdev.StaffSystem.get(interaction.guild.id, `${grab}.PendingApplication`)


                  interaction.channel.setParent("1040996273546866708", { lockpermissions: true })

                  if (interaction.user.id !== grab) return interaction.reply({ content: `Only <@${grab}> can push this button!`, ephemeral: true })

                  Roverdev.channels.cache.get("1040982260284936242").permissionOverwrites.delete(grab)

                  interaction.guild.members.cache.get(interaction.user.id).roles.add("1005978927421980702")

               setTimeout(() => {
                  const embed = new EmbedBuilder()
                  .setAuthor({ name: `Apply Staff - Roverdev Community`, iconURL: "https://cdn.discordapp.com/emojis/1075890682872483960.webp?size=96&quality=lossless" })
                  .setColor("#32CD32")
                  .setTitle(`Welcome to the staff team!`)
                  .setDescription(`Welcome <@${grab}> to the staff team of roverdev!\n> Make sure to check out the staff chats and chat with us if you need help or hangout with us`)

                  Roverdev.channels.cache.get("1060642264067616869").send({ content: `Welcome ${interaction.user} To the Roverdev Staff team :v:\n> Make sure to join: https://discord.gg/N74828NTyq` })

                  interaction.channel.send({ embeds: [embed], content: `Channel will be deleted in 30s` })
                  interaction.user.send({ embeds: [embed] })

                  Roverdev.StaffSystem.delete(interaction.guild.id, `${grab}.PendingApplication`)
                  Roverdev.StaffSystem.delete(interaction.guild.id, `${interaction.message.id}`)

                  Roverdev.channels.cache.get("1075662320614776873").send({
                       embeds: [
                             new EmbedBuilder()
                             .setAuthor({ name: `Apply Staff - Roverdev Community`, iconURL: "https://cdn.discordapp.com/emojis/1075890682872483960.webp?size=96&quality=lossless" })
                             .setColor("#32CD32")
                             .setDescription(`***Welcome <@${grab}> to ${interaction.guild.name} Staff Team***! If you would like to chat with us check out <#1060642264067616869> also make sure to join our staff server!\n\n> Staff Server: https://discord.gg/N74828NTyq`)
                       ], content: `<@${grab}> welcome to ${interaction.guild.name} staff!\n> Accepted By: <@!${data.AcceptedBy}>`
                  })


                  setTimeout(() => {
                      interaction.channel.delete()
                  }, 30000);
               }, 10000);
          }
           if (interaction.customId == "Application-Accept") {
                const modal = new ModalBuilder()
                   .setCustomId("Accept-Modal")
                   .setTitle(`Staff Application Control`)
                   .setComponents(
                         new ActionRowBuilder()
                         .setComponents(
                                new TextInputBuilder()
                                .setCustomId("answer")
                                .setLabel("Please Provide why accept this user")
                                .setPlaceholder(`Because...`)
                                .setRequired(true)
                                .setStyle(TextInputStyle.Paragraph)
                                
                         )
                   )
                   
                   await interaction.showModal(modal)
           }
           if (interaction.customId == "Application-Maybe") {
            const modal = new ModalBuilder()
            .setCustomId("Modal-Maybe")
            .setTitle(`Staff Application Control`)
            .setComponents(
                  new ActionRowBuilder()
                  .setComponents(
                         new TextInputBuilder()
                         .setCustomId("answer")
                         .setLabel("Please Provide the questions to ask")
                         .setPlaceholder(`1) Cause...\n 2) how...`)
                         .setValue(`1) \n2) \n3) `)
                         .setRequired(true)
                         .setStyle(TextInputStyle.Paragraph)
                         
                  )
            )
            
            await interaction.showModal(modal)
           }
           if (interaction.customId == "Application-Decline") {
            const modal = new ModalBuilder()
            .setCustomId("Modal-Decline")
            .setTitle(`Staff Application Control`)
            .setComponents(
                  new ActionRowBuilder()
                  .setComponents(
                         new TextInputBuilder()
                         .setCustomId("answer")
                         .setLabel("Please Provide why decline this user!")
                         .setPlaceholder(`because...`)
                         .setRequired(true)
                         .setStyle(TextInputStyle.Paragraph)
                         
                  )
            )
            
            await interaction.showModal(modal)
           }
           if (interaction.customId == "Application-Pending") {
                  interaction.channel.messages.fetch(interaction.message.id).then((msg) => {
                         msg.edit({
                                components: [
                                    new ActionRowBuilder()
                                    .setComponents(
                                           new ButtonBuilder()
                                           .setLabel("Accepted")
                                           .setEmoji("1023811776850186261")
                                           .setCustomId("Application-Accept")
                                           .setStyle(ButtonStyle.Success),
                                           new ButtonBuilder()
                                           .setLabel("Maybe")
                                           .setEmoji("1020501975562977332")
                                           .setCustomId("Application-Maybe")
                                           .setStyle(ButtonStyle.Secondary),
                                           new ButtonBuilder()
                                           .setLabel("Decline")
                                           .setEmoji("1023811778087485491")
                                           .setCustomId("Application-Decline")
                                           .setStyle(ButtonStyle.Danger),
                                           new ButtonBuilder()
                                           .setLabel("Pending")
                                           .setEmoji("1015666266125635674")
                                           .setCustomId("Application-Pending")
                                           .setDisabled(true)
                                           .setStyle(ButtonStyle.Primary),
                                    )
                                ]
                         })
                  })

                  await interaction.reply({ content: `<:application:1075890682872483960>  Sending the user that the application is waiting for your responce...`, ephemeral: true})

                  const data = Roverdev.StaffSystem.get(interaction.guild.id, `${interaction.message.id}`)

                  Roverdev.users.cache.get(data).send({
                          embeds: [ 
                               new EmbedBuilder()
                               .setAuthor({ name: `Apply Staff - Roverdev Community`, iconURL: "https://cdn.discordapp.com/emojis/1075890682872483960.webp?size=96&quality=lossless" })
                               .setColor("Green")
                               .setTitle(`Your Application is being looked at right now!`)
                          ]
                  })

                  await interaction.editReply({ content: `<:application:1075890682872483960>  Successfully Sent the user that the application is waiting for your responce!`, ephemeral: true})
           } 
      })
}