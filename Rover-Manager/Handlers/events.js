const { blue, green  } = require("colors");
const fs = require("fs");
const allevents = [];
const colors = require("colors")
colors.enable()
module.exports = async (client) => {

  client.events = []

  setTimeout(async() => {
    try {
      let dateNow = Date.now();
      client.logger(`${String("[x] :: ".magenta)}Now loading the Events ...`.brightGreen)
      const load_dir = (dir) => {
        client.logger(green(`--------> NOW LOADING ${dir.toUpperCase()} DIRECTORY`), "EVENT HANDLER")
        const event_files = fs.readdirSync(`./Events/${dir}`).filter((file) => file.endsWith(".js"));
        for (const file of event_files) {
          try {
            const event = require(`../Events/${dir}/${file}`)
            let eventName = file.split(".")[0];
            if (eventName == "message") continue;
            allevents.push(eventName);
            client.on(eventName, event.bind(null, client));
            client.logger(`Event: ${file} Loaded`.cyan, "EVENT HANDLER")
            client.events.push(file)
          } catch (e) {
            client.logger(String(e.stack).grey.bgRed)
          }
        }
        client.logger(green(`==================================`), "EVENT HANDLER")
      }
      await ["client", "guild"].forEach(e => load_dir(e));
      client.logger(`[x] :: `.magenta + `LOADED THE ${allevents.length} EVENTS after: `.brightGreen + `${Date.now() - dateNow}ms`.green)
      
    } catch (e) {
      client.logger(String(e.stack).grey.bgRed)
    }
  },50);  

};