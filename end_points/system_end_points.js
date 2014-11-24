/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */
var logger = require('../utils/log');
var systemService = require('../services/system_services');

module.exports.createSystemEndPoints = function(app) {

    //Create new system user
    app.post('/system/api/user', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [POST/system/api/user]');
        systemService.handleCreateSystemUserPost(req, res);
    });

    //Get given system user from userId
    app.get('/system/api/user/:userParam', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [GET/system/api/user/:userParam]');
        systemService.handleGetSystemUserFromUserParamGet(req, res);
    });

    //Get given system user from username
    /*app.get('/system/user/get/username/:username', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [GET/system/user/get/username/:username]');
        systemService.handleGetSystemUserFromUsernameGet(req, res);
    });*/

    //Remove given system user
    app.del('/system/api/user/:userId', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [DELETE/system/api/user/:userId]');
        systemService.handleRemoveSystemUserDelete(req, res);
    });


    //Generate security token
    app.post('/system/api/security/generateToken', function(req, res){
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [POST/system/api/security/generateToken]');
        systemService.handleGenerateTokenPost(req, res);
    });

    app.get('/system/api/status', function(req, res){
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [GET/system/api/status]');
        systemService.getSystemStatus(req, res);
    });

    //Get generated user security token
    /*app.post('/system/security/getToken', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [POST/system/security/getToken]');
        systemService.handleGetTokenPost(req, res);
    });*/

    //Check the validity of given security token
    /*app.post('/system/security/checkTokenValidity', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [POST/system/security/checkTokenValidity]');
        systemService.handleCheckTokenValidityPost(req, res);
    });*/
};
