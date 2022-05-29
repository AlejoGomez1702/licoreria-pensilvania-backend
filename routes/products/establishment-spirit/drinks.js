const { Router } = require('express');
const { check } = require('express-validator');
const { getAllDrinks, createDrink, getDrinkById, updateDrinkById, deleteDrinkById } = require('../../../controllers/products/establishment-spirit/drinks');
const { existCategoryById, existUnitById, existProductById } = require('../../../helpers');
const { validateJWTEstablishment, validateJWT, isActiveUser, validateFields, validateImageUploadProduct, isAdminRole, validateImageEditProduct } = require('../../../middlewares');
const { validateDrinkQuery, validateDrinkByIdQuery } = require('../../../middlewares/products/establishment-spirit/drinks/validate-query');
const { validateExistDrink } = require('../../../middlewares/products/establishment-spirit/drinks/validate-exist-drink');

const router = Router();

/**
 * Crear una nueva bebida en la BD.
 * {{ url }}/api/drinks
 */
 router.post('/', [ 
    validateJWT,
    isActiveUser,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('category','No existe la categoria especificada').isMongoId(),
    check('category').custom( existCategoryById ),
    check('unit','No existe la unidad de medida especificada').isMongoId(),
    check('unit').custom( existUnitById ),       
    validateExistDrink,
    validateFields,
    // La imagen es la ultima que se valida ya que si no esta todo correcto no se debe subir al servicio
    validateImageUploadProduct
], createDrink );

/**
 * Obtener todas las bebidas de la BD.
 * {{ url }}/api/drinks
 */
 router.get('/', [
    validateJWTEstablishment,
    validateDrinkQuery
], getAllDrinks );

/**
 * Obtener una bebida especifico de la BD.
 * {{ url }}/api/drinks/:id
 */
 router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existProductById ),
    // validatePublicData,
    validateJWTEstablishment,
    validateDrinkByIdQuery,
    validateFields
], getDrinkById );

/**
 * Actualizar un cigarrillo especifico de la BD.
 * {{ url }}/api/cigarettes/:id
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
    validateExistDrink,    
    validateImageEditProduct,
    validateImageUploadProduct,
    validateFields
], updateDrinkById );

/**
 * Eliminar un producto especifico de la BD.
 * {{ url }}/api/products/:id
 */
 router.delete('/:id',[
    validateJWT,
    isActiveUser,
    isAdminRole,    // Solo el administrador puede eliminar productos. 
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existProductById ),
    validateFields,
], deleteDrinkById );

module.exports = router;