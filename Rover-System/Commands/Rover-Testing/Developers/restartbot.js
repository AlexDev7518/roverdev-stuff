const { EmbedBuilder } = require('discord.js')
const configuration = require('../../../configuration')
module.exports = {
  name: "restartbot",
  category: "Developers",
  cooldown: 2,
  Description: "",
  RunCommand: async (Rover, message, args, executor, language, embed, database) => {
    if (message.author.id !== "663442537222242306") return




    Rover.HandlerLoaded = true

    let i = 0

    const Handlers = require("fs").readdirSync("./Handlers/RoverTesting").filter(f => f.endsWith(".js"))

    const embed1 = new EmbedBuilder()
      .setAuthor({ name: `Roverdev - Rebooting Discord Bot`, iconURL: Rover.user.displayAvatarURL() })
      .setColor("Yellow")
      .setDescription(`> <:Reboot:1103571932340813854> Reloading \`${Rover.container.commands.size}\` Commands\n> <:Reboot:1103571932340813854> Reloading \`${Rover.Events.length}\` Events\n> <:Reboot:1103571932340813854> Reloading \`0\` Modules\n> <:Reboot:1103571932340813854> Reloading \`${Handlers.length}\` Handlers`)

    let msg = await message.reply({ embeds: [embed1] })

    require("fs").readdirSync("./Commands").forEach(CommandDirectory => {
      require("fs").readdirSync("./Commands/" + `${CommandDirectory}/`).forEach(CommandDirectory1 => {
        const CommandsInFolders = require("fs").readdirSync("./Commands/" + `${CommandDirectory}/` + `${CommandDirectory1}/`).filter(f => f.endsWith(".js"))

        for (const Command of CommandsInFolders) {
              if (CommandDirectory == "Rover-Testing") {
                        delete require.cache[require.resolve("../../Rover-Testing/" + `${CommandDirectory1}/` + Command)]
              }
        }
      })
    })
  
    
    require("fs").readdirSync("./Events").forEach(CommandDirectory => {
      require("fs").readdirSync("./Events/" + `${CommandDirectory}/`).forEach(CommandDirectory1 => {
        const CommandsInFolders = require("fs").readdirSync("./Events/" + `${CommandDirectory}/` + `${CommandDirectory1}/`).filter(f => f.endsWith(".js"))

        for (const Command of CommandsInFolders) {
              if (CommandDirectory == "Rover-Testing") {
                        delete require.cache[require.resolve("../../../Events/Rover-Testing/" + `${CommandDirectory1}/` + Command)]
              }
        }
      })
    })

    

    await Rover.removeAllListeners()
    await Rover.container.commands.clear();
    await Rover.container.aliases.clear();
    await Rover.container.slash.clear();
    await Rover.container.cooldowns.clear();
     Rover.container.EventCategorys.length = 0
     Rover.container.ModulesCategorys.length = 0

    setTimeout(() => {

      let edited = false


      const loadHandlers = setInterval(function () {
        if (i == Handlers.length) {
          setTimeout(() => {
            console.log(`Restarted Bot Successfully!`)
            embed1.setDescription(`> <:passed:1100278179354136636> Reloaded \`${Rover.container.commands.size}\` Commands\n> <:passed:1100278179354136636> Reloaded \`${Rover.Events.length}\` Events\n> <:passed:1100278179354136636> Reloaded \`0\` Modules\n> <:passed:1100278179354136636>  Reloading \`${Handlers.length}\` Handlers`)
            msg.edit({ embeds: [embed1] })
          }, 1000);
          return clearInterval(loadHandlers)
        }
        if (Rover.HandlerLoaded == true) {

          delete require.cache[require.resolve("../../../Handlers/RoverTesting/" + Handlers[i])]
          require("../../../Handlers/RoverTesting/" + Handlers[i])(Rover)

          msg.edit({ embeds: [embed1] })

          edited = false

          let WaitingForBot = setInterval(function () {
            if (Rover.HandlerLoaded == true) {
              if (Handlers[i] == "commands.js" && edited !== true) {
                embed1.setDescription(`> <:passed:1100278179354136636> Reloaded \`${Rover.container.commands.size}\` Commands\n> <:Reboot:1103571932340813854> Reloading \`${Rover.Events.length}\` Events\n> <:Reboot:1103571932340813854> Reloading \`0\` Modules\n> <:Reboot:1103571932340813854> Reloading \`${Handlers.length}\` Handlers`)
                edited = true
                i++
               return clearInterval(WaitingForBot)
              } else if (Handlers[i] == "events.js" && edited !== true) {
                embed1.setDescription(`> <:passed:1100278179354136636> Reloaded \`${Rover.container.commands.size}\` Commands\n> <:passed:1100278179354136636> Reloaded \`${Rover.Events.length}\` Events\n> <:Reboot:1103571932340813854> Reloading \`0\` Modules\n> <:Reboot:1103571932340813854> Reloading \`${Handlers.length}\` Handlers`)
                edited = true
                i++
                return clearInterval(WaitingForBot)
              } else if (Handlers[i] == "modules.js" && edited !== true) {
                embed1.setDescription(`> <:passed:1100278179354136636> Reloaded \`${Rover.container.commands.size}\` Commands\n> <:passed:1100278179354136636> Reloaded \`${Rover.Events.length}\` Events\n> <:passed:1100278179354136636> Reloaded \`0\` Modules\n> <:Reboot:1103571932340813854> Reloading \`${Handlers.length}\` Handlers`)
                edited = true
                i++
                return clearInterval(WaitingForBot)
              }
            }
            else if (Rover.HandlerLoaded = false) return;
          })
        }
      })
    }, 5000);
  }
}