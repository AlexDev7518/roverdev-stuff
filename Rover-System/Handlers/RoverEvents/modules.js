const { readdirSync } = require("fs");
const { red, blue, green, yellow } = require("colors");

module.exports = async (Rover) => {
  Rover.HandlerLoaded = false

  let Commands = []

  readdirSync("./Handlers/RoverEvents/Modules").forEach(CommandDirectory => {
      const CommandsInFolders = readdirSync("./Handlers/RoverEvents/Modules/" + `${CommandDirectory}/`).filter(f => f.endsWith(".js"))

      for (const Event of CommandsInFolders) {

          require(`../../Handlers/RoverEvents/Modules/${CommandDirectory}/${Event}`)(Rover)

                    Commands.push(`${`${Event}`.replace(".js", "").replace(' ', "")}/${CommandDirectory}`)

      }
  })

  Rover.ModuleCategories = []

  readdirSync("./Handlers/RoverEvents/Modules").forEach(CommandDirectory => {
        Rover.ModuleCategories.push(`${CommandDirectory}`)
  })

  let i = 0
  let i2 = 0


  Rover.logger(green(`===============================================> Loading Module `))

  if (Rover.ModuleCategories.length < 1) {
    Rover.logger(red(`============================= No Modules to Load`))
       return Rover.HandlerLoaded = true
  }

  Rover.logger(red(`============================= Loading ${Rover.ModuleCategories[i]}`))

  const data = {}
  let LoadedCategory = []

  Rover.ModuleCategories.forEach(m => {
    data[m.split("/")[0]] = []
  })


  setTimeout(() => {
    Commands.forEach(m => {
      data[m.split("/")[1]].push(m.split("/")[0])
    })

    const LoadCommandsInCategory = setInterval(function() {


      let ready = true
    

      if (LoadedCategory.length == Rover.ModuleCategories.length) {
            clearInterval(LoadCommandsInCategory)
            return Rover.HandlerLoaded = true
      }

      if (i2 == data[Rover.ModuleCategories[i]].length) {
           LoadedCategory.push(data[Rover.ModuleCategories[i]])
           i++ 

           i2 = 0
           if (Rover.ModuleCategories[i] == undefined) return;

           Rover.logger(red(`============================= Loading ${Rover.ModuleCategories[i]}`))
           
           ready += true
      }

      if (ready == true) {
                Rover.logger(green(`> Successfully Loaded ${data[Rover.ModuleCategories[i]][i2]} Module!`))
                i2++
      }
    }, 200)

  }, 1000)
}