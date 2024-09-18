const { blue, green  } = require("colors");
const fs = require("fs");
const allevents = [];
const colors = require("colors")
colors.enable()
module.exports = async (client) => {
    try {
      let dateNow = Date.now();
      console.log(`${String("[x] :: ".magenta)}Now loading the Events ...`.brightGreen)
      const load_dir = (dir) => {
        const event_files = fs.readdirSync(`./CE-Events/${dir}`).filter((file) => file.endsWith(".js"));
        for (const file of event_files) {
          try {
            const event = require(`../CE-Events/${dir}/${file}`)
            let eventName = file.split(".")[0];
            if (eventName == "message") continue;
            allevents.push(eventName);
            client.on(eventName, event.bind(null, client));
            console.log(green(`[EVENT HANDLER] --------> NOW LOADING ${dir.toUpperCase()} DIRECTORY`))
            console.log(`[EVENT HANDLER] Event: ${file} Loaded`.cyan)
          } catch (e) {
            console.log(String(e.stack).grey.bgRed)
          }
        }
      }
      await ["client", "guild"].forEach(e => load_dir(e));
      console.log(`[x] :: `.magenta + `LOADED THE ${allevents.length} EVENTS after: `.brightGreen + `${Date.now() - dateNow}ms`.green)
      try {
        const stringlength2 = 69;
        console.log("\n")
        console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.yellow)
        console.log(`     ┃ `.bold.yellow + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.yellow)
        console.log(`     ┃ `.bold.yellow + `Logging into the BOT...`.bold.yellow + " ".repeat(-1 + stringlength2 - ` ┃ `.length - `Logging into the BOT...`.length) + "┃".bold.yellow)
        console.log(`     ┃ `.bold.yellow + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.yellow)
        console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.yellow)
      } catch {
        /* */ }
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
    }
    
  };