const { response } = require('express');
const SuperCategory = require('../../models/products/super-category');

/**
 * Obtiene todas las categorias de productos registradas en un establecimiento.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAllSuperCategories = async(req, res = response ) => {

    const query = { };
    const superCategories = await SuperCategory.find( query );

    res.json({
        superCategories
    });
};

module.exports = {
    getAllSuperCategories,
};