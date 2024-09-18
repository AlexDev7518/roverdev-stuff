const fs = require('fs')
const {
  readdirSync
} = require("fs");
const colors = require("colors")

async function StartBot(client){
  client.login(client.config.Token).then((Started) => {
    client.logger(`Successfully Logged in to ${client.user.username}`.magenta, `Client Login`);
  })
  const files2 = require("fs").readdirSync('./Handlers')
  for (const file of files2) {
    require('./Handlers/'+file)(client)
  }
}
module.exports = {
    StartBot,
}