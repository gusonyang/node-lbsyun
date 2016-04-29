'use strict';

var Promise = require('bluebird');
var AmapClient = require('./amap');
var BaiduClient = require('./baidu');

/**
 * sdk client
 * @param options
 * @constructor
 */
function LBSYunClient(options) {
    this.platforms = [];
    for (var i in options.platforms) {
        switch (options.platforms[i]) {
            case 'amap':
                this.platforms.push(new AmapClient(options.amap));
                break;
            case 'baidu':
                this.platforms.push(new BaiduClient(options.baidu));
                break;
        }
    }
}

/**
 * create tables
 */
LBSYunClient.prototype.initDatabase = function (tables) {
    var platforms = this.platforms;
    return Promise.map(platforms, function (platform) {
        return platform.initDatabase(tables);
    }, {concurrency: 2}).then(function (results) {
        for (var i in results) {
            if (!results[i].success) {
                return {success: false, message: results[i].message}
            }
        }
        return {success: true};
    });
}

/**
 * exports client
 * @type {LBSYunClient}
 */
module.exports = LBSYunClient;