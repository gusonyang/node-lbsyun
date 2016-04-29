'use strict';

var Promise = require('bluebird');
var request = require('request');

/**
 * post 请求
 * @param url
 * @param data
 */
exports.post = function (url, data) {
    return new Promise(function (resolve, reject) {
        request.post({url: url, form: data, json: true}, function (err, response, body) {
            if (err) {
                return reject(err);
            }
            return resolve(body);
        });
    });
}

/**
 * get 请求
 * @param url
 * @param data
 */
exports.get = function (url, data) {
    return new Promise(function (resolve, reject) {
        request.get({url: url, qs: data, json: true}, function (err, response, body) {
            if (err) {
                return reject(err);
            }
            return resolve(body);
        });
    });
}