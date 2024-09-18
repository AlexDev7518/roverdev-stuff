module.exports = async (client, channel) => {
           try {
            const data = client.TicketSystem.get(channel.guild.id, `${channel.id}`)

            client.TicketSystem.remove(
                channel.guild.id,
                channel.id,
                `${data.TicketSetup}.OpenTickets`
             )
             client.TicketSystem.delete(channel.guild.id, `${channel.id}`) 

             client.TicketSystem.delete(channel.guild.id, data.Owner)
           } catch {
                  return;
           }
}