/* global AFRAME */
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('keyboard-button', {
  init: function() {
    const el = this.el;
    el.addEventListener('mousedown', function() {
      el.setAttribute('material', 'opacity', '0.7');
    });

    el.addEventListener('mouseup', () => {
      el.setAttribute('material', 'opacity', this.isMouseEnter ? '0.9' : '0');
    });

    el.addEventListener('mouseenter', () => {
      el.setAttribute('material', 'opacity', '0.9');
      self.isMouseEnter = true;
    });

    el.addEventListener('mouseleave', () => {
      el.setAttribute('material', 'opacity', '0');
      self.isMouseEnter = false;
    });
  },
});
