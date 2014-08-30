var express = require('express');
var logger = require('./utils/log');
var services = require('./services.js');

var app = express();
app.use(express.bodyParser());

app.post('/:modelName', function (req, res) {
    logger.info('NodeGrid:app/ [POST/:modelName]');
    services.handlePost(req, res);
});

app.get('/:modelName', function (req, res) {
    logger.info('NodeGrid:app/ [GET/:modelName]');
    services.handleGet(req, res);
});

app.put('/:modelName/:id', function (req, res) {
    services.handlePut(req, res);
});

app.post('/:firstEntity/:firstIdentifier/:relationType/:secondEntity/:secondIdentifier', function (req, res) {
    logger.info('NodeGrid:app/ [POST/:firstEntity/:firstIdentifier/:relationType/:secondEntity/:secondIdentifier]');
    services.handleRelationalPost(req, res);
});

var server = app.listen(3000, function () {
    logger.info('NodeGrid:app/ NodeGrid app started. Listen on port: ' + server.address().port);
});
