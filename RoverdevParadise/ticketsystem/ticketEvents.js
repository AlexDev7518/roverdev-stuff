const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, AttachmentBuilder } = require("discord.js")
const TicketSystem = require("../../database/schemas/TicketSystem")
const { createWriteStream, unlinkSync } = require("fs");

module.exports = async Roverdev => {
     setInterval(async () => {
          let channel = Roverdev.channels.cache.get("1085511080975011840")
          let msg = (await channel.messages.fetch({ limit: 10 })).filter(m => m.author.id === Roverdev.user.id).last()


          const attachment = new AttachmentBuilder("./TicketSystem.png", { name: "TicketSystem.png" });

          const embed = new EmbedBuilder()
               .setAuthor({ name: `Welcome to Roverdev's Customer Support`, iconURL: Roverdev.user.displayAvatarURL() })
               .setColor("Blue")
               .setImage("attachment://TicketSystem.png")
               .setDescription(`<a:Wave:1122680904532377670> Welcome to **Roverdev Paradise Support**\n> If you have any questions or concerns to ask, please open a General Support Ticket\n\n> <:Mod:964293434124943400> When applying as as Staff Member or For Partnership, Please make sure to follow everything in the embed or you will be declined.\n> - ***When Opening a Ticket, if you open it for Coding help or anything we do not do in tickets, you will be warned.***\n\n> **Anything in the tickets, Must Follow all Rules from <#1085501919692345405>**`)
               .setTimestamp()
               .setFooter({ text: `Roverdev Paradise Support System`, iconURL: Roverdev.user.displayAvatarURL() })

          const Buttons = new ActionRowBuilder()
               .setComponents(
                    new ButtonBuilder()
                         .setCustomId("Bot-Ping")
                         .setLabel("Ping me")
                         .setStyle(ButtonStyle.Success)
                         .setEmoji("984188836013826048"),
                    new ButtonBuilder()
                         .setCustomId("Est-Waittime")
                         .setLabel("Est Wait Time")
                         .setStyle(ButtonStyle.Primary)
                         .setEmoji("1122291240550027294")
               )

          const row = new ActionRowBuilder()
               .setComponents(
                    new StringSelectMenuBuilder()
                         .setCustomId("Ticket-System")
                         .setPlaceholder("Click me to open a ticket!")
                         .setOptions([
                              {
                                   label: "General Support Ticket",
                                   value: "Support-Ticket",
                                   description: "Open a General Support Ticket",
                                   emoji: "1191988610069700681"
                              },
                              {
                                   label: "Claim Ticket",
                                   value: "Claim-Ticket",
                                   description: "Open a Ticket to Clam your Prize",
                                   emoji: "1191988612485623828"
                              },
                              {
                                   label: "Apply For staff",
                                   value: "Staff-Ticket",
                                   description: "Open a Staff Application Ticket",
                                   emoji: "1191988613399973898"
                              },
                              {
                                   label: "Apply For Partner",
                                   value: "Partner-Ticket",
                                   description: "Open a Partner Application Ticket",
                                   emoji: "1191988614448558080"
                              },

                         ])
               )

          msg.edit({ embeds: [embed], components: [Buttons, row], files: [attachment], content: `` })
     }, 60000);
     Roverdev.on(Events.InteractionCreate, async interaction => {
          if (interaction.customId == "Claim-Ticket") {

               let data = await TicketSystem.findOne({ channel: "1085511080975011840" })
               let thisTicket = data.TicketsOpen.find(f => f.Channel == interaction.channel.id)

               interaction.deferUpdate()


               let StaffRoles = []

               Roverdev.guilds.cache.get("846548733914906664").members.cache.get(interaction.user.id).roles.cache.forEach(m => {
                    if (m.name.includes("[STAFF]")) {
                         StaffRoles.push(m)
                    }

               })

               if (!interaction.member.roles.cache.has("1085500062706172074")) return interaction.reply({ content: `You are not part of the ROVERDEV Staff team!`, ephemeral: true })

               if (!thisTicket) {
                    let AssociateWord = "Associate"

                    if (interaction.member.roles.cache.has("1085657614639177800")) AssociateWord = "Manager"
                    if (interaction.member.roles.cache.has("1196131064133980250")) AssociateWord = "Hosting Manager"
                    if (interaction.member.roles.cache.has("1085499793310228542")) AssociateWord = "Founder"

                    let array = []

                    Roverdev.guilds.cache.get("846548733914906664").members.cache.get(interaction.user.id).roles.cache.map(m => { if (m.name.includes("[TALK]")) { array.push(m) } }).join("\n")

                    const embed = new EmbedBuilder()
                         .setAuthor({ name: `Ticket Has Been Assigned!`, iconURL: interaction.user.displayAvatarURL() })
                         .setTitle(`*You will now be Assisted By a ${AssociateWord}*`)
                         .setThumbnail(interaction.user.displayAvatarURL())
                         .setFooter({ text: `Powered by Roverdev`, iconURL: interaction.guild.iconURL() })
                         .setColor(interaction.member.displayColor)
                         .addFields([
                              {
                                   name: `**Employment:**`,
                                   value: `<@&${interaction.member.roles.cache.has("1085499793310228542") ? "1085499793310228542" : StaffRoles.sort((a, b) => b.position - a.position)[0].id}>`,
                                   inline: true
                              },
                              {
                                   name: `**Speech:**`,
                                   value: `${array.length == 0 ? "No languages selected" : array.map(m => `${m}`).join(", ")}`,
                                   inline: true
                              }
                         ])
                         .setDescription(`***${AssociateWord}:*** ${interaction.user}`)


                    interaction.channel.send({ embeds: [embed] })
                    interaction.channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true, SendMessages: true, AttachFiles: true })
                    return;
               }

               if (thisTicket.ClaimedUsers.includes(interaction.user.id)) return interaction.reply({ content: `You already claimed this ticket, you can't claim it twice!`, ephemeral: true })
               if (interaction.user.id == thisTicket.Author && interaction.user.id !== "663442537222242306") return interaction.reply({ content: `You can't claim your own ticket!`, ephemeral: true })

               let AssociateWord = "Associate"

               if (interaction.member.roles.cache.has("1085657614639177800")) AssociateWord = "supervisor"
               if (interaction.member.roles.cache.has("1135952243317817375")) AssociateWord = "Manager"
               if (interaction.member.roles.cache.has("1085499793310228542")) AssociateWord = "Founder"
               if (interaction.member.roles.cache.has("1196131064133980250")) AssociateWord = "Hosting Manager"
               let array = []

               Roverdev.guilds.cache.get("846548733914906664").members.cache.get(interaction.user.id).roles.cache.map(m => { if (m.name.includes("[TALK]")) { array.push(m) } }).join("\n")

               const embed = new EmbedBuilder()
                    .setAuthor({ name: `Ticket Has Been Assigned!`, iconURL: interaction.user.displayAvatarURL() })
                    .setTitle(`*You will now be Assisted By a ${AssociateWord}*`)
                    .setThumbnail(interaction.user.displayAvatarURL())
                    .setFooter({ text: `Powered by Roverdev`, iconURL: interaction.guild.iconURL() })
                    .setColor(interaction.member.displayColor)
                    .addFields([
                         {
                              name: `**Employment:**`,
                              value: `<@&${StaffRoles.sort((a, b) => b.position - a.position)[0].id}>`,
                              inline: true
                         },
                         {
                              name: `**Speech:**`,
                              value: `${array.length == 0 ? "No languages selected" : array.map(m => `${m}`).join(", ")}`,
                              inline: true
                         }
                    ])
                    .setDescription(`***${AssociateWord}:*** ${interaction.user}`)


               interaction.channel.send({ embeds: [embed] })

               thisTicket.ClaimedUsers.push(interaction.user.id)

               let index = data.TicketsOpen.indexOf(thisTicket)

               data.TicketsOpen[index] = thisTicket

               await data.save()


               interaction.channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true, SendMessages: true })
          }
          if (interaction.customId == "Close-Ticket") {
               if (!interaction.member.roles.cache.has("1085500062706172074")) return interaction.reply({ content: `You are not part of the ROVERDEV Staff team!`, ephemeral: true })

               let data = await TicketSystem.findOne({ channel: "1085511080975011840" })
               let ThisTicket = data.TicketsOpen.find(f => f.Channel == interaction.channel.id)

               if (!ThisTicket.ClaimedUsers.includes(interaction.user.id) && interaction.user.id !== "663442537222242306") return interaction.reply({ content: `You must claim and handle the ticket to close it!`, ephemeral: true })

               if (interaction.user.id == ThisTicket.Author && interaction.user.id !== "663442537222242306") return interaction.reply({ content: `You can't close your own ticket!`, ephemeral: true })

               interaction.reply({ content: `Closing Ticket....`, ephemeral: true })

               let MainEmbed = new EmbedBuilder()
                    .setAuthor({ name: "Roverdev Systems | Ticket System", iconURL: Roverdev.user.displayAvatarURL() })
                    .setColor("Aqua")
                    .addFields([
                         { name: `Ticket Closed By:`, value: `${interaction.user} | ${interaction.user.username}` },
                         { name: `Ticket Channel:`, value: `\`${interaction.channel.name}\`` },
                         { name: `Ticket Opened By:`, value: `<@!${ThisTicket.Author ? ThisTicket.Author : null}> | ${Roverdev.users.cache.get(ThisTicket.Author).username ? Roverdev.users.cache.get(ThisTicket.Author).username : null}` },
                         { name: `Claimed Users`, value: `> ${ThisTicket.ClaimedUsers.map(m => `<@${m}>`).join(", ")}` },
                    ])
                    .setFooter({ text: `Powered by Roverdev`, iconURL: interaction.guild.iconURL() })

               await interaction.channel.messages.fetch().then(async msg => {
                    let messages = msg.filter(msg => msg.author.bot !== true).map(m => {
                         const date = new Date(m.createdTimestamp).toLocaleString();
                         const user = `${m.author.tag}${m.author.id === ThisTicket.Author ? ' (ticket creator)' : ''}`;

                         return `${date} - ${user} : ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`;
                    }).reverse().join('\n');

                    if (messages.length < 1) messages = 'There are no messages in this ticket... strange';

                    const ticketID = Date.now();

                    const stream = createWriteStream(`./Ticket-Logs/Ticket-${interaction.channel.name.split("》")[1]}.txt`);

                    stream.once('open', () => {
                         stream.write(`channel #${interaction.channel.name} | Channel ID: ${interaction.channel.id}\n\n`);
                         stream.write(`${messages}\n\nLogs ${new Date(ticketID).toLocaleString()}`);

                         stream.end();
                    });
                    let ticketlogs = Roverdev.channels.cache.get("1085507984181968936")
                    let Ticket_Opener = Roverdev.users.cache.get(ThisTicket.Author)
                    stream.on('finish', () =>
                         ticketlogs.send({ files: [`./Ticket-Logs/Ticket-${interaction.channel.name.split("》")[1]}.txt`], embeds: [MainEmbed] }).then(
                              Ticket_Opener.send({ files: [`./Ticket-Logs/Ticket-${interaction.channel.name.split("》")[1]}.txt`], embeds: [MainEmbed] })))

                    setTimeout(() => {
                         unlinkSync(`./Ticket-Logs/Ticket-${interaction.channel.name.split("》")[1]}.txt`)
                    }, 1000);
               });


               const embed = new EmbedBuilder()
                    .setAuthor({ name: "Ticket Closed | Powered By Roverdev", iconURL: interaction.guild.iconURL() })
                    .setTitle("<:CloseTicket:1141756872244858881> Ticket has Been Closed.")
                    .setColor("Yellow")
                    .addFields([{ name: "Ticket Closed By:", value: `${interaction.user}` }], [{ name: "Ticket Channel:", value: `${interaction.channel}` }])

               interaction.channel.send({ embeds: [embed] })

               interaction.channel.setTopic("Closed-Ticket")

               interaction.guild.channels.cache.get("1113934716014432346").children.cache.size > 49 ? interaction.channel.setParent("1129879903114907678") : interaction.channel.setParent("1113934716014432346")

               setTimeout(() => {
                    interaction.channel.permissionOverwrites.edit("846548733914906664", { ViewChannel: false })
               }, 1000);

               let index = data.TicketsOpen.indexOf(ThisTicket)
               data.TicketsOpen.splice(index, 1);

               interaction.message.edit({ components: [] })

               await data.save()
          }
     })

     setInterval(async () => {
          let data = await TicketSystem.findOne({ channel: "1085511080975011840" })

          if (!data) {
               await TicketSystem.create({
                    channel: "1085511080975011840",
                    TotalTickets: 184,
               })
               data = await TicketSystem.findOne({ channel: "1085511080975011840" })
          }

          data.TicketsOpen.forEach(async m => {
               if (Roverdev.guilds.cache.get("846548733914906664").channels.cache.has(m.Channel)) {
                    return;
               } else {
                    if (Roverdev.user) {
                         let index = data.TicketsOpen.indexOf(data.TicketsOpen.find(f => f.Channel == m.Channel))
                         data.TicketsOpen.splice(index, 1);
                         await data.save()
                         console.log(`Could not find channel. So Deleted it!`)
                    }
               }
          })
     }, 10000);
}