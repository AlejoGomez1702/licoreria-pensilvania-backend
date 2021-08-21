const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');

const { login } = require('../controllers/auth');

const router = Router();

router.post('/login',[
    check('email', 'El email/username es obligatorio').isString(),
    check('password', 'La contraseña es obligatoria').not().isEmpty().isLength({ min: 8 }),
    check('remember', 'Recordar usuario es obligatorio').not().isEmpty(),
    validateFields
], login );

module.exports = router;