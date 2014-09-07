/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */
var logger = require('../utils/log');
var storeServices = require('../services/store_services');

/**
 * Creating REST end-points for data storing
 * @param app
 */
module.exports.createStoreEndPoints = function (app) {

    //Store new model or store data to given model (collection)
    app.post('/:modelName', function (req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:store_end_points/createStoreEndPoints - [POST/:modelName]');
        storeServices.handleStoreModelsPost(req, res);
    });

    //Update given model
    app.put('/:modelName/:id', function (req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:store_end_points/createStoreEndPoints - [PUT/:modelName/:id]');
        storeServices.handleStoreModelsPut(req, res);
    });
};