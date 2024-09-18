const { EmbedBuilder, WebhookClient } = require("discord.js")

module.exports = async Roverdev => {
  const Topgg = require("@top-gg/sdk")
  const express = require("express")

  const app = express()

  const webhook = new Topgg.Webhook("Roverdev1234")

  app.post("/dblwebhook", webhook.listener(async vote => {
         let value = vote.user

         const user = await Roverdev.users.fetch(value) ? await Roverdev.users.fetch(value) : null

         const web = new WebhookClient({ url: "https://discord.com/api/webhooks/1122233739204886620/X9LtbFV03F_lEDDpBV5bIVmcI9F1jqrlsNhTJyyyW6qbIdc4xtb0yTJ-Jc1GiN3ETw2u" })

         web.send({ username: `Roverdev - Vote Logger`, avatarURL: Roverdev.guilds.cache.get("1081700920993259550").iconURL(), 
         embeds: [
          new EmbedBuilder()
            .setAuthor({ name: `${Roverdev.guilds.cache.get("1081700920993259550").name} - Top.gg Votes`, iconURL: Roverdev.guilds.cache.get("1081700920993259550").iconURL() })
            .setThumbnail(Roverdev.guilds.cache.get("1081700920993259550").iconURL())
            .setColor("Green")
            .setDescription(`Hello (<@${value}> | \`${user?.tag ? user?.tag : `${user}#0000`}\`) Thanks For Voting!\n> Voted For: ${Roverdev.guilds.cache.get("1081700920993259550").name} on [**Top.gg**](https://top.gg/servers/846548733914906664/vote)\n> You May vote again in 12 hours!`)
            .setFooter({text: `${Roverdev.guilds.cache.get("1081700920993259550").name} - Top.gg Logs`,iconURL: Roverdev.user.displayAvatarURL()})
    ],
    content: `<@${value}> Thanks For Voting for ${Roverdev.guilds.cache.get("1081700920993259550").name} on Top.gg! <a:pandalove:1122233619675623505>`
   })

  }))

  app.listen(2023)
}