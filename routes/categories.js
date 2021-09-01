const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById } = require('../controllers/categories');
const { existCategoryById } = require('../helpers/db-validators');

const { validateJWT, validateFields, isAdminRole, isActiveUser, validateImageUpload } = require('../middlewares');
const { validateCreateCategory } = require('../middlewares');

const router = Router();

/**
 * Crear una nueva categoría de productos en la BD.
 * {{ url }}/api/categories
 */
 router.post('/', [ 
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    validateCreateCategory,
    validateImageUpload,
    validateFields
], createCategory );

/**
 * Obtener todas las categorías de productos en la BD.
 * {{ url }}/api/categories
 */
router.get('/', [
    // validateJWT,
    // isActiveUser
], getAllCategories );

/**
 * Obtener una categoría de productos especifica en la BD.
 * {{ url }}/api/categories/:id
 */
router.get('/:id',[
    validateJWT,
    isActiveUser,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existCategoryById ),
    validateFields
], getCategoryById );

/**
 * Actualizar una categoría de productos especifica en la BD.
 * {{ url }}/api/categories/:id
 */
router.put('/:id',[
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existCategoryById ),
    validateImageUpload,
    validateFields
], updateCategoryById );

/**
 * Eliminar una categoría de productos especifica en la BD.
 * {{ url }}/api/categories/:id
 */
router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existCategoryById ),
    validateFields,
], deleteCategoryById );

module.exports = router;