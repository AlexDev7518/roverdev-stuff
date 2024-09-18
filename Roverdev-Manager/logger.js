const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const colors = require("colors");
const { WebhookClient } = require("discord.js");
colors.enable()


module.exports = async client => {
        const myFormat = printf(({ level, message, label }) => {
          // const test = new WebhookClient({ url: "https://discord.com/api/webhooks/1072272738724614205/flA-iG-hBy_ujgzIad5Zs3PC7cJWLpVPcJ4IQwsNEO0Ox1SZvDoIbFb5yacUPlwLc2Dv" })
          // test.send({ content: `[${level}] [${colors.yellow(label)}] ${message}` })
          return `[${level}] [${colors.yellow(label)}] ${message}`;
        });
        const myCustomLevels = {
          levels: { 
            error: 0, 
            warn: 1, 
            info: 2, 
            http: 3,
            verbose: 4, 
            debug: 5, 
            silly: 6 
          }
        };
        client.logger = createLogger({
          levels: myCustomLevels.levels,
          format: combine(
            format.colorize(),
            format.timestamp({ format: 'ddd DD-MM-YYYY HH:mm:ss.SSSS' }),
            myFormat
          ),
          transports: [
            new transports.Console(),
            new transports.File({ filename: './log/Logger.txt' }),
          ],
        });
}