/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */
var logger = require('../utils/log');
var systemService = require('../services/system_services');

module.exports.createSystemEndPoints = function(app) {

    //Create new system user
    app.post('/system/user/create', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [POST/system/user/create]');
        systemService.handleCreateSystemUserPost(req, res);
    });

    //Get given system user from userId
    app.get('/system/user/get/user_id/:userId', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [GET/system/user/get/user_id/:userId]');
        systemService.handleGetSystemUserFromUserIdGet(req, res);
    });

    //Get given system user from username
    app.get('/system/user/get/username/:username', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [GET/system/user/get/username/:username]');
        systemService.handleGetSystemUserFromUsernameGet(req, res);
    });

    //Remove given system user
    app.get('/system/user/remove/:userId', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [GET/system/user/remove/:userId]');
        systemService.handleRemoveSystemUserGet(req, res);
    });


    //Generate security token
    app.post('/system/security/generateToken', function(req, res){
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [POST/system/security/generateToken]');
        systemService.handleGenerateTokenPost(req, res);
    });

    //Get generated user security token
    app.post('/system/security/getToken', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [POST/system/security/getToken]');
        systemService.handleGetTokenPost(req, res);
    });

    //Check the validity of given security token
    app.post('/system/security/checkTokenValidity', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [POST/system/security/checkTokenValidity]');
        systemService.handleCheckTokenValidityPost(req, res);
    });
};