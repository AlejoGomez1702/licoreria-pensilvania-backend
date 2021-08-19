const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

/**
 * Realiza la validación del token enviado desde el cliente.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) 
    {
        return res.status(401).json({
            error: 'No hay token en la petición'
        });
    }

    try 
    {        
        const { id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // leer el usuario que corresponde al id
        const user = await User.findById( id );

        if( !user ) // No existe el usuario con el token asociado.
        {
            return res.status(401).json({
                error: 'Token no válido - usuario no existe DB'
            })
        }

        // Verificar si el usuario esta activo
        if ( !user.state ) 
        {
            return res.status(401).json({
                error: 'Token no válido - usuario inactivo'
            })
        }
        
        
        req.user = user;
        next();
    } 
    catch (error) 
    {
        // console.log(error);
        res.status(401).json({
            error: 'Token no válido',
            error
        });
    }
}

module.exports = {
    validateJWT
};