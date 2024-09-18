const { Collection, Events } = require("discord.js")
const moment = require("moment")

const colors = require("colors");
colors.enable()


const { TokenArray } = require("../configuration");

const RoverBot = require("../Core/BuildRover");
const Rover = new RoverBot()

Rover.logger = (data, type) => {
  let logstring = `${`Rover Bot - logger`.red} | ${`${moment().format("ddd DD-MM-YYYY HH:mm:ss.SSSS")}`.magenta}${` [Rover] `.rainbow}`
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
  Rover.logger(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.green)
  Rover.logger(`┃ `.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.green)
  Rover.logger(`┃ `.bold.green + `Welcome to Rover Bot Handler!`.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length - `Welcome to Rover Bot Handler!`.length) + "┃".bold.green)
  Rover.logger(`┃ `.bold.green + `  /-/ By https://discord.gg/roverdev /-/`.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length - `  /-/ By https://discord.gg/roverdev /-/`.length) + "┃".bold.green)
  Rover.logger(`┃ `.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.green)
  Rover.logger(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.green)
} catch (error) { console.log(error) }


Rover.on("RoverdevFinished", () => {
  setTimeout(() => {
    try {
      const stringlength2 = 69;
      Rover.logger(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.green, { label: "Roverdev" })
      Rover.logger(`┃ `.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.green, { label: "Roverdev" })
      Rover.logger(`┃ `.bold.green + `Bot is Online And Ready!`.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length - `Bot is Online And Ready!`.length) + "┃".bold.green, { label: "Roverdev" })
      Rover.logger(`┃ `.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.green, { label: "Roverdev" })
      Rover.logger(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.green, { label: "Roverdev" })
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
    Rover.logger(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.blue)
    Rover.logger(`┃ `.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.blue)
    Rover.logger(`┃ `.bold.blue + `Mongoose Connected and ready to be used!`.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length - `Mongoose Connected and ready to be used!`.length) + "┃".bold.blue)
    Rover.logger(`┃ `.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.blue)
    Rover.logger(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.blue)
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


Rover.container = {
  commands,
  aliases,
  slash,
  cooldowns
}

const Handlers = require("fs").readdirSync("./Handlers/Rover").filter(f => f.endsWith(".js"))


let i = 0

Rover.HandlerLoaded = true

Rover.StartBot = false


const loadHandlers = setInterval(function () {
if (i == Handlers.length) {
setTimeout(() => {
Rover.StartBot = Boolean(true)
}, 1000);
return clearInterval(loadHandlers)
}
if (Rover.HandlerLoaded == true) {
require("../Handlers/Rover/" + Handlers[i])(Rover)

let WaitingForBot = setInterval(function () {


if (Rover.HandlerLoaded == true) {
i++
return clearInterval(WaitingForBot)
}
else if (Rover.HandlerLoaded = false) return;
})
}
})


const StartRover = setInterval(function () {
if (Rover.StartBot == true) {
clearInterval(StartRover)

Rover.emit("RoverdevFinished", Rover)


TokenArray.forEach(m => {
if (m.enabled == true) {
if (m.TokenType == "Rover") {
  Rover.login(m.token)
  setTimeout(async () => {
    Rover.logger(colors.green(`Successfully Logged into ${Rover.user.username}`))
  }, 1000);
} 
}
})

} else if (Rover.StartBot == false) { };
}, 1000)

module.exports = StartRover



process.on('unhandledRejection', (reason, p) => {
  console.log('\n\n\n\n\n=== unhandled Rejection ==='.toUpperCase().yellow.dim);
  console.log('Reason: ', reason.stack ? String(reason.stack).gray : String(reason).gray);
  console.log('=== unhandled Rejection ===\n\n\n\n\n'.toUpperCase().yellow.dim);
});
process.on("uncaughtException", (err, origin) => {
  console.log('\n\n\n\n\n\n=== uncaught Exception ==='.toUpperCase().yellow.dim);
  console.log('Exception: ', err.stack ? err.stack : err)
  console.log('=== uncaught Exception ===\n\n\n\n\n'.toUpperCase().yellow.dim);
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log('=== uncaught Exception Monitor ==='.toUpperCase().yellow.dim);
});