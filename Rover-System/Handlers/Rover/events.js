const { readdirSync } = require("fs");
const { red, blue, green, yellow } = require("colors");

module.exports = async (Rover) => {
  Rover.HandlerLoaded = false

  let Commands = []

  readdirSync("./Events").forEach(CommandDirectory => {
    readdirSync("./Events/" + `${CommandDirectory}/`).forEach(CommandDirectory1 => {
      const CommandsInFolders = readdirSync("./Events/" + `${CommandDirectory}/` + `${CommandDirectory1}/`).filter(f => f.endsWith(".js"))

      for (const Event of CommandsInFolders) {

        const event = require(`../../Events/${CommandDirectory}/${CommandDirectory1}/${Event}`)
        let eventName = Event.split(".")[0]

        if (CommandDirectory == "Rover-Bot") {
            setTimeout(() => {
              Rover.on(eventName, event.bind(null, Rover))
           }, 500);

          Commands.push(`${`${eventName}`.replace(".js", "").replace(' ', "")}/${CommandDirectory1}`)

        }
      }
    })
  })

  Rover.Eventscategories = []

  readdirSync("./Events").forEach(CommandDirectory => {
    readdirSync("./Events/" + `${CommandDirectory}/`).forEach(CommandDirectory1 => {
      if (CommandDirectory == "Rover-Bot") {
        Rover.Eventscategories.push(`${CommandDirectory1}`)
      }
    })
  })

  let i = 0
  let i2 = 0



  Rover.logger(green(`===============================================> Loading Events `))

  Rover.logger(red(`============================= Loading ${Rover.Eventscategories[i]}`))

  const data = {}
  let LoadedCategory = []

  Rover.Eventscategories.forEach(m => {
    data[m.split("/")[0]] = []
  })


  setTimeout(() => {
    Commands.forEach(m => {
      data[m.split("/")[1]].push(m.split("/")[0])
    })

    const LoadCommandsInCategory = setInterval(function() {


      let ready = true
    

      if (LoadedCategory.length == Rover.Eventscategories.length) {
            clearInterval(LoadCommandsInCategory)
            return Rover.HandlerLoaded = true
      }

      if (i2 == data[Rover.Eventscategories[i]].length) {
           LoadedCategory.push(data[Rover.Eventscategories[i]])
           i++ 

           i2 = 0
           if (Rover.Eventscategories[i] == undefined) return;

           Rover.logger(red(`============================= Loading ${Rover.Eventscategories[i]}`))
           
           ready += true
      }

      if (ready == true) {
                Rover.logger(green(`> Successfully Loaded ${data[Rover.Eventscategories[i]][i2]} Event!`))
                i2++
      }
    }, 200)

  }, 1000)
}