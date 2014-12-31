/**
 * Created by kavi707 on 12/2/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var gcm = require('node-gcm');
var logger = require('../log');
var utils = require('../utils');
var pushNotifierDb = require('../../db_callings/push_notifiers_db_callings');

module.exports.sendPushToGCM = function (regIds, req, res) {

    var notifier_type = 'google';

    // create a message with default values
    var message = new gcm.Message({
        collapseKey: 'demo',
        delayWhileIdle: true,
        timeToLive: 3,
        data: {
            message: req.body.message
        }
    });

    pushNotifierDb.queryNotifier(notifier_type, function (status, notifier) {
        if (status == 0) {
            if (notifier != null) {
                var sender = new gcm.Sender(notifier.data.server_key);
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
            } else {
                utils.sendResponse(res, 204, 'Not Contents - No notifier found from ['+ notifier_type +']', 'EMPTY');
            }
        } else if (status == 1) {
            utils.sendResponse(res, 500, 'Internal Server Error - [google] data retrieving was failed', notifier);
        }
    });
};
