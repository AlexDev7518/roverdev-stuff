COMMAND TEMPLATE:

module.exports.run = async (client, message, args, cmdUser,prefix) => {
}

module.exports.conf = {
   aliases: ["help", "hlp"],
   enabled: true,
   ownerOnly: false,
   AdminOnly: false
}

module.exports.help = {
  Roverdev: {
      name: "",
      description: "",
      timeout: 5000,
      category: "",
    }
}

SLASH COMAMDN TEMPLATE: 
module.exports.run = async (interaction, client) => {
}

module.exports.conf = {
   aliases: ["help", "hlp"],
   enabled: true,
   ownerOnly: false,
   AdminOnly: false
}

module.exports.help = {
  Roverdev: {
      name: "",
      description: "",
      timeout: 5000,
      category: "",
    }
}

SLASH WITH OPTIONS: 

Options: 
      options: [
           {
              name: `other`,
              description: `Hello this is a Test`,
              type: ApplicationCommandOptionType.String,
              required: true,
              choices: [
                {
                    name: "Api Ping",
                    value: "API",
                  },              
              ],
           }
      ],
      SubCommands: 
         options: [
              {
                name: "option_1",
                description: "This is a test",
                type: ApplicationCommandOptionType.Channel,
                required: true,
              },
            ]