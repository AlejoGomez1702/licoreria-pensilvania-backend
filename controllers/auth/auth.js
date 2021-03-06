const { response } = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../../models/users/user');

const { generateJWT } = require('../../helpers/generate-jwt');

/**
 * Permite loguearse en el sistema a un usuario (JWT)
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const login = async(req, res = response) => {

    const { email, password, remember } = req.body;

    try 
    {      
        // Verificar si el email existe
        const user = await User.findOne( { $or: [{ email }, { username: email }] } )
                                .populate('establishment', 'name');

        if ( !user ) //El usuario no existe.
        {
            return res.status(400).json({
                error: 'El email/username ingresado NO se encuentra registrado!'
            });
        }

        // SI el usuario NO está activo
        if ( !user.state ) 
        {
            return res.status(400).json({
                error: 'El usuario NO se encuentra activo en el sistema!'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) // Contraseña inválida
        {
            return res.status(400).json({
                error: 'La contraseña NO es correcta!'
            });
        }

        // Generar el JWT
        const payload = {
            id: user.id,
            establishment: user.establishment._id
        };
        const token = await generateJWT( payload, remember );

        return res.json({
            user,
            token
        });
    } 
    catch (error) 
    {
        // console.log(error)
        return res.status(500).json({
            msg: 'error',
            error
        });
    }   
};

const getLoggedUser = async(req, res = response) => {

    try 
    {
        const user = await User.findById( req.user.id )
                                .populate('establishment', 'name');
        return res.json({
            user
        });
    } 
    catch (error) 
    {
        return res.status(500).json({
            msg: 'error',
            error
        });    
    }
};

module.exports = {
    login,
    getLoggedUser
};
