/**
 * Created by kavi707 on 9/6/14.
 */

var db = require('../db.js');
var logger = require('../utils/log');

module.exports.handleStoreModelsPost = function (req, res) {
    logger.info('NodeGrid:store_services/ Adding attempt a new model (collection) with data');
    db.saveToDb(req, res);
};

module.exports.handleStoreModelsPut = function (req, res) {
    logger.info('NodeGrid:store_services/ handle put');
    db.updateEntity(req, res);
};