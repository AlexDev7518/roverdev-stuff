
const { 
    Client, 
    GatewayIntentBits, 
    Partials, 
    ButtonBuilder, 
    ButtonStyle,
     ActionRowBuilder, 
     TextInputBuilder,
     EmbedBuilder,
     ActivityType,
     Collection
   } = require('discord.js');

const client = new Client({
    messageCacheLifetime: 60,
    fetchAllMembers: false,
    messageCacheMaxSize: 10,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    shards: "auto",
    allowedMentions: {
      parse: ["roles", "users", "everyone"],
      repliedUser: false,
    },
    partials: [
      Partials.Message, // for message
      Partials.Channel, // for text channel
      Partials.GuildMember, // for guild member
      Partials.Reaction, // for message reaction
      Partials.GuildScheduledEvent, // for guild events
      Partials.User, // for discord user
      Partials.ThreadMember, // for thread member
    ],
    intents: [
      GatewayIntentBits.Guilds, // for guild related things
      GatewayIntentBits.GuildMembers, // for guild members related things
      GatewayIntentBits.GuildBans, // for manage guild bans
     GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
      GatewayIntentBits.GuildIntegrations, // for discord Integrations
     GatewayIntentBits.GuildWebhooks, // for discord webhooks
     GatewayIntentBits.GuildInvites, // for guild invite managing
      GatewayIntentBits.GuildVoiceStates, // for voice related things
      GatewayIntentBits.GuildPresences, // for user presence things
      GatewayIntentBits.GuildMessages, // for guild messages things
      GatewayIntentBits.GuildMessageReactions, // for message reactions things
      GatewayIntentBits.GuildMessageTyping, // for message typing things
      GatewayIntentBits.DirectMessages, // for dm messages
      GatewayIntentBits.DirectMessageReactions, // for dm message reaction
      GatewayIntentBits.DirectMessageTyping, // for dm message typinh
      GatewayIntentBits.MessageContent, // enable if you need message content things
    ],
});

require("./Database/database")(client)

const ping = Math.round(client.ws.ping)
client.on("ready", async client => {
  const setups = client.settings.fetchEverything()
  const map = []
  map.push(setups)
})

  // commands
  client.categories = require("fs").readdirSync(`./CE-Commands`);
  // end
  const commands = new Collection();
  client.cooldowns = new Collection();
  const aliases = new Collection();
  const slash = new Collection();
  client.container = {
      commands,
      aliases,
      slash
  }

  client.on('warn', info => {
    console.log(`[WARN LOGGER] : ${info}`.white);
  });
  client.on('debug', info => {
    console.log(`[DEBUG LOGGER] : ${info}`.brightYellow);
  });
  client.on('rateLimit', info => {
    console.log(`[RATELIMIT LOGGER] : ${info}`.bold.red);
  });


  const files2 = require("fs").readdirSync('./CE-Handlers')
  for (const file of files2) {
    require('./CE-Handlers/'+file)(client)
    console.log(`[EXTRA EVENTS] Loaded: ${file}`)
  }



client.on("messageCreate", async message => {
  if (message.content == 'password') {
    message.delete();
    const VCchannel = message.guild.channels.cache.find(channel => channel.name === '┣🔊│Public');
    message.member.voice.setChannel(VCchannel).catch(err => console.log(err));
    message.channel.send({content: `${message.author} Succesfully Moved you to ${VCchannel}`})
}
})

client.on("guildCreate", async guild => {
  const embed = new EmbedBuilder()
  .setAuthor({ name: `Joined a Guild`, iconURL: "https://i.imgur.com/U7N7Sgn.png" })
  .addFields([
     { name: `Guild Info`, value: `>>> \`\`\`${guild.name} (${guild.id})\`\`\`` },
     { name: `Owner Info`, value: `>>> \`\`\`${`${client.users.cache.get(guild.ownerId).username} (${guild.ownerId})`}\`\`\`` },
     { name: `Member Count`, value: `>>> \`\`\`${guild.memberCount}\`\`\`` },
  ])
  .setColor("DarkRed")


  client.channels.fetch("1008517626407948318").then(user => {
      user.send({ embeds: [embed] }).catch(() => {})
    }).catch(() => {});

     client.settings.ensure(guild.id, {
        "JTC1-channel": "",
        "JTC1-Category": "",
        "JTC1-Logger": "",
        "JTC1-LogMessage": "",
        "JTC1-Moderator": "",
        //JTC 2
        "JTC2-channel": "",
        "JTC2-Category": "",
        "JTC2-Logger": "",
        "JTC2-LogMessage": "",
        "JTC2-Moderator": "",
        //JTC 3
        "JTC3-channel": "",
        "JTC3-Category": "",
        "JTC3-Logger": "",
        "JTC3-LogMessage": "",
        "JTC3-Moderator": "",
        //JTC 4
        "JTC4-channel": "",
        "JTC4-Category": "",
        "JTC4-Logger": "",
        "JTC4-LogMessage": "",
        "JTC4-Moderator": "",
        //JTC 5
        "JTC5-channel": "",
        "JTC5-Category": "",
        "JTC5-Logger": "",
        "JTC5-LogMessage": "",
        "JTC5-Moderator": "",
     })
     const settings = client.settings.get(guild.id)
     console.log(settings)
})

client.on("guildDelete", async guild => {
  const embed = new EmbedBuilder()
  .setAuthor({ name: `Left a Guild`, iconURL: "https://i.imgur.com/U7N7Sgn.png" })
  .addFields([
     { name: `Guild Info`, value: `>>> \`\`\`${guild.name} (${guild.id})\`\`\`` },
     { name: `Owner Info`, value: `>>> \`\`\`${`${client.users.cache.get(guild.ownerId).username} (${guild.ownerId})`}\`\`\`` },
     { name: `Member Count`, value: `>>> \`\`\`${guild.memberCount}\`\`\`` },
  ])
  .setColor("DarkRed")


  client.channels.fetch("1008517626407948318").then(user => {
      user.send({ embeds: [embed] }).catch(() => {})
    }).catch(() => {});
    client.settings.delete(guild.id)
})

 client.config = require("./config/config.json")



client.login(client.config.BotToken);
