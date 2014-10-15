/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var queryDb = require('../db_callings/query_db_callings');
var logger = require('../utils/log');
var tokenMaster = require('../utils/token_master');

/**
 * This method responsible for query and showing the data in given collection (model)
 * @param req
 * @param res
 */
module.exports.handleQueryModelGet = function (req, res) {
    logger.info('NodeGrid:query_services/ Querying attempt data from given model (collection)');
    //Access token from headers
    var accessToken = req.headers.authorization;
    tokenMaster.validateAccessToken(accessToken, function (status, response) {
        if (status == 1) {
            queryDb.getAllFromDB(req,res);
        } else {
            res.send(response);
        }
    });
};