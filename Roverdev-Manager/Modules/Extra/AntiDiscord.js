async function AntiDiscord(message) {
    let ArrayOfDiscordInvites = [
           "discord.gg",
           "discord.com/invite",
           "discord.com",
           "dsc.gg",
           "discord.me",
           "invite.gg"
    ]

    if (message.channel.id == "1040974633077317662") return;
    if (message.content.includes('discord.gg/roverdev')) return

    if (ArrayOfDiscordInvites.includes(message.content)) {
           message.delete()
           return message.channel.send({ content: `${message.author} you are not alowed to send discord invites!` }).then((msg) => {
                 setTimeout(() => {
                  msg.delete()
                 }, 1900);
           })
    }
}

module.exports = {
  AntiDiscord
}