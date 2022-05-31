const { Router } = require('express');
const { check } = require('express-validator');
const { getAllCigarettes, createCigarette, getCigaretteById, updateCigaretteById, deleteCigaretteById } = require('../../../controllers/products/establishment-spirit/cigarettes');
const { existCategoryById, existUnitById, existProductById } = require('../../../helpers');
const { validateJWT, isActiveUser, validateFields, validateImageUploadProduct, isAdminRole, validateImageEditProduct, validateExistProduct } = require('../../../middlewares');
const { validateCigaretteQuery, validateCigarreteByIdQuery } = require('../../../middlewares/products/establishment-spirit/cigarettes/validate-query');

const router = Router();

/**
 * Crear un nuevo producto naturista en la BD.
 * {{ url }}/api/naturists
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
], createCigarette );

/**
 * Obtener todos los producto naturistas de la BD.
 * {{ url }}/api/cigarettes
 */
 router.get('/', [
    validateJWT,
    validateCigaretteQuery
], getAllCigarettes );

/**
 * Obtener un producto naturista especifico de la BD.
 * {{ url }}/api/cigarettes/:id
 */
 router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existProductById ),
    // validatePublicData,
    validateJWT,
    validateCigarreteByIdQuery,
    validateFields
], getCigaretteById );

/**
 * Actualizar un producto naturista especifico de la BD.
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
    validateExistProduct,    
    validateImageEditProduct,
    validateImageUploadProduct,
    validateFields
], updateCigaretteById );

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
], deleteCigaretteById );

module.exports = router;