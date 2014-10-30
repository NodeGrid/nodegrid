/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var queryDb = require('../db_callings/query_db_callings');
var logger = require('../utils/log');
var utils = require('../utils/utils');

/**
 * This method responsible for query and showing the data in given collection (model)
 * @param req
 * @param res
 */
module.exports.handleQueryModelGet = function (req, res) {
    logger.info('NodeGrid:query_services/ Querying attempt data from given model (collection)');
    queryDb.getAllFromDB(req,res);
 
};

/**
 * This method responsible for query and showing the data in given collection (model)
 * @param req
 * @param res
 */
module.exports.handleQueryModelGetOne = function (req, res) {
    logger.info('NodeGrid:query_services/ Querying attempt data from given model (collection)');
    queryDb.getOneFromDB(req,res);

};