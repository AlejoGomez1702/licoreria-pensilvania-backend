const { response } = require('express');
const { Movement } = require('../models');

/**
 * Crea un nuevo proveedor en la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createMovement = async(req, res = response ) => {

    const { state, user, ...body } = req.body;

    // Generar la data a guardar
    const data = {
        ...body,
        user: req.user._id,
        establishment: req.user.establishment
    }

    const movement = new Movement( data );

    // Guardar DB
    await movement.save();

    return res.status(201).json( movement );
};

/**
 * Obtener los movimientos registrados del negocio
 * @param {*} req 
 * @param {*} res 
 */
 const getAllMovements = async(req, res = response ) => {

    const { type, limit = 5, from = 0 } = req.query;
    // Saqueme el establecimiento al que quiero mirar los proveedores
    const establishment = req.user.establishment;
    // Saqueme los proveedores de este establecimiento que esten activos
    const query = { $and : [{establishment}, {state: true}, { type }] };

    const [ total, movements ] = await Promise.all([
        Movement.countDocuments(query),
        Movement.find( query )
                        .populate('establishment', 'name')
                        .populate('user', 'name')
                        .skip( Number( from ) )
                        .limit( Number( limit ) )
    ]);

    return res.json({
        total,
        movements
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
    createMovement,
    getAllMovements
    // getProviderById,
    // updateProviderById,
    // deleteProviderById,
    // // Especializados
    // updateProviderProductsById
};