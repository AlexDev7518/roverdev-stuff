const { EmbedBuilder } = require("discord.js")
const { EmbedColor } = require("../../../Configuration/EmbedConfig")
const Racks = require("../../../Databases/Schema/Racks")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {

         let data = await Racks.findOne({ Author: message.author.id })

         if (!data) {
                let data1 = await Racks.create({
                         Author: message.author.id,
                         TotalRacks: [],
                         DeletedRacks: [],
                         UsedRacks: [],
                }) 
                data1.save()

                data = await Racks.findOne({ Author: message.author.id })
         }

         const embed = new EmbedBuilder()
            .setAuthor({ name: `Roverdev Community | ${Roverdev.user.username}`, iconURL: Roverdev.user.displayAvatarURL() })
            .setColor(EmbedColor)
            .setDescription(`\n> Total Racks: [\`${data.TotalRacks.length}/10\`]\n> Deleted Racks: [\`${data.DeletedRacks.length}\`]\n> Used Racks: [\`${data.UsedRacks.length}\`]\n\n> Extra Storage: [\`${data.ExtraStorage}\`]\n> Extra Ram: [\`${data.ExtraRam}\`]`)

            message.channel.send({ embeds: [embed] })

        
   }
}