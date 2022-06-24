const { Router } = require('express');
const { check } = require('express-validator');
const { createSale, getAllSales, getSaleById } = require('../controllers/sales');
const { existSaleById } = require('../helpers');
const { validateJWT, isActiveUser, validateFields, isAdminRole } = require('../middlewares');
const { validateDefaultDates } = require('../middlewares/sales/validate-default-dates');
const { ValidateRangeDates, validateRangeDates } = require('../middlewares/sales/validate-range-dates');
const { validateSaleBasicQuery } = require('../middlewares/sales/validate-sale-basic-query');
const { validateScheduleDates } = require('../middlewares/sales/validate-schedule-dates');
const { validateSendDates } = require('../middlewares/sales/validate-send-dates');
const { validateSaleByIdQuery } = require('../middlewares/validate-sale-query');

const router = Router();

/**
 * Crear una nueva venta en la BD.
 * {{ url }}/api/sales
 */
router.post('/', [ 
    validateJWT,
    isActiveUser,
    check('products').not().isEmpty().isArray(),
    validateFields
], createSale );

/**
 * ********* ADMINISTRADOR *********
 * Obtener todas las ventas del negocio del usuario logueado.
 * {{ url }}/api/products
 */
 router.get('/', [
    validateJWT,
    isActiveUser,
    isAdminRole,
    validateFields,
    validateSendDates,
    validateScheduleDates,
    validateRangeDates,
    validateDefaultDates,   
    validateSaleBasicQuery
], getAllSales );

/**
 * Obtener una venta especifica de la BD.
 * {{ url }}/api/sales/:id
 */
 router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existSaleById ),
    // validatePublicData,
    validateJWT,
    validateSaleByIdQuery,
    validateFields
], getSaleById );

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