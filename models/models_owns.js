var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

var ownsRepository = {

    checkNameOwn: function(name) {
        return new Promise(function(resolve, reject) {
            connection.query("SELECT * FROM " + dbconfig.owns_table + " WHERE name = ?",[name], function(err, rows) {
                if (err) reject(false);
                rows.length ? resolve(true) : reject(false);
            });    
        });
    },
    insertOwn: function(customer_id, price, user_id) {
        return new Promise(function(resolve, reject) {
            var insertQuery = "INSERT INTO " + dbconfig.owns_table + " ( customer_id, price, user_id ) values (?,?,?)";
            connection.query(insertQuery,[customer_id, price, user_id],function(err, rows) {
                if (err) reject(false);
                resolve(true);
            });
        });   
    },
    fetchOwn: function() {
        return new Promise(function(resolve, reject) {
            var query = "select sum(o.price) as price, c.id as customer_id, c.name as customer_name, u.id as user_id, u.username as user_username \
            from " + dbconfig.owns_table + " as o \
            left join " + dbconfig.customers_table + " c \
            on o.customer_id = c.id \
            left join " + dbconfig.users_table + " u \
            on o.user_id = u.id \
            group by c.id, u.id";
            connection.query(query, function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });    
        });  
    },
    fetchOwnByUserId: function(user_id) {
        return new Promise(function(resolve, reject) {
            var query = "select sum(o.price) as price, c.name as customer_name, c.id as customer_id, u.username as user_username \
            from " + dbconfig.owns_table + " as o \
            left join " + dbconfig.customers_table + " c \
            on o.customer_id = c.id \
            left join " + dbconfig.users_table + " u \
            on o.user_id = u.id \
            where u.id = ? \
            group by c.id, u.id ";
            connection.query(query,[user_id], function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });    
        });  
    },
    fetchOwnByCustomerId: function(customer_id) {
        return new Promise(function(resolve, reject) {
            var query = "select sum(o.price) as price, c.name as customer_name, c.id as customer_id, u.username as user_username \
            from " + dbconfig.owns_table + " as o \
            left join " + dbconfig.customers_table + " c \
            on o.customer_id = c.id \
            left join " + dbconfig.users_table + " u \
            on o.user_id = u.id \
            where c.id = ? \
            group by c.id, u.id";
            connection.query(query,[customer_id], function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });    
        });  
    },
    fetchOwnByUserIdAndCustomerId: function(user_id, customer_id) {
        return new Promise(function(resolve, reject) {
            var query = "select sum(o.price) as price, c.name as customer_name, c.id as customer_id, u.username as user_username \
            from " + dbconfig.owns_table + " as o \
            left join " + dbconfig.customers_table + " c \
            on o.customer_id = c.id \
            left join " + dbconfig.users_table + " u \
            on o.user_id = u.id \
            where u.id = ? \
            and c.id = ? \
            group by c.id, u.id ";
            connection.query(query,[user_id, customer_id], function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });    
        });  
    },
    fetchDetailOwnByCustomerId: function(customer_id) {
        return new Promise(function(resolve, reject) {
            var query = "select o.id, o.price, o.created_date, c.name as customer_name, c.id as customer_id, u.username as user_username \
            from " + dbconfig.owns_table + " as o \
            left join " + dbconfig.customers_table + " c \
            on o.customer_id = c.id \
            left join " + dbconfig.users_table + " u \
            on o.user_id = u.id \
            where c.id = ? \
            order by o.created_date desc";
            connection.query(query,[customer_id], function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });    
        });  
    },
    fetchDetailOwnByUserIdAndCustomerId: function(user_id, customer_id) {
        return new Promise(function(resolve, reject) {
            var query = "select o.id, o.price, o.created_date, c.name as customer_name, c.id as customer_id, u.username as user_username \
            from " + dbconfig.owns_table + " as o \
            left join " + dbconfig.customers_table + " c \
            on o.customer_id = c.id \
            left join " + dbconfig.users_table + " u \
            on o.user_id = u.id \
            where u.id = ? \
            and c.id = ? \
            order by o.created_date desc";
            connection.query(query,[user_id, customer_id], function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });    
        });  
    },
    findOneOwn: function(id) {
        return new Promise(function(resolve, reject) {
            var query = "select o.id, o.price, o.created_date, c.name as customer_name, c.id as customer_id, u.username as user_username \
            from " + dbconfig.owns_table + " as o \
            left join " + dbconfig.customers_table + " c \
            on o.customer_id = c.id \
            left join " + dbconfig.users_table + " u \
            on o.user_id = u.id \
            where o.id = ? ";
            connection.query(query, [id], function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },
    updateOwn: function(id, price) {
        return new Promise(function(resolve, reject) {
            connection.query("UPDATE " + dbconfig.owns_table + " SET price = ? WHERE id = ?", [price, id], function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },
    deleteOwn: function(id) {
        return new Promise(function(resolve, reject) {
            connection.query("DELETE FROM " + dbconfig.owns_table + " WHERE id = ?", [id], function(err) {
                if (err) reject(err);
                resolve();
            });
        });
    },
    insertOwnPay: function(customer_id, price, user_id) {
        return new Promise(function(resolve, reject) {
            var insertQuery = "INSERT INTO " + dbconfig.owns_table + " ( customer_id, price, user_id ) values (?,?,?)";
            connection.query(insertQuery,[customer_id, price, user_id],function(err, rows) {
                if (err) reject(false);
                resolve(true);
            });
        });   
    },
}

module.exports = ownsRepository;