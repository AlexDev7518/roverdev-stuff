const { EmbedBuilder } = require("discord.js")

  module.exports = {
      name: "ping",
      category: "info",
      aliases: ["latency"],
      cooldown: 2,
      usage: "ping",
      description: "Bot Ping",
      guildOnly: false,

      run: async (client, message, args, cmdUser,prefix) => {
        const si = require("systeminformation")
        let memdata = await si.mem();
        const pretty = require("prettysize")
        const netdata = await si.networkStats();
          const embed = new EmbedBuilder()
          .setTitle(`Pinging / Geting Stats of  bot...`)
          .setColor("Yellow")
          message.reply({embeds: [embed]}).then((msg) => {
              setTimeout(() => {
                msg.edit(
                    {
                        embeds: [
                            new EmbedBuilder()
                            .setTitle(`${client.user.username} | Uptime: : <t:${Math.floor(Date.now() / 1000 - client.uptime / 1000)}:R>`)
                            .setDescription(`
\`\`\`md
# Bot Ping: ${Math.round(client.ws.ping)}ms
# Discord API Ping: ${message.createdTimestamp - message.createdTimestamp}ms
\`\`\`
\`\`\`fix
-> Network:
Ping: ${Math.round(netdata[0].ms)}ms\nUp: ${pretty(netdata[0].tx_sec)}/s\nDown: ${pretty(netdata[0].rx_sec)}/s\n\nTotal Up: ${pretty(netdata[0].tx_bytes)}\nTotal Down: ${pretty(netdata[0].rx_bytes)}
-> RAM:
Available: ${pretty(memdata.total)}\nMemory Used: ${pretty(memdata.active)}
\`\`\`
\`\`\`arm
Bot_Developer: AlexDev#7518
\`\`\`
BOT / SERVER INFOMATION:
\`\`\`yaml
Discord.js Version: ${require("discord.js").version}
Server Verison: ${process.version}
Platform: ${process.platform} ${process.arch}
Commands: ${client.container.commands.size}
Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB
\`\`\`
                            `)
                            .setFooter({ text: `${client.user.username} | Hosting: Bero-host.de` })
                            .setColor("Orange")
                        ]
                    }
                )
              }, 800);
          })          
      }
  }