const { Router } = require('express');
const { check } = require('express-validator');
const { getAllProducts, createProduct } = require('../../controllers/products/products');
const { existCategoryById, existUnitById } = require('../../helpers');
const { validateJWT, validateExistProduct, validateFields, validateImageUploadProduct } = require('../../middlewares');
const { validateSupercategory } = require('../../middlewares/products/supercategories/validate-supercategory');
const { validateExtraFieldsProduct } = require('../../middlewares/products/validate-extra-fields-product');
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

module.exports = router;