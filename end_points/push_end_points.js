var logger = require('../utils/log');
var pushServices = require('../services/push_services');

module.exports.createPushEndPoints = function (app) {

    app.post('/push/:modelName', function (req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:push_end_points/createPushEndPoints - [POST/push/modelName]');
        pushServices.sendPushByEntities(req,res, false);
    });

    app.post('/push/:modelName/all', function (req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:push_end_points/createPushEndPoints - [POST/push/modelName/all]');
        pushServices.sendPushByEntities(req,res, true);

    });

    app.post('/push/:firstEntity/:firstId/:type/:secondEntity/all', function (req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:push_end_points/createPushEndPoints - [POST/push/:firstEntity/:firstId/:type/:secondEntity/all]');
        pushServices.sendPushByEntityRelations(req,res);
    });


    app.post('/push/notifier/apple', function (req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:push_end_points/createPushEndPoints - [POST/push/notifier/apple]');
        pushServices.setPushNotifiers(req,res, "apple");
    });

    app.post('/push/notifier/google', function (req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:push_end_points/createPushEndPoints - [POST/push/notifier/google]');
        pushServices.setPushNotifiers(req,res, "google");
    });

    app.get('/push/notifier/apple', function (req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:push_end_points/createPushEndPoints - [GET/push/notifier/apple]');
        pushServices.getPushNotifiers(req,res, "apple");
    });

    app.get('/push/notifier/google', function (req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:push_end_points/createPushEndPoints - [GET/push/notifier/google]');
        pushServices.getPushNotifiers(req,res, "google");
    });


};


// module.exports.createPushEndPoints = function (app, server_io) {

//         server_io.sockets.on('connection', function(socket){

//        	app.post('/serverpush/:channel', function (req, res) {
//         logger.info("================================================================================================");
//         logger.info('NodeGrid:push_end_points/createPushEndPoints - [POST/serverpush/:channel]');
//         socket.emit(req.params.channel, req.body);
//         var status = {"status":"SUCCESS", "data":req.body};
//         res.send(status);
// 		});
//     });
// };