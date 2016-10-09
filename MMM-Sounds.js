Module.register('MMM-Sounds', {

    /**
     * Default Config
     */
    defaults: {
        debug:          false,
        startupSound:   null,
        defaultDelay:   10,
        quietTimeStart: null,
        quietTimeEnd:   null
    },

    /**
     * Module Start
     */
    start: function() {
        this.sendSocketNotification('CONFIG', this.config);
        Log.info('Starting module: ' + this.name);
    },

    /**
     * Notification Received from other modules
     *
     * @param {String} notification
     * @param {*}      payload
     */
    notificationReceived: function(notification, payload) {
        if (notification === 'PLAY_SOUND') {
            this.sendSocketNotification(notification, payload);
        }
    }
});
