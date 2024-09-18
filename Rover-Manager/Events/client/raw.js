module.exports = async (client, d) => {
       setTimeout(() => {
         client.manager.updateVoiceState(d)
       }, 1000);
}