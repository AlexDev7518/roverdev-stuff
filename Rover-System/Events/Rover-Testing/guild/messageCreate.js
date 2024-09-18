const { EmbedBuilder, AttachmentBuilder, Collection } = require('discord.js');
const GuildConfig = require('../../../Models/GuildConfig');
const { default: mongoose } = require('mongoose');

module.exports = async (Rover, message) => {
     if (!message.guild || !message.guild.available || !message.channel) return;
     if (message.author.bot || message.webhookId) return;

     const Prefix = "rt!"

     if (message.content == `<@${Rover.user.id}>`) {
          return message.reply({
               embeds: [
                    new EmbedBuilder()
                         .setAuthor({ name: `My Prefix is: ${Prefix} | Try: ${Prefix}help`, iconURL: Rover.user.displayAvatarURL() })
                         .setColor("Orange")
               ]
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

     if (mongoose.connection.readyState == 0 || mongoose.connection.readyState == 3)  return message.reply({ content: `# <:mongodb:1099875217611952178> Mongoose Datebase offline :warning:\n> Join https://discord.gg/roverdev\n> - Contact Support in <#1085511080975011840>` })

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

     cmd.RunCommand(Rover, message, args, message.member, translate, new EmbedBuilder(), database).catch((e) => {
          message.reply({
               embeds: [
                    new EmbedBuilder()
                         .setTitle(`Error Accored While Trying to run that Command`)
                         .setDescription(`${e}`)
                         .setColor("Yellow")
               ],
               files: [
                    new AttachmentBuilder(Buffer.from(`${require('util').inspect(e)}`), { name: 'error.txt' })
               ]
          })
     })
}