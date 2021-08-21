const { Router } = require('express');
const { check } = require('express-validator');
const { createUnit, getAllUnits, getUnitById, updateUnitById, deleteUnitById } = require('../controllers/units');
const { existUnitById } = require('../helpers/db-validators');

const { validateJWT, validateFields, isAdminRole, isActiveUser, validateCreateUnit } = require('../middlewares');

const router = Router();

/**
 * Crear una nueva unidad de medida en la BD.
 * {{ url }}/api/units
 */
 router.post('/', [ 
    validateJWT,
    check('unit','La unidad de medida es obligatoria').not().isEmpty().isString(),
    check('ml','La cantidad de ml es obligatoria').not().isEmpty().isNumeric(),
    validateCreateUnit,
    validateFields
], createUnit );

/**
 * Obtener todas las unidad de medida de la BD.
 * {{ url }}/api/units
 */
router.get('/', [
    validateJWT,
    isActiveUser
], getAllUnits);

/**
 * Obtener una unidad de medida especifica en la BD.
 * {{ url }}/api/units/:id
 */
router.get('/:id',[
    validateJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existUnitById ),
    validateFields
], getUnitById );

/**
 * Actualizar una unidad de medida especifica en la BD.
 * {{ url }}/api/units/:id
 */
router.put('/:id',[
    validateJWT,
    check('unit','La unidad de medida es obligatoria').not().isEmpty().isString(),
    check('ml','La cantidad de ml es obligatoria').not().isEmpty().isNumeric(),
    check('id').custom( existUnitById ),
    validateCreateUnit,
    validateFields
], updateUnitById );

/**
 * Eliminar una unidad de medida especifica en la BD.
 * {{ url }}/api/units/:id
 */
router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existUnitById ),
    validateFields,
], deleteUnitById );

module.exports = router;