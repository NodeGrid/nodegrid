var logger = require('../utils/log');
var utils = require('../utils/utils');
var mongo_connection = require('../utils/mongoose_connection');

var connectionObj = mongo_connection.createMongooseConnection();

var mongoose = connectionObj.mongooseObj;
var entity = connectionObj.entityObj;

/**
 * Creating new mongo collections of saving new mongo object in given collection
 * @param req
 * @param res
 */
module.exports.setNotifier = function (req, res, type) {

    if (req.body.server_key != null) {
        var entityModel = mongoose.model('push_notifiers', entity);
        req.body['name'] = type;
        entityModel.update({name: type}, {data: req.body}, {upsert: true}, function (err, notifiers) {
            if (err) {
                logger.info("NodeGrid:push_notifier_db_callings/setNotifier - [" + type + "] data updating was failed. ERROR: " + err);
                utils.sendResponse(res, 500, 'Internal Server Error - [' + type + '] data updating was failed', err);
            } else {
                utils.sendResponse(res, 200, '[' + type + '] Push notifier updated successfully', req.body);
            }
        });
    } else {
        logger.info("NodeGrid:push_notifier_db_callings/setNotifier - [server_key] can't be empty.");
        utils.sendResponse(res, 400, "Bad Request - [server_key] can't be empty", 'EMPTY');
    }
};

/**
 * Creating new mongo collections of saving new mongo object in given collection
 * @param req
 * @param res
 */
module.exports.getNotifier = function (req, res, type) {

    var entityModel = mongoose.model('push_notifiers', entity);
    entityModel.findOne({name:type},function (err, notifiers) {
        if (err) {
            logger.info("NodeGrid:push_notifier_db_callings/getNotifier - ["+type+"] data querying was failed. ERROR: " + err);
            utils.sendResponse(res, 500, 'Internal Server Error - ['+type+'] data retrieving was failed', err);
        } else {
            utils.sendResponse(res, 200, '['+type+'] Push notifier retrieved successfully', notifiers);
        }
    });
};