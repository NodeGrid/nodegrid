var tokenMaster = require('../utils/token_master');
var utils = require('../utils/utils');
var logger = require('../utils/log');
var mongo_connection = require('../utils/mongoose_connection');

//these URL are skips from the Token Valiations
var skipAuth = [
    "/system/",
    "/analytics/",
    "/portal/"
];

function isSkippingURL(url){
    var base = url.split("/")[1];
    if(skipAuth.indexOf("/"+base+"/") >= 0 ){
        return true;
    } else{
        return false;
    }
};

module.exports.setSecureApp = function (req, res, next) {

    //check mongo db connection availability
    var mongo_connection_status = mongo_connection.mongoConnectionStatus();

    if (mongo_connection_status == 1) {
        if (isSkippingURL(req.path)) {
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

module.exports.setCORS = function(req,res,next){
	res.header('Access-Control-Allow-Origin', '*');
};
