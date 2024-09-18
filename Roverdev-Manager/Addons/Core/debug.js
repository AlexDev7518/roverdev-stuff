module.exports = async (Roverdev, data) => {
  Roverdev.logger.info(require("colors").yellow(`:: ${data}`), { label: "Debug" })
}