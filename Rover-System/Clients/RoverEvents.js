const { Collection } = require("discord.js")
const moment = require("moment")

const colors = require("colors");
colors.enable()

const { TokenArray } = require("../configuration");

const RoverEventsClient = require("../Core/BuildRover");
const RoverEvents = new RoverEventsClient()


RoverEvents.logger = (data, type) => {
  let logstring = `${`Rover Premium - logger`.red} | ${`${moment().format("ddd DD-MM-YYYY HH:mm:ss.SSSS")}`.magenta}${` [Rover Premium] `.rainbow}`
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
  RoverEvents.logger(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.green)
  RoverEvents.logger(`┃ `.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.green)
  RoverEvents.logger(`┃ `.bold.green + `Welcome to Rover Premium Handler!`.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length - `Welcome to Rover Premium Handler!`.length) + "┃".bold.green)
  RoverEvents.logger(`┃ `.bold.green + `  /-/ By https://discord.gg/roverdev /-/`.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length - `  /-/ By https://discord.gg/roverdev /-/`.length) + "┃".bold.green)
  RoverEvents.logger(`┃ `.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.green)
  RoverEvents.logger(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.green)
} catch (error) { console.log(error) }


RoverEvents.on("RoverdevFinished", () => {
  setTimeout(() => {
    try {
      const stringlength2 = 69;
      RoverEvents.logger(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.green, { label: "Roverdev" })
      RoverEvents.logger(`┃ `.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.green, { label: "Roverdev" })
      RoverEvents.logger(`┃ `.bold.green + `Bot is Online And Ready!`.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length - `Bot is Online And Ready!`.length) + "┃".bold.green, { label: "Roverdev" })
      RoverEvents.logger(`┃ `.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.green, { label: "Roverdev" })
      RoverEvents.logger(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.green, { label: "Roverdev" })
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
    RoverEvents.logger(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.blue)
    RoverEvents.logger(`┃ `.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.blue)
    RoverEvents.logger(`┃ `.bold.blue + `Mongoose Connected and ready to be used!`.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length - `Mongoose Connected and ready to be used!`.length) + "┃".bold.blue)
    RoverEvents.logger(`┃ `.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.blue)
    RoverEvents.logger(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.blue)
  } catch (error) {
    console.log(error)
  }
}).catch(e => {
  console.log(`Could not connect to the mongoose database.`)
})
  }, 1000)
})

const commands = new Collection();
const aliases = new Collection();
const slash = new Collection();
const cooldowns = new Collection();

RoverEvents.container = {
  commands,
  aliases,
  slash,
  cooldowns
}

const Handlers = require("fs").readdirSync("./Handlers/RoverEvents").filter(f => f.endsWith(".js"))


let i = 0

RoverEvents.HandlerLoaded = true

RoverEvents.StartBot = false


const loadHandlers = setInterval(function () {
if (i == Handlers.length) {
setTimeout(() => {
RoverEvents.StartBot = Boolean(true)
}, 1000);
return clearInterval(loadHandlers)
}
if (RoverEvents.HandlerLoaded == true) {
require("../Handlers/RoverEvents/" + Handlers[i])(RoverEvents)

let WaitingForBot = setInterval(function () {


if (RoverEvents.HandlerLoaded == true) {
i++
return clearInterval(WaitingForBot)
}
else if (RoverEvents.HandlerLoaded = false) return;
})
}
})


const StartRover = setInterval(function () {
if (RoverEvents.StartBot == true) {
clearInterval(StartRover)

RoverEvents.emit("RoverdevFinished", RoverEvents)


TokenArray.forEach(m => {
if (m.enabled == true) {
if (m.TokenType == "RoverEventsClient") {
  RoverEvents.login(m.token)
  setTimeout(async () => {
    RoverEvents.logger(colors.green(`Successfully Logged into ${RoverEvents.user.username}`))
  }, 3000);
} 
}
})

} else if (RoverEvents.StartBot == false) { };
}, 1000)
