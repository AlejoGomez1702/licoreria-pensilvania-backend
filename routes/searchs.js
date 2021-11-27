const { Router } = require('express');
const { search, searchBarcode } = require('../controllers/searchs/searchs');
const { validateJWTEstablishment } = require('../middlewares');

const router = Router();

router.get('/:collection/:term', [
    validateJWTEstablishment,
], search );

router.get('/products/barcode/:code', searchBarcode );

module.exports = router;