const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

/**
 * Elimina imagenes previas de una colección a la cual se va actualizar la imagen.
 * @param {*} model 
 * @returns 
 */
 const deletePreviusImage = ( model ) => {

    // Limpiar imágenes previas
    if ( model.img ) 
    {
        const nameArr = model.img.split('/');
        const name    = nameArr[ nameArr.length - 1 ];
        const [ public_id ] = name.split('.');
        cloudinary.uploader.destroy( public_id );

        return true;
    }

    return false;
};

module.exports = {
    deletePreviusImage
};