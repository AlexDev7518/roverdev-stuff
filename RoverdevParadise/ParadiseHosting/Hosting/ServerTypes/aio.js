module.exports = (email, serverName, serverDetails) => {
    return {
        "name": serverName,
        "user": email,
        "nest": 5,
        "egg": 23,
        "docker_image": "danbothosting/aio",
        "startup": 'bash',
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
            "STARTUP_CMD": 'bash',
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