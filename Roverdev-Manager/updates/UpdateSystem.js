module.exports = async Roverdev => {
         setInterval(() => {
           const folders =  require("fs").readdirSync("/home/Roverdev-Manager/updates/Log")
           
           folders.forEach(f => {
                     if (!require("./Updates.json").Updates.includes(f)) {

                               var data = require("fs").readFileSync(`/home/Roverdev-Manager/updates/Log/${f}`, 'utf8'); 

                              Roverdev.channels.cache.get("1062068370347917362").send({
                                     content: `Hello Everyone, Here is the ${f.split(".")[0]} of ${Roverdev.user.username}!\n${data}\n\n****Update Posted: <t:${Math.floor(Date.now()/1000)}:R>****\n> - Update Posted By: AlexDev#7518`
                              })

                              let config = require(`./Updates.json`)

                              config.Updates.push(f)

                         setTimeout(() => {
                            require("fs").writeFileSync(`/home/Roverdev-Manager/updates/Updates.json`, JSON.stringify(config, null, 3), (err) => {
                              if (err) {
                                res.status(400).json({ sucess: false})
                              }
                            })
                         }, 1000);
                     } 
           })
         }, 30000);
}