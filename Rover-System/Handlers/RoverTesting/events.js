const { readdirSync } = require("fs");
const { red, blue, green, yellow } = require("colors");

module.exports = async (Rover) => {
  Rover.HandlerLoaded = false

  let Commands = []

  Rover.Events = []

  readdirSync("./Events").forEach(CommandDirectory => {
    readdirSync("./Events/" + `${CommandDirectory}/`).forEach(CommandDirectory1 => {
      const CommandsInFolders = readdirSync("./Events/" + `${CommandDirectory}/` + `${CommandDirectory1}/`).filter(f => f.endsWith(".js"))

      for (const Event of CommandsInFolders) {

        const event = require(`../../Events/${CommandDirectory}/${CommandDirectory1}/${Event}`)
        let eventName = Event.split(".")[0]

        if (CommandDirectory == "Rover-Testing") {
            setTimeout(() => {
              Rover.on(eventName, event.bind(null, Rover))
           }, 500);

          Commands.push(`${`${eventName}`.replace(".js", "").replace(' ', "")}/${CommandDirectory1}`)
          Rover.Events.push(`${`${eventName}`.replace(".js", "").replace(' ', "")}/${CommandDirectory1}`)

        }
      }
    })
  })

  readdirSync("./Events").forEach(CommandDirectory => {
    readdirSync("./Events/" + `${CommandDirectory}/`).forEach(CommandDirectory1 => {
      if (CommandDirectory == "Rover-Testing") {
        Rover.container.EventCategorys.push(`${CommandDirectory1}`)
      }
    })
  })

  let i = 0
  let i2 = 0



  Rover.logger(green(`===============================================> Loading Events `))

  Rover.logger(red(`============================= Loading ${Rover.container.EventCategorys[i]}`))

  const data = {}
  let LoadedCategory = []

  Rover.container.EventCategorys.forEach(m => {
    data[m.split("/")[0]] = []
  })


  setTimeout(() => {
    Commands.forEach(m => {
      data[m.split("/")[1]].push(m.split("/")[0])
    })

    const LoadCommandsInCategory = setInterval(function() {


      let ready = true
    

      if (LoadedCategory.length == Rover.container.EventCategorys.length) {
            clearInterval(LoadCommandsInCategory)
            return Rover.HandlerLoaded = true
      }

      if (i2 == data[Rover.container.EventCategorys[i]].length) {
           LoadedCategory.push(data[Rover.container.EventCategorys[i]])
           i++ 

           i2 = 0
           if (Rover.container.EventCategorys[i] == undefined) return;

           Rover.logger(red(`============================= Loading ${Rover.container.EventCategorys[i]}`))
           
           ready += true
      }

      if (ready == true) {
                Rover.logger(green(`> Successfully Loaded ${data[Rover.container.EventCategorys[i]][i2]} Event!`))
                i2++
      }
    }, 200)

  }, 1000)
}