const InviteSystem = require("../../Databases/Schema/Invite-System");

module.exports = async (Roverdev, invite) => {

  if (invite.guild.id !== "1081700920993259550") return

  Roverdev.invites.get(invite.guild.id).set(invite.code, invite.uses);

  console.log(`Successfully Set Data.`)

  const channel = Roverdev.channels.cache.get("1053334786971795517")

  channel.send({
   content: `<:invites:1024130888205869096> ***Invite Got Created By: \`${invite.inviter.tag}\`***\n> <a:Arrow:1020753364138594444> **Url:** https://discord.gg/${invite.code}\n> <a:Arrow:1020753364138594444> **Code: \`${invite.code}\`**\n> <a:Arrow:1020753364138594444> **Max Uses: \`${invite.maxUses}\`**\n> <a:Arrow:1020753364138594444> **Time Left: <t:${Math.floor(invite.expiresTimestamp/1000)}:R>**\n> <a:Arrow:1020753364138594444> **Created At: <t:${Math.floor(invite.createdTimestamp/1000)}:R>**\n> <a:Arrow:1020753364138594444> **Temp Invite: \`${invite.temporary}\`**\n> <a:Arrow:1020753364138594444> **Invite Channel: ${invite.channel}**\n> <a:Arrow:1020753364138594444> **Invite Guild:  \`${invite.guild.name}\`**`
  })

const user = Roverdev.users.cache.get(invite.inviterId)

user.send({
   content: `<:invites:1024130888205869096> ***Invite Got Created By: \`${invite.inviter.tag}\`***\n> <a:Arrow:1020753364138594444> **Url:** https://discord.gg/${invite.code}\n> <a:Arrow:1020753364138594444> **Code: \`${invite.code}\`**\n> <a:Arrow:1020753364138594444> **Max Uses: \`${invite.maxUses}\`**\n> <a:Arrow:1020753364138594444> **Time Left: <t:${Math.floor(invite.expiresTimestamp/1000)}:R>**\n> <a:Arrow:1020753364138594444> **Created At: <t:${Math.floor(invite.createdTimestamp/1000)}:R>**\n> <a:Arrow:1020753364138594444> **Temp Invite: \`${invite.temporary}\`**\n> <a:Arrow:1020753364138594444> **Invite Channel: ${invite.channel}**\n> <a:Arrow:1020753364138594444> **Invite Guild:  \`${invite.guild.name}\`**`
})

const database = await InviteSystem.create({ 
         Author: invite.inviterId,
         Code: invite.code
 })
 database.save()
}