const { EmbedBuilder } = require("discord.js")
const { EmbedColor } = require("../../../Configuration/EmbedConfig")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
        const embed = new EmbedBuilder()
        .setAuthor({ name: `${message.guild.name} | Server Rules`, iconURL: message.guild.iconURL() })
        .setImage("https://i.imgur.com/PAcTNni.gif")
        .setColor(EmbedColor)
        .setThumbnail(message.guild.iconURL())
        .setFields(
              {
                  name: "Rule ¶1",
                  value: "Follow Discord T.O.S"
              },              
              {
                  name: "Rule ¶2",
                  value: "Any content that is NSFW is not allowed under any CIRCUMSTANCES."
              },              
              {
                  name: "Rule ¶3",
                  value: "Be respectful, civil, and welcoming!"
              },              
              {
                  name: "Rule ¶4",
                  value: "Do not spam in any of the channels."
              },              
              {
                  name: "Rule ¶5",
                  value: "Regardless of age, strive to treat each other as we would like to be treated ourselves."
              },              
              {
                  name: "Rule ¶6",
                  value: "Don’t ping without legitimate reasoning behind it."
              },              
              {
                  name: "Rule ¶7",
                  value: "Be respectful and welcoming as toxicity is Not Allowed"
              },              
              {
                  name: "Rule ¶8",
                  value: "Do not send links / Scam links to any users in thsi server"
              },              
              {
                  name: "Rule ¶9",
                  value: "Do not hop vc channels or join and leave or Play loud music."
              },              
              {
                  name: "Rule ¶10",
                  value: "Do not try to Bypass the Auto Mod / Anti Nuke System."
              },              
              {
                  name: "Rule ¶11",
                  value: "Do not dm ad anyone about advertisement or anything else."
              }
        )
        const embed2 = new EmbedBuilder()
        .setAuthor({ name: `${message.guild.name} | Shop Rules`, iconURL: message.guild.iconURL() })
        .setImage("https://i.imgur.com/PAcTNni.gif")
        .setColor(EmbedColor)
        .setThumbnail("https://cdn.discordapp.com/emojis/1015378569339338882.png")
        .setFields(
              {
                  name: "Rule ¶1",
                  value: "Don't reset your token"
              },              
              {
                  name: "Rule ¶2",
                  value: "Don't abuse any bugs."
              },              
              {
                  name: "Rule ¶3",
                  value: "Don't say you made it!"
              },              
              {
                  name: "Rule ¶4",
                  value: "Do not try to spam our system (We have a Rate Limit System)."
              },              
              {
                  name: "Rule ¶5",
                  value: "If you leave the server your bots will get deleted."
              },              
              {
                  name: "Rule ¶6",
                  value: "Do not spam open a ticket for bot-shop help, just read the guide"
              },              
              {
                  name: "Rule ¶7",
                  value: "Do not use alts to get invites (if we find you will get Warned and invites removed.)"
              },              
        )

        const embed3 = new EmbedBuilder()
        .setAuthor({ name: `${message.guild.name} | Hosting Rules`, iconURL: message.guild.iconURL() })
        .setColor(EmbedColor)
        .setDescription("soon...")


        message.channel.messages.fetch("1080759968887738429").then((msg) => {

        msg.edit({
                         
            content: 
`
Welcome <@&920292442903822346> to ***ROVERDEV COMMUNITY <a:Roverdev:1018153665871216727> ***

Here Is a channel Overview of the server:
> - <#1040957313734938665> Get ticket support from our staff
> - <#1040969480932700230> is where you can get your free discord bots
> - <#1080739725226287184> is where you can see our booster perks
> - <#1080739807409491978> is our Donations Perks!
> - <#1080739867207663717> is our Activity Perks For the server 
> - <#1040958648941285416> is where you can get codes by subscribing
> - <#1040952739817082900> get some self roles make your profile look nice
> - <#1040953183071109181> we also host some nice giveaways here
> - <#1040957370093805698> if you want to give suggestions to the server

> - <#1040938800601366528> is where we post all the new news about roverdev
> - <#1062068370347917362> is where all updates with <@1051175913016004669> is posted

Here is some Links you might need:
> - Gaming Server: <https://discord.gg/vYwxBQMGrV>
> - Our Website: <https://roverdev.xyz>
> - Main Server Link: <https://discord.gg/roverdev>
> - AlexDev's Github: <https://github.com/AlexDev7518>

We are a community where we give free stuff to users Like free discord bots Free Source Codes and alot more we are a fast growing community we also have a coins system and other stuff to where you can get discord bots + We help people with coding discord bots and other stuff But as most people know us as "Best Bot Providers"

<a:PandaHeart:1019252917141774428> **Anyways, Welcome to Roverdev Community - 2023 Best Discord Bot shop**
> - Our main chat is <#935190175510835290> if you want to come chat           

> ***React with <a:Roverdev:1018153665871216727>, if you acccept rules***
` }).then((msg) => msg.react("1018153665871216727"))
        })
   }
}