const { EmbedBuilder, ActionRow, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js")
const Warnings = require("../../database/schemas/Moderation/Warnings")

module.exports = {
    name: "warnings",
    category: "moderation",
    cooldown: 2,
    Description: "view all warnings of a user",
    RunCommand: async (Roverdev, message, args, executor) => {

        if (message.mentions.users.size > 0) {
            args[0] = message.mentions.members.first().id
        }

        if (!args[0]) args[0] = message.author.id


        let data = await Warnings.findOne({ AuthorId: args[0] })

        if (!data) return message.reply({ content: `Wow! I am supprised they have not broken any rules, they have no warnings on this server congrats!` })

        let hm = {
            embeds: [],
            components: []
        }

        let row;

        if (data) {
            let array = data.Warnings

            if (args[1]) {
                let uh = args.slice(0)

                if (uh.length < 5) uh.forEach(async (m, number) => {

                    console.log(m)

                    let data = await Warnings.findOne({ AuthorId: m })
                    let array = data.Warnings

                    const uhemned = new EmbedBuilder()
                        .setTitle(`${Roverdev.users.cache.get(m).username} Currently have ${array.length} Warnings in this server!`)
                        .setDescription(`They have no warnings in this server`)
                        .setColor("Red")


                    if (data.Warnings < 1) return hm.embeds.push(uhemned)

                    const embed = new EmbedBuilder()
                        .setTitle(`${Roverdev.users.cache.get(m).username} Currently have ${array.length} Warnings in this server!`)
                        .setDescription(`\n ${array.map((m, number) => `> - Warn #${number}\n>  - Moderator: ${Roverdev.users.cache.get(m.Moderator).username}\n>  - Reason: \`${m.Reason}\`\n>  - Date: <t:${Math.round(m.WarnDate / 1000)}> (<t:${Math.round(m.WarnDate / 1000)}:R>)`).join('\n ')}`)
                        .setColor("Red")



                    hm.embeds.push(embed)

                    if (message.member.roles.cache.has("1085500041969532968") && message.member.roles.highest.position > message.guild.members.cache.get(m).roles.highest.position && m !== message.author.id) {
                        let row = new ActionRowBuilder()
                            .addComponents(
                                new StringSelectMenuBuilder()
                                    .setCustomId("WarningRemove" + number)
                                    .setPlaceholder("Select what warn to remove" + ` From ${Roverdev.users.cache.get(m).username}`)
                                    .setOptions(
                                        array.map((m1, number) => {
                                            return {
                                                label: `Warn #${number}`,
                                                description: `Reason: ${m1.Reason}`,
                                                value: `Warn ${number} ${m}`
                                            }
                                        })
                                    )
                            )

                        hm.components.push(row)
                    }
                })
            } else {
                const embed = new EmbedBuilder()
                    .setTitle(`${Roverdev.users.cache.get(args[0]).username} Currently have ${array.length} Warnings in this server!`)
                    .setDescription(`\n ${array.map((m, number) => `> - Warn #${number}\n>  - Moderator: ${Roverdev.users.cache.get(m.Moderator).username}\n>  - Reason: \`${m.Reason}\`\n>  - Date: <t:${Math.round(m.WarnDate / 1000)}> (<t:${Math.round(m.WarnDate / 1000)}:R>)`).join('\n ')}`)
                    .setColor("Red")

                hm.embeds.push(embed)



                if (message.member.roles.cache.has("1085500041969532968") && message.member.roles.highest.position > message.guild.members.cache.get(args[0]).roles.highest.position && args[0] !== message.author.id) {
                    row = new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                                .setCustomId("WarningRemove")
                                .setPlaceholder("Select what warn to remove" + ` From ${Roverdev.users.cache.get(args[0]).username}`)
                                .setOptions(
                                    array.map((m, number) => {
                                        return {
                                            label: `Warn #${number}`,
                                            description: `Reason: ${m.Reason}`,
                                            value: `Warn${number}`
                                        }
                                    })
                                )
                        )

                    hm.components = [row]
                }
            }



            setTimeout(async () => {
                let msg = await message.reply(hm)

                let collector = msg.createMessageComponentCollector({
                    time: 50000
                })

                collector.on("collect", async (collect) => {

                    if (collect.customId.includes('WarningRemove') && collect.customId !== "WarningsRemove") {
                        if (collect.user.id !== message.author.id) {
                            return collect.reply({ content: `Sorry but, You are not the person who ran that command.`, ephemeral: true })
                        }
                        let Row;

                        collect.message.components.forEach(async m => {
                            m.components[0].options.forEach(async m1 => {
                                if (m1.value == collect.values[0]) {
                                    let userId = m1.value.split(' ')[2]
                                    let WarnId = m1.value.split(' ')[1]
                                    let data = await Warnings.findOne({ AuthorId: userId })


                                    Roverdev.users.cache.get(userId).send({
                                        embeds: [
                                            new EmbedBuilder()
                                                .setAuthor({ name: `1 of your Warnings have been removed!`, iconURL: message.guild.members.cache.get(userId).displayAvatarURL() })
                                                .setTitle(`You now have \`${data.Warnings.length == 0 ? data.Warnings.length : data.Warnings.length - 1}\` Warnings in the server!`)
                                                .setColor("Green")
                                                .setDescription(`Warn #${WarnId} Got Removed from you!\n> - Reason of Warn: \`${data.Warnings[WarnId].Reason}\`\n> - Moderator Who Warned: \`${Roverdev.users.cache.get(data.Warnings[WarnId].Moderator).username}\`\n> - Who Removed: \`${Roverdev.users.cache.get(message.author.id).username}\``)
                                        ]
                                    })

                                    let embed = EmbedBuilder.from(collect.message.embeds[0])

                                    embed.setDescription(`\n ${data.Warnings.map((m, number) => `> - Warn #${number}\n>  - Moderator: ${Roverdev.users.cache.get(m.Moderator).username}\n>  - Reason: \`${m.Reason}\`\n>  - Date: <t:${Math.round(m.WarnDate / 1000)}> (<t:${Math.round(m.WarnDate / 1000)}:R>)`).join('\n ')}`)


                                    Roverdev.channels.cache.get("1085661987159162961").send({
                                        embeds: [
                                            new EmbedBuilder()
                                                .setAuthor({ name: `1 of your Warnings have been removed!`, iconURL: message.guild.members.cache.get(userId).displayAvatarURL() })
                                                .setTitle(`They now have \`${data.Warnings.length == 0 ? data.Warnings.length : data.Warnings.length - 1}\` Warnings in the server!`)
                                                .setColor("Green")
                                                .setDescription(`Warn #${WarnId} Got Removed from ${message.guild.members.cache.get(userId).user.username}!\n> - Reason of Warn: \`${data.Warnings[WarnId].Reason}\`\n> - Moderator Who Warned: \`${Roverdev.users.cache.get(data.Warnings[WarnId].Moderator).username}\`\n> - Who Removed: \`${Roverdev.users.cache.get(message.author.id).username}\``)
                                        ], content: `${message.guild.members.cache.get(userId).user.username} Warned has been removed!`
                                    })

                                    data.Warnings.splice(WarnId, 1)

                                    if (data.Warnings.length < 1) Warnings.findOneAndDelete({ AuthorId: userId })

                                    await data.save()
                                    data = await Warnings.findOne({ AuthorId: userId })



                                    return collect.reply({
                                        embeds: [
                                            new EmbedBuilder()
                                                .setTitle("Successfully Removed the Warning!")
                                        ], ephemeral: true
                                    })

                                }
                            })
                        })
                    }


                    if (collect.customId == "WarningRemove") {
                        if (collect.user.id !== message.author.id) {
                            return collect.reply({ content: `Sorry but, You are not the person who ran that command.`, ephemeral: true })
                        }


                        let Type = collect.values[0]

                        Roverdev.users.cache.get(args[0]).send({
                            embeds: [
                                new EmbedBuilder()
                                    .setAuthor({ name: `1 of your Warnings have been removed!`, iconURL: message.guild.members.cache.get(args[0]).displayAvatarURL() })
                                    .setTitle(`You now have \`${data.Warnings.length == 0 ? data.Warnings.length : data.Warnings.length - 1}\` Warnings in the server!`)
                                    .setColor("Green")
                                    .setDescription(`Warn #${`${Type}`.split("Warn")[1]} Got Removed from you!\n> - Reason of Warn: \`${data.Warnings[`${Type}`.split("Warn")[1]].Reason}\`\n> - Moderator Who Warned: \`${Roverdev.users.cache.get(data.Warnings[`${Type}`.split("Warn")[1]].Moderator).username}\`\n> - Who Removed: \`${Roverdev.users.cache.get(message.author.id).username}\``)
                            ]
                        })

                        let RowArray = row.components[0].options
                        RowArray.splice(RowArray.indexOf(RowArray.find(m => m.data.value == Type)), 1)

                        if (row.components[0].options.length < 1) {
                            RowArray = []
                        }

                        data.Warnings.splice(`${Type}`.split("Warn")[1], 1)

                        if (data.Warnings.length < 1) Warnings.findOneAndDelete({ AuthorId: args[0] })

                        await data.save()
                        data = await Warnings.findOne({ AuthorId: args[0] })

                        let embed = EmbedBuilder.from(collect.message.embeds[0])

                        embed.setDescription(`\n ${data.Warnings.map((m, number) => `> - Warn #${number}\n>  - Moderator: ${Roverdev.users.cache.get(m.Moderator).username}\n>  - Reason: \`${m.Reason}\`\n>  - Date: <t:${Math.round(m.WarnDate / 1000)}> (<t:${Math.round(m.WarnDate / 1000)}:R>)`).join('\n ')}`)

                        collect.message.edit({ embeds: [embed], components: RowArray })

                        Roverdev.channels.cache.get("1085661987159162961").send({
                            embeds: [
                                new EmbedBuilder()
                                    .setAuthor({ name: `1 of your Warnings have been removed!`, iconURL: message.guild.members.cache.get(args[0]).displayAvatarURL() })
                                    .setTitle(`They now have \`${data.Warnings.length == 0 ? data.Warnings.length : data.Warnings.length - 1}\` Warnings in the server!`)
                                    .setColor("Green")
                                    .setDescription(`Warn #${`${Type}`.split("Warn")[1]} Got Removed from ${message.guild.members.cache.get(args[0]).username}!\n> - Reason of Warn: \`${data.Warnings[`${Type}`.split("Warn")[1]].Reason}\`\n> - Moderator Who Warned: \`${Roverdev.users.cache.get(data.Warnings[`${Type}`.split("Warn")[1]].Moderator).username}\`\n> - Who Removed: \`${Roverdev.users.cache.get(message.author.id).username}\``)
                            ], content: `${message.guild.members.cache.get(args[0]).user.username} Warned has been removed!`
                        })


                        return collect.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle("Successfully Removed the Warning!")
                            ], ephemeral: true
                        })

                    }
                })
            }, 1000);
        }
    }
}