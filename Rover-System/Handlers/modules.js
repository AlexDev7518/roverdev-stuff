const { readdirSync } = require("fs");
const { red, blue, green, yellow } = require("colors");

module.exports = async (Rover, RoverManager, RoverEventsClient, RoverTest) => {
  Rover.HandlerLoaded = false


  let Events = []

  readdirSync("./Handlers/Modules").forEach(CommandDirectory => {
      readdirSync("./Handlers/Modules/" + `${CommandDirectory}/`).forEach(CommandDirectory1 => {
                 const EventsInFolders = readdirSync("./Handlers/Modules/" + `${CommandDirectory}/`+ `${CommandDirectory1}/`).filter(f => f.endsWith(".js"))

                 for (const Event of EventsInFolders) {

                          if (CommandDirectory == "Rover-Bot") {
                            require(`./Modules/${CommandDirectory}/${CommandDirectory1}/${Event}`)(Rover)

                           Events.push(`${`${Event}`.replace(".js", "").replace(' ', "")}/${CommandDirectory1}/${CommandDirectory}`)

                          } else if (CommandDirectory == "Rover-Manager") {
                            require(`./Modules/${CommandDirectory}/${CommandDirectory1}/${Event}`)(RoverManager)

                           Events.push(`${`${Event}`.replace(".js", "").replace(' ', "")}/${CommandDirectory1}/${CommandDirectory}`)
                          } else if (CommandDirectory == "Rover-Events") {
                            require(`./Modules/${CommandDirectory}/${CommandDirectory1}/${Event}`)(RoverEventsClient)

                           Events.push(`${`${Event}`.replace(".js", "").replace(' ', "")}/${CommandDirectory1}/${CommandDirectory}`)
                          } else if (CommandDirectory == "Rover-Testing") {
                            require(`./Modules/${CommandDirectory}/${CommandDirectory1}/${Event}`)(RoverTest)
                           Events.push(`${`${Event}`.replace(".js", "").replace(' ', "")}/${CommandDirectory1}/${CommandDirectory}`)
                          }
                 }
      })
  })

  let categories = []

  readdirSync("./Handlers/Modules").forEach(CommandDirectory => {
    readdirSync("./Handlers/Modules/" + `${CommandDirectory}/`).forEach(CommandDirectory1 => {
          categories.push(`${CommandDirectory}/${CommandDirectory1}`)
    })})
  setTimeout(async () => {


    Rover.logger(green(`=================================================> Loading Modules `))

    let i = 0
    let i2 = 0
    let Type = 0



    if (categories < 1) {
            Rover.logger(red(`No Categorys Could be loaded.`))
            Rover.logger(green(`========================================================== `))
            return Rover.HandlerLoaded = true
    }

    
    Rover.logger(red(`============================= Loading ${categories[i].split("/")[0]}`))



    let LoadedCategory = []

    const data = {}

    
    categories.forEach(m => {
            data[m.split("/")[0]] = {}


            readdirSync("./Handlers/Modules").forEach(CommandDirectory => {
              readdirSync("./Handlers/Modules/" + `${CommandDirectory}/`).forEach(CommandDirectory1 => {
                      if (CommandDirectory == m.split("/")[0]) {
                         data[m.split("/")[0]][m.split("/")[1]] = []
                                     
                    }
              })})
    })


    Events.forEach(m => {
           data[m.split("/")[2]][m.split("/")[1]].push(m.split("/")[0])
    })

    setTimeout(() => {

      let array = []

      readdirSync("./Handlers/Modules/" + categories[i].split("/")[0]).forEach(CommandDirectory => {
              array.push(CommandDirectory)
      })




      Rover.logger(red(`=======================Loading ${array[Type]}`))


      setTimeout(() => {

      
        const LoadCommandsInCategory = setInterval(function() {


          let ready = true
        

          if (LoadedCategory.length == categories.length) {
                clearInterval(LoadCommandsInCategory)
                Rover.logger(green(`========================================================== `))
                return Rover.HandlerLoaded = true
          }

          if (data[categories[i].split("/")[0]][array[Type]].length < 1) {
            Rover.logger(red(`- No Modules in ${array[Type]}`))
            LoadedCategory.push(data[categories[i].split("/")[0]])
            i++ 
            Type++

            i2 = 0
            if (categories[i] == undefined) return;

            if (Type == array.length) {
             array.length = 0
             Type = 0
             
             readdirSync("./Handlers/Modules/" + categories[i].split("/")[0]).forEach(CommandDirectory => {
               array.push(CommandDirectory)
       })

             Rover.logger(red(`============================= Loading ${categories[i].split("/")[0]}`))
      }

            Rover.logger(red(`=======================Loading ${array[Type]}`))
            
            ready += true
          }

          if (i2 == data[categories[i].split("/")[0]][array[Type]].length) {
               LoadedCategory.push(data[categories[i].split("/")[0]])
               i++ 
               Type++

               i2 = 0
               if (categories[i] == undefined) return;

               if (Type == array.length) {
                array.length = 0
                Type = 0
                
                readdirSync("./Handlers/Modules/" + categories[i].split("/")[0]).forEach(CommandDirectory => {
                  array.push(CommandDirectory)
          })

                Rover.logger(red(`============================= Loading ${categories[i].split("/")[0]}`))
         }

               Rover.logger(red(`=======================Loading ${array[Type]}`))
               
               ready += true
          }

          if (ready == true) {
                    Rover.logger(green(`> Successfully Loaded ${data[categories[i].split("/")[0]][array[Type]][i2]} Module!`))
                    i2++
          }
        }, 200)
      }, 100);
    }, 1000);
  }, 100);
}