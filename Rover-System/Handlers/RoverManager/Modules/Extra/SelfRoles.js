const { StringSelectMenuBuilder } = require("@discordjs/builders");
const { ActionRowBuilder, Events, EmbedBuilder } = require("discord.js");

module.exports = async rover => {
  // setTimeout(() => {
  //   const GenderRoles = rover.guilds.cache.get("846548733914906664").roles.cache.filter(m => m.name.includes("[GEND]")).sort((a, b) => a.position - b.position).map(m => {

  //     const roleName = `${m.name}`.split("〢[GEND] ")[1]

  //     const role = {
  //       label: roleName,
  //       value: m.id,
  //       description: `Click me to get ${roleName} role`
  //     }

  //     return role
  //   })

  //   const AgeRoles = rover.guilds.cache.get("846548733914906664").roles.cache.filter(m => m.name.includes("[AGE]")).sort((a, b) => a.position - b.position).map(m => {

  //     const roleName = `${m.name}`.split("〢[AGE] ")[1]

  //     const role = {
  //       label: roleName,
  //       value: m.id,
  //       description: `Click me to get ${roleName} role`
  //     }

  //     return role
  //   })

  //   const OrigRoles = rover.guilds.cache.get("846548733914906664").roles.cache.filter(m => m.name.includes("[ORIG]")).sort((a, b) => a.position - b.position).map(m => {

  //     const roleName = `${m.name}`.split("〢[ORIG] ")[1]

  //     const role = {
  //       label: roleName,
  //       value: m.id,
  //       description: `Click me to get ${roleName} role`
  //     }

  //     return role
  //   })

  //   const PlatformRoles = rover.guilds.cache.get("846548733914906664").roles.cache.filter(m => m.name.includes("[PLAT]")).sort((a, b) => a.position - b.position).map(m => {

  //     const roleName = `${m.name}`.split("〢[PLAT] ")[1]

  //     const role = {
  //       label: roleName,
  //       value: m.id,
  //       description: `Click me to get ${roleName} role`
  //     }

  //     return role
  //   })

  //   const DMRoles = rover.guilds.cache.get("846548733914906664").roles.cache.filter(m => m.name.includes("[DM]")).sort((a, b) => a.position - b.position).map(m => {

  //     const roleName = `${m.name}`.split("〢[DM] ")[1]

  //     const role = {
  //       label: roleName,
  //       value: m.id,
  //       description: `Click me to get ${roleName} role`
  //     }

  //     return role
  //   })

  //   const CodingRoles = rover.guilds.cache.get("846548733914906664").roles.cache.filter(m => m.name.includes("[CODE]")).sort((a, b) => a.position - b.position).map(m => {

  //     const roleName = `${m.name}`.split("〢[CODE] ")[1]

  //     const role = {
  //       label: roleName,
  //       value: m.id,
  //       description: `Click me to get ${roleName} role`
  //     }

  //     return role
  //   })

  //   const TalkingRoles = rover.guilds.cache.get("846548733914906664").roles.cache.filter(m => m.name.includes("[TALK]")).sort((a, b) => a.position - b.position).map(m => {

  //     const roleName = `${m.name}`.split("〢[TALK] ")[1]

  //     const role = {
  //       label: roleName,
  //       value: m.id,
  //       description: `Click me to get ${roleName} role`
  //     }

  //     return role
  //   })

  //   const PingRoles = rover.guilds.cache.get("846548733914906664").roles.cache.filter(m => m.name.includes("[PING]")).sort((a, b) => a.position - b.position).map(m => {

  //     const roleName = `${m.name}`.split("〢[PING] ")[1]

  //     const role = {
  //       label: roleName,
  //       value: m.id,
  //       description: `Click me to get ${roleName} role`,
  //     }

  //     return role
  //   })

    // const channel = rover.channels.cache.get("1113905631036965025")
    // channel.messages.fetch("1113959883000270900").then((msg) => {
  //     msg.edit({
  //       embeds: [
  //           new EmbedBuilder()
  //           .setColor("Aqua")
  //           .setTitle("Select your Gender Roles here.")
  //       ],
  //       components: [
  //         new ActionRowBuilder()
  //           .addComponents(
  //             new StringSelectMenuBuilder()
  //               .setCustomId("Gender-Roles")
  //               .setPlaceholder(`Select your Gender here.`)
  //               .setMaxValues(1)
  //               .setOptions(GenderRoles)
  //           )
  //       ]
  //     })
  //   })


  //   channel.messages.fetch("1113959884447297688").then((msg) => {
  //     msg.edit({
  //       embeds: [
  //         new EmbedBuilder()
  //         .setColor("Aqua")
  //         .setTitle("Select your Age Roles here.")
  //     ],
  //       components: [
  //         new ActionRowBuilder()
  //           .addComponents(
  //             new StringSelectMenuBuilder()
  //               .setCustomId("Age-Roles")
  //               .setPlaceholder(`Select your Age here.`)
  //               .setMaxValues(1)
  //               .setOptions(AgeRoles)
  //           )
  //       ]
  //     })
  //   })

  //   channel.messages.fetch("1113959885713969272").then((msg) => {
  //     msg.edit({
  //       embeds: [
  //         new EmbedBuilder()
  //         .setColor("Aqua")
  //         .setTitle("Select your Origin Roles here.")
  //     ],
  //       components: [
  //         new ActionRowBuilder()
  //           .addComponents(
  //             new StringSelectMenuBuilder()
  //               .setCustomId("Origin-Roles")
  //               .setPlaceholder(`Select your Origin here.`)
  //               .setMaxValues(1)
  //               .setOptions(OrigRoles)
  //           )
  //       ]
  //     })
  //   })

  //   channel.messages.fetch("1113959887039385690").then((msg) => {
  //     msg.edit({
  //       embeds: [
  //         new EmbedBuilder()
  //         .setColor("Aqua")
  //         .setTitle("Select your Platform Roles here.")
  //     ],
  //       components: [
  //         new ActionRowBuilder()
  //           .addComponents(
  //             new StringSelectMenuBuilder()
  //               .setCustomId("Platform-Roles")
  //               .setPlaceholder(`Select your Platform here.`)
  //               .setMaxValues(PlatformRoles.length)
  //               .setOptions(PlatformRoles)
  //           )
  //       ]
  //     })
  //   })

  //   channel.messages.fetch("1113959888222175342").then((msg) => {
  //     msg.edit({
  //       embeds: [
  //         new EmbedBuilder()
  //         .setColor("Aqua")
  //         .setTitle("Select your DMState Roles here.")
  //     ],
  //       components: [
  //         new ActionRowBuilder()
  //           .addComponents(
  //             new StringSelectMenuBuilder()
  //               .setCustomId("DMState-Roles")
  //               .setPlaceholder(`Select your DMState here.`)
  //               .setMaxValues(1)
  //               .setOptions(DMRoles)
  //           )
  //       ]
  //     })
  //   })

  //   channel.messages.fetch("1113959894492643416").then((msg) => {
  //     msg.edit({
  //       embeds: [
  //         new EmbedBuilder()
  //         .setColor("Aqua")
  //         .setTitle("Select your Coding Roles here.")
  //     ],
  //       components: [
  //         new ActionRowBuilder()
  //           .addComponents(
  //             new StringSelectMenuBuilder()
  //               .setCustomId("Coding-Roles")
  //               .setPlaceholder(`Select your Coding Roles here.`)
  //               .setMaxValues(CodingRoles.length)
  //               .setOptions(CodingRoles)
  //           )
  //       ]
  //     })
  //   })

  //   channel.messages.fetch("1113959897269280850").then((msg) => {
  //     msg.edit({
  //       embeds: [
  //         new EmbedBuilder()
  //         .setColor("Aqua")
  //         .setTitle("Select your Talking Roles here.")
  //     ],
  //       components: [
  //         new ActionRowBuilder()
  //           .addComponents(
  //             new StringSelectMenuBuilder()
  //               .setCustomId("Talking-Roles")
  //               .setPlaceholder(`Select your Talking Roles here.`)
  //               .setMaxValues(TalkingRoles.length)
  //               .setOptions(TalkingRoles)
  //           )
  //       ]
  //     })
  //   })

  //   channel.messages.fetch("1113959898363990027").then((msg) => {
  //     msg.edit({
  //       embeds: [
  //         new EmbedBuilder()
  //         .setColor("Aqua")
  //         .setTitle("Select your Ping Roles here.")
  //     ],
  //       components: [
  //         new ActionRowBuilder()
  //           .addComponents(
  //             new StringSelectMenuBuilder()
  //               .setCustomId("Ping-Roles")
  //               .setPlaceholder(`Select your Ping Roles here.`)
  //               .setMaxValues(PingRoles.length)
  //               .setOptions(PingRoles)
  //           )
  //       ]
  //     })
  //   })

  // }, 10000);

  // rover.on(Events.InteractionCreate, async interaction => {
  //   if (interaction.customId == "Gender-Roles") {
  //     let roles = interaction.values
  //     let array = []


  //     roles.forEach(m => {
  //         if (!interaction.member.roles.cache.has(m)) {
  //               interaction.guild.members.cache.get(interaction.user.id).roles.add(m)
  //               array.push(`Successfully Added <@&${m}>`)
  //         } else  if (interaction.member.roles.cache.has(m)) {
  //               interaction.guild.members.cache.get(interaction.user.id).roles.remove(m)
  //               array.push(`Successfully Removed <@&${m}>`)
  //     }
  //     })

  //     let content = `Roles:\n> ${array.map(m => `${m}`).join("\n> ")} `

  //     interaction.reply({ content: `${content}`, ephemeral: true })
  //   }
  //   if (interaction.customId == "Age-Roles") {
  //     let roles = interaction.values
  //     let array = []


  //     roles.forEach(m => {
  //         if (!interaction.member.roles.cache.has(m)) {
  //               interaction.guild.members.cache.get(interaction.user.id).roles.add(m)
  //               array.push(`Successfully Added <@&${m}>`)
  //         } else  if (interaction.member.roles.cache.has(m)) {
  //               interaction.guild.members.cache.get(interaction.user.id).roles.remove(m)
  //               array.push(`Successfully Removed <@&${m}>`)
  //     }
  //     })

  //     let content = `Roles:\n> ${array.map(m => `${m}`).join("\n> ")} `

  //     interaction.reply({ content: `${content}`, ephemeral: true })
  //   }
  //   if (interaction.customId == "Origin-Roles") {
  //     let roles = interaction.values
  //     let array = []


  //     roles.forEach(m => {
  //         if (!interaction.member.roles.cache.has(m)) {
  //               interaction.guild.members.cache.get(interaction.user.id).roles.add(m)
  //               array.push(`Successfully Added <@&${m}>`)
  //         } else  if (interaction.member.roles.cache.has(m)) {
  //               interaction.guild.members.cache.get(interaction.user.id).roles.remove(m)
  //               array.push(`Successfully Removed <@&${m}>`)
  //     }
  //     })

  //     let content = `Roles:\n> ${array.map(m => `${m}`).join("\n> ")} `

  //     interaction.reply({ content: `${content}`, ephemeral: true })
  //   }
  //   if (interaction.customId == "Platform-Roles") {
  //     let roles = interaction.values
  //     let array = []


  //     roles.forEach(m => {
  //         if (!interaction.member.roles.cache.has(m)) {
  //               interaction.guild.members.cache.get(interaction.user.id).roles.add(m)
  //               array.push(`Successfully Added <@&${m}>`)
  //         } else  if (interaction.member.roles.cache.has(m)) {
  //               interaction.guild.members.cache.get(interaction.user.id).roles.remove(m)
  //               array.push(`Successfully Removed <@&${m}>`)
  //     }
  //     })

  //     let content = `Roles:\n> ${array.map(m => `${m}`).join("\n> ")} `

  //     interaction.reply({ content: `${content}`, ephemeral: true })
  //   }
  //   if (interaction.customId == "DMState-Roles") {
  //     let roles = interaction.values

  //     let array = []


  //     roles.forEach(m => {
  //         if (!interaction.member.roles.cache.has(m)) {
  //               interaction.guild.members.cache.get(interaction.user.id).roles.add(m)
  //               array.push(`Successfully Added <@&${m}>`)
  //         } else  if (interaction.member.roles.cache.has(m)) {
  //               interaction.guild.members.cache.get(interaction.user.id).roles.remove(m)
  //               array.push(`Successfully Removed <@&${m}>`)
  //     }
  //     })

  //     let content = `Roles:\n> ${array.map(m => `${m}`).join("\n> ")} `

  //     interaction.reply({ content: `${content}`, ephemeral: true })
  //   }
  //   if (interaction.customId == "Coding-Roles") {
  //     let roles = interaction.values
  //     let array = []


  //     roles.forEach(m => {
  //         if (!interaction.member.roles.cache.has(m)) {
  //               interaction.guild.members.cache.get(interaction.user.id).roles.add(m)
  //               array.push(`Successfully Added <@&${m}>`)
  //         } else  if (interaction.member.roles.cache.has(m)) {
  //               interaction.guild.members.cache.get(interaction.user.id).roles.remove(m)
  //               array.push(`Successfully Removed <@&${m}>`)
  //     }
  //     })

  //     let content = `Roles:\n> ${array.map(m => `${m}`).join("\n> ")} `

  //     interaction.reply({ content: `${content}`, ephemeral: true })
  //   }
  //   if (interaction.customId == "Talking-Roles") {
  //     let roles = interaction.values
  //     let array = []


  //     roles.forEach(m => {
  //         if (!interaction.member.roles.cache.has(m)) {
  //               interaction.guild.members.cache.get(interaction.user.id).roles.add(m)
  //               array.push(`Successfully Added <@&${m}>`)
  //         } else  if (interaction.member.roles.cache.has(m)) {
  //               interaction.guild.members.cache.get(interaction.user.id).roles.remove(m)
  //               array.push(`Successfully Removed <@&${m}>`)
  //     }
  //     })

  //     let content = `Roles:\n> ${array.map(m => `${m}`).join("\n> ")} `

  //     interaction.reply({ content: `${content}`, ephemeral: true })
  //   }
  //   if (interaction.customId == "Ping-Roles") {
  //     let roles = interaction.values
  //     let array = []


  //     roles.forEach(m => {
  //         if (!interaction.member.roles.cache.has(m)) {
  //               interaction.guild.members.cache.get(interaction.user.id).roles.add(m)
  //               array.push(`Successfully Added <@&${m}>`)
  //         } else  if (interaction.member.roles.cache.has(m)) {
  //               interaction.guild.members.cache.get(interaction.user.id).roles.remove(m)
  //               array.push(`Successfully Removed <@&${m}>`)
  //     }
  //     })

  //     let content = `Roles:\n> ${array.map(m => `${m}`).join("\n> ")} `

  //     interaction.reply({ content: `${content}`, ephemeral: true })
  //   }
  // })
}