const { Router } = require('express');
const { check } = require('express-validator');
const { createPurchase, getAllPurchases, getPurchaseById } = require('../controllers/purchases');
const { existPurchaseById } = require('../helpers');
const { validateJWT, isActiveUser, validateFields, isAdminRole, validateJWTEstablishment } = require('../middlewares');
const { validatePurchaseByIdQuery } = require('../middlewares/validate-purchase-query');

const router = Router();

/**
 * Crear una nueva compra en la BD.
 * {{ url }}/api/purchases
 */
router.post('/', [ 
    validateJWT,
    isActiveUser,
    check('products').not().isEmpty().isArray(),
    validateFields
], createPurchase );

/**
 * Obtener todas las compras del negocio del usuario logueado.
 * {{ url }}/api/purchases
 */
 router.get('/', [
    validateJWT,
    isActiveUser,
    isAdminRole,
    validateFields
], getAllPurchases );

/**
 * Obtener una compra especifica de la BD.
 * {{ url }}/api/purchases/:id
 */
 router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existPurchaseById ),
    // validatePublicData,
    validateJWTEstablishment,
    validatePurchaseByIdQuery,
    validateFields
], getPurchaseById );

// // /**
// //  * Actualizar un producto especifico de la BD.
// //  * {{ url }}/api/products/:id
// //  */
// //  router.put('/:id',[
// //     validateJWT,
// //     validateInventory,
// //     check('id').custom( existProductById ),
// //     check('name','El nombre es obligatorio').not().isEmpty(),
// //     check('category','No existe la categoria especificada').isMongoId(),
// //     check('category').custom( existCategoryById ),
// //     check('alcohol','No existe el volumen alcoholico especificado').isMongoId(),
// //     check('alcohol').custom( existAlcoholById ),
// //     check('unit','No existe la unida de medida especificada').isMongoId(),
// //     check('unit').custom( existUnitById ),
// //     check('inventory','No existe el inventario especificado').isMongoId(),
// //     check('inventory').custom( existInventoryById ),
// //     validateExistProduct,
// //     isAdminRole,
// //     isActiveUser,
// //     validateFields
// // ], updateProductById );

// // /**
// //  * Eliminar un productos especifico de la BD.
// //  * {{ url }}/api/products/:id
// //  */
// //  router.delete('/:id',[
// //     validateJWT,
// //     validateInventory,
// //     isAdminRole,
// //     isActiveUser,
// //     check('id', 'No es un id de Mongo válido').isMongoId(),
// //     check('id').custom( existProductById ),
// //     validateFields,
// // ], deleteProductById );

module.exports = router;