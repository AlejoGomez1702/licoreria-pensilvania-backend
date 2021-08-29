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
            error: 'Error validando imagen del producto',
        });
    }
};

module.exports = {
    validateImageUploadProduct
};