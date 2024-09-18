const axios = require('axios');
const { Events } = require('discord.js');
const { Dashboard } = require('../../configuration/Hosting');

module.exports = async Roverdev => {

    // Roverdev.on(Events.ClientReady, async () => {
    //     let myGuild = Roverdev.guilds.cache.get("846548733914906664")
    //     try {
    //         let memberCount = myGuild.memberCount
    //         let memberCountChannel = myGuild.channels.cache.get('1171583143745167370');
    //         memberCountChannel.setName('📈》Total Users: ' + memberCount)

    //     } catch (err) {
    //         console.log(err)
    //     }
    //     // Total Members
    //     try {
    //         let memberCount2 = myGuild.members.cache.filter(member => !member.user.bot).size
    //         let memberCountChannel = myGuild.channels.cache.get('1171583168986497044');
    //         memberCountChannel.setName('📈》Members: ' + memberCount2)
    //     } catch (err) {
    //         console.log(err)
    //     }

    //     // Host Members
    //     try {

    //         axios({
    //             url: `https://dash.paradisehost.xyz/api/users`,
    //             method: 'GET',
    //             followRedirect: true,
    //             maxRedirects: 5,
    //             headers: {
    //                 'Authorization': 'Bearer ' + Dashboard.Authorization,
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'Application/vnd.pterodactyl.v1+json',
    //             }
    //         }).then(m => {

    //             let memberCountChannel = myGuild.channels.cache.get('1171583207808979014');
    //             memberCountChannel.setName('📈》Host Users: ' + m.data.total)
    //         })
    //     } catch (err) {
    //         console.log(err)
    //     }
    // })
    // setInterval(() => {
    //     let myGuild = Roverdev.guilds.cache.get("846548733914906664")
    //     try {
    //         let memberCount = myGuild.memberCount
    //         let memberCountChannel = myGuild.channels.cache.get('1171583143745167370');
    //         memberCountChannel.setName('📈》Total Users: ' + memberCount)

    //     } catch (err) {
    //         console.log(err)
    //     }
    //     // Total Members
    //     try {
    //         let memberCount2 = myGuild.members.cache.filter(member => !member.user.bot).size
    //         let memberCountChannel = myGuild.channels.cache.get('1171583168986497044');
    //         memberCountChannel.setName('📈》Members: ' + memberCount2)
    //     } catch (err) {
    //         console.log(err)
    //     }

    //     // Host Members
    //     try {

    //         axios({
    //             url: `https://dash.paradisehost.xyz/api/users`,
    //             method: 'GET',
    //             followRedirect: true,
    //             maxRedirects: 5,
    //             headers: {
    //                 'Authorization': 'Bearer ' + Dashboard.Authorization,
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'Application/vnd.pterodactyl.v1+json',
    //             }
    //         }).then(m => {

    //             let memberCountChannel = myGuild.channels.cache.get('1171583207808979014');
    //             memberCountChannel.setName('📈》Host Users: ' + m.data.total)
    //         })
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }, 90000);
}