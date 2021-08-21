const { response, request } = require('express');
const { Alcohol } = require('../../models');

/**
 * Realiza la validacion para que se pueda crear una categoria
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateCreateAlcohol = async( req = request, res = response, next ) => {
    try 
    {        
        const volAlcohol = Number( req.body.alcohol );
        const establishment = req.user.establishment;
        const query = { $and: [{ volAlcohol }, { establishment }] };

        const alcoholDB = await Alcohol.findOne( query );

        if ( alcoholDB ) 
        {
            return res.status(400).json({
                error: `El % de alcohol: ${ alcoholDB.alcohol } ya existe!`
            });
        }

        next();
    } 
    catch (error) 
    {
        res.status(401).json({
            error: 'Error validando % de alcohol',
        });
    }
};

module.exports = {
    validateCreateAlcohol
};