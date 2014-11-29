var pushDb = require('../db_callings/push_db_callings');
var pushNotifierDb = require('../db_callings/push_notifiers_db_callings');
var logger = require('../utils/log');
var utils = require('../utils/utils');

/**
 * This method sends the push notifications based on the devices
 * @param req
 * @param res
 */
module.exports.sendPushByEntities = function (req, res, sendToAll) {
    logger.info('NodeGrid:push_services/sendPushByEntities - sendPushByEntities');
    pushDb.getEntitiesForPush(req, res, sendToAll);

};

/**
 * This method sends the push notifications based on the entity Relations
 * @param req
 * @param res
 */
module.exports.sendPushByEntityRelations = function (req, res) {
    logger.info('NodeGrid:push_services/sendPushByEntityRelations - sendPushByEntityRelations');
    pushDb.getEntityRelationsForPush(req, res);

};

/**
 * This method sets push Notifiers
 * @param req
 * @param res
 */
module.exports.setPushNotifiers = function (req, res, type) {
    logger.info('NodeGrid:push_services/setPushNotifiers - setPushNotifiers');
    pushNotifierDb.setNotifier(req, res, type);

};

/**
 * This method gets push Notifiers
 * @param req
 * @param res
 */
module.exports.getPushNotifiers = function (req, res, type) {
    logger.info('NodeGrid:push_services/getPushNotifiers - setPushNotifiers');
    pushNotifierDb.getNotifier(req, res, type);
};