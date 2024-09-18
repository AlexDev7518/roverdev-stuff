const { EmbedBuilder } = require('discord.js')
module.exports = {
    name: "reboot",
    category: "developers",
    cooldown: 2,
    Description: "",
    RunCommand: async (Rover, message, args, executor, language, embed, database) => {
        if (!["663442537222242306", "647962247666073610", "683260836252352515", "693553429380857978"].includes(message.author.id)) return


        Rover.loadedHandler = true

        let i = 0

        const Handlers = require("fs").readdirSync("./Handlers/").filter(f => f.endsWith(".js"))

        const embed1 = new EmbedBuilder()
            .setAuthor({ name: `Roverdev - Rebooting Discord Bot`, iconURL: Rover.user.displayAvatarURL() })
            .setColor("Yellow")
            .setDescription(`> <:Reboot:1103571932340813854> Reloading \`${Rover.storage.handlers.commands.size}\` Commands\n> <:Reboot:1103571932340813854> Reloading \`${Rover.storage.handlers.events.size}\` Events\n> <:Reboot:1103571932340813854> Reloading \`${Rover.storage.Others.modules.size}\` Modules\n> <:Reboot:1103571932340813854> Reloading \`${Rover.storage.Others.addons.size}\` Addons\n> <:Reboot:1103571932340813854> Reloading \`${Handlers.length}\` Handlers`)

        let msg = await message.reply({ embeds: [embed1] })

        require("fs").readdirSync("./commands").forEach(CommandDirectory => {
            const CommandsInFolders = require("fs").readdirSync("./commands/" + `${CommandDirectory}/`).filter(f => f.endsWith(".js"))
            for (const Command of CommandsInFolders) {
                delete require.cache[require.resolve(`${process.cwd()}/commands/${CommandDirectory}/${Command}`)]
            }
        })


        require("fs").readdirSync("./Events").forEach(CommandDirectory => {
            const CommandsInFolders = require("fs").readdirSync("./Events/" + `${CommandDirectory}/`).filter(f => f.endsWith(".js"))

            for (const Command of CommandsInFolders) {
                delete require.cache[require.resolve(`${process.cwd()}/Events/${CommandDirectory}/${Command}`)]
            }
        })

        require("fs").readdirSync("./Addons").forEach(CommandDirectory => {
            const CommandsInFolders = require("fs").readdirSync("./Addons/" + `${CommandDirectory}/`).filter(f => f.endsWith(".js"))

            for (const Command of CommandsInFolders) {
                delete require.cache[require.resolve(`${process.cwd()}/Addons/${CommandDirectory}/${Command}`)]
            }
        })



        await Rover.removeAllListeners()
        await Rover.storage.handlers.commands.clear();
        await Rover.storage.handlers.events.clear();
        await Rover.storage.Others.modules.clear();
        await Rover.storage.cooldowns.clear();
        await Rover.storage.Others.addons.clear()
        await Rover.storage.Others.addons.clear()
        await Rover.storage.handlers.Handlers.clear()

        setTimeout(() => {

            let edited = false


            const loadHandlers = setInterval(function () {
                if (i == Handlers.length) {

                    msg.edit({ embeds: [embed1] })


                    setTimeout(() => {
                        console.log(`Restarted Bot Successfully!`)
                        embed1.setDescription(`> <:checkmark:1122591861685624884> Reloaded \`${Rover.storage.handlers.commands.size}\` Commands\n> <:checkmark:1122591861685624884> Reloaded \`${Rover.storage.handlers.events.size}\` Events\n> <:checkmark:1122591861685624884> Reloaded \`${Rover.storage.Others.modules.size}\` Modules\n> <:checkmark:1122591861685624884> Reloading \`${Rover.storage.Others.addons.size}\` Addons\n> <:checkmark:1122591861685624884>  Reloading \`${Handlers.length}\` Handlers`)
                        msg.edit({ embeds: [embed1] })
                    }, 1000);
                    return clearInterval(loadHandlers)
                }
                if (Rover.loadedHandler == true) {

                    delete require.cache[require.resolve("../../handlers/" + Handlers[i])]
                    require("../../handlers/" + Handlers[i])(Rover)

                    msg.edit({ embeds: [embed1] })

                    edited = false



                    let WaitingForBot = setInterval(function () {
                        if (Rover.loadedHandler == true) {
                            if (Handlers[i] == "addons.js" && edited !== true) {
                                Rover.logger({
                                    ShowStuff: {
                                        ShowFile: true,
                                        // ShowEvent: true,
                                        // ShowFileType: true
                                    },
                                    type: "Success",
                                    FileType: "module",
                                    Folder: "Handlers",
                                    File: Handlers[i],
                                    event: "test",
                                    content: "Successfully Loaded " + Handlers[i]
                                })

                                embed1.setDescription(embed1.data.description.replace(`<:Reboot:1103571932340813854> Reloading \`${Rover.storage.Others.addons.size}\` Addons`, `<:checkmark:1122591861685624884>  Reloaded \`${Rover.storage.Others.addons.size}\` Addons`))
                                edited = true
                                i++
                                return clearInterval(WaitingForBot)
                            }
                            if (Handlers[i] == "commands.js" && edited !== true) {
                                Rover.logger({
                                    ShowStuff: {
                                        ShowFile: true,
                                        // ShowEvent: true,
                                        // ShowFileType: true
                                    },
                                    type: "Success",
                                    FileType: "module",
                                    Folder: "Handlers",
                                    File: Handlers[i],
                                    event: "test",
                                    content: "Successfully Loaded " + Handlers[i]
                                })
                                embed1.setDescription(embed1.data.description.replace(`<:Reboot:1103571932340813854> Reloading \`${Rover.storage.handlers.commands.size}\` Commands`, `<:checkmark:1122591861685624884> Reloaded \`${Rover.storage.handlers.commands.size}\` Commands`))
                                edited = true
                                i++
                                return clearInterval(WaitingForBot)
                            }
                            if (Handlers[i] == "events.js" && edited !== true) {
                                Rover.logger({
                                    ShowStuff: {
                                        ShowFile: true,
                                        // ShowEvent: true,
                                        // ShowFileType: true
                                    },
                                    type: "Success",
                                    FileType: "module",
                                    Folder: "Handlers",
                                    File: Handlers[i],
                                    event: "test",
                                    content: "Successfully Loaded " + Handlers[i]
                                })
                                embed1.setDescription(embed1.data.description.replace(`<:Reboot:1103571932340813854> Reloading \`${Rover.storage.handlers.events.size}\` Events`, `<:checkmark:1122591861685624884> Reloaded \`${Rover.storage.handlers.events.size}\` Events`))
                                edited = true
                                i++
                                return clearInterval(WaitingForBot)
                            }
                            if (Handlers[i] == "modules.js" && edited !== true) {
                                Rover.logger({
                                    ShowStuff: {
                                        ShowFile: true,
                                        // ShowEvent: true,
                                        // ShowFileType: true
                                    },
                                    type: "Success",
                                    FileType: "module",
                                    Folder: "Handlers",
                                    File: Handlers[i],
                                    event: "test",
                                    content: "Successfully Loaded " + Handlers[i]
                                })
                                embed1.setDescription(embed1.data.description.replace(`<:Reboot:1103571932340813854> Reloading \`${Rover.storage.Others.modules.size}\` Modules`, `<:checkmark:1122591861685624884> Reloaded \`${Rover.storage.Others.modules.size}\` Modules`))
                                edited = true
                                i++
                                return clearInterval(WaitingForBot)
                            }
                        }
                        else if (Rover.HandlerLoaded = false) return;
                    })
                }
            })
        }, 1000);
    }
}