/**
 * Created by kavi707 on 9/6/14.
 */

var db = require('../db.js');
var logger = require('../utils/log');

module.exports.handleQueryModelGet = function (req, res) {
    logger.info('NodeGrid:query_services/ Querying attempt data from given model (collection)');
    db.getAllFromDB(req, res);
}