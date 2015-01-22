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

    // Create new relation between given models
    app.post('/app/:firstEntity/:firstIdentifier/:relationType/:secondEntity/:secondIdentifier', function (req, res) {
        logger.info('NodeGrid:relations_end_points/createRelationsEndPoints - [POST/app/:firstEntity/:firstIdentifier/:relationType/:secondEntity/:secondIdentifier]');
        relationsServices.handleCreateRelationsPost(req, res);
    });

    app.get('/app/:entity/:identifier/:type/:secondEntity', function(req, res){
        logger.info('NodeGrid:relations_end_points/createRelationsEndPoints - [GET/app/:entity/:identifier/:type/:secondEntity]');
        relationsServices.handleRetrieveRelationsWithType(req, res);
    });

    app.del('/app/:firstEntity/:firstIdentifier/:relationType/:secondEntity/:secondIdentifier', function(req, res){
        logger.info('NodeGrid:relations_end_points/createRelationsEndPoints - [DELETE/app/:firstEntity/:firstIdentifier/:relationType/:secondEntity/:secondIdentifier]');
        relationsServices.handleDeleteRelations(req, res);
    });
};