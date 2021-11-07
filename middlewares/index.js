const validateFields = require('./validate-fields');
const validateJWT = require('./auth/validate-jwt');
const validateRoles = require('./validate-roles');
const validateStatusUser = require('./validate-state-user');
const validateInventory = require('./validate-inventory');
const validateExistProduct = require('./products/validate-exist-product');
const validateFile = require('./validate-file');

// Validaciones para categorias de productos
const validateCreateCategory = require('./products/categories/validate-create-category');

// Validaciones para las unidades de medida de los productos
const validateCreateUnit = require('./products/units/validate-create-unit');

// Validaciones para los %s de alcohol de los productos
const validateCreateAlcohol = require('./products/alcohols/validate-create-alcohol');

const validateImageUploadProduct = require('./products/validate-image');
const validatePublicData = require('./auth/validate-public-data');

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
    ...validateCreateAlcohol,
    ...validateImageUploadProduct,
    ...validatePublicData
};