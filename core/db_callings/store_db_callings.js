/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var logger = require('../utils/log');
var utils = require('../utils/utils');
var mongo_connection = require('../utils/mongoose_connection');
var extend = require('node.extend');
var formidable = require('formidable');
var grid = require('gridfs-stream');
var fs = require('fs');
var configurations = JSON.parse(fs.readFileSync('config.json', encoding="ascii"));

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
            logger.info("NodeGrid:store_db_callings/saveModelOrEntityToDb - New model adding failed. ERROR: " + err);
            utils.sendResponse(res, 500, "Internal Server Error - New model adding failed", err);
        } else {
            logger.info("NodeGrid:store_db_callings/saveModelOrEntityToDb - New model added successfully. OBJECT: " + JSON.stringify(savedEntity));
            utils.sendResponse(res, 200, "New model added successfully", savedEntity);
        }
    });
};

/**
 * Update object in given mongo collections
 * @param req
 * @param res
 */
module.exports.updateEntity = function (req, res) {

    var entityModel = mongoose.model(req.params.modelName, entity);

    entityModel.findOne({_id: req.params.id}, function (err, oldEntity) {
        if (err) {
            logger.info("NodeGrid:store_db_callings/updateEntity - Object updating was failed. ERROR: " + err);
        } else {
            Object.keys(req.body).forEach(function(key) {
            delete oldEntity.data[key];
            });
            var destObject = extend(req.body, oldEntity.data);
            entityModel.update({_id: req.params.id}, {data: destObject}, function (err, savedEntity) {
                if (err) {
                    logger.info("NodeGrid:store_db_callings/updateEntity - Object updating was failed. ERROR: " + err);
                    utils.sendResponse(res, 500, "Internal Server Error - Object updating was failed.", err);
                } else {
                    logger.info("NodeGrid:store_db_callings/updateEntity - Object updated successfully. OBJECT: " + JSON.stringify(savedEntity));
                    utils.sendResponse(res, 200, "Object updated successfully", savedEntity);
                }
            });

        }
    });
};

/**
 * Query One object from given mongo collection
 * @param req
 * @param res
 */
module.exports.deleteEntity = function (req, res) {

    var entityModel = mongoose.model(req.params.modelName, entity);
    entityModel.findOneAndRemove({_id: req.params.id}, function (err, records) {
        if (err) {
            logger.info("NodeGrid:query_db_callings/deleteEntity - [" + req.params.modelName + "] data querying was failed. ERROR: " + err);
            utils.sendResponse(res, 500, "Internal Server Error - [" + req.params.modelName + "] data querying was failed.", err);
        } else {
            if (records != 0) {
                logger.info("NodeGrid:query_db_callings/deleteEntity - [" + req.params.modelName + "] data successfully deleted");
                utils.sendResponse(res, 200, "[" + req.params.modelName + "] data successfully deleted", "EMPTY");
            } else {
                logger.info("NodeGrid:query_db_callings/deleteEntity - No [" + req.params.modelName + "] data content deleted");
                utils.sendResponse(res, 204, "No [" + req.params.modelName + "] data content deleted", "EMPTY");
            }
        }
    });

};

/**
 * Store uploaded file in mongo db with mongo object relation
 * @param req
 * @param res
 */
module.exports.saveFileModelOrEntityToDb = function (req, res) {
    // TODO - This must be couple with the existing structure and test
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + "/data";
    form.keepExtensions = true;

    form.parse(req, function(err, fields, files) {
        if (!err) {
            console.log('File uploaded : ' + files.file.path);
            grid.mongo = mongoose.mongo;
            var conn = mongoose.createConnection('mongodb://'+configurations.DB_HOST+'/'+configurations.DB_NAME);
            conn.once('open', function () {
                var gfs = grid(conn.db);
                var writestream = gfs.createWriteStream({
                    filename: files.file.name
                });
                fs.createReadStream(files.file.path).pipe(writestream);
            });
        }
    });

    form.on('end', function() {
        res.send('Completed ..... go and check fs.files & fs.chunks in  mongodb');
    });
};