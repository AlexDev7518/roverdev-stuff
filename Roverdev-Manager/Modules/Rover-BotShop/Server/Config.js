module.exports = {
    ShopServers: [
           {
                Host: "135.148.236.229",
                User: "root",
                Port: 6498,
                Key: require("fs").readFileSync("/home/Roverdev-Manager/Private/RoverdevShopServer")
           }
    ]
}