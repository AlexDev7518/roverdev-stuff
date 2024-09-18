const Premium = require("../../../Databases/Schema/Premium")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
           let user = message.guild.members.cache.get(args[0])  || message.mentions.members.first()

           if (!user) return message.reply({ content: `Please mention the user / send the id` })

           let UserPremium = await Premium.findOne({ Author: user.id })

           if (UserPremium?.PremiumStatus == false) return message.reply({ content: `The premium is already disabled!` })

           if (!UserPremium) return message.reply({ content: `This user never had premium...` })

           if (UserPremium) await Premium.findOneAndDelete({ Author: user.id }), message.reply({ content: `Succesfully Removed premium from this user!` })
   }
}