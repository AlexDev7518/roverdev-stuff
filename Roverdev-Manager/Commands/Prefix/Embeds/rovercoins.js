const { EmbedBuilder, Embed } = require("discord.js")

module.exports = {
  PrefixConfiguration: {},
  Settings: {},

 CommandRun: async (Roverdev, message, args, executor) => {
      const embed = new EmbedBuilder()
      .setAuthor({ name: `Roverdev Community | ${Roverdev.user.username}`, iconURL: Roverdev.user.displayAvatarURL() })
      .setColor("Orange")
      .setDescription(`
__*====== Welcome to Roverdev Shop System ======*__
> ***How To Earn Coins?***
> - You can play the Economy System
> - You can be active (Per Message = 10 Coins!)
> - You can invite people ( Per Invite = 200 Coins )
> - You can have .gg/roverdev in your status ( Per Hour = 50 Coins )
> - Boost the Server [Link Here](https://discord.com/channels/1081700920993259550/1040976238459764848/1058278073298059294)

> ***How System Works?***
> - You can Create your self racks with rd!createrack you already get 1 Free-Rack in your list for 1 free bot, if you want more you have to earn coins and buy a rack and be able to buy the bot and every month you will get a warning in your dms saying you need to pay for your shop bot

> - Once you Are ready to create your bot go below and hit the menu and you can start creating it, you will have to accept our shop rules to create your bot
> -- if you deny the shop rules you the channel will get deleted and you will have to try again, don't break our rules or you will recive [Punisments](https://discord.com/channels/1081700920993259550/1011649119456067695/1056322271318396938)

> ***Rack-System Explained!***
> - You can get racks by runing rd!createrack
> -- you get 1 bot for free lifetime hosted but if you want more bots you need another rack + some coins and remember you have to pay it every 30 days to keep your bot running and if you don't have the amount of pocket coins in your balance (rd!balance) your bot will get shut down and you will have 4 days to pay it to keep it up!
> - if you fail to pay your bot. it will be moved into a zip folder of bots that got deleted and you will have 1 week to get it back if you don't do it in 1 week it will be fully gone, all data lost for that bot
> - You Can Also Boost the server to get a extra rack to. there is alot of ways to get racks and stuff

> ***How Does the new system work when creating a bot?***
> - You can just follow what it says in the channel it will tell you what to do step by step then your creation type, provide the creation type and then provide all the data it asks you for then hit confirm in the channel and it will start creating your Shop-Bot once it is done it will tell the admins to invite the shop bot to the server.
> -- if you fail in creating the bot the first time through the modal creation you can hit retry it will show any error it happens when you are creating the bot

> ***Overview and Rules of Roverdev Bot Shop***
> - Don't try to abuse our system to get a ton of free bots if we catch you we will ban you and your alt accounts. 
> -- We are giving this to help the discord community out and make there life easy to manage a discord server so don't abuse it 
> - We make systems like this to help people learn how to manage a discord server with out having so much stress and thats what roverdev is here to help you with! 
> - Roverdev Bot Shop System started in late 2021 and still goes strong and we got taken down some times but we are still a very stong growing community we also have grew our shop bots and we will keep updating them so they can have the latest features!
`)
.setImage("https://i.imgur.com/deyXaGV.png")
.setThumbnail("https://cdn.discordapp.com/emojis/1006989167777021954.png")
.setTimestamp()
.setTitle("Welcome to Roverdev Bot System - Rover Coins System")

message.channel.send({ embeds: [embed] })

 }
}