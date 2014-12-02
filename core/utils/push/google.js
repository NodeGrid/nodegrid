/**
 * Created by kavi707 on 12/2/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var gcm = require('node-gcm');

module.exports.sendPushToGCM = function (regIds, msg) {

    // create a message with default values
    var message = new gcm.Message({
        collapseKey: 'demo',
        delayWhileIdle: true,
        timeToLive: 3,
        data: {
            price: "Test Message from Push"
            //key2: 'message2'
        }
    });

    var sender = new gcm.Sender('AIzaSyCAhLXMzr_Xzw_6unZ3zoMc-QsrKCkudas');
    var registrationIds = ['APA91bER0aPdFg5__y6YOfjrSw49tdd4UsJUQl47aX1_3hJuFmbortDSfvQbNaYaxoLfCUkRQq3-5_-_hyXadL6j3ISsBdUFsYZpiJ1R9nAt7iGlHmXMOi84NDbdz0uKfWe4Sfv_W61jm93usWWL2TbXy4WPTLESmnId-KPGIY71S9zZ35OSVqs'];
    //var registrationIds = regIds;

    sender.send(message, registrationIds, 1, function (err, result) {
        console.log(result);
    });
};