const { response } = require('express');
const { Product } = require('../../models');

/**
 * Obtiene todos los cigarrillos registrados en un establecimiento.
 */
 const getAllCigarettes = async(req, res = response ) => {

    const { limit = 10, from = 0 } = req.query;
    // Establecimiento del que se desea obtener los licores
    const query = req.queryCigarette;

    const [ total, cigarettes ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('establishment', 'name')
            .populate('category', 'name')
            .populate('unit', 'unit units')
            .skip( Number( from ) )  // desde donde
            .limit( Number( limit ) ) // Cuantos
    ]);

    res.json({
        total,
        cigarettes
    });
};

module.exports = {
    getAllCigarettes
};