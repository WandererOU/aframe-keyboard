/* global AFRAME, AFK */
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('keyboard-button', {
  init: function() {
    const el = this.el;
    const self = this;
    el.addEventListener('mousedown', function() {
      el.setAttribute('material', 'opacity', '0.7');
    });

    el.addEventListener('mouseup', function() {
      el.setAttribute('material', 'opacity', self.isMouseEnter ? '0.4' : '0');
    });

    el.addEventListener('mouseenter', function() {
      el.setAttribute('material', 'opacity', '0.4');
      self.isMouseEnter = true;
    });

    el.addEventListener('mouseleave', function() {
      el.setAttribute('material', 'opacity', '0');
      self.isMouseEnter = false;
    });
  },
});

AFRAME.registerComponent('a-keyboard', {
  schema: {
    dismissable: {default: true},
    model: {default: ''},
    font: {default: 'monoid'},
    fontSize: {default: '0.35'},
    verticalAlign: {default: 'center'},
    color: {default: '#000'},
    locale: {default: 'en'},
    audio: {default: false}, // Only if adapter supports audio
  },

  init: function() {
    const options = {};
    for (option in this.data) {
      options[option] = this.data[option];
    }
    AFK.template.draw({...options, el: this.el});
    this.attachEventListeners();
  },

  attachEventListeners: function() {
    window.addEventListener('keydown', this.handleKeyboardPress);
    document.querySelector('#keyboard').addEventListener('click', this.handleKeyboardVR);
  },

  removeEventListeners: function() {
    window.removeEventListener('keydown', this.handleKeyboardPress);
    if (document.querySelector('#keyboard')) {
      document.querySelector('#keyboard').removeEventListener('click', this.handleKeyboardVR);
    }
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
