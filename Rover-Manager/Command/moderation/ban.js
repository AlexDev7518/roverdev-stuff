const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, Embed } = require("discord.js")

module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
   // Code For Prefix Here
}
module.exports.slashRun = async (interaction, client) => {
    await interaction.deferReply({ephemeral:true})
    let banuser = interaction.options.getUser("ban_user")
    let banreason = interaction.options.getString("ban_reason")
  
    let userr = await client.users.fetch(banuser.id,{forced:true}).catch(()=>{})
    if(userr == undefined || userr == null || !userr) return interaction.editReply({embeds:[
      new EmbedBuilder()
      .setColor("Red")
      .setDescription(`I tried my best, but there is no user that I found with the id \`${banuser}\``)
    ]})
  
    if(interaction.guild.members.cache.get(userr.id)){
      
      let guser = await interaction.guild.members.fetch(banuser.id,{force:true}).catch(() => {})
      const memberPosition = guser.roles?.highest.rawPosition;
      const moderationPosition = interaction.member.roles?.highest.rawPosition;
  
      if (moderationPosition <= memberPosition) return interaction.editReply({embeds:[
        new EmbedBuilder()
        .setColor("Red")
        .setDescription(`You can't ban someone who  is equals/higher than you.`)
      ]})
  
      if(!guser.bannable) return interaction.editReply({embeds:[
        new EmbedBuilder()
  .setColor("Red")
  .setDescription(`It look's like I am not able to ban this user. Please make sure my **BOT ROLE** is high enough and has the right permissions.`)
      ]})
  
      interaction.guild.members.ban(guser.id, {
        reason: banreason ? banreason : `No reason given, ban by: ${interaction.member.user.tag}`
      }).then((ban) => {
        interaction.editReply({embeds:[
          new EmbedBuilder()
          .setColor("#3dbeff")
          .setDescription(`**Successfully banned the user ${guser.user.tag}**\n**Reason:**\n> ${banreason?banreason:"No reason provided"}\n**Moderator:**\n>>> ${interaction.member.user.tag}`)
        ]})
      })
  
    }else{
      interaction.guild.members.ban(userr.id, {
        reason: banreason ? banreason : `No reason given, ban by: ${interaction.member.user.tag}`
      }).then((ban) => {
        interaction.editReply({embeds:[
          new EmbedBuilder()
          .setColor("#3dbeff")
          .setDescription(`**Successfully banned the user ${ban.tag}**\n**Reason:**\n> ${banreason?banreason:"No reason provided"}\n**Moderator:**\n>>> ${interaction.member.user.tag}`)
        ]})
      })
    }
}

module.exports.conf = {
     Prefix: {
        aliases: ["ban"],
        enabled: false,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: ["BanMembers"]
     },
     Slash: {
        enabled: true,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: ["BanMembers"],
        timeout: 5,
     }
}

module.exports.help = {
      Prefix: {
        name: "ban",
        category: "moderation",
        cooldown: 2,
        usage: "ban",
        description: "ban a user",
      },
      Slash: {
        name: "ban",
        description: "Ban from the server",
        timeout: 5000,
        category: "moderation",
           options: [
            {
              name:"ban_user",
              description:"the user you want to ban",
              type:ApplicationCommandOptionType.User,
              required:true,
            },
                {
                  name: "ban_reason",
                  description: "Ban Reason",
                  type: ApplicationCommandOptionType.String,
                  required: false,
                },
              ]
      }
}