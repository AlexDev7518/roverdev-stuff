const { Colors, Events } = require("discord.js");
const { readdirSync } = require("fs");
const { Mongoose } = require("../Configuration/BotConfig");
const { Roverdev } = require("../main");

module.exports = async client => {

     try {
          const stringlength = 69;
          client.logger.info(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen, { label: "Roverdev" })
          client.logger.info(`┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen, { label: "Roverdev" })
          client.logger.info(`┃ `.bold.brightGreen + `Welcome to Roverdev Handler!`.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `Welcome to Roverdev Handler!`.length) + "┃".bold.brightGreen, { label: "Roverdev" })
          client.logger.info(`┃ `.bold.brightGreen + `  /-/ By https://roverdev.xyz /-/`.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `  /-/ By https://roverdev.xyz /-/`.length) + "┃".bold.brightGreen, { label: "Roverdev" })
          client.logger.info(`┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen, { label: "Roverdev" })
          client.logger.info(`┃ `.bold.brightGreen + `  /-/ Discord: discord.gg/roverdev /-/`.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `  /-/ By Discord: discord.gg/roverdev /-/`.length) + "   ┃".bold.brightGreen, { label: "Roverdev" })
          client.logger.info(`┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen, { label: "Roverdev" })
          client.logger.info(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen, { label: "Roverdev" })
        } catch {
          /* */ }


          const Enmap = require("enmap");

          let dbarray = [
               "AutomodSystem",
               "AntiNuke",
               "invitesSystem",
               "PremiumSystem",
               "RackSystem",
               "RankingSystem",
               "RoverCoins",
               "ShopSystem",
               "StaffSystem",
               "TicketSystem",
               "UserSettings"
            ]
        
            let i = 0


            setTimeout(() => {
               client.logger.info(`============================= Loading Databases`, { label: "Handlers" })
            }, 100);
     
                  const loadb = setInterval(function() {
        
                    if (i == dbarray.length) {
                           clearInterval(loadb)
                           const mongoose = require("mongoose")

                           mongoose.set('strictQuery', true)
                           
                           mongoose.connect(Mongoose, {
                                useNewUrlParser: true,
                                useUnifiedTopology: true,
                           }).then(connection => {
                                client.logger.info(require("colors").green(`Mongo is Connected and Good to go!`), { label: "Mongo-Online" })
                                
                                setTimeout(() => {
                                     
                                     client.arrayOfSlashCommands = [];
                                     client.TotalCommands = [];
                                     client.TotalPrefixCommands = [];
                                     client.Loading = false
                      
                                     let array = []
                                     let array2 = []
                                     let loading = false
                                
                                     let dateNow = Date.now();
                                
                                     client.logger.info(`============================= Loading Prefix Commands`, { label: "Handlers" })
                      
                                     readdirSync("./Commands/" + "Prefix" + "/").forEach(CommandDirectory => {
                                          const CommandsPrefix = readdirSync("./Commands/" + "Prefix" + "/" + CommandDirectory + "/").filter(f => f.endsWith(".js"))
                      
                                     
                                          for (const commandfile of CommandsPrefix) {
                                
                                               let PrefixFile = require("../Commands/" +  "Prefix" + "/" +  CommandDirectory + `/${commandfile}`)
                      
                                               if (!PrefixFile?.PrefixConfiguration) return console.log(commandfile)
                                               
                              
                                               PrefixFile.PrefixConfiguration.name = `${commandfile}`.replace(".js", "")
                                               PrefixFile.PrefixConfiguration.category = CommandDirectory
                                               PrefixFile.PrefixConfiguration.type = `Prefix`
                           
                                               if (CommandDirectory == "Developers" || CommandDirectory == "Setup" || CommandDirectory == "Embeds") {
                                                        PrefixFile.Settings.DeveloperOnly = true
                                               }
                 
                                               if (Roverdev.Disabledcategorys.includes(CommandDirectory)) PrefixFile.Settings.DisabledCategory = true
                      
                                               if (CommandDirectory == "ticket") {
                                                       PrefixFile.Settings.StaffOnly = true
                                               }
                              
                                               if (PrefixFile?.PrefixConfiguration) {
                                                  client.container.commands.set(`${commandfile}`.replace(".js", ""), PrefixFile)
                                                  client.TotalCommands.push(`${commandfile}`.replace(".js", ""))
                                                  client.TotalPrefixCommands.push(`${commandfile}`.replace(".js", ""))
                                               }
                      
                                               array.push(`${commandfile}`.replace(".js", "") + "/" + CommandDirectory)
                                               
                                           }
                      
                                           
                                        })
                      
                                        readdirSync("./Commands/" + "Slash" + "/").forEach(CommandDirectory => {
                                          const CommandsSlash = readdirSync("./Commands/" + "Slash" + "/" + CommandDirectory + "/").filter(f => f.endsWith(".js"))
                                     
                                          for (const SlashCommandFile of CommandsSlash) {
                                            let SlashFile = require("../Commands/" +  "Slash" + "/" +  CommandDirectory + `/${SlashCommandFile}`)
                                          
                                            SlashFile.SlashConfiguration.name = `${CommandsSlash}`.replace(".js", "")
                                            SlashFile.SlashConfiguration.category = CommandDirectory
                                            SlashFile.SlashConfiguration.type = `Slash`
                                          
                                            if (SlashFile?.SlashConfiguration) {
                                          
                                               client.container.slash.set(SlashFile.SlashConfiguration.name, SlashFile)
                                               client.TotalCommands.push(`${SlashCommandFile}`.replace(".js", ""))
                                               client.TotalPrefixCommands.push(`${SlashCommandFile}`.replace(".js", ""))
                                            }
                                            array2.push(`${SlashCommandFile}`.replace(".js", "") + "/" + CommandDirectory)
                                          }
                                     })
                      
                                        
                                        let i = 0
                                        let i2 = 0
                      
                                        const loadcommands = setInterval(function () {
                                            if (i == array.length) {
                                                  clearInterval(loadcommands)
                      
                                                  setTimeout(() => {
                                                    loading += true
                                                    client.Loading += true
                                                  }, 4000);
                      
                                                  const eventscommands = setInterval(function () {
                                                    if (loading == false) {
                                                          return;
                                                    } else if (loading == true) {
                                                     clearInterval(eventscommands)
                      
                                                     client.logger.info(`============================= Loading Slash Commands`, { label: "Handlers" })
                      
                                                     const loadcommands2 = setInterval(function () {
                                                         if (i2 == array2.length) {
                                                              clearInterval(loadcommands2)
                      
                                                  client.logger.info(`Successfully Loaded ${client.TotalCommands.length} Prefix / Slash Commands`, { label: "Handler-Commands"})
                                                  client.logger.info(`======================================`, { label: "Handlers" })
                                             
                                                   client.events = []
                                                  
                                                  readdirSync("./Events/").forEach(folder => {
                                                        const eventFiles = readdirSync("./Events/" + folder + "/").filter(f => f.endsWith(".js")) 
                                             
                                                        client.logger.info(require("colors").yellow(`Now Loading ${folder} Directory`), { label: "Directorys-Events" })
                                             
                                                        if (eventFiles.length < 1) {
                                                              return client.logger.info(require("colors").red(`- There is no Events in ${folder}`), { label: "Event System" })
                                                        }
                                             
                                                        for (const file of eventFiles) {
                                                              const event = require(`${process.cwd()}/Events/${folder}/${file}`)
                                                              let eventName = file.split(".")[0]
                                                              client.events.push(eventName)
                              
                                                                 client.on(eventName, event.bind(null, Roverdev))
                                             
                                                              client.logger.info(require("colors").green(`- Event Successfully Loaded ${eventName}`), { label: "Events" })
                                                        }
                                                  })
                                                  setTimeout(() => {
                                                       try {
                                                            const stringlength2 = 69;
                                                            client.logger.info(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.yellow, { label: "Roverdev" })
                                                            client.logger.info(`┃ `.bold.yellow + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.yellow, { label: "Roverdev" })
                                                            client.logger.info(`┃ `.bold.yellow + `Logging into the BOT...`.bold.yellow + " ".repeat(-1 + stringlength2 - ` ┃ `.length - `Logging into the BOT...`.length) + "┃".bold.yellow, { label: "Roverdev" })
                                                            client.logger.info(`┃ `.bold.yellow + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃".bold.yellow, { label: "Roverdev" })
                                                            client.logger.info(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.yellow, { label: "Roverdev" })
                                                          } catch {
                                                            /* */ }
                                                  }, 1000);
                                                         } else if (i2 !== array2.length) {
                                                              const commandName = `${array2[i2]}`.split("/")[0]
                                                              const commandCategory = `${array2[i2]}`.split("/")[1]
                      
                                     
                                                              client.logger.info(require("colors").green(`+ Successfully Loaded ${commandName} From ${commandCategory}`), { label: "Slash-Commands" })
                                     
                                                              i2++
                                                         }
                                                     }, 1000)
                                                    }
                                                }, 100)
                                            } else if (i !== array.length) {
                      
                                               const commandName = `${array[i]}`.split("/")[0]
                                               const commandCategory = `${array[i]}`.split("/")[1]
                 
                                               if (Roverdev.Disabledcategorys.includes(commandCategory)) {
                                                     client.logger.info(require("colors").yellow(`+ Successfully Loaded ${commandName} From ${commandCategory} (Maintenance Category)`), { label: "Prefix-Commands" })
                                                     return i++
                                               }
                      
                                               client.logger.info(require("colors").green(`+ Successfully Loaded ${commandName} From ${commandCategory}`), { label: "Prefix-Commands" })
                      
                                               i++
                                            }
                                        }, 90)
                                }, 1500);
                           }).catch(error => {
                                return client.logger.info(require("colors").red(`Seems Mongo is offline so No Load Anything!`), { label: "Mongo-Offline" })
                           })
                    }   
                    
                    if (i !== dbarray.length) {

                         if (dbarray[i] == undefined) {
                                 i++
                                 return client.logger.info(require("colors").red(`- Could not Load ${dbarray[i]} Database!`), { label: "Database-Loader" })
                         } 

                         const db = new Enmap({ 
                              name: dbarray[i],
                              dataDir: "/home/Roverdev-Manager/Databases/Storage/" + dbarray[i],
                              fetchAll: false,
                              autoFetch: true,
                            });
                      
                            const data = db

                            const name = dbarray[i]
                
                            if (data !== null && dbarray[i] !== undefined) {
                              setTimeout(() => {
                                   Roverdev[name] = db
                                  }, 100);
                                    i++
                                    client.logger.info(`${dbarray[i] !== undefined ? `${require("colors").green(`+ Successfully Loaded ${dbarray[i]} database`)}` : `${require('colors').red(`- Could not Load ${dbarray[i]} Database!`)}`}`, { label: "Database-Loader" })
                            }
                    }
                  }, 200)
}
