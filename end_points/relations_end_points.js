/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */
var logger = require('../utils/log');
var relationsServices = require('../services/relations_services');

/**
 * Creating REST end-points for relations
 * @param app
 */
module.exports.createRelationsEndPoints = function(app) {

    //Create new relation between given models
    app.post('/:firstEntity/:firstIdentifier/:relationType/:secondEntity/:secondIdentifier', function (req, res) {
        logger.info("================================================================================================");
        logger.info('NodeGrid:relations_end_points/createRelationsEndPoints - [POST/:firstEntity/:firstIdentifier/:relationType/:secondEntity/:secondIdentifier]');
        relationsServices.handleCreateRelationsPost(req, res);
    });

    app.get('/getRelations/:entity/:identifier/:type', function(req, res){
        logger.info("================================================================================================");
        logger.info('NodeGrid:relations_end_points/createRelationsEndPoints - [GET/getRelations/:entity/:identifier/:type]');
        relationsServices.handleRetrieveRelationsWithType(req, res);
    });

    app.get('/getRelations/:entity/:identifier', function(req, res){
        logger.info("================================================================================================");
        logger.info('NodeGrid:relations_end_points/createRelationsEndPoints - [GET/getRelations/:entity/:identifier]');
        relationsServices.handleRetrieveRelationsWithIdentifier(req, res);
    });
};