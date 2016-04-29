'use strict';

var config = require('./config');
var tables = require('./tables');
var LBSYunClient = require('../src/lbsyun');
var client = new LBSYunClient(config);

describe('init', function () {
    it('database', function (done) {
        client.initDatabase(tables).then(function (result) {
            console.log(result);
        }).then(done, done);
    });
});

