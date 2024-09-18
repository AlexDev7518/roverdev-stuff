const { EmbedBuilder } = require("discord.js")
const { EmbedColor } = require("../../../Configuration/EmbedConfig")
const InviteTracker = require("../../../Databases/Schema/InviteTracker")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {

        let invitesDb = await InviteTracker.findOne({ Author: message.author.id })


         const embed = new EmbedBuilder()
         .setAuthor({ name: `${Roverdev.user.username} | Invite System`, iconURL: Roverdev.user.displayAvatarURL() })
         .setDescription(invitesDb === null ? `\`\`\`yml\nServer-Joins: 0 # People who join\nServer-Leaves: 0 # People who leave\nServer-Fakes: 0 #People who join and leave and join\`\`\`` : `\`\`\`yml\nServer-Joins: ${invitesDb.Joins} # People who join\nServer-Leaves: ${invitesDb.Leaves.length} # People who leave\nServer-Fakes: ${invitesDb.Fakes} #People who join and leave and join\`\`\``)
         .setColor(EmbedColor)

         let array = []

         const invites = await message.guild.invites.fetch()

         invites.forEach(m => {
                if (m.inviterId == message.author.id) {
                        array.push({
                                Uses: m.uses,
                                Code: m.code,
                                TimeLeft: m.expiresTimestamp,
                                Created: m.createdTimestamp
                        })
                }
         })

         

         embed.addFields({
              name: `Server Invites (Will only show your invites)`,
              value: array.length > 0 ? array.map(m => {
                  return `> Code: \`${m.Code}\`\n> Uses: \`${m.Uses}\`\n> Time Left: ${m.TimeLeft == null ? `\`Permanent Invite\`` : `<t:${Math.floor(m.TimeLeft/1000)}:R>`}\n> Created at: <t:${Math.floor(m.Created/1000)}:R>`
            }).join("\n\n") : "> You have no invites"
         })

         message.channel.send({
                embeds: [embed]
         })
   }
}