const { EmbedBuilder } = require("discord.js")
const CoinBalance = require("../../database/schemas/RoverCoins/Balance")
const CoolDowns = require("../../database/schemas/RoverCoins/CoolDowns")
const ms = require("ms")

module.exports = {
    name: "daily",
    category: "RoverCoins",
    cooldown: 2,
    Description: "Daily, You can get coins from using this command on a daily basic's!",
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

        if (CoolDown?.DailyCMDCooldown !== null) {
            const embed = new EmbedBuilder()
                .setAuthor({ name: `Economy System - Roverdev`, iconURL: Roverdev.user.displayAvatarURL() })
                .setColor("Red")
                .setTitle(`You are currently on cooldown!`)
                .setDescription(`You may run the command again in, <t:${Math.floor(CoolDown.DailyCMDCooldown / 1000)}:F>`)
                .setFooter({ text: `Roverdev Eco System`, iconURL: message.guild.iconURL() })

            return message.reply({ embeds: [embed] })
        }

        let Random = [
            "Elon Musk saw you coded a nice bot! Here are: {coins} from him!",
            "j0ni said you where good at being cringe and gave you {coins}!",
            "Alex was chatting with you and decided to be nice! Here are {coins} for you!",
            "Zer0 🥀 Said you where good at helping him, and gave you {coins}",
            "PlantedPurpose hates everyone but lucky you got {coins} anyways!",
            "alex9252 said you helped him good with his C++ and he gave you {coins} Coins!",
            "Stryker was soo nice so he decided to give you {coins} for being u!",
            "Elitex said you where ok, and decided to give you {coins}!",
            "Chauvin said you where nice to everyone, and decided to give you this: {coins}",
            "audi said you where good at helping him skid and gave you {coins}!",
        ]

        let RandomColor = [
            "Red",
            "Green",
            "Aqua",
            "Blue",
            "Green",
            "Yellow"
        ]

        let RandomNumber = Math.floor(Math.random() * (1500 - 50) + 1)

        data.EcoCoins = Number(Number(data.EcoCoins) + Number(RandomNumber))
        data.TotalCoins = Number(Number(data.TotalCoins) + Number(RandomNumber))

        await data.save()


        CoolDown.DailyCMDCooldown = ms("24h") + Date.now()
        await CoolDown.save()


        const embed = new EmbedBuilder()
            .setAuthor({ name: `Economy System - Roverdev`, iconURL: Roverdev.user.displayAvatarURL() })
            .setColor(RandomColor[Math.floor(Math.random() * RandomColor.length)])
            .setTitle(`Claimed Daily Coins!`)
            .setDescription(Random[Math.floor(Math.random() * Random.length)].replace("{coins}", RandomNumber))
            .setFooter({ text: `Roverdev Eco System`, iconURL: message.guild.iconURL() })

        message.reply({ embeds: [embed] })


    }
}