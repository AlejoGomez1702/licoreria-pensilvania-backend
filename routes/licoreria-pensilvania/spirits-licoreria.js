const { Router } = require('express');
const { getMainSpirits } = require('../../controllers/licoreria-pensilvania/spirits-licoreria');

const router = Router();

/**
 * Obtener los licores que se muestran en la página principal de licorería pensilvania.
 * {{ url }}/api/public/spirits
 */
 router.get('/spirits/main', getMainSpirits );

// /**
//  * Crear un nuevo licor en la BD.
//  * {{ url }}/api/spirits
//  */
// router.post('/', [ 
//     validateJWT,
//     isActiveUser,
//     check('name','El nombre es obligatorio').not().isEmpty(),
//     check('category','No existe la categoria especificada').isMongoId(),
//     check('category').custom( existCategoryById ),
//     check('vol_alcohol','Debe especificar un % de volumen alcoholico').not().isEmpty().isFloat({min: 0, max: 100}),
//     check('unit','No existe la unidad de medida especificada').isMongoId(),
//     check('unit').custom( existUnitById ),       
//     validateExistSpirit,
//     capitalizeProductName,
//     validateFields,
//     // La imagen es la ultima que se valida ya que si no esta todo correcto no se debe subir al servicio
//     validateImageUploadProduct
// ], createSpirit );

// /**
//  * Obtener un licor especifico de la BD.
//  * {{ url }}/api/spirits/:id
//  */
//  router.get('/:id',[
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existProductById ),
//     // validatePublicData,
//     validateJWTEstablishment,
//     validateSpiritByIdQuery,
//     validateFields
// ], getSpiritById );

// /**
//  * Actualizar un licor especifico de la BD.
//  * {{ url }}/api/spirits/:id
//  */
//  router.put('/:id',[
//     validateJWT,
//     isActiveUser,
//     isAdminRole,
//     check('id').custom( existProductById ),
//     check('name','El nombre es obligatorio').not().isEmpty(),
//     check('category','No existe la categoria especificada').isMongoId(),
//     check('category').custom( existCategoryById ),
//     check('vol_alcohol','Debe especificar un % de volumen alcoholico').not().isEmpty().isFloat({min: 0, max: 100}),
//     check('unit','No existe la unida de medida especificada').isMongoId(),
//     check('unit').custom( existUnitById ),
//     validateExistSpirit,    
//     validateImageEditProduct,
//     validateImageUploadProduct,
//     validateFields
// ], updateSpiritById );

// /**
//  * Eliminar un productos especifico de la BD.
//  * {{ url }}/api/products/:id
//  */
//  router.delete('/:id',[
//     validateJWT,
//     isActiveUser,
//     isAdminRole,    
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existProductById ),
//     validateFields,
// ], deleteSpiritById );

// // **************************************************************************************************** //
// // ********* ENDPOINTS ESPECIALES ********* ENDPOINTS ESPECIALES********* ENDPOINTS ESPECIALES********* //
// // **************************************************************************************************** //

// /**
//  * Obtiene las caracteristicas registradas en los licores
//  * {{ url }}/api/spirits/features
//  */
// router.get('/all/features', [
//     validatePublicData,
//     validateJWTEstablishment
// ], getAllSpiritsFeatures );


// // router.get('/script/script', runScript);

module.exports = router;