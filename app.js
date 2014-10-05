var express        = require('express');
var https          = require('https');
var http           = require('http');
var fs             = require('fs');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var MongoClient    = require('mongodb').MongoClient, // Driver for connecting to MongoDB
	routes = require('./routes'); // Routes for our application
var config = require('./config');
var directory = require('serve-index');

// This line is from the Node.js HTTPS documentation.
//http://wiki.openbravo.com/wiki/How_To_Configure_SSL_For_Windows
// set OPENSSL_CONF=d:\Apache2\conf\openssl.cnf
// PEM passphrase = test
/*
var options = {
	key: fs.readFileSync('keys/key.pem'),
	cert: fs.readFileSync('keys/cert.pem')
};
*/
var options = {}
//TODO: did not make it work with passphrase hardcoded, but maybe better not to put passphrase here:
// var options = {
//   key: [ fs.readFileSync('keys/tomcatkey.pem'), 'test' ],
//   cert: [ fs.readFileSync('keys/tomcatcert.pem'), 'test' ]
// };

var app            = express();
var HTTP_PORT      = 8000;
var HTTPS_PORT     = 9444;

MongoClient.connect(config.MONGO, function(err, db) {
	"use strict";
	if(err) throw err;

	app.use(morgan('dev'));                     // log every request to the console
	app.use(bodyParser());                      // pull information from html in POST
	app.use(methodOverride());                  // simulate DELETE and PUT

	// var oneDay = 86400000;
	// app.use(express.static('filesdir', { maxAge: oneDay }));
	// app.use(directory('filesdir', {'icons': true}))

    // Application routes
    routes(app, db);

	// Create an HTTP service.
	http.createServer(app).listen(HTTP_PORT);
	// Create an HTTPS service identical to the HTTP service.
	//https.createServer(options, app).listen(HTTPS_PORT);


    console.log("App listening on HTTP port " + HTTP_PORT);
    console.log("App listening on HTTPS port " + HTTPS_PORT);


});
