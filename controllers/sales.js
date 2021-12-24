const { response } = require('express');
const { Sale, Product } = require('../models');

/**
 * Crea una nueva venta en la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createSale = async(req, res = response ) => {

    const products = req.body.products;

    const data = {
        products,
        user: req.user._id,
        establishment: req.user.establishment
    }

    const sale = new Sale( data );

    // Refrescar el inventario, restando los productos de la venta.
    try 
    {
        // Por cada uno de los productos de la venta
        for (const product of products) 
        {
            const productDB = await Product.findById( product.product );
            const updateData = { current_existence: (productDB.current_existence - product.count ) };
            // Saqueme el producto del inventario y actualice la existencia
            await Product.findByIdAndUpdate(product.product, updateData);
        }

        // Guardar DB
        await sale.save();
        
    } catch (error) 
    {
        console.log(error);        
    }

    res.status(201).json( sale );
};

// /**
//  * Obtiene todos los % de alcohol registrados en un establecimiento.
//  * @param {*} req 
//  * @param {*} res 
//  * @returns 
//  */
// const getAllAlcohols = async(req, res = response ) => {
//     const { limit = 5, from = 0 } = req.query;
//     const { establishment } = req.user;
//     const query = { $and: [{ 'state': true }, { establishment }] };

//     const [ total, alcohols ] = await Promise.all([
//         Alcohol.countDocuments(query),
//         Alcohol.find(query)
//             .populate('establishment', 'name')
//             .skip( Number( from ) )
//             .limit( Number( limit ) )
//     ]);

//     res.json({
//         total,
//         alcohols
//     });
// };

// /**
//  * Obtiene un % de volumen alcoholico especifico de la base de datos.
//  * @param {*} req 
//  * @param {*} res 
//  * @returns 
//  */
// const getAlcoholById = async(req, res = response ) => {

//     const { id } = req.params;
//     const establishment = req.user.establishment;
//     const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };
//     const alcohol = await Alcohol.findOne( query )
//                             .populate('establishment', 'name');

//     res.json( alcohol );
// };

// /**
//  * Actualiza un % de volumen alcoholico especifico de la base de datos.
//  * @param {*} req 
//  * @param {*} res 
//  * @returns 
//  */
// const updateAlcoholById = async( req, res = response ) => {

//     const { id } = req.params;
//     const { state, user, ...data } = req.body;
//     const establishment = req.user.establishment;
//     const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };

//     data.establishment = establishment;

//     const alcohol = await Alcohol.findOneAndUpdate(query, data, { new: true });

//     res.json( alcohol );
// };

// /**
//  * Elimina un % de volumen alcoholico especifico de la base de datos.
//  * @param {*} req 
//  * @param {*} res 
//  * @returns 
//  */
// const deleteAlcoholById = async(req, res = response ) => {

//     const { id } = req.params;
//     const establishment = req.user.establishment;
//     const query = { $and: [{ '_id': id }, { establishment }] };
//     const alcoholDeleted = await Alcohol.findOneAndUpdate( query, { state: false }, {new: true });
//     console.log(alcoholDeleted);
//     res.json( alcoholDeleted );
// };

module.exports = {
    createSale,
    // getAllAlcohols,
    // getAlcoholById,
    // updateAlcoholById,
    // deleteAlcoholById
};