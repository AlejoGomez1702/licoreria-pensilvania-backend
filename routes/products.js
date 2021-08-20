const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT, validateFields, isAdminRole, isActiveUser, validateInventory, validateExistProduct } = require('../middlewares');
const { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById } = require('../controllers/products');
const { existCategoryById, existAlcoholById, existUnitById, existProductById, existInventoryById } = require('../helpers/db-validators');

const router = Router();

/**
 * Crear un nuevo producto en la BD.
 * {{ url }}/api/products
 */
router.post('/', [ 
    validateJWT,
    validateInventory,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('category','No existe la categoria especificada').isMongoId(),
    check('category').custom( existCategoryById ),
    check('alcohol','No existe el volumen alcoholico especificado').isMongoId(),
    check('alcohol').custom( existAlcoholById ),
    check('unit','No existe la unida de medida especificada').isMongoId(),
    check('unit').custom( existUnitById ),
    check('inventory','No existe el inventario especificado').isMongoId(),
    check('inventory').custom( existInventoryById ),
    isAdminRole,
    isActiveUser,
    validateExistProduct,
    validateFields
], createProduct );

/**
 * Obtener todos los productos de la BD.
 * {{ url }}/api/products
 */
 router.get('/', [
    validateJWT,
    validateInventory,
    isActiveUser
], getAllProducts );

/**
 * Obtener un produto especifico de la BD.
 * {{ url }}/api/products/:id
 */
 router.get('/:id',[
    validateJWT,
    validateInventory,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existProductById ),
    validateFields
], getProductById );

/**
 * Actualizar un producto especifico de la BD.
 * {{ url }}/api/products/:id
 */
 router.put('/:id',[
    validateJWT,
    validateInventory,
    check('id').custom( existProductById ),
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('category','No existe la categoria especificada').isMongoId(),
    check('category').custom( existCategoryById ),
    check('alcohol','No existe el volumen alcoholico especificado').isMongoId(),
    check('alcohol').custom( existAlcoholById ),
    check('unit','No existe la unida de medida especificada').isMongoId(),
    check('unit').custom( existUnitById ),
    check('inventory','No existe el inventario especificado').isMongoId(),
    check('inventory').custom( existInventoryById ),
    validateExistProduct,
    isAdminRole,
    isActiveUser,
    validateFields
], updateProductById );

/**
 * Eliminar un productos especifico de la BD.
 * {{ url }}/api/products/:id
 */
 router.delete('/:id',[
    validateJWT,
    validateInventory,
    isAdminRole,
    isActiveUser,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existProductById ),
    validateFields,
], deleteProductById );

module.exports = router;