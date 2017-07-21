var customers = require('../controllers/controllers_customers');
var authencation = require('./routes_authencation');
module.exports = function(app, passport) {
	
	app.get('/customers', authencation.isLoggedIn, customers.getCustomer);

	app.get('/customers/create', authencation.isLoggedIn, customers.getCreate);

	app.post('/customers/create', authencation.isLoggedIn, customers.postCreate);

	app.get('/customers/update/:id', authencation.isLoggedIn, customers.getUpdate);

	app.post('/customers/update/:id', authencation.isLoggedIn, customers.postUpdate);

	app.get('/customers/delete/:id', authencation.isLoggedIn, customers.getDelete);

};
