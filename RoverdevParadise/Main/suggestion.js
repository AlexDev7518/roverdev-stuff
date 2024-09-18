const Discord = require("discord.js")
const Suggestion = require("../../database/schemas/suggestions")

module.exports = async Roverdev => {
    let suggestion_channel = "1085511123102609502"

    Roverdev.on("messageCreate", async (message) => {

        if (!message.guild || !message.guild.available || !message.channel) return;
        if (message.author.bot || message.webhookId) return;

        if (message.guild.id !== "846548733914906664") return;

        if (message.author.bot == true) return
        if (message.type !== Discord.MessageType.Default) return


        if (message?.channel?.id == suggestion_channel) {

            message.delete({ reason: "Suggestionsystem" })

            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("suggestion_upvote")
                        .setEmoji("973014979265585232")
                        .setLabel("UpVote (0)")
                        .setStyle(Discord.ButtonStyle.Primary),
                    new Discord.ButtonBuilder()
                        .setCustomId("suggestion_downvote")
                        .setEmoji("973014979311706172")
                        .setLabel("DownVote (0)")
                        .setStyle(Discord.ButtonStyle.Primary),
                    new Discord.ButtonBuilder()
                        .setCustomId("WhoVoted")
                        .setEmoji("1122680919145320628")
                        .setLabel("Voted Users")
                        .setStyle(Discord.ButtonStyle.Success)

                )

            message.channel.send({
                components: [row],
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription(`>>> \`\`\`\n${message.content.slice(0, 4090)}\`\`\``)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                        .setAuthor({ name: `💡 | New suggestion - ${message.author.username}`, iconURL: message.author.displayAvatarURL() })
                        .setFooter({ text: "Wondering how to Suggest something? Just type it in the channel.", iconURL: message.guild.iconURL() })
                        .setColor("Yellow")
                ]
            }).then(async (msg) => {
                await Suggestion.create({
                    suggestion_id: msg.id,
                    channel_id: { ChannelId: message.channel.id, ChannelName: message.channel.name },
                    author: message.author.id,
                    upvotes: 0,
                    downvotes: 0,
                    upvotes_list: [],
                    downvotes_list: []
                })
            })
        }
    })

    Roverdev.on(Discord.Events.InteractionCreate, async interaction => {
        if (interaction.channel.id == suggestion_channel) {
            let data = await Suggestion.findOne({ suggestion_id: interaction.message.id })

            if (!data) {
                data = await Suggestion.findOne({ suggestion_id: interaction.message.reference.messageId })
                if (!data) return;
            }



            if (interaction.customId == "suggestion_upvote") {
                if (data.upvotes_list.includes(interaction.member.user.id)) return await interaction.reply({ embeds: [new Discord.EmbedBuilder().setColor("Red").setDescription("You already voted up this suggestion. Would you like to remove your vote?")], ephemeral: true, components: [new Discord.ActionRowBuilder().addComponents( new Discord.ButtonBuilder().setCustomId("suggestion_upvote_remove").setEmoji("1161692887663259789").setLabel("Remove Vote").setStyle(Discord.ButtonStyle.Danger) )] })

                interaction.deferUpdate().catch((e) => { })
                
                data.upvotes_list.push(interaction.member.user.id)

                data.upvotes = data.upvotes + 1

                if (data.downvotes_list.includes(interaction.member.user.id)) {
                    data.downvotes = data.downvotes == 0 ? 0 : data.downvotes - 1
                    const index1 = data.downvotes_list.indexOf(interaction.member.user.id);
                    const x1 = data.downvotes_list.splice(index1, 1);
                }

                await data.save()
                data = await Suggestion.findOne({ suggestion_id: interaction.message.id })

                /**
                 * @Update message
                 */

                let msg = Roverdev.channels.cache.get(suggestion_channel).messages.cache.get(interaction.message.id)

                msg.components[0].components[1].data.label = "DownVote (" + data.downvotes + ")"
                msg.components[0].components[0].data.label = "Upvote (" + data.upvotes + ")"



                msg.edit({ components: [msg.components[0]] })


            }

            if (interaction.customId == "suggestion_downvote") {
                if (data.downvotes_list.includes(interaction.member.user.id)) return await interaction.reply({ embeds: [new Discord.EmbedBuilder().setColor("Red").setDescription("You already voted down this suggestion. Would you like to remove your vote?")], ephemeral: true, components: [new Discord.ActionRowBuilder().addComponents( new Discord.ButtonBuilder().setCustomId("suggestion_downvote_remove").setEmoji("1161692887663259789").setLabel("Remove Vote").setStyle(Discord.ButtonStyle.Danger) )] })

                interaction.deferUpdate().catch((e) => { })

                data.downvotes_list.push(interaction.member.user.id)

                data.downvotes = data.downvotes + 1

                if (data.upvotes_list.includes(interaction.member.user.id)) {
                    data.upvotes = data.upvotes == 0 ? 0 : data.upvotes - 1
                    const index1 = data.upvotes_list.indexOf(interaction.member.user.id);
                    const x1 = data.upvotes_list.splice(index1, 1);
                }

                await data.save()
                data = await Suggestion.findOne({ suggestion_id: interaction.message.id })

                /**
                 * @Update message
                 */

                let msg = Roverdev.channels.cache.get(suggestion_channel).messages.cache.get(interaction.message.id)

                msg.components[0].components[1].data.label = "DownVote (" + data.downvotes + ")"
                msg.components[0].components[0].data.label = "Upvote (" + data.upvotes + ")"



                msg.edit({ components: [msg.components[0]] })
            }

            if (interaction.customId == "suggestion_downvote_remove") {
                if (String(interaction.customId).includes("downvote_remove") && data.downvotes_list.includes(interaction.member.user.id)) {
                    data.downvotes = data.downvotes == 0 ? 0 : data.downvotes - 1
                    const index1 = data.downvotes_list.indexOf(interaction.member.user.id);
                    const x1 = data.downvotes_list.splice(index1, 1);

                    try {
                        await interaction.editReply({ embeds: [new Discord.EmbedBuilder().setColor("Green").setDescription("Successfully Removed your Down Vote.")],  ephemeral: true })
                    } catch (error) {
                        await interaction.reply({ embeds: [new Discord.EmbedBuilder().setColor("Green").setDescription("Successfully Removed your Down Vote.")], ephemeral: true})
                    }

                    await data.save()
                    data = await Suggestion.findOne({ suggestion_id: interaction.message.reference.messageId })
    
                    /**
                     * @Update message
                     */
    
                    let msg = Roverdev.channels.cache.get(suggestion_channel).messages.cache.get(interaction.message.reference.messageId)
    
                    msg.components[0].components[1].data.label = "DownVote (" + data.downvotes + ")"
                    msg.components[0].components[0].data.label = "Upvote (" + data.upvotes + ")"
    
    
    
                    msg.edit({ components: [msg.components[0]] })
                }
            } 

            if (interaction.customId == "suggestion_upvote_remove") {
                    if (String(interaction.customId).includes("upvote_remove") && data.upvotes_list.includes(interaction.member.user.id)) {
                        data.upvotes = data.upvotes == 0 ? 0 : data.upvotes - 1
                        const index1 = data.downvotes_list.indexOf(interaction.member.user.id);
                        const x1 = data.downvotes_list.splice(index1, 1);
    

                        try {
                            await interaction.editReply({ embeds: [new Discord.EmbedBuilder().setColor("Green").setDescription("Successfully Removed your Up Vote.")], ephemeral: true })
                        } catch (error) {
                            await interaction.reply({ embeds: [new Discord.EmbedBuilder().setColor("Green").setDescription("Successfully Removed your Up Vote.")], ephemeral: true})
                        }

                        await data.save()
                        data = await Suggestion.findOne({ suggestion_id: interaction.message.reference.messageId })
        
                        /**
                         * @Update message
                         */
        
                        let msg = Roverdev.channels.cache.get(suggestion_channel).messages.cache.get(interaction.message.reference.messageId)
        
                        msg.components[0].components[1].data.label = "DownVote (" + data.downvotes + ")"
                        msg.components[0].components[0].data.label = "Upvote (" + data.upvotes + ")"
        
        
        
                        msg.edit({ components: [msg.components[0]] })
                    }
            }

            if (interaction.customId == "WhoVoted") {
                const embed = new Discord.EmbedBuilder()
                    .setTitle("Here is all the voted users below")
                    .setColor("Blue")
                    .addFields([
                        {
                            name: "UpVoted Users",
                            value: `${data.upvotes_list.length == 0 ? "None" : data.upvotes_list.map(m => interaction.guild.members.cache.get(m) ? `${Roverdev.users.cache.get(m)}` : `<@!${m}>`).join(", ")}`
                        },
                        {
                            name: "DownVoted Users",
                            value: `${data.downvotes_list.length == 0 ? "None" : data.downvotes_list.map(m => interaction.guild.members.cache.get(m) ? `${Roverdev.users.cache.get(m)}`:`<@!${m}>`).join(", ")}`
                        }
                    ])

                interaction.reply({ embeds: [embed], ephemeral: true })

            }
        }
    })

}
