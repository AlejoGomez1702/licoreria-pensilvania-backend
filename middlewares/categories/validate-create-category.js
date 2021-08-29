const { response, request } = require('express');
const { Category } = require('../../models');
const { stringCapitalize } = require('../../helpers/string-capitalize');
// Nube de almacenamiento de imagenes
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

/**
 * Realiza la validacion para que se pueda crear una categoria
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateCreateCategory = async( req = request, res = response, next ) => {
    try 
    {        
        const name = stringCapitalize(req.body.name);
        const establishment = req.user.establishment;
        const query = { $and: [{ name }, { establishment }] };

        const categoryDB = await Category.findOne( query );

        if ( categoryDB ) 
        {
            return res.status(400).json({
                error: `La categoria ${ categoryDB.name } ya existe!`
            });
        }

        req.body.name = name;

        next();
    } 
    catch (error) 
    {
        res.status(401).json({
            error: 'Error validando categoria',
        });
    }
};

/**
 * Realiza la validacion para que se pueda crear una categoria
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateImageUpload = async( req = request, res = response, next ) => {
    try 
    {        
        console.log("Validacionnnnn de  files");
        console.log(req.body);
        // Verificar si se desea crear la categoria con imagen.
        if( req.files )
        {
            console.log("siiiiii hay files");
            const { tempFilePath } = req.files.img;        
            if( tempFilePath )
            {
                const { url } = await cloudinary.uploader.upload( tempFilePath );
                req.body.img = url;
            }
            else
            {
                res.status(401).json({
                    error: 'No existe el path temporal en la imagen',
                });
            }
        }
        else
        {
            console.log("noooooo hay files");
        }

        // // Limpiar imágenes previas
        // if ( model.img ) {
        //     const nameArr = model.img.split('/');
        //     const name    = nameArr[ nameArr.length - 1 ];
        //     const [ public_id ] = name.split('.');
        //     cloudinary.uploader.destroy( public_id );
        // }

        next();
    } 
    catch (error) 
    {
        res.status(401).json({
            error: 'Error validando imagen de categoria',
        });
    }
};


module.exports = {
    validateCreateCategory,
    validateImageUpload
};