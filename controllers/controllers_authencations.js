module.exports = {
	isSelf: function(req, res, next) {
		if(req.user.id === parseInt(req.params.id) || req.user.id === 1) 
			return true;
		return false;
	},
	isAdmin: function(user_id) {
		return user_id === 1 ? true : false;	
	}
};