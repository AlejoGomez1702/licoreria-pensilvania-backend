const { Role, User, Category, Alcohol, Unit } = require('../models');

/**
 * Verifica si un correo electrónico ya se encuentra registrado en la BD.
 * @param {string} email 
 */
const emailExist = async( email = '' ) => {
    // Verificar si el email existe
    const exist = await User.findOne({ email });
    if ( exist ) {
        throw new Error(`El email: ${ email }, ya está registrado`);
    }
};

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
};

/**
 * Verifica si una categoria existe en la base de datos según su identificador (id).
 * @param {string} id Identificador de la categoria a comprobar.
 */
 const existCategoryById = async( id ) => {
    // Verificar si existe en la BD.
    const exist = await Category.findById(id);
    if ( !exist ) 
    {
        throw new Error(`La categoria no existe: ${ id }`);
    }
}

/**
 * Verifica si un % de volumen alcoholico existe en la base de datos según su identificador (id).
 * @param {string} id Identificador de % alcohol a comprobar.
 */
 const existAlcoholById = async( id ) => {
    // Verificar si existe en la BD.
    const exist = await Alcohol.findById(id);
    if ( !exist ) 
    {
        throw new Error(`El % de volumen alcoholico no existe: ${ id }`);
    }
}

/**
 * Verifica si una unidad de medida existe en la base de datos según su identificador (id).
 * @param {string} id Identificador de la categoria a comprobar.
 */
 const existUnitById = async( id ) => {
    // Verificar si existe en la BD.
    const exist = await Unit.findById(id);
    if ( !exist ) 
    {
        throw new Error(`La unidad de medida no existe: ${ id }`);
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
    existCategoryById,
    existAlcoholById,
    existUnitById,


    existeUsuarioPorId
}

