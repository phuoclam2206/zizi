var controllersRedirect = require('../controllers/util/controllers_redirect');
var configNotify = require('../config/notify');
var modelsCustomers = require('../models/models_customers');
var customers = {
	getCreate: function(req, res, next) {
		res.render('customers/create.ejs');
	},

	postCreate: function(req, res, next) {
		modelsCustomers.insertCustomer(req.body.name).then(function(response) {
			if (response) {
				req.flash('notify_success', configNotify.create_success);
				return res.redirect('/customers');
			} else {
				req.flash('notify_error', configNotify.create_error);
				return res.redirect('/customers/create');
			}
		}).catch(function(err){
			req.flash('notify_error', configNotify.create_error);
			return res.redirect('/customers/create');
		});
	},

	getCustomer: function(req, res, next) {
		modelsCustomers.fetchCustomer().then(function(response) {
			if (response) {
				controllersRedirect.notify(req, res);
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
			req.flash('notify_error', configNotify.fetch_error);
			return res.redirect('/');
		});
	}, 
	postUpdate: function(req, res, next) {
		modelsCustomers.updateCustomer(req.params.id, req.body.name).then(function(response) {
			if (response) {
				req.flash('notify_success', configNotify.update_success);
				return res.redirect('/customers');
			}
		}).catch(function(){
			req.flash('notify_error', configNotify.update_error);
			return res.redirect('/customers/update/' + req.param.id);
		});
	},
	getDelete: function(req, res, next) {
		modelsCustomers.deleteCustomer(req.params.id).then(function() {
			req.flash('notify_success', configNotify.delete_success);
			return res.redirect('/customers');
		}).catch(function(){
			req.flash('notify_error', configNotify.delete_error);
			return res.redirect('/customers');
		});
	}
};


module.exports = customers;