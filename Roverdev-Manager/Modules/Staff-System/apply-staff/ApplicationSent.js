const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageType } = require("discord.js")

module.exports = async Roverdev => {
       Roverdev.on(Events.MessageCreate, async message => {


             if (message.channel.parent && message.channel.parent.id == "1075974545380487249") {
              const data = Roverdev.StaffSystem.get(message.guild.id, `${message.channel.id}.User`)

              if (!data) return


              const ChannelData = Roverdev.StaffSystem.get(message.guild.id, `${data}.OpenApplications.${message.channel.id}`)

              if (ChannelData.UserResponded == "yes") return

              const embed = new EmbedBuilder()
              .setAuthor({ name: `Apply Staff - Roverdev Community`, iconURL: "https://cdn.discordapp.com/emojis/1075890682872483960.webp?size=96&quality=lossless" })
              .setColor("#50C878")
              .setThumbnail("https://cdn.discordapp.com/emojis/1075890682872483960.png")
              .setTitle(`Is this correct? (you can't go back)`)
              .setDescription(`\`\`\`yml\n${message.content}\`\`\``)

                
                if (message.author.id == ChannelData.User) {

                        const messageedit = await message.channel.messages.fetch(ChannelData.Message)

                        const row = new ActionRowBuilder()
                        .setComponents(
                               new ButtonBuilder()
                               .setLabel("Confirm")
                               .setEmoji("1023811776850186261")
                               .setCustomId("Application-Confirm")
                               .setStyle(ButtonStyle.Success),
                               new ButtonBuilder()
                               .setLabel("No, Cancel")
                               .setEmoji("1023811778087485491")
                               .setCustomId("Application-Cancel")
                               .setStyle(ButtonStyle.Danger)
                        )

                        messageedit.reply({ embeds: [embed], components: [row] })

                        message.channel.permissionOverwrites.edit(message.author.id, { ViewChannel: true, SendMessages: false})

                        Roverdev.StaffSystem.set(message.guild.id, message.content, `${data}.OpenApplications.${message.channel.id}.ApplicationMessage`)
                }
             }
       } )

       Roverdev.on(Events.InteractionCreate, async interaction => {
              if (interaction.customId == "Application-Cancel") {
                     const data = Roverdev.StaffSystem.get(interaction.guild.id, `${interaction.channel.id}.User`)

                     if (!data) return
       
                     const ChannelData = Roverdev.StaffSystem.get(interaction.guild.id, `${data}.OpenApplications.${interaction.channel.id}`)

                     if (interaction.user.id !== ChannelData.User) return interaction.reply({ content: `You Are not alowed to press this.`, ephemeral: true })

                     await interaction.channel.messages.fetch().then(async msg => {
                            msg.forEach(message => {
                                   if (message.id == ChannelData.Message) return
                                   if (message.type == MessageType.ChannelPinnedMessage) return
                                   interaction.channel.messages.fetch(message.id).then((msgdelete) => {
                                          msgdelete.delete()
                                   })
                            });
                     })

                     interaction.channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true, SendMessages: true})
              }
              if (interaction.customId == "Application-Confirm") {

                     const data = Roverdev.StaffSystem.get(interaction.guild.id, `${interaction.channel.id}.User`)

                     if (!data) return
       
                     const ChannelData = Roverdev.StaffSystem.get(interaction.guild.id, `${data}.OpenApplications.${interaction.channel.id}`)

                     if (interaction.user.id !== ChannelData.User) return interaction.reply({ content: `You Are not alowed to press this.`, ephemeral: true })
 
                     // close the channel
                     interaction.channel.setParent("1040996273546866708", { lockpermissions: true })
                     // send the user the dm
                     interaction.user.send({
                             embeds: [
                                    new EmbedBuilder()
                                    .setAuthor({ name: `Apply Staff - Roverdev Community`, iconURL: "https://cdn.discordapp.com/emojis/1075890682872483960.webp?size=96&quality=lossless" })
                                    .setColor("Yellow")
                                    .setTitle(`<:application:1075890682872483960> Your Application is Pending Right now!`)
                                    .setDescription(`Please wait for a owner / founder to accept your application ( Could take a bit so please wait )\n> While you are waiting you can be active in <#935190175510835290> to increase your chance`)
                             ]
                     })
                     // send info to the channel (with buttons and stuff)
                     Roverdev.channels.cache.get("1075926532809310339").send({
                             content: `<@&1016060228866953236>, <@&1074791453622018180>, <@&920292435853185054> New Application is here! Read below:`,
                             embeds: [ 
                                     new EmbedBuilder()
                                     .setAuthor({ name: `Apply Staff - Roverdev Community`, iconURL: "https://cdn.discordapp.com/emojis/1075890682872483960.webp?size=96&quality=lossless" })
                                     .setColor("Orange")
                                     .setTitle(`<:application:1075890682872483960>  New Application, Here is the information!`)
                                     .setDescription(`> **User:** ${interaction.user}\n> Application Sent: <t:${Math.floor(Date.now()/1000)}:R>\n\n ***Application:***\n\`\`\`yml\n${ChannelData.ApplicationMessage}\`\`\`\n\n***Button Information:***\n\`\`\`yml\nAccepted\n- This will bring up a modal and you will put the reason of why accepting.\`\`\`\n\n\`\`\`yml\nMaybe\n- this will being up a modal and you will put the questions you have for this user!\`\`\`\n\`\`\`yml\nDeclined\n- This will bring up a modal and you will have to put the reason why its declined.\`\`\`\n\`\`\`yml\nPending\n- This means you are looking in to it.\`\`\``)
                             ],
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
                                          .setStyle(ButtonStyle.Primary),
                                   )
                             ]
                     }).then((msg) => {
                            Roverdev.StaffSystem.set(interaction.guild.id, {
                                   Message: msg.id,
                                   User: interaction.user.id,
                                   Status: "⌛ Pending",
                                   ApplicationMessage: ChannelData.ApplicationMessage,
                                   ApplicationSent: Date.now()
                             }, `${interaction.user.id}.PendingApplication`)

                             Roverdev.StaffSystem.set(interaction.guild.id, interaction.user.id, `${msg.id}`)

                             interaction.reply({ content: `<:application:1075890682872483960>  Check your direct messages`, ephemeral: true })
                     })

                     setTimeout(() => {
                            Roverdev.StaffSystem.delete(interaction.guild.id, `${data}.OpenApplications.${interaction.channel.id}`)
                            Roverdev.StaffSystem.delete(interaction.guild.id, `${data}.ApplicationOpen`)
                            Roverdev.StaffSystem.delete(Roverdev.guilds.cache.get("1081700920993259550").id, `${interaction.channel.id}.User`)
                            setTimeout(() => {
                                   interaction.channel.delete()
                            }, 10000);
                     }, 5000);
              }
       })

       Roverdev.logger.info(require("colors").yellow(`Checking Appliaction-Inacitve [Every min!]`), { label: "Application-System" })
       setInterval(() => {
              Roverdev.logger.info(require("colors").yellow(`Now Checking Appliaction-Inacitve [Every min!]`), { label: "Application-System" })

              Roverdev.guilds.cache.get("1081700920993259550").channels.cache.get("1075974545380487249").children.cache.forEach(m => {
                     const data = Roverdev.StaffSystem.get(Roverdev.guilds.cache.get("1081700920993259550").id, `${m.id}.User`)

                     if (!data) return
       
                     const ChannelData = Roverdev.StaffSystem.get(Roverdev.guilds.cache.get("1081700920993259550").id, `${data}.OpenApplications.${m.id}`)

                     if (ChannelData.TimeToRespond < Date.now()) {
                            m.setParent("1040996273546866708", { lockpermissions: true })

                            Roverdev.users.cache.get(ChannelData.User).send({
                                    embeds: [
                                           new EmbedBuilder()
                                           .setAuthor({ name: `Apply Staff - Roverdev Community`, iconURL: "https://cdn.discordapp.com/emojis/1075890682872483960.webp?size=96&quality=lossless" })
                                           .setColor("Red")
                                           .setTitle(`Your Application Got Deleted due to inactivity!`)
                                    ]
                            })

                            setTimeout(() => {
                                   Roverdev.StaffSystem.delete(Roverdev.guilds.cache.get("1081700920993259550").id, `${data}.OpenApplications.${m.id}`)
                                   Roverdev.StaffSystem.delete(Roverdev.guilds.cache.get("1081700920993259550").id, `${m.id}.User`)
                                   setTimeout(() => {
                                          m.delete()
                                   }, 10000);
                            }, 5000);
                     }
              })
       }, 60000);
}