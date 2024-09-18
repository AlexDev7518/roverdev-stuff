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

        if (CommandDirectory == "Rover-Testing") {
          //   setTimeout(() => {
          //     Rover.on(eventName, event.bind(null, Rover))
          //  }, 500);

          Rover.container.commands.set(`${eventName}`.replace(".js", ""), event)

          Commands.push(`${`${eventName}`.replace(".js", "").replace(' ', "")}/${CommandDirectory1}`)

        }
      }
    })
  })

  readdirSync("./Commands").forEach(CommandDirectory => {
    readdirSync("./Commands/" + `${CommandDirectory}/`).forEach(CommandDirectory1 => {
      if (CommandDirectory == "Rover-Testing") {
        Rover.container.CommandCategorys.push(`${CommandDirectory1}`)
      }
    })
  })

  let i = 0
  let i2 = 0



  Rover.logger(yellow(`=================================================> Loading Rover Testing `))
  Rover.logger(green(`===============================================> Loading Commands `))

  Rover.logger(red(`============================= Loading ${Rover.container.CommandCategorys[i]}`))

  const data = {}
  let LoadedCategory = []

  Rover.container.CommandCategorys.forEach(m => {
    data[m.split("/")[0]] = []
  })


  setTimeout(() => {
    Commands.forEach(m => {
      data[m.split("/")[1]].push(m.split("/")[0])
    })

    const LoadCommandsInCategory = setInterval(function() {


      let ready = true
    

      if (LoadedCategory.length == Rover.container.CommandCategorys.length) {
            clearInterval(LoadCommandsInCategory)
            return Rover.HandlerLoaded = true
      }

      if (i2 == data[Rover.container.CommandCategorys[i]].length) {
           LoadedCategory.push(data[Rover.container.CommandCategorys[i]])
           i++ 

           i2 = 0
           if (Rover.container.CommandCategorys[i] == undefined) return;

           Rover.logger(red(`============================= Loading ${Rover.container.CommandCategorys[i]}`))
           
           ready += true
      }

      if (ready == true) {
                Rover.logger(green(`> Successfully Loaded ${data[Rover.container.CommandCategorys[i]][i2]} Command!`))
                i2++
      }
    }, 200)

  }, 1000)
}