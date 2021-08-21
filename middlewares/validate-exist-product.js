const { response, request } = require('express');
const { stringCapitalize } = require('../helpers/string-capitalize');
const { Product } = require('../models');

/**
 * Realiza la validacion del inventario que pertenece a un negocio.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateExistProduct = async( req = request, res = response, next ) => {
    try 
    {        
        req.body.name = stringCapitalize(req.body.name);
        // Saqueme el inventario cuyo establecimiento sea el del usuario logueado.
        const inventory = req.inventory;
        // Si existe un producto con los mismos atributos en la base de datos.
        const query = { $and: [
            { name: req.body.name },
            { category: req.body.category },
            { alcohol: req.body.alcohol },
            { unit: req.body.unit },
            { inventory }
        ]}; 
    
        const productDB = await Product.findOne( query );
         
        if ( productDB ) 
        {
            return res.status(400).json({
                error: `El producto ya existe!`
            });
        }

        next();
    } 
    catch (error) 
    {
        res.status(401).json({
            error: 'Error validando producto',
        });
    }
}

module.exports = {
    validateExistProduct
};