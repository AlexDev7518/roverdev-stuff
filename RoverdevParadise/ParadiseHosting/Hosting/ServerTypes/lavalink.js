module.exports = (email, serverName, serverDetails) => {
    return {
        "name": serverName,
        "user": email,
        "nest": 3,
        "egg": 22,
        "docker_image": "ghcr.io/parkervcp/yolks:java_17",
        "startup": 'java -jar Lavalink.jar',
        "limits": {
            "memory": serverDetails.ram,
            "swap": 0,
            "disk": serverDetails.disk,
            "io": 500,
            "cpu": serverDetails.cpu
        },  
        "environment": {
            "USER_UPLOAD": 0,
            "AUTO_UPDATE": 0,
            "GITHUB_PACKAGE": "lavalink-devs/Lavalink",
            "VERSION": "3.7.11",
            "MATCH": "Lavalink.jar"
        },
        "feature_limits": {
            "databases": serverDetails.databases,
            "allocations": 0,
            "backups": serverDetails.backups
        },
        "deploy": {
            "locations": [1],
            "dedicated_ip": false,
            "port_range": []
        },
        "start_on_completion": false
    }
}