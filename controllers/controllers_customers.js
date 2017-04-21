
var modelsCustomers = require('../models/models_customers');
var customers = {
	getCreate: function(req, res, next) {
		res.render('customers/create.ejs');
	},

	postCreate: function(req, res, next) {
		modelsCustomers.insertCustomer(req.body.name).then(function(response) {
			if (response) {
				return res.redirect('/customers');
			} else {
				return res.redirect('/customers/create');
			}
		}).catch(function(){
			return res.redirect('/customers/create');
		});
	},

	getCustomer: function(req, res, next) {
		modelsCustomers.fetchCustomer().then(function(response) {
			if (response) {
				return res.render('customers/index.ejs', {customers: response});
			}
		}).catch(function(){
			return res.redirect('/');
		});
	},

	getUpdate: function(req, res, next) {
		modelsCustomers.findOneCustomer(req.params.id).then(function(response) {
			if (response) {
				return res.render('customers/update.ejs', {customer: response[0]});
			}
		}).catch(function(){
			return res.redirect('/');
		});
	}, 
	postUpdate: function(req, res, next) {
		modelsCustomers.updateCustomer(req.params.id, req.body.name).then(function(response) {
			if (response) {
				return res.redirect('/customers');
			}
		}).catch(function(){
			return res.redirect('/customers/update/' + req.param.id);
		});
	},
	getDelete: function(req, res, next) {
		modelsCustomers.deleteCustomer(req.params.id).then(function() {
			return res.redirect('/customers');
		}).catch(function(){
			return res.redirect('/customers');
		});
	}
};


module.exports = customers;