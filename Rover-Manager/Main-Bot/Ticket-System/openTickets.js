const { ChannelType, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ClientUser } = require("discord.js")
const { TicketCategory } = require("../Overflow")

module.exports = async client => {
      client.on("interactionCreate", async interaction => {
        if (interaction.customId == "Support-Ticket") {

          if (client.Blacklist.get("1081700920993259550", "BlacklisedUsers").includes(interaction.user.id)) {
            return interaction.reply({
             embeds: [
                 new EmbedBuilder()
                 .setAuthor({ name: `You are Blacklised From Using Our System!`, iconURL: client.user.displayAvatarURL() })
                 .setColor("Red")
             ], ephemeral: true
         })
 }
           
           const Ticket = client.settings.get(interaction.user.id)
           if (!Ticket) {
                 client.settings.ensure(interaction.user.id, {
                          OpenTicket: ""
                 })
           }
          if (Ticket) { 
                    const Channel = client.settings.get(interaction.user.id, "OpenTicket")
                    if (Channel) {
                      return interaction.reply({content: `You Already have a ticket Open: <#${Channel}>`, ephemeral: true})
                    }
          }
           await interaction.reply({embeds: [
                        new EmbedBuilder()
                        .setAuthor({ name: `Creating Your Support Ticket..`, iconURL: "https://i.imgur.com/RhR8Qqn.gif" })
                        .setColor("#3dbeff")
            ], ephemeral: true
          })
            interaction.guild.channels.create({
                name: `🔖╎ticket-${interaction.user.username}`,
                type:  ChannelType.GuildText,
                topic: `User: ${interaction.user.username} | ${interaction.user.id} | Ticket Type: Support | Ticket Number: ${client.settings.get(interaction.guild.id, "TicketSystem.TotalTickets") ? client.settings.get(interaction.guild.id, "TicketSystem.TotalTickets") : 0 }` 
              }).then(async function(channel) {

                setTimeout(() => {
                  client.settings.ensure(channel.id, {
                    ticketEmoji: "🔖"
                      })
                }, 500);

                TicketCategory(channel, client)

                setTimeout(() => {
                  channel.permissionOverwrites.set([
                    { id: interaction.user.id, allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
                    },{ id: "1005978927421980702",  allow: [PermissionFlagsBits.ViewChannel], deny: [PermissionFlagsBits.SendMessages]
                    },{ id: interaction.guild.roles.everyone, deny: [PermissionFlagsBits.ViewChannel]}
                  ]);
              }, 500);
                

                interaction.editReply({embeds: [
                  new EmbedBuilder()
                  .setAuthor({ name: `Create Your Support Ticket!`, iconURL: "https://i.imgur.com/VmDxlgG.gif" })
                  .setDescription(`Your Ticket: <#${channel.id}>`)
                  .setColor("#3dbeff")
              ], ephemeral: true
            })


                const message = client.settings.get(channel.guild.id, "TicketSystem.TotalTickets") || 0
                const messages = message + 1
               client.settings.set(channel.guild.id,  messages, "TicketSystem.TotalTickets")


               /**
                * @SET_THE_DATABASE_FOR_TICKET
                */
                client.settings.ensure(channel.id, {
                       ClaimedUsers: []
                })
                client.settings.set(channel.id, interaction.user.id, "ticketOpenerId")
                client.settings.set(channel.id, interaction.user.username, "ticketOpenerUsername")
                client.settings.set(channel.id, messages, "TicketNumber")
                client.settings.set(interaction.user.id, channel.id, "OpenTicket")
                
                /**
                 * @NOW_BUILD_EMBEDS
                 */
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Ticket System | ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setDescription(`__***Hello <@${interaction.user.id}>! Thanks for opening a \`Support TIcket\`***__\n> Please Tell us your Question as Good as you can So we Can Understand and our staff team will get to you as soon as possible!`)
                .setColor("#3dbeff")


                const row = new ActionRowBuilder()
                 .addComponents(
                       new ButtonBuilder()
                       .setLabel(`Claim The Ticket`)
                       .setEmoji(`961998589943488603`)
                       .setCustomId(`Claim-The-Ticket`)
                       .setStyle(ButtonStyle.Success),
                 )
                 channel.send({embeds: [embed], components: [row], content: `<@${interaction.user.id}>\n> <a:checkmark1:1005930716795777137> Supporter Role: <@&1005978927421980702> `}).then((msg) => {
                              client.settings.set(channel.id, msg.id, "TicketMessage")
                 })
              }).catch((e) => {
                       
              })
        }
        if (interaction.customId == "Claim-Ticket") {
          interaction.reply({content: `Claim Ticket Option is Not Done.`, ephemeral: true})
     }
     if (interaction.customId == "Apply-Ticket") {
      interaction.reply({content: `Apply Ticket Option is Not Done.`, ephemeral: true})
 }
      })
}