function validateKeyboardInput(e, type) {
  let inputEvent;
  const ignoredKeys = new Set([
    16, // Shift
    17, // Ctrl
    18, // Alt
    20, // Caps Lock
    33, // PageUp
    34, // PageDown
    35, // End
    36, // Home
    45, // Insert
    46, // Delete
    112, // F1
    113, // F2
    114, // F3
    115, // F4
    116, // F5
    117, // F6
    118, // F7
    119, // F8
    120, // F9
    121, // F10
    122, // F11
    123, // F12
  ]);
  const code = e.key && e.key.charCodeAt(0);
  let value = e.key;
  let keyCode = e.keyCode;
  if (type === 'vr') {
    keyCode = parseInt(document.querySelector(`#${e.target.id}`).getAttribute('key-code'));
    value = document.querySelector(`#${e.target.id}`).getAttribute('value');
  } else {
    if (ignoredKeys.has(e.keyCode)) return;
  }

  switch (keyCode) {
    case 9: // tab
      inputEvent = new CustomEvent('a-keyboard-update', {detail: {code: keyCode, value: '\t'}});
      document.dispatchEvent(inputEvent);
      break;
    case 8: // backspace
      inputEvent = new CustomEvent('a-keyboard-update', {detail: {code: keyCode, value: ''}});
      document.dispatchEvent(inputEvent);
      break;
    case 13: // enter
      inputEvent = new CustomEvent('a-keyboard-update', {detail: {code: keyCode, value: '\n'}});
      document.dispatchEvent(inputEvent);
      break;
    case 16: // Shift
      AFK.template.toggleActiveMode('shift');
      break;
    case 18: // Alt
      AFK.template.toggleActiveMode('alt');
      break;
    case 27: // esc
      if (this.dismissable) {
        inputEvent = new CustomEvent('a-keyboard-update', {detail: {code: keyCode, value: ''}});
        document.dispatchEvent(inputEvent);
      }
      break;
    case 32: // space
      inputEvent = new CustomEvent('a-keyboard-update', {detail: {code: keyCode, value: ' '}});
      document.dispatchEvent(inputEvent);
      break;
    default:
      inputEvent = new CustomEvent('a-keyboard-update', {detail: {code: keyCode, value: value}});
      document.dispatchEvent(inputEvent);
      break;
  }

  // Artificially trigger keypress events
  if (type !== 'vr') {
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
