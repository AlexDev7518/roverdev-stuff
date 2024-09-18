const Discord = require("discord.js");
const colors = require(`colors`)
const { EmbedBuilder } = require("discord.js");
let cooldown = new Set();
let cdseconds = 5;

module.exports = async (client, message) => {
    const {
        container
    } = client;
    if (!message.guild || !message.guild.available || !message.channel) return;
    if (message.author.bot || message.webhookId) return;

    const BOT_Prefix = client.config.Prefix

    if (message.content == `<@${client.user.id}>`) {
        return message.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle("Huh? I got Pinged?")
                .setDescription(`Let me Help you Prefix: ${BOT_Prefix} try ${BOT_Prefix}help`)
                .setColor("Orange")
            ]
        })
    };
    if (!BOT_Prefix) return;

    const args = message.content.slice(client.config.Prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.guild && !message.member) await message.guild.members.cache.get(message.author);

    const cmd = container.commands.get(command) || container.commands.get(container.aliases.get(command))

    let isCommand = false;
    if (message.content.startsWith(BOT_Prefix)) {
        // command is found
      if (cmd) {
        const { cooldowns } = client;

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }
    
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 2000;
    
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${cmd.name}\` command.`);
            }
        }
    
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        message.channel.sendTyping()
        console.log(`✅ (${message.author.tag} | ${message.author.id}) Used The v!${cmd.name} | ${message.content} | Command In ${message.channel.name} in ${message.guild.name} | ${message.guild.id}`)

        if (cmd.WebsiteAdmin) {
             const hasRole = client.guilds.cache.get(`846548733914906664`).members.cache.get(message.author.id).roles.cache.get(`996299882098864219`)
             if (!hasRole) {
                return message.reply({embeds: [new EmbedBuilder().setColor("Red").setDescription(`${client.BotEmojis.Declined.animated} | This Command is Admin+`)]})
             }
        }
    //     if(cmd.botmanager){
    //         const hasRole = client.guilds.cache.get(`846548733914906664`).members.cache.get(message.author.id).roles.cache.get(`955886087639818330`)
    //         if(!hasRole){
    //           return message.channel.send
    //           ({
    //           embeds: [
    //           new MessageEmbed()
    //           .setTitle(`<a:Disabled:966829169315045386> Error Occurred <a:Disabled:966829169315045386>`)
    //           .setDescription(`**You Are Not Allowed To Run This Command!**`)
    //           .setColor("RED")
    //           .setFooter(`BotMade by Roverdev`)
    //           .setTimestamp()
    //   .setColor("#00FFFF")
    //             ]
    //         })
    //       }
    //         }
    //         if (cmd.Rebuild) {
    //             return message.reply({
    //                 embeds: [
    //                     new MessageEmbed()
    //                     .setTitle(` <a:Disabled:966829169315045386> Error Occurred <a:Disabled:966829169315045386>`)
    //                     .setDescription(`Sorry ${cmd.name} Command is Not Done Yet! Please Wait!`)
    //                     .setColor("RED")
    //                    .setTimestamp()
    //                 ]
    //             })
    //         }

        isCommand = true;
        setTimeout(() => {
            cmd.run(client, message, args, message.member, BOT_Prefix).catch((e) => {message.reply({content: `${e}`}), console.log(e)})
        }, 500);
      }
      if (!cmd) {
         message.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle(`No Command Found For: ${command}`)
                .setColor("DarkRed")
            ]
         })
      }
    }
    function add(a, b) {
        console.log(a + b);
    }
    
    // if not a command
    if (!isCommand) return    
} 