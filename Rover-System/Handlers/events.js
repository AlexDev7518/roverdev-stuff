const { readdirSync } = require("fs");
const { red, blue, green, yellow } = require("colors");

module.exports = async (Rover, RoverManager, RoverEventsClient, RoverTest) => {
  Rover.HandlerLoaded = false


  let Events = []

  readdirSync("./Events").forEach(CommandDirectory => {
      readdirSync("./Events/" + `${CommandDirectory}/`).forEach(CommandDirectory1 => {
                 const EventsInFolders = readdirSync("./Events/" + `${CommandDirectory}/`+ `${CommandDirectory1}/`).filter(f => f.endsWith(".js"))

                 for (const Event of EventsInFolders) {

                  const event = require(`../Events/${CommandDirectory}/${CommandDirectory1}/${Event}`)
                  let eventName = Event.split(".")[0]

                          if (CommandDirectory == "Rover-Bot") {
                            setTimeout(() => {
                              Rover.on(eventName, event.bind(null, Rover))
                           }, 500);

                           Events.push(`${`${eventName}`.replace(".js", "").replace(' ', "")}/${CommandDirectory1}/${CommandDirectory}`)

                          } else if (CommandDirectory == "Rover-Manager") {
                            setTimeout(() => {
                              RoverManager.on(eventName, event.bind(null, RoverManager))
                           }, 500);

                           Events.push(`${`${eventName}`.replace(".js", "").replace(' ', "")}/${CommandDirectory1}/${CommandDirectory}`)
                          } else if (CommandDirectory == "Rover-Events") {
                            setTimeout(() => {
                              RoverEventsClient.on(eventName, event.bind(null, RoverEventsClient))
                           }, 500);

                           Events.push(`${`${eventName}`.replace(".js", "").replace(' ', "")}/${CommandDirectory1}/${CommandDirectory}`)
                          } else if (CommandDirectory == "Rover-Testing") {
                            setTimeout(() => {
                              RoverTest.on(eventName, event.bind(null, RoverTest))
                           }, 500);

                           Events.push(`${`${eventName}`.replace(".js", "").replace(' ', "")}/${CommandDirectory1}/${CommandDirectory}`)
                          }
                 }
      })
  })

  let categories = []

  readdirSync("./Events").forEach(CommandDirectory => {
    readdirSync("./Events/" + `${CommandDirectory}/`).forEach(CommandDirectory1 => {
          categories.push(`${CommandDirectory}/${CommandDirectory1}`)
    })})
  setTimeout(async () => {


    Rover.logger(green(`=================================================> Loading Events `))
    let i = 0
    let i2 = 0
    let Type = 0





    
    Rover.logger(red(`============================= Loading ${categories[i].split("/")[0]}`))



    let LoadedCategory = []

    const data = {}

    
    categories.forEach(m => {
            data[m.split("/")[0]] = {}
            data[m.split("/")[0]]["Core"] = []
            data[m.split("/")[0]]["guild"] = []
    })


    Events.forEach(m => {
           data[m.split("/")[2]][m.split("/")[1]].push(m.split("/")[0])
    })

    setTimeout(() => {

      let array = ["Core", 'guild']




      Rover.logger(red(`=======================Loading ${array[Type]}`))


      setTimeout(() => {

      
        const LoadCommandsInCategory = setInterval(function() {


          let ready = true
        

          if (LoadedCategory.length == categories.length) {
                clearInterval(LoadCommandsInCategory)
                return Rover.HandlerLoaded = true
          }

          if (i2 == data[categories[i].split("/")[0]][array[Type]].length) {
               LoadedCategory.push(data[categories[i].split("/")[0]])
               i++ 
               Type++
               i2 = 0
               if (categories[i] == undefined) return;

               if (Type == array.length) {
                Type = 0
                Rover.logger(red(`============================= Loading ${categories[i].split("/")[0]}`))
         }

               Rover.logger(red(`=======================Loading ${array[Type]}`))
               
               ready += true
          }

          if (ready == true) {
                    Rover.logger(green(`> Successfully Loaded ${data[categories[i].split("/")[0]][array[Type]][i2]} event!`))
                    i2++
          }
        }, 200)
      }, 100);
    }, 1000);
  }, 100);
}