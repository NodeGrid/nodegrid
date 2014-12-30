/**
 * Created by kavi707 on 12/2/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var gcm = require('node-gcm');
var logger = require('../log');
var utils = require('../utils');

module.exports.sendPushToGCM = function (regIds, req, res) {

    // create a message with default values
    var message = new gcm.Message({
        collapseKey: 'demo',
        delayWhileIdle: true,
        timeToLive: 3,
        data: {
            message: req.body.message
        }
    });

    //TODO: Need to query the server_key from database and add as GCM sender
    var sender = new gcm.Sender('AIzaSyD2KCj6ib1PG-8tDROMCJvO9_6eT11eJuM');
    var registrationIds = regIds;

    sender.send(message, registrationIds, 1, function (err, result) {
        console.log(result);
        if (err) {
            logger.info('NodeGrid:google/sendPushToGCM - Push sending unsuccessful from GCM');
            utils.sendResponse(res, 417, 'Expectation Failed - Push is not completed from GCM side', err);
        } else {
            logger.info('NodeGrid:google/sendPushToGCM - Push sent successful to GCM');
            utils.sendResponse(res, 200, 'Push is sent', result);
        }
    });
};