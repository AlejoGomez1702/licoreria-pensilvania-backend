const validateFields = require('./validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('./validate-roles');
const validateStatusUser = require('./validate-state-user');
const validateInventory = require('./validate-inventory');
const validateExistProduct = require('./validate-exist-product');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateStatusUser,
    ...validateInventory,
    ...validateExistProduct
}