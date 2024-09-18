const { MessageFlags, Message, PermissionFlagsBits, ChannelType } = require("discord.js")
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js")

module.exports = async Rover => {
  Rover.on("interactionCreate", async interaction => {
    if (interaction.customId  == `Create-Ticket`) {

      const TicketSystem = require("../../../Models/TicketSystem")

         const data = await TicketSystem.findOne({ GuildID: interaction.guild.id })
          await interaction.reply({ content: `<a:loading:979745590143483945> | Creating Ticket Now!`, ephemeral: true })
          const channel = Rover.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == `UserId: ${interaction.user.id} Type: Tickets`)
          if (channel) return interaction.editReply({content: `<a:Wrong:964306723949137940>  | You allready Have a ticket open Channel: <#${channel.id}> `,ephemeral: true})
          
          interaction.guild.channels.create({
            name: `🎫᚛ticket-${interaction.user.username}`,
            permissionOverwrites: [{
                    id: interaction.user.id,
                    allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
                },                         {
                  id: interaction.guild.id,
                  deny: [PermissionFlagsBits.ViewChannel]
                },  
            ],
            type: ChannelType.GuildText,
            parent: data.TicketsCat,
            topic: `UserId: ${interaction.user.id} Type: Tickets`,
        }).then(async function(channel) {
          //Now Save Info To DataBase

          let Document = await TicketSystem.findOne({ GuildID: interaction.guild.id })
          Document.OpenTickets.push({ Channel: channel.id, openerid: interaction.user.id, TicketOpened: Date.now() })
         await Document.save().then(() => {
          console.log(`Saving Ticket In Database/Datacenter! Action in: ${interaction.guild.name} | ${interaction.guild.id} :)`.cyan)
          console.log(`✅ | Saved Ticket: ${channel.name} In the Database/Datacenter! Action By: ${interaction.user.id}`.green)
      })  
        //  let Claim = new MessageActionRow()
        //  .addComponents([
        //    new MessageButton()
        //    .setLabel(`Claim`)
        //    .setStyle(`SUCCESS`)
        //    .setCustomId(`ClaimButton`)
        //    .setEmoji(`964291713478844416`)
        //    .setDisabled(false),
        //    new MessageButton()
        //    .setLabel(`Pin-ticket`)
        //    .setStyle(`DANGER`)
        //    .setCustomId(`Pin-ticket`)
        //    .setEmoji(`📌`)
        //    .setDisabled(false),
        //  ])   
        //         const embed = new MessageEmbed()
        //         .setTitle(`Thanks for Requesting Support!`)
        //         .setDescription(`Thanks for contacting support, <@${interaction.user.id}> Here at **${interaction.guild.name}**.\n\n Our Staff Members will respond to you soon. Just remember do not **PING** Any staff members.`)
        //         .setTimestamp()
        //         .setColor("RED")
        //         const suppoter = await client.ticket.get(`${interaction.guild.id}.Supporter`)
        //         if (!suppoter) {
        //           embed.addField(`Supporter Not Setup`, `Supporter Role in the Server Is not Setup So the Buttons WIll Not Work Or the Commands!`)
        //         }
        //          channel.send({ content: `**New Ticket For: ${interaction.user}**\n> **Support Team Role: ${suppoter ? `<@&${suppoter}>`: `Supporter Role Not Found`}** `,
        //         embeds:[embed],
                
        //         components: [Claim]
        //         }).then(msg => {
        //         msg.pin();
        //     });
            interaction.editReply({ content: `<a:Yes:964306724821536768> | Your ticket is open <#${channel.id}>`, components: [], ephemeral: true });
        })
    }
    if (interaction.customId == "ClaimButton") {
      const suppoter = await client.ticket.get(`${interaction.guild.id}.Supporter`)
      if (!suppoter) return interaction.reply({content: `There is No Supporter Role Setup So This Button Will Not work!`, ephemeral: true})
      if(!interaction.member.roles.cache.has(suppoter)) return interaction.reply({content: `You Are not A Staff!`, ephemeral: true})
      await client.ticket.ensure(interaction.channel.id, {
        ClaimedUsers: []
       })
     const bots = await client.ticket.get(`${interaction.channel.id}.ClaimedUsers`)
     if (bots.includes(interaction.user.id)) return interaction.reply({content: `You Allready Claimed the Ticket!`, ephemeral: true})
      await client.ticket.ensure(interaction.channel.id, {ClaimedUsers: []})
      await client.ticket.push(`${interaction.channel.id}.ClaimedUsers`, interaction.user.id)
      interaction.reply({
        embeds: [
          new MessageEmbed()
          .setAuthor(`Ticket Claimed`,`https://i.imgur.com/eeHh5y7.gif`)
          .setDescription(`
         Ticket Claimed by: <@${interaction.user.id}>
          `)
          .setColor("GREEN")
        ]
      })
      interaction.channel.permissionOverwrites.edit(interaction.user, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true
    });
    }
    if (interaction.customId == "Pin-ticket") {
      const suppoter = await client.ticket.get(`${interaction.guild.id}.Supporter`)
      if (!suppoter) return interaction.reply({content: `There is No Supporter Role Setup So This Button Will Not work!`, ephemeral: true})
      if(!interaction.member.roles.cache.has(suppoter)) return interaction.reply({content: `You Are not A Staff!`, ephemeral: true})
      let Claim = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Claim`)
        .setStyle(`SUCCESS`)
        .setCustomId(`ClaimButton`)
        .setEmoji(`964291713478844416`)
        .setDisabled(true),
        new MessageButton()
        .setLabel(`UnPin-ticket`)
        .setStyle(`DANGER`)
        .setCustomId(`UnPin-ticket`)
        .setEmoji(`📌`)
        .setDisabled(false),
        new MessageButton()
        .setLabel(`Pin-ticket`)
        .setStyle(`DANGER`)
        .setCustomId(`Pin-ticket`)
        .setEmoji(`📌`)
        .setDisabled(true),
      ])
      interaction.message.edit({components: [Claim]})
      interaction.reply({
        embeds: [
          new MessageEmbed()
          .setColor("RED")
          .setTitle(`Pinned Ticket By: ${interaction.user.username}`)
        ]
      })  
    }
    if (interaction.customId == "UnPin-ticket") {
      let Claim = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Claim`)
        .setStyle(`SUCCESS`)
        .setCustomId(`ClaimButton`)
        .setEmoji(`964291713478844416`)
        .setDisabled(false),
        new MessageButton()
        .setLabel(`Pin-ticket`)
        .setStyle(`DANGER`)
        .setCustomId(`Pin-ticket`)
        .setEmoji(`📌`)
        .setDisabled(false),
      ])   
      interaction.message.edit({components: [Claim]})
      interaction.reply({
        embeds: [
          new MessageEmbed()
          .setColor("GREEN")
          .setTitle(`Unpin Ticket By: ${interaction.user.username}`)
        ]
      })  
        
    }
}              
)
}
      