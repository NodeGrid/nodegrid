/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var mongoose = require('mongoose');
var logger = require('./log');
var fs = require('fs');
var configurations = JSON.parse(fs.readFileSync('config.json', encoding="ascii"));
mongoose.connect('mongodb://'+configurations.DB_HOST+'/'+configurations.DB_NAME);
var entity = mongoose.Schema({
    data: Object,
    relations: Object
});

/**
 * For retrieve created db connection objects
 * @returns {{mongooseObj: *, entityObj: *}}
 */
module.exports.createMongooseConnection = function() {

    var connection = {
        'mongooseObj':mongoose,
        'entityObj':entity
    };

    return connection;
};

mongoose.connection.on('error', function (err) {
 	logger.error("Could not connect to a mongodb instance "+err);
});

module.exports.mongoConnectionStatus = function() {
	return mongoose.connection.readyState;
};