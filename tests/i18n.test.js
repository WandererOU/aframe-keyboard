const getIntl = require('../src/i18n');

suite('i18n/index.js', function() {
  test('Test if draw function receives attributes', function() {
    const locale = getIntl('en');
    assert.equal(locale.name, 'ms-US-International');
  });
});
