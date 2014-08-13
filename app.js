var express = require('express');
var services = require('./services.js');

var app = express();
app.use(express.bodyParser());

app.post('/:modelName', function(req, res){
	services.handlePost(req, res);
});

app.get('/:modelName', function(req, res){
	services.handleGet(req,res);
});

app.put('/:modelName/:id', function(req, res){
	services.handlePut(req,res);
});


var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});
