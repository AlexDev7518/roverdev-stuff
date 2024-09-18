const { PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonStyle, ButtonBuilder, ChannelType } = require("discord.js")
const TicketSystem = require("../../Models/TicketSystem")

module.exports = {
  cooldown: 5,
  Description: "",
 CommandRun: async (Rover, message, args, executor, language, emoji, embed, database) => {
  if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
    return message.reply({
            embeds: [
                  embed.setColor("Red").setAuthor({ name: language["MissingPerms"], iconURL: "https://cdn.discordapp.com/emojis/1076644915485872239.png" })
            ]
    })
  }

  let db = database.TicketSystem



embed.setTitle(`Welcome to ${Rover.user.username}'s Ticket System`)
embed.setDescription(`Welcome to ${Rover.user.username}'s Ticket System You can Setup 1 Ticket System and Edit them and You Can Reset them to!`)
embed.setThumbnail(Rover.user.displayAvatarURL())
embed.setColor(`Red`)
const row = new ActionRowBuilder()
.addComponents(
  new StringSelectMenuBuilder()
  .setCustomId('Ticket-System')
  .setPlaceholder("🔓| Nothing Selected Yet")
  .addOptions([
    {
       value: "Setup-TicketSystem",
       label: "Setup the Ticket System",
    },
     ])
  );
  const row2 = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
    .setCustomId("Setup-T1")
    .setLabel("Setup Ticket")
    .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
    .setCustomId("Edit-T1")
    .setLabel("Edit")
    .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
    .setCustomId("Update-T1")
    .setLabel("Update")
    .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
    .setCustomId("Reset-T1")
    .setLabel("Reset")
    .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
    .setCustomId("SendMSG-T1")
    .setLabel("Send")
    .setStyle(ButtonStyle.Secondary),
  )
const ticketsystem = await message.reply({embeds: [embed], components: [row]})
let collector = ticketsystem.createMessageComponentCollector({time: 60000 });

collector.on("collect" , async (b) => {
  if (b.user.id !== message.author.id)
  return b.reply({ content: `<a:Forgie_no:969404208698785812> **Only <@${message.author.id}> allowed to react!**`, ephemeral: true })
  if(b.isStringSelectMenu()){
  if (b.values[0] === 'Setup-TicketSystem') {
    ticketsystem.edit({ embeds: [
        new EmbedBuilder()
        .setTitle(`Ticket System For ${Rover.user.username}!`)
        .setThumbnail(Rover.user.displayAvatarURL())
        .addFields([
               { name: `Setup`, value: `Setup The Simple Ticket System For The Server!`, inline: true },
               { name: `Edit Ticket System`, value: `Edit the Ticket System For the Guild`, inline: true },
               { name: `Update`, value: `Reset the Ticket System for this Guild!`, inline: true },
               { name: `Reset the Ticket System`, value: `Send the Message of The Ticket System!`, inline: true },
               { name: `Send Message`, value: `Send the Message of The Ticket System!`, inline: true },
        ])
        .setColor("Green")
    ],
    components: [row2]})
    }
} 
if (b.isButton()){
    if (b.customId =='Setup-T1') {
        if (message.guild.channels.cache.get(db.get('TicketLogs'))) return b.reply({content: `Ticket Sytem Allready Setup`, ephemeral:true})
        b.reply({content: `Setting Up the Ticket System!`})
        message.guild.channels.create( {
            name: `📁᚛ Ticket Area`,
            type: ChannelType.GuildCategory,
        }).then(async function(channel) {
            db.set('TicketCat', channel.id)
console.log(`Setup The Guild Cat For Ticket System Guild: ${message.guild.name}!`)
            
        })
        message.guild.channels.create({
            name: "📁᚛ Tickets",
            type: ChannelType.GuildCategory,
        }).then(async function(channel) {
                  db.set('TicketsCat', channel.id)
console.log(`Setup The Tickets Cat For Ticket System Guild: ${message.guild.name}!`)
        })
        setTimeout(() => {
            message.guild.channels.create({
                name: "📜᚛ Ticket Logs",
                type: ChannelType.GuildText,
            }).then(async function(channel) {
                db.set('TicketLogs', channel.id)

                console.log(`Seting up The Ticket Logs For Ticket System Guild: ${message.guild.name}!`)

                console.log(`Set The Channel Logs Parent!`)
                channel.setParent(db.get('TicketCat'))
                setTimeout(() => {
                    channel.permissionOverwrites.edit(message.guild.id, {
                        ViewChannel: false,
                        SendMessages: false,
                        ReadMessageHistory: false,
                    }) // Permissions
                }, 400);
                const embed = new EmbedBuilder()
                .setTitle(`Welcome to Ticket Logs!`)
                .setDescription(`All Ticket Logs Will be Logged hered!`)
                .setColor("Red")
               channel.send({embeds: [embed]})
               console.log(`Successfully Setup The Ticket Logs for ${message.guild.name}`)
            })
        }, 1000);
        setTimeout(() => {
            message.guild.channels.create({
                name: "📁᚛ Open Ticket",
                type: ChannelType.GuildText,
            }).then(async function(channel) {
                db.set('TicketChannel', channel.id)
console.log(`Setup The Guild Cat For Ticket System Guild: ${message.guild.name}!`)
                console.log(`Set The Channel Parent!`)
                channel.setParent(db.get('TicketCat'))
                setTimeout(() => {
                    channel.permissionOverwrites.edit(message.guild.id, {
                        ViewChannel: true,
                        SendMessages: false,
                        ReadMessageHistory: true,
                    }) // Permissions
                }, 100);
                const embed = new EmbedBuilder()
                .setTitle(`Welcome to Ticket System!`)
                .setDescription(`Just Click Open Ticket!`)
                .setColor("Red")
                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel("Create-Ticket")
                    .setCustomId(`Create-Ticket`)
                    .setStyle(ButtonStyle.Success)
                )
               channel.send({embeds: [embed], components: [row]})
               console.log(`Successfully Setup The Ticket System for ${message.guild.name}`)
               message.channel.send({content: `Successfully Setup The Ticket System for ${message.guild.name} Ticket Channel: ${channel}`, ephemeral: true})

               await database.save()
            })
        }, 4000);
    }
    if (b.customId == 'Reset-T1') {
         const ticketlogs = Rover.channels.cache.get(data.TicketLogs)
         const channel = Rover.channels.cache.get(data.TicketChannel)
         const tickets = Rover.channels.cache.get(data.TicketsCat)
         if (tickets.children.cache.size > 0) {
            tickets.children.cache.forEach(channel => {
                 channel.delete()
            })
        } 
         const cat = Rover.channels.cache.get(data.TicketCat)
         if (channel) {
            setTimeout(() => {
                channel.delete()
                console.log(`Channel Deleted For Ticket System In: ${message.guild.id} | ${message.guild.name}!`)
            }, 500);
         }
        setTimeout(() => {
            if (tickets) {
                setTimeout(() => {
                    tickets.delete()
                }, 700);
            }
            if (cat) {
                setTimeout(() => {
                    cat.delete()
                }, 700);
            }
            console.log(`Cat Deleted For Ticket System In: ${message.guild.id} | ${message.guild.name}!`)
        }, 600);
        if (ticketlogs) {
            setTimeout(() => {
                ticketlogs.delete()
                console.log(`TicketLogs Deleted For Ticket System In: ${message.guild.id} | ${message.guild.name}!`)
             }, 700);
        }
         setTimeout(() => {
            console.log(`Chanel Database Deleted For Ticket System In: ${message.guild.id} | ${message.guild.name}!`)
         }, 800);
         setTimeout(() => {
            console.log(`Cat Database Deleted For Ticket System In: ${message.guild.id} | ${message.guild.name}!`)
        }, 900);
        setTimeout(() => {
            console.log(`Ticketlogs Database Deleted For Ticket System In: ${message.guild.id} | ${message.guild.name}!`)
        }, 1000);
        setTimeout(() => {
            console.log(`Database Deleted For Ticket System In: ${message.guild.id} | ${message.guild.name}!`)
        }, 1200);
        setTimeout(() => {
            console.log(`Database Deleted For Ticket System In: ${message.guild.id} | ${message.guild.name}!`)
        }, 1600);

        await TicketSystem.findOneAndDelete({ GuildID: message.guild.id })

         message.channel.send({content: `Done Deleting the Ticket Setup!`, ephemeral:true})
    }
    if (b.customId == 'Edit-T1') {
        if (!ticketlogs_id) return b.reply({content: `Ticket Sytem Not Setup`, ephemeral:true})
        const embed = new MessageEmbed()
        .setTitle(`Please Send the Info Bellow!`)
        .setDescription(`\`\`\`md\n# Please Provide Supporter Role!\`\`\``)
        .setColor("YELLOW")
        await message.reply({embeds: [embed]}).then(msg => {
            msg.channel.awaitMessages({
                filter: m => m.author.id === message.author.id,
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(async (collected) => {
                var role = collected.first().mentions.roles.filter(role => role.guild.id == message.guild.id).first();
                if (!role) message.reply(`Not a Valid role Try Doing: \`<@&ROLE_ID>\``)
                if (role) {
                    message.reply(`✅ Succesfully Setup the Supporter Role for the Ticket System!`)
                    await client.ticket.set(`${message.guild.id}.Supporter`, role.id).then(console.log(`✅ Succesfully Setup the Supporter Role for the Ticket System!`))
                }
            })
        
        })
    }
    if (b.customId == 'Update-T1') {
        return b.reply({content: `There is no Update For you to Update to!`, ephemeral:true})
    }
    if (b.customId == 'SendMSG-T1') {
        return b.reply({content: `This option is not Done yet!`, ephemeral:true})
    }
 }
b.deferUpdate()
})
 }
}