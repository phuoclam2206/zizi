
var modelsWaterReports = require('../models/models_water_reports');
var modelsProducts = require('../models/models_products');
var modelsInputWater = require('../models/models_input_water');
var controllersAuthencations = require('./controllers_authencations');
var pagination = require('../controllers/util/controllers_pagination');
var moment = require('moment');
var waterReports = {
	getWaterReport: function(req, res, next) {
		if(controllersAuthencations.isAdmin(req.user.id)) {
            Promise.all([modelsWaterReports.fetchWaterReport(pagination.paginator(req.query)), modelsWaterReports.countWaterReport()]).then(function(result) {
                var paginationView = pagination.view(result[1][0].numRows, req.query);
                return res.render('water_reports/index.ejs', {waterReports: result[0], moment: moment, paginationView: paginationView});
            });
		} else {
			return res.redirect('/water_reports/create');
		}
    },
    getCreateWaterReport: function(req, res, next) {
        Promise.all([modelsProducts.fetchProduct(), modelsInputWater.fetchLastParseIdByUserApproveId(req.user.id)]).then(function(result) {
            return res.render('water_reports/create.ejs', {products: result[0], input_water: result[1]});
        }).catch(function(){
            return res.redirect('/');
        });

    },
    postCreateWaterReport: function(req, res, next) {
    	var data = req.body;
    	data.user_id = req.user.id;
        var parseId = Date.now();
    	modelsWaterReports.insertWaterReport(data).then(function(result) {
            modelsInputWater.insertInputWater(data.products, parseId, data.user_id).then(function() {
                return result ? res.redirect('/profile') : res.redirect('/water_reports/create');    
            })
    		
		}).catch(function(){
			return res.redirect('/water_reports/create');
		});
    }
};


module.exports = waterReports;