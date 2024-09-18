const { AttachmentBuilder } = require('discord.js')

module.exports = async (Rover, member) => {

  if (member.user.bot) return;

  let Roles = ["1085497928027750470","1112931500430725170",  "1085505731698118737",  "1095940988926697613", "1095941802390986812", "1112925030154764308", "1112925696067637258", "1095941808053301288", "1095941809055748226", "1095942288619880458", "1097673828022370465", "1095942287860707449", "1112935185021939772", "1112935282501754903"]

  member.roles.add(Roles)


  Rover.channels.cache.get("1085500226711863297").send({ content: `Welcome ${member} To ***${member.guild.name}*** We now have \`${member.guild.memberCount}\` Members!\n\n> **Note - If you are a Nextgen Member: We are slowly migrating stuff from nextgen to here, please be patient while we figure out stuff!**`}).then((msg) => msg.react("👋"))
  
}