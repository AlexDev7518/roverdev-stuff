const { EmbedBuilder, AttachmentBuilder, Collection, ChannelType, PermissionFlagsBits } = require('discord.js');
const GuildConfig = require('../../../Models/GuildConfig');
const { default: mongoose } = require('mongoose');

module.exports = async (Rover, message) => {
     if (!message.guild || !message.guild.available || !message.channel) return;
     if (message.author.bot || message.webhookId) return;

     try {
          const Prefix = "r?"


          if (message.content == `<@${Rover.user.id}>`) {

               if (!Rover.container.cooldowns.has("Mention")) {
                    Rover.container.cooldowns.set("Mention", new Collection());
               };
          
               const timeNow = Date.now();
               const tStamps = Rover.container.cooldowns.get("Mention");
               const cdAmount = (5) * 1000;
          
               if (tStamps.has(message.author.id)) {
                    const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;
          
                    if (timeNow < cdExpirationTime) {
                         timeLeft = (cdExpirationTime - timeNow) / 1000;
                         return message.react("⏰")
                    }
               }

                    
          tStamps.set(message.author.id, timeNow);
          setTimeout(() => tStamps.delete(message.author.id), cdAmount);

               return message.reply({
                    embeds: [
                         new EmbedBuilder()
                              .setAuthor({ name: `Rover Bot - Mention Message`, iconURL: Rover.user.displayAvatarURL() })
                              .setDescription(`Hello ${message.author}, It seems you mentioned me Here is some information about me:\n> My Default Prefix: \`r?\`\n> <:Reply:1109729704518369420>  - Guild Prefix: \`Soon\`\n\n**Getting Started:**\n> ~~\`r?guide\` - Use this command to know how to use the bot~~\n> \`r?help\` - My help menu to view my commands and other stuff\n> \`r?ping\` - View the ws and ping of rover discord bot\n\n***Usefull Links:***\n> [Change Settings from a Dashboard](https://roverbot.xyz)\n> [Join our Discord Support Server](https://discord.gg/w8jq9WP3Cm)\n\n> Thanks for Reading about rover bot! And Hope you Enjoy Rover :heart:`)
                              .setFooter({ text: `Rover Bot - Made by: AlexDev#7518`, iconURL: Rover.user.displayAvatarURL()})
                              .setColor("Red")
                    ]
               }).catch((e) => {
                    if (e.status == 50013) {
                         Rover.users.cache.get(message.author.id).send({ content: `Seems i can't type in the channel!` }).catch((e) => {
                            const channel = message.guild.channels.cache.find(channel => channel.type === ChannelType.GuildText && channel.permissionsFor(message.guild.me).has(PermissionFlagsBits.SendMessages));
                            if (!channel) return;                       
                            channel.send({ content: `I can't send messages in ${message.channel}, give me Send Messages Perms!` })
                         })
                } else {
                     
                }
               })
          }
     
          const args = message.content.slice(Prefix.length).trim().split(/ +/g);
          const command = args.shift().toLowerCase();
     
          if (message.guild && !message.member) await message.guild.members.cache.get(message.author);
     
          const cmd = Rover.container.commands.get(command) || Rover.container.commands.get(Rover.container.aliases.get(command))
     
     
          if (cmd?.name == undefined || !message.content.includes(Prefix)) return;
     
          if (!Rover.container.cooldowns.has(cmd.name)) {
               Rover.container.cooldowns.set(cmd.name, new Collection());
          };
     
          const timeNow = Date.now();
          const tStamps = Rover.container.cooldowns.get(cmd.name);
          const cdAmount = (cmd.cooldown || 5) * 1000;
     
          if (tStamps.has(message.author.id)) {
               const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;
     
               if (timeNow < cdExpirationTime) {
                    timeLeft = (cdExpirationTime - timeNow) / 1000;
                    return message.react("⏰")
               }
          }
     
          if (!cmd) return;
     
          const translate = require(`../../../Languages/English.json`)[Rover.user.id]["commands"][cmd.category][cmd.name]
     
     
          tStamps.set(message.author.id, timeNow);
          setTimeout(() => tStamps.delete(message.author.id), cdAmount);
     
          if (mongoose.connection.readyState == 0 || mongoose.connection.readyState == 3)  return message.reply({ content: `<:mongodb:1099875217611952178> Mongoose Datebase offline :warning:\n> Join https://discord.gg/roverdev\n> - Contact Support in <#1085511080975011840>` })
     
          let database = await GuildConfig.findOne({ GuildID: message.guild.id })
     
     
          if (!database) {
               await GuildConfig.create({ GuildID: message.guild.id }), 
               database = await GuildConfig.findOne({ GuildID: message.guild.id })
          }
     
          if (!message.member.permissions.has(cmd.RequiredPerms || [])) {
               return message.reply({
                   embeds: [
                      new EmbedBuilder()
                      .setTitle('Missing Permission')
                      .setDescription(`:x: You need \`${cmd.RequiredPerms}\` to use this command`)
                      .setColor('#ff0000')
                      .setTimestamp()
                   ]
              });
              }
     
          cmd.RunCommand(Rover, message, args, message.member, translate, new EmbedBuilder(), database)
     } catch (error) {
          if (error.status == 50013) {
               Rover.users.cache.get(message.author.id).send({ content: `Seems i can't type in the channel!` }).catch((e) => {
                  const channel = message.guild.channels.cache.find(channel => channel.type === ChannelType.GuildText && channel.permissionsFor(message.guild.me).has(PermissionFlagsBits.SendMessages));
                  if (!channel) return;                       
                  channel.send({ content: `I can't send messages in ${message.channel}, give me Send Messages Perms!` })
               })
      } else {
           
      }
     }
}