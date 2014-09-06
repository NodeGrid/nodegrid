/**
 * Created by kavi707 on 9/6/14.
 */

var db = require('../db.js');
var logger = require('../utils/log');

module.exports.handleCreateRelationsPost = function (req, res) {
    logger.info('NodeGrid:relations_services/ Adding attempt a new relationship');
    db.saveRelationToDb(req, res);
};