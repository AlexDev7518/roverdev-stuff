const {
    readdirSync
  } = require("fs");

module.exports = async client => {
    const load_dir = (dir) => {
        const event_files = readdirSync(`./Event/${dir}`).filter((file) => file.endsWith(".js"));
        for (const file of event_files) {
            const event = require(`../Event/${dir}/${file}`)
            let eventName = file.split(".")[0];
            if (eventName == "message") continue;
            client.allevents.push(eventName);
            client.on(eventName, event.bind(null, client));
            client.logger.info(`Succesfully Loaded Event: ${file}`, { label: 'Event-Handler' })
        }
    }
    await ["client", "guild"].forEach(e => load_dir(e))
    client.logger.info(`Successfully Loaded ${client.allevents.length} of Events`, { label: `Event-Handler` })
}