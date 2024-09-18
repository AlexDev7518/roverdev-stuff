const { EmbedBuilder, AttachmentBuilder, Events } = require("discord.js")
const axios = require('axios');
const { ping } = require('ping-tcp-js');
const { Nodes, pterodactyl } = require("../../configuration/Hosting");



module.exports = async Roverdev => {

    // Roverdev.on(Events.ClientReady, async () => {
    //     let momoryUsage = 0
    //     momoryUsage = 0

    //     let Mib = 0
    //     Mib = 0

    //     let servers = []
    //     servers.length = 0

    //     let TotalStuff = {
    //         Users: 0,
    //         Servers: 0,
    //         Nodes: 0
    //     }


    //     TotalStuff.Users = 0
    //     TotalStuff.Servers = 0
    //     TotalStuff.Nodes = 0

    //     let MemoryData = {
    //         Node1: "0",
    //         Node2: "0"
    //     }
    //     MemoryData.Node1 = "0"
    //     MemoryData.Node2 = "0"

    //     await axios({
    //         url: pterodactyl.host + "/api/application/users?per_page=99999",
    //         method: 'GET',
    //         followRedirect: true,
    //         maxRedirects: 5,
    //         headers: {
    //             'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
    //             'Content-Type': 'application/json',
    //             'Accept': 'Application/vnd.pterodactyl.v1+json',
    //         }
    //     }).then((m) => {
    //         TotalStuff.Users = m.data.data.length
    //     }).catch(() => { })


    //     await axios({
    //         url: pterodactyl.host + "/api/application/servers?per_page=99999",
    //         method: 'GET',
    //         followRedirect: true,
    //         maxRedirects: 5,
    //         headers: {
    //             'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
    //             'Content-Type': 'application/json',
    //             'Accept': 'Application/vnd.pterodactyl.v1+json',
    //         }
    //     }).then(async (m) => {

    //         TotalStuff.Servers = m.data.data.length

    //         await axios({
    //             url: pterodactyl.host + "/api/application/nodes/",
    //             method: 'GET',
    //             followRedirect: true,
    //             maxRedirects: 5,
    //             headers: {
    //                 'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'Application/vnd.pterodactyl.v1+json',
    //             }
    //         }).then((m) => {
    //             TotalStuff.Nodes = m.data.data.length
    //         })

    //         //     m.data.data.forEach(m => {

    //         //          if (m.attributes.node == Number(2) && m.attributes.suspended == false) {
    //         //                servers.push(m)
    //         //          }
    //         //     })    


    //         //     setTimeout(() => {
    //         //         servers.forEach(async m => {

    //         //             await axios({
    //         //                 url: pterodactyl.host + `/api/client/servers/${m.attributes.identifier}/resources`,
    //         //                 method: 'GET',
    //         //                 followRedirect: true,
    //         //                 maxRedirects: 5,
    //         //                 headers: {
    //         //                     'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
    //         //                     'Content-Type': 'application/json',
    //         //                     'Accept': 'Application/vnd.pterodactyl.v1+json',
    //         //                 }
    //         //             }).then(async (m) => {




    //         //                 function formatBytes1(bytes, decimals = 2) {
    //         //                     if (!+bytes) return '0 Bytes'

    //         //                     const k = 1024
    //         //                     const dm = decimals < 0 ? 0 : decimals
    //         //                     const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    //         //                     const i = Math.floor(Math.log(bytes) / Math.log(k))

    //         //                     return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    //         //                 }

    //         //                 let NumberGIg = formatBytes1(m.data.attributes.resources.memory_bytes)


    //         //                 if (NumberGIg.includes("GiB")) {

    //         //                     momoryUsage = Number(momoryUsage) + Number(NumberGIg.split(".")[0])
    //         //                     Mib = Number(Mib) + Number(NumberGIg.split(".")[1].replace(' GB', ''))

    //         //                 } else if (NumberGIg.includes("MiB")) {
    //         //                     let number = NumberGIg.split(".")[0]
    //         //                     Mib = Number(Mib) + Number(number)
    //         //                 }


    //         //                 await axios({
    //         //                     url: pterodactyl.host + "/api/application/nodes/",
    //         //                     method: 'GET',
    //         //                     followRedirect: true,
    //         //                     maxRedirects: 5,
    //         //                     headers: {
    //         //                         'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
    //         //                         'Content-Type': 'application/json',
    //         //                         'Accept': 'Application/vnd.pterodactyl.v1+json',
    //         //                     }
    //         //                 }).then((m) => {


    //         //                     MemoryData.Node1 = `${Mib == NaN || MemoryData == NaN || Mib == "NaN" || MemoryData == "NaN" ? `0 GB` : `${momoryUsage == 0 || momoryUsage == "0"  ? `${Mib > 1000 ? "1 GB" : Mib > 2000 ? `2+ GB` : `${Mib} MGB`}` : `${momoryUsage} GB`}`}/${Number(`${`${m.data.data.find(f => f.attributes.id == 2).attributes.memory}`.replace("000", "")}`)} GB`

    //         //                     TotalStuff.Nodes = m.data.data.length

    //         //                     MemoryData.Node1.replace("NaN", "0")

    //         //                 }).catch((e) => {});

    //         //             }).catch((e) => {});
    //         //         })
    //         //     }, 100);
    //     }).catch(() => { });


    //     if (Mib == NaN) Mib = 0


    //     let nodestatus = [];
    //     nodestatus.length = 0

    //     await Promise.all(Nodes.map(async node => {
    //         let wingscreds = await axios({
    //             url: pterodactyl.host + "/api/application/nodes/" + node.id + "/configuration",
    //             method: 'GET',
    //             followRedirect: true,
    //             maxRedirects: 5,
    //             headers: {
    //                 'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'Application/vnd.pterodactyl.v1+json',
    //             }
    //         }).catch(() => { });


    //         if (!wingscreds) return panel = false

    //         let servers = (await axios({
    //             url: pterodactyl.host + "/api/application/nodes/" + node.id + "?include=servers",
    //             method: 'GET',
    //             followRedirect: true,
    //             maxRedirects: 5,
    //             headers: {
    //                 'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'Application/vnd.pterodactyl.v1+json',
    //             }
    //         }).catch(() => { }))

    //         if (!servers) return panel = false

    //         let wingsstatus = await axios({
    //             url: servers.data.attributes.scheme + '://' + servers.data.attributes.fqdn + ':' + servers.data.attributes.daemon_listen + '/api/system',
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': 'Bearer ' + wingscreds.data.token,
    //                 'Content-Type': 'application/json',
    //                 'Accept': '*/*',
    //             }
    //         }).catch(() => { });

    //         let nodeInfo = await axios({
    //             url: pterodactyl.host + "/api/application/nodes/" + node.id,
    //             method: 'GET',
    //             followRedirect: true,
    //             maxRedirects: 5,
    //             headers: {
    //                 'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'Application/vnd.pterodactyl.v1+json',
    //             }
    //         }).catch(() => { });

    //         let nodeLocations = await axios({
    //             url: pterodactyl.host + "/api/application/nodes/" + node.id + "/allocations",
    //             method: 'GET',
    //             followRedirect: true,
    //             maxRedirects: 5,
    //             headers: {
    //                 'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'Application/vnd.pterodactyl.v1+json',
    //             }
    //         }).catch(() => { });


    //         let LocationInfo = await axios({
    //             url: pterodactyl.host + `/api/application/locations/${nodeInfo.data.attributes.location_id}`,
    //             method: 'GET',
    //             followRedirect: true,
    //             maxRedirects: 5,
    //             headers: {
    //                 'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'Application/vnd.pterodactyl.v1+json',
    //             }
    //         }).catch(() => { })


            // let latency = Date.now();
            // await ping(node.domain, node.port).then(() => {
            //     latency = Date.now() - latency
            // }).catch(() => {
            //     latency = NaN
            // })


    //         if (wingsstatus?.data) {
    //             nodestatus.push({ name: node.name, status: wingsstatus?.data ? true : false, servers: servers?.data?.attributes?.relationships?.servers?.data?.length, serverLimit: nodeLocations?.data?.meta?.pagination?.total, latency: latency, location: LocationInfo?.data?.attributes?.short, StandardStatsMemory: `${formatBytes(nodeInfo?.data?.attributes?.allocated_resources.memory)}/${formatBytes(nodeInfo?.data?.attributes?.memory)}`, StandardStorage: `${formatBytes(nodeInfo?.data?.attributes?.allocated_resources?.disk)}/${formatBytes(nodeInfo?.data?.attributes?.disk)}`, Maintenance: nodeInfo?.data?.attributes?.maintenance_mode })
    //         } else {
    //             nodestatus.push({ name: node.name, status: wingsstatus?.data ? true : false, Maintenance: false })
    //         }
    //     }))
        // let channel = Roverdev.channels.cache.get("1171585813281247252")
        // let msg = (await channel.messages.fetch({ limit: 10 })).filter(m => m.author.id === Roverdev.user.id).last()

    //     let panellatency = Date.now();
    //     await ping(pterodactyl.host.replace('https://', ''), 80).then(() => {
    //         panellatency = Date.now() - panellatency
    //     }).catch(() => {
    //         panellatency = NaN
    //     })


    //     const attachment = new AttachmentBuilder("/home/Roverdev-AlexDev/MainManager/RoverdevOP.png", { name: "NodeStats.png" });


    //     if (!msg) channel.send({
    //         embeds: [
    //             new EmbedBuilder()
    //                 .setAuthor({ name: `Roverdev Hosting | Node Stats`, iconURL: channel.guild.iconURL() })
    //                 .setColor("Yellow")
    //                 .setImage("attachment://NodeStats.png")
    //                 .setDescription(`\n${Nodes.map(m => `## **${m["name"]} [${nodestatus.find(f => f.name == m["name"])?.Maintenance == true ? "🚧 Maintenance" : `${nodestatus.find(f => f.name == m["name"])?.latency ? `${nodestatus.find(f => f.name == m["name"]).latency < 5 ? `<:Best_Signal:1130334094895624194> ${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping` : nodestatus.find(f => f.name == m["name"]).latency > 5 ? `<:Good_Signal:1130334097005346917> ${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping` : nodestatus.find(f => f.name == m["name"]).latency > 10 ? `<:Decent_Signal:1130334100021055549>  ${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping` : nodestatus.find(f => f.name == m["name"]).latency > 20 ? `<:Better_Signal:1130334103288422520> ${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping` : nodestatus.find(f => f.name == m["name"]).latency > 50 ? `<:Bad_Signal:1130334105435918376> ${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping` : `${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping`}` : `Offline <:No_Signal:1130334108707475556>`}`}]**:\n\`\`\`js\nStatus: ${nodestatus.find(f => f.name == m["name"]).Maintenance == true ? "🚧 Maintenance" : `${nodestatus.find(f => f.name == m["name"])?.status ? `🟢 Online` : `🔴 offline`}`}\nServers: ${nodestatus.find(f => f.name == m["name"])?.servers ? `${nodestatus.find(f => f.name == m["name"])?.servers}/${nodestatus.find(f => f.name == m["name"])?.serverLimit}` : `NaN/NaN`}\nMemory[GB]:\n- Panel: ${nodestatus.find(f => f.name == m["name"])?.StandardStatsMemory ? `[${nodestatus.find(f => f.name == m["name"]).StandardStatsMemory}]` : `NaN/NaN`}\nStorage[GB]: [${nodestatus.find(f => f.name == m["name"])?.StandardStorage ? nodestatus.find(f => f.name == m["name"])?.StandardStorage : "🔴 offline"}]\nLocation: ${nodestatus.find(f => f.name == m["name"])?.location ? nodestatus.find(f => f.name == m["name"])?.location : "Not Found"}\`\`\``).join("\n")}\n\n## **Panel [${panellatency && TotalStuff.Servers == 0 ? `offline <:No_Signal:1130334108707475556>` : `${panellatency < 5 ? `<:Best_Signal:1130334094895624194> ${panellatency} MS Ping` : panellatency > 5 ? `<:Good_Signal:1130334097005346917> ${panellatency} MS Ping` : panellatency > 10 ? `<:Decent_Signal:1130334100021055549>  ${panellatency} MS Ping` : panellatency > 20 ? `<:Better_Signal:1130334103288422520> ${panellatency} MS Ping` : panellatency > 50 ? `<:Bad_Signal:1130334105435918376> ${panellatency} MS Ping` : `${panellatency} MS Ping`}`}]:**\n\`\`\`js\nStatus: ${panellatency && TotalStuff.Servers == 0 ? "🔴 offline" : `🟢 Online`}\nServers: ${TotalStuff.Servers == 0 ? "🔴 offline" : `${TotalStuff.Servers} Servers`}\nNodes: ${TotalStuff.Nodes == 0 ? "0" : `${TotalStuff.Nodes} Nodes`}\nUsers: ${TotalStuff.Users == 0 ? "🔴 offline" : `${TotalStuff.Users} Users`}\`\`\``)
    //         ], files: [attachment]
    //     })
    //     else msg.edit({
    //         embeds: [
    //             new EmbedBuilder()
    //                 .setAuthor({ name: `Roverdev Hosting | Node Stats`, iconURL: channel.guild.iconURL() })
    //                 .setColor("Yellow")
    //                 .setImage("attachment://NodeStats.png")
    //                 .setDescription(`\n${Nodes.map(m => `## **${m["name"]} [${nodestatus.find(f => f.name == m["name"])?.Maintenance == true ? "🚧 Maintenance" : `${nodestatus.find(f => f.name == m["name"])?.latency ? `${nodestatus.find(f => f.name == m["name"]).latency < 5 ? `<:Best_Signal:1130334094895624194> ${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping` : nodestatus.find(f => f.name == m["name"]).latency > 5 ? `<:Good_Signal:1130334097005346917> ${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping` : nodestatus.find(f => f.name == m["name"]).latency > 10 ? `<:Decent_Signal:1130334100021055549>  ${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping` : nodestatus.find(f => f.name == m["name"]).latency > 20 ? `<:Better_Signal:1130334103288422520> ${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping` : nodestatus.find(f => f.name == m["name"]).latency > 50 ? `<:Bad_Signal:1130334105435918376> ${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping` : `${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping`}` : `Offline <:No_Signal:1130334108707475556>`}`}]**:\n\`\`\`js\nStatus: ${nodestatus.find(f => f.name == m["name"]).Maintenance == true ? "🚧 Maintenance" : `${nodestatus.find(f => f.name == m["name"])?.status ? `🟢 Online` : `🔴 offline`}`}\nServers: ${nodestatus.find(f => f.name == m["name"])?.servers ? `${nodestatus.find(f => f.name == m["name"])?.servers}/${nodestatus.find(f => f.name == m["name"])?.serverLimit}` : `NaN/NaN`}\nMemory[GB]:\n- Panel: ${nodestatus.find(f => f.name == m["name"])?.StandardStatsMemory ? `[${nodestatus.find(f => f.name == m["name"]).StandardStatsMemory}]` : `NaN/NaN`}\nStorage[GB]: [${nodestatus.find(f => f.name == m["name"])?.StandardStorage ? nodestatus.find(f => f.name == m["name"])?.StandardStorage : "🔴 offline"}]\nLocation: ${nodestatus.find(f => f.name == m["name"])?.location ? nodestatus.find(f => f.name == m["name"])?.location : "Not Found"}\`\`\``).join("\n")}\n\n## **Panel [${panellatency && TotalStuff.Servers == 0 ? `offline <:No_Signal:1130334108707475556>` : `${panellatency < 5 ? `<:Best_Signal:1130334094895624194> ${panellatency} MS Ping` : panellatency > 5 ? `<:Good_Signal:1130334097005346917> ${panellatency} MS Ping` : panellatency > 10 ? `<:Decent_Signal:1130334100021055549>  ${panellatency} MS Ping` : panellatency > 20 ? `<:Better_Signal:1130334103288422520> ${panellatency} MS Ping` : panellatency > 50 ? `<:Bad_Signal:1130334105435918376> ${panellatency} MS Ping` : `${panellatency} MS Ping`}`}]:**\n\`\`\`js\nStatus: ${panellatency && TotalStuff.Servers == 0 ? "🔴 offline" : `🟢 Online`}\nServers: ${TotalStuff.Servers == 0 ? "🔴 offline" : `${TotalStuff.Servers} Servers`}\nNodes: ${TotalStuff.Nodes == 0 ? "0" : `${TotalStuff.Nodes} Nodes`}\nUsers: ${TotalStuff.Users == 0 ? "🔴 offline" : `${TotalStuff.Users} Users`}\`\`\``)
    //         ], content: `**Bot Ping: \`${Roverdev.ws.ping}\` | Last Updated: <t:${Math.floor(Date.now() / 1000)}:R> **`
    //     })
    // })

    // function formatBytes(bytes, decimals = 2) {
    //     if (!+bytes) return '0 Bytes'

    //     const k = 1024
    //     const dm = decimals < 0 ? 0 : decimals

    //     const i = Math.floor(Math.log(bytes) / Math.log(k))

    //     if (bytes == 1000) {
    //         return `1 GB`
    //     }

    //     if (bytes > 999) {
    //         return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} GB`
    //     } else {
    //         return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} MB`
    //     }
    // }

    // setInterval(async () => {

    //     let momoryUsage = 0
    //     momoryUsage = 0

    //     let Mib = 0
    //     Mib = 0

    //     let servers = []
    //     servers.length = 0

    //     let TotalStuff = {
    //         Users: 0,
    //         Servers: 0,
    //         Nodes: 0
    //     }


    //     TotalStuff.Users = 0
    //     TotalStuff.Servers = 0
    //     TotalStuff.Nodes = 0

    //     let MemoryData = {
    //         Node1: "0"
    //     }
    //     MemoryData.Node1 = "0"

    //     await axios({
    //         url: pterodactyl.host + "/api/application/users?per_page=99999",
    //         method: 'GET',
    //         followRedirect: true,
    //         maxRedirects: 5,
    //         headers: {
    //             'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
    //             'Content-Type': 'application/json',
    //             'Accept': 'Application/vnd.pterodactyl.v1+json',
    //         }
    //     }).then((m) => {
    //         TotalStuff.Users = m.data.data.length
    //     }).catch(() => { })




    //     await axios({
    //         url: pterodactyl.host + "/api/application/servers?per_page=99999",
    //         method: 'GET',
    //         followRedirect: true,
    //         maxRedirects: 5,
    //         headers: {
    //             'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
    //             'Content-Type': 'application/json',
    //             'Accept': 'Application/vnd.pterodactyl.v1+json',
    //         }
    //     }).then(async (m) => {

    //         TotalStuff.Servers = m.data.data.length

    //         await axios({
    //             url: pterodactyl.host + "/api/application/nodes/",
    //             method: 'GET',
    //             followRedirect: true,
    //             maxRedirects: 5,
    //             headers: {
    //                 'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'Application/vnd.pterodactyl.v1+json',
    //             }
    //         }).then((m) => {
    //             TotalStuff.Nodes = m.data.data.length
    //         })

    //             //     m.data.data.forEach(m => {

    //             //          if (m.attributes.node == Number(2)) {
    //             //                servers.push(m)
    //             //          }
    //             //     })    


    //             //      setTimeout(() => {
    //             //         servers.forEach(async m => {

    //             //             await axios({
    //             //                 url: pterodactyl.host + `/api/client/servers/${m.attributes.identifier}/resources`,
    //             //                 method: 'GET',
    //             //                 followRedirect: true,
    //             //                 maxRedirects: 5,
    //             //                 headers: {
    //             //                     'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
    //             //                     'Content-Type': 'application/json',
    //             //                     'Accept': 'Application/vnd.pterodactyl.v1+json',
    //             //                 }
    //             //             }).then(async (m) => {


    //             //                 function formatBytes1(bytes, decimals = 2) {
    //             //                     if (!+bytes) return '0 Bytes'

    //             //                     const k = 1024
    //             //                     const dm = decimals < 0 ? 0 : decimals
    //             //                     const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    //             //                     const i = Math.floor(Math.log(bytes) / Math.log(k))

    //             //                     return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    //             //                 }

    //             //                 let NumberGIg = formatBytes1(m.data.attributes.resources.memory_bytes)


    //             //                 if (NumberGIg.includes("GiB")) {

    //             //                     momoryUsage = Number(momoryUsage) + Number(NumberGIg.split(".")[0])
    //             //                     Mib = Number(Mib) + Number(NumberGIg.split(".")[1].replace(' GB', ''))

    //             //                 } else if (NumberGIg.includes("MiB")) {
    //             //                     let number = NumberGIg.split(".")[0]
    //             //                     Mib = Number(Mib) + Number(number)
    //             //                 }



    //             //                 await axios({
    //             //                     url: pterodactyl.host + "/api/application/nodes/",
    //             //                     method: 'GET',
    //             //                     followRedirect: true,
    //             //                     maxRedirects: 5,
    //             //                     headers: {
    //             //                         'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
    //             //                         'Content-Type': 'application/json',
    //             //                         'Accept': 'Application/vnd.pterodactyl.v1+json',
    //             //                     }
    //             //                 }).then((m) => {
    //             //                     MemoryData.Node1 = `${Mib == NaN || MemoryData == NaN || Mib == "NaN" || MemoryData == "NaN" ? `0 GB` : `${momoryUsage == 0 || momoryUsage == "0"  ? `${Mib > 1000 ? "1 GB" : Mib > 2000 ? `2+ GB` : `${Mib} MGB`}` : `${momoryUsage} GB`}`}/${Number(`${`${m.data.data.find(f => f.attributes.id == 2).attributes.memory}`.replace("000", "")}`)} GB`

    //             //                     TotalStuff.Nodes = m.data.data.length

    //             //                     MemoryData.Node1.replace("NaN", "0")

    //             //                 }).catch(() => { });

    //             //             }).catch(() => { });
    //             //         })
    //             //     }, 100);
    //         }).catch(() => { });


    //         let nodestatus = [];
    //         nodestatus.length = 0

    //         await Promise.all(Nodes.map(async node => {
    //             let wingscreds = await axios({
    //                 url: pterodactyl.host + "/api/application/nodes/" + node.id + "/configuration",
    //                 method: 'GET',
    //                 followRedirect: true,
    //                 maxRedirects: 5,
    //                 headers: {
    //                     'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
    //                     'Content-Type': 'application/json',
    //                     'Accept': 'Application/vnd.pterodactyl.v1+json',
    //                 }
    //             }).catch(() => { });


    //             if (!wingscreds) return panel = false

    //             let servers = (await axios({
    //                 url: pterodactyl.host + "/api/application/nodes/" + node.id + "?include=servers",
    //                 method: 'GET',
    //                 followRedirect: true,
    //                 maxRedirects: 5,
    //                 headers: {
    //                     'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
    //                     'Content-Type': 'application/json',
    //                     'Accept': 'Application/vnd.pterodactyl.v1+json',
    //                 }
    //             }).catch(() => { }))

    //             if (!servers) return panel = false

    //             let wingsstatus = await axios({
    //                 url: servers.data.attributes.scheme + '://' + servers.data.attributes.fqdn + ':' + servers.data.attributes.daemon_listen + '/api/system',
    //                 method: 'GET',
    //                 headers: {
    //                     'Authorization': 'Bearer ' + wingscreds.data.token,
    //                     'Content-Type': 'application/json',
    //                     'Accept': '*/*',
    //                 }
    //             }).catch(() => { });

    //             let nodeInfo = await axios({
    //                 url: pterodactyl.host + "/api/application/nodes/" + node.id,
    //                 method: 'GET',
    //                 followRedirect: true,
    //                 maxRedirects: 5,
    //                 headers: {
    //                     'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
    //                     'Content-Type': 'application/json',
    //                     'Accept': 'Application/vnd.pterodactyl.v1+json',
    //                 }
    //             }).catch(() => { });

    //             let nodeLocations = await axios({
    //                 url: pterodactyl.host + "/api/application/nodes/" + node.id + "/allocations",
    //                 method: 'GET',
    //                 followRedirect: true,
    //                 maxRedirects: 5,
    //                 headers: {
    //                     'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
    //                     'Content-Type': 'application/json',
    //                     'Accept': 'Application/vnd.pterodactyl.v1+json',
    //                 }
    //             }).catch(() => { });


    //             let LocationInfo = await axios({
    //                 url: pterodactyl.host + `/api/application/locations/${nodeInfo.data.attributes.location_id}`,
    //                 method: 'GET',
    //                 followRedirect: true,
    //                 maxRedirects: 5,
    //                 headers: {
    //                     'Authorization': 'Bearer ' + pterodactyl.adminApiKey,
    //                     'Content-Type': 'application/json',
    //                     'Accept': 'Application/vnd.pterodactyl.v1+json',
    //                 }
    //             }).catch(() => { })


    //             let latency = Date.now();
    //             await ping(node.domain, node.port).then(() => {
    //                 latency = Date.now() - latency
    //             }).catch(() => {
    //                 latency = NaN
    //             })


    //             if (wingsstatus?.data) {
    //                 nodestatus.push({ name: node.name, status: wingsstatus?.data ? true : false, servers: servers?.data?.attributes?.relationships?.servers?.data?.length, serverLimit: nodeLocations?.data?.meta?.pagination?.total, latency: latency, location: LocationInfo?.data?.attributes?.short, StandardStatsMemory: `${formatBytes(nodeInfo?.data?.attributes?.allocated_resources.memory)}/${formatBytes(nodeInfo?.data?.attributes?.memory)}`, StandardStorage: `${formatBytes(nodeInfo?.data?.attributes?.allocated_resources?.disk)}/${formatBytes(nodeInfo?.data?.attributes?.disk)}`, Maintenance: nodeInfo?.data?.attributes?.maintenance_mode })
    //             } else {
    //                 nodestatus.push({ name: node.name, status: wingsstatus?.data ? true : false })
    //             }
    //         }))
    //         let channel = Roverdev.channels.cache.get("1171585813281247252")
    //         let msg = (await channel.messages.fetch({ limit: 10 })).filter(m => m.author.id === Roverdev.user.id).last()

    //         let panellatency = Date.now();
    //         await ping(pterodactyl.host.replace('https://', ''), 80).then(() => {
    //             panellatency = Date.now() - panellatency
    //         }).catch(() => {
    //             panellatency = NaN
    //         })


    //         const attachment = new AttachmentBuilder("/home/Roverdev-AlexDev/MainManager/RoverdevOP.png", { name: "NodeStats.png" });


    //         if (!msg) channel.send({
    //             embeds: [
    //                 new EmbedBuilder()
    //                     .setAuthor({ name: `Roverdev Hosting | Node Stats`, iconURL: channel.guild.iconURL() })
    //                     .setColor("Yellow")
    //                     .setImage("attachment://NodeStats.png")
    //                     .setDescription(`\n${Nodes.map(m => `## **${m["name"]} [${nodestatus.find(f => f.name == m["name"])?.Maintenance == true ? "🚧 Maintenance" : `${nodestatus.find(f => f.name == m["name"])?.latency ? `${nodestatus.find(f => f.name == m["name"]).latency < 5 ? `<:Best_Signal:1130334094895624194> ${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping` : nodestatus.find(f => f.name == m["name"]).latency > 5 ? `<:Good_Signal:1130334097005346917> ${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping` : nodestatus.find(f => f.name == m["name"]).latency > 10 ? `<:Decent_Signal:1130334100021055549>  ${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping` : nodestatus.find(f => f.name == m["name"]).latency > 20 ? `<:Better_Signal:1130334103288422520> ${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping` : nodestatus.find(f => f.name == m["name"]).latency > 50 ? `<:Bad_Signal:1130334105435918376> ${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping` : `${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping`}` : `Offline <:No_Signal:1130334108707475556>`}`}]**:\n\`\`\`js\nStatus: ${nodestatus.find(f => f.name == m["name"]).Maintenance == true ? "🚧 Maintenance" : `${nodestatus.find(f => f.name == m["name"])?.status ? `🟢 Online` : `🔴 offline`}`}\nServers: ${nodestatus.find(f => f.name == m["name"])?.servers ? `${nodestatus.find(f => f.name == m["name"])?.servers}/${nodestatus.find(f => f.name == m["name"])?.serverLimit}` : `NaN/NaN`}\nMemory[GB]:\n- Panel: ${nodestatus.find(f => f.name == m["name"])?.StandardStatsMemory ? `[${nodestatus.find(f => f.name == m["name"]).StandardStatsMemory}]` : `NaN/NaN`}\nStorage[GB]: [${nodestatus.find(f => f.name == m["name"])?.StandardStorage ? nodestatus.find(f => f.name == m["name"])?.StandardStorage : "🔴 offline"}]\nLocation: ${nodestatus.find(f => f.name == m["name"])?.location ? nodestatus.find(f => f.name == m["name"])?.location : "Not Found"}\`\`\``).join("\n")}\n\n## **Panel [${panellatency && TotalStuff.Servers == 0 ? `offline <:No_Signal:1130334108707475556>` : `${panellatency < 5 ? `<:Best_Signal:1130334094895624194> ${panellatency} MS Ping` : panellatency > 5 ? `<:Good_Signal:1130334097005346917> ${panellatency} MS Ping` : panellatency > 10 ? `<:Decent_Signal:1130334100021055549>  ${panellatency} MS Ping` : panellatency > 20 ? `<:Better_Signal:1130334103288422520> ${panellatency} MS Ping` : panellatency > 50 ? `<:Bad_Signal:1130334105435918376> ${panellatency} MS Ping` : `${panellatency} MS Ping`}`}]:**\n\`\`\`js\nStatus: ${panellatency && TotalStuff.Servers == 0 ? "🔴 offline" : `🟢 Online`}\nServers: ${TotalStuff.Servers == 0 ? "🔴 offline" : `${TotalStuff.Servers} Servers`}\nNodes: ${TotalStuff.Nodes == 0 ? "0" : `${TotalStuff.Nodes} Nodes`}\nUsers: ${TotalStuff.Users == 0 ? "🔴 offline" : `${TotalStuff.Users} Users`}\`\`\``)
    //             ], files: [attachment]
    //         })
    //         else msg.edit({
    //             embeds: [
    //                 new EmbedBuilder()
    //                     .setAuthor({ name: `Roverdev Hosting | Node Stats`, iconURL: channel.guild.iconURL() })
    //                     .setColor("Yellow")
    //                     .setImage("attachment://NodeStats.png")
    //                     .setDescription(`\n${Nodes.map(m => `## **${m["name"]} [${nodestatus.find(f => f.name == m["name"])?.Maintenance == true ? "🚧 Maintenance" : `${nodestatus.find(f => f.name == m["name"])?.latency ? `${nodestatus.find(f => f.name == m["name"]).latency < 5 ? `<:Best_Signal:1130334094895624194> ${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping` : nodestatus.find(f => f.name == m["name"]).latency > 5 ? `<:Good_Signal:1130334097005346917> ${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping` : nodestatus.find(f => f.name == m["name"]).latency > 10 ? `<:Decent_Signal:1130334100021055549>  ${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping` : nodestatus.find(f => f.name == m["name"]).latency > 20 ? `<:Better_Signal:1130334103288422520> ${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping` : nodestatus.find(f => f.name == m["name"]).latency > 50 ? `<:Bad_Signal:1130334105435918376> ${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping` : `${nodestatus.find(f => f.name == m["name"])?.latency} MS Ping`}` : `Offline <:No_Signal:1130334108707475556>`}`}]**:\n\`\`\`js\nStatus: ${nodestatus.find(f => f.name == m["name"]).Maintenance == true ? "🚧 Maintenance" : `${nodestatus.find(f => f.name == m["name"])?.status ? `🟢 Online` : `🔴 offline`}`}\nServers: ${nodestatus.find(f => f.name == m["name"])?.servers ? `${nodestatus.find(f => f.name == m["name"])?.servers}/${nodestatus.find(f => f.name == m["name"])?.serverLimit}` : `NaN/NaN`}\nMemory[GB]:\n- Panel: ${nodestatus.find(f => f.name == m["name"])?.StandardStatsMemory ? `[${nodestatus.find(f => f.name == m["name"]).StandardStatsMemory}]` : `NaN/NaN`}\nStorage[GB]: [${nodestatus.find(f => f.name == m["name"])?.StandardStorage ? nodestatus.find(f => f.name == m["name"])?.StandardStorage : "🔴 offline"}]\nLocation: ${nodestatus.find(f => f.name == m["name"])?.location ? nodestatus.find(f => f.name == m["name"])?.location : "Not Found"}\`\`\``).join("\n")}\n\n## **Panel [${panellatency && TotalStuff.Servers == 0 ? `offline <:No_Signal:1130334108707475556>` : `${panellatency < 5 ? `<:Best_Signal:1130334094895624194> ${panellatency} MS Ping` : panellatency > 5 ? `<:Good_Signal:1130334097005346917> ${panellatency} MS Ping` : panellatency > 10 ? `<:Decent_Signal:1130334100021055549>  ${panellatency} MS Ping` : panellatency > 20 ? `<:Better_Signal:1130334103288422520> ${panellatency} MS Ping` : panellatency > 50 ? `<:Bad_Signal:1130334105435918376> ${panellatency} MS Ping` : `${panellatency} MS Ping`}`}]:**\n\`\`\`js\nStatus: ${panellatency && TotalStuff.Servers == 0 ? "🔴 offline" : `🟢 Online`}\nServers: ${TotalStuff.Servers == 0 ? "🔴 offline" : `${TotalStuff.Servers} Servers`}\nNodes: ${TotalStuff.Nodes == 0 ? "0" : `${TotalStuff.Nodes} Nodes`}\nUsers: ${TotalStuff.Users == 0 ? "🔴 offline" : `${TotalStuff.Users} Users`}\`\`\``)
    //             ], content: `**Bot Ping: \`${Roverdev.ws.ping}\` | Last Updated: <t:${Math.floor(Date.now() / 1000)}:R> **`
    //         })
    //     }, 60000);

    //     //   setTimeout(() => {


    //     //     let channel = Roverdev.channels.cache.get("1148641197041135729")


    //     // const attachment = new AttachmentBuilder("/root/paradisehost-bot/NodeStats.png", { name: "NodeStats.png" });

    //     // channel.send({ embeds: [
    //     //       new EmbedBuilder()
    //     //        .setAuthor({ name: `Paradise Hosting | Node Stats`, iconURL: "https://i.imgur.com/S9YXGxY.png" })
    //     //        .setColor("Yellow")
    //     //        .setImage("attachment://NodeStats.png")
    //     //        .setDescription(`Coming soon....`)
    //     // ], files: [attachment]})
    //     //   }, 5000);
    }