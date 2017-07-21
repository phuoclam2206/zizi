module.exports = {
	notify: function(req, res) {
		res.locals.notify_success = req.flash("notify_success");
		res.locals.notify_error = req.flash("notify_error");
		
	}
}