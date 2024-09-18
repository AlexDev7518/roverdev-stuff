const { EmbedBuilder, AttachmentBuilder, PermissionFlagsBits, Message } = require("discord.js")
const { BotPrefix, BotOwners } = require("../../Configuration/BotConfig");
const { EmbedColor } = require("../../Configuration/EmbedConfig");
const Ranking = require("../../Databases/Schema/Ranking/Ranking");
const TotalCoins = require("../../Databases/Schema/RoverCoins/TotalCoins");
const CreateTicket = require("../../Databases/Schema/TicketSystem/CreateTicket");
const { client } = require("../../main");
const { AntiDiscord } = require("../../Modules/Extra/AntiDiscord");

module.exports = async (Roverdev, message) => {
    if (!message.guild || !message.guild.available || !message.channel) return;
    if (message.author.bot || message.webhookId) return;

    AntiDiscord(message)

    // if (message.channel.id == "1011647908162060339") {
    //     message.react("❤️")
    //     message.react("🤟")
    //     message.react("😍")

    //     message.channel.sendTyping().then((m) => {
    //         setTimeout(async () => {
    //             message.reply({ content: `${message.author} Thanks For Giving Feedback :v:` })
    //         }, 2000);
    //    })
    // }

    let messages = await Ranking.findOne({ Author: message.author.id })

    // const Lang = require(`../../Languages/${data.Language}/${command.help.name}.json`)
    // const LangMessageCreate = require(`../../Languages/${data.Language}/events/messageCreate.json`)

    if (!messages) {
           const data = await Ranking.create({
                 Author: message.author.id,
           })
           data.save()

           messages = await Ranking.findOne({ Author: message.author.id })
    }

    if (!message.content.startsWith(BotPrefix)) await Ranking.findOneAndUpdate({ Author: message.author.id }, { $set: { AllMessages: Number(messages.AllMessages) + 1 }})

    let coins = await TotalCoins.findOne({ Author: message.author.id })

    if (!coins) {
         const data = await TotalCoins.create({
               Author: message.author.id
         })
         data.save()

         coins = await TotalCoins.findOne({ Author: message.author.id })
    }

    const TotalRankingCoins = messages.AllMessages * 1

    if (TotalRankingCoins !== coins.RankingCoins) {
        await TotalCoins.findOneAndUpdate({ Author: message.author.id }, { $set: { RankingCoins: Number(coins.RankingCoins) + 10 } })
    }

            
    const botchat = ["1081759526044303370"]
        
    const Prefix = BotPrefix

    if (message.content == `<@${client.user.id}>`) {

       if (!botchat.includes(message.channel.id) && !message.member.permissions.has(PermissionFlagsBits.Administrator)) {
        message.channel.sendTyping()
           setTimeout(() => {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                    .setAuthor({ name: `Bot Chat | ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    .setDescription(`Please Only Use Commands in: ${botchat.map(m => `<#${m}>`).join(",")}`)
                    .setColor("Red")
                ]
              }).then((msg) => {
                  try {
                      setTimeout(() => {
                          msg.delete()
                          message.react("1034528004912730242")
                       }, 1000);
                  } catch (error) {
                       console.log(error)
                  }
              })
           }, 1200);
           return;
      } 

      message.channel.sendTyping()

       return message.reply({
           embeds: [
               new EmbedBuilder()
               .setAuthor({ name: `My Bot Prefix is: ${Prefix} Try: ${Prefix}help`, iconURL: client.user.displayAvatarURL() })
               .setColor("#3dbeff")
           ]
       })
   };

   if (message.channel.name.includes("st") || message.channel.name.includes("rt") || message.channel.name.includes("yt") || message.channel.name.includes("bst") || message.channel.name.includes("ct")) {
    await Ranking.findOneAndUpdate({ Author: message.author.id }, { $set: {  TicketMessages: Number(messages.TicketMessages) + 1 }})
}

if (!Prefix) return

            // let array = ["1040952183375532152", "1058644799097405491", "1058644918056259585", "1058644969981747250", "1058645042480300092", "1058881804490256384", "1058882074347581510"]
        
            // if (array.includes(message.channel.parentId)) {
            //        const data = await CreateTicket.findOne({ Channel: message.channel.id }) 
        
            //        if (!data.ClaimedUsers.includes(message.author.id) && message.author.id !== data.Author && message.member.roles.cache.has("1005978927421980702")) {
            //               message.delete()
            //                 Roverdev.channels.cache.get("1005958548699742348").send({ content: `${message.author} Stop Typing in ${message.channel} Or else I will Remove administator from you and remove from the channel` })
            //        }
            // }
        
    
            const args = message.content.slice(Prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
        
            if (message.guild && !message.member) await message.guild.members.cache.get(message.author);
        
            const cmd = client.container.commands.get(command) || client.container.commands.get(client.container.aliases.get(command))
        
            if (message.content.startsWith(Prefix)) {

                message.channel.sendTyping().then((m) => {
                    setTimeout(async () => {
                        await Ranking.findOneAndUpdate({ Author: message.author.id }, { $set: {  CommandsRan: Number(messages.CommandsRan) + 1 }})
        
                        if (!botchat.includes(message.channel.id) && !message.member.permissions.has(PermissionFlagsBits.Administrator)) {
                            return message.reply({
                              embeds: [
                                  new EmbedBuilder()
                                  .setAuthor({ name: `Bot Chat | ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                                  .setDescription(`Please Only Use Commands in: ${botchat.map(m => `<#${m}>`).join(",")}`)
                                  .setColor("Red")
                              ]
                            }).then((msg) => {
                                try {
                                    setTimeout(() => {
                                        msg.delete()
                                        message.react("1034528004912730242")
                                     }, 1000);
                                } catch (error) {
                                     console.log(error)
                                }
                            })
                       } 
                
                        if (!cmd) {
                            return message.reply({
                                embeds: [
                                   new EmbedBuilder()
                                   .setAuthor({ name: `Seems this command does not exist`, iconURL: "https://cdn.discordapp.com/emojis/1034528004912730242.webp?size=96&quality=lossless" })
                                   .setColor("Red")
                                ]
                            })
                       }
                       if (cmd.Settings.DisabledCategory == true) {
                        if (!BotOwners.includes(message.author.id)) { 
                            return message.reply({
                                 embeds: [
                                      new EmbedBuilder()
                                      .setAuthor({ name: `This Category is currently on maintenance.`, iconURL: "https://cdn.discordapp.com/emojis/1034528004912730242.webp?size=96&quality=lossless"})
                                      .setColor("Red")
                                 ]
                            })
                           }
                       }
                       if (cmd.Settings.DeveloperOnly == true) {
                        if (!BotOwners.includes(message.author.id)) { 
                            return message.reply({
                                 embeds: [
                                      new EmbedBuilder()
                                      .setAuthor({ name: `This Command is Only For The Bot Owners.`, iconURL: "https://cdn.discordapp.com/emojis/1034528004912730242.webp?size=96&quality=lossless"})
                                      .setColor("Red")
                                 ]
                            })
                           }
                       }
                
                       /**
                        * @RUN_COMMAND
                        */
                
                       const Roverdev = client
                
                       const channel = Roverdev.channels.cache.get("1081864508903002173")
                
                       channel.send({
                          embeds: [
                              new EmbedBuilder()
                              .setAuthor({ name: `Command Ran | ${Roverdev.user.username}`, iconURL: Roverdev.user.displayAvatarURL() })
                              .setColor(EmbedColor)
                              .setDescription(`***Command Information:***\n> Command name: \`${cmd.PrefixConfiguration.name}\`\n> Command Author: ${message.author}\n> Command Time: <t:${Math.floor(Date.now()/1000)}>`)
                          ]
                       })
                
                       cmd.CommandRun(Roverdev, message, args, message.member, Prefix).catch((e) => {
                              message.reply({ 
                                    embeds: [
                                        new EmbedBuilder()
                                        .setTitle(`Error Accored While Trying to run that Command`)
                                        .setDescription(`${e}`)
                                        .setColor("Yellow")
                                    ],
                                    files: [
                                        new AttachmentBuilder(Buffer.from(`${require('util').inspect(e)}`), {name:'error.txt'})
                                    ]
                              })
                       })
                    }, 900);
               })        
            }
}