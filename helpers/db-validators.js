const Role = require('../models/role');
const User = require('../models/usuario');

/**
 * Verifica si un correo electrónico ya se encuentra registrado en la BD.
 * @param {string} email 
 */
 const emailExist = async( email = '' ) => {
    // Verificar si el email existe
    const exist = await Usuario.findOne({ email });
    if ( exist ) {
        throw new Error(`El email: ${ email }, ya está registrado`);
    }
}

/**
 * Verifica si el usuario intenta registrarse con un rol válido.
 * @param {string} rol 
 */
const isValidRole = async(rol = '') => {
    // Verificar si el rol existe en la BD
    const exist = await Role.findOne({ rol });
    if ( !exist ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await User.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {
    isValidRole,
    emailExist,
    existeUsuarioPorId
}

