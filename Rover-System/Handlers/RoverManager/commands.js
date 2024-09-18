const { readdirSync } = require("fs");
const { red, blue, green, yellow } = require("colors");

module.exports = async (Rover) => {
  Rover.HandlerLoaded = false

  let Commands = []

  readdirSync("./Commands").forEach(CommandDirectory => {
    readdirSync("./Commands/" + `${CommandDirectory}/`).forEach(CommandDirectory1 => {
      const CommandsInFolders = readdirSync("./Commands/" + `${CommandDirectory}/` + `${CommandDirectory1}/`).filter(f => f.endsWith(".js"))

      for (const Event of CommandsInFolders) {

        const event = require(`../../Commands/${CommandDirectory}/${CommandDirectory1}/${Event}`)
        let eventName = Event.split(".")[0]

        if (CommandDirectory == "Rover-Manager") {
          //   setTimeout(() => {
          //     Rover.on(eventName, event.bind(null, Rover))
          //  }, 500);

          Rover.container.commands.set(`${eventName}`.replace(".js", ""), event)

          Commands.push(`${`${eventName}`.replace(".js", "").replace(' ', "")}/${CommandDirectory1}`)

        }
      }
    })
  })

 Rover.Categories = []

  readdirSync("./Commands").forEach(CommandDirectory => {
    readdirSync("./Commands/" + `${CommandDirectory}/`).forEach(CommandDirectory1 => {
      if (CommandDirectory == "Rover-Manager") {
        Rover.Categories.push(`${CommandDirectory1}`)
      }
    })
  })

  let i = 0
  let i2 = 0



  Rover.logger(yellow(`=================================================> Loading Rover Manager `))
  Rover.logger(green(`===============================================> Loading Commands `))

  Rover.logger(red(`============================= Loading ${Rover.Categories[i]}`))

  const data = {}
  let LoadedCategory = []

  Rover.Categories.forEach(m => {
    data[m.split("/")[0]] = []
  })


  setTimeout(() => {
    Commands.forEach(m => {
      data[m.split("/")[1]].push(m.split("/")[0])
    })

    const LoadCommandsInCategory = setInterval(function() {


      let ready = true
    

      if (LoadedCategory.length == Rover.Categories.length) {
            clearInterval(LoadCommandsInCategory)
            return Rover.HandlerLoaded = true
      }

      if (i2 == data[Rover.Categories[i]].length) {
           LoadedCategory.push(data[Rover.Categories[i]])
           i++ 

           i2 = 0
           if (Rover.Categories[i] == undefined) return;

           Rover.logger(red(`============================= Loading ${Rover.Categories[i]}`))
           
           ready += true
      }

      if (ready == true) {
                Rover.logger(green(`> Successfully Loaded ${data[Rover.Categories[i]][i2]} Command!`))
                i2++
      }
    }, 200)

  }, 1000)
}