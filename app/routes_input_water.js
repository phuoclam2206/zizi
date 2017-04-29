var inputWater = require('../controllers/controllers_input_water');
var authencation = require('./routes_authencation');

// app/routes.js
module.exports = function(app, passport) {
	
	app.get('/input_water', inputWater.getInputWater);
	app.get('/input_water/create', inputWater.getCreate);
	app.post('/input_water/create', inputWater.postCreate);
	app.get('/input_water/:parseId', inputWater.getParseId);
};
