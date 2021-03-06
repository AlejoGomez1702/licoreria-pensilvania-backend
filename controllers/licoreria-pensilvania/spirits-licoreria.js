const { response } = require('express');
const { Product } = require('../../models');

/**
 * Obtiene todos los licores registrados en un establecimiento.
 */
 const getMainSpirits = async(req, res = response ) => {

    // Cantidad de productos al azar a crear
    const count = 8;
    // Establecimiento del que se desea obtener los licores
    const establishment = '611d475c779e79be7ea58995';
    const query = { establishment, state: true };
    const total = await Product.countDocuments( query );
    let randomProducts = [];
    let randomNumber = 0;
    let auxProduct;
    // Para generar "count" productos que se van a mostrar en la página principal.
    for (let i = 0; i < count; i++) 
    {
        randomNumber = Math.floor(Math.random() * total);
        auxProduct = await Product.findOne( query )
                                    .select('-purchase_price') // No se muestra el precio de compra.
                                    .populate('category', 'name')
                                    .populate('unit', 'unit')
                                    .skip( randomNumber );

        randomProducts.push( auxProduct );
    }

    res.json({
        spirits: randomProducts
    });
};

/**
 * Obtiene todos los licores de licoreria pensilvania.
 */
 const getAllSpirits = async(req, res = response ) => {

    const { limit = 8, from = 0 } = req.query;
    // Establecimiento del que se desea obtener los licores
    const establishment = '611d475c779e79be7ea58995';
    const query = { establishment, state: true };

    const [ total, spirits ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
                        .populate('category', 'name')
                        .populate('unit', 'unit')
                        .skip( Number( from ) )  // desde donde
                        .limit( Number( limit ) ) // Cuantos
    ]);

    res.json({
        total,
        spirits
    });
};

// /**
//  * Obtiene un licor de la base de datos.
//  */
//  const getSpiritById = async(req, res = response ) => {

//     // const { id } = req.params;
//     // const establishment = req.user.establishment;
//     // Saqueme el licor de ese establecimiento que este activo cuyo id concuerde.
//     const query = req.querySpirit;
//     const spirit = await Product.findOne( query )
//                             .populate('establishment', 'name')
//                             .populate('category', 'name')
//                             .populate('unit', 'unit');

//     res.json( spirit );
// };

// /**
//  * Actualiza la información de un licor en la base de datos.
//  */
//  const updateSpiritById = async( req, res = response ) => {

//     const { id } = req.params;
//     const { state, user, ...data } = req.body;
//     const { establishment } = req.user;
//     // Actualiceme el licor cuyo id coincida, peertenezca al inventario del usuario y este activo
//     const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };

//     data.user = req.user._id;

//     const spirit = await Product.findOneAndUpdate(query, data, { new: true });    

//     res.json( spirit );
// };

// /**
//  * Elimina un producto de la base de datos.
//  * @param {*} req 
//  * @param {*} res 
//  * @returns 
//  */
//  const deleteSpiritById = async(req, res = response ) => {

//     const { id } = req.params;
//     const establishment = req.user.establishment;
//     // Elimineme el producto cuyo id coincida, pertenezca al establecimiento del usuario y este activo
//     const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };
//     const productDeleted = await Product.findOneAndUpdate( query, { state: false }, {new: true });

//     res.json( productDeleted );
// };

// // **************************************************************************************************** //
// // ********* ENDPOINTS ESPECIALES ********* ENDPOINTS ESPECIALES********* ENDPOINTS ESPECIALES********* //
// // **************************************************************************************************** //

// /**
//  * Obtiene todas las caracteristicas de los licores registrados en un establecimiento.
//  */
//  const getAllSpiritsFeatures = async(req, res = response ) => {

//     const establishment = req.user.establishment;
//     // Saqueme los licores de ese negocio que esten activos
//     const query = { $and : [{establishment}, {state: true}] };
//     const featuresData = await Spirit.find( query ).select('features');

//     let features = [];
//     for (const feature of featuresData) 
//     {
//         const featuresEspecifics = feature.features;
//         for (const f of featuresEspecifics) 
//         {
//             if(f)
//             {
//                 features.push( f );
//             }                
//         }        
//     }

//     // Eliminando repetidos
//     features = [...new Set( features )];

//     res.json({
//         features
//     });
// };


// const runScript = async(req, res = response) => {
//     let fullProducts = [];
//     const products = await Product.find({});

//     for (const product of products) 
//     {
//         const { features, ...data } = product._doc;
//         const alcoholId = data.alcohol;
//         const alcohol2 = await Alcohol.findById(alcoholId);
//         const alcoholName = alcohol2.alcohol;

//         const { alcohol, ...other } = data;
//         other.vol_alcohol = alcoholName;

//         // console.log(alcoholName);

//         fullProducts.push(other);
//     }

//     await Product.deleteMany();

//     for (const product of fullProducts) 
//     {
//         const newProduct = new Product(product);
//         await newProduct.save();
//         console.log(newProduct);        
//     }

//     res.json({
//         full: fullProducts
//     });

// }

module.exports = {
    getMainSpirits,
    getAllSpirits
};