const { EmbedBuilder } = require("discord.js")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
    const embed2 = new EmbedBuilder()
    .setTitle(`Roverdev Community - Booster Perks`)
    .setImage("https://i.imgur.com/SQMk8SM.png")
    .setThumbnail("https://cdn.discordapp.com/emojis/892308380058800128.png")
    .setColor("#ff009e")
  .setDescription(
`
Booster Perks: 1 Boost you get:
> <a:Arrow:1020753364138594444> 1 Extra Discord Bot
> <a:Arrow:1020753364138594444> Premium Enabled
> <a:Arrow:1020753364138594444> 3100+ Coins Added to your Bank
> <a:Arrow:1020753364138594444> Another Rack For Your Extra Bot
> <a:Arrow:1020753364138594444> Thanks Message in <#935190175510835290>

***Perks will be working if you boost and stay boosting! (AUTOMATED SYSTEM)***
> if you unboost you loose:
> - <a:Arrow:1020753364138594444> 1 extra bot
> - <a:Arrow:1020753364138594444> Premium
> - <a:Arrow:1020753364138594444> 3100 Coins
> - <a:Arrow:1020753364138594444> Booster-Rack
`)

message.channel.send({ embeds: [embed2] }).then((msg) => msg.pin())

   }
}