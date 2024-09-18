const { Events, EmbedBuilder } = require("discord.js")
const { SelfRolesRole } = require("../../Configuration/Selfroles")

module.exports = async Roverdev => {
    Roverdev.on(Events.InteractionCreate, async interaction => {
          if (interaction.customId == "Self-Roles") {
                  const roles = interaction.values

                  const verifed = ["<a:VerifedBlack:1009505141520609331>", "<a:VerifedGold:1009505411688317049>", "<a:VerifedPurple:1009505593687560224>", "<a:VerifedPurple:1009505593687560224>", "<a:VerifedRed:1009505548762357852>", "<a:VerifedYellow:1009505635387318402>"]

                  await interaction.reply({ 
                        embeds: [
                               new EmbedBuilder()
                               .setAuthor({ name: `Now Adding / Removing Roles`, iconURL: "https://cdn.discordapp.com/emojis/847361062370148352.gif?size=96&quality=lossless" })
                               .setDescription(`${roles.map((m) => `${m}`).join(",")}`)
                               .setColor("Yellow")
                        ],
                        ephemeral: true
                  }) 

                  const embed = new EmbedBuilder()
                  .setAuthor({ name: `Successfully Added / Removed Some Roles`, iconURL: "https://cdn.discordapp.com/emojis/1044448625956241550.gif" })
                  .setColor("#3dbeff")

                  try {
                    roles.forEach(role => {

                        const VerifedSymbol = verifed[Math.floor(Math.random() * verifed.length)]

                        if (!interaction.member.roles.cache.has(SelfRolesRole[role])) {
                                   try {
                                       interaction.guild.members.cache.get(interaction.user.id).roles.add(SelfRolesRole[role]).catch((error) => {
                                         return embed.addFields({ name: `<:Failed:1034528004912730242> Failed To Add`, value: `> Failed To Add <@&${SelfRolesRole[role]}> To You!` })
                                       })
                                       embed.addFields({ name: `${VerifedSymbol} Successfully Added`, value: `> Successfully Added <@&${SelfRolesRole[role]}> To You!` })
                                   } catch(error) {
                                       embed.addFields({ name: `<:Failed:1034528004912730242> Failed To Add`, value: `> Failed To Add <@&${SelfRolesRole[role]}> To You!` })
                                   }
                        } else if (interaction.member.roles.cache.has(SelfRolesRole[role])) {
                           try {
                            interaction.guild.members.cache.get(interaction.user.id).roles.remove(SelfRolesRole[role])
                               embed.addFields({ name: `${VerifedSymbol}  Successfully Removed`, value: `> Successfully Removed <@&${SelfRolesRole[role]}> From You!` })
                           } catch(error) {
                               embed.addFields({ name: `<:Failed:1034528004912730242> Failed To Remove`, value: `> Failed To Remove <@&${SelfRolesRole[role]}> From You!` })
                           }
                        }
                 })

                 setTimeout(() => {
                    interaction.editReply({ embeds: [embed.setColor("Green")] })
                 }, 5000);
                  } catch (error) {
                      await interaction.editReply({ 
                            embeds: [
                                 new EmbedBuilder()
                                 .setAuthor({ name: `Failed to Add The Roles`, iconURL: "https://cdn.discordapp.com/emojis/1034528004912730242.webp?size=96&quality=lossless" })
                                 .setDescription(`Error: ${error}`)
                                 .setColor("Red")
                            ]
                       })
                  }
          }
    })
}