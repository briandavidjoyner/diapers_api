//Dependencies 
var express = require('express');
var	app = express();
var	Promise = require('promise');
var compression = require('compression');
var API = require(__dirname + '/API.js');
var legacy = require(__dirname + '/Legacy/legacy.js');
var version3 = require(__dirname + '/V3/v3.js');
var cors = require('cors');

//Port & IP Settings
var port = process.env.PORT || 8080;
var ip = process.env.IP || '0.0.0.0';

//Middleware
app.use(compression());
var prerender = require('prerender-node').set('prerenderToken', 'LKwpFQIjf1P3WG8uNEnD');
prerender.crawlerUserAgents.push('googlebot');
prerender.crawlerUserAgents.push('bingbot');
prerender.crawlerUserAgents.push('yandex');
app.use(prerender);

//Cors Middleware
app.use(cors());

//External Routing Of Public Assets
app.use('/public', express.static(__dirname + '/public'));

//External Routing Of API
app.use('/api', API);

//External Routing Of API
app.use('/legacy', legacy);

app.use('/v3', version3)

//External Other Routes
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/views/pages/static.html');
});

//Catch All Route
app.get('*', function (req, res) {
	res.sendFile(__dirname + '/public/views/pages/index.html');
});

//app Initialize
app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);