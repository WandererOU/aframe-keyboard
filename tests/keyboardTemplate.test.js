const KeyboardTemplate = require('../src/keyboardTemplate');
const helpers = require('./helper');
const locale = require('../src/i18n/en');

suite('keyboardTemplate.js', function() {
  let keyboardTemplate;
  let el;
  setup(function() {
    keyboardTemplate = new KeyboardTemplate();
    el = helpers.entityFactory({'id': 'keyboard', 'aframe-keyboard': true});
  });

  suite('Draw functions', function() {
    test('Test if draw function receives attributes', function() {
      const el = helpers.entityFactory({'id': 'keyboard', 'aframe-keyboard': true});
      const options = {};
      options.color = '#eee';

      keyboardTemplate.draw({...options, el});
      assert.equal(keyboardTemplate.color, '#eee');
    });

    test('Test whether drawKeyboard fires successfully', function(done) {
      keyboardTemplate.el = el;
      keyboardTemplate.keyboardKeys = locale;

      keyboardTemplate.drawKeyboard();
      done();
    });
  });

  suite('Toggle functions', function() {
    test('Test if toggle to different mode works', function() {
      keyboardTemplate.el = el;
      keyboardTemplate.keyboardKeys = locale;
      keyboardTemplate.toggleActiveMode('shift');
      assert.equal(keyboardTemplate.activeMode, 'shift');

      keyboardTemplate.toggleActiveMode('alt');
      assert.equal(keyboardTemplate.activeMode, 'alt');
    });
  });
});
