const { Collection, ChannelType, PermissionFlagsBits } = require("discord.js")
const moment = require("moment")

const colors = require("colors");
colors.enable()

const { TokenArray } = require("../configuration");

const RoverManagerBot = require("../Core/BuildRover");
const RoverManager = new RoverManagerBot()


RoverManager.logger = (data, type) => {
  let logstring = `${`Rover Manager - logger`.red} | ${`${moment().format("ddd MM-DD-YYYY HH:mm:ss")}`.magenta}${` [Rover Manager] `.rainbow}`
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
  RoverManager.logger(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.green)
  RoverManager.logger(`┃ `.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.green)
  RoverManager.logger(`┃ `.bold.green + `Welcome to Rover Manager Handler!`.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length - `Welcome to Rover Manager Handler!`.length) + "┃".bold.green)
  RoverManager.logger(`┃ `.bold.green + `  /-/ By https://discord.gg/roverdev /-/`.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length - `  /-/ By https://discord.gg/roverdev /-/`.length) + "┃".bold.green)
  RoverManager.logger(`┃ `.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.green)
  RoverManager.logger(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.green)
} catch (error) { console.log(error) }


RoverManager.on("RoverdevFinished", () => {
  setTimeout(() => {
    try {
      const stringlength2 = 69;
      RoverManager.logger(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.green, { label: "Roverdev" })
      RoverManager.logger(`┃ `.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.green, { label: "Roverdev" })
      RoverManager.logger(`┃ `.bold.green + `Bot is Online And Ready!`.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length - `Bot is Online And Ready!`.length) + "┃".bold.green, { label: "Roverdev" })
      RoverManager.logger(`┃ `.bold.green + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.green, { label: "Roverdev" })
      RoverManager.logger(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.green, { label: "Roverdev" })
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
    RoverManager.logger(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.blue)
    RoverManager.logger(`┃ `.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.blue)
    RoverManager.logger(`┃ `.bold.blue + `Mongoose Connected and ready to be used!`.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length - `Mongoose Connected and ready to be used!`.length) + "┃".bold.blue)
    RoverManager.logger(`┃ `.bold.blue + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.blue)
    RoverManager.logger(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.blue)
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

RoverManager.container = {
  commands,
  aliases,
  slash,
  cooldowns
}

const Handlers = require("fs").readdirSync("./Handlers/RoverManager").filter(f => f.endsWith(".js"))



let i = 0

RoverManager.HandlerLoaded = true

RoverManager.StartBot = false


RoverManager.on("guildMemberAdd", async member => {
      console.log(member.displayAvatarURL({ format: "png" }))
})

const loadHandlers = setInterval(function () {
if (i == Handlers.length) {
setTimeout(() => {
RoverManager.StartBot = Boolean(true)
}, 1000);
return clearInterval(loadHandlers)
}
if (RoverManager.HandlerLoaded == true) {
require("../Handlers/RoverManager/" + Handlers[i])(RoverManager)

let WaitingForBot = setInterval(function () {


if (RoverManager.HandlerLoaded == true) {
i++
return clearInterval(WaitingForBot)
}
else if (RoverManager.HandlerLoaded = false) return;
})
}
})

const StartRover = setInterval(function () {
if (RoverManager.StartBot == true) {
clearInterval(StartRover)

RoverManager.emit("RoverdevFinished", RoverManager)


TokenArray.forEach(m => {
if (m.enabled == true) {
if (m.TokenType == "RoverManagerClient") {
  RoverManager.login(m.token)
  setTimeout(async () => {
    RoverManager.logger(colors.green(`Successfully Logged into ${RoverManager.user.username}`))
  }, 3000);
} 
}
})

} else if (RoverManager.StartBot == false) { };
}, 1000)

module.exports = StartRover