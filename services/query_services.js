/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var queryDb = require('../db_callings/query_db_callings');
var logger = require('../utils/log');
var utils = require('../utils/utils');
var url = require('url');

module.exports.handleAdvanceQueryModelGet = function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    console.log(query);

    for (var qryKey in query) {
        if (qryKey === 'qry')
            var qry = query.qry;
        else if (qryKey === 'sort')
            var sort = query.sort;
        else if (qryKey === 'limit')
            var limit = query.limit;
    }

    var qlObj = {};
    if (qry != null) {
        var mainObj = qry.split('where');
        var select = mainObj[0].split('select')[1].trim();

        console.log(select);

        var whereList = mainObj[1].trim().split(' and ');

        console.log(whereList);

        /*for(var i = 0;i<whereList.length;i++){
            var item = whereList[i];
            var temp = item.split(/[ = , > , < , != , => , =< ]+/);

            var key = qlObj[temp[0]];
            if(typeof key === 'undefined'){
                qlObj[temp[0]] = {};
            }

            if(item.indexOf(" = ") > 1){
                qlObj[temp[0]] = temp[1];
            }
            else if(item.indexOf(" > ") > 1){
                qlObj[temp[0]]["$gt"] = temp[1];
            }
            else if(item.indexOf(" < ") > 1){
                qlObj[temp[0]]["$lt"] = temp[1];
            }
            else if(item.indexOf(" => ") > 1){
                qlObj[temp[0]] = {"$gte":temp[1]};
            }
            else if(item.indexOf(" =< ") > 1){
                qlObj[temp[0]] = {"$lte":temp[1]};
            }
            else if(item.indexOf(" != ") > 1){
                qlObj[temp[0]] = {"$not":temp[1]};
            }
        }

        console.log(qlObj);*/
    }

    res.send({});
};

/**
 * This method responsible for query and showing the data in given collection (model)
 * @param req
 * @param res
 */
module.exports.handleQueryModelGet = function (req, res) {
    logger.info('NodeGrid:query_services/ Querying attempt data from given model (collection)');
    queryDb.getAllFromDB(req,res);
 
};

/**
 * This method responsible for query and showing the data in given collection (model)
 * @param req
 * @param res
 */
module.exports.handleQueryModelGetOne = function (req, res) {
    logger.info('NodeGrid:query_services/ Querying attempt data from given model (collection)');
    queryDb.getOneFromDB(req,res);

};