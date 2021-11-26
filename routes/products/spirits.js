const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validateJWT, validateFields, isAdminRole, isActiveUser, validateInventory, 
    validateExistProduct, validateImageUploadProduct, validatePublicData, validateJWTEstablishment, validateImageEditProduct, capitalizeProductName
} = require('../../middlewares');

const { existSpiritById, existCategoryById, existAlcoholById, existUnitById } = require('../../helpers/db-validators');
const { toArrayFeatures } = require('../../middlewares/products/to-array-features');
const { getAllSpirits, getSpiritById, getAllSpiritsFeatures, createSpirit, updateSpiritById } = require('../../controllers/products/spirits');
const { validateExistSpirit } = require('../../middlewares/products/validate-exist-spirit');

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
    capitalizeProductName,
    validateFields,
    // La imagen es la ultima que se valida ya que si no esta todo correcto no se debe subir al servicio
    validateImageUploadProduct
], createSpirit );

/**
 * Obtener todos los licores de la BD.
 * {{ url }}/api/spirits
 */
 router.get('/', [
    validatePublicData,
    validateJWTEstablishment
], getAllSpirits );

/**
 * Obtener un licor especifico de la BD.
 * {{ url }}/api/spirits/:id
 */
 router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existSpiritById ),
    validatePublicData,
    validateJWTEstablishment,    
    validateFields
], getSpiritById );

/**
 * Actualizar un licor especifico de la BD.
 * {{ url }}/api/spirits/:id
 */
 router.put('/:id',[
    validateJWT,
    check('id').custom( existSpiritById ),
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('category','No existe la categoria especificada').isMongoId(),
    check('category').custom( existCategoryById ),
    check('alcohol','No existe el volumen alcoholico especificado').isMongoId(),
    check('alcohol').custom( existAlcoholById ),
    check('unit','No existe la unida de medida especificada').isMongoId(),
    check('unit').custom( existUnitById ),
    validateExistSpirit,
    isActiveUser,
    validateImageEditProduct,
    validateImageUploadProduct,
    validateFields
], updateSpiritById );

/**
 * Eliminar un productos especifico de la BD.
 * {{ url }}/api/products/:id
 */
//  router.delete('/:id',[
//     validateJWT,
//     validateInventory,
//     isAdminRole,
//     isActiveUser,
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existProductById ),
//     validateFields,
// ], deleteSpiritById );

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