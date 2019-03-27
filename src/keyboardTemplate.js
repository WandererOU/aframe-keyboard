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
        this.font = options.font
        this.fontSize = options.fontSize
        this.dismissable = options.dismissable
        this.verticalAlign = options.verticalAlign
        this.keyboardKeys = getIntl(options.locale)
        this.drawKeyboard()
    }

    getKeyPosition(row, column) {
        return coordinates[row][column]
    }
    
    drawButton(options) {
        const key = options.key
        const width = key.size.split(' ')[0]
        const height = key.size.split(' ')[1]
        const buttonContainer = document.createElement('a-entity')
        buttonContainer.setAttribute('position', options.position)

        const button = document.createElement('a-entity')
        button.setAttribute('geometry', `primitive: box; width: ${width}; height: ${height}; depth: 0.013`)
        button.setAttribute('material', 'color: #ccc')

        const buttonTextPlane = document.createElement('a-text')
        buttonTextPlane.id = `a-keyboard-${key.code}`
        buttonTextPlane.setAttribute('key-code', key.code)
        buttonTextPlane.setAttribute('value', key.value)
        buttonTextPlane.setAttribute('align', 'center')
        buttonTextPlane.setAttribute('baseline', this.verticalAlign)
        buttonTextPlane.setAttribute('position', '0 0 0.01')
        buttonTextPlane.setAttribute('width', this.fontSize)
        buttonTextPlane.setAttribute('height', this.fontSize)
        buttonTextPlane.setAttribute('geometry', `primitive: plane; width: ${width}; height: ${height}`)
        buttonTextPlane.setAttribute('material', "opacity: 0.0; transparent: true; color: #000")
        buttonTextPlane.setAttribute('color', this.color)
        buttonTextPlane.setAttribute('font', this.font)
        buttonTextPlane.setAttribute('shader', 'msdf')
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
            const KEY_PADDING = 0.01
            const KEY_SIZE = 0.03
    
            const keyboard = document.createElement('a-entity')
            const keyboardWidth = KEY_SIZE * 11 + KEY_PADDING * 12
            const keyboardHeight = KEY_SIZE * keyRows.length + KEY_PADDING * (keyRows.length + 1)

            keyboard.setAttribute('position', `${(keyboardWidth / 2) - KEY_PADDING} ${(-keyboardHeight / 2) + KEY_PADDING} -0.01`)
            keyboard.setAttribute('geometry', `primitive: box; width: ${keyboardWidth}; height: ${keyboardHeight}; depth: 0.01`)
            keyboard.setAttribute('material', 'color: #000')
            this.parentEl.appendChild(keyboard)

            let positionY = 0
            for(let i = 0; i < keyRows.length; i++) {
                const keys = keyRows[i]
                let positionX = 0
                for(let j = 0; j < keys.length; j++) {
                    const keyObject = keys[j]
                    const key = this.parseKeyObjects(keyObject)
                    if (!this.dismissable && keyObject.type === 'cancel') {
                        continue
                    }
                    const width = key.size.split(' ')[0]
                    const height = key.size.split(' ')[1]
                    this.drawButton({key, position: `${positionX + width / 2} ${positionY - height / 2} 0`})
                    positionX += parseFloat(width) + KEY_PADDING
                    if (keys.length === (j + 1)) {
                        positionY -= KEY_SIZE + KEY_PADDING
                    }
                }
            }
        }
    }

    toggleActiveMode() {
        this.activeMode === 'shift' ? this.activeMode = 'normal' : this.activeMode = 'shift'
        this.drawKeyboard()
    }

    parseKeyObjects(keyObject) {
        const type = keyObject.type
        const value = keyObject.value
        switch(type) {
        case 'delete':
            return {size: '0.03 0.03 0.013', value, code: '8'}
        case 'enter':
            return {size: '0.03 0.07 0.013', value, code: '13'}
        case 'shift':
            return {size: '0.07 0.03 0.013', value, code: '16'}
        case 'alt':
            return {size: '0.07 0.03 0.013', value, code: '18'}
        case 'space':
            return {size: '0.19 0.03 0.013', value, code: '32'}
        case 'cancel':
            return {size: '0.07 0.03 0.013', value, code: '998'}
        case 'submit':
            return {size: '0.07 0.03 0.013', value, code: '999'}
        default: 
            return {size: '0.03 0.03 0.013', value, code: value.charCodeAt(0)}
        }
    }
}

module.exports = KeyboardTemplate