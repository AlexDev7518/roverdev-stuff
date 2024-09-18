const { EmbedBuilder, Presence, Status, Events } = require("discord.js")
const Roles = require("../../Configuration/Staff-System/Roles");
const { TicketOptions } = require("../../Configuration/TicketSystem/TicketConfig");


module.exports = async Roverdev => {
    setInterval(async () => {
        const channel = Roverdev.channels.cache.get("1040957313734938665")
        const message = await channel.messages.fetch("1059612105294233720")
   
        const MainGuild = Roverdev.guilds.cache.get("1081700920993259550")

        let StaffTeam = MainGuild.members.cache.filter(m => !m.user.bot && m.roles.cache.has(Roles.MainServerRoles.StaffTeam) && m.presence !==null && m.presence.status != 'offline');
   
   
        const embed = new EmbedBuilder()
        .setAuthor({ name: `Ticket System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() })
        .setThumbnail(Roverdev.user.displayAvatarURL())
        .setImage("https://i.imgur.com/qx9vpAl.png")
        .setColor("#3dbeff")
        .setDescription(`Welcome to Roverdev's Ticket Support System!\n> Click Bellow to Open a Ticket\n\nCurrent Options:\n${TicketOptions.map(option => `> ${option.label}`).join("\n")}\n\n__***Ticket Rules:***__\n> Don't Spam Your Ticket\n> Don't Spam Ping a Staff\n> Don't Open a Ticket For Coding Support\n> Don't Open a Ticket For No Reason`)
        .addFields([
            {
                name: `<a:Online:1006056107367735327> [\`${StaffTeam.size}\`] ***Online Staff Members:***`,
                value: `>>> ${StaffTeam.size > 0 ? StaffTeam.map(m => `<@${m.id}>`).join(",") : "No Staff Online :cry:"}`
            }
        ])
   
        message.edit({ embeds: [embed] })   
    }, 50000);

}
