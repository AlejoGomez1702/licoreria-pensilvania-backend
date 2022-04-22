const { response } = require('express');
const { Client } = require('../../models');

/**
 * Crea un nuevo cliente en la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createClient = async(req, res = response ) => {

    const { state, user, ...body } = req.body;

    // Generar la data a guardar
    const data = {
        ...body,
        user: req.user._id,
        establishment: req.user.establishment
    }

    const client = new Client( data );

    // Guardar DB
    await client.save();

    return res.status(201).json( client );
};

/**
 * Obtiene todos los clientees registrados en un establecimiento.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const getAllClients = async(req, res = response ) => {

    const { limit = 5, from = 0 } = req.query;
    // Saqueme el establecimiento al que quiero mirar los clientes
    const establishment = req.user.establishment;
    // Saqueme los clientes de este establecimiento que esten activos
    const query = { $and : [{establishment}, {state: true}] };

    const [ total, clients ] = await Promise.all([
        Client.countDocuments(query),
        Client.find( query )
            .populate('establishment', 'name')
            .populate('user', 'name')
            .skip( Number( from ) )
            .limit( Number( limit ) )
    ]);

    return res.json({
        total,
        clients
    });
};

// /**
//  * Obtiene un cliente de la base de datos.
//  * @param {*} req 
//  * @param {*} res 
//  * @returns 
//  */
//  const getProviderById = async(req, res = response ) => {

//     const { id } = req.params;
//     // Saqueme el inventario cuyo establecimiento sea el del usuario logueado.
//     const establishment = req.user.establishment;
//     // Saqueme el cliente del establecimiento que este activo cuyo id concuerde.
//     const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };
//     const provider = await Provider.findOne( query )
//                                     .populate('establishment', 'name')
//                                     .populate('user', 'name');

//     res.json( provider );
// };

/**
 * Actualiza la información de un cliente en la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const updateClientById = async( req, res = response ) => {

    const { id } = req.params;
    const { state, user, ...data } = req.body;
    // Saqueme el inventario cuyo establecimiento sea el del usuario logueado.
    const establishment = req.user.establishment;
    // Actualiceme el cliente cuyo id coincida, peertenezca al establecimiento del usuario y este activo
    const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };

    data.user = req.user._id;

    const client = await Client.findOneAndUpdate(query, data, { new: true });

    return res.json( client );
};

/**
 * Elimina un cliente de la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const deleteClientById = async(req, res = response ) => {

    const { id } = req.params;
    const establishment = req.user.establishment;
    // Elimineme el cliente cuyo id coincida, pertenezca al establecimiento del usuario y este activo
    const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };
    const clientDeleted = await Client.findOneAndUpdate( query, { state: false }, {new: true });

    res.json( clientDeleted );
};

// // *********** END-POINTS ESPECIALIZADOS *********** END-POINTS ESPECIALIZADOS ************** //

// /**
//  * Actualiza la información de productos de un cliente en la base de datos.
//  * @param {*} req 
//  * @param {*} res 
//  * @returns 
//  */
//  const updateProviderProductsById = async( req, res = response ) => {

//     const { id } = req.params;
//     const { state, user, ...data } = req.body;
//     // Saqueme el inventario cuyo establecimiento sea el del usuario logueado.
//     const establishment = req.user.establishment;
//     // Actualiceme el cliente cuyo id coincida, peertenezca al establecimiento del usuario y este activo
//     const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };

//     data.user = req.user._id;

//     const provider = await Provider.findOneAndUpdate(query, data, { new: true });

//     res.json( provider );
// };

module.exports = {
    createClient,
    getAllClients,
    // getProviderById,
    updateClientById,
    deleteClientById
    // // Especializados
    // updateProviderProductsById
};