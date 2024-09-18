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
  EmbedBuilder,
  AuditLogEvent
}  = require("discord.js")
const { MainBotToken } = require("./Configuration/Token")
const moment = require("moment")

const colors = require("colors")
colors.enable()

const Rover = new Client({
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
                 name: "Rover Bot - Remake",
                 type: ActivityType.Playing,
         }]
    }
})

Rover.StartBot = false
Rover.Loaded = true


Rover.logger = (data) => {
  let logstring = `${`Roverdev - Rover Bot Logger`.red} | ${`${moment().format("ddd DD-MM-YYYY HH:mm:ss.SSSS")}`.magenta}${` [RDV] `.rainbow}`
  if (typeof data == "string") {
    console.log(logstring, data.split("\n").map(d => `${d}`.green).join(`\n${logstring} `))
  } else if (typeof data == "object") {
    console.log(logstring, JSON.stringify(data, null, 3).green)
  } else if (typeof data == "boolean") {
    console.log(logstring, String(data).cyan)
  } else {
    console.log(logstring, data)
  }
};

const Handlers = require("fs").readdirSync("./Handlers").filter(f => f.endsWith(".js"))

let i = 0

try {
  const stringlength = 69;
  Rover.logger(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen, { label: "Roverdev" })
  Rover.logger(`┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen, { label: "Roverdev" })
  Rover.logger(`┃ `.bold.brightGreen + `Welcome to Roverdev Handler!`.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `Welcome to Roverdev Handler!`.length) + "┃".bold.brightGreen, { label: "Roverdev" })
  Rover.logger(`┃ `.bold.brightGreen + `  /-/ By https://roverdev.xyz /-/`.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `  /-/ By https://roverdev.xyz /-/`.length) + "┃".bold.brightGreen, { label: "Roverdev" })
  Rover.logger(`┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen, { label: "Roverdev" })
  Rover.logger(`┃ `.bold.brightGreen + `  /-/ Discord: discord.gg/roverdev /-/`.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `  /-/ By Discord: discord.gg/roverdev /-/`.length) + "   ┃".bold.brightGreen, { label: "Roverdev" })
  Rover.logger(`┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen, { label: "Roverdev" })
  Rover.logger(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen, { label: "Roverdev" })
} catch {
  /* */ }


  const commands = new Collection();
  Rover.cooldowns = new Collection();
  const aliases = new Collection();
  const slash = new Collection();
  Rover.container = {
     commands,
     aliases,
     slash
}

require("mongoose").set('strictQuery', true)

require("mongoose").connect(`mongodb://RoverdevUser:RoverdevPassword@135.148.142.6:27017/RoverBot?authSource=admin&readPreference=primary&ssl=false`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(connection => {
  Rover.logger(require("colors").green(`Mongo is Connected and Good to go!`))
  const loadHandlers = setInterval(function () {
    if (i == Handlers.length) {
      return clearInterval(loadHandlers)
  }
    if (Rover.Loaded == true) {
         require("./Handlers/" + Handlers[i])(Rover)
         i++
    } 
  })
})

process.on('unhandledRejection', (reason, p) => {
  console.log('\n\n\n\n\n=== unhandled Rejection ==='.toUpperCase().yellow.dim);
  console.log('Reason: ', reason.stack ? String(reason.stack).gray : String(reason).gray);
  console.log('=== unhandled Rejection ===\n\n\n\n\n'.toUpperCase().yellow.dim);

  const webhook = new WebhookClient({ url: "https://discord.com/api/webhooks/1077616545225781369/gzHvpJlarKwuybxeWaeRDz-aUgaaY1pNXc8AJ_xABf2H3bG4y6KpzRe5yNv7kkc4gvbN" })

  webhook.send({ username: `Rover - Error logs`, embeds: [
         new EmbedBuilder()
         .setColor("Red")
         .setTitle(`<:RoverRed:1076644915485872239> Rover Bot Had a Error:`)
         .setDescription(`\`\`\`yml\n${reason.stack ? String(reason.stack) : String(reason)}\`\`\``.replaceAll('/home/', ""))
  ] })
});
process.on("uncaughtException", (err, origin) => {
  console.log('\n\n\n\n\n\n=== uncaught Exception ==='.toUpperCase().yellow.dim);
  console.log('Exception: ', err.stack ? err.stack : err)
  console.log('=== uncaught Exception ===\n\n\n\n\n'.toUpperCase().yellow.dim);
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log('=== uncaught Exception Monitor ==='.toUpperCase().yellow.dim);
});



const StartRover = setInterval(function () {
      if (Rover.StartBot == true) {
        clearInterval(StartRover)

        Rover.login(MainBotToken).then((client) => {
        })
      } else if (Rover.StartBot == false) return;
}, 1000)
