/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */
var logger = require('../utils/log');
var queryServices = require('../services/query_services');

/**
 * Create REST end-points for querying
 * @param app
 */
module.exports.createQueryEndPoints = function (app) {

    // Retrieve all data from given model (collection)
    app.get('/app/:modelName', function (req, res) {
        logger.info('NodeGrid:query_end_points/createQueryEndPoints - [GET/app/:modelName]');
        queryServices.handleQueryModelGet(req, res);
    });

    // Retrieve specific data from given model (collection)
    app.get('/app/:modelName/:id', function (req, res) {
        logger.info('NodeGrid:query_end_points/createQueryEndPoints - [GET/app/:modelName]');
        queryServices.handleQueryModelGetOne(req, res);
    });
};