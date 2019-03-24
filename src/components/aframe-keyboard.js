/* global AFRAME, AFK */

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('keyboard-button', {
    init: function() {
        var el = this.el;
        var self = this;
        el.addEventListener('mousedown', function () {
            el.setAttribute('material', 'opacity', '0.7');
        });

        el.addEventListener('mouseup', function () {
            el.setAttribute('material', 'opacity', self.isMouseEnter ? '0.4' : '0');
        });

        el.addEventListener('mouseenter', function () {
            el.setAttribute('material', 'opacity', '0.4');
            self.isMouseEnter = true;
        });

        el.addEventListener('mouseleave', function () {
            el.setAttribute('material', 'opacity', '0');
            self.isMouseEnter = false;
        });
    }
})

AFRAME.registerComponent('a-keyboard', {
    schema: {
        model: {default: ''},
        font: {default: 'Helvetica'},
        color: {default: '#000'},
        handleUpdate: {type: 'string'},
        locale: {default: 'en'},
        value: {default: ''},
        audio: {default: false}, // Only if adapter supports audio
        interactionMode: {default: 'desktop'}, // 'desktop', 'vr', 'mobile'
    },
  
    init: function() {
        const el = this.el
        const locale = this.data.locale
        const model = this.data.model
        const font = this.data.font
        const color = this.data.color
        
        AFK.template.draw({locale, model, font, el, color})

        this.attachEventListeners()
    },

    attachEventListeners: function() {
        document.querySelector('#keyboard').addEventListener('click', this.handleKeyboardVR)
        window.addEventListener("keydown", this.handleKeyboardPress);
    },

    handleKeyboardPress: function(e) {
        let inputEvent;
        switch(e.keyCode) {
        case 13: // enter
            inputEvent = new CustomEvent('a-keyboard-update', {detail: {code: e.keyCode, value: '\n'}})
            document.dispatchEvent(inputEvent)
            break
        case 8: // backspace
            break
        case 9: // tab
            break
        case 16: // shift
            AFK.template.toggleActiveMode('shift')
            break
        case 18: // alt
            if(AFK.template.activeMode === 'shift') {
                AFK.template.toggleActiveMode('alt-shift')
            } else {
                AFK.template.toggleActiveMode('alt')
            }
            break
        default:
            inputEvent = new CustomEvent('a-keyboard-update', {detail: {code: e.keyCode, value: e.key}})
            document.dispatchEvent(inputEvent)
            break
        }

        // Artificially trigger keypress events
        if (document.querySelector(`#a-keyboard-${e.key}`)) {
            document.querySelector(`#a-keyboard-${e.key}`).dispatchEvent(new Event('mousedown'))
            setTimeout(function(){
                 document.querySelector(`#a-keyboard-${e.key}`).dispatchEvent(new Event('mouseleave'))
            }, 100);
        }
    },

    handleKeyboardVR: function(e) {
        let inputEvent;
        let value = document.querySelector(`#${e.target.id}`).getAttribute('value')
        let code = document.querySelector(`#${e.target.id}`).getAttribute('key-code')
        switch(code) {
        case '13': // enter
            inputEvent = new CustomEvent('a-keyboard-update', {detail: {code, value: '\n'}})
            document.dispatchEvent(inputEvent)
            break
        case '8': // backspace
            break
        case '9': // tab
            break
        case '16': // shift
            AFK.template.toggleActiveMode('shift')
            break
        case '18': // alt
            if(AFK.template.activeMode === 'shift') {
                AFK.template.toggleActiveMode('shift-alt')
            } else {
                AFK.template.toggleActiveMode('alt')
            }
            break
        default:
            inputEvent = new CustomEvent('a-keyboard-update', {detail: {code, value}})
            document.dispatchEvent(inputEvent)
            break
        }
        
    },
  
    remove: function() {
        
    }
  });
