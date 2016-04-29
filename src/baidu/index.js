'use strict';

var Promise = require('bluebird');
var request = require('../common/request');
var BAIDU_HOST = 'http://api.map.baidu.com/geodata/v3/';

/**
 * sdk client
 * @param options
 * @constructor
 */
function BaiduClient(options) {
    this.options = options;
}

/**
 * create tables
 */
BaiduClient.prototype.initDatabase = function (tables) {
    var ak = this.options.ak;
    return Promise.map(tables, function (table) {
        var opt = 'geotable/create';
        var data = {
            geotype: '1',
            is_published: '1',
            ak: ak,
            name: table.table_name
        }
        return request.post(BAIDU_HOST + opt, data).then(function (result) {
            if (result.status === 0) {
                console.log('create table successful: ' + table.table_name);

                var geotable_id = result.id;
                if (table.fields) {
                    /**
                     * create fields
                     */
                    opt = 'column/create';
                    return Promise.map(table.fields, function (field) {
                        field.ak = ak;
                        field.geotable_id = geotable_id;
                        return request.post(BAIDU_HOST + opt, field).then(function (result) {
                            if (result.status === 0) {
                                console.log('create column successful: ' + field.name);

                                return {success: true};
                            }
                            return {success: false, opt: opt, data: field, message: result};
                        });
                    }, {concurrency: 1}).then(function (results) {
                        for (var i in results) {
                            if (!results[i].success) {
                                return {success: false, message: results[i].message}
                            }
                        }
                        return {success: true};
                    });
                }
                return {success: true};
            } else {
                return {success: false, opt: opt, data: data, message: result};
            }
        });
    }, {concurrency: 1}).then(function (results) {
        for (var i in results) {
            if (!results[i].success) {
                return {success: false, message: results[i].message}
            }
        }
        return {success: true};
    });
}

/**
 * BaiduClient
 * @type {BaiduClient}
 */
module.exports = BaiduClient;