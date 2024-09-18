const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')
const configuration = require('../../../configuration')
module.exports = {
  name: "rename",
  category: "Developers",
  cooldown: 2,
  Description: "",
  RunCommand: async (Rover, message, args, executor, language, embed, database) => {
    if (message.author.id !== "663442537222242306") return

    const channel = message.mentions.channels.first()

    channel.send({
         embeds: [
              new EmbedBuilder()
              .setAuthor({ name: `Self Roles System - Made By Roverdev`, iconURL: message.guild.iconURL() })
              .setColor("Aqua")
              .setDescription(`Choose your self roles below in the menus`)
         ]
    })

    channel.send({
        components: [
              new ActionRowBuilder()
              .addComponents(
                    new StringSelectMenuBuilder()
                    .setCustomId("Gender-Roles")
                    .setDisabled(true)
                    .setPlaceholder(`Select your Gender here.`)
                    .setOptions([
                      {
                          label: "test",
                          value: "test",
                          description: "test"
                      }
              ])
              )
         ]
    })
    channel.send({
      components: [
            new ActionRowBuilder()
            .addComponents(
                  new StringSelectMenuBuilder()
                  .setCustomId("Age-Roles")
                  .setPlaceholder(`Select your Age here.`)
                  .setOptions([
                    {
                        label: "test",
                        value: "test",
                        description: "test"
                    }
            ])
            )
       ]
  })
  channel.send({
    components: [
          new ActionRowBuilder()
          .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId("Origin -Roles")
                .setDisabled(true)
                .setPlaceholder(`Select your Origin here.`)
                .setOptions([
                  {
                      label: "test",
                      value: "test",
                      description: "test"
                  }
          ])
          )
     ]
})
channel.send({
  components: [
        new ActionRowBuilder()
        .addComponents(
              new StringSelectMenuBuilder()
              .setCustomId("Platform-Roles")
              .setDisabled(true)
              .setPlaceholder(`Select your Platform  here.`)
              .setOptions([
                {
                    label: "test",
                    value: "test",
                    description: "test"
                }
        ])
        )
   ]
})
channel.send({
  components: [
        new ActionRowBuilder()
        .addComponents(
              new StringSelectMenuBuilder()
              .setCustomId("DMState-Roles")
              .setPlaceholder(`Select your DMState here.`)
              .setOptions([
                {
                    label: "test",
                    value: "test",
                    description: "test"
                }
        ])
        )
   ]
})
channel.send({
  components: [
        new ActionRowBuilder()
        .addComponents(
              new StringSelectMenuBuilder()
              .setCustomId("Coding-Roles")
              .setDisabled(true)
              .setPlaceholder(`Select your Coding Roles here.`)
              .setOptions([
                {
                    label: "test",
                    value: "test",
                    description: "test"
                }
        ])
        )
   ]
})
channel.send({
  components: [
        new ActionRowBuilder()
        .addComponents(
              new StringSelectMenuBuilder()
              .setCustomId("Talking-Roles")
              .setDisabled(true)
              .setPlaceholder(`Select your Talking Roles here.`)
              .setOptions([
                {
                    label: "test",
                    value: "test",
                    description: "test"
                }
        ])
        )
   ]
})
channel.send({
  components: [
        new ActionRowBuilder()
        .addComponents(
              new StringSelectMenuBuilder()
              .setCustomId("Ping-Roles")
              .setDisabled(true)
              .setPlaceholder(`Select your Ping Roles here.`)
              .setOptions([
                      {
                          label: "test",
                          value: "test",
                          description: "test"
                      }
              ])
        )
   ]
})
  }
}