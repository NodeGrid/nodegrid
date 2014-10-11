/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var logger = require('../utils/log');
var mongo_connection = require('../utils/mongoose_connection');
var connectionObj = mongo_connection.createMongooseConnection();

var mongoose = connectionObj.mongooseObj;
var entity = connectionObj.entityObj;

module.exports.createNewSystemUser = function (req, res) {
    res.send("Get new system user create req");
};

module.exports.GetSystemUser = function (req, res) {
    res.send("Get query req to get given system user");
};

module.exports.RemoveSystemUser = function (req, res) {
    res.send("Get remove req to delete given system user");
};