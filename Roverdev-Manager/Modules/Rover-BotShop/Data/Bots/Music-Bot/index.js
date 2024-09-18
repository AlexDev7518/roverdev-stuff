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
   Discord,
   AttachmentBuilder
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
require("./logger")(client)

client.on("ready", async client => {
  await client.application.commands.set([]).catch(e => {})
})

process.on('unhandledRejection', (reason, p) => {
  console.log('\n\n\n\n\n=== unhandled Rejection ==='.toUpperCase().yellow.dim);
  console.log('Reason: ', reason.stack ? String(reason.stack).gray : String(reason).gray);
  console.log('=== unhandled Rejection ===\n\n\n\n\n'.toUpperCase().yellow.dim);
});
process.on("uncaughtException", (err, origin) => {
  console.log('\n\n\n\n\n\n=== uncaught Exception ==='.toUpperCase().yellow.dim);
  console.log('Exception: ', err.stack ? err.stack : err)
  console.log('=== uncaught Exception ===\n\n\n\n\n'.toUpperCase().yellow.dim);
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log('=== uncaught Exception Monitor ==='.toUpperCase().yellow.dim);
});

const files2 = require("fs").readdirSync('./Handler')
for (const file of files2) {
  require('./Handler/'+file)(client)
  client.logger.info(`Succesfully Loaded ${file}`, { label: 'Handlers' })
}
client.logger.info(`Succesfully Loaded ${files2.length} in Handlers`, { label: 'Handlers' })

const commands = new Collection();
const aliases = new Collection();
const slash = new Collection();
client.container = {
    commands,
    aliases,
    slash
}

client.arrayOfSlashCommands = [];
client.TotalCommands = [];
client.TotalPrefixCommands = [];
client.allevents = []

client.config = require("./config/config")

client.on('warn', info => {
  client.logger.info(`: ${info}`.white, { label: 'Warn' });
});
client.on('debug', info => {
  client.logger.info(`: ${info}`.brightYellow, { label: 'Debug' });
});
client.on('rateLimit', info => {
  client.logger.info(`: ${info}`.bold.red, { label: 'rateLimit' });
});

client.login(require("./config/config.json").BotToken).then(() => {
  client.logger.info(`Succesfully Logged in to ${client.user.username}`, { label: 'Bot Status' })
})