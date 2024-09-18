const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActionRow, Collection } = require("discord.js");
const { EmbedColor } = require("../../Configuration/EmbedConfig");
const InvitedBy = require("../../Databases/Schema/InvitedBy");
const InviteTracker = require("../../Databases/Schema/InviteTracker");
const TotalCoins = require("../../Databases/Schema/RoverCoins/TotalCoins");


module.exports = async (Roverdev,member) => {


    const guild = Roverdev.guilds.cache.get("1081700920993259550")

         if (member.user.bot) return;
         if (member.guild.id !== "1081700920993259550") return

       const WelcomeChannel = Roverdev.channels.cache.get("935190175510835290")
       const WelcomeChannel1 = Roverdev.channels.cache.get("1080740198045990992")


       const Channel = Roverdev.channels.cache.get("935190175510835290")
       const Channel1 = Roverdev.channels.cache.get("1080740198045990992")

           try {

            const res = await guild.fetchVanityData().catch(() => {}); 


            const roles = ["920292442903822346",  "920292447194587136", "939382025738149889", "939377757253664810", "939388900877672449", "939390801912406046", "939395049215623219", "1075665800746246174", "1075665930849361971"]

            member.roles.add(roles)


            if (res.uses > Roverdev.VanityUses) {

                const res1 = await guild.fetchVanityData().catch(() => {});
                Roverdev.VanityUses = res1.uses

                WelcomeChannel.send({ content: `<a:MemberJoinedGuild:1080740947685539911> Welcome ${member} to \`${member.guild.name}\`\n> Invited Using: \`discord.gg/${res.code}\` - Uses: \`${res.uses}\`` })
                return WelcomeChannel1.send({ content: `<a:MemberJoinedGuild:1080740947685539911> Welcome ${member} to \`${member.guild.name}\`\n> Invited Using: \`discord.gg/${res.code}\` - Uses: \`${res.uses}\`` })
      
            }

            const newInvites = await member.guild.invites.fetch()
            // This is the *existing* invites for the guild.
            const oldInvites = Roverdev.invites.get(member.guild.id);
            // Look through the invites, find the one for which the uses went up.
            const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));
            // This is just to simplify the message being sent below (inviter doesn't have a tag property)
            const inviter = await Roverdev.users.fetch(invite.inviter.id);

            const DataAlive = await InviteTracker.findOne({ Author: inviter.id })

            if (!DataAlive) {
                const data = await InviteTracker.create({
                      Author: inviter.id,
                      Fakes: 0,
                      Leaves: [],
                      Joins: 0
               })
               data.save()
            }

            setTimeout(async () => {
                const data2 = await InvitedBy.create({
                      Author: member.user.id,
                      InvitedBy: inviter.id
               })
               data2.save()

               const joins = await InviteTracker.findOne({ Author: inviter.id })

               const Joined = joins.Joins

               const fakes = joins.Fakes

               if (joins.Leaves.includes(member.user.id)) {
                     await  InviteTracker.findOneAndUpdate({ Author: inviter.id }, { $set: { Fakes: fakes + 1 } })      
                } else if (!joins.Leaves.includes(member.user.id)) {
                      await InviteTracker.findOneAndUpdate({  Author: inviter.id }, { $set: { Joins: Joined + 1 }})

                      let coins = await require("../../Databases/Schema/RoverCoins/TotalCoins").findOne({ Author: inviter.id })

                      if (!coins) {
                           const data = await require("../../Databases/Schema/RoverCoins/TotalCoins").create({
                                 Author: inviter.id
                           })
                           data.save()
                  
                           coins = await require("../../Databases/Schema/RoverCoins/TotalCoins").findOne({ Author: inviter.id })
                      }
                  
                      await require("../../Databases/Schema/RoverCoins/TotalCoins").findOneAndUpdate({ Author: inviter.id }, { $set: { InviteCoins: Number(coins.InviteCoins) + 200 } })
                }


               const data1 = await InviteTracker.findOne({ Author: inviter.id })

               Roverdev.invites.set(member.guild.id, new Collection(newInvites.map((invite) => [invite.code, invite.uses])));

               setTimeout(async () => {

                  WelcomeChannel.send({ content: `<a:MemberJoinedGuild:1080740947685539911> Welcome ${member} to \`${member.guild.name}\`\n> Invited Using: \`${invite.code}\` - Uses: \`${invite.uses}\` - By: \`${inviter.tag}\`\n> Invites:  \`${data1.Joins}\`  |  Fakes: \`${data1.Fakes}\`  | Leaves: \`${data1.Leaves.length}\`` })
                  return WelcomeChannel1.send({ content: `<a:MemberJoinedGuild:1080740947685539911> Welcome ${member} to \`${member.guild.name}\`\n> Invited Using: \`${invite.code}\` - Uses: \`${invite.uses}\` - By: \`${inviter.tag}\`\n> Invites:  \`${data1.Joins}\`  |  Fakes: \`${data1.Fakes}\`  | Leaves: \`${data1.Leaves.length}\`` })

            }, 1500);   
            }, 1500);

         } catch (error) {
            console.log(error)
            try {

                  WelcomeChannel.send({ content: `<a:MemberJoinedGuild:1080740947685539911> Welcome ${member} to \`${member.guild.name}\`\n> Joined From: \`Discord Server Discovery\`` })
                  WelcomeChannel1.send({ content: `<a:MemberJoinedGuild:1080740947685539911> Welcome ${member} to \`${member.guild.name}\`\n> Joined From: \`Discord Server Discovery\`` })
            } catch (error) {
                 
            }
           }
}