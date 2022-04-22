const { response, request } = require('express');
const { stringCapitalize } = require('../../helpers/string-capitalize');
const { Client } = require('../../models');

/**
 * Realiza la validación si existe un cliente registrado.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateExistClient = async( req = request, res = response, next ) => {
    try 
    {        
        req.body.name = stringCapitalize(req.body.name);
        // Saqueme el establecimiento al que tiene derecho el usuario logueado.
        const establishment = req.user.establishment;
        // Si existe un cliente con los mismos atributos en la base de datos.
        let clientData = [
            { name: req.body.name },
            { cellphone: req.body.cellphone },
            { establishment }
        ]

        if(req.body.dni)
        {
            clientData.push({ dni: req.body.dni});
        }

        if(req.body.address)
        {
            clientData.push({ address: req.body.address});
        }

        const query = { $and: clientData}; 
    
        const clientDB = await Client.findOne( query );
         
        if ( clientDB ) 
        {
            return res.status(400).json({
                error: `El cliente ya existe!`
            });
        }

        next();
    } 
    catch (error) 
    {
        return res.status(401).json({
            error: 'Error validando cliente'
        });
    }
};

module.exports = {
    validateExistClient
};