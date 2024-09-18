const colors = require("colors")
colors.enable()
module.exports = async Roverdev => {
     const client = Roverdev
     setInterval(() => {
        let myGuild = client.guilds.cache.get("846548733914906664")

        try {
            let memberCount = myGuild.memberCount
            let memberCountChannel = myGuild.channels.cache.get('1113905483657515168');
            memberCountChannel.setName('⌜👤⌟・Total: ' + memberCount)
            client.logger(require("colors").blue(`:: [SERVER STATS] :: Changing Member Count For: ${memberCountChannel.name}`),)
        } catch (err) {
            console.log(err)
        }
        // Total Members
        try {
            let memberCount2 = myGuild.members.cache.filter(member => !member.user.bot).size
            let memberCountChannel = myGuild.channels.cache.get('1113905479400304712');
            memberCountChannel.setName('⌜👤⌟・Members: ' + memberCount2)
            client.logger(require("colors").blue(`:: [SERVER STATS] :: Changing Member Count For: ${memberCountChannel.name}`),)
        } catch (err) {
            console.log(err)
        }
        // Total Bots
        try {
            let memberCount3 = myGuild.members.cache.filter(member => member.user.bot).size
            let memberCountChannel = myGuild.channels.cache.get('1113905492197113958');
            memberCountChannel.setName('⌜👤⌟・ Robots: ' + memberCount3)
            client.logger(require("colors").blue(`:: [SERVER STATS] :: Changing Member Count For: ${memberCountChannel.name}`),)
    
        } catch (err) {
            console.log(err)
        }
     }, 90000);
}