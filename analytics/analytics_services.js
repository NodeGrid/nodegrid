var uaparser = require('ua-parser')


module.exports.createSystemAnalyticsEndPoints = function (app) {
	app.get('/analytics/all', function(req, res){
		res.send(analyticsList);
	});

	app.get('/analytics/:durationInSeconds', function(req, res){
		res.send(getHitsforGivenDuration(req.params.durationInSeconds));
	});

	app.get('/analytics/filter/:filter', function(req, res){
		res.send(getSortedData(req.params.filter));
	});
}

module.exports.save = function (req,res,next) {

	if (req.path.lastIndexOf('/analytics/') == 0) {
        return;
    }
	var token  = false;
	if(req.headers.authorization){
		token = true;
	}
	var uadata = uaparser.parse(req.headers['user-agent']);
	var time = new Date().getTime();
	var item = {
		"method":req.method,
		"path" :req.path,
		"token": token,
		"time": time,
		"browser":uadata.ua.toString(),
		"os":uadata.os.toString(),
		"device":uadata.device.family
	}

	analyticsList.push(item);
}

function getHitsforGivenDuration(durationInSeconds){
	var time = new Date().getTime() - (durationInSeconds*1000);
	return analyticsList.filter(function(element){
		return element.time >= time; 
	});

}

function getSortedData(filter){
	var groups = {};
	analyticsList.map(function(element){
		var val =  groups[element[filter]];
		var key = element[filter];
		if(typeof val === 'undefined'){
			groups[key] = 1;
		}
		else{
			groups[key]  = val+1;
		}
	});

	return groups;
}

var analyticsList = [];