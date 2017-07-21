
var modelsProducts = require('../models/models_products');
var products = {
	getCreate: function(req, res, next) {
		res.render('products/create.ejs', { message: req.flash('message') });
	},

	postCreate: function(req, res, next) {
		modelsProducts.insertProduct(req.body.name, req.body.price).then(function(response) {
			if (response) {
				return res.redirect('/products');
			} else {
				req.flash('message', 'Khong tao duoc. Kiem tra thong tin chinh xac');
				return res.redirect('/products/create');
			}
		}).catch(function(){
			req.flash('message', 'Khong tao duoc. Kiem tra thong tin chinh xac');
			return res.redirect('/products/create');
		});
	},

	getProduct: function(req, res, next) {
		modelsProducts.fetchProduct().then(function(response) {
			if (response) {
				return res.render('products/index.ejs', {products: response, message: req.flash('message')});
			}
		}).catch(function(){
			return res.redirect('/');
		});
	},

	getUpdate: function(req, res, next) {
		modelsProducts.findOneProduct(req.params.id).then(function(response) {
			if (response) {
				return res.render('products/update.ejs', {product: response[0]});
			}
		}).catch(function(){
			return res.redirect('/');
		});
	}, 
	postUpdate: function(req, res, next) {
		modelsProducts.updateProduct(req.params.id, req.body.name, req.body.price).then(function(response) {
			if (response) {
				return res.redirect('/products');
			}
		}).catch(function(){
			req.flash('message', 'Khong chinh sua duoc. Kiem tra thong tin chinh xac');
			return res.redirect('/products/update/' + req.param.id);
		});
	},
	getDelete: function(req, res, next) {
		modelsProducts.deleteProduct(req.params.id).then(function() {
			return res.redirect('/products');
		}).catch(function(){
			req.flash('message', 'Khong xoa duoc. Co du lieu phu thuoc');
			return res.redirect('/products');
		});
	}
};


module.exports = products;