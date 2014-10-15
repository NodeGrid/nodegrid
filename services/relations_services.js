/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var relationsDb = require('../db_callings/relations_db_callings');
var logger = require('../utils/log');
var tokenMaster = require('../utils/token_master');

/**
 * This method responsible for creating and saving new relations among existing models
 * @param req
 * @param res
 */
module.exports.handleCreateRelationsPost = function (req, res) {
    logger.info('NodeGrid:relations_services/handleCreateRelationsPost - Adding attempt a new relationship');
    //Access token from headers
    var accessToken = req.headers.authorization;
    tokenMaster.validateAccessToken(accessToken, function (status, response) {
        if (status == 1) {
            relationsDb.saveRelationToDb(req, res);
        } else {
            res.send(response);
        }
    });
};

module.exports.handleRetrieveRelationsWithType = function (req, res) {
    logger.info('NodeGrid:relations_services/handleRetrieveRelationsWithType - Retrieving attempt relationships with entity, identifier and type');
    //Access token from headers
    var accessToken = req.headers.authorization;
    tokenMaster.validateAccessToken(accessToken, function (status, response) {
        if (status == 1) {
            relationsDb.getRelationsWithTypesFromDb(req, res);
        } else {
            res.send(response);
        }
    });
};

module.exports.handleRetrieveRelationsWithIdentifier = function (req, res) {
    logger.info('NodeGrid:relations_services/handleRetrieveRelationsWithIdentifier - Retrieving attempt relationships with entity and identifier');
    //Access token from headers
    var accessToken = req.headers.authorization;
    tokenMaster.validateAccessToken(accessToken, function (status, response) {
        if (status == 1) {
            relationsDb.getRelationsWithIdentifierFromDb(req, res);
        } else {
            res.send(response);
        }
    });
};