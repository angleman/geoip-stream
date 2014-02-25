# geoip-stream

Maxmind GeoIP Stream. Transforms a JSON string stream of objects by looking for an ```ip``` field (as defined) and appending maxmind data to the stream if found. Uses readable-stream for node < 0.10


## Install

```bash
npm install geoip-stream
```

Maxmind data installed, ex: free [Maxmind GeoLiteCity](http://dev.maxmind.com/geoip/legacy/geolite/) stored in ```./GeoLiteCity.dat```


## Usage

Sample ```logfile.json``` line:

```js
{"ip": "198.55.125.23", "timestamp":"2014-02-24 10:29:42", "url": "http:\/\/somedomain.com"}
```

```js
var fs          = require('fs');
var logstream   = fs.createReadStream('logfile.json');
var split       = new require('split')();
var geoipStream = require('geoip-stream');
var geoip       = new geoipStream({
	dataPath:        './GeoLiteCity.dat', // default
	memoryCache:     true,                // default
	checkForUpdates: true,                // default
	ipField:         'ip'                 // default
});

logstream
.pipe(split)
.pipe(geoip)
.pipe(process.stdout) // { "ip": ..., "countryCode": "US", "city":"Dallas", ...}
```


## License MIT
