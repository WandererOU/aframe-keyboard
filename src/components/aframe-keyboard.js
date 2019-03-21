/* global AFRAME, AFK */

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
        // Initialize keyboard (create / draw elements)
        

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
        this.el.removeEventListener('connect', this.connect);
        AFK.connection.disconnect();
    }
  });
  