/**
 * Created by glodeit on 8/2/17.
 */
const multer = require('multer');
const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./file/csv");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname + "_" + Date.now());
    }
});
const upload = multer({ storage: Storage }).array("imgUploader", 3);

const file = {
    csvFolder : './file/csv/',
    saveFile: upload
};
module.exports = file;