/**
 * Created by kavi707 on 9/16/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */
 
var logger = require('./log');
var fs = require('fs');

/**
 * This method is for check the logs directory existence
 * and if dir is not exists, then create
 */
module.exports.createLoggerDir = function () {
 	var path = __dirname + '/logs';
  	console.log('NodeGrid:util/createLoggerDir - Logs dir path: [' + path + ']');
  	fs.exists(path, function(exists) {
    	if (!exists) {
        	fs.mkdir(path, function(err) {
        		if (err) {
        			console.log('NodeGrid:util/createLoggerDir - Error occurred @ dir creating. ERROR: ' + err);
        		}
        	});
    	} else {
    		logger.info('NodeGrid:util/createLoggerDir - Logs dir is exists');
    	}
  	}); 
 };

/**
 * This method is for create final response object
 * @param res NodeJS res object
 * @param statusCode HTTP status code
 * @param statusMessage status message
 * @param dataObject return data object
 */
module.exports.sendResponse = function (res, statusCode, statusMessage, dataObject) {

    var responseObj;
    if (dataObject != 'EMPTY') {
        // If dataObject is not an array, it sends as an array to data key
        if (dataObject instanceof Array) {
            responseObj = {
                "status":"ERROR",
                "msg":statusMessage,
                "data":dataObject
            };
        } else {
            responseObj = {
                "status":"ERROR",
                "msg":statusMessage,
                "res":dataObject
            };
        }
    } else {
        responseObj = {
            "status":"ERROR",
            "msg":statusMessage
        };
    }

    if (statusCode == 200) {
        logger.info('NodeGrid:util/sendResponse - [' + statusCode + '] success response sent');
        responseObj.status = "SUCCESS";
        res.send(responseObj);
    } else {
        logger.info('NodeGrid:util/sendResponse - [' + statusCode + '] error response sent');
        responseObj.status = "ERROR";
        res.send(statusCode, responseObj);
    }
};
