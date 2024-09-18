const { ActionRowBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js")
const UserConfig = require("../../database/schemas/Userconfig.js")

const Roverdev = require("../../Main.js").Roverdev
async function SupportTicket(info, interaction) {
    return new Promise((res, rej) => {

        let array = []

        Roverdev.guilds.cache.get("846548733914906664").members.cache.get(interaction.user.id).roles.cache.forEach(m => {
            if (m.name.includes("[TALK]")) {
                array.push(m.name.replace("〢[TALK] ", ""))
            }
        })


        setTimeout(async () => {

            const modal = new ModalBuilder()
                .setCustomId("SupportReason")
                .setTitle("Ticket Support Reason")
                .addComponents(
                    new ActionRowBuilder()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId("SupportReasonAnswer")
                                .setLabel("Provide the reason of this ticket")
                                .setPlaceholder("Note: Please put the real reason here.")
                                .setRequired(true)
                                .setStyle(TextInputStyle.Paragraph),
                        ),
                )

            await interaction.showModal(modal);

            const filter = (interaction) => interaction.customId === 'SupportReason';
            interaction.awaitModalSubmit({ filter, time: 60_000 })
                .then(async interaction1 => {
                    let data = await UserConfig.findOne({ Author: interaction.user.id })

                    await interaction1.reply({ content: `<a:Loading:996191440713551953> Creating your Ticket...`, ephemeral: true })

                    if (data) {
                        let TicketInfoReady = {
                            Type: "Normal-Ticket",
                            Language: data.UserLanguage,
                            Reason: interaction1.fields.getTextInputValue('SupportReasonAnswer'),
                            interaction: interaction1
                        }

                        return res({ ready: true, data: TicketInfoReady })
                    }

                    if (array.length == 0) {
                        let TicketInfoReady = {
                            Type: "Normal-Ticket",
                            Language: "English",
                            Reason: interaction1.fields.getTextInputValue('SupportReasonAnswer'),
                            interaction: interaction1
                        }

                        await UserConfig.create({
                            Author: interaction.user.id,
                            UserLanguage: "English"
                        })

                        return res({ ready: true, data: TicketInfoReady })
                    }

                    if (array.length == 1) {
                        let TicketInfoReady = {
                            Type: "Normal-Ticket",
                            Language: array[0],
                            Reason: interaction1.fields.getTextInputValue('SupportReasonAnswer'),
                            interaction: interaction1
                        }

                        await UserConfig.create({
                            Author: interaction.user.id,
                            UserLanguage: array[0]
                        })

                        return res({ ready: true, data: TicketInfoReady })
                    }

                    let TicketInfo = {
                        Type: "Normal-Ticket",
                        Language: array
                    }

                    let MenuArray = []

                    array.forEach(m => {
                        MenuArray.push({
                            "label": m,
                            "value": m,
                            "description": "Choose " + m + " As your primary Language",
                        })
                    })

                    let row = new ActionRowBuilder()
                        .setComponents(
                            new StringSelectMenuBuilder()
                                .setCustomId("Select-Language")
                                .setPlaceholder("Select your Language")
                                .setOptions(
                                    MenuArray
                                )
                        )


                    let QuestionConfirm = await interaction1.editReply({ content: `I Found \`${array.length}\` Language Roles you have. Could you please select your Primary Language\n\n **Note:** We are Mainly a English Server, But we also do these languages: \`Hindi, Spanish, German\``, components: [row], ephemeral: true })

                    const collector = QuestionConfirm.createMessageComponentCollector({
                        filter: (interaction) => interaction.user.id === interaction.user.id,
                        time: 50000,
                        max: 1,
                    });

                    collector.on('collect', async InteractionVerify => {
                        if (InteractionVerify.customId == "Select-Language") {
                            let data = await UserConfig.findOne({ Author: InteractionVerify.user.id })

                            if (data) return;

                            if (!data) {
                                await UserConfig.create({
                                    Author: interaction.user.id,
                                    UserLanguage: InteractionVerify.values[0],
                                })
                            }

                            let TicketInfo = {
                                Type: "Normal-Ticket",
                                Language: InteractionVerify.values[0],
                                Reason: interaction1.fields.getTextInputValue('SupportReasonAnswer'),
                                interaction: interaction1
                            }

                            await interaction1.editReply({ content: `Successfully Selected ${InteractionVerify.values[0]} Language!`, ephemeral: true, components: [] })

                            return res({ ready: true, data: TicketInfo })
                        }
                    })
                })

        }, 1000)

    })
}
async function ReportTicket(info, interaction) {
    return new Promise((res, rej) => {

        let array = []

        Roverdev.guilds.cache.get("846548733914906664").members.cache.get(interaction.user.id).roles.cache.forEach(m => {
            if (m.name.includes("[TALK]")) {
                array.push(m.name.replace("〢[TALK] ", ""))
            }
        })


        setTimeout(async () => {

            const modal = new ModalBuilder()
                .setCustomId("SupportReason")
                .setTitle("Ticket Support Reason")
                .addComponents(
                    new ActionRowBuilder()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId("SupportReasonAnswer")
                                .setLabel("Provide the reason of this ticket")
                                .setPlaceholder("Note: Please put the real reason here.")
                                .setRequired(true)
                                .setStyle(TextInputStyle.Paragraph),
                        ),
                )

            await interaction.showModal(modal);

            const filter = (interaction) => interaction.customId === 'SupportReason';
            interaction.awaitModalSubmit({ filter, time: 60_000 })
                .then(async interaction1 => {
                    let data = await UserConfig.findOne({ Author: interaction.user.id })

                    await interaction1.reply({ content: `<a:Loading:996191440713551953> Creating your Ticket...`, ephemeral: true })

                    if (data) {
                        let TicketInfoReady = {
                            Type: "Normal-Ticket",
                            Language: data.UserLanguage,
                            Reason: interaction1.fields.getTextInputValue('SupportReasonAnswer'),
                            interaction: interaction1
                        }

                        return res({ ready: true, data: TicketInfoReady })
                    }

                    if (array.length == 0) {
                        let TicketInfoReady = {
                            Type: "Normal-Ticket",
                            Language: "English",
                            Reason: interaction1.fields.getTextInputValue('SupportReasonAnswer'),
                            interaction: interaction1
                        }

                        await UserConfig.create({
                            Author: interaction.user.id,
                            UserLanguage: "English"
                        })

                        return res({ ready: true, data: TicketInfoReady })
                    }

                    if (array.length == 1) {
                        let TicketInfoReady = {
                            Type: "Normal-Ticket",
                            Language: array[0],
                            Reason: interaction1.fields.getTextInputValue('SupportReasonAnswer'),
                            interaction: interaction1
                        }

                        await UserConfig.create({
                            Author: interaction.user.id,
                            UserLanguage: array[0]
                        })

                        return res({ ready: true, data: TicketInfoReady })
                    }

                    let TicketInfo = {
                        Type: "Normal-Ticket",
                        Language: array
                    }

                    let MenuArray = []

                    array.forEach(m => {
                        MenuArray.push({
                            "label": m,
                            "value": m,
                            "description": "Choose " + m + " As your primary Language",
                        })
                    })

                    let row = new ActionRowBuilder()
                        .setComponents(
                            new StringSelectMenuBuilder()
                                .setCustomId("Select-Language")
                                .setPlaceholder("Select your Language")
                                .setOptions(
                                    MenuArray
                                )
                        )


                    let QuestionConfirm = await interaction1.editReply({ content: `I Found \`${array.length}\` Language Roles you have. Could you please select your Primary Language\n\n **Note:** We are Mainly a English Server, But we also do these languages: \`Hindi, Spanish, German\``, components: [row], ephemeral: true })

                    const collector = QuestionConfirm.createMessageComponentCollector({
                        filter: (interaction) => interaction.user.id === interaction.user.id,
                        time: 50000,
                        max: 1,
                    });

                    collector.on('collect', async InteractionVerify => {
                        if (InteractionVerify.customId == "Select-Language") {
                            let data = await UserConfig.findOne({ Author: InteractionVerify.user.id })

                            if (data) return;

                            if (!data) {
                                await UserConfig.create({
                                    Author: interaction.user.id,
                                    UserLanguage: InteractionVerify.values[0],
                                })
                            }

                            let TicketInfo = {
                                Type: "Normal-Ticket",
                                Language: InteractionVerify.values[0],
                                Reason: interaction1.fields.getTextInputValue('SupportReasonAnswer'),
                                interaction: interaction1
                            }

                            await interaction1.editReply({ content: `Successfully Selected ${InteractionVerify.values[0]} Language!`, ephemeral: true, components: [] })

                            return res({ ready: true, data: TicketInfo })
                        }
                    })
                })

        }, 1000)

    })
}
async function claimTicket(info, interaction) {
    return new Promise((res, rej) => {

        let array = []

        Roverdev.guilds.cache.get("846548733914906664").members.cache.get(interaction.user.id).roles.cache.forEach(m => {
            if (m.name.includes("[TALK]")) {
                array.push(m.name.replace("〢[TALK] ", ""))
            }
        })


        setTimeout(async () => {

            const modal = new ModalBuilder()
                .setCustomId("SupportReason")
                .setTitle("Ticket Support Reason")
                .addComponents(
                    new ActionRowBuilder()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId("SupportReasonAnswer")
                                .setLabel("Provide the reason of this ticket")
                                .setPlaceholder("Note: Please put the real reason here.")
                                .setRequired(true)
                                .setStyle(TextInputStyle.Paragraph),
                        ),
                )

                await interaction.showModal(modal);

                const filter = (interaction) => interaction.customId === 'SupportReason';
                interaction.awaitModalSubmit({ filter, time: 60_000 })
                    .then(async interaction1 => {
                        let data = await UserConfig.findOne({ Author: interaction.user.id })

                        await interaction1.reply({ content: `<a:Loading:996191440713551953> Creating your Ticket...`, ephemeral: true })

                        interaction1.values = ["Claim-Ticket"]

                        if (data) {
                            let TicketInfoReady = {
                                Type: "Normal-Ticket",
                                Language: data.UserLanguage,
                                Reason: interaction1.fields.getTextInputValue('SupportReasonAnswer'),
                                interaction: interaction1
                            }
            
                            return res({ ready: true, data: TicketInfoReady })
                        }
            
                        if (array.length == 0) {
                            let TicketInfoReady = {
                                Type: "Normal-Ticket",
                                Language: "English",
                                Reason: interaction1.fields.getTextInputValue('SupportReasonAnswer'),
                                interaction: interaction1
                            }
            
                            await UserConfig.create({
                                Author: interaction.user.id,
                                UserLanguage: "English"
                            })
            
                            return res({ ready: true, data: TicketInfoReady })
                        }
            
                        if (array.length == 1) {
                            let TicketInfoReady = {
                                Type: "Normal-Ticket",
                                Language: array[0],
                                Reason: interaction1.fields.getTextInputValue('SupportReasonAnswer'),
                                interaction: interaction1
                            }
            
                            await UserConfig.create({
                                Author: interaction.user.id,
                                UserLanguage: array[0]
                            })
            
                            return res({ ready: true, data: TicketInfoReady })
                        }
            
                        let TicketInfo = {
                            Type: "Normal-Ticket",
                            Language: array
                        }
            
                        let MenuArray = []
            
                        array.forEach(m => {
                            MenuArray.push({
                                "label": m,
                                "value": m,
                                "description": "Choose " + m + " As your primary Language",
                            })
                        })
            
                        let row = new ActionRowBuilder()
                            .setComponents(
                                new StringSelectMenuBuilder()
                                    .setCustomId("Select-Language")
                                    .setPlaceholder("Select your Language")
                                    .setOptions(
                                        MenuArray
                                    )
                            )
            
            
                        let QuestionConfirm = await interaction1.editReply({ content: `I Found \`${array.length}\` Language Roles you have. Could you please select your Primary Language\n\n **Note:** We are Mainly a English Server, But we also do these languages: \`Hindi, Spanish, German\``, components: [row], ephemeral: true })
            
                        const collector = QuestionConfirm.createMessageComponentCollector({
                            filter: (interaction) => interaction.user.id === interaction.user.id,
                            time: 50000,
                            max: 1,
                        });
            
                        collector.on('collect', async InteractionVerify => {
                            if (InteractionVerify.customId == "Select-Language") {
                                let data = await UserConfig.findOne({ Author: InteractionVerify.user.id })
            
                                if (data) return;
            
                                if (!data) {
                                    await UserConfig.create({
                                        Author: interaction.user.id,
                                        UserLanguage: InteractionVerify.values[0],
                                    })
                                }
            
                                let TicketInfo = {
                                    Type: "Normal-Ticket",
                                    Language: InteractionVerify.values[0],
                                    Reason: interaction1.fields.getTextInputValue('SupportReasonAnswer'),
                                    interaction: interaction1
                                }
            
                                await interaction1.editReply({ content: `Successfully Selected ${InteractionVerify.values[0]} Language!`, ephemeral: true, components: [] })
            
                                return res({ ready: true, data: TicketInfo })
                            }
                        })
                    })

                }, 1000)

    })
}

async function StaffTicket(info, interaction) {
    return new Promise((res, rej) => {

        let array = []

        Roverdev.guilds.cache.get("846548733914906664").members.cache.get(interaction.user.id).roles.cache.forEach(m => {
            if (m.name.includes("[TALK]")) {
                array.push(m.name.replace("〢[TALK] ", ""))
            }
        })

        const fourDaysInMs = 4 * 24 * 60 * 60 * 1000;
        const currentTimestamp = new Date().getTime();
        const timeDifference = currentTimestamp - new Date(Roverdev.guilds.cache.get("846548733914906664").members.cache.get(interaction.user.id).joinedTimestamp).getTime();


        if (timeDifference < fourDaysInMs) {
            res({ ready: false, data: {}, Error: true })
            return interaction.reply({ content: `Sorry, but you must at least wait 4 days to apply.`, ephemeral: true })
        }


        setTimeout(async () => {

            const modal = new ModalBuilder()
                .setCustomId("SupportReason")
                .setTitle("Ticket Support Reason")
                .addComponents(
                    new ActionRowBuilder()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId("SupportReasonAnswer")
                                .setLabel("Provide the reason of this ticket")
                                .setPlaceholder("Note: Please put the real reason here.")
                                .setRequired(true)
                                .setStyle(TextInputStyle.Paragraph),
                        ),
                )

                await interaction.showModal(modal);

                const filter = (interaction) => interaction.customId === 'SupportReason';
                interaction.awaitModalSubmit({ filter, time: 60_000 })
                    .then(async interaction1 => {
                        let data = await UserConfig.findOne({ Author: interaction.user.id })

                        await interaction1.reply({ content: `<a:Loading:996191440713551953> Creating your Ticket...`, ephemeral: true })

                        interaction1.values = ["Staff-Ticket"]

                        if (data) {
                            let TicketInfoReady = {
                                Type: "Normal-Ticket",
                                Language: data.UserLanguage,
                                Reason: interaction1.fields.getTextInputValue('SupportReasonAnswer'),
                                interaction: interaction1
                            }
            
                            return res({ ready: true, data: TicketInfoReady })
                        }
            
                        if (array.length == 0) {
                            let TicketInfoReady = {
                                Type: "Normal-Ticket",
                                Language: "English",
                                Reason: interaction1.fields.getTextInputValue('SupportReasonAnswer'),
                                interaction: interaction1
                            }
            
                            await UserConfig.create({
                                Author: interaction.user.id,
                                UserLanguage: "English"
                            })
            
                            return res({ ready: true, data: TicketInfoReady })
                        }
            
                        if (array.length == 1) {
                            let TicketInfoReady = {
                                Type: "Normal-Ticket",
                                Language: array[0],
                                Reason: interaction1.fields.getTextInputValue('SupportReasonAnswer'),
                                interaction: interaction1
                            }
            
                            await UserConfig.create({
                                Author: interaction.user.id,
                                UserLanguage: array[0]
                            })
            
                            return res({ ready: true, data: TicketInfoReady })
                        }
            
                        let TicketInfo = {
                            Type: "Normal-Ticket",
                            Language: array
                        }
            
                        let MenuArray = []
            
                        array.forEach(m => {
                            MenuArray.push({
                                "label": m,
                                "value": m,
                                "description": "Choose " + m + " As your primary Language",
                            })
                        })
            
                        let row = new ActionRowBuilder()
                            .setComponents(
                                new StringSelectMenuBuilder()
                                    .setCustomId("Select-Language")
                                    .setPlaceholder("Select your Language")
                                    .setOptions(
                                        MenuArray
                                    )
                            )
            
            
                        let QuestionConfirm = await interaction1.editReply({ content: `I Found \`${array.length}\` Language Roles you have. Could you please select your Primary Language\n\n **Note:** We are Mainly a English Server, But we also do these languages: \`Hindi, Spanish, German\``, components: [row], ephemeral: true })
            
                        const collector = QuestionConfirm.createMessageComponentCollector({
                            filter: (interaction) => interaction.user.id === interaction.user.id,
                            time: 50000,
                            max: 1,
                        });
            
                        collector.on('collect', async InteractionVerify => {
                            if (InteractionVerify.customId == "Select-Language") {
                                let data = await UserConfig.findOne({ Author: InteractionVerify.user.id })
            
                                if (data) return;
            
                                if (!data) {
                                    await UserConfig.create({
                                        Author: interaction.user.id,
                                        UserLanguage: InteractionVerify.values[0],
                                    })
                                }
            
                                let TicketInfo = {
                                    Type: "Normal-Ticket",
                                    Language: InteractionVerify.values[0],
                                    Reason: interaction1.fields.getTextInputValue('SupportReasonAnswer'),
                                    interaction: interaction1
                                }
            
                                await interaction1.editReply({ content: `Successfully Selected ${InteractionVerify.values[0]} Language!`, ephemeral: true, components: [] })
            
                                return res({ ready: true, data: TicketInfo })
                            }
                        })
                    })

                }, 1000)

    })
}
async function PartnerTicket(info, interaction) {
    return new Promise((res, rej) => {

        let array = []

        Roverdev.guilds.cache.get("846548733914906664").members.cache.get(interaction.user.id).roles.cache.forEach(m => {
            if (m.name.includes("[TALK]")) {
                array.push(m.name.replace("〢[TALK] ", ""))
            }
        })


        setTimeout(async () => {

            const modal = new ModalBuilder()
                .setCustomId("SupportReason")
                .setTitle("Ticket Support Reason")
                .addComponents(
                    new ActionRowBuilder()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId("SupportReasonAnswer")
                                .setLabel("Provide the reason of this ticket")
                                .setPlaceholder("Note: Please put the real reason here.")
                                .setRequired(true)
                                .setStyle(TextInputStyle.Paragraph),
                        ),
                )

                await interaction.showModal(modal);

                const filter = (interaction) => interaction.customId === 'SupportReason';
                interaction.awaitModalSubmit({ filter, time: 60_000 })
                    .then(async interaction1 => {
                        let data = await UserConfig.findOne({ Author: interaction.user.id })

                        await interaction1.reply({ content: `<a:Loading:996191440713551953> Creating your Ticket...`, ephemeral: true })

                        interaction1.values = ["Partner-Ticket"]

                        if (data) {
                            let TicketInfoReady = {
                                Type: "Normal-Ticket",
                                Language: data.UserLanguage,
                                Reason: interaction1.fields.getTextInputValue('SupportReasonAnswer'),
                                interaction: interaction1
                            }
            
                            return res({ ready: true, data: TicketInfoReady })
                        }
            
                        if (array.length == 0) {
                            let TicketInfoReady = {
                                Type: "Normal-Ticket",
                                Language: "English",
                                Reason: interaction1.fields.getTextInputValue('SupportReasonAnswer'),
                                interaction: interaction1
                            }
            
                            await UserConfig.create({
                                Author: interaction.user.id,
                                UserLanguage: "English"
                            })
            
                            return res({ ready: true, data: TicketInfoReady })
                        }
            
                        if (array.length == 1) {
                            let TicketInfoReady = {
                                Type: "Normal-Ticket",
                                Language: array[0],
                                Reason: interaction1.fields.getTextInputValue('SupportReasonAnswer'),
                                interaction: interaction1
                            }
            
                            await UserConfig.create({
                                Author: interaction.user.id,
                                UserLanguage: array[0]
                            })
            
                            return res({ ready: true, data: TicketInfoReady })
                        }
            
                        let TicketInfo = {
                            Type: "Normal-Ticket",
                            Language: array
                        }
            
                        let MenuArray = []
            
                        array.forEach(m => {
                            MenuArray.push({
                                "label": m,
                                "value": m,
                                "description": "Choose " + m + " As your primary Language",
                            })
                        })
            
                        let row = new ActionRowBuilder()
                            .setComponents(
                                new StringSelectMenuBuilder()
                                    .setCustomId("Select-Language")
                                    .setPlaceholder("Select your Language")
                                    .setOptions(
                                        MenuArray
                                    )
                            )
            
            
                        let QuestionConfirm = await interaction1.editReply({ content: `I Found \`${array.length}\` Language Roles you have. Could you please select your Primary Language\n\n **Note:** We are Mainly a English Server, But we also do these languages: \`Hindi, Spanish, German\``, components: [row], ephemeral: true })
            
                        const collector = QuestionConfirm.createMessageComponentCollector({
                            filter: (interaction) => interaction.user.id === interaction.user.id,
                            time: 50000,
                            max: 1,
                        });
            
                        collector.on('collect', async InteractionVerify => {
                            if (InteractionVerify.customId == "Select-Language") {
                                let data = await UserConfig.findOne({ Author: InteractionVerify.user.id })
            
                                if (data) return;
            
                                if (!data) {
                                    await UserConfig.create({
                                        Author: interaction.user.id,
                                        UserLanguage: InteractionVerify.values[0],
                                    })
                                }
            
                                let TicketInfo = {
                                    Type: "Normal-Ticket",
                                    Language: InteractionVerify.values[0],
                                    Reason: interaction1.fields.getTextInputValue('SupportReasonAnswer'),
                                    interaction: interaction1
                                }
            
                                await interaction1.editReply({ content: `Successfully Selected ${InteractionVerify.values[0]} Language!`, ephemeral: true, components: [] })
            
                                return res({ ready: true, data: TicketInfo })
                            }
                        })
                    })

                }, 1000)

    })
}


module.exports = {
    SupportTicket,
    ReportTicket,
    claimTicket,
    StaffTicket,
    PartnerTicket
}