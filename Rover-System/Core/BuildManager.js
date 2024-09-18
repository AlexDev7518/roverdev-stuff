const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");


module.exports = class RoverManager extends Client {
        constructor() {
                 super({
                          messageCacheLifetime: 60,
                          fetchAllMembers: false,
                          messageCacheMaxSize: 10,
                          restTimeOffset: 0,
                          restWsBridgetimeout: 100,
                          shards: "auto",
                          intents: [
                               GatewayIntentBits.AutoModerationConfiguration,
                               GatewayIntentBits.AutoModerationExecution,
                               GatewayIntentBits.DirectMessageReactions,
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
                          allowedMentions: { parse: ["everyone", "roles", "users"], repliedUser: false },
                          presence: { status: "invisible" }
                          
                 });

                 this.commands = new Collection();
        }
}