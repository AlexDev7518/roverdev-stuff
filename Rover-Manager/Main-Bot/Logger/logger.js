const moment = require("moment")
const { createLogger, format, transports } = require('winston');
const colors = require("colors");
const { WebhookClient } = require("discord.js");
colors.enable()


module.exports = async client => {
    client.logger = (data, data2) => {
        let logstring = `${`${moment().format("ddd MM-DD-YYYY H:M:S")}`.cyan}${` [Roverdev Handler]`.green}${` ${data2 ? `[${data2}]` : ""}`.magenta}`
        if(typeof data == "string"){
          console.log(logstring, data.split("\n").map(d => `${d}`.cyan).join(`\n${logstring} `))
        } else if(typeof data == "object"){
          console.log(logstring, JSON.stringify(data, null, 3).green)
        } else if(typeof data == "boolean"){
          console.log(logstring, String(data).white)
        } else {
          console.log(logstring, data)
        } 
      }
      // if (client.config[`Logger`]) {
      //   const webhookClient = new WebhookClient({ url: `https://discord.com/api/webhooks/1012778185567522846/rFFdu9AmfUmbUBrcWQbLJeGVLZ0QePSc1MOJ71z0cdlZQ1AGBbLUA79CsZg8HblBqs0H` });
      //   const myFormat = printf(({ level, message, label, timestamp }) => {
      //     webhookClient.send(`${timestamp} [${label}] ${message}`)
      //     return `${timestamp} [${level}] [${colors.cyan(label)}] ${message}`;
      //   });
      //   const myCustomLevels = {
      //     levels: { 
      //       error: 0, 
      //       warn: 1, 
      //       info: 2, 
      //       http: 3,
      //       verbose: 4, 
      //       debug: 5, 
      //       silly: 6 
      //     }
      //   };
      //   client.log =  createLogger({
      //     levels: myCustomLevels.levels,
      //     format: combine(
      //       format.colorize(),
      //       format.timestamp({ format: 'ddd DD-MM-YYYY HH:mm:ss.SSSS' }),
      //       myFormat
      //     ),
      //     transports: [
      //       new transports.Console(),
      //       new transports.File({ filename: './Main-Bot/Logger/log/Logger.txt' }),
      //     ],
      //   });
      // }
}