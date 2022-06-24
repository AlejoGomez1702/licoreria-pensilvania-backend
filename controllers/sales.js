const { response } = require('express');
const { Sale, Product } = require('../models');

/**
 * Crea una nueva venta en la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createSale = async(req, res = response ) => {

    let countSecondPrice = 0;
    let total = 0;
    let total_inversion = 0;

    console.log("Venta: ", req.body);
    const products = req.body.products;
    // Revisando los productos de la venta uno a uno.
    products.forEach( async (product) => {
        if( product.is_second_price ) // Si vienen productos con precio secundario
        {
            // Cantidad de productos con precio secundario
            countSecondPrice = product.count_second_price;
            const secondPrices = countSecondPrice * product.second_sale_price;
            const otherPrice = (product.other_price) ? product.other_price : product.sale_price;
            const normalPrices = (product.count - countSecondPrice) * otherPrice;

            total += secondPrices + normalPrices;
        }
        else
        {
            if( product.other_price )
            {
                total += product.count * product.other_price;     
            }
            else
            {
                total += product.count * product.sale_price;     
            }                   
        }

        total_inversion += product.count * product.purchase_price;
    });

    const data = {
        products,
        user: req.user._id,
        establishment: req.user.establishment,
        total,
        total_inversion
    }

    if( req.body.clientId )
    {
        data.client = req.body.clientId;
    }

    if( req.body.deposit )
    {
        data.deposit = req.body.deposit;
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

    return res.status(201).json( sale );
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
    // Saqueme las ventas activas del establecimiento del usuario logueado y este en el rango de fechas
    const query = req.querySale;
    // const queryWithDate = req.queryWithDate;
    console.log("Query Venta: ", query);
    console.log("Fechas: ", query.$and[2]);
    // console.log("Fechas with sale: ", queryWithDate.$and[2]);


    let [ total, sales, statistics, statisticsInversion ] = await Promise.all([
        Sale.countDocuments(query),
        Sale.find(query)
                    .populate('establishment', 'name')
                    .populate('user', 'name')
                    .populate ('client', 'name' )
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
        ]),
        // Agrupar las ventas por dias y sacar la inversion.
        Sale.aggregate([
            {
                $match: query
            },
            {
                $group: {
                    _id: { day: { $dayOfYear: "$created_at"}, year: { $year: "$created_at" } },
                    totalAmount: { $sum: '$total_inversion' },  // Valor total de las ventas del dia
                    count: { $sum: 1 } // Cuantas ventas se hicieron en el dia
                }
            }
        ])
    ]);

    // total, sales, statistics, statisticsInversion
    // console.log("total", total);
    // console.log("sales", sales);
    // console.log("statistics", statistics);
    // console.log("statisticsInversion", statisticsInversion);



    statistics = statistics.map(element => {
        return {
            totalAmount: element.totalAmount,
            count: element.count,
            ...element._id
        };
    });

    statisticsInversion = statisticsInversion.map(element => {
        return {
            totalAmount: element.totalAmount,
            count: element.count,
            ...element._id
        };
    });

    // console.log("statistics222", statistics);
    // console.log("statisticsInversion222", statisticsInversion);


    res.json({
        total,
        sales,
        statistics,
        statisticsInversion
    });
};

/**
 * Obtiene una venta de la base de datos.
 */
 const getSaleById = async(req, res = response ) => {

    // Saqueme la venta de ese establecimiento que este activo cuyo id concuerde.
    const query = req.querySale;
    const sale = await Sale.findOne( query )
                            .populate('establishment', 'name')
                            .populate('user', 'name');

    return res.json( sale );
};

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
    getAllSales,
    getSaleById
    // updateAlcoholById,
    // deleteAlcoholById
};