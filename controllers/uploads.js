const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { uploadFile } = require('../helpers');
const { User, Product } = require('../models');
const fs = require('fs');
const path = require('path');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

/**
 * Sube un archivo.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const subirFile = async(req, res = response ) => {
    
    try {
        const fileName = await uploadFile( req.files, undefined, 'users');
        res.json({ fileName });
    } catch (msg) {
        res.status(400).json({ msg });
    }
};

/**
 * Actualiza la imagen de una colección.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const updateImage = async(req, res = response ) => {

    const { id, collection } = req.params;

    let model;

    switch ( collection ) 
    {
        case 'users':
            model = await User.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    error: `No existe un usuario con el id ${ id }`
                });
            }
        
        break;

        case 'products':
            model = await Product.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    error: `No existe un producto con el id ${ id }`
                });
            }
        
        break;
    
        default:
            return res.status(500).json({ error: 'Se me olvidó validar esto'});
    }

    // Limpiar imágenes previas
    if ( model.img ) {
        // Hay que borrar la imagen del servidor
        const pathImage = path.join( __dirname, '../files', collection, model.img );
        if ( fs.existsSync( pathImage ) ) {
            fs.unlinkSync( pathImage );
        }
    }

    const fileName = await uploadFile( req.files, undefined, collection);
    model.img = fileName;

    await model.save();

    res.json( model );
};

/**
 * Muestra una imagen en especifico
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const showImage = async(req, res = response ) => {
    
    const { id, collection } = req.params;

    let model;

    switch ( collection ) {
        case 'users':
            model = await User.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    error: `No existe un usuario con el id ${ id }`
                });
            }
        
        break;

        case 'products':
            model = await Product.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    error: `No existe un producto con el id ${ id }`
                });
            }
        
        break;
    
        default:
            return res.status(500).json({ error: 'Se me olvidó validar esto'});
    }

    // Sacar la imagen de la colección.
    if ( model.img ) {
        const pathImage = path.join( __dirname, '../files', collection, model.img );
        if ( fs.existsSync( pathImage ) ) {
            return res.sendFile( pathImage )
        }
    }

    const pathImage = path.join( __dirname, '../assets/no-image.jpg');
    res.sendFile( pathImage );
};

/**
 * Actualiza la imagen de una colección Claudinary.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const updateImageClaudinary = async(req, res = response ) => {

    const { id, collection } = req.params;

    let model;

    switch ( collection ) 
    {
        case 'users':
            model = await User.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    error: `No existe un usuario con el id ${ id }`
                });
            }
        
        break;

        case 'products':
            model = await Product.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    error: `No existe un producto con el id ${ id }`
                });
            }
        
        break;
    
        default:
            return res.status(500).json({ error: 'Se me olvidó validar esto'});
    }

    // Limpiar imágenes previas
    if ( model.img ) {
        const nameArr = model.img.split('/');
        const name    = nameArr[ nameArr.length - 1 ];
        const [ public_id ] = name.split('.');
        cloudinary.uploader.destroy( public_id );
    }


    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    model.img = secure_url;

    await model.save();


    res.json( model );
};

module.exports = {
    subirFile,
    updateImage,
    showImage,
    updateImageClaudinary
};