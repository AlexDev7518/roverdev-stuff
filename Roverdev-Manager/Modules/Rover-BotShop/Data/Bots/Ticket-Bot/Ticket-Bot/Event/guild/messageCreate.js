const { EmbedBuilder, PermissionFlagsBits, AttachmentBuilder } = require("discord.js");
const { Prefix } = require("../../config/config");

module.exports = async (client, message) => {
    if (!message.guild || !message.guild.available || !message.channel) return;
    if (message.author.bot || message.webhookId) return;

            if (message.content == `<@${client.user.id}>`) {
                 return message.reply({
                      embeds: [
                              new EmbedBuilder()
                              .setAuthor({ name: `Here is Some Help: ${Prefix} try: ${Prefix}help`, iconURL: client.user.displayAvatarURL() })
                              .setColor("Green")
                      ]
                 })
            }

            if (!Prefix) return;

            const args = message.content.slice(Prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
        
            if (message.guild && !message.member) await message.guild.members.cache.get(message.author);
        
            const cmd =  client.container.commands.find(cmd => cmd.conf.Prefix.aliases && cmd.conf.Prefix.aliases.includes(command) ) || client.container.commands.get(command)


            if (!message.content.includes(Prefix)) return

            
            
            if (cmd) { 
                   if (cmd.conf.Prefix.enabled == false) {
                    return message.reply({
                        embeds: [
                           new EmbedBuilder()
                           .setTitle('Command Disabled')
                           .setDescription(`:x: This command is Disabled Right now.`)
                           .setColor('#ff0000')
                           .setTimestamp()
                        ]
                   });
                   }
                   if (cmd.conf.Prefix.ownerOnly == true) {
                           if (!client.config.Owners.includes(message.author.id)) {
                                    return message.reply({
                                         embeds: [
                                             new EmbedBuilder()
                                             .setTitle(`Not Owner`)
                                             .setDescription(`:x: You Need to Be: ${client.config.Owners.map(id => `<@${id}>`).join("\n")}`)
                                             .setColor('#ff0000')
                                             .setTimestamp()
                                         ]
                                    })
                           }
                   }
                   if (cmd.conf.Prefix.AdminOnly == true) {
                    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
                        return message.reply({
                             embeds: [
                                 new EmbedBuilder()
                                 .setTitle('Missing Permission')
                                 .setDescription(`:x: You Must be admin to run this command`)
                                 .setColor('#ff0000')
                                 .setTimestamp()
                             ]
                        })
               }
                   }
                   if (!message.member.permissions.has(cmd.conf.Prefix.userPermissions || [])) {
                    return message.reply({
                        embeds: [
                           new EmbedBuilder()
                           .setTitle('Missing Permission')
                           .setDescription(`:x: You need \`${cmd.conf.Prefix.userPermissions}\` to use this command`)
                           .setColor('#ff0000')
                           .setTimestamp()
                        ]
                   });
                   }

                   if (cmd.conf.Prefix.cooldown) {
                    const {CommandCooldown, msToMinutes} = require('discord-command-cooldown');
                    const ms = require('ms');
                    const moneycooldown = new CommandCooldown(cmd.help.Prefix.name, ms(cmd.conf.Prefix.cooldown));
                    const userCooldowned = await moneycooldown.getUser(message.author.id); 
                    if(userCooldowned){
                        const timeLeft = msToMinutes(userCooldowned.msLeft, false)
                        let ms_min = ms(`${timeLeft.minutes}min`)
                        let ms_s = ms(`${timeLeft.seconds}s`)
                        var time_when_end =(parseInt(+new Date()) + ms_min + ms_s)
                        return message.reply({embeds:[new EmbedBuilder().setColor("#DEC20B").setDescription(`You have to wait (<t:${Math.round(time_when_end / 1000)}:R> | <t:${Math.round(time_when_end / 1000)}:t>) before using this command again.`)]})
                   } else {
                    await moneycooldown.addUser(message.author.id); 
                    cmd.prefixRun(client, message, args, message.member).catch((e) => {
                         message.reply({embeds: [
                                 new EmbedBuilder()
                                 .setTitle(`Error Accored While Trying to run that Command`)
                                 .setDescription(`${e}`)
                                 .setColor("Yellow")
                         ],
                         files: [new AttachmentBuilder(Buffer.from(`${require('util').inspect(e)}`), {name:'error.txt'})]
                    })

                         console.log(e)
                    
                    
                    })
                   } 
               } else { 
                    cmd.prefixRun(client, message, args, message.member, Prefix).catch((e) => {
                         message.reply({embeds: [
                              new EmbedBuilder()
                              .setTitle(`Error Accored While Trying to run that Command`)
                              .setDescription(`${e}`)
                              .setColor("Yellow")
                      ],
                      files: [new AttachmentBuilder(Buffer.from(`${require('util').inspect(e)}`), {name:'error.txt'})]
                 })
                 console.log(e)
                    })
}

}}