const { EmbedBuilder, Presence, Status, Events, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const ShopBots = require("../../../Configuration/ShopConfig/ShopBots");
const Roles = require("../../../Configuration/Staff-System/Roles");


module.exports = async Roverdev => {
    setInterval(async () => {
        const channel = Roverdev.channels.cache.get("1040969480932700230")
        const message = await channel.messages.fetch("1070190393804730398")
   
        const MainGuild = Roverdev.guilds.cache.get("1081700920993259550")

        let StaffTeam = MainGuild.members.cache.filter(m => !m.user.bot && m.roles.cache.has(Roles.MainServerRoles.StaffTeam) && m.presence !==null && m.presence.status != 'offline');
   

        const row = new ActionRowBuilder()
        .addComponents(
              new StringSelectMenuBuilder()
                 .setCustomId("Shop-Bots")
                 .setPlaceholder("Select To Create a Bot")
                 .setOptions(
                       ShopBots.Bots.map(m => {
                              return {
                                     label: m.label,
                                     value: m.value,
                                     description: m.description,
                                     emoji: m.emoji
                              }
                       })
                 )
                
        )
   
       
        const embed = new EmbedBuilder()
        .setAuthor({ name: `Bot Shop Services | Free & Best Bots`, iconURL: Roverdev.user.displayAvatarURL() })
        .setThumbnail("https://cdn.discordapp.com/emojis/1015238375189516288.png")
        .setColor("#3dbeff")
        .setDescription(`Welcome to Roverdev ***FREE*** Bot Shop <:rocket:1015238375189516288>\n\n***Features Of Shop Bots:***\n> Fully Customizable\n> Low Ping & Fast Bot\n> Lots of Features\n> Premium Features\n> Embed Customization\n> Status Customization\n> Daily Reboot (Keep The Bot Running)\n> Advanced Systems\n\n**Rules & TOS**\n> You Must Agree to Our ***Rules & TOS*** when creating your bot\n\n> <:rocket:1015238375189516288> **Welcome to Roverdev Free & Fast Discord Bot Shop**`)
        .addFields([
            {
                name: `<a:Online:1006056107367735327> [\`${StaffTeam.size}\`] ***Online Staff Members:***`,
                value: `>>> ${StaffTeam.size > 0 ? StaffTeam.map(m => `<@${m.id}>`).join(",") : "No Staff Online :cry:"}`
            }
        ])
   
        message.edit({ embeds: [embed], components: [row] })   
    }, 50000);

}
