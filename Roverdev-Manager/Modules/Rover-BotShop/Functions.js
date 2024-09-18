// Bot Creation

const { Roverdev } = require("../../main")
const { ShopServers } = require("./Server/Config")

async function DownloadFile(File, Destination) {
     return new Promise(async (res, rej) => {
      const { Client } = require('node-scp')

      Client({
            host: ShopServers[0].Host,
            port: ShopServers[0].Port,
            username: ShopServers[0].User,
            privateKey: ShopServers[0].Key
      }).then(client => {
               client.downloadFile(File, Destination).then((responce) => {
                console.log(require("colors").green(` [SHOP SYSTEM] Successfully Downloaded ${File} To ${Destination}`))
                  client.close()
                  return res(true)
               }).catch(error => {})
      })
     })
}
async function UploadFile(File, Destination) {
  return new Promise(async (res, rej) => {
    const { Client } = require('node-scp')

    Client({
          host: ShopServers[0].Host,
          port: ShopServers[0].Port,
          username: ShopServers[0].User,
          privateKey: ShopServers[0].Key
    }).then(client => {
             client.uploadFile(File, Destination).then((responce) => {
              console.log(require("colors").green(` [SHOP SYSTEM] Successfully Uploaded ${File} To ${Destination}`))
                client.close()
                return res(true)
             }).catch(error => {})
    })
   })
}
async function CreateFolder(Directory) {
  return new Promise(async (res, rej) => {
    const { Client } = require('node-scp')

    Client({
          host: ShopServers[0].Host,
          port: ShopServers[0].Port,
          username: ShopServers[0].User,
          privateKey: ShopServers[0].Key
    }).then(client => {
             client.mkdir(Directory).then((responce) => {
              console.log(require("colors").green(` [SHOP SYSTEM] Successfully Created ${Directory}`))
                client.close()
                return res(true)
             }).catch(error => {})
    })
   })
}
async function DeleteFolder(Directory) {
  return new Promise(async (res, rej) => {
    const { Client } = require('node-scp')

    Client({
          host: ShopServers[0].Host,
          port: ShopServers[0].Port,
          username: ShopServers[0].User,
          privateKey: ShopServers[0].Key
    }).then(client => {
             client.rmdir(Directory).then((responce) => {
              console.log(require("colors").green(` [SHOP SYSTEM] Successfully Deleted ${Directory}`))
                client.close()
                return res(true)
             }).catch(error => {})
    })
   })
}
async function EmptyFolder(Directory) {
  return new Promise(async (res, rej) => {
    const { Client } = require('node-scp')

    Client({
          host: ShopServers[0].Host,
          port: ShopServers[0].Port,
          username: ShopServers[0].User,
          privateKey: ShopServers[0].Key
    }).then(client => {
             client.emptyDir(Directory).then((responce) => {
              console.log(require("colors").green(` [SHOP SYSTEM] Successfully Cleared all files in ${Directory}`))
                client.close()
                return res(true)
             }).catch(error => {})
    })
   })
}
async function FolderExists(Directory) {
  return new Promise(async (res, rej) => {
    const { Client } = require('node-scp')

    Client({
          host: ShopServers[0].Host,
          port: ShopServers[0].Port,
          username: ShopServers[0].User,
          privateKey: ShopServers[0].Key
    }).then(client => {
             client.exists(Directory).then((responce) => {
                 if (responce) {
                  console.log(require("colors").green(` [SHOP SYSTEM] ${Directory} is already created on the vps!`))
                  client.close()
                  return res(true)
                 } else if (!responce) {
                  console.log(require("colors").red(` [SHOP SYSTEM] ${Directory} not created on the vps!`))
                  client.close()
                  return rej(false)
                 }
             })
    })
   })
}
async function downloadFolder(Folder, Destination) {
  return new Promise(async (res, rej) => {
    const { Client } = require('node-scp')

    Client({
          host: ShopServers[0].Host,
          port: ShopServers[0].Port,
          username: ShopServers[0].User,
          privateKey: ShopServers[0].Key
    }).then(client => {
             client.downloadDir(Folder, Destination).then((responce) => {
              console.log(require("colors").green(` [SHOP SYSTEM] Sucessfully Dowloaded ${Folder} to ${Destination}`))
                client.close()
                return res(true)
             }).catch(error => {})
    })
   })
}
async function UploadFolder(Folder, Destination) {
  return new Promise(async (res, rej) => {
    const { Client } = require('node-scp')

    Client({
          host: ShopServers[0].Host,
          port: ShopServers[0].Port,
          username: ShopServers[0].User,
          privateKey: ShopServers[0].Key
    }).then(client => {
             client.uploadDir(Folder, Destination).then((responce) => {
              console.log(require("colors").green(` [SHOP SYSTEM] Sucessfully Uploaded ${Folder} to ${Destination}`))
              client.close()
              return res(true)
             }).catch(error => {})
    })
   })
}

async function CreateRack(RackNumber, BotType) {
    return new Promise((res, rej) => {
      const Answers = []

      let FoldersCreate = [
             `/home/Shop/Service/${RackNumber}`,
             `/home/Shop/Service/${RackNumber}/Backups`,
             `/home/Shop/Service/${RackNumber}/Bots`,
             `/home/Shop/Service/${RackNumber}/Recovery`,
             `/home/Shop/Service/${RackNumber}/Bots`,
             `/home/Shop/Service/${RackNumber}/Bots/${BotType}`
      ]
    
    
      FoldersCreate.forEach(m => {
             const CreateFolders = setInterval(async function () {
                    await FolderExists(m).then((FolderTrue) => {
                           if (FolderTrue == true) {
                                  clearInterval(CreateFolders)
                                  return Answers.push(true)
                           }
                    }).catch((e) => {
                           CreateFolder(m).then((resResponce) => {
                                  if (resResponce == true) {
                                         clearInterval(CreateFolders)
                                         return Answers.push(true)
                                  }
                           })
                    })
             }, 1900)
        })
    
    
        const CheckAnswers = setInterval(async function () {
    
          if (Answers.length == FoldersCreate.length) {
                 clearInterval(CheckAnswers)

                 res(true)
                 
          }
        }, 100)
    })
}

async function StartBot(Folder, BotId, BotType) {
     return new Promise(async (res, rej) => {
      const { Client } = require('ssh2');

      const conn = new Client();
      conn.on('ready', () => {
        console.log('Client :: ready');
        conn.exec(`cd ${Folder}; pm2 start StartBot.js --name Bot-${BotId} --namespace ${BotType}; pm2 save --force`, (err, stream) => {
          if (err) rej(false);
          stream.on('close', (code, signal) => {
            console.log('Client :: Closed');
            conn.end();
            console.log(require("colors").green(` [SHOP SYSTEM] Sucessfully Started ${BotId} Shop Bot!`))
            return res(true)
          }).on('data', (data) => {
          }).stderr.on('data', (data) => {
          });
        });
      }).connect({
        host: ShopServers[0].Host,
        port: ShopServers[0].Port,
        username: ShopServers[0].User,
        privateKey: ShopServers[0].Key
      });
     })
}

async function RunCommand(Command) {
  return new Promise(async (res, rej) => {
   const { Client } = require('ssh2');

   const conn = new Client();
   conn.on('ready', () => {
     console.log('Client :: ready');
     conn.exec(Command, (err, stream) => {
       if (err) rej(false);
       stream.on('close', (code, signal) => {
        console.log('Client :: Closed');
         conn.end();
         console.log(require("colors").green(` [SHOP SYSTEM] Successfully Ran ${Command}!`))
         return res(true)
       }).on('data', (data) => {
       }).stderr.on('data', (data) => {
             console.log(data)
       });
     });
   }).connect({
     host: ShopServers[0].Host,
     port: ShopServers[0].Port,
     username: ShopServers[0].User,
     privateKey: ShopServers[0].Key
   });
  })
}

async function AddBotOwner(Bot, Botid ,Owner) {
  console.log(`Signal`)
  return new Promise(async (res, rej) => {
    const { Client } = require('node-scp')

    Client({
          host: ShopServers[0].Host,
          port: ShopServers[0].Port,
          username: ShopServers[0].User,
          privateKey: ShopServers[0].Key
    }).then(client => {
              require("child_process").exec(`mkdir /home/Roverdev-Manager/Modules/Downloads/Bot-${Botid}`)
              setTimeout(() => {
                client.downloadFile(`${Bot}/config/config.json`, `/home/Roverdev-Manager/Modules/Downloads/Bot-${Botid}/config.json`).then((responce) => {
                  console.log(require("colors").green(` [SHOP SYSTEM] Sucessfully Downloaded ${Bot}/config/config.json to /home/Roverdev-Manager/Modules/Downloads/Bot-${Botid}/config.json`))
                  client.close()

                  setTimeout(() => {
                  let Status = require(`/home/Roverdev-Manager/Modules/Downloads/Bot-${Botid}/config.json`)

                  if (Status.Owners.includes(Owner)) {
                           require("child_process").exec(`rm -rf /home/Roverdev-Manager/Modules/Downloads/Bot-${Botid}`)
                           return rej(`Seems this owner is already there!`)
                  }

                  Status.Owners.push(Owner)
                  require("fs").writeFileSync(`/home/Roverdev-Manager/Modules/Downloads/Bot-${Botid}/config.json`, JSON.stringify(Status, null, 3), (err) => {
                         if (err) {
                                return console.log(err)
                         }
                  })

                  Client({
                    host: ShopServers[0].Host,
                    port: ShopServers[0].Port,
                    username: ShopServers[0].User,
                    privateKey: ShopServers[0].Key
              }).then(client => {
                client.uploadFile(`/home/Roverdev-Manager/Modules/Downloads/Bot-${Botid}/config.json`, `${Bot}/config/config.json`).then((responce) => {
                  console.log(require("colors").green(` [SHOP SYSTEM] Sucessfully Uploaded ${Bot}/config/config.json From /home/Roverdev-Manager/Modules/Downloads/Bot-${Botid}/config.json`))
                  client.close()

                  require("child_process").exec(`rm -rf /home/Roverdev-Manager/Modules/Downloads/Bot-${Botid}`)

                  return res(true)
                   })
              })
                  }, 1000);
    
                 }).catch(error => {})
              }, 1000);
       })
   })
}
async function RemoveBotOwner(Bot, Botid ,Owner) {
  console.log(`Signal`)
  return new Promise(async (res, rej) => {
    const { Client } = require('node-scp')

    Client({
          host: ShopServers[0].Host,
          port: ShopServers[0].Port,
          username: ShopServers[0].User,
          privateKey: ShopServers[0].Key
    }).then(client => {
              require("child_process").exec(`mkdir /home/Roverdev-Manager/Modules/Downloads/Bot-${Botid}`)
              setTimeout(() => {
                client.downloadFile(`${Bot}/config/config.json`, `/home/Roverdev-Manager/Modules/Downloads/Bot-${Botid}/config.json`).then((responce) => {
                  console.log(require("colors").green(` [SHOP SYSTEM] Sucessfully Downloaded ${Bot}/config/config.json to /home/Roverdev-Manager/Modules/Downloads/Bot-${Botid}/config.json`))
                  client.close()

                  setTimeout(() => {
                  let Status = require(`/home/Roverdev-Manager/Modules/Downloads/Bot-${Botid}/config.json`)

                  if (!Status.Owners.includes(Owner)) {
                           require("child_process").exec(`rm -rf /home/Roverdev-Manager/Modules/Downloads/Bot-${Botid}`)
                           return rej(`Seems this owner not there!`)
                  }

                  let array1 = Status.Owners
                  const index1 = array1.indexOf(Owner);
                  const x1 = array1.splice(index1, 1);

                  Status.Owners = array1
                  require("fs").writeFileSync(`/home/Roverdev-Manager/Modules/Downloads/Bot-${Botid}/config.json`, JSON.stringify(Status, null, 3), (err) => {
                         if (err) {
                                return console.log(err)
                         }
                  })

                  Client({
                    host: ShopServers[0].Host,
                    port: ShopServers[0].Port,
                    username: ShopServers[0].User,
                    privateKey: ShopServers[0].Key
              }).then(client => {
                client.uploadFile(`/home/Roverdev-Manager/Modules/Downloads/Bot-${Botid}/config.json`, `${Bot}/config/config.json`).then((responce) => {
                  console.log(require("colors").green(` [SHOP SYSTEM] Sucessfully Uploaded ${Bot}/config/config.json From /home/Roverdev-Manager/Modules/Downloads/Bot-${Botid}/config.json`))
                  client.close()

                  require("child_process").exec(`rm -rf /home/Roverdev-Manager/Modules/Downloads/Bot-${Botid}`)

                  return res(true)
                   })
              })
                  }, 1000);
    
                 }).catch(error => {})
              }, 1000);
       })
   })
}
async function BackupCreate(Bot) {}
async function BackupDelete(Bot) {}
async function BackupLoad(Bot) {}
async function BackupTotal(Bot) {}
async function Botinfo(Bot) {}
async function changeStatus(Bot, NewStatus, StatusType) {}
async function configedit(Bot, Value) {}
async function DeleteBot(Bot) {}
async function EmbedEdit(Bot, Value, Type) {}
async function ForceDeleteBot(Bot) {}
async function ForceStartBot(Bot) {}
async function ForceStopBot(Bot) {}
async function MoveBot(Bot, NewBotType) {}
async function MoveHost(Bot, NewHost) {}
async function PremiumBot(Bot) {}
async function RecoverBotHost(Bot) {}
async function StartShopBot(Bot) {
  return new Promise(async (res, rej) => {
    const { Client } = require('ssh2');

    const conn = new Client();
    conn.on('ready', () => {
      console.log('Client :: ready');
      conn.exec(`pm2 start Bot-${Bot}; pm2 save --force`, (err, stream) => {
        if (err) rej(false);
        stream.on('close', (code, signal) => {
          console.log('Client :: Closed');
          conn.end();
          console.log(require("colors").green(` [SHOP SYSTEM] Sucessfully Started ${Bot} Shop Bot!`))
          return res(true)
        }).on('data', (data) => {
        }).stderr.on('data', (data) => {
        });
      });
    }).connect({
      host: ShopServers[0].Host,
      port: ShopServers[0].Port,
      username: ShopServers[0].User,
      privateKey: ShopServers[0].Key
    });
   })
}
async function StopShopBot(Bot) {
  return new Promise(async (res, rej) => {
    const { Client } = require('ssh2');

    const conn = new Client();
    conn.on('ready', () => {
      console.log('Client :: ready');
      conn.exec(`pm2 stop Bot-${Bot}; pm2 save --force`, (err, stream) => {
        if (err) rej(false);
        stream.on('close', (code, signal) => {
          console.log('Client :: Closed');
          conn.end();
          console.log(require("colors").green(` [SHOP SYSTEM] Sucessfully Stopped ${Bot} Shop Bot!`))
          return res(true)
        }).on('data', (data) => {
        }).stderr.on('data', (data) => {
        });
      });
    }).connect({
      host: ShopServers[0].Host,
      port: ShopServers[0].Port,
      username: ShopServers[0].User,
      privateKey: ShopServers[0].Key
    });
   })
}




module.exports = {
   DownloadFile,
   UploadFile,
   CreateFolder,
   DeleteFolder,
   EmptyFolder,
   FolderExists,
   downloadFolder,
   UploadFolder,
   StartBot,
   RunCommand,

   CreateRack,
   RemoveBotOwner,



   AddBotOwner,
   BackupCreate,
   BackupDelete,
   BackupLoad,
   BackupTotal,
   Botinfo,
   changeStatus,
   configedit,
   DeleteBot,
   EmbedEdit,
   ForceDeleteBot,
   ForceStartBot,
   ForceStopBot,
   MoveBot,
   MoveHost,
   PremiumBot,
   RecoverBotHost,
   StartShopBot,
   StopShopBot
}



