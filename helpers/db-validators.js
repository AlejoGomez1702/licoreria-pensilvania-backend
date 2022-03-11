const { Role, User, Category, Alcohol, Unit, Product, Inventory, Provider, Establishment, Sale } = require('../models');

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

// /**
//  * Verifica si un producto existe en la base de datos según su identificador (id).
//  * @param {string} id Identificador del producto a comprobar.
//  */
//  const existProductById = async( id ) => {
//     // Verificar si existe en la BD.
//     const exist = await Product.findById(id);
//     if ( !exist ) 
//     {
//         throw new Error(`El producto no existe: ${ id }`);
//     }
// }

/**
 * Verifica si un licor existe en la base de datos según su identificador (id).
 * @param {string} id Identificador del producto a comprobar.
 */
 const existProductById = async( id ) => {
    // Verificar si existe en la BD.
    const exist = await Product.findById(id);
    if ( !exist ) 
    {
        throw new Error(`El producto no existe: ${ id }`);
    }
}

/**
 * Verifica si una venta existe en la base de datos según su identificador (id).
 * @param {string} id 
 */
 const existSaleById = async( id ) => {
    // Verificar si existe en la BD.
    const exist = await Sale.findById(id);
    if ( !exist ) 
    {
        throw new Error(`La venta no existe: ${ id }`);
    }
}

/**
 * Verifica si un inventario existe en la base de datos según su identificador (id).
 * @param {string} id Identificador del inventario a comprobar.
 */
 const existInventoryById = async( id ) => {
    // Verificar si existe en la BD.
    const exist = await Inventory.findById(id);
    if ( !exist ) 
    {
        throw new Error(`El inventario no existe: ${ id }`);
    }
}

/**
 * Verifica si proveedor existe en la base de datos según su identificador (id).
 * @param {string} id Identificador del proveedor a comprobar.
 */
 const existProviderById = async( id ) => {
    // Verificar si existe en la BD.
    const exist = await Provider.findById(id);
    if ( !exist ) 
    {
        throw new Error(`El proveedor no existe: ${ id }`);
    }
}

/**
 * Verifica si el establecimiento existe en la base de datos según su identificador (id).
 * @param {string} id Identificador del establecimiento a comprobar.
 */
 const existEstablishmentById = async( id ) => {
    const exist = await Establishment.findById(id);
    if ( !exist ) 
    {
        throw new Error(`El establecimiento no existe: ${ id }`);
    }
};

/**
 * Valida una coleccion permitida para subir una imagen.
 * @param {*} collection 
 * @param {*} collections 
 * @returns 
 */
const collectionsValids = ( collection = '', collections = [] ) => {

    const include = collections.includes( collection );
    if( !include )
    {
        throw new Error(`La colleción ${collection} NO es permitida, ${collections}`);
    }

    return true;
};

/**
 * Valida que los productos que se le van asignar al proveedor existan.
 * @param {*} product 
 * @param {*} products 
 * @returns 
 */
 const productsValids = async ( products = [] ) => {

    for (const product of products) 
    {
        const productDB = await Product.findById( product );
        if( !productDB )
        {
            throw new Error(`El producto ${product} NO se puede asignar`);
        }
    }

    return true;
};




const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await User.findById(id);
    if ( !existeUsuario ) 
    {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {
    isValidRole,
    emailExist,
    existCategoryById,
    existAlcoholById,
    existUnitById,
    existProductById,
    existInventoryById,
    existProviderById,
    existEstablishmentById,
    collectionsValids,
    productsValids,
    existSaleById,
    
    existeUsuarioPorId
}

