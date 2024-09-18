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
    
//     interaction.channel.lockPermissions()
  
//     interaction.editReply({embeds:[
//       new EmbedBuilder()
//       .setColor("#3dbeff")
//       .setDescription(`I nulled \`${role.name}'s\` the permissions`)
//     ]})
// }

// module.exports.conf = {
//      Prefix: {
//         aliases: ["latency"],
//         enabled: false,
//         ownerOnly: false,
//         AdminOnly: false,
//         userPermissions: []   
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
//         name: "unlock",
//         category: "moderation",
//         cooldown: 2,
//         usage: "unlock",
//         description: "unlock this channel",
//       },
//       Slash: {
//         name: "unlock",
//         description: "unlock this channel",
//         timeout: 5000,
//         category: "moderation",
//       }
// }