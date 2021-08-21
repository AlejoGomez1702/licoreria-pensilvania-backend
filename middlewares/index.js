const validateFields = require('./validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('./validate-roles');
const validateStatusUser = require('./validate-state-user');
const validateInventory = require('./validate-inventory');
const validateExistProduct = require('./validate-exist-product');
const validateFile = require('./validate-file');

// Validaciones para categorias de productos
const validateCreateCategory = require('./categories/validate-create-category');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateStatusUser,
    ...validateInventory,
    ...validateExistProduct,
    ...validateFile,
    ...validateCreateCategory
}