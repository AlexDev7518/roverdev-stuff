const ShopCoolDowns = require("../../../Databases/Schema/Shop/ShopCoolDowns")

module.exports = async Roverdev => {
      Roverdev.logger.info(require("colors").yellow(`Now Checking Roverdev Bot Shop - Event: Cooldown-System [Every 2min!]`), { label: "Shop-System" })
      setInterval(async () => {
        Roverdev.logger.info(require("colors").yellow(`Now Checking Roverdev Bot Shop - Event: Cooldown-System [Every 2min!]`), { label: "Shop-System" })
         const data = await ShopCoolDowns.find()
         data.forEach(async m => {
                 if(m.BotShopCoolDown < Date.now()){
                       await ShopCoolDowns.findOneAndDelete({ Bot: m.Bot })
                 }
         })
        }, 120000)
}