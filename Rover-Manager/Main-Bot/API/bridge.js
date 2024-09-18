const { remoteCacheServer, remoteCacheClient } = require("remote-sqlite-database");

module.exports = async client => {
    //  setTimeout(() => {
    //     const DataCenter = new remoteCacheServer({
    //         username: "RoverdevData",
    //         password: "DatabaseRoverdev3245",
    //         name: "RoverdevDatacenter",
    //         dataDir: "./Main-Bot/API/data",
    //         port: 4444, // Any port
    //         tls: true,
    //         async: false
    //     });
    
    //     DataCenter.on("serverReady", () => {
    //             console.log("(Roverdev Main Database) ready and waiting for connections");
    //         })
    //         .on("serverError", (error) => {
    //             console.error("(Roverdev Main Database)  error, ERROR:\n", error, "\n---\n");
    //         })
    //         .on("serverClose", (reason) => {
    //             console.log("(Roverdev Main Database) Is Closed");
    //         })
    //         .on("serverConnect", (connection, payload) => {
    //             console.log(`(Roverdev Main Database) Client Connected`);
    //         })
    //         .on("serverDisconnect", (connection, reason) => {
    //             console.log("(Roverdev Main Database) Client Disconnected");
    //         })
    //         .on("serverMessage", (message) => {
    //             console.log("(Roverdev Main Database), received a Message", message);
    //         })
    //         .on("serverRequest", async (request, response, client) => {
    //             console.log("(Roverdev Main Database), received a Request", request);
        
    //         });

    //         const MainDatabase = new remoteCacheClient({
    //             username: "RoverdevData",
    //             password: "DatabaseRoverdev3245",
    //             host: "135.148.236.227",
    //             port: 4444,
    //             tls: true,
    //             async: false,
    //             keyPathing: true, // true|false ... enables if the key contains a "." that it's splitted to a path, e.g.: "hello.world.hi" --> key = "hello", path = "world.hi", db.get("hello") --> {world: {hi: "value"}}
    //         }); 
    //         //keyPathing should be set to false, if you want to do "key.hello" as a key
            
    //         // following events are optional
    //         MainDatabase
    //             .on("cacheReady", () => {
    //                 console.log("(Roverdev Main Client) ready and connected");
    //             })
    //             .on("cacheError", (error) => {
    //                 console.error("(Roverdev Main Client) error, ERROR:\n", error, "\n---\n");
    //             })
    //             .on("cacheClose", (reason) => {
    //                 console.log("(Roverdev Main Client) closed, REASON?:\n", reason, "\n---\n");
    //             })
    //             .on("cacheMessage", (message) => {
    //                 console.log("message", message);
    //             })
    //             .on("cacheRequest", async (request, response, client) => {
    //                 console.log("REQUEST", request);
    //             });
    
    //         client.DataCenter = MainDatabase
    //  }, 1900);

}