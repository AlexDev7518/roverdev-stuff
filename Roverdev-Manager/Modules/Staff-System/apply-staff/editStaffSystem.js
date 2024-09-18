const { EmbedBuilder, Presence, Status, Events, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { EmbedColor } = require("../../../Configuration/EmbedConfig");
const moment = require("moment");
const ms = require('ms');

module.exports = async Roverdev => {
    setInterval(async () => {

        let messageid = (await Roverdev.guilds.cache.get("1081700920993259550").channels.cache.find(m => m.name.includes("apply-area")).messages.fetch({limit: 10}))?.last()

        const channel = Roverdev.guilds.cache.get("1081700920993259550").channels.cache.find(m => m.name.includes("apply-area"))
        const message = await channel.messages.fetch(messageid.id)
   
        const MainGuild = Roverdev.guilds.cache.get("1081700920993259550")


        const ApplyStaffOpen = Roverdev.StaffSystem.get(channel.id, "ApplyStaff.TimeToOpen")
        const ApplyPartnerOpen = Roverdev.StaffSystem.get(channel.id,"ApplyPartner.TimeToOpen")


        var today = new Date(); 
        var time = today;


     
        const embed = new EmbedBuilder()
        .setAuthor({ name: `Apply Partner & Staff - Roverdev Community`, iconURL: "https://cdn.discordapp.com/emojis/1075890682872483960.webp?size=96&quality=lossless" })
        .setThumbnail("https://cdn.discordapp.com/emojis/1075890682872483960.png")
        .setColor(EmbedColor)
        .setDescription(`\n***Apply-Staff***\n> You will get staff team when you join, you are required to join our staff server and read all staff rules otherwise\n> - you will be warned ( Reach 3 warnings and you are Kicked )\n> - if you where banned previously you are ineligible for applying.\n> - if you try to boss us around we will demote you.\n\n**Settings:**\n> - Status: \`✅ Open\`\n\n***Apply-Partner***\n> Apply For Partner, You can apply for Partner But if you ban us from your server your Partner will be removed.\n> - 100 Members (Reguired)\n> - No NSFW Servers\n> - No Nuking / Toxic Servers\n\n**Settings:**\n> - Status: \`❌ Closed\`\n> - Opening At: \`Soon (Long time)\``)   
        
        
        const row = new ActionRowBuilder()
        .addComponents(
              new ButtonBuilder()
              .setLabel("Apply Staff")
              .setStyle(ButtonStyle.Primary)
              .setCustomId("Apply-Staff")
              .setDisabled(false)
              .setEmoji("1075890682872483960"),
              new ButtonBuilder()
              .setLabel("Apply Partner")
              .setStyle(ButtonStyle.Danger)
              .setCustomId("Apply-Partner")
              .setDisabled(true)
              .setEmoji("961996812305182761")

        )
   
        message.edit({ embeds: [embed], components: [row] })   
    }, 50000);

}
