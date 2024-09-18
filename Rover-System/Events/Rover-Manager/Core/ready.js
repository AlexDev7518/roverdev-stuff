const { ActivityType, ChannelType, PermissionFlagsBits } = require("discord.js")

module.exports = async (Rover) => {
  Rover.user.setPresence({ status: "invisible", })

  let array = []




  // Rover.guilds.cache.get("1113847375686025279").roles.cache.forEach(m => {
  //            m.delete()
  // })

  // Rover.guilds.cache.get("1113311544592302120").channels.cache.filter(m => m.type == ChannelType.GuildCategory).forEach(m => {
  //         m.permissionOverwrites.create(m.guild.roles.everyone, { ViewChannel: false });
  // })


  // let data = {}

  //   Rover.guilds.cache.get("1113311544592302120").channels.cache.forEach(m => {
  //           if (m.type == ChannelType.GuildCategory) {
  //                   data[m.id] = {
  //                           name: m.name,
  //                           permissions: m.permissions,
  //                           Position: m.position,
  //                           Channels: []
  //                   }
  //           }
  //   })

  //   setTimeout(() => {
  //           Rover.guilds.cache.get("1113311544592302120").channels.cache.forEach(m => {



  //                   if (m.type !== ChannelType.GuildCategory && m.parentId !== null) {
  //                           data[m.parentId]["Channels"].push({
  //                                   Name: m.name,
  //                                   Permissions: [],
  //                                   topic: m.topic,
  //                                   type: m.type,
  //                                   Position: m.position
  //                           })
  //                   }
  //           })


  //           setTimeout(() => {
  //                   Rover.guilds.cache.get("1113311544592302120").channels.cache.forEach(m => {
  //                           if (m.type == ChannelType.GuildCategory) {
  //                                   data[m.id]["Channels"].reverse()
  //                           }
  //                   })


  //                   setTimeout(() => {

  //                           let i = 0
  //                           let i2 = 0

  //                           let array = []
  //                           let LoadedCategory = []

  //                           let channels = Rover.guilds.cache.get("1113311544592302120").channels.cache.forEach(m => {
  //                                   if (m.type == ChannelType.GuildCategory) {
  //                                           array.push(m)
  //                                   }
  //                           })


  //                           setTimeout(() => {



  //                                   Rover.guilds.cache.get("846548733914906664").channels.create({
  //                                           type: ChannelType.GuildCategory,
  //                                           name: data[array[i].id].name,
  //                                           permissions: data[array[i].id].permissions,
  //                                           position: data[array[i].id].Position
  //                                   })



  //                                   setTimeout(() => {



  //                                           const LoadCommandsInCategory = setInterval(function () {


  //                                                   let ready = true


  //                                                   if (i == array.length) {
  //                                                           return clearInterval(LoadCommandsInCategory)
  //                                                   }

  //                                                   if (i2 == data[array[i].id]["Channels"].length) {
  //                                                           LoadedCategory.push(data[array[i].id].name)
  //                                                           i++

  //                                                           i2 = 0
  //                                                           if (data[array[i]?.id] == undefined) return;

  //                                                           Rover.guilds.cache.get("846548733914906664").channels.create({
  //                                                                   type: ChannelType.GuildCategory,
  //                                                                   name: data[array[i].id].name,
  //                                                                   permissions: data[array[i].id].permissions,
  //                                                                   position: data[array[i].id].Position
  //                                                           })

  //                                                           ready += true
  //                                                   }

  //                                                   if (ready == true) {
  //                                                                   Rover.guilds.cache.get("846548733914906664").channels.create({
  //                                                                           parent: Rover.guilds.cache.get("846548733914906664").channels.cache.find(m => m.type == ChannelType.GuildCategory && m.name == array[i].name)?.id,
  //                                                                           type: data[array[i].id]["Channels"][i2].type,
  //                                                                           name: data[array[i].id]["Channels"][i2].Name,
  //                                                                           permissions: data[array[i].id]["Channels"][i2].Permissions,
  //                                                                           topic: data[array[i].id]["Channels"][i2].topic,
  //                                                                           position: data[array[i].id]["Channels"][i2].Position
  //                                                                   })

  //                                                           Rover.logger(`> Successfully Created ${data[array[i].id]["Channels"][i2].Name} Channel in ${array[i].name} category!`)
  //                                                           i2++
  //                                                   }
  //                                           }, 1000)
  //                                   }, 100);
  //                           }, 1000);

  //                   }, 2000);
  //           }, 5000);
  //   }, 4000);
}