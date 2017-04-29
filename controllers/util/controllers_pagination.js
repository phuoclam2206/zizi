var dbconfig = require('../../config/database');

module.exports = {
	paginator: function(query) {
		var limit = dbconfig.pagination.limit;
		var page = query.page ? query.page : 0;
		var offset = page * limit;
		return {limit: limit, offset: offset};
	},
	view: function(total, query) {
		var numPage = (total % dbconfig.pagination.limit) !== 0 ? Math.floor((total / dbconfig.pagination.limit)) + 1 : (total / dbconfig.pagination.limit);
		return { numPage : numPage, current : query.page ? query.page : 0};
	}
}