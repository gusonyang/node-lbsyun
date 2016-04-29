'use strict';

var Promise = require('bluebird');
var request = require('../common/request');

/**
 * sdk client
 * @param options
 * @constructor
 */
function AmapClient(options) {
    this.options = options;
}

/**
 * create tables
 */
AmapClient.prototype.initDatabase = function (tables) {
    
}

/**
 * AmapClient
 * @type {AmapClient}
 */
module.exports = AmapClient;