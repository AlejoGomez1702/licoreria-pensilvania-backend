const { Router } = require('express');
const { getAllSuperCategories } = require('../../controllers/products/super-categories');

const router = Router();

/**
 * Obtener todas las super categorías de productos en la BD.
 * {{ url }}/api/categories
 */
router.get('/', [
    // validateJWT,
    // isActiveUser
], getAllSuperCategories );

module.exports = router;