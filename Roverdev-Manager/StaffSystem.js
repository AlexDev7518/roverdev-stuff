const {
  Client,
  Partials,
  GatewayIntentBits,
  Presence,
  ActivityType,
  Collection,
  MessageType,
  WebhookClient,
  Events,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder
}  = require("discord.js")
const { BotAPIToken, StaffSystemToken } = require("./Configuration/BotToken")
const LastMessage = require("./Databases/Schema/StaffSystem/LastMessage")
const { Roverdev } = require("./main")


const RoverdevAPI = new Client({
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: false,
  },
  partials: [
      Partials.Message, 
      Partials.Channel, 
      Partials.GuildMember,
      Partials.Reaction, 
      Partials.GuildScheduledEvent, 
      Partials.User, 
      Partials.ThreadMember, 
    ],
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildBans,
     GatewayIntentBits.GuildEmojisAndStickers,
      GatewayIntentBits.GuildIntegrations,
     GatewayIntentBits.GuildWebhooks,
     GatewayIntentBits.GuildInvites,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMessages, 
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMessageTyping,
      GatewayIntentBits.DirectMessages, 
      GatewayIntentBits.DirectMessageReactions,
      GatewayIntentBits.DirectMessageTyping, 
      GatewayIntentBits.MessageContent,
    ],
    presence: {
         status: "idle",
         activities: [{
                 name: "Roverdev Staff System",
                 type: ActivityType.Playing,
         }]
    }
})

Roverdev.on(Events.MessageCreate, async message => {
       if (message.author.bot) return 
       if (message.guild.id !== "1081700920993259550") return
       if (message.member.roles.cache.has("1081823807095967745")) {
            const data = await LastMessage.findOne({ Author: message.author.id })
            
            if (!data) {
              await LastMessage.create({ 
                Author: message.author.id,
                LastMessage: message.createdTimestamp
           })
            }

            if (data) {
              await LastMessage.findOneAndUpdate({ Author: message.author.id }, { $set: { LastMessage: message.createdTimestamp } })
            }
       }
})

RoverdevAPI.on(Events.ClientReady, async Roverdev => {

  await Roverdev.channels.fetch("1081865789243654255").then(async (msgs) => await msgs.messages.fetch("1081866064067039342").then(async (msg) => {
      msg.edit({ content: `Loading...`, embeds: [] })
  }))

   setInterval(async () => {
    await Roverdev.channels.fetch("1081865789243654255").then(async (msgs) => await msgs.messages.fetch("1081866064067039342").then(async (msg) => {
      const embed = new EmbedBuilder()
      .setAuthor({ name: `Roverdev - Staff System Leaderboard`, iconURL: Roverdev.user.displayAvatarURL() })
      .setColor("Green")
      .setFooter({ text: `❌ Means Not Supporting | ✅ Means Supporting` })
    //   .setDescription(`${Roverdev.guilds.cache.get("1081700920993259550").roles.cache.get("1005978927421980702").members.map(async m => {
    //      `\`${m.presence == null ? `⚫ Offline` :  `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ Offline` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}\` - (${m.user} | \`${m.user.tag.replace(/ /g, '').replace("!", "").replace("!", "")}\`\n> Last Message: ${data?.LastMessage == undefined ? `Invaild Message.` : `<t:${Math.floor(data.LastMessage/1000)}:R>`}`
    //   }
    //  ).join("\n")}`)
  
    let FoundersArray = []
    let ManagersArray = []
    let AdminstratorArray = []
    let ModeratorsArray = []
    let StaffArray = []

                  /**
               * @Founders
               */


                  const User1 = Roverdev.guilds.cache.get("1081700920993259550").members.cache.get("663442537222242306")
                  const User2 = Roverdev.guilds.cache.get("1081700920993259550").members.cache.get("647962247666073610")
                  const User4 = Roverdev.guilds.cache.get("1081700920993259550").members.cache.get("767627938433597450")

                  let array = []
                  array.length = 0

                  let Users = [User1, User2, User4]

                  Users.forEach(async m => {
                    const data = await LastMessage.findOne({ Author: m.user.id })
                    let Device = m?.presence?.clientStatus
                    let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))
      
                    if (Status == false) Status = `❌`
                    if (Status == null) Status = `❌`
                    if (Status == true) Status = `✅`
      
                    let array = []
                    array.length = 0

                    if (Device?.desktop) array.push("🖥️")
                    if (Device?.mobile)  array.push("📱")
                    if (Device?.web) array.push("🕸️")

                    if (Device == undefined) array.push("⚠️")   

                    FoundersArray.push( `\`${m.presence == null ? `⚫ Offline` :  `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`} (${array.length < 1 ? `⚠️`: array.map(m => m).join(' ')})\` - (${m.user} - \`${Status}\`) \n> Last Message: ${data?.LastMessage == undefined ? `Invaild Message.` : `<t:${Math.floor(data.LastMessage/1000)}:R>`}`)
                  })    
    
                  /**
                   * @Adminstrators
                   */
    
                  Roverdev.guilds.cache.get("1081700920993259550").roles.cache.get("1081823807095967745").members.forEach(async m => {

                      const data = await LastMessage.findOne({ Author: m.user.id })
                      let Device = m?.presence?.clientStatus
                      let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))
        
                      if (Status == false) Status = `❌`
                      if (Status == null) Status = `❌`
                      if (Status == true) Status = `✅`
        
                      let array = []
                      array.length = 0
  
                      if (Device?.desktop) array.push("🖥️")
                      if (Device?.mobile)  array.push("📱")
                      if (Device?.web) array.push("🕸️")
  
                      if (Device == undefined) array.push("⚠️")        


                      if (AdminstratorArray.includes(`\`${m.presence == null ? `⚫ Offline` :  `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`} (${array.length < 1 ? `⚠️`: array.map(m => m).join(' ')})\` - (${m.user} - \`${Status}\`) \n> Last Message: ${data?.LastMessage == undefined ? `Invaild Message.` : `<t:${Math.floor(data.LastMessage/1000)}:R>`}`)) return;
                       AdminstratorArray.push(`\`${m.presence == null ? `⚫ Offline` :  `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`} (${array.length < 1 ? `⚠️`: array.map(m => m).join(' ')})\` - (${m.user} - \`${Status}\`) \n> Last Message: ${data?.LastMessage == undefined ? `Invaild Message.` : `<t:${Math.floor(data.LastMessage/1000)}:R>`}`)
                  })
                //   Roverdev.guilds.cache.get("1081700920993259550").roles.cache.get("920292438294294538").members.forEach(async m => {
                //     if (!m.roles.cache.has("920292436641718312")) {

                //       const data = await LastMessage.findOne({ Author: m.user.id })
                //       let Device = m?.presence?.clientStatus
                //       let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))
        
                //       if (Status == false) Status = `❌`
                //       if (Status == null) Status = `❌`
                //       if (Status == true) Status = `✅`

                //     let array = []
                //     array.length = 0

                //     if (Device?.desktop) array.push("🖥️")
                //     if (Device?.mobile)  array.push("📱")
                //     if (Device?.web) array.push("🕸️")

                //     if (Device == undefined) array.push("⚠️")        

                //           if (AdminstratorArray.includes(`\`${m.presence == null ? `⚫ Offline` :  `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`} (${array.length < 1 ? `⚠️`: array.map(m => m).join(' ')})\` - (${m.user} - \`${Status}\`) \n> Last Message: ${data?.LastMessage == undefined ? `Invaild Message.` : `<t:${Math.floor(data.LastMessage/1000)}:R>`}`)) return;
                //            AdminstratorArray.push(`\`${m.presence == null ? `⚫ Offline` :  `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`} (${array.length < 1 ? `⚠️`: array.map(m => m).join(' ')})\` - (${m.user} - \`${Status}\`) \n> Last Message: ${data?.LastMessage == undefined ? `Invaild Message.` : `<t:${Math.floor(data.LastMessage/1000)}:R>`}`)
                //          }
                //   })

                //       /**
                //    * @Managers
                //    */
    
                //       Roverdev.guilds.cache.get("1081700920993259550").roles.cache.get("920292436641718312").members.forEach(async m => {
                //         if (!m.roles.cache.has("1016060228866953236")) {
    
                //           const data = await LastMessage.findOne({ Author: m.user.id })
                //           let Device = m?.presence?.clientStatus
                //           let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))
            
                //           if (Status == false) Status = `❌`
                //           if (Status == null) Status = `❌`
                //           if (Status == true) Status = `✅`
            

                //           let array = []
                //           array.length = 0
      
                //           if (Device?.desktop) array.push("🖥️")
                //           if (Device?.mobile)  array.push("📱")
                //           if (Device?.web) array.push("🕸️")
      
                //           if (Device == undefined) array.push("⚠️")        
                          
                //           if (ManagersArray.includes(`\`${m.presence == null ? `⚫ Offline` :  `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`} (${array.length < 1 ? `⚠️`: array.map(m => m).join(' ')})\` - (${m.user} - \`${Status}\`) \n> Last Message: ${data?.LastMessage == undefined ? `Invaild Message.` : `<t:${Math.floor(data.LastMessage/1000)}:R>`}`)) return;
                //           ManagersArray.push(`\`${m.presence == null ? `⚫ Offline` :  `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`} (${array.length < 1 ? `⚠️`: array.map(m => m).join(' ')})\` - (${m.user} - \`${Status}\`) \n> Last Message: ${data?.LastMessage == undefined ? `Invaild Message.` : `<t:${Math.floor(data.LastMessage/1000)}:R>`}`)
                //  }
                //       })
                //       Roverdev.guilds.cache.get("1081700920993259550").roles.cache.get("920292435853185054").members.forEach(async m => {
                //              if (!m.roles.cache.has("1016060228866953236")) {

                //               const data = await LastMessage.findOne({ Author: m.user.id })
                //               let Device = m?.presence?.clientStatus
                //               let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))
                
                //               if (Status == false) Status = `❌`
                //               if (Status == null) Status = `❌`
                //               if (Status == true) Status = `✅`
                            
                //     let array = []
                //     array.length = 0

                //     if (Device?.desktop) array.push("🖥️")
                //     if (Device?.mobile)  array.push("📱")
                //     if (Device?.web) array.push("🕸️")

                //     if (Device == undefined) array.push("⚠️")        
    
                //               if (ManagersArray.includes(`\`${m.presence == null ? `⚫ Offline` :  `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`} (${array.length < 1 ? `⚠️`: array.map(m => m).join(' ')})\` - (${m.user} - \`${Status}\`) \n> Last Message: ${data?.LastMessage == undefined ? `Invaild Message.` : `<t:${Math.floor(data.LastMessage/1000)}:R>`}`)) return;
                //                  ManagersArray.push(`\`${m.presence == null ? `⚫ Offline` :  `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`} (${array.length < 1 ? `⚠️`: array.map(m => m).join(' ')})\` - (${m.user} - \`${Status}\`) \n> Last Message: ${data?.LastMessage == undefined ? `Invaild Message.` : `<t:${Math.floor(data.LastMessage/1000)}:R>`}`)
                //              }
                //       })

                //    /**
                //    * @Moderators
                //    */
    
                //   Roverdev.guilds.cache.get("1081700920993259550").roles.cache.get("920292440223662100").members.forEach(async m => {
                //     if (!m.roles.cache.has("920292438294294538")) {

                //       const data = await LastMessage.findOne({ Author: m.user.id })
                //       let Device = m?.presence?.clientStatus
                //       let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))
        
                //       if (Status == false) Status = `❌`
                //       if (Status == null) Status = `❌`
                //       if (Status == true) Status = `✅`
        
                //       let array = []
                //       array.length = 0
  
                //       if (Device?.desktop) array.push("🖥️")
                //       if (Device?.mobile)  array.push("📱")
                //       if (Device?.web) array.push("🕸️")
  
                //       if (Device == undefined) array.push("⚠️")        

                //       if (ModeratorsArray.includes(`\`${m.presence == null ? `⚫ Offline` :  `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`} (${array.length < 1 ? `⚠️`: array.map(m => m).join(' ')})\` - (${m.user} - \`${Status}\`) \n> Last Message: ${data?.LastMessage == undefined ? `Invaild Message.` : `<t:${Math.floor(data.LastMessage/1000)}:R>`}`)) return;
                //        ModeratorsArray.push(`\`${m.presence == null ? `⚫ Offline` :  `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`} (${array.length < 1 ? `⚠️`: array.map(m => m).join(' ')})\` - (${m.user} - \`${Status}\`) \n> Last Message: ${data?.LastMessage == undefined ? `Invaild Message.` : `<t:${Math.floor(data.LastMessage/1000)}:R>`}`)
                //        }
                //   })
                //   Roverdev.guilds.cache.get("1081700920993259550").roles.cache.get("920292439267348490").members.forEach(async m => {
                //     if (!m.roles.cache.has("920292438294294538")) {

                //       const data = await LastMessage.findOne({ Author: m.user.id })
                //       let Device = m?.presence?.clientStatus
                //       let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))
        
                //       if (Status == false) Status = `❌`
                //       if (Status == null) Status = `❌`
                //       if (Status == true) Status = `✅`
        
                //       let array = []
                //       array.length = 0
  
                //       if (Device?.desktop) array.push("🖥️")
                //       if (Device?.mobile)  array.push("📱")
                //       if (Device?.web) array.push("🕸️")
  
                //       if (Device == undefined) array.push("⚠️")        


                //           if (ModeratorsArray.includes(`\`${m.presence == null ? `⚫ Offline` :  `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`} (${array.length < 1 ? `⚠️`: array.map(m => m).join(' ')})\` - (${m.user} - \`${Status}\`) \n> Last Message: ${data?.LastMessage == undefined ? `Invaild Message.` : `<t:${Math.floor(data.LastMessage/1000)}:R>`}`)) return;
                //           ModeratorsArray.push(`\`${m.presence == null ? `⚫ Offline` :  `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`} (${array.length < 1 ? `⚠️`: array.map(m => m).join(' ')})\` - (${m.user} - \`${Status}\`) \n> Last Message: ${data?.LastMessage == undefined ? `Invaild Message.` : `<t:${Math.floor(data.LastMessage/1000)}:R>`}`)
                //          }
                //   })

                //   Roverdev.guilds.cache.get("1081700920993259550").roles.cache.get("1005978927421980702").members.forEach(async m => {
                //     if (!m.roles.cache.has("920292440223662100")) {

                //       const data = await LastMessage.findOne({ Author: m.user.id })
                //       let Device = m?.presence?.clientStatus
                //       let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))
        
                //       if (Status == false) Status = `❌`
                //       if (Status == null) Status = `❌`
                //       if (Status == true) Status = `✅`
        
                //       let array = []
                //       array.length = 0
  
                //       if (Device?.desktop) array.push("🖥️")
                //       if (Device?.mobile)  array.push("📱")
                //       if (Device?.web) array.push("🕸️")
  
                //       if (Device == undefined) array.push("⚠️")        

                //           if (StaffArray.includes(`\`${m.presence == null ? `⚫ Offline` :  `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`} (${array.length < 1 ? `⚠️`: array.map(m => m).join(' ')}})\` - (${m.user} - \`${Status}\`) \n> Last Message: ${data?.LastMessage == undefined ? `Invaild Message.` : `<t:${Math.floor(data.LastMessage/1000)}:R>`}`)) return;
                //           StaffArray.push(`\`${m.presence == null ? `⚫ Offline` :  `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`} (${array.length < 1 ? `⚠️`: array.map(m => m).join(' ')})\` - (${m.user} - \`${Status}\`) \n> Last Message: ${data?.LastMessage == undefined ? `Invaild Message.` : `<t:${Math.floor(data.LastMessage/1000)}:R>`}`)
                //          }
                //   })
  
     setTimeout(() => {

      const MapData = `**Founders:**\n> ${FoundersArray.map(m => m.replace(`[object Object]`, "⚠️")).join("\n> ")}\n\n**Managers:**\n> ${ManagersArray.map(m => m.replace(`[object Object]`, "⚠️")).join("\n> ")}\n\n**Adminstrator's:**\n> ${AdminstratorArray.map(m => m.replace(`[object Object]`, "⚠️")).join("\n> ")} \n\n**Moderators:**\n> ${ModeratorsArray.map(m => m.replace(`[object Object]`, "⚠️")).join("\n> ")}\n\n**Staff Members:**\n> ${StaffArray.map(m => m.replace(`[object Object]`, "⚠️")).join("\n> ")}`
  
      embed.setDescription(MapData)
  
      msg.edit({ embeds: [embed], content: ` ` })
     }, 10000);
  }))
   }, 50000);
})


RoverdevAPI.login(StaffSystemToken)


setTimeout(() => {
  Roverdev.logger.info(require("colors").green(`Successfully Logged into ${RoverdevAPI.user.username}`))
}, 1000);
