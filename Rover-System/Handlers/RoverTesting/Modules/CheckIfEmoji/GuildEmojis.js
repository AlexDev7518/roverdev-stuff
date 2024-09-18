module.exports = async Roverdev => {
       setTimeout(() => {

        require("fs").readdirSync("./Handlers/RoverTesting/Modules/CheckIfEmoji/RoverdevEmojis/NotinRoverdev").forEach(m => {
          require("fs").renameSync("./Handlers/RoverTesting/Modules/CheckIfEmoji/RoverdevEmojis/NotinRoverdev/" + m, "./Handlers/RoverTesting/Modules/CheckIfEmoji/RoverdevEmojis/" + m)
        })
        
        setTimeout(() => {
              require("fs").readdirSync("./Handlers/RoverTesting/Modules/CheckIfEmoji/RoverdevEmojis").forEach(m => {



                     if (!Roverdev.guilds.cache.get("846548733914906664").emojis.cache.find(f => f.name == m.split(".")[0]) && m !== "NotinRoverdev") {
                             require("fs").renameSync("./Handlers/RoverTesting/Modules/CheckIfEmoji/RoverdevEmojis/" + m, "./Handlers/RoverTesting/Modules/CheckIfEmoji/RoverdevEmojis/NotinRoverdev/" + m, function(err) {
                                       if (err) throw err
                                       console.log(`Successfully Moved ${m}`)
                             })
                     }
           })
        }, 5000);
       }, 10000);
}