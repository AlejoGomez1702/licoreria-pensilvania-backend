const { response, request } = require('express');
const { Establishment } = require("../../models");

/**
 * Valida si se esta intentando acceder a información pública y muestra la info de licoreria pensilvania.
 */
const validatePublicData = async ( req = request, res = response, next ) => {
    const token = req.header('x-token');

    if ( !token ) 
    {
        try 
        {
            const establishment = await Establishment.findOne({ name: 'Licorería Pensilvania' });
            if( establishment )
            {
                req.establishmentId = establishment.id;
                next();
            }
            else
            {
                return res.status(400).json({
                    error: 'No se encuentra Licorería Pensilvania en la base de datos'
                })
            }
        } 
        catch (error) 
        {
            console.log( error );
            return res.status(400).json({
                // error: 'Error consultando el establecimiento en la base de datos',
                // data: error
                error
            })
        }        
    }
    else
    {
        next();
    }
};


module.exports = {
    validatePublicData
};