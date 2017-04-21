var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

var customersRepository = {

    checkNameCustomer: function(name) {
        return new Promise(function(resolve, reject) {
            connection.query("SELECT * FROM customers WHERE name = ?",[name], function(err, rows) {
                if (err) reject(false);
                rows.length ? resolve(true) : reject(false);
            });    
        });
    },

    insertCustomer: function(name) {
        return new Promise(function(resolve, reject) {
            var insertQuery = "INSERT INTO customers ( name ) values (?)";
            connection.query(insertQuery,[name],function(err, rows) {
                if (err) reject(false);
                resolve(true);
            });

        });   
    },
    fetchCustomer: function() {
        return new Promise(function(resolve, reject) {
            connection.query("SELECT * FROM customers", function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });    
        });  
    },
    findOneCustomer: function(id) {
        return new Promise(function(resolve, reject) {
            connection.query("SELECT * FROM customers WHERE id = ?", [id], function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });    
        });    
    },
    updateCustomer: function(id, name) {
        return new Promise(function(resolve, reject) {
            connection.query("UPDATE customers SET name = ? WHERE id = ?", [name, id], function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });    
        });        
    },
    deleteCustomer: function(id) {
        return new Promise(function(resolve, reject) {
            connection.query("DELETE FROM customers WHERE id = ?", [id], function(err) {
                if (err) reject(err);
                resolve();
            });    
        });          
    }
}

module.exports = customersRepository;