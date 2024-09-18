const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SelectMenuBuilder } = require("discord.js");
module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor, database) => {



        const embed = new EmbedBuilder()
        .setTitle(`${message.guild.name} | VIP Information`)
        .setDescription(`***Roverdev VIP Channels:***\n> - <#939175741311033405>\n> - <#1040974508800086066>\n> - <#1040974538227331183>\n> - <#1040974560675238049>\n\n> <#1040974633077317662>\n> - Anything is alowed in here. (Advertisement)\n\n***Roverdev VIP Roles:***\n> <@&956024958587379722>\n> - Read Below For How you get this role\n> <@&923507607321325579>\n> - Be a Friend of <@!767627938433597450> (Only if he wants to)\n> <@&1039574899762679838>\n> - Long Time Rover Supporter\n> <@&1042930780617314345>\n> - Be a friend of <@!647962247666073610> (Only if he wants to)\n> <@&1008405234093146143>\n> - Be a friend of <@!544272782557446194> (Only if he wants to) \n> <@&935136720268197909>\n> - Boost the Server (Read Below For Perks)\n> <@&959450283866472488>\n> - Donate The Server (Via Buttons at bottom)\n> <@&942449567553699890>\n> - Be a Partner of the Server\n> <@&973145911314223134>\n> - Get this role by having \`discord.gg/roverdev\` in your status`)
        .setImage("https://i.imgur.com/mPXmdcH.png")
        .setThumbnail("https://i.imgur.com/UiaTyHp.png")
        .setColor("#29F1C3")


        const embed2 = new EmbedBuilder()
        .setTitle(`${message.guild.name} | Cool Booster Perks`)
        .setImage("https://i.imgur.com/p9L9ybT.png")
        .setThumbnail("https://cdn.discordapp.com/emojis/892308380058800128.png")
        .setColor("#29F1C3")
      .setDescription(
`
Booster Perks: Per Boost you get:
> All VIP Channels Access
> Thanks Message From Founders
> <:RoverCoin:1058275133711728670> 3100+ Coins Added to your Bank
> Premium for as long as you boost
> Booster-Rack Added to your racks!
> Extra Coins so you can pay for this stuff


Perks will be working if you boost and stay boosting! (AUTOMATED SYSTEM)
> - if you unboost you loose all of these.

`)



        const embed3 = new EmbedBuilder()
        .setTitle(`${message.guild.name} | Cool Chat / Voice Perks`)
        .setImage("https://i.imgur.com/agVhdxK.png")
        .setThumbnail("https://cdn.discordapp.com/emojis/1009156029361176686.gif?size=96&quality=lossless")
        .setColor("#29F1C3")
        .setDescription(`
***Chat Activity:***
> \`60+ Message / Day\` \n> - 100 <:RoverCoin:1058275133711728670> (Once every day)
> \`750+ Messages/ Week\`\n> - 1,500 <:RoverCoin:1058275133711728670> (Once every week)
> \`6,000+ Messages / Month\`\n> - 6,000 <:RoverCoin:1058275133711728670> (Once every month)

> \`200+ Messages / Day\`\n> - 200 <:RoverCoin:1058275133711728670> (Every Day)
> \`1,200 Messages / Week\`\n> - 2,000 <:RoverCoin:1058275133711728670> (Once every week)
> \`8,000+ Messages / Month\`\n> - 8,000  <:RoverCoin:1058275133711728670> (Once every month)

***Voice Activity:***
> \`1h+ Voice Time / Day\` \n> - 100 <:RoverCoin:1058275133711728670> (Once every day)
> \`6h+ Voice Time / Week\`\n> - 1,500 <:RoverCoin:1058275133711728670> (Once every week)
> \`10h+ Voice Time / Month\`\n> - 6,000 <:RoverCoin:1058275133711728670> (Once every month)

> \`2h+ Voice Time / Day\`\n> - 200 <:RoverCoin:1058275133711728670> (Every Day)
> \`8h+ Voice Time / Week\`\n> - 2,000 <:RoverCoin:1058275133711728670> (Once every week)
> \`20h+ Voice Time / Month\`\n> - 8,000  <:RoverCoin:1058275133711728670> (Once every month)


**Chat Perks:**
> \`5k+ Messages\` Premium For 3 Months.
> \`10k+ Messages\` Extra 1900 <:RoverCoin:1058275133711728670> in your profile
> \`20k+ Messages\`  6k+ Coins <:RoverCoin:1058275133711728670> in your profile


***Chat Rules***
> 1) Don't Spam in Chat To Get Messages
> 2) Don't send the same message over and over
> 3) Don't beg for messages

***Voice Rules***
> 1)  Don't be Deafend
> 2)  Don't Just sit in voice and do nothing to get time!
> 3)  Doing Something in voice (Ex: Screen Share, Mic Unmuted, Listening to Music)
`)


       const embed4 = new EmbedBuilder()
       .setTitle(`${message.guild.name} | Donation Perks`)
       .setImage("https://i.imgur.com/zrEGuWW.png")
       .setThumbnail("https://cdn.discordapp.com/emojis/1014937062992007168.gif")
       .setColor("#29F1C3")
       .setDescription(`
**Donate 10$+**
> 1) Get The Amount Added to your Profile
> 2) Thank you message in <#1011647308200411186>
> 3) Premium Enabled
> 4) You will Also get <@&959450283866472488>
> 4) Get a Message From <@647962247666073610>
> 5) Get Access to all vip channels (At Top)

**Doate 20$+**
> 1) Get The Amount Added to your Profile
> 2) Thank you message in <#1011647308200411186>
> 3) Premium Enabled
> 4) 2800 <:RoverCoin:1058275133711728670> Added to your Profile
> 5) You will Also get <@&959450283866472488>
> 6) Get a Message From <@647962247666073610>
> 7) Get Access to all vip channels (At Top)


**Donate 50$+**
> 1) Get Access to all vip channels (At Top)
> 2) Get The Amount Added to your Profile
> 3) Thank you message in <#1011647308200411186> 
> 3) Get a Message From <@647962247666073610>
> 4) Premium Enabled
> 5) 4800 <:RoverCoin:1058275133711728670> Added to your Profile
> 6) You will Also get <@&959450283866472488>

`)

        const row = new ActionRowBuilder()
        .addComponents(
        new ButtonBuilder()
            .setLabel("Donate [PayPal]")
            .setStyle(ButtonStyle.Link)
            .setURL("https://www.paypal.me/bryanjchauvin93")
            .setEmoji("1042683086535667753"),
            new ButtonBuilder()
            .setLabel("Donate [CashApp]")
            .setStyle(ButtonStyle.Link)
            .setURL("https://cash.app/$chauvin2893")
            .setEmoji("1042692917053100124"),
        )



        message.channel.messages.fetch("1080756657539268619").then((msg) => {
             msg.edit({ embeds: [embed2] })
        })

        // message.channel.send({ embeds: [embed] })
        // setTimeout(() => {
        //     message.channel.send({ embeds: [embed2] })
        //     setTimeout(() => {
        //         message.channel.send({ embeds: [embed3] })
        //         setTimeout(() => {
        //             message.channel.send({ embeds: [embed4] })
        //             setTimeout(() => {
        //                 message.channel.send({ components: [row] })
        //             }, 1000);
        //         }, 1000);
        //     }, 1000);
        // }, 1000);
    },
}