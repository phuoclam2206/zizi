/**
 * Created by glodeit on 8/2/17.
 */
var csv = require('../controllers/controllers_csv');
var authencation = require('./routes_authencation');
module.exports = function(app) {
    app.get('/csv', authencation.isLoggedIn, csv.getCsv);
    app.get('/csv/download/:name', authencation.isLoggedIn, csv.downloadCsv);
    app.get('/csv/create', authencation.isLoggedIn, csv.getCreateCsv);
    app.post('/csv/create', authencation.isLoggedIn, csv.postCreateCsv);
    app.get('/csv/delete/:name', authencation.isLoggedIn, csv.getDeleteCsv);
};