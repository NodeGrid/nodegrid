/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var logger = require('../utils/log');
var mongo_connection = require('../utils/mongoose_connection');
var connectionObj = mongo_connection.createMongooseConnection();
var bCrypt = require('bcrypt-nodejs');

var mongoose = connectionObj.mongooseObj;
var entity = connectionObj.entityObj;

module.exports.createNewSystemUser = function (req, res) {

    //create collection object for system_users
    var system_users = mongoose.model('system_users', entity);

    // name validation
    if (req.body.name != null) {
        var name = req.body.name;

        // username validation
        if (req.body.username != null) {
            var username = req.body.username;

            /******* check relation existance ********/
            var checkSystemUserCollection = mongoose.model('system_users', entity);
            checkSystemUserCollection.find({"data.username": username}, function (systemUserExistenceErr, systemUserRecord){
                if (systemUserExistenceErr) {
                    logger.info("NodeGrid:system_db_callings/createNewSystemUser - Error occurred at system_users database check. ERROR: " + systemUserExistenceErr);
                    res.send("Error occurred at system_users entity database check: " + systemUserExistenceErr);
                } else {
                    if (systemUserRecord.length == 0) {
                        // password validation
                        if (req.body.password) {
                            var password = bCrypt.hashSync(req.body.password);
                            var currentTimestamp = Math.round((new Date()).getTime() / 1000);

                            var dbObject = {
                                "name": name,
                                "username": username,
                                "password": password,
                                "created_time":currentTimestamp,
                                "last_accessed_time":""
                            };

                            logger.info("NodeGrid:system_db_callings/createNewSystemUser - Created database OBJECT: " + JSON.stringify(dbObject));
                            var newEntry = new system_users({data: dbObject});
                            newEntry.save(function (err, savedUser) {
                                if (err) {
                                    logger.info("NodeGrid:system_db_callings/createNewSystemUser - Error occurred at database insertion. ERROR: " + err);
                                    res.send("Error occurred at database insertion: " + err);
                                } else {
                                    logger.info("NodeGrid:system_db_callings/createNewSystemUser - New system user added successfully. OBJECT: " + savedUser);
                                    res.send(savedUser);
                                }
                            });
                        } else {
                            logger.info("NodeGrid:system_db_callings/createNewSystemUser - User's [password] can't be empty.");
                            res.send("User's [password] can't be empty.");
                        }
                    } else {
                        logger.info("NodeGrid:system_db_callings/createNewSystemUser - Given [username] is already exists");
                        res.send("Given [username] is already exists");
                    }
                }
            });
        } else {
            logger.info("NodeGrid:system_db_callings/createNewSystemUser - User's [username] can't be empty.");
            res.send("User's [username] can't be empty.");
        }
    } else {
        logger.info("NodeGrid:system_db_callings/createNewSystemUser - User's [name] can't be empty.");
        res.send("User's [name] can't be empty.");
    }
};

module.exports.getSystemUser = function (userData, endPoint, callback) {

    //create collection object for system_users
    var system_users = mongoose.model('system_users', entity);

    if (endPoint.toString() === 'USER_ID') {

        system_users.find({"_id": userData}, function (systemUserExistenceErr, systemUserRecord) {
           if (systemUserExistenceErr) {
               logger.info("NodeGrid:system_db_callings/getSystemUser - Error occurred at system_users database check. ERROR: " + systemUserExistenceErr);
               callback(0, "Error occurred at system_users entity database check: " + systemUserExistenceErr);
           } else {
               if (systemUserRecord.length != 0) {
                   logger.info("NodeGrid:system_db_callings/getSystemUser - Successfully data captured");
                   callback(1, systemUserRecord);
               } else {
                   logger.info("NodeGrid:system_db_callings/getSystemUser - No records found from given system userId");
                   callback(0, "No records found from given system userId");
               }
           }
        });
    } else {
        if (endPoint.toString() === 'USERNAME') {

            system_users.find({"data.username": userData}, function (systemUserExistenceErr, systemUserRecord) {
                if (systemUserExistenceErr) {
                    logger.info("NodeGrid:system_db_callings/getSystemUser - Error occurred at system_users database check. ERROR: " + systemUserExistenceErr);
                    callback(0, "Error occurred at system_users entity database check: " + systemUserExistenceErr);
                } else {
                    if (systemUserRecord.length != 0) {
                        logger.info("NodeGrid:system_db_callings/getSystemUser - Successfully data captured");
                        callback(1, systemUserRecord)
                    } else {
                        logger.info("NodeGrid:system_db_callings/getSystemUser - No records found from given system username");
                        callback(0, "No records found from given system username");
                    }
                }
            });
        }
    }

};

module.exports.removeSystemUser = function (req, res) {

    //create collection object for system_users
    var system_users = mongoose.model('system_users', entity);

    var userId = req.params.userId;

    system_users.remove({"_id": userId}, function (systemUserExistenceErr, systemUserDelete) {
        if (systemUserExistenceErr) {
            logger.info("NodeGrid:system_db_callings/removeSystemUser - Error occurred at system_users database check. ERROR: " + systemUserExistenceErr);
            res.send("Error occurred at system_users entity database check: " + systemUserExistenceErr);
        } else {
            logger.info("NodeGrid:system_db_callings/removeSystemUser - System user removed from the collection successfully. STATUS: " + systemUserDelete);
            res.send("System user removed from the collection successfully. STATUS: " + systemUserDelete);
        }
    });
};

module.exports.saveNewToken = function (tokenObj, callback) {

    //create collection object for tokens
    var tokens = mongoose.model('tokens', entity);

    var newEntity = new tokens({ data: tokenObj });
    newEntity.save(function (err, savedToken) {
        if (err) {
            logger.info("NodeGrid:system_db_callings/saveNewToken - New token adding failed. ERROR: " + err);
            callback(err);
        } else {
            logger.info("NodeGrid:system_db_callings/saveNewToken - New token added successfully. OBJECT: " + JSON.stringify(savedToken));
            callback(savedToken);
        }
    });
};

module.exports.checkTokenExistence = function (userId, callback) {

    //create collection object for tokens
    var tokens = mongoose.model('tokens', entity);
    tokens.find({"data.userId": userId}, function (tokenExistenceErr, tokenRecord) {
        if (tokenExistenceErr) {
            logger.info("NodeGrid:system_db_callings/checkTokenExistence - Error occurred at tokens database check. ERROR: " + tokenExistenceErr);
            callback(0, "Error occurred at tokens entity database check: " + tokenExistenceErr);
        } else {
            if (tokenRecord.length == 0) {
                callback(1, "no created tokens");
            } else {
                callback(0, tokenRecord);
            }
        }
    });
};