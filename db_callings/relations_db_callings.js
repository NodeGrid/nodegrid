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
 * Saving new relation between given two models in 'entity_relations' mongo collection
 * @param req
 * @param res
 */
module.exports.saveRelationToDb = function (req, res) {
    var firstEntity = req.params.firstEntity;
    var secondEntity = req.params.secondEntity;
    var firstIdentifier = req.params.firstIdentifier;
    var secondIdentifier = req.params.secondIdentifier;
    var relationType = req.params.relationType;

    //create collection object for relations
    var entity_relations = mongoose.model('entity_relations', entity);

    /*********** check first entity existance **********/
    var checkCollection = mongoose.model(firstEntity, entity);
    checkCollection.find({_id: firstIdentifier}, function (firstErr, firstRecords) {
        if (firstErr) {
            logger.info("NodeGrid:relations_db_callings/saveRelationToDb - Error occurred at [" + firstEntity + "] database check. ERROR: " + firstErr);
            res.send("Error occurred at first entity database check: " + firstErr);
        }
        else {
            if (firstRecords.length != 0) {
                /********* check second entity existance **********/
                var checkSecondCollection = mongoose.model(secondEntity, entity);
                checkSecondCollection.find({_id: secondIdentifier}, function (secondErr, secondRecords) {
                    if (secondErr) {
                        logger.info("NodeGrid:relations_db_callings/saveRelationToDb - Error occurred at [" + secondEntity + "] database check. ERROR: " + secondErr);
                        res.send("Error occured at second entity database check: " + secondErr);
                    } else {
                        if (secondRecords.length != 0) {

                            /******* check relation existance ********/
                            var checkRelationCollection = mongoose.model('entity_relations', entity);
                            checkRelationCollection.find({"data.firstIdentifier": firstIdentifier,
                                    "data.secondIdentifier": secondIdentifier, "data.relationType": relationType},
                                function (relationExistanceErr, relationRecords) {
                                    if (relationExistanceErr) {
                                        logger.info("NodeGrid:relations_db_callings/saveRelationToDb - Error occurred at entity_relations database check. ERROR: " + relationExistanceErr);
                                        res.send("Error occurred at entity_relations entity database check: " + relationExistanceErr);
                                    } else {
                                        if (relationRecords.length == 0) {
                                            dbObject = {
                                                "firstEntity": firstEntity,
                                                "firstIdentifier": firstIdentifier,
                                                "relationType": relationType,
                                                "secondEntity": secondEntity,
                                                "secondIdentifier": secondIdentifier
                                            };
                                            logger.info("NodeGrid:relations_db_callings/saveRelationToDb - Created database OBJECT: " + JSON.stringify(dbObject));
                                            var newEntry = new entity_relations({data: dbObject});
                                            newEntry.save(function (err, savedRelationship) {
                                                if (err) {
                                                    logger.info("NodeGrid:relations_db_callings/saveRelationToDb - Error occurred at database insertion. ERROR: " + err);
                                                    res.send("Error occurred at database insertion: " + err);
                                                } else {
                                                    logger.info("NodeGrid:relations_db_callings/saveRelationToDb - New relations added successfully. OBJECT: " + savedRelationship);
                                                    res.send(savedRelationship);
                                                }
                                            });
                                        } else {
                                            logger.info("NodeGrid:relations_db_callings/saveRelationToDb - Given relation is already exists");
                                            res.send("Given relation is already exists");
                                        }
                                    }
                                });
                            /******* check relation existance ********/

                        } else {
                            logger.info("NodeGrid:relations_db_callings/saveRelationToDb - Given second entity is not available in the database");
                            res.send("Given second entity is not available in the database");
                        }
                    }
                });
                /********* check second entity existance **********/
            } else {
                logger.info("NodeGrid:relations_db_callings/saveRelationToDb - Given first entity is not available in the database");
                res.send("Given first entity is not available in the database");
            }
        }
    });
    /*********** check first entity existance **********/
};

module.exports.getRelationsWithTypesFromDb = function (req, res) {

    var getEntity = req.params.entity;
    var getIdentifier = req.params.identifier;
    var getType = req.params.type;

    var entityModel = mongoose.model('entity_relations', entity);
    var qryObj = {
        "data.firstEntity":getEntity,
        "data.firstIdentifier":getIdentifier,
        "data.relationType":getType
    };
    entityModel.find(qryObj, function (err, records) {
        if (err) {
            logger.info("NodeGrid:relations_db_callings/getRelationsWithTypesFromDb - [entity_relations] data querying was failed. ERROR: " + err);
        } else {
            logger.info("NodeGrid:relations_db_callings/getRelationsWithTypesFromDb - [entity_relations] data successfully retrieved");
        }
        res.send(records);
    });
};

module.exports.getRelationsWithIdentifierFromDb = function (req, res) {

    var getEntity = req.params.entity;
    var getIdentifier = req.params.identifier;

    var entityModel = mongoose.model('entity_relations', entity);
    var qryObj = {
        "data.firstEntity":getEntity,
        "data.firstIdentifier":getIdentifier
    };
    entityModel.find(qryObj, function (err, records) {
        if (err) {
            logger.info("NodeGrid:query_db_callings/getRelationsWithIdentifierFromDb - [entity_relations] data querying was failed. ERROR: " + err);
        } else {
            logger.info("NodeGrid:query_db_callings/getRelationsWithIdentifierFromDb - [entity_relations] data successfully retrieved");
        }
        res.send(records);
    });
};
