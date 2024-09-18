const { Events } = require("discord.js")
const { MainServerRoles } = require("../../Configuration/Staff-System/Roles")
const { LoggerServerRoles } = require("../../Configuration/Staff-System/Roles")
const Roles = require("../../Configuration/Staff-System/Roles")
const UseFullLinks = require("../../Databases/Schema/Staff-System/UseFullLinks")

module.exports = async (Roverdev) => {
      try {
          setInterval(() => {
               const MainGuild = Roverdev.guilds.cache.get("1081700920993259550")
               const LoggerGuild = Roverdev.guilds.cache.get("1023444407510368347")
               const StaffGuild = ""
               const HostingGuild = ""


               //  MainGuild.roles.cache.get(Roles.MainServerRoles.NewStaffMembers).members.forEach(async m => {
               //      let NewStaffMembers = []

               //        MainGuild.roles.cache.get(Roles.MainServerRoles.NewStaffMembers).members.forEach(async m => {
               //           NewStaffMembers.push(m.user.id)
               //       })

               //       const GetMemberLogger = LoggerGuild.members.cache.get(m.user.id)
               //       const GetMemberMain = MainGuild.members.cache.get(m.user.id)

               //      setTimeout(async () => {
               //           if (NewStaffMembers.includes(m.user.id)) {
               //                if (!GetMemberLogger.roles.cache.has(LoggerServerRoles.NewStaffMembers)) {
               //                     GetMemberLogger.roles.add(LoggerServerRoles.NewStaffMembers)
          
               //                     console.log(`Added: New Staff | To: ${Roverdev.users.cache.get(m.user.id).username} | ${m.user.id}`)
               //                  }
               //         } else if (!NewStaffMembers.includes(m.user.id)) {
               //           if (GetMemberLogger.roles.cache.has(LoggerServerRoles.NewStaffMembers)) {
               //                await GetMemberLogger.roles.remove(LoggerServerRoles.NewStaffMembers)
     
               //                console.log(`Added: New Staff | To: ${Roverdev.users.cache.get(m.user.id).username} | ${m.user.id}`)
               //             }
               //    }
               //      }, 2000);
               // })
          
              MainGuild.roles.cache.get(Roles.MainServerRoles.StaffTeam).members.forEach(async m => {

               const AlexDev = Roverdev.users.cache.find((m) => m.discriminator == "7518").id
               const Chauvin = Roverdev.users.cache.find((m) => m.discriminator == "4522").id

               let OwnerAndFounder = []
               let AdminTeam = []
               let ModerationTeam = []
               let StaffTeam = []
               let Helpers = []
               let BotCreators = []

               Roverdev.OwnerAndFounder = OwnerAndFounder
               Roverdev.AdminTeam = AdminTeam
               Roverdev.ModerationTeam = ModerationTeam
               Roverdev.StaffTeam = StaffTeam

               MainGuild.roles.cache.get(Roles.MainServerRoles.Helpers).members.forEach(async m => {
                    Helpers.push(m.user.id)
               })
               MainGuild.roles.cache.get("1058953018487361556").members.forEach(async m => {
                    BotCreators.push(m.user.id)
               })
               MainGuild.roles.cache.get(Roles.MainServerRoles.StaffTeam).members.forEach(async m => {
                      StaffTeam.push(m.user.id)
               })
               MainGuild.roles.cache.get(Roles.MainServerRoles.Moderator).members.forEach(async m => {
                    ModerationTeam.push(m.user.id)
               })
               MainGuild.roles.cache.get(Roles.MainServerRoles.HeadMod).members.forEach(async m => {
                    ModerationTeam.push(m.user.id)
               })
               MainGuild.roles.cache.get(Roles.MainServerRoles.Admin).members.forEach(async m => {
                    AdminTeam.push(m.user.id)
               })
               MainGuild.roles.cache.get(Roles.MainServerRoles.HeadAdmin).members.forEach(async m => {
                    AdminTeam.push(m.user.id)
               })
               MainGuild.roles.cache.get(Roles.MainServerRoles.CoManagement).members.forEach(async m => {
                    OwnerAndFounder.push(m.user.id)
               })
               MainGuild.roles.cache.get(Roles.MainServerRoles.Management).members.forEach(async m => {
                    OwnerAndFounder.push(m.user.id)
               })
               MainGuild.roles.cache.get(Roles.MainServerRoles.Founder).members.forEach(async m => {
                    OwnerAndFounder.push(m.user.id)
               })


               setTimeout(async () => {
                    const array = [AlexDev, Chauvin]

                    const GetMemberLogger = LoggerGuild.members.cache.get(m.user.id)
                    const GetMemberMain = MainGuild.members.cache.get(m.user.id)
          
                    if (!GetMemberLogger) return;

                    if (!GetMemberMain.roles.cache.has("920305535214047282") && GetMemberLogger.roles.cache.has("1078395775710674946")) {
                         return GetMemberLogger.roles.remove("1078395775710674946")
                    }

                    if (array.includes(m.user.id)) {
                         if (!GetMemberLogger.roles.cache.has(LoggerServerRoles.ServerFounders)) {
                              await GetMemberLogger.roles.add(LoggerServerRoles.ServerFounders)
     
                              console.log(`Added: Server Founder | To: ${Roverdev.users.cache.get(m.user.id).username} | ${m.user.id}`)
                           }
                       } 

                       if (Helpers.includes(m.user.id)) {
                         if (!GetMemberLogger.roles.cache.has(LoggerServerRoles.Helpers)) {
                              await GetMemberLogger.roles.add(LoggerServerRoles.Helpers)
     
                              console.log(`Added: Helpers | To: ${Roverdev.users.cache.get(m.user.id).username} | ${m.user.id}`)
                           }
                       }
     
                        if (GetMemberMain.roles.cache.has(MainServerRoles.StaffTeam)) {
                         if (!GetMemberLogger.roles.cache.has(LoggerServerRoles.StaffTeam)) {
                              await GetMemberLogger.roles.add(LoggerServerRoles.StaffTeam)
     
                              console.log(`Added: Staff Team | To: ${Roverdev.users.cache.get(m.user.id).username} | ${m.user.id}`)
                           }
                          } 

                          if (ModerationTeam.includes(m.user.id)) {
                              if (!GetMemberLogger.roles.cache.has(LoggerServerRoles.ModerationTeam)) {
                                   await GetMemberLogger.roles.add(LoggerServerRoles.ModerationTeam)
          
                                   console.log(`Added: Moderator  | To: ${Roverdev.users.cache.get(m.user.id).username} | ${m.user.id}`)
                                }
                           } else if (!ModerationTeam.includes(m.user.id)) {
                              if (GetMemberLogger.roles.cache.has(LoggerServerRoles.ModerationTeam)) {
                                   await GetMemberLogger.roles.remove(LoggerServerRoles.ModerationTeam)
                                   console.log(`Removed: Moderator  | From: ${Roverdev.users.cache.get(m.user.id).username} | ${m.user.id}`)
                                }
                           }

                           if (BotCreators.includes(m.user.id)) {
                              if (!GetMemberLogger.roles.cache.has("1068674719307530320")) {
                                   await GetMemberLogger.roles.add("1068674719307530320")
          
                                   console.log(`Added: Bot Creator  | To: ${Roverdev.users.cache.get(m.user.id).username} | ${m.user.id}`)
                                }
                           } else if (!BotCreators.includes(m.user.id)) {
                              if (GetMemberLogger.roles.cache.has("1068674719307530320")) {
                                   await GetMemberLogger.roles.remove("1068674719307530320")
                                   console.log(`Removed: Bot Creator  | From: ${Roverdev.users.cache.get(m.user.id).username} | ${m.user.id}`)
                                }
                           }
                          
                           if (AdminTeam.includes(m.user.id)) {
                              if (!GetMemberLogger.roles.cache.has(LoggerServerRoles.AdministrationTeam)) {
                                   await GetMemberLogger.roles.add(LoggerServerRoles.AdministrationTeam)
          
                                   console.log(`Added: Administation Team  | To: ${Roverdev.users.cache.get(m.user.id).username} | ${m.user.id}`)
                                }
                           } else if (!AdminTeam.includes(m.user.id)) {
                              if (GetMemberLogger.roles.cache.has(LoggerServerRoles.AdministrationTeam)) {
                                   await GetMemberLogger.roles.remove(LoggerServerRoles.AdministrationTeam)
                                   console.log(`Removed: Administration  | From: ${Roverdev.users.cache.get(m.user.id).username} | ${m.user.id}`)
                                }
                           }

                           if (OwnerAndFounder.includes(m.user.id)) {
                              if (!GetMemberLogger.roles.cache.has(LoggerServerRoles.OwnerAndFounders)) {
                                   await GetMemberLogger.roles.add(LoggerServerRoles.OwnerAndFounders)
          
                                   console.log(`Added: Owner and Founder  | To: ${Roverdev.users.cache.get(m.user.id).username} | ${m.user.id}`)
                                }
                           } else if (!OwnerAndFounder.includes(m.user.id)) {
                              if (GetMemberLogger.roles.cache.has(LoggerServerRoles.OwnerAndFounders)) {
                                   await GetMemberLogger.roles.remove(LoggerServerRoles.OwnerAndFounders)
                                   console.log(`Removed: Owner and Founders  | From: ${Roverdev.users.cache.get(m.user.id).username} | ${m.user.id}`)
                                }
                           }
               }, 2000);
              })
               LoggerGuild.members.cache.forEach(async m => {

                    if (m.user.id == "663442537222242306") return;

                    const GetMemberLogger = LoggerGuild.members.cache.get(m.user.id)
                    const GetMemberMain = MainGuild.members.cache.get(m.user.id)

                    if (!GetMemberMain) {
                         console.log(`${m.user.username} does not have staff anymore, now kicking`)

                         m.user.send({
                              content: `:hammer: ${m.user} just got kicked from Roverdev Logger Server, For not being in the staff team / Main server`
                         })
     
                         Roverdev.channels.cache.get("1023444408026284067").send({
                              content: `:hammer: ${m.user} just got kicked from Roverdev Logger Server, For not being in the staff team / Main server`
                         })
     
                         setTimeout(async () => {
                            await GetMemberLogger.kick({ reason: "Not Staff in the Main Server" })
                         }, 3000);
                    }

                    if (GetMemberMain) {
                              if (!GetMemberMain.roles.cache.has(MainServerRoles.StaffTeam) && !m.user.bot) {

                                   if (GetMemberMain.roles.cache.has("920305535214047282") && !GetMemberLogger.roles.cache.has("1078395775710674946")) {
                                          GetMemberLogger.roles.cache.forEach(m => {
                                                     GetMemberLogger.roles.remove(m.id).catch((e) => {})
                                          })

                                          return GetMemberLogger.roles.add("1078395775710674946")
                                   }

                                   if (GetMemberMain.roles.cache.has("920305535214047282") && GetMemberLogger.roles.cache.has("1078395775710674946")) return;

                                   if (!GetMemberMain.roles.cache.has(MainServerRoles.RoverCraftDevs)) { 
                                        // if (GetMemberMain.roles.cache.has(MainServerRoles.NewStaffMembers)) return
                                        console.log(`${m.user.username} does not have staff anymore, now kicking`)
     
                                        m.user.send({
                                             content: `:hammer: ${m.user} just got kicked from Roverdev Logger Server, For not being in the staff team / Main server`
                                        })
          
                                        Roverdev.channels.cache.get("1023444408026284067").send({
                                             content: `:hammer: ${m.user} just got kicked from Roverdev Logger Server, For not being in the staff team / Main server`
                                        })
                    
                                        setTimeout(async () => {
                                             await GetMemberLogger.kick({ reason: "Not Staff in the Main Server" })
                                          }, 3000);
                                   }
                              }
                    }
               })

               /**
                * @Check_If_added_role
                */
          }, 30000);
          /**
           *           Roverdev.on(Events.GuildMemberUpdate, async (newMember, oldMember) => {

               let options = {}
               if (options[newMember.guild.id]) {
                 options = options[newMember.guild.id]
               }

               if (typeof options.excludedroles === "undefined") options.excludedroles = new Array([])
               if (typeof options.trackroles === "undefined") options.trackroles = true

               const oldMemberRoles = [...oldMember.roles.cache.keys()];
               const newMemberRoles = [...newMember.roles.cache.keys()];
               const oldRoles = oldMemberRoles.filter(x => !options.excludedroles.includes(x)).filter(x => !newMemberRoles.includes(x))
               const newRoles = newMemberRoles.filter(x => !options.excludedroles.includes(x)).filter(x => !oldMemberRoles.includes(x))

               const rolechanged = (newRoles.length || oldRoles.length)

               if (rolechanged) {
                    let roleadded = ""
                    if (newRoles.length > 0) {
                      for (let i = 0; i < newRoles.length; i++) {
                        if (i > 0) roleadded += ", "
                        roleadded += `<@&${newRoles[i]}>`
                      }
                    }
                    let roleremoved = ""
                    if (oldRoles.length > 0) {
                      for (let i = 0; i < oldRoles.length; i++) {
                        if (i > 0) roleremoved += ", "
                        roleremoved += `<@&${oldRoles[i]}>`
                      }
                    }

                    if (roleadded.includes("1005978927421980702") ? roleadded.includes("1005978927421980702") : roleremoved.includes("1005978927421980702")) {
                           if (roleadded.includes("1005978927421980702")) {
                                 const data = await UseFullLinks.findOne({ Author: newMember.user.id })
                                 await Roverdev.channels.fetch("1040982279075401749").then(async ch => {
                                       ch.messages.fetch(data.MessageId).then(async msg => {
                                               msg.delete()
                                               await UseFullLinks.findOneAndDelete({ Author: newMember.user.id })
                                       })
                                 })
                           }
                           if (roleremoved.includes("1005978927421980702")) {
                              console.log(`Roles Added: ${roleadded ? roleadded : roleremoved} `)

                             Roverdev.channels.cache.get("1040982279075401749").send({
                                    content: `:wave: Welcome ${newMember} to ***${newMember.guild.name} Staff!*** Make sure to join these:\n> Roverdev Logger Server: https://discord.gg/N74828NTyq \n> Staff Server: https://discord.gg/qPFAYzYH4N\n> Rover Hosting Server: Soon.`
                             }).then(async (msg) => {
                                   const data = await UseFullLinks.create({
                                          Author: newMember.user.id,
                                          MessageId: msg.id
                                   })
                                   data.save()
                             })
                          }
                    }
               }
          })
           */
      } catch (error) {
            console.log(error)
      }
}