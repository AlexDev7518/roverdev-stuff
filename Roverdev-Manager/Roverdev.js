const Discord = require("discord.js");
module.exports = Roverdev => {
    let textInStats = ".gg/roverdev"
    let guildId = "1081700920993259550";
    let roleId = "1081867066128224306";
    //when some1 changes his/her status


    Roverdev.on("presenceUpdate", async (oP, nP) => {
        let guild = Roverdev.guilds.cache.get(guildId)
        if(!guild) return;
        if(nP){
            //get user from guild
            var m = guild.members.cache.get(nP.userId);
            //if not received, fetch it
            if(!m || !m.roles) m = await guild.members.fetch(nP.userId).catch(()=>{}) || false;
            //return if still not in guild
            if(!m) return; 
            //if the status is right, then...
            if(nP.activities.some(({ state }) => state?.includes(textInStats))) {
                if(!m.roles.cache.has(roleId)) { // add role if user doesn't have it
                    m.roles.add(roleId).catch(() => {});
                }
            } else {
                if(m.roles.cache.has(roleId)) { //removes role if user has it
                    m.roles.remove(roleId).catch(() => {});
                }
            }
        }
    })

    Roverdev.on("ready", async () => {
         setTimeout(async() => {
                    //get the right guild
        let guild = Roverdev.guilds.cache.get(guildId)
        if(!guild) return;
        //fetch all members of that guild
        let aM = await guild.members.fetch().catch(()=>{})
        //get the memberswho need the role, because they have the right status but not the the role yet
        let members_who_need = [...aM.filter(m => 
            !m.user.bot && !m.roles.cache.has(roleId) &&
             m.presence && m.presence.activities.some(({ state }) => state?.includes(textInStats))
        ).values()];
        //get the members who have the aM, but not the right status
        let members_who_remove = [...aM.filter(m => 
            !m.user.bot && !m.roles.cache.has(roleId) &&
            (!m.presence || !m.presence.activities.some(({ state }) => state?.includes(textInStats)))
        ).values()];
        //add the roles for those who needs it
        for(const m of members_who_need){
            await m.roles.add(roleId).catch(() => {});
            await delay(350); //wait 0.35 secs
        }
        //remove the roles for those who needs it
        for(const m of members_who_remove){
            await m.roles.remove(roleId).catch(() => {});
            await delay(350); //wait 0.35 secs
        }
         }, 5000);
    })
    //Wait for X MS
    function delay(delayInms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(2);
            }, delayInms);
        });
    }
}