/**
 * Created by kavi707 on 12/2/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var google = require("./push/google");

module.exports.sendPushNotification = function () {

    google.sendPushToGCM();
};