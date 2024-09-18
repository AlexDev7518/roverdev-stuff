const { default: axios } = require("axios");
const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuComponent, StringSelectMenuBuilder, StringSelectMenuInteraction, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { pterodactyl } = require("../../configuration/Hosting");

module.exports = async (Roverdev, interaction) => {

       if (interaction.guild.id !== "846548733914906664") return;

       Roverdev.channels.cache.get("1168625693962285126").send({ content: `[INTERACTION EVENT] Interaction was clicked ${interaction.customId} | ${interaction.values} - ${interaction.user.username}` })


       if (interaction.commandName) {
              if (interaction.isCommand()) {

                     let cmd;

                     if (interaction.options._group == null) cmd = Roverdev.storage.handlers.slash.get(`${interaction.commandName}_${interaction.options._subcommand}`)
                     else if (interaction.options._group) { console.log("ye"); cmd = Roverdev.storage.handlers.slash.get(`${interaction.options._group}_${interaction.commandName}_${interaction.options._subcommand}`) }

                     cmd.run(Roverdev, interaction)
              }
       }


       if (interaction.customId == "Prices-High") {
              return interaction.reply({ ephemeral: true, content: `these prices are like when you buy something brand new, you have to pay the full price for it or a monthly plan, like what we have\n\n> - you can buy a bot for its full price up front or you can pay it out in months, this payment will be on top the already monthly payment that there already is. so example:\n> you buy a Gaming bot\n> - and the you pay the full price. you only have the monthly payment to pay\n> - if you pay it by months, then you have to pay the bot + the monthly bill ` })
       }


       if (interaction.customId == "Booster-Perks") {
              // let embed = new EmbedBuilder()
              //        .setAuthor({ name: "Roverdev Paradise - Booster Perks", iconURL: interaction.guild.iconURL() })
              //        .setColor("Purple")
              //        .setDescription(`**Roverdev - Bot shop (Booster Perks)**\n> - <:Number_1:1100245428731125800> 1 Free Discord Bot (Custom or Normal)\n> - <:Number_2:1100245427141492736> Bot Premium\n\n **Roverdev Hosting (Booster Perks)**\n> 1x Boost\n> - A Premium Hosting Server * Ram: **1548 MB**, CPU: **200% CPU**, Disk: **3096 MB**,  Backups & Databases: **2 Each**\n> - Server Creation Limit Exceeded To \`2\`. [Until Boost]\n\n> 2x Boost\n> - A Premium Hosting Server * Ram: **2948 MB**, CPU: **300% CPU**, Disk: **5144 MB**,  Backups & Databases: **3 Each**\n> - Server Creation Limit Exceeded To \`3\`. [Until Boost] \n\n **Roverdev Paradise (Booster Perks)**\n> - <:Number_1:1100245428731125800> Attach Files in alot of channels.\n> - <:Number_2:1100245427141492736> Premium Ticket Support (Fast Support)\n> - <:Number_3:1100245424301948969> Embed Links\n> - <:Number_4:1100245422720684032> Change your nickname\n\n***How Boosting Perks work.***\n> - <:Number_1:1100245428731125800> You keep your perks for as long as you boost, and once you unboost you loose them\n> - <:Number_2:1100245427141492736> If you disrepect staff / break rules or tos and get kicked or banned from the server you loose the perks.\n\n\n***__THESE PERKS ONLY APPLY WHEN ROVERDEV SHOP IS OPEN. (Except The server perks)__***`)
              //        .setThumbnail(interaction.guild.iconURL())
              //        .setFooter({ text: "Booster Perks - Roverdev", iconURL: interaction.guild.iconURL() })

              return interaction.reply({ content: `Will be Removed soon.`, ephemeral: true })
       }


       if (interaction.customId == "Channel-information") {
              return interaction.reply({ content: `Will be Removed soon.`, ephemeral: true })
       }

       if (interaction.customId == "Service-Information") {
              return interaction.reply({ content: `Will be Removed soon.`, ephemeral: true })
       }



       if (interaction.customId == "CreateACC") {
              if (!interaction.member.roles.cache.has("1128552875707093032")) return;

              interaction.message.delete()

              const modal = new ModalBuilder()
                     .setCustomId("ModalHosting")
                     .setTitle("Roverdev Hosting")
                     .addComponents(
                            new ActionRowBuilder()
                                   .addComponents(
                                          new TextInputBuilder()
                                                 .setCustomId("Email")
                                                 .setLabel("Please Provide the Email")
                                                 .setPlaceholder("somthing@gmail.com")
                                                 .setRequired(true)
                                                 .setStyle(TextInputStyle.Short),
                                   ),
                            new ActionRowBuilder()
                                   .addComponents(
                                          new TextInputBuilder()
                                                 .setCustomId("UserId")
                                                 .setLabel("Please Provide the UserId")
                                                 .setPlaceholder("example: 663442537222242306")
                                                 .setRequired(true)
                                                 .setStyle(TextInputStyle.Short),
                                   ),
                            new ActionRowBuilder()
                                   .addComponents(
                                          new TextInputBuilder()
                                                 .setCustomId("Username")
                                                 .setLabel("Please Provide the Username")
                                                 .setPlaceholder("example: alexdev7518")
                                                 .setRequired(true)
                                                 .setStyle(TextInputStyle.Short),
                                   ),
                            new ActionRowBuilder()
                                   .addComponents(
                                          new TextInputBuilder()
                                                 .setCustomId("Password")
                                                 .setLabel("Custom Password?")
                                                 .setRequired(false)
                                                 .setPlaceholder("if none. then it will generate one.")
                                                 .setStyle(TextInputStyle.Short),
                                   ),
                            new ActionRowBuilder()
                                   .addComponents(
                                          new TextInputBuilder()
                                                 .setCustomId("Server-Type")
                                                 .setLabel("Server Type")
                                                 .setRequired(true)
                                                 .setPlaceholder("node.js / aio / python")
                                                 .setStyle(TextInputStyle.Short),
                                   ),

                     )

              await interaction.showModal(modal);
       }

       if (interaction.customId == "CreateParnterShip") {
              if (interaction.user.id !== "663442537222242306") return;

              interaction.message.delete()

              const modal = new ModalBuilder()
                     .setCustomId("Partner")
                     .setTitle("New Partnership")
                     .addComponents(
                            new ActionRowBuilder()
                                   .addComponents(
                                          new TextInputBuilder()
                                                 .setCustomId("User")
                                                 .setLabel("User who Partnered")
                                                 .setPlaceholder("Example: 663442537222242306")
                                                 .setRequired(true)
                                                 .setStyle(TextInputStyle.Short),
                                   ),
                            new ActionRowBuilder()
                                   .addComponents(
                                          new TextInputBuilder()
                                                 .setCustomId("ServerName")
                                                 .setLabel("Please Provide the Server Name")
                                                 .setPlaceholder("example: Roverdev Paradise")
                                                 .setRequired(true)
                                                 .setStyle(TextInputStyle.Short),
                                   ),
                            new ActionRowBuilder()
                                   .addComponents(
                                          new TextInputBuilder()
                                                 .setCustomId("ServerAdvertisement")
                                                 .setLabel("Provide The Advertisement")
                                                 .setPlaceholder("No Example")
                                                 .setRequired(false)
                                                 .setStyle(TextInputStyle.Paragraph),
                                   ),
                            new ActionRowBuilder()
                                   .addComponents(
                                          new TextInputBuilder()
                                                 .setCustomId("ServerLink")
                                                 .setLabel("Give Server Link")
                                                 .setRequired(true)
                                                 .setPlaceholder("example: https://discord.gg/roverdev")
                                                 .setStyle(TextInputStyle.Short),
                                   ),
                            new ActionRowBuilder()
                                   .addComponents(
                                          new TextInputBuilder()
                                                 .setCustomId("Representatives")
                                                 .setLabel("Provide the Server Owners")
                                                 .setRequired(true)
                                                 .setPlaceholder("Ex: 663442537222242306, 647962247666073610")
                                                 .setStyle(TextInputStyle.Short),
                                   ),

                     )

              await interaction.showModal(modal);
       }

       if (interaction.customId == "CreateEmbed") {
              if (interaction.user.id !== "663442537222242306") return;

              interaction.message.delete()

              const modal = new ModalBuilder()
                     .setCustomId("Embed")
                     .setTitle("New Embed")
                     .addComponents(
                            new ActionRowBuilder()
                                   .addComponents(
                                          new TextInputBuilder()
                                                 .setCustomId("Tittle")
                                                 .setLabel("Embed Tittle")
                                                 .setPlaceholder("Example: Roverdev")
                                                 .setRequired(false)
                                                 .setStyle(TextInputStyle.Short),
                                   ),
                            new ActionRowBuilder()
                                   .addComponents(
                                          new TextInputBuilder()
                                                 .setCustomId("Color")
                                                 .setLabel("Please Provide the Color")
                                                 .setRequired(false)
                                                 .setStyle(TextInputStyle.Short),
                                   ),
                            new ActionRowBuilder()
                                   .addComponents(
                                          new TextInputBuilder()
                                                 .setCustomId("Description")
                                                 .setLabel("Provide The Description")
                                                 .setRequired(true)
                                                 .setStyle(TextInputStyle.Paragraph),
                                   ),
                            new ActionRowBuilder()
                                   .addComponents(
                                          new TextInputBuilder()
                                                 .setCustomId("Type")
                                                 .setLabel("Content or Embed?")
                                                 .setRequired(true)
                                                 .setStyle(TextInputStyle.Short),
                                   ),

                     )

              await interaction.showModal(modal);
       }

       if (interaction.isModalSubmit()) {
              if (interaction.customId == "Embed") {
                     const Tittle = interaction.fields.getTextInputValue('Tittle');
                     const Color = interaction.fields.getTextInputValue('Color');
                     const Description = interaction.fields.getTextInputValue('Description');
                     const Type = interaction.fields.getTextInputValue('Type');

                     if (Type == "Content") {
                            interaction.reply({ content: `Success!`, ephemeral: true })
                            if (Description.length > 2000) {
                                   interaction.channel.send({ content: `${Description.slice(0, 2000)}` })
                                   return interaction.channel.send({ content: `${Description.slice(2000, Description.length)}` })
                            }
                            return interaction.channel.send({ content: `${Description}` })
                     }


                     const embed1 = new EmbedBuilder()
                            .setAuthor({ name: "Roverdev Paradise" + ` ${Tittle}` })
                            .setTitle(Tittle)
                            .setThumbnail(interaction.guild.iconURL())
                            .setColor(Color)
                            .setFooter({ text: "Roverdev Paradise Embeds", iconURL: Roverdev.user.displayAvatarURL() })

                     if (Description.length > 1) embed1.setDescription(`${Description}`)


                     interaction.reply({ content: `Success!`, ephemeral: true })
                     interaction.channel.send({ embeds: [embed1] })
              }
              if (interaction.customId == "Partner") {
                     const User = interaction.fields.getTextInputValue('User');
                     const Server = interaction.fields.getTextInputValue('ServerName');
                     const ServerAdvertisement = interaction.fields.getTextInputValue('ServerAdvertisement');
                     const ServerLink = interaction.fields.getTextInputValue('ServerLink');
                     const Representatives = interaction.fields.getTextInputValue('Representatives');


                     const embed1 = new EmbedBuilder()
                            .setAuthor({ name: "Roverdev Paradise ParadiseShip - From:" + ` ${Roverdev.users.cache.get(User).username}`, iconURL: interaction.guild.iconURL() })
                            .setTitle(`${Server} x Roverdev Paradise`)
                            .setColor("Blue")
                            .addFields([{ name: "Representatives", value: Representatives.split(",").map(m => `<@${m}>`).join(", "), inline: true }, { name: "Server", value: ServerLink, inline: true }])
                            .setFooter({ text: "Partnership With Roverdev", iconURL: Roverdev.user.displayAvatarURL() })

                     if (ServerAdvertisement.length > 1) embed1.setDescription(`${ServerAdvertisement}`)


                     interaction.reply({ content: `Success!`, ephemeral: true })
                     interaction.channel.send({ embeds: [embed1] })
              }
              if (interaction.customId == "ModalHosting") {

                     const AccEmail = interaction.fields.getTextInputValue('Email');
                     const UserName = interaction.fields.getTextInputValue('Username');
                     const UserId = interaction.fields.getTextInputValue('UserId');
                     let CustomPassword = interaction.fields.getTextInputValue('Password');
                     const ServerType = interaction.fields.getTextInputValue('Server-Type');

                     await interaction.reply({ content: `Step 0/2 Complete`, ephemeral: true })

                     if (CustomPassword.length < 1) {
                            let generateCode = (number, type) => {
                                   const CAPSNUM = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
                                   var password = "";
                                   while (password.length < number) {
                                          password += CAPSNUM[Math.floor(Math.random() * CAPSNUM.length)];
                                   }
                                   return password;
                               };

                               CustomPassword = generateCode(10)
                     }

                     const Userdata = {
                            "username": UserName,
                            "email": AccEmail,
                            "first_name": "user",
                            "last_name": UserName,
                            "password": CustomPassword,
                            "root_admin": false,
                            "language": "en"
                     }

                     axios({
                            url: pterodactyl.host + "/api/application/users",
                            method: 'post',
                            followRedirect: true,
                            maxRedirects: 5,
                            headers: {
                                   'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
                                   'Content-Type': 'application/json',
                                   'Accept': 'Application/vnd.pterodactyl.v1+json',
                            },
                            data: Userdata,
                     }).then(async (m) => {

                            let ServerData = require(`../../Hosting/ServerTypes/${ServerType.replace('.', '')}.js`)(m.data.attributes.id, `${UserName} [Boost Server x1]`)

                            await interaction.editReply({ content: `Step 1/2 Complete`, ephemeral: true })

                            axios({
                                   url: pterodactyl.host + "/api/application/servers",
                                   method: 'POST',
                                   followRedirect: true,
                                   maxRedirects: 5,
                                   headers: {
                                          'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
                                          'Content-Type': 'application/json',
                                          'Accept': 'Application/vnd.pterodactyl.v1+json',
                                   },
                                   data: ServerData,
                            }).then(async (m) => {
                                   await interaction.editReply({ content: `Step 2/2 Complete, Now Sending a Direct Message to the user!\n \`\`\`\nGreetings ${Roverdev.users.cache.get(UserId).username}!\n> Your Account / Server has Been Created\n\n> Email: ${AccEmail}\n> Password: ${CustomPassword}\n\n> Panel Link: https://hosting.roverdev.xyz\n\n ***Please [Change password](<https://hosting.roverdev.xyz/account>) When you First Login***\`\`\`` })

                                   Roverdev.users.cache.get(UserId).send({ content: `Greetings ${Roverdev.users.cache.get(UserId).username}!\n> Your Account / Server has Been Created\n\n> Email: ${AccEmail}\n> Password: ${CustomPassword}\n\n> Panel Link: https://hosting.roverdev.xyz\n\n ***Please [Change password](<https://hosting.roverdev.xyz/account>) When you First Login***` })
                            }).catch((error) => {
                                   console.log(error.response.data.errors)
                            })
                     })
              }
       }
}