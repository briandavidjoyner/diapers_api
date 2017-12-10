//Dependencies 
var express = require('express');
var	app = express();
var	Promise = require('promise');
var compression = require('compression');
var API = require(__dirname + '/API.js');

//Port & IP Settings
var port = process.env.PORT || 8080;
var ip = process.env.IP || 'localhost';

//Middleware
app.use(compression());

//External Routing Of Public Assets
app.use('/public', express.static(__dirname + '/public'));

//External Routing Of API
app.use('/api', API);

//External Other Routes
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/views/pages/static.html');
});

app.get('/db', function (req, res) {
	res.send(process.env.MONGODB_DATABASE || 'admin');
});

app.get('*', function (req, res) {
	res.sendFile(__dirname + '/public/views/pages/index.html');

});

//app Initialize
app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;