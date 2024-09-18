const { readdirSync } = require("fs");
const { red, blue, green, yellow } = require("colors");

module.exports = async (Rover) => {
  Rover.HandlerLoaded = false

  let Commands = []

  readdirSync("./Handlers/RoverTesting/Modules").forEach(CommandDirectory => {
      const CommandsInFolders = readdirSync("./Handlers/RoverTesting/Modules/" + `${CommandDirectory}/`).filter(f => f.endsWith(".js"))

      for (const Event of CommandsInFolders) {

          require(`../../Handlers/RoverTesting/Modules/${CommandDirectory}/${Event}`)(Rover)


                    Commands.push(`${`${Event}`.replace(".js", "").replace(' ', "")}/${CommandDirectory}`)
      }
  })

  Rover.container.ModulesCategorys = []

  readdirSync("./Handlers/RoverTesting/Modules").forEach(CommandDirectory => {
        Rover.container.ModulesCategorys.push(`${CommandDirectory}`)
  })

  let i = 0
  let i2 = 0


  Rover.logger(green(`===============================================> Loading Module `))

  if (Rover.container.ModulesCategorys.length < 1) {
    Rover.logger(red(`============================= No Modules to Load`))
       return Rover.HandlerLoaded = true
  }

  Rover.logger(red(`============================= Loading ${Rover.container.ModulesCategorys[i]}`))

  const data = {}
  let LoadedCategory = []

  Rover.container.ModulesCategorys.forEach(m => {
    data[m.split("/")[0]] = []
  })


  setTimeout(() => {
    Commands.forEach(m => {
      data[m.split("/")[1]].push(m.split("/")[0])
    })

    const LoadCommandsInCategory = setInterval(function() {


      let ready = true
    

      if (LoadedCategory.length == Rover.container.ModulesCategorys.length) {
            clearInterval(LoadCommandsInCategory)
            return Rover.HandlerLoaded = true
      }

      if (i2 == data[Rover.container.ModulesCategorys[i]].length) {
           LoadedCategory.push(data[Rover.container.ModulesCategorys[i]])
           i++ 

           i2 = 0
           if (Rover.container.ModulesCategorys[i] == undefined) return;

           Rover.logger(red(`============================= Loading ${Rover.container.ModulesCategorys[i]}`))
           
           ready += true
      }

      if (ready == true) {
                Rover.logger(green(`> Successfully Loaded ${data[Rover.container.ModulesCategorys[i]][i2]} Module!`))
                i2++
      }
    }, 200)

  }, 1000)
}