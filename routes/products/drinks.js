const { Router } = require('express');
const { getAllDrinks } = require('../../controllers/products/drinks');
const { validateJWTEstablishment } = require('../../middlewares');
const { validateDrinkQuery } = require('../../middlewares/products/drinks/validate-query');

const router = Router();
/**
 * Obtener todas las bebidas de la BD.
 * {{ url }}/api/drinks
 */
 router.get('/', [
    validateJWTEstablishment,
    validateDrinkQuery
], getAllDrinks );

module.exports = router;