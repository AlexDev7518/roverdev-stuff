const { EmbedBuilder } = require("discord.js")
const { EmbedColor } = require("../../../Configuration/EmbedConfig")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
          const embed = new EmbedBuilder()
               .setAuthor({ name: `Staff Commands | ${Roverdev.user.username}`, iconURL: message.guild.iconURL() })
               .setColor(EmbedColor)
               .setImage("https://i.imgur.com/IA2YSC6.gif")
               .setThumbnail(message.guild.iconURL())
               .setDescription(`***<a:Bot:1015746519212765195> Prefix's of all bots <a:Bot:1015746519212765195> ***\n> <@1051175913016004669> \`rd!\` | \`rd!help\`\n> <@1012362079543504966> \`r?\` | \`r?help\`\n> <@1015228149799321692> \`c!\` | \`c!help\`\n\n*** <:Link:1018006848399482881> Usefull Links: <:Link:1018006848399482881>***\n> Website: https://roverdev.xyz\n> Dashboard: https://dashboard.roverdev.xyz\n> RoverHost: https://roverhost.xyz\n\n**Server Usefull Commands:**\n> \`rd!invites\` - Check how many invites you have\n> \`rd!bots\` - Check how many bots you have\n> \`rd!servers\` - Check how many VmServers\n> \`rd!overview\` - Check your profile\n\n**Moderation Commands:**\n> \`c!ban @userid [reason]\` - Ban a user\n> \`c!warn @user [reason]\` - Warn a user\n> \`c!addrole @user <@&roleid>\` - Add a Role`)

        let channel = message.guild.channels.cache.find(m => m.name.includes("staff-console"))

        if (!channel) channel = message.guild.channels.cache.get("1040982412592693318")

        channel.messages.fetch("1057031019578015834").then((msg) => {
             return msg.edit({
                    embeds: [embed]
             }).catch((error) => {
                  channel.send({
                        embeds: [embed]
                  }).then((msg) => {
                       msg.pin()
                  })
             })
        })

     //    channel.send({
     //        embeds: [embed]
     //  }).then((msg) => {
     //       msg.pin()
     //  })
   } 
}