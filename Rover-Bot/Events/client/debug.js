module.exports = async (Rover, data) => {
    Rover.logger(require("colors").yellow(`:: ${data}`), { label: "Debug" })
}