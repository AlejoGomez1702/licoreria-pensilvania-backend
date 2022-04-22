const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT, validateFields, isActiveUser, isAdminRole } = require('../../middlewares');
const { getAllClients, createClient, updateClientById, deleteClientById } = require('../../controllers/users/clients');
const { validateExistClient } = require('../../middlewares/users/validate-exist-client');
const { existClientById } = require('../../helpers/db-validators');

const router = Router();

/**
 * Crear un nuevo cliente en la BD.
 * {{ url }}/api/clients
 */
router.post('/', [ 
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty().isString(),
    check('cellphone','El número de teléfono es obligatorio').not().isEmpty().isNumeric(),
    isActiveUser,
    validateExistClient,
    validateFields
], createClient );

/**
 * Obtener todos los clientees de la BD.
 * {{ url }}/api/clients
 */
 router.get('/', [
    validateJWT,
    isActiveUser
], getAllClients );

// /**
//  * Obtener un cliente especifico de la BD.
//  * {{ url }}/api/clients/:id
//  */
//  router.get('/:id',[
//     validateJWT,
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existProviderById ),
//     validateFields
// ], getProviderById );

/**
 * Actualizar un cliente especifico de la BD.
 * {{ url }}/api/clients/:id
 */
 router.put('/:id',[
    validateJWT,
    check('id').custom( existClientById ),
    check('name','El nombre es obligatorio').not().isEmpty().isString(),
    check('cellphone','El número de teléfono es obligatorio').not().isEmpty().isNumeric(),
    validateExistClient,
    isActiveUser,
    validateFields
], updateClientById );

/**
 * Eliminar un cliente especifico de la BD.
 * {{ url }}/api/clients/:id
 */
 router.delete('/:id',[
    validateJWT,
    isAdminRole,
    isActiveUser,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existClientById ),
    validateFields,
], deleteClientById );

// // *********** END-POINTS ESPECIALIZADOS *********** END-POINTS ESPECIALIZADOS ************** //

// /**
//  * Actualizar la información de productos de un cliente en la base de datos.
//  * {{ url }}/api/clients/:id/products
//  */
//  router.put('/:id/products',[
//     validateJWT,
//     check('id').custom( existProviderById ),
//     check('products').custom( p => productsValids( p ) ),
//     validateExistProvider,
//     isActiveUser,
//     validateFields
// ], updateProviderProductsById );

module.exports = router;