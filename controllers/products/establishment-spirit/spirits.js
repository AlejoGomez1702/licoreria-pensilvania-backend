const { response } = require('express');
const { Product } = require('../../../models');

/**
 * Crea un nuevo licor en la base de datos.
 */
const createSpirit = async (req, res = response ) => {
    const { state, user, establishment, file, ...body } = req.body;
    body.vol_alcohol = Number( body.vol_alcohol );

    // Generar la data a guardar
    const data = {
        ...body,
        establishment: req.user.establishment,
        user: req.user._id,
        supercategory: '61414fa3752e94b6aa171231'
    };

    const spirit = new Product( data );

    try 
    {
        // Guardar DB
        await spirit.save();
        return res.status(201).json( spirit );
    } 
    catch (error) 
    {
        console.log(error)
        return res.status(401).json( {error: 'No se pudo crear el licor en la base de datos'} );
    }    
};

/**
 * Obtiene todos los licores registrados en un establecimiento.
 */
 const getAllSpirits = async(req, res = response ) => {

    const { limit = 10, from = 0 } = req.query;
    // Establecimiento del que se desea obtener los licores
    const query = req.queryProduct;
    // console.log(query);
    // let spirits = [];

    const [ total, products ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)            
                        .populate('establishment', 'name')
                        .populate('category', 'name')
                        .populate('unit', 'unit')
                        .skip( Number( from ) )  // desde donde
                        .limit( Number( limit ) ) // Cuantos
    ]);

    return res.json({
        total,
        products
    });
};

/**
 * Obtiene un licor de la base de datos.
 */
 const getSpiritById = async(req, res = response ) => {

    // const { id } = req.params;
    // const establishment = req.establishmentId;
    // Saqueme el licor de ese establecimiento que este activo cuyo id concuerde.
    const query = req.queryProduct;
    const spirit = await Product.findOne( query )
                            .populate('establishment', 'name')
                            .populate('category', 'name')
                            .populate('unit', 'unit');

    return res.json( spirit );
};

/**
 * Actualiza la información de un licor en la base de datos.
 */
 const updateSpiritById = async( req, res = response ) => {

    const { id } = req.params;
    const { state, user, ...data } = req.body;
    const { establishment } = req.user;
    // Actualiceme el licor cuyo id coincida, peertenezca al inventario del usuario y este activo
    const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };

    data.user = req.user._id;

    const spirit = await Product.findOneAndUpdate(query, data, { new: true });    

    return res.json( spirit );
};

/**
 * Elimina un licor de la base de datos.
 * Se hace un borrado suave, se actualiza el campo state a false para indicar la eliminación.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const deleteSpiritById = async(req, res = response ) => {

    const { id } = req.params;
    const establishment = req.user.establishment;
    // Elimineme el producto cuyo id coincida, pertenezca al establecimiento del usuario y este activo
    const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };
    const productDeleted = await Product.findOneAndUpdate( query, { state: false }, {new: true });

    return res.json( productDeleted );
};

// **************************************************************************************************** //
// ********* ENDPOINTS ESPECIALES ********* ENDPOINTS ESPECIALES********* ENDPOINTS ESPECIALES********* //
// **************************************************************************************************** //

/**
 * Obtiene todas las caracteristicas de los licores registrados en un establecimiento.
 */
 const getAllSpiritsFeatures = async(req, res = response ) => {

    const establishment = req.establishmentId;
    // Saqueme los licores de ese negocio que esten activos
    const query = { $and : [{establishment}, {state: true}] };
    const featuresData = await Spirit.find( query ).select('features');

    let features = [];
    for (const feature of featuresData) 
    {
        const featuresEspecifics = feature.features;
        for (const f of featuresEspecifics) 
        {
            if(f)
            {
                features.push( f );
            }                
        }        
    }

    // Eliminando repetidos
    features = [...new Set( features )];

    res.json({
        features
    });
};


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
    createSpirit,
    getAllSpirits,
    getSpiritById,
    updateSpiritById,
    deleteSpiritById,
    // *** Especiales ***//
    getAllSpiritsFeatures,
    // runScript

};