var tokenMaster = require('../utils/token_master');
var utils = require('../utils/utils');

module.exports.setSecureApp = function (req, res, next) {
	console.log(req.path);
	if(req.path.lastIndexOf('/system/') == 0){
		next();
		return;
	}
	var accessToken = req.headers.authorization;
    tokenMaster.validateAccessToken(accessToken, function (status, response) {
        if (status == 1) {
            next();
        } else if (status == 2){
            utils.sendResponse(res, 404, 'Not found - No valid accessToken', 'EMPTY');
        } else if (status == 3) {
            utils.sendResponse(res, 401, 'Unauthorized - Token expired', response);
        }
    });
};
