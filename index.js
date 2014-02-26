var maxmind = require('maxmind')  // runk/node-maxmind
, conflate  = require('conflate') // Munge some objects together, deep by default. kommander/conflate.js
, util      = require('util')
, stream    = require('stream').Transform || require('readable-stream').Transform // stream 2 compatible
; 
 
 
  // json string in and out
 function GeoIpStream(config) {
	 var self = this;
 
	 var defaults = {
		dataPath:        './GeoLiteCity.dat',
		memoryCache:     true, 
		checkForUpdates: true,
		ipField:         'ip',
		dropIpField:     false
	 }
 
	 config = (config) ? conflate(defaults, config) : defaults;
 
	 maxmind.init(config.dataPath, config);
 
	 stream.call(self, { objectMode: true });
 
	 self._transform = function (data, encoding, callback) {
		if (data) {
			var json   = data.toString('utf8');
			var parsed = JSON.parse(json);
			var ip = parsed[config.ipField];
			if (ip) { // ip field found
				if (config.dropIpField) {
					delete parsed[config.ipField];
				}
				var location = maxmind.getLocation(ip);
				if (location) {
					parsed = conflate(parsed, location);
					data = new Buffer(JSON.stringify(parsed), 'utf8');
				}
			}
		}
		self.push(data);
		callback();
	};
}

 
util.inherits(GeoIpStream, stream);
 
module.exports = GeoIpStream;