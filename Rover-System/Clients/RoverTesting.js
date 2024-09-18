const { Collection } = require("discord.js")
const moment = require("moment")

const colors = require("colors");
colors.enable()

const { TokenArray } = require("../configuration");

const RoverTestingClient = require("../Core/BuildRover");
const RoverTesting = new RoverTestingClient()

RoverTesting.on("messageCreate", async message => {
         if (message.content.startsWith("Add")) {
                   let thread = message.guild.channels.cache.get("1085500276951240704").threads.cache.find(x => x.name === 'Rover Bot Testing');
                   await thread.members.add("1096496933419368570")
         }
})

RoverTesting.logger = (data, type) => {
  let logstring = `${`Rover Testing - logger`.red} | ${`${moment().format("ddd DD-MM-YYYY HH:mm:ss.SSSS")}`.magenta}${` [Rover Testing] `.rainbow}`
  if (typeof data == "string") {
    console.log(logstring, data.split("\n").map(d => `${d}`.green).join(`\n${logstring} `))
  } else if (typeof data == "object") {
    console.log(logstring, JSON.stringify(data, null, 3).green)
  } else if (typeof data == "boolean") {
    console.log(logstring, String(data).cyan)
  } else {
    console.log(logstring, data)
  }
}

try {
  const stringlength = 69;
  RoverTesting.logger(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.green)
  RoverTesting.logger(`┃ `.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.green)
  RoverTesting.logger(`┃ `.bold.green + `Welcome to Rover Testing Handler!`.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length - `Welcome to Rover Testing Handler!`.length) + "┃".bold.green)
  RoverTesting.logger(`┃ `.bold.green + `  /-/ By https://discord.gg/roverdev /-/`.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length - `  /-/ By https://discord.gg/roverdev /-/`.length) + "┃".bold.green)
  RoverTesting.logger(`┃ `.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.green)
  RoverTesting.logger(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.green)
} catch (error) { console.log(error) }


RoverTesting.on("RoverdevFinished", () => {
  setTimeout(() => {
    try {
      const stringlength2 = 69;
      RoverTesting.logger(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.green, { label: "Roverdev" })
      RoverTesting.logger(`┃ `.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.green, { label: "Roverdev" })
      RoverTesting.logger(`┃ `.bold.green + `Bot is Online And Ready!`.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length - `Bot is Online And Ready!`.length) + "┃".bold.green, { label: "Roverdev" })
      RoverTesting.logger(`┃ `.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.green, { label: "Roverdev" })
      RoverTesting.logger(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.green, { label: "Roverdev" })
    } catch (error) {
      console.log(error)
    }
        const mongoose = require("mongoose")

mongoose.set('strictQuery', true)

mongoose.connect(`mongodb+srv://Rover:26oKi8y9riXzxiwp@cluster0.ltad0.mongodb.net/Rover`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(connection => {
  try {
    const stringlength2 = 69;
    RoverTesting.logger(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.blue)
    RoverTesting.logger(`┃ `.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.blue)
    RoverTesting.logger(`┃ `.bold.blue + `Mongoose Connected and ready to be used!`.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length - `Mongoose Connected and ready to be used!`.length) + "┃".bold.blue)
    RoverTesting.logger(`┃ `.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.blue)
    RoverTesting.logger(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.blue)
  } catch (error) {
    console.log(error)
  }
}).catch(e => {
  console.log(`Could not connect to the mongoose database.`)
})
  }, 3000)
})

const commands = new Collection();
const aliases = new Collection();
const slash = new Collection();
const cooldowns = new Collection();
const CommandCategorys = [],
          EventCategorys = [],
          ModulesCategorys = []

RoverTesting.container = {
  commands,
  aliases,
  slash,
  cooldowns,
  CommandCategorys,
  EventCategorys,
  ModulesCategorys
}

const Handlers = require("fs").readdirSync("./Handlers/RoverTesting").filter(f => f.endsWith(".js"))


let i = 0

RoverTesting.HandlerLoaded = true

RoverTesting.StartBot = false


const loadHandlers = setInterval(function () {
if (i == Handlers.length) {
setTimeout(() => {
RoverTesting.StartBot = Boolean(true)
}, 1000);
return clearInterval(loadHandlers)
}
if (RoverTesting.HandlerLoaded == true) {
require("../Handlers/RoverTesting/" + Handlers[i])(RoverTesting)

let WaitingForBot = setInterval(function () {


if (RoverTesting.HandlerLoaded == true) {
i++
return clearInterval(WaitingForBot)
}
else if (RoverTesting.HandlerLoaded = false) return;
})
}
})


const StartRover = setInterval(function () {
if (RoverTesting.StartBot == true) {
clearInterval(StartRover)

RoverTesting.emit("RoverdevFinished", RoverTesting)


TokenArray.forEach(m => {
if (m.enabled == true) {
if (m.TokenType == "RoverTestClient") {
  RoverTesting.login(m.token)
  setTimeout(async () => {
    RoverTesting.logger(colors.green(`Successfully Logged into ${RoverTesting.user.username}`))
  }, 3000);
} 
}
})

} else if (RoverTesting.StartBot == false) { };
}, 1000)
