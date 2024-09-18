// const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, Embed, PermissionFlagsBits } = require("discord.js")

// module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
//    // Code For Prefix Here
// }
// module.exports.slashRun = async (interaction, client) => {
//     await interaction.deferReply({ephemeral:true})
//     let banuser = interaction.options.getUser("kick_user")
//     let banreason = interaction.options.getString("kick_reason")
  
//     let userr = await client.users.fetch(banuser.id,{forced:true}).catch(()=>{})
//     if(userr == undefined || userr == null || !userr) return interaction.editReply({embeds:[
//       new EmbedBuilder()
//       .setColor("Red")
//       .setDescription(`I tried my best, but there is no user that I found with the id \`${banuser}\``)
//     ]})
  
//     if(interaction.guild.members.cache.get(userr.id)){
      
//       let guser = await interaction.guild.members.fetch(banuser.id,{force:true}).catch(() => {})
//       const memberPosition = guser.roles?.highest.rawPosition;
//       const moderationPosition = interaction.member.roles?.highest.rawPosition;
  
//       if (moderationPosition <= memberPosition) return interaction.editReply({embeds:[
//         new EmbedBuilder()
//         .setColor("Red")
//         .setDescription(`You can't kick someone who is equals/higher than you.`)
//       ]})
  
//       if(!guser.kickable) return interaction.editReply({embeds:[
//         new EmbedBuilder()
//   .setColor("Red")
//   .setDescription(`It look's like I am not able to kick this user. Please make sure my **BOT ROLE** is high enough and has the right permissions.`)
//       ]})
  
//       interaction.guild.members.kick(guser.id, {
//         reason: banreason ? banreason : `No reason given, kick by: ${interaction.member.user.tag}`
//       }).then((ban) => {
//         interaction.editReply({embeds:[
//           new EmbedBuilder()
//           .setColor("#3dbeff")
//           .setDescription(`**Successfully kicked the user ${guser.user.tag}**\n**Reason:**\n> ${banreason?banreason:"No reason provided"}\n**Moderator:**\n>>> ${interaction.member.user.tag}`)
//         ]})
//       })
  
//     }else{
//       interaction.guild.members.kick(userr.id, {
//         reason: banreason ? banreason : `No reason given, kick by: ${interaction.member.user.tag}`
//       }).then((ban) => {
//         interaction.editReply({embeds:[
//           new EmbedBuilder()
//           .setColor("#3dbeff")
//           .setDescription(`**Successfully kicked the user ${ban.tag}**\n**Reason:**\n> ${banreason?banreason:"No reason provided"}\n**Moderator:**\n>>> ${interaction.member.user.tag}`)
//         ]})
//       })
//     }
// }

// module.exports.conf = {
//      Prefix: {
//         aliases: ["kick"],
//         enabled: false,
//         ownerOnly: false,
//         AdminOnly: false,
//         userPermissions: []   
//      },
//      Slash: {
//         enabled: true,
//         ownerOnly: false,
//         AdminOnly: false,
//         userPermissions: ["KickMembers"],
//         timeout: 5,
//      }
// }

// module.exports.help = {
//       Prefix: {
//         name: "kick",
//         category: "moderation",
//         cooldown: 2,
//         description: "Kick a user from the server",
//         usage: "Kick",
//       },
//       Slash: {
//         name: "kick",
//         description: "Kick a user from the server",
//         timeout: 5000,
//         category: "moderation",
//            options: [
//             {
//               name:"kick_user",
//               description:"the user you want to kick",
//               type:ApplicationCommandOptionType.User,
//               required:true,
//             },
//                 {
//                   name: "kick_reason",
//                   description: "Kick Reason",
//                   type: ApplicationCommandOptionType.String,
//                   required: false,
//                 },
//               ]
//       }
// }