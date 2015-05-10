/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var logger = require('../utils/log');
var utils = require('../utils/utils');
var mongo_connection = require('../utils/mongoose_connection');
var connectionObj = mongo_connection.createMongooseConnection();

//Reading the config file
var fs = require('fs');
var configurations = JSON.parse(fs.readFileSync('config.json', encoding="ascii"));

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
    var entity_relations = mongoose.model(configurations.RELATIONS_TABLE, entity);

    /*********** check first entity existance **********/
    var checkCollection = mongoose.model(firstEntity, entity);
    checkCollection.find({_id: firstIdentifier}, function (firstErr, firstRecords) {
        if (firstErr) {
            logger.info("NodeGrid:relations_db_callings/saveRelationToDb - Error occurred at [" + firstEntity + "] database check. ERROR: " + firstErr);
            utils.sendResponse(res, 500, "Internal Server Error - Error occurred at [" + firstEntity + "] database check", firstErr);
        }
        else {
            if (firstRecords.length != 0) {
                /********* check second entity existance **********/
                var checkSecondCollection = mongoose.model(secondEntity, entity);
                checkSecondCollection.find({_id: secondIdentifier}, function (secondErr, secondRecords) {
                    if (secondErr) {
                        logger.info("NodeGrid:relations_db_callings/saveRelationToDb - Error occurred at [" + secondEntity + "] database check. ERROR: " + secondErr);
                        utils.sendResponse(res, 500, "Internal Server Error - Error occurred at [" + secondEntity + "] database check", secondErr);
                    } else {
                        if (secondRecords.length != 0) {

                            /******* check relation existance ********/
                            var checkRelationCollection = mongoose.model(configurations.RELATIONS_TABLE, entity);
                            checkRelationCollection.find({"data.firstIdentifier": firstIdentifier,
                                    "data.secondIdentifier": secondIdentifier, "data.relationType": relationType},
                                function (relationExistenceErr, relationRecords) {
                                    if (relationExistenceErr) {
                                        logger.info("NodeGrid:relations_db_callings/saveRelationToDb - Error occurred at entity_relations database check. ERROR: " + relationExistanceErr);
                                        utils.sendResponse(res, 500, "Internal Server Error - Error occurred at entity_relations entity database check", relationExistenceErr);
                                    } else {
                                        if (relationRecords.length == 0) {
                                            var dbObject = {
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
                                                    utils.sendResponse(res, 500, "Internal Server Error - Error occurred at database insertion", err);
                                                } else {
                                                    logger.info("NodeGrid:relations_db_callings/saveRelationToDb - New relations added successfully. OBJECT: " + savedRelationship);
                                                    utils.sendResponse(res, 200, "New relations added successfully", savedRelationship);
                                                }
                                            });
                                        } else {
                                            logger.info("NodeGrid:relations_db_callings/saveRelationToDb - Given relation is already exists");
                                            utils.sendResponse(res, 409, "Conflict - Given relation is already exists", 'EMPTY');
                                        }
                                    }
                                });
                            /******* check relation existance ********/

                        } else {
                            logger.info("NodeGrid:relations_db_callings/saveRelationToDb - Given second entity is not available in the database");
                            utils.sendResponse(res, 404, "Not Found - Given second entity is not available in the database", 'EMPTY');
                        }
                    }
                });
                /********* check second entity existance **********/
            } else {
                logger.info("NodeGrid:relations_db_callings/saveRelationToDb - Given first entity is not available in the database");
                utils.sendResponse(res, 404, "Not Found - Given first entity is not available in the database", 'EMPTY');
            }
        }
    });
    /*********** check first entity existance **********/
};

module.exports.getRelationsWithTypesFromDb = function (req, res) {

    var getEntity = req.params.entity;
    var getIdentifier = req.params.identifier;
    var getType = req.params.type;
    var secondEntity = req.params.secondEntity;

    var entityModel = mongoose.model(configurations.RELATIONS_TABLE, entity);
    var qryObj = {
        "data.firstEntity":getEntity,
        "data.firstIdentifier":getIdentifier,
        "data.relationType":getType,
        "data.secondEntity":secondEntity
    };
    entityModel.find(qryObj, function (err, records) {
        if (err) {
            logger.info("NodeGrid:relations_db_callings/getRelationsWithTypesFromDb - [entity_relations] data querying was failed. ERROR: " + err);
            utils.sendResponse(res, 500, "Internal Server Error - [entity_relations] data querying was failed", err);
        } else {
            logger.info("NodeGrid:relations_db_callings/getRelationsWithTypesFromDb - [entity_relations] data successfully retrieved");
            
            var relationModel = mongoose.model(secondEntity, entity);
            var entityArray = [];
            records.forEach(function(ele){entityArray.push(ele.data.secondIdentifier)});
            var qryObj = {
                '_id':{ $in: entityArray}
                };
            relationModel.find(qryObj, function (err, relationRecords) {
                if (err) {
                    logger.info("NodeGrid:relations_db_callings/getRelationsWithTypesFromDb - [entity_relations] data querying was failed. ERROR: " + err);
                    utils.sendResponse(res, 500, "Internal Server Error - [entity_relations] data querying was failed", err);
                } else {
                    logger.info("NodeGrid:query_db_callings/getRelationsWithTypesFromDb - [entity_relations] data successfully retrieved");
                    utils.sendResponse(res, 200, "[entity_relations] data retrieved successfully", relationRecords);
                }
            });

        }
    });
};

module.exports.deleteRelationsFromDB = function (req, res) {

    var firstEntity = req.params.firstEntity;
    var secondEntity = req.params.secondEntity;
    var firstIdentifier = req.params.firstIdentifier;
    var secondIdentifier = req.params.secondIdentifier;
    var relationType = req.params.relationType;

    var entityModel = mongoose.model(configurations.RELATIONS_TABLE, entity);
    var qryObj = {
        "data.firstEntity":firstEntity,
        "data.firstIdentifier":firstIdentifier,
        "data.relationType":relationType,
        "data.secondEntity":secondEntity,
        "data.secondIdentifier":secondIdentifier
    };
    entityModel.findOneAndRemove(qryObj, function (err, records) {
        if (err) {
            logger.info("NodeGrid:relations_db_callings/deleteRelationsFromDB - [entity_relations] data querying was failed. ERROR: " + err);
            utils.sendResponse(res, 500, "Internal Server Error - [entity_relations] data querying was failed", err);
        } else {
            if (records != 0) {
                logger.info("NodeGrid:relations_db_callings/deleteRelationsFromDB - [entity_relations] data relationship successfully deleted");
                utils.sendResponse(res, 200, "[entity_relations] data relationship successfully deleted", "EMPTY");
            } else {
                logger.info("NodeGrid:relations_db_callings/deleteRelationsFromDB - [entity_relations] data relationship successfully deleted");
                utils.sendResponse(res, 410, "No [entity_relations] relationship data content deleted", "EMPTY");
            }
        }
    });
};
