const Premium = require("../../../Databases/Schema/Premium")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
           let user = message.guild.members.cache.get(args[0])  || message.mentions.members.first()

           if (!user) return message.reply({ content: `Please mention the user / send the id` })

           let UserPremium = await Premium.findOne({ Author: user.id })

           if (UserPremium?.PremiumStatus == true) return message.reply({ content: `The user currently have premium!` })

           if (!UserPremium) {
                  const data = Premium.create({
                           Author: user.id,
                  })
                  ;(await data).save()

                  UserPremium =await Premium.findOne({ Author: user.id })
           }

           if (user.roles.cache.has("935136720268197909")) {
               await Premium.findOneAndUpdate({ Author: user.id }, { $set: { PremiumStatus: true, PremiumBooster: true } })
               await user.send({ content: `Hey! You just Got premium from being a booster! Thanks For Boosting Roverdev Community` })
               return message.reply({ content: `Successfully gave the user premium in Roverdev Community` })
           } else if (!user.roles.cache.has("935136720268197909")) return message.reply({ content: `Seems they did not boost the server.` })
   }
}