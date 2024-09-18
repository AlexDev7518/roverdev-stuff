const SystemRemind = require("../../../Databases/Schema/RoverCoins/SystemRemind")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
         if (!args[0]) return message.reply({ content: `Please Tell what you want to do (enable or disable)` })
         if (args[0] == "disable") {
               // disable the system

               let data = await SystemRemind.findOne({ Author: message.author.id })

               if (!data) {
                      const data2 = await SystemRemind.create({
                             Author: message.author.id,
                             Remind: false
                      })
                      data2.save()
                      
                      data = await SystemRemind.findOne({ Author: message.author.id })
               }

               await SystemRemind.findOneAndUpdate({ Author: message.author.id }, { $set: { Remind: false } })

               message.reply({ content: `Successfully Disabled Eco Remind (I will now not remind you when the time goes out when you run hourly, daily)` })
         } else if (args[0] == "enable") {
            let data = await SystemRemind.findOne({ Author: message.author.id })

            if (!data) {
                   const data2 = await SystemRemind.create({
                          Author: message.author.id,
                          Remind: true
                   })
                   data2.save()
                   
                   data = await SystemRemind.findOne({ Author: message.author.id })
            }

            await SystemRemind.findOneAndUpdate({ Author: message.author.id }, { $set: { Remind: true } })

            message.reply({ content: `Successfully Enabled Eco Remind (I will remind you when the time goes out when you run hourly, daily)` })
         } else {
              return message.reply({ content: `Please Tell what you want to do (enable or disable)` })
         }
   }
}