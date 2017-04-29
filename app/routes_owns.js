var owns = require('../controllers/controllers_owns');
var authencation = require('./routes_authencation');

// app/routes.js
module.exports = function(app, passport) {
	
	app.get('/owns', owns.getOwn);

	app.get('/owns/create', authencation.isLoggedIn, owns.getCreate);

	app.post('/owns/create', authencation.isLoggedIn, owns.postCreate);

	app.get('/owns/update/:id', authencation.isLoggedIn, owns.getUpdate);

	app.post('/owns/update/:id', authencation.isLoggedIn, owns.postUpdate);

	app.get('/owns/delete/:id', authencation.isLoggedIn, owns.getDelete);

	app.get('/owns/user/:id', authencation.isLoggedIn, authencation.isSelf, owns.getByUserId);

	app.get('/owns/customer/:id', authencation.isLoggedIn, owns.getByCustomerId);

	app.get('/owns/customer/detail/:id', authencation.isLoggedIn, owns.getDetailByCustomerId);

	app.get('/owns/create_pay', authencation.isLoggedIn, owns.getCreatePay);

	app.post('/owns/create_pay', authencation.isLoggedIn, owns.postCreatePay);

	app.get('/owns/update_pay/:id', authencation.isLoggedIn, owns.getUpdatePay);

	app.post('/owns/update_pay/:id', authencation.isLoggedIn, owns.postUpdatePay);
};
