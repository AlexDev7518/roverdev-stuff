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
const { BotToken } = require("./Configuration/BotToken") 
const InviteSystem = require("./Databases/Schema/Invite-System")
const colors = require("colors")
const BotConfig = require("./Databases/Schema/Shop/BotConfig")
const { EmbedColor } = require("./Configuration/EmbedConfig")
colors.enable()

const Roverdev = new Client({
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
           status: "online",
           activities: [{
                   name: "Roverdev 2023",
                   type: ActivityType.Playing,
           }]
      }
  })

  Roverdev.on(Events.InteractionCreate, async interaction => {
         interaction.channel.setName("")
  })


  Roverdev.on(Events.MessageCreate, async message => {
          // if (message.content.includes("discowd")) return message.delete()
          // if (message.content.includes(":alexdev:")) return message.delete()
  })


  Roverdev.Disabledcategorys = []


  require("./Roverdev")(Roverdev)

  Roverdev.on(Events.MessageCreate, async (message) => {

     if (message.author.id !== "663442537222242306") return
 
     if (message.content == "r?closeall") {
             const msg = await message.reply({
                  embeds: [
                     new EmbedBuilder()
                     .setAuthor({ name: `Now Deleteing All: ${Roverdev.channels.cache.get("1040996273546866708").children.cache.size} Tickets`, iconURL: "https://cdn.discordapp.com/emojis/1032236793812242473.gif?size=96&quality=lossless" })
                     .setColor("Yellow")
                  ]
             })
 
             setTimeout(() => {
               Roverdev.channels.cache.get("1040996273546866708").children.cache.forEach(channel => channel.delete()) 
 
                   msg.edit({ embeds: [
                         new EmbedBuilder()
                         .setAuthor({ name: `Sucessfully Deleted: ${Roverdev.channels.cache.get("1040996273546866708").children.cache.size} Tickets!`, iconURL: "https://cdn.discordapp.com/emojis/1044448625956241550.gif" })
                         .setColor("Green")
                   ] })
             }, 5000);
     
          }
 })

//  Roverdev.on(Events.MessageCreate, async (message) => {
//        if (!message.author.bot) {

//           if (message.channel.id == "1040974633077317662") return
//           if (message.content.includes("discord.gg/roverdev")) return
//           if (message.channel.id !== "1040974597589303379") return

//              if (message.content.includes("discord.com") || message.content.includes("discord.gg") || message.content.includes("dsc.gg")) {
//                message.delete().then((msg => {
//                     return message.channel.send({ content: `${message.author} Don't post discord invites!` }).then((msg) => setTimeout(() => {
//                              msg.delete()
//                     }, 20000))
//               }))
//              }
//        }
//  })

  const client = Roverdev
  const bot = Roverdev

Roverdev.setMaxListeners(25);
 require('events').defaultMaxListeners = 25;

 Roverdev.on(Events.GuildBanAdd, async (ban) => {
          console.log(ban.reason)
 })

 Roverdev.on(Events.MessageReactionAdd, async (reaction, user) => {
        console.log(`${user.username} reacted to ${reaction.message.id} with ${reaction.emoji}`)
 })
 Roverdev.on(Events.MessageReactionRemove, async (reaction, user) => {
     console.log(`${user.username} remove reaction to ${reaction.message.id} with ${reaction.emoji}`)
})

Roverdev.on(Events.MessageCreate, async message => {
     message?.stickers?.forEach(m => console.log(m.url))
})

Roverdev.on(Events.ClientReady, async Roverdev => {
     require("./StaffSystem")
})

require("./Roverdev")(Roverdev)


  require("./Website/index")(client)
  require("./logger")(client)

  module.exports = {
      client, bot, Roverdev, GiveBoosterPerks
  }
  const commands = new Collection();

  Roverdev.cooldowns = new Collection();

  Roverdev.cooldowns = new Collection();
  const aliases = new Collection();
  const slash = new Collection();
  Roverdev.container = {
     commands,
     aliases,
     slash
}

  let BotReady = false
  
  let dateNow = Date.now();

  const waiting1 = setInterval(function () {
      if (client.Loading == false) {
           return
      } else if (client.Loading == true) {
           clearInterval(waiting1)
           setTimeout(() => {
               client.logger.info(`======================================`, { label: "Handlers" })
            }, 3000);
      }
  }, 1000)


  const Handlers = require("fs").readdirSync("./Handlers").filter(f => f.endsWith(".js"))

  Handlers.forEach(file => {
     const waiting2 = setInterval(function () {
          if (client.Loading == false) {
               return;
          } else if (client.Loading == true) {
               clearInterval(waiting2)
               setTimeout(() => {
                    client.logger.info(`Sucessfully Loaded ${file} After: ${Date.now() - dateNow}ms`, { label: "Handlers" })
                }, 4000);
          }
      }, 1000)
       try {
            require(`./Handlers/${file}`)(Roverdev)
       } catch {
            try {
                 require(`./Handlers/${file}`)(client)
            } catch {
                 try {
                    require(`./Handlers/${file}`)(bot)
                 } catch {
                    require(`./Handlers/${file}`)
                 }
            }
       }
  })

  Roverdev.on(Events.GuildMemberAdd, async member => {

            if (member.user.bot) {
                     const data = await BotConfig.findOne({ Bot: member.user.id })

                     member.roles.add("1006310738656247818")
                     member.roles.add("1075666797958791168")

                     Roverdev.users.cache.get(data.BotOwner).send({ embeds: [
                               new EmbedBuilder()
                               .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                               .setColor(EmbedColor)
                               .setDescription(`Heya! Your Bot: <@${data.Bot}> Just got invited to Roverdev Community! So now it can use emojis`)
                     ] })

                     const guild = Roverdev.guilds.cache.get("1081700920993259550")

                     let logs = await guild.fetchAuditLogs()
                     logs = logs.entries.filter(e => e.action === AuditLogEvent.BotAdd)
                     let user = logs.find(l => l.target?.id === member.user.id)?.executor

                     Roverdev.channels.cache.get(`1068659194896584804`).send({
                             embeds: [
                              new EmbedBuilder()
                              .setAuthor({ name: `Bot Shop System | Roverdev Community`, iconURL: Roverdev.user.displayAvatarURL() },)
                              .setColor(EmbedColor)
                              .setDescription(`Successfully Invited (<@${data.Bot}> | \`${member.user.tag}\`) to Roverdev Community!\n> Action By: ${user}`) 
                             ]
                     })
            }
  })

  const waiting3 = setInterval(function () {
     if (client.Loading == false) {
          return;
     } else if (client.Loading == true) {
          clearInterval(waiting3)
          setTimeout(() => {
               client.logger.info(`======================================`, { label: "Handlers" })
               client.logger.info(require("colors").cyan(`Loaded the ${Handlers.length} Handlers after: ${Date.now() - dateNow}ms`), { label: "Handlers" })
          
               BotReady += true
           }, 5000);
     }
 }, 1000)

  
  const waiting = setInterval(function() {
      if (BotReady == false) {
            return;
      } else if (BotReady == true) {
           clearInterval(waiting)
           client.logger.info(require('colors').green(`Bot is Ready to go`), { label: "Bot Starter" })
           Roverdev.login(BotToken)

      }
  }, 5000);


   async function GiveBoosterPerks(User) {

     const Premium = require("./Databases/Schema/Premium")
const TotalCoins = require("./Databases/Schema/RoverCoins/TotalCoins")

     let UserPremium = await Premium.findOne({ Author: User })

     if (!UserPremium) {
            const data = Premium.create({
                     Author: User,
            })
            ;(await data).save()

            UserPremium =await Premium.findOne({ Author: User })
       }

       let Coinsdata = await TotalCoins.findOne({ Author: User })

       if (!Coinsdata) {
          const data = TotalCoins.create({
               Author: User,
               TotalCoins: 0
          })
          
          ;(await data).save()

          Coinsdata = await TotalCoins.findOne({ Author: User })
       }

       await TotalCoins.findOneAndUpdate({ Author: User }, { $set: { PaiedCoins: Number(Coinsdata.PaiedCoins) + 3100 }})
       await Premium.findOneAndUpdate({ Author: User }, { $set: { PremiumStatus: true, PremiumBooster: true } })
   }

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