const { EmbedBuilder } = require("discord.js");
const LockCreation = require("../../../Databases/Schema/Shop/LockCreation")
const ShopCreation = require("../../../Databases/Schema/Shop/ShopCreation")

module.exports = async Roverdev => {
  Roverdev.logger.info(require("colors").yellow(`Now Checking Roverdev Bot Shop - Event: CloseCreation [Every 2min!]`), { label: "Shop-System" })
  setInterval(async () => {
       Roverdev.logger.info(require("colors").yellow(`Now Checking Roverdev Bot Shop - Event: CloseCreation [Every 2min!]`), { label: "Shop-System" })
      const data = await LockCreation.find()
      data.forEach(async Creation => {
               if(Creation.LockCreationTime < Date.now()){
                      try {
                            let ShopData = await ShopCreation.findOne({ Channel: Creation.Channel })

                            const owner = Roverdev.users.cache.get(ShopData.BotOwner)
           
                            const channel = Roverdev.channels.cache.get(ShopData.Channel)
           
                            owner.send({
                                   embeds: [
                                          new EmbedBuilder()
                                                 .setTitle(`Succesfully Closed {channel} - Auto Closed`.replace("{channel}", channel.name))
                                                 .setColor("#3dbeff")
                                   ]
                            })
           
                            channel.setParent("1040996273546866708", { LockPermission: true })
           
                            channel.setName(`🔏╎${owner.username}`)
           
                            setTimeout(() => {
                                   if (channel.parentId !== "1040996273546866708") {
                                          interaction.channel.delete()
                                   }
                            }, 5000);
           
                            await ShopCreation.findOneAndDelete({ Channel: channel.id })
                            await LockCreation.findOneAndDelete({ Channel: channel.id })
           
                            channel.send({
                                   embeds: [
                                          new EmbedBuilder()
                                                 .setTitle("Succesfully Closed {channel}".replace("{channel}", channel.name))
                                                 .setColor("#3dbeff")
                                   ]
                            })
                      } catch (error) {}
               }
      })
    }, 120000);
}