const dbValidators = require('./db-validators');
const generateJWT = require('./generate-jwt');
const uploadFile = require('./upload-file');
const deleteImage = require('./delete-image');


module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...uploadFile,
    ...deleteImage
}