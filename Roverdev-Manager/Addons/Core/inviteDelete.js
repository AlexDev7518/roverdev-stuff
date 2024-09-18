const InviteSystem = require("../../Databases/Schema/Invite-System");

module.exports = async (Roverdev ,invite) => {

  if (invite.guild.id !== "1081700920993259550") return

  Roverdev.invites.get(invite.guild.id).delete(invite.code);
        
  console.log(`Successfully Set Data.`)

  const channel = Roverdev.channels.cache.get("1053376920668086432")

  channel.send({
   content: `<:invites:1024130888205869096> ***Invite Got Deleted***\n> <a:Arrow:1020753364138594444> Code: **\`${invite.code}\`**\n> <a:Arrow:1020753364138594444> **Uses: \`${invite.uses}\`**\n> <a:Arrow:1020753364138594444> **Invite Guild: \`${invite.guild.name}\`**`
  })

  const findData = await  InviteSystem.findOne({ Code: invite.code })

  Roverdev.users.cache.get(findData.Author).send({
         content: `<:invites:1024130888205869096> ***Invite Got Deleted***\n> <a:Arrow:1020753364138594444> Code: **\`${invite.code}\`**\n> <a:Arrow:1020753364138594444> **Uses: \`${invite.uses}\`**\n> <a:Arrow:1020753364138594444> **Invite Guild: \`${invite.guild.name}\`**`
  })

  await InviteSystem.findOneAndDelete({ Code: invite.code })
}