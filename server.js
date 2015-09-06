/**
 * @file Our server file, a minimal Express setup
 */
'use_strict';

var
    express = require('express'),
    fs = require('fs'),
    app = express(),

    // super-uber-mega-simple caching for static assets
    cache = {};

// set our base folder for static items
app.use(express.static('static'));


//
// ========================================================
// Routing setup
//
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    if (typeof cache['index.html'] === 'undefined') {
        cache['index.html'] = fs.readFileSync('./static/index.html');
    }
    res.send(cache['index.html']);
});


//
// ========================================================
// Server setup
//
var server = app.listen(8080, function() {
    var
        host = server.address().address,
        port = server.address().port;

    console.log('>> App started: http://%s:%s', host, port);
});