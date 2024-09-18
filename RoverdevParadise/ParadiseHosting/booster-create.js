const Discord = require("discord.js");
const { pterodactyl, Dashboard } = require("../../configuration/Hosting");
const { default: axios } = require("axios");
module.exports = {
    name: "booster-create",
    category: "developers",
    cooldown: 2,
    Description: "",
    RunCommand: async (Roverdev, message, args, executor, language, embed, database) => {

        if (!message.member.roles.cache.has("1196131064133980250")) return;

        let config = [
            {
                type: 1,
                ram: "1548",
                disk: "1548",
                cpu: "200",
                backups: 2,
                databases: 2
            },
            {
                type: 2,
                ram: "2948",
                disk: "5144",
                cpu: "300",
                backups: 3,
                databases: 3
            },
            {
                type: "custom",
                ram: "3948",
                disk: "6144",
                cpu: "300",
                backups: 4,
                databases: 4
            }
        ]



        let BoosterType = args[0]

        let ValidTypes = ["nodejs", "python", "aio", "Java", "lavalink"]


        if (!ValidTypes.includes(args[1])) return message.reply({ content: `Invaild Server Type! Please provide one of these: ${ValidTypes.join(", ")}` })
        if (![1, 2, "custom"].includes(Number(BoosterType))) return message.reply({ content: `Invild Boost Type! Please provide if they boosted 1 or 2 times!` })

        let email = ""
        let username = ""
        let userid = ""

        axios({
            url: pterodactyl.host + "/api/application/users?per_page=99999",
            method: 'GET',
            followRedirect: true,
            maxRedirects: 5,
            headers: {
                'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
                'Content-Type': 'application/json',
                'Accept': 'Application/vnd.pterodactyl.v1+json',
            },
        }).then(m => {

            let user = m.data.data.find(m => m.attributes.username == args[2])

            userid = user.attributes.id
            email = user.attributes.email
            username = user.attributes.username

            let discordUser = ``

            axios({
                url: `https://dash.paradisehost.xyz/api/users?per_page=99999&include=discordUser,servers,payments`,
                method: 'GET',
                followRedirect: true,
                maxRedirects: 5,
                headers: {
                    'Authorization': 'Bearer ' + Dashboard.Authorization,
                    'Content-Type': 'application/json',
                    'Accept': 'Application/vnd.pterodactyl.v1+json',
                },
            }).then(m1 => {
                let user = m1.data.data.find(m => m.email == email)

                discordUser = user.discord_user.id

                let hm = config.find(m => m.type == BoosterType)



                let ServerData = require(`../../Hosting/ServerTypes/${args[1]}.js`)(userid, `${username} Boost Server [${BoosterType}]`, hm)

                axios({
                    url: pterodactyl.host + "/api/application/servers",
                    method: 'POST',
                    followRedirect: true,
                    maxRedirects: 5,
                    headers: {
                        'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
                        'Content-Type': 'application/json',
                        'Accept': 'Application/vnd.pterodactyl.v1+json',
                    },
                    data: ServerData,
                }).then(m => {
                      let serverURL = `https://panel.paradisehost.xyz/server/${m.data.attributes.identifier}`

                      let messag345e = `**UserID:**\n- ${discordUser} | <@${discordUser}>\n**Boosted:** \n- ${BoosterType}x\n**Server created on:**\n- <t:${Math.floor(Date.now() / 1000)}:F>\n**Server Link:**\n- ${serverURL}`

                      Roverdev.channels.cache.get("1196975761358323712").send({ content: messag345e })
                      message.channel.send({ content: `<@${discordUser}> Your server is created! Server: ${serverURL}` })
                }).catch(e => console.log(e.response.data)) 

            })

        })
    }
}