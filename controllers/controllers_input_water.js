var modelsInputWater = require('../models/models_input_water');
var modelsProducts = require('../models/models_products');
var controllersAuthencations = require('./controllers_authencations');
var pagination = require('../controllers/util/controllers_pagination');
var moment = require('moment');
var controllersRedirect = require('../controllers/util/controllers_redirect');
var configNotify = require('../config/notify');
var inputWater = {
	getInputWater: function(req, res, next) {
		if(controllersAuthencations.isAdmin(req.user.id)) {
            Promise.all([modelsInputWater.fetchInputWater(pagination.paginator(req.query)), modelsInputWater.countInputWater()]).then(function(result) {
                var paginationView = pagination.view(result[1][0] ? result[1][0].numRows : 0, req.query);
                return res.render('input_water/index.ejs', {inputWater: result[0], moment: moment, paginationView: paginationView});
            });
		} else {
			return res.redirect('/input_water/create');
		}
	},
	getCreate: function(req, res, next) {
		modelsInputWater.fetchLastParseId().then(function(result) {
			return res.render('input_water/approve.ejs', {inputWater: result, moment: moment});
		})
	},
	postCreate: function(req, res, next) {
		if (req.body.parse_id) {
			modelsInputWater.findByParseId(req.body.parse_id).then(function(result) {
				if (result && result.id !== null) {
					modelsInputWater.updateInputWater(req.body.products, req.user.id).then(function(newResult) {
						req.flash('notify_success', configNotify.create_success);
						return res.redirect('/profile');
					})
				} else {
					req.flash('notify_error', configNotify.create_error);
					return res.redirect('/profile');
				}
			})	
		} else {
			req.flash('notify_error', configNotify.create_error);
			return res.redirect('/profile');
		}
	},
	getParseId: function(req, res, next) {
		modelsInputWater.findByParseId(req.params.parseId).then(function(result) {
			return res.render('input_water/detail.ejs', {inputWater: result, moment: moment});
		})
	},
};


module.exports = inputWater;