const { 
     ActionRowBuilder, 
     ModalBuilder, 
     TextInputBuilder, 
     TextInputStyle,
     EmbedBuilder,
     ButtonBuilder,
     ButtonStyle,
     SelectMenuBuilder,
     ChannelType,
     PermissionFlagsBits,
     Partials,
     GatewayIntentBits,
     Client,
     showModal,
     AttachmentBuilder
     } = require("discord.js");
const { invites } = require("../Database/Data");
const { CreationCategory, TicketBotsCategory, JTCBotsCategory, ClosedCategory } = require("../Overflow");
const ShopBots = require("./Shop-Config/ShopBots");
const SSettings = require("./Shop-Config/SSettings");
const { settings } = require("./Shop-Config/SSettings");

     module.exports = async client => {
     const wait = require('util').promisify(setTimeout);
     client.on("interactionCreate", async interaction => {

     if (interaction.customId == "Close-Creation") {
          CloseChannel(interaction, client)
     }
     
     if (interaction.customId == "Create-Bot") {

     
     let BotType = ``;
     let HostingDuration = ``;
     let PaymentType = ``
     let CreationType = ``
     let token = ``
     let prefix = ``
     let botId = ``

     const error1 = []
     
     
     
     if (!interaction.member.roles.cache.has("1016060228866953236")) {
     return interaction.reply({
     embeds: [ 
     new EmbedBuilder()
     .setAuthor({ name: `Bot shop control panel not done`, iconURL: "https://i.imgur.com/AgDgONy.png" })
     .setColor("#3dbeff")                         
     ], ephemeral: true
     })
     }

     client.Createbot.ensure(interaction.user.id, {
          ChannelOpened: ""
     })
     

     const channel =  client.Createbot.get(interaction.user.id, "ChannelOpened")

     if (channel) {
            return interaction.reply({ content: `You Allready have a Creation Open <#${channel}>`, ephemeral: true })
     }

     interaction.guild.channels.create({
     name: `-🛒bc-${interaction.user.username}`,
     type: ChannelType.GuildText,
     topic: `${interaction.user.username} Is Creating a Bot | Status: Creating`,
     permissionOverwrites: [
     {
     id: interaction.user.id,
     allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
     },
     {
     id: interaction.guild.roles.everyone,
     deny: [PermissionFlagsBits.ViewChannel]
     },
     {
          id: "1005978927421980702",
          allow: [PermissionFlagsBits.ViewChannel],
          deny:  [PermissionFlagsBits.SendMessages]
     } 
     ]
     }).then(async function(channel) {

          CreationCategory(client, channel)

          setTimeout(() => {
            channel.permissionOverwrites.set([
               {
                    id: interaction.user.id,
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
               },
               {
                    id: interaction.guild.roles.everyone,
                    deny: [PermissionFlagsBits.ViewChannel]
               },
               {
                    id: "1005978927421980702",
                    allow: [PermissionFlagsBits.ViewChannel],
                    deny:  [PermissionFlagsBits.SendMessages]
               } 
            ]);
        }, 500);


          client.Createbot.set(interaction.user.id, channel.id, "ChannelOpened")
          client.Createbot.set(channel.id, interaction.user.id, "Owner")

     
     client.settings.ensure(interaction.user.id, {
     PremiumStatus: false,
     })

     const MainRow = new ActionRowBuilder()
         .addComponents(
                 new ButtonBuilder()
                 .setCustomId("Close-Creation")
                 .setEmoji("🔒")
                 .setLabel("Close")
                 .setStyle(ButtonStyle.Danger)
         )
     
     const MainEmbed = new EmbedBuilder()
     
     .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
     .setThumbnail(client.user.displayAvatarURL())
     .setImage("https://i.imgur.com/gOoC99V.png")
     .setColor("#3dbeff")
     .setDescription(`Please Follow the Steps Below  :\n> <:blank:1032239573054537798> Select Your Bot Type\n Bot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created`)
     
     
     channel.send({embeds: [MainEmbed], components: [MainRow], content: `**Welcome ${interaction.user} To Your Bot Creation Channel, Read The Info Below to Get Started!**`}).then(
     (msg) => {
     msg.pin()
     client.settings.set(channel.id, msg.id, "MessageId")
     })
     
     
     interaction.reply({content: `<#${channel.id}>`, ephemeral: true})
     
     
     const embed2 = new EmbedBuilder() 
     .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
     .setTitle(`***Please Select the Bot You Want to Create***`)
     .setColor("#3dbeff")
     
     client.settings.ensure(interaction.user.id, {
     PremiumStatus: false,
     })
     
     const shopBots =   new SelectMenuBuilder()
     .setCustomId(`CreateBot-SelectMenu1`)
     .setPlaceholder(`Select A Regular Shop Bot`)
     .setOptions(
            ShopBots.ShopBots.map(bot => {
                   return {
                          label: bot.label,
                          description: bot.description,
                          value: bot.value,
                          emoji: bot.emoji
                   }
            })
     )

     const PremiumShopBots =   new SelectMenuBuilder()
     .setCustomId(`CreateBot-SelectMenu2`)
     .setPlaceholder(`Select A Premium Shop Bot`)
     .setOptions(
          ShopBots.PremiumShopBots.map(bot => {
               return {
                      label: bot.label,
                      description: bot.description,
                      value: bot.value,
                      emoji: bot.emoji
               }
        })
     )
     
     /**
     *  Premium Status
     */
     
     const Premium = client.settings.get(interaction.user.id, "PremiumStatus")
     
     if (Premium == false) {
     PremiumShopBots.setDisabled(true)
     }
     if (Premium == true) {
     PremiumShopBots.setDisabled(false)
     }

     client.Bots.ensure(interaction.user.id, {
             Bots: [],
             PremiumBots: []
     })

     client.Createbot.ensure(interaction.guild.id, {
               BotType: {
                         "Ticket-Bot" : {
                         Invites: 3,
                         messages: 2000,
                         boost: 1,
                         money: 3,
                         boosts: 1
                         },
                         "JTC-Bot" : {
                              Invites: 4,
                              messages: 3000,
                              boost: 1,
                              money: 4,
                              boosts: 1
                              },
               },
               HostingDuration: {
                    "1-Week-Hosting" : {
                         Invites: 1,
                         messages: 750,
                         money: 1,
                         boost: 1,
                         },
                         "1-Month-Hosting" : {
                         Invites: 2,
                         messages: 1000,
                         boost: 1,
                         money: 1,
                         },
                         "1-Year-Hosting" : {
                         Invites: 3,
                         boost: 1,
                         messages: 1200,
                         money: 1,
                         }, 
               }
     })
     const row = new ActionRowBuilder()
     .addComponents(shopBots)
     
     const row2 = new ActionRowBuilder()
     .addComponents(PremiumShopBots)
     
     setTimeout(async () => {
     await channel.send({
     embeds: [
     new EmbedBuilder()
     .setAuthor({ name: `Grabbing Shop Bots...`, iconURL: "https://cdn.discordapp.com/emojis/1023872229857038417.png" })
     .setColor("#3dbeff")
     ],
     content: `${interaction.user} Grabbing Shop Bots`
     }).then((msg) => {
     setTimeout(async () => {
          await msg.edit({ embeds: [embed2], components: [row, row2], content: `${interaction.user} Please Select Your Bot Type`}).then((msg) => { client.settings.set(msg.channel.id, msg.id, "BotType-Message")})}, 1100)})



     let collector2 = channel.createMessageComponentCollector({time: 50000, });

     const Collected1 = []
     
     collector2.on("collect" , async (b) => {
     if (b.user.id !== interaction.user.id) return b.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${interaction.user.id}> Is allowed to react!**`, ephemeral: true })
     
     if (b.customId == "CreateBot-SelectMenu1") {
          client.Createbot.set(channel.id, "Regular", "ShopType")

          Collected1.push("Selected.")
          BotType += b.values
          MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type \n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\``)
          client.channels.fetch(channel.id).then(ch => {
          ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
          msg.edit({
          embeds: [MainEmbed]
          })
          embed2.setTitle(`~~***Please Select the Bot You Want to Create***~~`)
          
          client.channels.fetch(msg.channel.id).then(ch => {
          ch.messages.fetch(client.settings.get(ch.id, "BotType-Message")).then(async msg => {
        await msg.edit({
          embeds: [embed2],
          components: [],
          content: `*** <:passed:1023811776850186261>  Selected Bot Type: ${b.values} ***`
          }).then(async (msg) => {
          const embed3 = new EmbedBuilder()
          .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
          .setTitle(`***Please Select The Hosting Duration Time***`)
          .setColor("#3dbeff")
          
          const SelectMenu = new SelectMenuBuilder()
          .setCustomId(`Duration`)
          .setDisabled(false)
          .setPlaceholder(`Please Select the Duration Option.`)
          .setOptions(
          {
          label: "1 Week",
          value: `1-Week-Hosting`,
          description: "1 Week of Bot Hosting"
          },
          { 
          label: "1 Month",
          value: `1-Month-Hosting`,
          description: "1 Month of Bot Hosting"
          },
          {
          label: "1 Year",
          value: `1-Year-Hosting`,
          description: "1 Year of Bot Hosting"
          },
          )
     
     
          const bots = client.Bots.get(interaction.user.id, "Bots")
     
          if (bots.length < 1) {
                  SelectMenu.setOptions(
                    {
                         label: "Free Bot",
                         value: `Free-Bot`,
                         description: "This is your First Free Bot"
                         }
                  )
          }
     
          if (bots.length > 1) {
               SelectMenu.setOptions(
                    {
                         label: "1 Week",
                         value: `1-Week-Hosting`,
                         description: "1 Week of Bot Hosting"
                         },
                         { 
                         label: "1 Month",
                         value: `1-Month-Hosting`,
                         description: "1 Month of Bot Hosting"
                         },
                         {
                         label: "1 Year",
                         value: `1-Year-Hosting`,
                         description: "1 Year of Bot Hosting"
                         },
               )
       }
          
     
          const row3 = new ActionRowBuilder()
          .addComponents(SelectMenu)
          
          await msg.reply({
          embeds: [embed3],
          components: [row3]
          }).then((msg) => {
          client.settings.set(msg.channel.id, msg.id, "Hosting-Message")
          })
          let collector2 = channel.createMessageComponentCollector({time: 60000});
          
          collector2.on("collect" , async (b) => {
           try {
               if (b.user.id !== interaction.user.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${interaction.user.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
           } catch(e) {
                 return;
           }
          
          if (b.customId == "Duration") {
          HostingDuration += b.values
          MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\``)
          client.channels.fetch(channel.id).then(ch => {
          ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
          msg.edit({
          embeds: [MainEmbed]
          })
          embed3.setTitle(`~~***Please Select The Hosting Duration Time***~~`)
          
          client.channels.fetch(msg.channel.id).then(ch => {
          ch.messages.fetch(client.settings.get(ch.id, "Hosting-Message")).then(async msg => {
          msg.edit({
          embeds: [embed3],
          components: [],
          content: `*** <:passed:1023811776850186261>  Selected Duration: ${HostingDuration} ***`
          }).then((msg) => {
          const embed3 = new EmbedBuilder()
          .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
          .setTitle(`***Please Select The Bot Payment Type***`)
          .setColor("#3dbeff")
          
          const SelectMenu = new SelectMenuBuilder()
          .setCustomId(`Payment`)
          .setDisabled(false)
          .setPlaceholder(`Please Select the Payment Option.`)
          .setOptions(
           {
          label: "Invites Option",
          value: `Invites-Payment`,
          description: "Invites Payment"
          },  {
          label: "Boost Option",
          value: `Boost-Payment`,
          description: "Boost Payment"
          },  {
          label: "Messages Option",
          value: `Messages-Payment`,
          description: "Messages Payment"
          },  {
          label: "Money Option",
          value: `Money-Payment`,
          description: "Donation Payment"
          },
          )
     
          const bots = client.Bots.get(interaction.user.id, "Bots")
     
          if (bots.length < 1) {
                  SelectMenu.setOptions(
                    {
                         label: "Free Option",
                         value: `Free-Bot`,
                         description: "First Bot You Ever Made"
                    },
                  )
          }
     
     
          
          const row3 = new ActionRowBuilder()
          .addComponents(SelectMenu)
          
          msg.reply({
          embeds: [embed3],
          components: [row3]
          }).then((msg) => {
          client.settings.set(msg.channel.id, msg.id, "Payment-Message")
          })
          let collector2 = channel.createMessageComponentCollector({time: 60000, });
          collector2.on("collect" , async (b) => {
               try {
                    if (b.user.id !== interaction.user.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${interaction.user.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                } catch(e) {
                      return;
                } 
          
              if (b.customId == "Payment") {
     
               if (b.values == "Free-Bot") {
                      PaymentType += `Free-Bot`

                      /**
                       * @FIRST_EDIT_THE_MAIN_EMBED
                       */
                       client.channels.fetch(channel.id).then(ch => {
                         ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                              MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` `)

                              msg.edit({
                                      embeds: [MainEmbed]
                              })
                         })
                       })

                    /**
                     * @SECOND_EDIT_EMBED 
                     */   
                     client.channels.fetch(msg.channel.id).then(ch => {
                                 ch.messages.fetch(client.settings.get(ch.id, "Payment-Message")).then(async msg => {
                                   embed3.setTitle(`~~***Please Select The Bot Payment Type***~~`)
                                         msg.edit({
                                               embeds: [embed3],
                                               components: [],
                                               content: `*** <:passed:1023811776850186261>  Selected Payment: ${PaymentType} ***`
                                         }).then(async (msg) => {
                                               const embed9 = new EmbedBuilder()
                                               .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                               .setTitle(`***Please Select Your Creation Type.***`)
                                               .setColor("#3dbeff")
                                               const Row4 = new ActionRowBuilder()
                                               .addComponents(
                                                      new SelectMenuBuilder()
                                                      .setCustomId("Creation-Type")
                                                      .setDisabled(false)
                                                      .setPlaceholder("Please Select Your Creation Type")
                                                      .addOptions(
                                                            ShopBots.CreationType.map(type => {
                                                                    return {
                                                                      label: type.label,
                                                                      description: type.description,
                                                                      value: type.value,
                                                                      emoji: type.emoji
                                                                    }
                                                            })
                                                      )
                                               )

                                               msg.reply({embeds: [embed9], components: [Row4]})

                                               let collector2 = channel.createMessageComponentCollector({time: 60000, });
                                               collector2.on("collect" , async (b) => {
                                                    try {
                                                         if (b.user.id !== interaction.user.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${interaction.user.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                                                     } catch(e) {
                                                           return;
                                                     } 
                                                     if (b.values == "dms-creation") {
                                                       const embed3 = new EmbedBuilder()
                                                       .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                       .setTitle(`***Please Provide Me The Bot Token***`)
                                                       .setColor("#3dbeff")
                                                       
                                                       const embed4 = new EmbedBuilder()
                                                       .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                       .setTitle(`-> ***Check your Direct Messages Please***`)
                                                       .setColor("#3dbeff")
                                                       
                                                       const embed5 = new EmbedBuilder()
                                                       .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                       .setTitle(`-> ***Please Enable your DMS! (Channel will be deleted in 10s) ***`)
                                                       .setDescription(`{error}`)
                                                       .setColor("Red")  
                                                       
                                                       channel.send({ embeds: [embed4] }).then((m) =>{
                                                            setTimeout(() => {
                                                                 m.delete()
                                                            }, 5000);
                                                       })

                                                       b.user.send({
                                                               embeds: [embed3]
                                                       }).catch((e) => {
                                                            embed5.setDescription(`{error}`.replace("{error}", e))

                                                            setTimeout(() => {
                                                                 CloseTicket(interaction,channel, client)
                                                             }, 10000);

                                                             return channel.send({
                                                                 embeds: [embed5],
                                                                 content: `${interaction.user}`
                                                          });
                                                       })

                                                       client.channels.fetch(msg.channel.id).then(ch => {
                                                            setTimeout(() => {
                                                                 ch.messages.fetch(client.settings.get(ch.id, "Payment-Message")).then(async msg => {
                                                                      msg.delete()
                                                                 })
                                   
                                                                 ch.messages.fetch(client.settings.get(ch.id, "Hosting-Message")).then(async msg => {
                                                                      msg.delete()
                                                                 })
                                   
                                                                 ch.messages.fetch(client.settings.get(ch.id, "BotType-Message")).then(async msg => {
                                                                      msg.delete()
                                                                 })
                    
                                                                 ch.messages.fetch(client.settings.get(ch.id, "Pending-Payment")).then(async msg => {
                                                                      msg.delete()
                                                                 })
                                                            }, 500);
                                                       })

                                                       try {
                                                            interaction.user.createDM().then(dm => dm.awaitMessages({
                                                                 filter:  m => m.author.id === interaction.user.id, 
                                                                 max: 1, 
                                                                 time: 60000 
                                                                 }).then(async (collected1) => {
                              
                                                                      if (!collected1) return;
                              
                                                                      const Token = collected1.first().content
                                                                      let workingtoken = await checktoken(Token, client);
                                             
                                                                      token += Token
                                             
                                                                      if (!workingtoken) {
                                                                           interaction.user.send({
                                                                                embeds: [
                                                                                          new EmbedBuilder()
                                                                                          .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                          .setTitle(`*** Token Option Invaild ***`)
                                                                                          .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                          .setColor("#3dbeff")
                                                                                ],
                                                                           })
                                                                           return channel.delete()
                                                                      }
                                             
                                                                           
                                                                           const embed3 = new EmbedBuilder()
                                                                           .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                           .setTitle(`***Please Provide Me The Bot Prefix ***`)
                                                                           .setColor("#3dbeff")
                                             
                                                                           b.user.send({
                                                                                embeds: [embed3]
                                                                           })
                                             
                                             
                                                                           
                                                                           interaction.user.createDM().then(dm => dm.awaitMessages({
                                                                                filter:  m => m.author.id === interaction.user.id, 
                                                                                max: 1, time: 
                                                                                30000 
                                                                           }).then(async (collected1) => {
                                                                                const PrefixContent = collected1.first().content
                                                                                if (PrefixContent.length > 3) {
                                                                                          interaction.user.send({
                                                                                               embeds: [
                                                                                                    new EmbedBuilder()
                                                                                                    .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                    .setTitle(`*** Prefix Option Invaild ***`)
                                                                                                    .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                                    .setColor("#3dbeff")
                                                                                               ]
                                                                                     })
                                                                                     return channel.delete()
                                                                                     }
                                             
                                                                                     prefix +=  PrefixContent
                                             
                                                                                     client.channels.fetch(channel.id).then(ch => {
                                                                                     ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                          MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n> <:blank:1032239573054537798> Entire Bot Information\n> <:blank:1032239573054537798> Get Bot Created\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` \n> <:passed:1023811776850186261>  Bot Prefix: \`${PrefixContent}\``)                                                                                                                                       
                                                                                          msg.edit({
                                                                                               embeds: [MainEmbed]
                                                                                          })
                                                                                     })
                                                                                })
                                                                                     
                                                                                     const embed3 = new EmbedBuilder()
                                                                                     .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                     .setTitle(`***Please Provide Me The BotID ***`)
                                                                                     .setColor("#3dbeff")
                                             
                                                                                     b.user.send({
                                                                                          embeds: [embed3]
                                                                                     })
                                                                                     
                                                                                     interaction.user.createDM().then(dm => dm.awaitMessages({
                                                                                          filter:  m => m.author.id === interaction.user.id, 
                                                                                          max: 1, 
                                                                                          time: 30000 
                                                                                     }).then(async (collected1) => {
                                                                                          const BotIdContent = collected1.first().content
                                                                                          if (BotIdContent.length > 20) {
                                                                                               interaction.user.send({
                                                                                                    embeds: [
                                                                                                              new EmbedBuilder()
                                                                                                              .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                              .setTitle(`*** BotID Option Invaild ***`)
                                                                                                              .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                                              .setColor("#3dbeff")
                                                                                                    ]
                                                                                               })
                                                                                               return channel.delete()
                                                                                               }
                                                                                               
                                             
                                                                                               botId +=  BotIdContent
                                             
                                                                                               client.channels.fetch(channel.id).then(ch => {
                                                                                               ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                                    MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n> <:passed:1023811776850186261>  Entire Bot Information\n> <:blank:1032239573054537798> Get Bot Created\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` \n> <:passed:1023811776850186261>  Bot Prefix: \`${PrefixContent}\`\n> <:passed:1023811776850186261>  Bot Id: \`${botId}\`\n> <:passed:1023811776850186261>  Bot Owner: <@${interaction.user.id}>`)                                                                                                                                       
                                                                                                    msg.edit({
                                                                                                         embeds: [MainEmbed]
                                                                                                    })
                                                                                               })
                                                                                          })
                              
                              
                                                                                          interaction.user.send({
                                                                                                  embeds: [
                                                                                                          new EmbedBuilder()
                                                                                                          .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                          .setTitle(`<:passed:1023811776850186261>  Bot Creation Submit Successfully`)
                                                                                                          .setDescription(`Channel: <#${channel.id}>`)
                                                                                                          .setColor("#3dbeff")
                                                                                                  ]
                                                                                          })
                                                                                
                                             
                                                                                          const ConfirmButton = new ButtonBuilder()
                                                                                          .setCustomId("Confirm-Creation")
                                                                                          .setDisabled(true)
                                                                                          .setLabel("Confirm, Create Bot")
                                                                                          .setEmoji("1023811776850186261")
                                                                                          .setStyle(ButtonStyle.Secondary)
                                                                                          
                                                                                          const CancelButton = new ButtonBuilder()
                                                                                          .setCustomId("Cancel-Creation")
                                                                                          .setDisabled(true)
                                                                                          .setLabel("Cancel")
                                                                                          .setEmoji("1023811778087485491")
                                                                                          .setStyle(ButtonStyle.Secondary)
                                             
                                                                                          const InviteButton = new ButtonBuilder()
                                                                                          .setLabel("Invite-Bot")
                                                                                          .setEmoji("1018006848399482881")
                                                                                          .setURL(`https://discord.com/api/oauth2/authorize?client_id=${botId}&permissions=0&scope=bot`)
                                                                                          .setStyle(ButtonStyle.Link)
                                             
                                             
                                             
                                                                                          const row = new ActionRowBuilder()
                                                                                          .addComponents(ConfirmButton, CancelButton, InviteButton)
                                             
                                             
                                                                                          client.channels.fetch(msg.channel.id).then(ch => {
                                                                                               ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                                       msg.edit({
                                                                                                               components: [row]
                                                                                                       })
                                                                                               })
                                                                                          })
                                             
                                             
                                             
                                             
                                                                                          const embed5 = new EmbedBuilder()
                                                                                          .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                          .setColor("#3dbeff")
                                                                                          .setDescription(`Hello Admin's of Roverdev! Please Invite the Discord Bot Above for the Buttons to Enable! So you Can Create the bot`)
                                        
                                        
                                                                                         channel.send({
                                                                                               embeds: [embed5],
                                                                                               // content: `(<@&920292438294294538>) Creation is Ready!\n> ( <@&1005978927421980702>) Have Questions? Ask our Staff Members! `
                                                                                         })
                                             
                                             
                                                                                          channel.permissionOverwrites.edit("1005978927421980702", { ViewChannel: true, SendMessages: true, ReadMessageHistory: true})
                                                                                          channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true, SendMessages: true, ReadMessageHistory: true})
                                             
                                             
                                                                                          
                                             
                                                                                          client.Createbot.set(channel.id, token, "BotToken")
                                                                                          client.Createbot.set(channel.id, BotType, "BotType")
                                                                                          
                                                                                          client.Createbot.set(channel.id, HostingDuration, "HostingDuration")
                                                                                          client.Createbot.set(channel.id, prefix, "BotPrefix")
                                                                                          client.Createbot.set(channel.id, interaction.user.id, "BotOwner")
                                                                                          client.Createbot.set(channel.id, interaction.user.username, "BotOwnerName")
                                                                                          client.Createbot.set(channel.id, botId, "BotID")
               
                                                                                          client.Createbot.set(channel.id, PaymentType, "PaymentType")
                                             
                                             
                                                                                          if (BotType == "Ticket-Bot") {
                                                                                               TicketBotsCategory(client, channel)
                                                                                               setTimeout(() => {
                                                                                                    channel.permissionOverwrites.set([
                                                                                                         {
                                                                                                              id: interaction.user.id,
                                                                                                              allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                                                                                                         },
                                                                                                         {
                                                                                                              id: interaction.guild.roles.everyone,
                                                                                                              deny: [PermissionFlagsBits.ViewChannel]
                                                                                                         },
                                                                                                         {
                                                                                                              id: "1005978927421980702",
                                                                                                              allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                                                                                                         } 
                                                                                                    ]);
                                                                                               }, 500);
                                                                                          } else if (BotType == "JTC-Bot")  {
                                                                                                    JTCBotsCategory(client, channel)
                                                                                                    setTimeout(() => {
                                                                                                    channel.permissionOverwrites.set([
                                                                                                         {
                                                                                                              id: interaction.user.id,
                                                                                                              allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                                                                                                         },
                                                                                                         {
                                                                                                              id: interaction.guild.roles.everyone,
                                                                                                              deny: [PermissionFlagsBits.ViewChannel]
                                                                                                         },
                                                                                                         {
                                                                                                              id: "1005978927421980702",
                                                                                                              allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                                                                                                         } 
                                                                                                    ]);
                                                                                               }, 500);
                                                                                          }
                                                                                          
                                                                                          client.Createbot.set(botId, channel.id, "ChannelID")
                              
                                                                                          if (SSettings.MultiServer == true) {
                                                                                               const ShopServer1 = client.Createbot.get(interaction.guild.id, "HostingServer1")
                                                                                               const ShopServer2 = client.Createbot.get(interaction.guild.id, "HostingServer2")
               
                                                                                               if (ShopServer1 < ShopServer2 && ShopServer2 > ShopServer1) {
                                                                                                     client.Createbot.set(channel.id, "shopserver1", "ShopServer")
                                                                                               }
                                            
                                                                                               if (ShopServer2 < ShopServer1 && ShopServer1 > ShopServer2) {
                                                                                                     client.Createbot.set(channel.id, "shopserver2", "ShopServer")
                                                                                               }
                                                                                          }
               
                                                                                          if (SSettings.MultiServer == false) {
                                                                                               client.Createbot.set(channel.id, "shopserver2", "ShopServer")
                                                                                          }
                                                                                          }))}))}))
                                                                                     } catch {
                                                                                            return;
                                                                                     }

                                                       } 
                                                     if (b.values == "Modal-creation") {
                                                               channel.send({
                                                                      embeds: [ 
                                                                             new EmbedBuilder()
                                                                             .setTitle("Modal Test")
                                                                      ],
                                                                      components: [
                                                                              new ActionRowBuilder().addComponents(
                                                                                   new ButtonBuilder().setLabel("Modal").setCustomId("Modal-Creation").setStyle(ButtonStyle.Secondary)
                                                                              )
                                                                      ] 
                                                               })

                                                               let collector3 = channel.createMessageComponentCollector({time: 60000, });


                                                            //    collector3.on("collect", async (b) => {
                                                            //      try {
                                                            //           if (b.user.id !== interaction.user.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${interaction.user.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                                                            //       } catch(e) {
                                                            //             return;
                                                            //       } 
                                                            //             if (b.customId == "Modal-Creation") {
                                                            //                     // Create the modal
                                                            //             }
                                                            //    })
                                                         }
                                                  })
                                         })
                                 })
                     })
               }
     
               if (b.values == "Messages-Payment") {
     
                    PaymentType += `Messages-Payment`
     
                    const messages = client.Ranking.get(interaction.guild.id, `${interaction.user.id}.TotalMessages`)
     
                    const amount = client.Createbot.get(interaction.guild.id, `BotType.${BotType}.messages`)
     
                    const HostingAmount = client.Createbot.get(interaction.guild.id, `HostingDuration.${HostingDuration}.messages`)
     
                    const total = amount + HostingAmount
                    const PaymentToRemove = amount + HostingAmount
     
     
                    if (messages < total) {
                         const embed = new EmbedBuilder()
                         .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                         .setTitle(`You Don't have the Required Messages To get this Bot!`)
                         .setDescription(`> You Have: ${messages}\n> You Need: ${total-messages}\n\n> Hosting Messages: ${HostingAmount}\n> Bot Amount: ${amount}\n\n> Hosting + Bot = ${total}`)
                         .setColor("Red")
     
                         const MainRow = new ActionRowBuilder()
                         .addComponents(
                                 new ButtonBuilder()
                                 .setCustomId("Close-Creation")
                                 .setEmoji("🔒")
                                 .setLabel("Close")
                                 .setStyle(ButtonStyle.Danger)
                         )
     
                         return msg.reply({embeds: [embed], components: [MainRow]})
                    }
     
                    const embed1 = new EmbedBuilder()
                    .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                    .setTitle(`Are you Sure About this Action?`)
                    .setDescription(`Are you Sure you want to spend ${total}/${messages} Messages | You will have ${messages-total} Left`)
                    .setColor("Yellow")
     
                    const ConfirmButton = new ButtonBuilder()
                    .setCustomId("Confirm-Action")
                    .setLabel("Confirm")
                    .setStyle(ButtonStyle.Danger)
     
                    const CancelButton = new ButtonBuilder()
                    .setCustomId("Cancel-Action")
                    .setLabel("Cancel")
                    .setStyle(ButtonStyle.Secondary)
                    
                    const row = new ActionRowBuilder().addComponents(ConfirmButton, CancelButton)
                    
                    const msg1 = await msg.reply({embeds: [embed1], components: [row]}).then((msg) => {
                         client.settings.set(msg.channel.id, msg.id, "Pending-Payment")
                    })
     
                    let collector2 = channel.createMessageComponentCollector({time: 60000, });
                    
                    collector2.on("collect" , async (b) => {
                         try {
                              if (b.user.id !== interaction.user.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${interaction.user.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                          } catch(e) {
                                return;
                          }
                         
                         if (b.customId == "Confirm-Action") {
                              client.channels.fetch(channel.id).then(ch => {
                              ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                              MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` `)
                              msg.edit({
                              embeds: [MainEmbed]
                              })
                              embed3.setTitle(`~~***Please Select The Bot Payment Type***~~`)
                              
                              client.channels.fetch(msg.channel.id).then(ch => {
                              ch.messages.fetch(client.settings.get(ch.id, "Payment-Message")).then(async msg => {
                              msg.edit({
                              embeds: [embed3],
                              components: [],
                              content: `*** <:passed:1023811776850186261>  Selected Payment: ${PaymentType} ***`
                              }).then((msg) => {
                                             const embed3 = new EmbedBuilder()
                                             .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                             .setTitle(`***Please Provide Me The Bot Token***`)
                                             .setColor("#3dbeff")
                         
                                             const embed4 = new EmbedBuilder()
                                             .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                             .setTitle(`-> ***Check your Direct Messages Please***`)
                                             .setColor("#3dbeff")
                         
                                             const embed5 = new EmbedBuilder()
                                             .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                             .setTitle(`-> ***Please Enable your DMS! (Channel will be deleted in 10s) ***`)
                                             .setDescription(`{error}`)
                                             .setColor("Red")
                         
                         
                                                  msg.channel.send({ embeds: [embed4] }).then((m) =>{
                                                       setTimeout(() => {
                                                            m.delete()
                                                       }, 5000);
                                                  })
                         
                                                  
                                                  client.Createbot.set(channel.id, false, "Error")
                         
                                                   b.user.send({
                                                            embeds: [embed3]
                                                       }).catch((e) => {
                                                  
                                                       client.Createbot.set(channel.id, true, "Error")
                         
                                                       embed5.setDescription(`{error}`.replace("{error}", e))
                         
                                                       setTimeout(() => {
                                                            channel.delete()
                                                        }, 10000);
                         
                                                       channel.send({
                                                            embeds: [embed5],
                                                            content: `${interaction.user}`
                                                     })
                         
                                                  })
                         
                                                  client.channels.fetch(msg.channel.id).then(ch => {
                                                       setTimeout(() => {
                                                            ch.messages.fetch(client.settings.get(ch.id, "Payment-Message")).then(async msg => {
                                                                 msg.delete()
                                                            })
                              
                                                            ch.messages.fetch(client.settings.get(ch.id, "Hosting-Message")).then(async msg => {
                                                                 msg.delete()
                                                            })
                              
                                                            ch.messages.fetch(client.settings.get(ch.id, "BotType-Message")).then(async msg => {
                                                                 msg.delete()
                                                            })
     
                                                            ch.messages.fetch(client.settings.get(ch.id, "Pending-Payment")).then(async msg => {
                                                                 msg.delete()
                                                            })
                                                       }, 500);
                                                  })
                         
                         
                                                  try {
                                                       interaction.user.createDM().then(dm => dm.awaitMessages({
                                                            filter:  m => m.author.id === interaction.user.id, 
                                                            max: 1, 
                                                            time: 60000 
                                                            }).then(async (collected1) => {
                         
                                                                 if (!collected1) return;
                         
                                                                 const Token = collected1.first().content
                                                                 let workingtoken = await checktoken(Token, client);
                                        
                                                                 token += Token
                                        
                                                                 if (!workingtoken) {
                                                                      interaction.user.send({
                                                                           embeds: [
                                                                                     new EmbedBuilder()
                                                                                     .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                     .setTitle(`*** Token Option Invaild ***`)
                                                                                     .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                     .setColor("#3dbeff")
                                                                           ],
                                                                      })
                                                                      return CloseTicket(interaction,channel,client) 
                                                                 }
                                        
                                                                      
                                                                      const embed3 = new EmbedBuilder()
                                                                      .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                      .setTitle(`***Please Provide Me The Bot Prefix ***`)
                                                                      .setColor("#3dbeff")
                                        
                                                                      b.user.send({
                                                                           embeds: [embed3]
                                                                      })
                                        
                                        
                                                                      
                                                                      interaction.user.createDM().then(dm => dm.awaitMessages({
                                                                           filter:  m => m.author.id === interaction.user.id, 
                                                                           max: 1, time: 
                                                                           30000 
                                                                      }).then(async (collected1) => {
                                                                           const PrefixContent = collected1.first().content
                                                                           if (PrefixContent.length > 3) {
                                                                                     interaction.user.send({
                                                                                          embeds: [
                                                                                               new EmbedBuilder()
                                                                                               .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                               .setTitle(`*** Prefix Option Invaild ***`)
                                                                                               .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                               .setColor("#3dbeff")
                                                                                          ]
                                                                                })
                                                                                return CloseTicket(interaction,channel,client) 
                                                                                }
                                        
                                                                                prefix +=  PrefixContent
                                        
                                                                                client.channels.fetch(channel.id).then(ch => {
                                                                                ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                     MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n> <:blank:1032239573054537798> Entire Bot Information\n> <:blank:1032239573054537798> Get Bot Created\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` \n> <:passed:1023811776850186261>  Bot Prefix: \`${PrefixContent}\``)                                                                                                                                       
                                                                                     msg.edit({
                                                                                          embeds: [MainEmbed]
                                                                                     })
                                                                                })
                                                                           })
                                                                                
                                                                                const embed3 = new EmbedBuilder()
                                                                                .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                .setTitle(`***Please Provide Me The BotID ***`)
                                                                                .setColor("#3dbeff")
                                        
                                                                                b.user.send({
                                                                                     embeds: [embed3]
                                                                                })
                                                                                
                                                                                interaction.user.createDM().then(dm => dm.awaitMessages({
                                                                                     filter:  m => m.author.id === interaction.user.id, 
                                                                                     max: 1, 
                                                                                     time: 30000 
                                                                                }).then(async (collected1) => {
                                                                                     const BotIdContent = collected1.first().content

                                                                                     client.Bots.ensure(interaction.user.id, {
                                                                                             Bots: []
                                                                                     })

                                                                                     const bots = client.Bots.get(interaction.user.id, "Bots")
                                                                                     if (BotIdContent.length > 20) {
                                                                                          interaction.user.send({
                                                                                               embeds: [
                                                                                                         new EmbedBuilder()
                                                                                                         .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                         .setTitle(`*** BotID Option Invaild ***`)
                                                                                                         .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                                         .setColor("#3dbeff")
                                                                                               ]
                                                                                          })
                                                                                          return CloseTicket(interaction,channel,client) 

                                                                                          } else if (bots.includes(BotIdContent)) {
                                                                                                  interaction.user.send({
                                                                                                        embeds: [
                                                                                                             new EmbedBuilder()
                                                                                                             .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                             .setTitle("*** Bot Already Created ***")
                                                                                                             .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                                             .setColor("#3dbeff")
                                                                                                        ]
                                                                                                  })
                                                                                                  return CloseTicket(interaction,channel,client) 
                                                                                          }
                                                                                          
                                        
                                                                                          botId +=  BotIdContent
                                        
                                                                                          client.channels.fetch(channel.id).then(ch => {
                                                                                          ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                               MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n> <:passed:1023811776850186261>  Entire Bot Information\n> <:blank:1032239573054537798> Get Bot Created\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` \n> <:passed:1023811776850186261>  Bot Prefix: \`${PrefixContent}\`\n> <:passed:1023811776850186261>  Bot Id: \`${botId}\`\n> <:passed:1023811776850186261>  Bot Owner: <@${interaction.user.id}>`)                                                                                                                                       
                                                                                               msg.edit({
                                                                                                    embeds: [MainEmbed]
                                                                                               })
                                                                                          })
                                                                                     })
                         
                         
                                                                                     interaction.user.send({
                                                                                             embeds: [
                                                                                                     new EmbedBuilder()
                                                                                                     .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                     .setTitle(`<:passed:1023811776850186261>  Bot Creation Submit Successfully`)
                                                                                                     .setDescription(`Channel: <#${channel.id}>`)
                                                                                                     .setColor("#3dbeff")
                                                                                             ]
                                                                                     })
                                                                           
                                        
                                                                                     const ConfirmButton = new ButtonBuilder()
                                                                                     .setCustomId("Confirm-Creation")
                                                                                     .setDisabled(true)
                                                                                     .setLabel("Confirm, Create Bot")
                                                                                     .setEmoji("1023811776850186261")
                                                                                     .setStyle(ButtonStyle.Secondary)
                                                                                     
                                                                                     const CancelButton = new ButtonBuilder()
                                                                                     .setCustomId("Cancel-Creation")
                                                                                     .setDisabled(true)
                                                                                     .setLabel("Cancel")
                                                                                     .setEmoji("1023811778087485491")
                                                                                     .setStyle(ButtonStyle.Secondary)
                                        
                                                                                     const InviteButton = new ButtonBuilder()
                                                                                     .setLabel("Invite-Bot")
                                                                                     .setEmoji("1018006848399482881")
                                                                                     .setURL(`https://discord.com/api/oauth2/authorize?client_id=${botId}&permissions=0&scope=bot`)
                                                                                     .setStyle(ButtonStyle.Link)
                                        
                                        
                                        
                                                                                     const row = new ActionRowBuilder()
                                                                                     .addComponents(ConfirmButton, CancelButton, InviteButton)
                                        
                                        
                                                                                     client.channels.fetch(msg.channel.id).then(ch => {
                                                                                          ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                                  msg.edit({
                                                                                                          components: [row]
                                                                                                  })
                                                                                          })
                                                                                     })
                                        
                                        
                                        
                                        
                                                                                     const embed5 = new EmbedBuilder()
                                                                                     .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                     .setColor("#3dbeff")
                                                                                     .setDescription(`Hello Admin's of Roverdev! Please Invite the Discord Bot Above for the Buttons to Enable! So you Can Create the bot`)
                                   
                                   
                                                                                    channel.send({
                                                                                          embeds: [embed5],
                                                                                          content: `(<@&920292438294294538>) Creation is Ready!\n> ( <@&1005978927421980702>) Have Questions? Ask our Staff Members! `
                                                                                    })
                                        
                                        
                                                                                     channel.permissionOverwrites.edit("1005978927421980702", { ViewChannel: true, SendMessages: true, ReadMessageHistory: true})
                                                                                     channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true, SendMessages: true, ReadMessageHistory: true})
                                        
                                        
                                                                                     
                                        
                                                                                     client.Createbot.set(channel.id, token, "BotToken")
                                                                                     client.Createbot.set(channel.id, BotType, "BotType")
                                                                                     client.Createbot.set(channel.id, HostingDuration, "HostingDuration")
                                                                                     client.Createbot.set(channel.id, prefix, "BotPrefix")
                                                                                     client.Createbot.set(channel.id, interaction.user.id, "BotOwner")
                                                                                     client.Createbot.set(channel.id, interaction.user.username, "BotOwnerName")
                                                                                     client.Createbot.set(channel.id, botId, "BotID")

                                                                                     client.Createbot.set(channel.id, PaymentToRemove, `PaymentToRemove`)

                                                                                     client.Createbot.set(channel.id, PaymentType, "PaymentType")
                                        
                                        
                                                                                     if (BotType == "Ticket-Bot") {
                                                                                          TicketBotsCategory(client, channel)
                                                                                          setTimeout(() => {
                                                                                               channel.permissionOverwrites.set([
                                                                                                    {
                                                                                                         id: interaction.user.id,
                                                                                                         allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                                                                                                    },
                                                                                                    {
                                                                                                         id: interaction.guild.roles.everyone,
                                                                                                         deny: [PermissionFlagsBits.ViewChannel]
                                                                                                    },
                                                                                                    {
                                                                                                         id: "1005978927421980702",
                                                                                                         allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                                                                                                          } 
                                                                                               ]);
                                                                                          }, 500);
                                                                                     } else if (BotType == "JTC-Bot")  {
                                                                                               JTCBotsCategory(client, channel)
                                                                                               setTimeout(() => {
                                                                                               channel.permissionOverwrites.set([
                                                                                                    {
                                                                                                         id: interaction.user.id,
                                                                                                         allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                                                                                                    },
                                                                                                    {
                                                                                                         id: interaction.guild.roles.everyone,
                                                                                                         deny: [PermissionFlagsBits.ViewChannel]
                                                                                                    },
                                                                                                    {
                                                                                                         id: "1005978927421980702",
                                                                                                         allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                                                                                                    } 
                                                                                               ]);
                                                                                          }, 500);
                                                                                     }
                                                                                     
                                                                                     client.Createbot.set(botId, channel.id, "ChannelID")
                         
                                                                                     if (SSettings.MultiServer == true) {
                                                                                          const ShopServer1 = client.Createbot.get(interaction.guild.id, "HostingServer1")
                                                                                          const ShopServer2 = client.Createbot.get(interaction.guild.id, "HostingServer2")

                                                                                          if (ShopServer1 < ShopServer2 && ShopServer2 > ShopServer1) {
                                                                                                client.Createbot.set(channel.id, "shopserver1", "ShopServer")
                                                                                          }
                                       
                                                                                          if (ShopServer2 < ShopServer1 && ShopServer1 > ShopServer2) {
                                                                                                client.Createbot.set(channel.id, "shopserver2", "ShopServer")
                                                                                          }
                                                                                     }

                                                                                     if (SSettings.MultiServer == false) {
                                                                                          client.Createbot.set(channel.id, "shopserver2", "ShopServer")
                                                                                     }
                                                                                     }))}))}))} catch (err) {return;}} )})})})})
                                                                                }
     
                                                                                if (b.customId == "Cancel-Action") {
                                                                                              return CloseTicket(interaction,channel,client) 
                                                                                }
                                                                               })
                                                                           }
                                                                           
                                                                           if (b.values == "Boost-Payment") {
                                                                                       PaymentType += `Boost Payment`

                                                                                         const Payment = client.Payment.get(interaction.guild.id, `${interaction.user.id}.boost-payment`)
                                                                                         const BotAmount = client.Createbot.get(interaction.guild.id, `BotType.${BotType}.boost`)
                                                                                         const HostingAmount = client.Createbot.get(interaction.guid.id, `HostingDuration.${HostingDuration}.boost`)
                                                                                         
                                                                                         const total = BotAmount + HostingAmount

                                                                                         if (Payment < total) {
                                                                                          const MainRow = new ActionRowBuilder()
                                                                                          .addComponents(
                                                                                                  new ButtonBuilder()
                                                                                                  .setCustomId("Close-Creation")
                                                                                                  .setEmoji("🔒")
                                                                                                  .setLabel("Close")
                                                                                                  .setStyle(ButtonStyle.Danger)
                                                                                          )
                                                                                          const embed = new EmbedBuilder()
                                                                                          .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                          .setTitle(`You Don't have the Required Invites To get this Bot!`)
                                                                                          .setDescription(`> You Have: ${Payment}\n> You Need: ${total-Payment}\n\n> Hosting Invites: ${HostingAmount}\n> Bot Amount: ${BotAmount}\n\n> Hosting + Bot = ${total}`)
                                                                                          .setColor("Red")  
     
                                                                                          return msg.reply({embeds: [embed], components: [MainRow]})
                                                                                         }

                                                                                         const embed1 = new EmbedBuilder()
                                                                                         .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                         .setTitle(`Are you Sure About this Action?`)
                                                                                         .setDescription(`Are you Sure you want to spend ${total}/${Payment} Invites | You will have ${Payment-total} Left`)
                                                                                         .setColor("Yellow")
                                                                          
                                                                                         const ConfirmButton = new ButtonBuilder()
                                                                                         .setCustomId("Confirm-Action")
                                                                                         .setLabel("Confirm")
                                                                                         .setStyle(ButtonStyle.Danger)
                                                                          
                                                                                         const CancelButton = new ButtonBuilder()
                                                                                         .setCustomId("Cancel-Action")
                                                                                         .setLabel("Cancel")
                                                                                         .setStyle(ButtonStyle.Secondary)
                                                                                         
                                                                                         const row = new ActionRowBuilder().addComponents(ConfirmButton, CancelButton)
                                                                                         
                                                                                         const msg1 = await msg.reply({embeds: [embed1], components: [row]}).then((msg) => {
                                                                                              client.settings.set(msg.channel.id, msg.id, "Pending-Payment")
                                                                                         })
                                                                          
                                                                                         let collector2 = channel.createMessageComponentCollector({time: 60000, });
                                                                                         
                                                                                         collector2.on("collect" , async (b) => {
                                                                                              try {
                                                                                                   if (b.user.id !== interaction.user.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${interaction.user.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                                                                                               } catch(e) {
                                                                                                     return;
                                                                                               }
                                                                                              
                                                                                              if (b.customId == "Confirm-Action") {
                                                                                                   const PaymentRemove = Payment-total
                                                                                                   client.Createbot.set(channel.id, PaymentRemove, `Paymenttoremove`)
                                                                          
                                                                                                   client.channels.fetch(channel.id).then(ch => {
                                                                                                   ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                                   MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` `)
                                                                                                   msg.edit({
                                                                                                   embeds: [MainEmbed]
                                                                                                   })
                                                                                                   embed3.setTitle(`~~***Please Select The Bot Payment Type***~~`)
                                                                                                   
                                                                                                   client.channels.fetch(msg.channel.id).then(ch => {
                                                                                                   ch.messages.fetch(client.settings.get(ch.id, "Payment-Message")).then(async msg => {
                                                                                                   msg.edit({
                                                                                                   embeds: [embed3],
                                                                                                   components: [],
                                                                                                   content: `*** <:passed:1023811776850186261>  Selected Payment: ${PaymentType} ***`
                                                                                                   }).then((msg) => {
                                                                                                                  const embed3 = new EmbedBuilder()
                                                                                                                  .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                  .setTitle(`***Please Provide Me The Bot Token***`)
                                                                                                                  .setColor("#3dbeff")
                                                                                              
                                                                                                                  const embed4 = new EmbedBuilder()
                                                                                                                  .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                  .setTitle(`-> ***Check your Direct Messages Please***`)
                                                                                                                  .setColor("#3dbeff")
                                                                                              
                                                                                                                  const embed5 = new EmbedBuilder()
                                                                                                                  .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                  .setTitle(`-> ***Please Enable your DMS! (Channel will be deleted in 10s) ***`)
                                                                                                                  .setDescription(`{error}`)
                                                                                                                  .setColor("Red")
                                                                                              
                                                                                              
                                                                                                                       msg.channel.send({ embeds: [embed4] }).then((m) =>{
                                                                                                                            setTimeout(() => {
                                                                                                                                 m.delete()
                                                                                                                            }, 5000);
                                                                                                                       })
                                                                                              
                                                                                                                       
                                                                                                                       client.Createbot.set(channel.id, false, "Error")
                                                                                              
                                                                                                                        b.user.send({
                                                                                                                                 embeds: [embed3]
                                                                                                                            }).catch((e) => {
                                                                                                                       
                                                                                                                            client.Createbot.set(channel.id, true, "Error")
                                                                                              
                                                                                                                            embed5.setDescription(`{error}`.replace("{error}", e))
                                                                                              
                                                                                                                            setTimeout(() => {
                                                                                                                                 channel.delete()
                                                                                                                             }, 10000);
                                                                                              
                                                                                                                            channel.send({
                                                                                                                                 embeds: [embed5],
                                                                                                                                 content: `${interaction.user}`
                                                                                                                          })
                                                                                              
                                                                                                                       })
                                                                                              
                                                                                                                       client.channels.fetch(msg.channel.id).then(ch => {
                                                                                                                            setTimeout(() => {
                                                                                                                                 ch.messages.fetch(client.settings.get(ch.id, "Payment-Message")).then(async msg => {
                                                                                                                                      msg.delete()
                                                                                                                                 })
                                                                                                   
                                                                                                                                 ch.messages.fetch(client.settings.get(ch.id, "Hosting-Message")).then(async msg => {
                                                                                                                                      msg.delete()
                                                                                                                                 })
                                                                                                   
                                                                                                                                 ch.messages.fetch(client.settings.get(ch.id, "BotType-Message")).then(async msg => {
                                                                                                                                      msg.delete()
                                                                                                                                 })
                                                                          
                                                                                                                                 ch.messages.fetch(client.settings.get(ch.id, "Pending-Payment")).then(async msg => {
                                                                                                                                      msg.delete()
                                                                                                                                 })
                                                                                                                            }, 500);
                                                                                                                       })
                                                                                              
                                                                                              
                                                                                                                       try {
                                                                                                                            interaction.user.createDM().then(dm => dm.awaitMessages({
                                                                                                                                 filter:  m => m.author.id === interaction.user.id, 
                                                                                                                                 max: 1, 
                                                                                                                                 time: 60000 
                                                                                                                                 }).then(async (collected1) => {
                                                                                              
                                                                                                                                      if (!collected1) return;
                                                                                              
                                                                                                                                      const Token = collected1.first().content
                                                                                                                                      let workingtoken = await checktoken(Token, client);
                                                                                                             
                                                                                                                                      token += Token
                                                                                                             
                                                                                                                                      if (!workingtoken) {
                                                                                                                                           interaction.user.send({
                                                                                                                                                embeds: [
                                                                                                                                                          new EmbedBuilder()
                                                                                                                                                          .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                                          .setTitle(`*** Token Option Invaild ***`)
                                                                                                                                                          .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                                                                                          .setColor("#3dbeff")
                                                                                                                                                ],
                                                                                                                                           })
                                                                                                                                           return channel.delete()
                                                                                                                                      }
                                                                                                             
                                                                                                                                           
                                                                                                                                           const embed3 = new EmbedBuilder()
                                                                                                                                           .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                           .setTitle(`***Please Provide Me The Bot Prefix ***`)
                                                                                                                                           .setColor("#3dbeff")
                                                                                                             
                                                                                                                                           b.user.send({
                                                                                                                                                embeds: [embed3]
                                                                                                                                           })
                                                                                                             
                                                                                                             
                                                                                                                                           
                                                                                                                                           interaction.user.createDM().then(dm => dm.awaitMessages({
                                                                                                                                                filter:  m => m.author.id === interaction.user.id, 
                                                                                                                                                max: 1, time: 
                                                                                                                                                30000 
                                                                                                                                           }).then(async (collected1) => {
                                                                                                                                                const PrefixContent = collected1.first().content
                                                                                                                                                if (PrefixContent.length > 3) {
                                                                                                                                                          interaction.user.send({
                                                                                                                                                               embeds: [
                                                                                                                                                                    new EmbedBuilder()
                                                                                                                                                                    .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                                                    .setTitle(`*** Prefix Option Invaild ***`)
                                                                                                                                                                    .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                                                                                                    .setColor("#3dbeff")
                                                                                                                                                               ]
                                                                                                                                                     })
                                                                                                                                                     return channel.delete()
                                                                                                                                                     }
                                                                                                             
                                                                                                                                                     prefix +=  PrefixContent
                                                                                                             
                                                                                                                                                     client.channels.fetch(channel.id).then(ch => {
                                                                                                                                                     ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                                                                                          MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n> <:blank:1032239573054537798> Entire Bot Information\n> <:blank:1032239573054537798> Get Bot Created\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` \n> <:passed:1023811776850186261>  Bot Prefix: \`${PrefixContent}\``)                                                                                                                                       
                                                                                                                                                          msg.edit({
                                                                                                                                                               embeds: [MainEmbed]
                                                                                                                                                          })
                                                                                                                                                     })
                                                                                                                                                })
                                                                                                                                                     
                                                                                                                                                     const embed3 = new EmbedBuilder()
                                                                                                                                                     .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                                     .setTitle(`***Please Provide Me The BotID ***`)
                                                                                                                                                     .setColor("#3dbeff")
                                                                                                             
                                                                                                                                                     b.user.send({
                                                                                                                                                          embeds: [embed3]
                                                                                                                                                     })
                                                                                                                                                     
                                                                                                                                                     interaction.user.createDM().then(dm => dm.awaitMessages({
                                                                                                                                                          filter:  m => m.author.id === interaction.user.id, 
                                                                                                                                                          max: 1, 
                                                                                                                                                          time: 30000 
                                                                                                                                                     }).then(async (collected1) => {
                                                                                                                                                          const BotIdContent = collected1.first().content
                                                                                                                                                          if (BotIdContent.length > 20) {
                                                                                                                                                               interaction.user.send({
                                                                                                                                                                    embeds: [
                                                                                                                                                                              new EmbedBuilder()
                                                                                                                                                                              .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                                                              .setTitle(`*** BotID Option Invaild ***`)
                                                                                                                                                                              .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                                                                                                              .setColor("#3dbeff")
                                                                                                                                                                    ]
                                                                                                                                                               })
                                                                                                                                                               return CloseTicket(interaction,channel,client) 
                                                                                                                                                               } else if (bots.includes(BotIdContent)) {
                                                                                                                                                                interaction.user.send({
                                                                                                                                                                      embeds: [
                                                                                                                                                                           new EmbedBuilder()
                                                                                                                                                                           .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                                                           .setTitle("*** Bot Already Created ***")
                                                                                                                                                                           .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                                                                                                           .setColor("#3dbeff")
                                                                                                                                                                      ]
                                                                                                                                                                })
                                                                                                                                                                return CloseTicket(interaction,channel,client) 
                                                                                                                                                        }
                                                                                                                                                               
                                                                                                             
                                                                                                                                                               botId +=  BotIdContent
                                                                                                             
                                                                                                                                                               client.channels.fetch(channel.id).then(ch => {
                                                                                                                                                               ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                                                                                                    MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n> <:passed:1023811776850186261>  Entire Bot Information\n> <:blank:1032239573054537798> Get Bot Created\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` \n> <:passed:1023811776850186261>  Bot Prefix: \`${PrefixContent}\`\n> <:passed:1023811776850186261>  Bot Id: \`${botId}\`\n> <:passed:1023811776850186261>  Bot Owner: <@${interaction.user.id}>`)                                                                                                                                       
                                                                                                                                                                    msg.edit({
                                                                                                                                                                         embeds: [MainEmbed]
                                                                                                                                                                    })
                                                                                                                                                               })
                                                                                                                                                          })
                                                                                              
                                                                                              
                                                                                                                                                          interaction.user.send({
                                                                                                                                                                  embeds: [
                                                                                                                                                                          new EmbedBuilder()
                                                                                                                                                                          .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                                                          .setTitle(`<:passed:1023811776850186261>  Bot Creation Submit Successfully`)
                                                                                                                                                                          .setDescription(`Channel: <#${channel.id}>`)
                                                                                                                                                                          .setColor("#3dbeff")
                                                                                                                                                                  ]
                                                                                                                                                          })
                                                                                                                                                
                                                                                                             
                                                                                                                                                          const ConfirmButton = new ButtonBuilder()
                                                                                                                                                          .setCustomId("Confirm-Creation")
                                                                                                                                                          .setDisabled(true)
                                                                                                                                                          .setLabel("Confirm, Create Bot")
                                                                                                                                                          .setEmoji("1023811776850186261")
                                                                                                                                                          .setStyle(ButtonStyle.Secondary)
                                                                                                                                                          
                                                                                                                                                          const CancelButton = new ButtonBuilder()
                                                                                                                                                          .setCustomId("Cancel-Creation")
                                                                                                                                                          .setDisabled(true)
                                                                                                                                                          .setLabel("Cancel")
                                                                                                                                                          .setEmoji("1023811778087485491")
                                                                                                                                                          .setStyle(ButtonStyle.Secondary)
                                                                                                             
                                                                                                                                                          const InviteButton = new ButtonBuilder()
                                                                                                                                                          .setLabel("Invite-Bot")
                                                                                                                                                          .setEmoji("1018006848399482881")
                                                                                                                                                          .setURL(`https://discord.com/api/oauth2/authorize?client_id=${botId}&permissions=0&scope=bot`)
                                                                                                                                                          .setStyle(ButtonStyle.Link)
                                                                                                             
                                                                                                             
                                                                                                             
                                                                                                                                                          const row = new ActionRowBuilder()
                                                                                                                                                          .addComponents(ConfirmButton, CancelButton, InviteButton)
                                                                                                             
                                                                                                             
                                                                                                                                                          client.channels.fetch(msg.channel.id).then(ch => {
                                                                                                                                                               ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                                                                                                       msg.edit({
                                                                                                                                                                               components: [row]
                                                                                                                                                                       })
                                                                                                                                                               })
                                                                                                                                                          })
                                                                                                             
                                                                                                             
                                                                                                             
                                                                                                             
                                                                                                                                                          const embed5 = new EmbedBuilder()
                                                                                                                                                          .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                                          .setColor("#3dbeff")
                                                                                                                                                          .setDescription(`Hello Admin's of Roverdev! Please Invite the Discord Bot Above for the Buttons to Enable! So you Can Create the bot`)
                                                                                                        
                                                                                                        
                                                                                                                                                         channel.send({
                                                                                                                                                               embeds: [embed5],
                                                                                                                                                               // content: `(<@&920292438294294538>) Creation is Ready!\n> ( <@&1005978927421980702>) Have Questions? Ask our Staff Members! `
                                                                                                                                                         })
                                                                                                             
                                                                                                             
                                                                                                                                                          channel.permissionOverwrites.edit("1005978927421980702", { ViewChannel: true, SendMessages: true, ReadMessageHistory: true})
                                                                                                                                                          channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true, SendMessages: true, ReadMessageHistory: true})
                                                                                                             
                                                                                                             
                                                                                                                                                          
                                                                                                             
                                                                                                                                                          client.Createbot.set(channel.id, token, "BotToken")
                                                                                                                                                          client.Createbot.set(channel.id, BotType, "BotType")
                                                                                                                                                          
                                                                                                                                                          client.Createbot.set(channel.id, HostingDuration, "HostingDuration")
                                                                                                                                                          client.Createbot.set(channel.id, prefix, "BotPrefix")
                                                                                                                                                          client.Createbot.set(channel.id, interaction.user.id, "BotOwner")
                                                                                                                                                          client.Createbot.set(channel.id, interaction.user.username, "BotOwnerName")
                                                                                                                                                          client.Createbot.set(channel.id, botId, "BotID")
                                                                     
                                                                                                                                                          client.Createbot.set(channel.id, PaymentType, "PaymentType")
                                                                     
                                                                                                                                                          if (BotType == "Ticket-Bot") {
                                                                                                                                                               TicketBotsCategory(client, channel)
                                                                                                                                                               setTimeout(() => {
                                                                                                                                                                    channel.permissionOverwrites.set([
                                                                                                                                                                         {
                                                                                                                                                                              id: interaction.user.id,
                                                                                                                                                                              allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                                                                                                                                                                         },
                                                                                                                                                                         {
                                                                                                                                                                              id: interaction.guild.roles.everyone,
                                                                                                                                                                              deny: [PermissionFlagsBits.ViewChannel]
                                                                                                                                                                         },
                                                                                                                                                                         {
                                                                                                                                                                              id: "1005978927421980702",
                                                                                                                                                                              allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                                                                                                                                                                         } 
                                                                                                                                                                    ]);
                                                                                                                                                               }, 500);
                                                                                                                                                          } else if (BotType == "JTC-Bot")  {
                                                                                                                                                                    JTCBotsCategory(client, channel)
                                                                                                                                                                    setTimeout(() => {
                                                                                                                                                                    channel.permissionOverwrites.set([
                                                                                                                                                                         {
                                                                                                                                                                              id: interaction.user.id,
                                                                                                                                                                              allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                                                                                                                                                                         },
                                                                                                                                                                         {
                                                                                                                                                                              id: interaction.guild.roles.everyone,
                                                                                                                                                                              deny: [PermissionFlagsBits.ViewChannel]
                                                                                                                                                                         },
                                                                                                                                                                         {
                                                                                                                                                                              id: "1005978927421980702",
                                                                                                                                                                              allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                                                                                                                                                                         } 
                                                                                                                                                                    ]);
                                                                                                                                                               }, 500);
                                                                                                                                                          }
                                                                                                                                                          
                                                                                                                                                          client.Createbot.set(botId, channel.id, "ChannelID")
                                                                                              
                                                                                                                                                          if (SSettings.MultiServer == true) {
                                                                                                                                                               const ShopServer1 = client.Createbot.get(interaction.guild.id, "HostingServer1")
                                                                                                                                                               const ShopServer2 = client.Createbot.get(interaction.guild.id, "HostingServer2")
                                                                     
                                                                                                                                                               if (ShopServer1 < ShopServer2 && ShopServer2 > ShopServer1) {
                                                                                                                                                                     client.Createbot.set(channel.id, "shopserver1", "ShopServer")
                                                                                                                                                               }
                                                                                                            
                                                                                                                                                               if (ShopServer2 < ShopServer1 && ShopServer1 > ShopServer2) {
                                                                                                                                                                     client.Createbot.set(channel.id, "shopserver2", "ShopServer")
                                                                                                                                                               }
                                                                                                                                                          }
                                                                     
                                                                                                                                                          if (SSettings.MultiServer == false) {
                                                                                                                                                               client.Createbot.set(channel.id, "shopserver2", "ShopServer")
                                                                                                                                                          }
                                                                                                                                                          }))}))}))} catch (err) {return;}} )})})})})
                                                                                                                                                     }
                                                                          
                                                                                                                                                     if (b.customId == "Cancel-Action") {
                                                                                                                                                          return CloseTicket(interaction,channel,client) 
                                                                                                                                                     }
                                                                                                                                                    })
                                                                                     

                                                                           }
                                                                           if (b.values == "Invites-Payment") {
     
                                                                                PaymentType += `Invites-Payment`
     
                                                                                       const Invites = invites.get(interaction.guild.id, `${interaction.user.id}.TotalInvites`)
     
                                                                                       const amount = client.Createbot.get(interaction.guild.id, `BotType.${BotType}.Invites`)
                                                                        
                                                                                       const HostingAmount = client.Createbot.get(interaction.guild.id, `HostingDuration.${HostingDuration}.Invites`)
     
                                                                                       const total = amount + HostingAmount
     
                                                                                       if (Invites < total) {
                                                                                          const MainRow = new ActionRowBuilder()
                                                                                          .addComponents(
                                                                                                  new ButtonBuilder()
                                                                                                  .setCustomId("Close-Creation")
                                                                                                  .setEmoji("🔒")
                                                                                                  .setLabel("Close")
                                                                                                  .setStyle(ButtonStyle.Danger)
                                                                                          )
                                                                                          const embed = new EmbedBuilder()
                                                                                          .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                          .setTitle(`You Don't have the Required Invites To get this Bot!`)
                                                                                          .setDescription(`> You Have: ${Invites}\n> You Need: ${total-Invites}\n\n> Hosting Invites: ${HostingAmount}\n> Bot Amount: ${amount}\n\n> Hosting + Bot = ${total}`)
                                                                                          .setColor("Red")  
     
                                                                                          return msg.reply({embeds: [embed], components: [MainRow]})
                                                                                       }

                                                                                       const embed1 = new EmbedBuilder()
                                                                                       .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                       .setTitle(`Are you Sure About this Action?`)
                                                                                       .setDescription(`Are you Sure you want to spend ${total}/${Invites} Invites | You will have ${Invites-total} Left`)
                                                                                       .setColor("Yellow")
                                                                        
                                                                                       const ConfirmButton = new ButtonBuilder()
                                                                                       .setCustomId("Confirm-Action")
                                                                                       .setLabel("Confirm")
                                                                                       .setStyle(ButtonStyle.Danger)
                                                                        
                                                                                       const CancelButton = new ButtonBuilder()
                                                                                       .setCustomId("Cancel-Action")
                                                                                       .setLabel("Cancel")
                                                                                       .setStyle(ButtonStyle.Secondary)
                                                                                       
                                                                                       const row = new ActionRowBuilder().addComponents(ConfirmButton, CancelButton)
                                                                                       
                                                                                       const msg1 = await msg.reply({embeds: [embed1], components: [row]}).then((msg) => {
                                                                                            client.settings.set(msg.channel.id, msg.id, "Pending-Payment")
                                                                                       })
                                                                        
                                                                                       let collector2 = channel.createMessageComponentCollector({time: 60000, });
                                                                                       
                                                                                       collector2.on("collect" , async (b) => {
                                                                                            try {
                                                                                                 if (b.user.id !== interaction.user.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${interaction.user.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                                                                                             } catch(e) {
                                                                                                   return;
                                                                                             }
                                                                                            
                                                                                            if (b.customId == "Confirm-Action") {
                                                                                                 const Paymenremove = Invites-total
                                                                                                 client.Createbot.set(channel.id, Paymenremove, `Paymenttoremove`)
                                                                        
                                                                                                 client.channels.fetch(channel.id).then(ch => {
                                                                                                 ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                                 MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` `)
                                                                                                 msg.edit({
                                                                                                 embeds: [MainEmbed]
                                                                                                 })
                                                                                                 embed3.setTitle(`~~***Please Select The Bot Payment Type***~~`)
                                                                                                 
                                                                                                 client.channels.fetch(msg.channel.id).then(ch => {
                                                                                                 ch.messages.fetch(client.settings.get(ch.id, "Payment-Message")).then(async msg => {
                                                                                                 msg.edit({
                                                                                                 embeds: [embed3],
                                                                                                 components: [],
                                                                                                 content: `*** <:passed:1023811776850186261>  Selected Payment: ${PaymentType} ***`
                                                                                                 }).then((msg) => {
                                                                                                                const embed3 = new EmbedBuilder()
                                                                                                                .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                .setTitle(`***Please Provide Me The Bot Token***`)
                                                                                                                .setColor("#3dbeff")
                                                                                            
                                                                                                                const embed4 = new EmbedBuilder()
                                                                                                                .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                .setTitle(`-> ***Check your Direct Messages Please***`)
                                                                                                                .setColor("#3dbeff")
                                                                                            
                                                                                                                const embed5 = new EmbedBuilder()
                                                                                                                .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                .setTitle(`-> ***Please Enable your DMS! (Channel will be deleted in 10s) ***`)
                                                                                                                .setDescription(`{error}`)
                                                                                                                .setColor("Red")
                                                                                            
                                                                                            
                                                                                                                     msg.channel.send({ embeds: [embed4] }).then((m) =>{
                                                                                                                          setTimeout(() => {
                                                                                                                               m.delete()
                                                                                                                          }, 5000);
                                                                                                                     })
                                                                                            
                                                                                                                     
                                                                                                                     client.Createbot.set(channel.id, false, "Error")
                                                                                            
                                                                                                                      b.user.send({
                                                                                                                               embeds: [embed3]
                                                                                                                          }).catch((e) => {
                                                                                                                     
                                                                                                                          client.Createbot.set(channel.id, true, "Error")
                                                                                            
                                                                                                                          embed5.setDescription(`{error}`.replace("{error}", e))
                                                                                            
                                                                                                                          setTimeout(() => {
                                                                                                                               channel.delete()
                                                                                                                           }, 10000);
                                                                                            
                                                                                                                          channel.send({
                                                                                                                               embeds: [embed5],
                                                                                                                               content: `${interaction.user}`
                                                                                                                        })
                                                                                            
                                                                                                                     })
                                                                                            
                                                                                                                     client.channels.fetch(msg.channel.id).then(ch => {
                                                                                                                          setTimeout(() => {
                                                                                                                               ch.messages.fetch(client.settings.get(ch.id, "Payment-Message")).then(async msg => {
                                                                                                                                    msg.delete()
                                                                                                                               })
                                                                                                 
                                                                                                                               ch.messages.fetch(client.settings.get(ch.id, "Hosting-Message")).then(async msg => {
                                                                                                                                    msg.delete()
                                                                                                                               })
                                                                                                 
                                                                                                                               ch.messages.fetch(client.settings.get(ch.id, "BotType-Message")).then(async msg => {
                                                                                                                                    msg.delete()
                                                                                                                               })
                                                                        
                                                                                                                               ch.messages.fetch(client.settings.get(ch.id, "Pending-Payment")).then(async msg => {
                                                                                                                                    msg.delete()
                                                                                                                               })
                                                                                                                          }, 500);
                                                                                                                     })
                                                                                            
                                                                                            
                                                                                                                     try {
                                                                                                                          interaction.user.createDM().then(dm => dm.awaitMessages({
                                                                                                                               filter:  m => m.author.id === interaction.user.id, 
                                                                                                                               max: 1, 
                                                                                                                               time: 60000 
                                                                                                                               }).then(async (collected1) => {
                                                                                            
                                                                                                                                    if (!collected1) return;
                                                                                            
                                                                                                                                    const Token = collected1.first().content
                                                                                                                                    let workingtoken = await checktoken(Token, client);
                                                                                                           
                                                                                                                                    token += Token
                                                                                                           
                                                                                                                                    if (!workingtoken) {
                                                                                                                                         interaction.user.send({
                                                                                                                                              embeds: [
                                                                                                                                                        new EmbedBuilder()
                                                                                                                                                        .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                                        .setTitle(`*** Token Option Invaild ***`)
                                                                                                                                                        .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                                                                                        .setColor("#3dbeff")
                                                                                                                                              ],
                                                                                                                                         })
                                                                                                                                         return channel.delete()
                                                                                                                                    }
                                                                                                           
                                                                                                                                         
                                                                                                                                         const embed3 = new EmbedBuilder()
                                                                                                                                         .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                         .setTitle(`***Please Provide Me The Bot Prefix ***`)
                                                                                                                                         .setColor("#3dbeff")
                                                                                                           
                                                                                                                                         b.user.send({
                                                                                                                                              embeds: [embed3]
                                                                                                                                         })
                                                                                                           
                                                                                                           
                                                                                                                                         
                                                                                                                                         interaction.user.createDM().then(dm => dm.awaitMessages({
                                                                                                                                              filter:  m => m.author.id === interaction.user.id, 
                                                                                                                                              max: 1, time: 
                                                                                                                                              30000 
                                                                                                                                         }).then(async (collected1) => {
                                                                                                                                              const PrefixContent = collected1.first().content
                                                                                                                                              if (PrefixContent.length > 3) {
                                                                                                                                                        interaction.user.send({
                                                                                                                                                             embeds: [
                                                                                                                                                                  new EmbedBuilder()
                                                                                                                                                                  .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                                                  .setTitle(`*** Prefix Option Invaild ***`)
                                                                                                                                                                  .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                                                                                                  .setColor("#3dbeff")
                                                                                                                                                             ]
                                                                                                                                                   })
                                                                                                                                                   return channel.delete()
                                                                                                                                                   }
                                                                                                           
                                                                                                                                                   prefix +=  PrefixContent
                                                                                                           
                                                                                                                                                   client.channels.fetch(channel.id).then(ch => {
                                                                                                                                                   ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                                                                                        MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n> <:blank:1032239573054537798> Entire Bot Information\n> <:blank:1032239573054537798> Get Bot Created\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` \n> <:passed:1023811776850186261>  Bot Prefix: \`${PrefixContent}\``)                                                                                                                                       
                                                                                                                                                        msg.edit({
                                                                                                                                                             embeds: [MainEmbed]
                                                                                                                                                        })
                                                                                                                                                   })
                                                                                                                                              })
                                                                                                                                                   
                                                                                                                                                   const embed3 = new EmbedBuilder()
                                                                                                                                                   .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                                   .setTitle(`***Please Provide Me The BotID ***`)
                                                                                                                                                   .setColor("#3dbeff")
                                                                                                           
                                                                                                                                                   b.user.send({
                                                                                                                                                        embeds: [embed3]
                                                                                                                                                   })
                                                                                                                                                   
                                                                                                                                                   interaction.user.createDM().then(dm => dm.awaitMessages({
                                                                                                                                                        filter:  m => m.author.id === interaction.user.id, 
                                                                                                                                                        max: 1, 
                                                                                                                                                        time: 30000 
                                                                                                                                                   }).then(async (collected1) => {
                                                                                                                                                        const BotIdContent = collected1.first().content
                                                                                                                                                        if (BotIdContent.length > 20) {
                                                                                                                                                             interaction.user.send({
                                                                                                                                                                  embeds: [
                                                                                                                                                                            new EmbedBuilder()
                                                                                                                                                                            .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                                                            .setTitle(`*** BotID Option Invaild ***`)
                                                                                                                                                                            .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                                                                                                            .setColor("#3dbeff")
                                                                                                                                                                  ]
                                                                                                                                                             })
                                                                                                                                                             return channel.delete()
                                                                                                                                                             }
                                                                                                                                                             
                                                                                                           
                                                                                                                                                             botId +=  BotIdContent
                                                                                                           
                                                                                                                                                             client.channels.fetch(channel.id).then(ch => {
                                                                                                                                                             ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                                                                                                  MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n> <:passed:1023811776850186261>  Entire Bot Information\n> <:blank:1032239573054537798> Get Bot Created\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` \n> <:passed:1023811776850186261>  Bot Prefix: \`${PrefixContent}\`\n> <:passed:1023811776850186261>  Bot Id: \`${botId}\`\n> <:passed:1023811776850186261>  Bot Owner: <@${interaction.user.id}>`)                                                                                                                                       
                                                                                                                                                                  msg.edit({
                                                                                                                                                                       embeds: [MainEmbed]
                                                                                                                                                                  })
                                                                                                                                                             })
                                                                                                                                                        })
                                                                                            
                                                                                            
                                                                                                                                                        interaction.user.send({
                                                                                                                                                                embeds: [
                                                                                                                                                                        new EmbedBuilder()
                                                                                                                                                                        .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                                                        .setTitle(`<:passed:1023811776850186261>  Bot Creation Submit Successfully`)
                                                                                                                                                                        .setDescription(`Channel: <#${channel.id}>`)
                                                                                                                                                                        .setColor("#3dbeff")
                                                                                                                                                                ]
                                                                                                                                                        })
                                                                                                                                              
                                                                                                           
                                                                                                                                                        const ConfirmButton = new ButtonBuilder()
                                                                                                                                                        .setCustomId("Confirm-Creation")
                                                                                                                                                        .setDisabled(true)
                                                                                                                                                        .setLabel("Confirm, Create Bot")
                                                                                                                                                        .setEmoji("1023811776850186261")
                                                                                                                                                        .setStyle(ButtonStyle.Secondary)
                                                                                                                                                        
                                                                                                                                                        const CancelButton = new ButtonBuilder()
                                                                                                                                                        .setCustomId("Cancel-Creation")
                                                                                                                                                        .setDisabled(true)
                                                                                                                                                        .setLabel("Cancel")
                                                                                                                                                        .setEmoji("1023811778087485491")
                                                                                                                                                        .setStyle(ButtonStyle.Secondary)
                                                                                                           
                                                                                                                                                        const InviteButton = new ButtonBuilder()
                                                                                                                                                        .setLabel("Invite-Bot")
                                                                                                                                                        .setEmoji("1018006848399482881")
                                                                                                                                                        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${botId}&permissions=0&scope=bot`)
                                                                                                                                                        .setStyle(ButtonStyle.Link)
                                                                                                           
                                                                                                           
                                                                                                           
                                                                                                                                                        const row = new ActionRowBuilder()
                                                                                                                                                        .addComponents(ConfirmButton, CancelButton, InviteButton)
                                                                                                           
                                                                                                           
                                                                                                                                                        client.channels.fetch(msg.channel.id).then(ch => {
                                                                                                                                                             ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                                                                                                     msg.edit({
                                                                                                                                                                             components: [row]
                                                                                                                                                                     })
                                                                                                                                                             })
                                                                                                                                                        })
                                                                                                           
                                                                                                           
                                                                                                           
                                                                                                           
                                                                                                                                                        const embed5 = new EmbedBuilder()
                                                                                                                                                        .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                                        .setColor("#3dbeff")
                                                                                                                                                        .setDescription(`Hello Admin's of Roverdev! Please Invite the Discord Bot Above for the Buttons to Enable! So you Can Create the bot`)
                                                                                                      
                                                                                                      
                                                                                                                                                       channel.send({
                                                                                                                                                             embeds: [embed5],
                                                                                                                                                             // content: `(<@&920292438294294538>) Creation is Ready!\n> ( <@&1005978927421980702>) Have Questions? Ask our Staff Members! `
                                                                                                                                                       })
                                                                                                           
                                                                                                           
                                                                                                                                                        channel.permissionOverwrites.edit("1005978927421980702", { ViewChannel: true, SendMessages: true, ReadMessageHistory: true})
                                                                                                                                                        channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true, SendMessages: true, ReadMessageHistory: true})
                                                                                                           
                                                                                                           
                                                                                                                                                        
                                                                                                           
                                                                                                                                                        client.Createbot.set(channel.id, token, "BotToken")
                                                                                                                                                        client.Createbot.set(channel.id, BotType, "BotType")
                                                                                                                                                        
                                                                                                                                                        client.Createbot.set(channel.id, HostingDuration, "HostingDuration")
                                                                                                                                                        client.Createbot.set(channel.id, prefix, "BotPrefix")
                                                                                                                                                        client.Createbot.set(channel.id, interaction.user.id, "BotOwner")
                                                                                                                                                        client.Createbot.set(channel.id, interaction.user.username, "BotOwnerName")
                                                                                                                                                        client.Createbot.set(channel.id, botId, "BotID")
                                                                   
                                                                                                                                                        client.Createbot.set(channel.id, PaymentType, "PaymentType")
                                                                   
                                                                                                                                                        if (BotType == "Ticket-Bot") {
                                                                                                                                                             TicketBotsCategory(client, channel)
                                                                                                                                                             setTimeout(() => {
                                                                                                                                                                  channel.permissionOverwrites.set([
                                                                                                                                                                       {
                                                                                                                                                                            id: interaction.user.id,
                                                                                                                                                                            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                                                                                                                                                                       },
                                                                                                                                                                       {
                                                                                                                                                                            id: interaction.guild.roles.everyone,
                                                                                                                                                                            deny: [PermissionFlagsBits.ViewChannel]
                                                                                                                                                                       },
                                                                                                                                                                       {
                                                                                                                                                                            id: "1005978927421980702",
                                                                                                                                                                            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                                                                                                                                                                       } 
                                                                                                                                                                  ]);
                                                                                                                                                             }, 500);
                                                                                                                                                        } else if (BotType == "JTC-Bot")  {
                                                                                                                                                                  JTCBotsCategory(client, channel)
                                                                                                                                                                  setTimeout(() => {
                                                                                                                                                                  channel.permissionOverwrites.set([
                                                                                                                                                                       {
                                                                                                                                                                            id: interaction.user.id,
                                                                                                                                                                            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                                                                                                                                                                       },
                                                                                                                                                                       {
                                                                                                                                                                            id: interaction.guild.roles.everyone,
                                                                                                                                                                            deny: [PermissionFlagsBits.ViewChannel]
                                                                                                                                                                       },
                                                                                                                                                                       {
                                                                                                                                                                            id: "1005978927421980702",
                                                                                                                                                                            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                                                                                                                                                                       } 
                                                                                                                                                                  ]);
                                                                                                                                                             }, 500);
                                                                                                                                                        }
                                                                                                                                                        
                                                                                                                                                        client.Createbot.set(botId, channel.id, "ChannelID")
                                                                                            
                                                                                                                                                        if (SSettings.MultiServer == true) {
                                                                                                                                                             const ShopServer1 = client.Createbot.get(interaction.guild.id, "HostingServer1")
                                                                                                                                                             const ShopServer2 = client.Createbot.get(interaction.guild.id, "HostingServer2")
                                                                   
                                                                                                                                                             if (ShopServer1 < ShopServer2 && ShopServer2 > ShopServer1) {
                                                                                                                                                                   client.Createbot.set(channel.id, "shopserver1", "ShopServer")
                                                                                                                                                             }
                                                                                                          
                                                                                                                                                             if (ShopServer2 < ShopServer1 && ShopServer1 > ShopServer2) {
                                                                                                                                                                   client.Createbot.set(channel.id, "shopserver2", "ShopServer")
                                                                                                                                                             }
                                                                                                                                                        }
                                                                   
                                                                                                                                                        if (SSettings.MultiServer == false) {
                                                                                                                                                             client.Createbot.set(channel.id, "shopserver2", "ShopServer")
                                                                                                                                                        }
                                                                                                                                                        }))}))}))} catch (err) {return;}} )})})})})
                                                                                                                                                   }
                                                                        
                                                                                                                                                   if (b.customId == "Cancel-Action") {
                                                                                                                                                        return CloseTicket(interaction,channel,client) 
                                                                                                                                                   }
                                                                                                                                                  })
                                                                           }
                                                                           if (b.values == "Money-Payment") {
                                                                                       
                                                                           }
                   }})})})})})})}})})})})})})}
     
                                                  if (b.customId == "CreateBot-SelectMenu2") {
                                                       client.Createbot.set(channel.id, "Premium", "ShopType")
                                                       Collected1.push("Selected.")
                                                       BotType += b.values
                                                       MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type \n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\``)
                                                       client.channels.fetch(channel.id).then(ch => {
                                                       ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                       msg.edit({
                                                       embeds: [MainEmbed]
                                                       })
                                                       embed2.setTitle(`~~***Please Select the Bot You Want to Create***~~`)
                                                       
                                                       client.channels.fetch(msg.channel.id).then(ch => {
                                                       ch.messages.fetch(client.settings.get(ch.id, "BotType-Message")).then(async msg => {
                                                     await msg.edit({
                                                       embeds: [embed2],
                                                       components: [],
                                                       content: `*** <:passed:1023811776850186261>  Selected Bot Type: ${b.values} ***`
                                                       }).then(async (msg) => {
                                                       const embed3 = new EmbedBuilder()
                                                       .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                       .setTitle(`***Please Select The Hosting Duration Time***`)
                                                       .setColor("#3dbeff")
                                                       
                                                       const SelectMenu = new SelectMenuBuilder()
                                                       .setCustomId(`Duration`)
                                                       .setDisabled(false)
                                                       .setPlaceholder(`Please Select the Duration Option.`)
                                                       .setOptions(
                                                       {
                                                       label: "1 Week",
                                                       value: `1-Week-Hosting`,
                                                       description: "1 Week of Bot Hosting"
                                                       },
                                                       { 
                                                       label: "1 Month",
                                                       value: `1-Month-Hosting`,
                                                       description: "1 Month of Bot Hosting"
                                                       },
                                                       {
                                                       label: "1 Year",
                                                       value: `1-Year-Hosting`,
                                                       description: "1 Year of Bot Hosting"
                                                       },
                                                       )
                                                  
                                                  
                                                       const bots = client.Bots.get(interaction.user.id, "Bots")
                                                  
                                                       if (bots.length < 1) {
                                                               SelectMenu.setOptions(
                                                                 {
                                                                      label: "Free Bot",
                                                                      value: `Free-Bot`,
                                                                      description: "This is your First Free Bot"
                                                                      }
                                                               )
                                                       }
                                                  
                                                       if (bots.length > 1) {
                                                            SelectMenu.setOptions(
                                                                 {
                                                                      label: "1 Week",
                                                                      value: `1-Week-Hosting`,
                                                                      description: "1 Week of Bot Hosting"
                                                                      },
                                                                      { 
                                                                      label: "1 Month",
                                                                      value: `1-Month-Hosting`,
                                                                      description: "1 Month of Bot Hosting"
                                                                      },
                                                                      {
                                                                      label: "1 Year",
                                                                      value: `1-Year-Hosting`,
                                                                      description: "1 Year of Bot Hosting"
                                                                      },
                                                            )
                                                    }
                                                       
                                                  
                                                       const row3 = new ActionRowBuilder()
                                                       .addComponents(SelectMenu)
                                                       
                                                       await msg.reply({
                                                       embeds: [embed3],
                                                       components: [row3]
                                                       }).then((msg) => {
                                                       client.settings.set(msg.channel.id, msg.id, "Hosting-Message")
                                                       })
                                                       let collector2 = channel.createMessageComponentCollector({time: 60000});
                                                       
                                                       collector2.on("collect" , async (b) => {
                                                        try {
                                                            if (b.user.id !== interaction.user.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${interaction.user.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                                                        } catch(e) {
                                                              return;
                                                        }
                                                       
                                                       if (b.customId == "Duration") {
                                                       HostingDuration += b.values
                                                       MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\``)
                                                       client.channels.fetch(channel.id).then(ch => {
                                                       ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                       msg.edit({
                                                       embeds: [MainEmbed]
                                                       })
                                                       embed3.setTitle(`~~***Please Select The Hosting Duration Time***~~`)
                                                       
                                                       client.channels.fetch(msg.channel.id).then(ch => {
                                                       ch.messages.fetch(client.settings.get(ch.id, "Hosting-Message")).then(async msg => {
                                                       msg.edit({
                                                       embeds: [embed3],
                                                       components: [],
                                                       content: `*** <:passed:1023811776850186261>  Selected Duration: ${HostingDuration} ***`
                                                       }).then((msg) => {
                                                       const embed3 = new EmbedBuilder()
                                                       .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                       .setTitle(`***Please Select The Bot Payment Type***`)
                                                       .setDescription(`:warning: Next  Message is For Create bot Make sure to have dms open!!`)
                                                       .setColor("#3dbeff")
                                                       
                                                       const SelectMenu = new SelectMenuBuilder()
                                                       .setCustomId(`Payment`)
                                                       .setDisabled(false)
                                                       .setPlaceholder(`Please Select the Payment Option.`)
                                                       .setOptions(
                                                        {
                                                       label: "Invites Option",
                                                       value: `Invites-Payment`,
                                                       description: "Invites Payment"
                                                       },  {
                                                       label: "Boost Option",
                                                       value: `Boost-Payment`,
                                                       description: "Boost Payment"
                                                       },  {
                                                       label: "Messages Option",
                                                       value: `Messages-Payment`,
                                                       description: "Messages Payment"
                                                       },  {
                                                       label: "Money Option",
                                                       value: `Money-Payment`,
                                                       description: "Donation Payment"
                                                       },
                                                       )
                                                  
                                                       const bots = client.Bots.get(interaction.user.id, "Bots")
                                                  
                                                       if (bots.length < 1) {
                                                               SelectMenu.setOptions(
                                                                 {
                                                                      label: "Free Option",
                                                                      value: `Free-Bot`,
                                                                      description: "First Bot You Ever Made"
                                                                 },
                                                               )
                                                       }
                                                  
                                                  
                                                       
                                                       const row3 = new ActionRowBuilder()
                                                       .addComponents(SelectMenu)
                                                       
                                                       msg.reply({
                                                       embeds: [embed3],
                                                       components: [row3]
                                                       }).then((msg) => {
                                                       client.settings.set(msg.channel.id, msg.id, "Payment-Message")
                                                       })
                                                       let collector2 = channel.createMessageComponentCollector({time: 60000, });
                                                       collector2.on("collect" , async (b) => {
                                                            try {
                                                                 if (b.user.id !== interaction.user.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${interaction.user.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                                                             } catch(e) {
                                                                   return;
                                                             }
                                                       
                                                           if (b.customId == "Payment") {
                                                  
                                                            if (b.values == "Free-Bot") {
                                                                
                    PaymentType += `Free-Bot`

                    client.channels.fetch(channel.id).then(ch => {
                    ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                    MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` `)
                    msg.edit({
                    embeds: [MainEmbed]
                    })
                    embed3.setTitle(`~~***Please Select The Bot Payment Type***~~`)
                    
                    client.channels.fetch(msg.channel.id).then(ch => {
                    ch.messages.fetch(client.settings.get(ch.id, "Payment-Message")).then(async msg => {
                    msg.edit({
                    embeds: [embed3],
                    components: [],
                    content: `*** <:passed:1023811776850186261>  Selected Payment: ${PaymentType} ***`
                    }).then((msg) => {
                                   const embed3 = new EmbedBuilder()
                                   .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                   .setTitle(`***Please Provide Me The Bot Token***`)
                                   .setColor("#3dbeff")
               
                                   const embed4 = new EmbedBuilder()
                                   .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                   .setTitle(`-> ***Check your Direct Messages Please***`)
                                   .setColor("#3dbeff")
               
                                   const embed5 = new EmbedBuilder()
                                   .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                   .setTitle(`-> ***Please Enable your DMS! (Channel will be deleted in 10s) ***`)
                                   .setDescription(`{error}`)
                                   .setColor("Red")
               
               
                                        msg.channel.send({ embeds: [embed4] }).then((m) =>{
                                             setTimeout(() => {
                                                  m.delete()
                                             }, 5000);
                                        })
               
                                        
                                        client.Createbot.set(channel.id, false, "Error")
               
                                         b.user.send({
                                                  embeds: [embed3]
                                             }).catch((e) => {
                                        
                                             client.Createbot.set(channel.id, true, "Error")
               
                                             embed5.setDescription(`{error}`.replace("{error}", e))
               
                                             setTimeout(() => {
                                                  channel.delete()
                                              }, 10000);
               
                                             channel.send({
                                                  embeds: [embed5],
                                                  content: `${interaction.user}`
                                           })
               
                                        })
               
                                        client.channels.fetch(msg.channel.id).then(ch => {
                                             setTimeout(() => {
                                                  ch.messages.fetch(client.settings.get(ch.id, "Payment-Message")).then(async msg => {
                                                       msg.delete()
                                                  })
                    
                                                  ch.messages.fetch(client.settings.get(ch.id, "Hosting-Message")).then(async msg => {
                                                       msg.delete()
                                                  })
                    
                                                  ch.messages.fetch(client.settings.get(ch.id, "BotType-Message")).then(async msg => {
                                                       msg.delete()
                                                  })
     
                                                  ch.messages.fetch(client.settings.get(ch.id, "Pending-Payment")).then(async msg => {
                                                       msg.delete()
                                                  })
                                             }, 500);
                                        })
               
               
                                        try {
                                             interaction.user.createDM().then(dm => dm.awaitMessages({
                                                  filter:  m => m.author.id === interaction.user.id, 
                                                  max: 1, 
                                                  time: 60000 
                                                  }).then(async (collected1) => {
               
                                                       if (!collected1) return;
               
                                                       const Token = collected1.first().content
                                                       let workingtoken = await checktoken(Token, client);
                              
                                                       token += Token
                              
                                                       if (!workingtoken) {
                                                            interaction.user.send({
                                                                 embeds: [
                                                                           new EmbedBuilder()
                                                                           .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                           .setTitle(`*** Token Option Invaild ***`)
                                                                           .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                           .setColor("#3dbeff")
                                                                 ],
                                                            })
                                                            return channel.delete()
                                                       }
                              
                                                            
                                                            const embed3 = new EmbedBuilder()
                                                            .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                            .setTitle(`***Please Provide Me The Bot Prefix ***`)
                                                            .setColor("#3dbeff")
                              
                                                            b.user.send({
                                                                 embeds: [embed3]
                                                            })
                              
                              
                                                            
                                                            interaction.user.createDM().then(dm => dm.awaitMessages({
                                                                 filter:  m => m.author.id === interaction.user.id, 
                                                                 max: 1, time: 
                                                                 30000 
                                                            }).then(async (collected1) => {
                                                                 const PrefixContent = collected1.first().content
                                                                 if (PrefixContent.length > 3) {
                                                                           interaction.user.send({
                                                                                embeds: [
                                                                                     new EmbedBuilder()
                                                                                     .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                     .setTitle(`*** Prefix Option Invaild ***`)
                                                                                     .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                     .setColor("#3dbeff")
                                                                                ]
                                                                      })
                                                                      return channel.delete()
                                                                      }
                              
                                                                      prefix +=  PrefixContent
                              
                                                                      client.channels.fetch(channel.id).then(ch => {
                                                                      ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                           MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n> <:blank:1032239573054537798> Entire Bot Information\n> <:blank:1032239573054537798> Get Bot Created\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` \n> <:passed:1023811776850186261>  Bot Prefix: \`${PrefixContent}\``)                                                                                                                                       
                                                                           msg.edit({
                                                                                embeds: [MainEmbed]
                                                                           })
                                                                      })
                                                                 })
                                                                      
                                                                      const embed3 = new EmbedBuilder()
                                                                      .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                      .setTitle(`***Please Provide Me The BotID ***`)
                                                                      .setColor("#3dbeff")
                              
                                                                      b.user.send({
                                                                           embeds: [embed3]
                                                                      })
                                                                      
                                                                      interaction.user.createDM().then(dm => dm.awaitMessages({
                                                                           filter:  m => m.author.id === interaction.user.id, 
                                                                           max: 1, 
                                                                           time: 30000 
                                                                      }).then(async (collected1) => {
                                                                           const BotIdContent = collected1.first().content
                                                                           if (BotIdContent.length > 20) {
                                                                                interaction.user.send({
                                                                                     embeds: [
                                                                                               new EmbedBuilder()
                                                                                               .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                               .setTitle(`*** BotID Option Invaild ***`)
                                                                                               .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                               .setColor("#3dbeff")
                                                                                     ]
                                                                                })
                                                                                return channel.delete()
                                                                                }
                                                                                
                              
                                                                                botId +=  BotIdContent
                              
                                                                                client.channels.fetch(channel.id).then(ch => {
                                                                                ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                     MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n> <:passed:1023811776850186261>  Entire Bot Information\n> <:blank:1032239573054537798> Get Bot Created\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` \n> <:passed:1023811776850186261>  Bot Prefix: \`${PrefixContent}\`\n> <:passed:1023811776850186261>  Bot Id: \`${botId}\`\n> <:passed:1023811776850186261>  Bot Owner: <@${interaction.user.id}>`)                                                                                                                                       
                                                                                     msg.edit({
                                                                                          embeds: [MainEmbed]
                                                                                     })
                                                                                })
                                                                           })
               
               
                                                                           interaction.user.send({
                                                                                   embeds: [
                                                                                           new EmbedBuilder()
                                                                                           .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                           .setTitle(`<:passed:1023811776850186261>  Bot Creation Submit Successfully`)
                                                                                           .setDescription(`Channel: <#${channel.id}>`)
                                                                                           .setColor("#3dbeff")
                                                                                   ]
                                                                           })                                                        
                              
                                                                           const ConfirmButton = new ButtonBuilder()
                                                                           .setCustomId("Confirm-Creation")
                                                                           .setDisabled(true)
                                                                           .setLabel("Confirm, Create Bot")
                                                                           .setEmoji("1023811776850186261")
                                                                           .setStyle(ButtonStyle.Secondary)
                                                                           
                                                                           const CancelButton = new ButtonBuilder()
                                                                           .setCustomId("Cancel-Creation")
                                                                           .setDisabled(true)
                                                                           .setLabel("Cancel")
                                                                           .setEmoji("1023811778087485491")
                                                                           .setStyle(ButtonStyle.Secondary)
                              
                                                                           const InviteButton = new ButtonBuilder()
                                                                           .setLabel("Invite-Bot")
                                                                           .setEmoji("1018006848399482881")
                                                                           .setURL(`https://discord.com/api/oauth2/authorize?client_id=${botId}&permissions=0&scope=bot`)
                                                                           .setStyle(ButtonStyle.Link)
                              
                         
                              
                                                                           const row = new ActionRowBuilder()
                                                                           .addComponents(ConfirmButton, CancelButton, InviteButton)

                              
                                                                           client.channels.fetch(msg.channel.id).then(ch => {
                                                                                ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                        msg.edit({
                                                                                                components: [row]
                                                                                        })
                                                                                })
                                                                           })
                              
                              
                              
                              
                                                                           const embed5 = new EmbedBuilder()
                                                                           .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                           .setColor("#3dbeff")
                                                                           .setDescription(`Hello Admin's of Roverdev! Please Invite the Discord Bot Above for the Buttons to Enable! So you Can Create the bot`)
                         
                         
                                                                          channel.send({
                                                                                embeds: [embed5],
                                                                                // content: `(<@&920292438294294538>) Creation is Ready!\n> ( <@&1005978927421980702>) Have Questions? Ask our Staff Members! `
                                                                          })
                              
                              
                                                                           channel.permissionOverwrites.edit("1005978927421980702", { ViewChannel: true, SendMessages: true, ReadMessageHistory: true})
                                                                           channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true, SendMessages: true, ReadMessageHistory: true})
                              
                              
                                                                           
                              
                                                                           client.Createbot.set(channel.id, token, "BotToken")
                                                                           client.Createbot.set(channel.id, BotType, "BotType")
                                                                           
                                                                           client.Createbot.set(channel.id, HostingDuration, "HostingDuration")
                                                                           client.Createbot.set(channel.id, prefix, "BotPrefix")
                                                                           client.Createbot.set(channel.id, interaction.user.id, "BotOwner")
                                                                           client.Createbot.set(channel.id, interaction.user.username, "BotOwnerName")
                                                                           client.Createbot.set(channel.id, botId, "BotID")

                                                                           client.Createbot.set(channel.id, PaymentType, "PaymentType")

                                                                           
                                                                           if (BotType == "Ticket-Bot") {
                                                                                TicketBotsCategory(client, channel)
                                                                                setTimeout(() => {
                                                                                     channel.permissionOverwrites.set([
                                                                                          {
                                                                                               id: interaction.user.id,
                                                                                               allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                                                                                          },
                                                                                          {
                                                                                               id: interaction.guild.roles.everyone,
                                                                                               deny: [PermissionFlagsBits.ViewChannel]
                                                                                          },
                                                                                          {
                                                                                               id: "1005978927421980702",
                                                                                               allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                                                                                          } 
                                                                                     ]);
                                                                                }, 500);
                                                                           } else if (BotType == "JTC-Bot")  {
                                                                                     JTCBotsCategory(client, channel)
                                                                                     setTimeout(() => {
                                                                                     channel.permissionOverwrites.set([
                                                                                          {
                                                                                               id: interaction.user.id,
                                                                                               allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                                                                                          },
                                                                                          {
                                                                                               id: interaction.guild.roles.everyone,
                                                                                               deny: [PermissionFlagsBits.ViewChannel]
                                                                                          },
                                                                                          {
                                                                                               id: "1005978927421980702",
                                                                                               allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                                                                                          } 
                                                                                     ]);
                                                                                }, 500);
                                                                           }
                                                                           
                                                                           client.Createbot.set(botId, channel.id, "ChannelID")
               
                                                                           if (SSettings.MultiServer == true) {
                                                                                const ShopServer1 = client.Createbot.get(interaction.guild.id, "HostingServer1")
                                                                                const ShopServer2 = client.Createbot.get(interaction.guild.id, "HostingServer2")

                                                                                if (ShopServer1 < ShopServer2 && ShopServer2 > ShopServer1) {
                                                                                      client.Createbot.set(channel.id, "shopserver1", "ShopServer")
                                                                                }
                             
                                                                                if (ShopServer2 < ShopServer1 && ShopServer1 > ShopServer2) {
                                                                                      client.Createbot.set(channel.id, "shopserver2", "ShopServer")
                                                                                }
                                                                           }

                                                                           if (SSettings.MultiServer == false) {
                                                                                client.Createbot.set(channel.id, "shopserver2", "ShopServer")
                                                                           }
                                                                           }))}))}))} catch (err) {return;}} )})})})})
                                                            }
                                                  
                                                            if (b.values == "Messages-Payment") {
                                                  
                                                                 PaymentType += `Messages-Payment`
                                                  
                                                                 const messages = client.Ranking.get(interaction.guild.id, `${interaction.user.id}.TotalMessages`)
                                                  
                                                                 const amount = client.Createbot.get(interaction.guild.id, `BotType.${BotType}.messages`)
                                                  
                                                                 const HostingAmount = client.Createbot.get(interaction.guild.id, `HostingDuration.${HostingDuration}.messages`)
                                                  
                                                                 const total = amount + HostingAmount
                                                                 const PaymentToRemove = amount + HostingAmount
                                                  
                                                                 if (messages < total) {
                                                                      const embed = new EmbedBuilder()
                                                                      .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                      .setTitle(`You Don't have the Required Messages To get this Bot!`)
                                                                      .setDescription(`> You Have: ${messages}\n> You Need: ${total-messages}\n\n> Hosting Messages: ${HostingAmount}\n> Bot Amount: ${amount}\n\n> Hosting + Bot = ${total}`)
                                                                      .setColor("Red")
                                                  
                                                                      const MainRow = new ActionRowBuilder()
                                                                      .addComponents(
                                                                              new ButtonBuilder()
                                                                              .setCustomId("Close-Creation")
                                                                              .setEmoji("🔒")
                                                                              .setLabel("Close")
                                                                              .setStyle(ButtonStyle.Danger)
                                                                      )
                                                  
                                                                      return msg.reply({embeds: [embed], components: [MainRow]})
                                                                 }
                                                  
                                                                 const embed1 = new EmbedBuilder()
                                                                 .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                 .setTitle(`Are you Sure About this Action?`)
                                                                 .setDescription(`Are you Sure you want to spend ${total}/${messages} Messages | You will have ${messages-total} Left`)
                                                                 .setColor("Yellow")
                                                  
                                                                 const ConfirmButton = new ButtonBuilder()
                                                                 .setCustomId("Confirm-Action")
                                                                 .setLabel("Confirm")
                                                                 .setStyle(ButtonStyle.Danger)
                                                  
                                                                 const CancelButton = new ButtonBuilder()
                                                                 .setCustomId("Cancel-Action")
                                                                 .setLabel("Cancel")
                                                                 .setStyle(ButtonStyle.Secondary)
                                                                 
                                                                 const row = new ActionRowBuilder().addComponents(ConfirmButton, CancelButton)
                                                                 
                                                                 const msg1 = await msg.reply({embeds: [embed1], components: [row]}).then((msg) => {
                                                                      client.settings.set(msg.channel.id, msg.id, "Pending-Payment")
                                                                 })
                                                  
                                                                 let collector2 = channel.createMessageComponentCollector({time: 60000, });
                                                                 
                                                                 collector2.on("collect" , async (b) => {
                                                                      try {
                                                                           if (b.user.id !== interaction.user.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${interaction.user.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                                                                       } catch(e) {
                                                                             return;
                                                                       }
                                                                      
                                                                      if (b.customId == "Confirm-Action") {
                                                                           client.channels.fetch(channel.id).then(ch => {
                                                                           ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                           MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` `)
                                                                           msg.edit({
                                                                           embeds: [MainEmbed]
                                                                           })
                                                                           embed3.setTitle(`~~***Please Select The Bot Payment Type***~~`)
                                                                           
                                                                           client.channels.fetch(msg.channel.id).then(ch => {
                                                                           ch.messages.fetch(client.settings.get(ch.id, "Payment-Message")).then(async msg => {
                                                                           msg.edit({
                                                                           embeds: [embed3],
                                                                           components: [],
                                                                           content: `*** <:passed:1023811776850186261>  Selected Payment: ${PaymentType} ***`
                                                                           }).then((msg) => {
                                                                                          const embed3 = new EmbedBuilder()
                                                                                          .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                          .setTitle(`***Please Provide Me The Bot Token***`)
                                                                                          .setColor("#3dbeff")
                                                                      
                                                                                          const embed4 = new EmbedBuilder()
                                                                                          .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                          .setTitle(`-> ***Check your Direct Messages Please***`)
                                                                                          .setColor("#3dbeff")
                                                                      
                                                                                          const embed5 = new EmbedBuilder()
                                                                                          .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                          .setTitle(`-> ***Please Enable your DMS! (Channel will be deleted in 10s) ***`)
                                                                                          .setDescription(`{error}`)
                                                                                          .setColor("Red")
                                                                      
                                                                      
                                                                                               msg.channel.send({ embeds: [embed4] }).then((m) =>{
                                                                                                    setTimeout(() => {
                                                                                                         m.delete()
                                                                                                    }, 5000);
                                                                                               })
                                                                      
                                                                                               
                                                                                               client.Createbot.set(channel.id, false, "Error")
                                                                      
                                                                                                b.user.send({
                                                                                                         embeds: [embed3]
                                                                                                    }).catch((e) => {
                                                                                               
                                                                                                    client.Createbot.set(channel.id, true, "Error")
                                                                      
                                                                                                    embed5.setDescription(`{error}`.replace("{error}", e))
                                                                      
                                                                                                    setTimeout(() => {
                                                                                                         channel.delete()
                                                                                                     }, 10000);
                                                                      
                                                                                                    channel.send({
                                                                                                         embeds: [embed5],
                                                                                                         content: `${interaction.user}`
                                                                                                  })
                                                                      
                                                                                               })
                                                                      
                                                                                               client.channels.fetch(msg.channel.id).then(ch => {
                                                                                                    setTimeout(() => {
                                                                                                         ch.messages.fetch(client.settings.get(ch.id, "Payment-Message")).then(async msg => {
                                                                                                              msg.delete()
                                                                                                         })
                                                                           
                                                                                                         ch.messages.fetch(client.settings.get(ch.id, "Hosting-Message")).then(async msg => {
                                                                                                              msg.delete()
                                                                                                         })
                                                                           
                                                                                                         ch.messages.fetch(client.settings.get(ch.id, "BotType-Message")).then(async msg => {
                                                                                                              msg.delete()
                                                                                                         })
                                                  
                                                                                                         ch.messages.fetch(client.settings.get(ch.id, "Pending-Payment")).then(async msg => {
                                                                                                              msg.delete()
                                                                                                         })
                                                                                                    }, 500);
                                                                                               })
                                                                      
                                                                      
                                                                                               try {
                                                                                                    interaction.user.createDM().then(dm => dm.awaitMessages({
                                                                                                         filter:  m => m.author.id === interaction.user.id, 
                                                                                                         max: 1, 
                                                                                                         time: 60000 
                                                                                                         }).then(async (collected1) => {
                                                                      
                                                                                                              if (!collected1) return;
                                                                      
                                                                                                              const Token = collected1.first().content
                                                                                                              let workingtoken = await checktoken(Token, client);
                                                                                     
                                                                                                              token += Token
                                                                                     
                                                                                                              if (!workingtoken) {
                                                                                                                   interaction.user.send({
                                                                                                                        embeds: [
                                                                                                                                  new EmbedBuilder()
                                                                                                                                  .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                  .setTitle(`*** Token Option Invaild ***`)
                                                                                                                                  .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                                                                  .setColor("#3dbeff")
                                                                                                                        ],
                                                                                                                   })
                                                                                                                   return channel.delete()
                                                                                                              }
                                                                                     
                                                                                                                   
                                                                                                                   const embed3 = new EmbedBuilder()
                                                                                                                   .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                   .setTitle(`***Please Provide Me The Bot Prefix ***`)
                                                                                                                   .setColor("#3dbeff")
                                                                                     
                                                                                                                   b.user.send({
                                                                                                                        embeds: [embed3]
                                                                                                                   })
                                                                                     
                                                                                     
                                                                                                                   
                                                                                                                   interaction.user.createDM().then(dm => dm.awaitMessages({
                                                                                                                        filter:  m => m.author.id === interaction.user.id, 
                                                                                                                        max: 1, time: 
                                                                                                                        30000 
                                                                                                                   }).then(async (collected1) => {
                                                                                                                        const PrefixContent = collected1.first().content
                                                                                                                        if (PrefixContent.length > 3) {
                                                                                                                                  interaction.user.send({
                                                                                                                                       embeds: [
                                                                                                                                            new EmbedBuilder()
                                                                                                                                            .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                            .setTitle(`*** Prefix Option Invaild ***`)
                                                                                                                                            .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                                                                            .setColor("#3dbeff")
                                                                                                                                       ]
                                                                                                                             })
                                                                                                                             return channel.delete()
                                                                                                                             }
                                                                                     
                                                                                                                             prefix +=  PrefixContent
                                                                                     
                                                                                                                             client.channels.fetch(channel.id).then(ch => {
                                                                                                                             ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                                                                  MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n> <:blank:1032239573054537798> Entire Bot Information\n> <:blank:1032239573054537798> Get Bot Created\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` \n> <:passed:1023811776850186261>  Bot Prefix: \`${PrefixContent}\``)                                                                                                                                       
                                                                                                                                  msg.edit({
                                                                                                                                       embeds: [MainEmbed]
                                                                                                                                  })
                                                                                                                             })
                                                                                                                        })
                                                                                                                             
                                                                                                                             const embed3 = new EmbedBuilder()
                                                                                                                             .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                             .setTitle(`***Please Provide Me The BotID ***`)
                                                                                                                             .setColor("#3dbeff")
                                                                                     
                                                                                                                             b.user.send({
                                                                                                                                  embeds: [embed3]
                                                                                                                             })
                                                                                                                             
                                                                                                                             interaction.user.createDM().then(dm => dm.awaitMessages({
                                                                                                                                  filter:  m => m.author.id === interaction.user.id, 
                                                                                                                                  max: 1, 
                                                                                                                                  time: 30000 
                                                                                                                             }).then(async (collected1) => {
                                                                                                                                  const BotIdContent = collected1.first().content
                                                                                                                                  if (BotIdContent.length > 20) {
                                                                                                                                       interaction.user.send({
                                                                                                                                            embeds: [
                                                                                                                                                      new EmbedBuilder()
                                                                                                                                                      .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                                      .setTitle(`*** BotID Option Invaild ***`)
                                                                                                                                                      .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                                                                                      .setColor("#3dbeff")
                                                                                                                                            ]
                                                                                                                                       })
                                                                                                                                       return channel.delete()
                                                                                                                                       }
                                                                                                                                       
                                                                                     
                                                                                                                                       botId +=  BotIdContent
                                                                                     
                                                                                                                                       client.channels.fetch(channel.id).then(ch => {
                                                                                                                                       ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                                                                            MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n> <:passed:1023811776850186261>  Entire Bot Information\n> <:blank:1032239573054537798> Get Bot Created\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` \n> <:passed:1023811776850186261>  Bot Prefix: \`${PrefixContent}\`\n> <:passed:1023811776850186261>  Bot Id: \`${botId}\`\n> <:passed:1023811776850186261>  Bot Owner: <@${interaction.user.id}>`)                                                                                                                                       
                                                                                                                                            msg.edit({
                                                                                                                                                 embeds: [MainEmbed]
                                                                                                                                            })
                                                                                                                                       })
                                                                                                                                  })
                                                                      
                                                                      
                                                                                                                                  interaction.user.send({
                                                                                                                                          embeds: [
                                                                                                                                                  new EmbedBuilder()
                                                                                                                                                  .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                                  .setTitle(`<:passed:1023811776850186261>  Bot Creation Submit Successfully`)
                                                                                                                                                  .setDescription(`Channel: <#${channel.id}>`)
                                                                                                                                                  .setColor("#3dbeff")
                                                                                                                                          ]
                                                                                                                                  })
                                                                                                                        
                                                                                     
                                                                                                                                  const ConfirmButton = new ButtonBuilder()
                                                                                                                                  .setCustomId("Confirm-Creation")
                                                                                                                                  .setDisabled(true)
                                                                                                                                  .setLabel("Confirm, Create Bot")
                                                                                                                                  .setEmoji("1023811776850186261")
                                                                                                                                  .setStyle(ButtonStyle.Secondary)
                                                                                                                                  
                                                                                                                                  const CancelButton = new ButtonBuilder()
                                                                                                                                  .setCustomId("Cancel-Creation")
                                                                                                                                  .setDisabled(true)
                                                                                                                                  .setLabel("Cancel")
                                                                                                                                  .setEmoji("1023811778087485491")
                                                                                                                                  .setStyle(ButtonStyle.Secondary)
                                                                                     
                                                                                                                                  const InviteButton = new ButtonBuilder()
                                                                                                                                  .setLabel("Invite-Bot")
                                                                                                                                  .setEmoji("1018006848399482881")
                                                                                                                                  .setURL(`https://discord.com/api/oauth2/authorize?client_id=${botId}&permissions=0&scope=bot`)
                                                                                                                                  .setStyle(ButtonStyle.Link)
                                                                                     
                                                                                     
                                                                                     
                                                                                                                                  const row = new ActionRowBuilder()
                                                                                                                                  .addComponents(ConfirmButton, CancelButton, InviteButton)
                                                                                     
                                                                                     
                                                                                                                                  client.channels.fetch(msg.channel.id).then(ch => {
                                                                                                                                       ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                                                                               msg.edit({
                                                                                                                                                       components: [row]
                                                                                                                                               })
                                                                                                                                       })
                                                                                                                                  })
                                                                                     
                                                                                     
                                                                                     
                                                                                     
                                                                                                                                  const embed5 = new EmbedBuilder()
                                                                                                                                  .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                  .setColor("#3dbeff")
                                                                                                                                  .setDescription(`Hello Admin's of Roverdev! Please Invite the Discord Bot Above for the Buttons to Enable! So you Can Create the bot`)
                                                                                
                                                                                
                                                                                                                                 channel.send({
                                                                                                                                       embeds: [embed5],
                                                                                                                                       // content: `(<@&920292438294294538>) Creation is Ready!\n> ( <@&1005978927421980702>) Have Questions? Ask our Staff Members! `
                                                                                                                                 })
                                                                                     
                                                                                     
                                                                                                                                  channel.permissionOverwrites.edit("1005978927421980702", { ViewChannel: true, SendMessages: true, ReadMessageHistory: true})
                                                                                                                                  channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true, SendMessages: true, ReadMessageHistory: true})
                                                                                     
                                                                                     
                                                                                                                                  
                                                                                     
                                                                                                                                  client.Createbot.set(channel.id, token, "BotToken")
                                                                                                                                  client.Createbot.set(channel.id, BotType, "BotType")
                                                                                                                                  client.Createbot.set(channel.id, HostingDuration, "HostingDuration")
                                                                                                                                  client.Createbot.set(channel.id, prefix, "BotPrefix")
                                                                                                                                  client.Createbot.set(channel.id, interaction.user.id, "BotOwner")
                                                                                                                                  client.Createbot.set(channel.id, interaction.user.username, "BotOwnerName")
                                                                                                                                  client.Createbot.set(channel.id, botId, "BotID")
                                                                                                                                  client.Createbot.set(channel.id, PaymentToRemove, `PaymentToRemove`)

                                                                                                                                  client.Createbot.set(channel.id, PaymentType, "PaymentType")
                                                                                                                                  
                                                                                                                                  if (BotType == "Ticket-Bot") {
                                                                                                                                       TicketBotsCategory(client, channel)
                                                                                                                                       setTimeout(() => {
                                                                                                                                            channel.permissionOverwrites.set([
                                                                                                                                                 {
                                                                                                                                                      id: interaction.user.id,
                                                                                                                                                      allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                                                                                                                                                 },
                                                                                                                                                 {
                                                                                                                                                      id: interaction.guild.roles.everyone,
                                                                                                                                                      deny: [PermissionFlagsBits.ViewChannel]
                                                                                                                                                 },
                                                                                                                                                 {
                                                                                                                                                      id: "1005978927421980702",
                                                                                                                                                      allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                                                                                                                                                 } 
                                                                                                                                            ]);
                                                                                                                                       }, 500);
                                                                                                                                  } else if (BotType == "JTC-Bot")  {
                                                                                                                                            JTCBotsCategory(client, channel)
                                                                                                                                            setTimeout(() => {
                                                                                                                                            channel.permissionOverwrites.set([
                                                                                                                                                 {
                                                                                                                                                      id: interaction.user.id,
                                                                                                                                                      allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                                                                                                                                                 },
                                                                                                                                                 {
                                                                                                                                                      id: interaction.guild.roles.everyone,
                                                                                                                                                      deny: [PermissionFlagsBits.ViewChannel]
                                                                                                                                                 },
                                                                                                                                                 {
                                                                                                                                                      id: "1005978927421980702",
                                                                                                                                                      allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                                                                                                                                                 } 
                                                                                                                                            ]);
                                                                                                                                       }, 500);
                                                                                                                                  }
                                                                                                                                  
                                                                                                                                  client.Createbot.set(botId, channel.id, "ChannelID")
                                                                      
                                                                                                                                  if (SSettings.MultiServer == true) {
                                                                                                                                       const ShopServer1 = client.Createbot.get(interaction.guild.id, "HostingServer1")
                                                                                                                                       const ShopServer2 = client.Createbot.get(interaction.guild.id, "HostingServer2")

                                                                                                                                       if (ShopServer1 < ShopServer2 && ShopServer2 > ShopServer1) {
                                                                                                                                             client.Createbot.set(channel.id, "shopserver1", "ShopServer")
                                                                                                                                       }
                                                                                    
                                                                                                                                       if (ShopServer2 < ShopServer1 && ShopServer1 > ShopServer2) {
                                                                                                                                             client.Createbot.set(channel.id, "shopserver2", "ShopServer")
                                                                                                                                       }
                                                                                                                                  }

                                                                                                                                  if (SSettings.MultiServer == false) {
                                                                                                                                       client.Createbot.set(channel.id, "shopserver2", "ShopServer")
                                                                                                                                  }
                                                                                                                                  
                                                                                                                                  }))}))}))} catch (err) {return;}} )})})})})
                                                                                                                             }
                                                  
                                                                                                                             if (b.customId == "Cancel-Action") {
                                                                                                                                           return CloseTicket(interaction,channel,client) 
                                                                                                                             }
                                                                                                                            })
                                                                                                                        }
                                                                                                                        
                                                                                                                        if (b.values == "Boost-Payment") {
                                                                                                                                    
                                                                                                                        }
                                                                                                                        if (b.values == "Invites-Payment") {
                                                  
                                                                                                                             PaymentType += `Invites-Payment`
                                                  
                                                                                                                                    const Invites = invites.get(interaction.guild.id, `${interaction.user.id}.TotalInvites`)
                                                  
                                                                                                                                    const amount = client.Createbot.get(interaction.guild.id, `BotType.${BotType}.Invites`)
                                                                                                                     
                                                                                                                                    const HostingAmount = client.Createbot.get(interaction.guild.id, `HostingDuration.${HostingDuration}.Invites`)
                                                  
                                                                                                                                    const total = amount + HostingAmount
                                                  
                                                                                                                                    if (Invites < total) {
                                                                                                                                       const MainRow = new ActionRowBuilder()
                                                                                                                                       .addComponents(
                                                                                                                                               new ButtonBuilder()
                                                                                                                                               .setCustomId("Close-Creation")
                                                                                                                                               .setEmoji("🔒")
                                                                                                                                               .setLabel("Close")
                                                                                                                                               .setStyle(ButtonStyle.Danger)
                                                                                                                                       )
                                                                                                                                       const embed = new EmbedBuilder()
                                                                                                                                       .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                       .setTitle(`You Don't have the Required Invites To get this Bot!`)
                                                                                                                                       .setDescription(`> You Have: ${Invites}\n> You Need: ${total-Invites}\n\n> Hosting Invites: ${HostingAmount}\n> Bot Amount: ${amount}\n\n> Hosting + Bot = ${total}`)
                                                                                                                                       .setColor("Red")  
                                                  
                                                                                                                                       return msg.reply({embeds: [embed], components: [MainRow]})
                                                                                                                                    }
                                                  
                                                  
                                                              const embed1 = new EmbedBuilder()
                                                                 .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                 .setTitle(`Are you Sure About this Action?`)
                                                                 .setDescription(`Are you Sure you want to spend ${total}/${Invites} Invites | You will have ${Invites-total} Left`)
                                                                 .setColor("Yellow")
                                                  
                                                                 const ConfirmButton = new ButtonBuilder()
                                                                 .setCustomId("Confirm-Action")
                                                                 .setLabel("Confirm")
                                                                 .setStyle(ButtonStyle.Danger)
                                                  
                                                                 const CancelButton = new ButtonBuilder()
                                                                 .setCustomId("Cancel-Action")
                                                                 .setLabel("Cancel")
                                                                 .setStyle(ButtonStyle.Secondary)
                                                                 
                                                                 const row = new ActionRowBuilder().addComponents(ConfirmButton, CancelButton)
                                                                 
                                                                 const msg1 = await msg.reply({embeds: [embed1], components: [row]}).then((msg) => {
                                                                      client.settings.set(msg.channel.id, msg.id, "Pending-Payment")
                                                                 })
                                                  
                                                                 let collector2 = channel.createMessageComponentCollector({time: 60000, });
                                                                 
                                                                 collector2.on("collect" , async (b) => {
                                                                      try {
                                                                           if (b.user.id !== interaction.user.id) return interaction.reply({ content: `<a:Attention:1006701741812748410>  **Only <@${interaction.user.id}> Is allowed to react!**`, ephemeral: true }).catch((e) => {})
                                                                       } catch(e) {
                                                                             return;
                                                                       }
                                                                      
                                                                      if (b.customId == "Confirm-Action") {
                                                                           const Paymenremove = Invites-total
                                                                           client.Createbot.set(channel.id, Paymenremove, `PaymentToRemove`)
                                                  
                                                                           client.channels.fetch(channel.id).then(ch => {
                                                                           ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                           MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` `)
                                                                           msg.edit({
                                                                           embeds: [MainEmbed]
                                                                           })
                                                                           embed3.setTitle(`~~***Please Select The Bot Payment Type***~~`)
                                                                           
                                                                           client.channels.fetch(msg.channel.id).then(ch => {
                                                                           ch.messages.fetch(client.settings.get(ch.id, "Payment-Message")).then(async msg => {
                                                                           msg.edit({
                                                                           embeds: [embed3],
                                                                           components: [],
                                                                           content: `*** <:passed:1023811776850186261>  Selected Payment: ${PaymentType} ***`
                                                                           }).then((msg) => {
                                                                                          const embed3 = new EmbedBuilder()
                                                                                          .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                          .setTitle(`***Please Provide Me The Bot Token***`)
                                                                                          .setColor("#3dbeff")
                                                                      
                                                                                          const embed4 = new EmbedBuilder()
                                                                                          .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                          .setTitle(`-> ***Check your Direct Messages Please***`)
                                                                                          .setColor("#3dbeff")
                                                                      
                                                                                          const embed5 = new EmbedBuilder()
                                                                                          .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                          .setTitle(`-> ***Please Enable your DMS! (Channel will be deleted in 10s) ***`)
                                                                                          .setDescription(`{error}`)
                                                                                          .setColor("Red")
                                                                      
                                                                      
                                                                                               msg.channel.send({ embeds: [embed4] }).then((m) =>{
                                                                                                    setTimeout(() => {
                                                                                                         m.delete()
                                                                                                    }, 5000);
                                                                                               })
                                                                      
                                                                                               
                                                                                               client.Createbot.set(channel.id, false, "Error")
                                                                      
                                                                                                b.user.send({
                                                                                                         embeds: [embed3]
                                                                                                    }).catch((e) => {
                                                                                               
                                                                                                    client.Createbot.set(channel.id, true, "Error")
                                                                      
                                                                                                    embed5.setDescription(`{error}`.replace("{error}", e))
                                                                      
                                                                                                    setTimeout(() => {
                                                                                                         channel.delete()
                                                                                                     }, 10000);
                                                                      
                                                                                                    channel.send({
                                                                                                         embeds: [embed5],
                                                                                                         content: `${interaction.user}`
                                                                                                  })
                                                                      
                                                                                               })
                                                                      
                                                                                               client.channels.fetch(msg.channel.id).then(ch => {
                                                                                                    setTimeout(() => {
                                                                                                         ch.messages.fetch(client.settings.get(ch.id, "Payment-Message")).then(async msg => {
                                                                                                              msg.delete()
                                                                                                         })
                                                                           
                                                                                                         ch.messages.fetch(client.settings.get(ch.id, "Hosting-Message")).then(async msg => {
                                                                                                              msg.delete()
                                                                                                         })
                                                                           
                                                                                                         ch.messages.fetch(client.settings.get(ch.id, "BotType-Message")).then(async msg => {
                                                                                                              msg.delete()
                                                                                                         })
                                                  
                                                                                                         ch.messages.fetch(client.settings.get(ch.id, "Pending-Payment")).then(async msg => {
                                                                                                              msg.delete()
                                                                                                         })
                                                                                                    }, 500);
                                                                                               })
                                                                      
                                                                      
                                                                                               try {
                                                                                                    interaction.user.createDM().then(dm => dm.awaitMessages({
                                                                                                         filter:  m => m.author.id === interaction.user.id, 
                                                                                                         max: 1, 
                                                                                                         time: 60000 
                                                                                                         }).then(async (collected1) => {
                                                                      
                                                                                                              if (!collected1) return;
                                                                      
                                                                                                              const Token = collected1.first().content
                                                                                                              let workingtoken = await checktoken(Token, client);
                                                                                     
                                                                                                              token += Token
                                                                                     
                                                                                                              if (!workingtoken) {
                                                                                                                   interaction.user.send({
                                                                                                                        embeds: [
                                                                                                                                  new EmbedBuilder()
                                                                                                                                  .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                  .setTitle(`*** Token Option Invaild ***`)
                                                                                                                                  .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                                                                  .setColor("#3dbeff")
                                                                                                                        ],
                                                                                                                   })
                                                                                                                   return channel.delete()
                                                                                                              }
                                                                                     
                                                                                                                   
                                                                                                                   const embed3 = new EmbedBuilder()
                                                                                                                   .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                   .setTitle(`***Please Provide Me The Bot Prefix ***`)
                                                                                                                   .setColor("#3dbeff")
                                                                                     
                                                                                                                   b.user.send({
                                                                                                                        embeds: [embed3]
                                                                                                                   })
                                                                                     
                                                                                     
                                                                                                                   
                                                                                                                   interaction.user.createDM().then(dm => dm.awaitMessages({
                                                                                                                        filter:  m => m.author.id === interaction.user.id, 
                                                                                                                        max: 1, time: 
                                                                                                                        30000 
                                                                                                                   }).then(async (collected1) => {
                                                                                                                        const PrefixContent = collected1.first().content
                                                                                                                        if (PrefixContent.length > 3) {
                                                                                                                                  interaction.user.send({
                                                                                                                                       embeds: [
                                                                                                                                            new EmbedBuilder()
                                                                                                                                            .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                            .setTitle(`*** Prefix Option Invaild ***`)
                                                                                                                                            .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                                                                            .setColor("#3dbeff")
                                                                                                                                       ]
                                                                                                                             })
                                                                                                                             return channel.delete()
                                                                                                                             }
                                                                                     
                                                                                                                             prefix +=  PrefixContent
                                                                                     
                                                                                                                             client.channels.fetch(channel.id).then(ch => {
                                                                                                                             ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                                                                  MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n> <:blank:1032239573054537798> Entire Bot Information\n> <:blank:1032239573054537798> Get Bot Created\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` \n> <:passed:1023811776850186261>  Bot Prefix: \`${PrefixContent}\``)                                                                                                                                       
                                                                                                                                  msg.edit({
                                                                                                                                       embeds: [MainEmbed]
                                                                                                                                  })
                                                                                                                             })
                                                                                                                        })
                                                                                                                             
                                                                                                                             const embed3 = new EmbedBuilder()
                                                                                                                             .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                             .setTitle(`***Please Provide Me The BotID ***`)
                                                                                                                             .setColor("#3dbeff")
                                                                                     
                                                                                                                             b.user.send({
                                                                                                                                  embeds: [embed3]
                                                                                                                             })
                                                                                                                             
                                                                                                                             interaction.user.createDM().then(dm => dm.awaitMessages({
                                                                                                                                  filter:  m => m.author.id === interaction.user.id, 
                                                                                                                                  max: 1, 
                                                                                                                                  time: 30000 
                                                                                                                             }).then(async (collected1) => {
                                                                                                                                  const BotIdContent = collected1.first().content
                                                                                                                                  if (BotIdContent.length > 20) {
                                                                                                                                       interaction.user.send({
                                                                                                                                            embeds: [
                                                                                                                                                      new EmbedBuilder()
                                                                                                                                                      .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                                      .setTitle(`*** BotID Option Invaild ***`)
                                                                                                                                                      .setDescription(`Canceled The Creation\n> Head Over To: <#1011647871495454760> And Try Again!`)
                                                                                                                                                      .setColor("#3dbeff")
                                                                                                                                            ]
                                                                                                                                       })
                                                                                                                                       return channel.delete()
                                                                                                                                       }
                                                                                                                                       
                                                                                     
                                                                                                                                       botId +=  BotIdContent
                                                                                     
                                                                                                                                       client.channels.fetch(channel.id).then(ch => {
                                                                                                                                       ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                                                                            MainEmbed.setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n> <:passed:1023811776850186261>  Entire Bot Information\n> <:blank:1032239573054537798> Get Bot Created\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Not Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` \n> <:passed:1023811776850186261>  Bot Prefix: \`${PrefixContent}\`\n> <:passed:1023811776850186261>  Bot Id: \`${botId}\`\n> <:passed:1023811776850186261>  Bot Owner: <@${interaction.user.id}>`)                                                                                                                                       
                                                                                                                                            msg.edit({
                                                                                                                                                 embeds: [MainEmbed]
                                                                                                                                            })
                                                                                                                                       })
                                                                                                                                  })
                                                                      
                                                                      
                                                                                                                                  interaction.user.send({
                                                                                                                                          embeds: [
                                                                                                                                                  new EmbedBuilder()
                                                                                                                                                  .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                                  .setTitle(`<:passed:1023811776850186261>  Bot Creation Submit Successfully`)
                                                                                                                                                  .setDescription(`Channel: <#${channel.id}>`)
                                                                                                                                                  .setColor("#3dbeff")
                                                                                                                                          ]
                                                                                                                                  })
                                                                                                                        
                                                                                     
                                                                                                                                  const ConfirmButton = new ButtonBuilder()
                                                                                                                                  .setCustomId("Confirm-Creation")
                                                                                                                                  .setDisabled(true)
                                                                                                                                  .setLabel("Confirm, Create Bot")
                                                                                                                                  .setEmoji("1023811776850186261")
                                                                                                                                  .setStyle(ButtonStyle.Secondary)
                                                                                                                                  
                                                                                                                                  const CancelButton = new ButtonBuilder()
                                                                                                                                  .setCustomId("Cancel-Creation")
                                                                                                                                  .setDisabled(true)
                                                                                                                                  .setLabel("Cancel")
                                                                                                                                  .setEmoji("1023811776850186261")
                                                                                                                                  .setStyle(ButtonStyle.Secondary)
                                                                                     
                                                                                                                                  const InviteButton = new ButtonBuilder()
                                                                                                                                  .setLabel("Invite-Bot")
                                                                                                                                  .setEmoji("1018006848399482881")
                                                                                                                                  .setURL(`https://discord.com/api/oauth2/authorize?client_id=${botId}&permissions=0&scope=bot`)
                                                                                                                                  .setStyle(ButtonStyle.Link)
                                                                                     
                                                                                     
                                                                                     
                                                                                                                                  const row = new ActionRowBuilder()
                                                                                                                                  .addComponents(ConfirmButton, CancelButton, InviteButton)
                                                                                     
                                                                                     
                                                                                                                                  client.channels.fetch(msg.channel.id).then(ch => {
                                                                                                                                       ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                                                                               msg.edit({
                                                                                                                                                       components: [row]
                                                                                                                                               })
                                                                                                                                       })
                                                                                                                                  })
                                                                                     
                                                                                     
                                                                                     
                                                                                      
                                                                                                                                  const embed5 = new EmbedBuilder()
                                                                                                                                  .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                                                  .setColor("#3dbeff")
                                                                                                                                  .setDescription(`Hello Admin's of Roverdev! Please Invite the Discord Bot Above for the Buttons to Enable! So you Can Create the bot`)
                                                                                
                                                                                
                                                                                                                                 channel.send({
                                                                                                                                       embeds: [embed5],
                                                                                                                                       // content: `(<@&920292438294294538>) Creation is Ready!\n> ( <@&1005978927421980702>) Have Questions? Ask our Staff Members! `
                                                                                                                                 })
                                                                                     
                                                                                     
                                                                                                                                  channel.permissionOverwrites.edit("1005978927421980702", { ViewChannel: true, SendMessages: true, ReadMessageHistory: true})
                                                                                                                                  channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: true, SendMessages: true, ReadMessageHistory: true})
                                                                                     
                                                                                     
                                                                                                                                  
                                                                                     
                                                                                                                                  client.Createbot.set(channel.id, token, "BotToken")
                                                                                                                                  client.Createbot.set(channel.id, BotType, "BotType")
                                                                                                                                  
                                                                                                                                  client.Createbot.set(channel.id, HostingDuration, "HostingDuration")
                                                                                                                                  client.Createbot.set(channel.id, prefix, "BotPrefix")
                                                                                                                                  client.Createbot.set(channel.id, interaction.user.id, "BotOwner")
                                                                                                                                  client.Createbot.set(channel.id, interaction.user.username, "BotOwnerName")
                                                                                                                                  client.Createbot.set(channel.id, botId, "BotID")
                                                                                                                                  client.Createbot.set(channel.id, PaymentType, "PaymentType")
                                                                                     
                                                                                     
                                                                                                                                  if (BotType == "Ticket-Bot") {
                                                                                                                                       TicketBotsCategory(client, channel)
                                                                                                                                       setTimeout(() => {
                                                                                                                                            channel.permissionOverwrites.set([
                                                                                                                                                 {
                                                                                                                                                      id: interaction.user.id,
                                                                                                                                                      allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                                                                                                                                                 },
                                                                                                                                                 {
                                                                                                                                                      id: interaction.guild.roles.everyone,
                                                                                                                                                      deny: [PermissionFlagsBits.ViewChannel]
                                                                                                                                                 },
                                                                                                                                                 {
                                                                                                                                                      id: "1005978927421980702",
                                                                                                                                                      allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                                                                                                                                                 } 
                                                                                                                                            ]);
                                                                                                                                       }, 500);
                                                                                                                                  } else if (BotType == "JTC-Bot")  {
                                                                                                                                            JTCBotsCategory(client, channel)
                                                                                                                                            setTimeout(() => {
                                                                                                                                            channel.permissionOverwrites.set([
                                                                                                                                                 {
                                                                                                                                                      id: interaction.user.id,
                                                                                                                                                      allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory]
                                                                                                                                                 },
                                                                                                                                                 {
                                                                                                                                                      id: interaction.guild.roles.everyone,
                                                                                                                                                      deny: [PermissionFlagsBits.ViewChannel]
                                                                                                                                                 },
                                                                                                                                                 {
                                                                                                                                                      id: "1005978927421980702",
                                                                                                                                                      allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                                                                                                                                                 } 
                                                                                                                                            ]);
                                                                                                                                       }, 500);
                                                                                                                                  }
                                                                                                                                  
                                                                                                                                  client.Createbot.set(botId, channel.id, "ChannelID")
                                                                      
                                                                                                                                  if (SSettings.MultiServer == true) {
                                                                                                                                       const ShopServer1 = client.Createbot.get(interaction.guild.id, "HostingServer1")
                                                                                                                                       const ShopServer2 = client.Createbot.get(interaction.guild.id, "HostingServer2")

                                                                                                                                       if (ShopServer1 < ShopServer2 && ShopServer2 > ShopServer1) {
                                                                                                                                             client.Createbot.set(channel.id, "shopserver1", "ShopServer")
                                                                                                                                       }
                                                                                    
                                                                                                                                       if (ShopServer2 < ShopServer1 && ShopServer1 > ShopServer2) {
                                                                                                                                             client.Createbot.set(channel.id, "shopserver2", "ShopServer")
                                                                                                                                       }
                                                                                                                                  }

                                                                                                                                  if (SSettings.MultiServer == false) {
                                                                                                                                       client.Createbot.set(channel.id, "shopserver2", "ShopServer")
                                                                                                                                  }

                                                                                                                                  }))}))}))} catch (err) {return;}} )})})})})
                                                                                                                             }
                                                  
                                                                                                                             if (b.customId == "Cancel-Action") {
                                                                                                                                  return CloseTicket(interaction,channel,client) 
                                                                                                                             }
                                                                                                                            })
                                                                                                                        }
                                                                                                                        if (b.values == "Money-Payment") {
                                                                                                                                    
                                                                                                                        }
                                                                }})})})})})})}})})})})})})
                                                  }
     
                                                  b.deferUpdate().catch(e => {})
                                             })

                                             collector2.on("end",  async(collected) => {
                                                          if (Collected1.length < 1) {
                                                                  return InactiveTicket(channel, client)
                                                          }
                                                })
     
     
                         }, 2000);
     
     
     })
     }
     
     if (interaction.customId === 'Confirm-Creation') {
              if (!interaction.member.roles.cache.has("920292438294294538")) {
                         return interaction.reply({content: `You are not a Admin to Execute Create Bot`, ephemeral: true})    
              }

              const BotToken = client.Createbot.get(interaction.channel.id, "BotToken")
              const BotType = client.Createbot.get(interaction.channel.id, "BotType")
              const HostingDuration = client.Createbot.get(interaction.channel.id, "HostingDuration")
              const BotPrefix = client.Createbot.get(interaction.channel.id, "BotPrefix")
              const BotOwner = client.Createbot.get(interaction.channel.id, "BotOwner")
              const BotOwnerName = client.Createbot.get(interaction.channel.id, "BotOwnerName")
              const BotID = client.Createbot.get(interaction.channel.id, "BotID")
              const PaymentType = client.Createbot.get(interaction.channel.id, "PaymentType")
         
              const ShopServer = client.Createbot.get(interaction.channel.id, "ShopServer")

              const created = client.Createbot.get(interaction.channel.id, "Created")

              if (created == true) {
                     await  interaction.deferReply({ ephemeral: true })
                    return interaction.editReply({content: `:x: Bot is Allready Created on the Host!`, ephemeral: true})
              }
         

              await  interaction.deferUpdate()

               
              const axios = require("axios");

              const embed2 = new EmbedBuilder()
              .setAuthor({ name: `${interaction.guild.name} | Bot Creation Progress`, iconURL: "https://cdn.discordapp.com/emojis/1023872229857038417.png" })
              .setColor("#3dbeff")
              .addFields([
                      { name: `========================`, value: `\u200b`},
                      { name: "<a:TicketLoading:1023053249407877141> Creating the directory..", value: "\u200b" },
                      { name: "<:blank:1032239573054537798> Unzip {BotType}".replace("{BotType}", BotType), value: "\u200b" },
                      { name: "<:blank:1032239573054537798> Changing the Config File..", value: "\u200b" },
                      { name: "<:blank:1032239573054537798> Starting Discord Bot..", value: "\u200b" },
                      { name: "<:blank:1032239573054537798> Adding Some Roles..", value: "\u200b" },
                      { name: "<:blank:1032239573054537798> Finish the Creation..", value: "\u200b" },
              ])


              interaction.channel.send({embeds: [embed2]}).then((msg) => {
               axios({
                    method: 'post',
                     url: `https://${ShopServer}.roverdev.xyz/createbot/part1`,
                    data: {
                      SECRECT: "RoverdevSuperTopSecretPassword", 
                      type: BotType,
                      botname: client.users.cache.get(BotID).username
                    //   token: BotToken,
                    //   prefix: BotPrefix,
                    //   maker: interaction.user.id,
                    //   hostingduration: HostingDuration,
                    //   owner: BotOwner,
                    //   ownerId: BotOwnerName,
                    //   botid: BotID,
                    }
                  }).then(res => { // bottom one 
                     const resjson = res.data;
                    if (resjson.sucess == true) {
                         const embed2 = new EmbedBuilder()
                         .setAuthor({ name: `${interaction.guild.name} | Bot Creation Progress`, iconURL: "https://cdn.discordapp.com/emojis/1023872229857038417.png" })
                         .setColor("#3dbeff")
                         .addFields([
                                 { name: `========================`, value: `\u200b`},
                                 { name: "<:passed:1023811776850186261>  Created the Directory", value: "\u200b" },
                                 { name: "<a:TicketLoading:1023053249407877141> Unzip {BotType}".replace("{BotType}", BotType), value: "\u200b" },
                                 { name: "<:blank:1032239573054537798> Changing the Config File..", value: "\u200b" },
                                 { name: "<:blank:1032239573054537798> Starting Discord Bot..", value: "\u200b" },
                                 { name: "<:blank:1032239573054537798> Adding Some Roles..", value: "\u200b" },
                                 { name: "<:blank:1032239573054537798> Finish the Creation..", value: "\u200b" },
                         ])
                         msg.edit({ embeds: [embed2] })
                         setTimeout(() => {
                              axios({
                                   method: 'post',
                                   url: `https://${ShopServer}.roverdev.xyz/createbot/part2`,
                                   data: {
                                     SECRECT: "RoverdevSuperTopSecretPassword", 
                                     type: BotType,
                                     botname: client.users.cache.get(BotID).username
                                   }
                                 }).then(res => { // second bottom one
                                   const resjson = res.data;
                                   if (resjson.sucess == true) {
                                        const embed2 = new EmbedBuilder()
                                        .setAuthor({ name: `${interaction.guild.name} | Bot Creation Progress`, iconURL: "https://cdn.discordapp.com/emojis/1023872229857038417.png" })
                                        .setColor("#3dbeff")
                                        .addFields([
                                                { name: `========================`, value: `\u200b`},
                                                { name: "<:passed:1023811776850186261>  Created the Directory", value: "\u200b" },
                                                { name: "<:passed:1023811776850186261>  Unzipped {BotType}".replace("{BotType}", BotType), value: "\u200b" },
                                                { name: "<a:TicketLoading:1023053249407877141> Changing the Config File..", value: "\u200b" },
                                                { name: "<:blank:1032239573054537798> Starting Discord Bot..", value: "\u200b" },
                                                { name: "<:blank:1032239573054537798> Adding Some Roles..", value: "\u200b" },
                                                { name: "<:blank:1032239573054537798> Finish the Creation..", value: "\u200b" },
                                        ])
                                        msg.edit({ embeds: [embed2] })

                                        setTimeout(() => {
                                             axios({
                                                  method: 'post',
                                                  url: `https://${ShopServer}.roverdev.xyz/createbot/part3`,
                                                  data: {
                                                    SECRECT: "RoverdevSuperTopSecretPassword", 
                                                    token: BotToken,
                                                    prefix: BotPrefix,
                                                    owner: BotOwner,
                                                    botname: client.users.cache.get(BotID).username,
                                                    type: BotType,
                                                    
                                                  }
                                                }).then(res => { // third bottom
                                                  const resjson = res.data;

                                                  if (resjson.sucess == true) {
                                                       const embed2 = new EmbedBuilder()
                                                       .setAuthor({ name: `${interaction.guild.name} | Bot Creation Progress`, iconURL: "https://cdn.discordapp.com/emojis/1023872229857038417.png" })
                                                       .setColor("#3dbeff")
                                                       .addFields([
                                                               { name: `========================`, value: `\u200b`},
                                                               { name: "<:passed:1023811776850186261>  Created the Directory", value: "\u200b" },
                                                               { name: "<:passed:1023811776850186261>  Unzipped {BotType}".replace("{BotType}", BotType), value: "\u200b" },
                                                               { name: "<:passed:1023811776850186261>  Changed Config File", value: "\u200b" },
                                                               { name: "<a:TicketLoading:1023053249407877141> Starting Discord Bot..", value: "\u200b" },
                                                               { name: "<:blank:1032239573054537798> Adding Some Roles..", value: "\u200b" },
                                                               { name: "<:blank:1032239573054537798> Finish the Creation..", value: "\u200b" },
                                                       ])
                                                       msg.edit({ embeds: [embed2] })

                                                       setTimeout(() => {
                                                            axios({
                                                                 method: 'post',
                                                                 url: `https://${ShopServer}.roverdev.xyz/createbot/part4`,
                                                                 data: {
                                                                   SECRECT: "RoverdevSuperTopSecretPassword", 
                                                                   type: BotType,
                                                                   botname: client.users.cache.get(BotID).username,
                                                                   maker: interaction.user.id,
                                                                   owner: BotOwner,
                                                                 }
                                                               }).then(res => { // forth bottom
                                                                 const resjson = res.data;
                                                                 if (resjson.sucess == true) {
                                                                      const embed2 = new EmbedBuilder()
                                                                      .setAuthor({ name: `${interaction.guild.name} | Bot Creation Progress`, iconURL: "https://cdn.discordapp.com/emojis/1023872229857038417.png" })
                                                                      .setColor("#3dbeff")
                                                                      .addFields([
                                                                              { name: `========================`, value: `\u200b`},
                                                                              { name: "<:passed:1023811776850186261>  Created the Directory", value: "\u200b" },
                                                                              { name: "<:passed:1023811776850186261>  Unzipped {BotType}".replace("{BotType}", BotType), value: "\u200b" },
                                                                              { name: "<:passed:1023811776850186261>  Changed Config File", value: "\u200b" },
                                                                              { name: "<:passed:1023811776850186261>  Started Discord Bot", value: "\u200b" },
                                                                              { name: "<a:TicketLoading:1023053249407877141> Adding Some Roles..", value: "\u200b" },
                                                                              { name: "<:blank:1032239573054537798> Finish the Creation..", value: "\u200b" },
                                                                      ])
                                                                      msg.edit({ embeds: [embed2] })

                                                                      setTimeout(() => {
                                                                           axios({
                                                                                method: 'post',
                                                                                url: `https://${ShopServer}.roverdev.xyz/createbot/part5`,
                                                                                data: {
                                                                                  SECRECT: "RoverdevSuperTopSecretPassword", 
                                                                                  type: BotType,
                                                                                  botname: client.users.cache.get(BotID).username,
                                                                                }
                                                                              }).then(res => { // 5th bottom
                                                                                const resjson = res.data;
                                                                                if (resjson.sucess == true) {

                                                                                     interaction.guild.members.fetch(BotOwner).then((m) => { 
                                                                                          m.roles.add("970956115649105960")
                                                                                      }).catch(() => {});

                                                                                     const embed2 = new EmbedBuilder()
                                                                                     .setAuthor({ name: `${interaction.guild.name} | Bot Creation Progress`, iconURL: "https://cdn.discordapp.com/emojis/1023872229857038417.png" })
                                                                                     .setColor("#3dbeff")
                                                                                     .addFields([
                                                                                          { name: `========================`, value: `\u200b`},
                                                                                          { name: "<:passed:1023811776850186261>  Created the Directory", value: "\u200b" },
                                                                                          { name: "<:passed:1023811776850186261>  Unzipped {BotType}".replace("{BotType}", BotType), value: "\u200b" },
                                                                                          { name: "<:passed:1023811776850186261>  Changed Config File", value: "\u200b" },
                                                                                          { name: "<:passed:1023811776850186261>  Started Discord Bot", value: "\u200b" },
                                                                                          { name: "<:passed:1023811776850186261>  Added some roles", value: "\u200b" },
                                                                                          { name: "<a:TicketLoading:1023053249407877141> Finish the Creation..", value: "\u200b" },
                                                                                     ])
                                                                                     msg.edit({ embeds: [embed2] })
                                                                                     setTimeout(() => {
                                                                                          axios({
                                                                                               method: 'post',
                                                                                               url: `https://${ShopServer}.roverdev.xyz/createbot/part6`,
                                                                                               data: {
                                                                                                 SECRECT: "RoverdevSuperTopSecretPassword", 
                                                                                                 type: BotType,
                                                                                                 botname: client.users.cache.get(BotID).username,
                                                                                               }
                                                                                             }).then(res => { // sixth bottom
                                                                                               const resjson = res.data;
                                                                                               if (resjson.sucess == true) {


                                                                                                    client.channels.fetch(interaction.channel.id).then(ch => {
                                                                                                         ch.messages.fetch(client.settings.get(ch.id, "MessageId")).then(async msg => {
                                                                                                              const MainEmbed = new EmbedBuilder()
                                                                                                              .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://cdn.discordapp.com/emojis/1023872229857038417.png" })
                                                                                                              .setThumbnail(client.user.displayAvatarURL())
                                                                                                              .setImage("https://i.imgur.com/gOoC99V.png")
                                                                                                              .setColor("#3dbeff")
                                                                                                              .setDescription(`Please Follow the Steps Below  :\n> <:passed:1023811776850186261>  Select Your Bot Type\n> <:passed:1023811776850186261>  Select Your Hosting Duration\n> <:passed:1023811776850186261>  Select Your Bot Payment\n> <:passed:1023811776850186261>  Entire Bot Information\n> <:passed:1023811776850186261>  Get Bot Created\n\nBot User Information:\n> <:Info:1010183373119041597> Premium Status: ${client.settings.get(interaction.user.id, "PremiumStatus") ? "<a:orderitpremium:1014936957849182229> Activated" : "<a:orderitpremium:1014936957849182229> Not Activated"}\n> <:Info:1010183373119041597>  Bot Creation Status: Created\n\nBot Information:\n> <:passed:1023811776850186261>  Bot Type: \`${BotType}\`\n> <:passed:1023811776850186261>  Hosting Duration:  \`${HostingDuration}\`\n> <:passed:1023811776850186261>  Payment Type: \`${PaymentType}\` \n> <:passed:1023811776850186261>  Bot Prefix: \`${BotPrefix}\`\n> <:passed:1023811776850186261>  Bot Id: \`${BotID}\`\n> <:passed:1023811776850186261>  Bot Owner: <@${BotOwner}>`)                                                                                                                                       

                                                                                                              msg.edit({
                                                                                                                   embeds: [MainEmbed]
                                                                                                              })
                                                                                                         })
                                                                                                    })


                                                                                                    const user = client.users.cache.get(BotOwner)
                                                                                                    const bot = client.users.cache.get(BotID)

                                                                                                    interaction.channel.setTopic(`Bot Maker: ${interaction.user.username} | Bot Owner: ${BotOwnerName} | Status: Created`)
                                                                      
                                                                                                    const embed2 = new EmbedBuilder()
                                                                                                    .setAuthor({ name: `${interaction.guild.name} | Bot Creation`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
                                                                                                    .setColor("Green")
                                                                                                    .setTitle(`Your Discord Bot has been delivered!`)
                                                                                                    .setDescription(`<@${bot.id}> Is a __Hosted__ Bot From <#1011647871495454760>! It is a **\`${BotType}\`**!\n\nTo use It's Command, type \`/help Or ${BotPrefix}help Or Mention\` In your Server!\nJust Click the Invite button below to Invite it to your Server!\n ***Having Issues? Do: \`/botshop\` In <#1011562172477870100> to see all the shop commands!***`)
                                                                      

                                                                      
                                                                                                    interaction.channel.send({
                                                                                                         content: `<@${user.id}> Your Bot has been Created by: \`( ${client.users.cache.get(interaction.user.id).username} | ${interaction.user.id})\``,
                                                                                                         embeds: [embed2],
                                                                                                         components: [
                                                                                                              new ActionRowBuilder().addComponents(
                                                                                                                   new ButtonBuilder()
                                                                                                                   .setCustomId("Close-Creation")
                                                                                                                   .setEmoji("🔒")
                                                                                                                   .setLabel("Close")
                                                                                                                   .setStyle(ButtonStyle.Danger),
                                                                                                                new ButtonBuilder().setLabel(`Invite it!`).setEmoji(`🔗`).setStyle(ButtonStyle.Link).setURL(`https://discord.com/api/oauth2/authorize?client_id=${BotID}&permissions=8&scope=bot%20applications.commands`)
                                                                                                              ),
                                                                                                            ],
                                                                                                    })
                                                                      
                                                                                                    client.users.cache.get(user.id).send({
                                                                                                         content: `**Here Is Your BOT INFORMATION EMBED! You can Also use this to Show PROOF that you OWN the bot!**`,
                                                                                                         embeds: [
                                                                                                           new EmbedBuilder()
                                                                                                             .addFields([
                                                                                                               { name: "<a:Arrow:1020753364138594444> Path", value: `\`\`\`yml\n${resjson.path}\`\`\`` },
                                                                                                               { name: "<a:Arrow:1020753364138594444> Server", value: `\`\`\`yml\n${Math.floor(Math.random() * 250) + 1}\`\`\`` },
                                                                                                               { name: "<a:Arrow:1020753364138594444> Application Information", value: `\`\`\`yml\nName: ${bot.username}\nOwner: ${client.users.cache.get(user.id).username ? client.users.cache.get(user.id).username : "Unknown User"}\`\`\`` }
                                                                                                             ])
                                                                                                             .setColor("#3dbeff"),
                                                                                                         ],
                                                                                                       }).then((m) => m.pin().catch(() => { }))
                                                                      
                                                                      
                                                                      
                                                                                                       user.send({
                                                                                                         content: `<@${user.id}> Your Bot has been Created by: \`( ${client.users.cache.get(interaction.user.id).username} | ${interaction.user.id})\``,
                                                                                                         embeds: [embed2],
                                                                                                         components: [
                                                                                                              new ActionRowBuilder().addComponents(
                                                                                                                new ButtonBuilder().setLabel(`Invite it!`).setEmoji(`🔗`).setStyle(ButtonStyle.Link).setURL(`https://discord.com/api/oauth2/authorize?client_id=${BotID}&permissions=8&scope=bot%20applications.commands`)
                                                                                                              ),
                                                                                                            ],
                                                                                                    })

                                                                                                    const Messages = client.Createbot.get(interaction.channel.id, `PaymentToRemove`)
                                                                      
                                                                                                    client.Bots.set(bot.id, user.id, "BotOwner")
                                                                                                    client.Bots.set(bot.id, interaction.user.id, "BotMaker")
                                                                                                    client.Bots.set(bot.id, resjson.path, "BotPath")
                                                                                                    client.Bots.set(bot.id, ShopServer, "ShopServer")
                                                                                                    client.Bots.set(bot.id, HostingDuration, "HostingDuration")
                                                                                                    client.Bots.set(bot.id, BotType, "BotType")
                                                                                                    client.Bots.set(bot.id, PaymentType, "PaymentType")
                                                                                                    client.Bots.set(bot.id, Messages, "HowMuch")
                                                                                                    client.Bots.set(bot.id, Date.now(), "CreatedAt")


                                                                                                    const Total = client.settings.get(client.user.id, `TotalBots.${BotType}`) || 0

                                                                                                    client.settings.set(client.user.id, Total + 1,`TotalBots.Music-Bot`)
                                                                      
                                                                                                    client.Bots.ensure(user.id, {
                                                                                                            Bots: []
                                                                                                    })

                                                                                                    /**
                                                                                                     * @PAYMENT_TO_REMOVE
                                                                                                     */

                                                                                                    if (PaymentType == "Invites-Payment") {
                                                                                                            
                                                                                                    }
                                                                                                    if (PaymentType == "Boost-Payment") {
                                                                                                    }
                                                                                                    if (PaymentType == "Messages-Payment"){
                                                                                                         const messages = client.Ranking.get(interaction.guild.id, `${BotOwner}.TotalMessages`)

                                                                                                         const remove = client.Createbot.get(interaction.channel.id, `PaymentToRemove`)
                                                                                                         
                                                                                                         client.Ranking.set(interaction.guild.id, messages-remove ,`${BotOwner}.TotalMessages`)
                                                                                                    }
                                                                                                    if (PaymentType == "Money-Payment") {
                                                                                                          
                                                                                                    }

                                                                                                    if (HostingDuration == "1-Week-Hosting") {
                                                                                                         const ms = require("ms")
    
                                                                                                         let day = ms('1m');
                                                                                                   
                                                                                                         day = Date.now() + day

                                                                                                         client.BotPayment.set(BotID, day, "EndHosting")
                                                                                                         
                                                                                                         client.BotPayment.ensure(interaction.guild.id, {
                                                                                                                  TotalPaymentBots: []
                                                                                                         })

                                                                                                         client.BotPayment.push(interaction.guild.id, BotID, "TotalPaymentBots")
                                                                                                    }
                                                                                                    if (HostingDuration == "1-Month-Hosting") {
                                                                                                         const ms = require("ms")
    
                                                                                                         let day = ms("1 month")
                                                                                                   
                                                                                                         day = Date.now() + day

                                                                                                         client.BotPayment.set(BotID, day, "EndHosting")

                                                                                                         client.BotPayment.ensure(interaction.guild.id, {
                                                                                                              TotalPaymentBots: []
                                                                                                     })
                                                                                                     client.BotPayment.push(interaction.guild.id, BotID, "TotalPaymentBots")
                                                                                                                                                                                                        }
                                                                                                    if (HostingDuration == "1-Year-Hosting") {
                                                                                                         const ms = require("ms")
    
                                                                                                         let day = ms("1 year")
                                                                                                   
                                                                                                         day = Date.now() + day

                                                                                                         client.BotPayment.set(BotID, day, "EndHosting")

                                                                                                         client.BotPayment.ensure(interaction.guild.id, {
                                                                                                              TotalPaymentBots: []
                                                                                                     })
                                                                                                     client.BotPayment.push(interaction.guild.id, BotID, "TotalPaymentBots")
                                                                                                    }
                                                                       
                                                                                                    client.Bots.push(user.id, BotID, "Bots")
                                                                     
                                                                                                    client.Createbot.set(interaction.channel.id, true, "Created")                                                                     

                                                                                                    const embed1 = new EmbedBuilder()
                                                                                                    .setAuthor({ name: `${interaction.guild.name} | Bot Creation Success`, iconURL: "https://cdn.discordapp.com/emojis/1023811776850186261.webp?size=96&quality=lossless" })
                                                                                                    .setColor("#3dbeff")
                                                                                                    .addFields([
                                                                                                         { name: `========================`, value: `\u200b`},
                                                                                                         { name: "<:passed:1023811776850186261>  Created the Directory", value: "\u200b" },
                                                                                                         { name: "<:passed:1023811776850186261>  Unzipped {BotType}".replace("{BotType}", BotType), value: "\u200b" },
                                                                                                         { name: "<:passed:1023811776850186261>  Changed Config File", value: "\u200b" },
                                                                                                         { name: "<:passed:1023811776850186261>  Started Discord Bot", value: "\u200b" },
                                                                                                         { name: "<:passed:1023811776850186261>  Added some roles", value: "\u200b" },
                                                                                                         { name: "<:passed:1023811776850186261>  Finished the Creation", value: "\u200b" },
                                                                                                    ])
                                                                                                    msg.edit({ embeds: [embed1] })
                                                                                               }
                                                                                          }).catch((e) => {
                                                                                               const embed2 = new EmbedBuilder()
                                                                                               .setAuthor({ name: `${interaction.guild.name} | Bot Creation Failed`, iconURL: "https://i.imgur.com/EhZjvl8.png" })
                                                                                               .setColor("#3dbeff")
                                                                                               .addFields([
                                                                                                       { name: `========================`, value: `\u200b`},
                                                                                                       { name: "<:failed:1023811778087485491> Created the Directory", value: "\u200b" },
                                                                                                       { name: "<:failed:1023811778087485491> Unzip {BotType}".replace("{BotType}", BotType), value: "\u200b" },
                                                                                                       { name: "<:failed:1023811778087485491> Changing the Config File..", value: "\u200b" },
                                                                                                       { name: "<:failed:1023811778087485491>Starting Discord Bot..", value: "\u200b" },
                                                                                                       { name: "<:failed:1023811778087485491> Adding Some Roles..", value: "\u200b" },
                                                                                                       { name: "<:failed:1023811778087485491> Finish the Creation..", value: "\u200b" },
                                                                                               ])
                                                                                               msg.edit({ embeds: [embed2] })
                                                                                              })
                                                                                     }, 3000);
                                                                                }
                                                                           }).catch((e) => {
                                                                                const embed2 = new EmbedBuilder()
                                                                                .setAuthor({ name: `${interaction.guild.name} | Bot Creation Failed`, iconURL: "https://i.imgur.com/EhZjvl8.png" })
                                                                                .setColor("#3dbeff")
                                                                                .addFields([
                                                                                        { name: `========================`, value: `\u200b`},
                                                                                        { name: "<:failed:1023811778087485491> Created the Directory", value: "\u200b" },
                                                                                        { name: "<:failed:1023811778087485491> Unzip {BotType}".replace("{BotType}", BotType), value: "\u200b" },
                                                                                        { name: "<:failed:1023811778087485491> Changing the Config File..", value: "\u200b" },
                                                                                        { name: "<:failed:1023811778087485491>Starting Discord Bot..", value: "\u200b" },
                                                                                        { name: "<:failed:1023811778087485491> Adding Some Roles..", value: "\u200b" },
                                                                                        { name: "<:failed:1023811778087485491> Finish the Creation..", value: "\u200b" },
                                                                                ])
                                                                                msg.edit({ embeds: [embed2] })
                                                                               })
                                                                      }, 3000);
                                                                 }
                                                            }).catch((e) => {
                                                                 const embed2 = new EmbedBuilder()
                                                                 .setAuthor({ name: `${interaction.guild.name} | Bot Creation Failed`, iconURL: "https://i.imgur.com/EhZjvl8.png" })
                                                                 .setColor("#3dbeff")
                                                                 .addFields([
                                                                         { name: `========================`, value: `\u200b`},
                                                                         { name: "<:failed:1023811778087485491> Created the Directory", value: "\u200b" },
                                                                         { name: "<:failed:1023811778087485491> Unzip {BotType}".replace("{BotType}", BotType), value: "\u200b" },
                                                                         { name: "<:failed:1023811778087485491> Changing the Config File..", value: "\u200b" },
                                                                         { name: "<:failed:1023811778087485491>Starting Discord Bot..", value: "\u200b" },
                                                                         { name: "<:failed:1023811778087485491> Adding Some Roles..", value: "\u200b" },
                                                                         { name: "<:failed:1023811778087485491> Finish the Creation..", value: "\u200b" },
                                                                 ])
                                                                 msg.edit({ embeds: [embed2] })
                                                                })
                                                       }, 3000);
                                                  }
                                             }).catch((e) => {
                                                  const embed2 = new EmbedBuilder()
                                                  .setAuthor({ name: `${interaction.guild.name} | Bot Creation Failed`, iconURL: "https://i.imgur.com/EhZjvl8.png" })
                                                  .setColor("#3dbeff")
                                                  .addFields([
                                                          { name: `========================`, value: `\u200b`},
                                                          { name: "<:failed:1023811778087485491> Created the Directory", value: "\u200b" },
                                                          { name: "<:failed:1023811778087485491> Unzip {BotType}".replace("{BotType}", BotType), value: "\u200b" },
                                                          { name: "<:failed:1023811778087485491> Changing the Config File..", value: "\u200b" },
                                                          { name: "<:failed:1023811778087485491>Starting Discord Bot..", value: "\u200b" },
                                                          { name: "<:failed:1023811778087485491> Adding Some Roles..", value: "\u200b" },
                                                          { name: "<:failed:1023811778087485491> Finish the Creation..", value: "\u200b" },
                                                  ])
                                                  msg.edit({ embeds: [embed2] })
                                                 })
                                        }, 3000);
                                   }
                              }).catch((e) => {
                                   const embed2 = new EmbedBuilder()
                                   .setAuthor({ name: `${interaction.guild.name} | Bot Creation Failed`, iconURL: "https://i.imgur.com/EhZjvl8.png" })
                                   .setColor("#3dbeff")
                                   .addFields([
                                           { name: `========================`, value: `\u200b`},
                                           { name: "<:failed:1023811778087485491> Created the Directory", value: "\u200b" },
                                           { name: "<:failed:1023811778087485491> Unzip {BotType}".replace("{BotType}", BotType), value: "\u200b" },
                                           { name: "<:failed:1023811778087485491> Changing the Config File..", value: "\u200b" },
                                           { name: "<:failed:1023811778087485491>Starting Discord Bot..", value: "\u200b" },
                                           { name: "<:failed:1023811778087485491> Adding Some Roles..", value: "\u200b" },
                                           { name: "<:failed:1023811778087485491> Finish the Creation..", value: "\u200b" },
                                   ])
                                   msg.edit({ embeds: [embed2] })
                                  })
                         }, 3000);
                    }
                   }).catch((e) => {
                    const embed2 = new EmbedBuilder()
                    .setAuthor({ name: `${interaction.guild.name} | Bot Creation Progress`, iconURL: "https://i.imgur.com/EhZjvl8.png" })
                    .setColor("#3dbeff")
                    .addFields([
                            { name: `========================`, value: `\u200b`},
                            { name: "<:failed:1023811778087485491> Created the Directory", value: "\u200b" },
                            { name: "<:failed:1023811778087485491> Unzip {BotType}".replace("{BotType}", BotType), value: "\u200b" },
                            { name: "<:failed:1023811778087485491> Changing the Config File..", value: "\u200b" },
                            { name: "<:failed:1023811778087485491>Starting Discord Bot..", value: "\u200b" },
                            { name: "<:failed:1023811778087485491> Adding Some Roles..", value: "\u200b" },
                            { name: "<:failed:1023811778087485491> Finish the Creation..", value: "\u200b" },
                    ])
                    msg.edit({ embeds: [embed2] })
                   })
              }) 
     }
     if (interaction.customId == "Modal-Creation") {
          const modal = new ModalBuilder()
          .setCustomId('myModal')
          .setTitle('My Modal');

     // Add components to modal

     // Create the text input components
     const favoriteColorInput = new TextInputBuilder()
          .setCustomId('favoriteColorInput')
         // The label is the prompt the user sees for this input
          .setLabel("What's your favorite color?")
         // Short means only a single line of text
          .setStyle(TextInputStyle.Short);

     const hobbiesInput = new TextInputBuilder()
          .setCustomId('hobbiesInput')
          .setLabel("What's some of your favorite hobbies?")
         // Paragraph means multiple lines of text.
          .setStyle(TextInputStyle.Paragraph);

     // An action row only holds one text input,
     // so you need one action row per text input.
     const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
     const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

     // Add inputs to the modal
     modal.addComponents(firstActionRow, secondActionRow);

     // Show the modal to the user
    await interaction.showModal(modal)
     }
     })
     
     
     
     
     
     }
     
     async function checktoken(token, client){
     const testclient = new Client({
     messageCacheLifetime: 60,
     fetchAllMembers: false,
     messageCacheMaxSize: 10,
     restTimeOffset: 0,
     restWsBridgetimeout: 100,
     shards: "auto",
     allowedMentions: {
     parse: ["roles", "users", "everyone"],
     repliedUser: false,
     },
     partials: [
     Partials.Message, // for message
     Partials.Channel, // for text channel
     Partials.GuildMember, // for guild member
     Partials.Reaction, // for message reaction
     Partials.GuildScheduledEvent, // for guild events
     Partials.User, // for discord user
     Partials.ThreadMember, // for thread member
     ],
     intents: [
     GatewayIntentBits.Guilds, // for guild related things
     GatewayIntentBits.GuildMembers, // for guild members related things
     GatewayIntentBits.GuildBans, // for manage guild bans
     GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
     GatewayIntentBits.GuildIntegrations, // for discord Integrations
     GatewayIntentBits.GuildWebhooks, // for discord webhooks
     GatewayIntentBits.GuildInvites, // for guild invite managing
     GatewayIntentBits.GuildVoiceStates, // for voice related things
     GatewayIntentBits.GuildPresences, // for user presence things
     GatewayIntentBits.GuildMessages, // for guild messages things
     GatewayIntentBits.GuildMessageReactions, // for message reactions things
     GatewayIntentBits.GuildMessageTyping, // for message typing things
     GatewayIntentBits.DirectMessages, // for dm messages
     GatewayIntentBits.DirectMessageReactions, // for dm message reaction
     GatewayIntentBits.DirectMessageTyping, // for dm message typinh
     GatewayIntentBits.MessageContent, // enable if you need message content things
     ],
     })
     try{
     await testclient.login(token)
     testclient.on("ready", () => testclient.destroy() )
     console.log("✅ | Token Valid")
     return true;
     } catch {
     console.log("INVALID TOKEN")
     return false;
     }
     }

     async function CloseTicket(interaction,channel, client) {
          if(client.Createbot.get(channel.id,"Owner") !== interaction.user.id) {
               return interaction.reply({content: `<a:Attention:1006701741812748410>  **Only <@${client.Createbot.get(channel.id,"Owner")}> Is allowed to react!**`, ephemeral: true})
        }
         const user = client.users.cache.get(interaction.user.id)

         const owner = client.users.cache.get(client.Createbot.get(channel.id,"Owner"))

         user.send({content: `Succesfully Closed <#${channel.id}>`})
         owner.send({content: `Succesfully Closed <#${channel.id}>`})

         ClosedCategory(client, channel)

         channel.setName(`-🔏c-${owner.username}`)

         setTimeout(() => {
          if (channel.parentId !== "1040996273546866708") {
                   interaction.channel.delete()
          }
     }, 5000);

         client.Createbot.delete(channel.id)
         client.Createbot.delete(interaction.user.id, "ChannelOpened")

         interaction.reply({embeds: [
                new EmbedBuilder()
                .setTitle("Succesfully Closed {channel}".replace("{channel}", channel.name))
                .setColor("#3dbeff")
         ]}).catch((e) => {
             channel.send({embeds: [
               new EmbedBuilder()
               .setTitle("Succesfully Closed {channel}".replace("{channel}", channel.name))
               .setColor("#3dbeff")
        ]})
         })
         channel.permissionOverwrites.edit("1005978927421980702", { ViewChannel: false})
         channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: false})
     }

     async function CloseChannel(interaction, client) {
          if(client.Createbot.get(interaction.channel.id,"Owner") !== interaction.user.id) {
               return interaction.reply({content: `<a:Attention:1006701741812748410>  **Only <@${client.Createbot.get(interaction.channel.id,"Owner")}> Is allowed to react!**`, ephemeral: true})
        }
        const owner = client.users.cache.get(client.Createbot.get(interaction.channel.id,"Owner"))

        interaction.user.send({content: `Succesfully Closed <#${interaction.channel.id}>`})

        interaction.channel.setName(`-🔏c-${owner.username}`)

        const channel = interaction.channel

        ClosedCategory(client, channel)

        setTimeout(() => {
          if (channel.parentId !== "1040996273546866708") {
                   interaction.channel.delete()
          }
     }, 5000);

         client.Createbot.delete(interaction.channel.id)
         client.Createbot.delete(interaction.user.id, "ChannelOpened")

         interaction.reply({embeds: [
                new EmbedBuilder()
                .setTitle("Succesfully Closed {channel}".replace("{channel}", interaction.channel.name))
                .setColor("#3dbeff")
         ]})
         interaction.channel.permissionOverwrites.edit("1005978927421980702", { ViewChannel: false})
         interaction.channel.permissionOverwrites.edit(interaction.user.id, { ViewChannel: false})
     }
     async function InactiveTicket(channel, client) {
         const user = client.users.cache.get(client.Createbot.get(channel.id,"Owner"))
         user.send({content: `Succesfully Closed <#${channel.id}>, Cause of Inactivity`})


         channel.setName(`-🔏c-${user.username}`)

         ClosedCategory(client, channel)

         client.Createbot.delete(channel.id)
         client.Createbot.delete(user.id, "ChannelOpened")

         setTimeout(() => {
          if (channel.parentId !== "1040996273546866708") {
                   interaction.channel.delete()
          }
     }, 5000);

         channel.send({embeds: [
                new EmbedBuilder()
                .setTitle("Succesfully Closed {channel}".replace("{channel}", channel.name))
                .setColor("#3dbeff")
         ]})
         channel.permissionOverwrites.edit("1005978927421980702", { ViewChannel: false})
         channel.permissionOverwrites.edit(user.id, { ViewChannel: false})
     }
     