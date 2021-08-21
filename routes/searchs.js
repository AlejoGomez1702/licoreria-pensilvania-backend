const { Router } = require('express');
const { search, searchBarcode } = require('../controllers/searchs');

const router = Router();

router.get('/:collection/:term', search );

router.get('/products/barcode', searchBarcode );

module.exports = router;