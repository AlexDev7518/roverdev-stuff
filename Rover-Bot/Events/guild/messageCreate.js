const { EmbedBuilder, Collection, AttachmentBuilder } = require('discord.js');
const Lang = require('../../bot');
const Emojis = require('../../Configuration/Emojis');
const GuildConfig = require('../../Models/GuildConfig');
module.exports = async (Rover, message) => {
  if (!message.guild || !message.guild.available || !message.channel) return;
  if (message.author.bot || message.webhookId) return;

  const data = await GuildConfig.findOne({ GuildID: message.guild.id })

  if(!data) return await new GuildConfig({ GuildID: message.guild.id }).save()

  let map = data.DefaultSettings

  if (message.content == `<@${Rover.user.id}>`) {
    return message.reply({
      embeds: [
          new EmbedBuilder()
          .setAuthor({ name: `My Prefix is: ${map.get('Prefix')} | Try: ${map.get('Prefix')}help`, iconURL: Rover.user.displayAvatarURL() })
          .setColor("Aqua")
      ]
  })
  }

  const args = message.content.slice(map.get('Prefix').length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.guild && !message.member) await message.guild.members.cache.get(message.author);

  const cmd = Rover.container.commands.get(command) || Rover.container.commands.get(Rover.container.aliases.get(command))


  if (cmd?.name == undefined || !message.content.includes(map.get('Prefix'))) return;

  if (!Rover.cooldowns.has(cmd.name)) {
    Rover.cooldowns.set(cmd.name, new Collection());
  };

  const timeNow = Date.now();
  const tStamps = Rover.cooldowns.get(cmd.name);
  const cdAmount = (cmd.cooldown || 5) * 1000;

  if (tStamps.has(message.author.id)) {
    const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

    if (timeNow < cdExpirationTime) {
      timeLeft = (cdExpirationTime - timeNow) / 1000;
      return message.react("⏰") 
    }
  }

  const translate = require(`../../Languages/${map.get('Language')}`)["commands"][cmd.category][cmd.name]


  if (message.author.id !== "663442537222242306") return message.reply({ content: `sorry this bot is only for developers only since it is in beta` })


  tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount);

  const database = await GuildConfig.findOne({ GuildID: message.guild.id })

  cmd.CommandRun(Rover, message, args, message.member, translate, Emojis, new EmbedBuilder(), database).catch((e) => {
    message.reply({ 
          embeds: [
              new EmbedBuilder()
              .setTitle(`Error Accored While Trying to run that Command`)
              .setDescription(`${e}`)
              .setColor("Yellow")
          ],
          files: [
              new AttachmentBuilder(Buffer.from(`${require('util').inspect(e)}`), {name:'error.txt'})
          ]
    })
})

}