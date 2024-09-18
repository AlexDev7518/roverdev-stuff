const { Events, PermissionFlagsBits } = require("discord.js");
const AntiSpam = require("../../Databases/Schema/AntiSpam");
const Ranking = require("../../Databases/Schema/Ranking/Ranking");
const TotalCoins = require("../../Databases/Schema/RoverCoins/TotalCoins");
const usersMap = new Map();
const LIMIT = 4;
const DIFF = 4000;
module.exports = async Roverdev => {
       Roverdev.on(Events.MessageCreate, async message => {
        if(message.author.bot) return;
        if (!message.guild) return;
        if (message.member.permissions.has(PermissionFlagsBits.Administrator)) return;

    
        if(usersMap.has(message.author.id)) {
            const userData = usersMap.get(message.author.id);
            const { lastMessage, timer } = userData;
            const difference = message.createdTimestamp - lastMessage.createdTimestamp;
            let msgCount = userData.msgCount;
    
            if(difference > DIFF) {
                clearTimeout(timer);
                userData.msgCount = 1;
                userData.lastMessage = message;
                userData.timer = setTimeout(() => {
                    usersMap.delete(message.author.id);
                }, 100);
                usersMap.set(message.author.id, userData)
            }
            else {
                ++msgCount;
                if(msgCount === LIMIT) {


                    message.channel.bulkDelete(LIMIT);

                    let messages = await Ranking.findOne({ Author: message.author.id })

                    if (!messages) {
                           const data = await Ranking.create({
                                 Author: message.author.id,
                           })
                           data.save()
               
                           messages = await Ranking.findOne({ Author: message.author.id })
                    }


                    let SpamMessagesData = `${Number(messages.SpamMessages) + Number(LIMIT)}`
                    let AllMessagesData = `${Number(messages.AllMessages)-Number(LIMIT)}`

                    if (SpamMessagesData.includes("-")) SpamMessagesData = Number(0)
                    if (AllMessagesData.includes("-")) AllMessagesData = Number(0)

                    await Ranking.findOneAndUpdate({ Author: message.author.id }, { $set: {
                          SpamMessages: SpamMessagesData,
                          AllMessages: AllMessagesData
                    }})

                    const totalCoins = 10 * LIMIT

                    let coins = await TotalCoins.findOne({ Author: message.author.id })

                    if (!coins) {
                         const data = await TotalCoins.create({
                               Author: message.author.id
                         })
                         data.save()
                
                         coins = await TotalCoins.findOne({ Author: message.author.id })
                    }

                    await TotalCoins.findOneAndUpdate({ Author: message.author.id }, { $set: { RankingCoins: Number(coins.RankingCoins)-Number(totalCoins) } })

                    setTimeout(async () => {
                        let data = await AntiSpam.findOne({ Author: message.author.id })

                        if (!data) {
                             const data1 = await AntiSpam.create({
                                  Author: message.author.id
                             })   
                             data1.save()
     
                             data = await AntiSpam.findOne({ Author: message.author.id })
                        }
     
                        await AntiSpam.findOneAndUpdate({ Author: message.author.id }, { $set: { SpamWarnings: Number(data.SpamWarnings) + 1 } })
                        data = await AntiSpam.findOne({ Author: message.author.id })
     
                        const ms = require("ms")
                        let mutetime;
                        try {
                          mutetime = ms("9min");
                        } catch (e) {
                          mutetime = ms("9min")
                        }

                        const duration = Date.now() + mutetime
     
                        if (data.SpamWarnings == 2) {
                              message.member.timeout(mutetime, "Spamming to much!")
     
                             return message.channel.send({ content: `${message.author} has been timed out for spamming to much! (Duration: <t:${Math.floor(duration/1000)}:R>)` })
                        }

                        if (data.SpamWarnings == 4) {
                                message.member.kick("Spamming after 4 warnings!")
                                return message.channel.send({ content: `${message.author} has been kicked for spamming to much!` })
                        }
    
                        message.channel.send(`<@${message.author.id}> :warning: Spamming in this channel is forbidden. (Please Stop or you will be timed out)`);
                    }, 120);


                } else {
                    userData.msgCount = msgCount;
                    usersMap.set(message.author.id, userData);

                    setTimeout(() => {
                       usersMap.delete(message.author.id) 
                    }, DIFF);
                }
            }
        }
        else {
            usersMap.set(message.author.id, {
                msgCount: 1,
                lastMessage : message,
            });
        }
       })
}