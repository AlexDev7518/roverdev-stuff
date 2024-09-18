module.exports = (email, serverName, serverDetails) => {
    return {
        "name": serverName,
        "user": email,
        "nest": 5,
        "egg": 17,
        "docker_image": "ghcr.io/parkervcp/yolks:python_3.11",
        "startup": "if [[ -d .git ]] && [[ \"{{AUTO_UPDATE}}\" == \"1\" ]]; then git pull; fi; if [[ ! -z \"{{PY_PACKAGES}}\" ]]; then pip install -U --prefix .local {{PY_PACKAGES}}; fi; if [[ -f \/home\/container\/${REQUIREMENTS_FILE} ]]; then pip install -U --prefix .local -r ${REQUIREMENTS_FILE}; fi; \/usr\/local\/bin\/python \/home\/container\/{{PY_FILE}}",
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
            "PY_FILE": "index.py",
            "REQUIREMENTS_FILE": "requirements.txt"
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