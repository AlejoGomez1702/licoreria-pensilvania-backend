// Nube de almacenamiento de imagenes
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );
const { Spirit } = require('../../models');

/**
 * Realiza la validacion para que se pueda crear una categoria
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateImageUploadProduct = async( req = request, res = response, next ) => {
    try 
    {
        if( req.body.img )
        {
            if(req.body.img === 'null')
            {
                const { img, ...data } = req.body;
                req.body = data;
            }

            next();
            return;
        }     

        if( req.files )
        {
            const { tempFilePath } = req.files.img;
            if( tempFilePath )
            {
                console.log("llega paso 1");
                const { url } = await cloudinary.uploader.upload( tempFilePath );
                req.body.img = url;
                console.log("llega paso 2");
            }
            else
            {
                res.status(400).json({
                    error: 'No existe el path temporal en la imagen',
                });
            }
        }
        else
        {
            res.status(400).json({
                error: 'Debe subir la imagen del producto'
            });
        }

        next();
    } 
    catch (error) 
    {
        console.log(error);
        res.status(401).json({
            error: 'Error validando imagen del producto'
        });
    }
};

/**
 * Si un licor ya tenia imagen elimina la imagen anterior
 */
 const validateImageEditProduct = async( req = request, res = response, next ) => {
    try 
    {        
        if( req.files )
        {
            const spirit = await Spirit.findById( req.params.id );

            const nameArr = spirit.img.split('/');
            const name    = nameArr[ nameArr.length - 1 ];
            const [ public_id ] = name.split('.');
            cloudinary.uploader.destroy( public_id );
        }
        next();
    } 
    catch (error) 
    {
        console.log(error);
        res.status(401).json({
            error: 'Error validando imagen del producto',
            data: error
        });
    }
};

module.exports = {
    validateImageUploadProduct,
    validateImageEditProduct
};