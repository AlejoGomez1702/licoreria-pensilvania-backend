<<<<<<< HEAD
// // const { Router } = require('express');
// const { check } = require('express-validator');

// const { 
//     validateJWT, validateFields, isAdminRole, isActiveUser, validateInventory, 
//     validateExistProduct, validateImageUploadProduct, validatePublicData, 
//     validateJWTEstablishment, validateImageEditProduct
// } = require('../../middlewares');

// const { existSpiritById, existCategoryById, existAlcoholById, existUnitById } = require('../../helpers/db-validators');
// const { toArrayFeatures } = require('../../middlewares/products/to-array-features');
// const { getAllSpirits, getSpiritById, getAllSpiritsFeatures, createSpirit, updateSpiritById, runScript } = require('../../controllers/products/spirits');
// const { validateExistSpirit } = require('../../middlewares/products/validate-exist-spirit');
=======
// const { Router } = require('express');
// const { check } = require('express-validator');
// const { validateJWT, validateFields, isAdminRole, isActiveUser, validateInventory, validateExistProduct, validateImageUploadProduct } = require('../middlewares');
// const { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById, getAllFeatures } = require('../controllers/products');
// const { existCategoryById, existAlcoholById, existUnitById, existProductById, existInventoryById } = require('../helpers/db-validators');
// const { toArrayFeatures } = require('../middlewares/products/to-array-features');
>>>>>>> e5a7df9ae1539b1f940a5da42071944b9649f4eb

// const router = Router();

// /**
<<<<<<< HEAD
//  * Crear un nuevo Producto en la BD.
=======
//  * Crear un nuevo producto en la BD.
>>>>>>> e5a7df9ae1539b1f940a5da42071944b9649f4eb
//  * {{ url }}/api/products
//  */
// router.post('/', [ 
//     validateJWT,
<<<<<<< HEAD
//     isActiveUser,
=======
//     validateInventory,
>>>>>>> e5a7df9ae1539b1f940a5da42071944b9649f4eb
//     check('name','El nombre es obligatorio').not().isEmpty(),
//     check('category','No existe la categoria especificada').isMongoId(),
//     check('category').custom( existCategoryById ),
//     check('alcohol','No existe el volumen alcoholico especificado').isMongoId(),
<<<<<<< HEAD
//     check('alcohol', 'Debe ingresar el % de alcohol'),
//     check('unit','No existe la unida de medida especificada').isMongoId(),
//     check('unit').custom( existUnitById ),    
//     // toArrayFeatures,
//     validateExistSpirit,    
//     validateFields,
//     // La imagen es la ultima que se valida ya que si no esta todo correcto no se debe subir al servicio
//     validateImageUploadProduct
// ], createSpirit );

// /**
//  * Obtener todos los licores de la BD.
//  * {{ url }}/api/products
//  */
//  router.get('/', [
//     validatePublicData,
//     validateJWTEstablishment
// ], getAllSpirits );

// /**
//  * Obtener un licor especifico de la BD.
//  * {{ url }}/api/products/:id
//  */
//  router.get('/:id',[
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existSpiritById ),
//     validatePublicData,
//     validateJWTEstablishment,    
//     validateFields
// ], getSpiritById );

// /**
//  * Actualizar un licor especifico de la BD.
=======
//     check('alcohol').custom( existAlcoholById ),
//     check('unit','No existe la unida de medida especificada').isMongoId(),
//     check('unit').custom( existUnitById ),
//     isAdminRole,
//     isActiveUser,
//     toArrayFeatures,
//     validateExistProduct,    
//     validateFields,
//     validateImageUploadProduct // La imagen es la ultima que se valida ya que si no esta todo correcto no se debe subir al servicio
// ], createProduct );

// /**
//  * Obtener todos los productos de la BD.
//  * {{ url }}/api/products
//  */
//  router.get('/', [
//     // validateJWT,
//     // validateInventory,
//     // isActiveUser
// ], getAllProducts );

// /**
//  * Obtener un produto especifico de la BD.
//  * {{ url }}/api/products/:id
//  */
//  router.get('/:id',[
//     validateJWT,
//     validateInventory,
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existProductById ),
//     validateFields
// ], getProductById );

// /**
//  * Actualizar un producto especifico de la BD.
>>>>>>> e5a7df9ae1539b1f940a5da42071944b9649f4eb
//  * {{ url }}/api/products/:id
//  */
//  router.put('/:id',[
//     validateJWT,
<<<<<<< HEAD
//     check('id').custom( existSpiritById ),
=======
//     validateInventory,
//     check('id').custom( existProductById ),
>>>>>>> e5a7df9ae1539b1f940a5da42071944b9649f4eb
//     check('name','El nombre es obligatorio').not().isEmpty(),
//     check('category','No existe la categoria especificada').isMongoId(),
//     check('category').custom( existCategoryById ),
//     check('alcohol','No existe el volumen alcoholico especificado').isMongoId(),
//     check('alcohol').custom( existAlcoholById ),
//     check('unit','No existe la unida de medida especificada').isMongoId(),
//     check('unit').custom( existUnitById ),
<<<<<<< HEAD
//     validateExistSpirit,
//     isActiveUser,
//     validateImageEditProduct,
//     validateImageUploadProduct,
//     validateFields
// ], updateSpiritById );
=======
//     check('inventory','No existe el inventario especificado').isMongoId(),
//     check('inventory').custom( existInventoryById ),
//     validateExistProduct,
//     isAdminRole,
//     isActiveUser,
//     validateImageUploadProduct,
//     validateFields
// ], updateProductById );
>>>>>>> e5a7df9ae1539b1f940a5da42071944b9649f4eb

// /**
//  * Eliminar un productos especifico de la BD.
//  * {{ url }}/api/products/:id
//  */
<<<<<<< HEAD
// //  router.delete('/:id',[
// //     validateJWT,
// //     validateInventory,
// //     isAdminRole,
// //     isActiveUser,
// //     check('id', 'No es un id de Mongo válido').isMongoId(),
// //     check('id').custom( existProductById ),
// //     validateFields,
// // ], deleteSpiritById );
=======
//  router.delete('/:id',[
//     validateJWT,
//     validateInventory,
//     isAdminRole,
//     isActiveUser,
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existProductById ),
//     validateFields,
// ], deleteProductById );
>>>>>>> e5a7df9ae1539b1f940a5da42071944b9649f4eb

// // **************************************************************************************************** //
// // ********* ENDPOINTS ESPECIALES ********* ENDPOINTS ESPECIALES********* ENDPOINTS ESPECIALES********* //
// // **************************************************************************************************** //

// /**
<<<<<<< HEAD
//  * Obtiene las caracteristicas registradas en los licores
//  * {{ url }}/api/products/features
//  */
// router.get('/all/features', [
//     validatePublicData,
//     validateJWTEstablishment
// ], getAllSpiritsFeatures );

=======
//  * Obtiene las caracteristicas registradas en los productos
//  * {{ url }}/api/products/features
//  */
// router.get('/all/features', [
//     validateJWT,
//     validateInventory,
//     isActiveUser
// ], getAllFeatures );
>>>>>>> e5a7df9ae1539b1f940a5da42071944b9649f4eb


// module.exports = router;