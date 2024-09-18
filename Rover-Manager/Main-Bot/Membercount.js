const colors = require("colors")
colors.enable()
module.exports = async client => {
    //  setInterval(() => {
    //     let myGuild = client.guilds.cache.get("1081700920993259550")
    //     try {
    //         let memberCount = myGuild.memberCount
    //         let memberCountChannel = myGuild.channels.cache.get('1025975453116272741');
    //         memberCountChannel.setName('🗣️╎Total: ' + memberCount)
    //         client.logger(colors.cyan(`:: [SERVER STATS] :: Changing Member Count For: ${memberCountChannel.name}`))
    //     } catch (err) {
    //         console.log(err)
    //     }
    //     // Total Members
    //     try {
    //         let memberCount2 = myGuild.members.cache.filter(member => !member.user.bot).size
    //         let memberCountChannel = myGuild.channels.cache.get('1041373120260485130');
    //         memberCountChannel.setName('🗣️╎Members: ' + memberCount2)
    //         client.logger(colors.green(`:: [SERVER STATS] :: Changing Member Count For: ${memberCountChannel.name}`))
    //     } catch (err) {
    //         console.log(err)
    //     }
    //     // Total Bots
    //     try {
    //         let memberCount3 = myGuild.members.cache.filter(member => member.user.bot).size
    //         let memberCountChannel = myGuild.channels.cache.get('1041373443456774194');
    //         memberCountChannel.setName('🗣️╎ Bots: ' + memberCount3)
    //         client.logger(colors.blue(`:: [SERVER STATS] :: Changing Member Count For: ${memberCountChannel.name}`))
    
    //     } catch (err) {
    //         console.log(err)
    //     }
    //  }, 90000);
}