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
const { BotAPIToken, StaffSystemToken, AntiNukeSystem } = require("./Configuration/BotToken")
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
         status: "invisible",
    }
})


RoverdevAPI.on(Events.ClientReady, async Roverdev => {
   return RoverdevAPI.channels.cache.get("1068664609826930688").send({ content: `Successfully Booted.` })
})


RoverdevAPI.login(AntiNukeSystem)


setTimeout(() => {
  Roverdev.logger.info(require("colors").green(`Successfully Logged into ${RoverdevAPI.user.username}`))
}, 1000);
