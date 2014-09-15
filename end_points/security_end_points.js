/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */
var logger = require('../utils/log');
var securityService = require('../services/security_services');

module.exports.createSecurityEndPoints = function(app) {

    app.post('/security/generateToken', function(req, res){
        logger.info("================================================================================================");
        logger.info('NodeGrid:security_end_points/createSecurityEndPoints - [POST/security/generateToken]');
        securityService.handleGenerateTokenPost(req, res);
    });

    app.post('/security/getToken', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:security_end_points/createSecurityEndPoints - [POST/security/getToken]');
        securityService.handleGetTokenPost(req, res);
    });

    app.post('/security/checkTokenValidity', function(req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:security_end_points/createSecurityEndPoints - [POST/security/checkTokenValidity]');
        securityService.handleCheckTokenValidityPost(req, res);
    });
};