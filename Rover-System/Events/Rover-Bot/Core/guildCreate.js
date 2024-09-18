const { EmbedBuilder } = require("discord.js")

module.exports = async (Rover, Guild) => {

       const accAge = Math.abs(Date.now() - Rover.users.cache.get(Guild.ownerId).createdAt);
        const accDays = Math.ceil(accAge / (1000 * 60 * 60 * 24));
        console.log(`ACC: ${accDays}`)

        const GuildAge = Math.abs(Date.now() - Guild.createdAt);
        const  GuildDays = Math.ceil(GuildAge / (1000 * 60 * 60 * 24));
        console.log(`Guild: ${GuildDays}`)
       
       const embed = new EmbedBuilder()
       .setAuthor({ name: `Guild Joined - Bot Got Added To Server`, iconURL: Guild.iconURL() })
       .setThumbnail(Guild.iconURL())
       .setColor("Green")
       .setDescription(`I just joined a guild and here is the guild info:\n> **Guild Name:** \`${Guild.name}\`\n> **Guild Owner:** ${Rover.users.cache.get(Guild.ownerId)} (${Guild.ownerId})\n> **Guild Members:** ${Guild.members.cache.size}\n> **GuildId:** ${Guild.id}\n\n**Owner Information**\n> **In Support Server?** - \`${Rover.guilds.cache.get("1078727158589038634").members.cache.get(Guild.ownerId) ? `True` : `False`}\`\n> **Premium User?** - \`False\``)

       Rover.channels.cache.get("1108817271255744573").send({ embeds: [embed] })
}