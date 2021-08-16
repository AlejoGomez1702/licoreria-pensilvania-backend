const validateFields = require('./validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const validaRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validaRoles,
}