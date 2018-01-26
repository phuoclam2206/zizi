const nodeXlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
var moment = require('moment');
var modelsWaterReports = require('../models/models_water_reports');
const controllersAuthencations = require('./controllers_authencations');
const report = {
    getReport: function(req, res, next) {
        if(controllersAuthencations.isAdmin(req.user.id)) {
            let dataExcel = [];
            arrHeaderTitle = ['STT', 'Tien gio', 'Dich vu', 'Tong thu', 'Thuc thu', 'Tham', 'Du', 'Nguoi tao', 'Ngay tao', 'Comment'];
            dataExcel.push(arrHeaderTitle);
            let rowItemValue = [];

            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 2).toISOString().slice(0, 10);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).toISOString().slice(0, 10);
            var start = req.query.start ? req.query.start : firstDay;
            var end = req.query.end ? req.query.end : lastDay;

            Promise.all([modelsWaterReports.fetchWaterReport({limit: 200, offset: 0}, start, end)]).then(function(result) {
                if(result) {
                    let i = 1;
                    for (let item of result[0]) {
                        let rowItemValue = [];
                        rowItemValue.push(i);
                        rowItemValue.push(item.hours);
                        rowItemValue.push(item.service);
                        rowItemValue.push(item.total);
                        rowItemValue.push(item.final);
                        rowItemValue.push(item.lose);
                        rowItemValue.push(item.balance);
                        rowItemValue.push(item.username);
                        rowItemValue.push(moment(item.created_date).format('HH:mm DD-MM-YY'));
                        rowItemValue.push(item.comment);
                        dataExcel.push(rowItemValue);
                        i++;
                    }
                }
                
                
                let buffer = nodeXlsx.build([{name: "List User", data: dataExcel}]); 
                res.attachment('report.xlsx');
                res.send(buffer);
                
            });
        } else {
            return res.redirect('/profile');
        }
    }
};


module.exports = report;