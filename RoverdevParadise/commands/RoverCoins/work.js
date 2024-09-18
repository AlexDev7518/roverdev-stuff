const { EmbedBuilder } = require("discord.js")
const CoinBalance = require("../../database/schemas/RoverCoins/Balance")
const CoolDowns = require("../../database/schemas/RoverCoins/CoolDowns")
const ms = require("ms")

module.exports = {
    name: "work",
    category: "RoverCoins",
    cooldown: 2,
    Description: "work at jobs.",
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

        if (CoolDown?.Work !== null) {
            const embed = new EmbedBuilder()
                .setAuthor({ name: `Economy System - Roverdev`, iconURL: Roverdev.user.displayAvatarURL() })
                .setColor("Red")
                .setTitle(`You already worked for 12h come back later!`)
                .setDescription(`You may run the command again in, <t:${Math.floor(CoolDown.Work / 1000)}:F>`)
                .setFooter({ text: `Roverdev Eco System`, iconURL: message.guild.iconURL() })

            return message.reply({ embeds: [embed] })
        }

         let arrayJobs = [
            "Walmart",
            "Cos-Co",
            "Kaufland",
            "Best Buy",
            "Winco",

            //dam, many germany stores :>
            "Netto",
            "Lidl",
            "Rossman",
            "Rewe",
            "Saturn",
            "Samsung",
            "Apple",
            "Gas Station",
            "Safeway",
            "Walgreens",
            "Dollar (1.25$) Tree",
            
            "J0ni's Cringe Ohio Store",
            "Audi's Skidding discord bots store",
            "Chauvin's Dedicated Store.",
         ]

         let Prices = {
            "Walmart": "510",
            "Cos-Co" : "410",
            "Kaufland": "600",
            "Best Buy": "210",
            "Winco": "100",

            "Netto": "110",
            "Lidl":"240",
            "Rossman":"170",
            "Rewe":"210",
            "Saturn":"420",
            "Samsung":"350",
            "Apple":"690",
            "Gas Station": "300",
            "Safeway": "350",
            "WalGreens": "690",
            "Dollar (1.25$) Tree": "200",
            
            "J0ni's Cringe Ohio Store": { m1: "350", m2: "You helped J0ni being cringe to a person and got {coins}" },
            "Audi's Skidding discord bots store": { m1: "350", m2: "You helped Audi Skid his codes for razen and got {coins}" },
            "Chauvin's Dedicated Store.": { m1: "350", m2: "You helped Chauvin with his server and got {coins}" },
         }

         let RandomColor = [
            "Red",
            "Green",
            "Aqua",
            "Blue",
            "Green",
            "Yellow"
        ]
        let uh = arrayJobs[Math.floor(Math.random() * arrayJobs.length)]
        let RandomNumber = Prices[uh]?.m1 ? Prices[uh]?.m1 : Prices[uh]

        data.EcoCoins = Number(Number(data.EcoCoins) + Number(RandomNumber))
        data.TotalCoins = Number(Number(data.TotalCoins) + Number(RandomNumber))

        await data.save()

        CoolDown.Work = ms("12h") + Date.now()
        await CoolDown.save()


         let Description = `${Prices[uh]?.m2 ? `${Prices[uh]?.m2.replace("{coins}", Prices[uh]?.m1)}` : `You worked at ${uh} and got ${Prices[uh]} coins!`}`

         
         const embed = new EmbedBuilder()
         .setAuthor({ name: `Economy System - Roverdev`, iconURL: Roverdev.user.displayAvatarURL() })
         .setColor(RandomColor[Math.floor(Math.random() * RandomColor.length)])
         .setTitle(`You worked for 12h and this is what you got!`)
         .setDescription(Description)
         .setFooter({ text: `Roverdev Eco System`, iconURL: message.guild.iconURL() })

    message.reply({ embeds: [embed] })
         
    }
}