var logger = require('../utils/log');

module.exports.createPushEndPoints = function (app, server_io) {

        server_io.sockets.on('connection', function(socket){

       	app.post('/serverpush/:channel', function (req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:push_end_points/createPushEndPoints - [POST/serverpush/:channel]');
        socket.emit(req.params.channel, req.body);
        var status = {"status":"SUCCESS", "data":req.body};
        res.send(status);
		});
    });

}