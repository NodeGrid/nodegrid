/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var logger = require('../utils/log');
var utils = require('../utils/utils');
var mongo_connection = require('../utils/mongoose_connection');
var extend = require('node.extend');

var connectionObj = mongo_connection.createMongooseConnection();

var mongoose = connectionObj.mongooseObj;
var entity = connectionObj.entityObj;

/**
 * Creating new mongo collections of saving new mongo object in given collection
 * @param req
 * @param res
 */
module.exports.saveModelOrEntityToDb = function (req, res) {

    var entityModel = mongoose.model(req.params.modelName, entity);
    var newEntity = new entityModel({ data: req.body });
    newEntity.save(function (err, savedEntity) {
        if (err) {
            logger.info("NodeGrid:store_db_callings/saveModelOrEntityToDb - New model adding failed. ERROR: " + err);
            utils.sendResponse(res, 500, "Internal Server Error - New model adding failed", err);
        } else {
            logger.info("NodeGrid:store_db_callings/saveModelOrEntityToDb - New model added successfully. OBJECT: " + JSON.stringify(savedEntity));
            utils.sendResponse(res, 200, "New model added successfully", savedEntity);
        }
    });
};

/**
 * Update object in given mongo collections
 * @param req
 * @param res
 */
module.exports.updateEntity = function (req, res) {

    var entityModel = mongoose.model(req.params.modelName, entity);

    entityModel.findOne({_id: req.params.id}, function (err, oldEntity) {
        if (err) {
            logger.info("NodeGrid:store_db_callings/updateEntity - Object updating was failed. ERROR: " + err);
        } else {
            Object.keys(req.body).forEach(function(key) {
            delete oldEntity.data[key];
            });
            var destObject = extend(req.body, oldEntity.data);
            entityModel.update({_id: req.params.id}, {data: destObject}, function (err, savedEntity) {
                if (err) {
                    logger.info("NodeGrid:store_db_callings/updateEntity - Object updating was failed. ERROR: " + err);
                    utils.sendResponse(res, 500, "Internal Server Error - Object updating was failed.", err);
                } else {
                    logger.info("NodeGrid:store_db_callings/updateEntity - Object updated successfully. OBJECT: " + JSON.stringify(savedEntity));
                    utils.sendResponse(res, 200, "Object updated successfully", savedEntity);
                }
            });

        }
    });
};

/**
 * Query One object from given mongo collection
 * @param req
 * @param res
 */
module.exports.deleteEntity = function (req, res) {

    var entityModel = mongoose.model(req.params.modelName, entity);
    entityModel.findOneAndRemove({_id: req.params.id}, function (err, records) {
        if (err) {
            logger.info("NodeGrid:query_db_callings/deleteEntity - [" + req.params.modelName + "] data querying was failed. ERROR: " + err);
            utils.sendResponse(res, 500, "Internal Server Error - [" + req.params.modelName + "] data querying was failed.", err);
        } else {
            if (records != 0) {
                logger.info("NodeGrid:query_db_callings/deleteEntity - [" + req.params.modelName + "] data successfully deleted");
                utils.sendResponse(res, 200, "[" + req.params.modelName + "] data successfully deleted", records);
            } else {
                logger.info("NodeGrid:query_db_callings/deleteEntity - No [" + req.params.modelName + "] data content deleted");
                utils.sendResponse(res, 204, "No [" + req.params.modelName + "] data content deleted", "EMPTY");
            }
        }
    });

};