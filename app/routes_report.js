var report = require('../controllers/controllers_report');
var authencation = require('./routes_authencation');
module.exports = function(app) {
    app.get('/report', authencation.isLoggedIn, report.getReport);
};