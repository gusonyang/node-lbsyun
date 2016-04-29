'use strict';

var config = require('./config');
var tables = require('./tables');
var LBSYunClient = require('../src/lbsyun');
var client = new LBSYunClient(config);

/**
 * init database
 */
describe('init', function () {
    it('database', function (done) {
        client.initDatabase(tables).then(function (result) {
            console.log(result);
        }).then(done, done);
    });
});

/**
 * pois create
 */
describe('pois', function () {
    this.timeout(1000 * 60 * 30);

    it('create', function (done) {
        var district = require('./data/district.json');
        var polyline = district.districts[0].polyline;
        var arr = polyline.split(';'), pois = [];
        for (var i in arr) {
            var item = arr[i].split(',');
            pois.push({
                title: i,
                address: i,
                coord_type: 3,
                longitude: item[0],
                latitude: item[1],
                ref_id: i,
                geotable_id: 139436
            });
        }
        client.createPois(pois).then(function (result) {
            console.log(result);
        }).then(done, done);
    });
});

