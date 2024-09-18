const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder } = require("discord.js")

module.exports.run = async (client, message, args, cmdUser,prefix) => {
  const channel = client.channels.cache.get("1011647871495454760")

//   const embed = new EmbedBuilder()
//   .setAuthor({ name: `${message.guild.name} Bot Shop System`, iconURL: message.guild.iconURL() })
//   .setTitle(`<:Ticket:1015745934090575964> Got a Question? Open a Ticket In the Shop Button`)
//   .setColor("#3dbeff")
//   .setDescription(` 
// __***Roverdev offical Bot Shop System Made by Roverdev:tm:***__
// ====================================
// Featurs of Bot Shop:
// > <a:a_right:1015238378423336970> See How Many Bots you have
// > <a:a_right:1015238378423336970> Website Creation And Customize Features
// > <a:a_right:1015238378423336970> Edit your Bot Embeds Like Color Ext..
// > <a:a_right:1015238378423336970> Check the Settings of your Bot Like Token...
// > <a:a_right:1015238378423336970> Change the Status Text of your Bot
// > <a:a_right:1015238378423336970> Control Your Discord bot!
// > <a:a_right:1015238378423336970> Create a Discord Shop Bot
// > <a:a_right:1015238378423336970> Create a Premium Shop Bot
// > <a:a_right:1015238378423336970> Add a Payment 
// > <a:a_right:1015238378423336970> Report a Bug For the bot
// > <a:a_right:1015238378423336970> See all bot Features
// > <a:a_right:1015238378423336970> Upgrade Your Shop Bot to Another Teir
// > <a:a_right:1015238378423336970> Delete your shop Bot`)
//   .addFields([
//       { name: `Mobile Users:`, value: `> <:mobile:1015378084754624592> We Made a System For Mobile and PC When on Mobile we Suggest Using Mobile Suggestions` },
//       { name: `Pc Users`, value: `> <:COMPUTER:1015378332155650158> We Suggest Anyone you Want since you have a bigger screen then Mobile` },
//       { name: `How to Create a bot?`, value: `> <:DiscordBotMaker:1015378569339338882> Just Click the Menu below and Select Create a Shop Bot` },
//       { name: `What Happend After I did that?`, value: `> <a:a_warn:1015238388191858788> You have to Wait for a Staff Member to Confirm it` },
//   ])
//   .setFooter({ text: `Bot Shop System | Made by .gg/Roverdev`, iconURL: message.guild.iconURL() })
//   .setThumbnail(message.guild.iconURL())

//   const Createbot = new ActionRowBuilder()
//   .addComponents(
//         new ButtonBuilder()
//         .setLabel(`Create Discord Shop Bot`)
//         .setCustomId(`Create-Bot`)
//         .setEmoji("1015746519212765195")
//         .setStyle(ButtonStyle.Primary),
//   )

//   const row = new ActionRowBuilder()
//      .addComponents(
//        new SelectMenuBuilder()
//        .setCustomId(`Createbot-System`)
//        .setPlaceholder(`Click me to see the Options`)
//        .setOptions(  
//              {
//                label: "Have a Question?",
//                value: `Question-Ticket`,
//                description: "Question? Click here!",
//                emoji: "1015745934090575964"
//             },     
            // {
            //      label: "Bot Payment System",
            //      value: `Payment-System`,
            //      description: "Shop Payment System",
            //      emoji: "1014937062992007168"
            // },           
            // {
            //      label: "Control Shop Bot",
            //      value: `Control-Bot`,
            //      description: "Control your Discord Shop Bot",
            //      emoji: "1014936957849182229"
            // },                   
//             {
//                  label: "Report a Bug",
//                  value: `Report-Bug`,
//                  description: "Report a Shop Bot Bug",
//                  emoji: "1015782885267083304"
//             },
//             {
//                  label: "Bot Features",
//                  value: `Bot-Features`,
//                  description: "See the Features of a bot",
//                  emoji: "1015822616239546379"
//             },                
//             {
//                  label: "Control Panel",
//                  value: `Control-Panel`,
//                  description: "Control Shop System (ADMIN)",
//                  emoji: "1015780986912510143"
//             },   
//        )
//   )
//   message.channel.send({embeds: [embed], components: [Createbot,row]}).then((msg) => {
//     client.settings.set(message.guild.id, msg.id, "BotShopSetup.Message")
//     client.settings.set(message.guild.id, msg.channel.id, "BotShopSetup.Channel")
// })

   const embed = new EmbedBuilder()
   .setAuthor({ name: `${interaction.guild.name} | Bot Creation System`, iconURL: "https://i.imgur.com/4ZooQj7.gif" })
   .setThumbnail(client.user.displayAvatarURL())
   .setImage("https://i.imgur.com/lcs4c01.png")
   .setColor("#3dbeff")
   .setTitle(`__Welcome to Create Bot System of Roverdev__`)

   if (message.args[0].includes("Rules")) {
message.channel.send({
content: `
__***Hello Everyone, here you can find every important rules of bot shop on Rover!***__\n

\`1.\` Don't Spam Ping Admins to Create your Bot!
\`2.\` If you Have Issues Just Click the close Button!
\`3.\` We have a Advanced Creation System. (Don't Steal it or Ban)
\`4.\` Have a Question? Open a Support ticket in <#1011647753144766594>


What Does: <@1016930207384477748> Do?

\`1.\` Creates Discord bots on the VPS Servers
\`2.\` Controls the Discord Bots on the VPS Servers
\`3.\` Helps and Make sure the Shop Bots Ping Stay Nice 
`})
   }

}

module.exports.conf = {
   aliases: ["setup-createbot"],
   enabled: true,
   ownerOnly: true,
   AdminOnly: false,
   userPermissions: [""]
}

module.exports.help = {
  Roverdev: {
      name: "setup-createbot",
      description: "Setup the Createbot System",
      timeout: 5000,
      category: "setup",
    }
}