const { red, blue, green } = require("colors");
const { readdirSync } = require("fs");

module.exports = async Rover => {
  Rover.Loaded = false


  let categories = require("fs").readdirSync(`./Handlers/Modules`);
  let PrefixCommands = []

  readdirSync("./Handlers/Modules").forEach(CommandDirectory => {
    const CommandsPrefix = readdirSync("./Handlers/Modules/" + CommandDirectory + "/").filter(f => f.endsWith(".js"))


    for (const commandfile of CommandsPrefix) {

      let PrefixFile = require("../Handlers/Modules" + "/" +  CommandDirectory + `/${commandfile}`)

      if (require('fs').lstatSync("Handlers/Modules/" + CommandDirectory + "/" + commandfile).isFile()) {
        const event = require(`${process.cwd()}/Handlers/Modules/${CommandDirectory}/${commandfile}`)
        let eventName = commandfile.split(".")[0]

  
        setTimeout(() => {
          require("./Modules/" + CommandDirectory + "/" + commandfile)(Rover)
       }, 500);
  
            PrefixCommands.push(`${`${commandfile}`.replace(".js", "").replace(' ', "")}/${CommandDirectory}`)
      }

    }
  })


  setTimeout(async () => {


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
                try {
                  const stringlength2 = 69;
                  Rover.logger(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.yellow, { label: "Roverdev" })
                  Rover.logger(`┃ `.bold.yellow + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.yellow, { label: "Roverdev" })
                  Rover.logger(`┃ `.bold.yellow + `Logging into the BOT...`.bold.yellow + " ".repeat(-1 + stringlength2 - ` ┃ `.length - `Logging into the BOT...`.length) + "┃".bold.yellow, { label: "Roverdev" })
                  Rover.logger(`┃ `.bold.yellow + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.yellow, { label: "Roverdev" })
                  Rover.logger(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.yellow, { label: "Roverdev" })
                } catch {
                  /* */ }
                return Rover.StartBot += true
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
                    Rover.logger(green(`> - Successfully Loaded ${data[cat][i2].split("/")[0]} Module!`))
                    i2++
          }
        }, 100)
      }, 100);
    }, 100);
  }, 100);
}