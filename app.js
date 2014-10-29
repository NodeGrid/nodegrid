var express = require('express');
var logger = require('./utils/log');
var utils = require('./utils/utils');
var io = require('socket.io');

var storingEndPoints = require('./end_points/store_end_points');
var relationsEndPoints = require('./end_points/relations_end_points');
var systemEndPoints = require('./end_points/system_end_points');
var queryEndPoints = require('./end_points/query_end_points');
var pushEndPoints = require('./end_points/push_end_points');
var secureApp = require('./security/secure_app');

var app = express();
app.use(express.bodyParser());
app.use(function(req, res, next){
	secureApp.setSecureApp(req, res, next);
});

systemEndPoints.createSystemEndPoints(app);
storingEndPoints.createStoreEndPoints(app);
relationsEndPoints.createRelationsEndPoints(app);
queryEndPoints.createQueryEndPoints(app);
pushEndPoints.createPushEndPoints(app);

//starting the server
var server = app.listen(3000, function () {
	utils.createLoggerDir(); //check logs dir exists or not, if not create logs dir
    logger.info('NodeGrid:app/ NodeGrid app started. Listen on port: ' + server.address().port);
});

// setting server io
// var server_io = io.listen(server);
// pushEndPoints.createPushEndPoints(app, server_io);
