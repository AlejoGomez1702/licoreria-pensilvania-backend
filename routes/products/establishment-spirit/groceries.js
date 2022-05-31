const { Router } = require('express');
const { check } = require('express-validator');
const { createGrocery, getAllGroceries, getGroceryById, updateGroceryById, deleteGroceryById } = require('../../../controllers/products/establishment-spirit/groceries');
const { existCategoryById, existUnitById, existProductById } = require('../../../helpers');
const { validateJWT, isActiveUser, validateFields, validateImageUploadProduct, isAdminRole, validateImageEditProduct, validateExistProduct } = require('../../../middlewares');
const { validateGroceryQuery, validateGroceryByIdQuery } = require('../../../middlewares/products/establishment-spirit/groceries/validate-query');

const router = Router();

/**
 * Crear un nuevo comestible en la BD.
 * {{ url }}/api/groceries
 */
 router.post('/', [ 
    validateJWT,
    isActiveUser,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('category','No existe la categoria especificada').isMongoId(),
    check('category').custom( existCategoryById ),
    check('unit','No existe la unidad de medida especificada').isMongoId(),
    check('unit').custom( existUnitById ),       
    validateExistProduct,
    validateFields,
    // La imagen es la ultima que se valida ya que si no esta todo correcto no se debe subir al servicio
    validateImageUploadProduct
], createGrocery );

/**
 * Obtener todos los comestibles de la BD.
 * {{ url }}/api/groceries
 */
 router.get('/', [
    validateJWT,
    validateGroceryQuery
], getAllGroceries );

/**
 * Obtener un comestible especifico de la BD.
 * {{ url }}/api/groceries/:id
 */
 router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existProductById ),
    // validatePublicData,
    validateJWT,
    validateGroceryByIdQuery,
    validateFields
], getGroceryById );

/**
 * Actualizar un comestible especifico de la BD.
 * {{ url }}/api/groceries/:id
 */
 router.put('/:id',[
    validateJWT,
    isActiveUser,
    isAdminRole,    // Solo el administrador puede modificar precios.
    check('id').custom( existProductById ),
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('category','No existe la categoria especificada').isMongoId(),
    check('category').custom( existCategoryById ),
    check('unit','No existe la unidad de medida especificada').isMongoId(),
    check('unit').custom( existUnitById ),
    validateExistProduct,    
    validateImageEditProduct,
    validateImageUploadProduct,
    validateFields
], updateGroceryById );

/**
 * Eliminar un producto especifico de la BD.
 * {{ url }}/api/groceries/:id
 */
 router.delete('/:id',[
    validateJWT,
    isActiveUser,
    isAdminRole,    // Solo el administrador puede eliminar productos. 
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existProductById ),
    validateFields,
], deleteGroceryById );

module.exports = router;