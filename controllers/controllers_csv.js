/**
 * Created by glodeit on 8/2/17.
 */
const fs = require('fs');
const path = require('path');
const controllersAuthencations = require('./controllers_authencations');
const fileConfig = require('../config/file');
const csv = {
    getCsv: function(req, res, next) {
        if(controllersAuthencations.isAdmin(req.user.id)) {
            fs.readdir(fileConfig.csvFolder, (err, files) => {
                if(files) {
                    return res.render('csv/index.ejs', {files: files});
                }
            });
        } else {
            return res.redirect('/profile');
        }
    },
    downloadCsv: function(req, res, next) {
        if(controllersAuthencations.isAdmin(req.user.id) && req.params.name) {
            const file = fileConfig.csvFolder + req.params.name;
            const filename = path.basename(file);
            res.setHeader('Content-disposition', 'attachment; filename=' + filename);

            const filestream = fs.createReadStream(file);
            filestream.pipe(res);
        } else {
            return res.redirect('/profile');
        }
    },
    getCreateCsv: function (req, res, next) {
        if(controllersAuthencations.isAdmin(req.user.id)) {
            return res.render('csv/create.ejs');
        } else {
            return res.redirect('/profile');
        }
    },
    postCreateCsv: function (req, res, next) {
        if(controllersAuthencations.isAdmin(req.user.id)) {
            fileConfig.saveFile(req, res, function (err) {
                if (err) {
                    return res.end("Something went wrong!");
                }
                return res.redirect('/csv');
            });
        } else {
            return res.redirect('/profile');
        }
    },
    getDeleteCsv: function (req, res, next) {
        if(controllersAuthencations.isAdmin(req.user.id) && req.params.name) {
            fs.unlink(fileConfig.csvFolder + req.params.name, function (err) {
                if (err) {
                    return req.send("Don\'t delete file");
                }
                return res.redirect('/csv');
            })
        } else {
            return res.redirect('/profile');
        }

    }
};


module.exports = csv;