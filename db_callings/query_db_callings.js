/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var logger = require('../utils/log');
var mongo_connection = require('../utils/mongoose_connection');
var connectionObj = mongo_connection.createMongooseConnection();

var mongoose = connectionObj.mongooseObj;
var entity = connectionObj.entityObj;

/**
 * Query all object from given mongo collection
 * @param req
 * @param res
 */
module.exports.getAllFromDB = function (req, res) {

    var entityModel = mongoose.model(req.params.modelName, entity);
    entityModel.find({}, function (err, records) {
        if (err) {
            logger.info("NodeGrid:query_db_callings/ " + req.params.modelName + " data querying was failed. ERROR: " + err);
        } else {
            logger.info("NodeGrid:query_db_callings/ " + req.params.modelName + " data successfully retrieved");
        }
        res.send(records);
    });

};