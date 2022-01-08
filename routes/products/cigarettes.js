const { Router } = require('express');
const { getAllCigarettes } = require('../../controllers/products/cigarettes');
const { validateJWTEstablishment } = require('../../middlewares');
const { validateCigaretteQuery } = require('../../middlewares/products/cigarettes/validate-query');

const router = Router();
/**
 * Obtener todos los cigarrillos de la BD.
 * {{ url }}/api/cigarettes
 */
 router.get('/', [
    validateJWTEstablishment,
    validateCigaretteQuery
], getAllCigarettes );

module.exports = router;