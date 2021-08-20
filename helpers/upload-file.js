const path = require('path');
const { v4: uuidv4 } = require('uuid');

const extensions = ['jpg', 'PNG', 'jpeg', 'gif']

/**
 * Sube un archivo.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const uploadFile = async( files, validExtensions = extensions, folder ) => {

    return new Promise(( resolve, reject ) => {

        const { file } = files;
        const nameFileSplit = file.name.split('.');
        const extension = nameFileSplit[ nameFileSplit.length - 1 ];

        // Validar la extension
        if ( !validExtensions.includes( extension ) ) {
            return reject(`La extensión ${ extension } no es permitida - ${ validExtensions }`);
        }

        // Crear el nombre unico para el archivo
        const uniqueName = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../files/', folder, uniqueName );

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve( uniqueName );
        });
    });
};

module.exports = {
    uploadFile
};