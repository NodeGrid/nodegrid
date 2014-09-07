/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var mongo_connection = require('../utils/mongoose_connection');
var connectionObj = mongo_connection.createMongooseConnection();

var mongoose = connectionObj.mongooseObj;
var entity = connectionObj.entityObj;

module.exports.saveModelOrEntityToDb = function (req, res) {

    var entityModel = mongoose.model(req.params.modelName, entity);
    var newEntity = new entityModel({ data: req.body });
    newEntity.save(function (err, savedEntity) {
        if (err) console.error(err);
        res.send(savedEntity);
    });
};

module.exports.updateEntity = function (req, res) {

    var entityModel = mongoose.model(req.params.modelName, entity);
    entityModel.update({_id: req.params.id}, {data: req.body}, function (err, savedEntity) {
        if (err) console.error(err);
        res.send(req.body);
    });
}