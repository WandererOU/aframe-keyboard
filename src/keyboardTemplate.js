const getIntl = require('./i18n/index');

const KEYBOARD_PADDING = 0.02;
const KEY_PADDING = 0.004;
const KEY_SIZE = 0.04;

class KeyboardTemplate {
  constructor() {
    this.keyboardKeys = {};
    this.activeMode = 'normal'; // 'normal', 'shift', 'alt'
  }

  draw(options) {
    for (const option in options) {
      this[option] = options[option];
    }
    this.keyboardKeys = getIntl(options.locale);
    this.drawKeyboard();
  }

  drawButton(options) {
    const key = options.key;
    const width = key.size.split(' ')[0];
    const height = key.size.split(' ')[1];
    const buttonContainer = document.createElement('a-entity');
    buttonContainer.setAttribute('position', options.position);

    const button = document.createElement('a-entity');
    button.setAttribute('geometry', `primitive: plane; width: ${width}; height: ${height};`);

    if (this.keyTexture && this.keyTexture.length > 0) {
      button.setAttribute('material', `src: ${this.keyTexture}`);
    } else {
      button.setAttribute('material', 'color: #4a4a4a; opacity: 0.9');
    }

    const text = document.createElement('a-text');
    text.id = `a-keyboard-${key.code}`;
    text.setAttribute('key-code', key.code);
    text.setAttribute('value', key.value);
    text.setAttribute('align', 'center');
    text.setAttribute('baseline', this.verticalAlign);
    text.setAttribute('position', '0 0 0.001');
    text.setAttribute('width', this.fontSize);
    text.setAttribute('height', this.fontSize);
    text.setAttribute('geometry', `primitive: plane; width: ${width}; height: ${height}`);
    text.setAttribute('material', `opacity: 0.0; transparent: true; color: ${this.highlightColor}`);
    text.setAttribute('color', this.color);
    text.setAttribute('font', this.font);
    text.setAttribute('shader', 'msdf');
    text.setAttribute('negate', 'false');
    text.setAttribute('keyboard-button', true);
    text.setAttribute('class', 'collidable');

    buttonContainer.appendChild(button);
    buttonContainer.appendChild(text);

    this.el.appendChild(buttonContainer);
  }

  drawKeyboard() {
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }

    if (this.keyboardKeys) {
      const keyRows = this.keyboardKeys[this.activeMode] || this.keyboardKeys['normal'];

      const keyboard = document.createElement('a-entity');
      const keyboardWidth = KEY_SIZE * 11 + KEY_PADDING * 10 + KEYBOARD_PADDING * 2;
      const keyboardHeight = KEY_SIZE * keyRows.length + KEY_PADDING * (keyRows.length - 1) + KEYBOARD_PADDING * 2;

      keyboard.setAttribute('position', `${(keyboardWidth / 2) - KEYBOARD_PADDING} ${(-keyboardHeight / 2) + KEYBOARD_PADDING} -0.01`);
      keyboard.setAttribute('geometry', `primitive: plane; width: ${keyboardWidth}; height: ${keyboardHeight}`);

      if (this.baseTexture && this.baseTexture.length > 0) {
        keyboard.setAttribute('material', `src: ${this.baseTexture}`);
      } else {
        keyboard.setAttribute('material', 'color: #4a4a4a; side: double; opacity: 0.7');
      }

      this.el.appendChild(keyboard);

      let positionY = 0;
      for (let i = 0; i < keyRows.length; i++) {
        const keys = keyRows[i];
        let positionX = 0;
        for (let j = 0; j < keys.length; j++) {
          const keyObject = keys[j];
          const key = this.parseKeyObjects(keyObject);
          if (!this.dismissable && keyObject.type === 'cancel') {
            continue;
          }
          const width = key.size.split(' ')[0];
          const height = key.size.split(' ')[1];
          this.drawButton({
            key,
            position: `${positionX + width / 2} ${positionY - height / 2} 0`,
          });
          positionX += parseFloat(width) + KEY_PADDING;

          if (keys.length === (j + 1)) {
            positionY -= KEY_SIZE + KEY_PADDING;
          }
        }
      }
    }
  }

  toggleActiveMode(mode) {
    if (mode === this.activeMode) {
      this.activeMode = 'normal';
      this.drawKeyboard();
    } else {
      this.activeMode = mode;
      this.drawKeyboard();
    }
  }

  parseKeyObjects(keyObject) {
    const type = keyObject.type;
    const value = keyObject.value;
    switch (type) {
      case 'delete':
        return {size: `${KEY_SIZE} ${KEY_SIZE} 0`, value, code: '8'};
      case 'enter':
        return {size: `${KEY_SIZE} ${(KEY_SIZE * 2) + KEY_PADDING} 0`, value, code: '13'};
      case 'shift':
        return {size: `${(KEY_SIZE * 2) + KEY_PADDING} ${KEY_SIZE} 0`, value, code: '16'};
      case 'alt':
        return {size: `${(KEY_SIZE * 2) + KEY_PADDING} ${KEY_SIZE} 0`, value, code: '18'};
      case 'space':
        return {size: `${(KEY_SIZE * 5) + (KEY_PADDING * 4)} ${KEY_SIZE} 0`, value, code: '32'};
      case 'cancel':
        // ASCII "CAN" used for cancel event
        return {size: `${(KEY_SIZE * 2) + KEY_PADDING} ${KEY_SIZE} 0`, value, code: '24'};
      case 'submit':
        // ASCII "ACK" used for submit events
        return {size: `${(KEY_SIZE * 2) + KEY_PADDING} ${KEY_SIZE} 0`, value, code: '06'};
      default:
        return {size: `${KEY_SIZE} ${KEY_SIZE} 0`, value, code: value.charCodeAt(0)};
    }
  }
}

module.exports = KeyboardTemplate;
