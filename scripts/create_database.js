/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE IF NOT EXISTS ' + dbconfig.database);

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` int not null auto_increment primary key, \
    `username` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL \
)ENGINE=InnoDB');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`' + dbconfig.products_table + '` ( \
    `id` int not null auto_increment primary key, \
    `name` VARCHAR(20) NOT NULL, \
    `price` INT NOT NULL \
)ENGINE=InnoDB');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`' + dbconfig.customers_table + '` ( \
    `id` int not null auto_increment primary key, \
    `name` VARCHAR(255) NOT NULL \
)ENGINE=InnoDB');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`' + dbconfig.owns_table + '` ( \
    `id` int not null auto_increment primary key, \
    `customer_id` INT, \
    `price` INT NOT NULL, \
    `user_id` INT, \
    `created_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \
    FOREIGN KEY fk_customesers_customer_id(customer_id) REFERENCES `' + dbconfig.database + '`.`' + dbconfig.customers_table + '`(id) ON UPDATE CASCADE ON DELETE RESTRICT, \
    FOREIGN KEY fk_users_user_id(user_id) REFERENCES `' + dbconfig.database + '`.`' + dbconfig.users_table + '`(id) ON UPDATE CASCADE ON DELETE RESTRICT \
)ENGINE=InnoDB');

console.log('Success: Database Created!')

connection.end();
