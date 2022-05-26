const { response } = require('express');
const { Establishment } = require('../../models');
const SuperCategory = require('../../models/products/super-category');

/**
 * Obtiene todas las Super categorias de productos registradas en un establecimiento.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAllSuperCategories = async(req, res = response ) => {

    const { establishment } = req.query; 

    const establishmentDB = await Establishment.findById( establishment );
    const type = establishmentDB.type;

    const query = { $and: [{ 'establishment_type': type }] };
    const superCategories = await SuperCategory.find( query );

    return res.json({
        superCategories
    });
};

module.exports = {
    getAllSuperCategories,
};