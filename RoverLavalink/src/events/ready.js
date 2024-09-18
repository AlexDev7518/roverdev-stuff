const { EmbedBuilder, resolveColor } = require("discord.js");
const { ActivityType } = require("discord.js");
const config = require("../config.js");
const moment = require("moment");
require("moment-duration-format");
const prettyBytes = require("pretty-bytes");
const colors = require("colors");

const arrayChunker = (array, chunkSize = 5) => {
    let chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) chunks.push(array.slice(i, i + chunkSize));
    return chunks;
}

module.exports = async (client) => {
  const channel = await client.channels.fetch(config.channel);
  const embed = new EmbedBuilder()
    .setColor(resolveColor("#2F3136"))
    .setDescription("Fetching Stats From Roverdev Lavalink");

  channel.bulkDelete(1);
  channel.send({ embeds: [embed] }).then((msg) => {
    setInterval(() => {
      let all = [];

      client.manager.nodes.forEach((node) => {
        let color;

        if (!node.connected) color = "-";
        else color = "+";

        let info = [];
        info.push(`Roverdev Lavalink Host Info Below`);
        info.push(`${color} Node: ${node.options.host}`);
        info.push(`${color} Password: ${node.options.password}`);
        info.push(`${color} Port: ${node.options.port}`);
        info.push(`\n`);
        info.push(`Roverdev Lavalink Status Info Below`);
        info.push(`${color} Status: ${node.connected ? "Connected [🟢]" : "Disconnected [🔴]"}`);
        info.push(`${color} Player: ${node.stats.players}`);
        info.push(`${color} Used Player: ${node.stats.playingPlayers}`);
        info.push(`${color} Uptime: ${moment.duration(node.stats.uptime).format(" d [days], h [hours], m [minutes], s [seconds]")}`);
        info.push(`${color} Cores: ${node.stats.cpu.cores} Core(s)`);
        info.push(`${color} Memory Usage: ${prettyBytes(node.stats.memory.used)}/${prettyBytes(node.stats.memory.reservable)}`);
        info.push(`${color} System Load: ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%`);
        info.push(`${color} Lavalink Load: ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%`);
        all.push(info.join("\n"));
      });
        
      const chunked = arrayChunker(all, 8);
      const statusembeds = [];

      chunked.forEach(data => {
        const rembed = new EmbedBuilder()
      	.setColor(resolveColor("#2F3136"))
      	.setAuthor({
          name: `Monitoring Roverdev Lavalink Status`,
          iconURL: client.user.displayAvatarURL({ forceStatic: false }),
      	})
      	.setDescription(`\`\`\`diff\n${data.join("\n\n")}\`\`\``)
      	.setFooter({
      	  text: "Last Update",
      	})
      	.setTimestamp(Date.now());
      	statusembeds.push(rembed)
      })

      msg.edit({ embeds: statusembeds });
    }, 60000);
  });

  client.manager.init(client.user.id);
  //New Multi-Status For LavaLink Bot
  const statuses = [
    "LavaLink Status",
    "Fastest LavaLink Ever",
    "Hosted by: roverdev",
    "discord.gg/roverdev",
    // "", <Another Status
]

setInterval(() => {
  const CurrentStatus = statuses[Math.floor(Math.random() * statuses.length)]

  client.user.setPresence({
        status: "online",
        activities: [{
               name: CurrentStatus,
               type: ActivityType.Watching,
               
        }]
  })
}, 20000);


  console.log(colors.green(`[CLIENT] ${client.user.username} is now Online!`));
};







// > Old Status For The Bot

  // client.user.setPresence({
  //   status: "online",
  //   activities: [
  //     {
  //       name: "Lavalink Status",
  //       type: ActivityType.Watching,
  //     },
  //   ],
  // });




  // > New Bot Status <

//   const statuses = [
//     "LavaLink Status",
//     "Fastest LavaLink Ever",
//     "Hosted by: roverdev",
//     "discord.gg/roverdev",
//     // "",
// ]

// setInterval(() => {
//   const CurrentStatus = statuses[Math.floor(Math.random() * statuses.length)]

//   client.user.setPresence({
//         status: "online",
//         activities: [{
//                name: CurrentStatus,
//                type: ActivityType.Watching,
               
//         }]
//   })
// }, 20000);