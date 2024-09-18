const { red, blue, green } = require("colors");
const { readdirSync } = require("fs");

module.exports = async Rover => {
  Rover.Loaded = false


  let categories = require("fs").readdirSync(`./Events`);
  let PrefixCommands = []

  readdirSync("./Events").forEach(CommandDirectory => {
    const CommandsPrefix = readdirSync("./Events/" + CommandDirectory + "/").filter(f => f.endsWith(".js"))


    for (const commandfile of CommandsPrefix) {

      let PrefixFile = require("../Events" + "/" +  CommandDirectory + `/${commandfile}`)

      const event = require(`${process.cwd()}/Events/${CommandDirectory}/${commandfile}`)
      let eventName = commandfile.split(".")[0]

      setTimeout(() => {
         Rover.on(eventName, event.bind(null, Rover))
      }, 500);

          PrefixCommands.push(`${`${commandfile}`.replace(".js", "").replace(' ', "")}/${CommandDirectory}`)
    }
  })


  setTimeout(async () => {
    Rover.logger(green(`========================================================== `))

    let i = 0
    let i2 = 0



    Rover.logger(red(`============================= Loading ${categories[i]}`))

    let LoadedCategory = []

    const data = {}

    categories.forEach(m => data[m] = [])

    setTimeout(() => {
      PrefixCommands.forEach(m => {

        data[`${m}`.split("/")[1]].push(m)
        })


      setTimeout(() => {

        const LoadCommandsInCategory = setInterval(function() {

          const cat = categories[i]

          let ready = true

        

          if (LoadedCategory.length == categories.length) {
                clearInterval(LoadCommandsInCategory)
                Rover.logger(green(`========================================================== `))
                return Rover.Loaded = true
          }

          if (i2 == data[cat].length) {
              LoadedCategory.push(data[cat])
              i++
              i2 = 0
              if (categories[i] == undefined) return;
                Rover.logger(red(`============================= Loading ${categories[i]}`))
                ready += true
          }

          if (ready == true) {
                    Rover.logger(green(`> - Successfully Loaded ${data[cat][i2].split("/")[0]} event!`))
                    i2++
          }
        }, 100)
      }, 100);
    }, 100);
  }, 100);
}