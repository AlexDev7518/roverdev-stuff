const { 
  Client, 
  GatewayIntentBits, 
  Partials, 
  ButtonBuilder, 
  ButtonStyle,
   ActionRowBuilder, 
   EmbedBuilder,
   Collection,
   Events,
 } = require('discord.js');

const { StartBot, CommandLoader } = require("./functions");



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
  })


  client.on(Events.MessageCreate, async (message) => {

    if (message.author.id !== "663442537222242306") return

    if (message.content == "r?closeall") {
            const msg = await message.reply({
                 embeds: [
                    new EmbedBuilder()
                    .setAuthor({ name: `Now Deleteing All: ${client.channels.cache.get("1040996273546866708").children.cache.size} Tickets`, iconURL: "https://cdn.discordapp.com/emojis/1032236793812242473.gif?size=96&quality=lossless" })
                    .setColor("Yellow")
                 ]
            })

            setTimeout(() => {
                  client.channels.cache.get("1040996273546866708").children.cache.forEach(channel => channel.delete()) 

                  msg.edit({ embeds: [
                        new EmbedBuilder()
                        .setAuthor({ name: `Sucessfully Deleted: ${client.channels.cache.get("1040996273546866708").children.cache.size} Tickets!`, iconURL: "https://cdn.discordapp.com/emojis/1044448625956241550.gif" })
                        .setColor("Green")
                  ] })
            }, 5000);
    }
})


  require("./Main-Bot/Logger/logger")(client)
  require("./Main-Bot/Membercount")(client)

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



  client.on("channelDelete", async channel => {
      client.settings.delete(channel.id)
      client.Createbot.delete(channel.id)


      client.settings.delete(client.guilds.cache.get("1081700920993259550").id, `${client.settings.get(channel.id, "ticketOpenerId")}.OpenTicket`)
  })

  module.exports = {
        client
  };

  const logs = require('@mateie/discord-logs');
const internal = require("stream");
  logs(client);
  
  

  require("./Main-Bot/Shop-Loader")(client)


client.categories = require("fs").readdirSync(`./Command`);

const commands = new Collection();
client.cooldowns = new Collection();
const aliases = new Collection();
const slash = new Collection();
client.container = {
    commands,
    aliases,
    slash
}
  client.setMaxListeners(100)


  require("./Main-Bot/Staff-System/Main")(client)
  require("./Main-Bot/API/bridge")(client)
  


  client.config = require("./Roverdev-Config/config.json")

  require("./Handlers/console")(client)
  client.on("guildMemberRemove", async member => {
    if (member.user.bot) {
      console.log(`Bot left Server`)
     } else {
          if (member.guild.id == "1081700920993259550") {
            const invitedby = invites.get(member.guild.id,`${member.user.id}.InvitedBy`)

            const settings = invites.get(member.guild.id, `${invitedby}.TotalInvites`) || 0
 
            const Total = settings-1

            invites.set(member.guild.id, Total, `${invitedby}.TotalInvites`)
            invites.delete(member.guild.id, member.user.id)
      
            // invites.delete(member.guild.id, invite.inviter.id, `${member.user.id}.InvitedBy`)
            // invites.set(member.guild.id, Total, `${invite.inviter.id}.TotalInvites`)

            if(member.roles.cache.has(`1005703103896621127`)) {
                     member.ban({ reason: "Leaving the server with Subscriber Role" })
                     client.channels.cache.get("1039090561870745670").send({ content: `<a:BotSuccess:1044448625956241550>  Banned: ${member} (\`${member.user.tag}\` | \`${member.user.id}\`) Because they Had Subscriber Role` })
            }

            if(!member.roles.cache.has(`970956115649105960`)) console.log(`User Does not have Bot So No Message!`)
            if(member.roles.cache.has(`970956115649105960`)) {

            const db = client.Bots.get(member.id, "Bots")

            const guild = client.guilds.cache.get("1081700920993259550")

            db.forEach(async (bot) => {

              const ShopServer = client.Bots.get(bot, "ShopServer")
              const BotPath = client.Bots.get(bot, "BotPath")
              const BotOwner = client.Bots.get(bot.id, "BotOwner")
              const BotType = client.Bots.get(bot, "BotType")
              const axios = require("axios")
              axios({
                method: 'post',
                url: `${require("./Main-Bot/BotShop-System/Shop-Config/SConfig").link}/delete`.replace("{shopserver}", ShopServer),
                data: {
                  SECRECT: Password, 
                  owner: BotOwner,
                  BotID: client.users.cache.get(bot).id,
                  BotPath: BotPath,
                  BotType: BotType
                }
              }).then(res => {
                      console.log(`Successfully Deleted the Bot`)

                      client.Bots.delete(bot)
                      client.Bots.delete(member.id)
        
                      guild.members.fetch(bot).then((m) => { 
                        m.kick()
                    }).catch(() => {});



                      client.Cooldowns.delete(bot)

                      client.BotPayment.ensure("1081700920993259550", {
                        TotalPaymentBots: []
                  })

                    client.BotPayment.remove("1081700920993259550", bot, "TotalPaymentBots")
                    client.BotPayment.delete(bot)

              })
            })
          }
          }
   }
  })

  // client.on('voiceStateUpdate', async (oldPresence, newPresence) => {
  
  //   const member = newPresence.member
  //   const memberVoiceChannel = member.voice.channel
  
  //   const connection = await memberVoiceChannel.join()
  
  //   connection.on('speaking', (user, speaking) => {
  //     if (speaking) {
  //       console.log(`I'm listening to ${user.username}`)
  //     } else {
  //       console.log(`I stopped listening to ${user.username}`)
  //     }
  //   })
  // })
    client.on("guildMemberAdd", async member => {
      if  (member.guild.id == "1081700920993259550") {

        try {
          if (member.user.bot) {
            const bot = client.Createbot.get(member.id, "ChannelID")
      
            const ConfirmButton = new ButtonBuilder()
            .setCustomId("Confirm-Creation")
            .setDisabled(false)
            .setLabel("Confirm, Create Bot")
            .setEmoji("1023811776850186261")
            .setStyle(ButtonStyle.Secondary)
            
            const CancelButton = new ButtonBuilder()
            .setCustomId("Cancel-Creation")
            .setDisabled(false)
            .setLabel("Cancel")
            .setEmoji("1023811778087485491")
            .setStyle(ButtonStyle.Secondary)
      
      
      
            const row = new ActionRowBuilder()
            .addComponents(ConfirmButton, CancelButton)
      
            client.channels.fetch(bot).then(ch => {
              ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                      msg.edit({
                              components: [row]
                      })
              })
         })
      
         member.roles.add("1006310738656247818")
      
         client.channels.cache.get(bot).permissionOverwrites.edit(member.id, { ViewChannel: true, SendMessages: true, ReadMessageHistory: true})
      
         setTimeout(() => {
          client.Createbot.delete(member.id)
         }, 100);
      
         return client.channels.cache.get(bot).send({embeds: [
                    new EmbedBuilder()
                    .setTitle(`Succesfully Added ${member.user.username} To the Creation`)
                    .setColor("#3dbeff")
         ]})
      }
    } catch (errr) {
      return member.roles.add("1006310738656247818")
    }
// const channel = member.guild.channels.cache.find(ch => ch.id === "935190175510835290");
// //send the welcome embed to there
// channel.send({content: `Welcome <@${member.user.id}> To ${member.guild.name}`});
        }
   })

   const InvitesTracker = require('@androz2091/discord-invites-tracker');
const { invites } = require("./Main-Bot/Database/Data");
const { Password } = require("./Main-Bot/BotShop-System/Shop-Config/SConfig");
const { link } = require("fs");
   const tracker = InvitesTracker.init(client, {
     fetchGuilds: true,
     fetchVanity: true,
     fetchAuditLogs: true
 });

   require("./Roverdev-Dashboard/index")(client)
  client.on('warn', info => {
    client.logger(`: ${info}`.white, "WARN LOGGER");
  });
  client.on('debug', info => {
    client.logger(`: ${info}`.brightYellow, "DEBUG LOGGER");
  });
  client.on('rateLimit', info => {
    client.logger(`: ${info}`.bold.red, "RATELIMIT LOGGER");
  });


  StartBot(client)