const english = require('./en')

function getIntl(locale) {
    switch(locale) {
        case 'en': 
            return english
        default:
            return english
    }
}

module.exports = getIntl