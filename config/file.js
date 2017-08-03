/**
 * Created by glodeit on 8/2/17.
 */
const multer = require('multer');
const path = require('path');

const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./file/csv");
    },
    filename: function (req, file, callback) {
        const dt = new Date();
        const datetime = dt.getDate() + "_" + (dt.getMonth() + 1) + "_" + dt.getFullYear();
        callback(null, datetime + "_" + file.originalname);
    }
});
const upload = multer({
    fileFilter: function(req, file, callback) {
        const ext = path.extname(file.originalname);
        if (ext !== '.csv' && ext !== '.xlsx' && ext !== '.xls') {
            console.log(ext);
            return callback('Fail upload file. File allow .csv, .xlsx, .xls', null);
        }
        callback(null, true);
    },
    storage: Storage
}).single("imgUploader");

const file = {
    csvFolder : './file/csv/',
    saveFile: upload
};
module.exports = file;