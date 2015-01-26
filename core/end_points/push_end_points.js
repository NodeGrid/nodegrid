var logger = require('../utils/log');
var pushServices = require('../services/push_services');

module.exports.createPushEndPoints = function (app) {

    app.post('/app/push/:modelName', function (req, res) {
        logger.info('NodeGrid:push_end_points/createPushEndPoints - [POST/app/push/modelName]');
        pushServices.sendPushByEntities(req,res, false);
    });

    app.post('/app/push/:modelName/all', function (req, res) {
        logger.info('NodeGrid:push_end_points/createPushEndPoints - [POST/app/push/modelName/all]');
        pushServices.sendPushByEntities(req,res, true);

    });

    app.post('/app/push/:firstEntity/:firstId/:type/:secondEntity/all', function (req, res) {
        logger.info('NodeGrid:push_end_points/createPushEndPoints - [POST/app/push/:firstEntity/:firstId/:type/:secondEntity/all]');
        pushServices.sendPushByEntityRelations(req,res);
    });

    app.post('/app/push/notifier/apple', function (req, res) {
        logger.info('NodeGrid:push_end_points/createPushEndPoints - [POST/app/push/notifier/apple]');
        pushServices.setPushNotifiers(req,res, "apple");
    });

    app.post('/app/push/notifier/google', function (req, res) {
        logger.info('NodeGrid:push_end_points/createPushEndPoints - [POST/app/push/notifier/google]');
        pushServices.setPushNotifiers(req,res, "google");
    });

    app.get('/app/push/notifier/apple', function (req, res) {
        logger.info('NodeGrid:push_end_points/createPushEndPoints - [GET/app/push/notifier/apple]');
        pushServices.getPushNotifiers(req,res, "apple");
    });

    app.get('/app/push/notifier/google', function (req, res) {
        logger.info('NodeGrid:push_end_points/createPushEndPoints - [GET/app/push/notifier/google]');
        pushServices.getPushNotifiers(req,res, "google");
    });
};
