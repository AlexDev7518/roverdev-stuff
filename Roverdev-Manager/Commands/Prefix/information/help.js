const { EmbedBuilder, Emoji, StringSelectMenuBuilder, ActionRowBuilder } = require("discord.js");
const { BotPrefix } = require("../../../Configuration/BotConfig");
const { EmbedColor } = require("../../../Configuration/EmbedConfig")
const EmojiConfig = require("../../../Configuration/EmojiConfig")

module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {

    const categories = require("fs").readdirSync(`./Commands/Prefix`);

    const emojis = {
      admin: "<:Admin:961998589943488603>",
      blacklist: "<:blacklist:1009502614783787028>",
      botshop: "<a:Bot:1015746519212765195>",
      developers: "<:Developer:1005732053498744892>",
      embeds: "<:Embed:1021530641629720647>",
      giveaway: "<a:Giveaways:1017081047327969330>",
      hosting: "<a:Hosting:1034501806975369406>",
      information: "<:Info:1010183373119041597>",
      invites: "<a:invites:961717753071407124>",
      racks: "<:Server:1036854876283600957>",
      rovercoins: "<a:Economy:1015237455919714305>",
      setup: "<a:Setup:1010018440901304421>",
      ticket: "<:Ticket:1015745934090575964>"
};

             const embed = new EmbedBuilder()
               .setAuthor({ name: `Help Menu | ${Roverdev.user.username} | Main Page`, iconURL: Roverdev.user.displayAvatarURL() })
               .setTitle(`Welcome to Main Roverdev Bot.`)
               .setColor(EmbedColor)
               .setDescription(`Welcome to ***__${Roverdev.user.username}__***, I am the Main Bot of Roverdev Sever's\n> Main Developer: \`AlexDev#7518\`\n\n ***Roverdev Hosting:***\n> Website: https://roverhost.xyz\n> Dashboard: https://panel.roverhost.xyz\n\n***Roverdev Community:***\n> Website: https://roverdev.xyz\n> Dashboard: https://dashboard.roverdev.xyz\n> Server: https://discord.gg/roverdev\n\n**Current Stats**\n> Main Website / Dashboard: \`Offline\`\n> Hosting Website / Dashboard: \`Offline\`\n> Commands: ${Roverdev.container.commands.size}\n\n> Help menu is not done so you can't view the commands yet!\n\n> __**Welcome to Roverdev's 2023 - New System / New Remake**__`)

               

               const row = new ActionRowBuilder().addComponents(
                      new StringSelectMenuBuilder()
                      .setCustomId("Help-Menu")
                      .setPlaceholder("Click me to look the help menu")
                      .setOptions(
                        categories.map(cat => {
                          return {
                              label: cat,
                              value: cat,
                              description: `View All Commands of ${cat}`,
                              
                          }
                      })
                      )
               )

               const msg = await message.reply({ embeds: [embed], components: [row] })

               const filter = (interaction) => interaction.user.id === message.author.id;

               const collector = msg.createMessageComponentCollector({
                 filter,
                 time: 50000,
               });
         
               collector.on("collect", async (interaction) => {
                      if (interaction.customId == "Help-Menu") {

                        if (Roverdev.Disabledcategorys.includes(interaction.values[0])) return interaction.reply({ content: `Seems this Category is on Maintenance! Check back later`, ephemeral: true })

                        const embed = new EmbedBuilder()
                        .setAuthor({ name: `Help Menu | ${Roverdev.user.username} | ${interaction.values} Page`, iconURL: Roverdev.user.displayAvatarURL() })
                        .setColor(EmbedColor)
                        .addFields(
                          Roverdev.container.commands.filter(c=>c.PrefixConfiguration.category === `${interaction.values}`).map(c=> {
                            return {
                                   name: `\`${BotPrefix}${c.PrefixConfiguration.name}\``,
                                   value: `> No Description` ,
                                   inline: true,
                            }
                           }
                         )
                       )

                       interaction.update({ embeds: [embed], components: [row]})
                      }

               })
        
  }
}