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
const { BotAPIToken } = require("./Configuration/BotToken")
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
           status: "dnd",
           activities: [{
                   name: "Roverdev API System",
                   type: ActivityType.Playing,
           }]
      }
  })

  RoverdevAPI.login(BotAPIToken)

  setTimeout(() => {
    Roverdev.logger.info(require("colors").green(`Successfully Logged into ${RoverdevAPI.user.username}`))
  }, 1000);
