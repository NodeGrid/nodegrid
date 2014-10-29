var tokenMaster = require('../utils/token_master');

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
        } else {
            //TODO: set response as follows. [utils.sendResponse(res, <statusCode>, <statusMessage>, <data object if any else 'EMPTY'>)]
            res.send(response);
        }
    });
}
