var logger = require('../utils/log');
var push = require('../utils/push');
var mongo_connection = require('../utils/mongoose_connection');

var connectionObj = mongo_connection.createMongooseConnection();

var mongoose = connectionObj.mongooseObj;
var entity = connectionObj.entityObj;

/**
 * Creating new mongo collections of saving new mongo object in given collection
 * @param req
 * @param res
 */
module.exports.getEntitiesForPush = function (req, res, sendToAll, callback) {

    var entityModel = mongoose.model(req.params.modelName, entity);
    var qryObj = {};
    if(!sendToAll){
        qryObj = {
            '_id':{ $in: req.body.ids}
        };
    }
    entityModel.find(qryObj, function (err, pushEntities) {
        if (err) {
            logger.info("NodeGrid:push_db_callings/getEntitiesForPush - [push] data querying was failed. ERROR: " + err);
            callback(1, err);
        } else {
            logger.info("NodeGrid:push_db_callings/getEntitiesForPush - [push] data retrieved successfully.");
            callback(0, pushEntities);
        }
    });
};

/**
 * Creating new mongo collections of saving new mongo object in given collection
 * @param req
 * @param res
 */
module.exports.getEntityRelationsForPush = function (req, res) {

    var firstEntity = req.params.firstEntity;
    var firstId = req.params.firstId;
    var type = req.params.type;
    var secondEntity = req.params.secondEntity;

    var entityModel = mongoose.model('entity_relations', entity);
    var qryObj = {
        "data.firstEntity":firstEntity,
        "data.firstIdentifier":firstId,
        "data.relationType":type,
        "data.secondEntity":secondEntity,
    };

    entityModel.find(qryObj, function (err, records) {
        if (err) {
            logger.info("NodeGrid:relations_db_callings/getEntityRelationsForPush - [entity_relations] data querying was failed. ERROR: " + err);
        } else {
            logger.info("NodeGrid:relations_db_callings/getEntityRelationsForPush - [entity_relations] data successfully retrieved");
            
            var relationModel = mongoose.model(secondEntity, entity);
            var entityArray = [];
            records.forEach(function(ele){entityArray.push(ele.data.secondIdentifier)});
            var qryObj = {
                '_id':{ $in: entityArray}
                };
            relationModel.find(qryObj, function (err, relationRecords) {
                if (err) {
                    logger.info("NodeGrid:relations_db_callings/getEntityRelationsForPush - [entity_relations] data querying was failed. ERROR: " + err);
                } else {
                    // TODO   SENDING PUSHHHH >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.
                    res.send(relationRecords);
                }
            });

        }
    });
};