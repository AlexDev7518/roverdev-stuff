const { client } = require("../Rover-Manager")


const TicketCategorys = {
    "TicketCategoryId": "1040952183375532152",
    "CreationId": "1050171963273904148",
    "TicketBotsId": "1040952287297814548",
    "ClosedId": "1040996273546866708", 
}
 

async function TicketCategory (channel, client){

    const TicketCategoryId = client.channels.cache.get(TicketCategorys.TicketCategoryId)

    if(TicketCategoryId && TicketCategoryId.children.cache.size < 50) {
        await channel.setParent(TicketCategoryId.id).catch(()=>{});
    } 
}
async function CreationCategory (client, channel){

    const CreationId = client.channels.cache.get(TicketCategorys.CreationId)

    if(CreationId && CreationId.children.cache.size < 50) {
        await channel.setParent(CreationId.id, {lockPermissions:true}).catch(()=>{});
    } 
}
async function TicketBotsCategory (client, channel){

    const TicketBotsId = client.channels.cache.get(TicketCategorys.TicketBotsId)

    if(TicketBotsId && TicketBotsId.children.cache.size < 50) {
        await channel.setParent(TicketBotsId.id, {lockPermissions:true}).catch(()=>{});
    } 
}
async function ClosedCategory (client, channel){

    const ClosedId = client.channels.cache.get(TicketCategorys.ClosedId)

    if(ClosedId && ClosedId.children.cache.size < 50) {
        await channel.setParent(ClosedId.id, {lockPermissions:true}).catch(()=>{});
    }
}

module.exports = {
    TicketCategory,
    CreationCategory,
    TicketBotsCategory,
    ClosedCategory
}