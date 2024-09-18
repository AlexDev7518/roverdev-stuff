const { EmbedBuilder } = require("discord.js")
const Discord = require("discord.js")
const CoinBalance = require("../../database/schemas/RoverCoins/Balance")
const invites = require("../../database/schemas/RoverCoins/Main/invites")
const Ranking = require("../../database/schemas/Ranking/UserMessages")

module.exports = {
    name: "profile",
    category: "RoverCoins",
    cooldown: 2,
    Description: "View your Invites, and other things manged by Rover Coins!",
    RunCommand: async (Roverdev, message, args, executor) => {
        let Custom = args[0]

        let Options = ["invites", "activity"
            // "Payments", "Coins", "Ranking"
        ]

        if (Custom && String(Custom)?.length > 1 && !Options.includes(Custom)) return message.reply({ content: `The only option you have at the moment is ${Options.map(m => m).join(",")}` })

        if (Custom && String(Custom).length > 1) {
            if (Custom == "invites") {
                let CoinData = await CoinBalance.findOne({ Author: message.author.id })
                let InviteData = await invites.findOne({ Author: message.author.id })
        
                if (!InviteData) return message.reply({ content: `Seems you have not invited any users :cry:`,ephemeral:true})
        
                if (InviteData) {
        
                    let GreenText = (text) => `[2;31m[1;31m[1;32m[1;32m${text}[0m[1;32m[0m[1;31m[0m[2;31m[0m`
                    let RedText = (text) => `[2;31m[1;31m[1;32m[1;32m[1;31m[1;31m${text}[0m[1;31m[0m[1;32m[0m[1;32m[0m[1;31m[0m[2;31m[0m`
                    let YellowText = (text) => `[2;31m[2;34m[1;34m[1;33m[1;33m${text}[0m[1;33m[0m[1;34m[0m[2;34m[0m[2;31m[0m`
                    let BlueText = (text) => `[2;31m[2;34m${text}[0m[2;31m[0m`
        
        
                    let embed = new EmbedBuilder()
                        .setAuthor({ name: `RoverCoins Profile`, iconURL: message.author.displayAvatarURL() })
                        .setColor("Yellow")
                        .setTimestamp()
                        .setTitle("Currently Viewing Invites Data")
                        .setDescription(`\`\`\`ansi\n${YellowText(`Invite Information`)}\n- ${GreenText(`Total Joins`)}: ${BlueText(`${InviteData.TotalInvites}`)}\n${YellowText(`Coins Information (Invites)`)}\n- ${GreenText("Invite Coins")}: ${BlueText(`${CoinData.InviteCoins}`)}\`\`\``)
        
        
                    if (InviteData.Joins.length > 0) {
                        embed.addFields({ name: `Server Joins`, value: `\`\`\`ansi\n${GreenText(`${InviteData.Joins.map(m => `${Roverdev.users.cache.get(m).username}`)}`)}\`\`\`` })
                    } else if (InviteData.Joins.length < 1) {
                        embed.addFields({ name: `Server Joins`, value: `\`\`\`ansi\n${RedText(`No Joins.`)}\`\`\`` })
                    }
        
                    if (InviteData.Leaves.length > 0) {
                        embed.addFields({ name: `Server Leaves`, value: `\`\`\`ansi\n${GreenText(`${InviteData.Leaves.map(m => `${Roverdev.users.cache.get(m).username}`)}`)}\`\`\`` })
                    } else if (InviteData.Leaves.length < 1) {
                        embed.addFields({ name: `Server Leaves`, value: `\`\`\`ansi\n${RedText(`No Leaves.`)}\`\`\`` })
                    }
        
                    if (InviteData.Fake.length > 0) {
                        embed.addFields({ name: `Server Fakes`, value: `\`\`\`ansi\n${GreenText(`${InviteData.Fake.map(m => `${Roverdev.users.cache.get(m).username}`)}`)}\`\`\`` })
                    } else if (InviteData.Fake.length < 1) {
                        embed.addFields({ name: `Server Fakes`, value: `\`\`\`ansi\n${RedText(`No Fakes.`)}\`\`\`` })
                    }
        
                    message.reply({ embeds: [embed] })
                    return;
                } 
            } else   if (Custom == "activity") {
                let CoinData = await CoinBalance.findOne({ Author: message.author.id })
                let actvitydata = await Ranking.findOne({ Author: message.author.id })
        
                if (!actvitydata) return message.reply({ content: `Seems like, you haven't been active so far :cry:`,ephemeral:true})
        
                if (actvitydata) {
        
                    let GreenText = (text) => `[2;31m[1;31m[1;32m[1;32m${text}[0m[1;32m[0m[1;31m[0m[2;31m[0m`
                    let RedText = (text) => `[2;31m[1;31m[1;32m[1;32m[1;31m[1;31m${text}[0m[1;31m[0m[1;32m[0m[1;32m[0m[1;31m[0m[2;31m[0m`
                    let YellowText = (text) => `[2;31m[2;34m[1;34m[1;33m[1;33m${text}[0m[1;33m[0m[1;34m[0m[2;34m[0m[2;31m[0m`
                    let BlueText = (text) => `[2;31m[2;34m${text}[0m[2;31m[0m`
        
        
                    let embed = new EmbedBuilder()
                        .setAuthor({ name: `RoverCoins Profile`, iconURL: message.author.displayAvatarURL() })
                        .setColor("Yellow")
                        .setTimestamp()
                        .setTitle("Currently Viewing Ranking Data")
                        .setDescription(`\`\`\`ansi\n${YellowText("Message Information")}:\n- ${BlueText("Total Messages")}: ${actvitydata.AllMessages > 0 ? BlueText(`${actvitydata.AllMessages} Messages`) : `${RedText(`No Messages...`)}`}\n- ${BlueText("Ticket Messages")}: ${actvitydata.TicketMessages > 0 ? GreenText(`${actvitydata.TicketMessages} Messages`) : `${RedText(`No Ticket Messages..`)}`}\n- ${BlueText(`Commands Ran`)}: ${actvitydata.CommandsRan > 0 ? GreenText(`${actvitydata.CommandsRan} Ran`) : RedText(`None ran...`)}\n- ${BlueText("Giveaway Messages")}: ${actvitydata.GiveawayMessages > 0 ? BlueText(`${actvitydata.GiveawayMessages} Messages`) : RedText(`No messages..`)}\`\`\``)
                        
        
    
                        message.reply({ embeds: [embed]})
                        return;
                }
        }
    }

        let embed_select = new EmbedBuilder()
                    .setAuthor({ name: `RoverCoins Profile`, iconURL: message.author.displayAvatarURL() })
                    .setColor("Yellow")
                    .setTimestamp()
                    .setTitle("Select an option")

        let menu = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.StringSelectMenuBuilder()
            .setCustomId("economy_profile_selection")
            .setPlaceholder("Select an option to see more details")
            .addOptions(
                new Discord.StringSelectMenuOptionBuilder()
                .setLabel('home')
                .setDescription('Get back to start page')
                .setEmoji("🏠")
                .setValue('economy_profile_home'),
            
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('invites')
                .setDescription('Get all of your invites')
                .setEmoji("➕")
                .setValue('economy_profile_invites'),
            
            new Discord.StringSelectMenuOptionBuilder()
            .setLabel('activities')
            .setDescription('See your activity on this server')
            .setEmoji("🥵")
            .setValue('economy_profile_activity'),
            )
        )

        let m = await message.reply({embeds:[embed_select],components:[menu]})

        const filter = (msg) => msg.user.id === message.author.id;

        const collector = m.createMessageComponentCollector({
            filter,
            time: 50000,
        });

collector.on('collect', async mj => {
    let value = mj.values[0]

    if (value == "economy_profile_invites") {
        let CoinData = await CoinBalance.findOne({ Author: message.author.id })
        let InviteData = await invites.findOne({ Author: message.author.id })

        if (!InviteData) return mj.reply({ content: `Seems you have not invited any users :cry:`,ephemeral:true})

        if (InviteData) {

            let GreenText = (text) => `[2;31m[1;31m[1;32m[1;32m${text}[0m[1;32m[0m[1;31m[0m[2;31m[0m`
            let RedText = (text) => `[2;31m[1;31m[1;32m[1;32m[1;31m[1;31m${text}[0m[1;31m[0m[1;32m[0m[1;32m[0m[1;31m[0m[2;31m[0m`
            let YellowText = (text) => `[2;31m[2;34m[1;34m[1;33m[1;33m${text}[0m[1;33m[0m[1;34m[0m[2;34m[0m[2;31m[0m`
            let BlueText = (text) => `[2;31m[2;34m${text}[0m[2;31m[0m`


            let embed = new EmbedBuilder()
                .setAuthor({ name: `RoverCoins Profile`, iconURL: message.author.displayAvatarURL() })
                .setColor("Yellow")
                .setTimestamp()
                .setTitle("Currently Viewing Invites Data")
                .setDescription(`\`\`\`ansi\n${YellowText(`Invite Information`)}\n- ${GreenText(`Total Joins`)}: ${BlueText(`${InviteData.TotalInvites}`)}\n${YellowText(`Coins Information (Invites)`)}\n- ${GreenText("Invite Coins")}: ${BlueText(`${CoinData.InviteCoins}`)}\`\`\``)


            if (InviteData.Joins.length > 0) {
                embed.addFields({ name: `Server Joins`, value: `\`\`\`ansi\n${GreenText(`${InviteData.Joins.map(m => `${Roverdev.users.cache.get(m).username}`)}`)}\`\`\`` })
            } else if (InviteData.Joins.length < 1) {
                embed.addFields({ name: `Server Joins`, value: `\`\`\`ansi\n${RedText(`No Joins.`)}\`\`\`` })
            }

            if (InviteData.Leaves.length > 0) {
                embed.addFields({ name: `Server Leaves`, value: `\`\`\`ansi\n${GreenText(`${InviteData.Leaves.map(m => `${Roverdev.users.cache.get(m).username}`)}`)}\`\`\`` })
            } else if (InviteData.Leaves.length < 1) {
                embed.addFields({ name: `Server Leaves`, value: `\`\`\`ansi\n${RedText(`No Leaves.`)}\`\`\`` })
            }

            if (InviteData.Fake.length > 0) {
                embed.addFields({ name: `Server Fakes`, value: `\`\`\`ansi\n${GreenText(`${InviteData.Fake.map(m => `${Roverdev.users.cache.get(m).username}`)}`)}\`\`\`` })
            } else if (InviteData.Fake.length < 1) {
                embed.addFields({ name: `Server Fakes`, value: `\`\`\`ansi\n${RedText(`No Fakes.`)}\`\`\`` })
            }

            mj.deferUpdate()
            mj.message.edit({ embeds: [embed] })
        } 
    } else   if (value == "economy_profile_activity") {
        let CoinData = await CoinBalance.findOne({ Author: message.author.id })
        let actvitydata = await Ranking.findOne({ Author: message.author.id })

        if (!actvitydata) return mj.reply({ content: `Seems like, you haven't been active so far :cry:`,ephemeral:true})

        if (actvitydata) {

            let GreenText = (text) => `[2;31m[1;31m[1;32m[1;32m${text}[0m[1;32m[0m[1;31m[0m[2;31m[0m`
            let RedText = (text) => `[2;31m[1;31m[1;32m[1;32m[1;31m[1;31m${text}[0m[1;31m[0m[1;32m[0m[1;32m[0m[1;31m[0m[2;31m[0m`
            let YellowText = (text) => `[2;31m[2;34m[1;34m[1;33m[1;33m${text}[0m[1;33m[0m[1;34m[0m[2;34m[0m[2;31m[0m`
            let BlueText = (text) => `[2;31m[2;34m${text}[0m[2;31m[0m`


            let embed = new EmbedBuilder()
                .setAuthor({ name: `RoverCoins Profile`, iconURL: message.author.displayAvatarURL() })
                .setColor("Yellow")
                .setTimestamp()
                .setTitle("Currently Viewing Ranking Data")
                .setDescription(`\`\`\`ansi\n${YellowText("Message Information")}:\n- ${BlueText("Total Messages")}: ${actvitydata.AllMessages > 0 ? BlueText(`${actvitydata.AllMessages} Messages`) : `${RedText(`No Messages...`)}`}\n- ${BlueText("Ticket Messages")}: ${actvitydata.TicketMessages > 0 ? GreenText(`${actvitydata.TicketMessages} Messages`) : `${RedText(`No Ticket Messages..`)}`}\n- ${BlueText(`Commands Ran`)}: ${actvitydata.CommandsRan > 0 ? GreenText(`${actvitydata.CommandsRan} Ran`) : RedText(`None ran...`)}\n- ${BlueText("Giveaway Messages")}: ${actvitydata.GiveawayMessages > 0 ? BlueText(`${actvitydata.GiveawayMessages} Messages`) : RedText(`No messages..`)}\`\`\``)
                


                mj.deferUpdate()
                mj.message.edit({ embeds: [embed]})
        }
    }else if(value = "economy_profile_invites"){
        mj.message.edit({embeds:[embed_select]})
        mj.deferUpdate()
    }
});

collector.on('end', collected => {
    m.edit({content:`**Menu has __*\`expired\`*__ **`,components:[]})
});
    }
}