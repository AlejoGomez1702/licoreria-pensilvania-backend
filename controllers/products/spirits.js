const { response } = require('express');
const { Spirit } = require('../../models');

/**
 * Crea un nuevo licor en la base de datos.
 */
const createSpirit = async (req, res = response ) => {
    const { state, user, file, ...body } = req.body;

    // Generar la data a guardar
    const data = {
        ...body,
        establishment: req.user.establishment,
        user: req.user._id
    };

    const spirit = new Spirit( data );

    try 
    {
        // Guardar DB
        await spirit.save();
        res.status(201).json( spirit );
    } 
    catch (error) 
    {
        res.status(200).json( {error: 'No se pudo crear el licor en la base de datos'} );
    }    
};

/**
 * Obtiene todos los licores registrados en un establecimiento.
 */
 const getAllSpirits = async(req, res = response ) => {

    const { limit = 10, from = 0, category = '' } = req.query;
    // Establecimiento del que se desea obtener los licores
    const establishment = req.establishmentId;
    // Saqueme los productos de ese establecimiento que esten activos
    let query = { $and : [{establishment}, {state: true}] };
    if( category ) // si se desean buscar licores por categoria.
    {
        query = { $and : [{establishment}, {state: true}, {category}] };
    }

    const [ total, spirits ] = await Promise.all([
        Spirit.countDocuments(query),
        Spirit.find(query)
            .populate('establishment', 'name')
            .populate('category', 'name')
            .populate('alcohol', 'alcohol')
            .populate('unit', 'unit')
            .skip( Number( from ) )  // desde donde
            .limit( Number( limit ) ) // Cuantos
    ]);

    res.json({
        total,
        spirits
    });
};

/**
 * Obtiene un licor de la base de datos.
 */
 const getSpiritById = async(req, res = response ) => {

    const { id } = req.params;
    const establishment = req.establishmentId;
    // Saqueme el licor de ese establecimiento que este activo cuyo id concuerde.
    const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };
    const spirit = await Spirit.findOne( query )
                            .populate('establishment', 'name');

    res.json( spirit );
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

    const spirit = await Spirit.findOneAndUpdate(query, data, { new: true });    

    res.json( spirit );
};

/**
 * Elimina un producto de la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
//  const deleteSpiritById = async(req, res = response ) => {

//     const { id } = req.params;
//     const inventory = req.inventory;
//     // Elimineme el producto cuyo id coincida, pertenezca al inventario del usuario y este activo
//     const query = { $and: [{ '_id': id }, { inventory }, { 'state': true }] };
//     const productDeleted = await Product.findOneAndUpdate( query, { state: false }, {new: true });

//     res.json( productDeleted );
// };

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


module.exports = {
    createSpirit,
    getAllSpirits,
    getSpiritById,
    updateSpiritById,
    // deleteSpiritById,
    // // *** Especiales ***//
    getAllSpiritsFeatures

};