const validateFields = require('./validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('./validate-roles');
const validateStatusUser = require('./validate-state-user');
const validateInventory = require('./validate-inventory');
const validateExistProduct = require('./validate-exist-product');
const validateFile = require('./validate-file');

// Validaciones para categorias de productos
const validateCreateCategory = require('./categories/validate-create-category');

// Validaciones para las unidades de medida de los productos
const validateCreateUnit = require('./units/validate-create-unit');

// Validaciones para los %s de alcohol de los productos
const validateCreateAlcohol = require('./alcohols/validate-create-alcohol');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateStatusUser,
    ...validateInventory,
    ...validateExistProduct,
    ...validateFile,
    ...validateCreateCategory,
    ...validateCreateUnit,
    ...validateCreateAlcohol
};