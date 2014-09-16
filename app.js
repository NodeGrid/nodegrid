var express = require('express');
var logger = require('./utils/log');
var utils = require('./utils/utils');
var io = require('socket.io');

var storingEndPoints = require('./end_points/store_end_points');
var relationsEndPoints = require('./end_points/relations_end_points');
var securityEndPoints = require('./end_points/security_end_points');
var queryEndPoints = require('./end_points/query_end_points');
var pushEndPoints = require('./end_points/push_end_points');

var app = express();
app.use(express.bodyParser());

storingEndPoints.createStoreEndPoints(app);
relationsEndPoints.createRelationsEndPoints(app);
securityEndPoints.createSecurityEndPoints(app);
queryEndPoints.createQueryEndPoints(app);


//starting the server
var server = app.listen(3000, function () {
	utils.createLoggerDir(); //check logs dir exsits or not, if not create logs dir
    logger.info('NodeGrid:app/ NodeGrid app started. Listen on port: ' + server.address().port);
});

// setting server io
var server_io = io.listen(server);
pushEndPoints.createPushEndPoints(app, server_io);
