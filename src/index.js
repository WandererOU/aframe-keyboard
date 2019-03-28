require('./components/aframe-keyboard');
require('./components/keyboard-button');
const KeyboardTemplate = require('./keyboardTemplate');

const keyboard = {};
keyboard.mode = 'normal';
keyboard.template = new KeyboardTemplate();

module.exports = window.AFK = keyboard;
