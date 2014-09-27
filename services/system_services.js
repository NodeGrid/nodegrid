/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var systemDb = require('../db_callings/system_db_callings');
var logger = require('../utils/log');

module.exports.handleCreateSystemUserPost = function (req, res) {
    logger.info('NodeGrid:system_services/handleCreateSystemUserPost - Create new system user');
    res.send("Get new system user create req");
};

module.exports.handleGetSystemUserGet = function (req, res) {
    logger.info('NodeGrid:system_services/handleGetSystemUserGet - Query given system user');
    res.send("Get query req to get given system user");
};

module.exports.handleRemoveSystemUserGet = function (req, res) {
    logger.info('NodeGrid:system_services/handleRemoveSystemUserGet - Remove given system user');
    res.send("Get remove req to delete given system user");
};

module.exports.handleGenerateTokenPost = function (req, res) {
    logger.info('NodeGrid:system_services/handleGenerateTokenPost - Generating new user security token');
    res.send("Get generate token req");
};

module.exports.handleGetTokenPost = function (req, res) {
    logger.info('NodeGrid:system_services/handleGetTokenPost - Returning generated user security token');
    res.send("Get returning token req");
};

module.exports.handleCheckTokenValidityPost = function (req, res) {
    logger.info('NodeGrid:system_services/handleCheckTokenValidityPost - Checking the validity of given user security token');
    res.send("Get check token validity req");
};