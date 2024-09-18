const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")
const { EmbedColor } = require("../../../Configuration/EmbedConfig")
const Racks = require("../../../Databases/Schema/Racks")
const balance = require("../../../Databases/Schema/RoverCoins/balance")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
           const RackPricesConfig = {
               FreeRack: "Free",
               Rack1: 2000,
               Rack2: 3000,
               Rack3: 4000,
               Rack4: 5000,
               Rack5: 6000,
               PRack1: 4000,
               PRack2: 6000,
               PRack3: 8000,
               BoosterRack: "Free"
           }

           let RackNumberFind = await Racks.findOne({ Author: message.author.id })
           

           if (!RackNumberFind) {
            let data1 = await Racks.create({
              Author: message.author.id,
              TotalRacks: [],
              DeletedRacks: [],
              UsedRacks: [],
          }) 
          data1.save()
          RackNumberFind = await Racks.findOne({ Author: message.author.id })
        }

        if (!args[0]) return message.reply({ content: `Please Provide a Rack!` })

        if (!RackNumberFind.TotalRacks.includes(args[0])) return message.reply({ content: `Please Provide a Rack you own\n***Racks you own:***\n${RackNumberFind.TotalRacks.map((m, index) => {
            return `> \`${index + 1}\` ${m}`
        }).join("\n")}` })

        if (RackNumberFind.TotalRacks.includes(args[0])) {

            const data = await Roverdev[`${args[0]}`.replace("-", "")].findOne({ Author: message.author.id })

            if (data.TotalBots.length > 0) {
                   return message.reply({ content: `Seems you have bots in here so you can't delete this! (Delete or Move the bots to another rack)` })
            }

            if (data.TotalVM.length > 0) {
                return message.reply({ content: `Seems you have VMS in here so you can't delete this! (Delete or Move the bots to another rack)` })
            }

            const embed = new EmbedBuilder()
            .setAuthor({ name: `Roverdev Community | Rack System`, iconURL: "https://cdn.discordapp.com/emojis/1036854876283600957.png" })
            .setColor(EmbedColor)
            .setDescription(`Hello, Are you sure you want to delete ${args[0]}? (:warning: YOU CAN'T GO BACK :warning:)`)
   
            const button1 = new ButtonBuilder()
            .setCustomId("Accept-Delete")
            .setLabel("Yes, Delete")
            .setStyle(ButtonStyle.Success)
   
            const button2 = new ButtonBuilder()
            .setCustomId("Decline-Delete")
            .setLabel("Decline, Delete")
            .setStyle(ButtonStyle.Danger)
   
            const row = new ActionRowBuilder().addComponents(button1,button2)
   
            const msg = await message.reply({ embeds: [embed], components: [row] })
   
            const filter = (interaction) => interaction.user.id === message.author.id;
   
            const collector = msg.createMessageComponentCollector({
              filter,
              time: 50000,
            });
      
            collector.on("collect", async (interaction) => {
                   if (interaction.customId == "Accept-Delete") {
                            button1.setDisabled(true)
                            button2.setDisabled(true)
   
                            interaction.message.edit({ components: [row] })
   
                            const embed = new EmbedBuilder()
                            .setAuthor({ name: `Roverdev Community | Rack System`, iconURL: "https://cdn.discordapp.com/emojis/1036854876283600957.png" })
                            .setColor(EmbedColor)
                            .setDescription(`Succesfully Deleted ${args[0]}!`)

                            await Roverdev[`${args[0]}`.replace("-", "")].findOneAndDelete({ Author: message.author.id })
        
                            let data = await Racks.findOne({ Author: message.author.id })

                            if (data) {
                                  const array = data.TotalRacks
                                  const index = array.indexOf(args[0]);
                                  const x = array.splice(index, 1);


                                  await Racks.findOneAndUpdate({ Author: message.author.id }, { $set: { TotalRacks: index }})

                                  const price = RackPricesConfig[`${args[0]}`.replace("-", "")]

                                  if (price == "Free" ) console.log(`Seems this rack is free!`)

                                  if (price !== "Free") {
                                          const Coins = await balance.findOne({ Author: message.author.id })

                                          if (!Coins) {
                                            const data1 = await balance.create({ 
                                              Author: message.author.id,
                                              BankCoins: AmountOfCoins
                                      })
                                      data1.save()
                                
                                      Coins = await balance.findOne({ Author: message.author.id })
                                           }

                                           const BankCoins = Coins.PocketCoins

                                           await balance.findOneAndUpdate({ Author: message.author.id }, { $set: {
                                            PocketCoins: Number(BankCoins) + Number(price)
                                      } })
                                  }
                            }
                            
                            interaction.reply({ embeds: [embed] })
                   } else if (interaction.customId == "Decline-transfer" ) {
                     button1.setDisabled(true)
                     button2.setDisabled(true)
   
                     interaction.message.edit({ components: [row] })
   
                        return interaction.reply({ content: `Stopped the transfer!` })
                   }
            })

            // await Roverdev[`${args[0]}`.replace("-", "")].findOneAndDelete({ Author: message.author.id })
        
            // let data = await Racks.findOne({ Author: message.author.id })


        }
   }
}