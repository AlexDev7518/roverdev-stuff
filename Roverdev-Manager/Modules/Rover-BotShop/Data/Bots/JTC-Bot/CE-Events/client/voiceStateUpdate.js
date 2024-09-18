const { random } = require("colors");

module.exports = async (client, oldState, newState) => {
    const { ChannelType, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
    const user = client.users.cache.get(newState.id)
    
    const data = client.settings.get(newState.guild.id)
    if (data) {
        const data = client.settings.get(newState.guild.id, "JTC1-channel")
        const data2 = client.settings.get(newState.guild.id, "JTC2-channel")
        const data3 = client.settings.get(newState.guild.id, "JTC3-channel")
        const data4 = client.settings.get(newState.guild.id, "JTC4-channel")
        const data5 = client.settings.get(newState.guild.id, "JTC5-channel")
        if (data && newState.channelId == data) {
           const Moderator = client.settings.get(newState.guild.id, `JTC1-Moderator`)

           if (Moderator) {
            client.channels.cache.get(data).permissionOverwrites.edit(newState.id, 
                {
                 ViewChannel: false,
                 Connect: true,
                 Speak: true
                })
            newState.guild.channels.create({
                name: `${client.users.cache.get(newState.id).username}'s Room`,
                type: ChannelType.GuildVoice,
                parent: client.settings.get(newState.guild.id, "JTC1-Category") ? client.settings.get(newState.guild.id, "JTC1-Category") : newState.channel.parent.id, 
                permissionOverwrites: [
                    {
                        id: newState.id,
                        allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
                    },
                    { 
                        id: newState.guild.roles.everyone, 
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    { 
                        id: Moderator, 
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect, PermissionFlagsBits.Speak]
                    },
                    
                ]
              }).then(async function(channel) {
                   console.log(`Created The Channel: ${channel.name}`)
                   newState.setChannel(channel.id).catch(err => console.log(err));
                   console.log(`Succesfully Moved the User`)

                   const channel2 = client.channels.cache.get(client.settings.get(newState.guild.id ? newState.guild.id : oldState.guild.id, "JTC1-Logger"))

                   if (channel2) {
                    channel2.send({
                        embeds: [
                            new EmbedBuilder()
                            .setAuthor({ 
                             name: 
                             client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorName") ? 
                             client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorName") : `Succesfully Created | Join to Create System`, 
                             iconURL: 
                             client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorIcon") ? 
                             client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorIcon") : client.user.displayAvatarURL() 
                             })
                            .setTitle(client.settings.get(newState.guild.id, "JTC1-LogMessage-Title") ? client.settings.get(newState.guild.id, "JTC1-LogMessage-Title") : `Succesfully Created The Channel!`)
                            .setDescription(
                             client.settings.get(newState.guild.id, "JTC1-LogMessage-Description") ? 
                             client.settings.get(newState.guild.id, "JTC1-LogMessage-Description")
                             .replace("{user}", `<@${newState.id}>`)
                             .replace("{channel}", `<#${channel.id}>`) : `<:check:1005732038004981780> Succesfully Created: <#${channel.id}>\n> For: <@${newState.id}>`)
                            .setColor(
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Color") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Color") : `Red`
                             )
                             .setImage(
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Image") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Image") : "https://i.imgur.com/NdxxUEn.png"
                             )
                             .setThumbnail(
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Thumbnail") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Thumbnail") : client.user.displayAvatarURL() 
                             )
                             .setURL(
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-URL") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-URL") : null
                             )
                        ]
                     })
                   }
                   client.settings.set(newState.guild.id, channel.id , `${newState.id}.Channel`)
                   client.settings.set(newState.guild.id, newState.id , `${channel.id}.Owner`)
                   client.settings.set(newState.guild.id, data , `${channel.id}.JTCChannel`)
              })
           } else if (!Moderator) {
            client.channels.cache.get(data).permissionOverwrites.edit(newState.id, 
                {
                 ViewChannel: false,
                 Connect: true,
                 Speak: true
                })
            newState.guild.channels.create({
                name: `${client.users.cache.get(newState.id).username}'s Room`,
                type: ChannelType.GuildVoice,
                parent: client.settings.get(newState.guild.id, "JTC1-Category") ? client.settings.get(newState.guild.id, "JTC1-Category") : newState.channel.parent.id, 
                permissionOverwrites: [
                    {
                        id: newState.id,
                        allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
                    },
                    { 
                        id: newState.guild.roles.everyone, 
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    
                ]
              }).then(async function(channel) {
                   console.log(`Created The Channel: ${channel.name}`)
                   newState.setChannel(channel.id).catch(err => console.log(err));
                   console.log(`Succesfully Moved the User`)

                   const channel2 = client.channels.cache.get(client.settings.get(newState.guild.id ? newState.guild.id : oldState.guild.id, "JTC1-Logger"))

                   if (channel2) {
                    channel2.send({
                        embeds: [
                            new EmbedBuilder()
                            .setAuthor({ 
                             name: 
                             client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorName") ? 
                             client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorName") : `Succesfully Created | Join to Create System`, 
                             iconURL: 
                             client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorIcon") ? 
                             client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorIcon") : client.user.displayAvatarURL() 
                             })
                            .setTitle(client.settings.get(newState.guild.id, "JTC1-LogMessage-Title") ? client.settings.get(newState.guild.id, "JTC1-LogMessage-Title") : `Succesfully Created The Channel!`)
                            .setDescription(
                             client.settings.get(newState.guild.id, "JTC1-LogMessage-Description") ? 
                             client.settings.get(newState.guild.id, "JTC1-LogMessage-Description")
                             .replace("{user}", `<@${newState.id}>`)
                             .replace("{channel}", `<#${channel.id}>`) : `<:check:1005732038004981780> Succesfully Created: <#${channel.id}>\n> For: <@${newState.id}>`)
                            .setColor(
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Color") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Color") : `Red`
                             )
                             .setImage(
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Image") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Image") : "https://i.imgur.com/NdxxUEn.png"
                             )
                             .setThumbnail(
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Thumbnail") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Thumbnail") : client.user.displayAvatarURL() 
                             )
                             .setURL(
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-URL") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-URL") : null
                             )
                        ]
                     })
                   }

                   client.settings.set(newState.guild.id, channel.id , `${newState.id}.Channel`)
                   client.settings.set(newState.guild.id, newState.id , `${channel.id}.Owner`)
                   client.settings.set(newState.guild.id, data , `${channel.id}.JTCChannel`)
              })
           }           
        }
        if ( data2 && newState.channelId == data2) {

            const Moderator = client.settings.get(newState.guild.id, `JTC2-Moderator`)

            if (Moderator) {
                client.channels.cache.get(data2).permissionOverwrites.edit(newState.id, 
                    {
                     ViewChannel: false,
                     Connect: true,
                     Speak: true
                    })
                newState.guild.channels.create({
                    name: `${client.users.cache.get(newState.id).username}'s Room`,
                    type: ChannelType.GuildVoice,
                    parent: client.settings.get(newState.guild.id, "JTC2-Category") ? client.settings.get(newState.guild.id, "JTC1-Category") : newState.channel.parent.id, 
                    permissionOverwrites: [
                        {
                            id: newState.id,
                            allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
                        },
                        { 
                            id: newState.guild.roles.everyone, 
                            allow: [PermissionFlagsBits.ViewChannel]
                        },
                        {
                            id: Moderator,
                            allow: [PermissionFlagsBits.Connect, PermissionFlagsBits.Speak]
                        }
                        
                    ]
                  }).then(async function(channel) {
                       console.log(`Created The Channel: ${channel.name}`)
                       newState.setChannel(channel.id).catch(err => console.log(err));
                       console.log(`Succesfully Moved the User`)
    
                       const channel2 = client.channels.cache.get(client.settings.get(newState.guild.id ? newState.guild.id : oldState.guild.id, "JTC1-Logger"))
    
                       if (channel2) {
                        channel2.send({
                            embeds: [
                                new EmbedBuilder()
                                .setAuthor({ 
                                 name: 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorName") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorName") : `Succesfully Created | Join to Create System`, 
                                 iconURL: 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorIcon") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorIcon") : client.user.displayAvatarURL() 
                                 })
                                .setTitle(client.settings.get(newState.guild.id, "JTC1-LogMessage-Title") ? client.settings.get(newState.guild.id, "JTC1-LogMessage-Title") : `Succesfully Created The Channel!`)
                                .setDescription(
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Description") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Description")
                                 .replace("{user}", `<@${newState.id}>`)
                                 .replace("{channel}", `<#${channel.id}>`) : `<:check:1005732038004981780> Succesfully Created: <#${channel.id}>\n> For: <@${newState.id}>`)
                                .setColor(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Color") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Color") : `Red`
                                 )
                                 .setImage(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Image") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Image") : "https://i.imgur.com/NdxxUEn.png"
                                 )
                                 .setThumbnail(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Thumbnail") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Thumbnail") : client.user.displayAvatarURL() 
                                 )
                                 .setURL(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-URL") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-URL") : null
                                 )
                            ]
                         })
                       }
    
                       client.settings.set(newState.guild.id, channel.id , `${newState.id}.Channel`)
                       client.settings.set(newState.guild.id, newState.id , `${channel.id}.Owner`)
                       client.settings.set(newState.guild.id, data2 , `${channel.id}.JTCChannel`)

                  })
            } else if (!Moderator) {
                client.channels.cache.get(data2).permissionOverwrites.edit(newState.id, 
                    {
                     ViewChannel: false,
                     Connect: true,
                     Speak: true
                    })
                newState.guild.channels.create({
                    name: `${client.users.cache.get(newState.id).username}'s Room`,
                    type: ChannelType.GuildVoice,
                    parent: client.settings.get(newState.guild.id, "JTC2-Category") ? client.settings.get(newState.guild.id, "JTC1-Category") : newState.channel.parent.id, 
                    permissionOverwrites: [
                        {
                            id: newState.id,
                            allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
                        },
                        { 
                            id: newState.guild.roles.everyone, 
                            allow: [PermissionFlagsBits.ViewChannel]
                        },
                        
                    ]
                  }).then(async function(channel) {
                       console.log(`Created The Channel: ${channel.name}`)
                       newState.setChannel(channel.id).catch(err => console.log(err));
                       console.log(`Succesfully Moved the User`)
    
                       const channel2 = client.channels.cache.get(client.settings.get(newState.guild.id ? newState.guild.id : oldState.guild.id, "JTC1-Logger"))
    
                       if (channel2) {
                        channel2.send({
                            embeds: [
                                new EmbedBuilder()
                                .setAuthor({ 
                                 name: 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorName") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorName") : `Succesfully Created | Join to Create System`, 
                                 iconURL: 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorIcon") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorIcon") : client.user.displayAvatarURL() 
                                 })
                                .setTitle(client.settings.get(newState.guild.id, "JTC1-LogMessage-Title") ? client.settings.get(newState.guild.id, "JTC1-LogMessage-Title") : `Succesfully Created The Channel!`)
                                .setDescription(
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Description") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Description")
                                 .replace("{user}", `<@${newState.id}>`)
                                 .replace("{channel}", `<#${channel.id}>`) : `<:check:1005732038004981780> Succesfully Created: <#${channel.id}>\n> For: <@${newState.id}>`)
                                .setColor(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Color") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Color") : `Red`
                                 )
                                 .setImage(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Image") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Image") : "https://i.imgur.com/NdxxUEn.png"
                                 )
                                 .setThumbnail(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Thumbnail") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Thumbnail") : client.user.displayAvatarURL() 
                                 )
                                 .setURL(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-URL") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-URL") : null
                                 )
                            ]
                         })
                       }
    
                       client.settings.set(newState.guild.id, channel.id , `${newState.id}.Channel`)
                       client.settings.set(newState.guild.id, newState.id , `${channel.id}.Owner`)
                       client.settings.set(newState.guild.id, data2 , `${channel.id}.JTCChannel`)
                  })
            }
        }
        if (data3 && newState.channelId == data3) {

            const Moderator = client.settings.get(newState.guild.id, `JTC3-Moderator`)

            if (Moderator) {
                client.channels.cache.get(data3).permissionOverwrites.edit(newState.id, 
                    {
                     ViewChannel: false,
                     Connect: true,
                     Speak: true
                    })
                newState.guild.channels.create({
                    name: `${client.users.cache.get(newState.id).username}'s Room`,
                    type: ChannelType.GuildVoice,
                    parent: client.settings.get(newState.guild.id, "JTC3-Category") ? client.settings.get(newState.guild.id, "JTC1-Category") : newState.channel.parent.id, 
                    permissionOverwrites: [
                        {
                            id: newState.id,
                            allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
                        },
                        { 
                            id: newState.guild.roles.everyone, 
                            allow: [PermissionFlagsBits.ViewChannel]
                        },
                        {
                            id: Moderator,
                            allow: [PermissionFlagsBits.Connect, PermissionFlagsBits.Speak]
                        }
                        
                    ]
                  }).then(async function(channel) {
                       console.log(`Created The Channel: ${channel.name}`)
                       newState.setChannel(channel.id).catch(err => console.log(err));
                       console.log(`Succesfully Moved the User`)
    
                       const channel2 = client.channels.cache.get(client.settings.get(newState.guild.id ? newState.guild.id : oldState.guild.id, "JTC1-Logger"))
    
                       if (channel2) {
                        channel2.send({
                            embeds: [
                                new EmbedBuilder()
                                .setAuthor({ 
                                 name: 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorName") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorName") : `Succesfully Created | Join to Create System`, 
                                 iconURL: 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorIcon") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorIcon") : client.user.displayAvatarURL() 
                                 })
                                .setTitle(client.settings.get(newState.guild.id, "JTC1-LogMessage-Title") ? client.settings.get(newState.guild.id, "JTC1-LogMessage-Title") : `Succesfully Created The Channel!`)
                                .setDescription(
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Description") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Description")
                                 .replace("{user}", `<@${newState.id}>`)
                                 .replace("{channel}", `<#${channel.id}>`) : `<:check:1005732038004981780> Succesfully Created: <#${channel.id}>\n> For: <@${newState.id}>`)
                                .setColor(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Color") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Color") : `Red`
                                 )
                                 .setImage(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Image") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Image") : "https://i.imgur.com/NdxxUEn.png"
                                 )
                                 .setThumbnail(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Thumbnail") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Thumbnail") : client.user.displayAvatarURL() 
                                 )
                                 .setURL(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-URL") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-URL") : null
                                 )
                            ]
                         })
                       }
    
                       client.settings.set(newState.guild.id, channel.id , `${newState.id}.Channel`)
                       client.settings.set(newState.guild.id, newState.id , `${channel.id}.Owner`)
                       client.settings.set(newState.guild.id, data3 , `${channel.id}.JTCChannel`)
                  })
            } else if (!Moderator) {
                client.channels.cache.get(data3).permissionOverwrites.edit(newState.id, 
                    {
                     ViewChannel: false,
                     Connect: true,
                     Speak: true
                    })
                newState.guild.channels.create({
                    name: `${client.users.cache.get(newState.id).username}'s Room`,
                    type: ChannelType.GuildVoice,
                    parent: client.settings.get(newState.guild.id, "JTC3-Category") ? client.settings.get(newState.guild.id, "JTC1-Category") : newState.channel.parent.id, 
                    permissionOverwrites: [
                        {
                            id: newState.id,
                            allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
                        },
                        { 
                            id: newState.guild.roles.everyone, 
                            allow: [PermissionFlagsBits.ViewChannel]
                        },
                        
                    ]
                  }).then(async function(channel) {
                       console.log(`Created The Channel: ${channel.name}`)
                       newState.setChannel(channel.id).catch(err => console.log(err));
                       console.log(`Succesfully Moved the User`)
    
                       const channel2 = client.channels.cache.get(client.settings.get(newState.guild.id ? newState.guild.id : oldState.guild.id, "JTC1-Logger"))
    
                       if (channel2) {
                        channel2.send({
                            embeds: [
                                new EmbedBuilder()
                                .setAuthor({ 
                                 name: 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorName") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorName") : `Succesfully Created | Join to Create System`, 
                                 iconURL: 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorIcon") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorIcon") : client.user.displayAvatarURL() 
                                 })
                                .setTitle(client.settings.get(newState.guild.id, "JTC1-LogMessage-Title") ? client.settings.get(newState.guild.id, "JTC1-LogMessage-Title") : `Succesfully Created The Channel!`)
                                .setDescription(
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Description") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Description")
                                 .replace("{user}", `<@${newState.id}>`)
                                 .replace("{channel}", `<#${channel.id}>`) : `<:check:1005732038004981780> Succesfully Created: <#${channel.id}>\n> For: <@${newState.id}>`)
                                .setColor(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Color") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Color") : `Red`
                                 )
                                 .setImage(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Image") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Image") : "https://i.imgur.com/NdxxUEn.png"
                                 )
                                 .setThumbnail(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Thumbnail") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Thumbnail") : client.user.displayAvatarURL() 
                                 )
                                 .setURL(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-URL") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-URL") : null
                                 )
                            ]
                         })
                       }
    
                       client.settings.set(newState.guild.id, channel.id , `${newState.id}.Channel`)
                       client.settings.set(newState.guild.id, newState.id , `${channel.id}.Owner`)
                       client.settings.set(newState.guild.id, data3 , `${channel.id}.JTCChannel`)
                  })
            }

        }
        if (data4 && newState.channelId == data4) {

            const Moderator = client.settings.get(newState.guild.id, `JTC4-Moderator`)

            if (Moderator) {
                client.channels.cache.get(data4).permissionOverwrites.edit(newState.id, 
                    {
                     ViewChannel: false,
                     Connect: true,
                     Speak: true
                    })
                newState.guild.channels.create({
                    name: `${client.users.cache.get(newState.id).username}'s Room`,
                    type: ChannelType.GuildVoice,
                    parent: client.settings.get(newState.guild.id, "JTC4-Category") ? client.settings.get(newState.guild.id, "JTC1-Category") : newState.channel.parent.id, 
                    permissionOverwrites: [
                        {
                            id: newState.id,
                            allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
                        },
                        { 
                            id: newState.guild.roles.everyone, 
                            allow: [PermissionFlagsBits.ViewChannel]
                        },
                        {
                            id: Moderator,
                            allow: [PermissionFlagsBits.Connect, PermissionFlagsBits.Speak]
                        }
                        
                    ]
                  }).then(async function(channel) {
                       console.log(`Created The Channel: ${channel.name}`)
                       newState.setChannel(channel.id).catch(err => console.log(err));
                       console.log(`Succesfully Moved the User`)
    
                       const channel2 = client.channels.cache.get(client.settings.get(newState.guild.id ? newState.guild.id : oldState.guild.id, "JTC1-Logger"))
    
                       if (channel2) {
                        channel2.send({
                            embeds: [
                                new EmbedBuilder()
                                .setAuthor({ 
                                 name: 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorName") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorName") : `Succesfully Created | Join to Create System`, 
                                 iconURL: 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorIcon") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorIcon") : client.user.displayAvatarURL() 
                                 })
                                .setTitle(client.settings.get(newState.guild.id, "JTC1-LogMessage-Title") ? client.settings.get(newState.guild.id, "JTC1-LogMessage-Title") : `Succesfully Created The Channel!`)
                                .setDescription(
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Description") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Description")
                                 .replace("{user}", `<@${newState.id}>`)
                                 .replace("{channel}", `<#${channel.id}>`) : `<:check:1005732038004981780> Succesfully Created: <#${channel.id}>\n> For: <@${newState.id}>`)
                                .setColor(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Color") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Color") : `Red`
                                 )
                                 .setImage(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Image") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Image") : "https://i.imgur.com/NdxxUEn.png"
                                 )
                                 .setThumbnail(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Thumbnail") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Thumbnail") : client.user.displayAvatarURL() 
                                 )
                                 .setURL(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-URL") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-URL") : null
                                 )
                            ]
                         })
                       }
    
                       client.settings.set(newState.guild.id, channel.id , `${newState.id}.Channel`)
                       client.settings.set(newState.guild.id, newState.id , `${channel.id}.Owner`)
                       client.settings.set(newState.guild.id, data4 , `${channel.id}.JTCChannel`)
                  })
            } else if (!Moderator) {
                client.channels.cache.get(data4).permissionOverwrites.edit(newState.id, 
                    {
                     ViewChannel: false,
                     Connect: true,
                     Speak: true
                    })
                newState.guild.channels.create({
                    name: `${client.users.cache.get(newState.id).username}'s Room`,
                    type: ChannelType.GuildVoice,
                    parent: client.settings.get(newState.guild.id, "JTC4-Category") ? client.settings.get(newState.guild.id, "JTC1-Category") : newState.channel.parent.id, 
                    permissionOverwrites: [
                        {
                            id: newState.id,
                            allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
                        },
                        { 
                            id: newState.guild.roles.everyone, 
                            allow: [PermissionFlagsBits.ViewChannel]
                        },
                        
                    ]
                  }).then(async function(channel) {
                       console.log(`Created The Channel: ${channel.name}`)
                       newState.setChannel(channel.id).catch(err => console.log(err));
                       console.log(`Succesfully Moved the User`)
    
                       const channel2 = client.channels.cache.get(client.settings.get(newState.guild.id ? newState.guild.id : oldState.guild.id, "JTC1-Logger"))
    
                       if (channel2) {
                        channel2.send({
                            embeds: [
                               new EmbedBuilder()
                               .setAuthor({ 
                                name: 
                                client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorName") ? 
                                client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorName") : `Succesfully Created | Join to Create System`, 
                                iconURL: 
                                client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorIcon") ? 
                                client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorIcon") : client.user.displayAvatarURL() 
                                })
                               .setTitle(client.settings.get(newState.guild.id, "JTC1-LogMessage-Title") ? client.settings.get(newState.guild.id, "JTC1-LogMessage-Title") : `Succesfully Created The Channel!`)
                               .setDescription(
                                client.settings.get(newState.guild.id, "JTC1-LogMessage-Description") ? 
                                client.settings.get(newState.guild.id, "JTC1-LogMessage-Description")
                                .replace("{user}", `<@${newState.id}>`)
                                .replace("{channel}", `<#${channel.id}>`) : `<:check:1005732038004981780> Succesfully Created: <#${channel.id}>\n> For: <@${newState.id}>`)
                               .setColor(
                                    client.settings.get(newState.guild.id, "JTC1-LogMessage-Color") ? 
                                    client.settings.get(newState.guild.id, "JTC1-LogMessage-Color") : `Red`
                                )
                                .setImage(
                                    client.settings.get(newState.guild.id, "JTC1-LogMessage-Image") ? 
                                    client.settings.get(newState.guild.id, "JTC1-LogMessage-Image") : "https://i.imgur.com/NdxxUEn.png"
                                )
                                .setThumbnail(
                                    client.settings.get(newState.guild.id, "JTC1-LogMessage-Thumbnail") ? 
                                    client.settings.get(newState.guild.id, "JTC1-LogMessage-Thumbnail") : client.user.displayAvatarURL() 
                                )
                                .setURL(
                                    client.settings.get(newState.guild.id, "JTC1-LogMessage-URL") ? 
                                    client.settings.get(newState.guild.id, "JTC1-LogMessage-URL") : null
                                )
                            ]
                         })
                       }
    
                       client.settings.set(newState.guild.id, channel.id , `${newState.id}.Channel`)
                       client.settings.set(newState.guild.id, newState.id , `${channel.id}.Owner`)
                       client.settings.set(newState.guild.id, data4 , `${channel.id}.JTCChannel`)
                  })
            }
        }
        if (data5 && newState.channelId == data5) {

            const Moderator = client.settings.get(newState.guild.id, `JTC5-Moderator`)

            if (Moderator) {
                client.channels.cache.get(data5).permissionOverwrites.edit(newState.id, 
                    {
                     ViewChannel: false,
                     Connect: true,
                     Speak: true
                    })
                newState.guild.channels.create({
                    name: `${client.users.cache.get(newState.id).username}'s Room`,
                    type: ChannelType.GuildVoice,
                    parent: client.settings.get(newState.guild.id, "JTC5-Category") ? client.settings.get(newState.guild.id, "JTC1-Category") : newState.channel.parent.id, 
                    permissionOverwrites: [
                        {
                            id: newState.id,
                            allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
                        },
                        { 
                            id: newState.guild.roles.everyone, 
                            allow: [PermissionFlagsBits.ViewChannel]
                        },
                        {
                            id: Moderator,
                            allow: [PermissionFlagsBits.Connect, PermissionFlagsBits.Speak]
                        }
                        
                    ]
                  }).then(async function(channel) {
                       console.log(`Created The Channel: ${channel.name}`)
                       newState.setChannel(channel.id).catch(err => console.log(err));
                       console.log(`Succesfully Moved the User`)
    
                       const channel2 = client.channels.cache.get(client.settings.get(newState.guild.id ? newState.guild.id : oldState.guild.id, "JTC1-Logger"))
    
                       if (channel2) {
                        channel2.send({
                            embeds: [
                                new EmbedBuilder()
                                .setAuthor({ 
                                 name: 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorName") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorName") : `Succesfully Created | Join to Create System`, 
                                 iconURL: 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorIcon") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorIcon") : client.user.displayAvatarURL() 
                                 })
                                .setTitle(client.settings.get(newState.guild.id, "JTC1-LogMessage-Title") ? client.settings.get(newState.guild.id, "JTC1-LogMessage-Title") : `Succesfully Created The Channel!`)
                                .setDescription(
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Description") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Description")
                                 .replace("{user}", `<@${newState.id}>`)
                                 .replace("{channel}", `<#${channel.id}>`) : `<:check:1005732038004981780> Succesfully Created: <#${channel.id}>\n> For: <@${newState.id}>`)
                                .setColor(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Color") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Color") : `Red`
                                 )
                                 .setImage(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Image") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Image") : "https://i.imgur.com/NdxxUEn.png"
                                 )
                                 .setThumbnail(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Thumbnail") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Thumbnail") : client.user.displayAvatarURL() 
                                 )
                                 .setURL(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-URL") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-URL") : null
                                 )
                            ]
                         })
                       }
                       client.settings.set(newState.guild.id, channel.id , `${newState.id}.Channel`)
                       client.settings.set(newState.guild.id, newState.id , `${channel.id}.Owner`)
                       client.settings.set(newState.guild.id, data5 , `${channel.id}.JTCChannel`)
                  })
            } else if (!Moderator) {
                client.channels.cache.get(data5).permissionOverwrites.edit(newState.id, 
                    {
                     ViewChannel: false,
                     Connect: true,
                     Speak: true
                    })
                newState.guild.channels.create({
                    name: `${client.users.cache.get(newState.id).username}'s Room`,
                    type: ChannelType.GuildVoice,
                    parent: client.settings.get(newState.guild.id, "JTC5-Category") ? client.settings.get(newState.guild.id, "JTC1-Category") : newState.channel.parent.id, 
                    permissionOverwrites: [
                        {
                            id: newState.id,
                            allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
                        },
                        { 
                            id: newState.guild.roles.everyone, 
                            allow: [PermissionFlagsBits.ViewChannel]
                        },
                        
                    ]
                  }).then(async function(channel) {
                       console.log(`Created The Channel: ${channel.name}`)
                       newState.setChannel(channel.id).catch(err => console.log(err));
                       console.log(`Succesfully Moved the User`)
    
                       const channel2 = client.channels.cache.get(client.settings.get(newState.guild.id ? newState.guild.id : oldState.guild.id, "JTC1-Logger"))
    
                       if (channel2) {
                        channel2.send({
                            embeds: [
                                new EmbedBuilder()
                                .setAuthor({ 
                                 name: 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorName") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorName") : `Succesfully Created | Join to Create System`, 
                                 iconURL: 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorIcon") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-AuthorIcon") : client.user.displayAvatarURL() 
                                 })
                                .setTitle(client.settings.get(newState.guild.id, "JTC1-LogMessage-Title") ? client.settings.get(newState.guild.id, "JTC1-LogMessage-Title") : `Succesfully Created The Channel!`)
                                .setDescription(
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Description") ? 
                                 client.settings.get(newState.guild.id, "JTC1-LogMessage-Description")
                                 .replace("{user}", `<@${newState.id}>`)
                                 .replace("{channel}", `<#${channel.id}>`) : `<:check:1005732038004981780> Succesfully Created: <#${channel.id}>\n> For: <@${newState.id}>`)
                                .setColor(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Color") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Color") : `Red`
                                 )
                                 .setImage(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Image") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Image") : "https://i.imgur.com/NdxxUEn.png"
                                 )
                                 .setThumbnail(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Thumbnail") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-Thumbnail") : client.user.displayAvatarURL() 
                                 )
                                 .setURL(
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-URL") ? 
                                     client.settings.get(newState.guild.id, "JTC1-LogMessage-URL") : null
                                 )
                            ]
                         })
                       }
                       
                       client.settings.set(newState.guild.id, channel.id , `${newState.id}.Channel`)
                       client.settings.set(newState.guild.id, newState.id , `${channel.id}.Owner`)
                       client.settings.set(newState.guild.id, data5 , `${channel.id}.JTCChannel`)
                  })
            }
        }
        const Channel = client.settings.get(oldState.guild.id, `${oldState.id}.Channel`)
        const Owner = client.settings.get(oldState.guild.id, `${Channel}.Owner`)
        const JTC = client.settings.get(oldState.guild.id, `${Channel}.JTCChannel`)
         if(oldState.channelId && !newState.channelId || oldState.channelId && newState.channelId !== Channel) {
            if (oldState.channelId == Channel) {
                if (oldState.channel) {
                     if (oldState.channel.members.size < 1) {
                        client.channels.cache.get(JTC).permissionOverwrites.delete(oldState.id)
                         client.channels.cache.get(Channel).delete()
                         client.settings.delete(oldState.guild.id, oldState.channelId)
                         client.settings.delete(oldState.guild.id, oldState.id)
                     } else if (oldState.channel.members.size > 0) {
                        client.settings.delete(oldState.guild.id, oldState.id)
                        client.channels.cache.get(JTC).permissionOverwrites.delete(oldState.id)
                        let members = oldState.channel.members.map(member => member.id)
                        let randommemberid = members[Math.floor(Math.random() * members.length)];
                        client.settings.delete(oldState.guild.id, `${Channel}.Owner`) 
   
                        client.settings.set(oldState.guild.id, randommemberid, `${Channel}.Owner`)
                        client.settings.set(oldState.guild.id, oldState.channelId, `${randommemberid}.Channel`)
   
                        const user = client.users.cache.get(randommemberid)
                        
                        client.channels.cache.get(JTC).permissionOverwrites.edit(randommemberid, 
                            {
                             ViewChannel: false,
                             Connect: true,
                             Speak: true
                            })
                            client.channels.cache.get(JTC).permissionOverwrites.delete(oldState.id)
                        user.send({
                           embeds: [
                                new EmbedBuilder()
                                .setAuthor({ name: `JTC System | ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                                .setTitle(`Owner Left. Now you are the New One!`)
                                .setDescription(`<@!${oldState.id}> Left The Channel. You are Now the new Owner of The Channel! Type: \`v!voice\` to see all voice commands.`)
                                .setColor("DarkRed")
                           ]
                        })
                        setTimeout(() => {
                            const channel = client.channels.cache.get(Channel)
                            channel.permissionOverwrites.delete(oldState.id)
                            channel.permissionOverwrites.edit(randommemberid, 
                                {
                                 ViewChannel: true,
                                 Connect: true,
                                 Speak: true
                                })
                            channel.setName(`${user.username}'s Room`)
                        }, 500);   
                     }                     
                };
              }
         }
    }
          
}; 