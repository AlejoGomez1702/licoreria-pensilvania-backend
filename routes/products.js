const { Router } = require('express');
const { check } = require('express-validator');
// const { createCategory } = require('../controllers/categories');

const { validateJWT, validateFields, isAdminRole } = require('../middlewares');

const { createProduct } = require('../controllers/products');

const { existCategoryById, existAlcoholById, existUnitById } = require('../helpers/db-validators');

const router = Router();

/**
 * Crear un nuevo producto en la BD.
 * {{ url }}/api/products
 */
router.post('/', [ 
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('category','No existe la categoria especificada').isMongoId(),
    check('category').custom( existCategoryById ),
    check('alcohol','No existe el volumen alcoholico especificado').isMongoId(),
    check('alcohol').custom( existAlcoholById ),
    check('unit','No existe la unida de medida especificada').isMongoId(),
    check('unit').custom( existUnitById ),
    isAdminRole,
    validateFields
], createProduct);

module.exports = router;