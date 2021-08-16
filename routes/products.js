const { Router } = require('express');
const { check } = require('express-validator');
// const { createCategory } = require('../controllers/categories');

const { validateJWT, validateFields, isAdminRole } = require('../middlewares');

// const { createCategory } = require('../controllers/categories');

const { existCategoryById } = require('../helpers/db-validators');
const { createProduct } = require('../controllers/products');

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
    isAdminRole,
    validateFields
], createProduct);


module.exports = router;