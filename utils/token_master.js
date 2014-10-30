/**
 * Created by kavi707 on 10/12/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var crypto = require('crypto');
var bCrypt = require('bcrypt-nodejs');
var logger = require('./log');
var utils = require('./utils');
var systemDb = require('../db_callings/system_db_callings');

module.exports.generateUserToken = function (req, res) {

    var current_date = (new Date()).valueOf().toString();
    var currentTimestamp = Math.round((new Date()).getTime() / 1000);
    var random = Math.random().toString();

    systemDb.getSystemUser(req.body.username, 'USERNAME', function (status, resultData) {
        if (status == 1) {
            // check user credentials
            if (bCrypt.compareSync(req.body.password, resultData[0].data.password)) {

                var accessToken;

                systemDb.checkTokenExistence(resultData[0]._id, function (status, checkData) {
                    if (status == 1) {
                        //var userToken = (crypto.createHash('sha1').update(current_date + req.body.username + req.body.password).digest('hex'));
                        accessToken = (crypto.createHash('sha1').update(current_date + random + req.body.username).digest('hex'));
                        var tokenDbObject = {
                            "accessToken": accessToken,
                            "userId": resultData[0]._id,
                            "createdTime": currentTimestamp,
                            "expiringTime":(currentTimestamp + (3600 * 24)),
                            "status":"valid"
                        };
                        systemDb.saveNewToken(tokenDbObject, function (status, response){
                            logger.info("NodeGrid:token_master/generateUserToken - Saving new token");
                            if (status == 1) {
                                utils.sendResponse(res, 200, 'New accessToken saved successfully', response);
                            } else {
                                utils.sendResponse(res, 500, 'Internal Server Error - New token adding failed', response);
                            }
                        });
                    } else {
                        if (status == 2) {
                            accessToken = (crypto.createHash('sha1').update(current_date + random + req.body.username).digest('hex'));
                            systemDb.updateExpiredToken(checkData[0], accessToken, currentTimestamp, function (status, response) {
                                logger.info("NodeGrid:token_master/generateUserToken - Updating existing token");
                                if (status == 1) {
                                    utils.sendResponse(res, 200, 'AccessToken updated successfully', response);
                                } else {
                                    utils.sendResponse(res, 500, 'Internal Server Error - AccessToken object updating failed', response);
                                }
                            });
                        } else {
                            utils.sendResponse(res, 409, 'Conflict - Valid token already exist', checkData);
                        }
                    }
                });

            } else {
                logger.info("NodeGrid:token_master/generateUserToken - User authentication failed. Please check username & password");
                utils.sendResponse(res, 401, 'Unauthorized - Please check username & password', 'EMPTY');
            }
        } else {
            logger.info("NodeGrid:token_master/generateUserToken - No user found from given username");
            utils.sendResponse(res, 401, 'Unauthorized - No user found', 'EMPTY');
        }
    });
};

module.exports.validateAccessToken = function (accessToken, callback) {

    systemDb.checkTokenValidity(accessToken, function (status, resultData) {
        if (status == 1) {
            logger.info("NodeGrid:token_master/validateAccessToken - Valid accessToken received");
            callback(1, resultData);
        } else if (status == 2) {
            logger.info("NodeGrid:token_master/validateAccessToken - No valid token records from given token");
            callback(2, resultData);
        } else if (status == 3) {
            logger.info("NodeGrid:token_master/validateAccessToken - Given token is expired");
            callback(3, resultData);
        }
    });
};