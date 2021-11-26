<<<<<<< HEAD
// const { Router } = require('express');
// const { check } = require('express-validator');
// const { createAlcohol, getAllAlcohols, getAlcoholById, updateAlcoholById, deleteAlcoholById } = require('../../controllers/products/alcohols');
// const { existAlcoholById } = require('../../helpers/db-validators');

// const { validateJWT, validateFields, isAdminRole, isActiveUser, validateCreateAlcohol } = require('../../middlewares');

// const router = Router();

// /**
//  * Crear un nuevo % de alcohol en la BD.
//  * {{ url }}/api/alcohols
//  */
//  router.post('/', [ 
//     validateJWT,
//     isActiveUser,
//     check('alcohol','El % de alcohol es obligatorio').not().isEmpty().isFloat({ min: 0, max: 100 }),
//     validateCreateAlcohol,
//     validateFields
// ], createAlcohol );

// /**
//  * Obtener todos los % de alcohol en la BD.
//  * {{ url }}/api/alcohols
//  */
// router.get('/', [
//     validateJWT,
//     isActiveUser
// ], getAllAlcohols);

// /**
//  * Obtener un % de alcohol especifico en la BD.
//  * {{ url }}/api/alcohols/:id
//  */
// router.get('/:id',[
//     validateJWT,
//     isActiveUser,
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existAlcoholById ),
//     validateFields
// ], getAlcoholById );

// /**
//  * Actualizar un % de alcohol especifico en la BD.
//  * {{ url }}/api/alcohols/:id
//  */
// router.put('/:id',[
//     validateJWT,
//     isActiveUser,
//     isAdminRole,
//     check('alcohol','El % de alcohol es obligatorio').not().isEmpty().isFloat({ min: 0, max: 100 }),
//     check('id').custom( existAlcoholById ),
//     validateCreateAlcohol,
//     validateFields
// ], updateAlcoholById );

// /**
//  * Eliminar un % de alcohol especifico en la BD.
//  * {{ url }}/api/alcohols/:id
//  */
// router.delete('/:id',[
//     validateJWT,
//     isActiveUser,
//     isAdminRole,
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existAlcoholById ),
//     validateFields,
// ], deleteAlcoholById );

// module.exports = router;
=======
const { Router } = require('express');
const { check } = require('express-validator');
const { createAlcohol, getAllAlcohols, getAlcoholById, updateAlcoholById, deleteAlcoholById } = require('../../controllers/products/alcohols');
const { existAlcoholById } = require('../../helpers/db-validators');

const { validateJWT, validateFields, isAdminRole, isActiveUser, validateCreateAlcohol } = require('../../middlewares');

const router = Router();

/**
 * Crear un nuevo % de alcohol en la BD.
 * {{ url }}/api/alcohols
 */
 router.post('/', [ 
    validateJWT,
    check('alcohol','El % de alcohol es obligatorio').not().isEmpty().isFloat({ min: 0, max: 100 }),
    validateCreateAlcohol,
    validateFields
], createAlcohol );

/**
 * Obtener todos los % de alcohol en la BD.
 * {{ url }}/api/alcohols
 */
router.get('/', [
    validateJWT,
    isActiveUser
], getAllAlcohols);

/**
 * Obtener un % de alcohol especifico en la BD.
 * {{ url }}/api/alcohols/:id
 */
router.get('/:id',[
    validateJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existAlcoholById ),
    validateFields
], getAlcoholById );

/**
 * Actualizar un % de alcohol especifico en la BD.
 * {{ url }}/api/alcohols/:id
 */
router.put('/:id',[
    validateJWT,
    check('alcohol','El % de alcohol es obligatorio').not().isEmpty().isFloat({ min: 0, max: 100 }),
    check('id').custom( existAlcoholById ),
    validateCreateAlcohol,
    validateFields
], updateAlcoholById );

/**
 * Eliminar un % de alcohol especifico en la BD.
 * {{ url }}/api/alcohols/:id
 */
router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existAlcoholById ),
    validateFields,
], deleteAlcoholById );

module.exports = router;
>>>>>>> e5a7df9ae1539b1f940a5da42071944b9649f4eb
