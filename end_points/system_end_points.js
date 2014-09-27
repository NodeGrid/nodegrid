/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */
var logger = require('../utils/log');
var systemService = require('../services/system_services');

module.exports.createSystemEndPoints = function(app) {

    app.post('/system/user/create', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [POST/system/user/create]');
        systemService.handleCreateSystemUserPost(req, res);
    });

    app.get('/system/user/get/:userId', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [GET/system/user/get/:userId]');
        systemService.handleGetSystemUserGet(req, res);
    });

    app.get('/system/user/remove/:userId', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [GET/system/user/remove/:userId]');
        systemService.handleRemoveSystemUserGet(req, res);
    });

    app.post('/system/security/generateToken', function(req, res){
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [POST/system/security/generateToken]');
        systemService.handleGenerateTokenPost(req, res);
    });

    app.post('/system/security/getToken', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [POST/system/security/getToken]');
        systemService.handleGetTokenPost(req, res);
    });

    app.post('/system/security/checkTokenValidity', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:system_end_points/createSystemEndPoints - [POST/system/security/checkTokenValidity]');
        systemService.handleCheckTokenValidityPost(req, res);
    });
};