const { response } = require('express');
const { Product } = require('../../models');

/**
 * Obtiene todos los cigarrillos registrados en un establecimiento.
 */
 const getAllDrinks = async(req, res = response ) => {

    const { limit = 10, from = 0 } = req.query;
    // Establecimiento del que se desea obtener los licores
    const query = req.queryDrink;

    const [ total, drinks ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('establishment', 'name')
            .populate('category', 'name')
            .populate('unit', 'unit ml')
            .skip( Number( from ) )  // desde donde
            .limit( Number( limit ) ) // Cuantos
    ]);

    res.json({
        total,
        drinks
    });
};

module.exports = {
    getAllDrinks
};