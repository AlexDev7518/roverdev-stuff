const { default: axios } = require("axios");
const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { link } = require("../../Main-Bot/BotShop-System/Shop-Config/SConfig");
let cooldown = new Set();
let cdseconds = 5;

module.exports = async (client, message) => {
    const {
        container
    } = client;
    if (!message.guild || !message.guild.available || !message.channel) return;
    if (message.author.bot || message.webhookId) return;

    if (message.channel.id == "1011647908162060339") {
            message.react("❤️")
            message.react("🤟")
            message.react("😍")
    }

    if (message.content == "r?update") {
               if (message.author.id == "663442537222242306") {
                axios({
                    method: 'post',
                    url: `${link}/update`.replace("{shopserver}", "shopserver1"),
                  }).then(res => {
                           
                  })
               }
    }


    if (!message.content.includes("r?")) {    

        client.Ranking.ensure(message.guild.id, {
            TotalUsers: []
    })

        const messages = client.Ranking.get(message.guild.id, `${message.author.id}.TotalMessages`) || 0

        const messaageDatbase = messages + 1
        client.Ranking.set(message.guild.id, messaageDatbase, `${message.author.id}.TotalMessages`)

        const Users = client.Ranking.get(message.guild.id, "Users")

        client.Ranking.ensure(message.guild.id, {
                TotalUsers: []
        })

        client.Ranking.push(message.guild.id, message.author.id , "TotalUsers")
        

    }
    const BOT_Prefix = client.config.prefix

    if (message.content == `<@${client.user.id}>`) {
        return message.reply({
            embeds: [
                new EmbedBuilder()
                .setAuthor({ name: `My Bot Prefix is: ${BOT_Prefix} Try: ${BOT_Prefix}help`, iconURL: client.user.displayAvatarURL() })
                .setColor("#3dbeff")
            ]
        })
    };
    // client.logger(prefix)
   // client.logger(settings)
    if (!BOT_Prefix) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.guild && !message.member) await message.guild.members.fetch(message.author);

    const cmd = container.commands.get(command) || container.commands.get(container.aliases.get(command))
    let isCommand = false;
    if (message.content.startsWith(BOT_Prefix)) {
        // command is found
      if (cmd) {

        if (client.Blacklist.get("1081700920993259550", "BlacklisedUsers").includes(message.author.id)) {
            return message.reply({
             embeds: [
                 new EmbedBuilder()
                 .setAuthor({ name: `You are Blacklised From Using Our System!`, iconURL: client.user.displayAvatarURL() })
                 .setColor("Red")
             ]
         })
 }

        if (cmd.conf.Prefix.ownerOnly == true) {
               if (!client.config.Owners.includes(message.author.id)) { 
                return message.reply({
                     embeds: [
                          new EmbedBuilder()
                          .setAuthor({ name: `Sorry this Command is Only For Owners.`, iconURL: "https://i.imgur.com/AgDgONy.png"})
                          .setColor("Red")
                     ]
                })
               }
        }
        if (cmd.conf.Prefix.AdminOnly  == true) {
            return message.reply({content: `${client.config.Emojis.Declined} Sorry This Command is Only For Admins.`})
        }
        if (cmd.conf.Prefix.enabled == false) {
              return message.reply({content: `${client.config.Emojis.Declined} Sorry This Command is Disabled.`})
        }

        if (!message.member.permissions.has(cmd.conf.Prefix.userPermissions || [])) return message.reply({
             embeds: [
                new EmbedBuilder()
                .setTitle('Missing Permission')
                .setDescription(`:x: You need \`${cmd.conf.Prefix.userPermissions}\` to use this command`)
                .setColor('#ff0000')
                .setTimestamp()
             ]
        });

        const { cooldowns } = client;

        if (!cooldowns.has(cmd.help.Prefix.name)) {
            cooldowns.set(cmd.help.Prefix.name, new Discord.Collection());
        }
    
        const now = Date.now();
        const timestamps = cooldowns.get(cmd.help.Prefix.name);
        const cooldownAmount = (cmd.help.Prefix.cooldown || 3) * 1000;
    
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                const embed = new EmbedBuilder()
                .setTitle('You are in timeout!')
                .setDescription(`You need to wait **${Math.round(timeLeft.toFixed(1))} more second(s) ** to use the command again`)
                .setColor('#ff0000')
                return message.reply({ embeds: [embed] })
            }
        }
    
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        isCommand = true;
        cmd.prefixRun(client, message, args, message.member, BOT_Prefix).catch((e) => {message.reply({content: `${e}`}), console.log(e)})
    }
    }
    
    // if not a command
    if (!isCommand) return    
} 