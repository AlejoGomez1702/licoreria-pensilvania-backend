const { Router } = require('express');
const { check } = require('express-validator');

const {
    validateFields,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../../middlewares');


const { isValidRole, emailExist, existeUsuarioPorId, existEstablishmentById } = require('../../helpers/db-validators');
const { createUser } = require('../../controllers/users/users');

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
    check('rol').custom( isValidRole ),
    check('establishment').isMongoId(),
    check('establishment').custom( existEstablishmentById ),
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