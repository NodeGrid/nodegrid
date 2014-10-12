/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var systemDb = require('../db_callings/system_db_callings');
var tokenMaster = require('../utils/token_master');
var logger = require('../utils/log');

module.exports.handleCreateSystemUserPost = function (req, res) {
    logger.info('NodeGrid:system_services/handleCreateSystemUserPost - Create new system user');
    systemDb.createNewSystemUser(req, res);
};

module.exports.handleGetSystemUserFromUserIdGet = function (req, res) {
    logger.info('NodeGrid:system_services/handleGetSystemUserFromUserIdGet - Query given system user from userId');

    var userId = req.params.userId;
    systemDb.getSystemUser(userId, 'USER_ID', function(status, data) {
        res.send(data);
    });
};

module.exports.handleGetSystemUserFromUsernameGet = function (req, res) {
    logger.info('NodeGrid:system_services/handleGetSystemUserFromUsernameGet - Query given system user from username');

    var username = req.params.username;
    systemDb.getSystemUser(username, 'USERNAME', function (status, data) {
        res.send(data);
    });
};

module.exports.handleRemoveSystemUserGet = function (req, res) {
    logger.info('NodeGrid:system_services/handleRemoveSystemUserGet - Remove given system user');
    systemDb.removeSystemUser(req, res);
};

module.exports.handleGenerateTokenPost = function (req, res) {
    logger.info('NodeGrid:system_services/handleGenerateTokenPost - Generating new user security token');
    tokenMaster.generateUserToken(req, res);
};

module.exports.handleGetTokenPost = function (req, res) {
    logger.info('NodeGrid:system_services/handleGetTokenPost - Returning generated user security token');
    res.send("Get returning token req");
};

module.exports.handleCheckTokenValidityPost = function (req, res) {
    logger.info('NodeGrid:system_services/handleCheckTokenValidityPost - Checking the validity of given user security token');
    res.send("Get check token validity req");
};