const { Router } = require('express');
const { check } = require('express-validator');
const { createMovement, getAllMovements } = require('../controllers/movements');
const { createSale, getAllSales, getSaleById } = require('../controllers/sales');
const { existSaleById } = require('../helpers');
const { validateJWT, isActiveUser, validateFields, isAdminRole } = require('../middlewares');
const { validateSaleByIdQuery } = require('../middlewares/validate-sale-query');

const router = Router();

/**
 * Crear un movimiento en la BD (Entrada o salida de dinero).
 * {{ url }}/api/movements
 */
router.post('/', [ 
    validateJWT,
    isActiveUser,
    check('amount','La cantidad es obligatoria').not().isEmpty().isNumeric(),
    check('description','La descripción es obligatoria').not().isEmpty().isString(),
    check('type','El tipo de movimiento es obligatorio').not().isEmpty().isString(),
    validateFields
], createMovement );

/**
 * Obtener todos los movimientos del negocio del usuario logueado.
 * {{ url }}/api/movements
 */
 router.get('/', [
    validateJWT,
    isActiveUser,
    isAdminRole,
    validateFields
], getAllMovements );

// /**
//  * Obtener una venta especifica de la BD.
//  * {{ url }}/api/sales/:id
//  */
//  router.get('/:id',[
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existSaleById ),
//     // validatePublicData,
//     validateJWT,
//     validateSaleByIdQuery,
//     validateFields
// ], getSaleById );

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