const { response, request } = require('express');
const { Unit } = require('../../models');

/**
 * Realiza la validacion para que se pueda crear una categoria
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateCreateUnit = async( req = request, res = response, next ) => {
    try 
    {        
        const unitName = req.body.unit;
        const ml = Number( req.body.ml );
        const establishment = req.user.establishment;
        const query = { $and: [{ ml },{ unit: unitName }, { establishment }] };

        const unitDB = await Unit.findOne( query );

        if ( unitDB ) 
        {
            return res.status(400).json({
                error: `La unidad de medida: ${ unitDB.unit } X ${ unitDB.ml } ya existe!`
            });
        }

        next();
    } 
    catch (error) 
    {
        res.status(401).json({
            error: 'Error validando unidad de medida',
        });
    }
};

module.exports = {
    validateCreateUnit
};