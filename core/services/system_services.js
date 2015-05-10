/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var systemDb = require('../db_callings/system_db_callings');
var tokenMaster = require('../utils/token_master');
var logger = require('../utils/log');
var utils = require('../utils/utils');

module.exports.handleCreateSystemUserPost = function (req, res) {
    logger.info('NodeGrid:system_services/handleCreateSystemUserPost - Create new system user');
    systemDb.createNewSystemUser(req, res);
};

module.exports.handleGetSystemUserFromUserParamGet = function (req, res) {
    logger.info('NodeGrid:system_services/handleGetSystemUserFromUserParamGet - Query given system user from userId');

    var userParam = req.params.userParam;

    if (userParam.length == 24) {
        // First check from UserID, because given parameter is on user-id pattern.
        systemDb.getSystemUser(userParam, 'USER_ID', function(status, data) {
            if (status == 1) {
                utils.sendResponse(res, 200, 'Data retrieved successfully', data);
            } else {
                if (status == 2) {
                    utils.sendResponse(res, 500, 'Internal Server Error - Error occurred at system_users entity database check', 'EMPTY');
                } else {
                    // No data available from given parameter against user-id.
                    // Check data from UserName
                    systemDb.getSystemUser(userParam, 'USERNAME', function (status, data) {
                        if (status == 1) {
                            utils.sendResponse(res, 200, 'Data retrieved successfully', data);
                        } else {
                            if (status == 2) {
                                utils.sendResponse(res, 500, 'Internal Server Error - Error occurred at system_users entity database check', 'EMPTY');
                            } else {
                                utils.sendResponse(res, 410, 'No records found from given system user-id or username', 'EMPTY');
                            }
                        }
                    });
                }
            }
        });
    } else {
        // Given parameter is not in UserID pattern. Check data from UserName
        systemDb.getSystemUser(userParam, 'USERNAME', function (status, data) {
            if (status == 1) {
                utils.sendResponse(res, 200, 'Data retrieved successfully', data);
            } else {
                if (status == 2) {
                    utils.sendResponse(res, 500, 'Internal Server Error - Error occurred at system_users entity database check', 'EMPTY');
                } else {
                    utils.sendResponse(res, 410, 'No records found from given system user-id or username', 'EMPTY');
                }
            }
        });
    }
};

/*module.exports.handleGetSystemUserFromUsernameGet = function (req, res) {
    logger.info('NodeGrid:system_services/handleGetSystemUserFromUsernameGet - Query given system user from username');

    var username = req.params.username;
    systemDb.getSystemUser(username, 'USERNAME', function (status, data) {
        if (status == 1) {
            utils.sendResponse(res, 200, 'Data retrieved successfully', data);
        } else {
            if (status == 2) {
                utils.sendResponse(res, 500, 'Internal Server Error - Error occurred at system_users entity database check', 'EMPTY');
            } else {
                utils.sendResponse(res, 204, 'No records found from given system userId', 'EMPTY');
            }
        }
    });
};*/

module.exports.handleRemoveSystemUserDelete = function (req, res) {
    logger.info('NodeGrid:system_services/handleRemoveSystemUserDelete - Remove given system user');
    systemDb.removeSystemUser(req, res);
};

module.exports.handleGenerateTokenPost = function (req, res) {
    logger.info('NodeGrid:system_services/handleGenerateTokenPost - Generating new user security token');
    tokenMaster.generateUserToken(req, res);
};

module.exports.getSystemStatus = function (req, res) {
    logger.info('NodeGrid:system_services/getSystemStatus - Get current system status');
    systemDb.checkSystemStatus(req, res);
};

module.exports.handleGetCollections = function(req, res){	
    logger.info('NodeGrid:system_services/handleGetCollections - Get current system collection list');
    systemDb.getCollections(req, res);
};

/*
module.exports.handleGetTokenPost = function (req, res) {
    logger.info('NodeGrid:system_services/handleGetTokenPost - Returning generated user security token');
    res.send("Get returning token req");
};

module.exports.handleCheckTokenValidityPost = function (req, res) {
    logger.info('NodeGrid:system_services/handleCheckTokenValidityPost - Checking the validity of given user security token');
    res.send("Get check token validity req");
};*/
