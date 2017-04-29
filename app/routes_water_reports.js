var waterReports = require('../controllers/controllers_water_reports');
var authencation = require('./routes_authencation');
module.exports = function(app) {
	app.get('/water_reports', authencation.isLoggedIn, authencation.isAdmin, waterReports.getWaterReport);
    app.get('/water_reports/create', authencation.isLoggedIn, waterReports.getCreateWaterReport);
    app.post('/water_reports/create', authencation.isLoggedIn, waterReports.postCreateWaterReport);

};
