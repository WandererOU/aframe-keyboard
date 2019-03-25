let getIntl = require('./i18n/index')
let coordinates = require('./keyCoords')

class KeyboardTemplate {
    constructor() {
        this.keyboardKeys = {}
        this.dismissable = true
        this.activeMode = 'normal' // 'normal', 'shift', 'alt', 'alt-shift'
        this.color = '#000'
    }

    draw(options) {
        this.parentEl = options.el
        this.color = options.color
        this.dismissable = options.dismissable
        this.keyboardKeys = getIntl(options.locale)
        this.drawKeyboard()
    }

    getKeyPosition(row, column) {
        return coordinates[row][column]
    }
    
    drawButton(options) {
        const key = options.key
        const position = this.getKeyPosition(options.row, options.column)

        const buttonContainer = document.createElement('a-entity')
        buttonContainer.setAttribute('position', position)

        const button = document.createElement('a-entity')
        button.setAttribute('scale', '0.03 0.03 0.013')
        button.setAttribute('geometry', 'primitive: box')
        button.setAttribute('material', 'color: #ccc')

        const buttonTextPlane = document.createElement('a-text')
        buttonTextPlane.id = `a-keyboard-${key.code}`
        buttonTextPlane.setAttribute('key-code', key.code)
        buttonTextPlane.setAttribute('value', key.value)
        buttonTextPlane.setAttribute('align', 'center')
        buttonTextPlane.setAttribute('position', '0 0 0.01')
        buttonTextPlane.setAttribute('width', '0.35')
        buttonTextPlane.setAttribute('geometry', 'primitive: plane; width: 0.03; height: 0.03')
        buttonTextPlane.setAttribute('material', "opacity: 0.0; transparent: true; color: #000")
        buttonTextPlane.setAttribute('wrap-count', '40')
        buttonTextPlane.setAttribute('color', this.color)
        buttonTextPlane.setAttribute('keyboard-button', true)
        buttonTextPlane.setAttribute('class', 'collidable')

        buttonContainer.appendChild(button)
        buttonContainer.appendChild(buttonTextPlane)
    
        this.parentEl.appendChild(buttonContainer)
    }

    drawKeyboard() {
        while (this.parentEl.firstChild) {
            this.parentEl.removeChild(this.parentEl.firstChild);
        }
        if(this.keyboardKeys) {
            const keyRows = this.keyboardKeys[this.activeMode]
            for(let i = 0; i < keyRows.length; i++) {
                let keys = keyRows[i].split(' ')
                for(let k = 0; k < keys.length; k++) {
                    const key = this.parseSymbols(keys[k])
                    if(!this.dismissable && key.code === '27') {
                        continue
                    }

                    if(!this.keyboardKeys.alt && key.code === '18') {
                        continue
                    }

                    if(!this.keyboardKeys.alt && key.code === '18') {
                        continue
                    }
                    this.drawButton({key, row: i, column: k})
                }
            }
        }
    }

    toggleActiveMode() {
        this.activeMode === 'shift' ? this.activeMode = 'normal' : this.activeMode = 'shift'
        this.drawKeyboard()
    }

    parseSymbols(key) {
        switch(key) {
        case '{enter}':
            return {value: 'Enter', code: '13'}
        case '{tab}':
            return {value: 'Tab', code: '9'}
        case '{shift}':
            return {value: 'Shift', code: '16'}
        case '{space}':
            return {value: ' ', code: '32'}
        case '{empty}':
            return {value: '', code: ''}
        case '{cancel}':
            return {value: 'Cancel', code: '27'}
        case '{bksp}':
            return {value: '<-', code: '8'}
        case '{submit}':
            return {value: 'Submit', code: '999'}
        default: 
            return {value: key, code: key.charCodeAt(0)}
        }
    }
}

module.exports = KeyboardTemplate