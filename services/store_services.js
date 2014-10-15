/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var storeDb = require('../db_callings/store_db_callings');
var logger = require('../utils/log');
var tokenMaster = require('../utils/token_master');

/**
 * This method handles new collection creating and add objects to given collections
 * @param req
 * @param res
 */
module.exports.handleStoreModelsPost = function (req, res) {
    logger.info('NodeGrid:store_services/ Adding attempt a new model (collection) with data');
    //Access token from headers
    var accessToken = req.headers.authorization;
    tokenMaster.validateAccessToken(accessToken, function (status, response) {
        if (status == 1) {
            storeDb.saveModelOrEntityToDb(req, res);
        } else {
            res.send(response);
        }
    });
};

/**
 * This method responsible for update existing objects in given collections
 * @param req
 * @param res
 */
module.exports.handleStoreModelsPut = function (req, res) {
    logger.info('NodeGrid:store_services/ handle put');
    storeDb.updateEntity(req, res);
};