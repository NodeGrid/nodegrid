/**
 * Created by kavi707 on 9/6/14.
 */
var logger = require('../utils/log');
var storeServices = require('../services/store_services');

module.exports.createStoreEndPoints = function (app) {

    app.post('/:modelName', function (req, res) {
        logger.info('NodeGrid:store_end_points/ [POST/:modelName]');
        storeServices.handleStoreModelsPost(req, res);
    });

    app.put('/:modelName/:id', function (req, res) {
        logger.info('NodeGrid:store_end_points/ [PUT/:modelName/:id]');
        storeServices.handleStoreModelsPut(req, res);
    });
};