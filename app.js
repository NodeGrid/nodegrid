var express = require('express');
var logger = require('./core/utils/log');
var utils = require('./core/utils/utils');
var io = require('socket.io');

var fs = require('fs');
var configurations = JSON.parse(fs.readFileSync('config.json', encoding="ascii"));

var analytics = require('./analytics/analytics_services');
var storingEndPoints = require('./core/end_points/store_end_points');
var relationsEndPoints = require('./core/end_points/relations_end_points');
var systemEndPoints = require('./core/end_points/system_end_points');
var queryEndPoints = require('./core/end_points/query_end_points');
var pushEndPoints = require('./core/end_points/push_end_points');
var secureApp = require('./core/security/secure_app');

var app = express();
app.use(express.bodyParser());

if(configurations.ENABLE_ANALYTICS){
	app.use(function(req, res, next){
		analytics.save(req,res,next);
		next();
	});
};

if(configurations.SECURE_APP){
	app.use(function(req,res,next){
		secureApp.setSecureApp(req, res, next);
	});
};

app.use(function(req,res,next){
	secureApp.setCORS(req, res, next);
	next();
});
app.use("/analytics", express.static(__dirname + '/analytics/ui'));
app.use("/portal", express.static(__dirname + '/portal'));

systemEndPoints.createSystemEndPoints(app);
analytics.createSystemAnalyticsEndPoints(app);
storingEndPoints.createStoreEndPoints(app);
relationsEndPoints.createRelationsEndPoints(app);
queryEndPoints.createQueryEndPoints(app);
pushEndPoints.createPushEndPoints(app);

//starting the server
var server = app.listen(configurations.APP_PORT, function () {
	utils.createLoggerDir(); //check logs dir exists or not, if not create logs dir
    logger.info('NodeGrid:app/ NodeGrid app started. Listen on port: ' + server.address().port);
});

// setting server io
// var server_io = io.listen(server);
// pushEndPoints.createPushEndPoints(app, server_io);
