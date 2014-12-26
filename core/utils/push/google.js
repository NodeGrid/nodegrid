/**
 * Created by kavi707 on 12/2/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var gcm = require('node-gcm');

module.exports.sendPushToGCM = function (regIds, msg) {

    console.log(msg);

    // create a message with default values
    var message = new gcm.Message({
        collapseKey: 'demo',
        delayWhileIdle: true,
        timeToLive: 3,
        data: {
//            message: "Test Message from Push"
            message: msg
        }
    });

    var sender = new gcm.Sender('AIzaSyD2KCj6ib1PG-8tDROMCJvO9_6eT11eJuM');
//    var registrationIds = ['APA91bEWIUOEzbsnx3WHwOnrLqYC455p3hlPKU2366pxQJOGsdLdn59rQa6W2_KEF2LbdCNfR9IXQeSAa0XzyKjzIqJ0upWGIpVfUZlC21L7MMfIwBZdAdpk3ru6Yxz7Ksbxqb7vu-Fh2D94NCjPd9GVEYX8di87Ff11yv_300T6zxEb-JfFd3Q'];
    var registrationIds = regIds;

    sender.send(message, registrationIds, 1, function (err, result) {
        console.log(result);
    });
};