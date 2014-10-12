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

module.exports.GetSystemUser = function (req, res, endPoint) {

    //create collection object for system_users
    var system_users = mongoose.model('system_users', entity);

    if (endPoint.toString() === 'USER_ID') {
        var userId = req.params.userId;

        system_users.find({"_id": userId}, function (systemUserExistenceErr, systemUserRecord) {
           if (systemUserExistenceErr) {
               logger.info("NodeGrid:system_db_callings/GetSystemUser - Error occurred at system_users database check. ERROR: " + systemUserExistenceErr);
               res.send("Error occurred at system_users entity database check: " + systemUserExistenceErr);
           } else {
               if (systemUserRecord.length != 0) {
                   res.send(systemUserRecord);
               } else {
                   logger.info("NodeGrid:system_db_callings/GetSystemUser - No records found from given system userId");
                   res.send("No records found from given system userId");
               }
           }
        });
    } else {
        if (endPoint.toString() === 'USERNAME') {
            var username = req.params.username;

            system_users.find({"data.username": username}, function (systemUserExistenceErr, systemUserRecord) {
                if (systemUserExistenceErr) {
                    logger.info("NodeGrid:system_db_callings/GetSystemUser - Error occurred at system_users database check. ERROR: " + systemUserExistenceErr);
                    res.send("Error occurred at system_users entity database check: " + systemUserExistenceErr);
                } else {
                    if (systemUserRecord.length != 0) {
                        res.send(systemUserRecord);
                    } else {
                        logger.info("NodeGrid:system_db_callings/GetSystemUser - No records found from given system username");
                        res.send("No records found from given system username");
                    }
                }
            });
        }
    }

};

module.exports.RemoveSystemUser = function (req, res) {

    //create collection object for system_users
    var system_users = mongoose.model('system_users', entity);

    var userId = req.params.userId;

    system_users.remove({"_id": userId}, function (systemUserExistenceErr, systemUserDelete) {
        if (systemUserExistenceErr) {
            logger.info("NodeGrid:system_db_callings/RemoveSystemUser - Error occurred at system_users database check. ERROR: " + systemUserExistenceErr);
            res.send("Error occurred at system_users entity database check: " + systemUserExistenceErr);
        } else {
            logger.info("NodeGrid:system_db_callings/RemoveSystemUser - System user removed from the collection successfully. STATUS: " + systemUserDelete);
            res.send("System user removed from the collection successfully. STATUS: " + systemUserDelete);
        }
    });
};