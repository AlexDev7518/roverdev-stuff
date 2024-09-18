module.exports = {
    PrefixConfiguration: {},
    Settings: {},

   CommandRun: async (Roverdev, message, args, executor) => {
        /**
 * __**Hello dear @[RST] Staff Team , here you can find every important rules for you as a staff member here on Rover!**__

**Ticket Rules:**
`1.` Be respectful to the users, help them out if they have questions, if you don't know an answer, just ask in #┣👥│staff-chat
`2.` Be serious in tickets, don't always react with "?", "lmfao", "kekw", "xD" or other things, it is ok sometimes, but not the entire time
`3.` If multiple staff members claimed the ticket at the same time, the first claim message the bot sent, it the one who can handle this ticket **(you can claim the ticket again, when the staff member before you or the one who opened the ticket, don't respons within 20mins, you can ask / write / help there.)**
`4.` Write full sentences and not every single word on its own
 */


    message.channel.send({
           content: `
 __***Hello dear <@&1005978927421980702> , here you can find every important rules for you as a staff member here on ${message.guild.name}!***__\n

\`1.\` Be respectful to the users, help them out if they have questions, if you don't know an answer, just ask in <#1005958548699742348>
\`2.\` Be serious in tickets, don't always react with "?", "lmfao", "kekw", "xD" or other things, it is ok sometimes, but not the entire time
\`3.\` If multiple staff members claimed the ticket at the same time, the first claim message the bot sent, it the one who can handle this ticket **(you can claim the ticket again, when the staff member before you or the one who opened the ticket, don't respons within 20mins, you can ask / write / help there.)**
\`4.\` Write full sentences and not every single word on its own
\`5.\` Don't Be Toxic In Chat and Just Enjoy Your TIme
\`7.\` Have Any Questions? Ask in Staff Chat
\n\n
**Holiday Rules**
> You aren't allowed to chat, nor handle tickets
> You aren't allowed to chat in other servers, this will be a false holiday and you will get **Demoted**
> You need to come back at work after [DATE]
> Don't show too much activity on Discord, if you're on holiday.
> Don't React to any message with Emojis / Etc. Holiday Means Holiday.
> Your holiday should be atleast **over '12' Hours**
`})


   }
}