/**
 * Created by kavi707 on 9/6/14.
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */
var logger = require('../utils/log');
var relationsServices = require('../services/relations_services');

module.exports.createRelationsEndPoints = function(app) {

    app.post('/:firstEntity/:firstIdentifier/:relationType/:secondEntity/:secondIdentifier', function (req, res) {
        logger.info('NodeGrid:relations_end_points/ [POST/:firstEntity/:firstIdentifier/:relationType/:secondEntity/:secondIdentifier]');
        relationsServices.handleCreateRelationsPost(req, res);
    });
};