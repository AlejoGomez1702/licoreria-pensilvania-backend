const cloudinary = require('cloudinary').v2        // Nube de almacenamiento de imagenes
cloudinary.config( process.env.CLOUDINARY_URL );
const { Product } = require('../../models');

/**
 * Realiza la validación de la imagen, si se le envia archivo la sube a cloudinary
 * de lo contrario ignora el campo imagen.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateImageUploadProduct = async( req = request, res = response, next ) => {
    try 
    {
        if( req.files )
        {
            const { tempFilePath } = req.files.img;
            if( tempFilePath )
            {
                const { url } = await cloudinary.uploader.upload( tempFilePath );
                req.body.img = url;
            }
            else
            {
                return res.status(400).json({
                    error: 'No existe el path temporal en la imagen',
                });
            }
        }
        else if( !req.body.img || req.body.img )
        {
            next(); 
            return;
        }
        else
        {
            return res.status(400).json({
                error: 'Debe subir la imagen del producto'
            });
        }

        next();
    } 
    catch (error) 
    {
        return res.status(401).json({
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
            const product = await Product.findById( req.params.id );

            const nameArr = product.img.split('/');
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
            error: 'Error eliminando antigua imagen del producto',
            data: error
        });
    }
};

module.exports = {
    validateImageUploadProduct,
    validateImageEditProduct
};