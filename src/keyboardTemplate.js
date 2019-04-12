const getIntl = require('./i18n/index');

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
    button.setAttribute('geometry', `primitive: box; width: ${width}; height: ${height}; depth: 0.013`);
    button.setAttribute('material', 'color: #ccc');

    const text = document.createElement('a-text');
    text.id = `a-keyboard-${key.code}`;
    text.setAttribute('key-code', key.code);
    text.setAttribute('value', key.value);
    text.setAttribute('align', 'center');
    text.setAttribute('baseline', this.verticalAlign);
    text.setAttribute('position', '0 0 0.01');
    text.setAttribute('width', this.fontSize);
    text.setAttribute('height', this.fontSize);
    text.setAttribute('geometry', `primitive: plane; width: ${width}; height: ${height}`);
    text.setAttribute('material', 'opacity: 0.0; transparent: true; color: #000');
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
      const KEY_PADDING = 0.01;
      const KEY_SIZE = 0.03;

      const keyboard = document.createElement('a-entity');
      const keyboardWidth = KEY_SIZE * 11 + KEY_PADDING * 12;
      const keyboardHeight = KEY_SIZE * keyRows.length + KEY_PADDING * (keyRows.length + 1);

      keyboard.setAttribute('position', `${(keyboardWidth / 2) - KEY_PADDING} ${(-keyboardHeight / 2) + KEY_PADDING} -0.01`);
      keyboard.setAttribute('geometry', `primitive: box; width: ${keyboardWidth}; height: ${keyboardHeight}; depth: 0.01`);
      keyboard.setAttribute('material', 'color: #000');
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
      this.activeMode('normal');
      this.drawKeyboard();
    }
    this.activeMode = mode;
    this.drawKeyboard();
  }

  parseKeyObjects(keyObject) {
    const type = keyObject.type;
    const value = keyObject.value;
    switch (type) {
      case 'delete':
        return {size: '0.03 0.03 0.013', value, code: '8'};
      case 'enter':
        return {size: '0.03 0.07 0.013', value, code: '13'};
      case 'shift':
        return {size: '0.07 0.03 0.013', value, code: '16'};
      case 'alt':
        return {size: '0.07 0.03 0.013', value, code: '18'};
      case 'space':
        return {size: '0.19 0.03 0.013', value, code: '32'};
      case 'cancel':
        return {size: '0.07 0.03 0.013', value, code: '998'};
      case 'submit':
        return {size: '0.07 0.03 0.013', value, code: '999'};
      default:
        return {size: '0.03 0.03 0.013', value, code: value.charCodeAt(0)};
    }
  }
}

module.exports = KeyboardTemplate;
