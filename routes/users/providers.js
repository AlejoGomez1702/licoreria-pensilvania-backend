const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT, validateFields, isAdminRole, isActiveUser, validateExistProduct } = require('../../middlewares');
const { createProvider, getAllProviders, getProviderById, updateProviderById, deleteProviderById, updateProviderProductsById } = require('../../controllers/users/providers');
const { existCategoryById, existAlcoholById, existUnitById, existProductById, existInventoryById, existProviderById, productsValids } = require('../../helpers/db-validators');
const { validateExistProvider } = require('../../middlewares/users/validate-exist-provider');

const router = Router();

/**
 * Crear un nuevo proveedor en la BD.
 * {{ url }}/api/providers
 */
router.post('/', [ 
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty().isString(),
    check('identification','El NIT o CC es obligatorio').not().isEmpty().isString(),
    check('cellphone','El número de teléfono es obligatorio').not().isEmpty().isNumeric(),
    isActiveUser,
    validateExistProvider,
    validateFields
], createProvider );

/**
 * Obtener todos los proveedores de la BD.
 * {{ url }}/api/providers
 */
 router.get('/', [
    validateJWT,
    isActiveUser
], getAllProviders );

/**
 * Obtener un proveedor especifico de la BD.
 * {{ url }}/api/providers/:id
 */
 router.get('/:id',[
    validateJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existProviderById ),
    validateFields
], getProviderById );

/**
 * Actualizar un proveedor especifico de la BD.
 * {{ url }}/api/providers/:id
 */
 router.put('/:id',[
    validateJWT,
    check('id').custom( existProviderById ),
    check('name','El nombre es obligatorio').not().isEmpty().isString(),
    check('identification','El NIT o CC es obligatorio').not().isEmpty().isString(),
    check('cellphone','El número de teléfono es obligatorio').not().isEmpty().isNumeric(),
    validateExistProvider,
    isActiveUser,
    validateFields
], updateProviderById );

/**
 * Eliminar un proveedor especifico de la BD.
 * {{ url }}/api/providers/:id
 */
 router.delete('/:id',[
    validateJWT,
    isAdminRole,
    isActiveUser,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existProviderById ),
    validateFields,
], deleteProviderById );

// *********** END-POINTS ESPECIALIZADOS *********** END-POINTS ESPECIALIZADOS ************** //

/**
 * Actualizar la información de productos de un proveedor en la base de datos.
 * {{ url }}/api/providers/:id/products
 */
 router.put('/:id/products',[
    validateJWT,
    check('id').custom( existProviderById ),
    check('products').custom( p => productsValids( p ) ),
    validateExistProvider,
    isActiveUser,
    validateFields
], updateProviderProductsById );

module.exports = router;