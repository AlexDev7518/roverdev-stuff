const RcCooldowns = require("../../Databases/Schema/RoverCoins/RcCooldowns");
const SystemRemind = require("../../Databases/Schema/RoverCoins/SystemRemind");

module.exports = async Roverdev => {
      Roverdev.logger.info(require("colors").yellow(`Now Checking Rovercoins - Event System [Every 5min!]`), { label: "RoverCoins-System" })
      setInterval(async () => {
           Roverdev.logger.info(require("colors").yellow(`Now Checking Rovercoins - Event System [Every 5min!]`), { label: "RoverCoins-System" })

           // First - Check the Cooldowns

            const data = await RcCooldowns.find()
            data.forEach(async data2 => {
                    if (data2.HourlyTime !== null && data2.HourlyTime < Date.now()) {
                           const user = Roverdev.users.cache.get(data2.Author)

                           await RcCooldowns.findOneAndUpdate({ Author: data2.Author }, { $set: { HourlyClaimed: false, HourlyTime: null } })

                           console.log(`Remvoed ${data2.Author} Hourly Time From them, they can now claim again!`)

                           const remindEnabled = await SystemRemind.findOne({ Author: data2.Author })

                           if (!remindEnabled) {
                              return console.log(`They can't get a dm cause there is no data of it!`)
                        }

                           if (remindEnabled.Remind == true) {
                                     user.send({ content: `You May claim your hourly points again! Head over to <#1040954527270043718> and run \`rd!hourly\`` })
                           }
                    }
                    if (data2.DailyTime !== null && data2.DailyTime < Date.now()) {
                        const user = Roverdev.users.cache.get(data2.Author)

                        await RcCooldowns.findOneAndUpdate({ Author: data2.Author }, { $set: { DailyClaimed: false, DailyTime: null } })

                        console.log(`Remvoed ${data2.Author} Daily Time From them, they can now claim again!`)

                        const remindEnabled = await SystemRemind.findOne({ Author: data2.Author })

                        if (!remindEnabled) {
                                 return console.log(`They can't get a dm cause there is no data of it!`)
                        }

                        if (remindEnabled.Remind == true) {
                                  user.send({ content: `You May claim your daily points again! Head over to <#1040954527270043718> and run \`rd!daily\`` })
                        }
                 }
            })
      }, 300000);
}