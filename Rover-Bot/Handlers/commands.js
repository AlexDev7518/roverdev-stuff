const { red, blue, green } = require("colors");
const { readdirSync } = require("fs");


module.exports = async Rover => {

  Rover.Loaded = false


    let categories = require("fs").readdirSync(`./Commands`);
     Rover.PrefixCommands = []

    readdirSync("./Commands").forEach(CommandDirectory => {
      const CommandsPrefix = readdirSync("./Commands/" + CommandDirectory + "/").filter(f => f.endsWith(".js"))

 
      for (const commandfile of CommandsPrefix) {

        let PrefixFile = require("../Commands" + "/" +  CommandDirectory + `/${commandfile}`)

            PrefixFile.name = `${commandfile}`.replace(".js", "").replace(' ', "")
            PrefixFile.category = CommandDirectory

            Rover.PrefixCommands.push(`${PrefixFile.name}/${PrefixFile.category}`)

            Rover.container.commands.set(`${commandfile}`.replace(".js", ""), PrefixFile)
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
        Rover.PrefixCommands.forEach(m => {

          data[`${m}`.split("/")[1]].push(m)
          })
  
  
        setTimeout(() => {
  
          const LoadCommandsInCategory = setInterval(function() {
  
            const cat = categories[i]
  
            let ready = true
  
          
  
            if (LoadedCategory.length == categories.length) {
                  clearInterval(LoadCommandsInCategory)
                  return Rover.Loaded += true
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
                      Rover.logger(green(`> - Successfully Loaded ${data[cat][i2].split("/")[0]} command!`))
                      i2++
            }
          }, 100)
        }, 100);
      }, 100);
    }, 100);
}