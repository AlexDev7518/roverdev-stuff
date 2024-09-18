const LockCreation = require("../../Databases/Schema/Shop/LockCreation")
const ShopCreation = require("../../Databases/Schema/Shop/ShopCreation")
const CreateTicket = require("../../Databases/Schema/TicketSystem/CreateTicket")

module.exports = async (Roverdev, channel) => {
  try {
        await ShopCreation.findOneAndDelete({ Channel: channel.id })
  } catch (error) {
       console.log(`Seems there is nothing for ${channel.name} in ShopCreation`)
  }

  try {
    await LockCreation.findOneAndDelete({ Channel: channel.id })
} catch (error) {
   console.log(`Seems there is nothing for ${channel.name} in LockCreation`)
}

  await CreateTicket.findOneAndDelete({ Channel: channel.id })
}