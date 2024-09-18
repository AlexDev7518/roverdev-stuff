const { EmbedBuilder, WebhookClient } = require("discord.js")

module.exports = async Roverdev => {
  const Topgg = require("@top-gg/sdk")
  const express = require("express")

  const app = express()

  const webhook = new Topgg.Webhook("Roverdev1234")

  app.post("/dblwebhook", webhook.listener(async vote => {
         let value = vote.user

         const user = await Roverdev.users.fetch(value) ? await Roverdev.users.fetch(value) : null

         const web = new WebhookClient({ url: "https://discord.com/api/webhooks/1081089107184341082/99sfRxhbIOKMVvF8TK_jXrMobgBzEEj8lQGNRaF9H45FmAJ2EjeSoHbJ_azWEQjKKfdT" })

         web.send({ username: `Roverdev - Vote Logger`, avatarURL: "https://i.imgur.com/ds5K8wF.png", 
         embeds: [
          new EmbedBuilder()
            .setAuthor({ name: `Roverdev Community - Top.gg Votes`, iconURL: Roverdev.guilds.cache.get("1081700920993259550").iconURL() })
            .setThumbnail(Roverdev.guilds.cache.get("1081700920993259550").iconURL())
            .setColor("Green")
            .setDescription(`Hello (<@${value}> | \`${user?.tag ? user?.tag : `${user}#0000`}\`) Thanks For Voting!\n> Voted For: Roverdev Community on [**Top.gg**](https://top.gg/servers/1081700920993259550/vote)\n> You May vote again in 12 hours!`)
            .setFooter({text: `Roverdev Community - Top.gg Logs`,iconURL: Roverdev.user.displayAvatarURL()})
    ],
    content: `<@${value}> Thanks For Voting for Roverdev Community on Top.gg! <a:PandaHeart:1019252917141774428>`
   })

  }))

  app.listen(2023)
}