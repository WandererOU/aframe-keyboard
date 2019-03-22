let getIntl = require('./i18n/index')
let coordinates = require('./keyCoords')

class KeyboardTemplate {
    constructor() {
        this.keyboardKeys = {}
        this.activeMode = 'normal' // 'normal', 'shift', 'alt', 'alt-shift'
    }

    draw(options) {
        this.keyboardKeys = getIntl(options.locale)
        this.parseKeyboardLayout(options.el)
    }

    getKeyPosition(row, column) {
        return coordinates[row][column]
    }

    drawButton(options) {
        const el = options.parentEl
        const key = options.key
        const position = this.getKeyPosition(options.row, options.column)

        const buttonContainer = document.createElement('a-entity')
        buttonContainer.setAttribute('position', position)

        const button = document.createElement('a-entity')
        button.setAttribute('scale', '0.1 0.1 0.02')

        const buttonTextPlane = document.createElement('a-text')
        buttonTextPlane.id = `a-keyboard-${key.code}`
        buttonTextPlane.setAttribute('key-code', key.code)
        buttonTextPlane.setAttribute('value', key.value)
        buttonTextPlane.setAttribute('align', 'center')
        buttonTextPlane.setAttribute('position', '0 0 0.01')
        buttonTextPlane.setAttribute('width', '1')
        buttonTextPlane.setAttribute('geometry', 'primitive: plane; width: 0.1; height: 0.1')
        buttonTextPlane.setAttribute('material', 'opacity: 0.0; transparent: true; color: #000')
        buttonTextPlane.setAttribute('wrap-count', '26')
        buttonTextPlane.setAttribute('color', '#000')
        buttonTextPlane.setAttribute('class', 'collidable')

        buttonContainer.appendChild(button)
        buttonContainer.appendChild(buttonTextPlane)

        el.appendChild(buttonContainer)
    }

    parseKeyboardLayout(parentEl) {
        if(this.keyboardKeys) {
            const keyRows = this.keyboardKeys[this.activeMode]
            for(let i = 0; i < keyRows.length; i++) {
                let keys = keyRows[i].split(' ')
                for(let k = 0; k < keys.length; k++) {
                    const key = this.parseSymbols(keys[k])
                    this.drawButton({parentEl, key, row: i, column: k})
                }
            }
        }
    }

    parseSymbols(key) {
        switch(key) {
        case '{enter}':
            return {value: 'Enter', code: '13'}
        case '{shift}':
            return {value: 'Shift', code: '16'}
        case '{alt}':
            return {value: 'Alt', code: '18'}
        case '{space}':
            return {value: ' ', code: '32'}
        case '{empty}':
            return {value: '', code: ''}
        case '{cancel}':
            return {value: 'Cancel', code: ''}
        default: 
            return {value: String.fromCharCode(key), code: key}
        }
    }
}

module.exports = KeyboardTemplate