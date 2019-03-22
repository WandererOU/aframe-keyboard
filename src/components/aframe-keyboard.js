/* global AFRAME, AFK */

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('a-keyboard', {
    schema: {
        model: {default: ''},
        font: {default: 'Helvetica'},
        hoverColor: {default: 'blue'},
        activeColor: {default: 'red'},
        handleUpdate: {default: 'handleUpdate'},
        locale: {default: 'en'},
        audio: {default: false}, // Only if adapter supports audio
        interactionMode: {default: 'desktop'}, // 'desktop', 'vr', 'mobile'
    },
  
    init: function() {
        const el = this.el
        const locale = this.data.locale
        const model = this.data.model
        const font = this.data.font
        console.log('initializing a-keyboard')
        // Initialize keyboard (create / draw elements)
        AFK.template.draw({locale, model, font, el})
        // If has custom model or fonts, load them into the required elements

        // Set up event listeners based on this.interactionMode
    },

    initializeKeyboard: function() {

    },

    attachEventListeners: function() {

    },

    hasHandleUpdateFunction: function() {
        return this.data.handleUpdate != '' && window.hasOwnProperty(this.data.handleUpdate);
    },
  
    callhandleUpdate: function() {
        AFK.connection.handleUpdate(window[this.data.handleUpdate]);
    },
  
    remove: function() {
        
    }
  });
  