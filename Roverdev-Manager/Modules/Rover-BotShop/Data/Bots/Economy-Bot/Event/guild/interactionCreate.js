
const { EmbedBuilder, Collection, PermissionFlagsBits } = require('discord.js');
const Timeout = new Collection()
const humanizeDuration = require("humanize-duration");
const ms = require("ms")
module.exports = async(client, interaction) => {
	if (interaction.commandName) {
		if (interaction.isCommand() || interaction.isContextMenu()) {
			if (!interaction.guild) return;
			const command = client.container.slash.get(interaction.commandName)
			try {
                // just keep it like cooldown
                if (command.conf.Slash.enabled == false) {
                    return interaction.reply({
                        embeds: [
                           new EmbedBuilder()
                           .setTitle('Command Disabled')
                           .setDescription(`:x: This command is Disabled Right now.`)
                           .setColor('#ff0000')
                           .setTimestamp()
                        ], ephemeral: true
                   });
                }
                if (command.conf.Slash.ownerOnly == true) {
                    if (!client.config.Owners.includes(interaction.user.id)) {
                        return interaction.reply({
                             embeds: [
                                 new EmbedBuilder()
                                 .setTitle('Missing Permission')
                                 .setDescription(`:x: You Need to Be: ${client.config.Owners.map(id => `<@${id}>`).join("\n")}`)
                                 .setColor('#ff0000')
                                 .setTimestamp()
                             ],ephemeral: true
                        })
               }
                }
                if (command.conf.Slash.AdminOnly == true) {
                    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
                        return interaction.reply({
                             embeds: [
                                 new EmbedBuilder()
                                 .setTitle('Missing Permission')
                                 .setDescription(`:x: You Must be admin to run this command`)
                                 .setColor('#ff0000')
                                 .setTimestamp()
                             ], ephemeral: true
                        })
               }
                }
                if (!interaction.member.permissions.has(command.conf.Slash.userPermissions || [])) {
                    return message.reply({
                        embeds: [
                           new EmbedBuilder()
                           .setTitle('Missing Permission')
                           .setDescription(`:x: You need \`${command.conf.Slash.userPermissions}\` to use this command`)
                           .setColor('#ff0000')
                           .setTimestamp()
                        ]
                   });
                   }

                   if (command.conf.Slash.cooldown) {
                    /*
                    const now = Date.now(); //get the current time
                    const timestamps = Timeout.get(command.help.Slash.name);
                    const cooldownAmount = (command.conf.Slash.timeout || 1) * 1000;
					if (Timeout.has(interaction.user.id)) {
                        let expirationTime = Timeout.get(interaction.user.id) + cooldownAmount
                        if (now < expirationTime) {
                            let timeLeft = (expirationTime - now) / 1000; //get the lefttime
                            console.log(timeLeft)
                            if(timeLeft < 1) timeLeft = Math.round(timeLeft)
                            if(timeLeft && timeLeft != 0){
                                const embed = new EmbedBuilder()
                                .setTitle('You are in timeout!')
                                .setDescription(`You need to wait **${Math.round(timeLeft.toFixed(1))} more second(s) ** to use the command again`)
                                .setColor('#ff0000')
                                return interaction.reply({ embeds: [embed], ephemeral: true })
                            }
                        }
					}
                    */
                    const {CommandCooldown, msToMinutes} = require('discord-command-cooldown');
                    const ms = require('ms');
                    const moneycooldown = new CommandCooldown(command.help.Slash.name, ms(command.conf.Slash.cooldown));
                    const userCooldowned = await moneycooldown.getUser(interaction.member.user.id); 
                    if(userCooldowned){
                        const timeLeft = msToMinutes(userCooldowned.msLeft, false)
                        let ms_min = ms(`${timeLeft.minutes}min`)
                        let ms_s = ms(`${timeLeft.seconds}s`)
                        var time_when_end =(parseInt(+new Date()) + ms_min + ms_s)
                        return interaction.reply({embeds:[new EmbedBuilder().setColor("#DEC20B").setDescription(`You have to wait (<t:${Math.round(time_when_end / 1000)}:R> | <t:${Math.round(time_when_end / 1000)}:t>) before using this command again.`)]})
                    }else{
                         command.slashRun(interaction, client);
                Timeout.set(interaction.user.id, Date.now())
                Timeout.set(command.help.Slash.name, new Collection())
                await moneycooldown.addUser(interaction.member.user.id); 
                setTimeout(() => {
                    Timeout.delete(`${interaction.user.id}${command.help.Slash.name}`)
                }, command.conf.Slash.timeout);
                    }
                    }else{
                        command.slashRun(interaction, client);
                        Timeout.set(interaction.user.id, Date.now())
                        Timeout.set(command.help.Slash.name, new Collection())
                        setTimeout(() => {
                            Timeout.delete(`${interaction.user.id}${command.help.Slash.name}`)
                        }, command.conf.Slash.timeout);
                    }
               
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: ':x: There was an error while executing this command!', ephemeral: true });
			}
		}
	}
} 