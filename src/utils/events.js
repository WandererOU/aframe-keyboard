function validateKeyboardInput(e, type) {
  let inputEvent;
  const ignoredKeys = new Set([
    83, // Shift
    67, // Caps Lock
    77, // Meta key (Mac)
    70, // F1 ~ F12
  ]);
  if (type === 'vr') {
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
        AFK.template.toggleActiveMode('shift');
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
  } else {
    const code = e.key.charCodeAt(0);
    console.log(code);
    if (ignoredKeys.has(code)) return;
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
  }
};

module.exports = validateKeyboardInput;
