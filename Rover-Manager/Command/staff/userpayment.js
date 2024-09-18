const { Application, ApplicationCommandOptionType, SelectMenuBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports.prefixRun = async (client, message, args, cmdUser,prefix) => {
   // Code For Prefix Here
}
module.exports.slashRun = async (interaction, client) => {
    const paymentType = interaction.options.getString('payment-type');
    const HowMuch = interaction.options.getNumber('how-much');
    const user = interaction.options.getUser("user")


    if (interaction.channel.name.includes("bc-")) {

      if (interaction.options.getSubcommand() === 'set') {
         const embed = new EmbedBuilder()
         .setTitle(`Succesfully Added ${HowMuch} To ${paymentType} in ${user.username} Wallet`)
         .setColor("#3dbeff")

         interaction.reply({embeds: [embed]})

         client.Payment.set(interaction.guild.id, HowMuch, `${user.id}.${paymentType}`)
      }

      if (interaction.options.getSubcommand() === 'add') {
         const current = client.Payment.get(interaction.guild.id, `${user.id}.${paymentType}`)

         const amount = current + HowMuch


         const embed = new EmbedBuilder()
         .setTitle(`Succesfully Added ${HowMuch} From ${paymentType} At ${user.username} Wallet`)
         .setColor("#3dbeff")

         interaction.reply({embeds: [embed]})

         client.Payment.set(interaction.guild.id, amount, `${user.id}.${paymentType}`)
      }

      if (interaction.options.getSubcommand() === 'remove') {
         const current = client.Payment.get(interaction.guild.id, `${user.id}.${paymentType}`)

         const amount = current-HowMuch


         if (Math.sign(amount) === -1) {
            const embed = new EmbedBuilder()
            .setTitle(`Could Not Remove ${HowMuch} From ${user.username} Wallet.`)
            .setDescription(`User Wallet Can Not Go in the Negtive They Have: ${current}`)
            .setColor("Red")
            return interaction.reply({embeds: [embed], ephemeral: true})
         }

         const embed = new EmbedBuilder()
         .setTitle(`Succesfully Removed ${HowMuch} From ${paymentType} At ${user.username} Wallet`)
         .setColor("#3dbeff")

         interaction.reply({embeds: [embed]})

         client.Payment.set(interaction.guild.id, amount, `${user.id}.${paymentType}`)
      }
    } else if (!interaction.channel.name.includes("bc-")) {
      if (interaction.options.getSubcommand() === 'set') {
         const embed = new EmbedBuilder()
         .setTitle(`Succesfully Added ${HowMuch} To ${paymentType} in ${user.username} Wallet`)
         .setColor("#3dbeff")

         interaction.reply({embeds: [embed]})

         client.Payment.set(interaction.guild.id, HowMuch, `${user.id}.${paymentType}`)
      }

      if (interaction.options.getSubcommand() === 'add') {
         const current = client.Payment.get(interaction.guild.id, `${user.id}.${paymentType}`)

         const amount = current + HowMuch


         const embed = new EmbedBuilder()
         .setTitle(`Succesfully Added ${HowMuch} From ${paymentType} At ${user.username} Wallet`)
         .setColor("#3dbeff")

         interaction.reply({embeds: [embed]})

         client.Payment.set(interaction.guild.id, amount, `${user.id}.${paymentType}`)
      }

      if (interaction.options.getSubcommand() === 'remove') {
         const current = client.Payment.get(interaction.guild.id, `${user.id}.${paymentType}`)

         const amount = current-HowMuch


         if (Math.sign(amount) === -1) {
            const embed = new EmbedBuilder()
            .setTitle(`Could Not Remove ${HowMuch} From ${user.username} Wallet.`)
            .setDescription(`User Wallet Can Not Go in the Negtive They Have: ${current}`)
            .setColor("Red")
            return interaction.reply({embeds: [embed], ephemeral: true})
         }

         const embed = new EmbedBuilder()
         .setTitle(`Succesfully Removed ${HowMuch} From ${paymentType} At ${user.username} Wallet`)
         .setColor("#3dbeff")

         interaction.reply({embeds: [embed]})

         client.Payment.set(interaction.guild.id, amount, `${user.id}.${paymentType}`)
      }      
    } else {
         interaction.reply({content: `:x: Please Only use this command in a Creation Channel!`, ephemeral: true})
    }



}

module.exports.conf = {
     Prefix: {
        aliases: [],
        enabled: true,
        ownerOnly: false,
        AdminOnly: true,
        userPermissions: []   
     },
     Slash: {
        enabled: true,
        ownerOnly: false,
        AdminOnly: true,
        userPermissions: [],
        timeout: 5,
     }
}

module.exports.help = {
      Prefix: {
        name: "userpayment",
        category: "payment",
        cooldown: 2,
        usage: "<@user>",
        description: "Set the Payment for the user",
      },
      Slash: {
        name: "userpayment",
        description: "Set the Payment for the user",
        category: "payment",
        options: [
         {
            name: "add",
            description: "Set the payment",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
               {
                  name: `payment-type`,
                  description: `payment type`,
                  type: ApplicationCommandOptionType.String,
                  required: true,
                  choices: [
                    {
                        name: "boost-payment",
                        value: "boost-payment",
                      },         
                      {
                          name: "money-payment",
                          value: "money-payment",
                      },              
                  ],
               },
               {
                  name: `how-much`,
                  description: `how much did they do?`,
                  type: ApplicationCommandOptionType.Number,
                  required: true,
               },
               {
                name: `user`,
                description: `User Who Payed`,
                type: ApplicationCommandOptionType.User,
                required: true,
             }
          ],
          },
            {
              name: "set",
              description: "Set the payment",
              type: ApplicationCommandOptionType.Subcommand,
              options: [
                 {
                    name: `payment-type`,
                    description: `payment type`,
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                      {
                          name: "boost-payment",
                          value: "boost-payment",
                        },         
                        {
                            name: "money-payment",
                            value: "money-payment",
                        },              
                    ],
                 },
                 {
                    name: `how-much`,
                    description: `how much did they do?`,
                    type: ApplicationCommandOptionType.Number,
                    required: true,
                 },
                 {
                  name: `user`,
                  description: `User Who Payed`,
                  type: ApplicationCommandOptionType.User,
                  required: true,
               }
            ],
            },
            {
               name: "remove",
               description: "Remove the payment",
               type: ApplicationCommandOptionType.Subcommand,
               options: [
                  {
                     name: `payment-type`,
                     description: `payment type`,
                     type: ApplicationCommandOptionType.String,
                     required: true,
                     choices: [
                        {
                           name: "boost-payment",
                           value: "boost-payment",
                         },         
                         {
                             name: "money-payment",
                             value: "money-payment",
                         },             
                     ],
                  },
                  {
                     name: `how-much`,
                     description: `how much do you want to remove?`,
                     type: ApplicationCommandOptionType.Number,
                     required: true,
                  },
                  {
                   name: `user`,
                   description: `User To Remove From`,
                   type: ApplicationCommandOptionType.User,
                   required: true,
                }
             ],
             },
          ]
      }
}