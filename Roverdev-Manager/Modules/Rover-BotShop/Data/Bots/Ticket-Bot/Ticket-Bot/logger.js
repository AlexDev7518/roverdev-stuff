const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const colors = require("colors")
colors.enable()
module.exports = async client => {
    const myFormat = printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${level}] [${colors.yellow(label)}] ${message}`;
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
    client.logger =  createLogger({
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