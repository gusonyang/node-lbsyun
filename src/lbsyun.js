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
    var platforms = [];
    for (var i in options.platforms) {
        switch (options.platforms[i]) {
            case 'amap':
                platforms.push(new AmapClient(options.amap));
                break;
            case 'baidu':
                platforms.push(new BaiduClient(options.baidu));
                break;
        }
    }

    /**
     * proxy
     * @param methodName
     * @param params
     */
    this.proxy = function (methodName, params) {
        return Promise.map(platforms, function (platform) {
            return platform[methodName](params);
        }, {concurrency: 1}).then(function (results) {
            for (var i in results) {
                if (!results[i].success) {
                    return {success: false, message: results[i].message}
                }
            }
            return {success: true};
        });
    }
}

/**
 * create tables
 */
LBSYunClient.prototype.initDatabase = function (tables) {
    return this.proxy('initDatabase', tables);
}

/**
 * 创建地点
 */
LBSYunClient.prototype.createPois = function (pois) {
    return this.proxy('createPois', pois);
}

/**
 * exports client
 * @type {LBSYunClient}
 */
module.exports = LBSYunClient;