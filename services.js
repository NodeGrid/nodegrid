var db = require('./db.js');
var logger = require('./utils/log');

module.exports.handlePost = function (req, res) {
    logger.info('NodeGrid:server/ Add new model (collection) with data');
    db.saveToDb(req, res);
}

module.exports.handleRelationalPost = function (req, res) {
    logger.info('NodeGrid:server/ Add new relationship');
    db.saveRelationToDb(req, res);
}

module.exports.handleGet = function (req, res) {
    logger.info('NodeGrid:server/ Query data from given model (collection)');
    db.getAllFromDB(req, res);
}

module.exports.handlePut = function (req, res) {
    logger.info('NodeGrid:server/ handle put');
    db.updateEntity(req, res);
}