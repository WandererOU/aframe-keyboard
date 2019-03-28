/* global AFRAME, AFK */
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('a-keyboard', {
  schema: {
    audio: {default: false}, // Only if adapter supports audio
    color: {default: '#000'},
    dismissable: {default: true},
    font: {default: 'monoid'},
    fontSize: {default: '0.35'},
    locale: {default: 'en'},
    model: {default: ''},
    verticalAlign: {default: 'center'},
  },

  init: function() {
    AFK.template.draw({...this.data, el: this.el});
    this.attachEventListeners();
  },

  attachEventListeners: function() {
    window.addEventListener('keydown', this.handleKeyboardPress);
    this.el.addEventListener('click', this.handleKeyboardVR);
  },

  removeEventListeners: function() {
    window.removeEventListener('keydown', this.handleKeyboardPress);
    this.el.removeEventListener('click', this.handleKeyboardVR);
  },

  handleKeyboardPress: function(e) {
    let inputEvent;
    const code = e.key.charCodeAt(0);
    switch (e.keyCode) {
      case 9: // tab
        inputEvent = new CustomEvent('a-keyboard-update', {detail: {code: e.keyCode, value: '\t'}});
        document.dispatchEvent(inputEvent);
        break;
      case 8: // backspace
        inputEvent = new CustomEvent('a-keyboard-update', {detail: {code: e.keyCode, value: ''}});
        document.dispatchEvent(inputEvent);
        break;
      case 13: // enter
        inputEvent = new CustomEvent('a-keyboard-update', {detail: {code: e.keyCode, value: '\n'}});
        document.dispatchEvent(inputEvent);
        break;
      case 16: // shift
        break;
      case 18: // alt
        break;
      case 27: // esc
        if (this.dismissable) {
          inputEvent = new CustomEvent('a-keyboard-update', {detail: {code: e.keyCode, value: ''}});
          document.dispatchEvent(inputEvent);
        }
        break;
      case 32: // space
        inputEvent = new CustomEvent('a-keyboard-update', {detail: {code: e.keyCode, value: ' '}});
        document.dispatchEvent(inputEvent);
        break;
      default:
        inputEvent = new CustomEvent('a-keyboard-update', {detail: {code, value: e.key}});
        document.dispatchEvent(inputEvent);
        break;
    }

    // Artificially trigger keypress events
    const key = document.querySelector(`#a-keyboard-${code}`) || document.querySelector(`#a-keyboard-${e.keyCode}`);
    if (key) {
      key.dispatchEvent(new Event('mousedown'));
      setTimeout(function() {
        key.dispatchEvent(new Event('mouseleave'));
      }, 80);
    }
  },

  handleKeyboardVR: function(e) {
    let inputEvent;
    const value = document.querySelector(`#${e.target.id}`).getAttribute('value');
    const code = document.querySelector(`#${e.target.id}`).getAttribute('key-code');
    switch (code) {
      case '13': // enter
        inputEvent = new CustomEvent('a-keyboard-update', {detail: {code, value: '\n'}});
        document.dispatchEvent(inputEvent);
        break;
      case '8': // backspace
        inputEvent = new CustomEvent('a-keyboard-update', {detail: {code: 8, value: ''}});
        document.dispatchEvent(inputEvent);
        break;
      case '9': // tab
        inputEvent = new CustomEvent('a-keyboard-update', {detail: {code, value: '\t'}});
        document.dispatchEvent(inputEvent);
        break;
      case '16': // shift
        AFK.template.toggleActiveMode();
        break;
      case '32': // space
        inputEvent = new CustomEvent('a-keyboard-update', {detail: {code, value: ' '}});
        document.dispatchEvent(inputEvent);
        break;
      default:
        inputEvent = new CustomEvent('a-keyboard-update', {detail: {code, value}});
        document.dispatchEvent(inputEvent);
        break;
    }
  },

  remove: function() {
    this.removeEventListeners();
  },
});
