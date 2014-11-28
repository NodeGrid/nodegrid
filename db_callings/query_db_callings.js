/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var logger = require('../utils/log');
var utils = require('../utils/utils');
var mongo_connection = require('../utils/mongoose_connection');
var connectionObj = mongo_connection.createMongooseConnection();

var mongoose = connectionObj.mongooseObj;
var entity = connectionObj.entityObj;

/**
 * Query all object from given mongo collection
 * @param req
 * @param res
 */
module.exports.getAllFromDB = function (req, res) {

    var entityModel = mongoose.model(req.params.modelName, entity);
    entityModel.find({}, function (err, records) {
        if (err) {
            logger.info("NodeGrid:query_db_callings/getAllFromDB - [" + req.params.modelName + "] data querying was failed. ERROR: " + err);
            utils.sendResponse(res, 500, 'Internal Server Error - [' + req.params.modelName + '] data querying was failed', err);
        } else {
            logger.info("NodeGrid:query_db_callings/getAllFromDB - [" + req.params.modelName + "] data successfully retrieved");
            utils.sendResponse(res, 200, '[' + req.params.modelName + '] data successfully retrieved', records);
        }
    });

};

/**
 * Query One object from given mongo collection
 * @param req
 * @param res
 */
module.exports.getOneFromDB = function (req, res) {

    var entityModel = mongoose.model(req.params.modelName, entity);
    entityModel.findOne({_id: req.params.id}, function (err, records) {
        if (err) {
            logger.info("NodeGrid:query_db_callings/getAllFromDB - [" + req.params.modelName + "] data querying was failed. ERROR: " + err);
            utils.sendResponse(res, 500, 'Internal Server Error - [' + req.params.modelName + '] data querying was failed', err);
        } else {
            logger.info("NodeGrid:query_db_callings/getAllFromDB - [" + req.params.modelName + "] data successfully retrieved");
            utils.sendResponse(res, 200, '[' + req.params.modelName + '] data successfully retrieved', records);
        }
    });

};

module.exports.getFromDBAdvance = function (selectObj, whereObj, sort, limit, req, res) {

    var entityModel = mongoose.model(req.params.modelName, entity);
    var query = entityModel.find(whereObj, selectObj);
    if (sort != 'undefined') {
        query.sort(sort);
    }
    if (limit != 'undefined') {
        query.limit(limit);
    }
    query.exec(function (err, records) {
        if (err) {
            logger.info("NodeGrid:query_db_callings/getAllFromDB - [" + req.params.modelName + "] data querying was failed. ERROR: " + err);
            utils.sendResponse(res, 500, 'Internal Server Error - ['+ req.params.modelName +'] data querying was failed', err);
        } else {
            logger.info("NodeGrid:query_db_callings/getAllFromDB - [" + req.params.modelName + "] data successfully retrieved");
            utils.sendResponse(res, 200, '['+ req.params.modelName +'] data successfully retrieved', records);
        }
    });
};