/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var relationsDb = require('../db_callings/relations_db_callings');
var logger = require('../utils/log');

/**
 * This method responsible for creating and saving new relations among existing models
 * @param req
 * @param res
 */
module.exports.handleCreateRelationsPost = function (req, res) {
    logger.info('NodeGrid:relations_services/ Adding attempt a new relationship');
    relationsDb.saveRelationToDb(req, res);
};