var should        = require('should')
  , GeoIpStream   = require('../index.js')
  , streamBuffers = require("stream-buffers")
;
var writableStream = new streamBuffers.ReadableStreamBuffer({
	frequency: 10,       // in milliseconds.
	chunkSize: 2048     // in bytes.
});



describe('create()', function() {
    describe('no arguments', function() {
        it('exists', function() {
			var geoIpStream = new GeoIpStream({ dataPath: './node_modules/geolitecity/GeoLiteCity.dat' });
            should.exist(geoIpStream);
        });
    });
	
    describe('piped data', function() {
        it('correct', function() {
			var geoIpStream = new GeoIpStream({ dataPath: './node_modules/geolitecity/GeoLiteCity.dat' });
			var testData = '{"ip": "198.55.125.23", "timestamp":"2014-02-24 10:29:42", "url": "http:\/\/somedomain.com"}'
			var readableStream = new streamBuffers.ReadableStreamBuffer({
				frequency: 10,       // in milliseconds.
				chunkSize: 2048     // in bytes.
			});
			readableStream.put(testData, "utf8");
			readableStream.pipe(geoIpStream).pipe(writableStream);
        });
    });
});
