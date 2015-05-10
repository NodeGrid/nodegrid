/**
 * Created by kavi707 on 12/2/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var google = require("./push/google");
var apple = require("./push/apple");
var utils = require('./utils');
var logger = require('../utils/log');

module.exports.sendPushNotification = function (req, res, pushEntities) {

    var pushObj;
    var googlePushIds = new Array();
    var applePushIds = new Array();
    for (var objCount = 0; objCount < pushEntities.length; objCount++) {
        pushObj = pushEntities[objCount].data.push;
        if (pushObj != undefined) {
            if (pushObj.notifier == 'google') {
                googlePushIds.push(pushObj.regId);
            } else if (pushObj.notifier == 'apple') {
                applePushIds.push(pushObj.regId);
            }
        }
    }

    if (googlePushIds.length == 0 && applePushIds.length == 0) {
        logger.info('NodeGrid:push/sendPushNotification - Push contents not found in given collection');
        utils.sendResponse(res, 410, 'No Contents - Push contents not found in given collection', 'EMPTY');
    } else {
        if (googlePushIds.length != 0)
            google.sendPushToGCM(googlePushIds, req, res);

        if (applePushIds.length != 0)
            apple.sendPushToAPNS(applePushIds, req, res);
    }

};