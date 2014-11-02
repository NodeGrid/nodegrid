module.exports.save = function (req,res,next) {
	var token  = false;
	if(req.headers.authorization){
		token = true;
	}
	console.log(req);
	var time = new Date().getTime();
	var item = {
		"method":req.method,
		"path" :req.path,
		"token": token,
		"time": time,
		"user-agent":req.headers['user-agent']
	}

	analyticsList.push(item);
}


module.exports.createSystemAnalyticsEndPoints = function (app) {
	app.get('/system/analytics', function(req, res){
		res.send(analyticsList);
	});
}


var analyticsList = [];