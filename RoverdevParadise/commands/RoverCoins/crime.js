const { EmbedBuilder } = require("discord.js")
const CoinBalance = require("../../database/schemas/RoverCoins/Balance")
const CoolDowns = require("../../database/schemas/RoverCoins/CoolDowns")
const ms = require("ms")

module.exports = {
    name: "crime",
    category: "RoverCoins",
    cooldown: 2,
    Description: "crime, go have some fun breaking the laws",
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

        if (CoolDown?.Crime !== null) {
            const embed = new EmbedBuilder()
                .setAuthor({ name: `Economy System - Roverdev`, iconURL: Roverdev.user.displayAvatarURL() })
                .setColor("Red")
                .setTitle(`You are currently on cooldown!`)
                .setDescription(`You may run the command again in, <t:${Math.floor(CoolDown.Crime / 1000)}:F>`)
                .setFooter({ text: `Roverdev Eco System`, iconURL: message.guild.iconURL() })

            return message.reply({ embeds: [embed] })
        }

        let Random = [
            "You robbed the store and got {coins} Coins",
            "You robbed Chauvin's House and got {coins} Coins",
            "You got into discord datacenter and got {coins} Coins!",

            "You Hacked Youtube.com and got {coins} Coins from threating them.",
            "You where bored and decided to rob your own wallet and got {coins} Coins"
        ]

        let RandomColor = [
            "Red",
            "Green",
            "Aqua",
            "Blue",
            "Green",
            "Yellow"
        ]


        let RandomNumber = Math.floor(Math.random() * (950 - 50) + 1)

        let RandomSentance = String(Random[Math.floor(Math.random() * Random.length)].replace("{coins}", RandomNumber))

        if (RandomSentance.includes("You where bored and decided to rob your own wallet and got")) {
             RandomNumber = Math.floor(Math.random() * (5 - 1) + 1)
             RandomSentance = Random[Math.floor(Math.random() * Random.length)].replace("{coins}", RandomNumber)
        }

        data.EcoCoins = Number(Number(data.EcoCoins) + Number(RandomNumber))
        data.TotalCoins = Number(Number(data.TotalCoins) + Number(RandomNumber))

        await data.save()

        if (!CoolDown) {
            await CoolDowns.create({
                Author: message.author.id
            })
            CoolDown = await CoolDowns.findOne({ Author: message.author.id })
        }

        CoolDown.Crime = ms("5h") + Date.now()
        await CoolDown.save()


        const embed = new EmbedBuilder()
            .setAuthor({ name: `Economy System - Roverdev`, iconURL: Roverdev.user.displayAvatarURL() })
            .setColor(RandomColor[Math.floor(Math.random() * RandomColor.length)])
            .setTitle(`${RandomSentance.includes("You where bored and decided to rob your own wallet and got") ? "You decided to rob and got unlucky!" : "You decided to rob a place and got lucky!"}`)
            .setDescription(RandomSentance)
            .setFooter({ text: `Roverdev Eco System`, iconURL: message.guild.iconURL() })

        message.reply({ embeds: [embed] })


    }
}