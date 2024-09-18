const { EmbedBuilder } = require("discord.js")
const { EmbedColor } = require("../../../Configuration/EmbedConfig")
const TotalBots = require("../../../Databases/Schema/Shop/TotalBots")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {

          let user = Roverdev.users.cache.get(args[0]) || message.mentions.members.first()
    
          if (!user) {
            let bots = await TotalBots.findOne({ Author: message.author.id })

            if (!bots) {
                  await TotalBots.create({ Author: message.author.id })
                  bots = await TotalBots.findOne({ Author: message.author.id })
            }

            const embed = new EmbedBuilder()
            .setAuthor({ name: `Bot Shop System | ${message.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
            .setColor(EmbedColor)
            .setTitle(`This User has a total of \`${bots.TotalBots.length}\` Bots!`)
            .setDescription(`${bots.TotalBots.length > 0 ? `${bots.TotalBots.map(m => `> <@!${m}> - \`${Roverdev.users.cache.get(m)?.tag == undefined ?  `UnknownUser#000` : Roverdev.users.cache.get(m)?.tag}\``).join("\n")}` : `This User has no bots`}`)
    
            return message.reply({ embeds: [embed] })
           } else {
            let bots = await TotalBots.findOne({ Author: user.id })

            if (!bots) {
                  await TotalBots.create({ Author: user.id })
                  bots = await TotalBots.findOne({ Author: user.id })
            }

                 const embed = new EmbedBuilder()
                 .setAuthor({ name: `Bot Shop System | ${message.guild.name} `, iconURL: Roverdev.user.displayAvatarURL() })
                 .setColor(EmbedColor)
                 .setTitle(`This User has a total of \`${bots.TotalBots.length}\` Bots!`)
                 .setDescription(`${bots.TotalBots.length > 0 ? `${bots.TotalBots.map(m => `> <@!${m}> - \`${Roverdev.users.cache.get(m)?.tag == undefined ?  `UnknownUser#000` : Roverdev.users.cache.get(m)?.tag}\``).join("\n")}` : `This User has no bots`}`)
         
                 message.reply({ embeds: [embed] })

           }
   }
}