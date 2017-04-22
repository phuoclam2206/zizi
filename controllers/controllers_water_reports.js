
var modelsWaterReports = require('../models/models_water_reports');
var modelsProducts = require('../models/models_products');
var waterReports = {
    getWaterReport: function(req, res, next) {
        modelsProducts.fetchProduct().then(function(products) {
            if (products) {
                return res.render('water_reports/index.ejs', {products: products});
            }
        }).catch(function(){
            return res.redirect('/');
        });

    }


};


module.exports = waterReports;