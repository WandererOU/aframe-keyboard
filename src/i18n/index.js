const en = require('./en');

function getIntl(locale) {
  switch (locale) {
    case 'en':
      return en;
    default:
      return en;
  }
}

module.exports = getIntl;
