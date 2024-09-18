const { Client, GatewayIntentBits, ActivityType, Partials } = require('discord.js');
const { Manager } = require('./structures/Manager'); // Make sure this path is correct
const fs = require("fs")
// Function to load the queue from a file

const queueFilePath = 'queue.json';

// Function to load the queue from a file
function loadQueue() {
    try {
      const data = fs.readFileSync(queueFilePath, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error loading queue:', err);
      return [];
    }
  }
  
  // Function to save the queue to a file
  function saveQueue(queue) {
    try {
      fs.writeFileSync(queueFilePath, JSON.stringify(queue, null, 2), 'utf8');
    } catch (err) {
      console.error('Error saving queue:', err);
    }
  }
  
  // Load the queue on bot startup
  let initialQueue = loadQueue();
  
  if (!Array.isArray(initialQueue)) {
    // Initialize as an empty array if not present or not an array
    initialQueue = [];
  }
  
  // Load the queue on bot startup

const botToken = ''; // Replace with your bot token

const bot = new Client({
    intents: [
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
],
partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User
],
allowedMentions: {
        parse: [
                "everyone",
                "roles",
                "users"
        ],
        repliedUser: false
},
presence: {
        status: "dnd",
        activities: [{
                name: "Roverdev 2024",
                type: ActivityType.Playing,
        }]
   }
});

bot



let manager = new Manager({
  nodes: [
    {
      host: 'node1.paradisehost.xyz',
      password: 'youshallnotpass',
      port: 27135,
      secure: false,
    },
  ],
  send(id, payload) {
    const guild = bot.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
}).on('nodeConnect', (node) => console.log(`Node Roverdev connected`)).on("queueEnd", (player) => {
    bot.channels.cache
      .get(player.textChannel)
      .send("Queue has ended.");

    player.destroy();
  })

  // Function to load the queue from a file

  // Function to load the queue from a file
  // Load the queue on bot startup

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

   bot.once('ready', async () => {
    manager.init(bot.user.id);
    bot.manager = manager;
  
  //   setTimeout(async () => {
  //      // Check if there's a song in the queue
  //   if (initialQueue.length > 0) {
  //     const connection = bot.guilds.cache.get("846548733914906664").members.me.voice.channel
  
  //     // if (!connection) {
  //     //   console.error('Bot is not in a voice channel.');
  //     //   return;
  //     // }
  
  //     // Get the first item in the queue
  //     const queueItem = initialQueue[0];
  
  //     // Join the voice channel
  //     const player = manager.create({
  //       guild: "846548733914906664",
  //       voiceChannel: "1143943591069233192",
  //       textChannel: queueItem.textChannelId,
  //     });

  //     const res = await bot.manager.search(queueItem.uri, "663442537222242306");
  
  //     player.connect();
  //     player.queue.add(res.tracks[0]);
  //     player.setVolume(50);
  
  //     // Play the song
  //     if (!player.playing && !player.paused && !player.queue.size) player.play();
  
  //     // Remove the first item from the queue
  //     initialQueue.shift();
  
  //     // Save the updated queue
  //     saveQueue(initialQueue);
  //   }
  //   }, 3000);
   });
  

bot.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const args = message.content.trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'play') {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      message.reply('You must be in a voice channel to use this command.');
      return;
    }

    const songUrl = args.join(' ');

    try {


      const res = await bot.manager.search(songUrl, message.author);



      const player = bot.manager.create({
        guild: message.guild.id,
        voiceChannel: voiceChannel.id,
        textChannel: message.channel.id,
      });

      player.connect();
      player.queue.add(res.tracks[0]);
      message.reply(`Enqueuing track ${res.tracks[0].title}.`);

      if (!player.playing && !player.paused && !player.queue.size) player.play();
      player.setVolume(50);

      if (
        !player.playing &&
        !player.paused &&
        player.queue.totalSize === res.tracks.length
      ) {
        player.play();
      }


      saveQueue([...initialQueue, ...player.queue, res.tracks[0]]);

    } catch (error) {
      console.error('Error playing track:', error);
      message.reply('An error occurred while playing the track.');
    }
  }
});

bot.on('raw', (ayo) => {
    manager.updateVoiceState(ayo)
})

  

bot.login(botToken);
