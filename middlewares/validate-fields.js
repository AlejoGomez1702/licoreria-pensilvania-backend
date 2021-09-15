const { validationResult } = require('express-validator');

/**
 * Realiza la validación completa y si hay algún campo 
 * que no cumple las condiciones, se retorna el error 
 * y no se permite continuar con el flujo de la app.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateFields = ( req, res, next ) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() )
    {        
        return res.status(400).json(errors);
    }

    next();
};

module.exports = {
    validateFields
};
