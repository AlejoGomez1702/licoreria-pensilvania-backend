

const validateFields = require('./validate-fields');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validateFields,
    ...validarJWT,
    ...validaRoles,
}