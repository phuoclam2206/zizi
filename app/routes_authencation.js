module.exports = {
	isLoggedIn: function(req, res, next) {

		// if user is authenticated in the session, carry on
		if (req.isAuthenticated())
			return next();

		// if they aren't redirect them to the home page
		res.redirect('/');
	},
	isSelf: function(req, res, next) {
		if(req.user.id === parseInt(req.params.id) || req.user.id === 1) 
			return next();
		res.redirect('/profile');
	},
	isAdmin: function(req, res, next) {
		if (req.user.id === 1)
			return next();
		res.redirect('/');
	}
};