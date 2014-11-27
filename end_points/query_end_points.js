/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */
var logger = require('../utils/log');
var queryServices = require('../services/query_services');
var url = require('url');
var dbService = require('../db_callings/query_db_callings');

/**
 * Create REST end-points for querying
 * @param app
 */
module.exports.createQueryEndPoints = function (app) {

    app.get('/app/advance/:modelName', function (req, res) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;

        console.log(query);

        for (var key in query) {
            if (key === 'qry')
                var qry = query.qry;
            else if (key === 'sort')
                var sort = query.sort;
            else if (key === 'limit')
                var limit = query.limit;
        }

        if (qry != null) {
            var mainObj = qry.split('where');
            var select = mainObj[0].split('select')[1].trim();

            console.log(select);

            var where = mainObj[1].split(' and ');

            console.log(where);
        }

        res.send({});
        //dbService.getOneFromDBHardCoded(req, res);
    });

    // Retrieve all data from given model (collection)
    app.get('/app/:modelName', function (req, res) {
        logger.info('NodeGrid:query_end_points/createQueryEndPoints - [GET/app/:modelName]');
        queryServices.handleQueryModelGet(req, res);
    });

    // Retrieve specific data from given model (collection)
    app.get('/app/:modelName/:id', function (req, res) {
        logger.info('NodeGrid:query_end_points/createQueryEndPoints - [GET/app/:modelName/:id]');
        queryServices.handleQueryModelGetOne(req, res);
    });
};