module.exports = (email, serverName, serverDetails) => {
    return {
        "name": serverName,
        "user": email,
        "nest": 5,
        "egg": 18,
        "docker_image": "ghcr.io/parkervcp/yolks:java_19",
        "startup": 'java -Dterminal.jline=false -Dterminal.ansi=true -jar {{JARFILE}}',
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
            "JARFILE": "index.js"
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