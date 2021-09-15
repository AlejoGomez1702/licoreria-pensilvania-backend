const { response } = require('express')

/**
 * Verifica si el usuario esta activo en el sistema.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const isActiveUser = ( req, res = response, next ) => {

    if ( !req.user.state ) 
    {
        return res.status(500).json({
            error: 'El usuario se encuentra inactivo!'
        });
    }

    next();
};

module.exports = {
    isActiveUser
};