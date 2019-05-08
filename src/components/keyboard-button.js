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
      self.removeAnimations(el);
      self.removeAnimations(button);

      button.setAttribute('material', 'opacity', '0.9');
      button.setAttribute('material', 'color', highlightColor);
      self.attachMouseEnterAnimations(el);
      self.attachMouseEnterAnimations(button);

      self.isMouseEnter = true;
    });

    el.addEventListener('mouseleave', function() {
      button.setAttribute('material', 'opacity', '1');
      button.setAttribute('material', 'color', color);

      self.attachMouseLeaveAnimations(el);
      self.attachMouseLeaveAnimations(button);
      self.isMouseEnter = false;
    });
  },

  attachMouseEnterAnimations: function(el) {
    el.setAttribute('animation__mouseenter_position', 'property: position; to: 0 0 0.015; dur: 200; autoplay: true;');
    el.setAttribute('animation__mouseenter_scale', 'property: scale; to: 1.1 1.1 1; dur: 200; autoplay: true;');
  },

  attachMouseLeaveAnimations: function(el) {
    el.setAttribute('animation__mouseleave_position', 'property: position; to: 0 0 0; autoplay: true; dur: 200');
    el.setAttribute('animation__mouseleave_scale', 'property: scale; to: 1 1 1; autoplay: true; dur: 200');
  },

  removeAnimations: function(el) {
    el.removeAttribute('animation__mouseenter_position');
    el.removeAttribute('animation__mouseenter_scale');

    el.removeAttribute('animation__mouseleave_position');
    el.removeAttribute('animation__mouseleave_scale');
  },
});
