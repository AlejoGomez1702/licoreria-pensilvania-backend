const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validateJWT, validateFields, isAdminRole, isActiveUser, validateImageUploadProduct,
    validatePublicData, validateJWTEstablishment, validateImageEditProduct, capitalizeProductName
} = require('../../../middlewares');

const { existProductById, existCategoryById, existUnitById } = require('../../../helpers/db-validators');
const { getAllSpirits, getSpiritById, getAllSpiritsFeatures, createSpirit, updateSpiritById, deleteSpiritById } = require('../../../controllers/products/establishment-spirit/spirits');
const { validateExistSpirit } = require('../../../middlewares/products/establishment-spirit/spirits/validate-exist-spirit');
const { validateSpiritQuery, validateSpiritByIdQuery } = require('../../../middlewares/products/establishment-spirit/spirits/validate-query');

const router = Router();

/**
 * Crear un nuevo licor en la BD.
 * {{ url }}/api/spirits
 */
router.post('/', [ 
    validateJWT,
    isActiveUser,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('category','No existe la categoria especificada').isMongoId(),
    check('category').custom( existCategoryById ),
    check('vol_alcohol','Debe especificar un % de volumen alcoholico').not().isEmpty().isFloat({min: 0, max: 100}),
    check('unit','No existe la unidad de medida especificada').isMongoId(),
    check('unit').custom( existUnitById ),       
    validateExistSpirit,
    validateFields,
    // La imagen es la ultima que se valida ya que si no esta todo correcto no se debe subir al servicio
    validateImageUploadProduct
], createSpirit );

/**
 * Obtener todos los licores de la BD.
 * {{ url }}/api/spirits
 */
 router.get('/', [
    // validatePublicData,
    validateJWTEstablishment,
    validateSpiritQuery
], getAllSpirits );

/**
 * Obtener un licor especifico de la BD.
 * {{ url }}/api/spirits/:id
 */
 router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existProductById ),
    // validatePublicData,
    validateJWTEstablishment,
    validateSpiritByIdQuery,
    validateFields
], getSpiritById );

/**
 * Actualizar un licor especifico de la BD.
 * {{ url }}/api/spirits/:id
 */
 router.put('/:id',[
    validateJWT,
    isActiveUser,
    isAdminRole,    // Solo el administrador puede modificar precios.
    check('id').custom( existProductById ),
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('category','No existe la categoria especificada').isMongoId(),
    check('category').custom( existCategoryById ),
    check('vol_alcohol','Debe especificar un % de volumen alcoholico').not().isEmpty().isFloat({min: 0, max: 100}),
    check('unit','No existe la unidad de medida especificada').isMongoId(),
    check('unit').custom( existUnitById ),
    validateExistSpirit,    
    validateImageEditProduct,
    validateImageUploadProduct,
    validateFields
], updateSpiritById );

/**
 * Eliminar un productos especifico de la BD.
 * {{ url }}/api/products/:id
 */
 router.delete('/:id',[
    validateJWT,
    isActiveUser,
    isAdminRole,    // Solo el administrador puede eliminar productos. 
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existProductById ),
    validateFields,
], deleteSpiritById );

// **************************************************************************************************** //
// ********* ENDPOINTS ESPECIALES ********* ENDPOINTS ESPECIALES********* ENDPOINTS ESPECIALES********* //
// **************************************************************************************************** //

/**
 * Obtiene las caracteristicas registradas en los licores
 * {{ url }}/api/spirits/features
 */
router.get('/all/features', [
    validatePublicData,
    validateJWTEstablishment
], getAllSpiritsFeatures );


// router.get('/script/script', runScript);

module.exports = router;