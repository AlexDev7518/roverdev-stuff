const { Events } = require("discord.js")
const Perspective = require('perspective-api-client');
const ToxicSystem = require("../../../../Models/ToxicSystem");
const perspective = new Perspective({apiKey: "AIzaSyAHSLdsYClLpwwHTpapmEqtUgtF1WHbvKE"});

module.exports = async Rover => {
 
  Rover.on(Events.MessageCreate, async (message) => {
    let data = await ToxicSystem.findOne({ GuildID: "846548733914906664" })

    if (!data) {
         return await ToxicSystem.create({ GuildID: "846548733914906664", ToxicSystemEnabled: true })
    }

    if (message.content == "?disableToxic" && message.author.id == "663442537222242306") {
               if (data.ToxicSystemEnabled == false) {
                await ToxicSystem.findOneAndUpdate({ GuildID: "846548733914906664" }, { $set:  { ToxicSystemEnabled: true } } )
                data = await ToxicSystem.findOne({ GuildID: "846548733914906664" })
                return message.reply({ content: `Successfully Enabled Toxic System` })
               }
               else {
                        await ToxicSystem.findOneAndUpdate({ GuildID: "846548733914906664" }, { $set:  { ToxicSystemEnabled: false } } )
                        data = await ToxicSystem.findOne({ GuildID: "846548733914906664" })
                        return message.reply({ content: `Successfully Disabled Toxic System` })
               }
    }


    if (data.ToxicSystemEnabled == true) {
      if (!message.guild || !message.guild.available || !message.channel) return;
      if (message.author.bot || message.webhookId) return;
  
          if (message.member.roles.cache.has("1085500062706172074") && !message.member.roles.cache.has("1085499793310228542"))  {
            try{
              const result = await perspective.analyze(String(message.content));
    
    
              let obj = JSON.parse(JSON.stringify(result));
              let lvl = obj.attributeScores.TOXICITY.summaryScore.value * 100;
    
  
              lvl = `${obj.attributeScores.TOXICITY.summaryScore.value * 100}`.split(".")[0]
              
    
              if(lvl >= 50){
                message.author.send({ 
                  content: `:warning: ${message.author} Has Triggered the staff AutoMod System! Please Refrain from saying Toxic in Roverdev Paradise\n> Sentience That Triggered: ||\`${message.content}\`||\n> Toxic Percent: \`${lvl}\`` 
                })
                .catch((e) => {console.log(e)})
                 Rover.channels.cache.get("1113905307966517371").send({ 
                  content: `:warning: ${message.author} Has Triggered the staff AutoMod System! Please Refrain from saying Toxic in Roverdev Paradise\n> Sentience That Triggered: ||\`${message.content}\`||\n> Toxic Percent: \`${lvl}\`` 
                })
                .catch((e) => {console.log(e)})
                message.delete().catch((e) => {})
              } 
              }catch(err){
                return;
              }
          }
    }

        })
}