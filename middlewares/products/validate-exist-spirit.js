const { response, request } = require('express');
const { stringCapitalize } = require('../../helpers/string-capitalize');
const { Spirit } = require('../../models');

/**
 * Realiza la validacion de que exista ya un licor que se intenta crear
 */
const validateExistSpirit = async( req = request, res = response, next ) => {
    try 
    {        
        req.body.name = stringCapitalize(req.body.name);
        const establishment = req.user.establishment;
        // Si existe un licor con los mismos atributos en la base de datos.
        const query = { $and: [
            { name: req.body.name },
            { category: req.body.category },
            { alcohol: req.body.alcohol },
            { unit: req.body.unit },
            { establishment }
        ]}; 
    
        const spiritDB = await Spirit.findOne( query );
         
        if ( spiritDB ) 
        {
            // Verificando que tenga exactamente las mismas caracteristicas
            const reqFeatures = req.body.features;
            const featuresDB = spiritDB.features;
            for (const feature of reqFeatures) 
            {
                if( !featuresDB.includes( feature ) )
                {
                    next();
                    return;
                }                
            }

            return res.status(400).json({
                error: `El licor ya existe!`
            });
        }

        next();
    } 
    catch (error) 
    {
        res.status(401).json({
            error: 'Error validando licor',
        });
    }
}

module.exports = {
    validateExistSpirit
};