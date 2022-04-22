const { response } = require('express');
const { Client } = require('../../models');

// /**
//  * Crea un nuevo proveedor en la base de datos.
//  * @param {*} req 
//  * @param {*} res 
//  * @returns 
//  */
// const createProvider = async(req, res = response ) => {

//     const { state, user, ...body } = req.body;

//     // Generar la data a guardar
//     const data = {
//         ...body,
//         user: req.user._id,
//         establishment: req.user.establishment
//     }

//     const provider = new Provider( data );

//     // Guardar DB
//     await provider.save();

//     res.status(201).json( provider );
// };

/**
 * Obtiene todos los proveedores registrados en un establecimiento.
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

    res.json({
        total,
        clients
    });
};

// /**
//  * Obtiene un proveedor de la base de datos.
//  * @param {*} req 
//  * @param {*} res 
//  * @returns 
//  */
//  const getProviderById = async(req, res = response ) => {

//     const { id } = req.params;
//     // Saqueme el inventario cuyo establecimiento sea el del usuario logueado.
//     const establishment = req.user.establishment;
//     // Saqueme el proveedor del establecimiento que este activo cuyo id concuerde.
//     const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };
//     const provider = await Provider.findOne( query )
//                                     .populate('establishment', 'name')
//                                     .populate('user', 'name');

//     res.json( provider );
// };

// /**
//  * Actualiza la información de un proveedor en la base de datos.
//  * @param {*} req 
//  * @param {*} res 
//  * @returns 
//  */
//  const updateProviderById = async( req, res = response ) => {

//     const { id } = req.params;
//     const { state, user, ...data } = req.body;
//     // Saqueme el inventario cuyo establecimiento sea el del usuario logueado.
//     const establishment = req.user.establishment;
//     // Actualiceme el proveedor cuyo id coincida, peertenezca al establecimiento del usuario y este activo
//     const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };

//     data.user = req.user._id;

//     const provider = await Provider.findOneAndUpdate(query, data, { new: true });

//     res.json( provider );
// };

// /**
//  * Elimina un proveedor de la base de datos.
//  * @param {*} req 
//  * @param {*} res 
//  * @returns 
//  */
//  const deleteProviderById = async(req, res = response ) => {

//     const { id } = req.params;
//     // Saqueme el inventario cuyo establecimiento sea el del usuario logueado.
//     const establishment = req.user.establishment;
//     // Elimineme el proveedor cuyo id coincida, pertenezca al establecimiento del usuario y este activo
//     const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };
//     const providerDeleted = await Provider.findOneAndUpdate( query, { state: false }, {new: true });

//     res.json( providerDeleted );
// };

// // *********** END-POINTS ESPECIALIZADOS *********** END-POINTS ESPECIALIZADOS ************** //

// /**
//  * Actualiza la información de productos de un proveedor en la base de datos.
//  * @param {*} req 
//  * @param {*} res 
//  * @returns 
//  */
//  const updateProviderProductsById = async( req, res = response ) => {

//     const { id } = req.params;
//     const { state, user, ...data } = req.body;
//     // Saqueme el inventario cuyo establecimiento sea el del usuario logueado.
//     const establishment = req.user.establishment;
//     // Actualiceme el proveedor cuyo id coincida, peertenezca al establecimiento del usuario y este activo
//     const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };

//     data.user = req.user._id;

//     const provider = await Provider.findOneAndUpdate(query, data, { new: true });

//     res.json( provider );
// };

module.exports = {
    // createProvider,
    getAllClients,
    // getProviderById,
    // updateProviderById,
    // deleteProviderById,
    // // Especializados
    // updateProviderProductsById
};