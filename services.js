var db = require('./db.js');

module.exports.handlePost = function(req, res){
	db.saveToDb(req, res);
}

module.exports.handleGet = function(req, res){
	db.getAllFromDB(req, res);
}

module.exports.handlePut = function(req, res){
	db.updateEntity(req, res);
}



