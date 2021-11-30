const { Router } = require('express');
const { search, searchBarcode } = require('../controllers/searchs/searchs');
const { validateJWTEstablishment, isActiveUser } = require('../middlewares');

const router = Router();

router.get('/:collection/:term', [
    validateJWTEstablishment,
], search );

router.get('/products/barcode/:code', [
    validateJWTEstablishment,
    isActiveUser
], searchBarcode );

module.exports = router;