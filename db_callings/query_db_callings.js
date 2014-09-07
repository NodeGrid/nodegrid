/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var mongo_connection = require('../utils/mongoose_connection');
var connectionObj = mongo_connection.createMongooseConnection();

var mongoose = connectionObj.mongooseObj;
var entity = connectionObj.entityObj;

module.exports.getAllFromDB = function (req, res) {

    var entityModel = mongoose.model(req.params.modelName, entity);
    entityModel.find({}, function (err, records) {
        if (err) console.error(err);
        res.send(records);
    });

};