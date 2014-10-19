var pushDb = require('../db_callings/push_db_callings');
var pushNotifierDb = require('../db_callings/push_notifiers_db_callings');
var logger = require('../utils/log');
var tokenMaster = require('../utils/token_master');

/**
 * This method sends the push notifications based on the devices
 * @param req
 * @param res
 */
module.exports.sendPushByEntities = function (req, res, sendToAll) {
    logger.info('NodeGrid:push_services/ sendPushByEntities');
    //Access token from headers
    var accessToken = req.headers.authorization;
    tokenMaster.validateAccessToken(accessToken, function (status, response) {
        if (status == 1) {
            pushDb.getEntitiesForPush(req, res, sendToAll);
        } else {
            res.send(response);
        }
    });
};

/**
 * This method sends the push notifications based on the entity Relations
 * @param req
 * @param res
 */
module.exports.sendPushByEntityRelations = function (req, res) {
    logger.info('NodeGrid:push_services/ sendPushByEntityRelations');
    //Access token from headers
    var accessToken = req.headers.authorization;
    tokenMaster.validateAccessToken(accessToken, function (status, response) {
        if (status == 1) {
            pushDb.getEntityRelationsForPush(req, res);
        } else {
            res.send(response);
        }
    });
};

/**
 * This method sets push Notifiers
 * @param req
 * @param res
 */
module.exports.setPushNotifiers = function (req, res, type) {
    logger.info('NodeGrid:push_services/ setPushNotifiers');
    //Access token from headers
    var accessToken = req.headers.authorization;
    tokenMaster.validateAccessToken(accessToken, function (status, response) {
        if (status == 1) {
            pushNotifierDb.setNotifier(req, res, type);
        } else {
            res.send(response);
        }
    });
};

/**
 * This method gets push Notifiers
 * @param req
 * @param res
 */
module.exports.getPushNotifiers = function (req, res, type) {
    logger.info('NodeGrid:push_services/ setPushNotifiers');
    //Access token from headers
    var accessToken = req.headers.authorization;
    tokenMaster.validateAccessToken(accessToken, function (status, response) {
        if (status == 1) {
            pushNotifierDb.getNotifier(req, res, type);
        } else {
            res.send(response);
        }
    });
};