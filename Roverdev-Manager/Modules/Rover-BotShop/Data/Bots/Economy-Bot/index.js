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
     Collection,
   } = require('discord.js');
const { Technology } = require('./config/shop');
   

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
require("./logger")(client)
require("./Database/Database.js")(client)
client.arrayOfSlashCommands = [];
client.TotalCommands = [];
client.TotalPrefixCommands = [];
client.allevents = []

client.config = require("./config/config.json")

const commands = new Collection();
const aliases = new Collection();
const slash = new Collection();
client.container = {
    commands,
    aliases,
    slash
}

client.cooldowns = new Collection();

const files2 = require("fs").readdirSync('./Handler')
for (const file of files2) {
  require('./Handler/'+file)(client)
  client.logger.info(`Succesfully Loaded ${file}`, { label: 'Handlers' })
}
client.logger.info(`Succesfully Loaded ${files2.length} in Handlers`, { label: 'Handlers' })
client.categories = require("fs").readdirSync(`./Command`);

client.on("guildCreate", async guild => {
  client.settings.ensure(guild.id, { 
           Prefix: ""
   })
})

client.on("ready", async client => {
  await client.application.commands.set([]).catch(e => {})
})

client.on('warn', info => {
  client.logger.info({
    level: 'Warning',
    message: `: ${info}`,
    label: 'Bot Warning' 
  })
});
client.on('debug', info => {
  client.logger.info({
    level: 'Debug',
    message: `: ${info}`,
    label: 'Bot Debug' 
  })
});
client.on('rateLimit', info => {
  client.logger.info({
    level: 'info',
    message: `: ${info}`,
  })
});


client.login(require("./config/config.json").BotToken).then(() => {
    client.logger.info(`Succesfully Logged in to ${client.user.username}`, { label: 'Bot Status' })
})