const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');


/**
 * Realiza la validación del token enviado desde el cliente.
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
        console.log(error);
        // console.log(error);
        res.status(401).json({
            error: 'Error consultando el usuario logueado en la base de datos'
        });
    }
}

/**
 * Realiza la validación del token enviado desde el cliente.
 */
 const validateJWTEstablishment = async( req = request, res = response, next ) => {

    // Si es información pública
    if( req.establishmentId )
    {
        next();
    }
    else
    {
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
            
            req.establishmentId = user.establishment;
            req.user = user;
            next(); return;            
        } 
        catch (error) 
        {
            // console.log(error);
            return res.status(401).json({
                error: 'Token no válido',
                error
            });
        }
    }
}

module.exports = {
    validateJWT,
    validateJWTEstablishment
};