// const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, Embed, PermissionFlagsBits } = require("discord.js")

// module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
//    // Code For Prefix Here
// }
// module.exports.slashRun = async (interaction, client) => {
//     await interaction.deferReply({ephemeral:true})
//     let banuser = interaction.options.getUser("mute_user")
//     let banreason = interaction.options.getString("mute_reason")
//     let banduration = interaction.options.getString("mute_duration")
  
//     let userr = await interaction.guild.members.fetch(banuser.id).catch(() => {})
//     if(userr == undefined || userr == null || !userr) return interaction.editReply({embeds:[
//       new EmbedBuilder()
//       .setColor("Red")
//       .setDescription(`I tried my best, but there is no user that I found with the id \`${banuser}\` in this guild`)
//     ]})
  
//       const memberPosition = userr.roles?.highest.rawPosition;
//       const moderationPosition = interaction.member.roles?.highest.rawPosition;
  
//       if (moderationPosition <= memberPosition) return interaction.editReply({embeds:[
//         new EmbedBuilder()
//         .setColor("Red")
//         .setDescription(`You can't timeout someone who  is equals/higher than you.`)
//       ]})
  
//       if(userr.muteable) return interaction.editReply({embeds:[
//         new EmbedBuilder()
//   .setColor("Red")
//   .setDescription(`It look's like I am not able to timeout this user. Please make sure my **BOT ROLE** is high enough and has the right permissions.`)
//       ]})
  
//       const ms = require("ms")
//       let mutetime;
//       try {
//         mutetime = ms(banduration);
//       } catch (e) {
//         mutetime = ms("30min")
//       }
  
//       userr.timeout(mutetime,banreason).then(() => {
//         interaction.editReply({embeds:[
//           new EmbedBuilder()
//           .setColor("#3dbeff")
//           .setDescription(`**Successfully timeouted the user ${userr.user.tag}**\n**Reason:**\n> ${banreason?banreason:"No reason provided"}\n**Moderator:**\n>>> ${interaction.member.user.tag}`)
//         ]})
//       })
  
// }

// module.exports.conf = {
//      Prefix: {
//         aliases: [],
//         enabled: false,
//         ownerOnly: false,
//         AdminOnly: false,
//         userPermissions: []   
//      },
//      Slash: {
//         enabled: true,
//         ownerOnly: false,
//         AdminOnly: false,
//         userPermissions: ["ModerateMembers"]
//      }
// }

// module.exports.help = {
//       Prefix: {
//         name: "timeout",
//         category: "moderation",
//         cooldown: 2,
//         usage: "timeout <@user>",
//         description: "timeout a user",
//       },
//       Slash: {
//         name: "timeout",
//         description: "Timeout a user on the server",
//         timeout: 5000,
//         category: "moderation",
//            options: [
//             {
//               name:"mute_user",
//               description:"the user you want to mute",
//               type:ApplicationCommandOptionType.User,
//               required:true,
//             },
//             {
//               name:"mute_duration",
//               description:"the length of the timeout",
//               type:ApplicationCommandOptionType.String,
//               required:true
//             },
//                 {
//                   name: "mute_reason",
//                   description: "Mute Reason",
//                   type: ApplicationCommandOptionType.String,
//                   required: false,
//                 },
//               ]
//       }
// }