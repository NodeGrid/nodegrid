/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var storeDb = require('../db_callings/store_db_callings');
var logger = require('../utils/log');
var utils = require('../utils/utils');

/**
 * This method handles new collection creating and add objects to given collections
 * @param req
 * @param res
 */
module.exports.handleStoreModelsPost = function (req, res) {
    logger.info('NodeGrid:store_services/handleStoreModelsPost - Adding attempt a new model (collection) with data');
    storeDb.saveModelOrEntityToDb(req, res);
};

/**
 * This method responsible for update existing objects in given collections
 * @param req
 * @param res
 */
module.exports.handleStoreModelsPut = function (req, res) {
    logger.info('NodeGrid:store_services/handleStoreModelsPut - handle put');
    storeDb.updateEntity(req, res);
};

/**
 * This method responsible for deleting existing objects in given collections
 * @param req
 * @param res
 */
module.exports.handleDeleteModelsItem = function (req, res) {
    logger.info('NodeGrid:store_services/handleDeleteModelsItem - handle put');
    storeDb.deleteEntity(req, res);

};