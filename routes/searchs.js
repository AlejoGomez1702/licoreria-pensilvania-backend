const { Router } = require('express');
const { search, searchBarcode } = require('../controllers/searchs/searchs');
const { isActiveUser, validateJWT } = require('../middlewares');
const { validateSupercategory } = require('../middlewares/products/supercategories/validate-supercategory');
const { Product } = require('../models');

const router = Router();

router.get('/:collection/:term', [
    validateJWT,
    validateSupercategory
], search );

router.get('/products/barcode/:code', [
    validateJWT,
    isActiveUser,
], searchBarcode );

router.post('/pruebas', async (req, res)=>{
    const term = req.body.term;

    const products = await Product.find({category: 1}).populate({ path: 'category', match: {$text: {$search: term}}})

    console.log(products);

    return res.json({products});

});

module.exports = router;