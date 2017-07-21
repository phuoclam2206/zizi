var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

var usersRepository = {

    fetchUser: function() {
        return new Promise(function(resolve, reject) {
            var query = "select u.id, u.username from " + dbconfig.users_table + " as u ";
            connection.query(query, function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });    
        });  
    }
}

module.exports = usersRepository;