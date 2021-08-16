const { response } = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../models/user');

const { generateJWT } = require('../helpers/generate-jwt');

/**
 * Permite loguearse en el sistema a un usuario (JWT)
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const login = async(req, res = response) => {

    const { email, password } = req.body;

    try 
    {      
        // Verificar si el email existe
        const user = await User.findOne({ email });
        if ( !user ) //El usuario no existe.
        {
            return res.status(400).json({
                msg: 'El email ingresado NO se encuentra registrado!'
            });
        }

        // SI el usuario NO está activo
        if ( !user.state ) 
        {
            return res.status(400).json({
                msg: 'El usuario NO se encuentra activo en el sistema!'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) // Contraseña inválida
        {
            return res.status(400).json({
                msg: 'La contraseña NO es correcta!'
            });
        }

        // Generar el JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });
    } 
    catch (error) 
    {
        // console.log(error)
        res.status(500).json({
            msg: 'error',
            error
        });
    }   
};

module.exports = {
    login
};
