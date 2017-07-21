module.exports = {
	paginator: function(page) {
		return " LIMIT " + page.offset + "," + page.limit;
	}	
}