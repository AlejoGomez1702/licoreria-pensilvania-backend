const { response, request } = require('express');
const { stringCapitalize } = require('../helpers/string-capitalize');
const { Provider } = require('../models');

/**
 * Realiza la validacion del inventario que pertenece a un negocio.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateExistProvider = async( req = request, res = response, next ) => {
    try 
    {        
        req.body.name = stringCapitalize(req.body.name);
        // Saqueme el establecimiento al que tiene derecho el usuario logueado.
        const establishment = req.user.establishment;
        // Si existe un proveedor con los mismos atributos en la base de datos.
        const query = { $and: [
            { name: req.body.name },
            { email: req.body.email },
            { cellphone: req.body.cellphone },
            { establishment }
        ]}; 
    
        const providerDB = await Provider.findOne( query );
         
        if ( providerDB ) 
        {
            return res.status(400).json({
                error: `El proveedor ya existe!`
            });
        }

        next();
    } 
    catch (error) 
    {
        res.status(401).json({
            error: 'Error validando proveedor',
        });
    }
};

module.exports = {
    validateExistProvider
};