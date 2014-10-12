/**
 * Created by kavi707 on 10/12/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var crypto = require('crypto');
var bCrypt = require('bcrypt-nodejs');
var logger = require('./log');
var systemDb = require('../db_callings/system_db_callings');

module.exports.generateUserToken = function (req, res) {

    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();

    systemDb.getSystemUser(req.body.username, 'USERNAME', function (status, resultData) {
        if (status == 1) {
            // check user credentials
            if (bCrypt.compareSync(req.body.password, resultData[0].data.password)) {

                systemDb.checkTokenExistence(resultData[0]._id, function (status, checkData) {
                    if (status == 1) {
                        //var userToken = (crypto.createHash('sha1').update(current_date + req.body.username + req.body.password).digest('hex'));
                        var accessToken = (crypto.createHash('sha1').update(current_date + random + req.body.username).digest('hex'));
                        var tokenDbObject = {
                            "accessToke": accessToken,
                            "userId": resultData[0]._id
                        };
                        systemDb.saveNewToken(tokenDbObject, function (response){
                            res.send(response);
                        });
                    } else {
                        res.send(checkData);
                    }
                });

            } else {
                logger.info("NodeGrid:token_master/generateUserToken - User authentication failed. Please check username & password");
                res.send("User authentication failed. Please check username & password");
            }
        } else {
            logger.info("NodeGrid:token_master/generateUserToken - No user found from given username");
            res.send("No user found from given username");
        }
    });
};

module.exports.validateAccessToken = function (username, userToken, accessToken) {

};