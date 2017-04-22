var waterReports = require('../controllers/controllers_water_reports');
var authencation = require('./routes_authencation');
module.exports = function(app) {

    app.get('/water_reports', authencation.isLoggedIn, waterReports.getWaterReport);


};
