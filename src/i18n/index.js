import English from './en'

export function getIntl(locale) {
    switch(locale) {
        case 'en': 
            return English
        default:
            return English
    }
}