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

    for (var qryKey in query) {
        if (qryKey === 'qry')
            var qry = query.qry;
        else if (qryKey === 'sort')
            var sort = query.sort;
        else if (qryKey === 'limit')
            var limit = query.limit;
    }

    var selectObj = {};
    var whereObj = {};
    if (qry != null) {
        var mainObj = qry.split('where');
        var select = mainObj[0].split('select')[1].trim();
        selectList = select.split(',');

        // create select parameters from selectList
        var selectParam = "";
        for (var iSelect = 0; iSelect < selectList.length; iSelect++) {
            selectObj["data." + selectList[iSelect]] = true;
        }

        // Create where parameters from whereList
        if (mainObj.length > 1 ) {
            whereList = mainObj[1].trim().split(' and ');
            for (var iWhere = 0; iWhere < whereList.length; iWhere++) {
                var item = whereList[iWhere];
                var temp = item.split(/[ = , > , < , != , => , =< ]+/);

                var key = whereObj[temp[0]];
                if (typeof key === 'undefined') {
                    whereObj["data." + temp[0]] = {};
                }

                if (item.indexOf(" = ") > 1 || item.indexOf("=") > 1) {
                    whereObj["data." + temp[0]] = temp[1];
                }
                else if (item.indexOf(" > ") > 1 || item.indexOf(">") > 1) {
                    whereObj["data." + temp[0]]["$gt"] = temp[1];
                }
                else if (item.indexOf(" < ") > 1 || item.indexOf("<") > 1) {
                    whereObj["data." + temp[0]]["$lt"] = temp[1];
                }
                else if (item.indexOf(" => ") > 1 || item.indexOf("=>") > 1) {
                    whereObj["data." + temp[0]] = {"$gte": temp[1]};
                }
                else if (item.indexOf(" =< ") > 1 || item.indexOf("=<") > 1) {
                    whereObj["data." + temp[0]] = {"$lte": temp[1]};
                }
                else if (item.indexOf(" != ") > 1 || item.indexOf("!=") > 1) {
                    whereObj["data." + temp[0]] = {"$not": temp[1]};
                }
            }
        }

        logger.info('NodeGrid:query_services/handleAdvanceQueryModelGet - Select Object: ' + JSON.stringify(selectObj));
        logger.info('NodeGrid:query_services/handleAdvanceQueryModelGet - Where Object: ' + JSON.stringify(whereObj));
    }

    queryDb.getFromDBAdvance(selectObj, whereObj, sort, limit, req, res);
};

/**
 * This method responsible for query and showing the data in given collection (model)
 * @param req
 * @param res
 */
module.exports.handleQueryModelGet = function (req, res) {
    logger.info('NodeGrid:query_services/handleQueryModelGet - Querying attempt data from given model (collection)');
    queryDb.getAllFromDB(req,res);
 
};

/**
 * This method responsible for query and showing the data in given collection (model)
 * @param req
 * @param res
 */
module.exports.handleQueryModelGetOne = function (req, res) {
    logger.info('NodeGrid:query_services/handleQueryModelGetOne - Querying attempt data from given model (collection)');
    queryDb.getOneFromDB(req,res);

};