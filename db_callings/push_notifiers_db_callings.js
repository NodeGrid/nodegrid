var logger = require('../utils/log');
var mongo_connection = require('../utils/mongoose_connection');

var connectionObj = mongo_connection.createMongooseConnection();

var mongoose = connectionObj.mongooseObj;
var entity = connectionObj.entityObj;

/**
 * Creating new mongo collections of saving new mongo object in given collection
 * @param req
 * @param res
 */
module.exports.setNotifier = function (req, res, type) {

    var entityModel = mongoose.model('push_notifiers', entity);
    entityModel.update({name:type}, {data:req.body}, {upsert:true},function (err, pushEntities) {
        if (err) {
            logger.info("NodeGrid:push_db_callings/setNotifier - ["+type+"] data querying was failed. ERROR: " + err);
        } else {
            var resuObj = {"status":"SUCCESS", "data":req.body, "type":type};
            res.send(resuObj);
        }
    });
};

/**
 * Creating new mongo collections of saving new mongo object in given collection
 * @param req
 * @param res
 */
module.exports.getNotifier = function (req, res, type) {

    var entityModel = mongoose.model('push_notifiers', entity);
    entityModel.findOne({name:type},function (err, pushEntities) {
        if (err) {
            logger.info("NodeGrid:push_db_callings/getNotifier - ["+type+"] data querying was failed. ERROR: " + err);
        } else {
            res.send(pushEntities);
        }
    });
};