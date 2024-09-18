const { EmbedBuilder, Events } = require("discord.js");

module.exports = async Roverdev => {

  Roverdev.on(Events.ClientReady, async () => {
    await Roverdev.channels.fetch("1113905307966517371").then(async (msgs) => await msgs.messages.fetch("1204214375171366963").then(async (msg) => {
      const embed = new EmbedBuilder()
        .setAuthor({ name: `Roverdev - Staff Status`, iconURL: Roverdev.user.displayAvatarURL() })
        .setColor("Green")
      //   .setDescription(`${Roverdev.guilds.cache.get("1081700920993259550").roles.cache.get("1005978927421980702").members.map(async m => {
      //      `\`${m.presence == null ? `⚫ Offline` :  `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ Offline` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}\` - (${m.user} | \`${m.user.tag.replace(/ /g, '').replace("!", "").replace("!", "")}\``
      //   }
      //  ).join("\n")}`)

      let FoundersArray = []
      let CodersArray = []
      let ManagersArray = []
      let AdminstratorArray = []
      let ModeratorsArray = []
      let StaffArray = []

      /**
   * @Founders
   */

      Roverdev.guilds.cache.get("846548733914906664").roles.cache.get("1085499793310228542").members.forEach(async m => {

        let Device = m?.presence?.clientStatus
        let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))

        if (Status == false) Status = `❌`
        if (Status == null) Status = `❌`
        if (Status == true) Status = `✅`

        let array = []
        array.length = 0

        if (Device?.desktop) array.push("🖥️")
        if (Device?.mobile) array.push("📱")
        if (Device?.web) array.push("🕸️")

        if (Device == undefined && m.presence !== null) array.push("⚠️")

        FoundersArray.push(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Invisible` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)
      })


      Roverdev.guilds.cache.get("846548733914906664").roles.cache.get("1085657614639177800").members.forEach(async m => {
        if (!m.roles.cache.has("1085499793310228542")) {


          let Device = m?.presence?.clientStatus
          let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))

          if (Status == false) Status = `❌`
          if (Status == null) Status = `❌`
          if (Status == true) Status = `✅`


          let array = []
          array.length = 0

          if (Device?.desktop) array.push("🖥️")
          if (Device?.mobile) array.push("📱")
          if (Device?.web) array.push("🕸️")

          if (Device == undefined && m.presence !== null) array.push("⚠️")

          if (ManagersArray.includes(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)) return;
          ManagersArray.push(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)
        }
      })

      Roverdev.guilds.cache.get("846548733914906664").roles.cache.get("1139637119946600468").members.forEach(async m => {
        if (!m.roles.cache.has("1085657614639177800")) {


          let Device = m?.presence?.clientStatus
          let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))

          if (Status == false) Status = `❌`
          if (Status == null) Status = `❌`
          if (Status == true) Status = `✅`


          let array = []
          array.length = 0

          if (Device?.desktop) array.push("🖥️")
          if (Device?.mobile) array.push("📱")
          if (Device?.web) array.push("🕸️")

          if (Device == undefined && m.presence !== null) array.push("⚠️")

          if (CodersArray.includes(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)) return;
          CodersArray.push(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)
        }
      })

      Roverdev.guilds.cache.get("846548733914906664").roles.cache.get("1085499892010582036").members.forEach(async m => {
        if (!m.roles.cache.has("1085657614639177800")) {


          let Device = m?.presence?.clientStatus
          let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))

          if (Status == false) Status = `❌`
          if (Status == null) Status = `❌`
          if (Status == true) Status = `✅`


          let array = []
          array.length = 0

          if (Device?.desktop) array.push("🖥️")
          if (Device?.mobile) array.push("📱")
          if (Device?.web) array.push("🕸️")

          if (Device == undefined && m.presence !== null) array.push("⚠️")

          if (AdminstratorArray.includes(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)) return;
          AdminstratorArray.push(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)
        }
      })


      Roverdev.guilds.cache.get("846548733914906664").roles.cache.get("1085499932682764298").members.forEach(async m => {
        if (!m.roles.cache.has("1085499892010582036")) {


          let Device = m?.presence?.clientStatus
          let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))

          if (Status == false) Status = `❌`
          if (Status == null) Status = `❌`
          if (Status == true) Status = `✅`


          let array = []
          array.length = 0

          if (Device?.desktop) array.push("🖥️")
          if (Device?.mobile) array.push("📱")
          if (Device?.web) array.push("🕸️")

          if (Device == undefined && m.presence !== null) array.push("⚠️")

          if (AdminstratorArray.includes(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)) return;
          AdminstratorArray.push(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)
        }
      })

      Roverdev.guilds.cache.get("846548733914906664").roles.cache.get("1085500789482590279").members.forEach(async m => {
        if (!m.roles.cache.has("1085499932682764298")) {


          let Device = m?.presence?.clientStatus
          let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))

          if (Status == false) Status = `❌`
          if (Status == null) Status = `❌`
          if (Status == true) Status = `✅`


          let array = []
          array.length = 0

          if (Device?.desktop) array.push("🖥️")
          if (Device?.mobile) array.push("📱")
          if (Device?.web) array.push("🕸️")

          if (Device == undefined && m.presence !== null) array.push("⚠️")

          if (ModeratorsArray.includes(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)) return;
          ModeratorsArray.push(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)
        }
      })

      Roverdev.guilds.cache.get("846548733914906664").roles.cache.get("1085500041969532968").members.forEach(async m => {
        if (!m.roles.cache.has("1085500789482590279")) {


          let Device = m?.presence?.clientStatus
          let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))

          if (Status == false) Status = `❌`
          if (Status == null) Status = `❌`
          if (Status == true) Status = `✅`


          let array = []
          array.length = 0

          if (Device?.desktop) array.push("🖥️")
          if (Device?.mobile) array.push("📱")
          if (Device?.web) array.push("🕸️")

          if (Device == undefined && m.presence !== null) array.push("⚠️")

          if (ModeratorsArray.includes(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)) return;
          ModeratorsArray.push(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)
        }
      })

      Roverdev.guilds.cache.get("846548733914906664").roles.cache.get("1085500062706172074").members.forEach(async m => {
        if (!m.roles.cache.has("1085500041969532968")) {


          let Device = m?.presence?.clientStatus
          let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))

          if (Status == false) Status = `❌`
          if (Status == null) Status = `❌`
          if (Status == true) Status = `✅`


          let array = []
          array.length = 0

          if (Device?.desktop) array.push("🖥️")
          if (Device?.mobile) array.push("📱")
          if (Device?.web) array.push("🕸️")

          if (Device == undefined && m.presence !== null) array.push("⚠️")

          if (StaffArray.includes(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)) return;
          StaffArray.push(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)
        }
      })

      setTimeout(() => {

        ManagersArray.length < 1 ? ManagersArray.push(`No Managers`) : ""

        const MapData = `**Founders:**\n> ${FoundersArray.map(m => m.replace(`[object Object]`, "⚠️")).join("\n> ")}\n\n**Managers:**\n> ${ManagersArray.map(m => String(m).replace(`[object Object]`, "⚠️")).join("\n> ")}\n\n**Coders:**\n> ${CodersArray.map(m => String(m).replace(`[object Object]`, "⚠️")).join("\n> ")}\n\n**Adminstrator's:**\n> ${AdminstratorArray.map(m => m.replace(`[object Object]`, "⚠️")).join("\n> ")} \n\n**Moderators:**\n> ${ModeratorsArray.map(m => m.replace(`[object Object]`, "⚠️")).join("\n> ")}\n\n**Staff Members:**\n> ${StaffArray.map(m => m.replace(`[object Object]`, "⚠️")).join("\n> ")}`

        embed.setDescription(MapData)

        msg.edit({ embeds: [embed], content: ` ` })
      }, 10000);
    }))
  })

  setInterval(async () => {
    await Roverdev.channels.fetch("1113905307966517371").then(async (msgs) => await msgs.messages.fetch("1204214375171366963").then(async (msg) => {
      const embed = new EmbedBuilder()
        .setAuthor({ name: `Roverdev - Staff Status`, iconURL: Roverdev.user.displayAvatarURL() })
        .setColor("Green")
      //   .setDescription(`${Roverdev.guilds.cache.get("1081700920993259550").roles.cache.get("1005978927421980702").members.map(async m => {
      //      `\`${m.presence == null ? `⚫ Offline` :  `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ Offline` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}\` - (${m.user} | \`${m.user.tag.replace(/ /g, '').replace("!", "").replace("!", "")}\``
      //   }
      //  ).join("\n")}`)

      let FoundersArray = []
      let CodersArray = []
      let ManagersArray = []
      let AdminstratorArray = []
      let ModeratorsArray = []
      let StaffArray = []

      /**
   * @Founders
   */


      Roverdev.guilds.cache.get("846548733914906664").roles.cache.get("1085499793310228542").members.forEach(async m => {

        let Device = m?.presence?.clientStatus
        let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))

        if (Status == false) Status = `❌`
        if (Status == null) Status = `❌`
        if (Status == true) Status = `✅`

        let array = []
        array.length = 0

        if (Device?.desktop) array.push("🖥️")
        if (Device?.mobile) array.push("📱")
        if (Device?.web) array.push("🕸️")

        if (Device == undefined && m.presence !== null) array.push("⚠️")

        FoundersArray.push(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Invisible` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)
      })


      Roverdev.guilds.cache.get("846548733914906664").roles.cache.get("1085657614639177800").members.forEach(async m => {
        if (!m.roles.cache.has("1085499793310228542")) {


          let Device = m?.presence?.clientStatus
          let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))

          if (Status == false) Status = `❌`
          if (Status == null) Status = `❌`
          if (Status == true) Status = `✅`


          let array = []
          array.length = 0

          if (Device?.desktop) array.push("🖥️")
          if (Device?.mobile) array.push("📱")
          if (Device?.web) array.push("🕸️")

          if (Device == undefined && m.presence !== null) array.push("⚠️")

          if (ManagersArray.includes(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)) return;
          ManagersArray.push(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)
        }
      })

      Roverdev.guilds.cache.get("846548733914906664").roles.cache.get("1139637119946600468").members.forEach(async m => {
        if (!m.roles.cache.has("1085657614639177800")) {


          let Device = m?.presence?.clientStatus
          let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))

          if (Status == false) Status = `❌`
          if (Status == null) Status = `❌`
          if (Status == true) Status = `✅`


          let array = []
          array.length = 0

          if (Device?.desktop) array.push("🖥️")
          if (Device?.mobile) array.push("📱")
          if (Device?.web) array.push("🕸️")

          if (Device == undefined && m.presence !== null) array.push("⚠️")

          if (CodersArray.includes(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)) return;
          CodersArray.push(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)
        }
      })

      Roverdev.guilds.cache.get("846548733914906664").roles.cache.get("1085499892010582036").members.forEach(async m => {
        if (!m.roles.cache.has("1085657614639177800")) {


          let Device = m?.presence?.clientStatus
          let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))

          if (Status == false) Status = `❌`
          if (Status == null) Status = `❌`
          if (Status == true) Status = `✅`


          let array = []
          array.length = 0

          if (Device?.desktop) array.push("🖥️")
          if (Device?.mobile) array.push("📱")
          if (Device?.web) array.push("🕸️")

          if (Device == undefined && m.presence !== null) array.push("⚠️")

          if (AdminstratorArray.includes(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)) return;
          AdminstratorArray.push(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)
        }
      })


      Roverdev.guilds.cache.get("846548733914906664").roles.cache.get("1085499932682764298").members.forEach(async m => {
        if (!m.roles.cache.has("1085499892010582036")) {


          let Device = m?.presence?.clientStatus
          let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))

          if (Status == false) Status = `❌`
          if (Status == null) Status = `❌`
          if (Status == true) Status = `✅`


          let array = []
          array.length = 0

          if (Device?.desktop) array.push("🖥️")
          if (Device?.mobile) array.push("📱")
          if (Device?.web) array.push("🕸️")

          if (Device == undefined && m.presence !== null) array.push("⚠️")

          if (AdminstratorArray.includes(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)) return;
          AdminstratorArray.push(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)
        }
      })

      Roverdev.guilds.cache.get("846548733914906664").roles.cache.get("1085500789482590279").members.forEach(async m => {
        if (!m.roles.cache.has("1085499932682764298")) {


          let Device = m?.presence?.clientStatus
          let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))

          if (Status == false) Status = `❌`
          if (Status == null) Status = `❌`
          if (Status == true) Status = `✅`


          let array = []
          array.length = 0

          if (Device?.desktop) array.push("🖥️")
          if (Device?.mobile) array.push("📱")
          if (Device?.web) array.push("🕸️")

          if (Device == undefined && m.presence !== null) array.push("⚠️")

          if (ModeratorsArray.includes(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)) return;
          ModeratorsArray.push(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)
        }
      })

      Roverdev.guilds.cache.get("846548733914906664").roles.cache.get("1085500041969532968").members.forEach(async m => {
        if (!m.roles.cache.has("1085500789482590279")) {


          let Device = m?.presence?.clientStatus
          let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))

          if (Status == false) Status = `❌`
          if (Status == null) Status = `❌`
          if (Status == true) Status = `✅`


          let array = []
          array.length = 0

          if (Device?.desktop) array.push("🖥️")
          if (Device?.mobile) array.push("📱")
          if (Device?.web) array.push("🕸️")

          if (Device == undefined && m.presence !== null) array.push("⚠️")

          if (ModeratorsArray.includes(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)) return;
          ModeratorsArray.push(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)
        }
      })

      Roverdev.guilds.cache.get("846548733914906664").roles.cache.get("1085500062706172074").members.forEach(async m => {
        if (!m.roles.cache.has("1085500041969532968")) {


          let Device = m?.presence?.clientStatus
          let Status = m.presence && m.presence.activities.some(({ state }) => state?.includes(`.gg/roverdev`))

          if (Status == false) Status = `❌`
          if (Status == null) Status = `❌`
          if (Status == true) Status = `✅`


          let array = []
          array.length = 0

          if (Device?.desktop) array.push("🖥️")
          if (Device?.mobile) array.push("📱")
          if (Device?.web) array.push("🕸️")

          if (Device == undefined && m.presence !== null) array.push("⚠️")

          if (StaffArray.includes(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)) return;
          StaffArray.push(`\`${m.presence == null ? `⚫ Offline` : `${m.presence.status == "online" ? `🟢 Online` : `${m.presence.status == "dnd" ? `🔴 DND` : `${m.presence.status == "idle" ? `🌙 Idle` : `${m.presence.status == "invisible" ? `⚫ invisible` : `${m.presence.status == "offline" ? `⚫ Offline` : `🟠Error`}`}`}`}`}`}${array.length < 1 ? `` : ` (${array.map(m => m).join(' ')})`}\` - (${m.user})`)
        }
      })

      setTimeout(() => {

        ManagersArray.length < 1 ? ManagersArray.push(`No Managers`) : ""

        const MapData = `**Founders:**\n> ${FoundersArray.map(m => m.replace(`[object Object]`, "⚠️")).join("\n> ")}\n\n**Managers:**\n> ${ManagersArray.map(m => String(m).replace(`[object Object]`, "⚠️")).join("\n> ")}\n\n**Coders:**\n> ${CodersArray.map(m => String(m).replace(`[object Object]`, "⚠️")).join("\n> ")}\n\n**Adminstrator's:**\n> ${AdminstratorArray.map(m => m.replace(`[object Object]`, "⚠️")).join("\n> ")} \n\n**Moderators:**\n> ${ModeratorsArray.map(m => m.replace(`[object Object]`, "⚠️")).join("\n> ")}\n\n**Staff Members:**\n> ${StaffArray.map(m => m.replace(`[object Object]`, "⚠️")).join("\n> ")}`

        embed.setDescription(MapData)

        msg.edit({ embeds: [embed], content: ` ` })
      }, 10000);
    }))
  }, 50000);
}