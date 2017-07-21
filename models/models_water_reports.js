var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var pagination = require('../models/util/models_pagination');
connection.query('USE ' + dbconfig.database);

var waterReportsRepository = {
	insertWaterReport: function(waterReport) {
        return new Promise(function(resolve, reject) {
            var insertQuery = "INSERT INTO " + dbconfig.water_reports_table + " ( hours, service, total, final, lose, balance, user_id ) values (?,?,?,?,?,?,?)";
            connection.query(insertQuery,[
            	parseInt(waterReport.hours), 
            	parseInt(waterReport.service), 
            	parseInt(waterReport.total), 
            	parseInt(waterReport.final), 
            	parseInt(waterReport.lose), 
            	parseInt(waterReport.balance), 
            	parseInt(waterReport.user_id)], function(err, rows) {
                if (err) reject(false);
                resolve(true);
            });
        });   
    },
    fetchWaterReport: function(page, start, end) {
        return new Promise(function(resolve, reject) {
            var query = "select wr.*, u.username as username  \
            from " + dbconfig.water_reports_table + " as wr \
            left join " + dbconfig.users_table + " u \
            on wr.user_id = u.id \
            where wr.created_date <= '" + end + "' \
            and wr.created_date >= '" + start + "'\
            order by wr.created_date desc"
            + pagination.paginator(page);

            connection.query(query, function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });    
        });
    },

    countWaterReport: function(start, end) {
        return new Promise(function(resolve, reject) {
            var query = "select count(wr.id) as numRows  \
            from " + dbconfig.water_reports_table + " as wr \
            left join " + dbconfig.users_table + " u \
            on wr.user_id = u.id \
            where wr.created_date <= '" + end + "' \
            and wr.created_date >= '" + start + "'\
            order by wr.created_date desc";

            connection.query(query, function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            });    
        });
    },

    sumDebt: function(month, year, user_id) {
        return new Promise(function(resolve, reject) {
            var query = "select sum(wr.lose) as sumDebt \
            from " + dbconfig.water_reports_table + " as wr \
            left join " + dbconfig.users_table + " u \
            on wr.user_id = u.id \
            where wr.user_id = " + user_id + " \
            and month(wr.created_date) = " + month + " \
            and year(wr.created_date) = " + year + " \
            group by wr.user_id";
            connection.query(query, function(err, rows) {
                if (err) reject(err);
                resolve(rows);
            }); 
        })
    }
}

module.exports = waterReportsRepository;