/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE IF NOT EXISTS ' + dbconfig.database);

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` BIGINT not null primary key, \
    `username` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL \
)ENGINE=InnoDB');

connection.query('INSERT INTO users ( id, username, password) values (1, admin, phuoclam2206)');

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
    `user_id` BIGINT, \
    `created_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \
    FOREIGN KEY fk_customesers_customer_id(customer_id) REFERENCES `' + dbconfig.database + '`.`' + dbconfig.customers_table + '`(id) ON UPDATE CASCADE ON DELETE RESTRICT, \
    FOREIGN KEY fk_users_user_id(user_id) REFERENCES `' + dbconfig.database + '`.`' + dbconfig.users_table + '`(id) ON UPDATE CASCADE ON DELETE RESTRICT \
)ENGINE=InnoDB');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`' + dbconfig.water_reports_table + '` ( \
    `id` int not null auto_increment primary key, \
    `hours` INT NOT NULL, \
    `service` INT NOT NULL, \
    `total` INT NOT NULL, \
    `final` INT NOT NULL, \
    `lose` INT NOT NULL, \
    `balance` INT NOT NULL, \
    `user_id` BIGINT, \
    `created_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \
    FOREIGN KEY fk_water_reports_users_user_id(user_id) REFERENCES `' + dbconfig.database + '`.`' + dbconfig.users_table + '`(id) ON UPDATE CASCADE ON DELETE RESTRICT \
)ENGINE=InnoDB');

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`' + dbconfig.input_water_table + '` ( \
    `id` int not null auto_increment primary key, \
    `number` INT NOT NULL, \
    `parse_id` BIGINT, \
    `product_id` INT, \
    `user_id` BIGINT, \
    `number_approve` INT,\
    `user_approve_id` BIGINT, \
    `created_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \
    FOREIGN KEY fk_input_water_product_id(product_id) REFERENCES `' + dbconfig.database + '`.`' + dbconfig.products_table + '`(id) ON UPDATE CASCADE ON DELETE RESTRICT, \
    FOREIGN KEY fk_input_water_user_id(user_id) REFERENCES `' + dbconfig.database + '`.`' + dbconfig.users_table + '`(id) ON UPDATE CASCADE ON DELETE RESTRICT, \
    FOREIGN KEY fk_input_water_user_approve_id(user_approve_id) REFERENCES `' + dbconfig.database + '`.`' + dbconfig.users_table + '`(id) ON UPDATE CASCADE ON DELETE RESTRICT \
)ENGINE=InnoDB');

console.log('Success: Database Created!');

connection.end();
