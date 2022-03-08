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

    // Calculando el total de la venta
    let total = 0;
    products.forEach(p => {
        total += p.count * p.sale_price;
    });

    const data = {
        products,
        user: req.user._id,
        establishment: req.user.establishment,
        total
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

/**
 * Obtiene todas las ventas que tiene registradas el negocio del usuario logueado.
 * Solo pueden mostrarsen a los administradores.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAllSales = async(req, res = response ) => {
    const { limit = 10, from = 0 } = req.query;
    const { establishment } = req.user;

    // Saqueme las ventas activas del establecimiento del usuario logueado
    const query = { $and: [{ 'state': true }, { establishment }] };

    let [ total, sales, statistics ] = await Promise.all([
        Sale.countDocuments(query),
        Sale.find(query)
                    .populate('establishment', 'name')
                    .populate('user', 'name')
                    .skip( Number( from ) )
                    .limit( Number( limit ) ),
        // Agrupar las ventas por dias.
        Sale.aggregate([
            {
                $match: query
            },
            {
                $group: {
                    _id: { day: { $dayOfYear: "$created_at"}, year: { $year: "$created_at" } },
                    totalAmount: { $sum: '$total' },  // Valor total de las ventas del dia
                    count: { $sum: 1 } // Cuantas ventas se hicieron en el dia
                }
            }
        ])
    ]);

    statistics = statistics.map(element => {
        return {
            totalAmount: element.totalAmount,
            count: element.count,
            ...element._id
        };
    });


    res.json({
        total,
        sales,
        statistics
    });
};

// db.sesiones.aggregate(
//     [
//         {
//             $group:
//             {   _id:{nombre:"$nombre"},
//                 num_km: {$sum:'$distKm'}
//             }
//         }
//     ]
// )

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
    getAllSales
    // getAllAlcohols,
    // getAlcoholById,
    // updateAlcoholById,
    // deleteAlcoholById
};