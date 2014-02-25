var should = require('should')
  , Stream = require('../index.js')
;



describe('create()', function() {
    describe('no arguments', function() {
        it('exists', function() {
			var stream = new Stream({ dataPath: './node_modules/geolitecity/GeoLiteCity.dat' });
            should.exist(stream);
        });
    });
});