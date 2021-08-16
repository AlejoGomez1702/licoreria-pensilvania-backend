const validateFields = require('./validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('./validate-roles');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
}