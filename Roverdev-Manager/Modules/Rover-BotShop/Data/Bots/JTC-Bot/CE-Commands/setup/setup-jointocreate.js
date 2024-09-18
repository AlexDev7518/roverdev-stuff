const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, Emoji, PermissionFlagsBits, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {
    name: "setup-jointocreate",
    category: "setup",
    aliases: ["setup-jointocreate", "setup-jtc"],
    cooldown: 2,
    usage: "setup-jointocreate",
    description: "Setup Join To Create System",
    guildOnly: false,

    run: async (client, message, args, cmdUser,prefix) => {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageGuild || PermissionFlagsBits.Administrator)) {
             return message.reply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle(`:x: Invaild Permission`)
                    .setColor("DarkRed")
                    .setDescription(`:x: You Don't have Permission to Run this Command\n> Permission Needed: \`ManageGuild, Administrator\``)
                ]
             })
        }
        const embed = new EmbedBuilder()
        .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
        .setDescription(`__***Select What you Want To \`Setup\` Down Bellow.***__`)
        .setColor("DarkRed")
        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })

        const embed2 = new EmbedBuilder()
        .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
        .setDescription(`__***Select What You Want To \`Edit / Setup\`\.***__`)
        .setColor("DarkRed")
        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })

        const embed3 = new EmbedBuilder()
        // Channel for JTC
        .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
        .setDescription(`***__Please Provide a \`ChannelId\` You Want to Set it As. (You Have 30s)__***`)
        .setColor("DarkRed")
        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })

        const embed4 = new EmbedBuilder()
        // CategoryID For JTC
        .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
        .setDescription(`***__Please Provide a \`CategoryId\` You Want to Set it As. (You Have 30s)__***`)
        .setColor("DarkRed")
        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
        const embed5 = new EmbedBuilder()
        // Logger ChannelId
        .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
        .setDescription(`***__Please Provide a \`Logger ChannelId\` You Want to Set it As. (You Have 30s)__***`)
        .setColor("DarkRed")
        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
        const embed6 = new EmbedBuilder()
        // Logger Message
        .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
        .setDescription(`***__Please Provide a \`Menu Answer\` You Want to Edit (You Have 30s)__***`)
        // .addFields([
        //      { name: `ARGS / FIELDS`, value: `{user} -> @ The User | {channel} -> Ping The Channel` }
        // ])
        .setColor("DarkRed")
        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })


      const Logs_Title = new EmbedBuilder()
      .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
      .setDescription(`***__Please Provide a \`Logs Title\` You Want to Set it As. (You Have 30s)__***`)
      .setColor("DarkRed")
      .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
      const Logs_Author = new EmbedBuilder()
      .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
      .setDescription(`***__Please Provide a \`Logger Option\` You Want to Set it As. (You Have 30s)__***`)
      .setColor("DarkRed")
      .setFooter({ text: `${client.user.username} | Made By: Roverdev` })

      const Logs_Author_Name = new EmbedBuilder()
      .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
      .setDescription(`***__Please Provide a \`Logger Author\` You Want to Set it As. (You Have 30s)__***`)
      .setColor("DarkRed")
      .setFooter({ text: `${client.user.username} | Made By: Roverdev` })

      const Logs_Author_URL = new EmbedBuilder()
      .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
      .setDescription(`***__Please Provide a \`Logger Author\` You Want to Set it As. (You Have 30s)__***`)
      .setColor("DarkRed")
      .setFooter({ text: `${client.user.username} | Made By: Roverdev` })

      const Logs_Description = new EmbedBuilder()
      .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
      .setDescription(`***__Please Provide a \`Logger Description\` You Want to Set it As. (You Have 30s)__***`)
      .setColor("DarkRed")
      .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
      const Logs_Color = new EmbedBuilder()
      .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
      .setDescription(`***__Please Provide a \`Logger Color\` You Want to Set it As. (You Have 30s)__***\n\n> Example: \`Red, Purple, White, Random\``)
      .setColor("DarkRed")
      .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
      const Logs_Image = new EmbedBuilder()
      .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
      .setDescription(`***__Please Provide a \`Logger Image\` You Want to Set it As. (You Have 30s)__*** \n\n> Example: \`https://imgur.com\``)
      .setColor("DarkRed")
      .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
      const Logs_Thumbnail = new EmbedBuilder()
      .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
      .setDescription(`***__Please Provide a \`Logger Thumbnail\` You Want to Set it As. (You Have 30s)__***\n\n> Example: \`https://imgur.com\``)
      .setColor("DarkRed")
      .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
      const Logs_URL = new EmbedBuilder()
      .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
      .setDescription(`***__Please Provide a \`Logger Title URL\` You Want to Set it As. (You Have 30s)__*** \n\n> Example: \`https://google.com\``)
      .setColor("DarkRed")
      .setFooter({ text: `${client.user.username} | Made By: Roverdev` })



        const embed7 = new EmbedBuilder()
        //Moderator Role
        .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
        .setDescription(`***__Please Provide a \`Moderator RoleId\` You Want to Set it As. (You Have 30s)__***`)
        .setColor("DarkRed")
        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
        const embed8 = new EmbedBuilder()
        //Deletetion
        .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
        .setDescription(`***__ Are you Sure you want to Delete This? (You Have 30s)__***`)
        .setColor("DarkRed")
        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })

        const row = new ActionRowBuilder()
        .addComponents(
            new SelectMenuBuilder()
            .setCustomId(`JTC-SelectMenu1`)
            .setPlaceholder('Nothing Selected')
            .addOptions(
                 {
                    label: `1 JTC System`,
                    description: `Manage/Setup the 1st JTC System`,
                    value: `Join-To-Create-1`,
                    // emoji:  `1009699055221342278`
                 },
                 {
                    label: `2 JTC System`,
                    description: `Manage/Setup the 2nd JTC System`,
                    value: `Join-To-Create-2`,
                    // emoji:  `1009699055221342278`
                 },
                 {
                    label: `3 JTC System`,
                    description: `Manage/Setup the 3rd JTC System`,
                    value: `Join-To-Create-3`,
                    // emoji:  `1009699055221342278`
                 },
                 {
                    label: `4 JTC System`,
                    description: `Manage/Setup the 4th JTC System`,
                    value: `Join-To-Create-4`,
                    // emoji:  `1009699055221342278`
                 },
                 {
                    label: `5 JTC System`,
                    description: `Manage/Setup the 5th JTC System`,
                    value: `Join-To-Create-5`,
                    // emoji:  `1009699055221342278`
                 }
            )
        )

        const row2 = new ActionRowBuilder()
        .addComponents(
            new SelectMenuBuilder()
            .setCustomId(`JTC-SelectMenu2`)
            .setPlaceholder('Nothing Selected')
            .addOptions(
                 {
                    label: `Setup JTC System`,
                    description: `Setup the Join To Create System`,
                    value: `Setup`,
                    // emoji:  `1010018440901304421`
                 },
                 {
                    label: `Setup JTC Cat`,
                    description: `Setup the Join To Create Category`,
                    value: `Category`,
                    // emoji:  `1010018328854663189`
                 },
                 {
                    label: `Setup JTC Logs`,
                    description: `Setup the Join To Create Logger`,
                    value: `Logger`,
                    // emoji:  `1009502872423120916`
                 },
                 {
                    label: `Setup JTC Log Message`,
                    description: `JTC Logger Message Setup`,
                    value: `LogMessage`,
                    // emoji:  `1009502807847600219`
                 },
                 {
                    label: `Setup JTC Mod Role`,
                    description: `Setup the Join To Create Moderators`,
                    value: `Moderator`,
                    // emoji:  `1010018063497826415`
                 },
                 {
                    label: `Delete JTC Setup`,
                    description: `Delete the Full setup of JTC`,
                    value: `Delete`,
                    // emoji:  `❌`
                 },
            )
        )
        const row3 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`Yes-Delete`)
            .setLabel(`Yes, Delete it`)
            //.setEmoji(`1005732039846277181`)
            .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
            .setCustomId(`No-Delete`)
            .setLabel(`No, Don't Delete It`)
            //.setEmoji(`1005732051724546060`)
            .setStyle(ButtonStyle.Danger)
        )
        const row3_Disabled = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`Yes-Delete`)
            .setLabel(`Yes, Delete it`)
            //.setEmoji(`1005732039846277181`)
            .setDisabled(true)
            .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
            .setCustomId(`No-Delete`)
            .setLabel(`No, Don't Delete It`)
            //.setEmoji(`1005732051724546060`)
            .setDisabled(true)
            .setStyle(ButtonStyle.Danger)
        )

        const row4 = new ActionRowBuilder()
        .addComponents(
            new SelectMenuBuilder()
            .setCustomId(`JTC-SelectMenu3`)
            .setPlaceholder('Nothing Selected')
            .addOptions(
                 {
                    label: `Setup Logs Title`,
                    description: `Setup the Embed Tittle`,
                    value: `Logs-Title`,
                    // emoji:  `1006014770090086421`
                 },
                 {
                    label: `Setup Logs Author`,
                    description: `Setup the Embed Author`,
                    value: `Logs-Author`,
                    // emoji:  `1006014770090086421`
                },
                {
                    label: `Setup Logs Description`,
                    description: `Setup the Embed Description`,
                    value: `Logs-Description`,
                    // emoji:  `1006014770090086421`
                },
                {
                    label: `Setup Logs Color`,
                    description: `Setup the Embed Color`,
                    value: `Logs-Color`,
                    // emoji:  `1006014770090086421`
                },
                {
                    label: `Setup Logs Image`,
                    description: `Setup the Embed Image`,
                    value: `Logs-Image`,
                    // emoji:  `1006014770090086421`
                },
                {
                    label: `Setup Logs Thumbnail`,
                    description: `Setup the Embed Thumbnail`,
                    value: `Logs-Thumbnail`,
                    // emoji:  `1006014770090086421`
                },
                {
                    label: `Setup Logs URL`,
                    description: `Setup the Embed URL`,
                    value: `Logs-URL`,
                    // emoji:  `1006014770090086421`
                }
            )
        )
        const row5 = new ActionRowBuilder()
        .addComponents(
             new ButtonBuilder()

        )
        const Collector = []
        const JTCCollector = await message.reply({embeds: [embed], components: [row]})
        let collector = JTCCollector.createMessageComponentCollector({time: 30000 });

        collector.on("collect" , async (b) => {
            if (b.user.id !== message.author.id)
            return b.reply({ content: `:x: **Only <@${message.author.id}> allowed to react!**`, ephemeral: true })

            if (b.customId == "JTC-SelectMenu1") {
                const options = b.values
                Collector.push("true")
               JTCCollector.edit({
                  embeds: [
                     new EmbedBuilder()
                     .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                     .setDescription(`~~***__Select What you Want To \`Setup\` Down Bellow.__***~~`)
                     .setColor("DarkRed")
                     .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                  ],
                  components: [],
                  content: `***:thumbsup: Selected: \`${b.values}\`***`
               })
               const JTCCollector2 = await  JTCCollector.reply({
                  embeds: [embed2],
                  components: [row2]
               })
               const Collector2 = []
               let collector2 = JTCCollector2.createMessageComponentCollector({time: 30000 });

               collector2.on("collect" , async (b) => {
                if (b.user.id !== message.author.id)
                return b.reply({ content: `:x: **Only <@${message.author.id}> allowed to react!** Type: .help So you can React!`, ephemeral: true })

                if (b.customId == "JTC-SelectMenu2") {
                    Collector2.push("true")
                     if (b.values == "Setup") {
                        JTCCollector2.edit({
                            embeds: [
                               new EmbedBuilder()
                               .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                               .setDescription(`__~~***Select What You Want To \`Edit / Setup\`\.***~~__`)
                               .setColor("DarkRed")
                               .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                            ],
                            components: [],
                            content: `***:thumbsup: Selected: \`${b.values}\`***`
                         })
                         const JTCCollector3 = await JTCCollector2.reply({
                             embeds: [embed3]
                         })
                         let collected3 = await message.channel.createMessageCollector({
                            filter: m => m.author.id,
                            max: 1,
                            time: 5000,
                        })
                        const Collector3 = []
                        collected3.on('collect', m => {
                            Collector3.push("true")
                            JTCCollector3.edit({embeds: [
                                new EmbedBuilder()
                                .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                .setDescription(`~~***__Please Provide a \`ChannelId\` You Want to Set it As. (You Have 30s)__***~~`)
                                .setColor("DarkRed")
                                .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                             ],
                             content: `***:thumbsup: Answer: \`${m.content}\`***`
                            })
                            if(isNaN(m.content) || !message.guild.channels.cache.get(m.content)) {
                                JTCCollector3.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                        .setAuthor({name: `Join To Create Setup | Canceled`, iconURL: client.user.displayAvatarURL()})
                                        .setDescription(`Your Answer is not a Vaild ChannelId`)
                                        .setColor("DarkRed")
                                        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                    ]
                                })
                            }
                            if (message.guild.channels.cache.get(m.content)) {
                                const database = []
                                if (options == "Join-To-Create-1") {
                                    console.log(`Set the Database for the First JTC System.`)
                                    client.settings.set(message.guild.id, m.content ,`JTC1-channel`)
                                    const data = client.settings.get(message.guild.id, `JTC1-channel`)
                                    database.push(data)
                                } else if (options == "Join-To-Create-2") {
                                    console.log(`Set the Database for the Second JTC System.`)
                                    client.settings.set(message.guild.id, m.content ,`JTC2-channel`)
                                    const data = client.settings.get(message.guild.id, `JTC2-channel`)
                                    database.push(data)
                                } else if (options == "Join-To-Create-3") {
                                    console.log(`Set the Database for the Third JTC System.`)
                                    client.settings.set(message.guild.id, m.content ,`JTC3-channel`)
                                    const data = client.settings.get(message.guild.id, `JTC3-channel`)
                                    database.push(data)
                                } else if (options == "Join-To-Create-4`") {
                                    console.log(`Set the Database for the Forth JTC System.`)
                                    client.settings.set(message.guild.id, m.content ,`JTC4-channel`)
                                    const data = client.settings.get(message.guild.id, `JTC4-channel`)
                                    database.push(data)
                                } else if (options == "Join-To-Create-5") {
                                    console.log(`Set the Database for the Fith JTC System.`)
                                    client.settings.set(message.guild.id, m.content ,`JTC5-channel`)
                                    const data = client.settings.get(message.guild.id, `JTC5-channel`)
                                    database.push(data)
                                }

                                JTCCollector3.reply({embeds: [
                                    new EmbedBuilder()
                                    .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                    .setDescription(`<:checkmark:1005732039846277181> __*** Database Set Succesfully As: \`${database}\` ***__`)
                                    .setColor("DarkRed")
                                    .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                 ],
                                 content: ` `
                                })
                                
                            }
                        });
                        
                        collected3.on('end', collected => {
                            if (Collector3.length < 1) {
                                JTCCollector3.edit({embeds: [
                                    new EmbedBuilder()
                                    .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                    .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                                    .setColor("DarkRed")
                                    .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                 ],
                                 components: []
                                }).catch((e) => {
                                    message.channel.send({
                                        embeds: [
                                           new EmbedBuilder()
                                           .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                           .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                                           .setColor("DarkRed")
                                           .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                        ]
                                    })
                               })
                            }
                        });
                     }
                     if (b.values == "Category") {
                        JTCCollector2.edit({
                            embeds: [
                               new EmbedBuilder()
                               .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                               .setDescription(`__~~***Select What You Want To \`Edit / Setup\`\.***~~__`)
                               .setColor("DarkRed")
                               .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                            ],
                            components: [],
                            content: `***:thumbsup: Selected: \`${b.values}\`***`
                         })
                         const JTCCollector3 = await JTCCollector2.reply({
                             embeds: [embed4]
                         })
                         let collected3 = await message.channel.createMessageCollector({
                            filter: m => m.author.id,
                            max: 1,
                            time: 5000,
                        })
                        const Collector3 = []
                        collected3.on('collect', m => {
                            Collector3.push("true")
                            JTCCollector3.edit({embeds: [
                                new EmbedBuilder()
                                .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                .setDescription(`~~***__Please Provide a \`CategoryId\` You Want to Set it As. (You Have 30s)__***~~`)
                                .setColor("DarkRed")
                                .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                             ],
                             content: `***:thumbsup: Answer: \`${m.content}\`***`
                            })
                            if(isNaN(m.content) || !message.guild.channels.cache.get(m.content)) {
                                JTCCollector3.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                        .setAuthor({name: `Join To Create Setup | Canceled`, iconURL: client.user.displayAvatarURL()})
                                        .setDescription(`Your Answer is not a Vaild CategoryId`)
                                        .setColor("DarkRed")
                                        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                    ]
                                })
                            }
                            if (message.guild.channels.cache.get(m.content)) {
                                const database = []
                                if (options == "Join-To-Create-1") {
                                    console.log(`Set the Database for the First JTC System.`)
                                    client.settings.set(message.guild.id, m.content ,`JTC1-Category`)
                                    const data = client.settings.get(message.guild.id, `JTC1-Category`)
                                    database.push(data)
                                } else if (options == "Join-To-Create-2") {
                                    console.log(`Set the Database for the Second JTC System.`)
                                    client.settings.set(message.guild.id, m.content ,`JTC2-Category`)
                                    const data = client.settings.get(message.guild.id, `JTC2-Category`)
                                    database.push(data)
                                } else if (options == "Join-To-Create-3") {
                                    console.log(`Set the Database for the Third JTC System.`)
                                    client.settings.set(message.guild.id, m.content ,`JTC3-Category`)
                                    const data = client.settings.get(message.guild.id, `JTC3-Category`)
                                    database.push(data)
                                } else if (options == "Join-To-Create-4`") {
                                    console.log(`Set the Database for the Forth JTC System.`)
                                    client.settings.set(message.guild.id, m.content ,`JTC4-Category`)
                                    const data = client.settings.get(message.guild.id, `JTC4-Category`)
                                    database.push(data)
                                } else if (options == "Join-To-Create-5") {
                                    console.log(`Set the Database for the Fith JTC System.`)
                                    client.settings.set(message.guild.id, m.content ,`JTC5-Category`)
                                    const data = client.settings.get(message.guild.id, `JTC5-Category`)
                                    database.push(data)

                                    
                                }

                                JTCCollector3.reply({embeds: [
                                    new EmbedBuilder()
                                    .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                    .setDescription(`<:checkmark:1005732039846277181> __*** Database Set Succesfully As: \`${database}\` ***__`)
                                    .setColor("DarkRed")
                                    .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                 ],
                                 content: ` `
                                })
                                
                            }
                        })
                        collected3.on('end', collected => {
                            if (Collector3.length < 1) {
                                JTCCollector3.edit({embeds: [
                                    new EmbedBuilder()
                                    .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                    .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                                    .setColor("DarkRed")
                                    .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                 ],
                                 components: []
                                }).catch((e) => {
                                    message.channel.send({
                                        embeds: [
                                           new EmbedBuilder()
                                           .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                           .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                                           .setColor("DarkRed")
                                           .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                        ]
                                    })
                               })
                            }
                        });
                    }
                    if (b.values == "Logger") {
                        JTCCollector2.edit({
                            embeds: [
                               new EmbedBuilder()
                               .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                               .setDescription(`~~***__Please Provide a \`Logger ChannelId\` You Want to Set it As. (You Have 30s)__***~~`)
                               .setColor("DarkRed")
                               .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                            ],
                            components: [],
                            content: `***:thumbsup: Selected: \`${b.values}\`***`
                         })
                         const JTCCollector3 = await JTCCollector2.reply({
                             embeds: [embed5]
                         })
                         let collected3 = await message.channel.createMessageCollector({
                            filter: m => m.author.id,
                            max: 1,
                            time: 5000,
                        })
                        const Collector3 = []
                        collected3.on('collect', m => {
                            Collector3.push("true")
                            JTCCollector3.edit({embeds: [
                                new EmbedBuilder()
                                .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                .setDescription(`~~***__Please Provide a \`ChannelId\` You Want to Set it As. (You Have 30s)__***~~`)
                                .setColor("DarkRed")
                                .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                             ],
                             content: `***:thumbsup: Answer: \`${m.content}\`***`
                            })
                            if(isNaN(m.content) || !message.guild.channels.cache.get(m.content)) {
                                JTCCollector3.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                        .setAuthor({name: `Join To Create Setup | Canceled`, iconURL: client.user.displayAvatarURL()})
                                        .setDescription(`Your Answer is not a Vaild ChannelId`)
                                        .setColor("DarkRed")
                                        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                    ]
                                })
                            }
                            if (message.guild.channels.cache.get(m.content)) {
                                const database = []
                                if (options == "Join-To-Create-1") {
                                    console.log(`Set the Database for the First JTC System.`)
                                    client.settings.set(message.guild.id, m.content ,`JTC1-Logger`)
                                    const data = client.settings.get(message.guild.id, `JTC1-Logger`)
                                    database.push(data)
                                } else if (options == "Join-To-Create-2") {
                                    console.log(`Set the Database for the Second JTC System.`)
                                    client.settings.set(message.guild.id, m.content ,`JTC2-Logger`)
                                    const data = client.settings.get(message.guild.id, `JTC2-Logger`)
                                    database.push(data)
                                } else if (options == "Join-To-Create-3") {
                                    console.log(`Set the Database for the Third JTC System.`)
                                    client.settings.set(message.guild.id, m.content ,`JTC3-Logger`)
                                    const data = client.settings.get(message.guild.id, `JTC3-Logger`)
                                    database.push(data)
                                } else if (options == "Join-To-Create-4`") {
                                    console.log(`Set the Database for the Forth JTC System.`)
                                    client.settings.set(message.guild.id, m.content ,`JTC4-Logger`)
                                    const data = client.settings.get(message.guild.id, `JTC4-Logger`)
                                    database.push(data)
                                } else if (options == "Join-To-Create-5") {
                                    console.log(`Set the Database for the Fith JTC System.`)
                                    client.settings.set(message.guild.id, m.content ,`JTC5-Logger`)
                                    const data = client.settings.get(message.guild.id, `JTC5-Logger`)
                                    database.push(data)

                                    
                                }

                                JTCCollector3.reply({embeds: [
                                    new EmbedBuilder()
                                    .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                    .setDescription(`<:checkmark:1005732039846277181> __*** Database Set Succesfully As: \`${database}\` ***__`)
                                    .setColor("DarkRed")
                                    .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                 ],
                                 content: ` `
                                }).catch((e) => {
                                    message.channel.send({
                                        embeds: [
                                           new EmbedBuilder()
                                           .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                           .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                                           .setColor("DarkRed")
                                           .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                        ]
                                    })
                               })
                                
                            }
                        })
                        collected3.on('end', collected => {
                            if (Collector3.length < 1) {
                                JTCCollector3.edit({embeds: [
                                    new EmbedBuilder()
                                    .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                    .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                                    .setColor("DarkRed")
                                    .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                 ],
                                 components: []
                                }).catch((e) => {
                                    message.channel.send({
                                        embeds: [
                                           new EmbedBuilder()
                                           .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                           .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                                           .setColor("DarkRed")
                                           .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                        ]
                                    })
                               })
                            }
                        });
                    }
                    if (b.values == "LogMessage") {
                        JTCCollector2.edit({
                            embeds: [
                               new EmbedBuilder()
                               .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                               .setDescription(`__~~***Select What You Want To \`Edit / Setup\`\.***~~__`)
                               .setColor("DarkRed")
                               .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                            ],
                            components: [],
                            content: `***:thumbsup: Selected: \`${b.values}\`***`
                         })
                         const JTCCollector3 = await JTCCollector2.reply({
                             embeds: [embed6],
                             components: [row4]
                         })
                        const Collector3 = []
                        let collector = JTCCollector3.createMessageComponentCollector({time: 30000 });

                        collector.on("collect" , async (b) => {
                            if (b.user.id !== message.author.id)
                            return b.reply({ content: `:x: **Only <@${message.author.id}> allowed to react!**`, ephemeral: true })

                            if (b.customId == "JTC-SelectMenu3") {
                                Collector3.push("True")
                                JTCCollector3.edit({
                                    embeds: [
                                       new EmbedBuilder()
                                       .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                       .setDescription(`~~***__Please Provide a \`Menu Answer\` You Want to Edit (You Have 30s)__***~~`)
                                       .setColor("DarkRed")
                                       .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                    ],
                                    components: [],
                                    content: `***:thumbsup: Selected: \`${b.values}\`***`
                                 })
                                if (b.values == "Logs-Title") {
                                     const JTCCollector4 = await b.reply({
                                         embeds: [Logs_Title]
                                     })
                                     let collected3 = await message.channel.createMessageCollector({
                                        filter: m => m.author.id,
                                        max: 1,
                                        time: 60000,
                                    })
                                    const Collector3 = []
                                    collected3.on('collect', m => {
                                        Collector3.push("true")
                                        JTCCollector4.edit({embeds: [
                                            new EmbedBuilder()
                                            .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                            .setDescription(`~~***__Please Provide a \`Logs Title\` You Want to Set it As. (You Have 30s)__***~~`)
                                            .setColor("DarkRed")
                                            .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                         ],
                                         content: `***:thumbsup: Answer: \`${m.content}\`***`
                                        })
                                        if (m.content.length > 50) {
                                            JTCCollector3.reply({
                                                embeds: [
                                                    new EmbedBuilder()
                                                    .setAuthor({name: `Join To Create Setup | Canceled`, iconURL: client.user.displayAvatarURL()})
                                                    .setDescription(`Your Answer Can't be More then 100 Letters.`)
                                                    .setColor("DarkRed")
                                                    
                                                    .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                                ]
                                            })
                                        }
                                        if (m.content.length < 50) {
                                            const database = []
                                            if (options == "Join-To-Create-1") {
                                                console.log(`Set the Database for the First JTC System. (JTC1-LogMessage-Title)`)
                                                client.settings.set(message.guild.id, m.content ,`JTC1-LogMessage-Title`)
                                                const data = client.settings.get(message.guild.id, `JTC1-LogMessage-Title`)
                                                database.push(data)
                                            } else if (options == "Join-To-Create-2") {
                                                console.log(`Set the Database for the First JTC System. (JTC2-LogMessage-Title)`)
                                                client.settings.set(message.guild.id, m.content ,`JTC2-LogMessage-Title`)
                                                const data = client.settings.get(message.guild.id, `JTC2-LogMessage-Title`)
                                                database.push(data)
                                            } else if (options == "Join-To-Create-3") {
                                                console.log(`Set the Database for the First JTC System. (JTC3-LogMessage-Title)`)
                                                client.settings.set(message.guild.id, m.content ,`JTC3-LogMessage-Title`)
                                                const data = client.settings.get(message.guild.id, `JTC3-LogMessage-Title`)
                                                database.push(data)
                                            } else if (options == "Join-To-Create-4`") {
                                                console.log(`Set the Database for the First JTC System. (JTC4-LogMessage-Title)`)
                                                client.settings.set(message.guild.id, m.content ,`JTC4-LogMessage-Title`)
                                                const data = client.settings.get(message.guild.id, `JTC4-LogMessage-Title`)
                                                database.push(data)
                                            } else if (options == "Join-To-Create-5") {
                                                console.log(`Set the Database for the First JTC System. (JTC5-LogMessage-Title)`)
                                                client.settings.set(message.guild.id, m.content ,`JTC5-LogMessage-Title`)
                                                const data = client.settings.get(message.guild.id, `JTC5-LogMessage-Title`)
                                                database.push(data)
            
                                                
                                            }
            
                                            JTCCollector3.reply({embeds: [
                                                new EmbedBuilder()
                                                .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                                .setDescription(`<:checkmark:1005732039846277181> __*** Database Set Succesfully As: \`${database}\` ***__`)
                                                .setColor("DarkRed")
                                                .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                             ],
                                             content: ` `
                                            })
                                        }
                                    })
                                    collected3.on('end', collected => {
                                        if (Collector3.length < 1) {
                                            JTCCollector3.edit({embeds: [
                                                new EmbedBuilder()
                                                .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                                .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                                                .setColor("DarkRed")
                                                .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                             ],
                                             components: []
                                            }).catch((e) => {
                                                 message.channel.send({
                                                     embeds: [
                                                        new EmbedBuilder()
                                                        .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                                        .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                                                        .setColor("DarkRed")
                                                        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                                     ]
                                                 })
                                            })
                                        }
                                    });
                                }
                                if (b.values == "Logs-Author") {
                                     const JTCCollector4 = await b.reply({
                                         embeds: [Logs_Author]
                                     })
                                     let collected3 = await message.channel.createMessageCollector({
                                        filter: m => m.author.id,
                                        max: 1,
                                        time: 5000,
                                    })
                                    const Collector3 = []

                                    collected3.on('collect', m => {
                                        Collector3.push("true")
                                    })
                                }
                                if (b.values == "Logs-Description") {
                                     const JTCCollector4 = await b.reply({
                                         embeds: [Logs_Description]
                                     })
                                     let collected3 = await message.channel.createMessageCollector({
                                        filter: m => m.author.id,
                                        max: 1,
                                        time: 60000,
                                    })
                                    const Collector3 = []
                                    collected3.on('collect', m => {
                                        Collector3.push("true")
                                        JTCCollector4.edit({embeds: [
                                            new EmbedBuilder()
                                            .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                            .setDescription(`~~***__Please Provide a \`Logs Description\` You Want to Set it As. (You Have 30s)__***~~`)
                                            .setColor("DarkRed")
                                            .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                         ],
                                         content: `***:thumbsup: Answer: \`${m.content}\`***`
                                        })
                                        if (m.content.length > 50) {
                                            JTCCollector3.reply({
                                                embeds: [
                                                    new EmbedBuilder()
                                                    .setAuthor({name: `Join To Create Setup | Canceled`, iconURL: client.user.displayAvatarURL()})
                                                    .setDescription(`Your Answer Can't be More then 100 Letters.`)
                                                    .setColor("DarkRed")
                                                    
                                                    .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                                ]
                                            })
                                        }
                                        if (m.content.length < 50) {
                                            const database = []
                                            if (options == "Join-To-Create-1") {
                                                console.log(`Set the Database for the First JTC System. (JTC1-LogMessage-Description)`)
                                                client.settings.set(message.guild.id, m.content ,`JTC1-LogMessage-Description`)
                                                const data = client.settings.get(message.guild.id, `JTC1-LogMessage-Description`)
                                                database.push(data)
                                            } else if (options == "Join-To-Create-2") {
                                                console.log(`Set the Database for the First JTC System. (JTC2-LogMessage-Description)`)
                                                client.settings.set(message.guild.id, m.content ,`JTC2-LogMessage-Description`)
                                                const data = client.settings.get(message.guild.id, `JTC2-LogMessage-Description`)
                                                database.push(data)
                                            } else if (options == "Join-To-Create-3") {
                                                console.log(`Set the Database for the First JTC System. (JTC3-LogMessage-Description)`)
                                                client.settings.set(message.guild.id, m.content ,`JTC3-LogMessage-Description`)
                                                const data = client.settings.get(message.guild.id, `JTC3-LogMessage-Description`)
                                                database.push(data)
                                            } else if (options == "Join-To-Create-4`") {
                                                console.log(`Set the Database for the First JTC System. (JTC4-LogMessage-Description)`)
                                                client.settings.set(message.guild.id, m.content ,`JTC4-LogMessage-Description`)
                                                const data = client.settings.get(message.guild.id, `JTC4-LogMessage-Description`)
                                                database.push(data)
                                            } else if (options == "Join-To-Create-5") {
                                                console.log(`Set the Database for the First JTC System. (JTC5-LogMessage-Description)`)
                                                client.settings.set(message.guild.id, m.content ,`JTC5-LogMessage-Description`)
                                                const data = client.settings.get(message.guild.id, `JTC5-LogMessage-Description`)
                                                database.push(data)
            
                                                
                                            }
            
                                            JTCCollector3.reply({embeds: [
                                                new EmbedBuilder()
                                                .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                                .setDescription(`<:checkmark:1005732039846277181> __*** Database Set Succesfully As: \`${database}\` ***__`)
                                                .setColor("DarkRed")
                                                .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                             ],
                                             content: ` `
                                            })
                                        }
                                    })
                                    collected3.on('end', collected => {
                                        if (Collector3.length < 1) {
                                            JTCCollector3.edit({embeds: [
                                                new EmbedBuilder()
                                                .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                                .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                                                .setColor("DarkRed")
                                                .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                             ],
                                             components: []
                                            }).catch((e) => {
                                                 message.channel.send({
                                                     embeds: [
                                                        new EmbedBuilder()
                                                        .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                                        .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                                                        .setColor("DarkRed")
                                                        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                                     ]
                                                 })
                                            })
                                        }
                                    });
                                }
                                if (b.values == "Logs-Color") {
                                     const JTCCollector4 = await JTCCollector3.reply({
                                         embeds: [Logs_Color]
                                     })
                                     let collected3 = await message.channel.createMessageCollector({
                                        filter: m => m.author.id,
                                        max: 1,
                                        time: 60000,
                                    })
                                    const Collector3 = []
                                    collected3.on('collect', m => {
                                        Collector3.push("true")
                                        JTCCollector4.edit({embeds: [
                                            new EmbedBuilder()
                                            .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                            .setDescription(`~~***__Please Provide a \`Logs Color\` You Want to Set it As. (You Have 30s)__***~~`)
                                            .setColor("DarkRed")
                                            .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                         ],
                                         content: `***:thumbsup: Answer: \`${m.content}\`***`
                                        })
                                        if (m.content.length > 9) {
                                            JTCCollector3.reply({
                                                embeds: [
                                                    new EmbedBuilder()
                                                    .setAuthor({name: `Join To Create Setup | Canceled`, iconURL: client.user.displayAvatarURL()})
                                                    .setDescription(`Your Answer Can't be More then 4 Letters.`)
                                                    .setColor("DarkRed")
                                                    
                                                    .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                                ]
                                            })
                                        }
                                        if (m.content.length < 10) {
                                            const database = []
                                            if (options == "Join-To-Create-1") {
                                                console.log(`Set the Database for the First JTC System. (JTC1-LogMessage-Color)`)
                                                client.settings.set(message.guild.id, m.content ,`JTC1-LogMessage-Color`)
                                                const data = client.settings.get(message.guild.id, `JTC1-LogMessage-Color`)
                                                database.push(data)
                                            } else if (options == "Join-To-Create-2") {
                                                console.log(`Set the Database for the First JTC System. (JTC2-LogMessage-Color)`)
                                                client.settings.set(message.guild.id, m.content ,`JTC2-LogMessage-Color`)
                                                const data = client.settings.get(message.guild.id, `JTC2-LogMessage-Color`)
                                                database.push(data)
                                            } else if (options == "Join-To-Create-3") {
                                                console.log(`Set the Database for the First JTC System. (JTC3-LogMessage-Color)`)
                                                client.settings.set(message.guild.id, m.content ,`JTC3-LogMessage-Color`)
                                                const data = client.settings.get(message.guild.id, `JTC3-LogMessage-Color`)
                                                database.push(data)
                                            } else if (options == "Join-To-Create-4`") {
                                                console.log(`Set the Database for the First JTC System. (JTC4-LogMessage-Color)`)
                                                client.settings.set(message.guild.id, m.content ,`JTC4-LogMessage-Color`)
                                                const data = client.settings.get(message.guild.id, `JTC4-LogMessage-Color`)
                                                database.push(data)
                                            } else if (options == "Join-To-Create-5") {
                                                console.log(`Set the Database for the First JTC System. (JTC5-LogMessage-Color)`)
                                                client.settings.set(message.guild.id, m.content ,`JTC5-LogMessage-Color`)
                                                const data = client.settings.get(message.guild.id, `JTC5-LogMessage-Color`)
                                                database.push(data)
            
                                                
                                            }
            
                                            const msg = m.reply({embeds: [
                                                new EmbedBuilder()
                                                .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                                .setDescription(`<:checkmark:1005732039846277181> __*** Database Set Succesfully As: \`${database}\` ***__`)
                                                .setColor("DarkRed")
                                                .addFields([
                                                     { name: `:warning: Color`, value: `If the Color is Black or Red or Bot Throws Error Means you have a Invaild Color!` }
                                                ])
                                                .setFooter({ text: `${client.user.username} | Made By: Roverdev` }),
                                             ],
                                             content: ` `
                                            }).then((msg) => {
                                                try {
                                                    msg.reply({
                                                        embeds: [
                                                            new EmbedBuilder()
                                                            .setColor(m.content)
                                                            .setTitle(`Embed Color Success!`)
                                                            .setDescription(`Succesfully Set the Color for the Embed so it works!`)
                                                        ]
                                                     })
                                                } catch (err) {
                                                    client.settings.delete(message.guild.id, "JTC1-LogMessage-Color") 
                                                    msg.reply({embeds: [
                                                        new EmbedBuilder()
                                                        .setTitle(`Error Accored! Color INVAILD`)
                                                        .setDescription(`Error:\n ${err}`)
                                                        .addFields([
                                                            { name: `INVAILD`, value: `I went ahead and Reset the Database for the Color Please Try Again!` }
                                                        ])
                                                        .setColor("DarkRed")
                                                    ]})
                                                }
                                            })

                                        }
                                    })
                                    collected3.on('end', collected => {
                                        if (Collector3.length < 1) {
                                            JTCCollector3.edit({embeds: [
                                                new EmbedBuilder()
                                                .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                                .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                                                .setColor("DarkRed")
                                                .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                             ],
                                             components: []
                                            }).catch((e) => {
                                                 message.channel.send({
                                                     embeds: [
                                                        new EmbedBuilder()
                                                        .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                                        .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                                                        .setColor("DarkRed")
                                                        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                                     ]
                                                 })
                                            })
                                        }
                                    });
                                }
                                if (b.values == "Logs-Image") {
                                     const JTCCollector4 = await b.reply({
                                         embeds: [Logs_Image]
                                     })
                                     let collected3 = await message.channel.createMessageCollector({
                                        filter: m => m.author.id,
                                        max: 1,
                                        time: 60000,
                                    })
                                    const Collector3 = []
                                    collected3.on('collect', m => {
                                        Collector3.push("true")
                                        JTCCollector4.edit({embeds: [
                                            new EmbedBuilder()
                                            .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                            .setDescription(`~~***__Please Provide a \`Logs Image\` You Want to Set it As. (You Have 30s)__***~~`)
                                            .setColor("DarkRed")
                                            .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                         ],
                                         content: `***:thumbsup: Answer: \`${m.content}\`***`
                                        })
                                        if (!m.content.includes("https")) {
                                            JTCCollector3.reply({
                                                embeds: [
                                                    new EmbedBuilder()
                                                    .setAuthor({name: `Join To Create Setup | Canceled`, iconURL: client.user.displayAvatarURL()})
                                                    .setDescription(`Your Answer Is not a Vaild Link.`)
                                                    .setColor("DarkRed")
                                                    
                                                    .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                                ]
                                        })
                                         }
                                        if (m.content.includes("https")) {
                                            const database = []
                                            if (options == "Join-To-Create-1") {
                                                console.log(`Set the Database for the First JTC System. (JTC1-LogMessage-Image)`)
                                                client.settings.set(message.guild.id, m.content ,`JTC1-LogMessage-Image`)
                                                const data = client.settings.get(message.guild.id, `JTC1-LogMessage-Image`)
                                                database.push(data)
                                            } else if (options == "Join-To-Create-2") {
                                                console.log(`Set the Database for the First JTC System. (JTC2-LogMessage-Image)`)
                                                client.settings.set(message.guild.id, m.content ,`JTC2-LogMessage-Image`)
                                                const data = client.settings.get(message.guild.id, `JTC2-LogMessage-Image`)
                                                database.push(data)
                                            } else if (options == "Join-To-Create-3") {
                                                console.log(`Set the Database for the First JTC System. (JTC3-LogMessage-Image)`)
                                                client.settings.set(message.guild.id, m.content ,`JTC3-LogMessage-Image`)
                                                const data = client.settings.get(message.guild.id, `JTC3-LogMessage-Image`)
                                                database.push(data)
                                            } else if (options == "Join-To-Create-4`") {
                                                console.log(`Set the Database for the First JTC System. (JTC4-LogMessage-Image)`)
                                                client.settings.set(message.guild.id, m.content ,`JTC4-LogMessage-Image`)
                                                const data = client.settings.get(message.guild.id, `JTC4-LogMessage-Image`)
                                                database.push(data)
                                            } else if (options == "Join-To-Create-5") {
                                                console.log(`Set the Database for the First JTC System. (JTC5-LogMessage-Image)`)
                                                client.settings.set(message.guild.id, m.content ,`JTC5-LogMessage-Image`)
                                                const data = client.settings.get(message.guild.id, `JTC5-LogMessage-Image`)
                                                database.push(data)
            
                                                
                                            }
            
                                            const msg = m.reply({embeds: [
                                                new EmbedBuilder()
                                                .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                                .setDescription(`<:checkmark:1005732039846277181> __*** Database Set Succesfully As: \`${database}\` ***__`)
                                                .setColor("DarkRed")
                                                .addFields([
                                                     { name: `:warning: Image`, value: `If image Does not Load Cause it is Not Valid!` }
                                                ])
                                                .setFooter({ text: `${client.user.username} | Made By: Roverdev` }),
                                             ],
                                             content: ` `
                                            }).then((msg) => {
                                                try {
                                                    msg.reply({
                                                        embeds: [
                                                            new EmbedBuilder()
                                                            .setImage(m.content)
                                                            .setTitle(`Embed Image Success!`)
                                                            .setDescription(`Succesfully Set the Image for the Embed so it works!`)
                                                        ]
                                                     })
                                                } catch (err) {
                                                    client.settings.delete(message.guild.id, "JTC1-LogMessage-Image") 
                                                    msg.reply({embeds: [
                                                        new EmbedBuilder()
                                                        .setTitle(`Error Accored! Image INVAILD`)
                                                        .setDescription(`Error:\n ${err}`)
                                                        .addFields([
                                                            { name: `INVAILD`, value: `I went ahead and Reset the Database for the Image Please Try Again!` }
                                                        ])
                                                        .setColor("DarkRed")
                                                    ]})
                                                }
                                            })

                                        }
                                    })
                                    collected3.on('end', collected => {
                                        if (Collector3.length < 1) {
                                            JTCCollector3.edit({embeds: [
                                                new EmbedBuilder()
                                                .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                                .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                                                .setColor("DarkRed")
                                                .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                             ],
                                             components: []
                                            }).catch((e) => {
                                                 message.channel.send({
                                                     embeds: [
                                                        new EmbedBuilder()
                                                        .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                                        .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                                                        .setColor("DarkRed")
                                                        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                                     ]
                                                 })
                                            })
                                        }
                                    });
                                }
                                if (b.values == "Logs-Thumbnail") {
                                     const JTCCollector4 = await b.reply({
                                         embeds: [Logs_Thumbnail]
                                     })
                                     let collected3 = await message.channel.createMessageCollector({
                                        filter: m => m.author.id,
                                        max: 1,
                                        time: 5000,
                                    })
                                    const Collector3 = []

                                    collected3.on('collect', m => {
                                        Collector3.push("true")
                                    })
                                }
                                if (b.values == "Logs-URL") {
                                     const JTCCollector4 = await b.reply({
                                         embeds: [Logs_URL]
                                     })
                                     let collected3 = await message.channel.createMessageCollector({
                                        filter: m => m.author.id,
                                        max: 1,
                                        time: 5000,
                                    })
                                    const Collector3 = []

                                    collected3.on('collect', m => {
                                        Collector3.push("true")
                                    })
                                }
                            }
                            b.deferUpdate()
                        })
                        collector.on('end', collected => {
                            if (Collector3.length < 1) {
                                JTCCollector3.edit({embeds: [
                                    new EmbedBuilder()
                                    .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                    .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                                    .setColor("DarkRed")
                                    .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                 ],
                                 components: []
                                }).catch((e) => {
                                     message.channel.send({
                                         embeds: [
                                            new EmbedBuilder()
                                            .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                            .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                                            .setColor("DarkRed")
                                            .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                         ]
                                     })
                                })
                            }
                        });
                    }
                    if (b.values == "Moderator") {
                        JTCCollector2.edit({
                            embeds: [
                               new EmbedBuilder()
                               .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                               .setDescription(`__~~***Select What You Want To \`Edit / Setup\`\.***~~__`)
                               .setColor("DarkRed")
                               .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                            ],
                            components: [],
                            content: `***:thumbsup: Selected: \`${b.values}\`***`
                         })
                         const JTCCollector3 = await JTCCollector2.reply({
                             embeds: [embed7]
                         })
                         let collected3 = await message.channel.createMessageCollector({
                            filter: m => m.author.id,
                            max: 1,
                            time: 5000,
                        })
                        const Collector3 = []
                        collected3.on('collect', m => {
                            Collector3.push("true")
                            JTCCollector3.edit({embeds: [
                                new EmbedBuilder()
                                .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                .setDescription(`~~***__Please Provide a \`Moderator RoleId\` You Want to Set it As. (You Have 30s)__***~~`)
                                .setColor("DarkRed")
                                .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                             ],
                             content: `***:thumbsup: Answer: \`${m.content}\`***`
                            })
                            if(isNaN(m.content) || !message.guild.roles.cache.get(m.content)) {
                                JTCCollector3.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                        .setAuthor({name: `Join To Create Setup | Canceled`, iconURL: client.user.displayAvatarURL()})
                                        .setDescription(`Your Answer is not a Vaild ChannelId`)
                                        .setColor("DarkRed")
                                        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                    ]
                                })
                            }
                            if (message.guild.roles.cache.get(m.content)) {
                                const database = []
                                if (options == "Join-To-Create-1") {
                                    console.log(`Set the Database for the First JTC System.`)
                                    client.settings.set(message.guild.id, m.content ,`JTC1-Moderator`)
                                    const data = client.settings.get(message.guild.id, `JTC1-Moderator`)
                                    database.push(data)
                                } else if (options == "Join-To-Create-2") {
                                    console.log(`Set the Database for the Second JTC System.`)
                                    client.settings.set(message.guild.id, m.content ,`JTC2-Moderator`)
                                    const data = client.settings.get(message.guild.id, `JTC2-Moderator`)
                                    database.push(data)
                                } else if (options == "Join-To-Create-3") {
                                    console.log(`Set the Database for the Third JTC System.`)
                                    client.settings.set(message.guild.id, m.content ,`JTC3-Moderator`)
                                    const data = client.settings.get(message.guild.id, `JTC3-Moderator`)
                                    database.push(data)
                                } else if (options == "Join-To-Create-4`") {
                                    console.log(`Set the Database for the Forth JTC System.`)
                                    client.settings.set(message.guild.id, m.content ,`JTC4-Moderator`)
                                    const data = client.settings.get(message.guild.id, `JTC4-Moderator`)
                                    database.push(data)
                                } else if (options == "Join-To-Create-5") {
                                    console.log(`Set the Database for the Fith JTC System.`)
                                    client.settings.set(message.guild.id, m.content ,`JTC5-Moderator`)
                                    const data = client.settings.get(message.guild.id, `JTC5-Moderator`)
                                    database.push(data)

                                    
                                }

                                JTCCollector3.reply({embeds: [
                                    new EmbedBuilder()
                                    .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                    .setDescription(`<:checkmark:1005732039846277181> __*** Database Set Succesfully As: \`${database}\` ***__`)
                                    .setColor("DarkRed")
                                    .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                 ],
                                 content: ` `
                                })
                            }
                        })
                    }
                    if (b.values == "Delete") {
                        JTCCollector2.edit({
                            embeds: [
                               new EmbedBuilder()
                               .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                               .setDescription(`__~~***Select What You Want To \`Edit / Setup\`\.***~~__`)
                               .setColor("DarkRed")
                               .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                            ],
                            components: [],
                            content: `***:thumbsup: Selected: \`${b.values}\`***`
                         })
                         const JTCCollector3 = await JTCCollector2.reply({
                             embeds: [embed8], components: [row3]
                         })
                         const Collector = []
                         let collector = JTCCollector3.createMessageComponentCollector({time: 30000 });
                         collector.on("collect" , async (b) => {
                            if (b.user.id !== message.author.id)
                            return b.reply({ content: `:x: **Only <@${message.author.id}> allowed to react!**`, ephemeral: true })

                            if (b.customId == "Yes-Delete") {
                                Collector.push("true")
                                JTCCollector3.edit({
                                    embeds:[
                                        new EmbedBuilder()
                                        .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                        .setDescription(`***__ Are you Sure you want to Delete This? (You Have 30s)__***`)
                                        .setColor("DarkRed")
                                        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                    ],
                                    components: [row3_Disabled]
                                })
                                if (options == "Join-To-Create-1") {
                                    const data = client.settings.get(message.guild.id, `JTC1-channel`)
                                    const data2 = client.settings.get(message.guild.id, `JTC1-Category`)
                                    const data3 = client.settings.get(message.guild.id, `JTC1-Logger`)
                                    const data4 = client.settings.get(message.guild.id, `JTC1-LogMessage`)
                                    const data5 = client.settings.get(message.guild.id, `JTC1-Moderator`)

                                    if (data) {
                                         client.settings.delete(message.guild.id, "JTC1-channel")
                                    } 
                                    if (data2) {
                                        client.settings.delete(message.guild.id, "JTC1-Category")
                                    }
                                    if (data3) {
                                        client.settings.delete(message.guild.id, "JTC1-Logger")
                                    } 
                                    if (data4) {
                                        client.settings.delete(message.guild.id, "JTC1-LogMessage")
                                    }
                                    if (data5) {
                                        client.settings.delete(message.guild.id, "JTC1-Moderator")
                                    }
                                    client.settings.delete(message.guild.id)
                                    console.log(`Deleted the Database for the First JTC System.`)
                                    
                                } else if (options == "Join-To-Create-2") {
                                    console.log(`Deleted the Database for the Second JTC System.`)
                                    const data = client.settings.get(message.guild.id, `JTC2-channel`)
                                    const data2 = client.settings.get(message.guild.id, `JTC2-Category`)
                                    const data3 = client.settings.get(message.guild.id, `JTC2-Logger`)
                                    const data4 = client.settings.get(message.guild.id, `JTC2-LogMessage`)
                                    const data5 = client.settings.get(message.guild.id, `JTC2-Moderator`)

                                    if (data) {
                                         client.settings.delete(message.guild.id, "JTC2-channel")
                                    } 
                                    if (data2) {
                                        client.settings.delete(message.guild.id, "JTC2-Category")
                                    }
                                    if (data3) {
                                        client.settings.delete(message.guild.id, "JTC2-Logger")
                                    } 
                                    if (data4) {
                                        client.settings.delete(message.guild.id, "JTC2-LogMessage")
                                    }
                                    if (data5) {
                                        client.settings.delete(message.guild.id, "JTC2-Moderator")
                                    }
                                    client.settings.delete(message.guild.id)
                                } else if (options == "Join-To-Create-3") {
                                    console.log(`Deleted the Database for the Third JTC System.`)
                                    const data = client.settings.get(message.guild.id, `JTC3-channel`)
                                    const data2 = client.settings.get(message.guild.id, `JTC3-Category`)
                                    const data3 = client.settings.get(message.guild.id, `JTC3-Logger`)
                                    const data4 = client.settings.get(message.guild.id, `JTC3-LogMessage`)
                                    const data5 = client.settings.get(message.guild.id, `JTC3-Moderator`)

                                    if (data) {
                                         client.settings.delete(message.guild.id, "JTC3-channel")
                                    } 
                                    if (data2) {
                                        client.settings.delete(message.guild.id, "JTC3-Category")
                                    }
                                    if (data3) {
                                        client.settings.delete(message.guild.id, "JTC3-Logger")
                                    } 
                                    if (data4) {
                                        client.settings.delete(message.guild.id, "JTC3-LogMessage")
                                    }
                                    if (data5) {
                                        client.settings.delete(message.guild.id, "JTC3-Moderator")
                                    }
                                    client.settings.delete(message.guild.id)
                                } else if (options == "Join-To-Create-4`") {
                                    console.log(`Deleted the Database for the Forth JTC System.`)
                                    const data = client.settings.get(message.guild.id, `JTC4-channel`)
                                    const data2 = client.settings.get(message.guild.id, `JTC4-Category`)
                                    const data3 = client.settings.get(message.guild.id, `JTC4-Logger`)
                                    const data4 = client.settings.get(message.guild.id, `JTC4-LogMessage`)
                                    const data5 = client.settings.get(message.guild.id, `JTC4-Moderator`)

                                    if (data) {
                                         client.settings.delete(message.guild.id, "JTC4-channel")
                                    } 
                                    if (data2) {
                                        client.settings.delete(message.guild.id, "JTC4-Category")
                                    }
                                    if (data3) {
                                        client.settings.delete(message.guild.id, "JTC4-Logger")
                                    } 
                                    if (data4) {
                                        client.settings.delete(message.guild.id, "JTC4-LogMessage")
                                    }
                                    if (data5) {
                                        client.settings.delete(message.guild.id, "JTC4-Moderator")
                                    }
                                    client.settings.delete(message.guild.id)
                                } else if (options == "Join-To-Create-5") {
                                    console.log(`Deleted the Database for the Fith JTC System.`)
                                    const data = client.settings.get(message.guild.id, `JTC5-channel`)
                                    const data2 = client.settings.get(message.guild.id, `JTC5-Category`)
                                    const data3 = client.settings.get(message.guild.id, `JTC5-Logger`)
                                    const data4 = client.settings.get(message.guild.id, `JTC5-LogMessage`)
                                    const data5 = client.settings.get(message.guild.id, `JTC5-Moderator`)

                                    if (data) {
                                         client.settings.delete(message.guild.id, "JTC5-channel")
                                    } 
                                    if (data2) {
                                        client.settings.delete(message.guild.id, "JTC5-Category")
                                    }
                                    if (data3) {
                                        client.settings.delete(message.guild.id, "JTC5-Logger")
                                    } 
                                    if (data4) {
                                        client.settings.delete(message.guild.id, "JTC5-LogMessage")
                                    }
                                    if (data5) {
                                        client.settings.delete(message.guild.id, "JTC5-Moderator")
                                    }
                                    client.settings.delete(message.guild.id)
                                }
                                JTCCollector3.reply({embeds: [
                                    new EmbedBuilder()
                                    .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                    .setDescription(`<:checkmark:1005732039846277181> __*** Database Succesfully Deleted. ***__`)
                                    .setColor("DarkRed")
                                    .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                 ],
                                 content: ` `
                                }).catch((e) => {
                                    message.channel.send({embeds: [
                                        new EmbedBuilder()
                                        .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                        .setDescription(`<:checkmark:1005732039846277181> __*** Database Succesfully Deleted. ***__`)
                                        .setColor("DarkRed")
                                        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                     ],
                                     content: ` `
                                    })
                                })
                            }
                            if (b.customId == "No-Delete") {
                                Collector.push("true")
                                JTCCollector3.edit({
                                    embeds:[
                                        new EmbedBuilder()
                                        .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                        .setDescription(`***__ Are you Sure you want to Delete This? (You Have 30s)__***`)
                                        .setColor("DarkRed")
                                        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                    ],
                                    components: [row3_Disabled]
                                })
                                b.reply({embeds: [
                                    new EmbedBuilder()
                                    .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                    .setDescription(`<:checkmark:1005732039846277181> __*** Succesfully Canceled the Operation ***__`)
                                    .setColor("DarkRed")
                                    .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                 ],
                                 content: ` `
                                }).catch((e) => {
                                    message.channel.send({embeds: [
                                        new EmbedBuilder()
                                        .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                                        .setDescription(`<:checkmark:1005732039846277181> __*** Succesfully Canceled the Operation. ***__`)
                                        .setColor("DarkRed")
                                        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                                     ],
                                     content: ` `
                                    })
                                })
                            }
                            b.deferUpdate().catch(e => {})
                         })
                    }
                }
                b.deferUpdate().catch(e => {})
            })
            collector2.on('end', collected => {
                if (Collector2.length < 1) {
                    JTCCollector2.edit({embeds: [
                        new EmbedBuilder()
                        .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                        .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                        .setColor("DarkRed")
                        .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                     ],
                     components: []
                    }).catch((e) => {
                        message.channel.send({
                            embeds: [
                               new EmbedBuilder()
                               .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                               .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                               .setColor("DarkRed")
                               .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                            ]
                        })
                   })
                }
            });
    
            }
            b.deferUpdate().catch(e => {})
        })
        collector.on('end', collected => {
            console.log(Collector)
            if (Collector.length < 1) {
                JTCCollector.edit({embeds: [
                    new EmbedBuilder()
                    .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                    .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                    .setColor("DarkRed")
                    .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                 ],
                 components: []
                }).catch((e) => {
                    message.channel.send({
                        embeds: [
                           new EmbedBuilder()
                           .setAuthor({name: `Join To Create Setup`, iconURL: client.user.displayAvatarURL()})
                           .setDescription(`__*** I've Stoped The JTC Setup Because You didn't Answer in 60s ***__`)
                           .setColor("DarkRed")
                           .setFooter({ text: `${client.user.username} | Made By: Roverdev` })
                        ]
                    })
               })
            }
        });
    }}