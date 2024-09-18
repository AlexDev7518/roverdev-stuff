module.exports = {
    TicketSettings: {
           SupportTicket: {
                  Emoji: "📒",
                  Type: "St",
                  TicketCategorys: {
                         SupportTicket: "1040952183375532152",
                  },
                   Messages: {
                         Description: "***Hello <@{UserId}>, Welcome to Your \`{TicketType}\`***\n> Please Tell us your support question and our staff will help you out the best they can\n\n> *say it in 1 message don't send spam messages or you will get warned / muted*\n\n> Note: *Don't Ping Any Staff Members Just wait for a Responce!*",
                         Color: "Yellow"
                   },
                   Roles: [
                         {
                                id: "1005978927421980702",
                                name: "Staff Team"
                         },
                  ]
           },
           ReportTicket: {
               Emoji: "🔨",
               Type: "rt",
                   TicketCategorys: {
                         ReportTicket: "1058644799097405491",
                   },
                   Messages: {
                         Description: "***Hello <@{UserId}>, Welcome to Your \`{TicketType}\`***\n> Please Provide reason of the report and the user and proof so we can do the best we can!\n\n> *say it in 1 message don't send spam messages or you will get warned / muted*\n\n> Note: *Don't Ping Any Staff Members Just wait for a Responce!*",
                         Color: "Red"
                   },
                   Roles: [
                         {
                                id: "920292440223662100",
                                name: "Moderator"
                         },
                         {
                                id: "920292438294294538",
                                name: "Admin"
                         }
                   ]
           },
           YoutubeTicket: {
              Emoji: "📕",
              Type: "yt",
                  TicketCategorys: {
                         YoutubeTicket: "1058644918056259585",
                  },
                   Messages: {
                         Description: "***Hello <@{UserId}>, Welcome to Your \`{TicketType}\`***\n> Please Provide the 2 Screenshots of proof you subscribed to the channels in <#1040958648941285416> \n\n> *say it in 1 message don't send spam messages or you will get warned / muted*\n\n> Note: *Don't Ping Any Staff Members Just wait for a Responce!*",
                         Color: "Orange"
                   },
                   Roles: [
                     {
                            id: "1005978927421980702",
                            name: "Staff Team"
                     },
                         {
                                id: "920292438294294538",
                                name: "Admin"
                         }
                   ]
           },
           BotShopTicket: {
              Emoji: "🤖",
              Type: "bst",
                  TicketCategorys: {
                         BotShopTicket: "1058644969981747250",
                  },
                   Messages: {
                         Description: "***Hello <@{UserId}>, Welcome to Your \`{TicketType}\`***\n> Please Tell us what is wrong with your bot / select the bot below you are having issues with.\n\n> *say it in 1 message don't send spam messages or you will get warned / muted*\n\n> Note: *Don't Ping Any Staff Members Just wait for a Responce!*",
                         Color: "Green"
                   },
                   Roles: [
                     {
                            id: "1005978927421980702",
                            name: "Staff Team"
                     }
                   ]
           },
           ClaimTicket: {
              Emoji: "🎉",
              Type: "ct",
                  TicketCategorys: {
                         ClaimTicket: "1058645042480300092",
                  },
                   Messages: {
                         Description: "***Hello <@{UserId}>, Welcome to Your \`{TicketType}\`***\n> Please Provide what you want to claim from a giveaway today.\n\n> *say it in 1 message don't send spam messages or you will get warned / muted*\n\n> Note: *Don't Ping Any Staff Members Just wait for a Responce!*",
                         Color: "Orange"
                   },
                   Roles: [
                         {
                                id: "920292438294294538",
                                name: "Admin"
                         },
                          {
                                id: "920292436641718312",
                                name: "Co-Management"
                         },
                         {
                               id: "920292435853185054",
                               name: "Management"
                        }
                   ]
           },
           ApplyStaff: {
              Emoji: "",
                  TicketCategorys: {
                         ApplyStaff: "1034260174271164456",
                  },
                  Messages: {
                         Description: "",
                         Color: ""
                   },
                   Roles: [
                         {
                                id: "1032607174679076976",
                                name: "Bot Testers"
                         }
                   ]
           },
           ApplyPartner: {
              Emoji: "",
                  TicketCategorys: {
                         ApplyPartner: "1034260174271164456"
                  },
                  Messages: {
                         Description: "",
                         Color: ""
                   },
                   Roles: [
                         {
                                id: "1032607174679076976",
                                name: "Bot Testers"
                         }
                   ]
           }
    },

    TicketOpenComponents: [
            {
                   label: "Claim Ticket",
                   value: "Claim-Ticket",
                   description: "Claim the ticket",
                   emoji: "961638540666621992"
            },     
            {
                label: "Ticket Control",
                value: "Ticket-Control",
                description: "Control the ticket",
                emoji: "1015822245966397510"
          },  
    ],
    
    TicketAdminComponents: [
       {
              label: "Claim Ticket",
              value: "AdminClaim-Ticket",
              description: "Claim the ticket",
              emoji: "961638540666621992"
       },     
       {
           label: "Ticket Control",
           value: "Ticket-Control",
           description: "Control the ticket",
           emoji: "1015822245966397510"
     },  
    ],

    TicketAdminComponentsRemove: [
       {
           label: "Ticket Control",
           value: "Ticket-Control",
           description: "Control the ticket",
           emoji: "1015822245966397510"
     },  
    ],

    TicketOptions: [
           {
               label: "Support Ticket",
               value: "Support-Ticket",
               description: "Open a Support Ticket",
               emoji: "1036083490292244493"
           },
           {
             label: "Report Ticket",
             value: "Report-Ticket",
             description: "Open a Report Ticket",
             emoji: "1019304492547715192"
          },
           {
             label: "Youtube Ticket",
             value: "Youtube-Ticket",
             description: "Open a YouTube Ticket ",
             emoji: "1036082562977775717"
          },
           {
             label: "Bot Shop Help",
             value: "BotShop-Ticket",
             description: "Open a Bot Shop Support Ticket",
             emoji: "1009502649365827605"
         },
         {
             label: "Claim Ticket",
             value: "Claim-Ticket",
             description: "Open a Claim Ticket",
             emoji: "1005732041549152337"
         },
       //   {
       //       label: "Apply Staff",
       //       value: "Apply-Ticket",
       //       description: "Open a Apply Staff Ticket",
       //       emoji: "1010018063497826415"
       //   },
       //   {
       //       label: "Apply Partner",
       //       value: "Partner-Ticket",
       //       description: "Open a Apply Partner Ticket",
       //       emoji: "961713747343314944"
       //   }
    ]
}