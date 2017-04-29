var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var pagination = require('../models/util/models_pagination');
connection.query('USE ' + dbconfig.database);

var inputWaterRepository = {
    insertInputWater: function(inputWater, parseId, userId) {
        return new Promise(function(resolve, reject) {
            var insertQuery = "INSERT INTO " + dbconfig.input_water_table + " ( number, parse_id, product_id, user_id ) values ";
            var inputWaterLength = Object.keys(inputWater).length, numLength = 1;
            for (var key in inputWater) {
                insertQuery += "(" + parseInt(inputWater[key]) + ","+ parseId +","+ parseInt(key.replace(/\'/g, "")) +","+ userId+" ) ";
                if (numLength < inputWaterLength) {
                    numLength = numLength + 1;
                    insertQuery += ", ";
                }
            }

            connection.query(insertQuery, function(err, rows) {
                if (err) reject(false);
                resolve(true);
            });

        });   
    },
    updateInputWater: function(inputWater, userApproveId) {
        return new Promise(function(resolve, reject) {
            var numberApprove = "", inputWaterId = "";
            
            var inputWaterLength = Object.keys(inputWater).length, numLength = 1;
            for (var key in inputWater) {
                numberApprove += " when id = " + parseInt(key.replace(/\'/g, "")) + " then " + parseInt(inputWater[key]);
                inputWaterId += parseInt(key.replace(/\'/g, ""));
                if (numLength < inputWaterLength) {
                    numLength = numLength + 1;
                    inputWaterId += ", ";
                }
            }
            var updateQuery = "UPDATE " + dbconfig.input_water_table + " SET number_approve = (case " + numberApprove + "  end), user_approve_id = ? where id in ( " + inputWaterId + ") ";
            connection.query(updateQuery, [userApproveId], function(err, rows) {
                if (err) reject(false);
                resolve(true);
            });

        });   
    },
    fetchInputWater: function(page) {
        return new Promise(function(resolve, reject) {
            var query = "select iw.parse_id as parse_id, iw.created_date, u.username as username  \
            from " + dbconfig.input_water_table + " as iw \
            left join " + dbconfig.users_table + " u \
            on iw.user_id = u.id \
            group by iw.parse_id \
            order by iw.created_date desc "
            + pagination.paginator(page);

            connection.query(query, function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });    
        });
    },
    countInputWater: function() {
        return new Promise(function(resolve, reject) {
            var query = "select count(iw.parse_id) as numRows  \
            from " + dbconfig.input_water_table + " as iw \
            left join " + dbconfig.users_table + " u \
            on iw.user_id = u.id \
            group by iw.parse_id \
            order by iw.created_date desc ";

            connection.query(query, function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });    
        });
    },
    fetchLastParseId: function() {
        return new Promise(function(resolve, reject) {
            var query = "select iw.*, u.username as username, p.id as product_id, p.name as product_name  \
            from " + dbconfig.input_water_table + " as iw \
            left join " + dbconfig.users_table + " u \
            on iw.user_id = u.id \
            left join " + dbconfig.products_table + " p \
            on iw.product_id = p.id \
            where iw.parse_id = \
            ( select parse_id from " + dbconfig.input_water_table + " order by id desc limit 0,1 )";

            connection.query(query, function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });    
        });
    },
    findByParseId: function(parseId) {
        return new Promise(function(resolve, reject) {
            var query = "select iw.*, u.username as username, p.id as product_id, p.name as product_name \
            from " + dbconfig.input_water_table + " as iw \
            left join " + dbconfig.users_table + " u \
            on iw.user_id = u.id \
            left join " + dbconfig.products_table + " p \
            on iw.product_id = p.id \
            where iw.parse_id = ? ";

            connection.query(query, [parseId], function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });    
        });
    },
    fetchLastParseIdByUserApproveId: function(userApproveId) {
        return new Promise(function(resolve, reject) {
            var query = "select iw.*, u.username as username, p.id as product_id, p.name as product_name  \
            from " + dbconfig.input_water_table + " as iw \
            left join " + dbconfig.users_table + " u \
            on iw.user_id = u.id \
            left join " + dbconfig.products_table + " p \
            on iw.product_id = p.id \
            where iw.parse_id = \
            ( select parse_id from " + dbconfig.input_water_table + " where user_approve_id = ? order by id desc limit 0,1 )";

            connection.query(query, [userApproveId], function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
    
}

module.exports = inputWaterRepository;