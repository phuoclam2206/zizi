var products = require('../controllers/controllers_products');
var authencation = require('./routes_authencation');
// app/routes.js
module.exports = function(app, passport) {
	
	app.get('/products', authencation.isLoggedIn, products.getProduct);

	app.get('/products/create', authencation.isLoggedIn, products.getCreate);

	app.post('/products/create', authencation.isLoggedIn, products.postCreate);

	app.get('/products/update/:id', authencation.isLoggedIn, products.getUpdate);

	app.post('/products/update/:id', authencation.isLoggedIn, products.postUpdate);

	app.get('/products/delete/:id', authencation.isLoggedIn, products.getDelete);

};
