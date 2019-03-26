require('./components/aframe-keyboard')
var KeyboardTemplate = require('./keyboardTemplate')

let keyboard = {}

keyboard.mode = 'normal'
keyboard.template = new KeyboardTemplate()

module.exports = window.AFK = keyboard