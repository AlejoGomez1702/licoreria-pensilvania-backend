const { response, request } = require('express');
const { Inventory } = require('../models');

/**
 * Realiza la validacion del inventario que pertenece a un negocio.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateInventory = async( req = request, res = response, next ) => {
    try 
    {        
        const { establishment } = req.user;
        // Saqueme el inventario cuyo establecimiento sea el del usuario logueado.
        // Convertir en Miidleware
        const inventory = await Inventory.findOne({ establishment });
        if( !inventory )
        {
            return res.status(400).json({
                error: `El establecimiento NO cuenta con un inventario`
            });
        }
        
        req.inventory = inventory._id;
        next();
    } 
    catch (error) 
    {
        // console.log(error);
        res.status(401).json({
            error: 'Error validando inventario',
        });
    }
}

module.exports = {
    validateInventory
};