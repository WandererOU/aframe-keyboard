import {getIntl} from './i18n/index'
import keySchema from './keySchema'

class KeyboardTemplate {
    constructor() {
        this.translation = {}
    }
    draw(options) {
        let position = options.position
        this.translation = getIntl(options.locale)

    }

    drawButton(options) {

    }

    getValueFromKeyCode(keyCode) {
        
    }

    filterSymbols(keyCode) {

    }
}

module.exports = KeyboardTemplate