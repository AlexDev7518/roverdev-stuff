const { Client } = require('discord-cross-hosting');
const Cluster = require('discord-hybrid-sharding');
const colors = require("colors")
const client = new Client({
    agent: 'bot',
    host: '109.71.253.241', // Domain without https
    port: 4444, // Proxy Connection (Replit) needs Port 443
    handshake: true, // When Replit or any other Proxy is used
    authToken: 'Roverdev1234',
    rollingRestarts: true, // Enable, when bot should respawn when cluster list changes.
});
client.on('debug', console.log);
client.connect();

client.on("ready", () => {
     console.log(`Bridge Ready.`)
})

client.on("bridgeRequest", async message => {
     console.log(message)
})

client.on("bridgeMessage", async message => {
    console.log(message)
})

client.on("error", async error => {
    console.log(error)
})

const manager = new Cluster.Manager(`${__dirname}/CE-index.js`, { totalShards: 1, totalClusters: 'auto' }); // Some dummy Data
manager.on('clusterCreate', cluster => {
    console.log(`Launched Cluster ${cluster.id}`)

    cluster.on("death", function () {
        console.log(`${colors.red.bold(`Cluster ${cluster.id} died..`)}`);
    });

    cluster.on("error", e => {
        console.log(`${colors.red.bold(`Cluster ${cluster.id} errored ..`)}`);
        console.error(e);
    })
    
    cluster.on("disconnect", function () {
        console.log(`${colors.red.bold(`Cluster ${cluster.id} disconnected..`)}`);
    });

    cluster.on("reconnecting", function () {
        console.log(`${colors.yellow.bold(`Cluster ${cluster.id} reconnecting..`)}`);
    });

    cluster.on("close", function (code) {
        console.log(`${colors.red.bold(`Cluster ${cluster.id} close with code ${code}`)}`);
    });

    cluster.on("exit", function (code) {
        console.log(`${colors.red.bold(`Cluster ${cluster.id} exited with code ${code}`)}`);
    });
});
manager.on('debug', console.log);


client.listen(manager);
client
    .requestShardData()
    .then(e => {
        if (!e) return;
        if (!e.shardList) return;
        manager.totalShards = e.totalShards;
        manager.totalClusters = e.shardList.length;
        manager.shardList = e.shardList;
        manager.clusterList = e.clusterList;
        manager.spawn();
    })
    .catch(e => console.log(e));