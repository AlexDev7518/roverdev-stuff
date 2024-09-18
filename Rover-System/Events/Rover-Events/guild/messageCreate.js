const { MessageType } = require("discord.js")
module.exports = (Rover, message) => {
  
  if (message.channel.id == "1106098024847003739") {

    let array = ["683260836252352515", "663442537222242306"]

    if (!array.includes(message.author.id)) return;

    if (message.content.startsWith("lock") || message.content.startsWith("Lock") || message.content.startsWith("lk") || message.content.startsWith("Lk")) {
      

          message.channel.permissionOverwrites.edit("1106104368899567647", { SendMessages: false })
          message.channel.send({ content: `Successfully Locked This Channel ( Role: Simon Says )` })
       
    } 
    if (message.content.startsWith("Unlock") || message.content.startsWith("unlock") || message.content.startsWith("un") || message.content.startsWith("Un")) {
       
      message.channel.permissionOverwrites.edit("1106104368899567647", { SendMessages: true })
      message.channel.send({ content: `Successfully UnLocked This Channel ( Role: Simon Says )` })
  
    }

    if (message.mentions.users.first() && message.guild.members.cache.get(message.mentions.users.first().id) && message.type !== MessageType.Reply) {
      message.guild.members.cache.get(message.mentions.users.first().id).roles.add("1106106256269250640", "disqualified from this event!")

      message.channel.send({ content: `${message.mentions.users.first()} is now disqualified from this event!` })
    }

  }
}