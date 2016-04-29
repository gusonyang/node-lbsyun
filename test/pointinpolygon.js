var inside = require('point-in-polygon');

/**
 * point in polygon
 */
describe('point', function () {
    this.timeout(1000 * 60 * 30);

    it('inpolygon', function (done) {
        var district = require('./data/district.json');
        var polyline = district.districts[0].polyline;
        var arr = polyline.split(';'), pois = [];
        for (var i in arr) {
            var item = arr[i].split(',');
            pois.push([parseInt(item[0] * 100000), parseInt(item[1] * 100000)]);
        }

        inside([parseInt(114.03621 * 100000), parseInt(23.00174 * 100000)], pois)
        done();
    });
});