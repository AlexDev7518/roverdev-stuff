const Racks = require("../../../Databases/Schema/Racks")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
            let RackNumberFind = await Racks.findOne({ Author: message.author.id })


           if (!args[0]) return message.reply({ content: `Please provide what rack you want to show! Ex: Free-Rack` })

           if (RackNumberFind.TotalRacks.includes(args[0])) {
               
           } else if (!RackNumberFind.TotalRacks.includes(args[0])) {
                return message.reply({ content: `Seems we can't find ${args[0]} in your racks!` })
           }
   }
}