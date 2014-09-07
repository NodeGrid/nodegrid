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
 * Creating new mongo collections of saving new mongo object in given collection
 * @param req
 * @param res
 */
module.exports.saveModelOrEntityToDb = function (req, res) {

    var entityModel = mongoose.model(req.params.modelName, entity);
    var newEntity = new entityModel({ data: req.body });
    newEntity.save(function (err, savedEntity) {
        if (err) {
            logger.info("NodeGrid:store_db_callings/ New model adding failed. ERROR: " + err);
        } else {
            logger.info("NodeGrid:store_db_callings/ New model added successfully. OBJECT: " + JSON.stringify(savedEntity));
        }
        res.send(savedEntity);
    });
};

/**
 * Update object in given mongo collections
 * @param req
 * @param res
 */
module.exports.updateEntity = function (req, res) {

    var entityModel = mongoose.model(req.params.modelName, entity);
    entityModel.update({_id: req.params.id}, {data: req.body}, function (err, savedEntity) {
        if (err) {
            logger.info("NodeGrid:store_db_callings/ Object updating was failed. ERROR: " + err);
        } else {
            logger.info("NodeGrid:store_db_callings/ Object updated successfully. OBJECT: " + JSON.stringify(savedEntity));
        }
        res.send(req.body);
    });
}