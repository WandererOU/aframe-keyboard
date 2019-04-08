const en = require('./en');
const kr = require('./kr');

function getIntl(locale) {
  switch (locale) {
    case 'en':
      return en;
    case 'kr':
      return kr;
    default:
      return en;
  }
}

module.exports = getIntl;
