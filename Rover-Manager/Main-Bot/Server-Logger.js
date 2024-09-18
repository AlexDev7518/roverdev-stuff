module.exports = async client => {
     client.on("channelCreate", async (channel) => {
          
     })
     client.on("channelDelete", async (channel) => {
          
    })
    client.on("channelPinsUpdate", async (channel, time) => {
          
    })
    client.on("channelUpdate", async (oldChannel, newChannel)  => {
          
    })
    
    // Emojis

    client.on("emojiCreate", async (emoji) => {
     
    })
    client.on("emojiDelete", async (emoji) => {
     
    })
    client.on("emojiUpdat", async (emoji) => { 
     
    })

    client.on("error", async (error) => {
     
    })

    client.on("guildBanAdd", async (ban) => {
     
    })
    client.on("guildBanRemove", async (ban) => {
     
    })


    client.on("guildMemberAdd", async (member) => {
     
    })
    client.on("guildMemberAvailable", async (member) => {
     
    })
    client.on("guildMemberRemove", async (member) => {
     
    })
    client.on("guildMemberChunk", async (member, guild, chunk) => {
     
    })
    client.on("guildMemberUpdate", async (oldMember, newMember) => {
     
    })
    
    client.on("guildScheduledEventCreate", async () => {
     
    })
    client.on("guildScheduledEventDelete", async () => {
     
    })
    client.on("guildScheduledEventUpdate", async () => {
     
    })
    client.on("guildScheduledEventUserAdd", async () => {
     
    })
    client.on("guildScheduledEventUserRemove", async () => {
     
    })
    client.on("guildUnavailable", async () => {
     
    })
    client.on("guildUpdate", async () => {
     
    })

    client.on("inviteCreate", async () => {
     
    })
    client.on("inviteDelete", async () => {
     
    })
    client.on("messageDelete", async () => {
     
    })
    client.on("messageDeleteBulk", async () => {
     
    })

    client.on("messageReactionAdd", async () => {
     
    })
    client.on("messageReactionRemove", async () => {
     
    })
    client.on("messageReactionRemoveAll", async () => {
     
    })
    client.on("messageReactionRemoveEmoji", async () => {
     
    })
    client.on("messageUpdate", async () => {
     
    })
    client.on("roleCreate", async () => {
     
    })
    client.on("roleDelete", async () => {
     
    })
    client.on("roleUpdate", async () => {
     
    })
    client.on("stageInstanceCreate", async () => {
     
    })
    client.on("stageInstanceDelete", async () => {
     
    })
    client.on("stageInstanceUpdate", async () => {
     
    })
    client.on("stickerCreate", async () => {
     
    })
    client.on("stickerDelete", async () => {
     
    })
    client.on("stickerUpdate", async () => {
     
    })
    client.on("threadCreate", async () => {
     
    })
    client.on("threadDelete", async () => {
     
    })
    client.on("threadListSync", async () => {
     
    })
    client.on("threadMembersUpdate", async () => {
     
    })
    client.on("threadMemberUpdate", async () => {
     
    })
    client.on("threadUpdate", async () => {
     
    })
    client.on("userUpdate", async () => {
     
    })
    client.on("webhookUpdate", async () => {
     
    })

    // discord-logs

    client.on("guildChannelPermissionsUpdate", async () => {
     
    })
    client.on("guildChannelTopicUpdate", async () => {
     
    })
    client.on("unhandledGuildChannelUpdate", async () => {
     
    })
    client.on("guildMemberBoost", async () => {
     
    })
    client.on("guildMemberUnboost", async () => {
     
    })
    client.on("guildMemberRoleAdd", async () => {
     
    })
    client.on("guildMemberRoleRemove", async () => {
     
    })
    client.on("guildMemberNicknameUpdate", async () => {
     
    })
    client.on("guildMemberEntered", async () => {
     
    })
    client.on("unhandledGuildMemberUpdate", async () => {
     
    })
    client.on("guildBoostLevelUp", async () => { 
     
    })
    client.on("guildBoostLevelDown", async () => {
     
    })
    client.on("guildBannerAdd", async () => {
     
    })
    client.on("guildAfkChannelAdd", async () => {
     
    })
    client.on("guildVanityURLAdd", async () => {
     
    })
    client.on("guildVanityURLRemove", async () => {
     
    })
    client.on("guildVanityURLUpdate", async () => {
     
    })
    client.on("guildFeaturesUpdate", async () => {
     
    })
    client.on("guildAcronymUpdate", async () => {
     
    })
    client.on("guildOwnerUpdate", async () => {
     
    })
    client.on("guildPartnerAdd", async () => {
     
    })
    client.on("guildPartnerRemove", async () => {
     
    })
    client.on("guildVerificationAdd", async () => {
     
    })
    client.on("guildVerificationRemove", async () => {
     
    })
    client.on("unhandledGuildUpdate", async () => {
     
    })
    client.on("messagePinned", async () => {
     
    })
    client.on("messageContentEdited", async () => {
     
    })
    client.on("unhandledMessageUpdate", async () => {
     
    })
    client.on("rolePositionUpdate", async () => {
     
    })
    client.on("unhandledRoleUpdate", async () => {
     
    })
    client.on("threadStateUpdate", async () => {
     
    })
    client.on("threadNameUpdate", async () => {
     
    })
    client.on("threadLockStateUpdate", async () => {
     
    })
    client.on("threadRateLimitPerUserUpdate", async () => {
     
    })
    client.on("threadAutoArchiveDurationUpdate", async () => {
     
    })
    client.on("unhandledThreadUpdate", async () => {
     
    })
    client.on("userAvatarUpdate", async () => {
     
    })
    client.on("userUsernameUpdate", async () => {
     
    })
    client.on("userDiscriminatorUpdate", async () => {
     
    })
    client.on("userFlagsUpdate", async () => {
     
    })
    client.on("unhandledUserUpdate", async () => {
     
    })
    client.on("voiceChannelJoin", async () => {
     
    })
    client.on("voiceChannelLeave", async () => {
     
    })
    client.on("voiceChannelSwitch", async () => {
     
    })
    client.on("voiceChannelMute", async () => {
     
    })
    client.on("voiceChannelUnmute", async () => {
     
    })
    client.on("voiceChannelDeaf", async () => {
     
    })
    client.on("voiceChannelUndeaf", async () => {
     
    })
    client.on("voiceStreamingStart", async () => {
     
    })
    client.on("voiceStreamingStop", async () => {
     
    })
}