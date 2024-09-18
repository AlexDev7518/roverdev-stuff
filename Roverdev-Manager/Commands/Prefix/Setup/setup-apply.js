const { EmbedColor } = require("../../../Configuration/EmbedConfig")
const moment = require("moment");
const ms = require('ms');
const { EmbedBuilder } = require("discord.js");


module.exports = {
  PrefixConfiguration: {},
  Settings: {},

 CommandRun: async (Roverdev, message, args, executor) => {

  let CloseCreation = ms(`1d`)                                                           
  CloseCreation = Date.now() + CloseCreation

  
  let CloseCreation1 = ms(`3d`)                                                           
  CloseCreation1 = Date.now() + CloseCreation1

  var today = new Date(); 
  var time = today;

  Roverdev.StaffSystem.set("1072568966821716038", CloseCreation, "ApplyStaff.TimeToOpen")
  Roverdev.StaffSystem.set("1072568966821716038", CloseCreation1,  "ApplyPartner.TimeToOpen")

  const embed = new EmbedBuilder()
  .setAuthor({ name: `Apply Partner & Staff - Roverdev Community`, iconURL: "https://cdn.discordapp.com/emojis/1075890682872483960.webp?size=96&quality=lossless" })
  .setThumbnail("https://cdn.discordapp.com/emojis/1075890682872483960.png")
  .setColor(EmbedColor)
  .setDescription(`\`\`\`yml\nApply-Staff\n- Status: ❌ Closed\n- Opening: ${moment(CloseCreation/time).format('DD [day(s)] H [hour(s)] m [min(s)] ss [sec]')}\n\nApply-Partner\n- ❌ Closed\n- Opening: ${moment(CloseCreation1/time).format('DD [day(s)] H [hour(s)] m [min(s)] ss [sec]')}\`\`\``)

   Roverdev.channels.cache.get("1072568966821716038").send({ embeds: [embed] })
 }
}