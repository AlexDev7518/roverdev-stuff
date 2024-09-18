const { EmbedBuilder } = require("discord.js")
const { EmbedColor } = require("../../../Configuration/EmbedConfig")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
          const embed = new EmbedBuilder()
               .setAuthor({ name: `Bot Commands | ${Roverdev.user.username}`, iconURL: message.guild.iconURL() })
               .setColor(EmbedColor)
               .setImage("https://i.imgur.com/IA2YSC6.gif")
               .setThumbnail(message.guild.iconURL())
               .setDescription(`***<a:Bot:1015746519212765195> Prefix's of all bots <a:Bot:1015746519212765195> ***\n> <@1051175913016004669> \`rd!\` | \`rd!help\`\n> <@1061463041423720528> \`ra!\` | \`ra!help\`\n> <@1061463922617614407> \`rs!\` | \`rs!help\`\n> <@1041974394622324818> \`rh!\` | \`rh!help\`\n> <@1015228149799321692> \`c!\` | \`c!help\`\n> <@302050872383242240> \`/\` | \`/help | /bump\`\n> <@1064041467443683458> \`lm!\` | \`lm!help\`\n> <@1049224344888414228> \`m!\` | \`m!help\`\n> <@911833727301189684> \`/\` | \`/help\`\n> <@1045681655429480458> \`v!\` | \`v!help\`\n\n*** <:Link:1018006848399482881> Usefull Links: <:Link:1018006848399482881>***\n> Website: https://roverdev.xyz\n> Dashboard: https://dashboard.roverdev.xyz\n> RoverHost: https://roverhost.xyz\n\n**Server Usefull Commands:**\n> \`rd!invites\` - Check how many invites you have\n> \`rd!bots\` - Check how many bots you have\n> ~~\`rd!servers\` - Check how many VmServers~~\n> \`rd!overview\` - Check your profile\n> \`/bump\` Bump our server!\n\n**RoverCoins - Earn Coins Commands:**\n> \`rd!daily\` - Get your daily coins\n> \`rd!hourly\` - Get your hourly coins\n> \`rd!balance\` - see how many coins you have`)

        let channel = message.guild.channels.cache.find(m => m.name.includes("commands"))

        if (!channel) channel = message.guild.channels.cache.get("1040954527270043718")

        channel.messages.fetch("1057023169111789629").then((msg) => {
             return msg.edit({
                    embeds: [embed]
             }).catch((error) => {
                  channel.send({
                        embeds: [embed]
                  }).then((msg) => {
                       msg.pin()
                  })
             })
        }).catch((error) => {
          channel.send({
                embeds: [embed]
          }).then((msg) => {
               msg.pin()
          })
     })
   } 
}