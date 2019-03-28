/* global AFRAME */
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('keyboard-button', {
  init: function() {
    const el = this.el;
    const self = this;
    el.addEventListener('mousedown', function() {
      el.setAttribute('material', 'opacity', '0.7');
    });

    el.addEventListener('mouseup', function() {
      el.setAttribute('material', 'opacity', self.isMouseEnter ? '0.4' : '0');
    });

    el.addEventListener('mouseenter', function() {
      el.setAttribute('material', 'opacity', '0.4');
      self.isMouseEnter = true;
    });

    el.addEventListener('mouseleave', function() {
      el.setAttribute('material', 'opacity', '0');
      self.isMouseEnter = false;
    });
  },
});
