var modelsOwns = require('../models/models_owns');
var modelsCustomers = require('../models/models_customers');
var modelsProducts = require('../models/models_products');
var modelsUsers = require('../models/models_users');
var controllersAuthencations = require('./controllers_authencations');
var moment = require('moment');
var owns = {
	getCreate: function(req, res, next) {
		modelsCustomers.fetchCustomer().then(function(response) {
			res.render('owns/create.ejs', {customers: response});	
		})
	},
	postCreate: function(req, res, next) {
		modelsOwns.insertOwn(req.body.name, Math.abs(req.body.price), req.user.id).then(function(response) {
			if (response) {
				return res.redirect('/owns');
			} else {
				return res.redirect('/owns/create');
			}
		}).catch(function(){
			return res.redirect('/owns/create');
		});
	},
	getOwn: function(req, res, next) {
		if (controllersAuthencations.isAdmin(req.user.id)) {
			Promise.all([modelsOwns.fetchOwn(), modelsCustomers.fetchCustomer(), modelsUsers.fetchUser()]).then(function(result) {
				return res.render('owns/index.ejs', {owns: result[0], customers: result[1], users: result[2]});
			});
		} else {
			return res.redirect('/owns/user/' + req.user.id);
		}
		
	},
	getUpdate: function(req, res, next) {
		modelsOwns.findOneOwn(req.params.id).then(function(response) {
			if (response) {
				return res.render('owns/update.ejs', {own: response[0]});
			}
		}).catch(function(){
			return res.redirect('/');
		});
	}, 
	postUpdate: function(req, res, next) {
		modelsOwns.updateOwn(req.params.id, Math.abs(req.body.price)).then(function(response) {
			if (response) {
				return res.redirect('/owns');
			}
		}).catch(function(){
			return res.redirect('/owns/update/' + req.param.id);
		});
	},
	getDelete: function(req, res, next) {
		modelsOwns.deleteOwn(req.params.id).then(function() {
			return res.redirect('/owns');
		}).catch(function(){
			return res.redirect('/owns');
		});
	},
	getByUserId: function(req, res, next) {
		Promise.all([modelsOwns.fetchOwnByUserId(req.params.id), modelsCustomers.fetchCustomer()]).then(function(result) {
			if(controllersAuthencations.isAdmin(req.user.id)) {
				modelsUsers.fetchUser().then(function(users) {
					return res.render('owns/index.ejs', {owns: result[0], customers: result[1] , users: users});
				})
			} else {
				return res.render('owns/index.ejs', {owns: result[0],customers: result[1], users: null});
			}
		});
	},
	getByCustomerId: function(req, res, next) {
		var customerId = parseInt(req.params.id);
		if(controllersAuthencations.isAdmin(req.user.id)) {
			Promise.all([modelsOwns.fetchOwnByCustomerId(customerId), modelsCustomers.fetchCustomer(), modelsUsers.fetchUser()]).then(function(result) { 
				return res.render('owns/index.ejs', {owns: result[0], customers: result[1] , users: result[2]});
			});	
		} else {
			Promise.all([modelsOwns.fetchOwnByUserIdAndCustomerId(req.user.id, customerId), modelsCustomers.fetchCustomer()]).then(function(result) { 
				return res.render('owns/index.ejs', {owns: result[0], customers: result[1], users: null});
			});	
		}
	},
	getDetailByCustomerId: function(req, res, next) {
		var customerId = parseInt(req.params.id);
		if(controllersAuthencations.isAdmin(req.user.id)) {
			Promise.all([modelsOwns.fetchDetailOwnByCustomerId(customerId), modelsCustomers.fetchCustomer(), modelsUsers.fetchUser()]).then(function(result) { 
				return res.render('owns/detail.ejs', {owns: result[0], customers: result[1] , users: result[2], moment: moment});
			});	
		} else {
			Promise.all([modelsOwns.fetchDetailOwnByUserIdAndCustomerId(req.user.id, customerId), modelsCustomers.fetchCustomer()]).then(function(result) { 
				return res.render('owns/detail.ejs', {owns: result[0], customers: result[1], users: null, moment: moment});
			});	
		}
	},
	getCreatePay: function(req, res, next) {
		modelsCustomers.fetchCustomer().then(function(response) {
			res.render('owns/create_pay.ejs', {customers: response});	
		})
	},
	postCreatePay: function(req, res, next) {
		modelsOwns.insertOwn(req.body.name, -Math.abs(req.body.price), req.user.id).then(function(response) {
			if (response) {
				return res.redirect('/owns');
			} else {
				return res.redirect('/owns/create_pay');
			}
		}).catch(function(){
			return res.redirect('/owns/create_pay');
		});
	},
	getUpdatePay: function(req, res, next) {
		modelsOwns.findOneOwn(req.params.id).then(function(response) {
			if (response) {
				return res.render('owns/update_pay.ejs', {own: response[0]});
			}
		}).catch(function(){
			return res.redirect('/');
		});
	}, 
	postUpdatePay: function(req, res, next) {
		modelsOwns.updateOwn(req.params.id, -Math.abs(req.body.price)).then(function(response) {
			if (response) {
				return res.redirect('/owns');
			}
		}).catch(function(){
			return res.redirect('/owns/update_pay/' + req.param.id);
		});
	},
};

module.exports = owns;