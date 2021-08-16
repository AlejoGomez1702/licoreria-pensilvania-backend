const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory } = require('../controllers/categories');

const { validateJWT, validateFields } = require('../middlewares');

// const { createCategory } = require('../controllers/categories');

const router = Router();

/**
 * Crear una nueva categoría de productos en la BD.
 * {{ url }}/api/categories
 */
 router.post('/', [ 
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    validateFields
], createCategory);

//  Obtener todas las categorias - publico
// router.get('/', obtenerCategorias );

// Obtener una categoria por id - publico
// router.get('/:id',[
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existeCategoriaPorId ),
//     validarCampos,
// ], obtenerCategoria );

// Actualizar - privado - cualquiera con token válido
// router.put('/:id',[
//     validarJWT,
//     check('nombre','El nombre es obligatorio').not().isEmpty(),
//     check('id').custom( existeCategoriaPorId ),
//     validarCampos
// ],actualizarCategoria );

// Borrar una categoria - Admin
// router.delete('/:id',[
//     validarJWT,
//     esAdminRole,
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existeCategoriaPorId ),
//     validarCampos,
// ],borrarCategoria);

module.exports = router;