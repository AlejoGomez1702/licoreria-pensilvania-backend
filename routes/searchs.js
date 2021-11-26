const { Router } = require('express');
const { search, searchBarcode } = require('../controllers/searchs');

const router = Router();

router.get('/:collection/:term', search );

<<<<<<< HEAD
router.get('/products/barcode/:code', searchBarcode );
=======
router.get('/products/barcode', searchBarcode );
>>>>>>> e5a7df9ae1539b1f940a5da42071944b9649f4eb

module.exports = router;