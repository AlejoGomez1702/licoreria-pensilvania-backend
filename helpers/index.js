const dbValidators = require('./db-validators');
const generateJWT = require('./generate-jwt');
const uploadFile = require('./upload-file');


module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...uploadFile,
}