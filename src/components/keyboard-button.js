/* global AFRAME */
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('keyboard-button', {
  schema: {
    highlightColor: {default: '#f4f4f4'},
    keyColor: {default: '#fff'},
  },

  init: function() {
    const el = this.el;
    const button = el.parentElement.children[0];
    const self = this;
    const highlightColor = this.data.highlightColor;
    const color = this.data.keyColor;

    el.addEventListener('mousedown', function() {
      button.setAttribute('material', 'opacity', '0.7');
      button.setAttribute('material', 'color', highlightColor);
    });

    el.addEventListener('mouseup', function() {
      button.setAttribute('material', 'opacity', self.isMouseEnter ? '0.9' : '1');
      button.setAttribute('material', 'color', self.isMouseEnter ? highlightColor : color);
    });

    el.addEventListener('mouseenter', function() {
      button.setAttribute('material', 'opacity', '0.9');
      button.setAttribute('material', 'color', highlightColor);
      el.setAttribute('position', '0 0 0.01');
      button.setAttribute('position', '0 0 0.01');
      el.setAttribute('scale', '1.15 1.15 0');
      button.setAttribute('scale', '1.15 1.15 0');
      self.isMouseEnter = true;
    });

    el.addEventListener('mouseleave', function() {
      button.setAttribute('material', 'opacity', '1');
      button.setAttribute('material', 'color', color);
      el.setAttribute('position', '0 0 0');
      button.setAttribute('position', '0 0 0');
      el.setAttribute('scale', '1 1 0');
      button.setAttribute('scale', '1 1 0');
      self.isMouseEnter = false;
    });
  },
});
