var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodegrid');

var entity = mongoose.Schema({
	data: Object,
	relations:Object
});

module.exports.saveToDb = function(req, res){

	var entityModel = mongoose.model(req.params.modelName, entity);
	var newEntity = new entityModel({ data:req.body });
	newEntity.save(function(err, savedEntity) {
		if(err) console.error(err);
		res.send(savedEntity);
	});
}

module.exports.getAllFromDB = function(req, res){

	var entityModel = mongoose.model(req.params.modelName, entity);
	entityModel.find({}, function(err, records) {
		if(err) console.error(err);
		res.send(records);
	});

}

module.exports.updateEntity = function(req, res){

	var entityModel = mongoose.model(req.params.modelName, entity);
	entityModel.update({_id:req.params.id}, {data:req.body}, function(err, savedEntity) {
		if(err) console.error(err);
		res.send(req.body);
	});
}




