/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var storeDb = require('../db_callings/store_db_callings');
var logger = require('../utils/log');

module.exports.handleStoreModelsPost = function (req, res) {
    logger.info('NodeGrid:store_services/ Adding attempt a new model (collection) with data');
    storeDb.saveModelOrEntityToDb(req, res);
};

module.exports.handleStoreModelsPut = function (req, res) {
    logger.info('NodeGrid:store_services/ handle put');
    storeDb.updateEntity(req, res);
};