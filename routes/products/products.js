const { Router } = require('express');
const { check } = require('express-validator');
const { getAllProducts, createProduct, getProductById, updateProductById, deleteProductById } = require('../../controllers/products/products');
const { existCategoryById, existUnitById, existProductById } = require('../../helpers');
const { validateJWT, validateExistProduct, validateFields, validateImageUploadProduct, validateImageEditProduct, isAdminRole } = require('../../middlewares');
const { validateSupercategory } = require('../../middlewares/products/supercategories/validate-supercategory');
const { validateExtraFieldsProduct } = require('../../middlewares/products/validate-extra-fields-product');
const { validateProductByIdQuery } = require('../../middlewares/products/validate-Product-Id-Query');
const { validateProductQuery } = require('../../middlewares/products/validate-product-query');

const router = Router();

/**
 * Crear un nuevo producto en la BD.
 * {{ url }}/api/products
 */
 router.post('/', [ 
    validateJWT,
    validateSupercategory,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('category','No existe la categoria especificada').isMongoId(),
    check('category').custom( existCategoryById ),    
    check('unit','No existe la unidad de medida especificada').isMongoId(),
    check('unit').custom( existUnitById ),     
    validateExtraFieldsProduct,
    validateExistProduct,
    validateFields,
    // La imagen es la ultima que se valida ya que si no esta todo correcto no se debe subir al servicio
    validateImageUploadProduct
], createProduct );

/**
 * Obtener todos los productos del negocio al cual pertenece el usuario logueado..
 * {{ url }}/api/products
 */
 router.get('/', [
    // validatePublicData,
    validateJWT,
    validateSupercategory,
    validateProductQuery
], getAllProducts );

/**
 * Obtener un producto especifico de la BD.
 * {{ url }}/api/products/:id
 */
 router.get('/:id',[
    validateJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existProductById ),
    validateProductByIdQuery,
    // validatePublicData,
    validateFields
], getProductById );

/**
 * Actualizar un product especifico de la BD.
 * {{ url }}/api/products/:id
 */
 router.put('/:id',[
    validateJWT,
    isAdminRole,    // Solo el administrador puede modificar precios.
    check('id').custom( existProductById ),
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('category','No existe la categoria especificada').isMongoId(),
    check('category').custom( existCategoryById ),
    check('unit','No existe la unidad de medida especificada').isMongoId(),
    check('unit').custom( existUnitById ),
    validateExtraFieldsProduct,
    validateExistProduct,
    validateFields,    
    // Imagen
    validateImageEditProduct,
    validateImageUploadProduct    
], updateProductById );

/**
 * Eliminar un producto especifico de la BD.
 * {{ url }}/api/products/:id
 */
 router.delete('/:id',[
    validateJWT,
    isAdminRole,    // Solo el administrador puede eliminar productos. 
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existProductById ),
    validateFields,
], deleteProductById );

module.exports = router;