/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */
var logger = require('../utils/log');
var queryServices = require('../services/query_services');

module.exports.createQueryEndPoints = function (app) {

    app.get('/:modelName', function (req, res) {
        logger.info('NodeGrid:app/ [GET/:modelName]');
        queryServices.handleQueryModelGet(req, res);
    });
};