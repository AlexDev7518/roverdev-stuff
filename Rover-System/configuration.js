const { Colors } = require("discord.js");

module.exports = {
       "TokenArray": [
                { enabled: true, token:  "", TokenType: "Rover" }, // Rover Token
                { enabled: true, token: "", TokenType: "RoverEventsClient"  }, // Rover Premium
                { enabled: true, token: "", TokenType: "RoverTestClient" }, // Rover Testing
                { enabled: true, token: "", TokenType: "RoverManagerClient" }  // Rover Manager
       ],
       "841350077263249438": { // Rover Bot.
              EmbedColors: {
                     Success: "Green",
                     Pending: "Yellow",
                     Failed: "DarkRed",
                     Normal: "Red"
             },
             EmbedConfig: {
                  
             }
       },
       "878493087482150952": { // Rover Events.
              EmbedColors: {
                     Success: "Green",
                     Pending: "Yellow",
                     Failed: "DarkRed",
                     Normal: "#FFD700"
             } 
       },
       "891602617527058504": { // Rover Manager
              EmbedColors: {
                     Success: "Green",
                     Pending: "Yellow",
                     Failed: "DarkRed",
                     Normal: "Blue"
             } 
       },
       "887481377942024272": { // Config for this client.
                EmbedColors: {
                        Success: "Green",
                        Pending: "Yellow",
                        Failed: "DarkRed",
                        Normal: "Orange"
                },
                EmbedConfig: {
                     author: { name: `Rover Testing - {Command} Command`, iconURL: "https://i.imgur.com/T58rmAn.png" },
                     footer: { text: `Rover Testing - Made By Roverdev`, iconURL: "https://i.imgur.com/T58rmAn.png" },
                     color: Colors.Orange
                }
       },
}