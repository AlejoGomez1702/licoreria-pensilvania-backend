const { response } = require('express');
const { Purchase, Product } = require('../models');

/**
 * Crea una nueva compra en la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createPurchase = async(req, res = response ) => {

    const products = req.body.products;

    // Calculando el total de la compra
    let total = 0;
    products.forEach(p => {
        total += p.count * p.purchase_price;
    });

    const data = {
        products,
        user: req.user._id,
        establishment: req.user.establishment,
        total
    }

    const purchase = new Purchase( data );

    // Refrescar el incomprario, restando los productos de la compra.
    try 
    {
        // Por cada uno de los productos de la compra
        for (const product of products) 
        {
            const productDB = await Product.findById( product.product );
            const updateData = { current_existence: (productDB.current_existence + product.count ) };
            // Saqueme el producto del inventario y actualice la existencia
            await Product.findByIdAndUpdate(product.product, updateData);
        }

        // Guardar DB
        await purchase.save();
        
    } catch (error) 
    {
        console.log(error);        
    }

    res.status(201).json( purchase );
};

// /**
//  * Obtiene todas las compras que tiene registradas el negocio del usuario logueado.
//  * Solo pueden mostrarsen a los administradores.
//  * @param {*} req 
//  * @param {*} res 
//  * @returns 
//  */
// const getAllSales = async(req, res = response ) => {
//     const { limit = 10, from = 0 } = req.query;
//     const { establishment } = req.user;

//     // Saqueme las compras activas del establecimiento del usuario logueado
//     const query = { $and: [{ 'state': true }, { establishment }] };

//     let [ total, sales, statistics, statisticsInversion ] = await Promise.all([
//         Sale.countDocuments(query),
//         Sale.find(query)
//                     .populate('establishment', 'name')
//                     .populate('user', 'name')
//                     .skip( Number( from ) )
//                     .limit( Number( limit ) ),
//         // Agrupar las compras por dias.
//         Sale.aggregate([
//             {
//                 $match: query
//             },
//             {
//                 $group: {
//                     _id: { day: { $dayOfYear: "$created_at"}, year: { $year: "$created_at" } },
//                     totalAmount: { $sum: '$total' },  // Valor total de las compras del dia
//                     count: { $sum: 1 } // Cuantas compras se hicieron en el dia
//                 }
//             }
//         ]),
//         // Agrupar las compras por dias y sacar la inversion.
//         Sale.aggregate([
//             {
//                 $match: query
//             },
//             {
//                 $group: {
//                     _id: { day: { $dayOfYear: "$created_at"}, year: { $year: "$created_at" } },
//                     totalAmount: { $sum: '$total_inversion' },  // Valor total de las compras del dia
//                     count: { $sum: 1 } // Cuantas compras se hicieron en el dia
//                 }
//             }
//         ])
//     ]);

//     statistics = statistics.map(element => {
//         return {
//             totalAmount: element.totalAmount,
//             count: element.count,
//             ...element._id
//         };
//     });

//     statisticsInversion = statisticsInversion.map(element => {
//         return {
//             totalAmount: element.totalAmount,
//             count: element.count,
//             ...element._id
//         };
//     });


//     res.json({
//         total,
//         sales,
//         statistics,
//         statisticsInversion
//     });
// };

// /**
//  * Obtiene una compra de la base de datos.
//  */
//  const getSaleById = async(req, res = response ) => {

//     // Saqueme la compra de ese establecimiento que este activo cuyo id concuerde.
//     const query = req.querySale;
//     const sale = await Sale.findOne( query )
//                             .populate('establishment', 'name')
//                             .populate('user', 'name');

//     return res.json( sale );
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
    createPurchase,
    // getAllSales,
    // getSaleById
    // updateAlcoholById,
    // deleteAlcoholById
};