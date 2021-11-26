const { Router } = require('express');
const { check } = require('express-validator');

const {
    validateFields,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');


<<<<<<< HEAD
const { isValidRole, emailExist, existeUsuarioPorId, existEstablishmentById } = require('../helpers/db-validators');
=======
const { isValidRole, emailExist, existeUsuarioPorId } = require('../helpers/db-validators');
>>>>>>> e5a7df9ae1539b1f940a5da42071944b9649f4eb

const { usuariosGet,
        usuariosPut,
        createUser,
        usuariosDelete,
        usuariosPatch } = require('../controllers/users');

const router = Router();


// router.get('/', usuariosGet );

// router.put('/:id',[
//     check('id', 'No es un ID válido').isMongoId(),
//     check('id').custom( existeUsuarioPorId ),
//     check('rol').custom( isValidRole ), 
//     validateFields
// ],usuariosPut );

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 8 digitos').isLength({ min: 8 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailExist ),
<<<<<<< HEAD
    check('rol').custom( isValidRole ),
    check('establishment').isMongoId(),
    check('establishment').custom( existEstablishmentById ),
=======
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( isValidRole ), 
>>>>>>> e5a7df9ae1539b1f940a5da42071944b9649f4eb
    validateFields
], createUser);

// router.delete('/:id',[
//     validarJWT,
//     // esAdminRole,
//     tieneRole('ADMIN_ROLE', 'VENTAR_ROLE','OTRO_ROLE'),
//     check('id', 'No es un ID válido').isMongoId(),
//     check('id').custom( existeUsuarioPorId ),
//     validateFields
// ],usuariosDelete );

// router.patch('/', usuariosPatch );

module.exports = router;