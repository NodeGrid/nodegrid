/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var systemDb = require('../db_callings/system_db_callings');
var logger = require('../utils/log');

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