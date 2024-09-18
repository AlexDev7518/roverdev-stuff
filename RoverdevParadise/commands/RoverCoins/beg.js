const { EmbedBuilder } = require("discord.js")
const CoinBalance = require("../../database/schemas/RoverCoins/Balance")
const CoolDowns = require("../../database/schemas/RoverCoins/CoolDowns")
const ms = require("ms")

module.exports = {
    name: "beg",
    category: "RoverCoins",
    cooldown: 2,
    Description: "beg, Uh? you can ig claim from begging to the bot.!",
    RunCommand: async (Roverdev, message, args, executor) => {
        let data = await CoinBalance.findOne({ Author: message.author.id })

        if (!data) {
            await CoinBalance.create({
                Author: message.author.id
            })
            data = await CoinBalance.findOne({ Author: message.author.id })
        }

        let CoolDown = await CoolDowns.findOne({ Author: message.author.id })

        if (!CoolDown) {
            await CoolDowns.create({
                Author: message.author.id
            })
            CoolDown = await CoolDowns.findOne({ Author: message.author.id })
        }

        if (CoolDown?.Beg !== null) {
            const embed = new EmbedBuilder()
                .setAuthor({ name: `Economy System - Roverdev`, iconURL: Roverdev.user.displayAvatarURL() })
                .setColor("Red")
                .setTitle(`You are currently on cooldown!`)
                .setDescription(`You may run the command again in, <t:${Math.floor(CoolDown.Beg / 1000)}:F>`)
                .setFooter({ text: `Roverdev Eco System`, iconURL: message.guild.iconURL() })

            return message.reply({ embeds: [embed] })
        }

        let Random = [
             "Ugh! Fine you beggar, here you go: {coins}",
             "Bruh. You really begged me for this? Alright, here you go: {coins}",
             "Omg... are you fr? Do you really wanna beg me for this? Alright, here: {coins}",
             "oh really? Alright fine you beg me soo much so here you go: {coins}",
             "Ayo? So how much times are you gonna beg me for this but alright here: {coins}"
        ]

        let RandomColor = [
            "Red",
            "Green",
            "Aqua",
            "Blue",
            "Green",
            "Yellow"
        ]

        let RandomNumber = Math.floor(Math.random() * (600 - 100) + 1)

        data.EcoCoins = Number(Number(data.EcoCoins) + Number(RandomNumber))
        data.TotalCoins = Number(Number(data.TotalCoins) + Number(RandomNumber))

        await data.save()

        CoolDown.Beg = ms("48mins") + Date.now()
        await CoolDown.save()


        const embed = new EmbedBuilder()
            .setAuthor({ name: `Economy System - Roverdev Paradise`, iconURL: Roverdev.user.displayAvatarURL() })
            .setColor(RandomColor[Math.floor(Math.random() * RandomColor.length)])
            .setTitle(`Ugh fine. you get your Beggar Coins!`)
            .setDescription(Random[Math.floor(Math.random() * Random.length)].replace("{coins}", RandomNumber))
            .setFooter({ text: `Economy System - Roverdev Paradise`, iconURL: message.guild.iconURL() })

        message.reply({ embeds: [embed] })


    }
}