const { EmbedBuilder } = require("discord.js")

module.exports = async (Rover, Guild) => {
       const embed = new EmbedBuilder()
       .setAuthor({ name: `Guild Left - Bot Got Removed From Server`, iconURL: Guild.iconURL() })
       .setThumbnail(Guild.iconURL())
       .setColor("Red")
       .setDescription(`I just got removed from guild and here is the guild info:\n> **Guild Name:** \`${Guild.name}\`\n> **Guild Owner:** ${Rover.users.cache.get(Guild.ownerId)} (${Guild.ownerId})\n> **Guild Members:** ${Guild.members.cache.size}\n> **GuildId:** ${Guild.id}\n\n**Owner Information**\n> **In Support Server?** - \`${Rover.guilds.cache.get("1078727158589038634").members.cache.get(Guild.ownerId) ? `True` : `False`}\`\n> **Premium User?** - \`False\``)

       Rover.channels.cache.get("1108817271255744573").send({ embeds: [embed] })
}