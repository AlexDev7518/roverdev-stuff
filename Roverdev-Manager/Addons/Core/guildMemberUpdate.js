const Premium = require("../../Databases/Schema/Premium");
const TotalCoins = require("../../Databases/Schema/RoverCoins/TotalCoins");

module.exports = async (Roverdev, oldMember, newMember) => {
  const oldStatus = oldMember.premiumSince
  const newStatus = newMember.premiumSince


  if (!oldStatus && newStatus) {

   let UserPremium = await Premium.findOne({ Author: newMember.user.id })

   if (!UserPremium) {
          const data = Premium.create({
                   Author: newMember.user.id,
          })
          ;(await data).save()

          UserPremium =await Premium.findOne({ Author: newMember.user.id })
     }

     let Coinsdata = await TotalCoins.findOne({ Author: newMember.user.id })

     if (!Coinsdata) {
        const data = TotalCoins.create({
             Author: newMember.user.id,
             TotalCoins: 0
        })
        
        ;(await data).save()

        Coinsdata = await TotalCoins.findOne({ Author: newMember.user.id })
     }

     await TotalCoins.findOneAndUpdate({ Author: newMember.user.id }, { $set: { PaiedCoins: Number(Coinsdata.PaiedCoins) + 3100 }})
     await Premium.findOneAndUpdate({ Author: newMember.user.id }, { $set: { PremiumStatus: true, PremiumBooster: true } })

           Roverdev.channels.cache.get("935190175510835290").send({ content: `Thanks For Boosting Roverdev Community ${newMember.user}` })
  }
  
  if (oldStatus && !newStatus) {
         Roverdev.channels.cache.get("1075664877076627456").send({ content: `${oldMember.user} has unboosted Roverdev Community 💔` })

         await Premium.findOneAndUpdate({ Author: oldMember.user.id }, { $set: { PremiumStatus: false, PremiumBooster: false } })

         let Coinsdata = await TotalCoins.findOne({ Author: oldMember.user.id })

         await TotalCoins.findOneAndUpdate({ Author: oldMember.user.id }, { $set: { PaiedCoins: Number(Coinsdata.PaiedCoins)-3100 }})
  }
}