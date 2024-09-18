// const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, Embed, PermissionFlagsBits } = require("discord.js")

// module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
//    // Code For Prefix Here
// }
// module.exports.slashRun = async (interaction, client) => {
//     await interaction.deferReply({ephemeral:true})

//     const role = interaction.guild.roles.cache.find(m => m.id === "920292442903822346");
  
//     if(!role) return interaction.editReply({embeds:[
//       new EmbedBuilder()
//       .setColor("Red")
//       .setDescription(`I couldn't find the role from the code, maybe wrong role id or it got deleted?`)
//     ]})
//     interaction.channel.permissionOverwrites.set([
//       {
//       id:role.id,
//       deny:[PermissionFlagsBits.SendMessages,PermissionFlagsBits.ManageMessages],
//     }
//   ])
  
//     interaction.editReply({embeds:[
//       new EmbedBuilder()
//       .setColor("#3dbeff")
//       .setDescription(`I denied \`${role.name}\` the permissions to do anything bad here`)
//     ]})
// }

// module.exports.conf = {
//      Prefix: {
//         aliases: ["latency"],
//         enabled: false,
//         ownerOnly: false,
//         AdminOnly: false,
//         userPermissions: ["ManageChannels"]
//      },
//      Slash: {
//         enabled: true,
//         ownerOnly: false,
//         AdminOnly: false,
//         userPermissions: ["ManageChannels"],
//         timeout: 5,
//      }
// }

// module.exports.help = {
//       Prefix: {
//         name: "lock",
//         description: "Lock this channel",
//         category: "moderation",
//         cooldown: 2,
//         usage: "lock",
//       },
//       Slash: {
//         name: "lock",
//         description: "Lock this channel",
//         timeout: 5000,
//         category: "moderation",
//       }
// }