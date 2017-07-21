var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

var productsRepository = {

    checkNameProduct: function(name) {
        return new Promise(function(resolve, reject) {
            connection.query("SELECT * FROM products WHERE name = ?",[name], function(err, rows) {
                if (err) reject(false);
                rows.length ? resolve(true) : reject(false);
            });    
        });
    },

    insertProduct: function(name, price) {
        return new Promise(function(resolve, reject) {
            var insertQuery = "INSERT INTO products ( name, price ) values (?,?)";
            connection.query(insertQuery,[name, price],function(err, rows) {
                if (err) reject(false);
                resolve(true);
            });

        });   
    },
    fetchProduct: function() {
        return new Promise(function(resolve, reject) {
            connection.query("SELECT * FROM products", function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });    
        });  
    },
    findOneProduct: function(id) {
        return new Promise(function(resolve, reject) {
            connection.query("SELECT * FROM products WHERE id = ?", [id], function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });    
        });    
    },
    updateProduct: function(id, name, price) {
        return new Promise(function(resolve, reject) {
            connection.query("UPDATE products SET name = ?,  price = ? WHERE id = ?", [name, price, id], function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });    
        });        
    },
    deleteProduct: function(id) {
        return new Promise(function(resolve, reject) {
            connection.query("DELETE FROM products WHERE id = ?", [id], function(err) {
                if (err) reject(err);
                resolve();
            });    
        });          
    }
}

module.exports = productsRepository;