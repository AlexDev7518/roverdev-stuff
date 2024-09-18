const { Application, ApplicationCommandOptionType, SelectMenuBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
   // Code For Prefix Here
}
module.exports.slashRun = async (interaction, client) => {
    const channel = interaction.options.getChannel('channel'); 
       if (interaction.options.getSubcommand() === 'createbot') {
        const string = interaction.options.getString('setup-type');

        if (string == "create-bot-rules") {
            const Features = new ActionRowBuilder()
            .addComponents(
                  new SelectMenuBuilder()
                  .setCustomId("Features")
                  .setPlaceholder("💪 | Rover Shop Bots Features")
                  .setOptions(
                     { 
                         label: `Music Bot`,
                         value: `Music-Bot`,
                         description: `Music Bot Features`,
                         emoji: "1006014615878111352",
                         },   
                         { 
                         label: `Ticket Bot`,
                         value: `Ticket-Bot`,
                         description: ` Ticket Bot Features`,
                         emoji: "1015745934090575964"
                         },   
                         { 
                         label: `Reaction Roles Bot`,
                         value: `Reaction-Roles-Bot`,
                         description: `Reaction Roles Bot Features`,
                         emoji: "1015237240009523200"
                         },
                         { 
                         label: `Welcome Bot`,
                         value: `Welcomer-Bot`,
                         description: `Welcomer Bot Features`,
                         emoji: "1016376552965034054"
                         },      
                         { 
                         label: `Economy Bot`,
                         value: `Economy-Bot`,
                         description: `Economy Bot Features`,
                         emoji: "1015237455919714305"
                         },   
                  )
            )
            const CreateBot = new ActionRowBuilder()
            .addComponents(
                   new ButtonBuilder()
                   .setCustomId("Create-Bot")
                   .setLabel("Create Discord Bot")
                   .setStyle(ButtonStyle.Primary)
                   .setEmoji("1015746519212765195"),
            )
            const ControlPanel = new ActionRowBuilder()
            .addComponents(
                  new SelectMenuBuilder()
                  .setCustomId("ControlPanel")
                  .setPlaceholder("🤖 | Rover Information Panel")
                  .setOptions(
                     {
                      label: "Bot Payment System",
                      value: `Payment-System`,
                      description: "Shop Payment System",
                      emoji: "1014937062992007168"
                     },    
                     {
                      label: "Bot Hosting System",
                      value: `Hosting-System`,
                      description: "Shop Hosting System",
                      emoji: "1017081433765990480"
                     },     
                     {
                      label: "Control Shop Bot",
                      value: `Control-Bot`,
                      description: "Control your Discord Shop Bot",
                      emoji: "1014936957849182229"
                     },              
                  )
            )
            const embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
            .setTitle("🤖 Roverdev Bot Creation")
            .setDescription("***Please Select the Button below to Create Bot.***")
            .setImage("https://cdn.discordapp.com/attachments/1023872508597903400/1025954944257359923/SGN_09_28_2022_1664402118111.png")
            .setThumbnail(client.user.displayAvatarURL())
            .setColor("#3dbeff")

            
               client.channels.cache.get(channel.id).send({
                components: [CreateBot],
                embeds: [embed]
              }).then((msg) => msg.pin())

   return interaction.reply({content: `Succesfully Setup Create bot system in <#${channel.id}>`})

        }
    }
    if (interaction.options.getSubcommand() === "ticketsystem") {
      const embed = new EmbedBuilder()
      .setAuthor({ name: `${interaction.guild.name} Ticket System`, iconURL: client.user.displayAvatarURL() })
      .setColor("#3dbeff")
      .setDescription(`Please Don't Open a ticket For Fun or you will get a Warning!\n> If you Open a ticket and leave the server the ticket will automaticly Close`)
      .addFields([
           { name: `Support Ticket`, value: `Support Ticket is Where you can get support from a staff member of our Team!` },
           { name: `Claim Ticket`, value: `Claim Ticket is Where you can Get Like a Giveaway Prize or a Bot or Booster Perks!` },
           { name: `Apply Ticket`, value: `Apply Ticket is where you can Apply For Staff in Roverdev!` }
      ])
      .setFooter({ text: `Made By: Roverdev | Hosting: ovhcloud.com` })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
  
      const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setCustomId(`Ping-Before`)
        .setLabel(`Ping me Before`)
        .setStyle(ButtonStyle.Success)
        .setEmoji(`1006056107367735327`),
        new ButtonBuilder()
        .setCustomId(`Support-Ticket`)
        .setLabel(`Support Ticket`)
        .setStyle(ButtonStyle.Secondary)
        .setEmoji(`1005732010880413726`),
        new ButtonBuilder()
        .setCustomId(`Claim-Ticket`)
        .setLabel(`Claim Ticket`)
        .setStyle(ButtonStyle.Secondary)
        .setEmoji(`1005732010880413726`),
        new ButtonBuilder()
        .setCustomId(`Apply-Ticket`)
        .setLabel(`Apply Staff Ticket`)
        .setStyle(ButtonStyle.Secondary)
        .setEmoji(`1005732010880413726`),
      )
  
      const TicketChannel = client.channels.cache.get(client.config.Channels.TicketChannel)
  
      TicketChannel.send({embeds: [embed], components: [row]}).then((msg) => {
              client.settings.set(interaction.guild.id, msg.id, "TicketSetup.Message")
              client.settings.set(interaction.guild.id, msg.channel.id, "TicketSetup.Channel")
      })
  
      interaction.reply({content: `${client.config.Emojis.Accepted} Successfully Setup the Ticket System.`})
  
    }
    if (interaction.options.getSubcommand() === 'boosterperks') {
      const channel = interaction.options.getChannel('channel'); 

      const embed = new EmbedBuilder()
      .setAuthor({ name: `${interaction.guild.name} | ${client.user.username}`, iconURL: interaction.guild.iconURL() })
      .setDescription(
`
Booster Perks: 1 Boost
> 1 Extra Bot From the Bot Shop
> Premium Source Codes
> Thank you Message From Owners
> Supreme Coding Help
   
Booster Perks: 2 Boosts
> 2 Extra Bots From Bot Shop
> Premium Source Codes
> Thank you Message From the Owner
> Premium System (Order Premium Shop Bots)
   
Roverdev Chat Perks
> 100 Messages -> 200 Coins (ECO SYSTEM) & VIP Role
> 200 Messages -> 400 Coins & 1 Extra Shop Bot
> 500 Messages -> 800 Coins & Premium Shop Bot
   
`)
.setColor("#3dbeff")

   channel.send({embeds: [embed]})

    }
}

module.exports.conf = {
     Prefix: {
        aliases: [],
        enabled: false,
        ownerOnly: true,
        AdminOnly: false,
        userPermissions: []   
     },
     Slash: {
        enabled: true,
        ownerOnly: true,
        AdminOnly: false,
        userPermissions: [],
        timeout: 5,
     }
}

module.exports.help = {
      Prefix: {
        name: "setup",
        category: "setup",
        cooldown: 2,
        usage: "setup <option>",
        description: "setup Systems",
      },
      Slash: {
        name: "setup",
        description: "setup Systems",
        timeout: 5000,
        category: "",
        options: [
             {
               name: "createbot",
               description: "Setup Create Bot System",
               type: ApplicationCommandOptionType.Subcommand,
               options: [
                  {
                     name: `setup-type`,
                     description: `Setup Create Bot`,
                     type: ApplicationCommandOptionType.String,
                     required: true,
                     choices: [
                       {
                           name: "create bot setup",
                           value: "create-bot-rules",
                         },                      
                     ],
                  },
                  {
                      name: "channel",
                      description: "Pick a Channel",
                      type: ApplicationCommandOptionType.Channel,
                      required: true,
                    },
             ],
             },
             {
               name: "boosterperks",
               description: "Booster Perks",
               type: ApplicationCommandOptionType.Subcommand,
               options: [
                  {
                      name: "channel",
                      description: "Pick a Channel",
                      type: ApplicationCommandOptionType.Channel,
                      required: true,
                    },
             ],
             },
             {
               name: "ticketsystem",
               description: "Ticket System",
               type: ApplicationCommandOptionType.Subcommand,
             },
           ]
      }
}
