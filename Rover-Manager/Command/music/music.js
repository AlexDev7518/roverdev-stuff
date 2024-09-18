
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")

module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
              if (args[0] === 'play') {
                       const songurl = args.join(" ");

                       const res = await client.manager.search(
                        songurl,
                        message.author,
                      );

                      const player = client.manager.create({
                        guild: message.guild.id,
                        voiceChannel: message.member .voice.channel.id,
                        textChannel: message.channel.id,
                      });

                      player.connect();

                      player.queue.add(res.tracks[0]);

                      message.reply(`Enqueuing track ${res.tracks[0].title}.`);
                      
                      if (!player.playing && !player.paused && !player.queue.size)
                      player.play();
                      player.setVolume(50)
                
                    // For playlists you'll have to use slightly different if statement
                    if (
                      !player.playing &&
                      !player.paused &&
                      player.queue.totalSize === res.tracks.length
                    )
                      player.play();
              }

              if (args[0] === 'stop') {
                const player = client.manager.players.get(message.guild.id);

                if (!player) {
                  return message.reply({ content: `Nothing playing right now`})
             }

                if(player && player.queue) {
                          player.destroy();
                          return message.reply({ content: `Successfully Stopped the Song` })
                }
       }
         if (args[0] == "loop") {
                  const player = client.manager.players.get(message.guild.id);

                  if (!player) {
                    return message.reply({ content: `Nothing playing right now`})
                  }

                  player.setTrackRepeat(true)

                  return message.reply({ content: `Successfully Looped the Song` })
         }

         if (args[0] == "volume") {

                const Volume = args[1]

                   const player = client.manager.players.get(message.guild.id)

                   if (Number(Volume) <= 0 || Number(Volume) > 150) {
                              return message.reply({
                                       content: `Volume can Only be \`0 - 150\``
                              })
                   }

                   player.setVolume(Number(Volume));

                   return message.reply({  content: `Successfully Set the Volume as: \`${Volume}\`` })

                   
         }
}
module.exports.slashRun = async (interaction, client) => {
              if (interaction.options.getSubcommand() === 'play') {
                       const songurl = interaction.options.getString('songurl')

                       const res = await client.manager.search(
                        songurl,
                        interaction.user,
                      );

                      const player = client.manager.create({
                        guild: interaction.guild.id,
                        voiceChannel: interaction.member.voice.channel.id,
                        textChannel: interaction.channel.id,
                      });

                      player.connect();

                      player.queue.add(res.tracks[0]);

                      interaction.reply(`Enqueuing track ${res.tracks[0].title}.`);
                      
                      if (!player.playing && !player.paused && !player.queue.size)
                      player.play();
                      player.setVolume(50)
                
                    // For playlists you'll have to use slightly different if statement
                    if (
                      !player.playing &&
                      !player.paused &&
                      player.queue.totalSize === res.tracks.length
                    )
                      player.play();
              }

              if (interaction.options.getSubcommand() === 'stop') {
                const player = client.manager.players.get(interaction.guild.id);

                if (!player) {
                  return interaction.reply({ content: `Nothing playing right now`, ephemeral: true})
             }

                if(player && player.queue) {
                          player.destroy();
                          return interaction.reply({ content: `Successfully Stopped the Song` })
                }
       }
         if (interaction.options.getSubcommand() == "loop") {
                  const player = client.manager.players.get(interaction.guild.id);

                  if (!player) {
                    return interaction.reply({ content: `Nothing playing right now`, ephemeral: true})
                  }

                  player.setTrackRepeat(true)

                  return interaction.reply({ content: `Successfully Looped the Song` })
         }

         if (interaction.options.getSubcommand() == "volume") {

                const Volume = interaction.options.getInteger('number')

                   const player = client.manager.players.get(interaction.guild.id)

                   if (Number(Volume) <= 0 || Number(Volume) > 150) {
                              return interaction.reply({
                                       content: `Volume can Only be \`0 - 150\``
                              })
                   }

                   player.setVolume(Number(Volume));

                   return interaction.reply({  content: `Successfully Set the Volume as: \`${Volume}\`` })

                   
         }
}

module.exports.conf = {
    Prefix: {
        aliases: [],
        enabled: true,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: []   
     },
     Slash: {
        enabled: true,
        ownerOnly: false,
        AdminOnly: false,
        userPermissions: [],
        timeout: 5,
     }
}

module.exports.help = {
      Prefix: {
        name: "music",
        category: "music",
        cooldown: 2,
        usage: "nothing",
        description: "music commands",
      },
      Slash: {
        name: "music",
        description: "Roverdev Music commands",
        category: "music",
        options: [
            {
                name: "play",
                description: "play a song",
                type: ApplicationCommandOptionType.Subcommand,
                status: true,
                options: [
                    {
                        name: `songurl`,
                        description: `song you want to play`,
                        type: ApplicationCommandOptionType.String,
                        required: true,
                     },
                ]
              },
              {
                name: "volume",
                description: "change the volume",
                type: ApplicationCommandOptionType.Subcommand,
                status: true,
                options: [
                    {
                        name: `number`,
                        description: `volume to set the music as`,
                        type: ApplicationCommandOptionType.Integer,
                        required: true,
                     },
                ]
              },
              {
                name: "stop",
                description: "stop the music",
                type: ApplicationCommandOptionType.Subcommand,
                status: true,
              },
              {
                name: "loop",
                description: "loop the current song",
                type: ApplicationCommandOptionType.Subcommand,
                status: true,
              },
        ]
      }
}