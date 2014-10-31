var tokenMaster = require('../utils/token_master');
var utils = require('../utils/utils');
var logger = require('../utils/log');
var mongo_connection = require('../utils/mongoose_connection');

module.exports.setSecureApp = function (req, res, next) {
    logger.info(req.path);

    //check mongo db connection availability
    var mongo_connection_status = mongo_connection.mongoConnectionStatus();

    if (mongo_connection_status == 'CONNECTED') {
        if (req.path.lastIndexOf('/system/') == 0) {
            next();
            return;
        }
        var accessToken = req.headers.authorization;
        tokenMaster.validateAccessToken(accessToken, function (status, response) {
            if (status == 1) {
                next();
            } else if (status == 2) {
                utils.sendResponse(res, 404, 'Not found - No valid accessToken', 'EMPTY');
            } else if (status == 3) {
                utils.sendResponse(res, 401, 'Unauthorized - Token expired', response);
            }
        });
    } else {
        //mongo db connection is not available
        utils.sendResponse(res, 503, 'Service Unavailable - MongoDB connection unavailable', 'EMPTY');
    }
};
