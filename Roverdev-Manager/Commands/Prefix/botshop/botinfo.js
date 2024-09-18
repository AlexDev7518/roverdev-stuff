const { EmbedBuilder } = require("discord.js")
const { EmbedColor } = require("../../../Configuration/EmbedConfig")
const BotConfig = require("../../../Databases/Schema/Shop/BotConfig")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
    let user = Roverdev.users.cache.get(args[0]) || message.mentions.members.first()
    
    if (!user) return message.reply({ content: `Please provide the bot!` })

    const Botinfo = await BotConfig.findOne({ Bot: user.id }) 

    if (!Botinfo) return message.reply({ content: `I Could not find ${user.id} in the Roverdev Bot shop System` })

    const embed = new EmbedBuilder()
    .setAuthor({ name: `Bot Shop System | ${message.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
    .setColor(EmbedColor)
    .setTitle(`Bot-Information about: \`${user.tag}\``)
    .setDescription(`***General Bot-information***\n> Bot-Version: \`1.0.0\`\n> Bot-Status: \`${Botinfo.BotStatus}\`\n> Bot Uptime: ${Botinfo.BotUptime == null ? `\`Offline\`` : `<t:${Math.floor(Botinfo.BotUptime/1000)}:R>`}\n> Bot Owner: <@!${Botinfo.BotOwner}>\n> Created at: <t:${Math.floor(Botinfo.CreatedAt/1000)}:R>\n> Premium Enabled: \`${Botinfo.Premium}\`\n> Bot Type: \`${Botinfo.BotType}\`\n\n***Hosting Information:***\n> Rack: \`${Botinfo.Rack}\`\n> Hosting Duration: ${Botinfo.HostingDuration == "Free-Bot" ? "\`Lifetime\`": `<t:${Math.floor(Botinfo.HostingDuration/1000)}:R>`}\n> Shop-Server: \`${Botinfo.ShopServer}\`\n\n> Bot Path:\n> - *\`${Botinfo.BotPath}\`*\n\n***Payment-Information***\n\`\`\`yml\nCoins Amount: ${Botinfo.CoinsAmount == "Free-Bot" ? "None (0)" : Botinfo.CoinsAmount}\nPayment Type: ${Botinfo.PaymentType}\nPayment Active: ${Botinfo.PaymentActive == "true" ? `✅ Payment Active` : Botinfo.PaymentActive == "Pending" ? `⏳ Pending Payment` : `❌ Payment Inactive`}\`\`\``)

        message.reply({ embeds: [embed] })
   }
}