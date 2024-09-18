module.exports = async (rover) => {
       let disabled = false

       let trys = 0

       setInterval(() => {
              if (disabled == true) {
                     let waiting = setInterval(function () {
                            if (disabled == false) {
                                   disabled = false

                                   rover.logger("[AUTOROLE - MEMBER ROLES] checking member's roles...")

                                   let array = []

                                   array.length = 0

                                   let i = 0
                                   let Roles = ["1112931500430725170", "1085505731698118737", "1095940988926697613", "1095941802390986812", "1112925030154764308", "1112925696067637258", "1095941808053301288", "1095941809055748226", "1095942288619880458", "1097673828022370465", "1095942287860707449", "1112935185021939772", "1112935282501754903"]

                                   rover.guilds.cache.get("846548733914906664").members.cache.forEach(m => {
                                          if (!m.roles.cache.has("1085505731698118737") && !m.user.bot) array.push(m)
                                   })

                                   setTimeout(() => {
                                          if (array.length < 1) return rover.logger(`[AUTOROLE - MEMBER ROLES] all roles are already synced with all members.`)

                                          if (array.length > 100) {
                                                 disabled = Boolean(true)
                                          }

                                          let addrole = setInterval(function () {

                                                 if (i == array.length) {
                                                        rover.logger(`[AUTOROLE - MEMBER ROLES] Successfully Synced all roles with all members.`)
                                                        disabled = false
                                                        return clearInterval(addrole)
                                                 }

                                                 if (rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).roles.cache.has("1112931956657762384") && !rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).roles.cache.has("1112932356697899079")) {
                                                        rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).roles.remove("1112931956657762384", "[AUTO MEMBER ROLES] - Removed Roles")
                                                        rover.logger(`[AUTOROLE - MEMBER ROLES] Successfully added Removed Ranking From ${rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).user.username}`)
                                                 }

                                                 if (rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).roles.cache.has("1085661877377441862")) {
                                                        i++
                                                        return rover.logger(`[AUTOROLE - MEMBER ROLES] Not giving roles, because user in Quarantine`)
                                                 }

                                                 rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).roles.add(Roles, "[AUTO MEMBER ROLES] - Adding Roles")
                                                 rover.logger(`[AUTOROLE - MEMBER ROLES] Successfully added roles to ${rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).user.username}`)
                                                 i++
                                          }, 1000);
                                   }, 3000);
                            }
                            if (disabled == true) {
                                   clearInterval(waiting)
                                   return rover.logger(`[AUTOROLE - MEMBER ROLES] System disabled.`)
                            }
                     }, 60000)
              } else if (disabled == false) {
                     rover.logger("[AUTOROLE - MEMBER ROLES] checking member's roles...")

                     let array = []
                     array.length = 0

                     let BotArray = []
                     BotArray.length = 0

                     let i2 = 0

                     let i = 0
                     let Roles = ["1112993277193494538", "1085505731698118737", "1095940988926697613", "1095941802390986812", "1112925030154764308", "1112925696067637258", "1095941808053301288", "1095941809055748226", "1095942288619880458", "1097673828022370465", "1095942287860707449", "1112935185021939772", "1112935282501754903"]


                     let BotRoles = ["1112923779534950493", "1112925694347980880"]

                     rover.guilds.cache.get("846548733914906664").members.cache.forEach(User => {

                            let RolesHadArray = []

                            Roles.forEach(m => {
                                   if (User.roles.cache.has(m)) RolesHadArray.push(true)
                            })

                            setTimeout(() => {
                                   if (RolesHadArray.length !== Roles.length && !User.user.bot) array.push(User)
                                   if (User.roles.cache.has("1112923779534950493")) array.push(User)
                                   // if (User.user.bot && !User.roles.cache.has("1112923779534950493")) array.push(User)
                            }, 3000);

                            //    let BotRolesHad = []

                            //       BotRoles.forEach(m => {
                            //           if (User.roles.cache.has(m) && User.user.bot) BotRolesHad.push(true)
                            //    })

                            //    setTimeout(() => {
                            //        if (BotRolesHad.length !== BotRoles.length) BotArray.push(User)
                            //     }, 3000);
                     })

                     setTimeout(() => {
                            if (array.length < 1) return rover.logger(`[AUTOROLE - MEMBER ROLES] all roles are already synced with all members.`)

                            if (array.length > 100) {
                                   disabled = Boolean(true)
                            }

                            let addrole = setInterval(function () {

                                   if (i == array.length) {
                                          rover.logger(`[AUTOROLE - MEMBER ROLES] Successfully Synced all roles with all members.`)
                                          disabled = false
                                          return clearInterval(addrole)
                                   }

                                   // if (rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).user.bot) {
                                   //        rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).roles.add(BotRoles, "[AUTO MEMBER ROLES] - Adding Roles")
                                   //        rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).roles.remove(Roles, "[AUTO MEMBER ROLES] - Removed Roles")
                                   //        rover.logger(`[AUTOROLE - BOT ROLES] Successfully added roles to ${rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).user.username}`)
                                   //        return i++
                                   // }

                                   if (rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).roles.cache.has("1112923779534950493")) {
                                          rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).roles.remove(BotRoles, "[AUTO MEMBER ROLES] - Removed Roles")
                                          rover.logger(`[AUTOROLE - MEMBER ROLES] Successfully  Removed Bot Roles From ${rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).user.username}`)
                                          return i++
                                   }

                                   if (rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).roles.cache.has("1112931956657762384") && !rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).roles.cache.has("1112932356697899079")) {
                                          rover.guilds.cache.get("846548733914906664").members.cache.get(array[i2].id).roles.remove("1112931956657762384", "[AUTO MEMBER ROLES] - Removed Roles")
                                          rover.logger(`[AUTOROLE - MEMBER ROLES] Successfully added Removed Ranking From ${rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).user.username}`)
                                   }


                                   if (rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).roles.cache.has("1085661877377441862")) {
                                          rover.logger(`[AUTOROLE - MEMBER ROLES] Not giving roles to ${rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).user.username}, because user in Quarantine`)
                                          return i++
                                   }

                                   rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).roles.add(Roles, "[AUTO MEMBER ROLES] - Adding Roles")
                                   rover.logger(`[AUTOROLE - MEMBER ROLES] Successfully added roles to ${rover.guilds.cache.get("846548733914906664").members.cache.get(array[i].id).user.username}`)
                                   i++
                            }, 1000);

                            //    if (BotArray.length < 1) return rover.logger(`[AUTOROLE - MEMBER ROLES] all roles are already synced with all bots.`)

                            //    if (BotArray.length > 100) {
                            //               disabled = Boolean(true)
                            //    }

                            //    let addrole1 = setInterval(function () {

                            //             if (i == BotArray.length) {
                            //                    rover.logger(`[AUTOROLE - MEMBER ROLES] Successfully Synced all roles with all bots.`)
                            //                    disabled = false
                            //                    return clearInterval(addrole1)
                            //             }

                            //             if (rover.guilds.cache.get("846548733914906664").members.cache.get(BotArray[i].id).roles.cache.has("1085661877377441862")) {
                            //               rover.logger(`[AUTOROLE - BOT ROLES] Not giving roles to ${rover.guilds.cache.get("846548733914906664").members.cache.get(BotArray[i].id).user.username}, because user in Quarantine`)
                            //              return i++
                            //       }

                            //             rover.guilds.cache.get("846548733914906664").members.cache.get(BotArray[i].id).roles.add(BotRoles, "[AUTO MEMBER ROLES] - Adding Roles")
                            //             rover.logger(`[AUTOROLE - BOT ROLES] Successfully added roles to ${rover.guilds.cache.get("846548733914906664").members.cache.get(BotArray[i].id).user.username}`)
                            //             i++
                            //    }, 1000);
                     }, 13000);
              }
       }, 60000)

}