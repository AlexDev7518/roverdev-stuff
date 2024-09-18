const { EmbedBuilder, DiscordAPIError } = require("discord.js")
const CoinBalance = require("../../database/schemas/RoverCoins/Balance")
const CoolDowns = require("../../database/schemas/RoverCoins/CoolDowns")
const ms = require("ms")

module.exports = {
    name: "balance",
    category: "RoverCoins",
    cooldown: 2,
    Description: "Check your balance of your coins.",
    RunCommand: async (Roverdev, message, args, executor) => {
        let data = await CoinBalance.findOne({ Author: message.author.id })

        if (!data) {
            await CoinBalance.create({
                Author: message.author.id
            })
            data = await CoinBalance.findOne({ Author: message.author.id })
        }
        let embed = new EmbedBuilder()
        .setAuthor({ name: `Economy System - Roverdev Paradise`, iconURL: Roverdev.user.displayAvatarURL() })
            .setColor("Blue")
            .setTitle(`__**Current Rover Coins Balance of ${message.author.username}**__`)
            .setDescription(`
> **Default System Coins:** [\`${data.DefaultCoins}\`]
> **Total Coins:** [\`${data.TotalCoins}\`]
> - **Used Coins:** [\`${data.UsedTotal}\`]

> **Economy Coins:** [\`${data.EcoCoins}\`]
> - **Used Economy Coins:** [\`${data.UsedEcoCoins}\`]
> **Invite Coins:** [\`${data.InviteCoins}\`]
> - **Used Invite Coins:** [\`${data.UsedInviteCoins}\`]
> **Server Activity Coins:** [\`${data.ActivityCoins}\`]
> - **Used Activity Coins:** [\`${data.UsedActivityCoins}\`]

**Note:** When we say the word "Used" it means how much you spent in that coins.            
            `)
            

        message.reply({ embeds: [embed] })
    }
}