const { Router } = require('express');
const { check } = require('express-validator');
const { subirFile, updateImage, showImage, updateImageClaudinary } = require('../controllers/uploads');
const { collectionsValids } = require('../helpers');
const { validateFields, validateFile, validateJWT } = require('../middlewares');

const router = Router();

/**
 * Sube un archivo proveniente del computador del cliente.
 * {{ url }}/api/uploads
 */
 router.post('/', [ 
    validateJWT,
    validateFile
], subirFile );

/**
 * Actualiza la imagen de una colección.
 * {{ url }}/:collection/:id
 */
 router.post('/:collection/:id', [ 
    validateJWT,
    validateFile,
    check('id', 'No es un id de mongo válido!').isMongoId(),
    check('collection').custom( c => collectionsValids( c, ['users', 'products'] ) ),
    validateFields
], updateImageClaudinary );

/**
 * Busca una imagen en concreto.
 * {{ url }}/:collection/:id
 */
 router.get('/:collection/:id', [ 
    check('id', 'No es un id de mongo válido!').isMongoId(),
    check('collection').custom( c => collectionsValids( c, ['users', 'products'] ) ),
    validateFields
], showImage );


module.exports = router;