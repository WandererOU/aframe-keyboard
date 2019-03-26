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
        dismissable: {default: true},
        model: {default: ''},
        font: {default: 'dejavu'},
        color: {default: '#000'},
        handleUpdate: {type: 'string'},
        locale: {default: 'en'},
        value: {default: ''},
        audio: {default: false}, // Only if adapter supports audio
        interactionMode: {default: 'desktop'}, // 'desktop', 'vr', 'mobile'
    },
  
    init: function() {
        const el = this.el
        const dismissable = this.data.dismissable
        const locale = this.data.locale
        const model = this.data.model
        const font = this.data.font
        const color = this.data.color
        
        AFK.template.draw({locale, model, font, el, color, dismissable})

        this.attachEventListeners()
    },

    attachEventListeners: function() {
        window.addEventListener("keydown", this.handleKeyboardPress);
        document.querySelector('#keyboard').addEventListener('click', this.handleKeyboardVR)
    },

    removeEventListeners: function() {
        window.removeEventListener("keydown", this.handleKeyboardPress);
        if(document.querySelector('#keyboard')) {
            document.querySelector('#keyboard').removeEventListener('click', this.handleKeyboardVR)
        }
    },

    handleKeyboardPress: function(e) {
        let inputEvent;
        const code = e.key.charCodeAt(0)
        switch(e.keyCode) {
        case 9: // tab
            inputEvent = new CustomEvent('a-keyboard-update', {detail: {code: e.keyCode, value: '\t'}})
            document.dispatchEvent(inputEvent)
            break
        case 8: // backspace
            inputEvent = new CustomEvent('a-keyboard-update', {detail: {code: e.keyCode, value: ''}})
            document.dispatchEvent(inputEvent)
            break
        case 13: // enter
            inputEvent = new CustomEvent('a-keyboard-update', {detail: {code: e.keyCode, value: '\n'}})
            document.dispatchEvent(inputEvent)
            break
        case 16: // shift
            break
        case 18: // alt
            break
        case 27: // esc
            if (this.dismissable) {
                inputEvent = new CustomEvent('a-keyboard-update', {detail: {code: e.keyCode, value: ''}})
                document.dispatchEvent(inputEvent)
            }
            break
        case 32: // space
            inputEvent = new CustomEvent('a-keyboard-update', {detail: {code: e.keyCode, value: ' '}})
            document.dispatchEvent(inputEvent)
            break
        default:
            inputEvent = new CustomEvent('a-keyboard-update', {detail: {code, value: e.key}})
            document.dispatchEvent(inputEvent)
            break
        }

        // Artificially trigger keypress events
        if (document.querySelector(`#a-keyboard-${code}`)) {
            document.querySelector(`#a-keyboard-${code}`).dispatchEvent(new Event('mousedown'))
            setTimeout(function(){
                 document.querySelector(`#a-keyboard-${code}`).dispatchEvent(new Event('mouseleave'))
            }, 80);
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
            inputEvent = new CustomEvent('a-keyboard-update', {detail: {code: 8, value: ''}})
            document.dispatchEvent(inputEvent)
            break
        case '9': // tab
            inputEvent = new CustomEvent('a-keyboard-update', {detail: {code, value: '\t'}})
            document.dispatchEvent(inputEvent)
            break
        case '16': // shift
            AFK.template.toggleActiveMode()
            break
        case '32': // space
            inputEvent = new CustomEvent('a-keyboard-update', {detail: {code, value: ' '}})
            document.dispatchEvent(inputEvent)
            break
        default:
            inputEvent = new CustomEvent('a-keyboard-update', {detail: {code, value}})
            document.dispatchEvent(inputEvent)
            break
        }
        
    },
  
    remove: function() {
        this.removeEventListeners()
    }
  });
