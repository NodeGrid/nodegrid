/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */
var logger = require('../utils/log');
var systemService = require('../services/system_services');

module.exports.createSystemEndPoints = function(app) {

    // Check NodeGrid application status
    app.get('/system/status', function(req, res){
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [GET/system/status]');
        systemService.getSystemStatus(req, res);
    });

    // Create new system user
    app.post('/system/user', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [POST/system/user]');
        systemService.handleCreateSystemUserPost(req, res);
    });

    // Get given system user from userId
    app.get('/system/user/:userParam', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [GET/system/user/:userParam]');
        systemService.handleGetSystemUserFromUserParamGet(req, res);
    });

    // Get given system user from username
    /*app.get('/system/user/get/username/:username', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [GET/system/user/get/username/:username]');
        systemService.handleGetSystemUserFromUsernameGet(req, res);
    });*/

    // Remove given system user
    app.del('/system/user/:userId', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [DELETE/system/user/:userId]');
        systemService.handleRemoveSystemUserDelete(req, res);
    });


    // Generate security token
    app.post('/system/security/generateToken', function(req, res){
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [POST/system/security/generateToken]');
        systemService.handleGenerateTokenPost(req, res);
    });

    //Getting system collections
    app.get('/app/collections', function(req, res){
        logger.info("================================================================================================");	
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [GET/system/collections]');
   	systemService.handleGetCollections(req, res);
    });

};
