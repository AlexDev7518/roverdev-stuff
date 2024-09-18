module.exports = (email, serverName, serverDetails) => {
    return {
        "name": serverName,
        "user": email,
        "nest": 5,
        "egg": 15,
        "docker_image": "ghcr.io/parkervcp/yolks:nodejs_20",
        "startup": 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/node /home/container/{{BOT_JS_FILE}}',
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
            "MAIN_FILE": "index.js"
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