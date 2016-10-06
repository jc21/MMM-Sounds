'use strict';

const fs         = require('fs');
const path       = require('path');
const NodeHelper = require('node_helper');
const Player     = require('node-aplay');
const moment     = require('moment');

module.exports = NodeHelper.create({
    loaded: false,
    config: null,

    /**
     * @param {String} notification
     * @param {*}      payload
     */
    socketNotificationReceived: function (notification, payload) {
this.log('socketNotificationReceived: ' + notification);
        if (notification === 'CONFIG') {
            if (!this.loaded) {
                this.config = payload;
                this.loaded = true;

                if (this.config.startupSound) {
                    this.playFile(this.config.startupSound);
                }
            }
        } else if (notification === 'PLAY_SOUND') {
            if (typeof payload === 'string') {
                this.playFile(payload);
            } else if (typeof payload === 'object') {
                if (typeof payload.sound === 'undefined' || !payload.sound) {
                    this.log('Could not play sound, notification payload `sound` was not supplied');
                } else {
                    this.playFile(payload.sound, payload.delay);
                }
            }
        }
    },

    /**
     * @param {String}  filename
     * @param {Number} [delay]  in ms
     */
    playFile: function (filename, delay) {
        delay = delay || this.config.defaultDelay;

        var soundfile = __dirname  + '/sounds/' + filename;

        // Make sure file exists before playing
        try {
            fs.accessSync(soundfile, fs.F_OK);
        } catch (e) {
            // Custom sequence doesn't exist
            this.log('Sound does not exist: ' + soundfile);
            return;
        }

        this.log('Playing ' + filename + ' with ' + delay + 'ms delay', true);

        setTimeout(() => {
            new Player(path.normalize(__dirname  + '/sounds/' + filename)).play();
        }, delay);
    },

    /**
     * Outputs log messages
     *
     * @param {String}  message
     * @param {Boolean} [debug_only]
     */
    log: function (message, debug_only) {
        if (!debug_only || (debug_only && this.config.debug)) {
            console.log('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] [MMM-Sounds] ' + message);
        }
    }
});
